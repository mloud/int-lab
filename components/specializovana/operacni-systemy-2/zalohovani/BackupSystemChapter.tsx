'use client';
import React, { useState } from 'react';
import { Save, BookOpen, FileText, Settings, Database, Server, AlertTriangle, ShieldAlert, MonitorUp } from 'lucide-react';
import { FsChapterShell, FsTab } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BackupSystemChapterProps {
  onBack: () => void;
}

const BackupSystemChapter: React.FC<BackupSystemChapterProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('teorie');
  const [studentName, setStudentName] = useLocalStorage('studentName', '');

  // Checkboxy pro úkoly
  const [task1, setTask1] = useLocalStorage('sys-task1', false);
  const [task2, setTask2] = useLocalStorage('sys-task2', false);
  const [task3, setTask3] = useLocalStorage('sys-task3', false);
  const [task4, setTask4] = useLocalStorage('sys-task4', false);

  const tabs: FsTab[] = [
    { id: 'teorie', label: 'Teorie', icon: BookOpen },
    { id: 'list', label: 'Pracovní list', icon: FileText },
  ];

  const handleDownload = () => {
    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Pracovní list: Zálohování stavu systému (System State)</title></head>
      <body style="font-family: Calibri, sans-serif;">
        <h1>Pracovní list: Zálohování stavu systému (System State)</h1>
        <p><strong>Student:</strong> ${studentName}</p>
        <hr />
        
        <h2>Splněné úkoly</h2>
        <ul>
          <li><strong>Úkol 1 (Záchrana po instalaci softwaru - 7-zip):</strong> ${task1 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 2 (Záchrana po instalaci špatného ovladače):</strong> ${task2 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 3 (WinRE - Simulace havárie bootu):</strong> ${task3 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
          <li><strong>Úkol 4 (Záchrana poškozeného skriptu přes VSS shadow copy):</strong> ${task4 ? 'Splněno ✅' : 'Nesplněno ❌'}</li>
        </ul>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_SystemState_${studentName.replace(/\\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <FsChapterShell
      chapterNumber={4}
      totalChapters={5}
      title="Zálohování"
      highlight="stavu systému"
      subtitle="Ochrana systému před chybnými ovladači, aktualizacemi a práce s Body obnovení (VSS)."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'teorie' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="bg-amber-50/50 p-6 sm:p-8 rounded-[2rem] border border-amber-100 flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 bg-amber-100 rounded-2xl flex items-center justify-center">
              <Settings className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">Bod obnovení (System Restore)</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Integrovaný nástroj ve Windows 11 pro záchranu OS. Vytváří rychlé snímky klíčových souborů a registrů pomocí technologie <strong>VSS (Volume Shadow Copy Service)</strong>. Umožňuje "cestování v čase" a návrat do funkčního stavu před kritickou chybou.
              </p>
              <div className="bg-white p-5 rounded-2xl border border-amber-200 mb-6 shadow-sm">
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  <strong>Nejde o plnou kopii systému!</strong> Bod obnovení by jinak zabral stovky gigabajtů. Místo toho si VSS "vyfotí" výchozí stav a od té chvíle sleduje a <strong>zálohuje pouze samotné změny (změněné bloky dat)</strong>. Pokud nová aktualizace přepíše důležitý soubor, VSS starý soubor odchytí a schová.
                </p>
                
                {/* CSS Schéma VSS Deltas */}
                <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  
                  {/* Původní systém */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">1. Původní stav</span>
                    <div className="flex gap-1 mb-2">
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">A</div>
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">B</div>
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">C</div>
                    </div>
                    <p className="text-[10px] text-slate-500">Klíčové soubory</p>
                  </div>

                  <div className="text-slate-300 font-bold hidden md:block">→</div>

                  {/* VSS Záloha (Změna) */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">2. VSS Záloha (Změna)</span>
                    <div className="flex gap-1 mb-2 bg-amber-100 p-1 rounded-lg border border-amber-300">
                      <div className="w-8 h-8 border-2 border-dashed border-amber-200 rounded-md"></div>
                      <div className="w-8 h-8 border-2 border-dashed border-amber-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-md shadow-amber-200">C</div>
                    </div>
                    <p className="text-[10px] text-amber-700 leading-tight">Uloží se JEN původní blok C, než ho virus přepíše</p>
                  </div>

                  <div className="text-slate-300 font-bold hidden md:block">→</div>

                  {/* Zasažený systém */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-2">3. Zasažený systém</span>
                    <div className="flex gap-1 mb-2">
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">A</div>
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">B</div>
                      <div className="w-8 h-8 bg-rose-500 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]">X</div>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">Blok C byl přepsán chybným kódem (X)</p>
                  </div>

                  <div className="text-slate-300 font-bold hidden md:block">→</div>

                  {/* Obnovený systém */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">4. Návrat v čase</span>
                    <div className="flex gap-1 mb-2 bg-emerald-50 p-1 rounded-lg border border-emerald-200">
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">A</div>
                      <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-inner">B</div>
                      <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border-2 border-emerald-300">C</div>
                    </div>
                    <p className="text-[10px] text-emerald-700 leading-tight">Systém vezme C z VSS a přepíše s ním X</p>
                  </div>

                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href="https://support.microsoft.com/cs-cz/windows/experience/backup-recovery/system-restore" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  <MonitorUp className="w-4 h-4" /> Dokumentace Microsoft
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border-2 border-emerald-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><Database className="w-24 h-24 text-emerald-500" /></div>
              <h3 className="text-xl font-black text-emerald-800 mb-4 relative z-10">Co Bod obnovení ZÁLOHUJE?</h3>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-3 list-disc pl-4 relative z-10">
                <li><strong>Celý registr Windows:</strong> nastavení systému, služeb a programů.</li>
                <li><strong>Spustitelné a systémové soubory:</strong> přípony .exe, .dll, .sys a systémové skripty.</li>
                <li><strong>Ovladače hardware:</strong> konfiguraci grafiky, sítě, zvuku.</li>
                <li><strong>Instalační záznamy:</strong> MSI instalátory a odebrané Windows Update záplaty.</li>
                <li><strong>Plánované úlohy</strong> (Task Scheduler).</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-3xl border-2 border-rose-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><AlertTriangle className="w-24 h-24 text-rose-500" /></div>
              <h3 className="text-xl font-black text-rose-800 mb-4 relative z-10">Co NEZÁLOHUJE (Zlaté pravidlo)</h3>
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 mb-3 relative z-10">
                <p className="text-xs font-bold text-rose-800">Bod obnovení nikdy nemění, nesmazává ani neobnovuje vaše osobní data.</p>
              </div>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-3 list-disc pl-4 relative z-10">
                <li><strong>Uživatelské soubory:</strong> Dokumenty, fotky, videa, plocha (pokud vytvoříte fotku a vrátíte čas, fotka tam zůstane).</li>
                <li><strong>Hesla a účty:</strong> Vrácením času nezískáte zpět staré heslo (změněné heslo stále platí).</li>
                <li><strong>Hardwarová havárie disku:</strong> Bod obnovení vás nezachrání před smrtí SSD/HDD, protože snímky se ukládají fyzicky na tentýž disk <code>C:</code>. K tomu slouží tzv. <em>Obraz systému</em> (System Image) na externí médium.</li>
                <li><strong>Dlouhodobý archiv:</strong> Když vyčerpáte limit kapacity (např. 5 %), Windows bez varování <strong>začnou odmazávat nejstarší body</strong>. Nelze na ně tedy spoléhat po měsících.</li>
              </ul>
            </div>
          </div>

          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden mt-12">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-indigo-400" />
                Nástroje v praxi
              </h2>
              
              <div className="space-y-4">
                <div className="bg-indigo-800/50 p-5 rounded-2xl border border-indigo-700/50">
                  <h3 className="text-lg font-bold mb-2 text-indigo-100">Nově nainstalovaný program</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed">Pokud nainstalujete grafický ovladač a dnes vrátíte bod obnovy z minulého týdne, ovladač zcela zmizí a vrátí se ten starý.</p>
                </div>
                
                <div className="bg-indigo-800/50 p-5 rounded-2xl border border-indigo-700/50">
                  <h3 className="text-lg font-bold mb-2 text-indigo-100">Odinstalovaný program</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed">Pokud aplikaci odinstalujete a vrátíte bod před odinstalací, systém se pokusí její spouštěcí soubory a registrace znovu obnovit.</p>
                </div>
                
                <div className="bg-indigo-800/50 p-5 rounded-2xl border border-indigo-700/50">
                  <h3 className="text-lg font-bold mb-2 text-rose-400">Příklad smrtelné havárie (SATA/AHCI Ovladač)</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed mb-4">Pokud modrá smrt brání startu Windows, do grafického nástroje se nedostanete. Záchranou je <strong>WinRE (Windows Recovery Environment)</strong>. V praxi si ukážeme havárii vyvolanou poškozením systémového ovladače diskového řadiče.</p>
                  
                  <div className="bg-rose-950/50 border border-rose-900/50 p-4 rounded-xl mb-4">
                    <p className="text-xs text-rose-300 font-mono mb-2">Tento příkaz natvrdo smaže konfiguraci systémového ovladače disku z registru:</p>
                    <code className="text-rose-400 font-black text-sm block mb-3">reg delete "HKLM\SYSTEM\CurrentControlSet\Services\storahci" /f</code>
                    <ul className="text-xs text-rose-200/80 list-disc pl-4 space-y-1">
                      <li><strong>HKLM...storahci</strong>: Cesta ke standardnímu ovladači AHCI řadiče disků.</li>
                      <li><strong>/f</strong>: Smaže klíč okamžitě bez potvrzení.</li>
                      <li><strong>Efekt:</strong> Za běhu se nic nestane (ovladač už je v paměti). Ale při příštím startu Windows ztratí schopnost komunikovat s diskem a okamžitě zhavarují do BSOD (INACCESSIBLE_BOOT_DEVICE).</li>
                    </ul>
                  </div>

                  <ul className="text-sm text-indigo-200 leading-relaxed list-disc pl-4 space-y-1">
                    <li>K záchraně slouží skrytý oddíl <strong>WinRE (Recovery Partition)</strong>, do kterého se rozbité Windows po třetím neúspěšném startu přepnou samy.</li>
                    <li>Tento oddíl nepoužívá rozbitý registr C: disku, funguje nezávisle a obsahuje záchranné nástroje.</li>
                    <li><strong>Varování:</strong> Pokud je systémový disk zašifrován BitLockerem, WinRE zablokuje přístup k obnovení, dokud nezadáte velmi dlouhý <em>BitLocker Recovery klíč</em>. Bez něj je obnova nemožná.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'list' && (
        <WorksheetLayout
          title="Stav systému (System State)"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={handleDownload}
        >
          <div className="space-y-12">
            
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2 text-lg">Cíl cvičení</h3>
              <p className="text-sm text-amber-800 leading-relaxed mb-4">Naučit se pracovat s nástrojem Obnovení systému ve Windows 11. Zachránit systém před instalací nežádoucího softwaru, chybného ovladače a pochopit, jak z „neviditelné“ stínové kopie (VSS) manuálně vydolovat přepsaný soubor.</p>
            </div>

            {/* Úkol 1 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm">1</span>
                Úkol 1: Instalace aplikace (Bod obnovení)
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed">
                Zkontrolujte, zda je zapnuta ochrana pro systémový disk C:. Pokud ne, zapněte ji.
              </p>
              
              <div className="pl-11">
                <details className="bg-white border border-amber-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden mb-4 shadow-sm group">
                  <summary className="p-3 bg-amber-50 cursor-pointer font-bold text-sm text-amber-900 hover:bg-amber-100 transition-colors flex items-center justify-between">
                    <span>Jak zkontrolovat a zapnout ochranu disku C:?</span>
                    <span className="text-amber-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 text-sm text-slate-600 leading-relaxed space-y-2 border-t border-amber-100">
                    <p>1. Stiskněte klávesu <strong>Win</strong>, napište <em>Vytvořit bod obnovení</em> (Create a restore point) a otevřete nalezenou položku.</p>
                    <p>2. V okně Vlastnosti systému na záložce <strong>Ochrana systému</strong> se podívejte do sekce <em>Nastavení ochrany</em>.</p>
                    <p>3. U disku <strong>Místní disk (C:) (Systém)</strong> musí být ve sloupci Ochrana napsáno <strong>Zapnuto</strong>.</p>
                    <p>4. Pokud je tam Vypnuto, klikněte na tento disk, zvolte tlačítko <strong>Konfigurovat...</strong>, vyberte <em>Zapnout ochranu systému</em> (nastavte maximální využití např. na 5 %) a klikněte na OK.</p>
                  </div>
                </details>
              </div>

              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li>Vytvořte bod s názvem <strong>Pred_Instalaci_Noveho_SW</strong>.</li>
                <li>Pomocí <code>winget</code> (v cmd) nainstalujte program <strong>7-zip</strong> (<code>winget install 7zip.7zip</code>).</li>
                <li>Otevřete nástroj Obnovení systému, najděte ovlivněné programy při obnovení do tohoto bodu. Je tam 7-zip uveden jako program, který bude odstraněn?</li>
                <li>Obnovte systém do tohoto bodu a po restartu ověřte, že 7-zip zmizel.</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task1} onChange={e => setTask1(e.target.checked)} className="w-5 h-5 text-amber-600 rounded" />
                  <span className="font-bold text-slate-700">Mám splněno</span>
                </label>
              </div>
            </div>

            {/* Úkol 2 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm">2</span>
                Úkol 2: Instalace ovladače
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pl-16 space-y-2">
                <li>Vytvořte bod s názvem <strong>Pred_Instalaci_Noveho_Ovladače</strong>.</li>
                <li>Přes Správce zařízení přidáte starší hardware (tiskárnu <code>generic/generic-text only</code>).</li>
                <li>Opět zkontrolujte ovlivněné části v Bodu obnovy a proveďte návrat systému v čase.</li>
                <li>Ověřte, že fiktivní tiskárna zmizela.</li>
              </ul>
              <div className="pl-11 mt-4">
                <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                  <input type="checkbox" checked={task2} onChange={e => setTask2(e.target.checked)} className="w-5 h-5 text-amber-600 rounded" />
                  <span className="font-bold text-slate-700">Mám splněno</span>
                </label>
              </div>
            </div>

            {/* Úkol 3 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center text-sm">3</span>
                Úkol 3: Destrukce diskového ovladače a záchrana přes WinRE
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed mb-4">
                Vyzkoušíme si totální destrukci bootovacího procesu zásahem do registru. Poškodíme záznam systémového ovladače disku, což počítač při dalším startu vyřadí z provozu (Modrá smrt). Jedinou záchranou bude oddíl WinRE.
              </p>
              
              <div className="pl-11 space-y-4">
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Krok A: Příprava Bodu záchrany</h4>
                  <p className="text-sm text-slate-600">Pro jistotu si před tímto "experimentem" vytvořte bod obnovení s názvem <strong>Pred_Kritickym_Zasahem</strong>.</p>
                </div>
                
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow-sm">
                  <h4 className="text-sm font-bold text-rose-900 mb-2">Krok B: Skutečná destrukce v Registrech</h4>
                  <p className="text-sm text-rose-800 mb-2">Spusťte Příkazový řádek jako <strong>Správce</strong> a zkopírujte do něj tento destruktivní příkaz:</p>
                  <code className="text-rose-600 font-mono text-sm block mb-2 p-2 bg-rose-100/50 rounded-lg border border-rose-200/50">
                    reg delete "HKLM\SYSTEM\CurrentControlSet\Services\storahci" /f
                  </code>
                  <p className="text-sm text-rose-800">Příkaz musí ohlásit "Operace byla úspěšně dokončena". <strong>Ihned poté běžte do nabídky Start a běžně restartujte počítač.</strong></p>
                </div>

                <div className="bg-blue-900 text-white p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-blue-300 mb-2">Krok C: Modrá smrt a náběh WinRE</h4>
                  <p className="text-sm text-blue-100 mb-2">Počítač se pokusí spustit Windows, ale nemůže najít ovladač disku. Vyskočí Modrá obrazovka (INACCESSIBLE BOOT DEVICE) a počítač se znovu restartuje.</p>
                  <p className="text-sm text-blue-100">Jelikož systém poznal, že se nezvládl spustit, při dalším pokusu automaticky nastartuje <strong>Diagnostiku a Automatickou opravu (WinRE)</strong>. Objeví se modré záchranné menu.</p>
                </div>
                
                <div className="bg-white border-2 border-emerald-200 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-emerald-800 mb-2">Krok D: Obnova mrtvého systému</h4>
                  <p className="text-sm text-emerald-700 mb-2">V záchranném menu WinRE se proklikejte k nástroji pro Obnovení:</p>
                  <ul className="text-sm text-emerald-700 list-disc pl-5 space-y-1">
                    <li>Zvolte <strong>Odstranit potíže</strong> (Troubleshoot) -&gt; <strong>Upřesnit možnosti</strong> (Advanced options).</li>
                    <li>Klikněte na <strong>Obnovení systému</strong> (System Restore).</li>
                    <li>Nástroj si vyžádá výběr vašeho uživatelského účtu a zadání hesla (aby zamezil zneužití cizí osobou).</li>
                    <li>Vyberte vámi vytvořený bod <em>Pred_Kritickym_Zasahem</em> a dokončete proces. Systém zapojí správný ovladač zpět.</li>
                    <li>Jakmile se ukáže, že obnova proběhla úspěšně, klikněte na Restartovat. Windows znovu ožijí!</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                    <input type="checkbox" checked={task3} onChange={e => setTask3(e.target.checked)} className="w-5 h-5 text-rose-600 rounded" />
                    <span className="font-bold text-slate-700">WinRE záchrana nasimulována! Mám splněno ✅</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Úkol 4 */}
            <div className="space-y-4 relative">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm">4</span>
                Úkol 4: Záchrana poškozeného skriptu z VSS (stínová kopie)
              </h3>
              <p className="text-sm text-slate-600 pl-11 leading-relaxed mb-4">
                Někdy nechceme přetáčet celý systém dozadu, ale jenom vytáhnout z "fotografie v čase" jeden jediný důležitý systémový soubor.
              </p>
              
              <div className="pl-11 space-y-4">
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">1. Vytvoření souboru</h4>
                  <p className="text-sm text-slate-600">Vytvořte v Poznámkovém bloku (Spustit jako správce) soubor <code>C:\Windows\sluzba.bat</code> s textem "Funkcni skript".</p>
                </div>
                
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">2. Snímek času</h4>
                  <p className="text-sm text-slate-600">Vytvořte Bod obnovení s názvem <strong>Pred_Pokozenim</strong>.</p>
                </div>
                
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">3. Simulace poškození</h4>
                  <p className="text-sm text-slate-600">Otevřete <code>sluzba.bat</code> a přepište jej na "CHYBA: SOUBOR BYL POSKOZEN". Uložte.</p>
                </div>
                
                <div className="bg-slate-800 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-amber-400 mb-2">4. Průnik do stínové kopie (cmd jako správce)</h4>
                  <div className="font-mono text-xs text-slate-300 leading-loose">
                    <span className="text-emerald-400"># Zjištění adresy stínové kopie</span><br/>
                    vssadmin list shadows<br/>
                    <br/>
                    <span className="text-emerald-400"># Vytvoření speciálního symbolického odkazu (cesta se může lišit dle vašeho PC!)</span><br/>
                    mklink /d C:\\Zaloha_Stin \\\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1\\
                  </div>
                  
                  <div className="mt-4">
                    <details className="bg-slate-700/50 border border-slate-600 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden group">
                      <summary className="p-3 cursor-pointer font-bold text-sm text-amber-400 hover:bg-slate-700 transition-colors flex items-center justify-between">
                        <span>Co dělá příkaz mklink a proč ho používáme?</span>
                        <span className="text-amber-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-4 text-sm text-slate-300 leading-relaxed space-y-3 border-t border-slate-600">
                        <p><strong>K čemu je to dobré:</strong> Stínová kopie je na disku schovaná a systém do ní z bezpečnostních důvodů Průzkumníka nepustí. Pomocí symbolického odkazu (directory link) si vytvoříme na disku <code>C:\\</code> "falešnou" složku, která funguje jako červí díra – jakmile ji otevřeme, díváme se do zamrzlého času uvnitř stínové kopie, ale Průzkumník si myslí, že je to obyčejná složka na disku.</p>
                        <p><strong>Jak vytvořit:</strong> <code>mklink /d [Cesta_kde_chci_zastupce] [Adresa_kam_ma_zastupce_vezt]</code><br/>Přepínač <code>/d</code> říká, že vytváříme odkaz na adresář (directory).</p>
                        <p><strong>Jak odstranit:</strong> Odkaz na složku se odstraňuje stejně jako běžná složka. V příkazovém řádku použijeme <code>rmdir C:\\Zaloha_Stin</code>, nebo jednoduše "složku" smažeme přímo v Průzkumníku klávesou Delete. Stínová kopie se tím nesmaže, zrušíme jen náš přístupový tunel do ní.</p>
                      </div>
                    </details>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">5. Záchrana a úklid</h4>
                  <p className="text-sm text-slate-600">
                    Nyní běžte do Průzkumníku na <code>C:</code>. Složka <code>Zaloha_Stin</code> se chová jako disk v minulosti. 
                    Najděte uvnitř funkční <code>sluzba.bat</code> a <strong>zkopírujte ho</strong> přes ten rozbitý v reálném <code>C:\Windows\</code>.
                    Nakonec přes <code>rmdir C:\Zaloha_Stin</code> odkaz zrušte.
                  </p>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-max">
                    <input type="checkbox" checked={task4} onChange={e => setTask4(e.target.checked)} className="w-5 h-5 text-amber-600 rounded" />
                    <span className="font-bold text-slate-700">Skript zachráněn a systém vrácen! Mám splněno ✅</span>
                  </label>
                </div>
              </div>
            </div>
            
          </div>
        </WorksheetLayout>
      )}

    </FsChapterShell>
  );
};

export default BackupSystemChapter;
