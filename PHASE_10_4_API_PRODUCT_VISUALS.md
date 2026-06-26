# Phase 10.4 — API product visuals

Fixes broken product jar images outside the product listing and product detail pages.

## Changed

- Updated homepage visual product sections to use backend/API product images instead of old `/public` image paths.
- Updated about page visual product sections to use backend/API product images instead of old `/public` image paths.
- Updated `components/brand-visuals.tsx` so hero jar clusters, food moment cards, product strips and CTA jar stacks all receive API products.
- Product strip is now horizontally scrollable on small mobile screens.
- Large decorative product visuals use medium API image variants.
- Small pill images use thumbnail API image variants.

## Preserved

- Product cards remain API-driven.
- Product detail page remains API-driven.
- Notion blog untouched.
- Checkout untouched.
- Product backend/API logic untouched.
- No `public` folder included in ZIP.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
