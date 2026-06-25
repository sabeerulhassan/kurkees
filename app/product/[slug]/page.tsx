import { permanentRedirect } from 'next/navigation'
import { resolveProductSlug, resolveCollectionSlug } from '@/lib/route-aliases'
import { getApiProduct } from '@/lib/api-products'
import { getCollectionBySlug } from '@/lib/collections'

export const dynamicParams = true

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function SingularProductAliasPage({ params }: PageProps) {
  const { slug } = await params
  const productSlug = resolveProductSlug(slug)
  const apiProduct = await getApiProduct(productSlug)

  if (apiProduct) {
    permanentRedirect(`/products/${apiProduct.slug}`)
  }

  const collectionSlug = resolveCollectionSlug(slug)
  if (getCollectionBySlug(collectionSlug)) {
    permanentRedirect(`/collections/${collectionSlug}`)
  }

  permanentRedirect('/products')
}
