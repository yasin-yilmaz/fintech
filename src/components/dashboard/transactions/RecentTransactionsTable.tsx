"use client";

import { useMemo } from "react";

import { Receipt } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { EmptyState } from "@/components/ui/EmptyState";

import { recentTransactionsColumns } from "./RecentTransactions.columns";
import type { TRecentTransactionRow } from "./recentTransactions.types";

type Props = {
  data: TRecentTransactionRow[];
};

export const RecentTransactionsTable = ({ data }: Props) => {
  const columns = useMemo(() => recentTransactionsColumns, []);

  /* eslint-disable react-hooks/incompatible-library */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data || data.length === 0) {
    return (
      <div className="pt-5 pr-8 pl-6.25">
        <EmptyState icon={Receipt} title="No transactions yet" />
      </div>
    );
  }

  const isFirstCol = (colId: string) => colId === "name";

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-auto pt-5 pr-8 pl-6.25">
      <table className="w-max min-w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    "pb-3",
                    isFirstCol(header.column.id) ? "text-left" : "text-center",
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <tr
              key={row.id}
              className={cn(
                "hover:bg-surface-hover/40 transition-colors",
                idx !== 0 && "border-border-soft border-t",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={cn(
                    "min-h-10 px-1 py-4 align-middle whitespace-nowrap",
                    isFirstCol(cell.column.id) ? "text-left" : "text-center",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
