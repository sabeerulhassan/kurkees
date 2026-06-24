import type { Metadata } from 'next'
import { ProductsClient } from '@/components/products-client'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Shop all Kurkees peanut butter flavors: smooth, crunchy, chocolate, spicy, unsalted, salted, sugar-free and more.',
  alternates: {
    canonical: '/products',
  },
}

async function getDynamicProducts() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
    const res = await fetch(`${apiUrl}/products`, { cache: 'no-store' }) // Keeps data fresh
    if (!res.ok) throw new Error('Failed to retrieve products')
    const json = await res.json()
    return json.data || []
  } catch (e) {
    console.error('Failed to load products from database:', e)
    return [] // Fallback to avoid breaking layout
  }
}

export default async function ProductsPage() {
  const dynamicProducts = await getDynamicProducts()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Kurkees Products',
    'description': 'Shop the full collection of premium peanut butter jars.',
    'url': `${siteUrl}/products`,
    'numberOfItems': dynamicProducts.length,
    'itemListElement': dynamicProducts.map((product: any, index: number) => {
      const startingPrice = Math.min(...product.sizes.map((s: any) => s.price))
      
      return {
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Product',
          'name': product.name,
          'description': product.description || `${product.name} - ${product.flavor} peanut butter.`,
          'image': product.images[0]?.image_url ? `${siteUrl}${product.images[0].image_url}` : `${siteUrl}/placeholder.svg`,
          'url': `${siteUrl}/products`,
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'LKR',
            'price': startingPrice,
            'itemCondition': 'https://schema.org/NewCondition',
            'availability': 'https://schema.org/InStock',
          }
        }
      }
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <ProductsClient initialProducts={dynamicProducts} />
    </>
  )
}