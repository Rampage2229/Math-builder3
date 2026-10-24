"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

function Tooltip({ children, content }: TooltipProps) {
  return (
    <div className="relative inline-block">
      <span className="relative">{children}</span>
      <span
        className="absolute z-50 px-2 py-1 text-xs text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
      >
        {content}
      </span>
    </div>
  );
}

export { Tooltip };
