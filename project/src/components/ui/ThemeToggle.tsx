"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-zinc-900 dark:text-zinc-50" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-900 dark:text-zinc-50" />
      )}
    </Button>
  );
}
