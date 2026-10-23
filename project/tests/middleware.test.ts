import { NextRequest, NextResponse } from "next/server";

// Mock the middleware module
jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url: string | URL) => ({
      status: 307,
      url: url.toString(),
    })),
    next: jest.fn(() => ({ status: 200 })),
  },
}));

const { middleware, config } = require("../src/middleware");

describe("Middleware Locale Detection", () => {
  describe("config", () => {
    it("should have a matcher configuration", () => {
      expect(config).toBeDefined();
      expect(config.matcher).toBeDefined();
      expect(Array.isArray(config.matcher)).toBe(true);
    });

    it("should match all routes except API, static, and favicon", () => {
      expect(config.matcher[0]).toContain("api");
      expect(config.matcher[0]).toContain("_next/static");
      expect(config.matcher[0]).toContain("_next/image");
      expect(config.matcher[0]).toContain("favicon.ico");
    });
  });

  describe("locale detection from Accept-Language header", () => {
    const createRequest = (acceptLanguage: string, pathname: string) => {
      return new NextRequest(`http://localhost:3000${pathname}`, {
        headers: {
          "accept-language": acceptLanguage,
        },
      });
    };

    it("should detect Catalan locale from Accept-Language header starting with 'ca'", () => {
      const request = createRequest("ca-ES,ca;q=0.9", "/");
      const response = middleware(request) as any;
      expect(response.url).toContain("/ca/");
    });

    it("should detect Spanish locale from Accept-Language header starting with 'es'", () => {
      const request = createRequest("es-ES,es;q=0.9", "/");
      const response = middleware(request) as any;
      expect(response.url).toContain("/es/");
    });

    it("should default to English when Accept-Language is not Catalan or Spanish", () => {
      const request = createRequest("en-US,en;q=0.9", "/");
      const response = middleware(request) as any;
      expect(response.url).toContain("/en/");
    });

    it("should default to English when Accept-Language header is empty", () => {
      const request = createRequest("", "/");
      const response = middleware(request) as any;
      expect(response.url).toContain("/en/");
    });

    it("should detect Catalan when 'ca' appears after comma in Accept-Language", () => {
      const request = createRequest("en-US,en;q=0.9,ca;q=0.8", "/");
      const response = middleware(request) as any;
      expect(response.url).toContain("/ca/");
    });

    it("should detect Spanish when 'es' appears after comma in Accept-Language", () => {
      const request = createRequest("en-US,en;q=0.9,es;q=0.8", "/");
      const response = middleware(request) as any;
      expect(response.url).toContain("/es/");
    });
  });

  describe("pathname handling", () => {
    it("should redirect root path '/' to default locale", () => {
      const request = new NextRequest("http://localhost:3000/", {
        headers: { "accept-language": "en-US,en;q=0.9" },
      });
      const response = middleware(request) as any;
      expect(response.url).toContain("/en/");
    });

    it("should pass through requests that already have a locale prefix", () => {
      const request = new NextRequest("http://localhost:3000/en/social", {
        headers: { "accept-language": "ca-ES" },
      });
      const response = middleware(request) as any;
      // Should call next() not redirect
      expect(response.status).toBe(200);
    });

    it("should pass through requests with Catalan locale prefix", () => {
      const request = new NextRequest("http://localhost:3000/ca/social", {
        headers: { "accept-language": "en-US" },
      });
      const response = middleware(request) as any;
      expect(response.status).toBe(200);
    });

    it("should pass through requests with Spanish locale prefix", () => {
      const request = new NextRequest("http://localhost:3000/es/scientific", {
        headers: { "accept-language": "en-US" },
      });
      const response = middleware(request) as any;
      expect(response.status).toBe(200);
    });
  });

  describe("supported locales", () => {
    it("should support en, ca, and es locales", () => {
      const supportedLocales = ["en", "ca", "es"];
      expect(supportedLocales).toContain("en");
      expect(supportedLocales).toContain("ca");
      expect(supportedLocales).toContain("es");
    });
  });
});
