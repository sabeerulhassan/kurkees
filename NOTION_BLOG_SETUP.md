# Notion Blog Setup

The blog still loads posts from Notion. No local/static blog post source has been added.

Required environment variables:

```bash
NOTION_TOKEN=your_real_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
NEXT_PUBLIC_SITE_URL=https://kurkees.com
```

Local setup:

1. Copy `.env.example` to `.env.local`.
2. Paste the real `NOTION_TOKEN` and `NOTION_DATABASE_ID` values.
3. Restart the Next.js dev server.
4. Open `/blog`.

Deployment setup:

Add the same values to the hosting provider's environment variables. For Vercel, add them under Project Settings → Environment Variables, then redeploy.

The Notion database should keep the same properties the site already used:

- `Title` — title property
- `Slug` — rich text property
- `Excerpt` — rich text property
- `Date` — date property
- `Category` — select property
- `Published` — checkbox property
- Cover image — Notion page cover

The site also accepts these token variable names as fallback aliases: `NOTION_API_KEY`, `NOTION_SECRET`, or `NOTION_INTEGRATION_TOKEN`. The preferred name is still `NOTION_TOKEN`.

## Phase 4 checks

After deploying this version, also check:

- `/blog` loads published Notion posts.
- `/blog/your-real-slug` loads the full Notion article.
- `/sitemap.xml` includes Notion blog post URLs.
- `/feed.xml` returns an RSS feed built from Notion posts.

The blog remains Notion-first. There is no local/static blog fallback.
