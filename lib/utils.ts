// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * This allows for conditional classes and proper merging of Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a delay using Promise
 * @param ms milliseconds to delay
 */
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

/**
 * Format number as currency
 * @param number Number to format
 * @param currency Currency code (default: 'USD')
 */
export const formatCurrency = (number: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(number)
}

/**
 * Format date to localized string
 * @param date Date to format
 * @param locale Locale code (default: 'en-US')
 */
export const formatDate = (date: Date, locale: string = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
