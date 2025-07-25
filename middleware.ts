import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  // Ignore static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // If authenticated, redirect away from /sign-in and /sign-up
  if (
    session &&
    (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If not authenticated, protect all routes except /sign-in and /sign-up
  if (
    !session &&
    !pathname.startsWith('/sign-in') &&
    !pathname.startsWith('/sign-up')
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}