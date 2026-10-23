"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
);

type ChartType = "descriptive" | "distribution" | "inference" | "regression" | "optimization";
type Locale = "en" | "ca" | "es";

interface StatisticsChartProps {
  chartType: ChartType;
  locale: Locale;
}

const chartLabels: Record<Locale, Record<ChartType, string[]>> = {
  en: {
    descriptive: ["Mean", "Median", "Mode", "Range", "Variance", "Std Dev"],
    distribution: ["Normal", "Binomial", "Poisson", "Exponential", "Uniform"],
    inference: ["t-Test", "Z-Test", "Chi-Square", "ANOVA", "Confidence Interval"],
    regression: ["Linear", "Multiple", "Polynomial", "Logistic"],
    optimization: ["Gradient Descent", "Newton", "Simplex", "Interior Point"],
  },
  ca: {
    descriptive: ["Mitjana", "Mediana", "Moda", "Rang", "Variància", "Desv. Típica"],
    distribution: ["Normal", "Binomial", "Poisson", "Exponencial", "Uniforme"],
    inference: ["t-Test", "Z-Test", "Chi-Quadrat", "ANOVA", "Interval de Confiança"],
    regression: ["Lineal", "Múltiple", "Polinòmica", "Logístic"],
    optimization: ["Descens de Gradiant", "Newton", "Simplex", "Punt Interior"],
  },
  es: {
    descriptive: ["Media", "Mediana", "Moda", "Rango", "Varianza", "Desv. Típica"],
    distribution: ["Normal", "Binomial", "Poisson", "Exponencial", "Uniforme"],
    inference: ["t-Test", "Z-Test", "Chi-Cuadrado", "ANOVA", "Intervalo de Confianza"],
    regression: ["Lineal", "Múltiple", "Polinómica", "Logística"],
    optimization: ["Descenso de Gradiente", "Newton", "Simplex", "Punto Interior"],
  },
};

const chartData: Record<ChartType, number[]> = {
  descriptive: [85, 78, 92, 65, 70, 88],
  distribution: [90, 75, 60, 55, 50],
  inference: [80, 72, 68, 75, 85],
  regression: [88, 82, 70, 78],
  optimization: [75, 85, 70, 80],
};

const chartTitles: Record<Locale, Record<ChartType, string>> = {
  en: {
    descriptive: "Descriptive Statistics Measures",
    distribution: "Probability Distributions",
    inference: "Statistical Inference Methods",
    regression: "Regression Analysis Types",
    optimization: "Optimization Algorithms",
  },
  ca: {
    descriptive: "Mesures d'Estadística Descriptiva",
    distribution: "Distribucions de Probabilitat",
    inference: "Mètodes d'Estadística Inferencial",
    regression: "Tipus d'Anàlisi de Regresió",
    optimization: "Algorismes d'Optimització",
  },
  es: {
    descriptive: "Medidas de Estadística Descriptiva",
    distribution: "Distribuciones de Probabilidad",
    inference: "Métodos de Estadística Inferencial",
    regression: "Tipos de Análisis de Regresión",
    optimization: "Algoritmos de Optimización",
  },
};

const getChartOptions = (title: string, yMax: number = 100) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: title,
      font: { size: 18, weight: "bold" },
    },
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: yMax,
      title: { display: true, text: "Score / Relevance" },
    },
    x: {
      title: { display: true, text: "Category" },
    },
  },
});

export default function StatisticsChart({
  chartType,
  locale,
}: StatisticsChartProps) {
  const labels = chartLabels[locale][chartType];
  const data = chartData[chartType];
  const title = chartTitles[locale][chartType];
  const options = getChartOptions(title);

  const isBar = [
    "descriptive",
    "distribution",
    "inference",
    "optimization",
  ].includes(chartType);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
      {isBar ? (
        <Bar
          options={options as unknown as Parameters<typeof Bar>[0]["options"]}
          data={{
            labels,
            datasets: [
              {
                label: title,
                data,
                backgroundColor: "rgba(99, 102, 241, 0.7)",
                borderColor: "rgba(99, 102, 241, 1)",
                borderWidth: 1,
                borderRadius: 4,
              },
            ],
          }}
        />
      ) : (
        <Line
          options={options as unknown as Parameters<typeof Line>[0]["options"]}
          data={{
            labels,
            datasets: [
              {
                label: title,
                data,
                fill: true,
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                borderColor: "rgba(99, 102, 241, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(99, 102, 241, 1)",
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
              },
            ],
          }}
        />
      )}
    </div>
  );
}
