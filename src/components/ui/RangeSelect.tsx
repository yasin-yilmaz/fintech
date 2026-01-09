"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type TRangeKey = "7d" | "3m" | "6m" | "1y";

export const RANGE_LABEL: Record<TRangeKey, string> = {
  "7d": "Last 7 days",
  "3m": "Last 3 months",
  "6m": "Last 6 months",
  "1y": "Last 1 year",
};

type Props = {
  value: TRangeKey;
  onChange: (v: TRangeKey) => void;
  options?: readonly TRangeKey[];
  className?: string;
};

export const RangeSelect = ({
  value,
  onChange,
  options = ["7d", "3m", "6m", "1y"],
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const onMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="bg-surface hover:bg-surface-hover text-granite flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {RANGE_LABEL[value]}
        <span className="text-steel">▾</span>
      </button>

      {isOpen ? (
        <div className="bg-surface ring-border-soft absolute top-[calc(100%+10px)] right-0 z-50 w-44 rounded-xl p-1 shadow-sm ring-1">
          {options.map((key) => {
            const isActive = key === value;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
                className={cn(
                  "text-granite flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors",
                  "hover:bg-surface-hover",
                  isActive && "bg-surface-hover",
                )}
              >
                {RANGE_LABEL[key]}
                {isActive ? <span className="text-accent-dark">✓</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
