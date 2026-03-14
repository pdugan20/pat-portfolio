# Rewind Integration

Integrate the [Rewind API](https://api.rewind.rest) into patdugan.me to power `/listening`, `/watching`, and `/running` pages with rich data visualizations.

Rewind is a personal data aggregation service that syncs Last.fm, Strava, Plex, Letterboxd, and Discogs into a centralized REST API. The portfolio consumes Rewind as its single data source instead of integrating with each service directly.

## Data Sources (via Rewind)

| Domain        | Upstream Source                      | Portfolio Page                     |
| ------------- | ------------------------------------ | ---------------------------------- |
| **Listening** | Last.fm (123K+ scrobbles since 2012) | `/listening` (existing, migrating) |
| **Watching**  | Plex + Letterboxd (movies only)      | `/watching` (new)                  |
| **Running**   | Strava (14+ years of activities)     | `/running` (new)                   |

## API Reference

- **Base URL**: `https://api.rewind.rest/v1`
- **Image CDN**: `https://cdn.rewind.rest`
- **Auth**: `Authorization: Bearer rw_live_...` (read key)
- **Pagination**: `{ data: [...], pagination: { page, limit, total, total_pages } }`
- **OpenAPI spec**: [pdugan20/rewind](https://github.com/pdugan20/rewind) `openapi.snapshot.json`

## Rewind API Updates (2026-03-13)

- **Date filtering on `/recent` endpoints**: All `/recent` endpoints now support `date`, `from`, and `to` query params for date-scoped queries (fixes [rewind#3](https://github.com/pdugan20/rewind/issues/3))
- **Audiobook/holiday filtering on top endpoints**: `/top/*` and `/year/*` endpoints now respect `is_filtered` flag, excluding audiobooks and holiday music from rankings (fixes [rewind#2](https://github.com/pdugan20/rewind/issues/2))
- **On-this-day endpoint**: `/v1/feed/on-this-day?month=M&day=D` returns cross-domain historical data for a given calendar date

## Task Tracker

### Phase 0: Foundation

Shared Rewind API client, types, and utilities that all three pages build on.

#### 0A: API Client

- [x] **0.1** Add `REWIND_API_KEY` to `.env.local` and `.env.example`
- [ ] **0.2** Add `REWIND_API_KEY` to Vercel environment settings (all environments)
- [x] **0.3** Create `lib/rewind/client.ts` — typed fetch wrapper with Bearer auth, error handling, base URL config
- [x] **0.4** Create `lib/rewind/types.ts` — shared response types: `PaginationMeta`, `ImageAttachment`, `CalendarDay`, `FeedItem`

#### 0B: Image Utilities

- [x] **0.5** Create `lib/rewind/images.ts` — CDN URL builder for `cdn.rewind.rest` with size params, thumbhash decode for blur placeholders, dominant/accent color extraction
- [x] **0.6** Add `cdn.rewind.rest` and `api.rewind.rest` to `next.config.ts` `images.remotePatterns`

#### 0C: Shared Components

- [x] **0.7** Create `components/CalendarHeatmap.tsx` — reusable GitHub-style heatmap (used by listening, watching, running). Props: `data: CalendarDay[]`, `year`, `colorScale`, `tooltipFormatter`
- [x] **0.8** Create `components/StatBar.tsx` — reusable stats display row (used by all pages). Props: `stats: { label, value, detail? }[]`
- [x] **0.9** Create `components/DomainNav.tsx` — shared tab navigation across listening/watching/running
- [x] **0.10** Create `components/YearSelector.tsx` — year toggle for calendar heatmaps and year-scoped data
- [x] **0.11** Install `@visx/*` and `react-activity-calendar`
- [x] **0.12** Refactor `/listening` to use shared `StatBar` and `DomainNav`

#### 0D: Homepage Now Section

- [x] **0.13** Create `components/NowSection.tsx` — homepage widget showing latest data from each domain
- [x] **0.14** Add `NowSection` to `app/page.tsx` between intro and Writing sections

### Phase 1: Migrate /listening to Rewind API

Replace direct Last.fm API calls with Rewind API. Keep existing UI components, add new features unlocked by Rewind.

#### 1A: Route Handler Migration

- [x] **1.1** Update `app/api/listening/now-playing/route.ts` → call `/v1/listening/now-playing`
- [x] **1.2** Update `app/api/listening/recent/route.ts` → call `/v1/listening/recent`
- [x] **1.3** Update `app/api/listening/top-artists/route.ts` → call `/v1/listening/top/artists`
- [x] **1.4** Update `app/api/listening/top-albums/route.ts` → call `/v1/listening/top/albums`
- [x] **1.5** Update `app/api/listening/top-tracks/route.ts` → call `/v1/listening/top/tracks`
- [x] **1.6** Update stats fetch in `app/listening/page.tsx` → call `/v1/listening/stats`

#### 1B: Remove Direct Last.fm Code

- [x] **1.7** Delete `lib/listening/lastfm.ts` (replaced by Rewind client)
- [x] **1.8** Delete `lib/listening/filters.ts` (filtering now handled server-side by Rewind)
- [x] **1.9** Update `lib/listening/types.ts` — replace Last.fm response types with Rewind response types
- [x] **1.10** Update or remove `lib/__tests__/lastfm.test.ts`

#### 1C: New Features (Rewind-Enabled)

- [x] **1.11** Add streaks to stats bar (`/v1/listening/streaks`) — current and longest streak
- [x] **1.12** Create `app/api/listening/calendar/route.ts` → call `/v1/listening/calendar`
- [x] **1.13** Add `CalendarHeatmap` to listening page — daily scrobble counts, year selector
- [x] **1.14** Create `app/api/listening/trends/route.ts` → call `/v1/listening/trends`
- [x] **1.15** Create `components/listening/ListeningTrends.tsx` — monthly scrobble line chart (visx)

#### 1D: Image Upgrade

- [x] **1.16** Migrate album/artist images to Rewind CDN URLs with thumbhash blur placeholders
- [x] **1.17** Switch `<img>` tags to `next/image` with `remotePatterns` for CDN

#### 1E: Verification

- [x] **1.18** Verify all existing functionality works with Rewind data source
- [ ] **1.19** Test dark mode rendering — calendar heatmap colors, trends chart colors, stat bar
- [ ] **1.20** Test loading states — skeleton shows while calendar/trends/top lists fetch
- [ ] **1.21** Test error states — verify graceful degradation when Rewind API is unreachable (calendar shows empty, trends hides, stats bar still renders from SSR cache)
- [ ] **1.22** Test responsive layout — calendar heatmap overflow on mobile, trends chart axis labels, top list truncation
- [ ] **1.23** Test year selector — switching years updates calendar + trends, edge cases (first year 2012, current year)
- [ ] **1.24** Confirm `LASTFM_API_KEY` env var is no longer needed; remove from Vercel if so

### Phase 2: /watching Page (Movies)

New page displaying movie watching data. No TV shows initially.

#### 2A: Route Handlers

- [x] **2.1** Create `app/api/watching/recent/route.ts` → `/v1/watching/recent` (5-min cache)
- [ ] **2.2** Create `app/api/watching/stats/route.ts` → `/v1/watching/stats` (1-hour cache)
- [ ] **2.3** Create `app/api/watching/movies/route.ts` → `/v1/watching/movies` (1-hour cache)
- [ ] **2.4** Create `app/api/watching/ratings/route.ts` → `/v1/watching/ratings` (1-hour cache)
- [ ] **2.5** Create `app/api/watching/stats/genres/route.ts` → `/v1/watching/stats/genres`
- [ ] **2.6** Create `app/api/watching/stats/decades/route.ts` → `/v1/watching/stats/decades`
- [ ] **2.7** Create `app/api/watching/stats/directors/route.ts` → `/v1/watching/stats/directors`

#### 2B: Types

- [ ] **2.8** Create `lib/watching/types.ts` — `Movie`, `WatchStats`, `GenreStat`, `DecadeStat`, `DirectorStat`, `WatchingCalendarDay`

#### 2C: UI Components

- [ ] **2.9** Create `components/watching/RecentWatches.tsx` — poster row of 5 most recent movies
- [ ] **2.10** Create `components/watching/WatchingStats.tsx` — stats bar: total films, avg rating, hours watched, unique directors
- [ ] **2.11** Create `components/watching/PosterGrid.tsx` — filterable/sortable movie poster grid with genre and decade filters
- [ ] **2.12** Create `components/watching/RatingsHistogram.tsx` — bar chart of rating distribution (visx)
- [ ] **2.13** Create `components/watching/GenreBreakdown.tsx` — horizontal bar chart of top genres
- [ ] **2.14** Create `components/watching/DecadeBreakdown.tsx` — bar chart of films by release decade
- [ ] **2.15** Create `components/watching/TopDirectors.tsx` — ranked list of most-watched directors

#### 2D: Page Assembly

- [ ] **2.16** Create `app/watching/page.tsx` — server component with layout, metadata, server-side stats
- [ ] **2.17** Create `app/watching/WatchingContent.tsx` — client component managing filters and data fetching
- [ ] **2.18** Add `/watching` to `app/sitemap.ts`
- [ ] **2.19** Manual testing — dark mode, loading states, poster loading, responsive layout

### Phase 3: /running Page

New page displaying running data from Strava via Rewind.

#### 3A: Route Handlers

- [ ] **3.1** Create `app/api/running/stats/route.ts` → `/v1/running/stats` (1-hour cache)
- [x] **3.2** Create `app/api/running/recent/route.ts` → `/v1/running/recent` (5-min cache)
- [ ] **3.3** Create `app/api/running/prs/route.ts` → `/v1/running/prs` (1-hour cache)
- [ ] **3.4** Create `app/api/running/gear/route.ts` → `/v1/running/gear` (24-hour cache)
- [ ] **3.5** Create `app/api/running/races/route.ts` → `/v1/running/races` (1-hour cache)
- [ ] **3.6** Create `app/api/running/cities/route.ts` → `/v1/running/cities` (1-hour cache)
- [ ] **3.7** Create `app/api/running/streaks/route.ts` → `/v1/running/streaks` (1-hour cache)

#### 3B: Types

- [ ] **3.8** Create `lib/running/types.ts` — `RunActivity`, `RunningStats`, `PersonalRecord`, `GearItem`, `Race`, `City`, `RunStreak`

#### 3C: UI Components

- [ ] **3.9** Create `components/running/RunningStats.tsx` — hero stats: total distance, total runs, years running, current streak
- [ ] **3.10** Create `components/running/RecentRuns.tsx` — last 10 runs with date, distance, pace, city
- [ ] **3.11** Create `components/running/PersonalRecords.tsx` — best times at standard distances (5K, 10K, half, marathon)
- [ ] **3.12** Create `components/running/GearList.tsx` — shoes with mileage progress bars, retired shoes dimmed
- [ ] **3.13** Create `components/running/RaceResults.tsx` — race highlights with distance, time, pace, PR badges
- [ ] **3.14** Create `components/running/Cities.tsx` — cities where you've run, sorted by frequency

#### 3D: Page Assembly

- [ ] **3.15** Create `app/running/page.tsx` — server component with layout, metadata, server-side stats
- [ ] **3.16** Create `app/running/RunningContent.tsx` — client component managing data fetching
- [ ] **3.17** Add `/running` to `app/sitemap.ts`
- [ ] **3.18** Manual testing — dark mode, loading states, responsive layout

### Phase 4: Calendar Heatmaps and Trends

Add calendar heatmaps and trend visualizations across all three pages using the shared `CalendarHeatmap` component and `visx`.

#### 4B: Listening

- [ ] **4.2** Wire `CalendarHeatmap` into `/listening` with scrobble data (if not done in Phase 1)

#### 4C: Watching

- [ ] **4.3** Create `app/api/watching/calendar/route.ts` → `/v1/watching/calendar`
- [ ] **4.4** Add `CalendarHeatmap` to `/watching` — films watched per day
- [ ] **4.5** Create `app/api/watching/trends/route.ts` → `/v1/watching/trends`
- [ ] **4.6** Create `components/watching/WatchingTrends.tsx` — monthly watch count line chart

#### 4D: Running

- [ ] **4.7** Create `app/api/running/calendar/route.ts` → `/v1/running/calendar`
- [ ] **4.8** Add `CalendarHeatmap` to `/running` — daily distance as color intensity

### Phase 5: Running Charts

Running-specific chart visualizations. These endpoints return pre-computed chart data from Rewind.

- [ ] **5.1** Create `app/api/running/charts/cumulative/route.ts` → `/v1/running/charts/cumulative`
- [ ] **5.2** Create `components/running/CumulativeChart.tsx` — year-over-year cumulative distance lines (visx)
- [ ] **5.3** Create `app/api/running/charts/pace-trend/route.ts` → `/v1/running/charts/pace-trend`
- [ ] **5.4** Create `components/running/PaceTrendChart.tsx` — rolling average pace over time
- [ ] **5.5** Create `app/api/running/charts/time-of-day/route.ts` → `/v1/running/charts/time-of-day`
- [ ] **5.6** Create `components/running/TimeOfDayChart.tsx` — when you run (radial or bar chart)
- [ ] **5.7** Create `app/api/running/charts/elevation/route.ts` → `/v1/running/charts/elevation`
- [ ] **5.8** Create `components/running/ElevationChart.tsx` — elevation gain trends
- [ ] **5.9** Create `components/running/EddingtonNumber.tsx` — display from `/v1/running/eddington`

### Phase 6: Year in Review

Annual summary pages for each domain, powered by Rewind's `/year/{year}` endpoints.

- [x] **6.1** Create `app/api/listening/year/[year]/route.ts` → `/v1/listening/year/{year}`
- [ ] **6.2** Create `app/listening/year/[year]/page.tsx` — annual listening summary
- [ ] **6.3** Create `app/api/watching/year/[year]/route.ts` → `/v1/watching/year/{year}`
- [ ] **6.4** Create `app/watching/year/[year]/page.tsx` — annual watching summary
- [ ] **6.5** Create `app/api/running/year/[year]/route.ts` → `/v1/running/year/{year}`
- [ ] **6.6** Create `app/running/year/[year]/page.tsx` — annual running summary

### Phase 7: Cross-Domain Features

Features that combine data across listening, watching, and running.

- [ ] **7.1** Create `app/api/feed/route.ts` → `/v1/feed` (cursor-based pagination)
- [ ] **7.2** Create `components/ActivityFeed.tsx` — unified timeline: scrobbles, watches, runs
- [ ] **7.3** Integrate activity feed into homepage or dedicated `/activity` page
- [ ] **7.4** Create `app/api/search/route.ts` → `/v1/search`
- [ ] **7.5** Create cross-domain search component (stretch goal)
