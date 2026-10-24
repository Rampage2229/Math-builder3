"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-zinc-900",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

const SelectGroup = React.forwardRef<
  HTMLOptGroupElement,
  React.HTMLAttributes<HTMLOptGroupElement>
>(({ className, children, ...props }, ref) => (
  <optgroup
    ref={ref}
    className={cn(className)}
    {...props}
  >
    {children}
  </optgroup>
));
SelectGroup.displayName = "SelectGroup";

const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.HTMLAttributes<HTMLOptionElement>
>(({ className, children, ...props }, ref) => (
  <option
    ref={ref}
    className={cn("relative bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50", className)}
    {...props}
  >
    {children}
  </option>
));
SelectOption.displayName = "SelectOption";

export { Select, SelectGroup, SelectOption };
