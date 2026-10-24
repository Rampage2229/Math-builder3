import "@testing-library/jest-dom";

declare global {
  namespace jest {
    const fn: <T = unknown>(implementation?: (...args: unknown[]) => T) => T;
    const spyOn: <T extends object, K extends keyof T>(
      object: T,
      method: K,
    ) => jest.SpyInstance<T[K], []>;
    const mock: <T = unknown>(implementation?: (...args: unknown[]) => T) => T;
    const describe: (name: string, fn: () => void) => void;
    const it: (name: string, fn: () => void | Promise<void>) => void;
    const expect: <T>(actual: T) => jest.Matchers<T>;
    const beforeAll: (fn: () => void | Promise<void>) => void;
    const afterAll: (fn: () => void | Promise<void>) => void;
  }
}

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0] as string).includes(
        "Warning: ReactDOM.render is no longer supported",
      )
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0] as string).includes(
        "Warning: ReactDOM.render is no longer supported",
      )
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
