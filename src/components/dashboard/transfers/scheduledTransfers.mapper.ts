import type { z } from "zod";

import { fmtDateTimeLabel } from "@/lib/helpers/date";
import { normalizeCurrency } from "@/lib/helpers/money";

import { scheduledTransfersSuccessSchema } from "@/schemas/financial.schema";

import type { TTransferItem } from "./scheduledTransfers.types";

type TApiTransfer = z.infer<
  typeof scheduledTransfersSuccessSchema
>["data"]["transfers"][number];

export const toTransferItem = (t: TApiTransfer): TTransferItem => {
  const amount = Math.abs(t.amount);

  return {
    id: t.id,
    name: t.name,
    dateText: fmtDateTimeLabel(t.date),
    amount,
    type: t.amount < 0 ? "outcome" : "income",
    currency: normalizeCurrency(t.currency),
    avatarSrc: t.image,
  };
};
