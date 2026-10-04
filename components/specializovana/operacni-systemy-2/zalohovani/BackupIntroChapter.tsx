'use client';
import React, { useState } from 'react';
import { BookOpen, ShieldCheck, HardDrive, Layers, Server, ShieldAlert, Zap, Clock, Cloud, MonitorUp, Settings, FileText, UploadCloud, Monitor } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface BackupIntroChapterProps {
  onBack: () => void;
}

const BackupIntroChapter: React.FC<BackupIntroChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('pojmy');

  const tabs: FsTab[] = [
    { id: 'pojmy', label: 'Základní pojmy', icon: BookOpen },
    { id: 'metody', label: 'Metody a 3-2-1', icon: ShieldCheck },
    { id: 'nastroje', label: 'Nástroje ve Win 11', icon: MonitorUp },
  ];

  return (
    <FsChapterShell
      chapterNumber={1}
      totalChapters={5}
      title="Úvod do"
      highlight="Zálohování"
      subtitle="Základní pojmy, pravidla a strategie zálohování pro ochranu dat před jejich ztrátou."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'pojmy' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-50/50 p-6 sm:p-8 rounded-[2rem] border border-blue-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Zálohování vs. Obnova</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                <strong>Zálohování (backup)</strong> je proces vytváření kopií dat nebo systémového stavu s cílem zamezit jejich trvalé ztrátě při selhání hardwaru, softwarové chybě, uživatelském omylu nebo kybernetickém útoku. <strong>Obnova (recovery)</strong> je pak zpětný proces navrácení těchto dat do funkčního stavu.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Objekty zálohování</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Uživatelská data</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Dokumenty, rodinné fotografie, kód, databáze. Jsou to <strong>unikátní a nenahraditelná</strong> data vytvořená uživatelem.
              </p>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-2 list-disc pl-4">
                <li><strong>Dynamika změn:</strong> Mění se častěji (denně až neustále).</li>
                <li><strong>Strategie:</strong> Vyžaduje průběžné nebo časté zálohování (verzování) s nízkou časovou náročností.</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Stav systému a aplikace</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Operační systém Windows 11, instalované aplikace, systémový registr, konfigurace uživatelských profilů a ovladače.
              </p>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-2 list-disc pl-4">
                <li><strong>Dynamika změn:</strong> Mění se nárazově (při aktualizacích, instalaci softwaru).</li>
                <li><strong>Strategie:</strong> Zálohuje se formou snímků (snapshots) nebo obrazů (disk image), aby nebyla nutná složitá rekonfigurace.</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50/50 p-6 sm:p-8 rounded-[2rem] border border-purple-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-purple-600" />
              Klíčové metriky: RPO a RTO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <h3 className="text-lg font-black text-purple-700 mb-2">RPO (Recovery Point Objective)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Maximální akceptovatelná ztráta dat měřená v čase.</strong> Odpovídá na otázku: <em>„O jak dlouhou práci mohu přijít, když systém teď spadne?“</em> (např. pokud zálohujete 1× denně, vaše RPO je 24 hodin).
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
                <h3 className="text-lg font-black text-purple-700 mb-2">RTO (Recovery Time Objective)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Maximální přípustná doba nefunkčnosti.</strong> Odpovídá na otázku: <em>„Za jak dlouho od havárie musím mít počítač opět plně v provozu?“</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'metody' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Typy zálohovacích metod</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Plná záloha<br/><span className="text-sm font-medium text-slate-500">(Full Backup)</span></h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Kopíruje se kompletní vybraný objem dat. Je nejbezpečnější a nejrychlejší pro obnovu, ale je náročná na úložný prostor a čas.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Inkrementální<br/><span className="text-sm font-medium text-slate-500">(Incremental Backup)</span></h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Ukládají se pouze data změněná od <strong>poslední jakékoliv</strong> (i inkrementální) zálohy. Šetří místo, ale obnova vyžaduje poslední plnou zálohu a všechny následující inkrementální kroky za sebou.
              </p>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
                <Server className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Diferenciální<br/><span className="text-sm font-medium text-slate-500">(Differential Backup)</span></h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Ukládají se data změněná od <strong>poslední plné</strong> zálohy. Obnova vyžaduje pouze plnou zálohu a tento poslední diferenciální snímek, ale bere více místa.
              </p>
            </div>
          </div>

          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden mt-12">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-indigo-400" />
                Pravidlo 3-2-1
              </h2>
              <p className="text-indigo-200 mb-8 max-w-2xl text-sm leading-relaxed">
                Klasické pravidlo popisující minimální úroveň redundance nutnou pro zajištění bezpečí dat.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-800/50 p-6 rounded-3xl border border-indigo-700/50">
                  <div className="text-5xl font-black text-indigo-300 mb-2">3</div>
                  <h3 className="text-lg font-bold mb-2">Kopie dat</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed">1 primární funkční verze + 2 nezávislé záložní kopie.</p>
                </div>
                
                <div className="bg-indigo-800/50 p-6 rounded-3xl border border-indigo-700/50">
                  <div className="text-5xl font-black text-indigo-300 mb-2">2</div>
                  <h3 className="text-lg font-bold mb-2">Různá média</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed">Použití odlišných technologií (např. SSD + NAS). Eliminuje se riziko, že chyba jednoho typu média zničí všechny kopie.</p>
                </div>
                
                <div className="bg-indigo-800/50 p-6 rounded-3xl border border-indigo-700/50">
                  <div className="text-5xl font-black text-indigo-300 mb-2">1</div>
                  <h3 className="text-lg font-bold mb-2">Kopie mimo lokalitu</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed">Fyzicky oddělena (cloud, externí disk na jiné adrese). Chrání před živelními pohromami (požár, povodeň) nebo krádeží.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nastroje' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-black text-slate-800 mb-4 px-2">Přehled metod a nástrojů ve Windows 11</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 bg-white rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-slate-500" />
                Manuální zálohování a skriptování
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Ruční kopírování souborů nebo využití skriptů (copy, xcopy, ZIP) zautomatizovaných přes Plánovač úloh.
              </p>
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                <p className="text-xs font-bold text-rose-800 mb-1">Omezení:</p>
                <ul className="text-xs text-rose-700 list-disc pl-4 space-y-1">
                  <li>Vysoké riziko lidské chyby.</li>
                  <li>Skripty standardně neumí zálohovat otevřené/uzamčené soubory.</li>
                  <li>Chybí pokročilá správa verzí a automatizovaná obnova.</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-sky-200 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5"><UploadCloud className="w-32 h-32" /></div>
              <h3 className="text-xl font-black text-sky-800 mb-2 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-sky-500" />
                Synchronizace přes OneDrive
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Průběžná obousměrná synchronizace vybraných uživatelských složek přímo do cloudu Microsoftu.
              </p>
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-100">
                <p className="text-xs font-bold text-sky-800 mb-1">Omezení:</p>
                <ul className="text-xs text-sky-700 list-disc pl-4 space-y-1">
                  <li>Není to plnohodnotná záloha (smazání lokálně smaže i v cloudu).</li>
                  <li>Vyžaduje stabilní internet.</li>
                  <li>Nezálohuje systém a aplikace.</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-blue-200 shadow-sm">
              <h3 className="text-xl font-black text-blue-800 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                Zálohování Windows (Windows Backup)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Vestavěná aplikace, ukládá do účtu Microsoft nastavení systému, preference, Store aplikace a strukturu složek.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-1">Omezení:</p>
                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                  <li>Neukládá klasické desktop (.exe) aplikace, pouze jejich seznam.</li>
                  <li>Svázáno výhradně s MS účtem.</li>
                  <li>Nejde o kompletní obraz disku (image) pro offline obnovu.</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-emerald-200 shadow-sm">
              <h3 className="text-xl font-black text-emerald-800 mb-2 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-emerald-500" />
                Systémové snímky a body obnovy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Využívá VSS k vytváření snímků stavu systému, registru a ovladačů. Ideální po nezdařené aktualizaci.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-1">Omezení:</p>
                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                  <li>Neochraňuje uživatelská data (dokumenty, fotky zůstanou).</li>
                  <li>Ukládají se na stejný fyzický disk (při havárii HW o ně přijdete).</li>
                  <li>Zabírají místo, starší body se mažou.</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-amber-200 shadow-sm">
              <h3 className="text-xl font-black text-amber-800 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Historie souborů (File History)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Tradiční funkce pro verzování uživatelských dat na externí disk nebo NAS.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-1">Omezení:</p>
                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                  <li>Pouze pro uživatelská data.</li>
                  <li>Vyžaduje připojené záložní médium.</li>
                  <li>Ve Win 11 vytlačováno ve prospěch OneDrive.</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-purple-200 shadow-sm">
              <h3 className="text-xl font-black text-purple-800 mb-2 flex items-center gap-2">
                <Server className="w-5 h-5 text-purple-500" />
                Nástroje třetích stran
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Specializovaný SW (Veeam, Acronis, Macrium) nabízející profi řešení včetně bitových kopií disků (image-based).
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-1">Omezení:</p>
                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                  <li>Služby na pozadí mohou zatěžovat systém.</li>
                  <li>Pokročilé funkce bývají placené.</li>
                  <li>Větší složitost konfigurace.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </FsChapterShell>
  );
};

export default BackupIntroChapter;
