import {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from "jest";

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Matchers<R> extends jest.Matchers<R, unknown> {}
  }
  const describe: typeof import("jest").describe;
  const it: typeof import("jest").it;
  const expect: typeof import("jest").expect;
  const jest: typeof import("jest").jest;
  const beforeAll: typeof import("jest").beforeAll;
  const afterAll: typeof import("jest").afterAll;
  const beforeEach: typeof import("jest").beforeEach;
  const afterEach: typeof import("jest").afterEach;
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
