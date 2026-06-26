'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ImageOff, Minus, Plus, ShoppingBag, Trash, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'


function CartItemImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center text-stone-300">
        <ImageOff className="h-4 w-4" />
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
      className="h-full w-full object-contain p-1"
    />
  )
}

export function CartDrawer() {
  const { cart, cartTotal, updateQuantity, removeFromCart, setIsCartOpen } = useCart()

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-amber-900/10 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-amber-900/10 bg-[#fff7e8] p-6">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-stone-800" />
            <h3 className="font-heading text-xl font-bold text-[#3a210f]">Your Basket</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full border border-amber-900/10 bg-white p-1.5 text-stone-600 transition-colors hover:bg-[#fff7e8]"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="space-y-4 py-24 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-stone-300" />
              <p className="font-heading text-lg font-bold text-stone-800">Your basket is empty!</p>
              <p className="font-sans text-sm text-stone-500">Add your favourite Kurkees jar to get started.</p>
              <Link href="/products" onClick={() => setIsCartOpen(false)} className="inline-flex rounded-full border border-stone-200 px-4 py-2 font-sans text-sm font-bold text-stone-700 hover:bg-stone-50">Shop products</Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.slug}-${item.size}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-amber-900/10 bg-white p-4 shadow-xs"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-stone-100 bg-[#fff7e8]">
                  <CartItemImage src={item.image} alt={item.name} />
                </div>

                <div className="flex-1">
                  <h4 className="line-clamp-1 font-heading text-sm font-bold text-[#3a210f]">{item.name}</h4>
                  <p className="font-sans text-xs text-stone-500">{item.size} • Rs. {item.price.toLocaleString()}</p>

                  <div className="mt-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                      className="rounded-full border border-amber-900/10 bg-white p-1 text-stone-600 transition-colors hover:bg-[#fff7e8]"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus className="h-2.5 w-2.5" />
                    </button>
                    <span className="w-6 text-center font-sans text-xs font-bold text-stone-800">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                      className="rounded-full border border-amber-900/10 bg-white p-1 text-stone-600 transition-colors hover:bg-[#fff7e8]"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.slug, item.size)}
                  className="rounded-full p-1.5 text-stone-400 transition-all hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-4 border-t border-amber-900/10 bg-[#fff7e8]/50 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-stone-800">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Subtotal</span>
                <span className="font-heading text-xl font-bold text-[#3a210f]">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <p className="font-sans text-xs font-semibold text-stone-500">Delivery fee is calculated at checkout. Cash on Delivery is available.</p>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5b2f17] px-6 py-3.5 font-heading text-base font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Proceed to Checkout <ShoppingBag className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
