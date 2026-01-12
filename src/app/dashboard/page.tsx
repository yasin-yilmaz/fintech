import { Suspense } from "react";

import { Metadata } from "next";

import { pageMetadata } from "@/lib/metadata";

import { WorkingCapitalSection } from "@/components/dashboard/charts/working-capital/WorkingCapitalSection";
import { WorkingCapitalSectionSkeleton } from "@/components/dashboard/charts/working-capital/WorkingCapitalSection.skeleton";
import { StatCards } from "@/components/dashboard/stats/StatCards";
import { StatCardsSkeleton } from "@/components/dashboard/stats/StatCardsSkeleton";
import RecentTransactionsSkeleton from "@/components/dashboard/transactions/RecentTransactions.skeleton";
import { RecentTransactionsSection } from "@/components/dashboard/transactions/RecentTransactionsSection";
import { ScheduledTransfers } from "@/components/dashboard/transfers/ScheduledTransfers";
import ScheduledTransfersSkeleton from "@/components/dashboard/transfers/ScheduledTransfersSkeleton";
import { WalletPanel } from "@/components/dashboard/wallet/WalletPanel";
import WalletPanelSkeleton from "@/components/dashboard/wallet/WalletPanel.sekeleton";

export const metadata: Metadata = pageMetadata({
  title: "Dashboard",
  description:
    "Manage your finances, cards, transfers and recent activity in one place.",
  canonical: "/dashboard",
  robots: { index: false, follow: false },
  openGraph: {
    url: "/dashboard",
    title: "Dashboard",
  },
  twitter: {
    title: "Dashboard",
  },
});

const DashboardPage = () => {
  return (
    <section className="grid min-w-0 grid-cols-12 gap-x-4 gap-y-6 md:gap-x-9.75 md:gap-y-8">
      {/* left */}
      <div className="col-span-12 grid min-w-0 gap-8 xl:col-span-8">
        <Suspense fallback={<StatCardsSkeleton />}>
          <StatCards />
        </Suspense>
        <Suspense fallback={<WorkingCapitalSectionSkeleton />}>
          <WorkingCapitalSection />
        </Suspense>

        <Suspense fallback={<RecentTransactionsSkeleton rows={3} />}>
          <RecentTransactionsSection />
        </Suspense>
      </div>

      {/* right */}
      <div className="col-span-12 grid min-w-0 content-start gap-8 xl:col-span-4">
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
