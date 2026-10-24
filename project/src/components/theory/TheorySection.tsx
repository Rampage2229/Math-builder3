"use client";

import { FormulaDisplay, InlineFormula, BlockFormula } from "./FormulaDisplay";

export interface TheorySectionProps {
  title: string;
  description: string;
  topics: TheoryTopic[];
  className?: string;
}

export interface TheoryTopic {
  id: string;
  title: string;
  content: string;
  formulas?: string[];
  examples?: TheoryExample[];
  keyPoints?: string[];
}

export interface TheoryExample {
  title: string;
  problem: string;
  solution: string;
  formulas?: string[];
}

export function TheorySection({
  title,
  description,
  topics,
  className = "",
}: TheorySectionProps) {
  return (
    <section className={`space-y-8 ${className}`}>
      <header className="border-b border-zinc-200 dark:border-zinc-700 pb-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </header>
      <div className="space-y-6">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: TheoryTopic }) {
  return (
    <article className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        {topic.title}
      </h3>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">{topic.content}</p>

        {topic.formulas && topic.formulas.length > 0 && (
          <div className="space-y-3 my-4">
            <h4 className="font-medium text-zinc-700 dark:text-zinc-300">
              Key Formulas:
            </h4>
            {topic.formulas.map((formula, index) => (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-800 rounded p-4"
              >
                <BlockFormula latex={formula} />
              </div>
            ))}
          </div>
        )}

        {topic.examples && topic.examples.length > 0 && (
          <div className="space-y-4 my-4">
            <h4 className="font-medium text-zinc-700 dark:text-zinc-300">
              Examples:
            </h4>
            {topic.examples.map((example, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
              >
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {example.title}
                </h5>
                <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                  <strong>Problem:</strong> {example.problem}
                </p>
                <p className="text-zinc-700 dark:text-zinc-300 mb-2">
                  <strong>Solution:</strong> {example.solution}
                </p>
                {example.formulas && example.formulas.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {example.formulas.map((formula, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-zinc-800 rounded p-3"
                      >
                        <BlockFormula latex={formula} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {topic.keyPoints && topic.keyPoints.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Key Points:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
              {topic.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export { FormulaDisplay, InlineFormula, BlockFormula };
