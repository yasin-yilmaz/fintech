import type { ComponentProps } from "react";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Link> & {
  label?: string;
};

export const ViewAllLink = ({
  label = "View All",
  className,
  ...props
}: Props) => {
  return (
    <Link
      {...props}
      className={cn(
        "text-accent-dark group hover:text-accent inline-flex items-center gap-1 text-sm font-semibold",
        className,
      )}
    >
      {label}
      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
};
