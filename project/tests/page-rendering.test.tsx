import { render, screen } from "@testing-library/react";

// Mock next/image
jest.mock("next/image", () => ({
  default: ({ src, alt, width, height, priority, className, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} className={className} {...props} />
  ),
}));

// Mock dynamic imports for dictionaries
const mockDictionaries: Record<string, Record<string, string>> = {
  en: {
    nav_home: "Home",
    nav_social: "Social Mathematics",
    nav_scientific: "Scientific Mathematics",
    hero_title: "Spanish Baccalaureate Mathematics Curriculum",
    hero_description: "Explore the complete curriculum for both Social and Scientific Mathematics tracks.",
  },
  ca: {
    nav_home: "Inici",
    nav_social: "Matemàtiques Socials",
    nav_scientific: "Matemàtiques Científiques",
    hero_title: "Currículum de Matemàtiques del Batxillerat Espanyol",
    hero_description: "Explora el currículum complet per a les pistes de Matemàtiques Socials i Científiques.",
  },
  es: {
    nav_home: "Inicio",
    nav_social: "Matemáticas Sociales",
    nav_scientific: "Matemáticas Científicas",
    hero_title: "Currículum de Matemáticas del Bachillerato Español",
    hero_description: "Explora el currículum completo para las pistas de Matemáticas Sociales y Científicas.",
  },
};

jest.mock("@/lib/dictionaries/en.json", () => ({ default: mockDictionaries.en }), { virtual: true });
jest.mock("@/lib/dictionaries/ca.json", () => ({ default: mockDictionaries.ca }), { virtual: true });
jest.mock("@/lib/dictionaries/es.json", () => ({ default: mockDictionaries.es }), { virtual: true });

const supportedLocales: string[] = ["en", "ca", "es"];

