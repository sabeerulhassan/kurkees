# Phase 10 — Production QA + Technical SEO Hardening

This phase is intentionally conservative. No major visual redesign or feature rewrite was added.

## Changed

- Added `PRODUCTION_QA_CHECKLIST.md` for launch testing.
- Added `scripts/production-audit.mjs`.
- Added `npm run validate:production`.
- Updated `prebuild` to run route validation and production copy/API-card validation before `next build`.
- Added `lib/product-structured-data.ts` to centralize Product structured data.
- Hardened product, product-list, and collection JSON-LD so products without valid prices do not output invalid `Infinity` or broken offer data.
- Replaced remaining technical/broken-image copy with customer-safe fallback text.
- Kept product cards API-driven.
- Kept Notion blog behavior untouched.
- Kept routes untouched.

## Preserved

- ZIP excludes `public`.
- Product cards use API product data and API images.
- Product detail gallery uses API images, size-specific images, YouTube videos, thumbnails, and fullscreen image view.
- Cart and checkout behavior remain intact.
- Required dev script is preserved:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
