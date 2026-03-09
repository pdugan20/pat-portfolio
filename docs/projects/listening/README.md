# Listening Page

A `/listening` page for patdugan.me that displays current and historical music listening data alongside a physical record collection.

## Data Sources

- **Last.fm** (primary) — 123,769+ scrobbles since 2012, full history with timestamps and play counts. Username: `pdugan20`
- **Discogs** — Physical vinyl/CD collection. Username: `patdugan`
- **Apple Music** (via MusicKit JS) — Real-time "now playing" supplement

## Routes

- `/listening` — Main listening page
- `/api/listening/*` — Route Handlers that proxy external API calls

## Task Tracker

### Phase 0: Documentation and Setup

- [x] **0.1** Create `docs/projects/listening/README.md`
- [x] **0.2** Create `docs/projects/listening/ARCHITECTURE.md`
- [x] **0.3** Create `.env.example` with placeholder variable names
- [x] **0.4** Obtain Last.fm API key, add to `.env.local`
- [x] **0.5** Add `LASTFM_API_KEY` to Vercel environment settings

### Phase 1: Core Last.fm Integration (MVP)

#### 1A: Data Layer

- [x] **1.1** Create `lib/listening/types.ts` — TypeScript interfaces
- [x] **1.2** Create `lib/listening/constants.ts` — config and constants
- [x] **1.3** Create `lib/listening/lastfm.ts` — API client
- [x] **1.4** Create `lib/__tests__/lastfm.test.ts` — unit tests

#### 1B: Route Handlers

- [x] **1.5** Create `app/api/listening/now-playing/route.ts`
- [x] **1.6** Create `app/api/listening/recent/route.ts`
- [x] **1.7** Create `app/api/listening/top-artists/route.ts`
- [x] **1.8** Create `app/api/listening/top-albums/route.ts`
- [x] **1.9** Create `app/api/listening/top-tracks/route.ts`

#### 1C: UI Components

- [x] **1.10** Create `components/listening/NowPlaying.tsx`
- [x] **1.11** Create `components/listening/TimePeriodSelector.tsx`
- [x] **1.12** Create `components/listening/TopList.tsx`
- [x] **1.13** Create `components/listening/AlbumGrid.tsx`
- [x] **1.14** Create `components/listening/ListeningStats.tsx`
- [x] **1.15** Create `styles/components/listening.css`

#### 1D: Page Assembly

- [x] **1.16** Create `app/listening/page.tsx`
- [x] **1.17** Add `/listening` to `app/sitemap.ts`
- [x] **1.18** Content filtering — holiday music, audiobook detection (`lib/listening/filters.ts`)
- [ ] **1.19** Manual testing — dark mode, loading, error states, responsive

### Phase 2: Discogs + Apple Music + Polish

#### 2A: SWR Migration

- [ ] **2.1** Install `swr`
- [ ] **2.2** Create `lib/listening/hooks.ts` — custom SWR hooks
- [ ] **2.3** Migrate components from `useEffect`/`useState` to SWR

#### 2B: Discogs Integration

- [ ] **2.4** Add `DISCOGS_PERSONAL_TOKEN` to env vars
- [ ] **2.5** Add Discogs types to `lib/listening/types.ts`
- [ ] **2.6** Create `lib/listening/discogs.ts` — API client
- [ ] **2.7** Create `app/api/listening/discogs/collection/route.ts`
- [ ] **2.8** Create `components/listening/DiscogsCollection.tsx`
- [ ] **2.9** Add "Physical Collection" section to page

#### 2C: Apple Music Integration

- [ ] **2.10** Add `APPLE_MUSIC_DEVELOPER_TOKEN` to env vars
- [ ] **2.11** Create `lib/listening/apple-music.ts`
- [ ] **2.12** Update `NowPlaying.tsx` with MusicKit JS

#### 2D: Visual Polish

- [ ] **2.13** Migrate to `next/image` with `remotePatterns`
- [ ] **2.14** Responsive design audit

### Phase 3: Advanced Features

#### 3A: Listening Trends

- [ ] **3.1** Install `recharts`
- [ ] **3.2** Create `app/api/listening/charts/weekly/route.ts`
- [ ] **3.3** Create `components/listening/ListeningChart.tsx`

#### 3B: Calendar Heatmap

- [ ] **3.4** Create `components/listening/CalendarHeatmap.tsx`

#### 3C: Genre Breakdown

- [ ] **3.5** Create `lib/listening/genres.ts` — tag normalization
- [ ] **3.6** Create `components/listening/GenreBreakdown.tsx`

#### 3D: Cross-References

- [ ] **3.7** Create `components/listening/CollectionInsights.tsx`

#### 3E: Artist Deep Dives

- [ ] **3.8** Create `app/listening/artist/[name]/page.tsx`
