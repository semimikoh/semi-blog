import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './app/lib/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (hasLocale) return NextResponse.next();

  // Redirect root / to /ko/
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - icon.png, favicon.ico, og-image.png
     * - public folder assets
     * - sitemap.xml, robots.txt
     * - api routes
     */
    '/((?!_next/static|_next/image|icon\\.png|favicon\\.ico|og-image\\.png|sitemap\\.xml|robots\\.txt|api|.*\\..*).*)',
  ],
};
