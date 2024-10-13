import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Request user info: ', request.cookies.get('isLogin'));
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
  let isLogin = request.cookies.get('isLogin');
  if (isLogin === undefined) {
    if (
      !request.nextUrl.pathname.startsWith('/auth/login') &&
      !request.nextUrl.pathname.startsWith('/auth/register')
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
  matcher: ['/', '/dashboard', '/auth/register', '/auth/login'],
};
