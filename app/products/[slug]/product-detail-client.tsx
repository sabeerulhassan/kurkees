'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Ban,
  CheckCircle,
  CreditCard,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from 'lucide-react'
import { getApiProductImage, isSizeInStock, type StoreProduct } from '@/lib/api-products'
import { useCart } from '@/lib/cart-context'

export function ProductDetailClient({ product }: { product: StoreProduct }) {
  const router = useRouter()
  const { addToCart, setIsCartOpen } = useCart()

  const defaultSizeIndex = product.sizes.findIndex((size) => size.size === '340g' && isSizeInStock(size))
  const firstInStockIndex = product.sizes.findIndex((size) => isSizeInStock(size))
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    defaultSizeIndex !== -1 ? defaultSizeIndex : firstInStockIndex !== -1 ? firstInStockIndex : 0
  )
  const [quantity, setQuantity] = useState(1)

  const currentOption = product.sizes[selectedSizeIndex]
  const productImage = getApiProductImage(product)
  const currentInStock = isSizeInStock(currentOption)
  const isChocolate = product.slug.includes('chocofeda')
  const heroBg = isChocolate ? 'bg-[var(--brand-brown)]' : product.slug.includes('nai-miris') ? 'bg-[var(--brand-red)]' : 'bg-[var(--brand-blue)]'

  useEffect(() => {
    setQuantity(1)
  }, [selectedSizeIndex])

  const whatsappUrl = useMemo(() => {
    const whatsappNumber = '94777278378'
    const message = encodeURIComponent(
      `Hi Kurkees, I have a question about ${product.name} - ${currentOption?.size} before I order on the website.`
    )
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }, [currentOption?.size, product.name])

  const handleAddToCart = () => {
    if (!currentOption || !currentInStock) return

    addToCart(
      {
        slug: product.slug,
        name: product.name,
        size: currentOption.size,
        price: currentOption.price,
        image: productImage || '',
      },
      quantity
    )
    setIsCartOpen(true)
  }

  const handleBuyNow = () => {
    if (!currentOption || !currentInStock) return

    addToCart(
      {
        slug: product.slug,
        name: product.name,
        size: currentOption.size,
        price: currentOption.price,
        image: productImage || '',
      },
      quantity
    )
    router.push('/checkout')
  }

  return (
    <>
      <section className="grid gap-8 overflow-hidden rounded-[2.4rem] border border-[var(--brand-brown)]/10 bg-white shadow-[0_12px_0_rgba(74,44,8,.1)] lg:grid-cols-12">
        <div className={`relative min-h-[440px] overflow-hidden p-6 sm:p-8 lg:col-span-5 ${heroBg} text-white`}>
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/18" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[var(--brand-yellow)]/28" />
          <div className="absolute inset-x-12 bottom-10 h-16 rounded-full bg-black/25 blur-2xl" />
          {productImage ? (
            <img
              src={productImage}
              alt={`${product.name} jar`}
              loading="eager"
              decoding="async"
              className="absolute bottom-0 left-1/2 z-10 w-[72%] max-w-[360px] -translate-x-1/2 rotate-[4deg] drop-shadow-2xl"
            />
          ) : (
            <div className="absolute bottom-10 left-1/2 z-10 flex h-72 w-[72%] max-w-[360px] -translate-x-1/2 items-center justify-center rounded-[1.8rem] border-2 border-dashed border-white/35 bg-white/12 p-6 text-center font-heading text-2xl font-bold text-white/75">
              Product image loading from API
            </div>
          )}
          <div className="relative z-20 flex items-center justify-between">
            <span className="rounded-full bg-white/18 px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em]">
              {product.slug.includes('chocofeda') ? 'Chocofeda' : 'Kurkees'}
            </span>
            <span className="rounded-full bg-[var(--brand-yellow)] px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-brown)]">
              {currentInStock ? 'In stock' : 'Out'}
            </span>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="brand-chip">{tag}</span>
            ))}
          </div>

          <h1 className="brand-headline mt-5 text-4xl leading-[0.92] sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-3 font-heading text-2xl font-bold text-[var(--brand-red)]">
            {product.flavor}
          </p>

          <p className="brand-copy mt-5 text-base sm:text-lg">
            {product.description}
          </p>

          <div className="mt-7 grid gap-3 font-sans text-sm font-bold text-[var(--brand-brown)] sm:grid-cols-2">
            <div className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Ingredients: {product.ingredients}</div>
            <div className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Sizes: {product.sizes.map((size) => size.size).join(', ')}</div>
            <div className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Use with bread, roti, oats, smoothies and fruit</div>
            <div className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Contains peanuts. Avoid if allergic.</div>
          </div>

          <div className="mt-8 rounded-[1.6rem] bg-[var(--brand-white)] p-5">
            <label className="block font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-stone-500">
              Select jar size
            </label>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.sizes.map((option, idx) => {
                const isSelected = idx === selectedSizeIndex
                const optionInStock = isSizeInStock(option)
                return (
                  <button
                    key={option.size}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`rounded-full border-2 px-4 py-2.5 text-left font-heading text-sm font-bold transition-all ${
                      isSelected
                        ? 'border-[var(--brand-brown)] bg-[var(--brand-yellow)] text-[var(--brand-brown)] shadow-[0_3px_0_rgba(74,44,8,.22)]'
                        : 'border-[var(--brand-brown)]/12 bg-white text-stone-600 hover:border-[var(--brand-red)] hover:text-[var(--brand-brown)]'
                    } ${!optionInStock ? 'opacity-55' : ''}`}
                  >
                    {option.size}
                    <span className="ml-2 font-sans text-[11px] font-bold text-stone-500">
                      {optionInStock ? `Rs. ${option.price.toLocaleString()}` : 'Out'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--brand-brown)]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-stone-500">
                Price per jar
              </span>
              <p className="mt-1 font-heading text-4xl font-bold leading-none text-[var(--brand-brown)]">
                Rs. {currentOption?.price.toLocaleString()}
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-[var(--brand-yellow)] p-4 font-sans text-xs font-extrabold text-[var(--brand-brown)] shadow-[0_4px_0_rgba(74,44,8,.18)]">
              <Sparkles className="mr-1 inline h-3.5 w-3.5" /> First-time discount may apply at checkout.
            </div>
          </div>

          {currentInStock ? (
            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--brand-brown)]/10 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex h-12 items-center justify-between rounded-full border-2 border-[var(--brand-brown)]/12 bg-white px-4 shadow-sm sm:w-36">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="rounded-full p-1 text-stone-500 transition-colors hover:text-[var(--brand-brown)]" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-sans text-sm font-extrabold text-[var(--brand-brown)]">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)} className="rounded-full p-1 text-stone-500 transition-colors hover:text-[var(--brand-brown)]" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button onClick={handleAddToCart} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-[var(--brand-brown)] bg-white font-heading text-sm font-bold text-[var(--brand-brown)] transition-transform hover:-translate-y-0.5">
                  <ShoppingCart className="h-4 w-4" /> Add to Basket
                </button>
                <button onClick={handleBuyNow} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] font-heading text-sm font-bold text-white shadow-[0_4px_0_var(--brand-brown)] transition-transform hover:-translate-y-0.5">
                  <CreditCard className="h-4 w-4" /> Buy Now
                </button>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 text-center font-heading text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100">
                <MessageCircle className="h-4 w-4" /> Ask a question before checkout
              </a>
            </div>
          ) : (
            <button disabled className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--brand-brown)]/12 bg-stone-100 px-6 py-3.5 text-center font-heading text-sm font-bold text-stone-400">
              <Ban className="h-4 w-4" /> Out of Stock
            </button>
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {[
          { icon: Truck, title: 'Islandwide COD', text: 'Delivery details are confirmed after order.' },
          { icon: CheckCircle, title: 'Fresh batches', text: 'Made for everyday family use.' },
          { icon: ShieldCheck, title: 'Clear ingredients', text: 'No hidden product claims.' },
        ].map((item) => (
          <div key={item.title} className="rounded-[1.8rem] bg-white p-6 shadow-[0_8px_0_rgba(74,44,8,.1)]">
            <item.icon className="h-7 w-7 text-[var(--brand-red)]" />
            <h2 className="mt-4 font-heading text-2xl font-bold leading-none text-[var(--brand-brown)]">{item.title}</h2>
            <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-stone-600">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[var(--brand-yellow)] p-6 text-[var(--brand-brown)] shadow-[0_10px_0_rgba(74,44,8,.12)] sm:p-8">
          <h2 className="font-heading text-4xl font-bold leading-none">Best ways to use it</h2>
          <p className="mt-4 font-sans text-base font-semibold leading-relaxed">{product.usage}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.bestFor.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1.5 font-sans text-xs font-extrabold text-[var(--brand-brown)]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[var(--brand-blue)] p-6 text-white shadow-[0_10px_0_rgba(74,44,8,.12)] sm:p-8">
          <h2 className="font-heading text-4xl font-bold leading-none">Storage and allergy note</h2>
          <p className="mt-4 font-sans text-base font-medium leading-relaxed text-white/82">
            Natural peanut spreads may separate because peanut oil can rise to the top. Stir well before use. Store in a cool, dry place and refrigerate if you prefer a thicker texture. This product contains peanuts and is not suitable for people with peanut allergy.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-[0_10px_0_rgba(74,44,8,.1)] sm:p-8">
        <h2 className="brand-headline text-4xl leading-none">{product.name} FAQ</h2>
        <div className="mt-6 divide-y divide-[var(--brand-brown)]/10">
          {product.faqs.map((faq) => (
            <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
              <h3 className="font-heading text-2xl font-bold text-[var(--brand-brown)]">{faq.question}</h3>
              <p className="mt-2 font-sans text-sm font-medium leading-relaxed text-stone-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
