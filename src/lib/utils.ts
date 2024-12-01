import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number | string) {
  if (!amount) return "";
  const parts = amount.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const parseNumber = (str: string) => {
  return str.replace(/,/g, "");
};

export const decimalScaleNumber = (
  number: number | string,
  decimal: number,
) => {
  const parts = number.toString().split(".");

  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, decimal);
  }

  return parts.join(".");
};

export const getCodePoints = (str: string) => {
  return Array.from(str)
    .map((char) => char.codePointAt(0)?.toString(16).padStart(4, "0"))
    .map((hex) => `\\u${hex}`)
    .join();
};

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};
