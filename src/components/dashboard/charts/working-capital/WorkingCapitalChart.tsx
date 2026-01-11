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

import { abbrK } from "@/lib/helpers/money";
import { cn } from "@/lib/utils";

import type { TWorkingCapitalView } from "./workingCapital.types";
import { WorkingCapitalCursor } from "./WorkingCapitalCursor";
import { WorkingCapitalHeader } from "./WorkingCapitalHeader";
import { WorkingCapitalTooltip } from "./WorkingCapitalTooltip";

type Props = {
  view: TWorkingCapitalView;
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActiveDot = (props: any) => {
  const { cx, cy, r, fill, stroke, strokeWidth } = props;
  if (cx == null || cy == null) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={r ?? 5}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      filter="url(#wc-dot-shadow)"
    />
  );
};

export const WorkingCapitalChart = ({ view, className }: Props) => {
  const data = React.useMemo(() => view.points ?? [], [view.points]);

  const yMax = React.useMemo(() => {
    const max = data.reduce((m, p) => Math.max(m, p.income, p.expense), 0);
    const padded = Math.ceil(max * 1.1);
    return padded > 0 ? padded : 10_000;
  }, [data]);

  return (
    <section
      className={cn(
        "ring-border-soft rounded-2xl bg-white p-6 ring-1",
        className,
      )}
    >
      <WorkingCapitalHeader />

      <div className="h-60 overflow-visible">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <filter
                id="wc-dot-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="4"
                  floodColor="#686868"
                  floodOpacity="0.24"
                />
              </filter>
            </defs>
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="var(--color-border-soft)"
              strokeOpacity={0.7}
            />

            <YAxis
              width={46}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-steel)", fontSize: 12 }}
              domain={[0, yMax]}
              tickFormatter={abbrK}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={18}
              tick={{ fill: "var(--color-steel)", fontSize: 12 }}
            />

            <Tooltip
              content={(props) => (
                <WorkingCapitalTooltip {...props} currency={view.currency} />
              )}
              cursor={<WorkingCapitalCursor />}
              wrapperStyle={{
                outline: "none",
                zIndex: 50,
                pointerEvents: "none",
              }}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--color-accent-emerald)"
              strokeWidth={2}
              dot={false}
              activeDot={
                <ActiveDot
                  r={5}
                  fill="var(--color-accent-emerald)"
                  stroke="white"
                  strokeWidth={2}
                />
              }
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              activeDot={
                <ActiveDot
                  r={5}
                  fill="var(--color-accent)"
                  stroke="white"
                  strokeWidth={2}
                />
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
