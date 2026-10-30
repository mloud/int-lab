export interface PieSliceData {
  id: number;
  label: string;
  value: number;
  color: string;
}

export const PIE_COLORS = [
  '#f59e0b', // amber-500
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
  '#6366f1', // indigo-500
  '#14b8a6', // teal-500
];

export const DEFAULT_PIE_DATA: PieSliceData[] = [
  { id: 1, label: 'Hry a aplikace', value: 48, color: '#f59e0b' },
  { id: 2, label: 'Fotky a videa', value: 36, color: '#3b82f6' },
  { id: 3, label: 'Systém Android', value: 24, color: '#10b981' },
  { id: 4, label: 'Hudba a podcasty', value: 12, color: '#8b5cf6' },
];

export const CROWDED_PIE_DATA: PieSliceData[] = [
  { id: 1, label: 'Fotbal', value: 38, color: '#3b82f6' },
  { id: 2, label: 'Florbal', value: 27, color: '#10b981' },
  { id: 3, label: 'Basketbal', value: 18, color: '#f59e0b' },
  { id: 4, label: 'Plavání', value: 6, color: '#8b5cf6' },
  { id: 5, label: 'Tenis', value: 4, color: '#ec4899' },
  { id: 6, label: 'Šachy', value: 3, color: '#06b6d4' },
  { id: 7, label: 'Lukostřelba', value: 2, color: '#f97316' },
  { id: 8, label: 'Judo', value: 1, color: '#6366f1' },
  { id: 9, label: 'Krasobruslení', value: 1, color: '#14b8a6' },
];

/**
 * Pomocná funkce pro převod polárních souřadnic na kartézské pro SVG oblouk
 */
export function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

/**
 * Vytvoří SVG path pro kruhovou výseč (nebo prstencovou výseč)
 */
export function describePieSlice(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  innerRadius: number = 0
): string {
  // Ošetření plného kruhu (360 stupňů)
  const clampedEnd = endAngle - startAngle >= 359.99 ? startAngle + 359.99 : endAngle;
  const largeArcFlag = clampedEnd - startAngle <= 180 ? '0' : '1';

  const startOuter = polarToCartesian(cx, cy, r, clampedEnd);
  const endOuter = polarToCartesian(cx, cy, r, startAngle);

  if (innerRadius <= 0) {
    return [
      'M', cx, cy,
      'L', startOuter.x, startOuter.y,
      'A', r, r, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
      'Z',
    ].join(' ');
  }

  const startInner = polarToCartesian(cx, cy, innerRadius, clampedEnd);
  const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);

  return [
    'M', startOuter.x, startOuter.y,
    'A', r, r, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    'L', endInner.x, endInner.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
    'Z',
  ].join(' ');
}

