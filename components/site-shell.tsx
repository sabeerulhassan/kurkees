'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BrandLogo } from '@/components/brand-logo'
import { CartProvider } from '@/lib/cart-context'

function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="brand-logo block h-[50px] w-[114px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2"
          aria-label="Kurkees home"
        >
          <BrandLogo />
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 font-sans text-xs font-extrabold text-emerald-800 sm:px-4">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure checkout</span>
        </div>
      </div>
    </header>
  )
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCheckout = pathname === '/checkout'

  return (
    <CartProvider>
      {isCheckout ? (
        <>
          <CheckoutHeader />
          {children}
        </>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </CartProvider>
  )
}
