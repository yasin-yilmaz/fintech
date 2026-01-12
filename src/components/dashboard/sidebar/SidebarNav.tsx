import type { ElementType } from "react";

import { usePathname } from "next/navigation";

import { getActiveKeyFromPath } from "@/lib/utils";

import { SidebarNavItem } from "./SidebarNavItem";

export type TSidebarNavItem = {
  key: string;
  label: string;
  href: string;
  icon: ElementType;
};

type TProps = {
  items: TSidebarNavItem[];
};

export const SidebarNav = ({ items }: TProps) => {
  const pathname = usePathname();
  const activeKey = getActiveKeyFromPath(pathname);

  return (
    <nav className="space-y-0.5">
      {items.map((item) => (
        <SidebarNavItem
          key={item.key}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={item.key === activeKey}
        />
      ))}
    </nav>
  );
};
