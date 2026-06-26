import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProductDetailClient } from './product-detail-client'
import { getApiProduct, getApiProducts, getApiProductImage, getStartingPrice, isSizeInStock } from '@/lib/api-products'
import { collections } from '@/lib/collections'
import { getProductApiCollections } from '@/lib/collection-matching'
import { productSlugAliases, resolveProductSlug } from '@/lib/route-aliases'
import { jsonLdScript } from '@/lib/json-ld'
import { productJsonLd as buildProductJsonLd } from '@/lib/product-structured-data'

export const revalidate = 3600
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  return getApiProduct(slug)
}

export async function generateStaticParams() {
  const products = await getApiProducts()
  return [
    ...products.map((product) => ({ slug: product.slug })),
    ...Object.keys(productSlugAliases).map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(resolveProductSlug(slug))
  if (!product) return { title: 'Product Not Found' }

  const title = `${product.name} | Kurkees Sri Lanka`
  const description = `${product.description} See available jar sizes, prices and checkout options from Kurkees.`

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `/products/${product.slug}`,
      type: 'website',
      images: getApiProductImage(product) ? [getApiProductImage(product) as string] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const canonicalSlug = resolveProductSlug(slug)

  if (canonicalSlug !== slug) {
    permanentRedirect(`/products/${canonicalSlug}`)
  }

  const product = await getProduct(canonicalSlug)

  if (!product) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'
  const productUrl = `${siteUrl}/products/${product.slug}`
  const inStockSizes = product.sizes.filter((size) => isSizeInStock(size))
  const relatedCollections = getProductApiCollections(product, collections).filter((collection) => collection.slug !== 'peanut-butter-price-in-sri-lanka').slice(0, 4)

  const productJsonLd = {
    '@context': 'https://schema.org',
    ...buildProductJsonLd(product, siteUrl),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Ingredients',
        value: product.ingredients,
      },
      {
        '@type': 'PropertyValue',
        name: 'Available sizes',
        value: product.sizes.map((size) => size.size).join(', '),
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Products',
        item: `${siteUrl}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(productJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />

      <main className="kurkees-page min-h-screen pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 font-sans text-xs font-semibold text-stone-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--brand-red)]">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[var(--brand-red)]">Products</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </nav>

          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-sans text-sm font-bold text-stone-600 shadow-sm transition-colors hover:text-[var(--brand-red)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>

          <ProductDetailClient product={product} />

          <section className="mt-10 grid gap-5 rounded-[2rem] bg-white p-6 shadow-[0_10px_0_rgba(74,44,8,.1)] sm:p-8 lg:grid-cols-3">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">Product details</span>
              <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--brand-brown)]">{product.name} details</h2>
            </div>
            <div className="lg:col-span-2">
              <p className="font-sans text-sm leading-relaxed text-stone-600">
                Available sizes include {product.sizes.map((size) => size.size).join(', ')}. Prices start from Rs. {getStartingPrice(product).toLocaleString()}. {inStockSizes.length > 0 ? 'Choose a size above, add it to your basket and checkout on the website.' : 'This product is currently marked out of stock.'}
              </p>
            </div>
          </section>

          {relatedCollections.length > 0 && (
            <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-[0_10px_0_rgba(74,44,8,.1)] sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">
                    Useful guides
                  </span>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--brand-brown)]">
                    Related shopping guides
                  </h2>
                </div>
                <Link href="/collections" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-yellow)] px-5 py-2.5 font-heading text-sm font-bold text-[var(--brand-brown)] hover:bg-[var(--brand-yellow)]">
                  All guides
                </Link>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {relatedCollections.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={`/collections/${collection.slug}`}
                    className="rounded-[1.5rem] bg-[var(--brand-white)] p-4 transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-yellow)]"
                  >
                    <span className="font-heading text-base font-bold text-[var(--brand-brown)]">{collection.label}</span>
                    <span className="mt-1 block font-sans text-xs leading-relaxed text-stone-500">View guide</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  )
}
