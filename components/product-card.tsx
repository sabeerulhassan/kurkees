'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ImageOff } from 'lucide-react'
import {
  getApiProductImage,
  getStartingPrice,
  isSizeInStock,
  type StoreProduct,
} from '@/lib/api-products'

function ProductImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-stone-50 px-6 text-center font-sans text-xs font-semibold text-stone-400 sm:text-sm">
        <ImageOff className="h-5 w-5" />
        <span>Product photo</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.015]"
    />
  )
}

export function ProductCard({ product }: { product: StoreProduct }) {
  const startingPrice = getStartingPrice(product)
  const imageUrl = getApiProductImage(product, 'thumbnail') || getApiProductImage(product, 'medium')
  const hasStock = product.sizes.some((size) => isSizeInStock(size))
  const visibleSizes = product.sizes.slice(0, 3)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-square">
        <ProductImage src={imageUrl} alt={`${product.name} jar`} />

        <div className="absolute right-2 top-2 rounded-full border border-stone-200 bg-white/95 px-2.5 py-1 font-sans text-[10px] font-bold text-stone-700 shadow-sm sm:right-3 sm:top-3 sm:text-[11px]">
          {hasStock ? 'In stock' : 'Out of stock'}
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-stone-100 p-4 sm:p-5">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-stone-400 sm:text-xs">
          {product.flavor}
        </p>

        <h3 className="mt-2 font-heading text-xl font-bold leading-tight text-[var(--brand-brown)] sm:text-2xl">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-stone-600 sm:mt-3">
          {product.description}
        </p>

        {visibleSizes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {visibleSizes.map((size) => (
              <span
                key={`${size.size}-${size.price}`}
                className="rounded-full border border-stone-200 bg-white px-2.5 py-1 font-sans text-[11px] font-bold text-stone-600 sm:px-3 sm:text-xs"
              >
                {size.size}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-5 sm:pt-6">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400 sm:text-[11px]">From</p>
            <p className="font-heading text-xl font-bold text-[var(--brand-brown)] sm:text-2xl">
              {startingPrice > 0 ? `Rs. ${startingPrice.toLocaleString()}` : 'See price'}
            </p>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-red)] text-white transition-transform group-hover:translate-x-1 sm:h-10 sm:w-10">
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
