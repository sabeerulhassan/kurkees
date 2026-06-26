#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const scannedDirs = ['app', 'components', 'lib']
const extensions = new Set(['.ts', '.tsx', '.js', '.jsx'])

const bannedVisiblePhrases = [
  'Start the API',
  'check NEXT_PUBLIC_API_URL',
  'load from the products API',
  'Product image missing from API',
  'Product media missing from API',
  'This product image URL could not be loaded',
]

const requiredFiles = [
  'app/products/page.tsx',
  'app/products/[slug]/page.tsx',
  'app/products/[slug]/product-detail-client.tsx',
  'app/collections/[slug]/page.tsx',
  'app/checkout/page.tsx',
  'app/sitemap.ts',
  'app/robots.ts',
  'components/product-card.tsx',
  'lib/api-products.ts',
  'lib/collection-matching.ts',
  'lib/product-structured-data.ts',
]

function walk(dir) {
  const abs = path.join(root, dir)
  if (!fs.existsSync(abs)) return []
  const entries = []

  for (const item of fs.readdirSync(abs, { withFileTypes: true })) {
    const itemPath = path.join(abs, item.name)
    if (item.isDirectory()) {
      if (['node_modules', '.next', 'public'].includes(item.name)) continue
      entries.push(...walk(path.relative(root, itemPath)))
    } else if (extensions.has(path.extname(item.name))) {
      entries.push(itemPath)
    }
  }

  return entries
}

const errors = []

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing required production file: ${file}`)
  }
}

const files = scannedDirs.flatMap(walk)
for (const file of files) {
  const rel = path.relative(root, file)
  const source = fs.readFileSync(file, 'utf8')

  for (const phrase of bannedVisiblePhrases) {
    if (source.includes(phrase)) {
      errors.push(`Banned unfinished/customer-visible phrase found in ${rel}: "${phrase}"`)
    }
  }
}

const productCard = fs.existsSync(path.join(root, 'components/product-card.tsx'))
  ? fs.readFileSync(path.join(root, 'components/product-card.tsx'), 'utf8')
  : ''

if (productCard.includes("@/lib/data")) {
  errors.push('ProductCard must not import hardcoded product data from lib/data.')
}

if (!productCard.includes("@/lib/api-products")) {
  errors.push('ProductCard must use the API product normalizer from lib/api-products.')
}

const packageJsonPath = path.join(root, 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const devScript = packageJson?.scripts?.dev
  if (devScript !== 'lsof -ti:3000 | xargs kill -9 &&next dev') {
    errors.push('package.json dev script changed. It must remain: lsof -ti:3000 | xargs kill -9 &&next dev')
  }
} else {
  errors.push('Missing package.json')
}

if (errors.length > 0) {
  console.error('Production audit failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Production audit passed. No unfinished customer-facing setup copy found, product cards remain API-driven, and required files are present.')
