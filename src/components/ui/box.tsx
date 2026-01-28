import * as React from "react";
import { cn } from "@/lib/utils";

export type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} />
  )
);
Box.displayName = "Box";
