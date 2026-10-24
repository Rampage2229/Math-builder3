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

interface LimitVisualizationProps {
  func: (x: number) => number;
  xMin: number;
  xMax: number;
  limitPoint: number;
  limitValue?: number;
  title: string;
  xLabel?: string;
  yLabel?: string;
  showEpsilonDelta?: boolean;
  epsilon?: number;
  delta?: number;
  color?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function LimitVisualization({
  func,
  xMin,
  xMax,
  limitPoint,
  limitValue,
  title,
  xLabel = "x",
  yLabel = "f(x)",
  showEpsilonDelta = false,
  epsilon = 0.5,
  delta = 0.5,
  color = "rgba(99, 102, 241, 1)",
  className = "",
}: LimitVisualizationProps) {
  const chartData = useMemo(() => {
    const step = (xMax - xMin) / DEFAULT_POINTS;
    const dataPoints: { x: number; y: number | null }[] = [];

    for (let i = 0; i <= DEFAULT_POINTS; i++) {
      const x = xMin + i * step;
      try {
        const y = func(x);
        if (isFinite(y) && Math.abs(y) < 1e6) {
          dataPoints.push({ x, y });
        } else {
          dataPoints.push({ x, y: null });
        }
      } catch {
        dataPoints.push({ x, y: null });
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
        label: title,
        data: dataPoints,
        borderColor: color,
        backgroundColor: color.replace("1)", "0.1)"),
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.1,
      },
    ];

    // Add limit point marker if limitValue is provided
    if (limitValue !== undefined && isFinite(limitValue)) {
      datasets.push({
        label: `Limit: ${limitValue.toFixed(4)}`,
        data: [{ x: limitPoint, y: limitValue }],
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 1)",
        pointRadius: 8,
        pointStyle: "circle",
        showLine: false,
      });
    }

    // Add epsilon-delta bands if enabled
    if (showEpsilonDelta && limitValue !== undefined) {
      datasets.push({
        label: "ε-band",
        data: [
          { x: xMin, y: limitValue + epsilon },
          { x: xMax, y: limitValue + epsilon },
        ],
        borderColor: "rgba(34, 197, 94, 0.5)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        showLine: true,
      });
      datasets.push({
        label: "ε-band",
        data: [
          { x: xMin, y: limitValue - epsilon },
          { x: xMax, y: limitValue - epsilon },
        ],
        borderColor: "rgba(34, 197, 94, 0.5)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        showLine: true,
      });
      datasets.push({
        label: "δ-band",
        data: [
          { x: limitPoint - delta, y: limitValue - epsilon },
          { x: limitPoint - delta, y: limitValue + epsilon },
        ],
        borderColor: "rgba(249, 115, 22, 0.5)",
        backgroundColor: "rgba(249, 115, 22, 0.5)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        showLine: true,
      });
      datasets.push({
        label: "δ-band",
        data: [
          { x: limitPoint + delta, y: limitValue - epsilon },
          { x: limitPoint + delta, y: limitValue + epsilon },
        ],
        borderColor: "rgba(249, 115, 22, 0.5)",
        backgroundColor: "rgba(249, 115, 22, 0.5)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        showLine: true,
      });
    }

    return { datasets };
  }, [
    func,
    xMin,
    xMax,
    limitPoint,
    limitValue,
    title,
    color,
    showEpsilonDelta,
    epsilon,
    delta,
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
            label: (ctx: { parsed: { x: number; y: number | undefined } }) => {
              const x = ctx.parsed.x;
              const y = ctx.parsed.y;
              return `f(${x}) = ${y?.toFixed(4)}`;
            },
          },
        },
        annotation: {
          annotations: {
            limitLine: {
              type: "line",
              mode: "vertical",
              scaleID: "x",
              value: limitPoint,
              borderColor: "rgba(239, 68, 68, 0.5)",
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                enabled: true,
                content: `x → ${limitPoint}`,
                position: "start",
                backgroundColor: "rgba(239, 68, 68, 0.8)",
                color: "white",
              },
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
    [xMin, xMax, xLabel, yLabel, title, limitPoint],
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
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>Limit point:</strong> x → {limitPoint}
        </p>
        {limitValue !== undefined && (
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong>Limit value:</strong> {limitValue.toFixed(4)}
          </p>
        )}
        {showEpsilonDelta && (
          <>
            <p className="text-green-700 dark:text-green-300">
              <strong>ε (epsilon):</strong> {epsilon}
            </p>
            <p className="text-orange-700 dark:text-orange-300">
              <strong>δ (delta):</strong> {delta}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
