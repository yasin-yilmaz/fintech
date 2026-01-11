"use client";

import { useEffect, useState } from "react";

import { ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showAfter?: number;
};

export const GoToTopButton = ({ className, showAfter = 240 }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={onClick}
      className={cn(
        "fixed right-4 bottom-4 z-50",
        "grid size-11 place-items-center rounded-full",
        "bg-surface text-granite ring-border-soft shadow-sm ring-1",
        "hover:bg-surface-hover transition",
        "focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none",
        "disabled:pointer-events-none",
        !isVisible && "pointer-events-none translate-y-2 opacity-0",
        isVisible && "translate-y-0 opacity-100",
        "transition-all duration-200",
        className,
      )}
    >
      <ChevronUp className="size-5" />
    </button>
  );
};
