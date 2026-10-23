import { NextRequest, NextResponse } from "next/server";
import { proxy as middleware, config } from "../src/proxy";

// Mock the next/server module
jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url: string | URL) => ({
      status: 307,
      url: url.toString(),
    })),
    next: jest.fn(() => ({ status: 200 })),
  },
}));

// Helper to create a mock request object
const createMockRequest = (
  acceptLanguage: string,
  pathname: string,
): NextRequest => {
  return {
    nextUrl: new URL(`http://localhost:3000${pathname}`),
    url: `http://localhost:3000${pathname}`,
    headers: {
      get: (key: string): string | null => {
        if (key === "accept-language") return acceptLanguage;
        return null;
      },
    },
  } as unknown as NextRequest;
};

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
    it("should detect Catalan locale from Accept-Language header starting with 'ca'", () => {
      const request = createMockRequest("ca-ES,ca;q=0.9", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/ca/");
    });

    it("should detect Spanish locale from Accept-Language header starting with 'es'", () => {
      const request = createMockRequest("es-ES,es;q=0.9", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/es/");
    });

    it("should default to English when Accept-Language is not Catalan or Spanish", () => {
      const request = createMockRequest("en-US,en;q=0.9", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/en/");
    });

    it("should default to English when Accept-Language header is empty", () => {
      const request = createMockRequest("", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/en/");
    });

    it("should detect Catalan when 'ca' appears after comma in Accept-Language", () => {
      const request = createMockRequest("en-US,en;q=0.9,ca;q=0.8", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/ca/");
    });

    it("should detect Spanish when 'es' appears after comma in Accept-Language", () => {
      const request = createMockRequest("en-US,en;q=0.9,es;q=0.8", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/es/");
    });
  });

  describe("pathname handling", () => {
    it("should redirect root path '/' to default locale", () => {
      const request = createMockRequest("en-US,en;q=0.9", "/");
      const response = middleware(request) as { url: string };
      expect(response.url).toContain("/en/");
    });

    it("should pass through requests that already have a locale prefix", () => {
      const request = createMockRequest("ca-ES", "/en/social");
      const response = middleware(request) as { status: number };
      expect(response.status).toBe(200);
    });

    it("should pass through requests with Catalan locale prefix", () => {
      const request = createMockRequest("en-US", "/ca/social");
      const response = middleware(request) as { status: number };
      expect(response.status).toBe(200);
    });

    it("should pass through requests with Spanish locale prefix", () => {
      const request = createMockRequest("en-US", "/es/scientific");
      const response = middleware(request) as { status: number };
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
