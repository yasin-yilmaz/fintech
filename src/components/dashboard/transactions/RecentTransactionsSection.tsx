import { getRecentTransactions } from "@/lib/api/financial/actions";

import { toRecentTransactionRow } from "./recentTransactions.mapper";
import type { TRecentTransactionRow } from "./recentTransactions.types";
import { RecentTransactionsSectionClient } from "./RecentTransactionsSectionClient";

const COMPACT_LIMIT = 3;

export const RecentTransactionsSection = async () => {
  const res = await getRecentTransactions(COMPACT_LIMIT);

  const initialRows: TRecentTransactionRow[] = res.success
    ? res.data.transactions.map(toRecentTransactionRow)
    : [];

  return (
    <RecentTransactionsSectionClient
      initialRows={initialRows}
      initialError={!res.success}
    />
  );
};
