import { WorkingCapitalChart } from "@/components/dashboard/charts/working-capital/WorkingCapitalChart";
import { StatCards } from "@/components/dashboard/stats/StatCards";
import { RecentTransactionsTable } from "@/components/dashboard/transactions/RecentTransactionsTable";
import { ScheduledTransfers } from "@/components/dashboard/transfers/ScheduledTransfers";
import { WalletPanel } from "@/components/dashboard/wallet/WalletPanel";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-12 gap-x-9.75 gap-y-8">
      <div className="col-span-12 grid gap-8 xl:col-span-8">
        {/* Stats */}
        <StatCards />

        {/* Chart */}
        <WorkingCapitalChart />

        {/* Recent Transactions */}
        <RecentTransactionsTable />
      </div>
      <div className="col-span-12 grid content-start gap-8 xl:col-span-4">
        <WalletPanel />
        <ScheduledTransfers />
      </div>
    </section>
  );
};

export default DashboardPage;
