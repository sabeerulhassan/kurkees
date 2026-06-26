import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPosts } from '@/lib/notion'
import { cn } from '@/lib/utils'
import { absoluteUrl } from '@/lib/site'
import { jsonLdScript } from '@/lib/json-ld'

export const metadata: Metadata = {
  title: 'Peanut Butter Blog Sri Lanka | Kurkees Recipes & Tips',
  description:
    'Read Kurkees peanut butter recipes, snack ideas, family tips and fitness meal ideas for Sri Lankan homes.',
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export const revalidate = 60

const categories = ['All', 'Recipes', 'Nutrition Tips', 'News'] as const

type BlogPageProps = {
  searchParams?: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const selectedCategory = params?.category || 'All'
  const posts = await getBlogPosts()
  const filteredPosts = posts.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory,
  )
  const featured = filteredPosts[0]
  const rest = filteredPosts.slice(1)

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: selectedCategory === 'All' ? 'Kurkees Blog' : `Kurkees ${selectedCategory} Articles`,
    itemListElement: filteredPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <main className="overflow-hidden bg-background">
      <section className="relative border-b border-amber-900/10 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-balance font-heading text-4xl font-bold text-[#3a210f] sm:text-6xl">
            The Kurkees Journal
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base text-stone-500">
            Recipes, nutrition tips, and peanut butter ideas loaded directly from the Kurkees Notion blog.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Blog categories" className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const href = category === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(category)}`
            const isActive = selectedCategory === category
            return (
              <Link
                key={category}
                href={href}
                className={cn(
                  'rounded-full border px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors',
                  isActive
                    ? 'border-amber-200 bg-[#fff4cf] text-[#5b2f17]'
                    : 'border-amber-900/10 bg-[#fff7e8] text-stone-500 hover:bg-[#fff3cf] hover:text-[#3a210f]',
                )}
              >
                {category}
              </Link>
            )
          })}
        </nav>

        {!featured && (
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-900/10 bg-white p-8 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-[#3a210f]">No published posts found</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-stone-500">
              Blog posts are loaded from Notion. If you expected posts here, check the Notion token, database ID, Published checkbox, and selected category.
            </p>
          </div>
        )}

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-10 grid overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <Image
                src={featured.image || '/placeholder.svg'}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 768px) 92vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#fff4cf] border border-amber-900/10 px-3 py-0.5 font-sans text-[10px] font-bold text-[#5b2f17] uppercase tracking-wide">
                  {featured.category}
                </span>
                <span className="font-sans text-xs text-stone-400">
                  {featured.date}
                </span>
              </div>
              <h2 className="mt-3 text-balance font-heading text-2xl font-bold text-[#3a210f] leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-stone-500 line-clamp-3">
                {featured.excerpt}
              </p>
              <span className="mt-5 flex items-center gap-1 font-sans text-xs font-bold text-[#5b2f17] uppercase tracking-wider">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[#fff4cf] border border-amber-900/10 px-3 py-0.5 font-sans text-[10px] font-bold text-[#5b2f17] uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  {post.date}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-[#3a210f] line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 font-sans text-xs leading-relaxed text-stone-500 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="mt-4 flex items-center gap-1 font-sans text-xs font-bold text-[#5b2f17] uppercase tracking-wider">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </main>
    </>
  )
}
