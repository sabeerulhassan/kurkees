export type StoreProductImage = {
  id?: string | number
  image_url: string
  thumbnail_url?: string | null
  medium_url?: string | null
  full_url?: string | null
  alt_text?: string | null
  position?: number
}

export type StoreProductSizeImage = StoreProductImage

export type StoreProductSize = {
  id?: string | number
  size: string
  price: number
  in_stock: boolean
  inStock: boolean
  size_youtube_id?: string | null
  size_images: StoreProductSizeImage[]
}

export type StoreProductFaq = {
  question: string
  answer: string
}

export type StoreProduct = {
  id?: string | number
  slug: string
  name: string
  flavor: string
  imageUrl: string | null
  images: StoreProductImage[]
  sizes: StoreProductSize[]
  tags: string[]
  ingredients: string
  description: string
  usage: string
  default_youtube_id?: string | null
  primaryKeyword?: string
  secondaryKeywords: string[]
  bestFor: string[]
  faqs: StoreProductFaq[]
  raw?: any
}

export type ProductImageVariant = 'thumbnail' | 'medium' | 'full' | 'default'

const DEFAULT_API_URL = 'http://localhost:8080/api'
const PRODUCTS_REVALIDATE_SECONDS = Number(process.env.PRODUCTS_REVALIDATE_SECONDS || 60)

const productFetchOptions = {
  next: { revalidate: PRODUCTS_REVALIDATE_SECONDS },
} as const

export function getApiUrl() {
  const value =
    process.env.PRODUCTS_API_URL ||
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_API_URL

  return value.replace(/\/+$/, '')
}

function getApiAssetBase() {
  const explicit =
    process.env.API_ASSET_URL ||
    process.env.NEXT_PUBLIC_API_ASSET_URL

  return explicit ? explicit.replace(/\/+$/, '') : ''
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item
        if (item && typeof item === 'object') {
          const record = item as Record<string, any>
          return record.name || record.label || record.title || record.value || record.tag || ''
        }
        return ''
      })
      .map((item) => String(item).trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return []

    return trimmed
      .replace(/^\{|\}$/g, '')
      .split(',')
      .map((item) => item.replace(/^"|"$/g, '').trim())
      .filter(Boolean)
  }

  return []
}

function normalizePrice(value: unknown) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.]/g, ''))
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

function normalizeBoolean(value: unknown, fallback = true) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value > 0
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (['false', '0', 'no', 'out', 'out-of-stock', 'out_of_stock', 'unavailable'].includes(normalized)) return false
    if (['true', '1', 'yes', 'in', 'in-stock', 'in_stock', 'available'].includes(normalized)) return true
  }
  return fallback
}

function positionValue(value: any) {
  const parsed = Number(value?.position ?? value?.sort_order ?? value?.order ?? 0)
  return Number.isFinite(parsed) ? parsed : 0
}

export function isBadProductImageValue(value: unknown): boolean {
  if (!value || typeof value !== 'string') return true

  const raw = value.trim()
  const lower = raw.toLowerCase()

  return (
    !raw ||
    raw === '[object Object]' ||
    lower === 'undefined' ||
    lower === 'null' ||
    lower.includes('placeholder.svg') ||
    raw.startsWith('blob:') ||
    raw.startsWith('data:')
  )
}

