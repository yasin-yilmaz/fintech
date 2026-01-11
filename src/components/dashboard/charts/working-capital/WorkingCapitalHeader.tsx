import { cn } from "@/lib/utils";

import { RangeSelect } from "@/components/ui/RangeSelect";
import { SectionTitle } from "@/components/ui/SectionTitle";

const LegendDot = ({ className }: { className?: string }) => (
  <span className={cn("inline-block size-2 rounded-full", className)} />
);

export const WorkingCapitalHeader = () => {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <SectionTitle>Working Capital</SectionTitle>

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-18">
        <div className="flex items-center gap-7.5">
          <div className="text-granite-muted flex items-center gap-2 text-xs font-medium">
            <LegendDot className="bg-accent-emerald" />
            Income
          </div>
          <div className="text-granite-muted flex items-center gap-2 text-xs font-medium">
            <LegendDot className="bg-accent" />
            Expense
          </div>
        </div>

        <RangeSelect defaultValue="7d" />
      </div>
    </div>
  );
};
