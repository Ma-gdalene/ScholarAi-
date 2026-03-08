# ScholarAi Project Structure (Current)

This project intentionally uses folders. That is expected and correct for GitHub.

## Root files
- `index.html` → main entry page for the student platform UI
- `README.md` → setup/run instructions
- `PROJECT_STRUCTURE.md` → this quick structure map

## Folders
- `.github/workflows/`
  - `deploy-pages.yml` → GitHub Pages deployment workflow
- `assets/`
  - `scholarai-student-styles.css` → all UI styling
  - `scholarai-student-app.js` → dashboard behavior and workflow JSON fetch
- `czx/workflows/`
  - `scholarai-student-platform-phase1.workflow.czx.json` → machine-readable workflow
- `docs/workflows/`
  - `scholarai-student-platform-phase1.workflow.md` → student workflow (human-readable)
  - `scholarai-teacher-platform-phase2.workflow.md` → teacher workflow (human-readable)

## Edit guide
- Change UI layout/content: `index.html`
- Change styles: `assets/scholarai-student-styles.css`
- Change frontend logic: `assets/scholarai-student-app.js`
- Change workflows/docs: `docs/workflows/*` and `czx/workflows/*`
