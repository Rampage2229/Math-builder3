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

interface Constraint {
  id: string;
  label: string;
  a: number;
  b: number;
  c: number;
  type: "<=" | ">=";
}

interface ObjectiveFunction {
  label: string;
  a: number;
  b: number;
  maximize: boolean;
}

interface SimplexStep {
  step: number;
  description: string;
  tableau: number[][];
  basicVariables: string[];
  enteringVariable: string;
  leavingVariable: string;
  pivotElement: number;
}

interface LinearProgrammingVisualizationProps {
  constraints: Constraint[];
  objective: ObjectiveFunction;
  title: string;
  xLabel?: string;
  yLabel?: string;
  xMax?: number;
  yMax?: number;
  simplexSteps?: SimplexStep[];
  className?: string;
}

const DEFAULT_X_MAX = 20;
const DEFAULT_Y_MAX = 20;

export function LinearProgrammingVisualization({
  constraints,
  objective,
  title,
  xLabel = "x",
  yLabel = "y",
  xMax = DEFAULT_X_MAX,
  yMax = DEFAULT_Y_MAX,
  simplexSteps,
  className = "",
}: LinearProgrammingVisualizationProps) {
  const chartData = useMemo(() => {
    const datasets: Array<{
      label: string;
      data: { x: number; y: number }[];
      borderColor: string;
      backgroundColor: string;
      borderWidth?: number;
      pointRadius?: number;
      fill?: boolean;
      tension?: number;
      showLine?: boolean;
      borderDash?: number[];
    }> = [];

    constraints.forEach((constraint, index) => {
      const lineColor = `hsl(${index * 60}, 70%, 50%)`;
      const lineData: { x: number; y: number }[] = [];

      if (constraint.b !== 0) {
        for (let x = 0; x <= xMax; x += 0.5) {
          const y = (constraint.c - constraint.a * x) / constraint.b;
          if (y >= 0 && y <= yMax) {
            lineData.push({ x, y });
          }
        }
      } else {
        const xVal = constraint.c / constraint.a;
        if (xVal >= 0 && xVal <= xMax) {
          for (let y = 0; y <= yMax; y += 0.5) {
            lineData.push({ x: xVal, y });
          }
        }
      }

      datasets.push({
        label: constraint.label,
        data: lineData,
        borderColor: lineColor,
        backgroundColor: lineColor,
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0,
        showLine: true,
      });
    });

    const objValue = 100;
    const objData: { x: number; y: number }[] = [];
    if (objective.b !== 0) {
      for (let x = 0; x <= xMax; x += 0.5) {
        const y = (objValue - objective.a * x) / objective.b;
        if (y >= 0 && y <= yMax) {
          objData.push({ x, y });
        }
      }
    } else {
      const xVal = objValue / objective.a;
      if (xVal >= 0 && xVal <= xMax) {
        for (let y = 0; y <= yMax; y += 0.5) {
          objData.push({ x: xVal, y });
        }
      }
    }

    datasets.push({
      label: objective.label,
      data: objData,
      borderColor: "rgba(239, 68, 68, 1)",
      backgroundColor: "rgba(239, 68, 68, 1)",
      borderWidth: 3,
      pointRadius: 0,
      fill: false,
      tension: 0,
      showLine: true,
      borderDash: [8, 4],
    });

    return { datasets };
  }, [constraints, objective, xMax, yMax]);

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
            label: (ctx: { parsed: { x: number; y: number } }) => {
              const p = ctx.parsed;
              return `(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: xLabel },
          min: 0,
          max: xMax,
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        y: {
          title: { display: true, text: yLabel },
          min: 0,
          max: yMax,
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
      animation: { duration: 0 },
    }),
    [xMax, yMax, xLabel, yLabel, title],
  );

  const cornerPoints = useMemo(() => {
    const points: { x: number; y: number; feasible: boolean }[] = [];

    for (let i = 0; i < constraints.length; i++) {
      for (let j = i + 1; j < constraints.length; j++) {
        const c1 = constraints[i];
        const c2 = constraints[j];

        const det = c1.a * c2.b - c2.a * c1.b;
        if (Math.abs(det) > 1e-10) {
          const x = (c1.c * c2.b - c2.c * c1.b) / det;
          const y = (c1.a * c2.c - c2.a * c1.c) / det;

          if (x >= 0 && y >= 0 && x <= xMax && y <= yMax) {
            let feasible = true;
            for (const c of constraints) {
              const val = c.a * x + c.b * y;
              if (c.type === "<=" && val > c.c + 1e-10) {
                feasible = false;
                break;
              }
              if (c.type === ">=" && val < c.c - 1e-10) {
                feasible = false;
                break;
              }
            }
            points.push({ x, y, feasible });
          }
        }
      }
    }

    points.push({ x: 0, y: 0, feasible: true });
    for (const c of constraints) {
      if (c.a !== 0) {
        const x = c.c / c.a;
        if (x >= 0 && x <= xMax) {
          let feasible = true;
          for (const cc of constraints) {
            const val = cc.a * x;
            if (cc.type === "<=" && val > cc.c + 1e-10) feasible = false;
            if (cc.type === ">=" && val < cc.c - 1e-10) feasible = false;
          }
          points.push({ x, y: 0, feasible });
        }
      }
      if (c.b !== 0) {
        const y = c.c / c.b;
        if (y >= 0 && y <= yMax) {
          let feasible = true;
          for (const cc of constraints) {
            const val = cc.b * y;
            if (cc.type === "<=" && val > cc.c + 1e-10) feasible = false;
            if (cc.type === ">=" && val < cc.c - 1e-10) feasible = false;
          }
          points.push({ x: 0, y, feasible });
        }
      }
    }

    return points;
  }, [constraints, xMax, yMax]);

  const optimalPoint = useMemo(() => {
    let bestPoint: { x: number; y: number; value: number } | null = null;
    let bestValue = objective.maximize ? -Infinity : Infinity;

    for (const p of cornerPoints) {
      if (!p.feasible) continue;
      const value = objective.a * p.x + objective.b * p.y;
      if (objective.maximize ? value > bestValue : value < bestValue) {
        bestValue = value;
        bestPoint = { x: p.x, y: p.y, value };
      }
    }

    return bestPoint;
  }, [cornerPoints, objective]);

  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Line
            options={
              options as unknown as Parameters<typeof Line>[0]["options"]
            }
            data={chartData as unknown as Parameters<typeof Line>[0]["data"]}
            height={400}
            width={600}
          />
          <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Feasible Region Corner Points
            </h4>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
              {cornerPoints
                .filter((p) => p.feasible)
                .map((p, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                    </span>
                    <span className="font-mono">
                      z = {(objective.a * p.x + objective.b * p.y).toFixed(2)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Optimal Solution
            </h4>
            {optimalPoint ? (
              <div className="space-y-2 text-sm">
                <p className="text-zinc-700 dark:text-zinc-300">
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    {objective.maximize ? "Maximum" : "Minimum"}
                  </strong>{" "}
                  at ({optimalPoint.x.toFixed(2)}, {optimalPoint.y.toFixed(2)})
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Optimal value:{" "}
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {optimalPoint.value.toFixed(2)}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                No feasible solution found.
              </p>
            )}
          </div>

          {simplexSteps && simplexSteps.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Simplex Method Steps
              </h4>
              {simplexSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Step {step.step}:</strong> {step.description}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                    Entering: {step.enteringVariable} | Leaving:{" "}
                    {step.leavingVariable} | Pivot: {step.pivotElement}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
