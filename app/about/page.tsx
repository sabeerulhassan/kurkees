import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sprout, Heart, Recycle, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — Kurkees',
  description:
    'The Kurkees story: all-natural peanut butter made with love, real ingredients, and a whole lot of crunch.',
}

const values = [
  {
    icon: Sprout,
    title: 'Natural Ingredients',
    desc: 'Real roasted peanuts, never fillers, hydrogenated oils, or mystery additives.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    desc: 'Small-batch care in every jar, blended by people who actually eat the stuff.',
  },
  {
    icon: Recycle,
    title: 'Sustainability',
    desc: 'Recyclable jars and responsibly sourced peanuts from farmers we trust.',
  },
  {
    icon: Award,
    title: 'No Compromise',
    desc: 'Big flavor and big nutrition. We refuse to choose between the two.',
  },
]

const steps = [
  { n: '01', title: 'Pick the peanuts', desc: 'We hand-select premium peanuts from trusted family farms.' },
  { n: '02', title: 'Slow roast', desc: 'A gentle roast unlocks that deep, nutty flavor you love.' },
  { n: '03', title: 'Grind fresh', desc: 'Stone-ground to your favorite texture — smooth or crunchy.' },
  { n: '04', title: 'Jar it up', desc: 'Sealed fresh and sent straight to your pantry. No detours.' },
]

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6]">
      {/* Hero */}
      <section className="relative border-b border-stone-200/60 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-100 px-4 py-1.5 font-sans text-xs font-bold text-amber-800 uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl font-bold leading-tight text-stone-900 sm:text-6xl">
              Born from a love of real peanut butter
            </h1>
            <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-stone-600">
              Kurkees started in a tiny kitchen with one stubborn belief: peanut
              butter should be made from peanuts. Just peanuts. We were tired of
              labels full of sugar and oil, so we built our own jar — packed with
              protein, zero added sugar, and flavor that actually makes you smile.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-700 text-white px-7 py-3 font-heading text-base font-bold shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Taste the difference <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <Image
                src="/about-making.png"
                alt="Roasted peanuts being ground into fresh peanut butter"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 border-b border-stone-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-balance font-heading text-3xl font-bold text-stone-900 sm:text-4xl">
              What we stand for
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-xs"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800 border border-amber-100">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-stone-900">
                  {v.title}
                </h3>
                <p className="mt-2 font-sans text-xs leading-relaxed text-stone-500">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Changed to clean offwhite grid */}
      <section className="bg-white py-16 sm:py-20 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-amber-800">
              The Process
            </span>
            <h2 className="mt-1 font-heading text-3xl font-bold text-stone-900 sm:text-4xl">
              How it&apos;s made
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-stone-200 bg-[#faf9f6] p-6 shadow-xs"
              >
                <span className="font-heading text-3xl font-bold text-amber-700">
                  {s.n}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-stone-900">
                  {s.title}
                </h3>
                <p className="mt-2 font-sans text-xs leading-relaxed text-stone-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-amber-700 px-6 py-14 text-center text-white sm:px-12 shadow-sm">
            <h2 className="mx-auto max-w-xl text-balance font-heading text-3xl font-bold sm:text-4xl">
              Come for the protein. Stay for the flavor.
            </h2>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-heading text-base font-bold text-stone-950 transition-transform hover:-translate-y-0.5 shadow-xs"
            >
              Shop Kurkees <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}