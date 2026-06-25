import type { Metadata } from 'next'
import Link from 'next/link'
import { AtSign, HelpCircle, MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Kurkees | Help & Product Support',
  description:
    'Contact Kurkees for product questions, delivery help, order support and quick clarifications in Sri Lanka.',
  alternates: { canonical: '/contact' },
}


function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const supportOptions = [
  {
    title: 'Order on the website',
    description:
      'Choose your jars, add them to the basket and complete your order directly on the website.',
    href: '/products',
    label: 'Shop products',
    icon: ShoppingBag,
    primary: true,
  },
  {
    title: 'WhatsApp support',
    description:
      'Use WhatsApp if you want a quick clarification before ordering or need help with an existing order.',
    href: 'https://wa.me/94777278378',
    label: 'Message on WhatsApp',
    icon: MessageCircle,
    external: true,
  },
  {
    title: 'Instagram updates',
    description:
      'Follow product updates, offers and simple peanut butter serving ideas on Instagram.',
    href: 'https://instagram.com/kurkeescom',
    label: '@kurkeescom',
    icon: AtSign,
    external: true,
  },
  {
    title: 'Facebook page',
    description:
      'Reach us on Facebook for general messages and brand updates.',
    href: 'https://facebook.com/kurkees',
    label: 'kurkees',
    icon: FacebookIcon,
    external: true,
  },
]

const faqs = [
  {
    q: 'What is the easiest way to order?',
    a: 'The easiest way is to order directly through the website. WhatsApp is available if you prefer to ask a quick question first.',
  },
  {
    q: 'Can I ask about delivery before ordering?',
    a: 'Yes. You can check the delivery page for the main details, or message us if you need clarification for your area.',
  },
  {
    q: 'Can I get help choosing a product?',
    a: 'Yes. Smooth is easy to spread, crunchy has peanut pieces, sugar-free options are available, and Chocofeda is the chocolate peanut spread option.',
  },
]

export default function ContactPage() {
  return (
    <main className="overflow-hidden kurkees-page">
      <section className="relative overflow-hidden bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-red)]">
            Contact Kurkees
          </p>
          <h1 className="mt-4 text-balance brand-headline text-5xl leading-[0.9] sm:text-7xl">
            Need help before or after ordering?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-stone-600 sm:text-lg">
            Ordering through the website is the main path. Use WhatsApp, Instagram or Facebook when you want quick product, delivery or order clarification.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-full bg-[var(--brand-red)] px-8 py-3.5 font-heading text-base font-bold text-white shadow-sm transition-colors hover:bg-[var(--brand-red)]"
            >
              Shop products
            </Link>
            <Link
              href="/delivery"
              className="rounded-full border border-stone-300 bg-white px-8 py-3.5 font-heading text-base font-bold text-stone-800 transition-colors hover:bg-[var(--brand-yellow)]"
            >
              Delivery details
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {supportOptions.map((item) => {
            const Icon = item.icon
            const className = item.primary
              ? 'border-amber-200 bg-[#fff4cf]/70 hover:bg-[#fff4cf]'
              : 'border-amber-900/10 bg-white hover:bg-[var(--brand-yellow)]'

            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-900/10 bg-white text-[var(--brand-brown)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-heading text-lg font-bold text-[var(--brand-brown)]">
                  {item.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-stone-600">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex font-sans text-sm font-bold text-[var(--brand-brown)]">
                  {item.label}
                </span>
              </>
            )

            if (item.external) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-3xl border p-6 shadow-sm transition-colors ${className}`}
                >
                  {content}
                </a>
              )
            }

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`rounded-3xl border p-6 shadow-sm transition-colors ${className}`}
              >
                {content}
              </Link>
            )
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="brand-panel p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff4cf] text-[var(--brand-brown)]">
                <PackageCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-heading text-xl font-bold text-[var(--brand-brown)]">
                  Order support
                </h2>
                <p className="font-sans text-sm text-stone-500">
                  For delivery, COD and product questions.
                </p>
              </div>
            </div>
            <p className="mt-5 font-sans text-sm leading-relaxed text-stone-600">
              If you already placed an order, keep your order details ready when you contact us. This helps us check your delivery or product question faster.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/faq"
                className="rounded-full border border-stone-300 px-6 py-3 text-center font-heading text-sm font-bold text-stone-800 hover:bg-[var(--brand-yellow)]"
              >
                Read FAQ
              </Link>
              <a
                href="https://wa.me/94777278378"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-900 px-6 py-3 text-center font-heading text-sm font-bold text-white hover:bg-stone-800"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          <div className="brand-panel p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff4cf] text-[var(--brand-brown)]">
                <HelpCircle className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-xl font-bold text-[var(--brand-brown)]">
                Quick answers
              </h2>
            </div>
            <div className="mt-5 divide-y divide-stone-100">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="font-sans text-sm font-bold text-[var(--brand-brown)]">
                    {faq.q}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-stone-600">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
