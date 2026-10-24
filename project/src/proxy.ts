import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if already has locale prefix
  const supportedLocales = ["en", "ca", "es"];
  const hasLocalePrefix = supportedLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  let detectedLocale = "en";
  const languageTags = acceptLanguage
    .split(",")
    .map((tag) => tag.trim().split(";")[0].trim().toLowerCase());
  for (const tag of languageTags) {
    if (tag.startsWith("ca")) {
      detectedLocale = "ca";
      break;
    } else if (tag.startsWith("es")) {
      detectedLocale = "es";
      break;
    }
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${detectedLocale}/`, request.url));
  }

  return NextResponse.redirect(new URL(`/${detectedLocale}${pathname}`, request.url));
}
