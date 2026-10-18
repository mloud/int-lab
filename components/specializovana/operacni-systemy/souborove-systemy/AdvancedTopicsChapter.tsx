'use client';

import React, { useState } from 'react';
import { 
  Database, MonitorPlay, Grid, Activity, 
  ShieldAlert, Trash2, HeartPulse, Wrench 
} from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  PracticeLink,
  Callout,
  RevealQuestions
} from './FsShared';
import { useRouter } from 'next/navigation';

export default function AdvancedTopicsChapter({ 
  onBack,
  onOpenAllocationGame,
  onOpenClusterSizeGame,
  onOpenDefragGame,
  onOpenChkdskGame
}: { 
  onBack: () => void,
  onOpenAllocationGame: () => void,
  onOpenClusterSizeGame: () => void,
  onOpenDefragGame?: () => void,
  onOpenChkdskGame?: () => void
}) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace a nástroje', icon: MonitorPlay },
  ];

  return (
    <FsChapterShell
      chapterNumber={99}
      title="Pokročilá témata a"
      highlight="údržba disku"
      subtitle="Fragmentace disku, defragmentace, oprava chyb (CHKDSK) a alokační strategie operačního systému."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          
          {/* A: Alokační strategie */}
          <TheoryCard icon={Database} title="Alokační strategie (First Fit, Best Fit, Worst Fit)" letter="A" tone="slate">
            <p>
              Když potřebuje operační systém uložit na disk nový soubor, musí najít volné clustery. Pokud je disk částečně zaplněný, vznikají na něm "díry" různých velikostí (např. 2 volné clustery, 5 volných clusterů, 1 volný cluster).
              OS se musí rozhodnout, do které z těchto děr soubor umístí. K tomu používá tři základní strategie.
            </p>

            <div className="mt-8 bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200">
              <div className="max-w-3xl mx-auto space-y-12">
                
                {/* FIRST FIT */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-4 text-sm tracking-widest">1. First Fit (První vhodná)</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    OS prochází disk od začátku a data zapíše do <strong>úplně první díry</strong>, do které se soubor vejde. Je to nejrychlejší metoda, ale často fragmentuje zbytek disku.
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => {
                      const isData = i === 0 || i === 4;
                      const isTarget = i === 1 || i === 2;
                      
                      let bgClass = isData ? 'bg-slate-300' : isTarget ? 'bg-indigo-500 shadow-md scale-105 z-10' : 'bg-white';
                      let borderClass = isData ? 'border-slate-400' : isTarget ? 'border-indigo-600' : 'border-slate-200';
                      let textTop = isTarget ? 'text-indigo-100' : 'text-slate-400';
                      let content = isData ? 'Data' : isTarget ? 'Zápis' : 'Volno';

                      return (
                        <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 relative transition-all ${bgClass} ${borderClass}`}>
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold mt-1 ${isTarget ? 'text-white' : 'text-slate-500'}`}>{content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* BEST FIT */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-4 text-sm tracking-widest">2. Best Fit (Nejlépe vyhovující)</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    OS projde celý disk, najde všechny volné díry a vybere tu, která je <strong>nejmenší možná, ale soubor se do ní ještě vejde</strong>. Šetří velké prázdné bloky pro velké soubory, ale zanechává za sebou spoustu malinkých děr.
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => {
                      const isData2 = i === 0 || i === 5;
                      const isTarget2 = i === 6 || i === 7;

                      let bgClass = isData2 ? 'bg-slate-300' : isTarget2 ? 'bg-emerald-500 shadow-md scale-105 z-10' : 'bg-white';
                      let borderClass = isData2 ? 'border-slate-400' : isTarget2 ? 'border-emerald-600' : 'border-slate-200';
                      let textTop = isTarget2 ? 'text-emerald-100' : 'text-slate-400';
                      let content = isData2 ? 'Data' : isTarget2 ? 'Zápis' : 'Volno';

                      return (
                        <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 relative transition-all ${bgClass} ${borderClass}`}>
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold mt-1 ${isTarget2 ? 'text-white' : 'text-slate-500'}`}>{content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* WORST FIT */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-4 text-sm tracking-widest">3. Worst Fit (Nejhůře vyhovující)</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Opak Best Fitu. OS najde <strong>tu úplně největší možnou díru</strong> na disku a soubor zapíše do ní. Zbytek této velké díry pak zůstane dostatečně velký na to, aby se do něj dal zapsat další užitečný soubor.
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[...Array(8)].map((_, i) => {
                      const isData3 = i === 0 || i === 5;
                      const isTarget3 = i === 1 || i === 2;

                      let bgClass = isData3 ? 'bg-slate-300' : isTarget3 ? 'bg-rose-500 shadow-md scale-105 z-10' : 'bg-white';
                      let borderClass = isData3 ? 'border-slate-400' : isTarget3 ? 'border-rose-600' : 'border-slate-200';
                      let textTop = isTarget3 ? 'text-rose-100' : 'text-slate-400';
                      let content = isData3 ? 'Data' : isTarget3 ? 'Zápis' : 'Volno';

                      return (
                        <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 relative transition-all ${bgClass} ${borderClass}`}>
                          <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                          <div className={`text-[10px] font-bold mt-1 ${isTarget3 ? 'text-white' : 'text-slate-500'}`}>{content}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </TheoryCard>

          {/* B: Fragmentace a defragmentace */}
          <TheoryCard icon={HeartPulse} title="Fragmentace disku a defragmentace" letter="B" tone="indigo">
            <p>
              Po delším používání disku (opakovaný zápis, úpravy a mazání souborů) vznikají v datové oblasti nepravidelné "díry" volného místa. 
              Když pak ukládáte větší soubor, operační systém ho musí rozdělit (<strong>fragmentovat</strong>) do několika nesouvislých bloků napříč celým diskem.
            </p>
            
            <div className="mt-6 space-y-4">
              <Callout kind="tip" title="HDD: Proč je defragmentace nutná">
                <p>
                  Rozkouskovaný soubor se z mechanického pevného disku (HDD) čte <strong>velmi pomalu</strong>, protože čtecí hlavička musí fyzicky přeskakovat ze stopy na stopu (seek time). 
                  Proces <strong>defragmentace</strong> poskládá jednotlivé clustery souboru pěkně za sebe do souvislé řady, čímž čtení výrazně urychlí.
                </p>
              </Callout>

              <Callout kind="warning" title="SSD: Proč se SSD disky NIKDY nedeframentují!">
                <p>
                  U disků SSD neexistuje žádná mechanická hlavička – elektronický řadič přistupuje ke všem paměťovým buňkám stejnou rychlostí v řádu mikrosekund. 
                  Defragmentace u SSD disků <strong>nepřinese žádné zrychlení</strong>, ale naopak zbytečně spotřebovává omezený počet zápisových cyklů flash paměti (zkracuje životnost disku). 
                  Místo toho se u SSD používá příkaz <strong>TRIM</strong>, který řadiči hlásí smazané bloky k bezpečnému vyčištění na pozadí.
                </p>
              </Callout>
            </div>
          </TheoryCard>

          {/* C: Co se děje při smazání souboru */}
          <TheoryCard icon={Trash2} title="Mazání souborů a mýtus o prázdném disku" letter="C" tone="rose">
            <p>
              Když v operačním systému smažete soubor (i přes <code>Shift + Delete</code> bez použití Koše), <strong>data z disku fyzicky nezmizí!</strong>
            </p>
            <p className="mt-4">
              Operační systém pouze v katalogu (MFT u NTFS nebo FAT tabulce) změní stav záznamu: uvolní číslo clusteru pro budoucí zápis a položku označí jako smazanou. 
              Fyzické sektory na disku však zůstávají netknuté, dokud je jiný nově ukládaný soubor nepřepíše novými daty.
            </p>
            <div className="mt-6">
              <Callout kind="warning" title="Bezpečnostní riziko při prodeji disku">
                <p>
                  Běžným smazáním ani Rychlým formátováním data nezničíte – kdokoliv s nástrojem jako <code>winfr</code> nebo Recuva je dokáže zachránit. 
                  Pro bezpečné vymazání je nutné použít <strong>Pomalé (úplné) formátování se zápisem nul</strong> nebo specializované nástroje pro bezpečný výmaz (tzv. disk wipe).
                </p>
              </Callout>
            </div>
          </TheoryCard>

          {/* Otázky k zamyšlení */}
          <RevealQuestions 
            questions={[
              {
                q: "Proč je záchrana smazaných dat vůbec možná?",
                a: "Protože při běžném smazání systém data fyzicky nepřepisuje nulami. Pouze v tabulce souborů (FAT / MFT) označí příslušné clustery jako volné pro budoucí zápis. Dokud na ně systém neuloží nový soubor, původní bajty v sektorech stále leží."
              },
              {
                q: "Mám si pořídit program na defragmentaci, pokud mám v počítači pouze SSD disk?",
                a: "Ne, to by byla chyba. U SSD neexistuje žádná mechanická čtecí hlavička, která by se zdržovala hledáním kousků. Defragmentace u SSD nepřinese zrychlení, ale jen zbytečně opotřebuje paměťové čipy nadbytečnými přepisy."
              },
              {
                q: "K čemu slouží nástroj CHKDSK?",
                a: "CHKDSK (Check Disk) kontroluje logickou a fyzickou integritu souborového systému. Hledá nesrovnalosti v alokačních tabulkách, odpojené 'sirotčí' clustery a testuje sektory na fyzické vady (Bad Sectors), které následně označí, aby na ně systém již nezapisoval."
              }
            ]} 
          />
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          {onOpenDefragGame && (
            <PracticeLink 
              tag="SIMULACE" 
              title="Defragmentace disku" 
              desc="Srovnejte rozkouskované soubory zpět k sobě jako v populárním nástroji Windows." 
              icon={Activity} 
              tone="sky" 
              onClick={onOpenDefragGame} 
            />
          )}

          {onOpenChkdskGame && (
            <PracticeLink 
              tag="SIMULACE" 
              title="Oprava chyb (CHKDSK)" 
              desc="Najděte vadné sektory na disku a zachraňte z nich data dříve, než bude pozdě." 
              icon={ShieldAlert} 
              tone="rose" 
              onClick={onOpenChkdskGame} 
            />
          )}

          <PracticeLink 
            tag="SIMULACE" 
            title="Alokační strategie" 
            desc="Vyzkoušejte si First Fit, Best Fit a Worst Fit v interaktivním trenažéru." 
            icon={Database} 
            tone="emerald" 
            onClick={onOpenAllocationGame} 
          />

          <PracticeLink 
            tag="HRA" 
            title="Velikost clusteru a ztráta místa" 
            desc="Spočítejte si, jak moc plýtváte místem na disku v závislosti na zvolené alokační jednotce." 
            icon={Grid} 
            tone="purple" 
            onClick={onOpenClusterSizeGame} 
          />
        </div>
      )}
    </FsChapterShell>
  );
}
