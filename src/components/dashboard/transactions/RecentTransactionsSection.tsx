"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { getRecentTransactions } from "@/lib/api/financial/actions";
import { cn } from "@/lib/utils";

import { toRecentTransactionRow } from "./recentTransactions.mapper";
import RecentTransactionsSkeleton from "./RecentTransactions.skeleton";
import type { TRecentTransactionRow } from "./recentTransactions.types";
import { RecentTransactionsHeader } from "./RecentTransactionsHeader";
import { RecentTransactionsTable } from "./RecentTransactionsTable";

const COMPACT_LIMIT = 3;
const FULL_LIMIT = 20;

export const RecentTransactionsSection = () => {
  const [isFull, setIsFull] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState<TRecentTransactionRow[]>([]);

  const limit = isFull ? FULL_LIMIT : COMPACT_LIMIT;

  const load = useCallback(() => {
    startTransition(async () => {
      const res = await getRecentTransactions(limit);

      if (res.success) {
        setRows(res.data.transactions.map(toRecentTransactionRow));
        return;
      }

      setRows([]);
    });
  }, [limit]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = () => setIsFull((v) => !v);

  return (
    <div className={cn("min-w-0", isFull && "fixed inset-0 z-50")}>
      {isFull && (
        <div className="absolute inset-0 bg-black/50" onClick={toggle} />
      )}

      <section
        className={cn(
          "border-border-soft relative min-w-0 rounded-[10px] border bg-transparent py-5",
          isFull &&
            "bg-surface-2 mx-auto mt-6 h-[calc(100vh-48px)] w-[min(1200px,calc(100vw-24px))] overflow-hidden",
        )}
      >
        <RecentTransactionsHeader isFull={isFull} onToggle={toggle} />

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
