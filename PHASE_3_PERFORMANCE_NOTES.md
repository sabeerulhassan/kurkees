# Phase 3 — Performance, Core Web Vitals, and Mobile UX Notes

This phase keeps the Phase 2.2 Notion-powered blog flow intact. Blog posts still come from Notion through `lib/notion.ts`.

## Main changes

- Removed the global welcome promo modal from `app/layout.tsx` so every page no longer ships and runs that localStorage/timer-driven modal code.
- Reduced global font payload by removing the unused Geist Mono webfont and lowering loaded Google font weights.
- Added `display: 'swap'` to the active `next/font` families.
- Converted the footer from a client component to a server component.
- Converted testimonials from a JavaScript carousel to a server-rendered responsive scroll/grid layout.
- Split the cart drawer out of the navbar into `components/cart-drawer.tsx` and dynamically load it only when the basket is opened.
- Converted `/blog` from client-side category filtering to server-rendered Notion posts with URL category filters.
- Replaced raw `<img>` elements with `next/image` in active pages/components:
  - homepage blog cards
  - blog index cards
  - blog post featured image
  - cart drawer items
  - checkout order summary items
- Enabled AVIF/WebP image output in `next.config.mjs`.
- Added extra Notion image host patterns for safer remote image handling.
- Kept all product, collection, route-alias, sitemap, and Notion blog work from previous phases.

## Expected benefits

- Less JavaScript on homepage and blog pages.
- Fewer client components in the shared layout.
- Smaller initial navbar bundle because cart drawer quantity controls are loaded only when needed.
- Better image sizing and less layout shift from blog/product/cart images.
- Cleaner mobile review section without carousel hydration.

## Important deployment note

The generated ZIP intentionally excludes the `public` folder from this phase onward. Keep your existing `public` folder in your project so product images such as `/hero-jar.png`, `/classic-smooth.png`, and `/og-image.jpg` remain available.

## After applying this phase

Run:

```bash
npm run build
npm run lint
```

Then check:

```text
/
/products
/products/sugar-salted-smooth
/collections
/blog
/blog/[one-real-notion-slug]
/checkout
```

Also test opening the basket drawer and placing a COD order flow locally.
