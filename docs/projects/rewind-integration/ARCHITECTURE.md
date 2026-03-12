# Rewind Integration — Architecture

## Data Flow

```text
Upstream Services          Rewind API                    Portfolio
──────────────────         ──────────                    ─────────
Last.fm (scrobbles)  ──►
Strava (activities)  ──►   api.rewind.rest/v1  ──►  /api/{domain}/*  ──►  Page Components
Plex (watch history) ──►   cdn.rewind.rest     ──►  next/image       ──►  Image Display
Letterboxd (ratings) ──►
```

The portfolio never calls upstream services directly. Rewind handles syncing, normalization, filtering, image processing, and aggregation. The portfolio is a read-only consumer.

## API Client

```text
lib/rewind/
  client.ts       Typed fetch wrapper with Bearer auth
  types.ts        Shared response types (pagination, images, calendar)
  images.ts       CDN URL builder, thumbhash decode, color utilities
```

### Authentication

All requests to Rewind require a Bearer token. The token is stored as `REWIND_API_KEY` in environment variables and used only in Route Handlers (server-side).

```typescript
// lib/rewind/client.ts
const REWIND_BASE = 'https://api.rewind.rest/v1';

async function rewind<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${REWIND_BASE}${path}`);
  if (params)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.REWIND_API_KEY}` },
  });

  if (!res.ok) throw new Error(`Rewind ${path}: ${res.status}`);
  return res.json();
}
```

### Image CDN

Rewind stores and serves images through `cdn.rewind.rest` with on-the-fly transforms via Cloudflare Images. Each image response includes metadata for loading optimizations:

| Field            | Type             | Use                                       |
| ---------------- | ---------------- | ----------------------------------------- |
| `url`            | `string`         | CDN image URL                             |
| `thumbhash`      | `string \| null` | Base64 thumbhash for blur-up placeholder  |
| `dominant_color` | `string \| null` | Hex color for CSS background during load  |
| `accent_color`   | `string \| null` | Hex color for UI accents (borders, hover) |

Size variants are requested via URL path: `/images/{domain}/{type}/{id}/{size}` where size is `sm` (100px), `md` (300px), or `lg` (600px).

## Route Handler Pattern

Each portfolio route handler proxies a single Rewind endpoint, adding caching headers and normalizing the response shape for client components.

```text
app/api/
  listening/
    now-playing/route.ts    → /v1/listening/now-playing     (no-store)
    recent/route.ts         → /v1/listening/recent           (max-age=60)
    top-artists/route.ts    → /v1/listening/top/artists      (max-age=3600)
    top-albums/route.ts     → /v1/listening/top/albums       (max-age=3600)
    top-tracks/route.ts     → /v1/listening/top/tracks       (max-age=3600)
    calendar/route.ts       → /v1/listening/calendar         (max-age=3600)
    trends/route.ts         → /v1/listening/trends           (max-age=3600)
    year/[year]/route.ts    → /v1/listening/year/{year}      (max-age=86400)

  watching/
    recent/route.ts         → /v1/watching/recent            (max-age=300)
    stats/route.ts          → /v1/watching/stats             (max-age=3600)
    movies/route.ts         → /v1/watching/movies            (max-age=3600)
    ratings/route.ts        → /v1/watching/ratings           (max-age=3600)
    stats/genres/route.ts   → /v1/watching/stats/genres      (max-age=3600)
    stats/decades/route.ts  → /v1/watching/stats/decades     (max-age=3600)
    stats/directors/route.ts→ /v1/watching/stats/directors   (max-age=3600)
    calendar/route.ts       → /v1/watching/calendar          (max-age=3600)
    trends/route.ts         → /v1/watching/trends            (max-age=3600)
    year/[year]/route.ts    → /v1/watching/year/{year}       (max-age=86400)

  running/
    stats/route.ts          → /v1/running/stats              (max-age=3600)
    recent/route.ts         → /v1/running/recent             (max-age=300)
    prs/route.ts            → /v1/running/prs                (max-age=3600)
    gear/route.ts           → /v1/running/gear               (max-age=86400)
    races/route.ts          → /v1/running/races              (max-age=3600)
    cities/route.ts         → /v1/running/cities             (max-age=3600)
    streaks/route.ts        → /v1/running/streaks            (max-age=3600)
    calendar/route.ts       → /v1/running/calendar           (max-age=3600)
    charts/cumulative/route.ts → /v1/running/charts/cumulative (max-age=3600)
    charts/pace-trend/route.ts → /v1/running/charts/pace-trend (max-age=3600)
    charts/time-of-day/route.ts→ /v1/running/charts/time-of-day(max-age=3600)
    charts/elevation/route.ts  → /v1/running/charts/elevation  (max-age=3600)
    year/[year]/route.ts    → /v1/running/year/{year}        (max-age=86400)

  feed/
    route.ts                → /v1/feed                       (max-age=300)

  search/
    route.ts                → /v1/search                     (no-store)
```

