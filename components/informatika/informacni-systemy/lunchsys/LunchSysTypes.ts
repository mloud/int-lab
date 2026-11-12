export interface LunchSysCardItem {
  id: string;
  title: string;
  category: 'identifikace' | 'strava' | 'finance' | 'soukromi' | 'skola';
  isNecessary: boolean;
  iconName: string;
  whyYes: string;
  whyNo: string;
}

export type LunchSysStep = 1 | 2 | 3;

