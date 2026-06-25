import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { collections } from '@/lib/collections'
import { jsonLdScript } from '@/lib/json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

export const metadata: Metadata = {
  title: 'Shopping Guides | Kurkees Sri Lanka',
  description:
    'Explore Kurkees shopping guides by price, texture, ingredients, chocolate flavour and fitness meal use.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Shopping Guides | Kurkees Sri Lanka',
    description:
      'Find the right Kurkees jar by price, flavour, texture, ingredients and use case.',
    url: `${siteUrl}/collections`,
    type: 'website',
  },
}

export default function CollectionsPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kurkees Shopping Guides',
    url: `${siteUrl}/collections`,
    numberOfItems: collections.length,
    itemListElement: collections.map((collection, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/collections/${collection.slug}`,
      name: collection.title,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)}
      />
      <main className="kurkees-page">
        <section className="relative overflow-hidden bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="brand-kicker">
              <Search className="h-4 w-4" /> Helpful shopping guides
            </span>
            <h1 className="mt-4 brand-headline text-5xl leading-[0.9] sm:text-7xl">
              Kurkees Shopping Guides
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-stone-600">
              Use these guides to quickly compare Kurkees jars by price, flavour, texture, ingredients and everyday use in Sri Lanka.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group flex h-full flex-col brand-panel p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">
                  {collection.eyebrow}
                </span>
                <h2 className="mt-3 font-heading text-2xl font-bold text-[var(--brand-brown)]">
                  {collection.title}
                </h2>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-stone-600">
                  {collection.intro}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-[var(--brand-brown)]">
                  Open guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
