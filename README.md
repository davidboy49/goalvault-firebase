# GoalVault (Firebase + Next.js)

GoalVault is a starter web app scaffold for tracking savings goals using Firebase Auth + Firestore.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui (config + base components)
- Framer Motion
- Firebase Auth + Firestore

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

These values are consumed by `lib/firebase.ts`.

## 3) Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Routes included

- `/login` — Email + Google sign-in placeholder UI
- `/onboarding` — profile setup (currency, schedule, income buffer)
- `/dashboard` — protected dashboard skeleton
- `/goals` — protected goals list placeholder
- `/goals/[id]` — protected goal detail skeleton
- `/settings` — protected settings placeholder

## Route guard behavior

- Unauthenticated users are redirected to `/login` when visiting protected pages.
- Authenticated users who have not completed onboarding are redirected to `/onboarding`.
- Onboarding completion is read from `users/{uid}.onboardingCompleted` in Firestore.

## Firebase setup notes

- Enable **Email/Password** and **Google** providers in Firebase Auth.
- Ensure Firestore has a `users` collection where each document ID is the user UID.
