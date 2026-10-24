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
import { useMemo } from "react";

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

interface DescriptiveStatsVisualizationProps {
  data: number[];
  title: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  className?: string;
}

const DEFAULT_BINS = 10;

export function DescriptiveStatsVisualization({
  data,
  title,
  xLabel = "Value",
  yLabel = "Frequency",
  color = "rgba(99, 102, 241, 1)",
  className = "",
}: DescriptiveStatsVisualizationProps) {
  const chartData = useMemo(() => {
    if (data.length === 0) {
      return { labels: [], datasets: [] };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const binWidth = range / DEFAULT_BINS;

    const bins: number[] = Array(DEFAULT_BINS).fill(0);
    const labels: string[] = [];

    data.forEach((value) => {
      const binIndex = Math.min(
        Math.floor(((value - min) / range) * DEFAULT_BINS),
        DEFAULT_BINS - 1,
      );
      bins[binIndex] += 1;
    });

    for (let i = 0; i < DEFAULT_BINS; i++) {
      const binStart = min + i * binWidth;
      const binEnd = min + (i + 1) * binWidth;
      labels.push(`${binStart.toFixed(1)}–${binEnd.toFixed(1)}`);
    }

    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const sorted = [...data].sort((a, b) => a - b);
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];
    const variance =
      data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      data.length;
    const stdDev = Math.sqrt(variance);

    return {
      labels,
      datasets: [
        {
          label: title,
          data: bins,
          borderColor: color,
          backgroundColor: color.replace("1)", "0.2)"),
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
      stats: { mean, median, stdDev, min, max },
    };
  }, [data, title, color]);

  const options = useMemo(() => ({
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
          label: (ctx: any) => {
            return `Frequency: ${ctx.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: xLabel },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        title: { display: true, text: yLabel },
        grid: { color: "rgba(0,0,0,0.05)" },
        beginAtZero: true,
      },
    },
    animation: { duration: 0 },
  }), [title, xLabel, yLabel]);

  const stats = chartData.stats;

  return (
    <div className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}>
      <Bar
        options={options as unknown as Parameters<typeof Bar>[0]["options"]}
        data={chartData as unknown as Parameters<typeof Bar>[0]["data"]}
        height={300}
        width={500}
      />
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Mean</p>
          <p className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.mean.toFixed(2)}
          </p>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Median</p>
          <p className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.median.toFixed(2)}
          </p>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Std Dev</p>
          <p className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
            {stats?.stdDev.toFixed(2)}
          </p>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Range</p>
          <p className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
            [{stats?.min.toFixed(2)}, {stats?.max.toFixed(2)}]
          </p>
        </div>
      </div>
    </div>
  );
}
