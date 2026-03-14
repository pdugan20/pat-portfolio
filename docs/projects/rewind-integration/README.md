# Rewind Integration

Integrate the [Rewind API](https://api.rewind.rest) into patdugan.me to power `/listening` and `/watching` pages.

Rewind is a personal data aggregation service that syncs Last.fm, Strava, Plex, Letterboxd, and Discogs into a centralized REST API. The portfolio consumes Rewind as its single data source instead of integrating with each service directly.

## Data Sources (via Rewind)

| Domain        | Upstream Source                      | Portfolio Page | Status      |
| ------------- | ------------------------------------ | -------------- | ----------- |
| **Listening** | Last.fm (123K+ scrobbles since 2012) | `/listening`   | Live        |
| **Watching**  | Plex + Letterboxd (movies only)      | `/watching`    | In progress |
| **Running**   | Strava (14+ years of activities)     | `/running`     | Deferred    |

## API Reference

- **Base URL**: `https://api.rewind.rest/v1`
- **Image CDN**: `https://cdn.rewind.rest`
- **Auth**: `Authorization: Bearer rw_live_...` (read key)
- **Pagination**: `{ data: [...], pagination: { page, limit, total, total_pages } }`
- **OpenAPI spec**: [pdugan20/rewind](https://github.com/pdugan20/rewind) `openapi.snapshot.json`

## Known Rewind Issues

- [rewind#7](https://github.com/pdugan20/rewind/issues/7) — Duplicate watch entries from Plex + Letterboxd on adjacent days (client-side dedup as interim workaround)
- [rewind#8](https://github.com/pdugan20/rewind/issues/8) — TMDB image pipeline fetches non-English posters for some films

## Task Tracker

### Phase 0: Foundation (complete)

Shared Rewind API client, types, and utilities.

- [x] **0.1** `REWIND_API_KEY` in `.env.local` and `.env.example`
- [x] **0.2** `lib/rewind/client.ts` — typed fetch wrapper with Bearer auth
- [x] **0.3** `lib/rewind/types.ts` — shared response types
- [x] **0.4** `lib/rewind/images.ts` — CDN URL builder, thumbhash decode, color utilities
- [x] **0.5** `next.config.ts` — `cdn.rewind.rest` and `api.rewind.rest` in `images.remotePatterns`
- [x] **0.6** `components/CalendarHeatmap.tsx`, `StatBar.tsx`, `DomainNav.tsx`, `YearSelector.tsx`
- [x] **0.7** `components/NowSection.tsx` — homepage widget
- [x] **0.8** Install `@visx/*` and `react-activity-calendar`

### Phase 1: /listening (complete, needs polish)

Migrated from direct Last.fm API to Rewind. Year/month filtering, genre chart, top lists, streaks, calendar heatmap, trends.

- [x] Route handlers migrated (now-playing, recent, top-artists/albums/tracks, stats, calendar, trends, year, genres)
- [x] Direct Last.fm code removed (`lib/listening/lastfm.ts`, `lib/listening/filters.ts`)
- [x] Streaks, calendar heatmap, trends chart, genre stacked bar chart
- [x] Images migrated to Rewind CDN with thumbhash blur placeholders

### Phase 2: /watching (complete, needs polish)

Two-view layout: profile view (stats + recent + reviews) and films view (filterable poster grid with grid/list toggle). Rewind merges Plex (real-time watch events) and Letterboxd (ratings, reviews, rewatch flags) into a unified watch history — no Letterboxd-specific code needed.

- [x] Route handlers (recent, stats, movies, ratings, reviews, stats/genres, stats/decades, stats/directors, year)
- [x] Types (`lib/watching/types.ts`)
- [x] Profile view — stats header, recent activity poster row (deduped), recent Letterboxd reviews
- [x] Films view — poster grid with genre/decade/sort filters, grid/list layout toggle
- [x] Sitemap updated

### Polish: /listening

Items remaining before deployment:

- [ ] **L.1** Dark mode — verify calendar heatmap colors, trends chart, genre chart, stat bar
- [ ] **L.2** Loading states — skeleton while calendar/trends/top lists/genre data fetch
- [ ] **L.3** Error states — graceful degradation when Rewind API unreachable
- [ ] **L.4** Responsive — calendar heatmap overflow on mobile, trends chart axis labels, top list truncation
- [ ] **L.5** Year selector edge cases — first year (2012), current year, switching years refetches genre data
- [ ] **L.6** Genre chart polish — loading skeleton, empty state when genre data sparse, dark mode colors
- [ ] **L.7** Remove `LASTFM_API_KEY` from Vercel environment settings (no longer needed)
- [ ] **L.8** Add `REWIND_API_KEY` to Vercel environment settings (all environments)

### Polish: /watching

Items remaining before deployment:

- [ ] **W.1** Dark mode — poster grid, list view, reviews, stats header
- [ ] **W.2** Loading states — skeleton while stats/recent/reviews/movies fetch
- [ ] **W.3** Responsive — poster grid column count on mobile, list view truncation, filter bar wrapping
- [ ] **W.4** List view polish — verify metadata display, rating column, genre truncation
- [ ] **W.5** Poster image quality — blocked by [rewind#8](https://github.com/pdugan20/rewind/issues/8) (non-English posters)
- [ ] **W.6** Duplicate entries — blocked by [rewind#7](https://github.com/pdugan20/rewind/issues/7) (client-side dedup is interim fix)
- [ ] **W.7** Empty states — handle zero reviews, zero movies gracefully
- [ ] **W.8** Films view pagination — verify "load more" works across filter changes

---

### Future: /running Page

Deferred. Route handler for `/api/running/recent` exists but no page or UI. Rewind has full running data from Strava (stats, PRs, gear, races, cities, streaks, charts).

### Future: Calendar Heatmaps & Trends for /watching

- Calendar heatmap (films per day) via `/v1/watching/calendar`
- Monthly trends chart via `/v1/watching/trends`

### Future: Year-in-Review Pages

Dedicated `/listening/year/[year]` and `/watching/year/[year]` pages. Route handlers exist, pages do not.

### Future: Cross-Domain Features

- Unified activity feed (`/v1/feed`)
- Cross-domain search (`/v1/search`)
