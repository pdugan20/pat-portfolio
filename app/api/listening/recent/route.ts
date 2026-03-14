import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { RecentScrobblesResponse } from '@/lib/rewind/types';

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit') ?? '10';
  const date = request.nextUrl.searchParams.get('date');

  try {
    const params: Record<string, string> = { limit };
    if (date) params.date = date;

    const data = await rewind<RecentScrobblesResponse>(
      '/listening/recent',
      params
    );

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': date
          ? 'public, max-age=3600, s-maxage=3600'
          : 'public, max-age=60, s-maxage=60',
      },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
