import {
  absoluteProductImageUrl,
  getStartingPrice,
  isSizeInStock,
  type StoreProduct,
} from '@/lib/api-products'

function productBrandName(product: StoreProduct) {
  return product.slug.includes('chocofeda') ? 'Chocofeda' : 'Kurkees'
}

function pricedSizes(product: StoreProduct) {
  return product.sizes.filter((size) => Number(size.price) > 0)
}

export function productOffersJsonLd(product: StoreProduct, siteUrl: string) {
  const sizes = pricedSizes(product)
  const productUrl = `${siteUrl}/products/${product.slug}`

  if (sizes.length === 0) return undefined

  if (sizes.length === 1) {
    const size = sizes[0]
    return {
      '@type': 'Offer',
      priceCurrency: 'LKR',
      price: size.price,
      sku: `${product.slug}-${size.size}`,
      availability: isSizeInStock(size) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: productUrl,
      itemCondition: 'https://schema.org/NewCondition',
    }
  }

  const prices = sizes.map((size) => size.price)

  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'LKR',
    lowPrice: getStartingPrice(product),
    highPrice: Math.max(...prices),
    offerCount: sizes.length,
    availability: sizes.some((size) => isSizeInStock(size)) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    url: productUrl,
    itemCondition: 'https://schema.org/NewCondition',
  }
}

export function productJsonLd(product: StoreProduct, siteUrl: string) {
  return {
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(absoluteProductImageUrl(product, siteUrl) ? { image: absoluteProductImageUrl(product, siteUrl) } : {}),
    brand: {
      '@type': 'Brand',
      name: productBrandName(product),
    },
    category: product.slug.includes('chocofeda') ? 'Chocolate Peanut Spread' : 'Peanut Butter',
    ...(productOffersJsonLd(product, siteUrl) ? { offers: productOffersJsonLd(product, siteUrl) } : {}),
  }
}
