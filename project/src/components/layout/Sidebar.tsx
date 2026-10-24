"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  onClose: () => void;
  currentLocale: string;
  dictionary: Record<string, string>;
}

const sidebarItems = [
  { href: "/", labelKey: "nav_home" },
  { href: "/social", labelKey: "nav_social" },
  { href: "/scientific", labelKey: "nav_scientific" },
  { href: "/progress", labelKey: "nav_progress" },
]

export function Sidebar({ onClose, currentLocale, dictionary }: SidebarProps) {
  const pathname = usePathname();
  const currentPage = pathname.split("/").filter(Boolean)[3] || "home";

  return (
    <aside className="fixed left-0 top-16 h-screen w-64 bg-white/90 dark:bg-zinc-900/90 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl transform -translate-x-full transition-transform duration-300 z-50">
      <div className="p-6 pt-0">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = item.href === currentPage;
            const label = dictionary[item.labelKey as keyof typeof dictionary] || item.labelKey;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                }`}
                onClick={onClose}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
