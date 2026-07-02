# Phase 10.6.1 — First-visit offer visibility fix

## Fixed

- The first-visit popup now shows on normal customer pages including:
  - `/`
  - `/products`
  - `/products/*`
  - `/collections/*`
  - `/blog/*`
- It still does not show on:
  - `/checkout`
  - `/thank-you`
  - `/admin/*`
  - `/login`
  - pages where the cart already has items
- Added instant test override:
  - `?offer=1`

## Timing

- Mobile delay: 4 seconds
- Desktop delay: 3.5 seconds
- `?offer=1`: shows immediately

## Test

Open:

```txt
http://localhost:3000/?offer=1
```

or:

```txt
http://localhost:3000/products?offer=1
```

## Preserved

- Mobile bottom-sheet design.
- Desktop bottom-right card.
- Dismissal stored for 14 days.
- Checkout distraction-free layout.
- Product/API/image work unchanged.
- ZIP excludes `public`.
