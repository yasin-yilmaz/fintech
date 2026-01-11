import { fmtMoney } from "@/lib/helpers/money";

type Props = {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: readonly any[];
  coordinate?: { x: number; y: number };
  currency: string;
};

export const WorkingCapitalTooltip = ({
  active,
  payload,
  coordinate,
  currency,
}: Props) => {
  if (!active || !coordinate || !payload?.length) return null;

  const row = payload[0]?.payload as
    | { income?: number; expense?: number; net?: number }
    | undefined;

  const income = Number(row?.income ?? 0);
  const expense = Number(row?.expense ?? 0);
  const net = Number(row?.net ?? income - expense);

  if (![income, expense, net].every(Number.isFinite)) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: coordinate.x,
        top: -20,
        transform: "translateX(-50%)",
      }}
      className="z-50"
    >
      <div className="relative inline-flex">
        <div className="bg-surface-cool text-granite ring-border-soft rounded-lg px-2.5 py-2 shadow-sm ring-1">
          <div className="space-y-1 text-xs leading-[1.1] font-medium">
            <div className="flex items-center justify-between gap-3">
              <span className="text-steel">Inc:</span>
              <span className="text-granite">{fmtMoney(income, currency)}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-steel">Exp:</span>
              <span className="text-granite">
                {fmtMoney(expense, currency)}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between gap-3 border-t border-(--color-border-soft) pt-1">
              <span className="text-steel">Net:</span>
              <span className="text-granite font-semibold">
                {fmtMoney(net, currency)}
              </span>
            </div>
          </div>
        </div>

        <span className="border-t-surface-cool absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent" />
      </div>
    </div>
  );
};
