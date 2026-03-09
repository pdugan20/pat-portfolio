# Listening Page — Architecture

## Data Flow

```text
External APIs          Route Handlers              Client Components
─────────────          ──────────────              ─────────────────
Last.fm API    ──►  /api/listening/now-playing  ──►  NowPlaying.tsx (polls 30s)
               ──►  /api/listening/recent       ──►  Page (recent tracks)
               ──►  /api/listening/top-artists  ──►  TopList.tsx
               ──►  /api/listening/top-albums   ──►  AlbumGrid.tsx / TopList.tsx
               ──►  /api/listening/top-tracks   ──►  TopList.tsx

Discogs API    ──►  /api/listening/discogs/     ──►  DiscogsCollection.tsx
                    collection

Apple Music    ──►  MusicKit JS (client-side)   ──►  NowPlaying.tsx (supplement)
```

## API Key Security

All external API keys are stored as environment variables and accessed only in Route Handlers (server-side). Client components fetch from internal `/api/listening/*` routes, never from external APIs directly.

## Caching Strategy

| Endpoint                     | Cache           | Rationale                        |
| ---------------------------- | --------------- | -------------------------------- |
| `/api/listening/now-playing` | `no-store`      | Must be real-time                |
| `/api/listening/recent`      | `max-age=60`    | 1-minute freshness is sufficient |
| `/api/listening/top-*`       | `max-age=3600`  | Top lists change slowly          |
| `/api/listening/discogs/*`   | `max-age=86400` | Collection changes rarely        |
| `/api/listening/charts/*`    | `max-age=86400` | Historical data is static        |

## External API Details

### Last.fm

- **Auth**: API key as query parameter (read-only, no OAuth)
- **Rate limit**: 5 requests/second
- **Base URL**: `https://ws.audioscrobbler.com/2.0/`
- **Format**: JSON (`format=json` query param)
- **Pagination**: `limit` (max 200/page) + `page` params
- **Time periods**: `7day`, `1month`, `3month`, `6month`, `12month`, `overall`
- **Note**: Artist images are deprecated (empty URLs). Album art works fine.
- **Note**: Audiobooks and holiday music appear as scrobbles — filtered via `lib/listening/filters.ts` (see Content Filtering below).

### Discogs

- **Auth**: `Authorization: Discogs token={token}` header
- **Rate limit**: 60 requests/minute (authenticated)
- **Base URL**: `https://api.discogs.com`
- **Format**: JSON
- **Pagination**: `page` + `per_page` params

### Apple Music (MusicKit JS)

- **Auth**: Developer token (JWT, 6-month expiry) + Music User Token (6-month expiry, manual re-auth)
- **Limitations**: No timestamps on played tracks, no play counts via web API, 50-item recent history cap
- **Use case**: Real-time "now playing" only — not for historical data
- **Token regeneration**: Developer token must be regenerated every 6 months from Apple Developer portal. Document the expiry date in `.env.local` comments.

## Content Filtering

Non-music content is filtered out of all top lists via `lib/listening/filters.ts`. The normalize functions in `lastfm.ts` over-fetch (`fetchLimit: 30`) and re-rank after filtering to ensure `displayLimit` (10) clean results.

### Holiday/Christmas Music

- **Album filtering**: Substring match against album names (e.g., "charlie brown christmas", "merry christmas")
- **Track filtering**: Substring match against track names (e.g., "jingle bell", "silent night", "santa claus")
- **Exact track titles**: Case-insensitive exact match for ambiguous titles (e.g., "Skating", "Greensleeves") scoped to known holiday artists (Vince Guaraldi Trio, Bing Crosby, Nat King Cole)

### Audiobook Detection

- **Artist list**: Exact match against known audiobook authors (Stephen King, Thomas Pynchon, Hunter S. Thompson, Ian Fleming, etc.)
- **Track name patterns**: Substring match for Libby app tracks (`libby--open-`)
- **Track name regexes**: Numbered chapter formats (`- Part 3`, `- Track 007`, `- 02`, trailing `(3)`)

### Adding New Filters

Add entries to the appropriate array in `filters.ts`. Over-fetching ensures filtered items don't reduce the displayed count below 10.

## Known Issues

- **NowPlaying requires public recent tracks**: Last.fm privacy setting must allow public recent tracks at <https://www.last.fm/settings/privacy>, otherwise the now-playing widget silently shows nothing.
- **Client fetch uses `cache: 'no-store'`**: Prevents stale browser cache during development. Server-side `Cache-Control` headers still handle CDN caching in production.

## Design Patterns

### Matching Existing Site Patterns

- **Page layout**: `Layout` wrapper component (653px max-width, footer)
- **Section headers**: `font-mono text-xs tracking-wider uppercase text-text-muted`
- **Interactive lists**: `HoverList` component for hover-highlight rows
- **Color tokens**: `text-text-primary`, `text-text-muted`, `dark:text-text-dark-*`
- **Metadata**: `export const metadata: Metadata` on each page

### Phase 1 Constraints

- No SWR/React Query — plain `fetch` + `useState`/`useEffect`
- No `next/image` for external URLs — standard `<img>` with `loading="lazy"`
- No charting library — text-based stats only
- Minimal new CSS — leverage Tailwind utilities, add only pulse animation and grid styles

### Phase 2+ Additions

- SWR for data fetching with automatic revalidation and polling
- `next/image` with `remotePatterns` for CDN-hosted album art
- `recharts` for trend visualizations (Phase 3)

## Dependencies by Phase

| Phase | New Dependencies |
| ----- | ---------------- |
| 1     | None             |
| 2     | `swr`            |
| 3     | `recharts`       |
