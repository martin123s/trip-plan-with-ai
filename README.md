This is a [Next.js](https://nextjs.org) project following with **TubeGuruji** youtube video at:(https://www.youtube.com/watch?v=sXRDL-EPtrM).

---

## Tech Stack

- Clerk
 – Authentication for sign-in / sign-up, session management.

- Shadcn/ui & Aceternity
 – Component libraries for polished UI and animations.

- Lucide-react
 – for lightweight vector icons..

- Zustand
 – Lightweight state management for global data access.

- Convex
 – Realtime database and backend functions.

- Arcjet
 – To handle user's frequency of using ai model.

- OpenRouter
 – AI model integration for trip planning and recommendations.

- Mapbox GL
 – Interactive maps with globe view and activity markers.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# and database running
npx convex dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## .env setup
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

CONVEX_DEPLOYMENT
GOOGLE_PLACE_API_KEY
NEXT_PUBLIC_MAPBOX_API_KEY
ARCJET_KEY
OPENROUTER_API_KEY
```