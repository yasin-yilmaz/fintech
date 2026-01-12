"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type TRangeKey = "7d" | "3m" | "6m" | "1y";

export const RANGE_LABEL: Record<TRangeKey, string> = {
  "7d": "Last 7 days",
  "3m": "Last 3 months",
  "6m": "Last 6 months",
  "1y": "Last 1 year",
};

type Props = {
  value?: TRangeKey;
  onChange?: (v: TRangeKey) => void;

  defaultValue?: TRangeKey;

  options?: readonly TRangeKey[];
  className?: string;
};

export const RangeSelect = ({
  value,
  onChange,
  defaultValue = "6m",
  options = ["7d", "3m", "6m", "1y"],
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const isControlled = value != null;

  const [internalValue, setInternalValue] = useState<TRangeKey>(defaultValue);

  const currentValue = (isControlled ? value : internalValue) as TRangeKey;

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

  const selectValue = (key: TRangeKey) => {
    if (isControlled) {
      onChange?.(key);
    } else {
      setInternalValue(key);
      onChange?.(key);
    }
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="bg-surface-2 hover:bg-surface-hover text-granite flex min-w-37.5 items-center justify-between gap-2 rounded-[5px] py-2 pr-2 pl-2.5 text-xs font-semibold transition-colors"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {RANGE_LABEL[currentValue]}
        <span className="text-granite">
          <ChevronDown />
        </span>
      </button>

      {isOpen ? (
        <div className="bg-surface ring-border-soft absolute top-[calc(100%+10px)] right-0 z-50 w-44 rounded-xl p-1 shadow-sm ring-1">
          {options.map((key) => {
            const isActive = key === currentValue;

            return (
              <button
                key={key}
                type="button"
                onClick={() => selectValue(key)}
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
