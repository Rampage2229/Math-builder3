"use client";

import { useMemo } from "react";

export interface ProbabilityDistributionProps {
  data: { value: number; probability: number }[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

export function ProbabilityDistribution({
  data,
  title,
  xLabel = "Value",
  yLabel = "Probability",
  className = "",
}: ProbabilityDistributionProps) {
  const config = useMemo(() => {
    const colors = ['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
    const color = colors[0];
    
    const config = {
      type: 'bar' as const,
      data: {
        datasets: [{
          label: title || 'Probability',
          data: data.map((item: { value: number; probability: number }) => ({
            x: item.value,
            y: item.probability
          })),
          backgroundColor: color,
        }],
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
            beginAtZero: true,
            title: { display: true, text: yLabel },
            max: 1,
          },
        },
      },
    };
    
    return config;
  }, [data, title, xLabel, yLabel]);
  
  return (
    <div className={`w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}>
      <canvas id="probability-chart" width={800} height={400} />
    </div>
  );
}
