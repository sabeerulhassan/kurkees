import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredRoutes = [
  ['/', 'app/page.tsx'],
  ['/products', 'app/products/page.tsx'],
  ['/products/[slug]', 'app/products/[slug]/page.tsx'],
  ['/contact', 'app/contact/page.tsx'],
  ['/faq', 'app/faq/page.tsx'],
  ['/delivery', 'app/delivery/page.tsx'],
  ['/blog', 'app/blog/page.tsx'],
  ['/blog/[slug]', 'app/blog/[slug]/page.tsx'],
  ['/collections', 'app/collections/page.tsx'],
  ['/collections/[slug]', 'app/collections/[slug]/page.tsx'],
  ['/shop', 'app/shop/page.tsx'],
  ['/shop/[slug]', 'app/shop/[slug]/page.tsx'],
  ['/product/[slug]', 'app/product/[slug]/page.tsx'],
  ['/sitemap.xml', 'app/sitemap.ts'],
  ['/robots.txt', 'app/robots.ts'],
  ['/feed.xml', 'app/feed.xml/route.ts'],
]

const requiredLibraries = [
  'lib/data.ts',
  'lib/notion.ts',
  'lib/collections.ts',
  'lib/site.ts',
  'lib/json-ld.ts',
  'lib/cart-context.tsx',
]

const requiredComponents = [
  'components/navbar.tsx',
  'components/footer.tsx',
  'components/products-client.tsx',
  'components/product-card.tsx',
  'components/contact-client.tsx',
]

const aliases = [
  '/smooth-peanut-butter',
  '/crunchy-peanut-butter',
  '/sugar-free-peanut-butter',
  '/chocolate-peanut-butter',
  '/protein-peanut-butter',
  '/peanut-butter-price-in-sri-lanka',
  '/peanut-butter-price',
  '/buy-peanut-butter-online',
  '/peanut-butter-online-order',
]

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath))
}

const failures = []

for (const [route, relPath] of requiredRoutes) {
  if (!exists(relPath)) {
    failures.push(`${route} is missing ${relPath}`)
  }
}

for (const relPath of requiredLibraries) {
  if (!exists(relPath)) failures.push(`Required library missing: ${relPath}`)
}

for (const relPath of requiredComponents) {
  if (!exists(relPath)) failures.push(`Required component missing: ${relPath}`)
}

for (const alias of aliases) {
  const pagePath = `app${alias}/page.tsx`
  if (!exists(pagePath) && !exists('app/[slug]/page.tsx')) {
    failures.push(`${alias} has no explicit page and no app/[slug] safety route`)
  }
}

const appDir = path.join(root, 'app')
if (!fs.existsSync(appDir)) {
  failures.push('App Router directory missing: app/')
}

if (failures.length) {
  console.error('\nRoute validation failed:\n')
  for (const failure of failures) console.error(`- ${failure}`)
  console.error('\nFix these before building or packaging.\n')
  process.exit(1)
}

console.log('Route validation passed. Core pages and SEO aliases are present.')
console.log('Checked routes:')
for (const [route] of requiredRoutes) console.log(`- ${route}`)
for (const alias of aliases) console.log(`- ${alias}`)


// If a Next build already exists, validate that core app routes were registered by Next,
// not only that page files exist. This catches compile/manifest route regressions.
const appManifest = path.join(process.cwd(), '.next', 'server', 'app-paths-manifest.json')
if (fs.existsSync(appManifest)) {
  const manifest = JSON.parse(fs.readFileSync(appManifest, 'utf8'))
  const manifestRoutes = Object.keys(manifest)
  const requiredManifestRoutes = ['/page', '/products/page', '/contact/page', '/faq/page', '/delivery/page', '/blog/page']
  const missingManifestRoutes = requiredManifestRoutes.filter((route) => !manifestRoutes.includes(route))
  if (missingManifestRoutes.length > 0) {
    console.error('Route validation failed. Next build manifest is missing core routes:')
    for (const route of missingManifestRoutes) console.error(`- ${route}`)
    process.exit(1)
  }
  console.log('Next app route manifest check passed for core pages.')
}
