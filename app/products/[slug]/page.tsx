import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProductDetailClient } from './product-detail-client'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
    const res = await fetch(`${apiUrl}/products/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.data || null
  } catch (e) {
    console.error(`Failed to load product details for slug ${slug}:`, e)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
    const res = await fetch(`${apiUrl}/products`)
    if (!res.ok) return []
    const json = await res.json()
    const list = json.data || []
    return list.map((p: any) => ({
      slug: p.slug,
    }))
  } catch (e) {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} — Premium Peanut Butter`,
    description: product.description,
    alternates: {
      canonical: `/products/${slug}`,
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': `${siteUrl}${product.images?.[0]?.image_url || '/placeholder.svg'}`,
    'description': product.description,
    'brand': {
      '@type': 'Brand',
      'name': product.slug.includes('chocofeda') ? 'Chocofeda' : 'Kurkees'
    },
    'offers': product.sizes.map((s: any) => ({
      '@type': 'Offer',
      'priceCurrency': 'LKR',
      'price': s.price,
      'sku': `${product.slug}-${s.size}`,
      'availability': s.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'url': `${siteUrl}/products/${product.slug}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Changed outer background to crisp premium alabaster */}
      <main className="min-h-screen bg-[#faf9f6] pb-20 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 mb-8 font-sans text-sm font-bold text-stone-500 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>

          <ProductDetailClient product={product} />

        </div>
      </main>
    </>
  )
}