## Caching Strategy

| Tier      | Cache           | Endpoints                         | Rationale                      |
| --------- | --------------- | --------------------------------- | ------------------------------ |
| Real-time | `no-store`      | now-playing, search               | Must be current                |
| Fresh     | `max-age=60`    | recent scrobbles                  | 1-minute staleness acceptable  |
| Recent    | `max-age=300`   | recent watches, recent runs, feed | 5-minute staleness acceptable  |
| Standard  | `max-age=3600`  | stats, tops, charts, calendar     | Changes slowly, 1-hour is fine |
| Static    | `max-age=86400` | gear, year-in-review              | Historical data rarely changes |

## Shared Components

### CalendarHeatmap

Reusable across all three domains. The Rewind calendar endpoints return the same shape:

```typescript
interface CalendarDay {
  date: string; // "2025-01-15"
  count: number; // scrobbles, films watched, or distance
}
```

The component accepts a `colorScale` prop to customize per domain (green for listening, blue for watching, orange for running).

### StatBar

Generic stats display used by all pages. Each page passes its own stat definitions.

## Page Architecture

Each domain page follows the same pattern:

```text
app/{domain}/
  page.tsx              Server component: layout, metadata, server-side stats fetch
  {Domain}Content.tsx   Client component: manages state, period/year selectors, data fetching

components/{domain}/
  {Domain}Stats.tsx     Stats bar (uses StatBar)
  ...                   Domain-specific components
```

### Server vs Client Split

| Server (page.tsx)         | Client ({Domain}Content.tsx) |
| ------------------------- | ---------------------------- |
| Layout wrapper            | Period/year selector state   |
| Page metadata             | Client-side data fetching    |
| Initial stats fetch (SSR) | Interactive filtering        |
| Static content            | Loading skeletons            |

## Dependencies

| Dependency  | Phase                | Purpose                                |
| ----------- | -------------------- | -------------------------------------- |
| `recharts`  | 1 (listening trends) | Line charts, bar charts, scatter plots |
| `thumbhash` | 0 (images)           | Decode thumbhash to blur placeholder   |

No database, no direct API clients, no sync infrastructure. The portfolio is a thin presentation layer over Rewind.

## Environment Variables

| Variable         | Required              | Description                     |
| ---------------- | --------------------- | ------------------------------- |
| `REWIND_API_KEY` | Yes                   | Rewind read key (`rw_live_...`) |
| `LASTFM_API_KEY` | Removed after Phase 1 | Legacy, replaced by Rewind      |

## File Structure

```text
lib/
  rewind/
    client.ts                   Phase 0 — API client
    types.ts                    Phase 0 — shared types
    images.ts                   Phase 0 — CDN + thumbhash utilities
  listening/
    types.ts                    Phase 1 — updated for Rewind response shapes
    constants.ts                Kept — TIME_PERIODS, display config
  watching/
    types.ts                    Phase 2
  running/
    types.ts                    Phase 3

components/
  CalendarHeatmap.tsx           Phase 0 — shared
  StatBar.tsx                   Phase 0 — shared
  listening/                    Phase 1 — existing + updated
  watching/                     Phase 2 — new
  running/                      Phase 3 — new

app/
  listening/                    Phase 1 — migrated
  watching/                     Phase 2 — new
  running/                      Phase 3 — new
  api/listening/                Phase 1 — migrated route handlers
  api/watching/                 Phase 2 — new route handlers
  api/running/                  Phase 3 — new route handlers
  api/feed/                     Phase 7 — cross-domain
  api/search/                   Phase 7 — cross-domain
```
