export const DashboardGrid = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* LEFT / MAIN */}
      <section className="grid gap-8">
        {/* 1) Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-surface h-24 rounded-2xl" />
          <div className="bg-surface h-24 rounded-2xl" />
          <div className="bg-surface h-24 rounded-2xl" />
        </div>

        {/* 2) Chart */}
        <div className="bg-surface h-90 rounded-2xl" />

        {/* 3) Recent Transactions */}
        <div className="bg-surface h-90 rounded-2xl" />
      </section>

      {/* RIGHT / ASIDE */}
      <aside className="grid content-start gap-8">
        {/* 1) Wallet */}
        <div className="bg-surface h-90 rounded-2xl" />

        {/* 2) Scheduled Transfers */}
        <div className="bg-surface h-130 rounded-2xl" />
      </aside>
    </div>
  );
};
