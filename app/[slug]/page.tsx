import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { rootSeoAliases } from '@/lib/route-aliases'

export const dynamicParams = true

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(rootSeoAliases).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = rootSeoAliases[slug]

  if (!destination) {
    return { title: 'Page Not Found | Kurkees' }
  }

  return {
    title: 'Redirecting | Kurkees',
    robots: { index: false, follow: true },
    alternates: { canonical: destination },
  }
}

export default async function SeoAliasPage({ params }: PageProps) {
  const { slug } = await params
  const destination = rootSeoAliases[slug]

  if (!destination) {
    notFound()
  }

  permanentRedirect(destination)
}
