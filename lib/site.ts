export const siteConfig = {
  name: 'Kurkees',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kurkees.com',
  description:
    'Local Sri Lankan peanut spreads with smooth, crunchy, sugar-free, unsalted and chocolate options.',
  whatsappNumber: '94777278378',
  socialLinks: {
    instagram: 'https://instagram.com/kurkeescom',
    facebook: 'https://facebook.com/kurkees',
    tiktok: 'https://tiktok.com/@kurkeescom',
  },
}

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, siteConfig.url).toString()
}

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function truncateMeta(description: string, maxLength = 158) {
  if (description.length <= maxLength) return description
  const trimmed = description.slice(0, maxLength - 1).trim()
  return `${trimmed.replace(/[\s,.!?;:]+$/g, '')}…`
}
