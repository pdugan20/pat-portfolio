import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import { getImageUrl, getBlurDataURL } from '@/lib/rewind/images';
import type { NowPlayingResponse } from '@/lib/rewind/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await rewind<NowPlayingResponse>('/listening/now-playing');

    const track = data.track
      ? {
          name: data.track.name,
          artist: data.track.artist.name,
          album: data.track.album.name ?? '',
          image: getImageUrl(data.track.album.image),
          blurDataURL: getBlurDataURL(data.track.album.image),
          url: data.track.url ?? '',
          playedAt: data.is_playing
            ? undefined
            : (data.scrobbled_at ?? undefined),
        }
      : undefined;

    return NextResponse.json(
      { isPlaying: data.is_playing, track },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { isPlaying: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
