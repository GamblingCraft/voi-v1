"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Product's ScrollSmoother owns its footer; other routes use the layout slot.
export function SiteFooterPlacement({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return /\/product\/?$/.test(pathname) ? null : children;
}
