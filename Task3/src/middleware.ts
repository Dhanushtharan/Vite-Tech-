import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware triggered:');

  if (request.nextUrl.pathname === '/cruise') {
   return NextResponse.redirect(new URL('/hollidayTypes', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cruise'],
};
