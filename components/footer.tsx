import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { featuredCollectionLinks } from '@/lib/collections'


function FacebookGlyph(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={props.className}>
      <path d="M14.6 8.15h2.15V4.4c-.37-.05-1.65-.16-3.14-.16-3.1 0-5.22 1.95-5.22 5.53v3.3H4.97v4.19h3.42V24h4.2v-6.74h3.29l.52-4.19h-3.81V10.2c0-1.21.33-2.05 2.01-2.05Z" />
    </svg>
  )
}

function InstagramGlyph(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={props.className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" strokeLinecap="round" />
    </svg>
  )
}

const socialLinks = [
  { href: 'https://www.facebook.com/kurkees', label: 'Facebook', icon: FacebookGlyph },
  { href: 'https://www.instagram.com/kurkeescom', label: 'Instagram', icon: InstagramGlyph },
  { href: 'https://wa.me/94777278378', label: 'WhatsApp help', icon: MessageCircle },
]

const footerLinks = [
  { href: '/products', label: 'Products' },
  { href: '/collections', label: 'Shopping guides' },
  { href: '/about', label: 'Our story' },
  { href: '/delivery', label: 'Delivery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--brand-blue)] text-white">
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[var(--brand-yellow)]/35" />
      <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-[var(--brand-red)]/30" />
      <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,var(--brand-red),var(--brand-yellow),white,var(--brand-yellow),var(--brand-red))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="brand-logo block h-16 w-[142px] rounded-2xl bg-white p-2 shadow-lg">
              <BrandLogo />
            </Link>
            <h2 className="mt-6 max-w-md font-heading text-4xl font-bold leading-none text-white sm:text-5xl">
              Fresh jars for real Sri Lankan meals.
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white/80">
              Choose your jar online, checkout on the website, and message us only when you need help choosing or confirming details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--brand-blue)] transition-transform hover:-translate-y-1"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-[var(--brand-yellow)]">Explore</h3>
            <div className="mt-5 grid gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="font-sans text-sm font-bold text-white/82 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-bold text-[var(--brand-yellow)]">Choose your jar</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {featuredCollectionLinks.slice(0, 7).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-white/12 px-3 py-2 font-sans text-xs font-bold text-white/85 transition-colors hover:bg-white hover:text-[var(--brand-blue)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 rounded-[1.5rem] bg-white p-5 text-[var(--brand-brown)] shadow-lg">
              <p className="font-heading text-2xl font-bold leading-none">Need a quick answer?</p>
              <p className="mt-2 font-sans text-sm text-stone-600">Use WhatsApp for clarification. Website checkout stays the easiest order path.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/18 pt-6 font-sans text-xs font-semibold text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kurkees Sri Lanka.</p>
          <p>Clear ingredients. Local peanuts. Everyday jars.</p>
        </div>
      </div>
    </footer>
  )
}
