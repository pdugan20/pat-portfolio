import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/listening/lastfm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { isPlaying: false },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
