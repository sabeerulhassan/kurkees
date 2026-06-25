# Phase 7.3 – API product-card data

This update keeps the visual redesign and header/product-card layout, but changes product-card rendering so product names, prices, sizes, stock status and product-card images come from the products API.

## Key rules applied

- `public` is not included in the ZIP.
- Product cards use API product data through `lib/api-products.ts`.
- Product-card images use API image fields (`images[].image_url`, `image_url`, `image`, etc.).
- Product cards no longer use hardcoded public image paths.
- Decorative product visuals outside product cards may still use hardcoded public paths.
- The required dev script is preserved:

```json
"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"
```

## API configuration

The products API defaults to:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

If API image URLs are relative, the frontend derives the asset host from `NEXT_PUBLIC_API_URL` by removing `/api`.

For example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Relative API image paths like `/uploads/classic-smooth.png` become:

```text
http://localhost:8080/uploads/classic-smooth.png
```

You can override that with:

```env
NEXT_PUBLIC_API_ASSET_URL=http://localhost:8080
```

## Files changed

- `lib/api-products.ts`
- `components/product-card.tsx`
- `components/products-client.tsx`
- `app/products/page.tsx`
- `app/products/[slug]/page.tsx`
- `app/products/[slug]/product-detail-client.tsx`
- `app/collections/[slug]/page.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/sitemap.ts`
- `app/shop/[slug]/page.tsx`
- `app/product/[slug]/page.tsx`
- `components/cart-drawer.tsx`
- `app/checkout/page.tsx`

## Validation

Route validation passed after the update.
