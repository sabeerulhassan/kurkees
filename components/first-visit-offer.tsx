'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Gift, ShoppingBag, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

const DISMISSED_UNTIL_KEY = 'kurkees_first_visit_offer_dismissed_until'
const SEEN_KEY = 'kurkees_first_visit_offer_seen'
const DISMISS_DAYS = 14

function getDismissedUntil() {
  try {
    return Number(window.localStorage.getItem(DISMISSED_UNTIL_KEY) || 0)
  } catch {
    return 0
  }
}

function setDismissedForDays(days: number) {
  const dismissedUntil = Date.now() + days * 24 * 60 * 60 * 1000

  try {
    window.localStorage.setItem(DISMISSED_UNTIL_KEY, String(dismissedUntil))
    window.localStorage.setItem(SEEN_KEY, 'true')
  } catch {}
}

function shouldSkipPath(pathname: string | null) {
  if (!pathname) return true

  return (
    pathname === '/checkout' ||
    pathname === '/thank-you' ||
    pathname === '/products' ||
    pathname.startsWith('/products/') ||
    pathname.startsWith('/product/') ||
    pathname.startsWith('/shop/')
  )
}

export function FirstVisitOffer() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || shouldSkipPath(pathname) || cartCount > 0) return

    const dismissedUntil = getDismissedUntil()
    if (dismissedUntil && dismissedUntil > Date.now()) return

    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches
    const delay = isSmallScreen ? 6500 : 5000

    const timer = window.setTimeout(() => {
      if (!shouldSkipPath(window.location.pathname) && getDismissedUntil() <= Date.now()) {
        setVisible(true)
        try {
          window.localStorage.setItem(SEEN_KEY, 'true')
        } catch {}
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [cartCount, mounted, pathname])

  useEffect(() => {
    if (shouldSkipPath(pathname) || cartCount > 0) {
      setVisible(false)
    }
  }, [cartCount, pathname])

  const closeOffer = () => {
    setDismissedForDays(DISMISS_DAYS)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[360px] sm:px-0 sm:pb-0"
      role="dialog"
      aria-modal="false"
      aria-labelledby="first-visit-offer-title"
    >
      <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--brand-brown)]/12 bg-white shadow-[0_18px_50px_rgba(74,44,8,.22)] sm:rounded-[1.8rem]">
        <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[var(--brand-yellow)]/45" />
        <div className="absolute -bottom-14 -left-12 h-36 w-36 rounded-full bg-[var(--brand-blue)]/14" />

        <button
          type="button"
          onClick={closeOffer}
          className="absolute right-3 top-3 z-10 rounded-full border border-stone-200 bg-white/90 p-2 text-stone-500 shadow-sm transition-colors hover:text-[var(--brand-brown)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]"
          aria-label="Close offer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-5 pr-12 sm:p-6 sm:pr-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#fff4cf] px-3 py-1.5 font-sans text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--brand-brown)]">
            <Gift className="h-3.5 w-3.5 text-[var(--brand-red)]" />
            First order offer
          </div>

          <h2 id="first-visit-offer-title" className="font-heading text-3xl font-bold leading-none text-[var(--brand-brown)] sm:text-[2.1rem]">
            New to Kurkees?
          </h2>

          <p className="mt-3 max-w-[18rem] font-sans text-sm font-semibold leading-relaxed text-stone-600">
            Get 12% off your first website order. The discount is checked automatically at checkout.
          </p>

          <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <Link
              href="/products"
              onClick={closeOffer}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] px-5 py-3 font-heading text-base font-bold text-white shadow-[0_5px_0_rgba(74,44,8,.16)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop jars
            </Link>

            <button
              type="button"
              onClick={closeOffer}
              className="min-h-11 rounded-full border border-stone-200 bg-white px-5 py-2.5 font-sans text-sm font-extrabold text-stone-600 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] focus:ring-offset-2"
            >
              Maybe later
            </button>
          </div>

          <p className="mt-3 font-sans text-[11px] font-semibold leading-relaxed text-stone-400">
            No code needed. Valid for eligible first-time website customers.
          </p>
        </div>
      </div>
    </div>
  )
}
