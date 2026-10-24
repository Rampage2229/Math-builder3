"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { scientificTopicsOrder } from "@/lib/dictionaries/scientific";

export default function ScientificPage() {
  const { t } = useTranslation("scientific");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                {t("track_badge")}
              </span>
              <h1 className="text-xl font-bold">{t("page_title")}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-600 hover:text-blue-600 transition">
                {t("nav_home")}
              </Link>
              <Link href="/social" className="text-slate-600 hover:text-blue-600 transition">
                {t("nav_social")}
              </Link>
              <Link href="/scientific" className="text-blue-600 font-medium">
                {t("nav_scientific")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t("page_title")}</h2>
          <p className="text-slate-600">{t("page_subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 hidden lg:block">
            <nav className="space-y-1">
              {scientificTopicsOrder.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                    activeTopic === topic
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {t(`${topic}_title`)}
                </button>
              ))}
            </nav>
          </aside>

          <section className="lg:col-span-9">
            <div className="space-y-8">
              {scientificTopicsOrder.map((topic) => (
                <div
                  key={topic}
                  id={topic}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-bold mb-2">{t(`${topic}_title`)}</h3>
                  <p className="text-slate-600 mb-4">{t(`${topic}_desc`)}</p>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
                      {t("theory_link")}
                    </button>
                    <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition text-sm font-medium">
                      {t("exercises_link")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
