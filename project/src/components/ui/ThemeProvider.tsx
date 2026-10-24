"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
}: {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  enableSystem?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
