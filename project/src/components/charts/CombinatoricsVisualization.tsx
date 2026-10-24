"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

interface CombinatoricsVisualizationProps {
  type: "permutations" | "combinations" | "binomial";
  n: number;
  k?: number;
  title: string;
  className?: string;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

function permutations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= n - i;
  }
  return result;
}

function binomialCoefficients(n: number): number[] {
  const coeffs: number[] = [];
  for (let k = 0; k <= n; k++) {
    coeffs.push(combinations(n, k));
  }
  return coeffs;
}

export function CombinatoricsVisualization({
  type,
  n,
  k = 0,
  title,
  className = "",
}: CombinatoricsVisualizationProps) {
  const [showFormula, setShowFormula] = useState(true);

  const chartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    let formula = "";
    let result = 0;

    if (type === "permutations") {
      const maxK = Math.min(n, 8);
      for (let i = 1; i <= maxK; i++) {
        labels.push(`P(${n}, ${i})`);
        data.push(permutations(n, i));
      }
      formula = `P(n, k) = n! / (n-k)! = ${n}! / ${n - k}!`;
      result = permutations(n, k || 1);
    } else if (type === "combinations") {
      const maxK = Math.min(n, 8);
      for (let i = 1; i <= maxK; i++) {
        labels.push(`C(${n}, ${i})`);
        data.push(combinations(n, i));
      }
      formula = `C(n, k) = n! / (k!(n-k)!) = ${n}! / (${k}!(${n - k})!)`;
      result = combinations(n, k || 1);
    } else if (type === "binomial") {
      const coeffs = binomialCoefficients(n);
      for (let i = 0; i <= n; i++) {
        labels.push(`C(${n}, ${i})`);
        data.push(coeffs[i]);
      }
      formula = `(a + b)^${n} = Σ C(${n}, k) a^{${n}-k} b^k`;
      result = combinations(n, k);
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: "rgba(99, 102, 241, 1)",
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
      formula,
      result,
    };
  }, [type, n, k, title]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, weight: "bold" },
        },
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (ctx: { parsed: { y: number } }) => {
              return `Value: ${ctx.parsed.y.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: type === "binomial" ? "k" : "k (selection size)",
          },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        y: {
          title: { display: true, text: "Count" },
          grid: { color: "rgba(0,0,0,0.05)" },
          beginAtZero: true,
        },
      },
      animation: { duration: 0 },
    }),
    [type, title],
  );

  const stats = chartData;

  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          {title}
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <span>n = {n}</span>
          {(type === "permutations" || type === "combinations") && (
            <span>k = {k}</span>
          )}
        </div>
      </div>

      {showFormula && (
        <div className="mb-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
            {stats.formula}
          </p>
          <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            Result: {stats.result.toLocaleString()}
          </p>
        </div>
      )}

      <Bar
        options={options as unknown as Parameters<typeof Bar>[0]["options"]}
        data={chartData as unknown as Parameters<typeof Bar>[0]["data"]}
        height={300}
        width={500}
      />

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {showFormula ? "Hide Formula" : "Show Formula"}
        </button>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {type === "binomial"
            ? `Binomial coefficients for (a+b)^${n}`
            : `${type === "permutations" ? "Permutations" : "Combinations"} P(${n}, k) / C(${n}, k)`}
        </div>
      </div>
    </div>
  );
}
