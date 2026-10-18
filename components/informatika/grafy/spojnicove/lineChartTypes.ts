export interface LineDataPoint {
  id: number;
  label: string; // e.g. "06:00", "Pondělí", "Leden"
  value: number;
}

export interface DualLineDataPoint {
  id: number;
  label: string;
  val1: number;
  val2: number;
}

export const DEFAULT_SINGLE_LINE_DATA: LineDataPoint[] = [
  { id: 1, label: '06:00', value: 8 },
  { id: 2, label: '09:00', value: 14 },
  { id: 3, label: '12:00', value: 21 },
  { id: 4, label: '15:00', value: 24 },
  { id: 5, label: '18:00', value: 19 },
  { id: 6, label: '21:00', value: 13 },
  { id: 7, label: '00:00', value: 9 }
];

export const DEFAULT_DUAL_LINE_DATA: DualLineDataPoint[] = [
  { id: 1, label: 'Po', val1: 120, val2: 80 },
  { id: 2, label: 'Út', val1: 150, val2: 95 },
  { id: 3, label: 'St', val1: 140, val2: 130 },
  { id: 4, label: 'Čt', val1: 190, val2: 120 },
  { id: 5, label: 'Pá', val1: 280, val2: 240 },
  { id: 6, label: 'So', val1: 340, val2: 390 },
  { id: 7, label: 'Ne', val1: 310, val2: 420 }
];
