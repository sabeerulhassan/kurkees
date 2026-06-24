import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  category: 'Recipes' | 'Nutrition Tips' | 'News' | string
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

async function queryNotionDatabase(body: any) {
  const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.error('Notion API Error:', await res.text())
    return { results: [] }
  }

  return res.json()
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_DATABASE_ID) return []

  const response = await queryNotionDatabase({
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

  return response.results.map((page: any) => {
    return {
      id: page.id,
      title: page.properties.Title?.title[0]?.plain_text || 'Untitled',
      slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
      excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
      date: formatDate(page.properties.Date?.date?.start || new Date().toISOString()),
      category: page.properties.Category?.select?.name || 'News',
      image: page.cover?.external?.url || page.cover?.file?.url || '/placeholder.svg',
    }
  })
}

export async function getSinglePost(slug: string) {
  // Prevent query executing with empty or invalid slug params
  if (!process.env.NOTION_DATABASE_ID || !slug) return null

  const response = await queryNotionDatabase({
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  })

  if (!response.results || !response.results.length) return null

  const page = response.results[0]
  
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const n2m = new NotionToMarkdown({ notionClient: notion })

  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  const postData: BlogPost = {
    id: page.id,
    title: page.properties.Title?.title[0]?.plain_text || 'Untitled',
    slug: page.properties.Slug?.rich_text[0]?.plain_text || page.id,
    excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
    date: formatDate(page.properties.Date?.date?.start || new Date().toISOString()),
    category: page.properties.Category?.select?.name || 'News',
    image: page.cover?.external?.url || page.cover?.file?.url || '/placeholder.svg',
  }

  return {
    post: postData,
    markdown: mdString.parent,
  }
}