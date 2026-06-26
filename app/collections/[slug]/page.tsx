import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { collections, getCollectionBySlug } from '@/lib/collections'
import { collectionSlugAliases, resolveCollectionSlug } from '@/lib/route-aliases'
import { getApiProducts } from '@/lib/api-products'
import { getCollectionApiProducts } from '@/lib/collection-matching'
import { jsonLdScript } from '@/lib/json-ld'
import { productJsonLd } from '@/lib/product-structured-data'

export const dynamicParams = true

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [
    ...collections.map((collection) => ({ slug: collection.slug })),
    ...Object.keys(collectionSlugAliases).map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionBySlug(resolveCollectionSlug(slug))

  if (!collection) {
    return {
      title: 'Peanut Butter Guide Not Found | Kurkees',
    }
  }

  return {
    title: collection.metaTitle,
    description: collection.metaDescription,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: collection.metaTitle,
      description: collection.metaDescription,
      url: `${siteUrl}/collections/${collection.slug}`,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: collection.title,
        },
      ],
    },
  }
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const canonicalSlug = resolveCollectionSlug(slug)

  if (canonicalSlug !== slug) {
    permanentRedirect(`/collections/${canonicalSlug}`)
  }

  const collection = getCollectionBySlug(canonicalSlug)

  if (!collection) notFound()

  const apiProducts = await getApiProducts()
  const collectionProducts = getCollectionApiProducts(apiProducts, collection)

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${siteUrl}/collections/${collection.slug}#collection`,
        name: collection.title,
        headline: collection.h1,
        description: collection.metaDescription,
        url: `${siteUrl}/collections/${collection.slug}`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Kurkees',
          url: siteUrl,
        },
        about: collection.title,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Collections',
            item: `${siteUrl}/collections`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: collection.title,
            item: `${siteUrl}/collections/${collection.slug}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${collection.title} products`,
        numberOfItems: collectionProducts.length,
        itemListElement: collectionProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/products/${product.slug}`,
          item: productJsonLd(product, siteUrl),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: collection.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(collectionJsonLd)}
      />
      <main className="kurkees-page">
        <section className="relative overflow-hidden bg-white py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 font-sans text-xs font-bold text-stone-500">
              <Link href="/" className="hover:text-[var(--brand-brown)]">Home</Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-[var(--brand-brown)]">Collections</Link>
              <span>/</span>
              <span className="text-[var(--brand-brown)]">{collection.title}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="brand-kicker">
                  {collection.eyebrow}
                </span>
                <h1 className="mt-5 text-balance brand-headline text-5xl leading-[0.9] sm:text-7xl">
                  {collection.h1}
                </h1>
                <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-stone-600 sm:text-lg">
                  {collection.intro}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#matching-products"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-3.5 font-heading text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-[var(--brand-red)]"
                  >
                    See recommended jars <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`https://wa.me/94777278378?text=${encodeURIComponent(`Hi Kurkees, I have a quick question about ${collection.title} before ordering from the website.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3.5 font-heading text-sm font-bold text-[var(--brand-brown)] transition-colors hover:bg-[var(--brand-yellow)]"
                  >
                    <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-900/10 bg-[#fff4cf]/70 p-6 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-[var(--brand-brown)]">Best for</h2>
                <div className="mt-5 grid gap-3">
                  {collection.bestFor.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 p-3 font-sans text-sm font-bold text-stone-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="matching-products" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">
                Matching Kurkees jars
              </span>
              <h2 className="mt-2 brand-headline text-4xl leading-none sm:text-6xl">
                Recommended Kurkees jars
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 font-heading text-sm font-bold text-[var(--brand-brown)] hover:bg-[var(--brand-yellow)]">
              View full price list <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {collectionProducts.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {collectionProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-[var(--brand-brown)]/20 bg-white p-8 text-center font-sans text-sm font-semibold text-stone-600">
              No matching jars are listed for this guide right now. View the full product shelf, or contact Kurkees if you need help choosing a jar.
            </div>
          )}
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">Buying guide</span>
              <h2 className="mt-2 brand-headline text-4xl leading-none sm:text-6xl">
                How to choose
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-stone-600">
                Use these notes to pick the jar that fits your meals, taste and ingredient preference.
              </p>
            </div>
            <div className="grid gap-4">
              {collection.buyingGuide.map((item, index) => (
                <div key={item} className="rounded-[1.5rem] bg-[var(--brand-white)] p-5 shadow-sm">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-stone-400">Step {index + 1}</span>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-center brand-headline text-4xl leading-none sm:text-6xl">
            {collection.title} FAQ
          </h2>
          <div className="mt-8 divide-y divide-stone-200 brand-panel p-6 sm:p-8">
            {collection.faqs.map((faq) => (
              <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                <h3 className="font-heading text-lg font-bold text-[var(--brand-brown)]">{faq.question}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-stone-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 rounded-[2rem] bg-[var(--brand-blue)] p-6 text-white sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold">Need help before ordering?</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-stone-300">
                Checkout on the website when you are ready. Message us only if you want a quick clarification about delivery, COD or product choice.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-sm font-bold text-[var(--brand-brown)] hover:bg-[var(--brand-yellow)]"
              >
                Start checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/94777278378?text=${encodeURIComponent(`Hi Kurkees, I have a quick question about ${collection.title} before ordering from the website.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 font-heading text-sm font-bold text-white hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" /> Ask Kurkees
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
