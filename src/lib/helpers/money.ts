import { getLocaleForCurrency } from "@/lib/helpers/currencyLocale";

export type TCurrency = "USD" | "EUR" | "TRY" | "GBP" | string;
export type TMoneyFlow = "income" | "outcome";

export type TMoneyFormatOptions = {
  locale?: string;
  maxFrac?: number;
};

/**
 * Formats a numeric amount as a localized currency string using `Intl.NumberFormat`.
 *
 * - If `locale` is not provided, it resolves a locale via `getLocaleForCurrency(currency, "en-US")`.
 * - Returns an empty string if `amount` is not a finite number.
 * - Falls back to `"${value.toLocaleString(locale)} ${currency}"` if Intl throws (e.g., invalid currency code).
 *
 * @param amount - Numeric amount to format.
 * @param currency - ISO 4217 currency code (e.g., "USD", "EUR", "TRY").
 * @param locale - Optional BCP 47 locale (e.g., "en-US", "tr-TR"). If omitted, it will be inferred.
 * @param maximumFractionDigits - Max fraction digits (default: 2).
 * @param currencyDisplay - How to display currency (default: "symbol"). ("symbol" | "code" | "name" | "narrowSymbol")
 * @returns Formatted currency string (or "" if amount is invalid).
 *
 * @example
 * fmtMoney(1234.5, "USD");           // "$1,234.50" (depending on inferred locale)
 * fmtMoney(1234.5, "EUR", "de-DE");  // "1.234,50 €"
 * fmtMoney(1234.5, "TRY", "tr-TR");  // "₺1.234,50"
 *
 * @example
 * // Keep 0 decimals (common for JPY):
 * fmtMoney(5000, "JPY", "ja-JP", 0);  // "￥5,000"
 *
 * @example
 * // Show currency code instead of symbol:
 * fmtMoney(99.9, "USD", "en-US", 2, "code"); // "USD 99.90"
 */
export const fmtMoney = (
  amount: number,
  currency: string,
  locale?: string,
  maximumFractionDigits = 2,
  currencyDisplay: Intl.NumberFormatOptions["currencyDisplay"] = "symbol",
) => {
  const value = Number(amount);
  const cur = String(currency ?? "").trim();

  if (!Number.isFinite(value)) return "";

  const resolvedLocale = locale ?? getLocaleForCurrency(cur, "en-US");

  try {
    return new Intl.NumberFormat(resolvedLocale, {
      style: "currency",
      currency: cur,
      currencyDisplay,
      maximumFractionDigits,
    }).format(value);
  } catch {
    return `${value.toLocaleString(resolvedLocale)} ${cur}`;
  }
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

/**
 * Normalizes common currency symbols into ISO 4217 currency codes.
 *
 * Use this when your UI/API can return currency as a symbol (e.g. "$", "€", "₺", "£")
 * but your formatting/logic expects an ISO code (e.g. "USD", "EUR", "TRY", "GBP").
 *
 * Notes:
 * - Trims whitespace.
 * - Returns an empty string for falsy/blank input.
 * - If the input is not one of the supported symbols, it returns the trimmed input as-is.
 *
 * @param currency - Currency input (symbol or ISO code), e.g. "$", "USD", " ₺ ".
 * @returns ISO 4217 currency code or the trimmed original value.
 *
 * @example
 * // Unknown symbol/value -> returned as-is (trimmed)
 * normalizeCurrency("CAD");  // "CAD"
 * normalizeCurrency("¥");    // "¥"
 */
export const normalizeCurrency = (currency: string) => {
  const v = String(currency ?? "").trim();
  if (!v) return "";
  if (v === "$") return "USD";
  if (v === "₺") return "TRY";
  if (v === "€") return "EUR";
  if (v === "£") return "GBP";
  return v;
};
