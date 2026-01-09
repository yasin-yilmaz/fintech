export type TCurrency = "USD" | "EUR" | "TRY";
export type TMoneyFlow = "income" | "outcome";

export type TMoneyFormatOptions = {
  locale?: string;
  maxFrac?: number;
};

/**
 * Format a numeric amount as a localized currency string.
 *
 * @example
 * fmt(435, "USD") -> "$435.00"
 * fmt(435, "TRY", { locale: "tr-TR" }) -> "₺435,00"
 */
export const fmt = (
  amount: number,
  currency: TCurrency,
  opts: TMoneyFormatOptions = {},
) => {
  const { locale = "en-US", maxFrac = 2 } = opts;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: maxFrac,
  }).format(amount);
};

/**
 * Format an amount with a + / - sign based on flow type.
 *
 * @example
 * fmtSigned(435, "USD", "outcome") -> "- $435.00"
 * fmtSigned(1200, "EUR", "income") -> "+ €1,200.00"
 */
export const fmtSigned = (
  amount: number,
  currency: TCurrency,
  flow: TMoneyFlow,
  opts: TMoneyFormatOptions = {},
) => {
  const sign = flow === "outcome" ? "-" : "+";
  return `${sign} ${fmt(amount, currency, opts)}`;
};

/**
 * Convert a decimal amount to minor units (integer).
 * Use this to avoid floating-point issues in real financial logic.
 *
 * @example
 * toMinor(10.25) -> 1025
 * toMinor(10.2) -> 1020
 */
export const toMinor = (amount: number, frac: number = 2) => {
  const factor = 10 ** frac;
  return Math.round(amount * factor);
};

/**
 * Convert minor units (integer) back to decimal representation.
 *
 * @example
 * fromMinor(1025) -> 10.25
 */
export const fromMinor = (minor: number, frac: number = 2) => {
  const factor = 10 ** frac;
  return minor / factor;
};
