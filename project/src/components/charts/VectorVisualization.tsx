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

interface VectorVisualizationProps {
  vectors: Array<{ x: number; y: number; label: string; color: string }>;
  title: string;
  showResultant?: boolean;
  className?: string;
}

export function VectorVisualization({
  vectors,
  title,
  showResultant = false,
  className = "",
}: VectorVisualizationProps) {
  const chartData = useMemo(() => {
    const datasets = vectors.map((v) => ({
      label: v.label,
      data: [
        { x: 0, y: 0 },
        { x: v.x, y: v.y },
      ],
      borderColor: v.color,
      backgroundColor: v.color,
      borderWidth: 3,
      pointRadius: [6, 6],
      pointBackgroundColor: [v.color, v.color],
      showLine: true,
      fill: false,
      tension: 0,
    }));

    if (showResultant && vectors.length > 1) {
      const rx = vectors.reduce((sum, v) => sum + v.x, 0);
      const ry = vectors.reduce((sum, v) => sum + v.y, 0);
      datasets.push({
        label: "Resultant",
        data: [
          { x: 0, y: 0 },
          { x: rx, y: ry },
        ],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 1)",
        borderWidth: 3,
        // @ts-ignore - borderDash is supported by Chart.js but not in the type definition
        borderDash: [6, 4],
        pointRadius: [6, 6],
        pointBackgroundColor: ["rgba(16, 185, 129, 1)", "rgba(16, 185, 129, 1)"],
        showLine: true,
        fill: false,
        tension: 0,
      });
    }

    return { datasets };
  }, [vectors, showResultant]);

  const allX = vectors.map((v) => v.x);
  const allY = vectors.map((v) => v.y);
  const xMin = Math.min(0, ...allX) - 2;
  const xMax = Math.max(0, ...allX) + 2;
  const yMin = Math.min(0, ...allY) - 2;
  const yMax = Math.max(0, ...allY) + 2;

  const options = useMemo(() => ({
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
        callbacks: {
          label: (ctx: any) => {
            const p = ctx.parsed;
            return `(${p.x}, ${p.y})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: { display: true, text: "x" },
        min: xMin,
        max: xMax,
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        title: { display: true, text: "y" },
        min: yMin,
        max: yMax,
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
    animation: { duration: 0 },
  }), [xMin, xMax, yMin, yMax, title]);

  return (
    <div className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}>
      <Line
        options={options as unknown as Parameters<typeof Line>[0]["options"]}
        data={chartData as unknown as Parameters<typeof Line>[0]["data"]}
        height={300}
        width={500}
      />
    </div>
  );
}
