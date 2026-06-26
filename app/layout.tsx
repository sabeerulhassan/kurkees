import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Plus_Jakarta_Sans } from 'next/font/google'
import { SiteShell } from '@/components/site-shell'
import { siteConfig } from '@/lib/site'
import './globals.css'

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const siteUrl = siteConfig.url

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kurkees Peanut Butter Sri Lanka | Local Peanut Spreads',
    template: '%s | Kurkees',
  },
  description:
    'Shop Kurkees jars in Sri Lanka. Compare smooth, crunchy, sugar-free, unsalted and chocolate peanut spreads with clear prices and easy website checkout.',
  authors: [{ name: 'Kurkees Team' }],
  creator: 'Kurkees',
  publisher: 'Kurkees',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    url: siteUrl,
    siteName: 'Kurkees',
    title: 'Kurkees Peanut Butter Sri Lanka',
    description:
      'Fresh local jars for Sri Lankan families, fitness meals and everyday snacks. Choose smooth, crunchy, sugar-free and chocolate peanut spreads.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kurkees peanut butter Sri Lanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurkees Peanut Butter Sri Lanka',
    description: 'Shop local jars with clear prices and easy website checkout.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#326fc2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${jakarta.variable} bg-background`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-sans antialiased text-foreground bg-background">
        <SiteShell>
          {children}
        </SiteShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
