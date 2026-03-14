import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { GenreStat } from '@/lib/watching/types';

export async function GET() {
  try {
    const data = await rewind<{ data: GenreStat[] }>('/watching/stats/genres');

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
