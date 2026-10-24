"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { socialDictionary } from "@/lib/dictionaries/social";
import { TheorySection } from "@/components/theory/TheorySection";
import { TheoryCard } from "@/components/theory/TheoryCard";
import { FormulaBox } from "@/components/theory/FormulaBox";
import { useProgress } from "@/lib/progress";

interface SocialPageProps {
  locale: string;
}

function SocialPageInner({ locale }: SocialPageProps) {
  const dict =
    socialDictionary[locale as keyof typeof socialDictionary] ||
    socialDictionary.en;
  const { progress, loadProgress } = useProgress();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const getTopicTitle = (topic: string): string => {
    return (dict as unknown as Record<string, string>)[`${topic}_title`] || topic;
  };

  const getTopicDesc = (topic: string): string => {
    return (dict as unknown as Record<string, string>)[`${topic}_desc`] || "";
  };

  // Define topics for social curriculum
  const socialTopics = [
    "descriptive-statistics",
    "probability",
    "inferential-statistics",
    "correlation-regression",
    "financial-math",
    "linear-programming",
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {dict.page_title}
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href={`/${locale}`}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dict.nav_home}
              </a>
              <a
                href={`/${locale}/social`}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dict.nav_social}
              </a>
              <a
                href={`/${locale}/scientific`}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {dict.nav_scientific}
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-900/20 border border-blue-500/20 dark:border-blue-900/30 text-blue-400 dark:text-blue-300 text-sm font-medium mb-6">
              {dict.track_badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
              {dict.page_title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {dict.page_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {socialTopics.map((topic) => (
              <div
                key={topic}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  {getTopicTitle(topic)}
                </h2>
                <p className="text-slate-600 dark:text-zinc-400 mb-4">
                  {getTopicDesc(topic)}
                </p>

                {/* Progress Indicator */}
                {progress.topics[topic] && (
                  <div className="mb-4">
                    <p className="text-sm text-slate-500">
                      Progress: {progress.topics[topic].completedExercises}/{
                        progress.topics[topic].totalExercises
                      } exercises completed
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-width"
                        style={{
                          width: `${(progress.topics[topic].completedExercises /
                            progress.topics[topic].totalExercises) *
                            100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Theory Card */}
                <TheoryCard
                  topic={{
                    id: topic,
                    title: getTopicTitle(topic),
                    content: getTopicDesc(topic),
                    formulas: dict.key_formulas
                      ? [dict.key_formulas]
                      : undefined,
                    examples: [
                      {
                        title: dict.examples,
                        problem: dict.problem,
                        solution: dict.solution,
                        formulas: dict.key_formulas
                          ? [dict.key_formulas]
                          : undefined,
                      },
                    ],
                    keyPoints: dict.key_points
                      ? dict.key_points
                      : undefined,
                  }}
                />

                {/* Formula Box for key formulas */}
                {dict.key_formulas && (
                  <FormulaBox latex={dict.key_formulas} displayMode={false} />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default async function SocialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SocialPageInner locale={locale} />;
}
