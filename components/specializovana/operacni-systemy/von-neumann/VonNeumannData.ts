import { MemoryStick, LogIn, LogOut, Calculator, Settings } from 'lucide-react';

export type ArrowType = 'none' | 'in-mem' | 'in-cpu' | 'cpu-mem-write' | 'cpu-mem-read' | 'cpu-out' | 'cpu-internal';

export interface Step {
  title: string;
  msg: string;
  activeArrow: ArrowType;
  arrowText: string;
  inData: string[];
  outData: (string | number)[];
  cpuAcc: string | number;
  cpuPc: string | number;
  memData: { addr: number; val: string | number }[];
}

const EMPTY_RAM = [
  { addr: 0, val: 0 }, { addr: 1, val: 0 }, { addr: 2, val: 0 }, { addr: 3, val: 0 }, { addr: 4, val: 0 },
  { addr: 10, val: 0 }, { addr: 11, val: 0 }, { addr: 12, val: 0 }
];

const FILLED_RAM = [
  { addr: 0, val: 'LOAD R1, 10' },
  { addr: 1, val: 'ADD R1, 11' },
  { addr: 2, val: 'STORE 12, R1' },
  { addr: 3, val: 'OUT 12' },
  { addr: 4, val: 'HALT' },
  { addr: 10, val: 5 },
  { addr: 11, val: 7 },
  { addr: 12, val: 0 }
];

const RESULT_RAM = [...FILLED_RAM];
RESULT_RAM[7] = { addr: 12, val: 12 };

export const STEPS: Step[] = [
  {
    title: 'Počáteční stav',
    msg: 'Paměť je prázdná. Čekáme na spuštění (nahrání) programu ze Vstupu (např. z pevného disku).',
    activeArrow: 'none',
    arrowText: '',
    inData: ['program.exe'],
    outData: [],
    cpuAcc: '---',
    cpuPc: '---',
    memData: EMPTY_RAM
  },
  {
    title: 'Nahrání programu do paměti',
    msg: 'Operační systém přečte program ze Vstupu a nakopíruje jej včetně počátečních dat (5 a 7) do sdílené paměti RAM.',
    activeArrow: 'in-cpu',
    arrowText: 'Načítání: program.exe',
    inData: [],
    outData: [],
    cpuAcc: '---',
    cpuPc: '---',
    memData: FILLED_RAM
  },
  {
    title: 'Program připraven',
    msg: 'Program je kompletně v paměti. Řadič nastaví Čítač instrukcí (PC) na první adresu (0) a je připraven k běhu.',
    activeArrow: 'none',
    arrowText: '',
    inData: [],
    outData: [],
    cpuAcc: '---',
    cpuPc: 0,
    memData: FILLED_RAM
  },
  {
    title: 'Načtení 1. instrukce',
    msg: 'Řadič čte první instrukci z adresy 0. Instrukce říká: "Načti hodnotu z adresy 10 do Registru R1".',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: LOAD',
    inData: [],
    outData: [],
    cpuAcc: '---',
    cpuPc: 0,
    memData: FILLED_RAM
  },
  {
    title: 'Vykonání: Načtení dat',
    msg: 'Procesor přečte hodnotu "5" z adresy 10 a uloží ji do Registru.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Data: 5',
    inData: [],
    outData: [],
    cpuAcc: 5,
    cpuPc: 0,
    memData: FILLED_RAM
  },
  {
    title: 'Načtení 2. instrukce',
    msg: 'Řadič posune čítač a čte další instrukci z adresy 1: "Přičti k Registru R1 hodnotu z adresy 11".',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: ADD',
    inData: [],
    outData: [],
    cpuAcc: 5,
    cpuPc: 1,
    memData: FILLED_RAM
  },
  {
    title: 'Vykonání: Výpočet (ALU)',
    msg: 'Procesor načte z paměti číslo "7" a pomocí ALU ho rovnou přičte k 5. Nová hodnota v registru je 12.',
    activeArrow: 'cpu-internal',
    arrowText: 'ALU: 5 + 7',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 1,
    memData: FILLED_RAM
  },
  {
    title: 'Načtení 3. instrukce',
    msg: 'Čítač je na adrese 2. Čte instrukci: "STORE 12, R1" – tj. zapiš obsah registru zpět do paměti na adresu 12.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: STORE',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 2,
    memData: FILLED_RAM
  },
  {
    title: 'Vykonání: Zápis výsledku',
    msg: 'Procesor posílá vypočítanou hodnotu (12) z registru do paměti.',
    activeArrow: 'cpu-mem-write',
    arrowText: 'Zápis: 12',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 2,
    memData: RESULT_RAM
  },
  {
    title: 'Načtení 4. instrukce',
    msg: 'Čítač je na adrese 3. Čte instrukci: "OUT 12" – tj. pošli hodnotu z adresy 12 na výstupní jednotku.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Instrukce: OUT',
    inData: [],
    outData: [],
    cpuAcc: 12,
    cpuPc: 3,
    memData: RESULT_RAM
  },
  {
    title: 'Vykonání: Zápis na výstup',
    msg: 'Procesor vyžádá data z paměti a odešle je přímo na Výstupní jednotku k zobrazení uživateli.',
    activeArrow: 'cpu-out',
    arrowText: 'Data: 12',
    inData: [],
    outData: [12],
    cpuAcc: 12,
    cpuPc: 3,
    memData: RESULT_RAM
  },
  {
    title: 'Hotovo',
    msg: 'Čítač se posunul na adresu 4. Program přečetl instrukci HALT a ukončil se.',
    activeArrow: 'none',
    arrowText: '',
    inData: [],
    outData: [12],
    cpuAcc: 12,
    cpuPc: '4 (HALT)',
    memData: RESULT_RAM
  }
];

