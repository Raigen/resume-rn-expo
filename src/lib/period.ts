import type { Period, YearMonth } from '@/data/resume';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatYearMonth({ year, month }: YearMonth) {
  return `${MONTHS[month - 1]} ${year}`;
}

/** e.g. "Aug 2011 – Nov 2022" or "Dec 2022 – Present". */
export function formatPeriod(period: Period) {
  const end = period.end ? formatYearMonth(period.end) : 'Present';
  return `${formatYearMonth(period.start)} – ${end}`;
}

/** e.g. "Aug 2011 – Nov 2022" → "2011 – 2022". */
export function formatPeriodYears(period: Period) {
  return `${period.start.year} – ${period.end ? period.end.year : 'Present'}`;
}

/**
 * Inclusive duration of a period, e.g. Aug 2011 – Nov 2022 → "11 yrs 4 mos".
 * Open-ended periods are measured up to `now`.
 */
export function formatDuration(period: Period, now: Date = new Date()) {
  const end = period.end ?? { year: now.getFullYear(), month: now.getMonth() + 1 };
  const totalMonths = Math.max(
    (end.year - period.start.year) * 12 + (end.month - period.start.month) + 1,
    1
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ');
}
