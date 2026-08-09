import type { ReactNode } from "react";

import { CmsShell } from "@/components/cms67/cms-shell";

export default function Cms67Layout({ children }: { children: ReactNode }) {
  return <CmsShell>{children}</CmsShell>;
}
