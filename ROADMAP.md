# 🗺️ LinkFlow Roadmap

_Last updated: 2026-07-21_

This roadmap is derived from an analysis of the current codebase. It prioritizes
work by **risk, value, and the gap between what the README promises and what
actually ships today.** Items are ordered so that each phase unblocks or
de-risks the next.

---

## 📊 Current State Assessment

LinkFlow already has impressive **breadth**: multi-profile ("multi-tenant")
schema, a real Smart Rules Engine, deep OAuth provider integrations, rich bio
cards, and an onboarding flow. The weakness is **depth in the core loop** —
several headline features are stubbed, insecure, or show dummy data.

### ✅ Genuinely built & substantial
- **Auth** — Better Auth + Google OAuth, API keys, orgs/members, Stripe customer linking (`lib/auth.ts`)
- **Multi-profile data model** — `Profile`, `Link`, `ClickEvent`, `Theme` (`prisma/schema.prisma`)
- **Smart Rules Engine** — geo/device/time/click-limit/A-B/rotation logic, ~720 lines (`lib/services/smart-rules-engine.ts`)
- **Link analytics service** — ~480 lines of real aggregation logic (`lib/services/link-analitycs.ts`)
- **Provider integrations** — Spotify, YouTube, Instagram, TikTok, Twitch, Gumroad, Wakatime (OAuth + fetch + bio cards)
- **Onboarding** — multi-step profile/appearance/links flow (`components/shared/onboarding/`)
- **Bio page rendering** — widget renderer + per-provider cards (`components/shared/bio/`)
- **Geolocation** — MaxMind GeoLite2 (`lib/georeader.ts`)

### ⚠️ Stubbed, insecure, or fake (the priority list)
| Area | Reality today | Location |
|------|---------------|----------|
| **Public API v1 auth** | ❌ **No authentication.** `userId`/`profileId` read from query params — anyone can read/create/delete any profile's links | `app/api/v1/links/route.ts` |
| **Admin dashboard home** | Literal `return <div>page</div>` | `app/admin/[layout]/page.tsx` |
| **Audience page** | Literal `return <div>page</div>` | `app/admin/[layout]/audience/page.tsx` |
| **Insight/analytics UI** | 100% **dummy data**; `getLinkStats()` is commented out | `app/admin/[layout]/insight/page.tsx` |
| **MCP server** | Only an `echo` tool despite README billing | `app/api/[transport]/route.ts`, `lib/mcp/index.ts` |
| **Rate limiting** | Redis/Upstash installed but not enforced on the API | — |
| **Tests** | ❌ None in the repo | — |

> The README advertises "API Key Management, rate-limited API access" and an "MCP
> Server" — neither is true yet. Closing that gap is the spine of this roadmap.

---

## 🚦 Prioritized Roadmap

### ✅ Phase 0 — Security & Correctness (DONE — 2026-07-21)
_These were live liabilities. All closed._

1. ✅ **Authenticated the public API (`/api/v1/*`)** — every management route now
   requires a Better Auth session or `x-api-key` (`getPrincipal`) and enforces
   ownership; `profileId` is validated against the caller, never trusted from a
   query param. Analytics stats are force-scoped to the authenticated user. The
   legacy unauthenticated `/api/links` duplicate was hardened the same way.
   - _Helpers:_ `lib/api/guard.ts`
   - _Routes:_ `app/api/v1/links/route.ts`, `links/[id]/route.ts`, `click/route.ts`, `links/evaluate/route.ts`, `click/events/route.ts`, `app/api/links/route.ts`

2. ✅ **Rate limiting** — Redis-backed fixed-window limiter (`lib/api/rate-limit.ts`),
   fails open if Redis is down. Per-user limits on authed routes; per-IP limits
   on the public click-recording and rule-evaluation endpoints.

3. ✅ **Input hardening** — stray `console.log(body)` debug lines removed, UTM
   fields length-capped, the debug `/api/v1/test` route now 404s in production.

4. ✅ **CI baseline** — `.github/workflows/ci.yml` runs `prisma generate`,
   `biome check`, and `tsc --noEmit` on every push/PR. (Build step deferred — it
   needs DB env; typecheck covers the regression surface cheaply.)

**Exit criteria met:** no unauthenticated data access; keys/IPs rate-limited; typecheck + lint green.

---

### ✅ Phase 1 — Make the Core Loop Real (DONE — 2026-07-21)
_The "see analytics" half of the promise is now real, profile-scoped data._

5. ✅ **Wired real analytics into the dashboard** — added a profile-scoped
   `getProfileLinkStats()` (reuses the existing aggregation via a shared
   `computeLinkStats` core) and fed it into `insight/page.tsx`: 5 real stat cards
   with sparklines + week-over-week trend, top links, and referrer breakdown.
   All dummy arrays removed; empty state shown when there are no clicks.
   - _Files:_ `lib/services/link-analitycs.ts`, `lib/analytics/dashboard.ts`, `app/admin/[layout]/insight/page.tsx`, `insight/_components/card-stats.tsx`

