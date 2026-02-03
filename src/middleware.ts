import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicPaths = ['/authentication/login', '/authentication/signup', '/']
  const isPublicPath = publicPaths.includes(pathname)

  // Protect dashboard (and any future protected routes)
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/authentication/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // IMPORTANT: We NO LONGER redirect logged-in users AWAY from login/signup
  // This allows users to see the pages even when authenticated (for testing, logout flow, etc.)

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/authentication/login',
    '/authentication/signup',
  ],
}