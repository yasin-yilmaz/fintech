import { cn } from "@/lib/utils";

const CardSkeleton = ({ isPrimary = false }: { isPrimary?: boolean }) => {
  return (
    <div
      className={cn(
        "min-h-26.25 rounded-[10px] px-5 py-6",
        isPrimary ? "bg-granite-dark" : "bg-surface-2",
      )}
    >
      <div className="flex items-center gap-3.75">
        <div
          className={cn(
            "grid size-10.5 place-items-center rounded-full",
            isPrimary ? "bg-granite-mid" : "bg-surface-warm",
          )}
        >
          <div className="size-5 animate-pulse rounded bg-white/20" />
        </div>

        <div className="min-w-0 space-y-2.5">
          <div
            className={cn(
              "h-4 w-28 animate-pulse rounded",
              isPrimary ? "bg-white/15" : "bg-granite/10",
            )}
          />

          <div
            className={cn(
              "h-7 w-40 animate-pulse rounded",
              isPrimary ? "bg-white/20" : "bg-granite/15",
            )}
          />
        </div>
      </div>
    </div>
  );
};

export const StatCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <CardSkeleton isPrimary />
      </div>

      <div className="col-span-12 lg:col-span-4">
        <CardSkeleton />
      </div>

      <div className="col-span-12 lg:col-span-4">
        <CardSkeleton />
      </div>
    </div>
  );
};
