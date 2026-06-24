import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getSinglePost, getBlogPosts } from '@/lib/notion'

export const revalidate = 60

// 1. Tell Next.js which routes to pre-render
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 2. Wrap params type as a Promise for Next.js compatability
type Props = {
  params: Promise<{ slug: string }>
}

// Generate dynamic SEO Meta Tags safely
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getSinglePost(slug)
  if (!data) return { title: 'Post Not Found' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  return {
    title: `${data.post.title} — Kurkees`,
    description: data.post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: data.post.title,
      description: data.post.excerpt,
      type: 'article',
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: new Date(data.post.date).toISOString(),
      images: [
        {
          url: data.post.image || `${siteUrl}/placeholder.svg`,
          alt: data.post.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.post.title,
      description: data.post.excerpt,
      images: [data.post.image || `${siteUrl}/placeholder.svg`],
    }
  }
}

// 3. Render the dynamic article safely
export default async function SinglePostPage({ params }: Props) {
  const { slug } = await params
  const data = await getSinglePost(slug)

  if (!data) {
    notFound()
  }

  const { post, markdown } = data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': post.image || `${siteUrl}/placeholder.svg`,
    'datePublished': new Date(post.date).toISOString(),
    'description': post.excerpt,
    'url': `${siteUrl}/blog/${post.slug}`,
    'author': {
      '@type': 'Organization',
      'name': 'Kurkees'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Kurkees',
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/hero-jar.png`
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      <main className="min-h-screen bg-background pb-20 pt-10">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 mb-8 font-sans font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>

          {/* Post Header */}
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="rounded-full bg-primary px-3 py-1 font-sans text-xs font-bold text-primary-foreground">
                {post.category}
              </span>
              <time dateTime={new Date(post.date).toISOString()} className="font-sans text-sm text-muted-foreground">
                {post.date}
              </time>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              {post.title}
            </h1>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-4xl border-2 border-border shadow-[0_8px_0_0_var(--border)]">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-a:text-primary mx-auto max-w-none text-foreground prose-img:rounded-2xl prose-img:border-2 prose-img:border-border">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>

        </article>
      </main>
    </>
  )
}