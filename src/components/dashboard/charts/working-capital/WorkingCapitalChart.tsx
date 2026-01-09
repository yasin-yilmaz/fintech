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

import { fmtShortDate } from "@/lib/helpers/date";
import { abbrK } from "@/lib/helpers/money";
import { cn } from "@/lib/utils";

import type { TRangeKey } from "@/components/ui/RangeSelect";

import { WORKING_CAPITAL_DATA } from "./workingCapital.data";
import { WorkingCapitalCursor } from "./WorkingCapitalCursor";
import { WorkingCapitalHeader } from "./WorkingCapitalHeader";
import { WorkingCapitalTooltip } from "./WorkingCapitalTooltip";

const RANGE_DAYS: Record<TRangeKey, number> = {
  "7d": 7,
  "3m": 90,
  "6m": 180,
  "1y": 365,
};

export const WorkingCapitalChart = ({ className }: { className?: string }) => {
  const [range, setRange] = React.useState<TRangeKey>("7d");
  const days = RANGE_DAYS[range];

  const chartData = React.useMemo(() => {
    if (WORKING_CAPITAL_DATA.length <= days) return WORKING_CAPITAL_DATA;
    return WORKING_CAPITAL_DATA.slice(-days);
  }, [days]);

  return (
    <section
      className={cn(
        "ring-border-soft rounded-2xl bg-white p-6 ring-1",
        className,
      )}
    >
      <WorkingCapitalHeader range={range} onRangeChange={setRange} />

      <div className="h-60 overflow-visible">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
              tickFormatter={abbrK}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={28}
              tick={{ fill: "var(--color-steel)", fontSize: 12 }}
              tickFormatter={(v) => fmtShortDate(v)}
            />

            <Tooltip
              content={(props) => <WorkingCapitalTooltip {...props} />}
              cursor={<WorkingCapitalCursor />}
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
