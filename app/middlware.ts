import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/profile', '/productDashboard', '/productDetails', '/bag']; 
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.log('No token found. Redirecting to login...');
      return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/productDashboard', '/productDetails/:path*', '/bag/:path*'], 
};
