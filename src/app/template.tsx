"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.hydrated = pathname;
    return () => {
      delete document.documentElement.dataset.hydrated;
    };
  }, [pathname]);

  return children;
}
