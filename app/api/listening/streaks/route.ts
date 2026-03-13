import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { StreaksResponse } from '@/lib/rewind/types';

export async function GET() {
  try {
    const data = await rewind<StreaksResponse>('/listening/streaks');

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(
      { current: { days: 0 }, longest: { days: 0 } },
      { status: 500 }
    );
  }
}
