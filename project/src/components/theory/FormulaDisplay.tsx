"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface FormulaDisplayProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
  onError?: (error: Error) => void;
}

export function FormulaDisplay({
  latex,
  displayMode = true,
  className = "",
  onError,
}: FormulaDisplayProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      katex.render(latex, containerRef.current, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch (error) {
      const err =
        error instanceof Error ? error : new Error("KaTeX rendering failed");
      onError?.(err);
      containerRef.current.textContent = latex;
    }
  }, [latex, displayMode, onError]);

  return <span ref={containerRef} className={className} />;
}

export function InlineFormula({
  latex,
  className = "",
  onError,
}: Omit<FormulaDisplayProps, "displayMode">) {
  return (
    <FormulaDisplay
      latex={latex}
      displayMode={false}
      className={className}
      onError={onError}
    />
  );
}

export function BlockFormula({
  latex,
  className = "",
  onError,
}: Omit<FormulaDisplayProps, "displayMode">) {
  return (
    <FormulaDisplay
      latex={latex}
      displayMode={true}
      className={className}
      onError={onError}
    />
  );
}
