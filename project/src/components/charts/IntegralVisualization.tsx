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
  fillColor?: string;
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
  yLabel = "f(x)",
  color = "rgba(99, 102, 241, 1)",
  fillColor = "rgba(99, 102, 241, 0.2)",
  className = "",
}: IntegralVisualizationProps) {
  const chartData = useMemo(() => {
    const step = (xMax - xMin) / DEFAULT_POINTS;
    const labels: string[] = [];
    const data: number[] = [];
    const fillData: { x: number; y: number | null }[] = [];

    for (let i = 0; i <= DEFAULT_POINTS; i++) {
      const x = xMin + i * step;
      try {
        const y = func(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          labels.push(x.toFixed(2));
          data.push(y);
          // Only fill between integralMin and integralMax
          if (x >= integralMin && x <= integralMax) {
            fillData.push({ x, y });
          } else {
            fillData.push({ x, y: null });
          }
        } else {
          labels.push(x.toFixed(2));
          data.push(NaN as unknown as number);
          fillData.push({ x, y: null });
        }
      } catch {
        labels.push(x.toFixed(2));
        data.push(NaN as unknown as number);
        fillData.push({ x, y: null });
      }
    }

    // Approximate integral value using trapezoidal rule
    let integralValue = 0;
    const integralStep = (integralMax - integralMin) / 100;
    for (let i = 0; i < 100; i++) {
      const x1 = integralMin + i * integralStep;
      const x2 = integralMin + (i + 1) * integralStep;
      try {
        const y1 = func(x1);
        const y2 = func(x2);
        if (isFinite(y1) && isFinite(y2)) {
          integralValue += ((y1 + y2) / 2) * integralStep;
        }
      } catch {
        // Skip
      }
    }

    return {
      labels,
      datasets: [
        {
          label: "f(x)",
          data,
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
          backgroundColor: fillColor,
          borderWidth: 0,
          pointRadius: 0,
          fill: false,
          tension: 0.1,
        },
      ],
      integralValue,
    };
  }, [func, xMin, xMax, integralMin, integralMax, title, color, fillColor]);

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
          callbacks: {
            label: (ctx: { parsed: { x: number; y: number | undefined } }) => {
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
      <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
        <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
          Definite Integral:
        </p>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm">
          ∫<sub>{integralMin.toFixed(2)}</sub><sup>{integralMax.toFixed(2)}</sup> f(x) dx ≈{" "}
          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
            {chartData.integralValue.toFixed(4)}
          </span>
        </p>
      </div>
    </div>
  );
}
