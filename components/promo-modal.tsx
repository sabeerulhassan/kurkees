'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { X, Sparkles, ArrowRight } from 'lucide-react'

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const isDismissed = localStorage.getItem('kurkees_promo_dismissed')
    const hasProfile = localStorage.getItem('kurkees_customer_profile')

    if (!isDismissed && !hasProfile) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('kurkees_promo_dismissed', 'true')
    setIsOpen(false)
  }

  if (!isMounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/35 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-amber-900/10 bg-white p-8 shadow-xl animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#fff7e8] text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close promotion"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4cf] text-[#5b2f17] border border-amber-900/10">
            <Sparkles className="h-6 w-6" />
          </div>
          
          <h2 className="font-heading text-2xl font-bold text-[#3a210f] leading-tight">
            Welcome Discount
          </h2>
          
          <p className="mt-3 font-sans text-sm leading-relaxed text-stone-500">
            Trying Kurkees for the first time? We automatically apply a <strong>12% discount</strong> at checkout to welcome you to the family!
          </p>

          <div className="mt-6 w-full space-y-2">
            <Link 
              href="/products"
              onClick={handleClose}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#5b2f17] hover:bg-[#4a2512] text-white px-6 py-3 font-heading text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Shop Our Jars <ArrowRight className="h-4 w-4" />
            </Link>
            
            <button
              onClick={handleClose}
              className="w-full rounded-full border border-amber-900/10 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-700 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}