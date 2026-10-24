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

interface ProbabilityDistributionProps {
  type: "normal" | "binomial" | "uniform";
  params: Record<string, number>;
  title: string;
  xLabel?: string;
  className?: string;
}

const normalPDF = (x: number, mu: number, sigma: number) => {
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mu) / sigma, 2);
  return coeff * Math.exp(exponent);
};

const binomialPMF = (k: number, n: number, p: number) => {
  const comb = (n: number, k: number) => {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 0; i < k; i++) {
      res = (res * (n - i)) / (i + 1);
    }
    return res;
  };
  return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

const uniformPDF = (x: number, a: number, b: number) => {
  if (x < a || x > b) return 0;
  return 1 / (b - a);
};

export function ProbabilityDistribution({
  type,
  params,
  title,
  xLabel = "x",
  className = "",
}: ProbabilityDistributionProps) {
  const chartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    if (type === "normal") {
      const { mu = 0, sigma = 1 } = params;
      const xMin = mu - 4 * sigma;
      const xMax = mu + 4 * sigma;
      const step = (xMax - xMin) / 200;
      for (let i = 0; i <= 200; i++) {
        const x = xMin + i * step;
        labels.push(x.toFixed(2));
        data.push(normalPDF(x, mu, sigma));
      }
    } else if (type === "binomial") {
      const { n = 10, p = 0.5 } = params;
      for (let k = 0; k <= n; k++) {
        labels.push(k.toString());
        data.push(binomialPMF(k, n, p));
      }
    } else if (type === "uniform") {
      const { a = 0, b = 1 } = params;
      const step = (b - a) / 200;
      for (let i = 0; i <= 200; i++) {
        const x = a + i * step;
        labels.push(x.toFixed(2));
        data.push(uniformPDF(x, a, b));
      }
    }

    return {
      labels,
      datasets: [
        {
          label: title,
          data,
          borderColor: "rgba(99, 102, 241, 1)",
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderWidth: 2,
          pointRadius: type === "binomial" ? 3 : 0,
          fill: type !== "binomial",
          tension: 0.1,
        },
      ],
    };
  }, [type, params, title]);

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
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (ctx: { parsed: { x: number; y: number | undefined } }) => {
              const x = ctx.parsed.x;
              const y = ctx.parsed.y;
              return `${xLabel} = ${x}, P = ${y?.toFixed(4)}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: xLabel },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        y: {
          title: { display: true, text: "Probability Density" },
          grid: { color: "rgba(0,0,0,0.05)" },
          beginAtZero: true,
        },
      },
      animation: { duration: 0 },
    }),
    [type, title, xLabel],
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
    </div>
  );
}
