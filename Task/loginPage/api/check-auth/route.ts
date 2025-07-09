import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const auth = req.cookies.get('auth')?.value;

  if (auth === 'true') {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

