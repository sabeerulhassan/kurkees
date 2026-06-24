'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type Sort = 'featured' | 'price-low' | 'price-high' | 'name'

const flavorFilters = [
  'All', 'Classic', 'Sugar-Free', 'Unsalted', 'Nai Miris', 'Chocofeda'
]

export function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [flavor, setFlavor] = useState('All')
  const [sort, setSort] = useState<Sort>('featured')

  const filtered = useMemo(() => {
    let list = initialProducts.filter((p) => {
      if (flavor === 'All') return true
      return p.tags.includes(flavor)
    })

    list = [...list]

    if (sort === 'price-low') {
      list.sort((a, b) => {
        const minA = Math.min(...a.sizes.map((s: any) => s.price))
        const minB = Math.min(...b.sizes.map((s: any) => s.price))
        return minA - minB
      })
    }
    if (sort === 'price-high') {
      list.sort((a, b) => {
        const minA = Math.min(...a.sizes.map((s: any) => s.price))
        const minB = Math.min(...b.sizes.map((s: any) => s.price))
        return minB - minA
      })
    }
    if (sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [flavor, sort, initialProducts])

  return (
    <main className="overflow-hidden bg-[#faf9f6]">
      {/* Header - Refined to crisp alabaster */}
      <section className="relative border-b border-stone-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-balance font-heading text-4xl font-bold text-stone-900 sm:text-6xl">
            Our Jars
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base text-stone-500">
            Freshly ground in Sri Lanka. Select your preferred flavor profile to find your jar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Filter / sort bar */}
        <div className="flex flex-col gap-5 rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex flex-wrap gap-2">
            {flavorFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlavor(f)}
                className={cn(
                  'rounded-full px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-all',
                  flavor === f
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-stone-50 border border-stone-150 text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-stone-100 pt-4">
            <p className="font-sans text-xs font-bold text-stone-400 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? 'jar' : 'jars'} found
            </p>
            <label className="flex items-center gap-2 font-sans text-sm font-bold text-stone-700">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-stone-200 bg-white px-4 py-1.5 font-sans text-xs font-bold outline-none focus:border-amber-600 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
        </div>

        {/* Grid Display */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center font-heading text-xl font-bold text-stone-400">
            No jars found under this filter. Try another choice!
          </p>
        )}
      </section>
    </main>
  )
}