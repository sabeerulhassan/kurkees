import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Heart, Sparkles } from 'lucide-react'
import { FoodMomentMosaic, PeanutPattern, ProductJarCluster, ProductJarStack } from '@/components/brand-visuals'
import { getApiProductImage, getApiProducts } from '@/lib/api-products'

export const metadata: Metadata = {
  title: 'About Kurkees | A Local Peanut Butter Brand',
  description:
    'Meet Kurkees, a local Sri Lankan peanut butter brand making simple jars for families, snacks, smoothies and everyday meals.',
  alternates: {
    canonical: '/about',
  },
}

const values = [
  'Sri Lankan peanuts and familiar local eating moments',
  'Clear ingredients and honest product choices',
  'Website ordering first, WhatsApp help when needed',
  'Jars made for homes, lunchboxes, gym meals and snacks',
]

const process = [
  { n: '01', title: 'Roast', text: 'A proper roast brings out the nutty smell and warm peanut colour.' },
  { n: '02', title: 'Grind', text: 'Smooth, crunchy and chocolate styles are made to match different homes.' },
  { n: '03', title: 'Jar', text: 'Packed into practical jars with clear labels and easy size choices.' },
  { n: '04', title: 'Enjoy', text: 'Spread it, blend it, spoon it, dip it or use it in everyday recipes.' },
]

export default async function AboutPage() {
  const apiProducts = await getApiProducts()

  return (
    <main className="kurkees-page overflow-hidden">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[var(--brand-blue)]" />
        <PeanutPattern className="pointer-events-none absolute -left-20 top-10 h-44 w-[520px] text-[var(--brand-red)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <div className="z-10 text-center lg:text-left">
            <span className="brand-kicker"><Heart className="h-4 w-4" /> Our Story</span>
            <h1 className="brand-headline mt-6 text-5xl leading-[0.88] sm:text-7xl lg:text-8xl">
              We are a little obsessed with good peanut butter.
            </h1>
            <p className="brand-copy mx-auto mt-6 max-w-xl text-lg sm:text-xl lg:mx-0">
              Kurkees started with a simple goal: make peanut butter feel easy, useful and exciting for Sri Lankan homes. Not a fancy shelf item. A jar people actually finish.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/products" className="brand-button-primary w-full sm:w-auto">
                Shop Kurkees jars <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/delivery" className="brand-button-secondary w-full sm:w-auto">
                How delivery works
              </Link>
            </div>
          </div>
          <div className="relative z-10">
            <ProductJarCluster products={apiProducts} />
          </div>
        </div>
      </section>

      <section className="section-blue py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="rounded-full bg-white/16 px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-white">Why we exist</span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-none text-white sm:text-6xl">
              Peanut butter should belong in real meals.
            </h2>
            <p className="mt-5 max-w-lg font-sans text-base font-medium leading-relaxed text-white/82">
              We want Kurkees to feel close to the way people already eat: bread, roti, oats, bananas, smoothies, lunchboxes, gym meals and quick snacks after a busy day.
            </p>
          </div>
          <FoodMomentMosaic products={apiProducts} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <span className="brand-kicker"><Sparkles className="h-4 w-4" /> What guides us</span>
              <h2 className="brand-headline mt-5 text-4xl leading-none sm:text-6xl">Simple jars. Big everyday use.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3 rounded-[1.5rem] border border-[var(--brand-brown)]/10 bg-[var(--brand-white)] p-5 shadow-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-red)]" />
                  <p className="font-sans text-sm font-bold leading-relaxed text-[var(--brand-brown)]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-yellow relative overflow-hidden py-16 sm:py-20">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/38" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {process.map((step) => (
              <div key={step.n} className="rounded-[2rem] bg-white p-6 text-[var(--brand-brown)] shadow-[0_8px_0_rgba(74,44,8,.12)]">
                <span className="font-heading text-5xl font-bold text-[var(--brand-red)]">{step.n}</span>
                <h3 className="mt-3 font-heading text-3xl font-bold leading-none">{step.title}</h3>
                <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-stone-600">{step.text}</p>
              </div>
            ))}
          </div>
          <div>
            <span className="rounded-full bg-white px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-brown)]">Roast to jar</span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-none text-[var(--brand-brown)] sm:text-6xl">
              The process is simple. The feeling should not be boring.
            </h2>
            <p className="mt-5 font-sans text-base font-semibold leading-relaxed text-[var(--brand-brown)]/75">
              The design now gives the brand more movement, colour and product presence while keeping the story honest and local.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="brand-kicker">Meet the family</span>
            <h2 className="brand-headline mx-auto mt-5 max-w-3xl text-4xl leading-none sm:text-6xl">Different jars for different homes</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {apiProducts.slice(0, 4).map((product) => {
              const imageUrl = getApiProductImage(product)
              return (
                <Link key={product.slug} href={`/products/${product.slug}`} className="group relative min-h-[280px] overflow-hidden rounded-[2rem] bg-[var(--brand-blue)] p-6 text-white shadow-[0_10px_0_rgba(74,44,8,.12)] transition-transform hover:-translate-y-1 even:bg-[var(--brand-red)]">
                  <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-white/22" />
                  <h3 className="relative z-10 max-w-[10rem] font-heading text-3xl font-bold leading-none">{product.flavor}</h3>
                  <p className="relative z-10 mt-3 max-w-[11rem] font-sans text-xs font-bold leading-relaxed text-white/82">{product.bestFor.slice(0, 2).join(' • ')}</p>
                  {imageUrl && (
                    <img src={imageUrl} alt={`${product.name} jar`} loading="lazy" decoding="async" className="absolute -bottom-12 right-0 w-[54%] rotate-[8deg] drop-shadow-2xl transition-transform group-hover:scale-105" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-brown)] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-heading text-5xl font-bold leading-none sm:text-7xl">A local brand with a louder shelf presence.</h2>
            <p className="mt-5 max-w-xl font-sans text-lg font-medium leading-relaxed text-white/76">
              Kurkees can be playful and premium at the same time: bright panels, rounded type, product-led scenes and a clear online checkout path.
            </p>
            <Link href="/products" className="mt-8 brand-button-primary">
              Explore products <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <ProductJarStack products={apiProducts} className="min-h-[330px]" />
        </div>
      </section>
    </main>
  )
}
