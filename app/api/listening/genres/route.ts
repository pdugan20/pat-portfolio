import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { GenreResponse } from '@/lib/rewind/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  try {
    const params: Record<string, string> = {};

    const groupBy = searchParams.get('group_by');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const limit = searchParams.get('limit');

    if (groupBy) params.group_by = groupBy;
    if (from) params.from = from;
    if (to) params.to = to;
    if (limit) params.limit = limit;

    const data = await rewind<GenreResponse>('/listening/genres', params);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
