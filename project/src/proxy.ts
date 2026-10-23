import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if already has locale prefix or is a root path
  const supportedLocales = ["en", "ca", "es"];
  const hasLocalePrefix = supportedLocales.some((locale) =>
    pathname.startsWith(`/${locale}/`),
  );

  if (pathname === "/" || !hasLocalePrefix) {
    // Detect locale from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || "";
    let detectedLocale: string | null = null;

    // Parse Accept-Language header: split by comma, check each language tag
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

    if (!detectedLocale) {
      detectedLocale = "en"; // default to English
    }

    // Redirect to locale version
    const redirectUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
