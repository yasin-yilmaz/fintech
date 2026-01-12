import type { Locale } from "date-fns";
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  endOfDay,
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
  startOfDay,
  subDays,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";

export type DateInput = Date | string | number;
export type DateLocale = Locale;

/**
 * Converts a Date-like input (Date | ISO string | timestamp) into a valid Date.
 * Returns `null` if input cannot be parsed into a valid date.
 *
 * Notes:
 * - String inputs are parsed via `parseISO`, so pass ISO strings.
 *
 * @param input - Date | ISO string | timestamp
 * @returns A valid Date instance or null
 *
 * @example
 * toDate("2025-01-12"); // Date(...)
 * toDate(1736640000000); // Date(...)
 * toDate("not-a-date"); // null
 */
export const toDate = (input: DateInput): Date | null => {
  const d =
    input instanceof Date
      ? input
      : typeof input === "string"
        ? parseISO(input)
        : new Date(input);

  return isValid(d) ? d : null;
};

/**
 * Current year number (e.g. 2026).
 *
 * @example
 * currentYear; // 2026
 */
export const currentYear = new Date().getFullYear();

/**
 * Formats a date input using a date-fns format pattern.
 * Returns an empty string if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param pattern - date-fns pattern (default: "dd.MM.yyyy")
 * @param locale - date-fns locale (default: enUS)
 * @returns Formatted date string or ""
 *
 * @example
 * formatDate("2025-01-12"); // "12.01.2025"
 * formatDate(new Date(), "yyyy/MM/dd"); // "2026/01/12"
 */
export const formatDate = (
  input: DateInput,
  pattern = "dd.MM.yyyy",
  locale: DateLocale = enUS,
) => {
  const d = toDate(input);
  if (!d) return "";
  return format(d, pattern, { locale });
};

/**
 * Formats a date input with both date + time.
 * A convenience wrapper around `formatDate`.
 *
 * @param input - Date | ISO string | timestamp
 * @param pattern - date-fns pattern (default: "dd.MM.yyyy HH:mm")
 * @param locale - date-fns locale (default: enUS)
 *
 * @example
 * formatDateTime("2025-01-12T14:30:00Z"); // e.g. "12.01.2025 17:30" (depends on TZ)
 */
export const formatDateTime = (
  input: DateInput,
  pattern = "dd.MM.yyyy HH:mm",
  locale: DateLocale = enUS,
) => formatDate(input, pattern, locale);

/**
 * Short date label for compact UI (e.g. chart axis).
 * Default pattern is "MMM dd" -> "Apr 17".
 *
 * @param input - Date | ISO string | timestamp
 * @param locale - date-fns locale (default: enUS)
 *
 * @example
 * fmtShortDate("2025-04-17"); // "Apr 17"
 */
export const fmtShortDate = (input: DateInput, locale: DateLocale = enUS) =>
  formatDate(input, "MMM dd", locale);

/**
 * Formats only the time part.
 *
 * @param input - Date | ISO string | timestamp
 * @param pattern - date-fns pattern (default: "HH:mm")
 * @param locale - date-fns locale (default: enUS)
 *
 * @example
 * formatTime("2025-01-12T09:05:00"); // "09:05"
 */
export const formatTime = (
  input: DateInput,
  pattern = "HH:mm",
  locale: DateLocale = enUS,
) => formatDate(input, pattern, locale);

/**
 * Human-friendly relative time label (e.g. "3 minutes ago", "in 2 days").
 * Returns empty string if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param locale - date-fns locale (default: enUS)
 *
 * @example
 * timeAgo(new Date(Date.now() - 60_000)); // "1 minute ago"
 */
export const timeAgo = (input: DateInput, locale: DateLocale = enUS) => {
  const d = toDate(input);
  if (!d) return "";
  return formatDistanceToNow(d, { addSuffix: true, locale });
};

/**
 * Returns the start of day (00:00:00.000) for a given date input.
 * Returns null if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @returns Date at start of day or null
 *
 * @example
 * dayStart("2025-01-12T18:10:00"); // 2025-01-12 00:00:00
 */
export const dayStart = (input: DateInput) => {
  const d = toDate(input);
  return d ? startOfDay(d) : null;
};

/**
 * Returns the end of day (23:59:59.999) for a given date input.
 * Returns null if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @returns Date at end of day or null
 *
 * @example
 * dayEnd("2025-01-12"); // 2025-01-12 23:59:59.999
 */
