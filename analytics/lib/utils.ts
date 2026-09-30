import { format, subDays, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';

/**
 * Formátuje číslo s oddělovači tisíců.
 * Příklad: 123456 -> "123 456"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('cs-CZ').format(n);
}

/**
 * Formátuje milisekundy jako čitelný čas.
 * Příklad: 1234 -> "1,2 s" | 890 -> "890 ms"
 */
export function formatLoadTime(ms: number): string {
  if (ms === 0) return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)} s`;
  return `${Math.round(ms)} ms`;
}

/**
 * Vrátí defaultní date range (posledních N dní).
 */
export function getDefaultDateRange(days = 30): { since: string; until: string } {
  const until = new Date();
  const since = subDays(until, days);
  return {
    since: format(since, 'yyyy-MM-dd'),
    until: format(until, 'yyyy-MM-dd'),
  };
}

/**
 * Formátuje datum pro zobrazení v UI.
 */
export function formatDate(dateStr: string, fmt = 'd. M.'): string {
  try {
    return format(parseISO(dateStr), fmt, { locale: cs });
  } catch {
    return dateStr;
  }
}

/**
 * Vrátí emoji vlajky pro kód země.
 */
export function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  const codePoints = [...code.toUpperCase()].map(
    char => 127397 + char.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

/**
 * Zkrátí dlouhou URL cestu pro zobrazení v tabulce.
 */
export function truncatePath(path: string, maxLen = 55): string {
  if (path.length <= maxLen) return path;
  return path.substring(0, maxLen - 3) + '…';
}

/**
 * Vrátí lidsky čitelné jméno zařízení.
 */
export function formatDeviceName(device: string): string {
  const map: Record<string, string> = {
    desktop: 'Počítač',
    mobile: 'Mobil',
    tablet: 'Tablet',
    tv: 'TV',
    other: 'Ostatní',
  };
  return map[device?.toLowerCase()] ?? device ?? 'Neznámé';
}

/**
 * Barvy pro grafy (konzistentní paleta).
 */
export const CHART_COLORS = {
  primary: '#38bdf8',    // sky blue
  secondary: '#818cf8',  // indigo
  success: '#34d399',    // emerald
  warning: '#fbbf24',    // amber
  danger: '#f87171',     // red
  purple: '#c084fc',     // purple
  pink: '#f472b6',       // pink
  teal: '#2dd4bf',       // teal
};

export const CHART_COLOR_LIST = Object.values(CHART_COLORS);

/**
 * Vrátí procentuální změnu mezi dvěma hodnotami.
 */
export function calcPercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}
