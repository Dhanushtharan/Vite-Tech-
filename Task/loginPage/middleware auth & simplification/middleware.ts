import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOGGED_IN_ROUTES, PUBLIC_ROUTES } from './util/constants';

export function middleware(request: NextRequest) {
  console.log('Middleware triggered:', request.nextUrl.pathname);

  const auth = request.cookies.get('auth')?.value === 'true';
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {                                                        //All public routes
    return NextResponse.next();
  }

  if (LOGGED_IN_ROUTES.some(route => pathname.startsWith(route)) && !auth) {                      //All auth routes
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && auth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));                             //logout condition
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/destination',
    '/hollydayTypes',
    '/specialOffers',
    '/cruise',
    '/dashboard/:path*',
    '/login'
  ],
};
