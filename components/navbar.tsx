'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone, ShoppingBag, Plus, Minus, Trash } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart()

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => { setOpen(false); setIsCartOpen(false); }}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white font-heading text-lg font-bold shadow-xs">
              K
            </span>
            <span className="font-heading text-xl font-bold tracking-tight text-stone-900">
              Kurkees
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 md:flex">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-full px-4 py-2 font-sans text-sm font-semibold transition-all',
                    active
                      ? 'bg-amber-50 text-amber-800'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 shadow-xs transition-transform hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/94777278378"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-amber-700 text-white px-5 py-2.5 font-sans text-xs font-bold tracking-wider uppercase transition-transform hover:-translate-y-0.5 shadow-sm sm:flex"
            >
              <Phone className="h-3.5 w-3.5" />
              Order (0777278378)
            </a>
            <button
              type="button"
              className="rounded-full p-2 text-stone-600 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-stone-200 bg-white px-4 pb-4 md:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-3 font-sans text-base font-semibold',
                    pathname === link.href
                      ? 'bg-amber-50 text-amber-800'
                      : 'text-stone-600 hover:bg-stone-50',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/94777278378"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 font-sans text-base font-bold text-white shadow-sm"
              >
                <Phone className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div 
            className="absolute inset-0 bg-stone-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-stone-200 flex flex-col z-10 animate-slide-in">
            <div className="p-6 border-b border-stone-150 flex items-center justify-between bg-stone-50">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-stone-800" />
                <h3 className="font-heading text-xl font-bold text-stone-900">Your Basket</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-stone-200 p-1.5 bg-white hover:bg-stone-50 text-stone-600 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-24 space-y-4">
                  <ShoppingBag className="h-12 w-12 mx-auto text-stone-300" />
                  <p className="font-heading text-lg font-bold text-stone-800">Your basket is empty!</p>
                  <p className="text-sm font-sans text-stone-500">Add some natural jars to get started.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.slug}-${item.size}`} className="flex items-center justify-between gap-4 p-4 border border-stone-150 rounded-xl bg-white shadow-xs">
                    <div className="relative h-12 w-12 shrink-0 rounded-lg bg-stone-50 border border-stone-100 overflow-hidden">
                      <img src={item.image} alt={item.name} className="object-contain p-1 w-full h-full" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-heading text-sm font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-sans text-stone-500">{item.size} • Rs. {item.price.toLocaleString()}</p>
                      
                      <div className="flex items-center gap-1.5 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                          className="p-1 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="font-sans font-bold text-xs w-6 text-center text-stone-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                          className="p-1 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.slug, item.size)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-150 bg-stone-50/50 space-y-4">
                <div className="flex items-center justify-between text-stone-800">
                  <span className="font-sans text-xs font-bold text-stone-500 uppercase tracking-wider">Subtotal</span>
                  <span className="font-heading text-xl font-bold text-stone-900">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-700 px-6 py-3.5 font-heading text-base font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  Proceed to Checkout <ShoppingBag className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}