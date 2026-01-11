"use client";

import * as React from "react";

import { Maximize2, Minimize2 } from "lucide-react";

import { getRecentTransactions } from "@/lib/api/financial/actions";
import { cn } from "@/lib/utils";

import { ViewAllLink } from "@/components/ui/ViewAllLink";

import { toRecentTransactionRow } from "./recentTransactions.mapper";
import RecentTransactionsSkeleton from "./RecentTransactions.skeleton";
import type { TRecentTransactionRow } from "./recentTransactions.types";
import { RecentTransactionsTable } from "./RecentTransactionsTable";

const COMPACT_LIMIT = 3;
const FULL_LIMIT = 20;

export const RecentTransactionsSection = () => {
  const [isFull, setIsFull] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [rows, setRows] = React.useState<TRecentTransactionRow[]>([]);

  const limit = isFull ? FULL_LIMIT : COMPACT_LIMIT;

  const load = React.useCallback(() => {
    startTransition(async () => {
      const res = await getRecentTransactions(limit);

      if (res.success) {
        setRows(res.data.transactions.map(toRecentTransactionRow));
        return;
      }

      setRows([]);
    });
  }, [limit]);

  React.useEffect(() => {
    load();
  }, [load]);

  const toggle = () => setIsFull((v) => !v);

  return (
    <div className={cn(isFull && "fixed inset-0 z-50")}>
      {isFull && (
        <div className="absolute inset-0 bg-black/50" onClick={toggle} />
      )}

      <section
        className={cn(
          "border-border-soft relative rounded-[10px] border bg-transparent py-5",
          isFull &&
            "bg-surface-2 mx-auto mt-6 h-[calc(100vh-48px)] w-[min(1200px,calc(100vw-24px))] overflow-hidden",
        )}
      >
        {/* HEADER */}
        <header className="flex items-center justify-between pr-4.75 pl-6.25">
          <h2 className="text-granite text-lg font-semibold">
            Recent Transaction
          </h2>

          <ViewAllLink
            as="button"
            label={isFull ? "Exit" : "View All"}
            onClick={toggle}
          />
        </header>

        {/* BODY */}
        <div className={cn(isFull && "h-[calc(100%-48px)] overflow-auto")}>
          {isPending && rows.length === 0 ? (
            <RecentTransactionsSkeleton rows={limit} />
          ) : (
            <RecentTransactionsTable data={rows} />
          )}
        </div>
      </section>
    </div>
  );
};
