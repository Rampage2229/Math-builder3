import * as fs from "fs";
import * as path from "path";

const dictionariesDir = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "dictionaries",
);

const supportedLocales = ["en", "ca", "es"] as const;

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

describe("Dictionary Loading", () => {
  describe("loadDictionary", () => {
    it("should load the English dictionary successfully", () => {
      const dict = loadDictionary("en");
      expect(dict).toBeDefined();
      expect(typeof dict).toBe("object");
      expect(Object.keys(dict).length).toBeGreaterThan(0);
    });

    it("should load the Catalan dictionary successfully", () => {
      const dict = loadDictionary("ca");
      expect(dict).toBeDefined();
      expect(typeof dict).toBe("object");
      expect(Object.keys(dict).length).toBeGreaterThan(0);
    });

    it("should load the Spanish dictionary successfully", () => {
      const dict = loadDictionary("es");
      expect(dict).toBeDefined();
      expect(typeof dict).toBe("object");
      expect(Object.keys(dict).length).toBeGreaterThan(0);
    });

    it("should return empty object for unsupported locale", () => {
      const dict = loadDictionary("fr");
      expect(dict).toEqual({});
    });

    it("should have required keys in English dictionary", () => {
      const dict = loadDictionary("en");
      const requiredKeys = [
        "nav_home",
        "nav_social",
        "nav_scientific",
        "hero_title",
        "hero_description",
        "track_social_badge",
        "track_scientific_badge",
        "footer_copyright",
        "learn_more",
      ];
      requiredKeys.forEach((key) => {
        expect(dict).toHaveProperty(key);
        expect(typeof dict[key]).toBe("string");
        expect(dict[key].length).toBeGreaterThan(0);
      });
    });

    it("should have required keys in Catalan dictionary", () => {
      const dict = loadDictionary("ca");
      const requiredKeys = [
        "nav_home",
        "nav_social",
        "nav_scientific",
        "hero_title",
        "hero_description",
        "track_social_badge",
        "track_scientific_badge",
        "footer_copyright",
        "learn_more",
      ];
      requiredKeys.forEach((key) => {
        expect(dict).toHaveProperty(key);
        expect(typeof dict[key]).toBe("string");
        expect(dict[key].length).toBeGreaterThan(0);
      });
    });

    it("should have required keys in Spanish dictionary", () => {
      const dict = loadDictionary("es");
      const requiredKeys = [
        "nav_home",
        "nav_social",
        "nav_scientific",
        "hero_title",
        "hero_description",
        "track_social_badge",
        "track_scientific_badge",
        "footer_copyright",
        "learn_more",
      ];
      requiredKeys.forEach((key) => {
        expect(dict).toHaveProperty(key);
        expect(typeof dict[key]).toBe("string");
        expect(dict[key].length).toBeGreaterThan(0);
      });
    });

    it("should have consistent keys across all locales", () => {
      const enKeys = Object.keys(loadDictionary("en")).sort();
      const caKeys = Object.keys(loadDictionary("ca")).sort();
      const esKeys = Object.keys(loadDictionary("es")).sort();
      expect(caKeys).toEqual(enKeys);
      expect(esKeys).toEqual(enKeys);
    });

    it("should have different values for each locale (not identical)", () => {
      const en = loadDictionary("en");
      const ca = loadDictionary("ca");
      const es = loadDictionary("es");
      // At least hero_title should be different across locales
      expect(en.hero_title).not.toBe(ca.hero_title);
      expect(en.hero_title).not.toBe(es.hero_title);
      expect(ca.hero_title).not.toBe(es.hero_title);
    });

    it("should have valid JSON structure in all dictionary files", () => {
      supportedLocales.forEach((locale) => {
        const filePath = path.join(dictionariesDir, `${locale}.json`);
        expect(() =>
          JSON.parse(fs.readFileSync(filePath, "utf-8")),
        ).not.toThrow();
      });
    });
  });
});
