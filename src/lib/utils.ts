import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number | string) {
  if (!amount) return ''
  const parts = amount.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const parseNumber = (str: string) => {
  return str.replace(/,/g, '')
}

export const decimalScaleNumber = (number: number | string, decimal: number) => {
  const parts = number.toString().split('.')

  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, decimal)
  }

  return parts.join('.')
}
