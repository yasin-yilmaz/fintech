import type { ElementType } from "react";

import { SidebarNavItem } from "./SidebarNavItem";

export type TSidebarNavItem = {
  key: string;
  label: string;
  href: string;
  icon: ElementType;
};

type TProps = {
  items: TSidebarNavItem[];
  activeKey?: string;
};

export const SidebarNav = ({ items, activeKey }: TProps) => {
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
