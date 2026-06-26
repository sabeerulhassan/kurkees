'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Check, ImageOff, Loader2, MessageCircle, Sparkles } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const FLAT_DELIVERY_FEE = 200

function CheckoutItemImage({ src, alt }: { src?: string; alt: string }) {
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

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [notes, setNotes] = useState('')
  const [isHydrated, setIsHydrated] = useState(false)

  const [validating, setValidating] = useState(false)
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
  const [discountMessage, setDiscountMessage] = useState<string | null>(null)
  const [discountError, setDiscountError] = useState<string | null>(null)
  const lastCheckedRef = useRef({ phone: '', address: '', city: '', total: 0 })

  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const savedProfile = localStorage.getItem('kurkees_customer_profile')
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        setName(profile.name || '')
        setPhone(profile.phone || '')
        setAddress(profile.address || '')
        setCity(profile.city || '')
      } catch (e) {
        console.error('Failed to parse customer profile', e)
      }
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      const profile = { name, phone, address, city }
      localStorage.setItem('kurkees_customer_profile', JSON.stringify(profile))
    }
  }, [name, phone, address, city, isHydrated])

  const calculatedWeightAndPcs = () => {
    let totalGrams = 0
    let totalPcs = 0

    cart.forEach((item) => {
      const numValue = parseInt(item.size.replace(/[^0-9]/g, ''))
      if (!isNaN(numValue)) totalGrams += numValue * item.quantity
      totalPcs += item.quantity
    })

    const kilo = Math.floor(totalGrams / 1000)
    const gram = totalGrams % 1000

    return { kilo, gram, pcs: totalPcs }
  }

  useEffect(() => {
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '')
    const isPhoneValid = cleanPhone.length >= 9 && cleanPhone.length <= 13
    const isAddressValid = address.trim().length >= 4
    const isCityValid = city.trim().length >= 2

    if (!isPhoneValid || !isAddressValid || !isCityValid || cartTotal === 0) {
      setAppliedDiscount(0)
      setDiscountMessage(null)
      setDiscountError(null)
      return
    }

    if (
      cleanPhone === lastCheckedRef.current.phone &&
      address.trim() === lastCheckedRef.current.address &&
      city.trim() === lastCheckedRef.current.city &&
      cartTotal === lastCheckedRef.current.total
    ) {
      return
    }

    const delayDebounce = setTimeout(async () => {
      setValidating(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
        const response = await fetch(`${apiUrl}/orders/validate-discount`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_phone: cleanPhone,
            customer_address: address.trim(),
            cart,
            discount_code: '',
            apply_first_time: true,
          }),
        })

        if (response.ok) {
          const res = await response.json()
          lastCheckedRef.current = {
            phone: cleanPhone,
            address: address.trim(),
            city: city.trim(),
            total: cartTotal,
          }

          if (res.valid) {
            setAppliedDiscount(res.discount_amount)
            setDiscountMessage(res.message)
            setDiscountError(null)
          } else if (res.type === 'fraud_flagged') {
            setAppliedDiscount(0)
            setDiscountMessage(null)
            setDiscountError(res.message)
          } else {
            setAppliedDiscount(0)
            setDiscountMessage(null)
            setDiscountError(null)
          }
        }
      } catch (err) {
        console.error('Failed to validate discount', err)
      } finally {
        setValidating(false)
      }
    }, 800)

    return () => clearTimeout(delayDebounce)
  }, [phone, address, city, cartTotal, cart])

  const finalTotal = Math.max(0, cartTotal - appliedDiscount) + FLAT_DELIVERY_FEE

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0 || validating) return

    setSubmitting(true)
    setErrorMessage(null)

    const { kilo, gram, pcs } = calculatedWeightAndPcs()
    const summaryString = cart.map((item) => `${item.quantity}x ${item.name} (${item.size})`).join(', ')

    const payload = {
      customer_phone: phone,
      customer_name: name,
      customer_address: address,
      customer_city: city,
      summary: summaryString,
      cart,
      notes: notes || null,
      kilo,
      gram,
      pcs,
      total_amount: finalTotal,
      apply_first_time: appliedDiscount > 0,
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to place order.')
      }

      const profile = { name, phone, address, city }
      localStorage.setItem('kurkees_customer_profile', JSON.stringify(profile))

      clearCart()
      router.push('/thank-you')
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-[#fffaf0] py-5 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex flex-col gap-2 sm:mb-6">
          <h1 className="font-heading text-3xl font-bold leading-tight text-[#3a210f] sm:text-4xl">Checkout</h1>
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-stone-600">
            Confirm your order and delivery details. Cash on Delivery is available.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-4 font-sans text-sm font-semibold text-red-800">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="space-y-5 rounded-2xl border border-amber-900/10 bg-white p-5 shadow-sm sm:p-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#3a210f]">Delivery details</h2>
                <p className="mt-1 font-sans text-sm text-stone-500">Only the details needed to deliver your order.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Full name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ruwan Perera"
                  className="h-12 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-base outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 sm:h-11 sm:text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">WhatsApp / phone number *</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0777278378"
                  className="h-12 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-base outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 sm:h-11 sm:text-sm"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Delivery address *</label>
                  <input
                    id="address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Galle Road"
                    className="h-12 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-base outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 sm:h-11 sm:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">City / town *</label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Colombo 03"
                    className="h-12 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-base outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 sm:h-11 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Special delivery instructions</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Drop at gate, deliver after 5pm..."
                  className="rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 py-3 font-sans text-base outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 sm:text-sm"
                />
              </div>

              {validating && (
                <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3 font-sans text-xs font-bold text-stone-600">
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking best available price...
                </div>
              )}

              {discountMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-sans text-xs font-bold text-emerald-800">
                  <Check size={16} className="shrink-0" />
                  <span>{discountMessage}</span>
                </div>
              )}

              {discountError && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-[#fff4cf] p-4 font-sans text-xs font-semibold text-[#5b2f17]">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{discountError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || validating || cart.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5b2f17] px-8 py-4 font-heading text-lg font-bold text-white shadow-sm transition-all hover:bg-[#4a2512] disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                <span>{submitting ? 'Placing order...' : cart.length === 0 ? 'Add products to checkout' : 'Place Cash on Delivery order'}</span>
              </button>

              <p className="text-center font-sans text-xs font-semibold text-stone-500">
                Need help?{' '}
                <a
                  href="https://wa.me/94777278378?text=Hi%20Kurkees%2C%20I%20need%20help%20with%20my%20checkout."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#8a4b19] underline-offset-4 hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp us
                </a>
              </p>
            </form>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="sticky top-28 space-y-5 rounded-2xl border border-amber-900/10 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-2xl font-bold text-[#3a210f]">Order summary</h2>
                <Link href="/products" className="rounded-full border border-stone-200 px-3 py-1.5 font-sans text-xs font-bold text-stone-600 hover:bg-stone-50">
                  Edit basket
                </Link>
              </div>

              <div className="divide-y divide-stone-100 border-y border-stone-100 py-1">
                {cart.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="font-heading text-lg font-bold text-[#3a210f]">Your basket is empty</p>
                    <Link href="/products" className="mt-3 inline-flex rounded-full border border-stone-200 px-4 py-2 font-sans text-sm font-bold text-stone-700 hover:bg-stone-50">
                      Choose products
                    </Link>
                  </div>
                )}
                {cart.map((item) => (
                  <div key={`${item.slug}-${item.size}`} className="flex items-center justify-between gap-4 py-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-stone-100 bg-background">
                      <CheckoutItemImage src={item.image} alt={item.name} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-heading text-sm font-bold text-[#3a210f]">{item.name}</h4>
                      <p className="font-sans text-xs text-stone-500">{item.size} × {item.quantity}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="font-sans text-sm font-bold text-[#3a210f]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-b border-stone-100 pb-4 font-sans text-sm text-stone-500">
                <div className="flex justify-between gap-4">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3a210f]">Rs. {cartTotal.toLocaleString()}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex items-center justify-between gap-4 font-bold text-emerald-700">
                    <span className="flex items-center gap-1">
                      <Sparkles size={14} /> First-time buyer discount
                    </span>
                    <span>- Rs. {appliedDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <span>Islandwide delivery</span>
                  <span className="font-semibold text-[#3a210f]">Rs. {FLAT_DELIVERY_FEE}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 text-[#3a210f]">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-stone-400">Total amount</span>
                <span className="font-heading text-3xl font-bold text-[#8a4b19]">Rs. {finalTotal.toLocaleString()}</span>
              </div>

              <div className="rounded-xl bg-[#fff7e8] p-4 font-sans text-xs font-semibold leading-relaxed text-stone-600">
                You pay when the order is delivered. We may contact you only if we need to clarify delivery details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