const PROG = ['1: VÝSLEDEK = 5 + 7', '2: PRINT VÝSLEDEK'];

export const SIMPLE_STEPS = [
  {
    title: 'Nahrání programu',
    msg: 'Nahráváme program od programátora (např. z disku). Tok probíhá ze vstupu přes procesor do společné paměti.',
    activeArrow: 'in-mem',
    arrowText: 'Nahrávám program...',
    inData: PROG,
    outData: [],
    memProg: [],
    memData: [],
    activeProgLine: -1,
    cpuData: 'Čeká...'
  },
  {
    title: 'Program v paměti připraven',
    msg: 'Paměť nyní drží náš program ve vyhrazené sekci. Můžeme začít s prvním krokem.',
    activeArrow: 'none',
    arrowText: '',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: [],
    activeProgLine: -1,
    cpuData: 'Čeká...'
  },
  {
    title: 'Instrukce 1: Čtení z paměti',
    msg: 'Procesor čte první instrukci ze sekce Program. Čísla 5 a 7 jsou rovnou součástí instrukce.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Čtu instrukci 1',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: [],
    activeProgLine: 0,
    cpuData: 'Načteno:\n1: VÝSLEDEK = 5 + 7'
  },
  {
    title: 'Zpracování (Výpočet v ALU)',
    msg: 'Procesor má čísla u sebe a ALU (aritmeticko-logická jednotka) je okamžitě sečte.',
    activeArrow: 'cpu-internal',
    arrowText: 'Počítám: 5 + 7',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: [],
    activeProgLine: 0,
    cpuData: 'Výpočet:\n5 + 7 = 12'
  },
  {
    title: 'Zápis výsledku',
    msg: 'Výsledek 12 nesmí zůstat jen v procesoru. Odesílá se do datové sekce paměti.',
    activeArrow: 'cpu-mem-write',
    arrowText: 'Zápis dat: 12',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: ['VÝSLEDEK = 12'],
    activeProgLine: 0,
    cpuData: 'Vykonáno'
  },
  {
    title: 'Instrukce 2: Čtení z paměti',
    msg: 'Procesor se ptá na další instrukci: Vytisknout VÝSLEDEK.',
    activeArrow: 'cpu-mem-read',
    arrowText: 'Čtu instrukci 2',
    inData: [],
    outData: [],
    memProg: PROG,
    memData: ['VÝSLEDEK = 12'],
    activeProgLine: 1,
    cpuData: 'Načteno:\n2: PRINT VÝSLEDEK'
  },
  {
    title: 'Vykonání (Tisk na obrazovku)',
    msg: 'Procesor si vytáhne z paměti hodnotu slova VÝSLEDEK a okamžitě ji posílá přes svoji sběrnici uživateli na výstup.',
    activeArrow: 'cpu-mem-read-data-out',
    arrowText: 'Tisk',
    inData: [],
    outData: ['Obrazovka: 12'],
    memProg: PROG,
    memData: ['VÝSLEDEK = 12'],
    activeProgLine: 1,
    cpuData: 'Hotovo'
  }
];

export const BUILDER_MODULES = [
  { id: 'alu', name: 'ALU', icon: Calculator, desc: 'Provádí matematiku a logiku' },
  { id: 'cu', name: 'Řadič (CU)', icon: Settings, desc: 'Řídí tok dat a dekóduje instrukce' },
  { id: 'mem', name: 'Společná Paměť', icon: MemoryStick, desc: 'Obsahuje data I instrukce společně!' },
  { id: 'in', name: 'Vstup', icon: LogIn, desc: 'Čte vstup (klávesnice, disk)' },
  { id: 'out', name: 'Výstup', icon: LogOut, desc: 'Zobrazuje výstup (monitor)' },
];
