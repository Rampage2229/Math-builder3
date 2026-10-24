"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useMemo } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export interface IntegralVisualizationProps {
  func: (x: number) => number;
  xMin: number;
  xMax: number;
  integralMin?: number;
  integralMax?: number;
  title: string;
  xLabel?: string;
  yLabel?: string;
  funcColor?: string;
  areaColor?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function IntegralVisualization({
  func,
  xMin,
  xMax,
  integralMin,
  integralMax,
  title,
  xLabel = "x",
  yLabel = "y",
  funcColor = "rgba(99, 102, 241, 1)",
  areaColor = "rgba(99, 102, 241, 0.3)",
  className = "",
}: IntegralVisualizationProps) {
  const chartData = useMemo(() => {
    const step = (xMax - xMin) / DEFAULT_POINTS;
    const funcData: { x: number; y: number | null }[] = [];
    const areaData: { x: number; y: number | null }[] = [];

    const a = integralMin ?? xMin;
    const b = integralMax ?? xMax;

    for (let i = 0; i <= DEFAULT_POINTS; i++) {
      const x = xMin + i * step;
      try {
        const y = func(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          funcData.push({ x, y });
        } else {
          funcData.push({ x, y: null });
        }

        // Area under curve for integral region
        if (x >= a && x <= b && isFinite(y) && Math.abs(y) < 1e6) {
          areaData.push({ x, y });
        } else {
          areaData.push({ x, y: null });
        }
      } catch {
        funcData.push({ x, y: null });
        areaData.push({ x, y: null });
      }
    }

    // Close the area polygon
    if (areaData.length > 0) {
      const firstValid = areaData.find((d) => d.y !== null);
      const lastValid = [...areaData].reverse().find((d) => d.y !== null);
      if (firstValid && lastValid) {
        areaData.unshift({ x: a, y: 0 });
        areaData.push({ x: b, y: 0 });
      }
    }

    return {
      datasets: [
        {
          label: "f(x)",
          data: funcData,
          borderColor: funcColor,
          backgroundColor: funcColor.replace("1)", "0.1)"),
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.1,
          type: "line" as const,
        },
        {
          label: "Integral Area",
          data: areaData,
          borderColor: areaColor,
          backgroundColor: areaColor,
          borderWidth: 0,
          pointRadius: 0,
          fill: true,
          tension: 0.1,
          type: "line" as const,
        },
      ],
    };
  }, [func, xMin, xMax, integralMin, integralMax, funcColor, areaColor]);

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
            label: (ctx: {
              dataset: { label: string };
              parsed: { x: number; y: number | null };
            }) => {
              const x = ctx.parsed.x;
              const y = ctx.parsed.y;
              return `${ctx.dataset.label}: ${y?.toFixed(4)}`;
            },
          },
        },
        annotation:
          integralMin !== undefined || integralMax !== undefined
            ? {
                annotations: {
                  ...(integralMin !== undefined && {
                    minLine: {
                      type: "line" as const,
                      mode: "vertical" as const,
                      scaleID: "x",
                      value: integralMin,
                      borderColor: "rgba(239, 68, 68, 0.8)",
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        enabled: true,
                        content: `a = ${integralMin}`,
                        position: "start" as const,
                        backgroundColor: "rgba(239, 68, 68, 0.8)",
                        color: "white",
                      },
                    },
                  }),
                  ...(integralMax !== undefined && {
                    maxLine: {
                      type: "line" as const,
                      mode: "vertical" as const,
                      scaleID: "x",
                      value: integralMax,
                      borderColor: "rgba(239, 68, 68, 0.8)",
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        enabled: true,
                        content: `b = ${integralMax}`,
                        position: "start" as const,
                        backgroundColor: "rgba(239, 68, 68, 0.8)",
                        color: "white",
                      },
                    },
                  }),
                },
              }
            : {},
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
    [xMin, xMax, xLabel, yLabel, title, integralMin, integralMax],
  );

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
            Integral Visualization:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                f(x)
              </span>{" "}
              - Function to integrate
            </li>
            <li>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                Shaded area
              </span>{" "}
              - Definite integral from{" "}
              {integralMin !== undefined ? `a = ${integralMin}` : "xMin"}{" "}
              to{" "}
              {integralMax !== undefined ? `b = ${integralMax}` : "xMax"}
            </li>
            <li>
              ∫<sub>{integralMin ?? "a"}</sub><sup>{integralMax ?? "b"}</sup> f(x) dx
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
