import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { jsonLdScript } from '@/lib/json-ld'

const faqs = [
  {
    q: 'Where can I see current prices?',
    a: 'Kurkees prices depend on the flavour and jar size. You can compare current 220g, 340g and 450g prices on the products page before ordering.',
  },
  {
    q: 'Can I order online?',
    a: 'Yes. Choose your jar, add it to the basket and checkout on the website. WhatsApp is available if you want a quick clarification before ordering.',
  },
  {
    q: 'Do you have sugar-free peanut butter?',
    a: 'Yes. Kurkees has salted sugar-free peanut butter and unsalted sugar-free peanut butter. The unsalted sugar-free smooth jar is made with roasted peanuts only.',
  },
  {
    q: 'What is the difference between smooth and crunchy peanut butter?',
    a: 'Smooth peanut butter is creamy and easy to spread or blend. Crunchy peanut butter includes roasted peanut pieces for extra texture.',
  },
  {
    q: 'Is oil separation normal?',
    a: 'Yes. Natural peanut butter can separate when peanut oil rises to the top. Stir well before use. Refrigeration can slow separation and make the texture thicker.',
  },
  {
    q: 'Is Kurkees suitable for peanut allergy?',
    a: 'No. Kurkees products contain peanuts and are not suitable for people with peanut allergy.',
  },
]

export const metadata: Metadata = {
  title: 'FAQ | Kurkees Sri Lanka',
  description:
    'Answers about Kurkees prices, online ordering, smooth vs crunchy options, sugar-free jars, storage, oil separation and allergy notes.',
  alternates: { canonical: '/faq' },
}

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd)}
      />
      <main className="kurkees-page">
        <section className="relative overflow-hidden bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--brand-red)]">Kurkees help centre</span>
            <h1 className="mt-3 brand-headline text-5xl leading-[0.9] sm:text-7xl">
              Kurkees FAQ
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-stone-600">
              Common questions about prices, online ordering, jar sizes, sugar-free choices, storage and allergy safety.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="divide-y divide-stone-200 brand-panel p-6 sm:p-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6 first:pt-0 last:pb-0">
                <h2 className="font-heading text-xl font-bold text-[var(--brand-brown)]">{faq.q}</h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-[var(--brand-red)] p-6 text-center text-white sm:p-10">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Need help before ordering?</h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/85">
              Checkout on the website when you are ready. Message us if you want a quick clarification about product choice, delivery or COD.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/94777278378?text=Hi%20Kurkees%2C%20I%20have%20a%20quick%20question%20before%20ordering%20from%20the%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-sm font-bold text-[var(--brand-brown)]"
              >
                <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
              </a>
              <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading text-sm font-bold text-white">
                Start online order <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
