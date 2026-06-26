const rootRedirects = [
  ['peanut-butter-price-in-sri-lanka', '/collections/peanut-butter-price-in-sri-lanka'],
  ['peanut-butter-price', '/collections/peanut-butter-price-in-sri-lanka'],
  ['peanut-butter-price-sri-lanka', '/collections/peanut-butter-price-in-sri-lanka'],
  ['peanut-butter-price-list', '/collections/peanut-butter-price-in-sri-lanka'],
  ['peanut-butter-online-order', '/collections/peanut-butter-price-in-sri-lanka'],
  ['buy-peanut-butter-online', '/collections/peanut-butter-price-in-sri-lanka'],
  ['natural-peanut-butter', '/collections/natural-peanut-butter'],
  ['natural-peanut-butter-sri-lanka', '/collections/natural-peanut-butter'],
  ['pure-peanut-butter', '/collections/natural-peanut-butter'],
  ['real-peanut-butter', '/collections/natural-peanut-butter'],
  ['smooth-peanut-butter', '/collections/smooth-peanut-butter'],
  ['smooth-peanut-butter-sri-lanka', '/collections/smooth-peanut-butter'],
  ['creamy-peanut-butter', '/collections/smooth-peanut-butter'],
  ['crunchy-peanut-butter', '/collections/crunchy-peanut-butter'],
  ['crunchy-peanut-butter-sri-lanka', '/collections/crunchy-peanut-butter'],
  ['sugar-free-peanut-butter', '/collections/sugar-free-peanut-butter'],
  ['no-sugar-peanut-butter', '/collections/sugar-free-peanut-butter'],
  ['no-sugar-no-salt-peanut-butter', '/products/unsalted-sugar-free-smooth'],
  ['unsalted-peanut-butter', '/products/unsalted-sugar-free-smooth'],
  ['chocolate-peanut-butter', '/collections/chocolate-peanut-butter'],
  ['chocolate-peanut-spread', '/products/chocofeda-chocolate-peanut'],
  ['chocofeda', '/products/chocofeda-chocolate-peanut'],
  ['protein-peanut-butter', '/collections/protein-peanut-butter'],
  ['peanut-butter-for-gym', '/collections/protein-peanut-butter'],
  ['peanut-butter-for-weight-gain', '/collections/protein-peanut-butter'],
]

const productRedirects = [
  ['smooth-peanut-butter', '/products/sugar-salted-smooth'],
  ['creamy-peanut-butter', '/products/sugar-salted-smooth'],
  ['crunchy-peanut-butter', '/products/sugar-salted-crunchy'],
  ['peanut-butter-crunch', '/products/sugar-salted-crunchy'],
  ['sugar-free-peanut-butter', '/products/salted-sugar-free-smooth'],
  ['no-sugar-peanut-butter', '/products/salted-sugar-free-smooth'],
  ['unsalted-peanut-butter', '/products/unsalted-sugar-free-smooth'],
  ['unsweetened-peanut-butter', '/products/unsalted-sugar-free-smooth'],
  ['no-sugar-no-salt-peanut-butter', '/products/unsalted-sugar-free-smooth'],
  ['chocolate-peanut-butter', '/products/chocofeda-chocolate-peanut'],
  ['chocolate-peanut-spread', '/products/chocofeda-chocolate-peanut'],
  ['chocofeda', '/products/chocofeda-chocolate-peanut'],
]


const legacyShopRedirects = [
  ['smooth-peanut-butter', '/products/sugar-salted-smooth'],
  ['creamy-peanut-butter', '/products/sugar-salted-smooth'],
  ['crunchy-peanut-butter', '/products/sugar-salted-crunchy'],
  ['sugar-free-peanut-butter', '/products/salted-sugar-free-smooth'],
  ['no-sugar-peanut-butter', '/products/salted-sugar-free-smooth'],
  ['unsalted-peanut-butter', '/products/unsalted-sugar-free-smooth'],
  ['chocolate-peanut-butter', '/products/chocofeda-chocolate-peanut'],
  ['chocolate-peanut-spread', '/products/chocofeda-chocolate-peanut'],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'file.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.notion-static.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.amazonaws.com',
      },
    ],
  },
  async redirects() {
    return [
      ...rootRedirects.map(([source, destination]) => ({
        source: `/${source}`,
        destination,
        permanent: true,
      })),
      ...productRedirects.map(([source, destination]) => ({
        source: `/products/${source}`,
        destination,
        permanent: true,
      })),
      ...productRedirects.map(([source, destination]) => ({
        source: `/product/${source}`,
        destination,
        permanent: true,
      })),
      ...legacyShopRedirects.map(([source, destination]) => ({
        source: `/shop/${source}`,
        destination,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
