// middleware.ts (in the root of your project, same level as next.config.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    '/pdfs',        // PDF files
    '/pdfviewer',   // PDF viewer page
    '/Landing',     // Landing page
    '/biography',   // Biography
    '/funeralimages', // Funeral images
    '/ecomagazine', // Ecomagazine
    '/tributeform', // Tribute form
    '/',            // Homepage
  ];

  // Allow public access to these paths
  const isPublic = publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

  if (isPublic) {
    return NextResponse.next();
  }

  // If you have authentication, add it here
  // Example: Check for auth token
  // const token = request.cookies.get('auth-token');
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Allow all other requests
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};