"use client";

import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  isVisible: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
};

export const PasswordToggleButton = ({
  isVisible,
  onToggle,
  disabled,
  className,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={isVisible ? "Hide password" : "Show password"}
      className={cn(
        "absolute top-1/2 right-3 -translate-y-1/2",
        "inline-flex h-8 w-8 items-center justify-center rounded-md",
        "text-granite-muted hover:text-granite",
        "focus:ring-border-soft focus:bg-surface-hover focus:ring-2 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
};
