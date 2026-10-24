import "@testing-library/jest-dom";

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spyOn: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mock: any;
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

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const spyOn: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mock: any;
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
