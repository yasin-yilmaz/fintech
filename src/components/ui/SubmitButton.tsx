import * as React from "react";

import { cn } from "@/lib/utils";

type TVariant = "primary" | "outline";

type Props = React.ComponentProps<"button"> & {
  variant?: TVariant;
};

export const SubmitButton = ({
  className,
  variant = "primary",
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "flex h-11 w-full cursor-pointer items-center justify-center rounded-[10px] text-base font-semibold transition duration-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "text-granite bg-accent hover:bg-accent-dark",
        variant === "outline" &&
          "text-granite-muted border border-[#F2F2F2] bg-white hover:bg-zinc-50",
        className,
      )}
      {...props}
    />
  );
};
