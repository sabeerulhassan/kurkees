import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/notion'
import { products } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com'

  let blogPosts: any[] = []
  try {
    blogPosts = await getBlogPosts()
  } catch (e) {
    console.error('Sitemap lookup: Failed to retrieve blog posts', e)
  }

  // Define site structural pathways
  const staticRoutes = [
    '',
    '/products',
    '/about',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: (route === '' || route === '/products' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Define mapped dynamic post entries
  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}