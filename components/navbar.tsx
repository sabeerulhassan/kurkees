'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { cn } from '@/lib/utils'
import { BrandLogo } from '@/components/brand-logo'

const CartDrawer = dynamic(
  () => import('@/components/cart-drawer').then((module) => module.CartDrawer),
  { ssr: false },
)

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/collections', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const whatsappHelpUrl =
  'https://wa.me/94777278378?text=Hi%20Kurkees%2C%20I%20have%20a%20quick%20question%20before%20ordering%20from%20the%20website.'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { cartCount, isCartOpen, setIsCartOpen } = useCart()

  const closeMenus = () => {
    setOpen(false)
    setIsCartOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-200/70 bg-[#bde9fb]/95 shadow-[0_8px_24px_rgba(30,58,138,.08)] backdrop-blur-md">
        <nav className="mx-auto grid max-w-[1560px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2 focus:ring-offset-[#bde9fb]"
            aria-label="Kurkees home"
          >
            <span className="brand-logo block h-[54px] w-[122px] sm:h-[62px] sm:w-[140px] lg:h-[68px] lg:w-[154px]">
              <BrandLogo />
            </span>
          </Link>

          <div className="hidden justify-center lg:flex">
            <div className="flex items-center gap-2 rounded-full px-2 py-1">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-full px-4 py-2.5 font-heading text-[15px] font-bold text-[var(--brand-brown)] transition-all duration-200',
                      active
                        ? 'bg-[var(--brand-yellow)] shadow-[0_3px_0_rgba(74,44,8,.16)]'
                        : 'hover:bg-white/65 hover:shadow-[0_2px_0_rgba(74,44,8,.08)]'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <a
              href={whatsappHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border-[3px] border-[var(--brand-brown)] bg-white px-4 py-2.5 font-heading text-sm font-bold text-[var(--brand-brown)] shadow-[0_2px_0_rgba(74,44,8,.18)] transition-transform hover:-translate-y-0.5 xl:flex"
            >
              <MessageCircle className="h-4 w-4" /> Help
            </a>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-12 items-center gap-2 rounded-full bg-[var(--brand-red)] px-4 font-heading text-sm font-bold text-white shadow-[0_5px_0_var(--brand-brown)] transition-transform hover:-translate-y-0.5 sm:px-5"
              aria-label="Open basket"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Basket</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand-yellow)] px-1 font-sans text-[10px] font-extrabold text-[var(--brand-brown)]">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[var(--brand-brown)] bg-white text-[var(--brand-brown)] shadow-[0_2px_0_rgba(74,44,8,.18)] lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-sky-200/80 bg-[#bde9fb] px-4 py-4 lg:hidden">
            <div className="grid gap-2">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-2xl px-4 py-3 font-heading text-lg font-bold text-[var(--brand-brown)] transition-colors',
                      active
                        ? 'bg-[var(--brand-yellow)]'
                        : 'bg-white/70 hover:bg-white'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <a
                href={whatsappHelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full border-[3px] border-[var(--brand-brown)] bg-white px-4 py-3 font-heading text-base font-bold text-[var(--brand-brown)]"
              >
                <MessageCircle className="h-4 w-4" /> Ask a quick question
              </a>
            </div>
          </div>
        )}
      </header>
      {isCartOpen && <CartDrawer />}
    </>
  )
}
