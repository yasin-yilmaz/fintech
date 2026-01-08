"use client";

import { Bell, Search } from "lucide-react";

import { IconButton } from "@/components/ui/IconButton";

type TProps = {
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  className?: string;
};

export const DashboardHeaderActions = ({
  onSearchClick,
  onNotificationsClick,
  className,
}: TProps) => {
  return (
    <div className={className ?? "flex items-center gap-11.25"}>
      <IconButton aria-label="Search" icon={Search} onClick={onSearchClick} />
      <IconButton
        aria-label="Notifications"
        icon={Bell}
        onClick={onNotificationsClick}
      />
    </div>
  );
};
