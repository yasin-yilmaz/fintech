"use client";

import type { ElementType } from "react";

import { LogOut } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";

import { SidebarActionItem } from "./SidebarActionItem";
import { SidebarNavItem } from "./SidebarNavItem";

type TLinkAction = {
  type: "link";
  href: string;
  label: string;
  icon: ElementType;
};

type TActionItem = TLinkAction;

type TProps = {
  items: TActionItem[];
};

export const SidebarActions = ({ items }: TProps) => {
  const { logout, isLoggingOut } = useLogout({ redirectTo: "/signin" });

  return (
    <div className="space-y-0.5">
      {items.map((item) => (
        <SidebarNavItem
          key={`link-${item.href}`}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
      <SidebarActionItem
        label={isLoggingOut ? "Logging out..." : "Logout"}
        icon={LogOut}
        onClick={logout}
        disabled={isLoggingOut}
      />
    </div>
  );
};
