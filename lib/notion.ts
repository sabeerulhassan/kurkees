import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  dateISO: string
  modifiedISO: string
  category: 'Recipes' | 'Nutrition Tips' | 'News' | string
}

const NOTION_VERSION = '2022-06-28'
const NOTION_REVALIDATE_SECONDS = 60
const FALLBACK_IMAGE = '/placeholder.svg'

function cleanEnv(value?: string) {
  return value?.trim().replace(/^["']|["']$/g, '') || ''
}

function getNotionConfig() {
  return {
    databaseId: cleanEnv(
      process.env.NOTION_DATABASE_ID || process.env.NOTION_BLOG_DATABASE_ID,
    ),
    token: cleanEnv(
      process.env.NOTION_TOKEN ||
        process.env.NOTION_API_KEY ||
        process.env.NOTION_SECRET ||
        process.env.NOTION_INTEGRATION_TOKEN,
    ),
  }
}

function logMissingNotionConfig() {
  const { databaseId, token } = getNotionConfig()
  const missing = [
    !databaseId ? 'NOTION_DATABASE_ID' : null,
    !token ? 'NOTION_TOKEN' : null,
  ].filter(Boolean)

  if (missing.length) {
    console.error(
      `[Notion] Blog posts are configured to load from Notion, but missing: ${missing.join(
        ', ',
      )}. Add these to .env.local locally and to your deployment environment.`,
    )
  }
}

function getProperty(properties: Record<string, any>, names: string[]) {
  const normalized = Object.entries(properties).map(([key, value]) => [key.toLowerCase().trim(), value] as const)
  for (const name of names) {
    const match = normalized.find(([key]) => key === name.toLowerCase().trim())
    if (match) return match[1]
  }
  return undefined
}

function plainTextFromRichText(property: any) {
  if (!property) return ''
  if (property.type === 'title') return property.title?.map((item: any) => item.plain_text).join('') || ''
  if (property.type === 'rich_text') return property.rich_text?.map((item: any) => item.plain_text).join('') || ''
  if (property.type === 'url') return property.url || ''
  if (property.type === 'select') return property.select?.name || ''
  if (property.type === 'formula') {
    if (property.formula?.type === 'string') return property.formula.string || ''
    if (property.formula?.type === 'number') return String(property.formula.number || '')
  }
  return ''
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function normalizeSlug(value: string, fallback = '') {
  const cleaned = value.trim()

  if (!cleaned) return slugify(fallback)

  try {
    const maybeUrl = new URL(cleaned)
    const pathnameParts = maybeUrl.pathname.split('/').filter(Boolean)
    const blogIndex = pathnameParts.findIndex((part) => part.toLowerCase() === 'blog')
    const lastPart = blogIndex >= 0 ? pathnameParts[blogIndex + 1] : pathnameParts.at(-1)
    return slugify(safeDecodeURIComponent(lastPart || fallback || cleaned))
  } catch {
    const withoutQuery = cleaned.split('?')[0].split('#')[0]
    const parts = withoutQuery.split('/').filter(Boolean)
    const blogIndex = parts.findIndex((part) => part.toLowerCase() === 'blog')
    const slugPart = blogIndex >= 0 ? parts[blogIndex + 1] : parts.at(-1)
    return slugify(safeDecodeURIComponent(slugPart || fallback || cleaned))
  }
}

function toISO(value?: string, fallback?: string) {
  const input = value || fallback || new Date().toISOString()
  const date = new Date(input)
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getCoverUrl(page: any) {
  return page.cover?.external?.url || page.cover?.file?.url || FALLBACK_IMAGE
}

function mapPageToBlogPost(page: any): BlogPost {
  const properties = page.properties || {}
  const title = plainTextFromRichText(getProperty(properties, ['Title', 'Name', 'Post Title'])) || 'Untitled'
  const explicitSlug = plainTextFromRichText(getProperty(properties, ['Slug', 'URL Slug', 'Permalink']))
  const excerpt = plainTextFromRichText(getProperty(properties, ['Excerpt', 'Summary', 'Description']))
  const category = plainTextFromRichText(getProperty(properties, ['Category', 'Type'])) || 'News'
  const dateProperty = getProperty(properties, ['Date', 'Published Date', 'Publish Date'])
  const dateISO = toISO(dateProperty?.date?.start, page.created_time)
  const modifiedISO = toISO(page.last_edited_time, dateISO)

  return {
    id: page.id,
    title,
    slug: normalizeSlug(explicitSlug, title || page.id) || page.id,
    excerpt,
    date: formatDate(dateISO),
    dateISO,
    modifiedISO,
    category,
    image: getCoverUrl(page),
  }
}

async function queryNotionDatabase(body: any) {
  const { databaseId, token } = getNotionConfig()

  if (!databaseId || !token) {
    logMissingNotionConfig()
    return { results: [] }
  }

  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    next: { revalidate: NOTION_REVALIDATE_SECONDS },
  })

  if (!res.ok) {
    const errorText = await res.text()
    const hint = res.status === 401
      ? ' Check that NOTION_TOKEN is the real integration secret and that the integration has access to the blog database.'
      : ''
    console.error(`Notion API Error (${res.status}): ${errorText}${hint}`)
    return { results: [] }
  }

  return res.json()
}

async function queryPublishedPosts() {
  return queryNotionDatabase({
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { databaseId, token } = getNotionConfig()
  if (!databaseId || !token) {
    logMissingNotionConfig()
    return []
  }

  const response = await queryPublishedPosts()

  if (!Array.isArray(response.results)) return []

  return response.results.map(mapPageToBlogPost)
}

async function getPageByMappedSlug(slug: string) {
  const normalizedRequestedSlug = normalizeSlug(slug)
  const response = await queryPublishedPosts()

  if (!Array.isArray(response.results)) return null

  return response.results.find((page: any) => mapPageToBlogPost(page).slug === normalizedRequestedSlug) || null
}

async function getPageByExactRichTextSlug(slug: string) {
  const response = await queryNotionDatabase({
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  })

  if (Array.isArray(response.results) && response.results.length > 0) {
    return response.results[0]
  }

  return null
}

export async function getSinglePost(slug: string) {
  const { databaseId, token } = getNotionConfig()
  if (!databaseId || !token || !slug) {
    if (!slug) return null
    logMissingNotionConfig()
    return null
  }

  const normalizedSlug = normalizeSlug(slug)
  const page =
    (await getPageByExactRichTextSlug(slug)) ||
    (normalizedSlug !== slug ? await getPageByExactRichTextSlug(normalizedSlug) : null) ||
    (await getPageByMappedSlug(normalizedSlug))

  if (!page) return null

  const notion = new Client({ auth: token })
  const n2m = new NotionToMarkdown({ notionClient: notion })

  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return {
    post: mapPageToBlogPost(page),
    markdown: mdString.parent,
  }
}
