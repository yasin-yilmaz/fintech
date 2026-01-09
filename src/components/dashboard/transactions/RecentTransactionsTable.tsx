"use client";

import { useMemo } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { ViewAllLink } from "@/components/ui/ViewAllLink";

import { recentTransactionsColumns } from "./RecentTransactions.columns";
import { RECENT_TRANSACTIONS } from "./recentTransactions.data";

export const RecentTransactionsTable = () => {
  const data = useMemo(() => RECENT_TRANSACTIONS, []);
  const columns = useMemo(() => recentTransactionsColumns, []);

  /* eslint-disable react-hooks/incompatible-library */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="border-border-soft rounded-[10px] border py-5">
      {/* TABLE HEADER */}
      <header className="flex items-center justify-between pr-4.75 pl-6.25">
        <h2 className="text-granite text-lg font-semibold">
          Recent Transaction
        </h2>

        <ViewAllLink href="#" />
      </header>

      {/* Table Wrapper */}
      <div className="overflow-x-auto pt-5 pr-8 pl-6.25">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="pb-3 text-left">
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
                  "transition-colors",
                  "hover:bg-surface-hover/40",
                  idx !== 0 && "border-border-soft border-t",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="min-h-10 px-1 py-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
