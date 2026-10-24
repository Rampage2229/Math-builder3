"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export interface FormulaBoxProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function FormulaBox({ latex, displayMode = true, className = "" }: FormulaBoxProps) {
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
      containerRef.current.textContent = latex;
    }
  }, [latex, displayMode]);

  return <span ref={containerRef} className={className} />;
}
