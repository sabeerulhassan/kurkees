# Phase 8 — UX and conversion polish

This phase is deliberately low-risk. It keeps routing, Notion, backend product fetching, cart logic, checkout API endpoints, product cards, PDP gallery, and SEO schema intact.

## Changes

- Merged the latest website-side image rendering safeguards from the image upload/render fix.
- Kept product cards fully API-driven.
- Kept product card images fully API-driven.
- Added safer hero product imagery on `/products` so broken API image URLs do not create visible broken image icons.
- Improved checkout reliability by sending `total_amount` to the backend order endpoint. This matches the backend price-tampering validation flow.
- Added an empty-basket state in checkout summary.
- Disabled checkout submit when the basket is empty.
- Added cart drawer image fallbacks so old/bad cart images do not show broken image icons.
- Added Escape-key close and body scroll lock for PDP fullscreen product image view.

## Preserved

- Existing route aliases and route guard.
- Notion blog fetching.
- Product JSON-LD.
- Product image/video gallery behavior.
- Size-specific image override behavior.
- Website checkout as the main ordering path.
- WhatsApp as secondary support only.
- No `public` folder in the ZIP.
- Dev script: `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`.
