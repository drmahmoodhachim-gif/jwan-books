# Quick Setup Guide

## 1. Install and run

```bash
cd jwan-books
npm install
npm run dev
```

Open http://localhost:3000

## 2. Ask Jwan form (Formspree)

1. Go to https://formspree.io and sign up (free)
2. Create a new form
3. Copy your form ID (e.g. `mnqkzywo`)
4. Edit `src/app/ask-jwan/page.tsx` – replace `YOUR_FORMSPREE_ID` with your ID

Submissions go to your email. Nobody sees them publicly.

## 3. Do you want Jwan's reviews published only by you? (Recommended: Yes)

**Yes (recommended):** You add review files to `content/reviews/` yourself. Jwan writes the review text; you create the markdown file and push to GitHub. Safe and moderated.

**How to add a review:**
- Create a new `.md` file in `content/reviews/`
- Use the format shown in README.md
- Run `npm run build` and deploy

No database. No login. You control what gets published.
