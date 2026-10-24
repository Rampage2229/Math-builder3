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

// Register Chart.js components
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

interface FunctionGraphProps {
  func: (x: number) => number;
  xMin: number;
  xMax: number;
  title: string;
  xLabel?: string;
  yLabel?: string;
  highlightPoint?: { x: number; y: number; label: string };
  asymptote?: { x: number; label: string };
  color?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function FunctionGraph({
  func,
  xMin,
  xMax,
  title,
  xLabel = "x",
  yLabel = "f(x)",
  highlightPoint,
  asymptote,
  color = "rgba(99, 102, 241, 1)",
  className = "",
}: FunctionGraphProps) {
  const chartData = useMemo(() => {
    const step = (xMax - xMin) / DEFAULT_POINTS;
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 0; i <= DEFAULT_POINTS; i++) {
      const x = xMin + i * step;
      try {
        const y = func(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          labels.push(x.toFixed(2));
          data.push(y);
        } else {
          labels.push(x.toFixed(2));
          data.push(NaN as unknown as number);
        }
      } catch {
        labels.push(x.toFixed(2));
        data.push(NaN as unknown as number);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: color,
          backgroundColor: color.replace("1)", "0.1)"),
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.1,
        },
      ],
    };
  }, [func, xMin, xMax, title, color]);

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
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: (ctx: any) => {
            const x = ctx.parsed.x;
            const y = ctx.parsed.y;
            return `f(${x}) = ${y?.toFixed(4)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: { display: true, text: xLabel },
        min: xMin,
        max: xMax,
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        title: { display: true, text: yLabel },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
    animation: { duration: 0 },
  }), [xMin, xMax, xLabel, yLabel, title]);

  return (
    <div className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}>
      <Line
        options={options as unknown as Parameters<typeof Line>[0]["options"]}
        data={chartData as unknown as Parameters<typeof Line>[0]["data"]}
        height={300}
        width={500}
      />
      {highlightPoint && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-sm">
          <p className="text-blue-900 dark:text-blue-300 font-medium">
            {highlightPoint.label}: f({highlightPoint.x}) = {highlightPoint.y.toFixed(4)}
          </p>
        </div>
      )}
      {asymptote && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800 text-sm">
          <p className="text-red-900 dark:text-red-300 font-medium">
            Vertical asymptote at x = {asymptote.x} ({asymptote.label})
          </p>
        </div>
      )}
    </div>
  );
}
