'use client';

import React, { useState } from 'react';
import { Layers, AppWindow, Cpu, HardDrive, ArrowDown, Database, Info, Shield } from 'lucide-react';
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

          {/* Vrstvený model počítače pro Souborový systém */}
          <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-1">
            {/* Společný rámec: Operační systém */}
            <div className="w-full border-2 border-dashed border-emerald-500 bg-emerald-50/20 rounded-3xl p-4 sm:p-5 flex flex-col items-center relative pt-7 shadow-2xs">
              <div className="absolute -top-3.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" /> Operační systém
              </div>

              {/* Vrstva 1: User Space */}
              <div className="w-full bg-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-colors rounded-2xl p-4 flex flex-col items-center shadow-2xs relative z-10 text-center">
                <span className="font-black text-blue-900 uppercase tracking-wider text-xs mb-2">User Space (Ring 3)</span>
                <div className="px-4 py-2 bg-white rounded-xl shadow-2xs border border-blue-200 text-sm font-bold text-blue-900 flex items-center gap-2">
                  <AppWindow className="w-4 h-4 text-blue-600" /> Aplikace (Word / Hry)
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-2 bg-blue-100/60 px-3 py-1 rounded-lg">
                  Příkaz aplikace: <code className="text-blue-900 font-bold font-mono">„Ulož dokument.docx“</code>
                </div>
              </div>

              {/* Spojka */}
              <div className="w-1.5 h-4 bg-slate-200 my-0.5"></div>
              <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs">
                ↕ Systémové volání (Syscall)
              </span>
              <div className="w-1.5 h-4 bg-slate-200 my-0.5"></div>

              {/* Vrstva 2: Kernel Space */}
              <div className="w-full bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-400 transition-colors rounded-2xl p-4 flex flex-col items-center shadow-2xs relative z-10">
                <span className="font-black text-emerald-950 uppercase tracking-wider text-xs mb-2.5 text-center">
                  Kernel Space (Ring 0)
                </span>

                <div className="flex flex-col gap-2.5 w-full">
                  {/* Souborový systém */}
                  <div className="p-3 bg-purple-600 text-white rounded-xl shadow-xs flex items-center gap-3">
                    <Layers className="w-5 h-5 flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-black uppercase tracking-wide">Souborový systém OS</div>
                      <div className="text-[11px] text-purple-100 font-medium">Překlad: <span className="font-bold font-mono">dokument.docx</span> → Sektory 12–15</div>
                    </div>
                  </div>

                  {/* Šipka */}
                  <div className="flex justify-center -my-1">
                    <ArrowDown className="w-4 h-4 text-emerald-600" />
                  </div>

                  {/* Ovladač disku */}
                  <div className="p-3 bg-white text-indigo-950 border-2 border-indigo-200 rounded-xl shadow-xs flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-black uppercase tracking-wide text-indigo-900">Ovladač disku (Driver)</div>
                      <div className="text-[11px] text-slate-600 font-medium">Posílá přímé instrukce k zápisu na sběrnici HW</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spojka k HW */}
            <div className="w-1.5 h-5 bg-slate-200 my-0.5"></div>

            {/* Vrstva 3: Hardware (Pevný disk se sektory) */}
            <div className="w-full bg-slate-100 border-2 border-slate-300 rounded-2xl p-4 shadow-sm relative z-10 text-center">
              <span className="font-black text-slate-800 uppercase tracking-wider text-xs block mb-3">
                Hardware (Fyzický počítač)
              </span>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-4 text-slate-800">
                  <HardDrive className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-black uppercase tracking-wide">HDD / SSD Disk</span>
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
                
                <div className="text-center text-xs text-slate-500 font-medium mt-4">
                  Fyzický zápis 1 a 0 do sektorů <span className="text-rose-600 font-bold font-mono">#12, #13, #14 a #15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FsChapterShell>
  );
}
