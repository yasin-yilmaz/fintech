"use client";

import * as React from "react";

import { CreditCard, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { useLogout } from "@/hooks/useLogout";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  avatarUrl?: string | null;
  className?: string;
};

export const DashboardUserMenu = ({
  isOpen,
  onClose,
  userName,
  avatarUrl,
  className,
}: TProps) => {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  const { logout, isLoggingOut } = useLogout({
    onSuccess: onClose,
    redirectTo: "/signin",
  });

  React.useEffect(() => {
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
          "absolute top-[calc(100%+12px)] right-0 z-50 w-80",
          "bg-surface rounded-xl shadow-sm",
          "ring-granite-soft/60 ring-1",
        )}
      >
        {/* Header */}
        <div className="border-granite-soft/60 flex items-center gap-3 border-b px-4 py-3">
          <span className="bg-granite-soft relative size-10 overflow-hidden rounded-full">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={userName}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : null}
          </span>

          <div className="min-w-0">
            <div className="text-granite truncate text-sm font-semibold">
              {userName}
            </div>
            <div className="text-steel text-xs">Account</div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="p-2">
          {[
            { label: "Profile", icon: User },
            { label: "Billing", icon: CreditCard },
            { label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {}}
              className="text-granite hover:bg-surface-hover flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm"
            >
              <item.icon className="text-steel size-4" />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="bg-granite-soft/60 my-2 h-px" />

          <button
            type="button"
            onClick={logout}
            disabled={isLoggingOut}
            aria-busy={isLoggingOut ? true : undefined}
            className={cn(
              "text-granite hover:bg-surface-hover flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            <LogOut className="text-steel size-4" />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
