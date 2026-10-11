import React, { useState } from 'react';
import {
  ArrowLeft, Grid, HardDrive, Layout,
  MemoryStick, FileSearch, ShieldAlert,
  FolderOpen, HardDriveDownload, MonitorPlay, Save, Database, Trash2, Eraser, Table2,
  ClipboardList, CheckSquare, Square, FileText, Terminal, ChevronDown
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
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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

  // Stav pracovního listu
  const [studentName, setStudentName] = useLocalStorage<string>('fs_fat_name', '');
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('fs_fat_answers', {});
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('fs_fat_checks', {});

  const handleAnswerChange = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));
  const toggleCheck = (id: string) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const downloadWorksheet = () => {
    const date = new Date().toLocaleDateString('cs-CZ');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Pracovní list - Systém souborů</title>
        <style>
          body { font-family: Calibri, Arial, sans-serif; line-height: 1.5; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 25px; }
          h1 { color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px; font-size: 20pt; }
          h2 { color: #334155; margin-top: 25px; font-size: 14pt; border-left: 4px solid #6366f1; padding-left: 10px; }
          .task { background-color: #f8fafc; padding: 14px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 18px; }
          .question { font-weight: bold; margin-bottom: 8px; color: #0f172a; font-size: 11pt; }
          .answer { background-color: #ffffff; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; min-height: 45px; font-family: monospace; font-size: 10pt; color: #1e1b4b; }
          .step { margin-bottom: 8px; font-size: 10.5pt; }
          .checked { color: #16a34a; font-weight: bold; }
          .unchecked { color: #94a3b8; }
          .meta { font-size: 11pt; margin-bottom: 20px; color: #475569; }
        </style>
      </head>
      <body>
        <h1>Pracovní list: Systém souborů v praxi</h1>
        <div class="meta">
          <p><strong>Jméno a příjmení studenta:</strong> ${studentName || '........................................'}<br/>
          <strong>Datum vypracování:</strong> ${date}<br/>
          <strong>Předmět:</strong> Operační systémy — Souborové systémy</p>
        </div>

        <h2>1. Velikost sektoru a clusteru</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['sec_1a'] ? 'checked' : 'unchecked'}">[ ${checkedItems['sec_1a'] ? 'X' : ' '} ]</span> Spusťte Příkazový řádek nebo PowerShell jako správce a zadejte příkazy: <code>fsutil fsinfo sectorinfo C:</code> a <code>fsutil fsinfo ntfsinfo C:</code></div>
          <div class="question">Jakou hodnotu fyzické velikosti sektoru (PhysicalBytesPerSector...) systém uvádí?</div>
          <div class="answer">${(answers['sector_size'] || '').replace(/\n/g, '<br/>')}</div>
        </div>
        <div class="task">
          <div class="question">Jakou velikost alokační jednotky / clusteru (Bytes Per Cluster) systém u disku uvádí?</div>
          <div class="answer">${(answers['cluster_size'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>2. Test 1B souboru a formátování oddílu (FAT32 vs. NTFS)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['sec_2a'] ? 'checked' : 'unchecked'}">[ ${checkedItems['sec_2a'] ? 'X' : ' '} ]</span> Naformátujte oddíl na systém souborů FAT32, uložte na něj soubor <code>znak.txt</code> o velikosti 1 bajt (písmeno A) a otevřete jeho Vlastnosti.</div>
          <div class="question">Kolik místa na disku (Velikost na disku) zabral soubor v systému FAT32?</div>
          <div class="answer">${(answers['fat32_1b_size'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="step"><span class="${checkedItems['sec_2b'] ? 'checked' : 'unchecked'}">[ ${checkedItems['sec_2b'] ? 'X' : ' '} ]</span> Přeformátujte tentýž oddíl na systém souborů NTFS, uložte na něj znovu soubor <code>znak.txt</code> o velikosti 1 bajt a otevřete jeho Vlastnosti.</div>
          <div class="question">Kolik místa na disku (Velikost na disku) zabral soubor v systému NTFS?</div>
          <div class="answer">${(answers['ntfs_1b_size'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="question">Pomocí libovolného zdroje vysvětlete příčinu rozdílu: Proč tentýž 1bajtový soubor zabírá v systému FAT32 a NTFS tak odlišné množství místa?</div>
          <div class="answer">${(answers['fat_vs_ntfs_reason'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="step"><span class="${checkedItems['sec_2c'] ? 'checked' : 'unchecked'}">[ ${checkedItems['sec_2c'] ? 'X' : ' '} ]</span> Na tomto oddílu vyzkoušejte oba způsoby formátování: Rychlé formátování i Pomalé (úplné) formátování.</div>
          <div class="question">Co se děje se samotnými daty na disku a se strukturami souborového systému při Rychlém formátování a co při Pomalém (úplném) formátování?</div>
          <div class="answer">${(answers['format_principles'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>3. Limity FAT32 vs. exFAT (Bariéra 4 GB v praxi)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['lim_3a'] ? 'checked' : 'unchecked'}">[ ${checkedItems['lim_3a'] ? 'X' : ' '} ]</span> Naformátujte flash disk na systém souborů FAT32 (rychlým formátováním) a ověřte dostatek volného místa.</div>
          <div class="step"><span class="${checkedItems['lim_3b'] ? 'checked' : 'unchecked'}">[ ${checkedItems['lim_3b'] ? 'X' : ' '} ]</span> Ze sdíleného síťového disku se pokuste na flash disk zkopírovat soubor větší než 4 GB (např. 4,3 GB ISO obraz).</div>
          <div class="question">Jaká přesná chybová hláška se zobrazila, ačkoliv je na flashce dostatek volného místa?</div>
          <div class="answer">${(answers['fat32_error_msg'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="step"><span class="${checkedItems['lim_3c'] ? 'checked' : 'unchecked'}">[ ${checkedItems['lim_3c'] ? 'X' : ' '} ]</span> Přeformátujte flash disk na exFAT a zopakujte kopírování téhož velkého souboru.</div>
          <div class="question">Prošel zápis na exFAT úspěšně? Jaké jsou hlavní výhody exFAT oproti starému FAT32 a systémovému NTFS při použití na přenosných paměťových médiích?</div>
          <div class="answer">${(answers['exfat_benefits'] || '').replace(/\n/g, '<br/>')}</div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_System_souboru_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
              <div className="xl:w-[45%] flex flex-col gap-4">

                {/* Adresář (Hlavičky souborů) */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col">
                  <h4 className="font-bold text-slate-800 uppercase text-xs mb-3 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-slate-500" /> Adresář (Seznam souborů)
                  </h4>
                  <div className="text-xs w-full text-left rounded-xl bg-slate-50 border border-slate-200 p-2.5">
                    <div className="grid grid-cols-2 pb-1.5 mb-1.5 border-b border-slate-200 font-bold uppercase text-[10px] tracking-wider text-slate-500">
                      <span>Název souboru</span>
                      <span className="text-right">Počáteční cluster</span>
                    </div>
                    <div className="grid grid-cols-2 items-center text-sky-800 py-1 font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        zprava.txt
                      </span>
                      <span className="font-mono font-bold text-right text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded ml-auto">
                        Cluster #2
                      </span>
                    </div>
                    <div className="grid grid-cols-2 items-center text-amber-800 py-1 font-medium border-t border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        dovolena.jpg
                      </span>
                      <span className="font-mono font-bold text-right text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded ml-auto">
                        Cluster #7
                      </span>
                    </div>
                  </div>
                </div>

                {/* Samotná FAT tabulka */}
                <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-800 uppercase text-xs flex items-center gap-2">
                      <Table2 className="w-4 h-4 text-slate-500" /> FAT Tabulka (Řetězení clusterů)
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      Index ➔ Odkaz
                    </span>
                  </div>

                  {/* Názvy sloupců (Hlavička tabulky) */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-2.5 rounded-xl border border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">
                    <div className="pl-1">Číslo clusteru</div>
                    <div className="pl-1">Následující cluster</div>
                  </div>

                  {/* Řádky tabulky */}
                  <div className="space-y-1 font-mono text-xs max-h-[460px] overflow-y-auto pr-1">
                    {[
                      { cluster: 0, next: '0', file: null },
                      { cluster: 1, next: '0', file: null },
                      { cluster: 2, next: '3', file: 'zprava.txt' },
                      { cluster: 3, next: 'EOF', file: 'zprava.txt' },
                      { cluster: 4, next: '0', file: null },
                      { cluster: 5, next: '0', file: null },
                      { cluster: 6, next: '0', file: null },
                      { cluster: 7, next: '8', file: 'dovolena.jpg' },
                      { cluster: 8, next: '14', file: 'dovolena.jpg' },
                      { cluster: 9, next: '0', file: null },
                      { cluster: 10, next: '0', file: null },
                      { cluster: 11, next: '0', file: null },
                      { cluster: 12, next: '0', file: null },
                      { cluster: 13, next: '0', file: null },
                      { cluster: 14, next: '15', file: 'dovolena.jpg' },
                      { cluster: 15, next: 'EOF', file: 'dovolena.jpg' },
                    ].map((row) => {
                      const isSky = row.file === 'zprava.txt';
                      const isAmber = row.file === 'dovolena.jpg';

                      return (
                        <div
                          key={row.cluster}
                          className={`grid grid-cols-2 gap-2 p-1.5 rounded-lg border text-xs transition-colors items-center ${isSky
                              ? 'bg-sky-50/90 border-sky-200 text-sky-900 font-bold'
                              : isAmber
                                ? 'bg-amber-50/90 border-amber-200 text-amber-900 font-bold'
                                : 'bg-slate-50/40 border-slate-100 text-slate-400 hover:bg-slate-50'
                            }`}
                        >
                          {/* 1. Sloupec: Číslo clusteru */}
                          <div className="flex items-center gap-1.5 pl-1">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${isSky
                                  ? 'bg-sky-200 text-sky-950'
                                  : isAmber
                                    ? 'bg-amber-200 text-amber-950'
                                    : 'bg-slate-200/80 text-slate-600'
                                }`}
                            >
                              #{row.cluster}
                            </span>
                            {row.file && (
                              <span className="text-[10px] font-sans font-medium opacity-75 truncate">
                                ({row.file})
                              </span>
                            )}
                          </div>

                          {/* 2. Sloupec: Následující cluster */}
                          <div className="flex items-center gap-1.5 pl-1">
                            <span
                              className={`px-1.5 py-0.5 rounded font-black text-[11px] ${isSky
                                  ? 'bg-white border border-sky-300 text-sky-700 shadow-xs'
                                  : isAmber
                                    ? 'bg-white border border-amber-300 text-amber-700 shadow-xs'
                                    : 'text-slate-400'
                                }`}
                            >
                              {row.next}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 text-[11px] text-slate-600 border border-slate-200 rounded-xl leading-relaxed">
                    <strong>Jak číst FAT tabulku:</strong><br />
                    • <strong>1. sloupec (Číslo clusteru):</strong> Fyzická adresa bloku na disku.<br />
                    • <strong>2. sloupec (Následující cluster):</strong> Kam má systém skočit dál. Číslo <strong>0</strong> = volný cluster, <strong>číslo</strong> = odkaz na další cluster, <strong>EOF</strong> (End of File) = konec souboru.
                  </div>
                </div>
              </div>

              {/* Pravá část: Mřížka disku */}
              <div className="xl:w-[55%] bg-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200">
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
                          <div className={`text-[8px] sm:text-[9px] font-black mt-2 text-white opacity-90 tracking-wide uppercase text-center px-1 leading-tight`}>zprava<br />.txt</div>
                        ) : isAmber ? (
                          <div className={`text-[8px] sm:text-[9px] font-black mt-2 text-white opacity-90 tracking-wide uppercase text-center px-1 leading-tight`}>dovolena<br />.jpg</div>
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

          <TheoryCard icon={Eraser} title="Formátování: Co to je a co vlastně dělá?" letter="D" tone="rose">
            <p>
              Když koupíte nový disk nebo chcete flashku vyčistit, musíte ji <strong>naformátovat</strong>. Formátování je proces, kterým se na diskovém oddílu vytvoří prázdná kostra zvoleného souborového systému (např. FAT32 nebo NTFS).
            </p>
            <p className="mt-4">
              Při formátování systém:
            </p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2 text-sm text-slate-600">
              <li>Rozdělí prostor na <strong>clustery</strong> pevné velikosti (např. 4 KB).</li>
              <li>Vytvoří <strong>prázdnou alokační tabulku</strong> (např. FAT tabulku plnou nul) a kořenový adresář složek.</li>
              <li>Zapíše spouštěcí záznam (Boot Sector / Volume Boot Record).</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-sky-50/70 border-2 border-sky-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                  <h4 className="font-black text-sky-950 text-sm uppercase tracking-wide">Rychlé formátování (Quick Format)</h4>
                </div>
                <p className="text-xs text-sky-900 leading-relaxed">
                  Trvá jen pár sekund. Pouze <strong>přepíše alokační tabulku a adresáře na nuly</strong>. Pro operační systém se disk jeví jako dokonale prázdný, ale samotná data ve fyzických sektorech disku stále leží. Lze je pomocí specializovaných programů často snadno obnovit.
                </p>
              </div>

              <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <h4 className="font-black text-rose-950 text-sm uppercase tracking-wide">Úplné / Pomalé formátování (Full Format)</h4>
                </div>
                <p className="text-xs text-rose-900 leading-relaxed">
                  Trvá desítky minut až hodiny. Kromě vymazání tabulky systém <strong>fyzicky projde celý povrch disku</strong>, otestuje vadné sektory a ve moderních Windows přepisuje data nulami (Zero-fill). Původní data jsou nenávratně zničena a nelze je již běžně obnovit.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Callout kind="tip" title="Kdy zvolit které?">
                Běžně vám stačí <strong>Rychlé formátování</strong> (při běžném použití či reinstalaci). <strong>Úplné formátování</strong> volte, pokud disk někomu prodáváte nebo darujete (ochrana soukromí) anebo máte podezření, že disk vykazuje chyby čtení a potřebujete otestovat jeho fyzický povrch.
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={HardDriveDownload} title="Moderní systémy v praxi" letter="E" tone="emerald">
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

      {activeTab === 'worksheet' && (
        <WorksheetLayout
          title="Pracovní list: Systém souborů v praxi"
          studentName={studentName}
          onStudentNameChange={setStudentName}
          onDownload={downloadWorksheet}
        >
          <div className="space-y-10">

            {/* ÚKOL 1 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-black">1</span>
                Velikost sektoru a clusteru
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Zjistěte skutečnou geometrii a velikost alokačních jednotek disku přímo v systému Windows.
              </p>

              <div className="space-y-3 mb-6">
                <div 
                  onClick={() => toggleCheck('sec_1a')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['sec_1a'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['sec_1a'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <span className={`text-sm font-medium ${checkedItems['sec_1a'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                      Spusťte Příkazový řádek (nebo PowerShell) jako správce a zadejte diagnostické příkazy: <code className="bg-slate-200/80 text-indigo-700 px-1.5 py-0.5 rounded font-bold text-xs">fsutil fsinfo sectorinfo C:</code> a <code className="bg-slate-200/80 text-indigo-700 px-1.5 py-0.5 rounded font-bold text-xs">fsutil fsinfo ntfsinfo C:</code>
                    </span>

                    {/* Rozbalovací box s doplňkovými informacemi */}
                    <details 
                      onClick={(e) => e.stopPropagation()} 
                      className="mt-3 text-xs bg-amber-50/90 border border-amber-200 rounded-xl p-3 cursor-pointer select-none group"
                    >
                      <summary className="font-bold text-amber-800 flex items-center gap-1.5 list-none hover:text-amber-900 transition-colors">
                        <Terminal className="w-3.5 h-3.5 text-amber-600" />
                        <span>Jak spustit Příkazový řádek / PowerShell jako správce?</span>
                        <ChevronDown className="w-3.5 h-3.5 ml-auto text-amber-600 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="mt-2 text-amber-900 leading-relaxed font-normal">
                        Stiskněte klávesu <kbd className="px-1.5 py-0.5 bg-white border border-amber-300 rounded shadow-xs">Win</kbd>, napište <code>cmd</code> nebo <code>powershell</code>, klikněte na nalezenou aplikaci pravým tlačítkem myši a zvolte <strong>Spustit jako správce</strong> (nebo použijte klávesovou zkratku <kbd className="px-1.5 py-0.5 bg-white border border-amber-300 rounded shadow-xs">Ctrl + Shift + Enter</kbd>).
                      </p>
                    </details>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    1.1 Fyzická velikost sektoru (PhysicalBytesPerSector...)
                  </label>
                  <textarea 
                    value={answers['sector_size'] || ''}
                    onChange={(e) => handleAnswerChange('sector_size', e.target.value)}
                    placeholder="Zapište zjištěnou hodnotu..."
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    1.2 Velikost alokační jednotky / clusteru (Bytes Per Cluster)
                  </label>
                  <textarea 
                    value={answers['cluster_size'] || ''}
                    onChange={(e) => handleAnswerChange('cluster_size', e.target.value)}
                    placeholder="Zapište zjištěnou hodnotu..."
                    className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* ÚKOL 2 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-black">2</span>
                Test 1B souboru a formátování oddílu (FAT32 vs. NTFS)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Na zvoleném disku či oddílu (např. na flash disku) porovnejte chování systémů FAT32 a NTFS při ukládání 1bajtového souboru a vyzkoušejte si oba způsoby formátování.
              </p>

              {/* Část A: FAT32 */}
              <div className="space-y-3 mb-4">
                <div 
                  onClick={() => toggleCheck('sec_2a')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['sec_2a'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['sec_2a'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['sec_2a'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    Naformátujte oddíl na systém souborů <strong>FAT32</strong>. V Poznámkovém bloku vytvořte soubor s jediným písmenem <code>A</code>, uložte jej na tento oddíl jako <code>znak.txt</code> a v Průzkumníku otevřete jeho <strong>Vlastnosti</strong>.
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  2.1 Kolik místa na disku (Velikost na disku) zabral soubor v systému FAT32?
                </label>
                <textarea 
                  value={answers['fat32_1b_size'] || ''}
                  onChange={(e) => handleAnswerChange('fat32_1b_size', e.target.value)}
                  placeholder="Zapište zjištěnou hodnotu..."
                  className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              {/* Část B: NTFS */}
              <div className="space-y-3 mb-4">
                <div 
                  onClick={() => toggleCheck('sec_2b')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['sec_2b'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['sec_2b'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['sec_2b'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    Přeformátujte tentýž oddíl na systém souborů <strong>NTFS</strong>. Uložte na něj znovu soubor <code>znak.txt</code> o velikosti 1 bajt (písmeno <code>A</code>) a otevřete jeho <strong>Vlastnosti</strong>.
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  2.2 Kolik místa na disku (Velikost na disku) zabral soubor v systému NTFS?
                </label>
                <textarea 
                  value={answers['ntfs_1b_size'] || ''}
                  onChange={(e) => handleAnswerChange('ntfs_1b_size', e.target.value)}
                  placeholder="Zapište zjištěnou hodnotu..."
                  className="w-full min-h-[65px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              {/* Otázka k zamyšlení */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  2.3 Pomocí libovolného zdroje vysvětlete příčinu rozdílu: Proč tentýž 1bajtový soubor zabírá v systému FAT32 a NTFS tak odlišné množství místa?
                </label>
                <textarea 
                  value={answers['fat_vs_ntfs_reason'] || ''}
                  onChange={(e) => handleAnswerChange('fat_vs_ntfs_reason', e.target.value)}
                  placeholder="Vysvětlete rozdíl mezi FAT32 a NTFS..."
                  className="w-full min-h-[85px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              {/* Část C: Praktická práce s formátováním */}
              <div className="space-y-3 mb-4">
                <div 
                  onClick={() => toggleCheck('sec_2c')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['sec_2c'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['sec_2c'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['sec_2c'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    Na tomto oddílu vyzkoušejte oba způsoby formátování: <strong>Rychlé formátování</strong> i <strong>Pomalé (úplné) formátování</strong> (se zrušeným zaškrtnutím Rychlé formátování).
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  2.4 Co se děje se samotnými daty na disku a se strukturami souborového systému při Rychlém formátování a co při Pomalém (úplném) formátování?
                </label>
                <textarea 
                  value={answers['format_principles'] || ''}
                  onChange={(e) => handleAnswerChange('format_principles', e.target.value)}
                  placeholder="Popište rozdíl mezi rychlým a pomalým formátováním..."
                  className="w-full min-h-[85px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* ÚKOL 3 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black">3</span>
                Limity FAT32 vs. exFAT (Bariéra 4 GB v praxi)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Prozkoumejte limity 32bitového souborového systému při práci s velkými moderními soubory.
              </p>

              <div className="space-y-3 mb-6">
                <div 
                  onClick={() => toggleCheck('lim_3a')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['lim_3a'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['lim_3a'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['lim_3a'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    V Průzkumníku naformátujte flash disk na systém souborů <strong>FAT32</strong> (použijte rychlé formátování) a zkontrolujte, že má disk dostatek volného místa.
                  </span>
                </div>
                <div 
                  onClick={() => toggleCheck('lim_3b')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['lim_3b'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['lim_3b'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['lim_3b'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    Ze sdíleného síťového disku (nebo od vyučujícího) se pokuste zkopírovat soubor o velikosti cca 4,3 GB (např. ISO instalační obraz nebo video) na flash disk formátovaný na FAT32.
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  3.1 Jaká přesná chybová hláška se v dialogu Windows zobrazila, ačkoliv je na disku mnoho gigabajtů volného místa?
                </label>
                <textarea 
                  value={answers['fat32_error_msg'] || ''}
                  onChange={(e) => handleAnswerChange('fat32_error_msg', e.target.value)}
                  placeholder="Zapište doslovné znění chybového hlášení..."
                  className="w-full min-h-[70px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              <div className="space-y-3 mb-6">
                <div 
                  onClick={() => toggleCheck('lim_3c')} 
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['lim_3c'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['lim_3c'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['lim_3c'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    Přeformátujte flash disk na systém souborů <strong>exFAT</strong> a zopakujte kopírování téhož velkého souboru (&gt; 4 GB).
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  3.2 Prošel zápis na exFAT úspěšně? Jaké jsou hlavní výhody exFAT oproti starému FAT32 a diskovému NTFS při použití na přenosných paměťových médiích (rychlost, podpora na macOS/Linuxu/TV)?
                </label>
                <textarea 
                  value={answers['exfat_benefits'] || ''}
                  onChange={(e) => handleAnswerChange('exfat_benefits', e.target.value)}
                  placeholder="Zapište zjištěné výhody systému exFAT..."
                  className="w-full min-h-[85px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>
            </div>

          </div>
        </WorksheetLayout>
      )}
    </FsChapterShell>
  );
}
