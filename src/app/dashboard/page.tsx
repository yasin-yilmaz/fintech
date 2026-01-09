import { StatCards } from "@/components/dashboard/stats/StatCards";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-12 gap-x-[39px] gap-y-8">
      {/* LEFT / MAIN (717px ≈ 8/12) */}
      <section className="col-span-12 grid gap-8 xl:col-span-8">
        {/* Stats row (3 kart yan yana) */}
        <StatCards />

        {/* Chart */}
        <div className="bg-surface h-[360px] rounded-2xl" />

        {/* Recent Transactions */}
        <div className="bg-surface h-[360px] rounded-2xl" />
      </section>

      {/* RIGHT / ASIDE (354px ≈ 4/12) */}
      <aside className="col-span-12 grid content-start gap-8 xl:col-span-4">
        <div className="bg-surface h-[360px] rounded-2xl" />
        <div className="bg-surface h-[520px] rounded-2xl" />
      </aside>
    </div>
  );
};

export default DashboardPage;
