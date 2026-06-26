'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { getApiProductImage, getStartingPrice, type StoreProduct } from '@/lib/api-products'
import { featuredCollectionLinks } from '@/lib/collections'
import { cn } from '@/lib/utils'

type Sort = 'featured' | 'price-low' | 'price-high' | 'name'

const chooser = [
  {
    title: 'Smooth',
    text: 'Easy spreading for bread, roti, oats and smoothies.',
  },
  {
    title: 'Crunchy',
    text: 'Roasted peanut pieces for people who want texture.',
  },
  {
    title: 'Pure',
    text: 'Simple unsalted, unsweetened jar made with roasted peanuts only.',
  },
  {
    title: 'Chocolate',
    text: 'A sweeter chocolate peanut spread for snack moments.',
  },
]

const faqs = [
  {
    q: 'Where can I see current prices?',
    a: 'You can compare the starting price on each product card and see exact jar-size prices on the product page.',
  },
  {
    q: 'Can I order online?',
    a: 'Yes. Open a product, choose the jar size, add it to the basket and checkout on the website. WhatsApp is available if you want to ask something first.',
  },
  {
    q: 'Do you have sugar-free options?',
    a: 'Yes. Kurkees has salted sugar-free jars and an unsalted sugar-free smooth jar made with roasted peanuts only.',
  },
  {
    q: 'Is oil separation normal?',
    a: 'Yes. Natural peanut spreads can separate because peanut oil rises to the top. Stir well before use.',
  },
]


function buildFlavorFilters(products: StoreProduct[]) {
  const values = new Set<string>()

  for (const product of products) {
    if (product.flavor) values.add(product.flavor)
    for (const tag of product.tags || []) values.add(tag)
  }

  const preferred = ['Classic', 'Sugar-Free', 'Unsalted', 'Nai Miris', 'Chocofeda', 'Smooth', 'Crunchy']
  const ordered = preferred.filter((item) => values.has(item))
  const rest = [...values]
    .filter((item) => !preferred.includes(item))
    .sort((a: string, b: string) => a.localeCompare(b))

  return ['All', ...ordered, ...rest].slice(0, 10)
}

function productMatchesFilter(product: StoreProduct, filter: string) {
  if (filter === 'All') return true
  return product.flavor === filter || product.tags.includes(filter)
}



