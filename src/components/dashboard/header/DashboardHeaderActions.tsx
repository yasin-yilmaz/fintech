"use client";

import * as React from "react";

import { Bell, Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { DashboardNotificationsMenu } from "@/components/dashboard/header/menus/DashboardNotificationsMenu";
import { DashboardSearchMenu } from "@/components/dashboard/header/menus/DashboardSearchMenu";
import { IconButton } from "@/components/ui/IconButton";

type TProps = {
  className?: string;
};

export const DashboardHeaderActions = ({ className }: TProps) => {
  const [isSearchMenuOpen, setIsSearchMenuOpen] = React.useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] =
    React.useState(false);

  const toggleSearch = () => {
    setIsSearchMenuOpen((v) => !v);
    setIsNotificationsMenuOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsMenuOpen((v) => !v);
    setIsSearchMenuOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-11.25">
        <IconButton aria-label="Search" icon={Search} onClick={toggleSearch} />
        <IconButton
          aria-label="Notifications"
          icon={Bell}
          onClick={toggleNotifications}
        />
      </div>

      <DashboardSearchMenu
        isOpen={isSearchMenuOpen}
        onClose={() => setIsSearchMenuOpen(false)}
      />

      <DashboardNotificationsMenu
        isOpen={isNotificationsMenuOpen}
        onClose={() => setIsNotificationsMenuOpen(false)}
      />
    </div>
  );
};
