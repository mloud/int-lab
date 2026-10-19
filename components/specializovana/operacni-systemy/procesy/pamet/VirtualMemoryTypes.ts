export interface PageTableEntry {
  pageId: number;
  processName: string;
  data: string;
  location: 'RAM' | 'DISK';
  frameId: number;
  lastAccessed: number;
}

export interface PhysicalFrame {
  frameId: number;
  pageId: number | null;
  processName: string | null;
  data: string | null;
}
