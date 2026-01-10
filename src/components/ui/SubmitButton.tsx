import * as React from "react";

import { cn } from "@/lib/utils";

type TVariant = "primary" | "outline";

type Props = React.ComponentProps<"button"> & {
  variant?: TVariant;
  isLoading?: boolean;
};

const Spinner = ({ className }: { className?: string }) => {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent",
        className,
      )}
    />
  );
};

export const SubmitButton = ({
  className,
  variant = "primary",
  isLoading,
  disabled,
  children,
  ...props
}: Props) => {
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      className={cn(
        "flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] text-base font-semibold transition duration-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-accent text-granite hover:bg-accent-dark",
        variant === "outline" &&
          "text-granite-muted border border-[#F2F2F2] bg-white hover:bg-zinc-50",
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading ? true : undefined}
      {...props}
    >
      {isLoading ? <Spinner /> : null}
      {children}
    </button>
  );
};
