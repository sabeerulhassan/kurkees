# Phase 10.3 — Focused checkout layout

Checkout-only conversion polish.

## Changed

- `/checkout` now uses a minimal checkout header instead of the full site navigation.
- The normal footer is hidden on `/checkout`.
- Checkout keeps only:
  - Kurkees logo
  - secure checkout reassurance
  - order summary
  - delivery details form
  - final total
  - small WhatsApp help link
- Reduced top-page marketing/distraction copy on checkout.
- Normal navigation and footer remain unchanged on every other route.

## Preserved

- Cart context and checkout order submission logic are unchanged.
- Product API logic unchanged.
- Product cards remain API-driven.
- Product images remain API-driven.
- Notion blog untouched.
- Routes untouched.
- ZIP excludes `public`.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
