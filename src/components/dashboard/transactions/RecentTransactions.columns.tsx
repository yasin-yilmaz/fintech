import * as React from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { fmtMoney } from "@/lib/helpers/money";
import { cn } from "@/lib/utils";

import { BrandLogo } from "@/components/ui/BrandLogo";

import type { TRecentTransactionRow } from "./recentTransactions.types";

const TableHeaderLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "text-steel line-clamp-1 text-xs font-semibold tracking-wide",
      className,
    )}
  >
    {children}
  </span>
);

export const recentTransactionsColumns: ColumnDef<TRecentTransactionRow>[] = [
  {
    id: "name",
    header: () => <TableHeaderLabel>NAME/BUSINESS</TableHeaderLabel>,
    cell: ({ row }) => {
      const r = row.original;

      return (
        <div className="flex items-center gap-4">
          <div className="bg-surface-2 relative grid size-10 place-items-center overflow-hidden rounded-xl">
            {r.logo.type === "image" ? (
              <BrandLogo
                src={r?.logo?.src}
                alt={r?.logo?.alt ?? r.title}
                fill
                className="object-contain"
              />
            ) : (
              <span className="text-granite text-lg font-semibold">
                {r.logo.letter}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-granite truncate text-sm font-semibold">
              {r.title}
            </div>
            <div className="text-steel truncate text-xs">{r.business}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => <TableHeaderLabel>TYPE</TableHeaderLabel>,
    cell: ({ getValue }) => (
      <span className="text-granite-muted text-sm">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <TableHeaderLabel>AMOUNT</TableHeaderLabel>,
    cell: ({ row, getValue }) => {
      const amount = Number(getValue());
      return (
        <span className="text-granite text-sm font-semibold">
          {fmtMoney(amount, row.original.currency)}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <TableHeaderLabel>DATE</TableHeaderLabel>,
    cell: ({ getValue }) => (
      <span className="text-granite-muted text-sm">{String(getValue())}</span>
    ),
  },
];
