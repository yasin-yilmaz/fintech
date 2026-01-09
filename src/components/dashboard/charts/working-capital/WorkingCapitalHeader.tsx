import { cn } from "@/lib/utils";

import { RangeSelect, type TRangeKey } from "@/components/ui/RangeSelect";

const LegendDot = ({ className }: { className?: string }) => (
  <span className={cn("inline-block size-2 rounded-full", className)} />
);

type Props = {
  range: TRangeKey;
  onRangeChange: (v: TRangeKey) => void;
};

export const WorkingCapitalHeader = ({ range, onRangeChange }: Props) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h3 className="text-granite text-base font-semibold">Working Capital</h3>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="text-granite-muted flex items-center gap-2 text-xs font-medium">
            <LegendDot className="bg-emerald-600" />
            Income
          </div>
          <div className="text-granite-muted flex items-center gap-2 text-xs font-medium">
            <LegendDot className="bg-accent" />
            Expenses
          </div>
        </div>

        <RangeSelect value={range} onChange={onRangeChange} />
      </div>
    </div>
  );
};
