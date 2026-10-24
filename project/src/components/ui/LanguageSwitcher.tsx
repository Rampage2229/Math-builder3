"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  locale: string;
  dictionary: {
    language: string;
    select_language: string;
    catalan: string;
    spanish: string;
    english: string;
  };
}

const languages = [
  { code: "ca", name: "catalan", nativeName: "Català" },
  { code: "es", name: "spanish", nativeName: "Español" },
  { code: "en", name: "english", nativeName: "English" },
] as const;

export function LanguageSwitcher({
  locale,
  dictionary,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[2];

  const handleLanguageChange = (newLocale: string) => {
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={dictionary.select_language}
      >
        <span className="text-base">{currentLanguage.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <ul
            className="absolute right-0 mt-1 w-40 rounded-lg bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-700 py-1 z-20"
            role="listbox"
            aria-label={dictionary.select_language}
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                    locale === lang.code
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {lang.nativeName}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
