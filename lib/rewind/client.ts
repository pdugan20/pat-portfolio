// Rewind API client
// All requests are server-side only (used in Route Handlers)

const REWIND_BASE = 'https://api.rewind.rest/v1';

class RewindError extends Error {
  constructor(
    public path: string,
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'RewindError';
  }
}

export async function rewind<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const apiKey = process.env.REWIND_API_KEY;
  if (!apiKey) throw new Error('REWIND_API_KEY is not set');

  const url = new URL(`${REWIND_BASE}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new RewindError(
      path,
      res.status,
      `Rewind ${path}: ${res.status} ${body}`
    );
  }

  return res.json() as Promise<T>;
}
