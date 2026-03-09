import { LASTFM_CONFIG } from './constants';
import {
  isHolidayAlbum,
  isHolidayTrack,
  isAudiobookArtist,
  isAudiobookTrack,
} from './filters';
import type {
  LastFmImage,
  LastFmRecentTracksResponse,
  LastFmTopArtistsResponse,
  LastFmTopAlbumsResponse,
  LastFmTopTracksResponse,
  LastFmUserInfo,
  NowPlayingData,
  TopItem,
  UserStats,
  TimePeriod,
} from './types';

async function lastfmFetch<T>(params: Record<string, string>): Promise<T> {
  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) throw new Error('LASTFM_API_KEY is not set');

  const url = new URL(LASTFM_CONFIG.apiBase);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('user', LASTFM_CONFIG.username);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Last.fm API error: ${res.status}`);

  const data = await res.json();
  if (data.error)
    throw new Error(`Last.fm API error ${data.error}: ${data.message}`);

  return data as T;
}

export function getBestImage(images: LastFmImage[]): string {
  const preferred = ['extralarge', 'large', 'medium', 'small'];
  for (const size of preferred) {
    const img = images.find(i => i.size === size && i['#text']);
    if (img?.['#text']) return img['#text'];
  }
  return '';
}

// Raw API calls

export async function getRecentTracks(
  limit: number = LASTFM_CONFIG.displayLimit
): Promise<LastFmRecentTracksResponse> {
  return lastfmFetch<LastFmRecentTracksResponse>({
    method: 'user.getrecenttracks',
    limit: String(limit),
  });
}

export async function getTopArtists(
  period: TimePeriod = 'overall',
  limit: number = LASTFM_CONFIG.displayLimit
): Promise<LastFmTopArtistsResponse> {
  return lastfmFetch<LastFmTopArtistsResponse>({
    method: 'user.gettopartists',
    period,
    limit: String(limit),
  });
}

export async function getTopAlbums(
  period: TimePeriod = 'overall',
  limit: number = LASTFM_CONFIG.displayLimit
): Promise<LastFmTopAlbumsResponse> {
  return lastfmFetch<LastFmTopAlbumsResponse>({
    method: 'user.gettopalbums',
    period,
    limit: String(limit),
  });
}

export async function getTopTracks(
  period: TimePeriod = 'overall',
  limit: number = LASTFM_CONFIG.displayLimit
): Promise<LastFmTopTracksResponse> {
  return lastfmFetch<LastFmTopTracksResponse>({
    method: 'user.gettoptracks',
    period,
    limit: String(limit),
  });
}

export async function getUserInfo(): Promise<LastFmUserInfo> {
  return lastfmFetch<LastFmUserInfo>({ method: 'user.getinfo' });
}

// Normalized data helpers

export async function getNowPlaying(): Promise<NowPlayingData> {
  try {
    const data = await getRecentTracks(1);
    const track = data.recenttracks.track[0];

    if (!track) return { isPlaying: false };

    const isPlaying = track['@attr']?.nowplaying === 'true';

    return {
      isPlaying,
      track: {
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        image: getBestImage(track.image),
        url: track.url,
        playedAt: isPlaying ? undefined : track.date?.['#text'],
      },
    };
  } catch {
    return { isPlaying: false };
  }
}

function rerank(items: TopItem[]): TopItem[] {
  return items.map((item, i) => ({ ...item, rank: i + 1 }));
}

export function normalizeTopArtists(
  response: LastFmTopArtistsResponse
): TopItem[] {
  const items = response.topartists.artist
    .filter(artist => !isAudiobookArtist(artist.name))
    .map(artist => ({
      rank: 0,
      name: artist.name,
      detail: '',
      playcount: parseInt(artist.playcount, 10),
      image: getBestImage(artist.image),
      url: artist.url,
    }));
  return rerank(items);
}

export function normalizeTopAlbums(
  response: LastFmTopAlbumsResponse
): TopItem[] {
  const items = response.topalbums.album
    .filter(
      album =>
        !isHolidayAlbum(album.name) && !isAudiobookArtist(album.artist.name)
    )
    .map(album => ({
      rank: 0,
      name: album.name,
      detail: album.artist.name,
      playcount: parseInt(album.playcount, 10),
      image: getBestImage(album.image),
      url: album.url,
    }));
  return rerank(items);
}

export function normalizeTopTracks(
  response: LastFmTopTracksResponse
): TopItem[] {
  const items = response.toptracks.track
    .filter(
      track =>
        !isAudiobookArtist(track.artist.name) &&
        !isAudiobookTrack(track.name) &&
        !isHolidayTrack(track.name, track.artist.name)
    )
    .map(track => ({
      rank: 0,
      name: track.name,
      detail: track.artist.name,
      playcount: parseInt(track.playcount, 10),
      image: getBestImage(track.image),
      url: track.url,
    }));
  return rerank(items);
}

export async function getStats(): Promise<UserStats> {
  const data = await getUserInfo();
  return {
    totalScrobbles: parseInt(data.user.playcount, 10),
    uniqueArtists: parseInt(data.user.artist_count, 10),
    uniqueTracks: parseInt(data.user.track_count, 10),
    uniqueAlbums: parseInt(data.user.album_count, 10),
    registeredDate: new Date(
      parseInt(data.user.registered.unixtime, 10) * 1000
    ),
  };
}
