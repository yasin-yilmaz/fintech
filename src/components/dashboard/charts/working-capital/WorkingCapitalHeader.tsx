import { cn } from "@/lib/utils";

import { RangeSelect } from "@/components/ui/RangeSelect";

const LegendDot = ({ className }: { className?: string }) => (
  <span className={cn("inline-block size-2 rounded-full", className)} />
);

export const WorkingCapitalHeader = () => {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-granite text-base font-semibold">
          Working Capital
        </h3>
      </div>

      <div className="flex items-center gap-18">
        <div className="flex items-center gap-7.5">
          <div className="text-granite-muted flex items-center gap-2 text-xs font-medium">
            <LegendDot className="bg-(--color-accent-emerald)" />
            Income
          </div>
          <div className="text-granite-muted flex items-center gap-2 text-xs font-medium">
            <LegendDot className="bg-(--color-accent)" />
            Expense
          </div>
        </div>
        <RangeSelect defaultValue="7d" />
      </div>
    </div>
  );
};
