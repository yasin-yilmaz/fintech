"use client";

import { useEffect, useRef } from "react";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export const DashboardSearchMenu = ({ isOpen, onClose, className }: TProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onMouseDown = (e: MouseEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={panelRef}
        className={cn(
          // mobile: ekran içine sabitle
          "fixed top-18 left-1/2 z-50 w-[min(420px,calc(100vw-16px))] -translate-x-1/2",
          // sm+: butona bağlı dropdown gibi davransın
          "sm:absolute sm:top-[calc(100%+12px)] sm:right-0 sm:left-auto sm:w-105 sm:translate-x-0",
          "bg-surface rounded-xl shadow-sm",
          "ring-granite-soft/60 ring-1",
        )}
      >
        <div className="border-granite-soft/60 flex items-center gap-2 border-b px-4 py-3">
          <Search className="text-steel size-4" />
          <input
            ref={inputRef}
            placeholder="Search..."
            className="text-granite placeholder:text-steel w-full bg-transparent text-sm outline-none"
            onChange={() => {}}
          />
        </div>

        <div className="p-2">
          <div className="text-granite-muted px-3 py-2 text-xs font-semibold">
            Suggestions
          </div>

          <div className="space-y-1">
            {["Dashboard", "Transactions", "Invoices", "Settings"].map((x) => (
              <div
                key={x}
                className="text-granite hover:bg-surface-hover flex items-center rounded-lg px-3 py-2 text-sm"
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
