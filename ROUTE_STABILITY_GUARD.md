# Route Stability Guard

This project now includes a route validation script so SEO/content changes do not accidentally remove important pages.

Run before build or deployment:

```bash
npm run validate:routes
npm run build
```

`npm run build` also runs the route validation automatically through the `prebuild` script.

The guard checks that these core routes have actual App Router files:

- `/`
- `/products`
- `/products/[slug]`
- `/contact`
- `/faq`
- `/delivery`
- `/blog`
- `/blog/[slug]`
- `/collections`
- `/collections/[slug]`
- `/shop`
- `/shop/[slug]`
- `/product/[slug]`
- `/sitemap.xml`
- `/robots.txt`
- `/feed.xml`

It also checks that important root SEO aliases are covered by either explicit route files or the root alias safety route.

Important deployment note: this ZIP intentionally excludes `public/`. Keep your existing `public` folder in place when applying this update.
