import * as React from "react";
import { cn } from "@/lib/utils";

export type CodeBlockProps = React.HTMLAttributes<HTMLPreElement>;

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, ...props }, ref) => (
    <pre
      ref={ref}
      className={cn(
        "overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground",
        className
      )}
      {...props}
    />
  )
);
CodeBlock.displayName = "CodeBlock";
