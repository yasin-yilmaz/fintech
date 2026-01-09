"use client";

import {
  ArrowLeftRight,
  HelpCircle,
  Home,
  LogOut,
  Receipt,
  Settings,
  Wallet,
} from "lucide-react";

import { Logo } from "@/components/brand/Logo";

import { SidebarActions } from "./SidebarActions";
import { SidebarNav, type TSidebarNavItem } from "./SidebarNav";

const ACTION_ITEMS = [
  { type: "link" as const, href: "/help", label: "Help", icon: HelpCircle },
  { type: "button" as const, label: "Logout", icon: LogOut, onClick: () => {} },
];

const NAV_ITEMS: TSidebarNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
  {
    key: "transactions",
    label: "Transactions",
    href: "#",
    icon: ArrowLeftRight,
  },
  { key: "invoices", label: "Invoices", href: "#", icon: Receipt },
  { key: "wallets", label: "My Wallets", href: "#", icon: Wallet },
  { key: "settings", label: "Settings", href: "#", icon: Settings },
];

type Props = {
  activeKey?: string;
};

export const DashboardSidebar = ({ activeKey = "dashboard" }: Props) => {
  return (
    <aside className="hidden bg-[#FAFAFA] md:block">
      <div className="sticky top-0 flex h-dvh w-62.5 flex-col px-6.25 py-7.5">
        <div className="flex items-center">
          <Logo className="h-7.5 w-27 bg-[#1B212D]" />
        </div>

        <div className="mt-10 flex flex-1 flex-col">
          <SidebarNav items={NAV_ITEMS} activeKey={activeKey} />

          <div className="mt-auto pb-10">
            <div className="mt-auto pb-10">
              <SidebarActions items={ACTION_ITEMS} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
