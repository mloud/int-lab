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

        <h2>2. Test 1B souboru (FAT32 vs. NTFS)</h2>
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

        <h2>3. Limity FAT32 vs. NTFS (Bariéra 4 GB v praxi)</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['lim_3a'] ? 'checked' : 'unchecked'}">[ ${checkedItems['lim_3a'] ? 'X' : ' '} ]</span> Naformátujte diskový oddíl <code>D:</code> na systém souborů FAT32 (příkazem <code>format D: /FS:FAT32 /Q</code> nebo v Průzkumníku) a ověřte dostatek volného místa.</div>
          <div class="step"><span class="${checkedItems['lim_3b'] ? 'checked' : 'unchecked'}">[ ${checkedItems['lim_3b'] ? 'X' : ' '} ]</span> Ze sdíleného síťového disku se pokuste na diskový oddíl <code>D:</code> zkopírovat soubor větší než 4 GB (např. 4,3 GB ISO obraz).</div>
          <div class="question">Jaká přesná chybová hláška se zobrazila, ačkoliv je na oddílu D: dostatek volného místa? Proč FAT32 soubor větší než 4 GB nedokáže uložit?</div>
          <div class="answer">${(answers['fat32_error_msg'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="step"><span class="${checkedItems['lim_3c'] ? 'checked' : 'unchecked'}">[ ${checkedItems['lim_3c'] ? 'X' : ' '} ]</span> Přeformátujte diskový oddíl <code>D:</code> v Průzkumníku na systém souborů NTFS a zopakujte kopírování téhož velkého souboru.</div>
          <div class="question">Prošel zápis na NTFS úspěšně? Jaké jsou maximální limity velikosti souboru v systému NTFS oproti starému FAT32?</div>
          <div class="answer">${(answers['ntfs_benefits'] || answers['exfat_benefits'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <h2>4. Obnova smazaných dat po Shift+Delete a po Rychlém formátování</h2>
        <div class="task">
          <div class="step"><span class="${checkedItems['rec_4a'] ? 'checked' : 'unchecked'}">[ ${checkedItems['rec_4a'] ? 'X' : ' '} ]</span> Instalace nástroje <code>Windows File Recovery</code> (winfr) z Microsoft Store, příprava oddílu <code>D:</code> (NTFS) a stažení testovacího obrázku jako <code>D:\\hora.jpg</code>.</div>
        </div>

        <div class="task">
          <div class="step"><span class="${checkedItems['rec_4b'] ? 'checked' : 'unchecked'}">[ ${checkedItems['rec_4b'] ? 'X' : ' '} ]</span> Trvalé smazání souboru klávesami Shift+Delete a obnova příkazem: <code>winfr D: C:\\Obnova /regular /n *.jpg</code>.</div>
          <div class="question">4.1 Podařilo se soubor v režimu /regular úspěšně obnovit a otevřít? Zůstal zachován původní název a velikost souboru?</div>
          <div class="answer">${(answers['rec_shift_del_result'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="step"><span class="${checkedItems['rec_4c'] ? 'checked' : 'unchecked'}">[ ${checkedItems['rec_4c'] ? 'X' : ' '} ]</span> Zkopírování souboru zpět na D:, Rychlé formátování oddílu D: a následná obnova hloubkovým režimem: <code>winfr D: C:\\Obnova2 /extensive /n *.jpg</code>.</div>
          <div class="question">4.2 Podařilo se soubor po rychlém formátování obnovit pomocí parametru /extensive? Proč tato obnova funguje i tehdy, když byl celý souborový systém zformátován?</div>
          <div class="answer">${(answers['rec_format_result'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <div class="task">
          <div class="question">4.3 Co z tohoto pokusu vyplývá pro bezpečnost dat? Proč pouhé smazání souborů ani Rychlé formátování nestačí, pokud disk prodáváte nebo vyřazujete? Jaký způsob formátování či vymazání byste museli použít pro bezpečné odstranění dat?</div>
          <div class="answer">${(answers['rec_security_conclusion'] || '').replace(/\n/g, '<br/>')}</div>
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
              Fyzický disk je členěn na základní <strong>sektory</strong> (typicky 4 KB), které se sdružují do logických <strong>diskových oddílů</strong>.
            </p>
            <p className="mt-4">
              Samotný oddíl je však pouze nestrukturovaný prostor. Teprve <strong>formátováním</strong> se na něm inicializuje <strong>souborový systém</strong> (File System), který vytváří <strong>katalog clusterů</strong> nezbytný pro zápis souborů a složek.
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
                      { cluster: 0, next: 'RES', file: 'FAT tabulka', isSystem: true },
                      { cluster: 1, next: 'RES', file: 'Záloha FAT', isSystem: true },
                      { cluster: 2, next: '3', file: 'zprava.txt', isSystem: false },
                      { cluster: 3, next: 'EOF', file: 'zprava.txt', isSystem: false },
                      { cluster: 4, next: '0', file: null, isSystem: false },
                      { cluster: 5, next: '0', file: null, isSystem: false },
                      { cluster: 6, next: '0', file: null, isSystem: false },
                      { cluster: 7, next: '8', file: 'dovolena.jpg', isSystem: false },
                      { cluster: 8, next: '14', file: 'dovolena.jpg', isSystem: false },
                      { cluster: 9, next: '0', file: null, isSystem: false },
                      { cluster: 10, next: '0', file: null, isSystem: false },
                      { cluster: 11, next: '0', file: null, isSystem: false },
                      { cluster: 12, next: '0', file: null, isSystem: false },
                      { cluster: 13, next: '0', file: null, isSystem: false },
                      { cluster: 14, next: '15', file: 'dovolena.jpg', isSystem: false },
                      { cluster: 15, next: 'EOF', file: 'dovolena.jpg', isSystem: false },
                    ].map((row) => {
                      const isSky = row.file === 'zprava.txt';
                      const isAmber = row.file === 'dovolena.jpg';
                      const isSystem = row.isSystem;

                      return (
                        <div
                          key={row.cluster}
                          className={`grid grid-cols-2 gap-2 p-1.5 rounded-lg border text-xs transition-colors items-center ${isSystem
                            ? 'bg-indigo-50/90 border-indigo-200 text-indigo-900 font-bold'
                            : isSky
                              ? 'bg-sky-50/90 border-sky-200 text-sky-900 font-bold'
                              : isAmber
                                ? 'bg-amber-50/90 border-amber-200 text-amber-900 font-bold'
                                : 'bg-slate-50/40 border-slate-100 text-slate-400 hover:bg-slate-50'
                            }`}
                        >
                          {/* 1. Sloupec: Číslo clusteru */}
                          <div className="flex items-center gap-1.5 pl-1">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${isSystem
                                ? 'bg-indigo-200 text-indigo-950 font-black'
                                : isSky
                                  ? 'bg-sky-200 text-sky-950'
                                  : isAmber
                                    ? 'bg-amber-200 text-amber-950'
                                    : 'bg-slate-200/80 text-slate-600'
                                }`}
                            >
                              #{row.cluster}
                            </span>
                            {row.file && (
                              <span className="text-[10px] font-sans font-medium opacity-85 truncate">
                                ({row.file})
                              </span>
                            )}
                          </div>

                          {/* 2. Sloupec: Následující cluster */}
                          <div className="flex items-center gap-1.5 pl-1">
                            <span
                              className={`px-1.5 py-0.5 rounded font-black text-[11px] ${isSystem
                                ? 'bg-white border border-indigo-300 text-indigo-700 shadow-xs'
                                : isSky
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
                    • <strong>#0 a #1:</strong> FAT tabulka a její záloha (uživatelská data začínají od #2).<br />
                    • <strong>Číslo:</strong> Odkaz na další navazující cluster souboru.<br />
                    • <strong>EOF (End of File):</strong> Poslední blok – soubor zde končí. Číslo <strong>0</strong> = volný cluster.
                  </div>
                </div>
              </div>

              {/* Pravá část: Mřížka disku */}
              <div className="xl:w-[55%] bg-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200">
                <h4 className="font-bold text-slate-800 uppercase text-center mb-4 text-sm tracking-widest">Fyzický stav na disku</h4>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[...Array(24)].map((_, i) => {
                    const isFat = i === 0;
                    const isBackup = i === 1;
                    const isSky = i === 2 || i === 3;
                    const isAmber = i === 7 || i === 8 || i === 14 || i === 15;

                    let bgClass = 'bg-white border-slate-200 text-slate-400';
                    let textTop = 'text-slate-300';

                    if (isFat) {
                      bgClass = 'bg-indigo-100 border-indigo-300 text-indigo-900 shadow-xs';
                      textTop = 'text-indigo-600 font-black';
                    } else if (isBackup) {
                      bgClass = 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-xs';
                      textTop = 'text-indigo-500 font-bold';
                    } else if (isSky) {
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
                        {isFat ? (
                          <div className="text-[8px] sm:text-[9px] font-black mt-2 text-indigo-900 tracking-tight uppercase text-center px-0.5 leading-tight">
                            FAT<br />tabulka
                          </div>
                        ) : isBackup ? (
                          <div className="text-[8px] sm:text-[9px] font-black mt-2 text-indigo-800 tracking-tight uppercase text-center px-0.5 leading-tight">
                            Záloha<br />FAT
                          </div>
                        ) : isSky ? (
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

                {/* Legenda a vysvětlení rozložení na disku */}
                <div className="mt-6 space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-medium text-slate-600">
                    <div className="flex items-center gap-1.5 p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                      <span className="w-3 h-3 rounded bg-indigo-500 shrink-0"></span>
                      <span><strong>#0:</strong> FAT tabulka</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-indigo-50/60 rounded-lg border border-indigo-100">
                      <span className="w-3 h-3 rounded bg-indigo-300 shrink-0"></span>
                      <span><strong>#1:</strong> Záloha FAT</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-sky-50 rounded-lg border border-sky-200">
                      <span className="w-3 h-3 rounded bg-sky-500 shrink-0"></span>
                      <span><strong>#2, #3:</strong> zprava.txt</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <span className="w-3 h-3 rounded bg-amber-500 shrink-0"></span>
                      <span><strong>#7, #8...:</strong> dovolena.jpg</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed shadow-xs flex items-start gap-2.5">
                    <HardDrive className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 text-[11px] uppercase tracking-wider block mb-0.5">FAT tabulka a její záloha:</strong>
                      <p className="text-slate-600">
                        V prvním sektoru (<strong>#0</strong>) se nachází hlavní <strong>FAT tabulka</strong> a hned v dalším (<strong>#1</strong>) její <strong>záloha</strong>. Kdyby se první sektor poškodil, systém nepřijde o data a použije záložní tabulku. Uživatelská data proto začínají až od sektoru <strong>#2</strong>.
                      </p>
                    </div>
                  </div>
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
                Test 1B souboru (FAT32 vs. NTFS)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Na připraveném diskovém oddílu <strong>D:</strong> porovnejte chování systémů FAT32 a NTFS při ukládání 1bajtového souboru a alokaci clusterů.
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
            </div>

            <hr className="border-slate-200" />

            {/* ÚKOL 3 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-black">3</span>
                Limity FAT32 vs. NTFS (Bariéra 4 GB v praxi)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Prozkoumejte limity 32bitového souborového systému (FAT32) při práci se soubory většími než 4 GB a porovnejte jej s moderním systémem NTFS na disku <strong>D:</strong>.
              </p>

              <div className="space-y-3 mb-6">
                <div
                  onClick={() => toggleCheck('lim_3a')}
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['lim_3a'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['lim_3a'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <div className="text-sm font-medium flex-1 text-slate-700 space-y-1">
                    <p className={checkedItems['lim_3a'] ? 'line-through opacity-70 text-emerald-900' : ''}>
                      Naformátujte diskový oddíl <strong>D:</strong> na systém souborů <strong>FAT32</strong>:
                    </p>
                    <p className="text-xs text-slate-500 font-normal">
                      V Příkazovém řádku zadejte: <code className="bg-slate-200 px-2 py-0.5 rounded text-[11px] font-mono text-slate-900 font-bold">format D: /FS:FAT32 /Q</code> (případně v Průzkumníku zvolte FAT32, je-li v nabídce) a zkontrolujte, že má oddíl dostatek volného místa.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => toggleCheck('lim_3b')}
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['lim_3b'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['lim_3b'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['lim_3b'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    Ze sdíleného síťového disku (nebo od vyučujícího) se pokuste zkopírovat soubor o velikosti cca 4,3 GB (např. ISO instalační obraz nebo video) na oddíl <strong>D:</strong> formátovaný na FAT32.
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  3.1 Jaká přesná chybová hláška se v dialogu Windows zobrazila, ačkoliv je na oddílu D: mnoho gigabajtů volného místa? Proč FAT32 takto velký soubor nedokáže uložit?
                </label>
                <textarea
                  value={answers['fat32_error_msg'] || ''}
                  onChange={(e) => handleAnswerChange('fat32_error_msg', e.target.value)}
                  placeholder="Zapište doslovné znění chybového hlášení a vysvětlete limit 32bitového adresování (2^32 bajtů = 4 GB)..."
                  className="w-full min-h-[75px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              <div className="space-y-3 mb-6">
                <div
                  onClick={() => toggleCheck('lim_3c')}
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['lim_3c'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['lim_3c'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-medium flex-1 ${checkedItems['lim_3c'] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-700'}`}>
                    V Průzkumníku klikněte pravým tlačítkem na diskový oddíl <strong>D:</strong> $\rightarrow$ <strong>Formátovat...</strong> $\rightarrow$ přeformátujte jej na moderní systém souborů <strong>NTFS</strong> a zopakujte kopírování téhož velkého souboru (&gt; 4 GB).
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  3.2 Prošel zápis na NTFS úspěšně? Jaké jsou maximální limity velikosti souboru v systému NTFS oproti starému FAT32?
                </label>
                <textarea
                  value={answers['ntfs_benefits'] || answers['exfat_benefits'] || ''}
                  onChange={(e) => handleAnswerChange('ntfs_benefits', e.target.value)}
                  placeholder="Zapište zjištěné poznatky o možnostech NTFS..."
                  className="w-full min-h-[85px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* ÚKOL 4 */}
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-black">4</span>
                Obnova smazaných dat (Shift + Delete a Rychlé formátování)
              </h3>
              
              <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 text-xs text-rose-900 leading-relaxed mb-6 space-y-1">
                <strong>Cíl úlohy:</strong>
                <p>
                  Ověřit v praxi, jak souborový systém NTFS nakládá se smazanými daty. Vyzkoušíte trvalé smazání souboru pomocí <code>Shift + Delete</code> (které zcela vynechá systémový Koš) a následně i situaci po provedení Rychlého formátování oddílu. K obnově použijeme oficiální nástroj Microsoftu <code>winfr</code> (Windows File Recovery).
                </p>
              </div>

              {/* Krok 1: Příprava */}
              <div className="space-y-3 mb-6">
                <div
                  onClick={() => toggleCheck('rec_4a')}
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['rec_4a'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['rec_4a'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <div className="text-sm font-medium flex-1 text-slate-700 space-y-2">
                    <p className={checkedItems['rec_4a'] ? 'line-through opacity-70 text-emerald-900' : ''}>
                      <strong>1. Krok – Příprava nástroje a testovacího souboru:</strong>
                    </p>
                    <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1 font-normal">
                      <li>
                        Otevřete aplikaci <strong>Microsoft Store</strong> ve Windows, vyhledejte bezplatnou oficiální aplikaci <strong>Windows File Recovery</strong> (od <em>Microsoft Corporation</em>) a klikněte na <strong>Získat / Nainstalovat</strong>.
                        <br />
                        <span className="block text-[11px] text-slate-500 mt-0.5">
                          (Přímý odkaz: <a href="https://apps.microsoft.com/detail/9N26S50LN705" target="_blank" rel="noreferrer" className="text-indigo-600 underline hover:text-indigo-800">Microsoft Store – Windows File Recovery</a>).
                        </span>
                      </li>
                      <li>
                        Připravte si oddíl nebo virtuální disk <strong>D:</strong> naformátovaný na <strong>NTFS</strong>.
                      </li>
                      <li>
                        Stáhněte testovací fotografii (např. klikněte pravým tlačítkem a <em>Uložit odkaz jako...</em>):
                        <br />
                        <a 
                          href="https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/1920px-Fronalpstock_big.jpg" 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-indigo-600 underline text-xs font-mono break-all inline-block mt-0.5 hover:text-indigo-800"
                        >
                          https://thumb.wikimedia.org/.../1920px-Fronalpstock_big.jpg
                        </a>
                        <br />
                        a uložte soubor přímo do kořene disku jako <code>D:\hora.jpg</code>.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Krok 2: Shift + Delete a obnova /regular */}
                <div
                  onClick={() => toggleCheck('rec_4b')}
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['rec_4b'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['rec_4b'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <div className="text-sm font-medium flex-1 text-slate-700 space-y-2">
                    <p className={checkedItems['rec_4b'] ? 'line-through opacity-70 text-emerald-900' : ''}>
                      <strong>2. Krok – Trvalé smazání (Shift + Delete) a rychlá obnova:</strong>
                    </p>
                    <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1 font-normal">
                      <li>
                        Označte soubor <code>D:\hora.jpg</code> a smažte jej klávesovou zkratkou <strong>Shift + Delete</strong>.
                        <br />
                        <span className="text-slate-500 italic">
                          (Tato zkratka obejde Koš <code>$Recycle.Bin</code> – soubor se nepřesouvá do koše, ale v tabulce MFT je jeho záznam označen jako volný k přepsání).
                        </span>
                      </li>
                      <li>
                        Spusťte Příkazový řádek (nebo Terminál) <strong>jako správce</strong> a spusťte připravený příkaz pro obnovu:
                        <br />
                        <code className="bg-slate-900 text-emerald-400 px-2.5 py-1 rounded text-xs font-mono inline-block mt-1.5 shadow-sm">
                          winfr D: C:\Obnova /regular /n *.jpg
                        </code>
                        <span className="block text-[11px] text-slate-500 mt-1">
                          (Při dotazu stiskněte klávesu <code>y</code> pro potvrzení pokračování).
                        </span>
                      </li>
                      <li>
                        Po dokončení otevřete cílovou složku <code>C:\Obnova</code> (nebo podsložku s datem obnovy) a zkontrolujte obnovený obrázek.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  4.1 Podařilo se soubor v režimu /regular úspěšně obnovit a zobrazit? Zůstal zachován původní název a velikost souboru? Proč byl proces tak rychlý?
                </label>
                <textarea
                  value={answers['rec_shift_del_result'] || ''}
                  onChange={(e) => handleAnswerChange('rec_shift_del_result', e.target.value)}
                  placeholder="Popište výsledek obnovy po Shift+Delete a chování MFT..."
                  className="w-full min-h-[75px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              {/* Krok 3: Rychlé formátování a obnova /extensive */}
              <div className="space-y-3 mb-6">
                <div
                  onClick={() => toggleCheck('rec_4c')}
                  className={`flex items-start gap-4 p-4 cursor-pointer rounded-2xl border-2 transition-all ${checkedItems['rec_4c'] ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                >
                  {checkedItems['rec_4c'] ? <CheckSquare className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" /> : <Square className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />}
                  <div className="text-sm font-medium flex-1 text-slate-700 space-y-2">
                    <p className={checkedItems['rec_4c'] ? 'line-through opacity-70 text-emerald-900' : ''}>
                      <strong>3. Krok – Rychlé formátování oddílu a hloubková obnova (/extensive):</strong>
                    </p>
                    <ul className="text-xs text-slate-600 list-disc pl-5 space-y-1 font-normal">
                      <li>
                        Zkopírujte obnovený obrázek zpět na disk <strong>D:\hora.jpg</strong>.
                      </li>
                      <li>
                        V Průzkumníku klikněte na jednotku <strong>D:</strong> pravým tlačítkem $\rightarrow$ <strong>Formátovat...</strong> $\rightarrow$ ujistěte se, že je zaškrtnuto <strong>Rychlé formátování</strong> a klikněte na <em>Spustit</em>.
                        <br />
                        <span className="text-slate-500 italic">
                          (Rychlé formátování vytvoří novou prázdnou tabulku MFT. Původní katalog souborů zanikl!).
                        </span>
                      </li>
                      <li>
                        V Příkazovém řádku správce zadejte příkaz pro hloubkovou signaturní obnovu (režim <code>/extensive</code>):
                        <br />
                        <code className="bg-slate-900 text-emerald-400 px-2.5 py-1 rounded text-xs font-mono inline-block mt-1.5 shadow-sm">
                          winfr D: C:\Obnova2 /extensive /n *.jpg
                        </code>
                      </li>
                      <li>
                        Po dokončení prohledání sektorů zkontrolujte složku <code>C:\Obnova2</code>.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  4.2 Podařilo se soubor po rychlém formátování obnovit pomocí parametru /extensive? Proč tato obnova funguje i tehdy, když byl celý souborový systém zformátován?
                </label>
                <textarea
                  value={answers['rec_format_result'] || ''}
                  onChange={(e) => handleAnswerChange('rec_format_result', e.target.value)}
                  placeholder="Vysvětlete, jak režim /extensive (carving) hledá data v surových sektorech bez pomoci MFT tabulky..."
                  className="w-full min-h-[85px] p-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm font-medium text-slate-700 resize-none shadow-inner"
                />
              </div>

              {/* Závěr a bezpečnost */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  4.3 Závěr k bezpečnosti dat: Proč pouhé smazání souborů ani Rychlé formátování nestačí, pokud disk prodáváte nebo vyřazujete? Jaký postup je nutné zvolit pro bezpečné vymazání dat?
                </label>
                <textarea
                  value={answers['rec_security_conclusion'] || ''}
                  onChange={(e) => handleAnswerChange('rec_security_conclusion', e.target.value)}
                  placeholder="Zapište závěrečné zhodnocení (rozdíl oproti úplnému/pomalému formátování se zápisem nul nebo specializovaným wiperům)..."
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
