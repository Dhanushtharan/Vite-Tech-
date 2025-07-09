import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Get the site origin (e.g., http://localhost:3000)
  const origin = request.headers.get('origin') || 'http://localhost:3000';

  // Create redirect response to /login
  const response = NextResponse.redirect(new URL('/login', origin));

  // Clear the auth cookie
  response.cookies.set('auth', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
