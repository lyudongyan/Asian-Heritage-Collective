# AHC website deployment

The current website lives in `AstroSite`.

## Local preview

From the repository root:

```powershell
cd "AstroSite"
npm install
npm run dev
```

Open `http://localhost:4321`.

## Production build

```powershell
npm run build
```

The generated site is written to `dist`.

## Cloudflare Pages

Use these project settings:

- Root directory: `AstroSite`
- Build command: `npm run build`
- Build output directory: `dist`

The production routes are `/`, `/about`, `/events`, `/blog`, and `/team`, plus individual event and blog pages.
