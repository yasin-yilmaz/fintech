import type { z } from "zod";

import { walletSuccessSchema } from "@/schemas/financial.schema";

type TApiWalletCard = z.infer<
  typeof walletSuccessSchema
>["data"]["cards"][number];

type TCardBrand = "visa" | "mastercard";

export type TWalletCardView = {
  id: string;
  company: string;
  bank: string;
  maskedNumber: string;
  expiry: string;
  brand: TCardBrand;
  tone: "dark" | "light";
};

const splitCompanyBank = (raw: string) => {
  const parts = raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length >= 2)
    return { company: parts[0], bank: parts.slice(1).join(" | ") };

  return { company: raw.trim(), bank: "" };
};

const toBrand = (network: string): TCardBrand => {
  const n = network.trim().toLowerCase();
  if (n.includes("master")) return "mastercard";
  return "visa";
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const toExpiry = (month: number, year: number) => {
  const mm = pad2(month);
  const yy = String(year).slice(-2);
  return `${mm}/${yy}`;
};

export const toWalletCardView = (c: TApiWalletCard): TWalletCardView => {
  const { company, bank } = splitCompanyBank(c.bank);
  const brand = toBrand(c.network);

  return {
    id: c.id,
    company,
    bank,
    maskedNumber: c.cardNumber,
    expiry: toExpiry(c.expiryMonth, c.expiryYear),
    brand,
    tone: c.isDefault ? "dark" : "light",
  };
};
