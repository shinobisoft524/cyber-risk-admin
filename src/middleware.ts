import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.next();
  }
  let isLogin = request.cookies.get('isLogin');
  if (isLogin === undefined) {
    if (
      !request.nextUrl.pathname.startsWith('/auth/login') &&
      !request.nextUrl.pathname.startsWith('/auth/register')
    ) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith('/auth/login') ||
      request.nextUrl.pathname.startsWith('/auth/register')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/register', '/auth/login'],
};
