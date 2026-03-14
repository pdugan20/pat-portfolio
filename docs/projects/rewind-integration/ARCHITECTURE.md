# Rewind Integration — Architecture

## Data Flow

```text
Upstream Services          Rewind API                    Portfolio
──────────────────         ──────────                    ─────────
Last.fm (scrobbles)  ──►
Plex (watch history) ──►   api.rewind.rest/v1  ──►  /api/{domain}/*  ──►  Page Components
Letterboxd (ratings) ──►   cdn.rewind.rest     ──►  next/image       ──►  Image Display
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

All requests to Rewind require a Bearer token stored as `REWIND_API_KEY`, used only in Route Handlers (server-side).

### Image CDN

Rewind serves images through `cdn.rewind.rest`. Each image response includes:

| Field            | Type             | Use                                       |
| ---------------- | ---------------- | ----------------------------------------- |
| `url`            | `string`         | CDN image URL                             |
| `thumbhash`      | `string \| null` | Base64 thumbhash for blur-up placeholder  |
| `dominant_color` | `string \| null` | Hex color for CSS background during load  |
| `accent_color`   | `string \| null` | Hex color for UI accents (borders, hover) |

## Route Handlers

Each portfolio route handler proxies a single Rewind endpoint with caching headers.

```text
app/api/
  listening/
    now-playing/route.ts    → /v1/listening/now-playing     (no-store)
    recent/route.ts         → /v1/listening/recent           (max-age=60)
    top-artists/route.ts    → /v1/listening/top/artists      (max-age=3600)
    top-albums/route.ts     → /v1/listening/top/albums       (max-age=3600)
    top-tracks/route.ts     → /v1/listening/top/tracks       (max-age=3600)
    stats/route.ts          → /v1/listening/stats             (max-age=3600)
    streaks/route.ts        → /v1/listening/streaks           (max-age=3600)
    calendar/route.ts       → /v1/listening/calendar          (max-age=3600)
    trends/route.ts         → /v1/listening/trends            (max-age=3600)
    genres/route.ts         → /v1/listening/genres            (max-age=300)
    year/[year]/route.ts    → /v1/listening/year/{year}       (max-age=3600)

  watching/
    recent/route.ts         → /v1/watching/recent             (max-age=300)
    stats/route.ts          → /v1/watching/stats              (max-age=3600)
    movies/route.ts         → /v1/watching/movies             (max-age=3600)
    ratings/route.ts        → /v1/watching/ratings            (max-age=3600)
    reviews/route.ts        → /v1/watching/reviews            (max-age=3600)
    stats/genres/route.ts   → /v1/watching/stats/genres       (max-age=3600)
    stats/decades/route.ts  → /v1/watching/stats/decades      (max-age=3600)
    stats/directors/route.ts→ /v1/watching/stats/directors    (max-age=3600)
    year/[year]/route.ts    → /v1/watching/year/{year}        (max-age=3600)
```

## Caching Strategy

| Tier      | Cache          | Endpoints                 | Rationale                      |
| --------- | -------------- | ------------------------- | ------------------------------ |
| Real-time | `no-store`     | now-playing               | Must be current                |
| Fresh     | `max-age=60`   | recent scrobbles          | 1-minute staleness acceptable  |
| Recent    | `max-age=300`  | recent watches, genres    | 5-minute staleness acceptable  |
| Standard  | `max-age=3600` | stats, tops, charts, year | Changes slowly, 1-hour is fine |

## Page Architecture

### /listening

Year/month filtering with inline dropdowns. Genre stacked bar chart (year view) or trend line (all-time). Top artists, albums, tracks scoped to selected period.

```text
app/listening/
  page.tsx              Server component: layout, metadata
  ListeningContent.tsx  Client component: year/month state, data fetching, all UI

components/listening/
  GenreChart.tsx         Stacked horizontal bar chart (visx BarStackHorizontal)
  ListeningTrends.tsx    Monthly scrobble line/bar chart (visx)
  NowPlaying.tsx         Now playing widget
```

### /watching

Two-view layout toggled by profile/films tabs. Profile shows stats + recent activity + reviews. Films shows a filterable poster grid with grid/list toggle.

```text
app/watching/
  page.tsx              Server component: layout, metadata
  WatchingContent.tsx   Client component: view toggle, filters, all UI

lib/watching/
  types.ts              Movie, WatchEvent, WatchStats, GenreStat, etc.
```

Data sources: Plex (real-time watch events via webhooks), Letterboxd (ratings, reviews, rewatch flags via RSS + CSV import). Merged in Rewind with `source` field (`plex` | `letterboxd` | `manual`).

## Dependencies

| Dependency  | Purpose                              |
| ----------- | ------------------------------------ |
| `@visx/*`   | Line charts, bar charts (listening)  |
| `thumbhash` | Decode thumbhash to blur placeholder |

## Environment Variables

| Variable         | Required | Description                     |
| ---------------- | -------- | ------------------------------- |
| `REWIND_API_KEY` | Yes      | Rewind read key (`rw_live_...`) |

## File Structure

```text
lib/
  rewind/
    client.ts               API client
    types.ts                Shared types (pagination, images, calendar, listening)
    images.ts               CDN + thumbhash utilities
  listening/
    genre-colors.ts         Genre color palette
  watching/
    types.ts                Watching domain types

components/
  CalendarHeatmap.tsx       Shared heatmap
  DomainNav.tsx             Shared tab navigation
  NowSection.tsx            Homepage widget
  listening/
    GenreChart.tsx           Genre stacked bar chart
    ListeningTrends.tsx     Monthly scrobble chart
    NowPlaying.tsx          Now playing widget

app/
  listening/                Migrated to Rewind
  watching/                 New — profile/films views
  api/listening/            Route handlers
  api/watching/             Route handlers
```
