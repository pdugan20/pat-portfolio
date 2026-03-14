import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { WatchingYearResponse } from '@/lib/watching/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;

  try {
    const data = await rewind<WatchingYearResponse>(`/watching/year/${year}`);

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
