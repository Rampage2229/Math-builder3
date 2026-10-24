"use client";

import { useMemo } from "react";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

export interface ProbabilityDistributionProps {
  type: "normal" | "binomial" | "poisson" | "uniform";
  params: {
    mu?: number;
    sigma?: number;
    n?: number;
    p?: number;
    lambda?: number;
    min?: number;
    max?: number;
  };
  title: string;
  className?: string;
}

export function ProbabilityDistribution({
  type,
  params,
  title,
  className = "",
}: ProbabilityDistributionProps) {
  const chartData = useMemo(() => {
    const { mu = 0, sigma = 1, n = 10, p = 0.5, lambda = 3, min = 0, max = 10 } = params;
    const labels: (string | number)[] = [];
    const data: number[] = [];

    if (type === "normal") {
      // Normal distribution
      const start = mu - 4 * sigma;
      const end = mu + 4 * sigma;
      const step = (end - start) / 100;
      for (let x = start; x <= end; x += step) {
        const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
        labels.push(x.toFixed(2));
        data.push(y);
      }
    } else if (type === "binomial") {
      // Binomial distribution
      for (let k = 0; k <= n; k++) {
        const comb = (n: number, k: number) => {
          if (k > n - k) k = n - k;
          let result = 1;
          for (let i = 0; i < k; i++) {
            result = result * (n - i) / (i + 1);
          }
          return result;
        };
        const prob = comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        labels.push(k);
        data.push(prob);
      }
    } else if (type === "poisson") {
      // Poisson distribution
      const maxK = Math.max(20, lambda * 3);
      for (let k = 0; k <= maxK; k++) {
        const prob = Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k);
        labels.push(k);
        data.push(prob);
      }
    } else if (type === "uniform") {
      // Uniform distribution
      for (let x = min; x <= max; x++) {
        labels.push(x);
        data.push(1 / (max - min + 1));
      }
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: "rgba(79, 70, 229, 0.6)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [type, params, title]);

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
          mode: "index",
          intersect: false,
          callbacks: {
            label: (ctx: { parsed: { y: number } }) => {
              return `Probability: ${ctx.parsed.y.toFixed(4)}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Value" },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Probability" },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 0 },
    }),
    [title],
  );

  function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }

  return (
    <div
      className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}
    >
      <Bar
        options={options as unknown as Parameters<typeof Bar>[0]["options"]}
        data={chartData as unknown as Parameters<typeof Bar>[0]["data"]}
        height={300}
        width={500}
      />
      <div className="mt-4 space-y-2 text-sm">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)} Distribution
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            {type === "normal" && (
              <>
                <li>μ (mean): {mu}</li>
                <li>σ (std dev): {sigma}</li>
              </>
            )}
            {type === "binomial" && (
              <>
                <li>n (trials): {n}</li>
                <li>p (success prob): {p}</li>
              </>
            )}
            {type === "poisson" && <li>λ (rate): {lambda}</li>}
            {type === "uniform" && (
              <>
                <li>Min: {min}</li>
                <li>Max: {max}</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
