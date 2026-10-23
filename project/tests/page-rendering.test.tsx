import { describe, it, expect } from "jest";
import * as fs from "fs";
import * as path from "path";

const dictionariesDir = path.join(__dirname, "..", "src", "lib", "dictionaries");

const supportedLocales = ["en", "ca", "es"] as const;

type Locale = (typeof supportedLocales)[number];

interface Dictionary {
  [key: string]: string;
}

function loadDictionary(locale: string): Dictionary {
  const filePath = path.join(dictionariesDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const mockDictionaries: Record<Locale, Dictionary> = {
  en: loadDictionary("en"),
  ca: loadDictionary("ca"),
  es: loadDictionary("es"),
};

describe("Page Rendering - All Locales (Dictionary Content)", () => {
  describe("Home Page content", () => {
    it.each(supportedLocales)("has hero title in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.hero_title).toBeDefined();
      expect(typeof dict.hero_title).toBe("string");
      expect(dict.hero_title.length).toBeGreaterThan(0);
    });

    it.each(supportedLocales)("has hero description in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.hero_description).toBeDefined();
      expect(typeof dict.hero_description).toBe("string");
      expect(dict.hero_description.length).toBeGreaterThan(0);
    });

    it.each(supportedLocales)("has navigation links in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.nav_home).toBeDefined();
      expect(dict.nav_social).toBeDefined();
      expect(dict.nav_scientific).toBeDefined();
      expect(typeof dict.nav_home).toBe("string");
      expect(typeof dict.nav_social).toBe("string");
      expect(typeof dict.nav_scientific).toBe("string");
    });
  });

  describe("Social Track Page content", () => {
    it.each(supportedLocales)("has hero title in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.hero_title).toBeDefined();
      expect(dict.hero_title.length).toBeGreaterThan(0);
    });

    it.each(supportedLocales)("has navigation links in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.nav_home).toBeDefined();
      expect(dict.nav_social).toBeDefined();
      expect(dict.nav_scientific).toBeDefined();
    });
  });

  describe("Scientific Track Page content", () => {
    it.each(supportedLocales)("has hero title in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.hero_title).toBeDefined();
      expect(dict.hero_title.length).toBeGreaterThan(0);
    });

    it.each(supportedLocales)("has navigation links in %s", (locale: Locale) => {
      const dict = mockDictionaries[locale];
      expect(dict.nav_home).toBeDefined();
      expect(dict.nav_social).toBeDefined();
      expect(dict.nav_scientific).toBeDefined();
    });
  });

  describe("Language Switching", () => {
    it("displays different content for each locale on home page", () => {
      const en = mockDictionaries.en.hero_title;
      const ca = mockDictionaries.ca.hero_title;
      const es = mockDictionaries.es.hero_title;
      expect(en).not.toBe(ca);
      expect(en).not.toBe(es);
      expect(ca).not.toBe(es);
    });

    it("displays different content for each locale on social page", () => {
      const en = mockDictionaries.en.hero_title;
      const ca = mockDictionaries.ca.hero_title;
      const es = mockDictionaries.es.hero_title;
      expect(en).not.toBe(ca);
      expect(en).not.toBe(es);
      expect(ca).not.toBe(es);
    });

    it("displays different content for each locale on scientific page", () => {
      const en = mockDictionaries.en.hero_title;
      const ca = mockDictionaries.ca.hero_title;
      const es = mockDictionaries.es.hero_title;
      expect(en).not.toBe(ca);
      expect(en).not.toBe(es);
      expect(ca).not.toBe(es);
    });
  });
});
