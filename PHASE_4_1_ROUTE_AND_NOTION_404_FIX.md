# Phase 4.1 Route and Notion 404 Fix

This patch focuses only on preventing route regressions after Phase 4.

## Fixes included

- Blog posts still fetch from Notion; no local/static blog fallback was added.
- Blog detail lookup is now more tolerant:
  - It first tries the exact Notion `Slug` rich text value.
  - It normalizes URL-style slugs, `/blog/post-slug` values, uppercase/lowercase variants, and extra slash/query/hash values.
  - If the exact slug query fails, it queries published posts and matches the same slug mapping used by `/blog`.
  - This prevents `/blog/[slug]` from 404ing when the blog index generated a valid link from Notion but detail lookup used a stricter Notion filter.
- Added `dynamicParams = true` to dynamic blog/product/collection pages for safer on-demand route handling.
- Added compatibility routes:
  - `/product/[slug]` redirects to the matching `/products/[slug]` page.
  - `/shop/[slug]` redirects to matching product or collection pages.
- Added deployment-level redirects for `/product/...` and `/shop/...` common aliases in `next.config.mjs`.

## Public folder

This ZIP intentionally excludes `public`, following the owner's instruction. Keep the existing `public` folder in the project when applying this patch.

## After applying

Run:

```bash
npm run build
npm run lint
```

Then check the exact URLs that previously 404ed, plus:

```text
/blog
/blog/[real-notion-slug]
/products/sugar-salted-smooth
/products/smooth-peanut-butter
/product/smooth-peanut-butter
/shop/smooth-peanut-butter
/collections/smooth-peanut-butter
/smooth-peanut-butter
/sitemap.xml
/feed.xml
```
