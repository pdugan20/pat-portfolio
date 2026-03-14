import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { DirectorStat } from '@/lib/watching/types';

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit') ?? '20';

  try {
    const data = await rewind<{ data: DirectorStat[] }>(
      '/watching/stats/directors',
      { limit }
    );

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
