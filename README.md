# Jwan's Book Nook

A personal book review site for Jwan. Built with Next.js + Tailwind, hosted on GitHub Pages.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Formspree form (Ask Jwan)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form – you'll get a form ID like `xyzabcde`
3. Open `src/app/ask-jwan/page.tsx` and replace `YOUR_FORMSPREE_ID` with your form ID

### 3. Add book covers

Put cover images in `public/covers/` and reference them in your review frontmatter:

```yaml
cover: "/covers/hp1.jpg"
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
```

Output goes to the `out/` folder (static HTML).

## Adding reviews

See **[HOW-TO-ADD-REVIEWS.md](HOW-TO-ADD-REVIEWS.md)** for step-by-step instructions.

Quick version: Copy `content/reviews/_TEMPLATE.md`, rename it (e.g. `my-book-title.md`), fill it in, and push.

## Deploy to GitHub Pages

### Option A: GitHub Actions

1. Create a repo named `jwan-books` on GitHub
2. In `next.config.js`, set `basePath: '/jwan-books'` and `assetPrefix: '/jwan-books/'`
3. Add `.github/workflows/deploy.yml` (see below)
4. Push your code – the workflow builds and deploys

### Option B: Manual build

1. Run `npm run build`
2. Copy the contents of the `out/` folder to your repo
3. Enable GitHub Pages in repo Settings → Pages → source: main branch, /root or /docs

## Safety (for parents)

- Only first name "Jwan" used
- Ask Jwan form sends to your email – no public display
- Honeypot field blocks spam
- No comments anywhere
- Reviews published only by you (add markdown files manually)
