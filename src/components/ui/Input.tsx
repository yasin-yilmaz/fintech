import * as React from "react";

import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"input">;

export const Input = ({ className, type, ...props }: Props) => {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-[10px] border border-[#F2F2F2] bg-white px-4 text-base text-zinc-900",
        "placeholder:text-zinc-400",
        "focus:border-zinc-300 focus:ring-2 focus:ring-zinc-300 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
