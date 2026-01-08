import type { ComponentProps } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type TProps = {
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
} & Omit<ComponentProps<typeof Link>, "className" | "children">;

export const SidebarNavItem = ({
  label,
  icon: Icon,
  isActive = false,
  ...props
}: TProps) => {
  return (
    <Link
      {...props}
      className={cn(
        "flex h-12 items-center gap-4 rounded-lg px-4 py-2 transition",
        isActive
          ? "bg-accent text-granite"
          : "text-steel hover:text-granite hover:bg-surface-hover",
      )}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
};
