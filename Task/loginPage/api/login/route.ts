import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  console.log('Login attempt:', username, password);

  if (username === 'admin' && password === 'admin123') {
    const res = NextResponse.json({ success: true });

    res.cookies.set('auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, 
    });

    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
