import * as React from "react";
import { cn } from "@/lib/utils";

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Heading = ({
  as: Comp = "h2",
  className,
  ...props
}: HeadingProps) => (
  <Comp
    className={cn(
      "text-foreground tracking-tight",
      Comp === "h1" && "text-3xl md:text-4xl font-semibold",
      Comp === "h2" && "text-2xl md:text-3xl font-semibold",
      Comp === "h3" && "text-xl md:text-2xl font-semibold",
      Comp === "h4" && "text-lg font-semibold",
      Comp === "h5" && "text-base font-semibold",
      Comp === "h6" && "text-sm font-semibold",
      className
    )}
    {...props}
  />
);

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: "sm" | "md" | "lg";
  tone?: "default" | "muted";
};

export const Text = ({
  size = "md",
  tone = "default",
  className,
  ...props
}: TextProps) => (
  <p
    className={cn(
      "leading-relaxed",
      size === "sm" && "text-sm",
      size === "md" && "text-base",
      size === "lg" && "text-lg",
      tone === "muted" && "text-muted-foreground",
      className
    )}
    {...props}
  />
);

export type EyebrowProps = React.HTMLAttributes<HTMLSpanElement>;

export const Eyebrow = ({ className, ...props }: EyebrowProps) => (
  <span
    className={cn("text-xs uppercase tracking-wide text-muted-foreground", className)}
    {...props}
  />
);
