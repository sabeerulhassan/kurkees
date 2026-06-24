import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Nunito, Geist_Mono } from 'next/font/google' // <-- Replaced Fredoka with Lora
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartProvider } from '@/lib/cart-context'
import { PromoModal } from '@/components/promo-modal'
import './globals.css'

const lora = Lora({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kurkees — Peanut Goodness in Every Scoop',
    template: '%s | Kurkees'
  },
  description:
    'Kurkees makes all-natural, high-protein peanut butter with 0% added sugar. Smooth, crunchy, chocolate, spicy and more. Shop the goodness.',
  generator: 'v0.app',
  keywords: [
    'peanut butter',
    'natural peanut butter',
    'high protein peanut butter',
    'sugar-free peanut butter',
    'Kurkees',
    'healthy snacks'
  ],
  authors: [{ name: 'Kurkees Team' }],
  creator: 'Kurkees',
  publisher: 'Kurkees',
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Kurkees',
    title: 'Kurkees — Peanut Goodness in Every Scoop',
    description: 'All-natural, high-protein peanut butter with 0% added sugar. Smooth, crunchy, chocolate, spicy and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kurkees — All-Natural Peanut Goodness',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurkees — Peanut Goodness in Every Scoop',
    description: 'All-natural, high-protein peanut butter with 0% added sugar.',
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
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#bfe3f5',
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
      className={`${lora.variable} ${nunito.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased text-stone-900 bg-[#faf9f6]">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <PromoModal />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}