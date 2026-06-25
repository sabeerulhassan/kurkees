import Link from 'next/link'
import { ArrowRight, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="bg-background py-16 sm:py-24">
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-[#5b2f17]">
          <Search className="h-6 w-6" />
        </span>
        <h1 className="mt-6 font-heading text-4xl font-bold text-[#3a210f] sm:text-5xl">
          This page moved or does not exist
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-stone-600">
          Try the Kurkees peanut butter price list, shopping guides, or contact page to find the right jar quickly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5b2f17] px-6 py-3 font-heading text-sm font-bold text-white shadow-sm hover:bg-[#4a2512]"
          >
            View peanut butter prices <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 font-heading text-sm font-bold text-[#3a210f] hover:bg-[#fff7e8]"
          >
            <Home className="h-4 w-4" /> Back home
          </Link>
        </div>
      </section>
    </main>
  )
}
