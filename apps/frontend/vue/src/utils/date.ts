import { DATE_FORMATS } from "@/constants";
import dayjs from "@/plugins/dayjs";

/**
 * Format a date to a specific string format.
 *
 * @param date - The date to format (string, Date, or timestamp).
 * @param format - Optional format string (default: "DD/MM/YYYY").
 * @returns Formatted date string.
 */
export function formatDate(date: string | Date | number, format = DATE_FORMATS.DISPLAY_DATE): string {
  return dayjs(date).format(format);
}

/**
 * Format a date with time.
 *
 * @param date - The date to format (string, Date, or timestamp).
 * @returns Formatted date and time string ("DD/MM/YYYY HH:mm").
 */
export function formatDateTime(date: string | Date | number): string {
  return dayjs(date).format(DATE_FORMATS.DATE_TIME);
}

/**
 * Get relative time from now (e.g., "5 minutes ago", "in 2 days").
 *
 * @param date - The date to compare from now.
 * @returns A human-readable relative time string.
 */
export function timeAgo(date: string | Date | number): string {
  return dayjs(date).fromNow();
}

/**
 * Convert a UTC date to local timezone (e.g., Australia/Sydney).
 *
 * @param date - UTC date input.
 * @returns Formatted local date and time string ("DD/MM/YYYY HH:mm").
 */
export function utcToLocal(date: string | Date | number): string {
  return dayjs.utc(date).local().format(DATE_FORMATS.DATE_TIME);
}

/**
 * Get the current date/time in Australia/Sydney timezone.
 *
 * @param format - Optional format string (default: "DD/MM/YYYY HH:mm:ss").
 * @returns Formatted date/time string in Australia timezone.
 */
export function getNow(format = DATE_FORMATS.FULL): string {
  return dayjs().tz("Australia/Sydney").format(format);
}
