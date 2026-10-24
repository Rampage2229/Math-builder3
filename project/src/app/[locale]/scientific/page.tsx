"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { scientificDictionary, scientificTopicsOrder } from "@/lib/dictionaries/scientific";
import { LimitVisualization } from "@/components/charts/LimitVisualization";
import { ContinuityVisualization } from "@/components/charts/ContinuityVisualization";
import { DerivativeVisualization } from "@/components/charts/DerivativeVisualization";
import { VectorVisualization } from "@/components/charts/VectorVisualization";
import { MatrixVisualization } from "@/components/charts/MatrixVisualization";
import { ProbabilityDistribution } from "@/components/charts/ProbabilityDistribution";
import { DescriptiveStatsVisualization } from "@/components/charts/DescriptiveStatsVisualization";
import { CombinatoricsVisualization } from "@/components/charts/CombinatoricsVisualization";
import { FunctionGraph } from "@/components/charts/FunctionGraph";

export default async function ScientificPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict =
    scientificDictionary[locale as keyof typeof scientificDictionary] ||
    scientificDictionary.en;
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Type-safe accessor for dictionary topic properties
  const getTopicTitle = (topic: string): string => {
    return (dict as unknown as Record<string, string>)[`${topic}_title`] || topic;
  };

  const getTopicDesc = (topic: string): string => {
    return (dict as unknown as Record<string, string>)[`${topic}_desc`] || "";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
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
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium">
                      {dict.theory_link}
                    </button>
                    <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition text-sm font-medium">
                      {dict.exercises_link}
                    </button>
                  </div>

                  {/* Interactive Visualizations per Topic */}
                  {topic === "limits" && (
                    <LimitVisualization
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
                    <ContinuityVisualization
                      func={(x) => (x < 0 ? x + 1 : x - 1)}
                      xMin={-5}
                      xMax={5}
                      discontinuities={[
                        {
                          x: 0,
                          type: "jump",
                          leftLimit: 1,
                          rightLimit: -1,
                        },
                      ]}
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
                    <VectorVisualization
                      vectors={[
                        { x: 3, y: 2, label: "Vector A", color: "rgba(99, 102, 241, 1)" },
                        { x: 1, y: 4, label: "Vector B", color: "rgba(239, 68, 68, 1)" },
                      ]}
                      title={dict.vectors_title}
                      showResultant={true}
                    />
                  )}
                  {topic === "matrices" && (
                    <MatrixVisualization
                      matrix={[
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                      ]}
                      title={dict.matrices_title}
                      operation="determinant"
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
                    <FunctionGraph
                      func={(x) => Math.exp(-x * x / 2)}
                      xMin={-4}
                      xMax={4}
                      title={dict.integrals_title}
                      highlightPoint={{ x: 0, y: 1, label: "Peak" }}
                    />
                  )}
                  {topic === "combinatorics" && (
                    <CombinatoricsVisualization
                      type="combinations"
                      n={10}
                      k={3}
                      title={dict.combinatorics_title}
                    />
                  )}
                  {topic === "descriptive-statistics" && (
                    <DescriptiveStatsVisualization
                      data={[12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48]}
                      title={dict.descriptive_statistics_title}
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
