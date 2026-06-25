# Phase 7.4 — Real backend product API integration

This phase aligns the frontend product layer with the existing Express backend:

- `GET http://localhost:8080/api/products`
- `GET http://localhost:8080/api/products/:slug`

The frontend now expects the backend response shape shown by the controller:

```json
{
  "data": [
    {
      "slug": "sugar-salted-smooth",
      "name": "Sugar Salted Smooth Peanut Butter",
      "images": [{ "image_url": "...", "position": 0 }],
      "sizes": [{ "size": "340g", "price": 1050, "in_stock": true }]
    }
  ]
}
```

## Important rules preserved

- Product cards use API product data.
- Product card images use API image fields.
- No hardcoded local product data is used for product-card rendering.
- Decorative and hero visuals outside product cards may still use hardcoded public paths.
- The `public` folder is not included in this ZIP.
- The dev script is preserved as:
  `"dev": "lsof -ti:3000 | xargs kill -9 &&next dev"`

## Environment

Use `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set `NEXT_PUBLIC_API_URL` or `PRODUCTS_API_URL` to the deployed backend API URL.
