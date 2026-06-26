import type { Metadata } from 'next'
import { ProductsClient } from '@/components/products-client'
import {
  getApiProducts,
} from '@/lib/api-products'
import { jsonLdScript } from '@/lib/json-ld'
import { productJsonLd } from '@/lib/product-structured-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

export const metadata: Metadata = {
  title: 'Shop Kurkees Jars | Prices & Flavours in Sri Lanka',
  description:
    'Check Kurkees jar prices in Sri Lanka and choose smooth, crunchy, sugar-free, unsalted or chocolate peanut spreads with easy website checkout.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Shop Kurkees Jars | Prices & Flavours',
    description:
      'Shop local Sri Lankan peanut butter jars. Compare smooth, crunchy, sugar-free, unsalted and chocolate options with clear prices and sizes.',
    url: `${siteUrl}/products`,
    type: 'website',
  },
}

export default async function ProductsPage() {
  const products = await getApiProducts()

  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kurkees Peanut Butter Products',
    description: 'Product list and current jar prices from Kurkees Sri Lanka.',
    url: `${siteUrl}/products`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/products/${product.slug}`,
      item: productJsonLd(product, siteUrl),
    })),
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I see current Kurkees prices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prices depend on the flavour and jar size. Product cards show the starting price, and each product page shows available sizes and current prices.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I order peanut butter online in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Choose a jar, add it to the basket and checkout on the website. WhatsApp is available for quick questions before ordering.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Kurkees peanut butter should I choose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose smooth peanut butter for easy spreading, crunchy peanut butter for texture, unsalted sugar-free peanut butter for no sugar and no salt, and Chocofeda for a chocolate peanut spread.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(productListJsonLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
      <ProductsClient initialProducts={products} />
    </>
  )
}
