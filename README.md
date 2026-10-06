# CodeCell++ VESIT website (Next.js)

The CodeCell++ VESIT website, rebuilt on Next.js (App Router) from the original
Vite + React app. It looks and behaves the same, but every page is now pre-rendered
to HTML, which is what lets Google and other search engines read it properly.

Pages: `/` (home), `/team`, `/syrus` (Syrus 7.0 hackathon), `/code-of-conduct`.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build                # static site in ./out
```

`NEXT_PUBLIC_*` values are baked in at build time, so rebuild after changing them.
(They replace the old `VITE_*` names: `VITE_EMAILJS_SERVICE_ID` → `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, and so on.)

## Where things are

| Path | What |
| --- | --- |
| `src/app/` | Routes, page metadata, `sitemap.js`, `robots.js`, `manifest.js`, 404 page |
| `src/app/layout.jsx` | Site-wide `<head>`: title template, description, Open Graph/Twitter cards, site-wide structured data |
| `src/views/` | The four page screens (these were `pages/` in the Vite app) |
| `src/components/` | Same components as before |
| `src/lib/site.js` | Site name, URL, keywords, address, social links, preview image – edit SEO details here |
| `src/components/Seo/` | JSON-LD helper and the plain-text Syrus summary for crawlers |
| `src/components/SplashGate/` | The 1-second CodeCell logo splash |
| `public/` | Images, fonts, 3D models (served as-is) |
| `deploy/` | CloudFront URL-rewrite function for hosting on AWS |

## SEO – what is set up

- Server-rendered HTML for every page, with a unique `<title>`, description, canonical URL and Open Graph / Twitter preview image.
- Structured data (JSON-LD): organisation (with the alternate names *CodeCell*, *CodeCell VESIT*, *CodeCell++*), website, `Event` for Syrus 7.0, `FAQPage`, breadcrumbs.
- `/sitemap.xml`, `/robots.txt`, web manifest, 404 page marked `noindex`.
- One `<h1>` per page, real `<h2>`/`<h3>` headings, `alt` text on images, `lang="en-IN"`.

After deploying, do these once (this is what actually gets the site listed):

1. Open [Google Search Console](https://search.google.com/search-console), add the property for `https://codecell-pp-cmpn.vesit.ves.ac.in`, verify it (DNS record, or paste the HTML-tag code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy).
2. Submit `https://codecell-pp-cmpn.vesit.ves.ac.in/sitemap.xml`, then use *URL inspection → Request indexing* for `/` and `/syrus`.
3. Do the same in Bing Webmaster Tools (it can import from Search Console).
4. Link to the site from places Google already trusts: the VESIT website, the CodeCell LinkedIn / Instagram / GitHub profiles, Unstop's Syrus page, GDG/IIC pages. Backlinks matter more than anything in this repo for ranking.

Note: ranking #1 for the bare word "CodeCell" can't be promised – other companies and projects use that name. "CodeCell VESIT", "CodeCell++ VESIT" and "Syrus VESIT" are specific enough that the site should lead for them within a few weeks of being indexed.

## Deploying (static export on AWS S3 + CloudFront)

`next build` produces plain files in `out/`.

1. Upload `out/` to a private S3 bucket (`aws s3 sync out/ s3://<bucket> --delete`).
2. Put a CloudFront distribution in front (origin access control to the bucket, ACM certificate in `us-east-1` for the domain).
3. Attach `deploy/cloudfront-url-rewrite.js` as a **viewer request** CloudFront Function, so `/team` serves `team.html`.
4. Custom error responses: 403 and 404 → `/404.html` with status 404.
5. Cache: `_next/static/*` can be cached for a year (files are hashed); `*.html` should be short-lived (or invalidate `/*` after each deploy).
6. Point the domain's DNS (CNAME) at the CloudFront domain name.

## Notes

- Large images in `public/` (event photos, gallery, sponsor logos) are served unoptimised. Compressing the biggest ones (`sponsors/FalconX.webp`, `sponsors/PrakharLogo.jpeg`, `syrus-characters/*.png`) would speed up first load.
- The `.glb` 3D models in `public/spaceship-3d-models` are normal files here (no Git LFS), so they deploy anywhere, including Vercel.
- The loading splash uses `CodecellLogoRevolving.webp` (1 MB) instead of the old 58 MB GIF.
