import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { DecadeStat } from '@/lib/watching/types';

export async function GET() {
  try {
    const data = await rewind<{ data: DecadeStat[] }>(
      '/watching/stats/decades'
    );

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
