import { NextResponse } from 'next/server';
import { getRecentTracks, getBestImage } from '@/lib/listening/lastfm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getRecentTracks(10);
    const tracks = data.recenttracks.track.map(track => ({
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      image: getBestImage(track.image),
      url: track.url,
      playedAt: track.date?.['#text'] ?? null,
      isPlaying: track['@attr']?.nowplaying === 'true',
    }));

    return NextResponse.json(
      { tracks },
      {
        headers: {
          'Cache-Control': 'public, max-age=60, s-maxage=60',
        },
      }
    );
  } catch {
    return NextResponse.json({ tracks: [] }, { status: 500 });
  }
}
