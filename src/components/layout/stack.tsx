import * as React from "react";
import { cn } from "@/lib/utils";

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  direction?: "row" | "column";
};

const gapClass: Record<NonNullable<StackProps["gap"]>, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = "md", direction = "column", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        direction === "column" ? "flex-col" : "flex-row",
        gapClass[gap],
        className
      )}
      {...props}
    />
  )
);
Stack.displayName = "Stack";
