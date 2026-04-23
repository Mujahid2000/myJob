# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Job board platform built with Next.js 15 (App Router) as a frontend-only application. It connects to a separate backend API server. There are three user roles: **Admin**, **Company/Employer**, and **Candidate/Applicant**, each with their own dashboard area under `app/<role>-dashboard/`.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build (ESLint ignored during builds)
npm run lint       # Run ESLint
npm run clean      # Delete .next build cache
```

No test framework is configured.

## Architecture

### Frontend-Backend Split

This is a client-side app — all data fetching goes through RTK Query to an external REST API. The backend URL is set via `NEXT_PUBLIC_BACKEND_URL` (defaults to `localhost:5000`). There are no Next.js API routes or server actions.

### Authentication

Dual auth system:
1. **Firebase Auth** (`Authentication/`) — handles sign-in/sign-up UI flows
2. **JWT tokens** (`Store/JwtToken.ts`) — used for API requests, stored in Redux + localStorage

The `baseQueryWithReauth` in `RTKQuery/baseQuery.ts` handles automatic token refresh via `/jwt/refresh` with mutex-based concurrency protection. On 401 responses, it refreshes the token and retries the request.

### State Management

Redux Toolkit at `Store/Store.ts` with two types of slices:
- **RTK Query API slices** (in `RTKQuery/`) — server state with caching, e.g. `authSlice`, `companySlice`, `JobPostSliceApi`, `ChatMessage`
- **Plain Redux slices** (in `Store/`) — UI state like filters, modals, form data

The store is provided via `app/StoreProvider.tsx`, which wraps the app with both Redux `Provider` and `AuthProvider`.

### Directory Conventions

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages and layouts |
| `components/` | Reusable UI primitives (shadcn/ui) |
| `Component/` | Business logic components (capital C) |
| `Layout/` | Navbar and Footer |
| `RTKQuery/` | RTK Query API slice definitions and base query config |
| `Store/` | Redux slice definitions and store configuration |
| `Authentication/` | Firebase config and auth context |
| `lib/` | Utilities (socket.io client, Lenis smooth scroll, DOMPurify) |

### Key Dependencies

- **UI**: shadcn/ui (Radix primitives) + Tailwind CSS 4 + DaisyUI
- **Forms**: react-hook-form + zod validation
- **Real-time**: socket.io-client for notifications and chat
- **Payments**: PayPal via `@paypal/react-paypal-js`
- **Rich text**: react-quill-new
- **Charts**: recharts (admin dashboard)
- **Animation**: framer-motion

### Environment Variables

```
NEXT_PUBLIC_BACKEND_URL          # API base URL (e.g. http://localhost:5000)
NEXT_PUBLIC_BACKEND_URL_PAYMENT  # Payment API URL
NEXT_PUBLIC_PAYPAL_CLIENT_ID     # PayPal client ID
```
