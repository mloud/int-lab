'use client';

import React, { useState } from 'react';
import { 
  GitBranch, 
  Cpu, 
  Layers, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RotateCcw,
  Monitor,
  Flame,
  Globe
} from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  RevealQuestions 
} from '../souborove-systemy/FsShared';

interface ProcessThreadsChapterProps {
  onBack: () => void;
}

export default function ProcessThreadsChapter({ onBack }: ProcessThreadsChapterProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'demo'>('theory');

  // Interaktivní stav pro ukázku vláken
  const [demoMode, setDemoMode] = useState<'single' | 'multi'>('single');
  const [isSimulatingDisk, setIsSimulatingDisk] = useState(false);

  const triggerDiskLoad = () => {
    setIsSimulatingDisk(true);
    setTimeout(() => {
      setIsSimulatingDisk(false);
    }, 2500);
  };

  const tabs = [
    { id: 'theory', label: 'Teorie & Schémata', icon: GitBranch },
    { id: 'demo', label: 'Jednovláknový vs. Vícevláknový běh', icon: Zap },
  ];

  return (
    <FsChapterShell
      chapterNumber={3}
      totalChapters={3}
      title="Vlákna (Threads):"
      highlight="Dělníci uvnitř procesu"
      subtitle="Proč je proces těžkopádný, co je to vlákno a jak sdílená paměť umožňuje plynulý běh her a moderních aplikací."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as any)}
      onBack={onBack}
    >
      {/* ========================================================================= */}
      {/* ZÁLOŽKA 1: VÝKLADOVÁ TEORIE                                               */}
      {/* ========================================================================= */}
      {activeTab === 'theory' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          
          {/* BLOK A: Problém jednoho vlákna */}
          <TheoryCard icon={Cpu} title="Problém těžkotonážního procesu" letter="A" tone="indigo">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              V předchozích kapitolách jsme se naučili, že proces má svou vlastní vyhrazenou paměť RAM, 
              svůj vlastní virtuální prostor a vlastní kód. Proces je ale **těžkotonážní kontejner**.
            </p>

            <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200 mb-6">
              <h4 className="font-bold text-amber-950 text-base mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" /> Co se stane ve hře s jediným vláknem?
              </h4>
              <p className="text-sm text-amber-900 leading-relaxed mb-3">
                Představte si 3D akční hru. Pokud hra běží jako <strong>jedno jediné vlákno</strong>, procesor provádí všechny instrukce za sebou v jedné řadě:
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-300 font-mono text-xs text-slate-800 leading-relaxed">
                Vykresli snímek (16 ms) ➔ Spočítej fyziku (5 ms) ➔ <strong>Načti velkou texturu z disku (2000 ms = 2 vteřiny!)</strong>
              </div>
              <p className="text-sm text-amber-900 leading-relaxed mt-3">
                Zatímco disk 2 vteřiny čte soubor, <strong>celá hra zamrzne</strong>! Zvuk se zasekne, ovládání nereaguje a na obrazovce se točí kolečko. To je pro moderní software nepřijatelné.
              </p>
            </div>
          </TheoryCard>

          {/* BLOK B: Co je to Vlákno (Thread) */}
          <TheoryCard icon={GitBranch} title="Co je to Vlákno (Thread) a sdílená paměť" letter="B" tone="emerald">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              Řešením jsou <strong>vlákna (Threads)</strong>. Vlákno je „dělník uvnitř procesu“. 
              Proces představuje budovu firmy (paměť a prostředky) a vlákna jsou zaměstnanci, kteří v této budově společně pracují.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <span className="text-xs font-mono font-bold uppercase text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  Kontejner
                </span>
                <h4 className="font-black text-slate-900 text-base mt-2 mb-1">Proces (Process)</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Vlastní izolovaný adresní prostor v RAM, vlastní PID. Dva procesy navzájem do své paměti nevidí.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                <span className="text-xs font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Výpočetní tok
                </span>
                <h4 className="font-black text-emerald-950 text-base mt-2 mb-1">Vlákno (Thread)</h4>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  Běží <strong>uvnitř procesu</strong>. Všechna vlákna daného procesu <strong>sdílí stejnou paměť a proměnné</strong>! Každé vlákno má jen svůj vlastní čítač instrukcí (PC).
                </p>
              </div>
            </div>

            {/* VEKTOROVÉ SCHÉMA: PROCES A JEHO VLÁKNA */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 mb-6">
              <div className="text-center font-mono text-xs font-black uppercase text-emerald-800 bg-emerald-100 py-1 px-3 rounded-full mb-4 inline-block">
                Schéma: Proces s více vlákny a sdílenou pamětí
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex justify-center">
                <svg viewBox="0 0 680 280" className="w-full max-w-[640px] h-auto">
                  {/* HRANICE CELÉHO PROCESU */}
                  <rect x="30" y="20" width="620" height="240" rx="20" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
                  <text x="340" y="46" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">
                    PROCES HRY (PID: 2048) – SPOLEČNÝ PAMĚŤOVÝ PROSTOR
                  </text>

                  {/* SPOLEČNÁ DATA PROCESU */}
                  <rect x="50" y="65" width="220" height="175" rx="14" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2.5" />
                  <text x="160" y="90" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">SPOLEČNÁ DATA (RAM)</text>
                  <text x="160" y="110" textAnchor="middle" fill="#b45309" fontSize="10">Sdíleno všemi vlákny!</text>
                  
                  <rect x="65" y="125" width="190" height="30" rx="6" fill="#ffffff" stroke="#fde68a" />
                  <text x="160" y="145" textAnchor="middle" fill="#78350f" fontSize="11" fontFamily="monospace">skore = 12 500</text>
                  
                  <rect x="65" y="165" width="190" height="30" rx="6" fill="#ffffff" stroke="#fde68a" />
                  <text x="160" y="185" textAnchor="middle" fill="#78350f" fontSize="11" fontFamily="monospace">pozice_hrace: [X, Y, Z]</text>

                  {/* 3 VLÁKNA BĚŽÍCÍ UVNITŘ PROCESU */}
                  <rect x="290" y="65" width="340" height="175" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
                  <text x="460" y="90" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="bold">3 BĚŽÍCÍ VLÁKNA (THREADS)</text>

                  {/* Vlákno 1 */}
                  <rect x="310" y="105" width="300" height="36" rx="8" fill="#ffffff" stroke="#86efac" />
                  <text x="325" y="127" fill="#15803d" fontSize="11" fontWeight="bold">🧵 Vlákno 1:</text>
                  <text x="410" y="127" fill="#334155" fontSize="11">Vykreslování grafiky (60 FPS)</text>
                  <circle cx="585" cy="123" r="5" fill="#22c55e" />

                  {/* Vlákno 2 */}
                  <rect x="310" y="148" width="300" height="36" rx="8" fill="#ffffff" stroke="#86efac" />
                  <text x="325" y="170" fill="#15803d" fontSize="11" fontWeight="bold">🧵 Vlákno 2:</text>
                  <text x="410" y="170" fill="#334155" fontSize="11">Výpočet fyziky a ovládání hráče</text>
                  <circle cx="585" cy="166" r="5" fill="#22c55e" />

                  {/* Vlákno 3 */}
                  <rect x="310" y="191" width="300" height="36" rx="8" fill="#ffffff" stroke="#86efac" />
                  <text x="325" y="213" fill="#15803d" fontSize="11" fontWeight="bold">🧵 Vlákno 3:</text>
                  <text x="410" y="213" fill="#334155" fontSize="11">Načítání dat z disku / stahování ze sítě</text>
                  <circle cx="585" cy="209" r="5" fill="#0284c7" />
                </svg>
              </div>
            </div>

            <Callout kind="tip" title="Proč je to tak efektivní?">
              Protože vlákna sdílí stejnou paměť, <strong>Vlákno 3</strong> může načíst data z disku rovnou do paměti a <strong>Vlákno 1</strong> je okamžitě vidí a začne vykreslovat! Nemusí se nic zdlouhavě kopírovat mezi procesy.
            </Callout>
          </TheoryCard>

          {/* BLOK C: Srovnání Proces vs. Vlákno */}
          <TheoryCard icon={Layers} title="Srovnání: Proces vs. Vlákno v praxi" letter="C" tone="purple">
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-slate-800">
                    <th className="py-3 px-4 font-black uppercase">Vlastnost</th>
                    <th className="py-3 px-4 font-black uppercase text-blue-700 bg-blue-50/50">Proces (Process)</th>
                    <th className="py-3 px-4 font-black uppercase text-emerald-700 bg-emerald-50/50">Vlákno (Thread)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-bold">Paměť</td>
                    <td className="py-3 px-4 bg-blue-50/30 font-semibold">Vlastní izolovaná paměť</td>
                    <td className="py-3 px-4 bg-emerald-50/30 font-semibold">Sdílená paměť v rámci procesu</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Náročnost na systém</td>
                    <td className="py-3 px-4 bg-blue-50/30">Těžký (vytvoření trvá déle)</td>
                    <td className="py-3 px-4 bg-emerald-50/30">Lehký (vytvoří se bleskově)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Důsledek pádu (Crash)</td>
                    <td className="py-3 px-4 bg-blue-50/30 text-emerald-700 font-bold">Pád neohrozí ostatní procesy</td>
                    <td className="py-3 px-4 bg-emerald-50/30 text-rose-700 font-bold">Pád vlákna shodí celý proces!</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout kind="warning" title="Příklad z praxe: Proč má Google Chrome tolik procesů?">
              Všimli jste si ve Správci úloh, že když otevřete 10 záložek v Google Chrome, máte tam 15 procesů?<br />
              Google dává <strong>každou záložku do samostatného procesu</strong>! Kdyby byly všechny záložky jen vlákna v jednom procesu a na jedné záložce spadl špatně napsaný skript, <strong>spadl by vám celý prohlížeč se všemi otevřenými weby</strong>. Izolace procesů vás chrání!
            </Callout>
          </TheoryCard>

          {/* OPAKOVACÍ OTÁZKY */}
          <RevealQuestions
            questions={[
              {
                q: 'Jaký je hlavní rozdíl mezi procesem a vláknem z hlediska paměti?',
                a: 'Proces má svůj vlastní izolovaný paměťový prostor, do kterého jiné procesy nesmí zasahovat. Vlákna běží uvnitř jednoho procesu a sdílí společnou paměť (proměnné a kód) daného procesu.'
              },
              {
                q: 'Proč moderní počítačové hry využívají více vláken?',
                a: 'Aby pomalé operace (např. načítání dat z disku nebo stahování ze sítě) nezastavily vykreslování obrazu a výpočet fyziky. Vlákno načítající data čeká na pozadí, zatímco grafické vlákno dál plynule generuje 60 snímků za sekundu.'
              },
              {
                q: 'Co se stane, když jedno vlákno v procesu zhavaruje (vyvolá kritickou chybu)?',
                a: 'Protože vlákna sdílí stejnou paměť, havárie jednoho vlákna obvykle způsobí pád celého procesu a všech jeho ostatních vláken.'
              }
            ]}
          />

        </div>
      )}

      {/* ========================================================================= */}
      {/* ZÁLOŽKA 2: INTERAKTIVNÍ UKÁZKA                                            */}
      {/* ========================================================================= */}
      {activeTab === 'demo' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-mono font-bold uppercase text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Praktická demonstrace
            </span>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-2">
              Jednovláknový zásek vs. Vícevláknová plynulost
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Vyzkoušejte si, co se stane, když aplikace začne číst pomalý soubor z disku v jednovláknovém vs. vícevláknovém režimu.
            </p>
          </div>

          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border-2 border-slate-200">
            
            {/* Přepínač režimu */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setDemoMode('single')}
                className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                  demoMode === 'single'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                1. Režim: Jedno vlákno (Zastaralé)
              </button>

              <button
                onClick={() => setDemoMode('multi')}
                className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                  demoMode === 'multi'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                2. Režim: Více vláken (Moderní)
              </button>
            </div>

            {/* Vizuální scéna hry */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-slate-200 shadow-sm relative overflow-hidden mb-6">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">Stav animace postavy:</span>
                  <div className="text-lg font-black text-slate-800">
                    {isSimulatingDisk && demoMode === 'single' ? (
                      <span className="text-rose-600 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 animate-bounce" /> APLIKACE ZAMRZLA! (Čeká na disk)
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> BĚŽÍ PLYNULE (60 FPS)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={triggerDiskLoad}
                  disabled={isSimulatingDisk}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all ${
                    isSimulatingDisk
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:scale-105'
                  }`}
                >
                  {isSimulatingDisk ? 'Načítám z disku...' : 'Simulovat: Načíst velký soubor z disku'}
                </button>
              </div>

              {/* Běžící animovaný prvek */}
              <div className="h-28 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg transition-transform ${
                    demoMode === 'single' && isSimulatingDisk
                      ? 'bg-rose-500 opacity-60 scale-95' 
                      : 'bg-emerald-500 animate-bounce'
                  }`}
                >
                  🎮
                </div>

                {isSimulatingDisk && (
                  <div className="absolute bottom-2 text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    💾 Čtení z plotnového disku probíhá...
                  </div>
                )}
              </div>

              <div className="mt-4 text-xs text-slate-500 leading-relaxed text-center">
                {demoMode === 'single' ? (
                  <p>
                    V jednovláknovém režimu musí grafika čekat, až disk dokončí čtení. <strong>Postava zamrzne na místě.</strong>
                  </p>
                ) : (
                  <p>
                    Ve vícevláknovém režimu načítá disk samostatné vlákno na pozadí. <strong>Postava skáče dál bez jediného záseku!</strong>
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </FsChapterShell>
  );
}
