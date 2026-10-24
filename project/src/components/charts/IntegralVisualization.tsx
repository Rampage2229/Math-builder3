"use client";

import { useMemo } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export interface IntegralVisualizationProps {
  data?: {
    function: string;
    a: number;
    b: number;
    partitions?: number;
  };
}

export function IntegralVisualization({ data }: IntegralVisualizationProps) {
  const config = useMemo(() => {
    if (!data) return null;
    
    const { function: fn, a, b, partitions = 10 } = data;
    const xValues: number[] = [];
    const yValues: number[] = [];
    const rectX: number[] = [];
    const rectY: number[] = [];
    
    // Generate function points
    for (let i = 0; i <= 100; i++) {
      const x = a + (b - a) * (i / 100);
      xValues.push(x);
      // Simple eval for demo - in production use a proper math parser
      try {
        yValues.push(Number(Function('x', `return ${fn}`)(x)) || 0);
      } catch {
        yValues.push(0);
      }
    }
    
    // Generate rectangles for Riemann sum
    const width = (b - a) / partitions;
    for (let i = 0; i < partitions; i++) {
      const x = a + i * width;
      rectX.push(x, x + width, x + width, x, x);
      try {
        const y = Number(Function('x', `return ${fn}`)(x)) || 0;
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
            title: { display: true, text: 'x' },
          },
          y: {
            title: { display: true, text: 'y' },
          },
        },
        plugins: {
          title: {
            display: true,
            text: `∫[${a},${b}] ${fn} dx`,
          },
        },
      },
    };
  }, [data]);
  
  return <canvas id="integral-chart" width={800} height={400} />;
}
