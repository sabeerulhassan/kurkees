import type { Metadata } from 'next'
import { Mail, Phone, MessageSquare, AtSign, Share2 } from 'lucide-react'
import { ContactClient } from '@/components/contact-client'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Order fresh peanut butter via WhatsApp, Facebook, or Instagram. Fast Cash on Delivery across Sri Lanka.',
}

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6]">
      <section className="relative border-b border-stone-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-balance font-heading text-4xl font-bold text-stone-900 sm:text-6xl leading-tight">
            Order your fresh jar today
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-sans text-base text-stone-500 leading-relaxed">
            We deliver island-wide with fast Cash on Delivery (COD) for a flat rate of just Rs. 200.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <ContactClient />

        <div className="mt-12 max-w-3xl mx-auto rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-xl font-bold text-stone-900">
              Our Active Channels
            </h2>
            <p className="font-sans text-xs text-stone-500 mt-1 uppercase tracking-wide font-semibold">
              Message us directly on your preferred platform
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            <a 
              href="https://wa.me/94777278378" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-4 rounded-xl border border-stone-150 hover:bg-stone-50 transition-colors text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-100 mb-3">
                <Phone className="h-5 w-5" />
              </span>
              <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-400">WhatsApp</p>
              <p className="font-sans font-bold text-sm text-stone-850 mt-1">077 727 8378</p>
            </a>

            <a 
              href="https://instagram.com/kurkeescom" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-4 rounded-xl border border-stone-150 hover:bg-stone-50 transition-colors text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-100 mb-3">
                <AtSign className="h-5 w-5" />
              </span>
              <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-400">Instagram</p>
              <p className="font-sans font-bold text-sm text-stone-850 mt-1">@kurkeescom</p>
            </a>

            <a 
              href="https://facebook.com/kurkees" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-4 rounded-xl border border-stone-150 hover:bg-stone-50 transition-colors text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-100 mb-3">
                <Share2 className="h-5 w-5" />
              </span>
              <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-stone-400">Facebook</p>
              <p className="font-sans font-bold text-sm text-stone-850 mt-1">kurkees</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}