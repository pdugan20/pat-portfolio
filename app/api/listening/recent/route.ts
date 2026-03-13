import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import { getImageUrl } from '@/lib/rewind/images';
import type { RecentScrobblesResponse } from '@/lib/rewind/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await rewind<RecentScrobblesResponse>('/listening/recent', {
      limit: '10',
    });

    const tracks = data.data.map(scrobble => ({
      name: scrobble.track.name,
      artist: scrobble.artist.name,
      album: scrobble.album.name ?? '',
      image: getImageUrl(scrobble.album.image),
      url: scrobble.track.url ?? '',
      playedAt: scrobble.scrobbled_at,
      isPlaying: false,
    }));

    return NextResponse.json(
      { tracks },
      { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' } }
    );
  } catch {
    return NextResponse.json({ tracks: [] }, { status: 500 });
  }
}
