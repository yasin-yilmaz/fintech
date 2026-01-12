"use client";

import { Logo } from "@/components/brand/Logo";
import { HelpIcon } from "@/components/icons/HelpIcon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { InvoicesIcon } from "@/components/icons/InvoicesIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { TransactionsIcon } from "@/components/icons/TransactionsIcon";
import { WalletsIcon } from "@/components/icons/WalletsIcon";

import { SidebarActions } from "./SidebarActions";
import { SidebarNav, type TSidebarNavItem } from "./SidebarNav";

const ACTION_ITEMS = [
  {
    type: "link" as const,
    href: "/dashboard/help",
    label: "Help",
    icon: HelpIcon,
  },
];

const NAV_ITEMS: TSidebarNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    key: "transactions",
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: TransactionsIcon,
  },
  {
    key: "invoices",
    label: "Invoices",
    href: "/dashboard/invoices",
    icon: InvoicesIcon,
  },
  {
    key: "wallets",
    label: "My Wallets",
    href: "/dashboard/wallets",
    icon: WalletsIcon,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export const DashboardSidebarContent = () => {
  return (
    <div className="sticky top-0 flex h-dvh w-62.5 flex-col px-6.25 py-7.5">
      <div className="flex items-center">
        <Logo className="bg-granite h-7.5 w-27" />
      </div>

      <div className="mt-10 flex flex-1 flex-col">
        <SidebarNav items={NAV_ITEMS} />

        <div className="mt-auto pb-10">
          <SidebarActions items={ACTION_ITEMS} />
        </div>
      </div>
    </div>
  );
};

export const DashboardSidebar = () => {
  return (
    <aside className="bg-surface-2 hidden md:block">
      <DashboardSidebarContent />
    </aside>
  );
};
