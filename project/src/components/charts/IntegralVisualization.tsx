"use client";

import { useMemo } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export interface IntegralVisualizationProps {
  func: (x: number) => number;
  xMin: number;
  xMax: number;
  partitions?: number;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

export function IntegralVisualization({
  func,
  xMin,
  xMax,
  partitions = 10,
  title,
  xLabel = "x",
  yLabel = "y",
  className = "",
}: IntegralVisualizationProps) {
  const config = useMemo(() => {
    const fn = func.toString();
    const xValues: number[] = [];
    const yValues: number[] = [];
    const rectX: number[] = [];
    const rectY: number[] = [];
    
    // Generate function points
    for (let i = 0; i <= 100; i++) {
      const x = xMin + (xMax - xMin) * (i / 100);
      xValues.push(x);
      try {
        yValues.push(func(x));
      } catch {
        yValues.push(0);
      }
    }
    
    // Generate rectangles for Riemann sum
    const width = (xMax - xMin) / partitions;
    for (let i = 0; i < partitions; i++) {
      const x = xMin + i * width;
      rectX.push(x, x + width, x + width, x, x);
      try {
        const y = func(x);
        rectY.push(0, 0, y, y, 0);
      } catch {
        rectY.push(0, 0, 0, 0, 0);
      }
    }
    
    return {
      type: 'line' as const,
      data: {
        datasets: [
          {
            label: 'f(x)',
            data: xValues.map((x, i) => ({ x, y: yValues[i] })),
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.2,
            pointRadius: 0,
          },
          {
            label: 'Riemann Sum',
            data: rectX.map((x, i) => ({ x, y: rectY[i] })),
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.3)',
            fill: true,
            pointRadius: 0,
            showLine: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: { display: true, text: xLabel },
          },
          y: {
            title: { display: true, text: yLabel },
          },
        },
        plugins: {
          title: {
            display: true,
            text: title || `∫[${xMin},${xMax}] f(x) dx`,
          },
        },
      },
    };
  }, [func, xMin, xMax, partitions, title, xLabel, yLabel]);
  
  return (
    <div className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}>
      <canvas id="integral-chart" width={800} height={400} />
    </div>
  );
}
