import { fmt0 } from "@/lib/helpers/money";

type Props = {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: readonly any[];
  coordinate?: { x: number; y: number };
};

export const WorkingCapitalTooltip = ({
  active,
  payload,
  coordinate,
}: Props) => {
  console.log(active, payload, coordinate);

  const raw = payload?.[0]?.value;

  if (!active || !coordinate || raw == null) return null;

  const value = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(value)) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: coordinate.x,
        top: 6,
        transform: "translateX(-50%)",
      }}
      className="z-50"
    >
      <div className="relative inline-flex">
        <div className="bg-surface-cool text-granite ring-border-soft rounded-lg px-3 py-2 text-xs font-medium shadow-sm ring-1">
          {fmt0(value, "USD")}
        </div>

        <span className="border-t-surface-cool absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent" />
      </div>
    </div>
  );
};
