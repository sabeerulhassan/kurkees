import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  getApiProductImage,
  getStartingPrice,
  isSizeInStock,
  type StoreProduct,
} from '@/lib/api-products'

const tagColor: Record<string, string> = {
  'Best Seller': 'bg-[var(--brand-red)] text-white',
  Classic: 'bg-[var(--brand-yellow)] text-[var(--brand-brown)]',
  'Sugar-Free': 'bg-emerald-100 text-emerald-900',
  '100% Pure': 'bg-white text-[var(--brand-brown)]',
  'Nai Miris': 'bg-[var(--brand-red)] text-white',
  Chocofeda: 'bg-[var(--brand-brown)] text-white',
  Smooth: 'bg-[var(--brand-blue)] text-white',
  Crunchy: 'bg-[var(--brand-yellow)] text-[var(--brand-brown)]',
}

export function ProductCard({ product }: { product: StoreProduct }) {
  const startingPrice = getStartingPrice(product)
  const imageUrl = getApiProductImage(product)
  const hasStock = product.sizes.some((size: any) => isSizeInStock(size))
  const isChocolate = product.slug.includes('chocofeda')
  const isSpicy = product.slug.includes('nai-miris')
  const backgroundClass = isChocolate
    ? 'bg-[linear-gradient(135deg,#fff7ed,#fde68a,#f4c7a1)]'
    : isSpicy
      ? 'bg-[linear-gradient(135deg,#fff7ed,#fecaca,#fbbf24)]'
      : 'bg-[linear-gradient(135deg,#f8fdff,#d7f3ff,#ffffff)]'

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-[2rem] border border-[var(--brand-brown)]/12 bg-white shadow-[0_8px_0_rgba(74,44,8,.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_0_rgba(74,44,8,.14)]"
    >
      <div className={`relative flex h-[305px] items-center justify-center overflow-hidden ${backgroundClass} p-5 sm:h-[330px]`}>
        <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/55" />
        <div className="absolute -right-14 -top-12 h-40 w-40 rounded-full bg-[var(--brand-yellow)]/45" />
        <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-brown)] shadow-sm backdrop-blur">
          {product.flavor}
        </div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${product.name} jar`}
            loading="lazy"
            decoding="async"
            className="relative z-10 h-[92%] w-[92%] object-contain drop-shadow-[0_18px_28px_rgba(74,44,8,.22)] transition-transform duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="relative z-10 flex h-[76%] w-[76%] items-center justify-center rounded-[1.5rem] border-2 border-dashed border-[var(--brand-brown)]/20 bg-white/70 p-6 text-center font-heading text-xl font-bold text-[var(--brand-brown)]/60">
            Product image coming from API
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {product.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 font-sans text-[10px] font-extrabold uppercase tracking-[0.12em] ${
                  tagColor[tag] ?? 'bg-stone-100 text-stone-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-heading text-2xl font-bold leading-[1.02] text-[var(--brand-brown)]">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-2 font-sans text-sm font-medium leading-relaxed text-stone-600">
          {product.description}
        </p>

        {product.sizes.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {product.sizes.map((size: any) => (
              <span
                key={size.size}
                className="rounded-full border border-[var(--brand-brown)]/10 bg-[var(--brand-white)] px-3 py-1 font-sans text-[11px] font-extrabold text-stone-700"
              >
                {size.size}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[var(--brand-brown)]/10 pt-5">
          <div>
            <span className="font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-stone-500">
              From
            </span>
            <p className="mt-0.5 font-heading text-2xl font-bold leading-none text-[var(--brand-brown)]">
              {startingPrice > 0 ? `Rs. ${startingPrice.toLocaleString()}` : 'Check price'}
            </p>
            <p className="mt-1 font-sans text-[11px] font-bold text-stone-500">
              {hasStock ? 'Available online' : 'Out of stock'}
            </p>
          </div>

          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--brand-red)] text-white shadow-[0_4px_0_var(--brand-brown)] transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
