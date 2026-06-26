import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getApiProductImage, type StoreProduct } from '@/lib/api-products'

function searchText(product: StoreProduct) {
  return [product.slug, product.name, product.flavor, product.description, product.ingredients, ...(product.tags || [])]
    .join(' ')
    .toLowerCase()
}

function findProduct(products: StoreProduct[], terms: string[], usedSlugs: Set<string>) {
  return products.find((product) => {
    if (usedSlugs.has(product.slug)) return false
    const text = searchText(product)
    return terms.some((term) => text.includes(term))
  })
}

function getVisualProducts(products: StoreProduct[]) {
  const usedSlugs = new Set<string>()
  const picks: StoreProduct[] = []

  const addPick = (product?: StoreProduct) => {
    if (!product || usedSlugs.has(product.slug)) return
    picks.push(product)
    usedSlugs.add(product.slug)
  }

  addPick(findProduct(products, ['smooth'], usedSlugs))
  addPick(findProduct(products, ['crunchy'], usedSlugs))
  addPick(findProduct(products, ['unsalted', 'pure', 'sugar-free', 'sugar free', 'no added sugar'], usedSlugs))
  addPick(findProduct(products, ['chocofeda', 'chocolate', 'cocoa'], usedSlugs))

  for (const product of products) addPick(product)

  return picks
}

function getVisualImage(product: StoreProduct, variant: 'thumbnail' | 'medium' = 'medium') {
  return getApiProductImage(product, variant) || getApiProductImage(product, 'thumbnail') || getApiProductImage(product)
}

function getSizedCloudinaryUrl(url: string, width: number) {
  if (!/^https:\/\/res\.cloudinary\.com\//i.test(url) || !url.includes('/image/upload/')) return url

  const marker = '/image/upload/'
  const [prefix, rest] = url.split(marker)
  const parts = rest.split('/')
  const firstSegment = parts[0] || ''
  const hasTransform = firstSegment.includes(',') || firstSegment.includes('w_') || firstSegment.includes('q_') || firstSegment.includes('f_') || firstSegment.includes('c_')
  const publicPath = hasTransform ? parts.slice(1).join('/') : rest

  return `${prefix}${marker}c_fit,w_${width},q_auto:good,f_auto/${publicPath}`
}

function buildCloudinarySrcSet(url: string, widths: number[]) {
  if (!/^https:\/\/res\.cloudinary\.com\//i.test(url)) return undefined
  return widths.map((width) => `${getSizedCloudinaryUrl(url, width)} ${width}w`).join(', ')
}

function getResponsiveVisualImage(product: StoreProduct, maxWidth = 384) {
  const imageUrl = getVisualImage(product, 'medium')
  if (!imageUrl) return null

  const widths = [160, 240, 320, maxWidth]
    .filter((width, index, list) => width <= maxWidth && list.indexOf(width) === index)

  return {
    src: getSizedCloudinaryUrl(imageUrl, maxWidth),
    srcSet: buildCloudinarySrcSet(imageUrl, widths),
  }
}

function ProductJarVisual({
  product,
  className,
  eager = false,
  maxWidth = 384,
  sizes = '(max-width: 640px) 44vw, 220px',
}: {
  product: StoreProduct
  className: string
  eager?: boolean
  maxWidth?: number
  sizes?: string
}) {
  const image = getResponsiveVisualImage(product, maxWidth)
  if (!image) return null

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={`${product.name} jar`}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      className={className}
    />
  )
}

export function ProductJarCluster({ products = [], className = '' }: { products?: StoreProduct[]; className?: string }) {
  const visualProducts = getVisualProducts(products).slice(0, 4)

  return (
    <div className={`relative mx-auto aspect-[1.02] w-full max-w-[520px] ${className}`}>
      <div className="absolute inset-x-8 bottom-2 h-14 rounded-full bg-black/15 blur-xl" />
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-yellow)]" />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
      <div className="spread-swoosh -left-12 top-20 hidden sm:block" />
      {visualProducts.map((product, index) => {
        const positions = [
          'left-[28%] top-[8%] z-30 w-[43%] rotate-[-5deg]',
          'right-[5%] top-[22%] z-20 w-[33%] rotate-[9deg]',
          'left-[3%] top-[28%] z-20 w-[32%] rotate-[-11deg]',
          'right-[20%] bottom-[2%] z-10 w-[28%] rotate-[7deg]',
        ]
        return (
          <ProductJarVisual
            key={product.slug}
            product={product}
            eager={index === 0}
            maxWidth={384}
            sizes="(max-width: 640px) 43vw, 224px"
            className={`absolute h-auto drop-shadow-2xl ${positions[index]}`}
          />
        )
      })}
      <span className="absolute right-3 top-4 z-40 rounded-full bg-[var(--brand-red)] px-5 py-3 font-heading text-lg font-bold text-white shadow-lg rotate-[6deg]">
        fresh jars
      </span>
      <span className="absolute bottom-10 left-0 z-40 rounded-full bg-[var(--brand-blue)] px-5 py-2 font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-lg -rotate-[7deg]">
        local peanuts
      </span>
    </div>
  )
}

