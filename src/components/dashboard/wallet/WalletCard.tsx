import { cn } from "@/lib/utils";

import { ChipCardIcon } from "@/components/icons/ChipCardIcon";
import { ContactlessIcon } from "@/components/icons/ContactlessIcon";
import { MastercardLogo } from "@/components/icons/MastercardLogo";
import { VisaLogo } from "@/components/icons/VisaLogo";

type TCardBrand = "visa" | "mastercard";
type TCardTone = "dark" | "light";

type Props = {
  company: string;
  bank: string;
  maskedNumber: string;
  expiry: string;
  brand: TCardBrand;
  tone?: TCardTone;
  className?: string;
};

export const WalletCard = ({
  company,
  bank,
  maskedNumber,
  expiry,
  brand,
  tone = "dark",
  className,
}: Props) => {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[15px] pt-4.5 pr-6.25 pb-5 pl-7.5",
        "min-h-52.5 w-full",
        isDark
          ? "bg-[linear-gradient(135deg,#4A4A49_0%,#20201F_100%)] text-white"
          : "text-granite bg-[linear-gradient(180deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0.10)_100%)]/10",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(120%_90%_at_15%_10%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_55%)]"
            : "bg-[radial-gradient(120%_90%_at_15%_10%,rgba(27,33,45,0.06)_0%,rgba(27,33,45,0)_55%)]",
        )}
      />

      {/* Header */}
      <div className="relative flex items-center gap-3">
        <p className="text-base">{company}</p>
        <span
          className={cn(
            "h-5 w-px",
            isDark ? "bg-granite-neutral-2" : "bg-granite-soft",
          )}
        />
        <p
          className={cn(
            "text-sm font-medium",
            isDark ? "text-granite-neutral-2" : "text-granite-muted",
          )}
        >
          {bank}
        </p>
      </div>

      {/* Chip and wifi */}
      <div className="relative mt-6 flex items-center justify-between">
        <ChipCardIcon
          className="text-stone"
          secondaryClassName="text-granite-charcoal"
        />

        <ContactlessIcon className="text-granite-mid" />
      </div>

      {/* Numbers */}
      <div className="mt-6 space-y-3">
        <p className="relative text-[17px] font-bold tracking-[0.18em]">
          {maskedNumber}
        </p>
        <p
          className={cn(
            "text-sm font-medium",
            isDark ? "text-granite-muted-2" : "text-granite",
          )}
        >
          {expiry}
        </p>
      </div>

      {/* Footer */}
      <div className="relative mt-0.75 flex items-end justify-end">
        {brand === "visa" ? <VisaLogo /> : <MastercardLogo />}
      </div>
    </div>
  );
};
