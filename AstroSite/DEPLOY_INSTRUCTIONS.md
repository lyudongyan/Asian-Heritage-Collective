# AHC Astro Site — Deployment Instructions

You don't need to know how to code to do this. Follow the steps in order.

---

## Step 1: Copy your images and videos

The new site needs all the same images and videos as the old site.

1. Open File Explorer
2. Go to: `Asian-Heritage-Collective\Github\src\assets\`
3. Copy the entire `images` folder
4. Go to: `Asian-Heritage-Collective\AstroSite\src\assets\`
5. Paste the `images` folder there

Then do the same for videos:
1. Back in `Github\src\assets\`, copy the `videos` folder
2. Paste it into `AstroSite\src\assets\`

When done, `AstroSite\src\assets\` should have both an `images` folder and a `videos` folder.

---

## Step 2: Install Node.js (if you haven't already)

1. Go to https://nodejs.org
2. Download the **LTS** version and install it
3. To verify: open Command Prompt (search "cmd" in Start menu), type `node --version` and press Enter — you should see a version number

---

## Step 3: Install the site's dependencies

1. Open Command Prompt
2. Type this and press Enter:
   ```
   cd "C:\Users\Lyuwen Yan\Documents\Asian-Heritage-Collective\AstroSite"
   ```
3. Then type this and press Enter:
   ```
   npm install
   ```
4. Wait for it to finish (it will download packages — takes 1–3 minutes)

---

## Step 4: Test the site locally (optional but recommended)

While still in Command Prompt in the AstroSite folder:

```
npm run dev
```

Then open your browser and go to: **http://localhost:4321**

You should see the full site. Check that:
- The homepage loads with the background video and logo
- Clicking nav links goes to real pages (e.g. `/about`, `/blog`, `/events`, `/team`, `/games`)
- Blog posts open at their own URLs (e.g. `/blog/i-quit-chinese-school`)
- Event pages open at their own URLs (e.g. `/events/evt-3`)

Press `Ctrl+C` in Command Prompt to stop the preview server when done.

---

## Step 5: Push to GitHub

The site builds automatically on Cloudflare Pages when you push to GitHub. You just need to copy the AstroSite files into your GitHub repo.

**Option A — easiest: replace the GitHub repo contents**

1. Open `Asian-Heritage-Collective\Github\` — this is your current GitHub repo folder
2. Delete everything inside it **except** the `.git` folder (that hidden folder is important — don't delete it)
3. Copy everything from `AstroSite\` into the `Github\` folder
4. Open GitHub Desktop (or your git tool), commit with a message like "Migrate to Astro SSG", and push

**Option B — if you use the GitHub website**

Upload the AstroSite files directly through github.com. Make sure to replace the old `src/`, `public/`, `package.json`, `astro.config.mjs`, and `tsconfig.json`.

---

## Step 6: Update Cloudflare Pages build settings

After pushing, go to your Cloudflare Pages dashboard:

1. Open the project for asianheritagecollective.org
2. Go to **Settings → Build & Deploy**
3. Set:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave blank or set to root)
4. Save and trigger a new deployment

Cloudflare will build the site and deploy it. Takes about 1–2 minutes.

---

## What changed and why

| Before | After |
|--------|-------|
| One HTML file, JavaScript fakes the pages | Real HTML file for every page |
| `/blog` shows a blank shell until JS loads | `/blog` is a real page with content in the HTML |
| Social media previews show generic info | Each page has its own title, description, and image |
| Google can't crawl most pages | Every page is indexable |
| Nav links were `onClick` handlers | Nav links are real `<a href>` tags |

The site looks and behaves identically to users — the difference is under the hood, in how the HTML is delivered.

---

## If something looks broken

- **Images not showing:** Make sure you copied the `images` folder correctly in Step 1
- **Video not playing:** Make sure you copied the `videos` folder correctly in Step 1
- **Build fails on Cloudflare:** Check that the build command is `npm run build` and output is `dist`
- **Styles look wrong:** This is likely a Tailwind issue — run `npm run build` locally first and see if it errors

For any issues, the error messages in Command Prompt or the Cloudflare build log will say exactly what went wrong.
