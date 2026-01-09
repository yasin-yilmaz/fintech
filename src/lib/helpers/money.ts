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

/**
 * Format currency with 0 fraction digits (common for dashboards).
 *
 * @example
 * fmt0(4200, "USD") -> "$4,200"
 * fmt0(4200, "TRY", { locale: "tr-TR" }) -> "₺4.200"
 */
export const fmt0 = (
  amount: number,
  currency: TCurrency,
  opts: Omit<TMoneyFormatOptions, "maxFrac"> = {},
) => fmt(amount, currency, { ...opts, maxFrac: 0 });

type TAbbrOptions = {
  locale?: string;
  /**
   * decimals shown after abbreviation
   * @default 0
   */
  frac?: number;
  /**
   * suffixes for thousand/million/billion
   * @default { k: "K", m: "M", b: "B" }
   */
  suffix?: { k?: string; m?: string; b?: string };
};

/**
 * Abbreviate large numbers for charts: 1200 -> "1K", 1500000 -> "2M".
 * (Rounded, configurable decimals.)
 *
 * @example
 * abbr(0) -> "0K" (when min is K) => use abbrK for exact fmtK behavior
 * abbr(1200) -> "1K"
 * abbr(1540, { frac: 1 }) -> "1.5K"
 * abbr(2_600_000) -> "3M"
 */
export const abbr = (n: number, opts: TAbbrOptions = {}) => {
  const { locale = "en-US", frac = 0, suffix } = opts;
  const sfx = { k: "K", m: "M", b: "B", ...(suffix ?? {}) };

  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";

  const fmtNum = (val: number) =>
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: frac,
      minimumFractionDigits: frac,
    }).format(val);

  if (abs >= 1_000_000_000)
    return `${sign}${fmtNum(abs / 1_000_000_000)}${sfx.b}`;
  if (abs >= 1_000_000) return `${sign}${fmtNum(abs / 1_000_000)}${sfx.m}`;
  if (abs >= 1_000) return `${sign}${fmtNum(abs / 1_000)}${sfx.k}`;

  // small numbers: no suffix
  return `${sign}${fmtNum(abs)}`;
};

/**
 * Chart helper: replicate your old fmtK exactly.
 * 0 -> "0K", 4200 -> "4K"
 */
export const abbrK = (n: number) => {
  if (n === 0) return "0K";
  return `${Math.round(n / 1000)}K`;
};
