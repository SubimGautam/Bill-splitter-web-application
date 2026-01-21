import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  // If user is not logged in and trying to access protected routes
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/authentication/login', request.url));
  }
  
  // If user is logged in and trying to access auth pages
  if (token && (
    request.nextUrl.pathname.startsWith('/authentication/login') ||
    request.nextUrl.pathname.startsWith('/authentication/signup')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/authentication/:path*'],
};