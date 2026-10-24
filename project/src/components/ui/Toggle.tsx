"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: "left" | "right";
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, labelPosition = "right", ...props }, ref) => (
    <div className="flex items-center gap-2">
      {labelPosition === "left" && label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative inline-block">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer sr-only focus-visible:outline-none",
            className
          )}
          {...props}
        />
        <div
          className={cn(
            "h-3 w-9 rounded-full bg-zinc-200 dark:bg-zinc-800 peer peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 transition-colors duration-200",
            className
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow ring-0 transition-all duration-300 peer-checked:translate-x-5 peer-checked:bg-primary",
            className
          )}
        />
      </div>
      {labelPosition === "right" && label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
    </div>
  )
);
Toggle.displayName = "Toggle";

const ToggleThumb = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "block h-5 w-5 rounded-full bg-white shadow ring-0 transition-all duration-300 peer-checked:translate-x-5 peer-checked:bg-primary",
      className
    )}
    {...props}
  />
));
ToggleThumb.displayName = "ToggleThumb";

const ToggleTrack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-3 w-9 rounded-full bg-zinc-200 dark:bg-zinc-800 peer peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
ToggleTrack.displayName = "ToggleTrack";

export { Toggle, ToggleThumb, ToggleTrack };
