import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgressClient from "./ProgressClient";

interface ProgressPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProgressPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await loadDictionary(locale);
  return {
    title: dict.progress_title,
    description: dict.progress_subtitle,
  };
}

async function loadDictionary(locale: string) {
  const dictionaries: Record<string, () => Promise<any>> = {
    en: () => import("@/lib/dictionaries/en.json"),
    es: () => import("@/lib/dictionaries/es.json"),
    ca: () => import("@/lib/dictionaries/ca.json"),
  };

  if (!dictionaries[locale]) {
    notFound();
  }

  const dictModule = await dictionaries[locale]();
  return dictModule.default;
}

export default async function ProgressPage({ params }: ProgressPageProps) {
  const { locale } = await params;
  const dict = await loadDictionary(locale);

  return <ProgressClient locale={locale} dict={dict} />;
}
