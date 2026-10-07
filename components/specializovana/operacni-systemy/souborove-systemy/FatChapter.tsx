import React, { useState } from 'react';
import { 
  ArrowLeft, Grid, HardDrive, Layout, 
  MemoryStick, FileSearch, ShieldAlert,
  FolderOpen, HardDriveDownload, MonitorPlay, Save, Database, Trash2, Eraser, Table2
} from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  TermCard,
  RevealQuestions, 
  PracticeLink 
} from './FsShared';
import { useRouter } from 'next/navigation';

export default function FatChapter({ 
  onBack,
  onOpenFatGame,
  onOpenDeleteGame,
  onOpenFormatGame
}: { 
  onBack: () => void,
  onOpenFatGame: () => void,
  onOpenDeleteGame: () => void,
  onOpenFormatGame: () => void
}) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
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
      {activeTab === 'theory' && (
        <div className="space-y-12">
          
          <TheoryCard icon={HardDrive} title="Od hardwaru k softwaru" letter="A" tone="slate">
            <p>
              Zatím jsme se pohybovali na úrovni hardwaru. Víme, že disk je fyzicky rozdělen na <strong>sektory</strong> (typicky o velikosti 4 KB) a že tyto sektory umíme sdružit do logických <strong>oddílů</strong>. 
            </p>
            <p className="mt-4">
              Kdyby ale operační systém musel hledat fotky sektor po sektoru napříč gigabajty dat, zbláznil by se. Proto musíme prázdný oddíl <strong>naformátovat</strong> = vypálit na něj logickou mřížku a vytvořit katalog. Teprve tomu říkáme <strong>Souborový systém</strong> (File System) a teprve do něj umí Windows zapisovat složky a soubory.
            </p>
          </TheoryCard>

          <TheoryCard icon={Grid} title="Cluster (Alokační jednotka)" letter="B" tone="purple">
            <p>
              Operační systém neukládá data bajt po bajtu, ale vyhrazuje si pro ně pevné bloky zvané <strong>Clustery</strong> (neboli Alokační jednotky). Běžná velikost clusteru ve Windows je <strong>4 KB</strong>. U moderních disků (kde má i samotný fyzický sektor 4 KB) tak tvoří jeden cluster přesně jeden sektor. U starších disků s 512bajtovými sektory musel systém spojit 8 sektorů, aby vytvořil jeden 4KB cluster.
            </p>

            {/* Grid clusterů */}
            <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200 mt-6 mb-6">
              <div className="max-w-2xl mx-auto">
                <h4 className="font-bold text-slate-800 uppercase text-center mb-4 text-sm tracking-widest">Mřížka Clusterů (Alokačních jednotek)</h4>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                  {[...Array(24)].map((_, i) => {
                    const isFile1 = i >= 10 && i <= 12; // 3 clusters for big file
                    const isFile2 = i >= 3 && i <= 5;   // 3 single clusters for small files
                    
                    let bgClass = 'bg-white border-slate-200 text-slate-400';
                    let textTop = 'text-slate-300';
                    let textBot = 'text-slate-500';
                    let fillAmount = '0%';
                    
                    if (isFile1) {
                      bgClass = 'bg-purple-100 border-purple-400 overflow-hidden relative z-10';
                      textTop = 'text-purple-600 relative z-20';
                      textBot = 'text-purple-900 relative z-20';
                      fillAmount = i === 12 ? '50%' : '100%'; // last cluster half full
                    } else if (isFile2) {
                      bgClass = 'bg-emerald-100 border-emerald-400 overflow-hidden relative z-10';
                      textTop = 'text-emerald-600 relative z-20';
                      textBot = 'text-emerald-900 relative z-20';
                      fillAmount = i === 3 ? '10%' : i === 4 ? '25%' : '5%'; // small fills
                    }

                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-transform hover:scale-110 relative ${bgClass}`}
                      >
                        {/* Výplň dat */}
                        {(isFile1 || isFile2) && (
                          <div className={`absolute bottom-0 left-0 right-0 opacity-40 ${isFile1 ? 'bg-purple-500' : 'bg-emerald-500'}`} style={{ height: fillAmount }}></div>
                        )}
                        <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                        <div className={`text-[10px] font-bold ${textTop}`}>Cluster</div>
                        <div className={`text-xs font-black mt-1 ${textBot}`}>4 KB</div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Legenda k souborům */}
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="w-5 h-5 rounded bg-purple-500 shrink-0 mt-0.5 opacity-60"></div>
                    <div>
                      <div className="font-bold text-purple-900 text-sm">"video.mp4" (10 KB)</div>
                      <div className="text-xs text-purple-700 mt-1 leading-relaxed">
                        Velký soubor zabral celé clustery #10 a #11. Z clusteru #12 obsadil jen půlku. Zbylé 2 KB v clusteru #12 propadají (nikdo jiný je nesmí využít).
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                    <div className="w-5 h-5 rounded bg-emerald-500 shrink-0 mt-0.5 opacity-60"></div>
                    <div>
                      <div className="font-bold text-emerald-900 text-sm">3 malé soubory (po 1 KB)</div>
                      <div className="text-xs text-emerald-700 mt-1 leading-relaxed">
                        I když by se všechny 3 malé soubory s přehledem vešly do jednoho 4KB clusteru, OS to nedovolí! Každý musí obsadit svůj vlastní cluster (#3, #4, #5) a vyplýtvají tak zbytečně 12 KB místa na disku.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Callout kind="warning" title="Zlaté pravidlo clusteru (Vnitřní fragmentace)">
                <p>
                  Jeden soubor může na disku zabrat třeba tisíc clusterů, ale <strong>jeden cluster nikdy nemohou sdílet dva různé soubory</strong>. 
                </p>
                <p className="mt-2 text-sm">
                  <em>Pokud uložíte textový soubor o velikosti 1 Bajt, na disku reálně zabere celé 4 Kilobajty. Zbytek clusteru nenávratně propadne. Tomu se říká vnitřní fragmentace (slack space).</em>
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={FileSearch} title="Jak OS najde data? (Tabulka souborů)" letter="C" tone="sky">
            <p>
              Mřížka plná clusterů by byla jen hromadou nesrozumitelných jedniček a nul, kdyby k ní neexistoval "obsah". Proto má každý souborový systém někde na začátku disku schovanou <strong>Tabulku souborů</strong> (např. systém FAT nebo MFT). Ta funguje jako rejstřík v knížce a říká, ve kterých clusterech leží jaký soubor.
            </p>

            <div className="mt-8 flex flex-col xl:flex-row gap-8">
              {/* Levá část: Adresář a FAT tabulka */}
              <div className="xl:w-1/3 flex flex-col gap-4">
                
                {/* Adresář (Hlavičky souborů) */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col">
                  <h4 className="font-bold text-slate-800 uppercase text-xs mb-3 flex items-center gap-2"><FolderOpen className="w-4 h-4 text-slate-500" /> Adresář (Seznam)</h4>
                  <div className="text-xs w-full text-left rounded bg-slate-50 border border-slate-100 p-2">
                    <div className="flex justify-between border-b pb-1 mb-1 font-bold text-slate-600"><span>Název souboru</span><span>Start cluster</span></div>
                    <div className="flex justify-between text-sky-700 py-1"><span>zprava.txt</span><span className="font-mono font-bold">2</span></div>
                    <div className="flex justify-between text-amber-700 py-1"><span>dovolena.jpg</span><span className="font-mono font-bold">7</span></div>
                  </div>
                </div>

                {/* Samotná FAT tabulka */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm flex-1 flex flex-col">
                  <h4 className="font-bold text-slate-800 uppercase text-xs mb-3 flex items-center gap-2"><Table2 className="w-4 h-4 text-slate-500" /> FAT Tabulka (Řetězení)</h4>
                  <div className="text-xs w-full rounded grid grid-cols-2 gap-1 text-center font-mono">
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[0] 0</div>
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[1] 0</div>
                    
                    <div className="bg-sky-50 text-sky-700 border border-sky-200 rounded py-1 font-bold">[2] 3</div>
                    <div className="bg-sky-50 text-sky-700 border border-sky-200 rounded py-1 font-bold">[3] EOF</div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[4] 0</div>
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[5] 0</div>
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[6] 0</div>
                    
                    <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded py-1 font-bold">[7] 8</div>
                    <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded py-1 font-bold">[8] 14</div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[9] 0</div>
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[10] 0</div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[11] 0</div>
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[12] 0</div>
                    
                    <div className="bg-slate-50 border border-slate-100 rounded py-1 text-slate-400">[13] 0</div>
                    
                    <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded py-1 font-bold">[14] 15</div>
                    <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded py-1 font-bold">[15] EOF</div>
                  </div>
                  <div className="mt-4 p-3 bg-slate-50 text-[11px] text-slate-600 border border-slate-200 rounded-lg leading-relaxed">
                    <strong>EOF (End of File)</strong> znamená, že soubor v tomto clusteru končí. Číslo <strong>0</strong> znamená volný cluster. Všimněte si, jak je <em>dovolena.jpg</em> roztroušená.
                  </div>
                </div>
              </div>

              {/* Pravá část: Mřížka disku */}
              <div className="xl:w-2/3 bg-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200">
                <h4 className="font-bold text-slate-800 uppercase text-center mb-4 text-sm tracking-widest">Fyzický stav na disku</h4>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[...Array(24)].map((_, i) => {
                    const isSky = i === 2 || i === 3;
                    const isAmber = i === 7 || i === 8 || i === 14 || i === 15;
                    
                    let bgClass = 'bg-white border-slate-200 text-slate-400';
                    let textTop = 'text-slate-300';
                    
                    if (isSky) {
                      bgClass = 'bg-sky-500 border-sky-600 shadow-sm';
                      textTop = 'text-sky-100';
                    } else if (isAmber) {
                      bgClass = 'bg-amber-500 border-amber-600 shadow-sm';
                      textTop = 'text-amber-100';
                    }

                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-transform hover:scale-105 relative ${bgClass}`}
                      >
                        <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                        {isSky ? (
                           <div className={`text-[8px] sm:text-[9px] font-black mt-2 text-white opacity-90 tracking-wide uppercase text-center px-1 leading-tight`}>zprava<br/>.txt</div>
                        ) : isAmber ? (
                           <div className={`text-[8px] sm:text-[9px] font-black mt-2 text-white opacity-90 tracking-wide uppercase text-center px-1 leading-tight`}>dovolena<br/>.jpg</div>
                        ) : (
                           <div className={`text-[9px] font-bold mt-1 ${textTop}`}>Volno</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard icon={HardDriveDownload} title="Moderní systémy v praxi" letter="D" tone="emerald">
            <p>
              Jaký souborový systém (formát) zvolit pro váš disk či flashku?
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <TermCard term="NTFS" tone="sky">
                <p>
                  Standardní systém pro <strong>pevné disky s Windows</strong>. Zvládá obrovské soubory, hlídá přístupová práva uživatelů a při výpadku proudu zabrání chybám (tzv. žurnálování).
                </p>
              </TermCard>
              <TermCard term="FAT32" tone="amber">
                <p>
                  Absolutně <strong>nejkompatibilnější</strong>. Přečte ho Windows, Mac, stará televize i rádio v autě.
                  <br /><br />
                  <strong className="text-amber-900">Zásadní nevýhoda:</strong> Neumí uložit žádný soubor větší než 4 GB!
                </p>
              </TermCard>
              <TermCard term="exFAT" tone="emerald">
                <p>
                  Moderní evoluce pro <strong>velké flashky a SD karty</strong>. Ruší limit 4 GB a rozumí si bez problému s Windows, Linuxem i Apple macOS.
                </p>
              </TermCard>
            </div>
          </TheoryCard>

          <RevealQuestions 
            questions={[
              {
                q: "Proč má textový soubor obsahující jediné písmeno 'A' na disku reálnou velikost 4096 bajtů?",
                a: "Protože soubor zabere vždy minimálně jednu celou alokační jednotku (cluster). Výchozí velikost jednoho clusteru ve Windows je právě 4 KB (4096 bajtů)."
              },
              {
                q: "Je možné obnovit omylem smazané rodinné fotky, pokud jsem už vysypal Koš?",
                a: "Ano. Pokud na disk nebylo od smazání zapsáno příliš mnoho nových dat, dají se fotky zachránit specializovanými programy (např. Recuva). Smazáním se totiž pouze uvolnil 'ukazatel' v tabulce, samotná data ve fyzických sektorech zůstala nedotčena."
              },
              {
                q: "Mám zbrusu novou 64GB flashku. Chci na ni zkopírovat 8GB film. Zkopírování se ale hned přeruší s chybou. Proč?",
                a: "Flashka je z výroby pravděpodobně naformátovaná na zastaralý souborový systém FAT32, který nedokáže pracovat se soubory většími než 4 GB. Řešením je flashku v Počítači zformátovat (přepsat) na exFAT nebo NTFS."
              }
            ]} 
          />
        </div>
      )}

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
    </FsChapterShell>
  );
}
