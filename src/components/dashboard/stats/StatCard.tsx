import * as React from "react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: string;
  icon: React.ElementType;
  isPrimary?: boolean;
  className?: string;
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  isPrimary = false,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "min-h-26.25 rounded-[10px] px-5 py-6",
        isPrimary ? "bg-granite-dark" : "bg-surface-2",
        className,
      )}
    >
      <div className="flex items-center gap-3.75">
        <div
          className={cn(
            "grid size-10.5 place-items-center rounded-full",
            isPrimary ? "bg-granite-mid" : "bg-surface-warm",
          )}
        >
          <Icon
            className={cn(
              "size-5",
              isPrimary ? "text-accent" : "text-granite-dark",
            )}
          />
        </div>

        <div className="min-w-0 space-y-2.5">
          <p className="text-steel line-clamp-1 text-sm">{title}</p>
          <p
            className={cn(
              "mt-1 line-clamp-1 text-[26px] leading-none font-semibold",
              isPrimary ? "text-white" : "text-granite",
            )}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
