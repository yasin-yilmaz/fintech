"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { getRecentTransactions } from "@/lib/api/financial/actions";
import { cn } from "@/lib/utils";

import { Portal } from "@/components/ui/Portal";

import { toRecentTransactionRow } from "./recentTransactions.mapper";
import RecentTransactionsSkeleton from "./RecentTransactions.skeleton";
import type { TRecentTransactionRow } from "./recentTransactions.types";
import { RecentTransactionsHeader } from "./RecentTransactionsHeader";
import { RecentTransactionsTable } from "./RecentTransactionsTable";

const COMPACT_LIMIT = 3;
const FULL_LIMIT = 20;

type Props = {
  initialRows: TRecentTransactionRow[];
  initialError?: boolean;
};

export const RecentTransactionsSectionClient = ({
  initialRows,
  initialError = false,
}: Props) => {
  const [isFull, setIsFull] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [rows, setRows] = useState<TRecentTransactionRow[]>(initialRows);
  const [hasError, setHasError] = useState(initialError);

  // ✅ render tetiklemeden "ilk kez mi?" bilgisini tut
  const didMountRef = useRef(false);

  useEffect(() => {
    // ✅ ilk render'da server'dan gelen initialRows yeterli
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const limit = isFull ? FULL_LIMIT : COMPACT_LIMIT;

    startTransition(async () => {
      const res = await getRecentTransactions(limit);

      if (res.success) {
        setRows(res.data.transactions.map(toRecentTransactionRow));
        setHasError(false);
        return;
      }

      setHasError(true);
    });
  }, [isFull, startTransition]);

  const toggle = () => setIsFull((v) => !v);

  return (
    <>
      {/* normal (compact) görünüm */}
      {!isFull ? (
        <section className="border-border-soft relative min-w-0 rounded-[10px] border bg-transparent py-4 sm:py-5">
          <RecentTransactionsHeader isFull={isFull} onToggle={toggle} />
          {isPending && rows.length === 0 ? (
            <RecentTransactionsSkeleton rows={COMPACT_LIMIT} />
          ) : (
            <RecentTransactionsTable data={hasError ? [] : rows} />
          )}
        </section>
      ) : null}

      {/* fullscreen overlay */}
      {isFull ? (
        <Portal>
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={toggle} />

            <section
              className={cn(
                "border-border-soft relative mx-auto mt-6 h-[calc(100vh-48px)]",
                "bg-surface-2 w-[min(1200px,calc(100vw-16px))] overflow-hidden rounded-[10px] border py-4 sm:py-5",
                "sm:w-[min(1200px,calc(100vw-24px))]",
              )}
            >
              <RecentTransactionsHeader isFull={isFull} onToggle={toggle} />

              <div className="h-[calc(100%-48px)] overflow-auto">
                {isPending && rows.length === 0 ? (
                  <RecentTransactionsSkeleton rows={FULL_LIMIT} />
                ) : (
                  <RecentTransactionsTable data={hasError ? [] : rows} />
                )}
              </div>
            </section>
          </div>
        </Portal>
      ) : null}
    </>
  );
};
