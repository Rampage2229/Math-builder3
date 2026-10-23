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

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const locale = (await params).locale;
  return localeMetadata[locale] || localeMetadata.en;
}
