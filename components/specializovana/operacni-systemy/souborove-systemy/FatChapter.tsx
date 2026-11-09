"use client";

import React, { useState } from 'react';
import { MonitorPlay, Save, Database, Trash2, Eraser, ClipboardList } from 'lucide-react';
import { FsChapterShell, PracticeLink } from './FsShared';
import { FatTheoryTab } from './fat/FatTheoryTab';
import { FatWorksheetTab } from './fat/FatWorksheetTab';

export default function FatChapter({
  onBack,
  onOpenFatGame,
  onOpenDeleteGame,
  onOpenFormatGame
}: {
  onBack: () => void;
  onOpenFatGame: () => void;
  onOpenDeleteGame: () => void;
  onOpenFormatGame: () => void;
}) {
  const [activeTab, setActiveTab] = useState('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
    { id: 'worksheet', label: 'Pracovní list', icon: ClipboardList },
  ];

  return (
    <FsChapterShell
      chapterNumber={3}
      title="Systém"
      highlight="souborů"
      subtitle="Od železa a fyzických sektorů po složky a soubory operačního systému."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && <FatTheoryTab />}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink
            tag="SIMULACE"
            title="Tabulka FAT (Simulátor)"
            desc="Sledujte vizuálně, jak se clustery zaplňují a jak se jejich poloha zapisuje do tabulky na disku."
            icon={Save}
            tone="emerald"
            onClick={onOpenFatGame}
          />
          <PracticeLink
            tag="HRA"
            title="Mazání souborů"
            desc="Vyzkoušejte si smazat soubor a zjistěte, proč data na disku ve skutečnosti pořád leží."
            icon={Trash2}
            tone="rose"
            onClick={onOpenDeleteGame}
          />
          <PracticeLink
            tag="SIMULACE"
            title="Rychlé vs. Pomalé formátování"
            desc="Podívejte se, jaký je rozdíl mezi smazáním tabulky a fyzickým přepisováním dat nulami."
            icon={Eraser}
            tone="amber"
            onClick={onOpenFormatGame}
          />
        </div>
      )}

      {activeTab === 'worksheet' && <FatWorksheetTab />}
    </FsChapterShell>
  );
}
