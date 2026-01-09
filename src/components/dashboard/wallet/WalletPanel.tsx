import { ViewAllLink } from "@/components/ui/ViewAllLink";

import { WalletCard } from "./WalletCard";

export const WalletPanel = () => {
  return (
    <section className="rounded-2xl bg-transparent">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-granite text-lg font-semibold">Wallet</h2>
        <ViewAllLink href="#" />
      </div>

      <div className="group relative">
        {/* Black Kart */}
        <div className="transition-transform duration-200 group-hover:-translate-y-1">
          <WalletCard
            company="Fintech."
            bank="Universal Bank"
            maskedNumber="5495 7381 3759 2321"
            expiry="04/24"
            brand="mastercard"
            tone="dark"
          />
        </div>

        {/* Transparent Card */}
        <div className="absolute top-40 left-1/2 w-[92%] -translate-x-1/2 transition-transform duration-200 group-hover:-translate-y-2">
          <div className="border-border-soft rounded-[15px] border bg-white/55 backdrop-blur-sm transition-all duration-200 group-hover:bg-white/70 group-hover:shadow-sm group-hover:backdrop-blur-none">
            <WalletCard
              company="Fintech."
              bank="Commercial Bank"
              maskedNumber="85952548****"
              expiry="09/25"
              brand="visa"
              tone="light"
              className="bg-transparent"
            />
          </div>
        </div>

        <div className="h-[150px]" />
      </div>
    </section>
  );
};
