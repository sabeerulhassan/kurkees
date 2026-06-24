'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Simply browse our products and click "Order on WhatsApp", or message us on Instagram (@kurkeescom) or Facebook (kurkees). Let us know your choice of jars, delivery address, and contact number.',
  },
  {
    q: 'What are your delivery charges?',
    a: 'We offer a highly affordable flat delivery rate of Rs. 200 island-wide for orders under 1kg. Extra weight charges apply if your order exceeds 1kg.',
  },
  {
    q: 'How do I pay for my order?',
    a: 'We currently support Cash on Delivery (COD) across Sri Lanka, meaning you only pay when your fresh peanut butter jars are safely in your hands.',
  },
  {
    q: 'What is the shelf life and storage of Kurkees?',
    a: 'We make our peanut butter fresh without hydrogenated stabilizer oils. Give the jar a stir if natural oil separation occurs. Store in a cool, dry pantry or in the refrigerator to keep it thick and fresh.',
  },
  {
    q: 'Are your peanut butters really sugar-free?',
    a: 'Our Classic Creamy and Crunchy jars contain a small touch of sugar and salt. Our Pure Sugar-Free ranges contain zero added sugar, while our Unsalted & Sugar-Free contains strictly 100% peanuts.',
  },
]

export function ContactClient() {
  const [sent, setSent] = useState(false)

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-600 animate-bounce" />
              <h2 className="font-heading text-2xl font-bold text-stone-900">
                Inquiry Sent!
              </h2>
              <p className="max-w-sm font-sans text-sm text-stone-500">
                Thank you. We will reach out to you on WhatsApp or your email shortly to finalize your order details.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-stone-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="flex flex-col gap-5"
            >
              <h2 className="font-heading text-xl font-bold text-stone-900">
                Quick Order / Message
              </h2>
              <Field label="Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 font-sans text-sm outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </Field>
              <Field label="WhatsApp / Contact Number" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder="e.g., 0777278378"
                  className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 font-sans text-sm outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </Field>
              <Field label="Your Message / Order details" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="List the jars you want to buy along with your delivery city..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 font-sans text-sm outline-none focus:border-amber-600 focus:bg-white focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </Field>
              <button
                type="submit"
                className="mt-2 rounded-full bg-amber-700 hover:bg-amber-800 text-white px-8 py-3.5 font-heading text-base font-bold shadow-sm"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Accordion - Completely redesigned to crisp high-contrast */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-xl font-bold text-stone-900">
            Quick answers
          </h2>
          <Accordion className="mt-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-stone-100"
              >
                <AccordionTrigger className="text-left font-sans text-sm font-bold text-stone-850 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-xs leading-relaxed text-stone-500">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-sans font-bold text-xs text-stone-400 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  )
}