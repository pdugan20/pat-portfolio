// Listening page UI types
// These define the data contract between route handlers and client components.
// Route handlers transform Rewind API responses into these shapes.

export type TimePeriod =
  | '7day'
  | '1month'
  | '3month'
  | '6month'
  | '12month'
  | 'overall';

export interface NowPlayingData {
  isPlaying: boolean;
  track?: {
    name: string;
    artist: string;
    album: string;
    image: string;
    url: string;
    playedAt?: string;
  };
}

export interface TopItem {
  rank: number;
  name: string;
  detail: string;
  playcount: number;
  image: string;
  url: string;
}

export interface UserStats {
  totalScrobbles: number;
  uniqueArtists: number;
  uniqueTracks: number;
  uniqueAlbums: number;
  registeredDate: Date;
}
