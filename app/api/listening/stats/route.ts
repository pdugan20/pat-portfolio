import { NextResponse } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { ListeningStats } from '@/lib/rewind/types';

export async function GET() {
  try {
    const data = await rewind<ListeningStats>('/listening/stats');

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
