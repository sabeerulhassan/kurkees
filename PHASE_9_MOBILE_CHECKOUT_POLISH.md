# Phase 9 — Mobile UX + Checkout Trust Polish

This phase focuses on conversion polish without changing product data, Notion blog, routes, or backend behavior.

## Updated

- Product cards are cleaner on mobile with slightly shorter image areas, smaller text, and consistent spacing.
- `/products` hero uses lighter mobile spacing and hides the decorative product collage on small screens.
- PDP gallery is more compact on mobile while preserving:
  - API product media
  - size-specific images
  - YouTube video first slide
  - thumbnails
  - fullscreen image view
- PDP now has a mobile-only sticky buy bar with selected size, price, Add to Basket, and Buy Now.
- PDP size selector remains compact and price stays in the dedicated price area.
- Checkout now has clearer trust/support copy and a sticky order summary on desktop.
- Checkout no longer blocks the screen while checking discounts; it shows an inline status instead.
- Checkout cart item images now fail gracefully.
- Cart drawer now has a clearer empty state and delivery/COD reassurance.

## Preserved

- Product cards remain API-driven.
- Product card images remain API-driven.
- Product detail media remains API-driven.
- Notion blog is untouched.
- Routes are untouched.
- `public` folder is excluded.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`
