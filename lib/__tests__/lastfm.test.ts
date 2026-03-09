import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBestImage,
  normalizeTopArtists,
  normalizeTopAlbums,
  normalizeTopTracks,
} from '../listening/lastfm';
import type {
  LastFmImage,
  LastFmTopArtistsResponse,
  LastFmTopAlbumsResponse,
  LastFmTopTracksResponse,
} from '../listening/types';

describe('getBestImage', () => {
  it('returns extralarge image when available', () => {
    const images: LastFmImage[] = [
      { size: 'small', '#text': 'https://img/small.png' },
      { size: 'medium', '#text': 'https://img/medium.png' },
      { size: 'large', '#text': 'https://img/large.png' },
      { size: 'extralarge', '#text': 'https://img/extralarge.png' },
    ];
    expect(getBestImage(images)).toBe('https://img/extralarge.png');
  });

  it('falls back to large when extralarge is empty', () => {
    const images: LastFmImage[] = [
      { size: 'small', '#text': 'https://img/small.png' },
      { size: 'large', '#text': 'https://img/large.png' },
      { size: 'extralarge', '#text': '' },
    ];
    expect(getBestImage(images)).toBe('https://img/large.png');
  });

  it('returns empty string when no images available', () => {
    expect(getBestImage([])).toBe('');
  });

  it('returns empty string when all image URLs are empty', () => {
    const images: LastFmImage[] = [
      { size: 'small', '#text': '' },
      { size: 'large', '#text': '' },
    ];
    expect(getBestImage(images)).toBe('');
  });
});

describe('normalizeTopArtists', () => {
  it('normalizes Last.fm top artists response', () => {
    const response: LastFmTopArtistsResponse = {
      topartists: {
        artist: [
          {
            name: 'Radiohead',
            playcount: '542',
            url: 'https://www.last.fm/music/Radiohead',
            image: [
              { size: 'extralarge', '#text': 'https://img/radiohead.png' },
            ],
            mbid: 'abc',
            streamable: '0',
            '@attr': { rank: '1' },
          },
        ],
        '@attr': {
          user: 'pdugan20',
          totalPages: '1',
          page: '1',
          perPage: '10',
          total: '1',
        },
      },
    };

    const result = normalizeTopArtists(response);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      rank: 1,
      name: 'Radiohead',
      detail: '',
      playcount: 542,
      image: 'https://img/radiohead.png',
      url: 'https://www.last.fm/music/Radiohead',
    });
  });
});

describe('normalizeTopAlbums', () => {
  it('normalizes Last.fm top albums response with artist detail', () => {
    const response: LastFmTopAlbumsResponse = {
      topalbums: {
        album: [
          {
            name: 'Kind of Blue',
            playcount: '89',
            url: 'https://www.last.fm/music/Miles+Davis/Kind+of+Blue',
            artist: {
              name: 'Miles Davis',
              url: 'https://www.last.fm/music/Miles+Davis',
              mbid: 'def',
            },
            image: [{ size: 'extralarge', '#text': 'https://img/kob.png' }],
            mbid: 'ghi',
            '@attr': { rank: '1' },
          },
        ],
        '@attr': {
          user: 'pdugan20',
          totalPages: '1',
          page: '1',
          perPage: '10',
          total: '1',
        },
      },
    };

    const result = normalizeTopAlbums(response);
    expect(result[0].detail).toBe('Miles Davis');
    expect(result[0].playcount).toBe(89);
  });
});

describe('normalizeTopTracks', () => {
  function makeTrack(name: string, artist: string) {
    return {
      name,
      playcount: '10',
      url: `https://www.last.fm/music/${artist}/_/${name}`,
      artist: {
        name: artist,
        url: `https://www.last.fm/music/${artist}`,
        mbid: '',
      },
      image: [{ size: 'extralarge' as const, '#text': '' }],
      duration: '300',
      mbid: '',
      streamable: { fulltrack: '0', '#text': '0' },
      '@attr': { rank: '1' },
    };
  }

  function makeResponse(
    ...tracks: ReturnType<typeof makeTrack>[]
  ): LastFmTopTracksResponse {
    return {
      toptracks: {
        track: tracks,
        '@attr': {
          user: 'pdugan20',
          totalPages: '1',
          page: '1',
          perPage: '10',
          total: String(tracks.length),
        },
      },
    };
  }

  it('normalizes Last.fm top tracks response with artist detail', () => {
    const response = makeResponse(makeTrack('So What', 'Miles Davis'));
    const result = normalizeTopTracks(response);
    expect(result[0].name).toBe('So What');
    expect(result[0].detail).toBe('Miles Davis');
    expect(result[0].playcount).toBe(10);
  });

  it('filters audiobook artists', () => {
    const response = makeResponse(
      makeTrack('Bodega', 'Radiohead'),
      makeTrack('Fear and Loathing - Part 3', 'Hunter S. Thompson'),
      makeTrack('Everything In Its Right Place', 'Radiohead')
    );
    const result = normalizeTopTracks(response);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Bodega');
    expect(result[1].name).toBe('Everything In Its Right Place');
  });

  it('filters Libby audiobook tracks by track name', () => {
    const response = makeResponse(
      makeTrack('Bodega', 'Radiohead'),
      makeTrack('Libby--Open-Casino-Royale (3)', 'Ian Fleming')
    );
    const result = normalizeTopTracks(response);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Bodega');
  });

  it('filters numbered chapter tracks', () => {
    const response = makeResponse(
      makeTrack('Bodega', 'Radiohead'),
      makeTrack('Abundance - Track 007', 'Ezra Klein'),
      makeTrack('Project Hail Mary - 02', 'Andy Weir')
    );
    const result = normalizeTopTracks(response);
    expect(result).toHaveLength(1);
  });

  it('re-ranks after filtering', () => {
    const response = makeResponse(
      makeTrack('Bodega', 'Radiohead'),
      makeTrack('Fear and Loathing - Part 3', 'Hunter S. Thompson'),
      makeTrack('Everything In Its Right Place', 'Radiohead')
    );
    const result = normalizeTopTracks(response);
    expect(result[0].rank).toBe(1);
    expect(result[1].rank).toBe(2);
  });
});

describe('lastfmFetch', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('throws when LASTFM_API_KEY is not set', async () => {
    vi.stubEnv('LASTFM_API_KEY', '');
    const { getTopArtists } = await import('../listening/lastfm');
    await expect(getTopArtists('overall', 1)).rejects.toThrow(
      'LASTFM_API_KEY is not set'
    );
  });
});
