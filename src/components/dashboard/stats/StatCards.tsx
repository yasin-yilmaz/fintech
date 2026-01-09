import { CreditCard, PiggyBank, Wallet } from "lucide-react";

import { StatCard } from "./StatCard";

type TStatItem = {
  key: string;
  title: string;
  value: string;
  icon: React.ElementType;
  isPrimary?: boolean;
};

export const StatCards = () => {
  const items: TStatItem[] = [
    {
      key: "total-balance",
      title: "Total balance",
      value: "$5240.21",
      icon: Wallet,
      isPrimary: true,
    },
    {
      key: "total-spending",
      title: "Total spending",
      value: "$250.80",
      icon: CreditCard,
    },
    {
      key: "total-saved",
      title: "Total saved",
      value: "$550.25",
      icon: PiggyBank,
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
