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
            <p className="mb-4 text-[15px] leading-relaxed">
              Uživatelské aplikace pracují s abstraktními pojmy, jako jsou <strong>jména souborů a adresářů</strong> (např. <i>„Ulož dokument.docx do složky Škola“</i>). Samotný hardware (pevný disk) však takové logické struktury nezná. Dokáže pouze číst a zapisovat binární data do pevných paměťových bloků nazývaných <strong>sektory</strong>, které jsou identifikovány výhradně svým pořadovým číslem.
            </p>
            <p className="text-[15px] leading-relaxed">
              Modul operačního systému zvaný <strong>Souborový systém</strong> (File System) proto funguje jako nezbytná <strong>překladová vrstva</strong>. Přijímá od aplikací požadavky na uložení jmenného souboru a automaticky je překládá do nízkoúrovňových instrukcí pro paměťové médium: <i>„Zapiš tato data do fyzických sektorů číslo 1200 až 1232“</i>. Uživatel ani aplikace tak vůbec nemusí řešit, kde přesně na disku se data fyzicky nacházejí.
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
                    <div className="text-sm font-black uppercase">Souborový systém OS</div>
                    <div className="text-[11px] opacity-90">Překlad: dokument.docx → Fyzické Sektory 12-15</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-5 h-5 text-slate-400" />
                </div>

                <div className="p-3 bg-indigo-100 text-indigo-900 border border-indigo-300 rounded-xl shadow-sm flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-indigo-600" />
                  <div>
                    <div className="text-sm font-black uppercase">Ovladač Disku</div>
                    <div className="text-[11px] opacity-80">Posílá instrukce k zápisu na hardware</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware */}
            <div className="flex justify-center mt-3 mb-2">
              <ArrowDown className="w-5 h-5 text-slate-400" />
            </div>
            <div className="border-4 border-slate-300 rounded-2xl p-4 bg-slate-200 relative">
              <div className="text-center text-xs font-bold text-slate-500 uppercase mb-4">Hardware (Fyzický počítač)</div>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
                <div className="flex items-center justify-center gap-3 mb-5 text-slate-800">
                  <HardDrive className="w-6 h-6 text-slate-500" />
                  <div className="text-sm font-black">HDD / SSD Disk</div>
                </div>
                
                {/* Mřížka sektorů přímo na disku */}
                <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-mono font-bold transition-all duration-1000 ${
                      [12, 13, 14, 15].includes(i) 
                        ? 'bg-rose-500 text-white shadow-md border border-rose-400 scale-110 z-10' 
                        : 'bg-slate-50 text-slate-400 border border-slate-200'
                    }`}>
                      #{i}
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-xs text-slate-500 font-medium mt-5">
                  Fyzický zápis 1 a 0 do sektorů <span className="text-rose-500 font-bold">12, 13, 14 a 15</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </FsChapterShell>
  );
}
