"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface MobileMenuProps {
  locale: string;
  onSelect: (locale: string) => void;
}

export function MobileMenu({ locale, onSelect }: MobileMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newLocale: string) => {
    onSelect(newLocale);
    setIsOpen(false);
  };

  const languages = [
    { code: "ca", name: "Català" },
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-white/90 dark:bg-zinc-900/90 hidden" id="mobile-menu">
      <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
        <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {locale === "ca" ? "Matemàtiques Batxillerat" : locale === "es" ? "Matemáticas Bachillerato" : "Spanish Baccalaureate Math"}
        </span>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
      </div>
      <ul className="flex flex-col gap-4 p-6 pt-0">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              onClick={() => handleSelect(lang.code)}
              className={`w-full rounded-md px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 ${
                locale === lang.code ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
