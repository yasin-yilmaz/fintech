import * as React from "react";

type Props = { rows: number };

const RecentTransactionsSkeleton = ({ rows }: Props) => {
  return (
    <div className="space-y-3 pt-5 pr-8 pl-6.25">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="bg-surface-warm flex items-center justify-between gap-4 rounded-lg px-4 py-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            {/* logo  */}
            <div className="bg-surface-2 size-10 animate-pulse rounded-xl" />

            <div className="min-w-0 space-y-2">
              {/* title line */}
              <div className="bg-border-soft h-4 w-40 animate-pulse rounded" />
              {/* subtitle line */}
              <div className="bg-border-soft/60 h-3 w-56 animate-pulse rounded" />
            </div>
          </div>

          <div className="space-y-2 text-right">
            {/* amount */}
            <div className="bg-border-soft h-4 w-24 animate-pulse rounded" />
            {/* date/status */}
            <div className="bg-border-soft/60 h-3 w-16 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactionsSkeleton;
