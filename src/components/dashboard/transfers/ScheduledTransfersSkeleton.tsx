import { cn } from "@/lib/utils";

const DASHBOARD_LIMIT = 5;

const ScheduledTransfersHeaderSkeleton = () => (
  <div className="mb-4 flex items-center justify-between">
    <div className="bg-border-soft h-6 w-48 animate-pulse rounded" />
    <div className="bg-border-soft h-5 w-20 animate-pulse rounded" />
  </div>
);

const RowSkeleton = () => {
  return (
    <li>
      <div
        className={cn(
          "flex w-full items-center justify-between gap-6 px-1 pt-3 pb-3.75",
        )}
      >
        <div className="flex min-w-0 items-center gap-3.75">
          <span className="bg-surface-2 relative size-10 shrink-0 animate-pulse overflow-hidden rounded-full" />

          <div className="min-w-0 space-y-2">
            <div className="bg-border-soft h-4 w-40 animate-pulse rounded" />
            <div className="bg-border-soft/60 h-3 w-56 animate-pulse rounded" />
          </div>
        </div>

        <div className="shrink-0 space-y-2 text-right">
          <div className="bg-border-soft h-4 w-24 animate-pulse rounded" />
        </div>
      </div>
    </li>
  );
};

type Props = {
  rows?: number;
};

const ScheduledTransfersSkeleton = ({ rows = DASHBOARD_LIMIT }: Props) => {
  return (
    <section className="rounded-[10px]">
      <ScheduledTransfersHeaderSkeleton />

      <ul className="divide-border-soft divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </ul>
    </section>
  );
};

export default ScheduledTransfersSkeleton;
