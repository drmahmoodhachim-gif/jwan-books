# Jwan's Book Nook – Setup & Deploy

## 1. Firebase config

Both **jwan-books** and **jwan-library** use Firebase Realtime Database (project: `realtime-fe14f`).

### jwan-books (Next.js)
Create `.env.local` from the example and add your values from [Firebase Console → Project Settings](https://console.firebase.google.com/project/realtime-fe14f/settings/general):

```bash
cp .env.example .env.local
# Edit .env.local: add NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_APP_ID, etc.
```

### jwan-library (static)
Edit `jwan-library/firebase-config.js` and add: `apiKey`, `appId`, `messagingSenderId`.

## 2. GitHub secrets (for jwan-books deploy)

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret | Example |
|--------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIza...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `realtime-fe14f.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | `https://realtime-fe14f-default-rtdb.firebaseio.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `realtime-fe14f` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `realtime-fe14f.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:...` |

## 3. Local build (requires Node.js)

[Download Node.js LTS](https://nodejs.org) if not installed.

```bash
cd jwan-books
npm install
npm run build
```

## 4. Deploy (push to main)

```bash
cd jwan-books
git add -A && git commit -m "..." && git push origin main

cd ../jwan-library
git add -A && git commit -m "..." && git push origin main
```
