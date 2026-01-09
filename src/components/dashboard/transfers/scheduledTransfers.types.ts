import type { TCurrency } from "@/lib/helpers/money";

export type TTransferItem = {
  id: string;
  name: string;
  dateText: string;
  amount: number;
  type: "income" | "outcome";
  currency: TCurrency;
  avatarSrc: string;
};
