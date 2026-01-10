import * as React from "react";

import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"input"> & {
  error?: boolean;
};

export const Input = ({ className, type, error, ...props }: Props) => {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-[10px] border bg-white px-4 text-base text-zinc-900",
        "placeholder:text-zinc-400",
        "focus:ring-2 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",

        !error && "border-[#F2F2F2] focus:border-zinc-300 focus:ring-zinc-300",

        error &&
          "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200",

        className,
      )}
      {...props}
    />
  );
};
