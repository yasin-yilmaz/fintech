"use client";

import { useEffect, useRef, useState } from "react";

import { CreditCard, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useLogout } from "@/hooks/useLogout";

import type { TProfileUser } from "@/schemas/auth.schema";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  user: TProfileUser;
  avatarUrl?: string | null;
  className?: string;
};

export const DashboardUserMenu = ({
  isOpen,
  onClose,
  user,
  avatarUrl,
  className,
}: TProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // "Modal açık mı?" state'i yerine sadece niyet tutuyoruz
  const [confirmRequested, setConfirmRequested] = useState(false);
  const isConfirmOpen = isOpen && confirmRequested;

  const { logout, isLoggingOut } = useLogout({
    onSuccess: () => {
      setConfirmRequested(false);
      onClose();
    },
    redirectTo: "/signin",
  });

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (isConfirmOpen) setConfirmRequested(false);
      else onClose();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isConfirmOpen) return;

      const el = panelRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen, onClose, isConfirmOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={cn("relative", className)}>
        <div
          ref={panelRef}
          className={cn(
            "absolute top-[calc(100%+12px)] right-0 z-50 w-70",
            "bg-surface rounded-xl shadow-sm",
            "ring-granite-soft/60 ring-1",
          )}
        >
          {/* Header */}
          <div className="border-granite-soft/60 border-b px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="bg-granite-soft relative size-10 shrink-0 overflow-hidden rounded-full">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={user.fullName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : null}
              </span>

              <div className="min-w-0">
                <div className="text-granite truncate text-sm font-semibold">
                  {user.fullName}
                </div>
                <div className="text-steel truncate text-xs">{user.email}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="bg-surface-cool text-granite ring-border-soft inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1">
                {user.role}
              </span>

              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1",
                  user.isActive
                    ? "bg-surface-cool text-granite ring-border-soft"
                    : "bg-surface-warm text-granite-muted ring-border-soft",
                )}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
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
              onClick={() => setConfirmRequested(true)}
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

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmRequested(false)}
        title="Log out?"
        description="You will need to sign in again to access your dashboard."
        cancelLabel="Cancel"
        confirmLabel="Log out"
        isDanger
        isLoading={isLoggingOut}
        onConfirm={() => logout()}
      />
    </>
  );
};
