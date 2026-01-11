// components/dashboard/wallet/WalletPanel.tsx (Server Component)
import { getWallet } from "@/lib/api/financial/actions";

import { ViewAllLink } from "@/components/ui/ViewAllLink";

import { toWalletCardView } from "./wallet.mapper";
import { WalletCard } from "./WalletCard";
import WalletEmpty from "./WalletEmpty";

export const WalletPanel = async () => {
  const res = await getWallet();

  if (!res.success) return <WalletEmpty />;

  const cards = res.data.cards
    .map(toWalletCardView)
    .sort((a, b) => Number(b.tone === "dark") - Number(a.tone === "dark"));

  const primary = cards[0];
  const secondary = cards[1];

  if (!primary) return <WalletEmpty />;

  return (
    <section className="rounded-2xl bg-transparent">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-granite text-lg font-semibold">Wallet</h2>
        <ViewAllLink href="/dashboard/wallet" />
      </div>

      <div className="group relative">
        {/* DARK */}
        <div className="transition-transform duration-200 group-hover:-translate-y-1">
          <WalletCard
            company={primary.company}
            bank={primary.bank}
            maskedNumber={primary.maskedNumber}
            expiry={primary.expiry}
            brand={primary.brand}
            tone={primary.tone}
          />
        </div>

        {/* WHITE */}
        {secondary ? (
          <div className="absolute top-40 left-1/2 w-[92%] -translate-x-1/2 transition-transform duration-200 group-hover:-translate-y-2">
            <div className="border-border-soft rounded-[15px] border bg-white/55 backdrop-blur-sm transition-all duration-200 group-hover:bg-white/70 group-hover:shadow-sm group-hover:backdrop-blur-none">
              <WalletCard
                company={secondary.company}
                bank={secondary.bank}
                maskedNumber={secondary.maskedNumber}
                expiry={secondary.expiry}
                brand={secondary.brand}
                tone={secondary.tone}
                className="bg-transparent"
              />
            </div>
          </div>
        ) : null}

        <div className="h-37.5" />
      </div>
    </section>
  );
};