export function normalizeApiImageUrl(value: unknown): string | null {
  if (isBadProductImageValue(value)) return null

  const raw = String(value).trim()

  if (/^https?:\/\//i.test(raw)) return raw

  const assetBase = getApiAssetBase()
  if (assetBase && raw.startsWith('/')) return `${assetBase}${raw}`
  if (assetBase) return `${assetBase}/${raw.replace(/^\/+/, '')}`

  // Avoid rendering broken relative product image paths. Product images should come from Cloudinary/full API URLs.
  return null
}

function normalizeImageRecord(image: any): StoreProductImage | null {
  const imageUrl = typeof image === 'string'
    ? normalizeApiImageUrl(image)
    : normalizeApiImageUrl(
        image?.image_url ||
        image?.secure_url ||
        image?.imageUrl ||
        image?.url ||
        image?.src ||
        image?.path ||
        image?.file_path
      )

  if (!imageUrl) return null

  const thumbnailUrl = typeof image === 'object'
    ? normalizeApiImageUrl(image?.thumbnail_url || image?.thumbnailUrl || image?.thumb_url || image?.thumbUrl || image?.thumbnail)
    : null

  const mediumUrl = typeof image === 'object'
    ? normalizeApiImageUrl(image?.medium_url || image?.mediumUrl || image?.display_url || image?.displayUrl || image?.optimized_url || image?.optimizedUrl)
    : null

  const fullUrl = typeof image === 'object'
    ? normalizeApiImageUrl(image?.full_url || image?.fullUrl || image?.original_url || image?.originalUrl || image?.large_url || image?.largeUrl || image?.secure_url)
    : null

  return {
    id: typeof image === 'object' ? image?.id : undefined,
    image_url: imageUrl,
    thumbnail_url: thumbnailUrl || imageUrl,
    medium_url: mediumUrl || imageUrl,
    full_url: fullUrl || imageUrl,
    alt_text: typeof image === 'object' ? image?.alt_text || image?.altText || image?.alt || null : null,
    position: typeof image === 'object' ? positionValue(image) : 0,
  }
}

function normalizeApiImages(product: any): StoreProductImage[] {
  const imageRecords: StoreProductImage[] = []

  if (Array.isArray(product?.images)) {
    for (const image of product.images) {
      const normalized = normalizeImageRecord(image)
      if (normalized) imageRecords.push(normalized)
    }
  }

  const directCandidates = [
    product?.image_url,
    product?.secure_url,
    product?.imageUrl,
    product?.image,
    product?.thumbnail,
    product?.thumbnail_url,
    product?.main_image,
    product?.featured_image,
  ]

  directCandidates.forEach((candidate, index) => {
    const imageUrl = normalizeApiImageUrl(candidate)
    if (imageUrl && !imageRecords.some((image) => image.image_url === imageUrl)) {
      imageRecords.push({
        image_url: imageUrl,
        thumbnail_url: imageUrl,
        medium_url: imageUrl,
        full_url: imageUrl,
        position: index,
      })
    }
  })

  return imageRecords
    .filter((image, index, list) => list.findIndex((item) => item.image_url === image.image_url) === index)
    .sort((a: StoreProductImage, b: StoreProductImage) => (a.position ?? 0) - (b.position ?? 0))
}

function normalizeSizeImages(size: any): StoreProductSizeImage[] {
  const rawImages =
    Array.isArray(size?.size_images) ? size.size_images :
    Array.isArray(size?.images) ? size.images :
    []

  return rawImages
    .map(normalizeImageRecord)
    .filter(Boolean)
    .sort((a: StoreProductSizeImage, b: StoreProductSizeImage) => (a.position ?? 0) - (b.position ?? 0)) as StoreProductSizeImage[]
}

function normalizeSizes(product: any): StoreProductSize[] {
  const rawSizes = Array.isArray(product?.sizes) ? product.sizes : []
  const sizes = rawSizes
    .map((size: any): StoreProductSize => {
      const label = size?.size || size?.label || size?.name || size?.weight || size?.variant || 'Jar'
      const price = normalizePrice(size?.price ?? size?.sale_price ?? size?.amount)
      const stock = normalizeBoolean(
        size?.in_stock ?? size?.inStock ?? size?.available ?? size?.is_available ?? product?.in_stock,
        true
      )

      return {
        id: size?.id,
        size: String(label),
        price,
        in_stock: stock,
        inStock: stock,
        size_youtube_id: size?.size_youtube_id || size?.youtube_id || null,
        size_images: normalizeSizeImages(size),
      }
    })
    .filter((size: StoreProductSize) => size.price > 0 || size.size)

  if (sizes.length > 0) {
    return sizes.sort((a: StoreProductSize, b: StoreProductSize) => a.price - b.price)
  }

  const price = normalizePrice(product?.price ?? product?.starting_price ?? product?.amount)
  if (price > 0) {
    const stock = normalizeBoolean(product?.in_stock ?? product?.inStock ?? product?.available, true)
    return [
      {
        size: String(product?.size || product?.weight || 'Jar'),
        price,
        in_stock: stock,
        inStock: stock,
        size_images: [],
      },
    ]
  }

  return []
}

function defaultFaqs(productName: string): StoreProductFaq[] {
  return [
    {
      question: `How do I order ${productName}?`,
      answer: 'Choose a jar size, add it to the basket and checkout on the website. WhatsApp is available if you want to ask a quick question first.',
    },
    {
      question: 'Does this product contain peanuts?',
      answer: 'Yes. Kurkees peanut butter products contain peanuts and are not suitable for people with peanut allergy.',
    },
  ]
}

export function normalizeApiProduct(product: any): StoreProduct | null {
  if (!product || typeof product !== 'object') return null

  const name = String(product.name || product.title || product.product_name || '').trim()
  const slug = String(product.slug || product.handle || product.url_slug || (name ? slugify(name) : '')).trim()
  if (!name || !slug) return null

  const images = normalizeApiImages(product)
  const imageUrl = images[0]?.medium_url || images[0]?.image_url || null
  const sizes = normalizeSizes(product)
  const tags = normalizeArray(product.tags || product.labels || product.categories || product.badges)
  const bestFor = normalizeArray(product.bestFor || product.best_for || product.uses || product.use_cases)
  const secondaryKeywords = normalizeArray(product.secondaryKeywords || product.secondary_keywords)
  const rawFaqs = Array.isArray(product.faqs) ? product.faqs : []
  const faqs = rawFaqs
    .map((faq: any) => ({
      question: String(faq?.question || faq?.q || '').trim(),
      answer: String(faq?.answer || faq?.a || '').trim(),
    }))
    .filter((faq: StoreProductFaq) => faq.question && faq.answer)

  return {
    id: product.id || product._id,
    slug,
    name,
    flavor: String(product.flavor || product.variant || product.category || product.type || name).trim(),
    imageUrl,
    images,
    sizes,
    tags,
    ingredients: String(product.ingredients || product.ingredient_list || 'See product label for ingredients.').trim(),
    description: String(product.description || product.short_description || product.summary || `${name} from Kurkees.`).trim(),
    usage: String(product.usage || product.how_to_use || 'Use with bread, roti, oats, smoothies, fruit or snacks.').trim(),
    default_youtube_id: product.default_youtube_id || product.youtube_id || null,
    primaryKeyword: product.primaryKeyword || product.primary_keyword,
    secondaryKeywords,
    bestFor: bestFor.length ? bestFor : ['Breakfast', 'Snacks', 'Smoothies', 'Everyday use'],
    faqs: faqs.length ? faqs : defaultFaqs(name),
    raw: product,
  }
}

function unwrapProductList(json: any) {
  if (Array.isArray(json)) return json
  if (Array.isArray(json?.data)) return json.data
  if (Array.isArray(json?.products)) return json.products
  if (Array.isArray(json?.items)) return json.items
  return []
}

export async function getApiProducts(): Promise<StoreProduct[]> {
  try {
    const res = await fetch(`${getApiUrl()}/products`, productFetchOptions)
    if (!res.ok) throw new Error(`Products API returned ${res.status}`)
    const json = await res.json()
    return unwrapProductList(json)
      .map(normalizeApiProduct)
      .filter(Boolean) as StoreProduct[]
  } catch (error) {
    console.error('Failed to load products from backend API at', `${getApiUrl()}/products`, error)
    return []
  }
}

export async function getApiProduct(slug: string): Promise<StoreProduct | null> {
  try {
    const res = await fetch(`${getApiUrl()}/products/${encodeURIComponent(slug)}`, productFetchOptions)
    if (res.ok) {
      const json = await res.json()
      const product = normalizeApiProduct(json?.data || json?.product || json)
      if (product) return product
    }

    if (res.status !== 404) {
      console.error(`Products API detail endpoint returned ${res.status} for ${slug}`)
    }
  } catch (error) {
    console.error(`Failed to load product ${slug} from backend API detail endpoint:`, error)
  }

  const products = await getApiProducts()
  return products.find((product) => product.slug === slug || String(product.id) === slug) || null
}

export function getImageVariantUrl(image: StoreProductImage | any, variant: ProductImageVariant = 'default'): string | null {
  if (!image) return null

  const normalized = normalizeImageRecord(image)
  if (!normalized) return null

  if (variant === 'thumbnail') return normalizeApiImageUrl(normalized.thumbnail_url) || normalized.image_url
  if (variant === 'medium') return normalizeApiImageUrl(normalized.medium_url) || normalized.image_url
  if (variant === 'full') return normalizeApiImageUrl(normalized.full_url) || normalized.image_url
  return normalized.image_url
}

export function getApiProductImage(product: StoreProduct | any, variant: ProductImageVariant = 'default'): string | null {
  if (!product) return null

  if (Array.isArray(product.images) && product.images.length > 0) {
    const fromImages = getImageVariantUrl(product.images[0], variant)
    if (fromImages) return fromImages
  }

  if (product?.imageUrl) return normalizeApiImageUrl(product.imageUrl)

  return null
}

export function getStartingPrice(product: Pick<StoreProduct, 'sizes'> | any) {
  const prices = (product?.sizes || [])
    .map((size: any) => normalizePrice(size?.price))
    .filter((price: number) => price > 0)
  return prices.length ? Math.min(...prices) : 0
}

export function isSizeInStock(size: StoreProductSize | any) {
  if (!size) return false
  return normalizeBoolean(size.in_stock ?? size.inStock ?? size.available, true)
}

export function getInStockSizes(product: Pick<StoreProduct, 'sizes'> | any) {
  return (product?.sizes || []).filter((size: StoreProductSize | any) => isSizeInStock(size))
}

export function absoluteProductImageUrl(product: StoreProduct | any, siteUrl: string) {
  const imageUrl = getApiProductImage(product, 'full') || getApiProductImage(product, 'medium') || getApiProductImage(product)
  if (!imageUrl) return undefined
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl
  return `${siteUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`
}
