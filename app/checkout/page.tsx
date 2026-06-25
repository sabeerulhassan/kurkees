'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { Loader2, ArrowLeft, Check, AlertTriangle, Sparkles } from 'lucide-react'
import Link from 'next/link'

const FLAT_DELIVERY_FEE = 200

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  // Form States
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [notes, setNotes] = useState('')

  // Hydration state to prevent overwriting local storage on initial render
  const [isHydrated, setIsHydrated] = useState(false)

  // Discount States
  const [validating, setValidating] = useState(false)
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
  const [discountMessage, setDiscountMessage] = useState<string | null>(null)
  const [discountError, setDiscountError] = useState<string | null>(null)

  // High-Performance Cache for API Validations
  const lastCheckedRef = useRef({ phone: '', address: '', city: '', total: 0 })

  // Order Submission States
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // 1. Initial Load: Pull from Local Storage
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

  // 2. Real-Time Sync: Save to Local Storage on every keystroke
  useEffect(() => {
    if (isHydrated) {
      const profile = { name, phone, address, city }
      localStorage.setItem('kurkees_customer_profile', JSON.stringify(profile))
    }
  }, [name, phone, address, city, isHydrated])

  // 3. Weight Parser Helper
  const calculatedWeightAndPcs = () => {
    let totalGrams = 0
    let totalPcs = 0
    
    cart.forEach(item => {
      const sizeStr = item.size
      const numValue = parseInt(sizeStr.replace(/[^0-9]/g, ''))
      if (!isNaN(numValue)) {
        totalGrams += numValue * item.quantity
      }
      totalPcs += item.quantity
    })

    const kilo = Math.floor(totalGrams / 1000)
    const gram = totalGrams % 1000

    return { kilo, gram, pcs: totalPcs }
  }

  // 4. Pure Debounce Validation Engine (For Discounts & Fraud Checks)
  useEffect(() => {
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "")
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
            cart: cart, 
            discount_code: "",
            apply_first_time: true
          })
        })
        
        if (response.ok) {
          const res = await response.json()
          
          lastCheckedRef.current = {
            phone: cleanPhone,
            address: address.trim(),
            city: city.trim(),
            total: cartTotal
          }

          if (res.valid) {
            setAppliedDiscount(res.discount_amount)
            setDiscountMessage(res.message)
            setDiscountError(null)
          } else if (res.type === "fraud_flagged") {
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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0 || validating) return

    setSubmitting(true)
    setErrorMessage(null)

    const { kilo, gram, pcs } = calculatedWeightAndPcs()

    const summaryString = cart
      .map(item => `${item.quantity}x ${item.name} (${item.size})`)
      .join(', ')

    const computedTotal = Math.max(0, cartTotal - appliedDiscount) + FLAT_DELIVERY_FEE

    const payload = {
      customer_phone: phone,
      customer_name: name,
      customer_address: address,
      customer_city: city,
      summary: summaryString,
      cart: cart,
      notes: notes || null,
      kilo,
      gram,
      pcs,
      apply_first_time: appliedDiscount > 0
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

      // Final strict save on successful order
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

  const finalTotal = Math.max(0, cartTotal - appliedDiscount) + FLAT_DELIVERY_FEE

  return (
    <main className="relative min-h-screen bg-background py-12">
      
      {/* Dynamic Locking Loading Modal */}
      {validating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/10 backdrop-blur-xs cursor-wait">
          <div className="bg-white border border-amber-900/10 p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4">
            <Loader2 className="h-7 w-7 animate-spin text-[#8a4b19]" />
            <p className="font-heading text-lg font-bold text-stone-800">Calculating Best Price...</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link href="/products" className="inline-flex items-center gap-2 mb-8 font-sans text-sm font-bold text-stone-500 hover:text-[#8a4b19] transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>

        <h1 className="font-heading text-4xl font-bold text-[#3a210f] mb-8 leading-tight">Checkout</h1>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-800 font-sans font-semibold text-sm flex items-center space-x-2">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handlePlaceOrder} className="bg-white border border-amber-900/10/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <h2 className="font-heading text-2xl font-bold text-[#3a210f]">Delivery Details</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans font-bold text-xs text-stone-500 uppercase tracking-wider">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ruwan Perera"
                  className="h-11 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-sm outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-sans font-bold text-xs text-stone-500 uppercase tracking-wider">WhatsApp / Phone Number *</label>
                <input
                  id="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0777278378"
                  className="h-11 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-sm outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="font-sans font-bold text-xs text-stone-500 uppercase tracking-wider">Delivery Address *</label>
                  <input
                    id="address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Galle Road"
                    className="h-11 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-sm outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="font-sans font-bold text-xs text-stone-500 uppercase tracking-wider">City / Town *</label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Colombo 03"
                    className="h-11 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-sm outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="notes" className="font-sans font-bold text-xs text-stone-500 uppercase tracking-wider">Special Delivery Instructions</label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Drop at gate, deliver after 5pm..."
                  className="rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 py-3 font-sans text-sm outline-none transition-all focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600"
                />
              </div>

              {/* Dynamic Alerts */}
              {discountMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-pulse">
                  <Check size={16} className="shrink-0" />
                  <span>{discountMessage}</span>
                </div>
              )}
              {discountError && (
                <div className="p-4 bg-[#fff4cf] border border-amber-200 text-[#5b2f17] rounded-xl text-xs font-semibold flex items-center space-x-2">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{discountError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || validating}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#5b2f17] hover:bg-[#4a2512] text-white px-8 py-4 font-heading text-lg font-bold transition-all shadow-sm disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                <span>{submitting ? 'Placing Order...' : 'Place Cash on Delivery Order'}</span>
              </button>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="font-heading text-2xl font-bold text-[#3a210f]">Order Summary</h2>

              <div className="divide-y border-y border-stone-100 divide-stone-100 py-1">
                {cart.map(item => (
                  <div key={`${item.slug}-${item.size}`} className="flex items-center justify-between gap-4 py-4">
                    <div className="relative h-12 w-12 shrink-0 rounded-lg bg-background border border-stone-100 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-contain p-1" />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm font-bold text-[#3a210f] truncate">{item.name}</h4>
                      <p className="text-xs font-sans text-stone-500">{item.size} × {item.quantity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-sans font-bold text-sm text-[#3a210f]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-b border-stone-100 pb-4 text-sm font-sans text-stone-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3a210f]">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold items-center">
                    <span className="flex items-center gap-1">
                      <Sparkles size={14} /> First-Time Buyer (12%)
                    </span>
                    <span>- Rs. {appliedDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Standard Island-wide Delivery (COD)</span>
                  <span className="font-semibold text-[#3a210f]">Rs. {FLAT_DELIVERY_FEE}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[#3a210f] pt-2">
                <span className="font-sans text-xs font-bold text-stone-400 uppercase tracking-wider">Total Amount</span>
                <span className="font-heading text-3xl font-bold text-[#8a4b19]">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}