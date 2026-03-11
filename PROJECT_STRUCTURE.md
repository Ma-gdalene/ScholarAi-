# ScholarAi Project Structure (Current)

This project intentionally uses folders plus multiple root HTML pages for clear page flow.

## Root files
- `index.html` → shared first page (Teacher/Learner portal selection)
- `login.html` → role-aware login page
- `kyc.html` → KYC form page
- `otp.html` → OTP check page
- `success.html` → verification success page
- `learner-dashboard.html` → learner command center
- `teacher-dashboard.html` → teacher command center
- `assignment-view.html` → assignment question interface
- `results.html` → assignment results view
- `progress.html` → learner analytics page
- `student-insights.html` → teacher class analytics page
- `content-library.html` → teacher reusable resources
- `README.md` → setup/run instructions
- `PROJECT_STRUCTURE.md` → this structure map

## Folders
- `.github/workflows/`
  - `deploy-pages.yml` → GitHub Pages deployment workflow
- `assets/`
  - `scholarai-student-styles.css` → all UI styling
  - `scholarai-student-app.js` → authentication/login page flow logic
  - `post-kyc.js` → role guards, dashboard rendering, assignment/result flow
- `czx/workflows/`
  - `scholarai-student-platform-phase1.workflow.czx.json` → machine-readable workflow
- `docs/workflows/`
  - `scholarai-student-platform-phase1.workflow.md` → student workflow (human-readable)
  - `scholarai-teacher-platform-phase2.workflow.md` → teacher workflow (human-readable)

## Edit guide
- Change first page layout/content: `index.html`
- Change login page: `login.html`
- Change KYC / OTP pages: `kyc.html`, `otp.html`
- Change style system: `assets/scholarai-student-styles.css`
- Change frontend logic: `assets/scholarai-student-app.js`
