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
      <main className={cn("flex-1 pb-20", contentClassName)}>{children}</main>
      <div className="fixed inset-x-0 bottom-0 w-full bg-background">
        <BottomNav />
      </div>
    </div>
  );
}
