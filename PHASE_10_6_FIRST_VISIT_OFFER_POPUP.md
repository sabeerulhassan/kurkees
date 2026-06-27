# Phase 10.6 — Lightweight first-visit offer popup

## Added

- Lightweight first-visit offer popup for new visitors.
- Lazy-loaded popup chunk through `next/dynamic`.
- Mobile-first bottom sheet design.
- Desktop compact bottom-right card.
- 5 second desktop delay and 6.5 second mobile delay.
- Dismissal stored in `localStorage` for 14 days.

## Rules

The popup does not show on:

- `/checkout`
- `/thank-you`
- `/products`
- `/products/*`
- `/product/*`
- `/shop/*`
- any page after the cart has items
- pages where the visitor dismissed it within the last 14 days

## Preserved

- Checkout distraction-free layout remains unchanged.
- Product cards remain API-driven.
- Product detail page remains API-driven.
- API product visuals remain optimized from Phase 10.5.
- Notion blog untouched.
- ZIP excludes `public`.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
