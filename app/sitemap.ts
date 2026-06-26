import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/notion'
import { getApiProducts } from '@/lib/api-products'
import { collections } from '@/lib/collections'
import { siteConfig } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url

  let blogPosts: any[] = []
  let products: any[] = []
  try {
    blogPosts = await getBlogPosts()
  } catch (e) {
    console.error('Sitemap lookup: Failed to retrieve blog posts', e)
  }
  try {
    products = await getApiProducts()
  } catch (e) {
    console.error('Sitemap lookup: Failed to retrieve API products', e)
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.65 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/delivery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.55 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.55 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${siteUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: collection.slug === 'peanut-butter-price-in-sri-lanka' ? 0.88 : 0.78,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedISO || post.dateISO),
    changeFrequency: 'monthly',
    priority: 0.55,
  }))

  return [...staticRoutes, ...productRoutes, ...collectionRoutes, ...blogRoutes]
}
