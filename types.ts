
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Segment {
  id: number;
  path: string;
  targetRGB: RGB;
  currentRGB: RGB;
  isCorrect: boolean;
  labelPosition: { x: number; y: number };
}

export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Screen = 'landing' | 'informatika-menu' | 'specializovana-menu' | 'hardware-menu' | 'pc-builder-game' | 'data-journey-game' | 'hw-sw-sorter-game' | 'pc-configurator-game' | 'operacni-systemy-menu' | 'file-systems-menu' | 'fat-game' | 'allocation-game' | 'defrag-game' | 'chkdsk-game' | 'cluster-size-game' | 'windows-install-game' | 'splash' | 'menu' | 'drawing' | 'quiz' | 'lines-menu' | 'vector-drawing' | 'line-drawing' | 'shape-puzzle' | 'compression-menu' | 'compression-formats-menu' | 'compression-game' | 'image-compression-chapter' | 'rle-compression-chapter' | 'image-size-chapter' | 'jpeg-sim-chapter' | 'text-compression' | 'checksum-game' | 'custom-compression' | 'binary-menu' | 'teachers-office' | 'student-counting' | 'binary-to-decimal' | 'truth-table' | 'binary-addition' | 'models-menu' | 'timetable-graph' | 'path-finding' | 'blatov-task' | 'mst-task' | 'parallel-processes' | 'process-memory-menu' | 'memory-stepper-game' | 'memory-allocator-game' | 'cpu-cycle-game' | 'informatika-os-menu' | 'os-match-game' | 'boot-sequence-game' | 'file-extension-game' | 'ram-manager-game' | 'shortcut-ninja-game' | 'data-units-menu' | 'data-units-theory' | 'data-units-practice' | 'codes-menu' | 'laundry-game' | 'emoji-game' | 'country-codes-game';
