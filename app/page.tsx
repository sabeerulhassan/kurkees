import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf as LeafIcon, Ban, Dumbbell, Sparkles } from 'lucide-react'
import { products } from '@/lib/data'
import { getBlogPosts } from '@/lib/notion'
import { ProductCard } from '@/components/product-card'
import { Testimonials } from '@/components/testimonials'
import { Star, Peanut, Squiggle, Spark, Leaf } from '@/components/doodles'

const benefits = [
  { icon: LeafIcon, title: 'All Natural', desc: 'Just roasted peanuts. Nothing artificial, ever.' },
  { icon: Ban, title: '0% Added Sugar', desc: 'Sweetened by nature, not by us.' },
  { icon: Dumbbell, title: '8g Protein', desc: 'A protein punch in every single scoop.' },
  { icon: Sparkles, title: 'High Protein', desc: 'Fuel your day the delicious way.' },
]

export const revalidate = 60

export default async function HomePage() {
  const blogPosts = await getBlogPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  // Structured Data (JSON-LD) for Search Engine Brand Identification
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        'name': 'Kurkees',
        'url': siteUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': `${siteUrl}/hero-jar.png`,
          'caption': 'Kurkees Peanut Butter'
        },
        'sameAs': [
          'https://instagram.com/kurkees',
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        'url': siteUrl,
        'name': 'Kurkees',
        'description': 'All-natural, high-protein peanut butter with 0% added sugar.',
        'publisher': {
          '@id': `${siteUrl}/#organization`
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      
      <main className="overflow-hidden">
        {/* Hero */}
        <section className="relative bg-background">
          <Peanut className="pointer-events-none absolute left-4 top-24 h-16 w-28 text-tan" />
          <Star className="pointer-events-none absolute right-6 top-16 h-10 w-10 text-primary" />
          <Spark className="pointer-events-none absolute left-1/2 top-10 h-8 w-8 text-accent" />
          <Leaf className="pointer-events-none absolute bottom-10 left-10 h-12 w-12 text-secondary" />

          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-2 font-sans text-sm font-bold text-sky-foreground">
                <Sparkles className="h-4 w-4" /> New: Spicy Fiesta is here
              </span>
              <h1 className="mt-5 text-balance font-heading text-5xl font-bold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
                Peanut Goodness in Every Scoop
              </h1>
              <p className="mx-auto mt-5 max-w-md text-pretty font-sans text-lg leading-relaxed text-muted-foreground lg:mx-0">
                All-natural, high-protein peanut butter with zero added sugar.
                Bold flavors, smooth texture, and a whole lot of crunch.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/products"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-heading text-lg font-bold text-primary-foreground shadow-[0_5px_0_0_oklch(0.45_0.2_25)] transition-transform hover:-translate-y-1 sm:w-auto"
                >
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-foreground px-8 py-4 font-heading text-lg font-bold text-foreground transition-colors hover:bg-foreground hover:text-background sm:w-auto"
                >
                  Our Story
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-sky/60 blur-2xl sm:h-96 sm:w-96" />
              <div className="relative mx-auto aspect-square max-w-md rounded-[3rem] border-2 border-border bg-card shadow-[0_10px_0_0_var(--border)]">
                <Image
                  src="/hero-jar.png"
                  alt="A jar of Kurkees peanut butter with a wooden spoon scooping creamy peanut butter"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-contain p-6"
                />
              </div>
            </div>
          </div>
          <Squiggle className="mx-auto h-8 w-40 text-accent" />
        </section>

        {/* Benefits */}
        <section className="bg-sky py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-balance font-heading text-3xl font-bold text-sky-foreground sm:text-4xl">
                Good stuff in. Nonsense out.
              </h2>
              <p className="mx-auto mt-3 max-w-lg font-sans text-sky-foreground/80">
                Every jar is packed with the things that matter and none of the
                things that don&apos;t.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center rounded-3xl border-2 border-border bg-card p-6 text-center shadow-[0_6px_0_0_var(--border)]"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <b.icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-card-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products preview */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="font-sans text-sm font-bold uppercase tracking-wide text-primary">
                  Our Jars
                </span>
                <h2 className="mt-1 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Pick your flavor
                </h2>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-2.5 font-sans font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Recipes / blog teaser */}
        <section className="relative bg-tan/40 py-16 sm:py-20">
          <Peanut className="pointer-events-none absolute right-6 top-10 h-14 w-24 text-primary/40" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <span className="font-sans text-sm font-bold uppercase tracking-wide text-primary">
                From the Kitchen
              </span>
              <h2 className="mt-1 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Recipes & ramblings
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border-2 border-border bg-card shadow-[0_6px_0_0_var(--border)] transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-sans text-xs font-bold text-primary-foreground">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-xl font-bold text-card-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 flex items-center gap-1 font-sans font-bold text-primary">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center">
              <span className="font-sans text-sm font-bold uppercase tracking-wide text-primary">
                Spreading Joy
              </span>
              <h2 className="mt-1 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                People are nuts about us
              </h2>
            </div>
            <div className="mt-10">
              <Testimonials />
            </div>
          </div>
        </section>

        {/* Newsletter CTA banner */}
        <section className="bg-background pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-4xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
              <Star className="pointer-events-none absolute left-8 top-8 h-10 w-10 text-primary-foreground/30" />
              <Spark className="pointer-events-none absolute right-10 bottom-8 h-10 w-10 text-primary-foreground/30" />
              <h2 className="mx-auto max-w-2xl text-balance font-heading text-3xl font-bold sm:text-5xl">
                Ready to scoop up the goodness?
              </h2>
              <p className="mx-auto mt-4 max-w-md font-sans text-lg text-primary-foreground/90">
                Join the Kurkees crew for tasty recipes, fresh drops, and members-only deals.
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-4 font-heading text-lg font-bold text-card-foreground transition-transform hover:-translate-y-1"
              >
                Shop the Collection <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}