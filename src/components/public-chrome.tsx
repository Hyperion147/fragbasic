"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/navbar";

/** Hides public marketing chrome on CMS routes. */
export function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCms = pathname === "/cms67" || pathname.startsWith("/cms67/");

  if (isCms) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavbar />
      {children}
      <SiteFooter />
    </>
  );
}
