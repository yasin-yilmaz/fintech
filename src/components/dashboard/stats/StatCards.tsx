import { getFinancialSummary } from "@/lib/api/financial/actions";
import { fmtMoney } from "@/lib/helpers/money";

import { WalletAddIcon } from "@/components/icons/WalletAddIcon";
import { WalletIcon } from "@/components/icons/WalletIcon";

import { StatCard } from "./StatCard";

type TStatItem = {
  key: string;
  title: string;
  value: string;
  icon: React.ElementType;
  isPrimary?: boolean;
};

export const StatCards = async () => {
  const res = await getFinancialSummary();
  const d = res.data;

  const items: TStatItem[] = [
    {
      key: "total-balance",
      title: "Total balance",
      value: fmtMoney(d.totalBalance.amount, d.totalBalance.currency),
      icon: WalletIcon,
      isPrimary: true,
    },
    {
      key: "total-spending",
      title: "Total spending",
      value: fmtMoney(d.totalExpense.amount, d.totalExpense.currency),
      icon: WalletIcon,
    },
    {
      key: "total-saved",
      title: "Total saved",
      value: fmtMoney(d.totalSavings.amount, d.totalSavings.currency),
      icon: WalletAddIcon,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      {items.map((item) => (
        <div key={item.key} className="col-span-12 lg:col-span-4">
          <StatCard
            title={item.title}
            value={item.value}
            icon={item.icon}
            isPrimary={item.isPrimary}
          />
        </div>
      ))}
    </div>
  );
};
