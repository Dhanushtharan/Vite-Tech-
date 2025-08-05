import { NextRequest, NextResponse } from 'next/server';
import { MOCK_API_BASE } from '../../../../utils/constants';

export async function POST(req: NextRequest) {
  const { email, username, password,  } = await req.json();

  try {
    const res = await fetch(`${MOCK_API_BASE}/users`);
    const users = await res.json();

    const exists = users.find((u: any) => u.email === email || u.username === username);
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const createRes = await fetch(`${MOCK_API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    const newUser = await createRes.json();
const response = NextResponse.json({ message: 'User created', user: newUser });

response.cookies.set('authToken', 'mock-token-' + newUser.id, {
  httpOnly: true,
  secure: true, // 
  path: '/',
  maxAge: 3600,
  sameSite: 'lax',
});

response.cookies.set('userEmail', newUser.email, {
  path: '/',
  maxAge: 3600,
});

return response;  } catch (err) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
