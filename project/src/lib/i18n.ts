import * as fs from "fs";
import * as path from "path";

export const supportedLocales = ["en", "ca", "es"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

const dictionariesDir = path.join(process.cwd(), "src", "lib", "dictionaries");

interface BaseDictionary {
  [key: string]: string;
}

let dictionaryCache: Map<string, BaseDictionary> = new Map();

export function loadDictionary(locale: Locale): BaseDictionary {
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }

  const filePath = path.join(dictionariesDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Dictionary not found for locale: ${locale}, falling back to ${defaultLocale}`);
    return loadDictionary(defaultLocale);
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const dict = JSON.parse(content);
    dictionaryCache.set(locale, dict);
    return dict;
  } catch (error) {
    console.error(`Error loading dictionary for ${locale}:`, error);
    return loadDictionary(defaultLocale);
  }
}

export function getDictionary(locale: string): BaseDictionary {
  if (isValidLocale(locale)) {
    return loadDictionary(locale);
  }
  return loadDictionary(defaultLocale);
}

export function clearDictionaryCache(): void {
  dictionaryCache.clear();
}
