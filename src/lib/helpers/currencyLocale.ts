export type TLocale = string;

const CURRENCY_LOCALE_MAP: Record<string, TLocale> = {
  TRY: "tr-TR",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  CHF: "de-CH",
  JPY: "ja-JP",
};

export const getLocaleForCurrency = (
  currency: string,
  fallback: TLocale = "en-US",
) => {
  const cur = String(currency ?? "")
    .trim()
    .toUpperCase();
  return CURRENCY_LOCALE_MAP[cur] ?? fallback;
};
