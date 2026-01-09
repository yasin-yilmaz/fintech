"use client";

import * as React from "react";

import { DashboardUserMenu } from "@/components/dashboard/header/menus/DashboardUserMenu";
import { UserMenuButton } from "@/components/dashboard/header/UserMenuButton";

type Props = {
  userName: string;
  avatarUrl?: string;
};

export const DashboardUserArea = ({ userName, avatarUrl }: Props) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  return (
    <div className="relative">
      <UserMenuButton
        userName={userName}
        avatarUrl={avatarUrl}
        onClick={() => setIsUserMenuOpen((v) => !v)}
      />

      <DashboardUserMenu
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        userName={userName}
        avatarUrl={avatarUrl}
      />
    </div>
  );
};
