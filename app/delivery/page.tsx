import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, MessageCircle, Package, Truck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Delivery & Online Ordering | Kurkees Sri Lanka',
  description:
    'Learn how Kurkees website checkout, delivery and Cash on Delivery confirmation work for Sri Lankan customers.',
  alternates: { canonical: '/delivery' },
}

const steps = [
  {
    icon: Package,
    title: 'Choose your jar',
    text: 'Compare smooth, crunchy, sugar-free, unsalted and chocolate peanut spread options on the products page.',
  },
  {
    icon: CheckCircle,
    title: 'Checkout online',
    text: 'Add your jar to the basket and complete the order form with your contact and delivery details.',
  },
  {
    icon: Truck,
    title: 'Confirm delivery',
    text: 'Kurkees confirms availability, delivery cost, COD details and expected delivery timing directly with you.',
  },
]

export default function DeliveryPage() {
  return (
    <main className="kurkees-page">
      <section className="relative overflow-hidden bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">Website checkout</span>
          <h1 className="mt-3 brand-headline text-5xl leading-[0.9] sm:text-7xl">
            Delivery & Online Ordering
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-stone-600">
            Kurkees makes it simple to choose your jar size, checkout online and get delivery details confirmed before dispatch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="brand-panel p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff4cf] text-[var(--brand-brown)]">
                <step.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-heading text-xl font-bold text-[var(--brand-brown)]">{step.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-stone-600">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 brand-panel p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[var(--brand-brown)]">Details needed at checkout</h2>
            <ul className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-stone-600">
              <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Product name is added automatically from your basket</li>
              <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Jar size such as 220g, 340g or 450g</li>
              <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Quantity and delivery address area</li>
              <li className="flex gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-[var(--brand-red)]" /> Whether you prefer Cash on Delivery if available</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-[#fff4cf] p-6">
            <h2 className="font-heading text-2xl font-bold text-[var(--brand-brown)]">Need quick help?</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-stone-600">
              Use WhatsApp only if you want a quick clarification before placing the order on the website.
            </p>
            <a
              href="https://wa.me/94777278378?text=Hi%20Kurkees%2C%20I%20have%20a%20quick%20question%20before%20ordering%20from%20the%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-heading text-sm font-bold text-white hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-3 font-heading text-sm font-bold text-white">
            Start online order <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
