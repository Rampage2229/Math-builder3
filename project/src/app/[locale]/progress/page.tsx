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
    title: dict.progress_title,
    description: dict.progress_subtitle,
  };
}

const dictionaries: Record<string, Record<string, string>> = {
  en: enDict,
  es: esDict,
  ca: caDict,
};

async function loadDictionary(locale: string): Promise<Record<string, string>> {
  const dict = dictionaries[locale];
  if (!dict) {
    notFound();
  }
  return dict;
}

export default async function ProgressPage({ params }: ProgressPageProps) {
  const { locale } = await params;
  const dict = await loadDictionary(locale);

  return <ProgressClient locale={locale} dict={dict} />;
}
