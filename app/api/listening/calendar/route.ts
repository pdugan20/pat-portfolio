import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { CalendarResponse } from '@/lib/rewind/types';

export async function GET(request: NextRequest) {
  const year =
    request.nextUrl.searchParams.get('year') ??
    String(new Date().getFullYear());

  try {
    const data = await rewind<CalendarResponse>('/listening/calendar', {
      year,
    });

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(
      { year: Number(year), days: [], total: 0, max_day: null },
      { status: 500 }
    );
  }
}
