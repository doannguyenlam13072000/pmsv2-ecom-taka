import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);

// Common date formats
export const DATE_FORMATS = {
    DATE: 'YYYY-MM-DD',
    DATETIME: 'YYYY-MM-DD HH:mm:ss',
    DATETIME_TZ: 'YYYY-MM-DD HH:mm:ss Z',
    TIME: 'HH:mm:ss',
    ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
    READABLE: 'MMMM D, YYYY',
    READABLE_TIME: 'MMMM D, YYYY [at] h:mm A',
    SHORT: 'MMM D, YYYY',
    SHORT_TIME: 'MMM D, YYYY h:mm A',
    TIME_ONLY: 'h:mm A',
    DATE_ONLY: 'MMM D',
    YEAR_MONTH: 'YYYY-MM',
    MONTH_DAY: 'MM-DD',
} as const;

// Timezone utilities
export const TIMEZONES = {
    UTC: 'UTC',
    EST: 'America/New_York',
    PST: 'America/Los_Angeles',
    GMT: 'Europe/London',
    JST: 'Asia/Tokyo',
} as const;

/**
 * Get current date/time in specified format and timezone
 */
export function getCurrentDate(format: string = DATE_FORMATS.DATETIME, timezone: string = TIMEZONES.UTC): string {
    return dayjs().tz(timezone).format(format);
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): number {
    return dayjs().valueOf();
}

/**
 * Format date to specified format
 */
export function formatDate(date: Date | string | number, format: string = DATE_FORMATS.DATETIME, timezone: string = TIMEZONES.UTC): string {
    return dayjs(date).tz(timezone).format(format);
}

/**
 * Parse date string to Date object
 */
export function parseDate(dateString: string, format?: string): Date {
    return format ? dayjs(dateString, format).toDate() : dayjs(dateString).toDate();
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(date: Date | string | number): string {
    return dayjs(date).fromNow();
}

/**
 * Get relative time to specific date
 */
export function getRelativeTimeTo(date: Date | string | number, toDate: Date | string | number): string {
    return dayjs(date).from(dayjs(toDate));
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs(), 'day');
}

/**
 * Check if date is yesterday
 */
export function isYesterday(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
}

/**
 * Check if date is tomorrow
 */
export function isTomorrow(date: Date | string | number): boolean {
    return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string | number): boolean {
    return dayjs(date).isBefore(dayjs());
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
    return dayjs(date).isAfter(dayjs());
}

/**
 * Check if date is between two dates
 */
export function isDateBetween(date: Date | string | number, start: Date | string | number, end: Date | string | number, unit: dayjs.OpUnitType = 'day'): boolean {
    return dayjs(date).isBetween(start, end, unit, '[]');
}

/**
 * Add time to date
 */
export function addTime(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): Date {
    return dayjs(date).add(amount, unit).toDate();
}

/**
 * Subtract time from date
 */
export function subtractTime(date: Date | string | number, amount: number, unit: dayjs.ManipulateType): Date {
    return dayjs(date).subtract(amount, unit).toDate();
}

/**
 * Get start of period (day, week, month, year)
 */
export function getStartOf(date: Date | string | number, unit: dayjs.OpUnitType): Date {
    return dayjs(date).startOf(unit).toDate();
}

/**
 * Get end of period (day, week, month, year)
 */
export function getEndOf(date: Date | string | number, unit: dayjs.OpUnitType): Date {
    return dayjs(date).endOf(unit).toDate();
}

/**
 * Get difference between two dates
 */
export function getDifference(date1: Date | string | number, date2: Date | string | number, unit: dayjs.OpUnitType = 'day'): number {
    return dayjs(date1).diff(dayjs(date2), unit);
}

/**
 * Get age from birth date
 */
export function getAge(birthDate: Date | string | number): number {
    return dayjs().diff(dayjs(birthDate), 'year');
}

/**
 * Check if year is leap year
 */
export function isLeapYear(year: number): boolean {
    return dayjs(`${year}-02-29`).isValid();
}

/**
 * Get days in month
 */
export function getDaysInMonth(year: number, month: number): number {
    return dayjs(`${year}-${month.toString().padStart(2, '0')}-01`).daysInMonth();
}

/**
 * Get week number of year
 */
export function getWeekOfYear(date: Date | string | number): number {
    return dayjs(date).week();
}

/**
 * Get quarter of year
 */
export function getQuarter(date: Date | string | number): number {
    return dayjs(date).quarter();
}

/**
 * Convert date to different timezone
 */
export function convertTimezone(date: Date | string | number, fromTimezone: string, toTimezone: string): Date {
    return dayjs(date).tz(fromTimezone).tz(toTimezone).toDate();
}

/**
 * Get business days between two dates (excluding weekends)
 */
export function getBusinessDays(startDate: Date | string | number, endDate: Date | string | number): number {
    let businessDays = 0;
    let current = dayjs(startDate);
    const end = dayjs(endDate);

    while (current.isSameOrBefore(end, 'day')) {
        const dayOfWeek = current.day();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
            businessDays++;
        }
        current = current.add(1, 'day');
    }

    return businessDays;
}

/**
 * Check if date is business day (not weekend)
 */
export function isBusinessDay(date: Date | string | number): boolean {
    const dayOfWeek = dayjs(date).day();
    return dayOfWeek !== 0 && dayOfWeek !== 6;
}

/**
 * Get next business day
 */
export function getNextBusinessDay(date: Date | string | number): Date {
    let nextDay = dayjs(date).add(1, 'day');
    while (!isBusinessDay(nextDay.toDate())) {
        nextDay = nextDay.add(1, 'day');
    }
    return nextDay.toDate();
}

/**
 * Get previous business day
 */
export function getPreviousBusinessDay(date: Date | string | number): Date {
    let prevDay = dayjs(date).subtract(1, 'day');
    while (!isBusinessDay(prevDay.toDate())) {
        prevDay = prevDay.subtract(1, 'day');
    }
    return prevDay.toDate();
}

/**
 * Format duration in human readable format
 */
export function formatDuration(milliseconds: number): string {
    return dayjs.duration(milliseconds).humanize();
}

/**
 * Get duration between two dates
 */
export function getDuration(startDate: Date | string | number, endDate: Date | string | number) {
    return dayjs.duration(dayjs(endDate).diff(dayjs(startDate)));
}

/**
 * Validate date string
 */
export function isValidDate(dateString: string, format?: string): boolean {
    return format ? dayjs(dateString, format, true).isValid() : dayjs(dateString).isValid();
}

/**
 * Get date range for last N days
 */
export function getLastNDays(n: number): { start: Date; end: Date } {
    const end = dayjs();
    const start = end.subtract(n, 'day');
    return {
        start: start.toDate(),
        end: end.toDate(),
    };
}

/**
 * Get date range for current month
 */
export function getCurrentMonthRange(): { start: Date; end: Date } {
    const now = dayjs();
    return {
        start: now.startOf('month').toDate(),
        end: now.endOf('month').toDate(),
    };
}

/**
 * Get date range for current year
 */
export function getCurrentYearRange(): { start: Date; end: Date } {
    const now = dayjs();
    return {
        start: now.startOf('year').toDate(),
        end: now.endOf('year').toDate(),
    };
}

// Export dayjs for advanced usage
export { dayjs }; 