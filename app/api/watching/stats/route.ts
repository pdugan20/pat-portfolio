import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { WatchStats } from '@/lib/watching/types';

export async function GET(request: NextRequest) {
  const params: Record<string, string> = {};
  const date = request.nextUrl.searchParams.get('date');
  const from = request.nextUrl.searchParams.get('from');
  const to = request.nextUrl.searchParams.get('to');

  if (date) params.date = date;
  if (from) params.from = from;
  if (to) params.to = to;

  try {
    const data = await rewind<{ data: WatchStats }>('/watching/stats', params);

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
