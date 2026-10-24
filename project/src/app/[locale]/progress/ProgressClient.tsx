"use client";

import { useProgress } from "@/components/progress/ProgressProvider";
import { useState } from "react";

interface ProgressClientProps {
  locale: string;
  dict: Record<string, string>;
}

export default function ProgressClient({ locale, dict }: ProgressClientProps) {
  const { progress, getOverallStats, getTopicStats, formatTime } =
    useProgress();
  const [activeTab, setActiveTab] = useState<"overview" | "topics" | "history">(
    "overview",
  );

  const overallStats = getOverallStats();

  // Define topics for both tracks
  const scientificTopics = [
    { key: "limits", label: dict.limits, totalExercises: 10 },
    { key: "derivatives", label: dict.derivatives, totalExercises: 10 },
    { key: "integrals", label: dict.integrals, totalExercises: 10 },
    { key: "vectors", label: dict.vectors, totalExercises: 8 },
    { key: "matrices", label: dict.matrices, totalExercises: 8 },
    { key: "probability", label: dict.probability, totalExercises: 10 },
  ];

  const socialTopics = [
    {
      key: "descriptive_statistics",
      label: dict.descriptive_statistics,
      totalExercises: 10,
    },
    {
      key: "inferential_statistics",
      label: dict.inferential_statistics,
      totalExercises: 8,
    },
    {
      key: "correlation_regression",
      label: dict.correlation_regression,
      totalExercises: 8,
    },
    {
      key: "financial_mathematics",
      label: dict.financial_mathematics,
      totalExercises: 8,
    },
    {
      key: "linear_programming",
      label: dict.linear_programming,
      totalExercises: 6,
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {dict.overall_stats}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            label={dict.total_exercises}
            value={overallStats.totalExercises}
            icon="📝"
          />
          <StatCard
            label={dict.completed_exercises}
            value={overallStats.completedExercises}
            icon="✅"
          />
          <StatCard
            label={dict.average_score}
            value={`${overallStats.averageScore.toFixed(1)}%`}
            icon="📊"
          />
          <StatCard
            label={dict.total_points}
            value={overallStats.totalPoints}
            icon="⭐"
          />
          <StatCard
            label={dict.time_spent}
            value={formatTime(overallStats.totalTimeSpent)}
            icon="⏱️"
          />
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {dict.progress_chart}
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p>{dict.no_progress_yet}</p>
        </div>
      </section>
    </div>
  );

  const renderTopics = () => (
    <div className="space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {dict.scientific_topics}
        </h2>
        <div className="space-y-3">
          {scientificTopics.map((topic) => {
            const stats = getTopicStats(topic.key, topic.totalExercises);
            const percentage =
              stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
            return (
              <TopicProgressBar
                key={topic.key}
                label={topic.label}
                completed={stats.completed}
                total={stats.total}
                percentage={percentage}
                averageScore={stats.averageScore}
                timeSpent={formatTime(stats.timeSpent)}
              />
            );
          })}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {dict.social_topics}
        </h2>
        <div className="space-y-3">
          {socialTopics.map((topic) => {
            const stats = getTopicStats(topic.key, topic.totalExercises);
            const percentage =
              stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
            return (
              <TopicProgressBar
                key={topic.key}
                label={topic.label}
                completed={stats.completed}
                total={stats.total}
                percentage={percentage}
                averageScore={stats.averageScore}
                timeSpent={formatTime(stats.timeSpent)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );

  const renderHistory = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {dict.exercise_history}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">
                {dict.exercise}
              </th>
              <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">
                {dict.result}
              </th>
              <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">
                {dict.points_earned}
              </th>
              <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">
                {dict.date}
              </th>
            </tr>
          </thead>
          <tbody>
            {progress.exerciseProgress.attempts.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  {dict.no_progress_yet}
                </td>
              </tr>
            ) : (
              [...progress.exerciseProgress.attempts]
                .reverse()
                .slice(0, 20)
                .map((attempt, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2">{attempt.exerciseId}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          attempt.isCorrect
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {attempt.isCorrect ? dict.correct : dict.incorrect}
                      </span>
                    </td>
                    <td className="py-2">{attempt.isCorrect ? "+10" : "0"}</td>
                    <td className="py-2 text-gray-500 dark:text-gray-400 text-sm">
                      {new Date(attempt.completedAt).toLocaleDateString(
                        locale,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {dict.progress_title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {dict.progress_subtitle}
        </p>
      </header>

      <nav className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <TabButton
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          {dict.overall_stats}
        </TabButton>
        <TabButton
          active={activeTab === "topics"}
          onClick={() => setActiveTab("topics")}
        >
          {dict.topic_progress}
        </TabButton>
        <TabButton
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        >
          {dict.exercise_history}
        </TabButton>
      </nav>

      <main>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "topics" && renderTopics()}
        {activeTab === "history" && renderHistory()}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {label}
      </div>
    </div>
  );
}

function TopicProgressBar({
  label,
  completed,
  total,
  percentage,
  averageScore,
  timeSpent,
  dict,
}: {
  label: string;
  completed: number;
  total: number;
  percentage: number;
  averageScore: number;
  timeSpent: string;
  dict: Record<string, string>;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-900 dark:text-white">
          {label}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {completed}/{total} ({percentage.toFixed(0)}%)
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>
          {dict.average_score}: {averageScore.toFixed(1)}%
        </span>
        <span>
          {dict.time_spent}: {timeSpent}
        </span>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
        active
          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      }`}
    >
      {children}
    </button>
  );
}
