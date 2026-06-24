import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/notion'
import { BlogClient } from '@/components/blog-client'

export const metadata: Metadata = {
  title: 'Blog — Kurkees',
  description:
    'Peanut butter recipes, nutrition tips, and news from the Kurkees kitchen.',
}

export const revalidate = 60 // Revalidate cache every 60 seconds for new posts

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return <BlogClient initialPosts={posts} />
}