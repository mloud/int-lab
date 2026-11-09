"use client";

import React from 'react';
import { WorksheetLayout } from '@/components/common/worksheets/WorksheetLayout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadWordDoc } from '@/lib/wordExport';

export const WorksheetTab = () => {
  const [data, setData] = useLocalStorage('worksheet_os_evolution', {
    studentName: '',
    xp_multitasking: '',
    xp_version: '',
    xp_sp: '',
    w95_name: '',
    w95_size_total: '',
    w95_size_used: '',
    w95_trash: '',
    linux_whoami: '',
    linux_osrelease: '',
    dos_md: '',
    dos_oldest: '',
    dos_ver: ''
  });

  const updateField = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const downloadWorksheet = () => {
    const val = (id: string) => (data as any)[id] || 'Nevyplněno';
    
    const date = new Date().toLocaleDateString('cs-CZ');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Pracovní list - Evoluce OS</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px; }
          h2 { color: #34495e; margin-top: 30px; }
          .task { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px; }
          .question { font-weight: bold; margin-bottom: 10px; }
          .answer { background-color: #fff; padding: 10px; border: 1px solid #ddd; min-height: 50px; }
        </style>
      </head>
      <body>
        <h1>Pracovní list: Evoluce OS</h1>
        <p><strong>Jméno a příjmení:</strong> ${data.studentName || '........................................'}</p>
        <p><strong>Datum:</strong> ${date}</p>

        <h2>Úkol 1: Windows XP</h2>
        <div class="task">
          <div class="question">Co je preemptivní multitasking?</div>
          <div class="answer">${val('xp_multitasking').replace(/\\n/g, '<br/>')}</div>
          <div class="question">Přesná verze systému:</div>
          <div class="answer">${val('xp_version')}</div>
          <div class="question">Co je Service Pack?</div>
          <div class="answer">${val('xp_sp').replace(/\\n/g, '<br/>')}</div>
        </div>

        <h2>Úkol 2: Windows 95</h2>
        <div class="task">
          <div class="question">Skutečné jméno souboru na ploše:</div>
          <div class="answer">${val('w95_name')}</div>
          <div class="question">Velikost disku:</div>
          <div class="answer">Celková: ${val('w95_size_total')} | Obsazeno: ${val('w95_size_used')}</div>
          <div class="question">Povedlo se obnovit z koše?</div>
          <div class="answer">${val('w95_trash')}</div>
        </div>

        <h2>Úkol 3: Linux</h2>
        <div class="task">
          <div class="question">whoami:</div>
          <div class="answer">${val('linux_whoami')}</div>
          <div class="question">cat /etc/os-release (NAME):</div>
          <div class="answer">${val('linux_osrelease')}</div>
        </div>
        
        <h2>Úkol 6: FreeDOS</h2>
        <div class="task">
          <div class="question">Příkaz pro vytvoření složky:</div>
          <div class="answer">${val('dos_md')}</div>
          <div class="question">Nejstarší soubor:</div>
          <div class="answer">${val('dos_oldest')}</div>
          <div class="question">Verze systému:</div>
          <div class="answer">${val('dos_ver')}</div>
        </div>

      </body>
      </html>
    `;

    downloadWordDoc(htmlContent, 'Pracovni_list_Evoluce_OS', data.studentName);
  };

  return (
    <WorksheetLayout
      title="Evoluce OS"
      studentName={data.studentName}
      onStudentNameChange={(name) => updateField('studentName', name)}
      onDownload={downloadWorksheet}
    >
        
        <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200 mb-8 shadow-inner">
          <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
            <span className="text-xl">📌</span> Pokyny pro žáky
          </h4>
          <p className="text-yellow-800 text-sm leading-relaxed mb-3">
            Před plněním úkolů je nutné mít předem nainstalovanou aplikaci <strong>VirtualBox</strong> a stažené obrazy operačních systémů. Ikona VirtualBoxu by měla být na ploše vašeho počítače.
          </p>
          <ul className="text-sm text-yellow-800 list-disc pl-5 space-y-1">
            <li>Před každým úkolem spusťte daný operační systém v programu VirtualBox tlačítkem <strong>Spustit</strong>.</li>
            <li>Obrazy systémů (Windows XP, Windows 95, Linux, MS-DOS) naleznete připravené v lokální síti nebo dle pokynů učitele.</li>
          </ul>
        </div>

        {/* Úkol 1: Windows XP */}
        <div className="mb-10">
          <div className="bg-slate-100 p-4 rounded-t-2xl border-2 border-slate-200 border-b-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center font-black shadow-md">1</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Windows XP (2001)</h3>
              <p className="text-xs text-slate-500 font-medium">Evoluční milník: Přechod na stabilní jádro Windows NT, preemptivní multitasking, chráněná paměť a Správce úloh.</p>
            </div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-b-2xl bg-white space-y-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-2">Záchrana zaseknutého systému:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600 mb-4">
                <li>Spusťte aplikaci Internet Explorer.</li>
                <li>Otevřete Správce úloh pomocí klávesové zkratky <code>Ctrl+Shift+Esc</code> (nebo Ctrl+Alt+Del).</li>
                <li>Najděte spuštěný proces <strong>IExplore</strong> na záložce Procesy a natvrdo jej ukončete (Ukončit proces).</li>
              </ol>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Co je preemptivní multitasking?</label>
                <textarea value={data.xp_multitasking} onChange={e => updateField('xp_multitasking', e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" rows={2} placeholder="Vysvětlení..."></textarea>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-700 mb-2">Přesná verze systému:</h4>
              <p className="text-sm text-slate-600 mb-3">Najděte v systému přesnou verzi operačního systému (např. pomocí příkazu winver nebo ve vlastnostech systému).</p>
              <div className="space-y-2 mb-4">
                <label className="text-sm font-bold text-slate-700 block">Zjištěná verze:</label>
                <input type="text" value={data.xp_version} onChange={e => updateField('xp_version', e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Např. Verze 5.1..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Co je Service Pack a co znamená z hlediska bezpečnosti?</label>
                <textarea value={data.xp_sp} onChange={e => updateField('xp_sp', e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" rows={2} placeholder="Vysvětlení..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Úkol 2: Windows 95 */}
        <div className="mb-10">
          <div className="bg-slate-100 p-4 rounded-t-2xl border-2 border-slate-200 border-b-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center font-black shadow-md">2</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Windows 95 (1995)</h3>
              <p className="text-xs text-slate-500 font-medium">Evoluční milník: Nabídka Start, hlavní lišta, dlouhé názvy souborů (VFAT), samostatnější OS.</p>
            </div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-b-2xl bg-white space-y-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-2">Úkol 2.1 – Dlouhá jména a skryté atributy:</h4>
              <p className="text-sm text-slate-600 mb-3">Vytvořte v programu WordPad dokument a uložte jej na Plochu pod dlouhým názvem <code>Referat_na_informatiku_1995.doc</code>.</p>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Zkontrolujte, pod jakým jménem se soubor skutečně uložil:</label>
                <input type="text" value={data.w95_name} onChange={e => updateField('w95_name', e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Jméno souboru na ploše..." />
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-700 mb-2">Úkol 2.2 – Velikost disku:</h4>
              <p className="text-sm text-slate-600 mb-3">Zjistěte parametry pevného disku (oddílu C:).</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Celková velikost:</label>
                  <input type="text" value={data.w95_size_total} onChange={e => updateField('w95_size_total', e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Např. 500 MB..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Obsazeno:</label>
                  <input type="text" value={data.w95_size_used} onChange={e => updateField('w95_size_used', e.target.value)} className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Např. 150 MB..." />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-700 mb-2">Úkol 2.3 – Koš:</h4>
              <p className="text-sm text-slate-600 mb-3">Zkuste smazat soubor vytvořený v prvním bodě a následně jej obnovte z Koše.</p>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Povedlo se soubor obnovit?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border-2 border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <input type="radio" checked={data.w95_trash === 'Ano'} onChange={() => updateField('w95_trash', 'Ano')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                    <span className="font-medium text-slate-700">Ano</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border-2 border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <input type="radio" checked={data.w95_trash === 'Ne'} onChange={() => updateField('w95_trash', 'Ne')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                    <span className="font-medium text-slate-700">Ne</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Úkol 3: Linux */}
        <div className="mb-10">
          <div className="bg-slate-100 p-4 rounded-t-2xl border-2 border-slate-200 border-b-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-black shadow-md">3</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Linux (1991)</h3>
              <p className="text-xs text-slate-500 font-medium">Evoluční milník: UNIXové jádro, open-source, striktní systém uživatelských práv a souborového stromu.</p>
            </div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-b-2xl bg-white space-y-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-2">Základní příkazy v terminálu:</h4>
              <p className="text-sm text-slate-600 mb-4">Otevřete terminál (většinou ikona černé obrazovky) a zjistěte následující informace:</p>
              
              <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600 mb-4">
                <li>
                  <div className="mb-2">Zjistěte, v jakém adresáři se právě nacházíte pomocí příkazu <code>pwd</code> (cesta obsahuje tato / lomítka).</div>
                </li>
                <li>
                  <div className="mb-2">Pomocí příkazu <code>whoami</code> zobrazte jméno aktuálně přihlášeného uživatele.</div>
                  <input type="text" value={data.linux_whoami} onChange={e => updateField('linux_whoami', e.target.value)} className="w-full max-w-sm p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Jméno uživatele..." />
                </li>
                <li>
                  <div className="mb-2">Pomocí příkazu <code>cat /etc/os-release</code> zobrazte podrobnosti o používané Linuxové distribuci. Vyčtěte hodnotu NAME.</div>
                  <input type="text" value={data.linux_osrelease} onChange={e => updateField('linux_osrelease', e.target.value)} className="w-full max-w-sm p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="NAME=..." />
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Úkol 4: Windows 3.11 */}
        <div className="mb-10">
          <div className="bg-slate-100 p-4 rounded-t-2xl border-2 border-slate-200 border-b-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-black shadow-md">4</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Windows 3.11 (1993)</h3>
              <p className="text-xs text-slate-500 font-medium">Evoluční milník: Grafická nadstavba nad DOSem, Správce souborů (FileManager), kooperativní multitasking.</p>
            </div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-b-2xl bg-white">
            <h4 className="font-bold text-slate-700 mb-2">Práce v grafickém prostředí:</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
              <li>Pomocí Správce souborů (FileManager) vytvořte složku (DIRECTORY) na disku C a pojmenujte ji <code>mojeslozka</code>.</li>
              <li>Pomocí programu ReadMe (nebo Poznámkový blok) vytvořte nový soubor s textem "hello from windows 3.11" a uložte jej do vytvořené složky pod názvem <code>hello.txt</code>.</li>
            </ul>
          </div>
        </div>

        {/* Úkol 5: System 7 / Mac OS 8 */}
        <div className="mb-10">
          <div className="bg-slate-100 p-4 rounded-t-2xl border-2 border-slate-200 border-b-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center font-black shadow-md">5</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">System 7 / Mac OS 8 (1991 / 1997)</h3>
              <p className="text-xs text-slate-500 font-medium">Evoluční milník: Alternativní filosofie GUI, jedno tlačítko myši, přetahování objektů (Drag & Drop).</p>
            </div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-b-2xl bg-white">
            <h4 className="font-bold text-slate-700 mb-2">Grafická vizitka a práce s GUI:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600">
              <li>Otevřete v prohlížeči stránku <a href="https://infinitemac.org/1994/System%207.5" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold">infinitemac.org/1994/System 7.5</a> a nastartujte systém.</li>
              <li>Najděte a otevřete aplikaci <strong>Adobe Photoshop 1.0</strong>.</li>
              <li>Nakreslete jednoduchý smajlík v rozlišení 8x8 pixelů.</li>
              <li>Soubor uložte přímo na Plochu.</li>
            </ol>
          </div>
        </div>

        {/* Úkol 6: FreeDOS */}
        <div>
          <div className="bg-slate-100 p-4 rounded-t-2xl border-2 border-slate-200 border-b-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 text-white rounded-xl flex items-center justify-center font-black shadow-md">6</div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">FreeDOS (1994)</h3>
              <p className="text-xs text-slate-500 font-medium">Evoluční milník: Čistě textové rozhraní (CLI), práce bez myši, pravidlo pojmenování souborů 8.3.</p>
            </div>
          </div>
          <div className="p-6 border-2 border-slate-200 rounded-b-2xl bg-white space-y-6">
            <div>
              <h4 className="font-bold text-slate-700 mb-3">Omezovač názvů a příkazová řádka:</h4>
              <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600">
                <li>
                  <div className="mb-2">Vytvořte novou složku TEST pomocí příkazu <code>md TEST</code>. Napište příkaz do pole:</div>
                  <input type="text" value={data.dos_md} onChange={e => updateField('dos_md', e.target.value)} className="w-full max-w-sm p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors font-mono text-sm" placeholder="Příkaz..." />
                </li>
                <li>
                  <div className="mb-2">Zobrazte obsah aktuálního adresáře pomocí příkazu <code>dir</code> a zkontrolujte, že adresář TEST existuje. Napište jméno nejstaršího souboru v adresáři:</div>
                  <input type="text" value={data.dos_oldest} onChange={e => updateField('dos_oldest', e.target.value)} className="w-full max-w-sm p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Jméno nejstaršího souboru..." />
                </li>
                <li>
                  <div className="mb-2">Zjistěte přesnou verzi systému pomocí příkazu <code>ver</code>:</div>
                  <input type="text" value={data.dos_ver} onChange={e => updateField('dos_ver', e.target.value)} className="w-full max-w-sm p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-emerald-400 focus:ring-0 transition-colors" placeholder="Verze systému..." />
                </li>
              </ol>
            </div>
          </div>
        </div>
    </WorksheetLayout>
  );
};
