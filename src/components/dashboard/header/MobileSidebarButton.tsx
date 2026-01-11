"use client";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { useUIStore } from "@/store/ui.store";

type Props = {
  className?: string;
};

export const MobileSidebarButton = ({ className }: Props) => {
  const openSidebar = useUIStore((s) => s.openSidebar);

  return (
    <button
      type="button"
      onClick={openSidebar}
      aria-label="Open sidebar"
      className={cn(
        "bg-surface hover:bg-surface-hover grid size-10 cursor-pointer place-items-center rounded-full md:hidden",
        className,
      )}
    >
      <Menu className="text-granite size-5" />
    </button>
  );
};