export function FoodMomentMosaic({ products = [] }: { products?: StoreProduct[] }) {
  const visualProducts = getVisualProducts(products)
  const moments = [
    {
      title: 'Spread it thick',
      text: 'Bread, roti, pancakes and school snacks.',
      product: visualProducts[0],
      bg: 'bg-[var(--brand-yellow)]',
      textColor: 'text-[var(--brand-brown)]',
    },
    {
      title: 'Blend it smooth',
      text: 'Banana, milk, oats and gym smoothies.',
      product: visualProducts[2] || visualProducts[0],
      bg: 'bg-[var(--brand-blue)]',
      textColor: 'text-white',
    },
    {
      title: 'Make it fun',
      text: 'Chocolate peanut spread for a treat moment.',
      product: visualProducts[3] || visualProducts[1] || visualProducts[0],
      bg: 'bg-[var(--brand-red)]',
      textColor: 'text-white',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {moments.map((moment, index) => {
        const image = moment.product ? getResponsiveVisualImage(moment.product, 320) : null
        return (
          <div key={moment.title} className={`relative min-h-[250px] overflow-hidden rounded-[2rem] p-5 shadow-[0_10px_0_rgba(74,44,8,.12)] sm:min-h-[290px] sm:p-6 ${moment.bg} ${moment.textColor}`}>
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/20" />
            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/15" />
            <div className="relative z-10 max-w-[12rem]">
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-80">0{index + 1}</span>
              <h3 className="mt-2 font-heading text-3xl font-bold leading-none">{moment.title}</h3>
              <p className="mt-3 font-sans text-sm font-semibold leading-relaxed opacity-85">{moment.text}</p>
            </div>
            {image && moment.product && (
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(max-width: 640px) 44vw, 170px"
                alt={`${moment.product.name} jar`}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-10 right-0 h-auto w-[44%] max-w-[170px] rotate-[8deg] drop-shadow-2xl sm:w-[48%] md:w-[58%]"
              />
            )}
            <svg className="absolute bottom-8 left-8 h-20 w-28 opacity-40" viewBox="0 0 120 80" fill="none" aria-hidden="true">
              <path d="M12 50C27 18 76 11 106 34" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              <path d="M20 61C43 39 78 37 101 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export function ProductStrip({ products = [] }: { products?: StoreProduct[] }) {
  const stripProducts = products.slice(0, 6)

  if (stripProducts.length === 0) return null

  return (
    <div className="relative overflow-hidden bg-[var(--brand-brown)] py-4 text-white">
      <div className="flex min-w-max animate-none items-center gap-3 overflow-x-auto px-4 pb-1 font-heading text-base font-bold sm:justify-center sm:gap-5 sm:overflow-visible sm:pb-0 sm:text-lg">
        {stripProducts.map((product) => {
          const image = getResponsiveVisualImage(product, 96)
          return (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 transition-colors hover:bg-white/18">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                {image ? (
                  <img src={image.src} srcSet={image.srcSet} sizes="40px" alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-1" />
                ) : (
                  <span className="font-heading text-xs font-bold text-[var(--brand-brown)]">K</span>
                )}
              </span>
              <span className="max-w-[9rem] truncate sm:max-w-none">{product.flavor}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}


export function ProductJarStack({ products = [], className = '' }: { products?: StoreProduct[]; className?: string }) {
  const visualProducts = getVisualProducts(products).slice(0, 3)

  if (visualProducts.length === 0) return null

  return (
    <div className={`relative mx-auto min-h-[280px] w-full max-w-[460px] sm:min-h-[330px] ${className}`}>
      <div className="absolute inset-x-10 bottom-0 h-16 rounded-full bg-black/30 blur-xl" />
      {visualProducts.map((product, index) => {
        const positions = [
          'right-[7%] top-0 z-20 w-[38%] rotate-[9deg]',
          'left-[9%] top-[8%] z-30 w-[46%] -rotate-[8deg]',
          'bottom-0 left-1/2 z-10 w-[34%] -translate-x-1/2 rotate-[3deg]',
        ]
        return (
          <ProductJarVisual
            key={product.slug}
            product={product}
            maxWidth={360}
            sizes="(max-width: 640px) 46vw, 212px"
            className={`absolute h-auto drop-shadow-2xl ${positions[index]}`}
          />
        )
      })}
    </div>
  )
}

export function PeanutPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 220" fill="none" aria-hidden="true">
      <g opacity="0.16" stroke="currentColor" strokeWidth="9" strokeLinecap="round">
        <path d="M66 58c30-31 68 4 39 39-28 34-72 4-39-39Z" />
        <path d="M172 144c28-31 71 2 43 39-29 37-75 1-43-39Z" />
        <path d="M286 66c29-28 65 4 39 37-27 34-69 4-39-37Z" />
        <path d="M405 142c28-31 72 2 43 39-28 38-76 3-43-39Z" />
      </g>
    </svg>
  )
}
