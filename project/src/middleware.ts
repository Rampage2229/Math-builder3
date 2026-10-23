import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip if already has locale prefix or is a root path
  const supportedLocales = ['en', 'ca', 'es'];
  const hasLocalePrefix = supportedLocales.some(locale => pathname.startsWith(`/${locale}/`));
  
  if (pathname === '/' || !hasLocalePrefix) {
    // Detect locale from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    let detectedLocale: string | null = null;
    
    // Simple locale detection
    if (acceptLanguage.startsWith('ca') || acceptLanguage.includes(', ca')) {
      detectedLocale = 'ca';
    } else if (acceptLanguage.startsWith('es') || acceptLanguage.includes(', es')) {
      detectedLocale = 'es';
    } else {
      detectedLocale = 'en'; // default to English
    }
    
    // Redirect to locale version
    const redirectUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
}