export const dayEnd = (input: DateInput) => {
  const d = toDate(input);
  return d ? endOfDay(d) : null;
};

/**
 * Adds days to a date input safely.
 * Returns null if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param amount - number of days to add (can be negative)
 * @returns New Date or null
 *
 * @example
 * addDaysSafe("2025-01-12", 7); // 2025-01-19
 */
export const addDaysSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? addDays(d, amount) : null;
};

/**
 * Subtracts days from a date input safely.
 * Returns null if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param amount - number of days to subtract
 * @returns New Date or null
 *
 * @example
 * subDaysSafe("2025-01-12", 7); // 2025-01-05
 */
export const subDaysSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? subDays(d, amount) : null;
};

/**
 * Adds months to a date input safely.
 * Returns null if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param amount - number of months to add (can be negative)
 * @returns New Date or null
 *
 * @example
 * addMonthsSafe("2025-01-12", 1); // 2025-02-12
 */
export const addMonthsSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? addMonths(d, amount) : null;
};

/**
 * Subtracts months from a date input safely.
 * Returns null if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param amount - number of months to subtract
 * @returns New Date or null
 *
 * @example
 * subMonthsSafe("2025-01-12", 1); // 2024-12-12
 */
export const subMonthsSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? subMonths(d, amount) : null;
};

/**
 * Calculates difference in whole days between two date inputs.
 * Returns null if either input is invalid.
 *
 * Notes:
 * - Uses date-fns `differenceInDays(a, b)` (a - b).
 *
 * @param a - Date | ISO string | timestamp
 * @param b - Date | ISO string | timestamp
 * @returns Number of days or null
 *
 * @example
 * diffDays("2025-01-12", "2025-01-10"); // 2
 */
export const diffDays = (a: DateInput, b: DateInput) => {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) return null;
  return differenceInDays(d1, d2);
};

/**
 * Calculates difference in whole hours between two date inputs.
 * Returns null if either input is invalid.
 *
 * Notes:
 * - Uses date-fns `differenceInHours(a, b)` (a - b).
 *
 * @param a - Date | ISO string | timestamp
 * @param b - Date | ISO string | timestamp
 * @returns Number of hours or null
 *
 * @example
 * diffHours("2025-01-12T10:00:00", "2025-01-12T08:00:00"); // 2
 */
export const diffHours = (a: DateInput, b: DateInput) => {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) return null;
  return differenceInHours(d1, d2);
};

/**
 * Calculates difference in whole minutes between two date inputs.
 * Returns null if either input is invalid.
 *
 * Notes:
 * - Uses date-fns `differenceInMinutes(a, b)` (a - b).
 *
 * @param a - Date | ISO string | timestamp
 * @param b - Date | ISO string | timestamp
 * @returns Number of minutes or null
 *
 * @example
 * diffMinutes(Date.now(), Date.now() - 90_000); // 1 (rounded down by date-fns)
 */
export const diffMinutes = (a: DateInput, b: DateInput) => {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) return null;
  return differenceInMinutes(d1, d2);
};

/**
 * UI-friendly date label (e.g. "14 Apr 2022").
 *
 * @param input - Date | ISO string | timestamp
 * @param locale - date-fns locale (default: enUS)
 * @param pattern - date-fns pattern (default: "dd MMM yyyy")
 *
 * @example
 * fmtDateLabel("2025-04-14"); // "14 Apr 2025"
 */
export const fmtDateLabel = (
  input: DateInput,
  locale: DateLocale = enUS,
  pattern = "dd MMM yyyy",
) => formatDate(input, pattern, locale);

/**
 * UI-friendly date-time label (e.g. "April 28, 2022 at 11:00").
 * Returns empty string if input is invalid.
 *
 * @param input - Date | ISO string | timestamp
 * @param locale - date-fns locale (default: enUS)
 * @returns Formatted label or ""
 *
 * @example
 * fmtDateTimeLabel("2025-01-12T11:00:00"); // "January 12, 2025 at 11:00"
 */
export const fmtDateTimeLabel = (
  input: DateInput,
  locale: DateLocale = enUS,
) => {
  const d = toDate(input);
  if (!d) return "";
  const date = format(d, "MMMM dd, yyyy", { locale });
  const time = format(d, "HH:mm", { locale });
  return `${date} at ${time}`;
};
