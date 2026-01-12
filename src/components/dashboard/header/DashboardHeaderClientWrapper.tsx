"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
};

export const DashboardHeaderClientWrapper = ({
  children,
  className,
  threshold = 24,
}: Props) => {
  const [isCompact, setIsCompact] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold;
      setIsCompact((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white/80 backdrop-blur",
        "transition-[padding] duration-200 ease-out",
        isCompact ? "py-2 md:py-4" : "py-4 md:py-7.5",
        className,
      )}
    >
      {children}
    </div>
  );
};
