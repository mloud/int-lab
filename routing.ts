import { Screen } from './types';

// Zde definujeme naše 3-místné kódy pro deeplinking (tzv. Hash kódy).
// Klíč = kód v URL za křížkem (např. url.cz/#fat)
// Hodnota = název obrazovky (Screen), která se má zobrazit
export const ROUTE_MAP: Record<string, Screen> = {
  // Rozcestníky
  'inf': 'informatika-menu',
  'spe': 'specializovana-menu',

  // 1. Informatika - Barvy
  'rgb': 'splash',
  'rgm': 'menu',
  'rgq': 'quiz',
  
  // 1. Informatika - Čáry
  'lin': 'lines-menu',
  'shp': 'shape-puzzle',
  'vec': 'vector-drawing',
  'lnd': 'line-drawing',

  // 1. Informatika - Binární soustava
  'bin': 'binary-menu',
  'tea': 'teachers-office',
  'stc': 'student-counting',
  'b2d': 'binary-to-decimal',
  'tru': 'truth-table',
  'add': 'binary-addition',

  // 1. Informatika - Modely a grafy
  'mod': 'models-menu',
  'tim': 'timetable-graph',
  'pat': 'path-finding',
  'bla': 'blatov-task',
  'mst': 'mst-task',
  'par': 'parallel-processes',

  // 1. Informatika - Základy OS
  'osm': 'informatika-os-menu',
  'mat': 'os-match-game',
  'boo': 'boot-sequence-game',
  'ext': 'file-extension-game',
  'ram': 'ram-manager-game',
  'nin': 'shortcut-ninja-game',
  
  // 1. Informatika - Komprese
  'com': 'compression-menu',
  'txc': 'text-compression',
  'chk': 'checksum-game', // Hra s kontrolním součtem
  'img': 'image-compression-chapter', // Komprese obrázků

  // 2. Specializovaná - Pokročilé OS (Souborové systémy)
  'fsm': 'file-systems-menu',
  'fat': 'fat-game',
  'alc': 'allocation-game',
  'dfr': 'defrag-game',
  'chd': 'chkdsk-game',
  'cls': 'cluster-size-game',
  
  // 2. Specializovaná - Procesy a paměť
  'pmm': 'process-memory-menu',
  'stp': 'memory-stepper-game',
  'mal': 'memory-allocator-game', 
  'cpu': 'cpu-cycle-game',
  
  // 2. Specializovaná - Instalace Windows
  'win': 'windows-install-game',
  
  // Další chybějící kódy
  'ops': 'operacni-systemy-menu',
  'hwm': 'hardware-menu',
  'pcb': 'pc-builder-game',
  'dtj': 'data-journey-game',
  'hws': 'hw-sw-sorter-game',
  'pcc': 'pc-configurator-game',
  'cfm': 'compression-formats-menu',
  'rle': 'rle-compression-chapter',
  'ims': 'image-size-chapter',
  'jpg': 'jpeg-sim-chapter',
  'dum': 'data-units-menu',
  'dut': 'data-units-theory',
  'dup': 'data-units-practice',
  'cpg': 'compression-game',
  'cst': 'custom-compression',
  'drw': 'drawing',
  'cod': 'codes-menu',
  'lau': 'laundry-game',
  'emo': 'emoji-game',
  'sta': 'country-codes-game',
};

/**
 * Pomocná funkce, která vezme text za křížkem, očistí ho a vrátí název obrazovky,
 * nebo null, pokud kód neexistuje.
 */
export const getScreenFromHash = (hash: string): Screen | null => {
  // Odstraníme případný znak # na začátku a převedeme na malá písmena
  const cleanHash = hash.replace('#', '').toLowerCase();
  
  // Vrátíme obrazovku ze slovníku, nebo null
  return ROUTE_MAP[cleanHash] || null;
};

/**
 * Pomocná funkce, která pro danou obrazovku vrátí její 3-místný kód,
 * nebo null, pokud kód neexistuje.
 */
export const getHashFromScreen = (screen: Screen): string | null => {
  for (const [hash, screenName] of Object.entries(ROUTE_MAP)) {
    if (screenName === screen) {
      return hash;
    }
  }
  return null;
};
