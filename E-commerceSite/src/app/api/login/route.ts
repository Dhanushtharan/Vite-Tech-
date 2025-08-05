import { NextRequest, NextResponse } from 'next/server';
import { MOCK_API_BASE } from '../../../../utils/constants';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const res = await fetch(`${MOCK_API_BASE}/users`);
    const users = await res.json();

    console.log('Fetched users:', users);
    console.log('Trying login with:', { email, password });

    const user = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ message: 'Login successful', user });

    response.cookies.set('authToken', 'mock-token-' + user.id, {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: 3600,
      sameSite: 'lax',
    });

    response.cookies.set('userEmail', user.email, {
      path: '/',
      maxAge: 3600,
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
