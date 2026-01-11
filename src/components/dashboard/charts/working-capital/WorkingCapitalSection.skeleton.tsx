export const WorkingCapitalSectionSkeleton = () => {
  return (
    <div className="space-y-5">
      {/* header placeholder */}
      <div className="flex items-start justify-between gap-4">
        <div className="h-4 w-36 rounded bg-zinc-100" />

        <div className="flex items-center gap-4">
          <div className="h-4 w-28 rounded bg-zinc-100" />
          <div className="h-9 w-24 rounded bg-zinc-100" />
        </div>
      </div>

      {/* chart placeholder */}
      <div className="h-60 w-full rounded-lg bg-zinc-100" />
    </div>
  );
};
