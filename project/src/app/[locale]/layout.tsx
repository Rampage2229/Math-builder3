import type { Metadata } from "next";
import "./globals.css";

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale;
  
  // Set direction based on locale (RTL languages would go here)
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
  
  return (
    <html
      lang={locale}
      dir={dir}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
