# CyberFolio — Cyberpunk Surveillance-HUD E-Portfolio

A production-grade, single-config e-portfolio with a cyberpunk computer-vision-HUD aesthetic.
Everything personal lives in **one file**: [`src/config.js`](src/config.js) — the UI *and* the RAG chatbot read from it.

> Open Source Template — fork it, edit `src/config.js`, deploy.

## Stack
- **React 18 + Vite**
- **GSAP + ScrollTrigger** — cinematic scroll animations
- **Three.js / React Three Fiber** — 3D hero scene (2D canvas fallback on mobile)
- **Framer Motion** — micro-interactions & transitions
- **Tailwind CSS** — layout
- **Gemini 2.0 Flash** via a Vercel serverless proxy — RAG chatbot (with offline keyword fallback)

## Quick start
```bash
npm install
npm run dev        # http://localhost:5173
```

## Configure
Edit only [`src/config.js`](src/config.js). Put images in `public/assets/` and reference them as `/assets/...`.

## Chatbot key (free + secure)
The Gemini key is **never** in client code. It lives in an env var read only by the serverless function `api/chat.js`.

1. Get a free key: https://aistudio.google.com/apikey
2. Local dev: copy `.env.example` → `.env`, set `GEMINI_API_KEY`.
3. Without a key, the chatbot still works using a local keyword-RAG over `config.js`.

## Deploy to Vercel
1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — framework auto-detected as **Vite**.
3. Add the env var **`GEMINI_API_KEY`** in *Settings → Environment Variables*.
4. Deploy. `vercel.json` handles SPA rewrites + asset caching; `api/chat.js` runs as a serverless function.

## Scripts
| command | action |
|---|---|
| `npm run dev` | local dev server |
| `npm run build` | production build → `dist/` |
| `npm run preview` | preview the production build |

## Accessibility
Respects `prefers-reduced-motion` (disables grain/glitch/scan), and the custom cursor only activates on fine-pointer devices.
