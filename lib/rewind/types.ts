// Shared Rewind API response types
// Typed from OpenAPI spec at pdugan20/rewind

// Pagination

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Images

export interface ImageAttachment {
  cdn_url: string;
  thumbhash: string | null;
  dominant_color: string | null;
  accent_color: string | null;
}

// Calendar (shared across domains)

export interface CalendarDay {
  date: string; // "2025-01-15"
  count: number;
}

export interface CalendarResponse {
  year: number;
  days: CalendarDay[];
  total: number;
  max_day: { date: string; count: number };
}

// Trends (shared across domains)

export interface TrendPoint {
  period: string;
  value: number;
}

export interface TrendsResponse {
  metric: string;
  data: TrendPoint[];
}

// Feed

export interface FeedItem {
  id: string;
  domain: string;
  type: string;
  title: string;
  detail: string | null;
  image: ImageAttachment | null;
  timestamp: string;
  url: string | null;
}

// Streaks (listening + running share this shape)

export interface Streak {
  days: number;
  start_date: string | null;
  end_date?: string | null;
  total_scrobbles?: number;
}

export interface StreaksResponse {
  current: Streak;
  longest: Streak;
}

// Top items (listening top artists/albums/tracks)

export interface TopItem {
  rank: number;
  id: number;
  name: string;
  detail: string;
  playcount: number;
  image: ImageAttachment | null;
  url: string;
}

export interface TopItemsResponse {
  period: string;
  data: TopItem[];
  pagination: PaginationMeta;
}

// Listening

export interface ListeningStats {
  total_scrobbles: number;
  unique_artists: number;
  unique_albums: number;
  unique_tracks: number;
  registered_date: string | null;
  years_tracking: number;
  scrobbles_per_day: number;
}

export interface NowPlayingTrack {
  id: number;
  name: string;
  url: string | null;
}

export interface NowPlayingArtist {
  id: number;
  name: string;
}

export interface NowPlayingAlbum {
  id: number | null;
  name: string | null;
  image?: ImageAttachment | null;
}

export interface NowPlayingResponse {
  is_playing: boolean;
  track?: {
    name: string;
    artist: NowPlayingArtist;
    album: NowPlayingAlbum;
    url: string;
  };
  scrobbled_at: string | null;
}

export interface RecentScrobble {
  track: { id: number; name: string; url: string | null };
  artist: { id: number; name: string };
  album: {
    id: number | null;
    name: string | null;
    image?: ImageAttachment | null;
  };
  scrobbled_at: string;
}

export interface RecentScrobblesResponse {
  data: RecentScrobble[];
}

// Listening Year Summary

export interface YearTopArtist {
  id: number;
  name: string;
  scrobbles: number;
  image: ImageAttachment | null;
}

export interface YearTopAlbum {
  id: number;
  name: string;
  artist: string;
  scrobbles: number;
  image: ImageAttachment | null;
}

export interface YearTopTrack {
  id: number;
  name: string;
  artist: string;
  scrobbles: number;
}

export interface YearMonth {
  month: string; // "2024-01"
  scrobbles: number;
  unique_artists: number;
  unique_albums: number;
}

// Genre breakdown by period

export interface GenrePeriod {
  period: string; // "2025-01"
  genres: Record<string, number>; // { "Rock": 245, "Hip-Hop": 112, "Other": 89 }
  total: number;
}

export interface GenreResponse {
  data: GenrePeriod[];
}

export interface ListeningYearResponse {
  year: number;
  total_scrobbles: number;
  unique_artists: number;
  unique_albums: number;
  unique_tracks: number;
  top_artists: YearTopArtist[];
  top_albums: YearTopAlbum[];
  top_tracks: YearTopTrack[];
  monthly: YearMonth[];
}
