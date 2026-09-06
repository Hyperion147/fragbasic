"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CmsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/cms67" || pathname === "/cms67/";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-card/40">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-hover">
              FragBasic
            </p>
            <p className="text-sm font-semibold tracking-tight sm:text-base">
              Content CMS
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {!isLogin && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/cms67/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/cms67/mousepads">Mousepads</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/cms67/iems">IEMs</Link>
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Public site</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main
        className={cn(
          "mx-auto w-full px-4 py-8 sm:px-6",
          isLogin && "flex min-h-[calc(100vh-4rem)] items-center justify-center py-12",
        )}
      >
        {children}
      </main>
    </div>
  );
}
