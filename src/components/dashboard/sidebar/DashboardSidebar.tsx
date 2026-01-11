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
  { type: "link" as const, href: "/help", label: "Help", icon: HelpIcon },
];

const NAV_ITEMS: TSidebarNavItem[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    key: "transactions",
    label: "Transactions",
    href: "#",
    icon: TransactionsIcon,
  },
  { key: "invoices", label: "Invoices", href: "#", icon: InvoicesIcon },
  { key: "wallets", label: "My Wallets", href: "#", icon: WalletsIcon },
  { key: "settings", label: "Settings", href: "#", icon: SettingsIcon },
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
