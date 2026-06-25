import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, ShoppingBag, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import type { Metadata } from 'next'
import { products } from '@/lib/data'
import { featuredCollectionLinks } from '@/lib/collections'
import { getBlogPosts } from '@/lib/notion'
import { ProductCard } from '@/components/product-card'
import { getApiProducts } from '@/lib/api-products'
import { Testimonials } from '@/components/testimonials'
import { FoodMomentMosaic, PeanutPattern, ProductJarCluster, ProductStrip } from '@/components/brand-visuals'
import { jsonLdScript } from '@/lib/json-ld'

const benefits = [
  { title: 'Local peanuts', text: 'Built around peanuts sourced for Sri Lankan homes and daily food habits.' },
  { title: 'Real choices', text: 'Smooth, crunchy, unsalted, sugar-free, spicy and chocolate styles in one family.' },
  { title: 'Easy checkout', text: 'Choose your jar online. WhatsApp stays there for quick clarification only.' },
]

export const metadata: Metadata = {
  title: 'Kurkees Peanut Butter | Local Peanut Spreads',
  description:
    'Shop Kurkees jars in Sri Lanka. Choose smooth, crunchy, sugar-free, unsalted and chocolate peanut spreads with clear prices and easy website checkout.',
  alternates: {
    canonical: '/',
  },
}

export const revalidate = 60

