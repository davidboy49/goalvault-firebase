# GoalVault (Firebase + Next.js)

GoalVault is a starter web app scaffold for tracking savings goals using Firebase Auth + Firestore.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui (configuration + starter components)
- Framer Motion
- Firebase Auth + Firestore

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Copy and edit the example file:

```bash
cp .env.local.example .env.local
```

Then fill in values:

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

Then open [http://localhost:3000](http://localhost:3000).

## Routes included

- `/login` — Email + Google sign-in placeholder UI
- `/onboarding` — profile setup (currency, schedule, income buffer)
- `/dashboard` — protected dashboard skeleton
- `/goals` — protected goals list placeholder
- `/goals/[id]` — protected goal detail skeleton
- `/settings` — protected settings placeholder

## Route guard behavior

- If a user is not authenticated and opens `/dashboard`, `/goals`, or `/settings`, they are redirected to `/login`.
- If a user is authenticated but `onboardingCompleted` is false, protected pages redirect to `/onboarding`.
- Onboarding completion is read from Firestore at `users/{uid}.onboardingCompleted`.

## Firebase setup notes

- Enable **Email/Password** and **Google** providers in Firebase Auth.
- Ensure Firestore has a `users` collection where each document ID is the user UID.
