'use client';

import React, { useState } from 'react';
import { Layers, AppWindow, Cpu, HardDrive, ArrowDown, Database, Info } from 'lucide-react';
import { FsChapterShell, TheoryCard } from './FsShared';

export default function FsIntroChapter({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('theory');

  const tabs = [
    { id: 'theory', label: 'Architektura FS', icon: Layers }
  ];

  return (
    <FsChapterShell
      chapterNumber={0}
      title="Úvod do"
      highlight="architektury"
      subtitle="Co vlastně dělá modul správy souborů?"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <TheoryCard icon={Layers} title="Překladová vrstva (Knihovník)" letter="A" tone="indigo">
            <p className="mb-4">
              Disk sám o sobě nezná žádné soubory ani složky – umí jen číst a zapisovat <strong>očíslované bloky dat (sektory)</strong>.
            </p>
            <p>
              Souborový systém funguje jako „knihovník“ nebo „překladatel“. Bere příkazy z aplikací v <i>User Space</i> 
              (jako "Ulož dokument.docx do složky Škola") a překládá je na specifické fyzické adresy pro ovladač disku v <i>Kernel Space</i>.
            </p>
          </TheoryCard>

          <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-3xl border-2 border-indigo-100 shadow-sm relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 bg-indigo-500 px-4 py-2 rounded-bl-xl text-xs font-bold text-white uppercase tracking-wider">Vrstvení OS</div>
            
            {/* User Space */}
            <div className="border-4 border-dashed border-blue-300 rounded-2xl p-4 mb-4 bg-blue-50/50 mt-6 relative">
              <div className="text-center text-xs font-bold text-blue-500 uppercase mb-2">User Space (Ring 3)</div>
              <div className="flex justify-center gap-2">
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-blue-200 text-sm font-bold text-blue-700 flex items-center gap-2">
                  <AppWindow className="w-4 h-4" /> Aplikace (Word / Hry)
                </div>
              </div>
              <div className="text-center text-xs text-slate-500 font-medium mt-2">Příkaz: "Ulož dokument.docx"</div>
            </div>

            {/* Kernel Space */}
            <div className="border-4 border-slate-300 rounded-2xl p-4 bg-slate-100 relative">
              <div className="text-center text-xs font-bold text-slate-500 uppercase mb-2">Kernel Space (Ring 0)</div>
              
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-purple-600 text-white rounded-xl shadow-md flex items-center gap-3">
                  <Layers className="w-6 h-6" />
                  <div>
                    <div className="text-sm font-black uppercase">Správa souborů (Souborový systém)</div>
                    <div className="text-[11px] opacity-90">Překlad: dokument.docx → Clustery 150-153 (FAT/NTFS)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-5 h-5 text-slate-400" />
                </div>

                <div className="p-3 bg-indigo-100 text-indigo-900 border border-indigo-300 rounded-xl shadow-sm flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-indigo-600" />
                  <div>
                    <div className="text-sm font-black uppercase">Ovladač Disku</div>
                    <div className="text-[11px] opacity-80">Překlad: Clustery 150-153 → Fyzické LBA Sektory 1200-1232</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware */}
            <div className="flex justify-center mt-3 mb-2">
              <ArrowDown className="w-5 h-5 text-slate-400" />
            </div>
            <div className="border-4 border-gray-800 rounded-2xl p-4 bg-gray-900 text-white relative">
              <div className="text-center text-xs font-bold text-gray-400 uppercase mb-2">Hardware (Fyzický počítač)</div>
              <div className="flex items-center justify-center gap-3">
                <HardDrive className="w-6 h-6 text-gray-300" />
                <div className="text-sm font-black">HDD / SSD Disk</div>
              </div>
              <div className="text-center text-xs text-gray-400 font-medium mt-2">Zápis jedniček a nul na plotnu / čip</div>
            </div>

          </div>
        </div>
      )}
    </FsChapterShell>
  );
}
