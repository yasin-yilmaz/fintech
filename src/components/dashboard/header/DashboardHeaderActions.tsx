"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { DashboardNotificationsMenu } from "@/components/dashboard/header/menus/DashboardNotificationsMenu";
import { DashboardSearchMenu } from "@/components/dashboard/header/menus/DashboardSearchMenu";
import { NotificationsIcon } from "@/components/icons/NotificationsIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { IconButton } from "@/components/ui/IconButton";

type TProps = {
  className?: string;
};

export const DashboardHeaderActions = ({ className }: TProps) => {
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

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
      <div className="flex items-center gap-4 md:gap-11.25">
        <IconButton
          aria-label="Search"
          icon={SearchIcon}
          onClick={toggleSearch}
        />
        <IconButton
          aria-label="Notifications"
          icon={NotificationsIcon}
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
