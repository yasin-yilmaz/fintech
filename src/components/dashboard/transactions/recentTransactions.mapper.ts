import type { z } from "zod";

import { fmtDateLabel } from "@/lib/helpers/date";

import { recentTransactionsSuccessSchema } from "@/schemas/financial.schema";

import type { TRecentTransactionRow } from "./recentTransactions.types";

type TApiRecentTransaction = z.infer<
  typeof recentTransactionsSuccessSchema
>["data"]["transactions"][number];

export const toRecentTransactionRow = (
  t: TApiRecentTransaction,
): TRecentTransactionRow => {
  const title = t.name;
  const business = t.business;

  return {
    id: t.id,
    title,
    business,
    type: t.type,
    amount: t.amount,
    currency: t.currency,
    date: fmtDateLabel(t.date),
    logo: t.image
      ? { type: "image", src: t.image, alt: business || title }
      : { type: "fallback", letter: (title?.[0] ?? "?").toUpperCase() },
  };
};
