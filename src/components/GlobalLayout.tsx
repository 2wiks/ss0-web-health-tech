import { type ReactNode } from "react";
import { AppLogo } from "@/components/AppLogo";
import { BottomNav } from "@/components/BottomNav";
import { cn } from "@/lib/utils";

type GlobalLayoutProps = {
  children: ReactNode;
  contentClassName?: string;
};

export function GlobalLayout({ children, contentClassName }: GlobalLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex justify-center pt-10 pb-6">
        <AppLogo />
      </header>
      <main className={cn("flex-1", contentClassName)}>{children}</main>
      <footer className="flex justify-center">
        <BottomNav />
      </footer>
    </div>
  );
}
