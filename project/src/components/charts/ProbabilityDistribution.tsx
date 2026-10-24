"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
);

interface ProbabilityDistributionProps {
  type: "normal" | "binomial";
  params: { mu?: number; sigma?: number; n?: number; p?: number };
  title: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function ProbabilityDistribution({
  type,
  params,
  title,
  xLabel = "x",
  yLabel = "Probability Density",
  color = "rgba(99, 102, 241, 1)",
  className = "",
}: ProbabilityDistributionProps) {
  const chartData = useMemo(() => {
    const data: { x: number; y: number | null }[] = [];

    if (type === "normal") {
      const mu = params.mu ?? 0;
      const sigma = params.sigma ?? 1;
      const step = (6 * sigma) / DEFAULT_POINTS;

      for (let i = 0; i <= DEFAULT_POINTS; i++) {
        const x = mu - 3 * sigma + i * step;
        const y =
          (1 / (sigma * Math.sqrt(2 * Math.PI))) *
          Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
        data.push({ x, y: isFinite(y) ? y : null });
      }
    } else if (type === "binomial") {
      const n = params.n ?? 10;
      const p = params.p ?? 0.5;

      for (let k = 0; k <= n; k++) {
        const coeff = factorial(n) / (factorial(k) * factorial(n - k));
        const y = coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
        data.push({ x: k, y: isFinite(y) ? y : null });
      }
    }

    return { datasets: [{ label: title, data, borderColor: color, backgroundColor: color.replace("1)", "0.1)"), borderWidth: 2, pointRadius: 0, fill: false, tension: 0.1 }] };
  }, [type, params, color, title]);

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
        legend: { display: true, position: "top" },
        tooltip: {
          enabled: true,
          mode: "nearest",
          intersect: false,
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: xLabel },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        y: {
          title: { display: true, text: yLabel },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 1000 },
    }),
    [xLabel, yLabel, title],
  );

  return (
    <div
      className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}
    >
      <Line
        options={options as unknown as Parameters<typeof Line>[0]["options"]}
        data={chartData as unknown as Parameters<typeof Line>[0]["data"]}
        height={300}
        width={500}
      />
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
