import type { CollectionPage } from '@/lib/collections'
import type { StoreProduct } from '@/lib/api-products'

function normalize(value: unknown) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeSlug(value: unknown) {
  return normalize(value).replace(/\s+/g, '-')
}

function productSearchText(product: StoreProduct | any) {
  return normalize([
    product?.slug,
    product?.name,
    product?.flavor,
    product?.ingredients,
    product?.description,
    product?.usage,
    ...(Array.isArray(product?.tags) ? product.tags : []),
    ...(Array.isArray(product?.secondaryKeywords) ? product.secondaryKeywords : []),
    ...(Array.isArray(product?.bestFor) ? product.bestFor : []),
  ].filter(Boolean).join(' '))
}

function hasPhrase(text: string, phrase: string) {
  return text.includes(normalize(phrase))
}

function isChocolateProduct(text: string) {
  return hasPhrase(text, 'chocolate') || hasPhrase(text, 'chocofeda') || hasPhrase(text, 'cocoa')
}

function isSweetenedProduct(text: string) {
  return hasPhrase(text, 'sweetened') || hasPhrase(text, 'sugar salted') || hasPhrase(text, 'sugar, salt') || hasPhrase(text, 'sugar salt')
}

function isNoAddedSugarProduct(text: string) {
  return (
    hasPhrase(text, 'no added sugar') ||
    hasPhrase(text, 'sugar free') ||
    hasPhrase(text, 'sugar-free') ||
    hasPhrase(text, 'without sugar') ||
    hasPhrase(text, 'no sugar') ||
    hasPhrase(text, 'unsweetened') ||
    hasPhrase(text, 'roasted peanuts salt') ||
    hasPhrase(text, 'roasted peanuts only') ||
    (hasPhrase(text, 'roasted peanuts') && !hasPhrase(text, 'sugar'))
  )
}

function matchesConfiguredSlug(product: StoreProduct | any, collection: CollectionPage) {
  const productSlug = normalizeSlug(product?.slug)
  if (!productSlug) return false

  return collection.productSlugs.some((configuredSlug) => {
    const expected = normalizeSlug(configuredSlug)
    if (!expected) return false

    return (
      productSlug === expected ||
      productSlug.startsWith(`${expected}-`) ||
      productSlug === `${expected}-peanut-butter` ||
      productSlug === `${expected}-peanut-spread` ||
      productSlug === `${expected}-spread`
    )
  })
}

export function productMatchesCollection(product: StoreProduct | any, collection: CollectionPage) {
  const text = productSearchText(product)

  if (!text) return false
  if (collection.slug === 'peanut-butter-price-in-sri-lanka') return true
  if (matchesConfiguredSlug(product, collection)) return true

  switch (collection.slug) {
    case 'natural-peanut-butter':
      return hasPhrase(text, 'peanut') && !isChocolateProduct(text)

    case 'smooth-peanut-butter':
      return hasPhrase(text, 'smooth')

    case 'crunchy-peanut-butter':
      return hasPhrase(text, 'crunchy') || hasPhrase(text, 'crunch')

    case 'sugar-free-peanut-butter':
      return isNoAddedSugarProduct(text) && !isSweetenedProduct(text) && !isChocolateProduct(text)

    case 'chocolate-peanut-butter':
      return isChocolateProduct(text)

    case 'protein-peanut-butter':
      return hasPhrase(text, 'peanut') && !isChocolateProduct(text)

    default:
      return false
  }
}

export function getCollectionApiProducts(products: StoreProduct[], collection: CollectionPage) {
  return products.filter((product) => productMatchesCollection(product, collection))
}

export function getProductApiCollections(product: StoreProduct | any, collections: CollectionPage[]) {
  return collections.filter((collection) => productMatchesCollection(product, collection))
}
