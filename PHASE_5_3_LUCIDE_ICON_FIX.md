# Phase 5.3 — Lucide Facebook Icon Build Fix

## Issue

The contact page imported `Facebook` from `lucide-react`:

```ts
import { Facebook } from 'lucide-react'
```

The installed `lucide-react` package does not export an icon named `Facebook`, so Next.js failed with:

```text
Export Facebook doesn't exist in target module
```

## Fix

- Removed `Facebook` from the `lucide-react` import in `app/contact/page.tsx`.
- Added a small local `FacebookIcon` SVG component inside `app/contact/page.tsx`.
- Kept the visible Facebook contact card and link unchanged.
- Ran `npm run validate:routes` successfully.

## Future rule

Do not use brand/social icons from `lucide-react` unless the installed package version is confirmed to export them. Prefer local inline SVGs for social brand icons.
