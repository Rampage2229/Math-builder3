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

interface IntegralVisualizationProps {
  func: (x: number) => number;
  xMin: number;
  xMax: number;
  integralMin?: number;
  integralMax?: number;
  title: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function IntegralVisualization({
  func,
  xMin,
  xMax,
  integralMin = xMin,
  integralMax = xMax,
  title,
  xLabel = "x",
  yLabel = "y",
  color = "rgba(99, 102, 241, 1)",
  className = "",
}: IntegralVisualizationProps) {
  const chartData = useMemo(() => {
    const step = (xMax - xMin) / DEFAULT_POINTS;
    const funcData: { x: number; y: number | null }[] = [];
    const fillData: { x: number; y: number | null }[] = [];

    for (let i = 0; i <= DEFAULT_POINTS; i++) {
      const x = xMin + i * step;
      try {
        const y = func(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          funcData.push({ x, y });
          if (x >= integralMin && x <= integralMax) {
            fillData.push({ x, y });
          } else {
            fillData.push({ x, y: null });
          }
        } else {
          funcData.push({ x, y: null });
          fillData.push({ x, y: null });
        }
      } catch {
        funcData.push({ x, y: null });
        fillData.push({ x, y: null });
      }
    }

    return {
      datasets: [
        {
          label: "f(x)",
          data: funcData,
          borderColor: color,
          backgroundColor: color.replace("1)", "0.1)"),
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.1,
        },
        {
          label: "Area under curve",
          data: fillData,
          borderColor: color,
          backgroundColor: color.replace("1)", "0.3)"),
          borderWidth: 1,
          pointRadius: 0,
          fill: true,
          tension: 0.1,
        },
      ],
    };
  }, [func, xMin, xMax, integralMin, integralMax, color]);

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
          min: xMin,
          max: xMax,
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        y: {
          title: { display: true, text: yLabel },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 1000 },
    }),
    [xMin, xMax, xLabel, yLabel, title],
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
      <div className="mt-4 space-y-2 text-sm">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            Integral Analysis:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                f(x)
              </span>{" "}
              - Original function
            </li>
            <li>
              <span className="font-mono text-green-600 dark:text-green-400">
                Shaded area
              </span>{" "}
              represents the definite integral from {integralMin} to{" "}
              {integralMax}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
