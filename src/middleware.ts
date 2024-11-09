import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Request user info: ', request.cookies.get('isLogin'));
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  if (
    !request.nextUrl.pathname.startsWith('/auth') &&
    !request.nextUrl.pathname.startsWith('/templates') &&
    !request.nextUrl.pathname.startsWith('/dashboard') &&
    !request.nextUrl.pathname.startsWith('/organisations') &&
    !request.nextUrl.pathname.startsWith('/users') &&
    !request.nextUrl.pathname.startsWith('/api')
  ) {
    console.log('----ignore url');
    return NextResponse.next();
  }

  let isLogin = request.cookies.get('isLogin');
  if (isLogin === undefined) {
    if (
      !request.nextUrl.pathname.startsWith('/auth/login') &&
      !request.nextUrl.pathname.startsWith('/auth/register') &&
      !request.nextUrl.pathname.startsWith('/api/auth')
    ) {
      return NextResponse.redirect(new URL('/auth/login?expired=true', request.url));
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith('/auth/login') ||
      request.nextUrl.pathname.startsWith('/auth/register')
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
