import * as React from "react";
import { cn } from "@/lib/utils";
import { Heading, Text, Eyebrow } from "@/components/ui/typography";

export type ComponentSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  eyebrow?: string;
};

export const ComponentSection = ({
  title,
  description,
  eyebrow,
  className,
  children,
  ...props
}: ComponentSectionProps) => (
  <section className={cn("space-y-4", className)} {...props}>
    <div className="space-y-1">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading as="h2" className="text-2xl font-semibold">
        {title}
      </Heading>
      {description && (
        <Text size="sm" tone="muted">
          {description}
        </Text>
      )}
    </div>
    {children}
  </section>
);
