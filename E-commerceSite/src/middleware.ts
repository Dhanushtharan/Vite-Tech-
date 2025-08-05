import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  console.log('TOKEN IN MIDDLEWARE:', token?.value); 

    const pathname = request.nextUrl.pathname;
   if (pathname === '/cart' && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  if (pathname === '/login' && token) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }
  if (pathname === '/signup' && token) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }
  if (pathname === '/checkout' && !token) {
    const cartUrl = new URL('/login', request.url);
    return NextResponse.redirect(cartUrl);
  }
  if (pathname === '/confirmation' && !token) {
    const confirmUrl = new URL('/login', request.url);
    return NextResponse.redirect(confirmUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/add-to-cart', 
    '/cart',
    '/login',
    '/signup',
    '/checkout',
    '/confirmation'
  ],
};
