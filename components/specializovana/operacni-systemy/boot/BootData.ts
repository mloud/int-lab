import { Cpu, ShieldCheck, HardDrive, Database, MemoryStick, LayoutTemplate } from 'lucide-react';

export type UefiTab = 'main' | 'advanced' | 'tweaker' | 'security' | 'boot' | 'exit';
export type Phase = 0 | 1 | 'post' | 2;

export const BOOT_SEQUENCE_TASKS = [
  { id: 'step-1', text: 'Zapnutí PC (Základní deska)', detail: 'Do desky jde proud, probouzí se hardware a předává řízení čipu s firmwarem.' },
  { id: 'step-2', text: 'UEFI Firmware', detail: 'Načtení základního kódu z čipu na základní desce (moderní náhrada BIOSu).' },
  { id: 'step-3', text: 'POST test', detail: 'Power-On Self-Test: Rychlá hardwarová kontrola (zkouší se RAM, detekují se disky).' },
  { id: 'step-4', text: 'Čtení GPT tabulky', detail: 'UEFI prohledává systémový disk a jeho tabulku GPT, aby našlo malý skrytý EFI oddíl.' },
  { id: 'step-5', text: 'Spuštění Boot Manageru', detail: 'UEFI najde a spustí správce spouštění (např. Windows Boot Manager nebo GRUB) z EFI oddílu.' },
  { id: 'step-6', text: 'Načtení Jádra OS', detail: 'Boot Manager předává řízení do rukou hlavního jádra operačního systému (Kernelu). Systém nabíhá.' },
];

export const BOOT_COMPONENTS = [
  { id: 'comp-1', text: 'Základní deska', detail: '(Zdroj a obvody rozvádějící proud)', icon: LayoutTemplate, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'comp-2', text: 'Flash čip na desce', detail: '(Fyzický čip, kde je nahrán UEFI kód)', icon: MemoryStick, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'comp-3', text: 'RAM, CPU a zbytek HW', detail: '(Komponenty, které se během testu ověřují)', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'comp-4', text: 'Pevný disk (Fyzický)', detail: '(Obsahuje úplně na začátku GPT strukturu)', icon: HardDrive, color: 'text-slate-500', bg: 'bg-slate-50' },
  { id: 'comp-5', text: 'Skrytý EFI oddíl', detail: '(FAT32 oddíl a soubor bootmgfw.efi)', icon: ShieldCheck, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 'comp-6', text: 'Systémový oddíl (C:)', detail: '(Samotný obří adresář Windows s Kernelem)', icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' },
];

