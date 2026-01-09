// components/dashboard/SidebarActions.tsx
import type { ElementType } from "react";

import { SidebarActionItem } from "./SidebarActionItem";
import { SidebarNavItem } from "./SidebarNavItem";

type TLinkAction = {
  type: "link";
  href: string;
  label: string;
  icon: ElementType;
};

type TButtonAction = {
  type: "button";
  label: string;
  icon: ElementType;
  onClick?: () => void;
};

type TActionItem = TLinkAction | TButtonAction;

type TProps = {
  items: TActionItem[];
};

export const SidebarActions = ({ items }: TProps) => {
  return (
    <div className="space-y-0.5">
      {items.map((item) => {
        if (item.type === "link") {
          return (
            <SidebarNavItem
              key={`link-${item.href}`}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          );
        }

        return (
          <SidebarActionItem
            key={`btn-${item.label}`}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
};
