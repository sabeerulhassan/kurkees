export const productSlugAliases: Record<string, string> = {
  'smooth-peanut-butter': 'sugar-salted-smooth',
  'creamy-peanut-butter': 'sugar-salted-smooth',
  'crunchy-peanut-butter': 'sugar-salted-crunchy',
  'peanut-butter-crunch': 'sugar-salted-crunchy',
  'sugar-free-peanut-butter': 'salted-sugar-free-smooth',
  'no-sugar-peanut-butter': 'salted-sugar-free-smooth',
  'unsalted-peanut-butter': 'unsalted-sugar-free-smooth',
  'unsweetened-peanut-butter': 'unsalted-sugar-free-smooth',
  'no-sugar-no-salt-peanut-butter': 'unsalted-sugar-free-smooth',
  'chocolate-peanut-butter': 'chocofeda-chocolate-peanut',
  'chocolate-peanut-spread': 'chocofeda-chocolate-peanut',
  chocofeda: 'chocofeda-chocolate-peanut',
}

export const collectionSlugAliases: Record<string, string> = {
  'peanut-butter-price': 'peanut-butter-price-in-sri-lanka',
  'peanut-butter-price-sri-lanka': 'peanut-butter-price-in-sri-lanka',
  'peanut-butter-price-list': 'peanut-butter-price-in-sri-lanka',
  'peanut-butter-online-order': 'peanut-butter-price-in-sri-lanka',
  'buy-peanut-butter-online': 'peanut-butter-price-in-sri-lanka',
  'natural-peanut-butter-sri-lanka': 'natural-peanut-butter',
  'pure-peanut-butter': 'natural-peanut-butter',
  'real-peanut-butter': 'natural-peanut-butter',
  'smooth-peanut-butter-sri-lanka': 'smooth-peanut-butter',
  'creamy-peanut-butter-sri-lanka': 'smooth-peanut-butter',
  'crunchy-peanut-butter-sri-lanka': 'crunchy-peanut-butter',
  'sugar-free-peanut-butter-sri-lanka': 'sugar-free-peanut-butter',
  'no-sugar-peanut-butter-sri-lanka': 'sugar-free-peanut-butter',
  'chocolate-peanut-butter-sri-lanka': 'chocolate-peanut-butter',
  'protein-peanut-butter-sri-lanka': 'protein-peanut-butter',
  'peanut-butter-for-gym': 'protein-peanut-butter',
  'peanut-butter-for-weight-gain': 'protein-peanut-butter',
}

export const rootSeoAliases: Record<string, string> = {
  'peanut-butter-price-in-sri-lanka': '/collections/peanut-butter-price-in-sri-lanka',
  'peanut-butter-price': '/collections/peanut-butter-price-in-sri-lanka',
  'peanut-butter-price-sri-lanka': '/collections/peanut-butter-price-in-sri-lanka',
  'peanut-butter-price-list': '/collections/peanut-butter-price-in-sri-lanka',
  'peanut-butter-online-order': '/collections/peanut-butter-price-in-sri-lanka',
  'buy-peanut-butter-online': '/collections/peanut-butter-price-in-sri-lanka',
  'natural-peanut-butter': '/collections/natural-peanut-butter',
  'natural-peanut-butter-sri-lanka': '/collections/natural-peanut-butter',
  'pure-peanut-butter': '/collections/natural-peanut-butter',
  'real-peanut-butter': '/collections/natural-peanut-butter',
  'smooth-peanut-butter': '/collections/smooth-peanut-butter',
  'smooth-peanut-butter-sri-lanka': '/collections/smooth-peanut-butter',
  'creamy-peanut-butter': '/collections/smooth-peanut-butter',
  'crunchy-peanut-butter': '/collections/crunchy-peanut-butter',
  'crunchy-peanut-butter-sri-lanka': '/collections/crunchy-peanut-butter',
  'sugar-free-peanut-butter': '/collections/sugar-free-peanut-butter',
  'no-sugar-peanut-butter': '/collections/sugar-free-peanut-butter',
  'no-sugar-no-salt-peanut-butter': '/products/unsalted-sugar-free-smooth',
  'unsalted-peanut-butter': '/products/unsalted-sugar-free-smooth',
  'chocolate-peanut-butter': '/collections/chocolate-peanut-butter',
  'chocolate-peanut-spread': '/products/chocofeda-chocolate-peanut',
  chocofeda: '/products/chocofeda-chocolate-peanut',
  'protein-peanut-butter': '/collections/protein-peanut-butter',
  'peanut-butter-for-gym': '/collections/protein-peanut-butter',
  'peanut-butter-for-weight-gain': '/collections/protein-peanut-butter',
}

export function resolveProductSlug(slug: string) {
  return productSlugAliases[slug] || slug
}

export function resolveCollectionSlug(slug: string) {
  return collectionSlugAliases[slug] || slug
}
