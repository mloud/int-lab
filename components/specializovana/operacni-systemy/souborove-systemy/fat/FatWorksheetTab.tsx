"use client";

import React from 'react';
import { CheckSquare, Square, FileText, Terminal, ChevronDown } from 'lucide-react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadWordDoc } from '@/lib/wordExport';

export const FatWorksheetTab = () => {
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

    downloadWordDoc(htmlContent, 'Pracovni_list_System_souboru', studentName);
  };

  return (
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
  );
};
