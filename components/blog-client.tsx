'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/notion'
import { cn } from '@/lib/utils'

const categories = ['All', 'Recipes', 'Nutrition Tips', 'News'] as const

export function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [category, setCategory] = useState<string>('All')

  const filtered = useMemo(
    () =>
      initialPosts.filter((p) => category === 'All' || p.category === category),
    [category, initialPosts],
  )

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <main className="overflow-hidden bg-background">
      {/* Header - Refined to elegant Alabaster */}
      <section className="relative border-b border-amber-900/10 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-balance font-heading text-4xl font-bold text-[#3a210f] sm:text-6xl">
            The Kurkees Journal
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base text-stone-500">
            Recipes, nutrition tips, and the latest scoop from our kitchen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full px-5 py-2 font-sans text-xs font-bold uppercase tracking-wider border transition-colors',
                category === c
                  ? 'bg-[#fff4cf] text-[#5b2f17] border-amber-200'
                  : 'bg-[#fff7e8] border-amber-900/10 text-stone-500 hover:bg-[#fff3cf] hover:text-[#3a210f]',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured Card */}
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

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
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
  )
}