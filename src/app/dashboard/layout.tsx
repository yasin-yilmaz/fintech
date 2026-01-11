import type { ReactNode } from "react";

import { getProfile } from "@/lib/api/auth/actions";

import { AuthHydrate } from "@/components/auth/AuthHydrate";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/sidebar/DashboardSidebar";

type TProps = { children: ReactNode };

const DashboardLayout = async ({ children }: TProps) => {
  const profile = await getProfile();

  return (
    <AuthHydrate user={profile.data}>
      <div className="min-h-dvh bg-white">
        <div className="mx-auto grid min-h-dvh grid-cols-1 md:grid-cols-[250px_1fr]">
          <DashboardSidebar activeKey="dashboard" />

          <div className="grid min-w-0 grid-rows-[auto_1fr] pt-5 md:pt-7.5">
            <DashboardHeader title="Dashboard" />

            <main className="min-w-0 px-4 pb-10.75 md:px-10">{children}</main>
          </div>
        </div>
      </div>
    </AuthHydrate>
  );
};

export default DashboardLayout;
