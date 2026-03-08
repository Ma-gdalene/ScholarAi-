# ScholarAi

ScholarAi is an AI-powered learning and school management platform prototype.

## Current Scope
- ✅ Student Platform (Phase 1 prototype)
- 🟨 Teacher Platform workflow docs (Phase 2 planning)
- ⏳ Parent Platform (future)

## Files You Asked For
- `index.html` - Student web UI
- `assets/styles.css` - Styling
- `assets/app.js` - Student dashboard behavior
- `docs/workflows/student-platform-phase1.md` - Human-readable student workflow
- `docs/workflows/teacher-platform-phase2.md` - Human-readable teacher workflow
- `czx/workflows/student-platform-phase1.czx.json` - Machine-readable CZX workflow file

## Run locally
```bash
python -m http.server 4173
```
Then open `http://localhost:4173`.

---

## How to run it on GitHub

You have two easy options.

### Option A: Run with GitHub Pages (recommended)
This repo includes `.github/workflows/deploy-pages.yml` to publish the app as a static website.

1. Push this repo to GitHub.
2. Make sure your default branch is `main` (or update the workflow trigger if using another branch).
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Source: GitHub Actions**.
5. Push to `main` (or manually run the workflow from **Actions**).
6. After deployment, GitHub shows your live URL (for example: `https://<username>.github.io/<repo>/`).

### Option B: Run in GitHub Codespaces
1. Open your repo on GitHub.
2. Click **Code → Codespaces → Create codespace on main**.
3. In the codespace terminal run:
   ```bash
   python -m http.server 4173
   ```
4. Open the forwarded port 4173 in the browser.

## Notes
- This is a static frontend prototype (no backend/database server yet).
- Secure Test Mode is a browser demo and not full device lockdown.
