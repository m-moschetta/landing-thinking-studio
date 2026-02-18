# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thinking Studio Landing** is a lead-generation SaaS landing page for an Italian digital agency. It uses a conversational AI chatbot to qualify SME prospects, persists conversations in Firestore, and sends real-time Telegram alerts with AI-generated summaries when a lead submits contact info.

## Dev Commands

```bash
npm run dev       # Vite dev server on localhost:5173 (proxies /api → localhost:3001)
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
```

> The `/api` serverless functions only run on Vercel. For local testing of API routes, you need a separate local server on port 3001 (e.g., via Vercel CLI: `vercel dev`).

## Architecture

### Stack
- **Frontend:** React 19 + Vite (SPA), all styling via inline CSS (no external CSS files)
- **Serverless:** Vercel Functions in `/api/` — Node.js
- **Database:** Firebase Firestore (write-only for leads; reads blocked by security rules)
- **AI:** xAI Grok API (chat + summarization)
- **Notifications:** Telegram Bot API

### Key Files

| File | Role |
|------|------|
| `src/components/Landing.jsx` | ~1,700-line monolithic landing page with brutalist inline styles |
| `src/components/ChatMockup.jsx` | Interactive chatbot widget — manages conversation state, Firebase writes, lead form |
| `src/lib/firebase.js` | Firestore CRUD: `createConversation`, `updateConversation`, `saveLeadContact` |
| `api/chat.js` | POST `/api/chat` — sends messages to xAI Grok, returns AI response (30s timeout) |
| `api/lead.js` | POST `/api/lead` — validates contact, logs to Vercel, summarizes with AI, sends Telegram alert (60s timeout) |

### Data Flow

```
User chats → /api/chat (xAI Grok) → response displayed + Firestore updated
After 6+ exchanges or "ricontatter" keyword → lead form shown
User submits email/phone → /api/lead (logs + AI summary + Telegram) + Firestore saveLeadContact()
```

### Chat Completion Logic (`ChatMockup.jsx`)
The chat is considered "finished" when:
1. The exchange count reaches 6+ messages, **or**
2. The AI response includes the keyword `"ricontatter"` (Italian: "to contact back")

### Firestore Security Model
Security rules are **write-only** (public can create/update, nobody can read). This prevents competitors from scraping captured leads. Only the Telegram notification and Vercel logs provide read access to lead data.

### Environment Variables

```
XAI_API_KEY              # xAI Grok API key (server-side only)
TELEGRAM_BOT_TOKEN       # Telegram bot token (server-side only)
TELEGRAM_CHAT_ID         # Telegram chat/channel ID for notifications (server-side only)
VITE_FIREBASE_API_KEY    # Firebase config (VITE_ prefix = exposed to browser)
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Design Conventions
- **Brutalist aesthetic:** bold black borders, `#FF2D00` accent, stark black/white contrast
- **Fonts:** DM Sans (body), Playfair Display (display/serif)
- All styles are inline on components — no Tailwind, no CSS modules
- `Landing.jsx` contains keyframe animation definitions in a `<style>` tag injected via `useEffect`