export default async function HomePage() {
  const [blogPosts, apiProducts] = await Promise.all([getBlogPosts(), getApiProducts()])
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Kurkees',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/hero-jar.png`,
          caption: 'Kurkees Peanut Butter',
        },
        sameAs: [
          'https://instagram.com/kurkeescom',
          'https://facebook.com/kurkees',
          'https://tiktok.com/@kurkeescom',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Kurkees',
        description: 'Local Sri Lankan peanut spreads with smooth, crunchy, sugar-free, unsalted and chocolate options.',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(orgJsonLd)} />

      <main className="kurkees-page overflow-hidden">
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[var(--brand-yellow)]" />
          <PeanutPattern className="pointer-events-none absolute -right-20 top-12 h-44 w-[520px] text-[var(--brand-blue)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div className="relative z-10 text-center lg:text-left">
              <span className="brand-kicker"><Sparkles className="h-4 w-4" /> Local jars, louder flavour</span>
              <h1 className="brand-headline mt-6 text-5xl leading-[0.88] sm:text-7xl lg:text-8xl">
                Peanut butter made to be used, not hidden.
              </h1>
              <p className="brand-copy mx-auto mt-6 max-w-xl text-lg sm:text-xl lg:mx-0">
                Smooth, crunchy, pure, spicy and chocolate peanut spreads for breakfast, lunchboxes, smoothies and snacks around real Sri Lankan homes.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/products" className="brand-button-primary w-full sm:w-auto">
                  Shop jars online <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/94777278378?text=Hi%20Kurkees%2C%20I%20have%20a%20quick%20question%20before%20ordering%20from%20the%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-secondary w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" /> Ask before ordering
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {benefits.map((item) => (
                  <div key={item.title} className="rounded-[1.35rem] border border-[var(--brand-brown)]/10 bg-white p-4 text-left shadow-sm">
                    <p className="font-heading text-lg font-bold text-[var(--brand-brown)]">{item.title}</p>
                    <p className="mt-1 font-sans text-xs font-semibold leading-relaxed text-stone-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10">
              <ProductJarCluster />
            </div>
          </div>
        </section>

        <ProductStrip />

        <section className="section-blue relative overflow-hidden py-16 sm:py-20">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--brand-yellow)]/30" />
          <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="rounded-full bg-white/16 px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-white">How people use it</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-none text-white sm:text-6xl">
                Not just a jar. A daily food habit.
              </h2>
              <p className="mt-5 max-w-lg font-sans text-base font-medium leading-relaxed text-white/82">
                The site should feel like food, not a brochure. Kurkees jars belong next to breakfast, fruit, oats, roti, smoothies and weekend treats.
              </p>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading text-base font-bold text-[var(--brand-blue)] transition-transform hover:-translate-y-1">
                See our story <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <FoodMomentMosaic />
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <span className="brand-kicker">Pick your flavour</span>
                <h2 className="brand-headline mt-4 text-4xl leading-none sm:text-6xl">Choose your Kurkees jar</h2>
                <p className="brand-copy mt-4 text-base">
                  Product cards are designed to feel more like shelf-ready FMCG packaging: image first, fast comparison, clear checkout path.
                </p>
              </div>
              <Link href="/products" className="brand-button-secondary">
                View price list <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            {apiProducts.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {apiProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-[2rem] border border-dashed border-[var(--brand-brown)]/20 bg-white p-8 text-center font-sans text-sm font-semibold text-stone-600">
                Product cards load from the products API. Start the API or check NEXT_PUBLIC_API_URL to show the current shelf here.
              </div>
            )}
          </div>
        </section>

        <section className="section-yellow py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="rounded-full bg-white px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--brand-brown)]">Guided shopping</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-none sm:text-6xl">Find the right jar without guessing.</h2>
              <p className="mt-4 font-sans text-base font-semibold leading-relaxed text-[var(--brand-brown)]/78">
                Keep SEO useful: one natural guide per customer need, not keyword stuffing. These pages help people choose by texture, sugar, chocolate, protein and price.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredCollectionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-[1.5rem] bg-white px-5 py-5 font-heading text-xl font-bold text-[var(--brand-brown)] shadow-[0_6px_0_rgba(74,44,8,.14)] transition-transform hover:-translate-y-1"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {blogPosts.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="text-center">
                <span className="brand-kicker">From the kitchen</span>
                <h2 className="brand-headline mx-auto mt-4 max-w-3xl text-4xl leading-none sm:text-6xl">Ideas for your next spoonful</h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group brand-image-card flex flex-col transition-transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-yellow)]/35">
                      <Image
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 92vw, 30vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-red)] px-3 py-1 font-sans text-xs font-bold text-white">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-2xl font-bold leading-tight text-[var(--brand-brown)]">{post.title}</h3>
                      <p className="mt-3 line-clamp-2 flex-1 font-sans text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
                      <span className="mt-5 flex items-center gap-1 font-heading font-bold text-[var(--brand-red)]">
                        Read more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-red py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <span className="rounded-full bg-white/18 px-4 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.18em] text-white">Why it feels better</span>
                <h2 className="mt-5 font-heading text-4xl font-bold leading-none text-white sm:text-6xl">Bold, warm, shelf-ready.</h2>
                <p className="mt-4 font-sans text-base font-medium leading-relaxed text-white/82">
                  Kurkees should look like a confident food brand, not a generic local website. Bigger visuals, fewer boxes, stronger movement and real product moments.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: ShoppingBag, title: 'Website first', text: 'Basket and checkout stay the main order path.' },
                  { icon: MessageCircle, title: 'WhatsApp help', text: 'Quick clarifications only, not the main CTA.' },
                  { icon: ShieldCheck, title: 'Clear trust', text: 'Ingredients, storage and delivery stay easy to find.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] bg-white p-6 text-[var(--brand-brown)] shadow-[0_8px_0_rgba(74,44,8,.18)]">
                    <item.icon className="h-8 w-8 text-[var(--brand-red)]" />
                    <h3 className="mt-4 font-heading text-2xl font-bold leading-none">{item.title}</h3>
                    <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-stone-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <span className="brand-kicker">Loved locally</span>
              <h2 className="brand-headline mt-4 text-4xl leading-none sm:text-6xl">Fresh flavour, honest value</h2>
            </div>
            <div className="mt-10">
              <Testimonials />
            </div>
          </div>
        </section>

        <section className="bg-[var(--brand-brown)] px-4 py-16 text-white sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <h2 className="font-heading text-5xl font-bold leading-none sm:text-7xl">Ready to bring home a jar?</h2>
              <p className="mt-5 max-w-xl font-sans text-lg font-medium leading-relaxed text-white/76">
                Compare jars, choose your size and checkout on the website. If you want peace of mind first, send a quick WhatsApp message.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/products" className="brand-button-primary bg-[var(--brand-red)]">
                  Shop online <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/faq" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading text-base font-bold text-[var(--brand-brown)] transition-transform hover:-translate-y-1">
                  Read FAQ
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px]">
              <Image src={products[6].image} alt="Chocofeda jar" width={230} height={320} className="absolute right-4 top-0 w-[42%] rotate-[8deg] drop-shadow-2xl" />
              <Image src={products[0].image} alt="Kurkees smooth jar" width={260} height={340} className="absolute left-8 top-8 w-[48%] -rotate-[8deg] drop-shadow-2xl" />
              <Image src={products[1].image} alt="Kurkees crunchy jar" width={220} height={310} className="absolute bottom-0 left-1/2 w-[38%] -translate-x-1/2 rotate-[3deg] drop-shadow-2xl" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
