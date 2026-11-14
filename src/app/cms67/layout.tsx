import type { ReactNode } from "react";
import type { Metadata } from "next";

import { CmsShell } from "@/components/cms67/cms-shell";

export const metadata: Metadata = {
  title: { absolute: "FragBasic CMS" },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function Cms67Layout({ children }: { children: ReactNode }) {
  return <CmsShell>{children}</CmsShell>;
}
