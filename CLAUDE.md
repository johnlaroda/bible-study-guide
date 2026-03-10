# Bible Study Companion

## Purpose
A guided Bible reading app with one-page summaries for each book of the Bible. Designed to help readers understand the context, themes, and significance of every book — from Genesis to Revelation.

## Stack
- React 19 via Vite (JavaScript, no TypeScript)
- Tailwind CSS v4 with @tailwindcss/vite plugin
- No external API calls — all Bible data is hardcoded
- localStorage for progress persistence

## Architecture
- Single-page app; all UI logic lives in `src/App.jsx`
- Bible data in `src/bibleData.js` (imported into App.jsx)
- No routing library; view/tab state managed with `useState`
- Component-based layout using inner functional components

## Design System
- **Palette**: Navy (#1e3a5f), Gold (#d4a843), Cream (#fdf6e3), White (#ffffff)
- **Layout**: Mobile-first, card-based, responsive grid (1 → 2 → 3 columns)
- **Typography**: System font stack, readable sizing
- **Branding**: Subtle cross/scroll icon in header

## Key Rules
- All 66 books of the Bible must have accurate, complete data — no placeholders
- No external API calls; the app works fully offline
- Mobile-first design; must be usable on small screens
- Functional components only, hooks for state
- Tailwind utility classes only; no custom CSS files beyond Tailwind's base
- Progress tracking persisted to localStorage
