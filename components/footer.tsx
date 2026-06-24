'use client'

import Link from 'next/link'
import { Send, Share2, AtSign, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        
        {/* Call to Order Block - Redesigned to deep professional grey card */}
        <div className="rounded-2xl bg-stone-800/60 border border-stone-700/60 p-8 text-center sm:p-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-xl text-balance font-heading text-2xl font-bold text-white sm:text-3xl leading-snug">
              Want a jar delivered to your doorstep?
            </h2>
            <p className="max-w-md font-sans text-stone-400 text-xs leading-relaxed uppercase tracking-wider font-semibold">
              We deliver island-wide across Sri Lanka with Rs. 200 flat-rate delivery for orders under 1kg.
            </p>
            <a
              href="https://wa.me/94777278378"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-amber-700 hover:bg-amber-800 px-8 font-sans text-xs font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            >
              Order on WhatsApp (077 727 8378)
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-stone-800/60 pt-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-700 text-white font-heading text-lg font-bold">
                K
              </span>
              <span className="font-heading text-xl font-bold text-white">Kurkees</span>
            </div>
            <p className="mt-4 max-w-xs font-sans text-xs text-stone-400 leading-relaxed">
              Premium local peanut butter, freshly ground in Sri Lanka. Clean ingredients at an honest price.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-xs text-stone-400">
              <li><Link href="/products" className="transition-colors hover:text-white">Classic Creamy (340g)</Link></li>
              <li><Link href="/products" className="transition-colors hover:text-white">Classic Crunchy (340g)</Link></li>
              <li><Link href="/products" className="transition-colors hover:text-white">Sugar-Free options</Link></li>
              <li><Link href="/products" className="transition-colors hover:text-white">Unsalted range</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Company</h3>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-xs text-stone-400">
              <li><Link href="/about" className="transition-colors hover:text-white">Our Story</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-white">Kitchen Journal</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Follow the fun</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://wa.me/94777278378"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://facebook.com/kurkees"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 transition-transform hover:-translate-y-0.5"
              >
                <Share2 className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com/kurkeescom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 transition-transform hover:-translate-y-0.5"
              >
                <AtSign className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://tiktok.com/@kurkeescom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800/80 pt-6 text-xs font-sans text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Kurkees Sri Lanka. Freshly made with love.</p>
          <p className="font-semibold uppercase tracking-wider text-[10px]">Fresh flavor, honest value.</p>
        </div>
      </div>
    </footer>
  )
}