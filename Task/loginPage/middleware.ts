// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   console.log('Middleware triggered:');

//   if (request.nextUrl.pathname === '/cruise') {
//    return NextResponse.redirect(new URL('/hollidayTypes', request.url));            //Old code for
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/cruise'],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  console.log('Middleware triggered:');

  const auth = request.cookies.get('auth')?.value === 'true';
  const { pathname } = request.nextUrl;

  if (pathname === '/cruise') { 
    return NextResponse.redirect(new URL('/hollidayTypes', request.url));
  }

   if (pathname.startsWith('/dashboard') && !auth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && auth) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cruise', '/dashboard','/login'],
};
