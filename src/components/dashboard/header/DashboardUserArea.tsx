"use client";

import * as React from "react";

import { DashboardUserMenu } from "@/components/dashboard/header/menus/DashboardUserMenu";
import { UserMenuButton } from "@/components/dashboard/header/UserMenuButton";

import { useAuthStore } from "@/store/auth.store";

export const DashboardUserArea = () => {
  const user = useAuthStore((s) => s.user);
  const userName = user?.fullName ?? "Account";

  // avatar API'da yok: şimdilik sabit veya undefined
  const avatarUrl = "/images/user01.png";

  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  if (!user) return null;

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
        user={user}
        avatarUrl={avatarUrl}
      />
    </div>
  );
};
