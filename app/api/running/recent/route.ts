import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit') ?? '5';

  try {
    const data = await rewind<{ data: unknown[] }>('/running/recent', {
      limit,
    });

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    });
  } catch {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
