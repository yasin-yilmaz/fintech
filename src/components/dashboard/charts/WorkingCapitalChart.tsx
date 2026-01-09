"use client";

import * as React from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

import { RangeSelect, type TRangeKey } from "@/components/ui/RangeSelect";

import { WORKING_CAPITAL_DATA } from "./workingCapital.data";

const RANGE_DAYS: Record<TRangeKey, number> = {
  "7d": 7,
  "3m": 90,
  "6m": 180,
  "1y": 365,
};

const fmtShort = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
};

const fmtK = (n: number) => {
  if (n === 0) return "0K";
  return `${Math.round(n / 1000)}K`;
};

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const LegendDot = ({ className }: { className?: string }) => (
  <span className={cn("inline-block size-2 rounded-full", className)} />
);

type TooltipPayloadItem = { value: number };

const CustomTooltip = ({
  active,
  payload,
  coordinate,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  coordinate?: { x: number; y: number };
}) => {
  if (!active || !payload?.length || !coordinate) return null;

  const value = payload[0]?.value ?? 0;

  return (
    <div
      style={{
        position: "absolute",
        left: coordinate.x,
        top: 0,
        transform: "translateX(-50%)",
      }}
      className="z-50"
    >
      <div className="relative inline-flex">
        <div className="bg-surface-cool text-granite ring-border-soft rounded-lg px-3 py-2 text-xs font-medium shadow-sm ring-1">
          {fmtMoney(value)}
        </div>

        <span className="border-t-surface-cool absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent" />
      </div>
    </div>
  );
};

const CustomCursor = ({
  points,
  height,
}: {
  points?: { x: number; y: number }[];
  height?: number;
}) => {
  if (!points?.length || !height) return null;

  const x = points[0].x;
  const bandW = 48;
  const gradId = "wc-cursor-grad";

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAFBFE" stopOpacity={0} />
          <stop offset="100%" stopColor="#F2F6FC" stopOpacity={1} />
        </linearGradient>
      </defs>

      <rect
        x={x - bandW / 2}
        y={0}
        width={bandW}
        height={height}
        rx={12}
        ry={12}
        fill={`url(#${gradId})`}
      />
    </g>
  );
};

export const WorkingCapitalChart = ({ className }: { className?: string }) => {
  const [range, setRange] = React.useState<TRangeKey>("7d");

  const days = RANGE_DAYS[range];

  const chartData = React.useMemo(() => {
    if (WORKING_CAPITAL_DATA.length <= days) return WORKING_CAPITAL_DATA;
    return WORKING_CAPITAL_DATA.slice(-days);
  }, [days]);

  const lastIdxRef = React.useRef<number | null>(null);

  return (
    <section
      className={cn(
        "ring-border-soft rounded-2xl bg-white p-6 ring-1",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-granite text-base font-semibold">
          Working Capital
        </h3>

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

          <RangeSelect value={range} onChange={setRange} />
        </div>
      </div>

      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            onMouseMove={(state) => {
              const idx =
                typeof state?.activeTooltipIndex === "number"
                  ? state.activeTooltipIndex
                  : null;
              if (idx !== lastIdxRef.current) {
                lastIdxRef.current = idx;
                console.log("activeTooltipIndex:", idx);
              }
            }}
            onMouseLeave={() => {
              lastIdxRef.current = null;
              console.log("activeTooltipIndex: null");
            }}
          >
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="var(--color-border-soft)"
              strokeOpacity={0.7}
            />

            <YAxis
              width={38}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-steel)", fontSize: 12 }}
              domain={[0, 10000]}
              ticks={[0, 3000, 5000, 7000, 10000]}
              tickFormatter={fmtK}
            />

            <XAxis
              dataKey="date"
              tickMargin={14}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-steel)", fontSize: 12 }}
              tickFormatter={fmtShort}
              interval="preserveStartEnd"
              minTickGap={28}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={<CustomCursor />}
              position={{ x: 0, y: 0 }}
              wrapperStyle={{
                outline: "none",
                zIndex: 50,
                pointerEvents: "none",
              }}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#0F9D6A"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#6D5EF5",
                stroke: "white",
                strokeWidth: 2,
              }}
            />

            <Line
              type="monotone"
              dataKey="expenses"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
