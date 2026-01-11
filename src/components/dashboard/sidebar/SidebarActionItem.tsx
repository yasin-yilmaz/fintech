import type { ButtonHTMLAttributes, ElementType } from "react";

import { cn } from "@/lib/utils";

import { useUIStore } from "@/store/ui.store";

type TProps = {
  label: string;
  icon: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarActionItem = ({
  label,
  icon: Icon,
  className,
  ...props
}: TProps) => {
  const closeSidebar = useUIStore((state) => state.closeSidebar);
  return (
    <button
      onClick={closeSidebar}
      type="button"
      {...props}
      className={cn(
        "text-steel hover:bg-surface-hover hover:text-granite flex h-12 w-full cursor-pointer items-center gap-4 rounded-lg px-4 py-2 transition",
        className,
      )}
    >
      <Icon className="size-5" />
      <span className="font-semibold">{label}</span>
    </button>
  );
};
