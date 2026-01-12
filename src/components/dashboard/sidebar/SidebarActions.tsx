"use client";

import type { ElementType } from "react";
import { useState } from "react";

import { LogOut } from "lucide-react";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
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
  const [confirmRequested, setConfirmRequested] = useState(false);

  const { logout, isLoggingOut } = useLogout({
    redirectTo: "/signin",
    onSuccess: () => setConfirmRequested(false),
  });

  return (
    <>
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
          onClick={() => setConfirmRequested(true)}
          disabled={isLoggingOut}
        />
      </div>

      <ConfirmModal
        isOpen={confirmRequested}
        onClose={() => setConfirmRequested(false)}
        title="Log out?"
        description="You will need to sign in again to access your dashboard."
        cancelLabel="Cancel"
        confirmLabel="Log out"
        isDanger
        isLoading={isLoggingOut}
        onConfirm={() => logout()}
      />
    </>
  );
};
