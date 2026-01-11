import { Suspense } from "react";

import { WorkingCapitalSection } from "@/components/dashboard/charts/working-capital/WorkingCapitalSection";
import { StatCards } from "@/components/dashboard/stats/StatCards";
import { StatCardsSkeleton } from "@/components/dashboard/stats/StatCardsSkeleton";
import { RecentTransactionsSection } from "@/components/dashboard/transactions/RecentTransactionsSection";
import { ScheduledTransfers } from "@/components/dashboard/transfers/ScheduledTransfers";
import ScheduledTransfersSkeleton from "@/components/dashboard/transfers/ScheduledTransfersSkeleton";
import { WalletPanel } from "@/components/dashboard/wallet/WalletPanel";
import WalletPanelSkeleton from "@/components/dashboard/wallet/WalletPanel.sekeleton";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-12 gap-x-9.75 gap-y-8">
      {/* LEFT */}
      <div className="col-span-12 grid gap-8 xl:col-span-8">
        <Suspense fallback={<StatCardsSkeleton />}>
          <StatCards />
        </Suspense>
        <WorkingCapitalSection />
        <RecentTransactionsSection />
      </div>
      {/* RIGHT */}
      <div className="col-span-12 grid content-start gap-8 xl:col-span-4">
        <Suspense fallback={<WalletPanelSkeleton />}>
          <WalletPanel />
        </Suspense>
        <Suspense fallback={<ScheduledTransfersSkeleton />}>
          <ScheduledTransfers />
        </Suspense>
      </div>
    </section>
  );
};

export default DashboardPage;
