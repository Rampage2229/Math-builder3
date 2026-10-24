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
