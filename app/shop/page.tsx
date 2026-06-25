import type { Metadata } from 'next'
import ProductsPage from '@/app/products/page'

export const metadata: Metadata = {
  title: 'Shop Kurkees Jars | Sri Lanka',
  description:
    'Shop Kurkees jars in Sri Lanka. Compare smooth, crunchy, sugar-free, unsalted and chocolate peanut spreads with current prices and website checkout.',
  alternates: {
    canonical: '/products',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ShopPage() {
  return <ProductsPage />
}
