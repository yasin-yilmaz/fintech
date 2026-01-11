import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
};

export const EmptyState = ({
  title,
  description,
  icon: Icon = Inbox,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "border-border-soft rounded-lg border px-4 py-10 text-center",
        className,
      )}
    >
      <div className="bg-surface-2 mx-auto grid size-12 place-items-center rounded-full">
        <Icon className="text-steel size-5" />
      </div>
      <p className="text-granite mt-4 text-sm font-semibold">{title}</p>
      {description ? (
        <p className="text-steel mt-1 text-xs">{description}</p>
      ) : null}
    </div>
  );
};
