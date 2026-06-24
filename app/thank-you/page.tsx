'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Star, Peanut } from '@/components/doodles'

export default function ThankYouPage() {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center bg-background overflow-hidden py-16">
      <Peanut className="pointer-events-none absolute left-8 top-16 h-16 w-28 text-primary/30" />
      <Star className="pointer-events-none absolute right-12 top-20 h-12 w-12 text-accent" />
      <Star className="pointer-events-none absolute left-12 bottom-16 h-10 w-10 text-secondary" />

      <div className="mx-auto max-w-md px-6 text-center">
        <div className="relative z-10 bg-card border-2 border-border rounded-4xl p-8 sm:p-10 shadow-[0_8px_0_0_var(--border)] space-y-6 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-100 animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h1 className="font-heading text-4xl font-bold text-foreground tracking-tight">
            Order Placed!
          </h1>
          
          <p className="font-sans text-base leading-relaxed text-muted-foreground">
            Thank you! We&apos;ve successfully received your order. We make our peanut butter in small batches to ensure premium quality.
          </p>

          <div className="bg-sky/25 border-2 border-sky p-4 rounded-2xl w-full text-center">
            <p className="font-sans text-sm font-bold text-sky-foreground leading-relaxed">
              📞 We will call you shortly on your WhatsApp/Phone number to confirm your order details before dispatching.
            </p>
          </div>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-heading text-lg font-bold text-primary-foreground shadow-[0_5px_0_0_oklch(0.45_0.2_25)] transition-transform hover:-translate-y-0.5 text-center"
          >
            Back to Home <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}