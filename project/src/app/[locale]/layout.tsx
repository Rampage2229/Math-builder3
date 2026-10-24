import type { Metadata } from "next";
import "@/app/globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const localeMetadata: Record<string, Metadata> = {
  en: {
    title: "Spanish Baccalaureate Mathematics Curriculum",
    description:
      "Explore the complete curriculum for both Social and Scientific Mathematics tracks in the Spanish Baccalaureate system. Available in English.",
    alternates: {
      canonical: "https://example.com/en/",
      languages: {
        en: "https://example.com/en/",
        ca: "https://example.com/ca/",
        es: "https://example.com/es/",
      },
    },
  },
  ca: {
    title: "Currículum de Matemàtiques del Batxillerat Espanyol",
    description:
      "Explora el currículum complet per a les pistes de Matemàtiques Socials i Científiques del sistema de Batxillerat espanyol. Disponible en català.",
    alternates: {
      canonical: "https://example.com/ca/",
      languages: {
        en: "https://example.com/en/",
        ca: "https://example.com/ca/",
        es: "https://example.com/es/",
      },
    },
  },
  es: {
    title: "Currículum de Matemáticas del Bachillerato Español",
    description:
      "Explora el currículum completo para las pistas de Matemáticas Sociales y Científicas del sistema de Bachillerato español. Disponible en español.",
    alternates: {
      canonical: "https://example.com/es/",
      languages: {
        en: "https://example.com/en/",
        ca: "https://example.com/ca/",
        es: "https://example.com/es/",
      },
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = (await params).locale;

  const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";

  const metadata: Metadata = localeMetadata[locale] || localeMetadata.en;

  const navLinks = [
    { href: `/${locale}`, label: locale === "ca" ? "Inici" : locale === "es" ? "Inicio" : "Home" },
    { href: `/${locale}/social`, label: locale === "ca" ? "Socials" : locale === "es" ? "Sociales" : "Social" },
    { href: `/${locale}/scientific`, label: locale === "ca" ? "Científiques" : locale === "es" ? "Científicas" : "Scientific" },
    { href: `/${locale}/progress`, label: locale === "ca" ? "Progrés" : locale === "es" ? "Progreso" : "Progress" },
  ];

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <nav className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {locale === "ca" ? "Matemàtiques Batxillerat" : locale === "es" ? "Matemáticas Bachillerato" : "Spanish Baccalaureate Math"}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const locale = (await params).locale;
  return localeMetadata[locale] || localeMetadata.en;
}
