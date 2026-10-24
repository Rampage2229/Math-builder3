import { ProgressProvider } from "@/components/progress/ProgressProvider";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgressClient from "./ProgressClient";
import enDict from "@/lib/dictionaries/en.json";
import esDict from "@/lib/dictionaries/es.json";
import caDict from "@/lib/dictionaries/ca.json";

interface ProgressPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProgressPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await loadDictionary(locale);
  return {
    title: dict["progress_title"],
    description: dict["progress_subtitle"],
  };
}

interface Dictionary {
  [key: string]: string;
}

const supportedLocales = ["en", "es", "ca"] as const;
type Locale = (typeof supportedLocales)[number];

const dictionaries: Record<Locale, Dictionary> = {
  en: enDict as Dictionary,
  es: esDict as Dictionary,
  ca: caDict as Dictionary,
};

async function loadDictionary(locale: string): Promise<Dictionary> {
  const dict = dictionaries[locale as Locale];
  if (!dict) {
    notFound();
  }
  return dict;
}

export default async function ProgressPage({ params }: ProgressPageProps) {
  const { locale } = await params;
  const dict = await loadDictionary(locale);

  return (
    <ProgressProvider>
      <ProgressClient locale={locale} dict={dict} />
    </ProgressProvider>
  );
}
