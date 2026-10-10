import React from 'react';
import {
  Binary,
  Sparkles,
  Shapes,
  BoxSelect,
  HardDrive,
  Monitor,
  Lock,
  ScanFace,
  BarChart3,
  Palette,
  Cpu,
  Network,
  Code,
  Database,
  Folder,
  ArrowRight,
  Clock,
  MonitorUp,
  ShieldCheck,
  Hourglass,
  Layers,
  Terminal,
  FolderTree,
  FileCode,
  FolderKanban,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Binary,
  Sparkles,
  Shapes,
  BoxSelect,
  HardDrive,
  Monitor,
  Lock,
  ScanFace,
  BarChart3,
  Palette,
  Cpu,
  Network,
  Code,
  Database,
  Folder,
  ArrowRight,
  Clock,
  MonitorUp,
  ShieldCheck,
  Hourglass,
  Layers,
  Terminal,
  FolderTree,
  FileCode,
  FolderKanban,
};

/**
 * Bezpečně vrátí React komponentu Lucide ikony podle jejího textového názvu.
 * Pokud ikona neexistuje v mapě, vrátí výchozí ikonu (Folder).
 */
export function getCurriculumIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] || Folder;
}
