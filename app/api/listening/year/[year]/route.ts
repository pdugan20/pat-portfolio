import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { ListeningYearResponse } from '@/lib/rewind/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  const month = request.nextUrl.searchParams.get('month');

  try {
    const queryParams: Record<string, string> = {};
    if (month) queryParams.month = month;

    const data = await rewind<ListeningYearResponse>(
      `/listening/year/${year}`,
      queryParams
    );

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