function FloatingProductImage({ product, className, eager = false }: { product: StoreProduct; className: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  const src = getApiProductImage(product, 'medium') || getApiProductImage(product)

  if (!src || failed) return null

  return (
    <img
      src={src}
      alt={`${product.name} jar`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`absolute drop-shadow-2xl ${className}`}
    />
  )
}

export function ProductsClient({ initialProducts }: { initialProducts: StoreProduct[] }) {
  const [flavor, setFlavor] = useState('All')
  const [sort, setSort] = useState<Sort>('featured')
  const flavorFilters = useMemo(() => buildFlavorFilters(initialProducts), [initialProducts])

  const filtered = useMemo(() => {
    let list = initialProducts.filter((p) => {
      if (flavor === 'All') return true
      return productMatchesFilter(p, flavor)
    })

    list = [...list]

    if (sort === 'price-low') list.sort((a: StoreProduct, b: StoreProduct) => getStartingPrice(a) - getStartingPrice(b))
    if (sort === 'price-high') list.sort((a: StoreProduct, b: StoreProduct) => getStartingPrice(b) - getStartingPrice(a))
    if (sort === 'name') list.sort((a: StoreProduct, b: StoreProduct) => a.name.localeCompare(b.name))
    return list
  }, [flavor, sort, initialProducts])

  return (
    <main className="kurkees-page overflow-hidden">
      <section className="relative overflow-hidden bg-white py-10 sm:py-20">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[var(--brand-yellow)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10 text-center lg:text-left">
            <span className="brand-kicker">Kurkees product shelf</span>
            <h1 className="brand-headline mt-5 text-4xl leading-[0.92] sm:text-7xl lg:text-8xl">
              Choose the jar that fits your day.
            </h1>
            <p className="brand-copy mx-auto mt-5 max-w-xl text-base sm:mt-6 sm:text-lg lg:mx-0">
              Compare flavours, sizes and prices. Add your jar to the basket and checkout online; WhatsApp is only there for quick questions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
              <Link href="#price-list" className="brand-button-primary">
                Choose products <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/94777278378?text=Hi%20Kurkees%2C%20I%20have%20a%20quick%20question%20before%20ordering%20from%20the%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="brand-button-secondary"
              >
                <MessageCircle className="h-5 w-5" /> Ask a question
              </a>
            </div>
          </div>

          <div className="relative z-10 hidden min-h-[320px] sm:block lg:min-h-[420px]">
            <div className="absolute inset-x-8 bottom-8 h-14 rounded-full bg-black/15 blur-xl" />
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-blue)]" />
            {initialProducts.slice(0, 4).map((product, index) => {
              const positions = [
                'left-[28%] top-[2%] z-30 w-[40%] rotate-[-6deg]',
                'right-[4%] top-[21%] z-20 w-[31%] rotate-[10deg]',
                'left-[2%] top-[25%] z-20 w-[31%] rotate-[-12deg]',
                'right-[26%] bottom-[4%] z-10 w-[27%] rotate-[5deg]',
              ]
              return (
                <FloatingProductImage
                  key={product.slug}
                  product={product}
                  eager={index === 0}
                  className={positions[index]}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section id="price-list" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="brand-panel p-4 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="brand-chip">Filter the shelf</span>
              <p className="mt-3 font-sans text-sm font-semibold text-stone-600">{filtered.length} {filtered.length === 1 ? 'jar' : 'jars'} shown</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {flavorFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFlavor(f)}
                  className={cn(
                    'rounded-full px-3 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] transition-all sm:px-4 sm:text-xs',
                    flavor === f
                      ? 'bg-[var(--brand-red)] text-white shadow-[0_3px_0_var(--brand-brown)]'
                      : 'bg-[var(--brand-white)] text-stone-600 hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-brown)]'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 font-sans text-sm font-bold text-stone-700">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border-2 border-[var(--brand-brown)]/12 bg-white px-4 py-2 font-sans text-xs font-bold outline-none focus:border-[var(--brand-red)]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center font-heading text-2xl font-bold text-stone-400">
            No jars found under this filter. Try another choice.
          </p>
        )}
      </section>

      <section className="section-blue py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white/16 px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-white">Quick chooser</span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-none text-white sm:text-6xl">Which jar should you choose?</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {chooser.map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-6 text-[var(--brand-brown)] shadow-[0_8px_0_rgba(74,44,8,.18)]">
                <h3 className="font-heading text-3xl font-bold leading-none">{item.title}</h3>
                <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-yellow py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="rounded-full bg-white px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-brown)]">Helpful guides</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-none text-[var(--brand-brown)] sm:text-6xl">Choose by taste or need</h2>
            </div>
            <Link href="/collections" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-base font-bold text-[var(--brand-brown)] transition-transform hover:-translate-y-1">
              View all guides <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCollectionLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.5rem] bg-white p-5 shadow-[0_6px_0_rgba(74,44,8,.14)] transition-transform hover:-translate-y-1"
              >
                <span className="font-heading text-xl font-bold leading-none text-[var(--brand-brown)]">{item.label}</span>
                <span className="mt-2 flex items-center gap-1 font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--brand-red)]">View guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="brand-kicker">Ordering FAQ</span>
            <h2 className="brand-headline mt-5 text-4xl leading-none sm:text-6xl">Simple answers before checkout</h2>
          </div>
          <div className="mt-10 divide-y divide-[var(--brand-brown)]/10 rounded-[2rem] border border-[var(--brand-brown)]/10 bg-white p-6 shadow-[0_10px_0_rgba(74,44,8,.1)]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-5 first:pt-0 last:pb-0">
                <h3 className="font-heading text-2xl font-bold text-[var(--brand-brown)]">{faq.q}</h3>
                <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
