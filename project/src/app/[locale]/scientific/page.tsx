"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { scientificDictionary, scientificTopicsOrder } from "@/lib/dictionaries/scientific";
import { DerivativeVisualization } from "@/components/charts/DerivativeVisualization";
import { IntegralVisualization } from "@/components/charts/IntegralVisualization";
import { ProbabilityDistribution } from "@/components/charts/ProbabilityDistribution";
import { TheorySection } from "@/components/theory/TheorySection";
import { TheoryCard } from "@/components/theory/TheoryCard";
import { FormulaBox } from "@/components/theory/FormulaBox";
import { useProgress } from "@/lib/progress";

interface ScientificPageProps {
  locale: string;
}

function ScientificPageInner({ locale }: ScientificPageProps) {
  const dict =
    scientificDictionary[locale as keyof typeof scientificDictionary] ||
    scientificDictionary.en;
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const { progress, loadProgress, saveProgress } = useProgress();

  // Type-safe accessor for dictionary topic properties
  const getTopicTitle = (topic: string): string => {
    return (dict as unknown as Record<string, string>)[`${topic}_title`] || topic;
  };

  const getTopicDesc = (topic: string): string => {
    return (dict as unknown as Record<string, string>)[`${topic}_desc`] || "";
  };

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const getOverallStats = () => {
    const total = scientificTopicsOrder.reduce(
      (sum, topic) => sum + (progress.topics[topic]?.totalExercises || 0),
      0
    );
    const completed = scientificTopicsOrder.reduce(
      (sum, topic) => sum + (progress.topics[topic]?.completedExercises || 0),
      0
    );
    return { total, completed };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
              {dict.track_badge}
            </span>
            <h1 className="text-xl font-bold">{dict.page_title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600 transition">
              {dict.nav_home}
            </Link>
            <Link href={`/${locale}/social`} className="text-slate-600 hover:text-blue-600 transition">
              {dict.nav_social}
            </Link>
            <Link href={`/${locale}/scientific`} className="text-blue-600 font-medium">
              {dict.nav_scientific}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{dict.page_title}</h2>
          <p className="text-slate-600">{dict.page_subtitle}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 hidden lg:block">
            <nav className="space-y-1">
              {scientificTopicsOrder.map((topic: string) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                    activeTopic === topic
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {getTopicTitle(topic)}
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
                  <h3 className="text-2xl font-bold mb-2">
                    {getTopicTitle(topic)}
                  </h3>
                  <p className="text-slate-600 mb-4">
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

                  {/* Collapsible Theory Section */}
                  <details className="cursor-pointer mb-4">
                    <summary className="text-blue-600 font-medium hover:text-blue-800">
                      {dict.theory_link}
                    </summary>
                    <div className="prose prose-zinc dark:prose-invert my-4">
                      <p className="text-slate-600 dark:text-zinc-400">
                        {getTopicDesc(topic)}
                      </p>
                      {dict.key_points && (
                        <div className="mt-3">
                          <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Key Points:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                            {dict.key_points.map((point: string, index: number) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>

                  {/* Interactive Visualizations per Topic */}
                  {topic === "limits" && (
                    <DerivativeVisualization
                      func={(x) => Math.sin(x) / x}
                      xMin={-10}
                      xMax={10}
                      limitPoint={0}
                      limitValue={1}
                      title={dict.limits_title}
                      showEpsilonDelta={true}
                      epsilon={0.1}
                      delta={0.1}
                    />
                  )}
                  {topic === "continuity" && (
                    <DerivativeVisualization
                      func={(x) => (x < 0 ? x + 1 : x - 1)}
                      xMin={-5}
                      xMax={5}
                      pointOfInterest={0}
                      title={dict.continuity_title}
                    />
                  )}
                  {topic === "derivatives" && (
                    <DerivativeVisualization
                      func={(x) => x * x}
                      derivative={(x) => 2 * x}
                      xMin={-5}
                      xMax={5}
                      pointOfInterest={2}
                      title={dict.derivatives_title}
                    />
                  )}
                  {topic === "vectors" && (
                    <DerivativeVisualization
                      func={(x) => Math.sin(x)}
                      xMin={-5}
                      xMax={5}
                      title={dict.vectors_title}
                    />
                  )}
                  {topic === "matrices" && (
                    <DerivativeVisualization
                      func={(x) => Math.sin(x)}
                      xMin={-5}
                      xMax={5}
                      title={dict.matrices_title}
                    />
                  )}
                  {topic === "probability" && (
                    <ProbabilityDistribution
                      type="normal"
                      params={{ mu: 0, sigma: 1 }}
                      title={dict.probability_title}
                    />
                  )}
                  {topic === "integrals" && (
                    <IntegralVisualization
                      func={(x) => Math.exp(-x * x / 2)}
                      xMin={-4}
                      xMax={4}
                      title={dict.integrals_title}
                    />
                  )}
                  {topic === "combinatorics" && (
                    <DerivativeVisualization
                      func={(x) => x * x}
                      xMin={-5}
                      xMax={5}
                      title={dict.combinatorics_title}
                    />
                  )}
                  {topic === "descriptive-statistics" && (
                    <DerivativeVisualization
                      func={(x) => Math.sin(x)}
                      xMin={-5}
                      xMax={5}
                      title={dict.descriptive_statistics_title}
                    />
                  )}

                  {/* Theory Card with examples and formulas */}
                  {dict.examples_link && (
                    <TheoryCard
                      topic={{
                        id: topic,
                        title: getTopicTitle(topic),
                        content: getTopicDesc(topic),
                        formulas: dict.formulas
                          ? [dict.formulas]
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
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default async function ScientificPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ScientificPageInner locale={locale} />;
}
