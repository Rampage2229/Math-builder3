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

type Dictionary = Record<string, string>;

const dictionaries: Record<string, Dictionary> = {
  en: enDict as unknown as Dictionary,
  es: esDict as unknown as Dictionary,
  ca: caDict as unknown as Dictionary,
};

async function loadDictionary(locale: string): Promise<Dictionary> {
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
