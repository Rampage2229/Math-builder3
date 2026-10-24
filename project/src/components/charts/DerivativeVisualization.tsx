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

export interface DerivativeVisualizationProps {
  func: (x: number) => number;
  derivative?: (x: number) => number;
  xMin: number;
  xMax: number;
  pointOfInterest?: number;
  title: string;
  xLabel?: string;
  yLabel?: string;
  funcColor?: string;
  derivColor?: string;
  tangentColor?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function DerivativeVisualization({
  func,
  derivative,
  xMin,
  xMax,
  pointOfInterest,
  title,
  xLabel = "x",
  yLabel = "y",
  funcColor = "rgba(99, 102, 241, 1)",
  derivColor = "rgba(239, 68, 68, 1)",
  tangentColor = "rgba(34, 197, 94, 1)",
  className = "",
}: DerivativeVisualizationProps) {
  const chartData = useMemo(() => {
    const step = (xMax - xMin) / DEFAULT_POINTS;
    const funcData: { x: number; y: number | null }[] = [];
    const derivData: { x: number; y: number | null }[] = [];

    for (let i = 0; i <= DEFAULT_POINTS; i++) {
      const x = xMin + i * step;
      try {
        const y = func(x);
        const dy = derivative(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          funcData.push({ x, y });
        } else {
          funcData.push({ x, y: null });
        }
        if (isFinite(dy) && Math.abs(dy) < 1e6) {
          derivData.push({ x, y: dy });
        } else {
          derivData.push({ x, y: null });
        }
      } catch {
        funcData.push({ x, y: null });
        derivData.push({ x, y: null });
      }
    }

    const datasets: Array<{
      label: string;
      data: { x: number; y: number | null }[];
      borderColor: string;
      backgroundColor: string;
      borderWidth?: number;
      pointRadius?: number;
      pointStyle?: string;
      fill?: boolean;
      tension?: number;
      showLine?: boolean;
      borderDash?: number[];
    }> = [
      {
        label: "f(x)",
        data: funcData,
        borderColor: funcColor,
        backgroundColor: funcColor.replace("1)", "0.1)"),
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.1,
      },
      {
        label: "f'(x)",
        data: derivData,
        borderColor: derivColor,
        backgroundColor: derivColor.replace("1)", "0.1)"),
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.1,
        borderDash: [5, 5],
      },
    ];

    // Add tangent line at point of interest
    if (pointOfInterest !== undefined) {
      const x0 = pointOfInterest;
      const y0 = func(x0);
      const slope = derivative(x0);

      if (isFinite(y0) && isFinite(slope)) {
        // Tangent line: y = slope * (x - x0) + y0
        const tangentX1 = xMin;
        const tangentY1 = slope * (tangentX1 - x0) + y0;
        const tangentX2 = xMax;
        const tangentY2 = slope * (tangentX2 - x0) + y0;

        datasets.push({
          label: `Tangent at x = ${x0}`,
          data: [
            { x: tangentX1, y: tangentY1 },
            { x: tangentX2, y: tangentY2 },
          ],
          borderColor: tangentColor,
          backgroundColor: tangentColor,
          borderWidth: 2,
          borderDash: [10, 5],
          pointRadius: 0,
          fill: false,
          showLine: true,
        });

        // Point of tangency
        datasets.push({
          label: `Point (${x0}, ${y0.toFixed(4)})`,
          data: [{ x: x0, y: y0 }],
          borderColor: tangentColor,
          backgroundColor: tangentColor,
          pointRadius: 8,
          pointStyle: "circle",
          showLine: false,
        });
      }
    }

    return { datasets };
  }, [
    func,
    derivative,
    xMin,
    xMax,
    pointOfInterest,
    funcColor,
    derivColor,
    tangentColor,
  ]);

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
          pointOfInterest !== undefined
            ? {
                annotations: {
                  pointLine: {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x",
                    value: pointOfInterest,
                    borderColor: tangentColor,
                    borderWidth: 1,
                    borderDash: [3, 3],
                    label: {
                      enabled: true,
                      content: `x = ${pointOfInterest}`,
                      position: "start",
                      backgroundColor: tangentColor,
                      color: "white",
                    },
                  },
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
    [xMin, xMax, xLabel, yLabel, title, pointOfInterest, tangentColor],
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
            Derivative Analysis:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">
                f(x)
              </span>{" "}
              - Original function
            </li>
            <li>
              <span className="font-mono text-red-600 dark:text-red-400">
                f(x)
              </span>{" "}
              - Derivative (rate of change)
            </li>
            {pointOfInterest !== undefined && (
              <li>
                <span className="font-mono text-green-600 dark:text-green-400">
                  Tangent line
                </span>{" "}
                at x = {pointOfInterest}
                <br />
                <span className="ml-4">
                  Slope f&#39;({pointOfInterest}) ={" "}
                  {derivative(pointOfInterest).toFixed(4)}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
