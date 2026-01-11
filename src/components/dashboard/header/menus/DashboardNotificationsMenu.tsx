"use client";

import { useEffect, useRef } from "react";

import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export const DashboardNotificationsMenu = ({
  isOpen,
  onClose,
  className,
}: TProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

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
          "fixed top-18 left-1/2 z-50 w-[min(420px,calc(100vw-16px))] -translate-x-1/2",
          "sm:absolute sm:top-[calc(100%+12px)] sm:right-0 sm:left-auto sm:w-105 sm:translate-x-0",
          "bg-surface rounded-xl shadow-sm",
          "ring-granite-soft/60 ring-1",
          "max-h-[calc(100vh-96px)] overflow-auto sm:max-h-none sm:overflow-visible",
        )}
      >
        <div className="border-granite-soft/60 flex items-center gap-2 border-b px-4 py-3">
          <Bell className="text-steel size-4" />
          <div className="text-granite text-sm font-semibold">
            Notifications
          </div>

          <button
            type="button"
            className="text-steel hover:bg-surface-hover ml-auto rounded-lg px-2 py-1 text-xs"
          >
            Mark all as read
          </button>
        </div>

        <div className="p-2">
          <div className="text-granite-muted px-3 py-2 text-xs font-semibold">
            Today
          </div>

          <div className="space-y-1">
            {[
              {
                title: "Invoice paid",
                desc: "INV-1024 was paid successfully.",
                time: "2m ago",
              },
              {
                title: "New message",
                desc: "You received a new message.",
                time: "18m ago",
              },
            ].map((n) => (
              <div
                key={n.title}
                className="hover:bg-surface-hover rounded-lg px-3 py-2"
              >
                <div className="text-granite flex items-start justify-between gap-3 text-sm font-medium">
                  <span>{n.title}</span>
                  <span className="text-steel text-xs font-normal">
                    {n.time}
                  </span>
                </div>
                <div className="text-granite-muted mt-0.5 text-xs">
                  {n.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="text-granite-muted px-3 pt-3 pb-2 text-xs font-semibold">
            Earlier
          </div>

          <div className="space-y-1">
            {[
              {
                title: "Weekly report ready",
                desc: "Your report is ready to view.",
                time: "Yesterday",
              },
              {
                title: "Profile updated",
                desc: "Your profile changes were saved.",
                time: "2d ago",
              },
            ].map((n) => (
              <div
                key={n.title}
                className="hover:bg-surface-hover rounded-lg px-3 py-2"
              >
                <div className="text-granite flex items-start justify-between gap-3 text-sm font-medium">
                  <span>{n.title}</span>
                  <span className="text-steel text-xs font-normal">
                    {n.time}
                  </span>
                </div>
                <div className="text-granite-muted mt-0.5 text-xs">
                  {n.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="border-granite-soft/60 border-t p-2">
            <button
              type="button"
              className="text-granite hover:bg-surface-hover w-full rounded-lg px-3 py-2 text-sm font-semibold"
            >
              View all notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
