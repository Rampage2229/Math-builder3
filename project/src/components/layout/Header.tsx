"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { socialDictionary } from "@/lib/dictionaries/social";
import { socialDictionary } from "@/lib/dictionaries/social";

interface HeaderProps {
  hasSidebar: boolean;
  onToggleSidebar: () => void;
}

export function Header({ hasSidebar, onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLocale = pathname.split("/")[2] || "en";

  const dict =
    socialDictionary[currentLocale as keyof typeof socialDictionary] ||
    socialDictionary.en;

  const handleLanguageChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {currentLocale === "ca"
                ? "Matemàtiques Batxillerat"
                : currentLocale === "es"
                  ? "Matemáticas Bachillerato"
                  : "Spanish Baccalaureate Math"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <svg
                className="w-6 h-6 text-zinc-700 dark:text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Sidebar toggle for desktop */}
            {hasSidebar && (
              <button
                onClick={onToggleSidebar}
                aria-label="Close sidebar"
                className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-zinc-700 dark:text-zinc-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Language switcher */}
            <LanguageSwitcher
              locale={currentLocale}
              onChange={(newLocale: string) => handleLanguageChange(newLocale)}
              dictionary={{
                language: dict.language,
                select_language: dict.select_language,
                catalan: dict.catalan,
                spanish: dict.spanish,
                english: dict.english,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
