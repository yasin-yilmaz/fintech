import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const normalizeSrc = (
  src: string | null | undefined,
  fallback: string,
) => {
  const s = (src ?? "").trim();
  return s.length > 0 ? s : fallback;
};
