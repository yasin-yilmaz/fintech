import type { ReactNode } from "react";

import { getProfile } from "@/lib/api/auth/actions";

import { AuthHydrate } from "@/components/auth/AuthHydrate";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/sidebar/DashboardSidebar";
import { DashboardSidebarMobile } from "@/components/dashboard/sidebar/DashboardSidebarMobile";
import { GoToTopButton } from "@/components/ui/GoToTopButton";

type TProps = { children: ReactNode };

const DashboardLayout = async ({ children }: TProps) => {
  const profile = await getProfile();

  return (
    <AuthHydrate user={profile.data}>
      <div className="min-h-dvh bg-white">
        <div className="mx-auto grid min-h-dvh grid-cols-1 md:grid-cols-[250px_1fr]">
          <DashboardSidebar />
          <DashboardSidebarMobile />

          <div className="grid min-w-0 grid-rows-[auto_1fr]">
            <DashboardHeader title="Dashboard" />

            <main className="min-w-0 px-4 pb-10.75 md:px-10">{children}</main>
          </div>
        </div>
        <GoToTopButton showAfter={120} />
      </div>
    </AuthHydrate>
  );
};

export default DashboardLayout;