6. ✅ **Built the admin home dashboard** — real overview (profile views, total
   clicks, clicks today, active links), top links, and quick-nav CTAs incl. the
   public page. Replaced the `<div>page</div>` stub.
   - _File:_ `app/admin/[layout]/page.tsx`

7. ✅ **Built the Audience page** — countries, devices, browsers, OS, referrers,
   and UTM sources rendered from real click data via reusable breakdown cards.
   - _Files:_ `app/admin/[layout]/audience/page.tsx`, `components/shared/analytics/*`

8. ✅ **Analytics performance (foundational)** — click events now denormalize
   `profileId` (previously always null), and `ClickEvent` gained composite
   indexes `[linkId, timestamp]` / `[profileId, timestamp]` matching the
   dashboard's scope-plus-time-range query pattern. Migration generated
   (create-only) — **run `pnpm exec prisma migrate dev` to apply it.**
   Materialized daily rollups / cron remain a Phase 3 item once volume warrants.

**Exit criteria met:** a logged-in user sees their own real click/traffic data end to end.

> ⚠️ **Follow-up:** apply the pending migration
> (`20260721223701_analytics_clickevent_composite_indexes`) with
> `pnpm exec prisma migrate dev`. Historical click events created before this
> change have `profileId = null`; analytics still count them (they filter through
> the link relation), but a one-time backfill would let future queries filter on
> `clickEvent.profileId` directly.

---

### 🟡 Phase 2 — Differentiators & Monetization (PARTIAL — 2026-07-21)
_Now that the core loop is trustworthy, lean into what makes LinkFlow distinct._

9. ⏸️ **Ship a real MCP server** — deferred (not started, by request).

10. ✅ **Smart Rules UI polish** —
    - Rules now render **active-rule badges** on each link row in the editor
      (Geo / Device / Limits / Schedule / A/B), so what's configured is visible
      at a glance (`components/shared/forms/link-rules-summary.tsx`,
      `summarizeRules()` in `lib/utils/rules-normalizer.ts`).
    - Fixed **region targeting**: the geo form now uses ISO 3166-2 codes
      (`US-CA`…) matching the `country-subdivision` value the bio page derives
      from MaxMind, so region rules actually match.
    - **Verified rules execute end-to-end**: a `mobile`-only link is hidden for a
      desktop visitor and shown for a mobile UA on the live bio page.
    - _Known follow-up:_ **A/B testing** still persists config but doesn't
      execute. The single-link A/B form (variant A/B URLs) needs sticky
      per-visitor assignment, which an RSC page render can't set — it wants
      middleware or a click-time redirect route. Left as a Phase 3 item.

11. ⏸️ **Billing / plan gating** — deferred (not started, by request).

12. ✅ **Provider dashboard completion** — the dashboard query captured `error`
    but never rendered it, so an expired token showed a blank grid. Added an
    **error/reconnect state** (message + "Reconnect {provider}" button →
    `/api/provider/{provider}/connect`) and a generic empty state that no longer
    assumes the Gumroad `products` shape.
    - _Known follow-up:_ the populated grid still only renders the Gumroad
      `data.products` shape; per-provider result rendering (Spotify albums,
      YouTube videos, …) is a separate generalization.

**Exit criteria (revised for this pass):** rules are visible + verified working
in the editor and on the public page; providers surface a reconnect path on
failure. MCP + billing intentionally deferred.

---

### 🟢 Phase 3 — Scale, Polish & Trust (ongoing)
13. **Test coverage** — start with the Smart Rules Engine and analytics
    aggregation (highest logic density, highest regression risk), then API routes.
14. **Custom domains** — the `Profile.customDomain` field exists but there's no
    domain-verification/routing flow. Build it.
15. **Observability** — structured logging, error tracking (Sentry/PostHog), and
    API usage metrics.
16. **Accessibility & performance pass** on the public bio pages (they're the SEO/
    virality surface — must be fast and crawlable).
17. **Docs cleanup** — the README overclaims; reconcile it with shipped reality and
    document the real API + MCP surface.

---

## 🎯 If you only do three things next
1. **Lock down `/api/v1/*`** — it's an open door today. _(Phase 0)_
2. **Replace dummy analytics with real data.** — it's the product's core promise. _(Phase 1)_
3. **Turn the MCP stub into real tools** — it's your unfair advantage. _(Phase 2)_

---

## ⚖️ Prioritization rationale
- **Security before features** — an unauthenticated write API is an incident
  waiting to happen; everything else can wait a week.
- **Truth before breadth** — dummy dashboards and a stub MCP erode trust faster
  than missing features. Make existing claims real before adding new ones.
- **Leverage what exists** — the engine and analytics service are already built;
  most Phase 1–2 work is _wiring and UI_, not net-new logic. That's cheap value.
- **Defer scale work** — indexes, rollups, and tests matter, but only after the
  core loop is real and secure enough to be worth scaling.
