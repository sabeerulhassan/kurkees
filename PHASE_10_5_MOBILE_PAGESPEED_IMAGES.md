# Phase 10.5 — Mobile PageSpeed image delivery

Optimizes the decorative API product visuals flagged by PageSpeed.

## Fixed

- Homepage/about decorative product images no longer request 900px Cloudinary assets when displayed around 293px.
- Added responsive Cloudinary `srcSet` values for product visual images.
- Product jar clusters now use smaller responsive widths.
- Food moment cards now use smaller responsive widths.
- Product strip thumbnails now use small responsive image URLs.
- Added Cloudinary preconnect/dns-prefetch in the root layout.
- Added `res.cloudinary.com` to Next image remote patterns for future image optimization compatibility.

## Preserved

- Product cards remain API-driven and untouched.
- Product detail page gallery remains API-driven and untouched.
- Checkout layout from Phase 10.3 remains unchanged.
- API product visual conversion from Phase 10.4 remains unchanged.
- Notion blog untouched.
- Routes untouched.
- ZIP excludes `public`.
- Dev script remains:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`

## PageSpeed target

This phase targets the PageSpeed warning:
- `Improve image delivery — Est savings of 225 KiB`
