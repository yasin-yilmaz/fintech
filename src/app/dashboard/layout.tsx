// app/dashboard/layout.tsx
import type { ReactNode } from "react";

import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/sidebar/DashboardSidebar";

type TProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: TProps) => {
  return (
    <div className="min-h-dvh bg-white">
      <div className="mx-auto grid min-h-dvh grid-cols-1 md:grid-cols-[250px_1fr]">
        <DashboardSidebar activeKey="dashboard" />

        <div className="grid grid-rows-[auto_1fr] pt-7.5">
          <DashboardHeader title="Dashboard" avatarUrl="/images/user01.png" />
          <main className="px-10 pb-10.75">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
