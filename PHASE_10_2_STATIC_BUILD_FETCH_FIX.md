# Phase 10.2 — Static build fetch fix

Fixed the Next.js production build issue where product API fetches used `cache: 'no-store'` during static page generation.

## Problem

During `next build`, Next tried to prerender product/about pages, but product API calls used dynamic fetch caching. That triggered `DYNAMIC_SERVER_USAGE` errors such as:

- `/products/[slug] couldn't be rendered statically because it used no-store fetch`
- `/about couldn't be rendered statically because it used revalidate: 0 fetch`

## Fix

`lib/api-products.ts` now uses ISR-compatible fetch options:

```ts
next: { revalidate: PRODUCTS_REVALIDATE_SECONDS }
```

Default product revalidation is 60 seconds.

You can optionally adjust it with:

```bash
PRODUCTS_REVALIDATE_SECONDS=60
```

## Preserved

- Product cards remain API-driven.
- Product detail pages remain API-driven.
- Product images remain API-driven.
- PDP gallery, size-specific images, fullscreen image, and YouTube video support remain intact.
- Notion blog untouched.
- Routes untouched.
- ZIP excludes `public`.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
