// Last.fm API response types
// Typed from actual API responses (ws.audioscrobbler.com/2.0)

export type TimePeriod =
  | '7day'
  | '1month'
  | '3month'
  | '6month'
  | '12month'
  | 'overall';

export interface LastFmImage {
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
  '#text': string;
}

// user.getRecentTracks

export interface LastFmRecentTrack {
  name: string;
  artist: { '#text': string; mbid: string };
  album: { '#text': string; mbid: string };
  image: LastFmImage[];
  url: string;
  date?: { uts: string; '#text': string };
  '@attr'?: { nowplaying: 'true' };
}

export interface LastFmRecentTracksResponse {
  recenttracks: {
    track: LastFmRecentTrack[];
    '@attr': LastFmPaginationAttr;
  };
}

// user.getTopArtists

export interface LastFmTopArtist {
  name: string;
  playcount: string;
  url: string;
  image: LastFmImage[];
  mbid: string;
  streamable: string;
  '@attr': { rank: string };
}

export interface LastFmTopArtistsResponse {
  topartists: {
    artist: LastFmTopArtist[];
    '@attr': LastFmPaginationAttr;
  };
}

// user.getTopAlbums

export interface LastFmTopAlbum {
  name: string;
  playcount: string;
  url: string;
  artist: { name: string; url: string; mbid: string };
  image: LastFmImage[];
  mbid: string;
  '@attr': { rank: string };
}

export interface LastFmTopAlbumsResponse {
  topalbums: {
    album: LastFmTopAlbum[];
    '@attr': LastFmPaginationAttr;
  };
}

// user.getTopTracks

export interface LastFmTopTrack {
  name: string;
  playcount: string;
  url: string;
  artist: { name: string; url: string; mbid: string };
  image: LastFmImage[];
  duration: string;
  mbid: string;
  streamable: { fulltrack: string; '#text': string };
  '@attr': { rank: string };
}

export interface LastFmTopTracksResponse {
  toptracks: {
    track: LastFmTopTrack[];
    '@attr': LastFmPaginationAttr;
  };
}

// user.getInfo

export interface LastFmUserInfo {
  user: {
    name: string;
    realname: string;
    playcount: string;
    artist_count: string;
    track_count: string;
    album_count: string;
    image: LastFmImage[];
    registered: { unixtime: string; '#text': number };
    url: string;
    country: string;
  };
}

// Shared

export interface LastFmPaginationAttr {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

// Normalized types for UI consumption

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
