import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getSinglePost, getBlogPosts } from '@/lib/notion'
import { getApiProducts } from '@/lib/api-products'
import { absoluteUrl, truncateMeta, whatsappLink } from '@/lib/site'
import { jsonLdScript } from '@/lib/json-ld'

export const revalidate = 60
export const dynamicParams = true

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

  const description = truncateMeta(data.post.excerpt || `Read ${data.post.title} from Kurkees, with peanut butter tips, recipes and ideas for Sri Lankan homes.`)

  return {
    title: data.post.title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: data.post.title,
      description,
      type: 'article',
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: data.post.dateISO,
      modifiedTime: data.post.modifiedISO,
      images: [
        {
          url: data.post.image.startsWith('http') ? data.post.image : absoluteUrl(data.post.image),
          alt: data.post.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.post.title,
      description,
      images: [data.post.image.startsWith('http') ? data.post.image : absoluteUrl(data.post.image)],
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
  const [allPosts, apiProducts] = await Promise.all([getBlogPosts(), getApiProducts()])
  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3)
  const fallbackRelatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3)
  const postsToShow = relatedPosts.length > 0 ? relatedPosts : fallbackRelatedPosts

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': post.image.startsWith('http') ? post.image : absoluteUrl(post.image),
    'datePublished': post.dateISO,
    'dateModified': post.modifiedISO,
    'description': post.excerpt,
    'url': absoluteUrl(`/blog/${post.slug}`),
    'mainEntityOfPage': absoluteUrl(`/blog/${post.slug}`),
    'author': {
      '@type': 'Organization',
      'name': 'Kurkees'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Kurkees',
      'logo': {
        '@type': 'ImageObject',
        'url': absoluteUrl('/hero-jar.png')
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleJsonLd)}
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
              <time dateTime={post.dateISO} className="font-sans text-sm text-muted-foreground">
                {post.date}
              </time>
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              {post.title}
            </h1>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-4xl border-2 border-border shadow-[0_8px_0_0_var(--border)]">
            <Image
              src={post.image || '/placeholder.svg'}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 768px"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-a:text-primary mx-auto max-w-none text-foreground prose-img:rounded-2xl prose-img:border-2 prose-img:border-border">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>


          <aside className="mt-12 rounded-3xl border-2 border-border bg-card p-6 shadow-[0_6px_0_0_var(--border)] sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-heading text-2xl font-bold text-card-foreground">Want to try Kurkees?</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                  Browse current jar sizes and prices on the website. WhatsApp is available if you want a quick question answered first.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-heading text-sm font-bold text-primary-foreground hover:opacity-95"
                >
                  Shop online <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink(`Hi Kurkees, I read the article: ${post.title}. I have a quick question before ordering from the website.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-heading text-sm font-bold text-foreground hover:bg-tan/30"
                >
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </a>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {apiProducts.slice(0, 3).map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:bg-tan/30"
                >
                  <span className="block font-heading text-base font-bold text-foreground">{product.name}</span>
                  <span className="mt-1 block font-sans text-xs leading-relaxed text-muted-foreground">View product</span>
                </Link>
              ))}
            </div>
          </aside>

          {postsToShow.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary">Keep reading</span>
                  <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">Related Kurkees articles</h2>
                </div>
                <Link href="/blog" className="hidden items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-primary sm:inline-flex">
                  All posts <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {postsToShow.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary">{item.category}</span>
                    <h3 className="mt-2 line-clamp-2 font-heading text-base font-bold text-card-foreground">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </article>
      </main>
    </>
  )
}
