import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/data'

const tagColor: Record<string, string> = {
  'Best Seller': 'bg-amber-50 text-amber-800 border-amber-100',
  'Classic': 'bg-stone-100 text-stone-800 border-stone-200',
  'Sugar-Free': 'bg-orange-50 text-orange-800 border-orange-100',
  '100% Pure': 'bg-emerald-50 text-emerald-800 border-emerald-100',
  'Nai Miris': 'bg-red-50 text-red-800 border-red-100',
  'Chocofeda': 'bg-amber-50 text-amber-800 border-amber-100',
}

export function ProductCard({ product }: { product: any }) {
  const startingPrice = Math.min(...product.sizes.map((s: any) => s.price))
  const defaultImg = product.images?.[0]?.image_url || "/placeholder.svg";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[#faf9f6] border border-stone-100">
        <Image
          src={defaultImg}
          alt={`${product.name} - Kurkees`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {product.tags.slice(0, 2).map((tag: string) => (
          <span
            key={tag}
            className={`rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-bold ${
              tagColor[tag] ?? 'bg-stone-50 text-stone-600 border-stone-100'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="font-heading text-lg font-bold text-stone-900 line-clamp-1 leading-snug">
        {product.name}
      </h3>
      <p className="font-sans text-xs text-stone-500 mt-1 line-clamp-2">
        {product.flavor}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100 mt-4">
        <div className="flex flex-col">
          <span className="font-sans text-[9px] uppercase font-bold text-stone-400 tracking-wider">
            Starting from
          </span>
          <span className="font-heading text-base font-bold text-stone-900 mt-0.5">
            Rs. {startingPrice.toLocaleString()}
          </span>
        </div>
        
        <div className="rounded-full bg-amber-700 px-4 py-2 font-sans text-xs font-bold text-white transition-all hover:bg-amber-800 shadow-xs">
          View Details
        </div>
      </div>
    </Link>
  )
}