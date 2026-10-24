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

interface ContinuityVisualizationProps {
  func: (x: number) => number;
  xMin: number;
  xMax: number;
  discontinuities?: Array<{
    x: number;
    type: "removable" | "jump" | "infinite";
    leftLimit?: number;
    rightLimit?: number;
    value?: number;
  }>;
  title: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  className?: string;
}

const DEFAULT_POINTS = 200;

export function ContinuityVisualization({
  func,
  xMin,
  xMax,
  discontinuities = [],
  title,
  xLabel = "x",
  yLabel = "f(x)",
  color = "rgba(99, 102, 241, 1)",
  className = "",
}: ContinuityVisualizationProps) {
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

    type ChartDataPoint = number | { x: number; y: number };

    const datasets: Array<{
      label: string;
      data: ChartDataPoint[];
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
        data: data as ChartDataPoint[],
        borderColor: color,
        backgroundColor: color.replace("1)", "0.1)"),
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.1,
      },
    ];

    // Add discontinuity markers
    discontinuities.forEach((disc, index) => {
      const discColor =
        disc.type === "removable"
          ? "rgba(239, 68, 68, 1)"
          : disc.type === "jump"
            ? "rgba(249, 115, 22, 1)"
            : "rgba(168, 85, 247, 1)";

      const discLabel =
        disc.type === "removable"
          ? "Removable discontinuity"
          : disc.type === "jump"
            ? "Jump discontinuity"
            : "Infinite discontinuity";

      // Add the discontinuity point
      if (disc.value !== undefined && isFinite(disc.value)) {
        datasets.push({
          label: `${discLabel} at x = ${disc.x}`,
          data: [{ x: disc.x, y: disc.value }],
          borderColor: discColor,
          backgroundColor: discColor,
          pointRadius: 10,
          pointStyle: "circle",
          showLine: false,
        });
      }

      // For jump discontinuities, show left and right limits
      if (disc.type === "jump") {
        if (disc.leftLimit !== undefined && isFinite(disc.leftLimit)) {
          datasets.push({
            label: `Left limit: ${disc.leftLimit.toFixed(4)}`,
            data: [{ x: disc.x, y: disc.leftLimit }],
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 1)",
            pointRadius: 8,
            pointStyle: "triangle",
            showLine: false,
          });
        }
        if (disc.rightLimit !== undefined && isFinite(disc.rightLimit)) {
          datasets.push({
            label: `Right limit: ${disc.rightLimit.toFixed(4)}`,
            data: [{ x: disc.x, y: disc.rightLimit }],
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 1)",
            pointRadius: 8,
            pointStyle: "triangleDown",
            showLine: false,
          });
        }
      }

      // For infinite discontinuities, show vertical asymptote
      if (disc.type === "infinite") {
        datasets.push({
          label: `Vertical asymptote at x = ${disc.x}`,
          data: [
            { x: disc.x, y: -1e6 },
            { x: disc.x, y: 1e6 },
          ],
          borderColor: discColor,
          backgroundColor: discColor,
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
          showLine: true,
        });
      }
    });

    return { labels, datasets };
  }, [func, xMin, xMax, discontinuities, title, color]);

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
        {discontinuities.length > 0 && (
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
              Discontinuities:
            </p>
            <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
              {discontinuities.map((disc, index) => (
                <li key={index}>
                  <span className="font-mono">x = {disc.x}</span> -{" "}
                  {disc.type === "removable" && "Removable (hole)"}
                  {disc.type === "jump" &&
                    `Jump (left: ${disc.leftLimit?.toFixed(4)}, right: ${disc.rightLimit?.toFixed(4)})`}
                  {disc.type === "infinite" && "Infinite (vertical asymptote)"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
