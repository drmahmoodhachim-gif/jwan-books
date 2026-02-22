# Firebase Setup for Ask Jwan

The Ask Jwan form saves submissions to **Firebase Realtime Database** (same as [kids-quiz](https://github.com/drmahmoodhachim-gif/kids-quiz_lAYAN)). Submissions are stored and shown live on the page.

## If you already have Firebase for kids-quiz

Use the **same Firebase project**. Add these variables in GitHub:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Under **Variables**, add each (use the same values from your kids-quiz Firebase config):

| Variable | From Firebase Console |
|----------|------------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | apiKey |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | authDomain |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | databaseURL |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | projectId |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | storageBucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | appId |

3. Push to main – the next build will use these values.

## Database rules

In Firebase Console → **Realtime Database** → **Rules**, ensure `askJwan` and `jwanLibrary` are writable. Example:

```json
{
  "rules": {
    "quiz": {
      ".read": true,
      ".write": true
    },
    "askJwan": {
      ".read": true,
      ".write": true
    },
    "jwanLibrary": {
      ".read": true,
      ".write": true
    }
  }
}
```

`jwanLibrary/books` stores books from My Library so they appear on the reviews page.

## Data path

Submissions are stored at: `askJwan/submissions`

Each entry: `{ name, email?, message, createdAt }`