describe("Page Rendering - All Locales", () => {
  describe("Home Page ([locale]/page.tsx)", () => {
    it.each(supportedLocales)("renders hero title in %s", async (locale: string) => {
      const { default: HomePage } = await import("@/app/[locale]/page");
      const params = Promise.resolve({ locale });
      render(<HomePage params={params as any} />);
      
      expect(screen.getByText(mockDictionaries[locale].hero_title)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].hero_description)).toBeInTheDocument();
    });

    it.each(supportedLocales)("renders navigation links in %s", async (locale: string) => {
      const { default: HomePage } = await import("@/app/[locale]/page");
      const params = Promise.resolve({ locale });
      render(<HomePage params={params as any} />);
      
      expect(screen.getByText(mockDictionaries[locale].nav_home)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].nav_social)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].nav_scientific)).toBeInTheDocument();
    });

    it.each(supportedLocales)("has correct lang attribute in %s", async (locale: string) => {
      const { default: HomePage } = await import("@/app/[locale]/page");
      const params = Promise.resolve({ locale });
      render(<HomePage params={params as any} />);
      
      const htmlElement = document.documentElement;
      expect(htmlElement.getAttribute("lang")).toBe(locale);
    });
  });

  describe("Social Track Page ([locale]/social/page.tsx)", () => {
    it.each(supportedLocales)("renders hero title in %s", async (locale: string) => {
      const { default: SocialPage } = await import("@/app/[locale]/social/page");
      const params = Promise.resolve({ locale });
      render(<SocialPage params={params as any} />);
      
      expect(screen.getByText(mockDictionaries[locale].hero_title)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].hero_description)).toBeInTheDocument();
    });

    it.each(supportedLocales)("renders navigation links in %s", async (locale: string) => {
      const { default: SocialPage } = await import("@/app/[locale]/social/page");
      const params = Promise.resolve({ locale });
      render(<SocialPage params={params as any} />);
      
      expect(screen.getByText(mockDictionaries[locale].nav_home)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].nav_social)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].nav_scientific)).toBeInTheDocument();
    });

    it.each(supportedLocales)("has correct lang attribute in %s", async (locale: string) => {
      const { default: SocialPage } = await import("@/app/[locale]/social/page");
      const params = Promise.resolve({ locale });
      render(<SocialPage params={params as any} />);
      
      const htmlElement = document.documentElement;
      expect(htmlElement.getAttribute("lang")).toBe(locale);
    });
  });

  describe("Scientific Track Page ([locale]/scientific/page.tsx)", () => {
    it.each(supportedLocales)("renders hero title in %s", async (locale: string) => {
      const { default: ScientificPage } = await import("@/app/[locale]/scientific/page");
      const params = Promise.resolve({ locale });
      render(<ScientificPage params={params as any} />);
      
      expect(screen.getByText(mockDictionaries[locale].hero_title)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].hero_description)).toBeInTheDocument();
    });

    it.each(supportedLocales)("renders navigation links in %s", async (locale: string) => {
      const { default: ScientificPage } = await import("@/app/[locale]/scientific/page");
      const params = Promise.resolve({ locale });
      render(<ScientificPage params={params as any} />);
      
      expect(screen.getByText(mockDictionaries[locale].nav_home)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].nav_social)).toBeInTheDocument();
      expect(screen.getByText(mockDictionaries[locale].nav_scientific)).toBeInTheDocument();
    });

    it.each(supportedLocales)("has correct lang attribute in %s", async (locale: string) => {
      const { default: ScientificPage } = await import("@/app/[locale]/scientific/page");
      const params = Promise.resolve({ locale });
      render(<ScientificPage params={params as any} />);
      
      const htmlElement = document.documentElement;
      expect(htmlElement.getAttribute("lang")).toBe(locale);
    });
  });

  describe("Language Switching", () => {
    it("displays different content for each locale on home page", async () => {
      const { default: HomePage } = await import("@/app/[locale]/page");
      
      const enParams = Promise.resolve({ locale: "en" });
      const caParams = Promise.resolve({ locale: "ca" });
      const esParams = Promise.resolve({ locale: "es" });
      
      render(<HomePage params={enParams as any} />);
      const enTitle = screen.getByText(mockDictionaries.en.hero_title);
      
      render(<HomePage params={caParams as any} />);
      const caTitle = screen.getByText(mockDictionaries.ca.hero_title);
      
      render(<HomePage params={esParams as any} />);
      const esTitle = screen.getByText(mockDictionaries.es.hero_title);
      
      expect(enTitle).not.toBe(caTitle);
      expect(enTitle).not.toBe(esTitle);
      expect(caTitle).not.toBe(esTitle);
    });

    it("displays different content for each locale on social page", async () => {
      const { default: SocialPage } = await import("@/app/[locale]/social/page");
      
      const enParams = Promise.resolve({ locale: "en" });
      const caParams = Promise.resolve({ locale: "ca" });
      const esParams = Promise.resolve({ locale: "es" });
      
      render(<SocialPage params={enParams as any} />);
      const enTitle = screen.getByText(mockDictionaries.en.hero_title);
      
      render(<SocialPage params={caParams as any} />);
      const caTitle = screen.getByText(mockDictionaries.ca.hero_title);
      
      render(<SocialPage params={esParams as any} />);
      const esTitle = screen.getByText(mockDictionaries.es.hero_title);
      
      expect(enTitle).not.toBe(caTitle);
      expect(enTitle).not.toBe(esTitle);
      expect(caTitle).not.toBe(esTitle);
    });

    it("displays different content for each locale on scientific page", async () => {
      const { default: ScientificPage } = await import("@/app/[locale]/scientific/page");
      
      const enParams = Promise.resolve({ locale: "en" });
      const caParams = Promise.resolve({ locale: "ca" });
      const esParams = Promise.resolve({ locale: "es" });
      
      render(<ScientificPage params={enParams as any} />);
      const enTitle = screen.getByText(mockDictionaries.en.hero_title);
      
      render(<ScientificPage params={caParams as any} />);
      const caTitle = screen.getByText(mockDictionaries.ca.hero_title);
      
      render(<ScientificPage params={esParams as any} />);
      const esTitle = screen.getByText(mockDictionaries.es.hero_title);
      
      expect(enTitle).not.toBe(caTitle);
      expect(enTitle).not.toBe(esTitle);
      expect(caTitle).not.toBe(esTitle);
    });
  });
});
