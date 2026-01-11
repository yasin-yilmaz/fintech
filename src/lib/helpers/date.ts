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

export const toDate = (input: DateInput): Date | null => {
  const d =
    input instanceof Date
      ? input
      : typeof input === "string"
        ? parseISO(input)
        : new Date(input);

  return isValid(d) ? d : null;
};

export const currentYear = new Date().getFullYear();

export const formatDate = (
  input: DateInput,
  pattern = "dd.MM.yyyy",
  locale: DateLocale = enUS, // ✅ default enUS
) => {
  const d = toDate(input);
  if (!d) return "";
  return format(d, pattern, { locale });
};

export const formatDateTime = (
  input: DateInput,
  pattern = "dd.MM.yyyy HH:mm",
  locale: DateLocale = enUS,
) => formatDate(input, pattern, locale);

/**
 * Short date label for compact UI (e.g. chart axis).
 * Default: "MMM dd" -> "Apr 17"
 */
export const fmtShortDate = (input: DateInput, locale: DateLocale = enUS) =>
  formatDate(input, "MMM dd", locale);

export const formatTime = (
  input: DateInput,
  pattern = "HH:mm",
  locale: DateLocale = enUS,
) => formatDate(input, pattern, locale);

export const timeAgo = (input: DateInput, locale: DateLocale = enUS) => {
  const d = toDate(input);
  if (!d) return "";
  return formatDistanceToNow(d, { addSuffix: true, locale });
};

export const dayStart = (input: DateInput) => {
  const d = toDate(input);
  return d ? startOfDay(d) : null;
};

export const dayEnd = (input: DateInput) => {
  const d = toDate(input);
  return d ? endOfDay(d) : null;
};

export const addDaysSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? addDays(d, amount) : null;
};

export const subDaysSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? subDays(d, amount) : null;
};

export const addMonthsSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? addMonths(d, amount) : null;
};

export const subMonthsSafe = (input: DateInput, amount: number) => {
  const d = toDate(input);
  return d ? subMonths(d, amount) : null;
};

export const diffDays = (a: DateInput, b: DateInput) => {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) return null;
  return differenceInDays(d1, d2);
};

export const diffHours = (a: DateInput, b: DateInput) => {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) return null;
  return differenceInHours(d1, d2);
};

export const diffMinutes = (a: DateInput, b: DateInput) => {
  const d1 = toDate(a);
  const d2 = toDate(b);
  if (!d1 || !d2) return null;
  return differenceInMinutes(d1, d2);
};

/**
 * UI-friendly date label (e.g. "14 Apr 2022" or TR locale with "14 Nis 2022")
 * Default locale: enUS
 * Default pattern: "dd MMM yyyy"
 */
export const fmtDateLabel = (
  input: DateInput,
  locale: DateLocale = enUS,
  pattern = "dd MMM yyyy",
) => formatDate(input, pattern, locale);

/**
 * UI-friendly date-time label (e.g. "April 28, 2022 at 11:00")
 * Default locale: enUS
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
