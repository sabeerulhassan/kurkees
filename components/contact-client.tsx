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
    a: 'Browse our products, add your jars to the basket and checkout on the website. You can also message us on WhatsApp, Instagram or Facebook if you want help before ordering.',
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
    a: 'Our Classic Smooth and Crunchy jars contain sugar and salt. Our sugar-free ranges contain no added sugar, and our Unsalted Sugar-Free Smooth jar is made with roasted peanuts only.',
  },
]

export function ContactClient() {
  const [sent, setSent] = useState(false)

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Form */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-amber-900/10 bg-white p-6 shadow-sm sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-600 animate-bounce" />
              <h2 className="font-heading text-2xl font-bold text-[#3a210f]">
                Inquiry Sent!
              </h2>
              <p className="max-w-sm font-sans text-sm text-stone-500">
                Thank you. We will reach out to you shortly to help with your question or order details.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 rounded-full border border-amber-900/10 bg-[#fff7e8] hover:bg-[#fff3cf] px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-stone-600"
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
              <h2 className="font-heading text-xl font-bold text-[#3a210f]">
                Quick message
              </h2>
              <Field label="Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="h-11 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-sm outline-none focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </Field>
              <Field label="WhatsApp / Contact Number" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder="e.g., 0777278378"
                  className="h-11 w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 font-sans text-sm outline-none focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </Field>
              <Field label="Your message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Ask about a product, delivery, COD or anything you want clarified..."
                  className="w-full rounded-xl border border-amber-900/10 bg-[#fff7e8]/50 px-4 py-3 font-sans text-sm outline-none focus:border-[#8a4b19] focus:bg-white focus:ring-1 focus:ring-amber-600 transition-all"
                />
              </Field>
              <button
                type="submit"
                className="mt-2 rounded-full bg-[#5b2f17] hover:bg-[#4a2512] text-white px-8 py-3.5 font-heading text-base font-bold shadow-sm"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Accordion - Completely redesigned to crisp high-contrast */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-amber-900/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-heading text-xl font-bold text-[#3a210f]">
            Quick answers
          </h2>
          <Accordion className="mt-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-stone-100"
              >
                <AccordionTrigger className="text-left font-sans text-sm font-bold text-stone-800 hover:no-underline">
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