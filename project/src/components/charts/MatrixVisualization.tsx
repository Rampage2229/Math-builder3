"use client";

import { useMemo } from "react";

interface MatrixVisualizationProps {
  matrix: number[][];
  title: string;
  operation?: "determinant" | "inverse" | "transpose" | "multiplication";
  result?: number[][];
  className?: string;
}

export function MatrixVisualization({
  matrix,
  title,
  operation,
  result,
  className = "",
}: MatrixVisualizationProps) {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  const renderMatrix = (m: number[][]) => (
    <div className="inline-flex items-center gap-1">
      <span className="text-xl font-mono">[</span>
      {m.map((row, rIdx) => (
        <div key={rIdx} className="flex flex-col gap-1">
          {row.map((val, cIdx) => (
            <span key={cIdx} className="text-xl font-mono">
              {val.toLocaleString(undefined, { maximumFractionDigits: 3 })}
            </span>
          ))}
        </div>
      ))}
      <span className="text-xl font-mono">]</span>
    </div>
  );

  return (
    <div
      className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        {title}
      </h3>
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          {renderMatrix(matrix)}
          {operation && result && (
            <span className="text-2xl font-bold text-zinc-500 dark:text-zinc-400">
              →
            </span>
          )}
          {operation && result && renderMatrix(result)}
        </div>
        {operation && !result && (
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {operation === "determinant" && "Computing determinant..."}
            {operation === "inverse" && "Computing inverse..."}
            {operation === "transpose" && "Computing transpose..."}
            {operation === "multiplication" && "Computing multiplication..."}
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-2">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className="w-10 h-10 flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
              >
                {matrix[r][c].toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
