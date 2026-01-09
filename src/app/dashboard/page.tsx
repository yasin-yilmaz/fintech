import { StatCards } from "@/components/dashboard/stats/StatCards";
import { RecentTransactionsTable } from "@/components/dashboard/transactions/RecentTransactionsTable";
import { ScheduledTransfers } from "@/components/dashboard/transfers/ScheduledTransfers";
import { WalletPanel } from "@/components/dashboard/wallet/WalletPanel";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-12 gap-x-9.75 gap-y-8">
      {/* LEFT / MAIN (717px ≈ 8/12) */}
      <section className="col-span-12 grid gap-8 xl:col-span-8">
        {/* Stats row (3 kart yan yana) */}
        <StatCards />

        {/* Recent Transactions */}
        <RecentTransactionsTable />

        {/* Chart */}
        <div className="bg-surface h-90 rounded-2xl" />
      </section>

      {/* RIGHT / ASIDE (354px ≈ 4/12) */}
      <aside className="col-span-12 grid content-start gap-8 xl:col-span-4">
        <WalletPanel />
        <ScheduledTransfers />
      </aside>
    </div>
  );
};

export default DashboardPage;
