'use client';

import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Download,
  Trash2,
  CheckCircle2,
  Terminal,
  Monitor,
  HelpCircle,
  AlertCircle,
  Layers,
  GitBranch,
  ExternalLink,
  Info,
  Activity,
  Star,
  Cpu,
  Video,
  ChevronDown
} from 'lucide-react';
import { ProcessIntroWorksheetAnswers, ProcessIntroCheckedItems } from './ProcessIntroTypes';

const STORAGE_KEY = 'intlab_worksheet_process_intro';

export default function ProcessIntroWorksheetTab() {
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<ProcessIntroWorksheetAnswers>({});
  const [checkedItems, setCheckedItems] = useState<ProcessIntroCheckedItems>({});
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Načtení z localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.studentName) setStudentName(data.studentName);
        if (data.answers) setAnswers(data.answers);
        if (data.checkedItems) setCheckedItems(data.checkedItems);
      }
    } catch (e) {
      console.error('Chyba při načítání pracovního listu:', e);
    }
  }, []);

  // Automatické ukládání do localStorage
  useEffect(() => {
    try {
      const data = { studentName, answers, checkedItems };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaveStatus('Uloženo');
      const timer = setTimeout(() => setSaveStatus(''), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Chyba při ukládání pracovního listu:', e);
    }
  }, [studentName, answers, checkedItems]);

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckChange = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearAll = () => {
    if (confirm('Opravdu chcete smazat všechny vyplněné odpovědi v tomto pracovním listu?')) {
      setStudentName('');
      setAnswers({});
      setCheckedItems({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Export do Wordu (.doc HTML blob)
  const handleExportWord = () => {
    const date = new Date().toLocaleDateString('cs-CZ');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Pracovní list: Správa procesů a systémových informací</title>
        <style>
          body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 20mm; }
          h1 { color: #1e1b4b; font-size: 20pt; border-bottom: 2pt solid #4338ca; padding-bottom: 4px; margin-bottom: 12px; }
          h2 { color: #3730a3; font-size: 13pt; margin-top: 18px; margin-bottom: 6px; border-bottom: 1pt solid #cbd5e1; padding-bottom: 3px; }
          .meta { font-size: 10.5pt; margin-bottom: 18px; color: #475569; background: #f8fafc; padding: 10px; border: 1pt solid #e2e8f0; }
          .task { margin-bottom: 14px; padding: 10px; background: #fafafa; border-left: 3pt solid #6366f1; }
          .step { margin-bottom: 5px; font-weight: bold; }
          .question { color: #0f172a; font-weight: bold; margin-top: 6px; margin-bottom: 4px; }
          .answer { color: #1e3a8a; background: #eff6ff; padding: 8px; border: 1pt dashed #93c5fd; min-height: 28px; white-space: pre-wrap; font-family: Consolas, monospace; }
          table { width: 100%; border-collapse: collapse; margin-top: 6px; margin-bottom: 10px; }
          th, td { border: 1pt solid #cbd5e1; padding: 6px 10px; text-align: left; font-size: 10pt; }
          th { background-color: #e0e7ff; color: #1e1b4b; font-weight: bold; }
          code { font-family: Consolas, monospace; background: #f1f5f9; padding: 1px 4px; border: 1pt solid #cbd5e1; }
        </style>
      </head>
      <body>
        <h1>Pracovní list: Správa procesů a systémových informací (Task Manager & CLI)</h1>
        <div class="meta">
          <p><strong>Jméno a příjmení studenta:</strong> ${studentName || '........................................'}<br/>
          <strong>Datum vypracování:</strong> ${date}<br/>
          <strong>Předmět:</strong> Operační systémy 1 — Správa procesů</p>
        </div>

        <!-- ÚKOL 1 -->
        <h2>1. Základní orientace ve Správci úloh</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_1_orient_a'] ? 'X' : ' '} ] 1. Otevřete Správce úloh (Ctrl+Shift+Esc) a na kartě Procesy odečtěte celkové využití CPU a RAM.</div>
          <div class="step">[ ${checkedItems['task_1_orient_b'] ? 'X' : ' '} ] 2. Seřaďte procesy podle sloupce CPU a vyhledejte aplikaci s nejvyšší zátěží.</div>
          
          <table border="1">
            <tr>
              <th>Metrika / Parametr</th>
              <th>Zjištěná hodnota</th>
            </tr>
            <tr>
              <td>Celkové využití procesoru CPU (%)</td>
              <td>${answers['t1_total_cpu'] || ''}</td>
            </tr>
            <tr>
              <td>Celkové využití paměti RAM (%)</td>
              <td>${answers['t1_total_ram'] || ''}</td>
            </tr>
            <tr>
              <td>Jméno aplikace používající nejvíce CPU</td>
              <td>${answers['t1_top_cpu_app'] || ''}</td>
            </tr>
          </table>
        </div>

        <!-- ÚKOL 2 -->
        <h2>2. Prohlížeč Edge před spuštěním videa a při jeho přehrávání</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_2_video_a'] ? 'X' : ' '} ] 1. Spusťte Microsoft Edge s prázdnou novou kartou. Ve Správci úloh na kartě Procesy najděte skupinu Microsoft Edge a zapište počet procesů (číslo v závorce), využití paměti a CPU.</div>
          <div class="step">[ ${checkedItems['task_2_video_b'] ? 'X' : ' '} ] 2. Ve stejné kartě pusťte YouTube video, počkejte, až skončí reklama, a měření zopakujte (pro pozastavení výpisu podržte klávesu Ctrl).</div>

          <table border="1">
            <tr>
              <th>Stav prohlížeče</th>
              <th>Počet procesů (číslo v závorce)</th>
              <th>Využití paměti RAM</th>
              <th>Využití CPU (%)</th>
            </tr>
            <tr>
              <td>Před spuštěním videa (prázdná karta)</td>
              <td>${answers['t2_before_count'] || ''}</td>
              <td>${answers['t2_before_mem'] || ''}</td>
              <td>${answers['t2_before_cpu'] || ''}</td>
            </tr>
            <tr>
              <td>Při přehrávání videa</td>
              <td>${answers['t2_video_count'] || ''}</td>
              <td>${answers['t2_video_mem'] || ''}</td>
              <td>${answers['t2_video_cpu'] || ''}</td>
            </tr>
          </table>

          <div class="question">2.1 Porovnejte obě měření. Co se po spuštění videa změnilo a čím si to vysvětlujete?</div>
          <div class="answer">${(answers['t2_compare'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 3 -->
        <h2>3. Identifikace procesů (PID) v Task Manageru a příkazu tasklist</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_3a'] || checkedItems['task_1a'] ? 'X' : ' '} ] 1. Spusťte Poznámkový blok (notepad.exe) a Kalkulačku (calc.exe).</div>
          <div class="step">[ ${checkedItems['task_3b'] || checkedItems['task_1b'] ? 'X' : ' '} ] 2. Otevřete Správce úloh (Ctrl+Shift+Esc), přepněte na záložku Podrobnosti a vyhledejte jejich PID.</div>
          <div class="step">[ ${checkedItems['task_3c'] || checkedItems['task_1c'] ? 'X' : ' '} ] 3. V CMD spusťte příkaz <code>tasklist</code> a vyhledejte odpovídající procesy a jejich PID.</div>
          
          <table border="1">
            <tr>
              <th>Proces</th>
              <th>Zjištěné PID (Task Manager)</th>
              <th>Zjištěné PID (příkaz tasklist)</th>
              <th>Shodují se hodnoty?</th>
            </tr>
            <tr>
              <td>notepad.exe</td>
              <td>${answers['t3_notepad_pid_gui'] || answers['t1_notepad_pid_gui'] || ''}</td>
              <td>${answers['t3_notepad_pid_cli'] || answers['t1_notepad_pid_cli'] || ''}</td>
              <td>${answers['t3_notepad_match'] || answers['t1_notepad_match'] || ''}</td>
            </tr>
            <tr>
              <td>calc.exe / CalculatorApp.exe</td>
              <td>${answers['t3_calc_pid_gui'] || answers['t1_calc_pid_gui'] || ''}</td>
              <td>${answers['t3_calc_pid_cli'] || answers['t1_calc_pid_cli'] || ''}</td>
              <td>${answers['t3_calc_match'] || answers['t1_calc_match'] || ''}</td>
            </tr>
          </table>

          <div class="question">3.1 Co se stane, když Poznámkový blok zavřete a spustíte znovu? Získá stejné PID, nebo jiné? Proč operační systém přiděluje PID dynamicky?</div>
          <div class="answer">${(answers['t3_pid_dynamic'] || answers['t1_pid_dynamic'] || '').replace(/\n/g, '<br/>')}</div>

          <div class="question">3.2 Spustili jste calc.exe, ale v tasklistu proces s tímto názvem nenajdete. Jak se proces Kalkulačky jmenuje a proč tomu tak je?</div>
          <div class="answer">${(answers['t3_calc_missing'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 4 -->
        <h2>4. Filtrování procesů v CLI — procesy s pamětí nad 300 MB (tasklist /?)</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_4_filter_a'] || checkedItems['task_3_filter_a'] ? 'X' : ' '} ] 1. Otevřete Příkazový řádek (CMD) a zadejte nápovědu <code>tasklist /?</code>. V sekci přepínačů vyhledejte parametr <code>/FI</code> (Filtry), povolené operátory (např. <code>gt</code> = greater than) a název filtru paměti (<code>MEMUSAGE</code>).</div>
          <div class="step">[ ${checkedItems['task_4_filter_b'] || checkedItems['task_3_filter_b'] ? 'X' : ' '} ] 2. Všimněte si, že filtr MEMUSAGE očekává hodnotu v kB. Přepočítejte 300 MB na kB (300000) a spusťte filtrační příkaz v CMD.</div>
          <div class="step">[ ${checkedItems['task_4_filter_c'] || checkedItems['task_3_filter_c'] ? 'X' : ' '} ] 3. Zapište přesný příkaz, který jste použili, a zaznamenejte 3 nalezené procesy s nejvyšší spotřebou RAM do tabulky.</div>

          <p><strong>Použitý příkaz v CMD:</strong> <code>${answers['t4_filter_cmd'] || answers['t3_filter_cmd'] || ''}</code></p>

          <table border="1">
            <tr>
              <th>Pořadí</th>
              <th>Název procesu (.exe)</th>
              <th>PID</th>
              <th>Spotřeba paměti RAM (v kB nebo MB)</th>
            </tr>
            <tr>
              <td>1. proces</td>
              <td>${answers['t4_p1_name'] || answers['t3_p1_name'] || ''}</td>
              <td>${answers['t4_p1_pid'] || answers['t3_p1_pid'] || ''}</td>
              <td>${answers['t4_p1_mem'] || answers['t3_p1_mem'] || ''}</td>
            </tr>
            <tr>
              <td>2. proces</td>
              <td>${answers['t4_p2_name'] || answers['t3_p2_name'] || ''}</td>
              <td>${answers['t4_p2_pid'] || answers['t3_p2_pid'] || ''}</td>
              <td>${answers['t4_p2_mem'] || answers['t3_p2_mem'] || ''}</td>
            </tr>
            <tr>
              <td>3. proces</td>
              <td>${answers['t4_p3_name'] || answers['t3_p3_name'] || ''}</td>
              <td>${answers['t4_p3_pid'] || answers['t3_p3_pid'] || ''}</td>
              <td>${answers['t4_p3_mem'] || answers['t3_p3_mem'] || ''}</td>
            </tr>
          </table>

          <div class="question">4.1 Jak by vypadal příkaz, kdybyste naopak chtěli vyhledat procesy s pamětí MENŠÍ než 10 MB, tj. 10000 kB (operátor 'lt' = less than)?</div>
          <div class="answer">${(answers['t4_filter_lt_example'] || answers['t3_filter_lt_example'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 5* -->
        <h2>5*. Spuštění dvou stejných programů současně (Dvě instance v RAM)</h2>
        <div class="task" style="border-left: 3pt solid #8b5cf6; background: #faf5ff;">
          <div class="step">[ ${checkedItems['task_5_instance_a'] || checkedItems['task_2_instance_a'] ? 'X' : ' '} ] 1. Spusťte Poznámkový blok (notepad.exe).</div>
          <div class="step">[ ${checkedItems['task_5_instance_b'] || checkedItems['task_2_instance_b'] ? 'X' : ' '} ] 2. Bez zavření prvního okna spusťte Poznámkový blok podruhé (dvě samostatná okna vedle sebe).</div>
          <div class="step">[ ${checkedItems['task_5_instance_c'] || checkedItems['task_2_instance_c'] ? 'X' : ' '} ] 3. Pomocí příkazu <code>tasklist</code> v CMD vyhledejte běžící procesy notepad.exe a zapište jejich PID.</div>

          <table border="1">
            <tr>
              <th>Běžící instance</th>
              <th>Zjištěné PID</th>
              <th>Kolik procesů celkem vzniklo v RAM?</th>
              <th>Mají obě okna stejné, nebo odlišné PID?</th>
            </tr>
            <tr>
              <td>1. okno Poznámkového bloku</td>
              <td>${answers['t5_instance1_pid'] || answers['t2_instance1_pid'] || ''}</td>
              <td rowspan="2">${answers['t5_process_count'] || answers['t2_process_count'] || ''}</td>
              <td rowspan="2">${answers['t5_pid_same_or_diff'] || answers['t2_pid_same_or_diff'] || ''}</td>
            </tr>
            <tr>
              <td>2. okno Poznámkového bloku</td>
              <td>${answers['t5_instance2_pid'] || answers['t2_instance2_pid'] || ''}</td>
            </tr>
          </table>

          <div class="question">5.1 Proč má každé otevřené okno téhož programu své vlastní unikátní PID a nemůže ho sdílet? Co by se stalo, kdyby dvě okna měla stejné číslo procesu?</div>
          <div class="answer">${(answers['t5_why_unique_pid'] || answers['t2_why_unique_pid'] || '').replace(/\n/g, '<br/>')}</div>

          <div class="question">5.2 Představte si, že v 1. okně píšete důležitou práci a 2. okno náhle zamrzne a přestane reagovat. Jaká je výhoda toho, že jde o dva nezávislé procesy?</div>
          <div class="answer">${(answers['t5_isolation_benefit'] || answers['t2_isolation_benefit'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 6* -->
        <h2>6*. Rodičovský proces (PPID) a stromová hierarchie v Process Exploreru</h2>
        <div class="task" style="border-left: 3pt solid #8b5cf6; background: #faf5ff;">
          <div class="step">[ ${checkedItems['task_6a'] || checkedItems['task_5a'] ? 'X' : ' '} ] 1. Stáhněte a spusťte nástroj Process Explorer (<a href="https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer">learn.microsoft.com/en-us/sysinternals/downloads/process-explorer</a>).</div>
          <div class="step">[ ${checkedItems['task_6b'] || checkedItems['task_5b'] ? 'X' : ' '} ] 2. Spusťte jeden Poznámkový blok běžně (z plochy / Startu) a druhý z Příkazového řádku příkazem: <code>start notepad.exe</code>.</div>
          <div class="step">[ ${checkedItems['task_6c'] || checkedItems['task_5c'] ? 'X' : ' '} ] 3. V Process Exploreru vyhledejte obě okna ve stromu (Process Tree) a odečtěte rodiče a PPID.</div>

          <table border="1">
            <tr>
              <th>Instance Notepadu</th>
              <th>PID Notepadu</th>
              <th>Rodičovský proces (Parent Name)</th>
              <th>PPID rodiče</th>
            </tr>
            <tr>
              <td>1. Spuštěný z plochy / Startu</td>
              <td>${answers['t6_inst1_pid'] || answers['t5_inst1_pid'] || ''}</td>
              <td>${answers['t6_inst1_parent'] || answers['t5_inst1_parent'] || ''}</td>
              <td>${answers['t6_inst1_ppid'] || answers['t5_inst1_ppid'] || ''}</td>
            </tr>
            <tr>
              <td>2. Spuštěný z CMD (start notepad.exe)</td>
              <td>${answers['t6_inst2_pid'] || answers['t5_inst2_pid'] || ''}</td>
              <td>${answers['t6_inst2_parent'] || answers['t5_inst2_parent'] || ''}</td>
              <td>${answers['t6_inst2_ppid'] || answers['t5_inst2_ppid'] || ''}</td>
            </tr>
          </table>

          <div class="task" style="border-left: 3pt solid #8b5cf6; background: #f5f3ff; margin-top: 14px;">
            <strong style="color: #6d28d9;">Jednoduché vysvětlení: Co rodič procesu v systému ovlivňuje?</strong>
            <ul style="margin-top: 6px; margin-bottom: 0;">
              <li><strong>1. Dědění práv:</strong> Nový proces přebírá bezpečnostní oprávnění svého rodiče (program spuštěný ze správcovského okna běží také jako Správce).</li>
              <li><strong>2. Kdo koho spustil:</strong> Strom ukazuje původ každého procesu. Správce tak snadno odhalí podezřelý program (např. když Word nečekaně spustí CMD). Pozor: ukončením rodiče se potomek ve Windows automaticky nezavře – Poznámkový blok poběží dál i po zavření CMD.</li>
              <li><strong>3. Návratový kód:</strong> Potomek po skončení své práce předá rodiči zprávu, zda úkol proběhl úspěšně (kód 0), nebo s chybou.</li>
            </ul>
          </div>
        </div>

        <!-- ÚKOL 7* -->
        <h2>7*. Program na disku vs. Proces v paměti RAM (Instrukce vs. Data)</h2>
        <div class="task" style="border-left: 3pt solid #f59e0b; background: #fffbeb;">
          <div class="step">[ ${checkedItems['task_7a'] || checkedItems['task_4a'] ? 'X' : ' '} ] 1. Vyhledejte soubor notepad.exe na disku C: (v C:\\Windows\\System32\\notepad.exe) a zjistěte jeho velikost na disku.</div>
          <div class="step">[ ${checkedItems['task_7b'] || checkedItems['task_4b'] ? 'X' : ' '} ] 2. Ve Správci úloh nebo v tasklistu odečtěte spotřebu RAM bezprostředně po spuštění čistého Poznámkového bloku (všechna měření RAM provádějte stále stejným nástrojem).</div>
          <div class="step">[ ${checkedItems['task_7c'] || checkedItems['task_4c'] ? 'X' : ' '} ] 3. Vložte nebo otevřete v Poznámkovém bloku velký textový soubor (např. 1 MB z <a href="https://textfilegenerator.com/sample-text-file/">textfilegenerator.com</a>) a sledujte změnu hodnoty v RAM.</div>

          <table border="1">
            <tr>
              <th>Metrika</th>
              <th>Hodnota</th>
              <th>Poznámka / Jednotka</th>
            </tr>
            <tr>
              <td>Velikost souboru na disku (SSD)</td>
              <td>${answers['t7_disk_size'] || answers['t4_disk_size'] || answers['t2_disk_size'] || ''}</td>
              <td>kB na disku C:\\Windows\\System32</td>
            </tr>
            <tr>
              <td>Využití RAM po spuštění (čistý stav)</td>
              <td>${answers['t7_ram_initial'] || answers['t4_ram_initial'] || answers['t2_ram_initial'] || ''}</td>
              <td>kB v paměti RAM</td>
            </tr>
            <tr>
              <td>Využití RAM po vložení velkého textu</td>
              <td>${answers['t7_ram_loaded'] || answers['t4_ram_loaded'] || answers['t2_ram_loaded'] || ''}</td>
              <td>kB v paměti RAM</td>
            </tr>
          </table>

          <div class="question">7.1 Proč proces v RAM zabírá podstatně více místa než samotný soubor .exe na disku? Co všechno si proces v RAM musel vytvořit navíc?</div>
          <div class="answer">${(answers['t7_ram_growth_reason'] || answers['t4_ram_growth_reason'] || answers['t2_ram_growth_reason'] || '').replace(/\n/g, '<br/>')}</div>

          <div class="question">7.2 Která část paměti procesu (Instrukce vs. Data) se po vložení velkého textu zvětšila a proč? Mohou se během psaní textu měnit instrukce programu?</div>
          <div class="answer">${(answers['t7_code_vs_data'] || answers['t4_code_vs_data'] || answers['t2_code_vs_data'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pracovni_list_Sprava_procesu_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">

      {/* Horní hlavička studenta a akce */}
      <div className="p-6 bg-slate-50/80 rounded-2xl border-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="w-full md:w-auto flex-1">
          <label className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-1.5">
            Jméno a příjmení studenta
          </label>
          <input
            type="text"
            placeholder=""
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full sm:max-w-md px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {saveStatus && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              {saveStatus}
            </span>
          )}

          <button
            onClick={handleExportWord}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            title="Stáhnout vyplněný protokol ve formátu Word (.doc)"
          >
            <Download className="w-4 h-4" />
            <span>Export do Wordu</span>
          </button>

          <button
            onClick={handleClearAll}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Smazat všechny odpovědi"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metodický blok: Dva způsoby správy procesů */}
      <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-50/60 via-purple-50/40 to-slate-50 border-2 border-indigo-100 shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1 block">
            Metodický přehled
          </span>
          <h3 className="text-base font-black text-slate-800 tracking-tight">
            Dva světy správy procesů ve Windows: GUI vs. CLI
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Operační systém Windows poskytuje pro správu běžících programů dvě hlavní cesty. Během cvičení 
            si vyzkoušíte obě dvě.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* List 1: GUI */}
          <div className="bg-white rounded-2xl border-2 border-indigo-100 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-indigo-50">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Grafické rozhraní</span>
                  <h4 className="text-sm font-black text-slate-800">Správce úloh (Task Manager)</h4>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-3">
                <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Jak se spouští:</span>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Klávesová zkratka: <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono font-bold text-slate-800">Ctrl + Shift + Esc</kbd></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Kliknout pravým tlačítkem na tlačítko Start ➔ <strong>Správce úloh</strong></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Příkaz <kbd className="px-1 py-0.5 bg-slate-100 border rounded font-mono">Win + R</kbd> ➔ zadat <code className="font-bold text-indigo-700 font-mono">taskmgr</code></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-indigo-700 font-semibold bg-indigo-50/50 p-2 rounded-lg">
              💡 Sloupec PID najdete na záložce <strong>Podrobnosti (Details)</strong>.
            </div>
          </div>

          {/* List 2: CLI */}
          <div className="bg-white rounded-2xl border-2 border-emerald-100 p-5 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-3 pb-2 border-b border-emerald-50">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Příkazový řádek</span>
                  <h4 className="text-sm font-black text-slate-800">Příkaz tasklist</h4>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-3">
                <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Jak se spouští:</span>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Otevřít terminál: <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded font-mono font-bold text-slate-800">Win + R ➔ cmd</kbd></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Vypsat všechny procesy: <code className="font-bold text-emerald-800 font-mono">tasklist</code></span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Zobrazit nápovědu a přepínače: <code className="font-bold text-emerald-800 font-mono bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">tasklist /?</code></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-emerald-700 font-semibold bg-emerald-50/50 p-2 rounded-lg">
              💡 Pomocí <code className="font-bold font-mono">tasklist /?</code> zjistíte všechny pokročilé přepínače a filtry příkazu.
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ZÁKLADNÍ ČÁST (POVINNÁ)                                                    */}
      {/* ========================================================================= */}

      {/* ÚKOL 1: Základní orientace ve Správci úloh */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
            1
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 1: Základní orientace ve Správci úloh
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Globální odečet zatížení systému (CPU a RAM) a vyhledání nejnáročnějšího procesu
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_1_orient_a']}
              onChange={() => handleCheckChange('task_1_orient_a')}
              className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="font-bold">
              Krok 1a: Otevřete Správce úloh (<kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Ctrl + Shift + Esc</kbd>) a na kartě <em>Procesy</em> odečtěte v záhlaví celkové využití procesoru (CPU) a operační paměti (RAM).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_1_orient_b']}
              onChange={() => handleCheckChange('task_1_orient_b')}
              className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 1b: Klikněte na záhlaví sloupce <strong>CPU</strong>, čímž se procesy seřadí sestupně podle aktuální zátěže, a vyhledejte aplikaci, která procesor vytěžuje nejvíce.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                💡 Pokud procesy v seznamu poskakují, <strong>podržte klávesu Ctrl</strong> – Správce úloh dočasně pozastaví aktualizaci výpisu.
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka pro záznam Úkolu 1 */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Měřený parametr</th>
                <th className="p-3 border-b border-slate-200">Zjištěná hodnota</th>
                <th className="p-3 border-b border-slate-200">Poznámka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">Celkové využití CPU (%)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t1_total_cpu'] || ''}
                    onChange={(e) => handleAnswerChange('t1_total_cpu', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">V záhlaví sloupce CPU</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Celkové využití paměti RAM (%)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t1_total_ram'] || ''}
                    onChange={(e) => handleAnswerChange('t1_total_ram', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">V záhlaví sloupce Paměť</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Jméno aplikace používající nejvíce CPU</td>
                <td className="p-3" colSpan={2}>
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t1_top_cpu_app'] || ''}
                    onChange={(e) => handleAnswerChange('t1_top_cpu_app', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ÚKOL 2: Podrobnosti o konkrétním procesu (Edge + YouTube) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-xs">
            2
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 2: Prohlížeč Edge před spuštěním videa a při jeho přehrávání
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Měření změny počtu procesů, paměti a zátěže CPU při spuštění multimediálního obsahu
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_2_video_a']}
              onChange={() => handleCheckChange('task_2_video_a')}
              className="w-4 h-4 mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 2a: Spusťte Microsoft Edge a nechte otevřenou jen jednu prázdnou novou kartu. Ve Správci úloh na kartě <em>Procesy</em> najděte řádek <strong>Microsoft Edge</strong> a zapište do tabulky počet procesů (číslo v závorce za názvem), využití paměti a CPU.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_2_video_b']}
              onChange={() => handleCheckChange('task_2_video_b')}
              className="w-4 h-4 mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 2b: Ve stejné kartě pusťte toto{' '}
                <a
                  href="https://www.youtube.com/watch?v=zFiqZMTmolY&list=RDzFiqZMTmolY&start_radio=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  YouTube video
                  <ExternalLink className="w-3 h-3" />
                </a>
                , počkejte, až skončí případná reklama, a měření zopakujte.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                💡 Hodnoty se neustále mění – <strong>podržte klávesu Ctrl</strong>, Správce úloh tak dočasně pozastaví aktualizaci výpisu a hodnoty si v klidu opišete.
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka měření Edge před a při videu */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Stav prohlížeče</th>
                <th className="p-3 border-b border-slate-200">Počet procesů (číslo v závorce)</th>
                <th className="p-3 border-b border-slate-200">Využití paměti RAM</th>
                <th className="p-3 border-b border-slate-200">Využití CPU (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: 'Před spuštěním videa (prázdná karta)', prefix: 't2_before' },
                { label: 'Při přehrávání videa', prefix: 't2_video' }
              ].map((row) => (
                <tr key={row.prefix}>
                  <td className="p-3 font-bold text-slate-800">{row.label}</td>
                  {['count', 'mem', 'cpu'].map((field) => (
                    <td key={field} className="p-3">
                      <input
                        type="text"
                        placeholder=""
                        value={answers[`${row.prefix}_${field}`] || ''}
                        onChange={(e) => handleAnswerChange(`${row.prefix}_${field}`, e.target.value)}
                        className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-sky-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 2 */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            2.1 Porovnejte obě měření. Co se po spuštění videa změnilo a čím si to vysvětlujete?
          </label>
          <textarea
            rows={2}
            placeholder=""
            value={answers['t2_compare'] || ''}
            onChange={(e) => handleAnswerChange('t2_compare', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        {/* Pro pokročilé: víceprocesová architektura Edge (sbalovací) */}
        <details className="group rounded-2xl border-2 border-sky-200 bg-sky-50/60 overflow-hidden">
          <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden hover:bg-sky-100/60 transition-colors">
            <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-sky-900">
              <Info className="w-4 h-4 text-sky-600" />
              Pro pokročilé: Z čeho se aplikace Edge skládá?
            </span>
            <ChevronDown className="w-4 h-4 text-sky-600 transition-transform group-open:rotate-180" />
          </summary>

          <div className="px-5 pb-5 space-y-3 text-xs text-slate-700">
            <p className="text-sm text-slate-600 leading-relaxed">
              Prohlížeč Edge není jeden proces. Po spuštění vytvoří <strong>celou skupinu procesů <code>msedge.exe</code></strong>,
              které mají každý svou práci a navzájem spolupracují. Řádek <strong>Microsoft Edge (číslo)</strong> ve Správci úloh
              není proces – je to jen <strong>skupina</strong>, proto nemá PID a její hodnoty jsou součtem všech procesů uvnitř.
              Po rozbalení skupiny uvidíte jednotlivé procesy:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { name: 'Prohlížeč', desc: 'Hlavní proces. Kreslí okno a lištu a spouští a řídí všechny ostatní procesy (je jejich rodičem).' },
                { name: 'Karta: …', desc: 'Každá karta (web) má vlastní proces, který zpracovává stránku a spouští její JavaScript.' },
                { name: 'Proces GPU', desc: 'Posílá vykreslování a dekódování videa na grafickou kartu.' },
                { name: 'Nástroj: Network / Audio / Storage', desc: 'Pomocné služby – stahování dat ze sítě, přehrávání zvuku, práce s mezipamětí.' }
              ].map((p) => (
                <div key={p.name} className="p-3 bg-white rounded-xl border border-sky-100">
                  <span className="font-bold text-sky-900 block mb-0.5">{p.name}</span>
                  <p className="text-[11px] text-slate-600 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Proč tolik procesů?</strong> Když jedna karta spadne, ukončí se jen její proces a zbytek prohlížeče běží dál.
              Karty jsou od sebe navzájem odděleny, takže škodlivá stránka nemůže číst data z jiné karty. Procesy navíc mohou
              běžet současně na různých jádrech procesoru. Cenou za to je vyšší spotřeba paměti RAM.
            </p>
          </div>
        </details>
      </div>

      {/* ÚKOL 3: Identifikace PID v GUI i CLI (Notepad & Kalkulačka) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
            3
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 3: Identifikace procesů (PID) v Task Manageru a příkazu tasklist
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Porovnání zjištění číselného identifikátoru PID v grafickém rozhraní a v příkazové řádce
            </p>
          </div>
        </div>

        {/* Kroky */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_3a'] || !!checkedItems['task_1a']}
              onChange={() => handleCheckChange('task_3a')}
              className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-bold">
              Krok 3a: Spusťte Poznámkový blok (<code>notepad.exe</code>) a Kalkulačku (<code>calc.exe</code>).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_3b'] || !!checkedItems['task_1b']}
              onChange={() => handleCheckChange('task_3b')}
              className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-bold">
              Krok 3b: Otevřete Správce úloh (<kbd className="font-mono bg-white px-1.5 py-0.5 border rounded text-slate-800">Ctrl+Shift+Esc</kbd>),
              přepněte na záložku <em>Podrobnosti</em> a najděte jejich přesná PID.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_3c'] || !!checkedItems['task_1c']}
              onChange={() => handleCheckChange('task_3c')}
              className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-bold">
              Krok 3c: Otevřete Příkazový řádek (CMD) a zjistěte PID obou procesů pomocí příkazu <code>tasklist</code>.
              (Tip: Kompletní nápovědu ke všem možnostem a přepínačům získáte zadáním <code>tasklist /?</code>).
            </span>
          </label>
        </div>

        {/* Tabulka pro záznam PID */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Spuštěný proces</th>
                <th className="p-3 border-b border-slate-200">Zjištěné PID (Task Manager)</th>
                <th className="p-3 border-b border-slate-200">Zjištěné PID (tasklist v CMD)</th>
                <th className="p-3 border-b border-slate-200">Shodují se?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-mono font-bold text-slate-800">notepad.exe</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t3_notepad_pid_gui'] || answers['t1_notepad_pid_gui'] || ''}
                    onChange={(e) => handleAnswerChange('t3_notepad_pid_gui', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t3_notepad_pid_cli'] || answers['t1_notepad_pid_cli'] || ''}
                    onChange={(e) => handleAnswerChange('t3_notepad_pid_cli', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t3_notepad_match'] || answers['t1_notepad_match'] || ''}
                    onChange={(e) => handleAnswerChange('t3_notepad_match', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-slate-800">calc.exe / CalculatorApp.exe</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t3_calc_pid_gui'] || answers['t1_calc_pid_gui'] || ''}
                    onChange={(e) => handleAnswerChange('t3_calc_pid_gui', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t3_calc_pid_cli'] || answers['t1_calc_pid_cli'] || ''}
                    onChange={(e) => handleAnswerChange('t3_calc_pid_cli', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t3_calc_match'] || answers['t1_calc_match'] || ''}
                    onChange={(e) => handleAnswerChange('t3_calc_match', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 3 */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            3.1 Co se stane, když Poznámkový blok zavřete a spustíte znovu? Získá stejné PID, nebo jiné? Proč operační systém přiděluje PID dynamicky?
          </label>
          <textarea
            rows={2}
            placeholder=""
            value={answers['t3_pid_dynamic'] || answers['t1_pid_dynamic'] || ''}
            onChange={(e) => handleAnswerChange('t3_pid_dynamic', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            3.2 Spustili jste calc.exe, ale v tasklistu proces s tímto názvem nenajdete. Jak se proces Kalkulačky jmenuje a proč tomu tak je?
          </label>
          <textarea
            rows={2}
            placeholder=""
            value={answers['t3_calc_missing'] || ''}
            onChange={(e) => handleAnswerChange('t3_calc_missing', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ÚKOL 4: Filtrování v CLI (procesy nad 300 MB) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
            4
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 4: Filtrování procesů v CLI — procesy s pamětí nad 300 MB (tasklist /?)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Samostatná práce s nápovědou příkazu <code>tasklist /?</code>, vyhledání parametru filtru <code>/FI</code> a operátoru <code>gt</code>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Běžný příkaz <code>tasklist</code> vypíše stovky běžících procesů naráz. Správce systému proto používá
          <strong>filtrování</strong>. Vaším cílem je pomocí nápovědy zjistit, jak filtrovat, a vypsat procesy,
          které v paměti RAM zabírají <strong>více než 300 MB</strong>.
        </p>

        {/* Kroky */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_4_filter_a'] || !!checkedItems['task_3_filter_a']}
              onChange={() => handleCheckChange('task_4_filter_a')}
              className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="font-bold">
              Krok 4a: Otevřete Příkazový řádek (CMD) a zadejte nápovědu <code>tasklist /?</code>.
              V sekci přepínačů vyhledejte parametr <code>/FI</code> (Filtry), povolené operátory (např. <code>gt</code> = greater than / větší než)
              a název filtru paměti (<code>MEMUSAGE</code>).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_4_filter_b'] || !!checkedItems['task_3_filter_b']}
              onChange={() => handleCheckChange('task_4_filter_b')}
              className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="font-bold">
              Krok 4b: Všimněte si, že filtr <code>MEMUSAGE</code> očekává hodnotu v <strong>kB</strong> (kilobajtech).
              Přepočítejte 300 MB na kB (pro filtr stačí <code>300000</code>) a spusťte filtrační příkaz v CMD.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_4_filter_c'] || !!checkedItems['task_3_filter_c']}
              onChange={() => handleCheckChange('task_4_filter_c')}
              className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="font-bold">
              Krok 4c: Zapište přesný příkaz, který jste použili, a zaznamenejte 3 nalezené procesy s nejvyšší spotřebou RAM do tabulky.
            </span>
          </label>
        </div>

        {/* Zadaný příkaz */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Zapište přesné znění příkazu, který jste v CMD spustili:
          </label>
          <input
            type="text"
            placeholder=""
            value={answers['t4_filter_cmd'] || answers['t3_filter_cmd'] || ''}
            onChange={(e) => handleAnswerChange('t4_filter_cmd', e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
          />
        </div>

        {/* Tabulka procesů nad 300 MB */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Pořadí</th>
                <th className="p-3 border-b border-slate-200">Název procesu (.exe)</th>
                <th className="p-3 border-b border-slate-200">PID</th>
                <th className="p-3 border-b border-slate-200">Spotřeba paměti RAM (v kB nebo MB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-500">1. proces</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p1_name'] || answers['t3_p1_name'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p1_name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p1_pid'] || answers['t3_p1_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p1_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p1_mem'] || answers['t3_p1_mem'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p1_mem', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">2. proces</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p2_name'] || answers['t3_p2_name'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p2_name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p2_pid'] || answers['t3_p2_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p2_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p2_mem'] || answers['t3_p2_mem'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p2_mem', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">3. proces</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p3_name'] || answers['t3_p3_name'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p3_name', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p3_pid'] || answers['t3_p3_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p3_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t4_p3_mem'] || answers['t3_p3_mem'] || ''}
                    onChange={(e) => handleAnswerChange('t4_p3_mem', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázka k úkolu 4 */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              4.1 Jak by vypadal příkaz, kdybyste naopak chtěli vyhledat procesy s pamětí MENŠÍ než 10 MB, tj. 10000 kB (operátor &apos;lt&apos; = less than)?
            </label>
            <textarea
              rows={2}
              placeholder=""
              value={answers['t4_filter_lt_example'] || answers['t3_filter_lt_example'] || ''}
              onChange={(e) => handleAnswerChange('t4_filter_lt_example', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROZŠIŘUJÍCÍ ČÁST PRO POKROČILÉ (S HVĚZDIČKOU *)                            */}
      {/* ========================================================================= */}
      <div className="pt-4 border-t-2 border-slate-200">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Rozšiřující část pro pokročilé studenty (s hvězdičkou *)
          </h2>
        </div>
      </div>

      {/* ÚKOL 5*: Dvě instance stejného programu */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
            5*
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 5*: Spuštění dvou stejných programů současně (Dvě instance v RAM)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ověření nezávislosti procesů, unikátnosti PID a principu paměťové izolace
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Co se stane v operační paměti, když tentýž program spustíme dvakrát? Vznikne jeden společný proces, nebo dva samostatné?
          Ověřte toto chování přímo v praxi.
        </p>

        {/* Checklist kroků */}
        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_5_instance_a'] || !!checkedItems['task_2_instance_a']}
              onChange={() => handleCheckChange('task_5_instance_a')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">
              Krok 5a: Spusťte Poznámkový blok (<code>notepad.exe</code>).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_5_instance_b'] || !!checkedItems['task_2_instance_b']}
              onChange={() => handleCheckChange('task_5_instance_b')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">
              Krok 5b: Bez zavření prvního okna spusťte Poznámkový blok podruhé (máte dvě samostatná okna vedle sebe).
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_5_instance_c'] || !!checkedItems['task_2_instance_c']}
              onChange={() => handleCheckChange('task_5_instance_c')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-bold">
              Krok 5c: Pomocí příkazu <code>tasklist</code> v Příkazovém řádku (CMD) vyhledejte běžící procesy <code>notepad.exe</code> a zapište jejich PID do tabulky.
            </span>
          </label>
        </div>

        {/* Tabulka instancí */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Běžící instance</th>
                <th className="p-3 border-b border-slate-200">Zjištěné PID (v tasklistu)</th>
                <th className="p-3 border-b border-slate-200">Kolik procesů celkem vzniklo v RAM?</th>
                <th className="p-3 border-b border-slate-200">Mají obě okna stejné, nebo odlišné PID?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">1. okno Poznámkového bloku</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t5_instance1_pid'] || answers['t2_instance1_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t5_instance1_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td rowSpan={2} className="p-3 align-middle bg-slate-50/50">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t5_process_count'] || answers['t2_process_count'] || ''}
                    onChange={(e) => handleAnswerChange('t5_process_count', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </td>
                <td rowSpan={2} className="p-3 align-middle bg-slate-50/50">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t5_pid_same_or_diff'] || answers['t2_pid_same_or_diff'] || ''}
                    onChange={(e) => handleAnswerChange('t5_pid_same_or_diff', e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold text-xs focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">2. okno Poznámkového bloku</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t5_instance2_pid'] || answers['t2_instance2_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t5_instance2_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázky k úkolu 5* */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              5.1 Proč má každé otevřené okno téhož programu své vlastní unikátní PID a nemůže ho sdílet? Co by se stalo, kdyby dvě okna měla stejné číslo procesu?
            </label>
            <textarea
              rows={3}
              placeholder=""
              value={answers['t5_why_unique_pid'] || answers['t2_why_unique_pid'] || ''}
              onChange={(e) => handleAnswerChange('t5_why_unique_pid', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              5.2 Představte si, že v 1. okně píšete důležitou práci a 2. okno náhle zamrzne a přestane reagovat. Jaká je výhoda toho, že jde o dva nezávislé procesy?
            </label>
            <textarea
              rows={2}
              placeholder=""
              value={answers['t5_isolation_benefit'] || answers['t2_isolation_benefit'] || ''}
              onChange={(e) => handleAnswerChange('t5_isolation_benefit', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ÚKOL 6*: Rodičovský proces v Process Exploreru */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-100">
          <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs">
            6*
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 6*: Rodičovský proces (PPID) a stromová hierarchie v Process Exploreru
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Vizualizace stromu procesů (Process Tree) a dohledání rodiče (Parent ➔ Child)
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_6a'] || !!checkedItems['task_5a']}
              onChange={() => handleCheckChange('task_6a')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 6a: Stáhněte a spusťte nástroj Process Explorer (Microsoft Sysinternals).
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                Oficiální diagnostický nástroj Microsoftu stáhněte ze stránky{' '}
                <a
                  href="https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Process Explorer (Microsoft Learn)
                  <ExternalLink className="w-3 h-3" />
                </a>
                . Aplikaci není nutné instalovat — stačí rozbalit stažený ZIP archiv a spustit <code>procexp.exe</code> (nebo <code>procexp64.exe</code>).
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_6b'] || !!checkedItems['task_5b']}
              onChange={() => handleCheckChange('task_6b')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 6b: Spusťte dvě nezávislá okna Poznámkového bloku ze dvou různých míst.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                1. První instanci spusťte běžným způsobem (např. z plochy nebo z nabídky Start).<br />
                2. Druhou instanci spusťte z Příkazového řádku (CMD) příkazem: <code>start notepad.exe</code>.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_6c'] || !!checkedItems['task_5c']}
              onChange={() => handleCheckChange('task_6c')}
              className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 6c: Vyhledejte obě okna Notepadu ve stromové hierarchii (Process Tree) Process Exploreru.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                V Process Exploreru se podívejte na odsazení procesů ve sloupci <strong>Process</strong>. Najděte proces <code>explorer.exe</code> a proces <code>cmd.exe</code> a sledujte, pod kým je který <code>notepad.exe</code> zanořen. Poklepáním na proces otevřete vlastnosti (Properties ➔ záložka Image), kde vidíte položku <strong>Parent</strong> (název rodiče a v závorce PPID).
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka rodičů a potomků */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Instance Notepadu</th>
                <th className="p-3 border-b border-slate-200">PID Notepadu</th>
                <th className="p-3 border-b border-slate-200">Rodičovský proces (Parent Name)</th>
                <th className="p-3 border-b border-slate-200">PPID rodiče</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">1. Spuštěný z plochy / Startu</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t6_inst1_pid'] || answers['t5_inst1_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_inst1_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t6_inst1_parent'] || answers['t5_inst1_parent'] || ''}
                    onChange={(e) => handleAnswerChange('t6_inst1_parent', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t6_inst1_ppid'] || answers['t5_inst1_ppid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_inst1_ppid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">2. Spuštěný z CMD (start notepad.exe)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t6_inst2_pid'] || answers['t5_inst2_pid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_inst2_pid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t6_inst2_parent'] || answers['t5_inst2_parent'] || ''}
                    onChange={(e) => handleAnswerChange('t6_inst2_parent', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t6_inst2_ppid'] || answers['t5_inst2_ppid'] || ''}
                    onChange={(e) => handleAnswerChange('t6_inst2_ppid', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-purple-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Jednoduché shrnutí: Co rodič procesu ovlivňuje */}
        <div className="p-5 rounded-2xl bg-purple-50/70 border-2 border-purple-200 text-xs text-slate-700 space-y-2.5">
          <div className="flex items-center gap-2 text-purple-900 font-black uppercase text-[11px] tracking-wider">
            <Info className="w-4 h-4 text-purple-600" />
            <span>K čemu v systému slouží rodičovský proces a co ovlivňuje?</span>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Každý program ve Windows (kromě samotného jádra systému) je spuštěn nějakým jiným procesem — svým <strong>rodičem</strong>. Tato hierarchie má 3 jednoduché a důležité funkce:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold text-purple-900 block mb-1">🛡️ 1. Dědění práv</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Potomek přebírá práva svého rodiče. Program spuštěný ze správcovského okna poběží automaticky také jako Správce.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold text-purple-900 block mb-1">🌲 2. Kdo koho spustil</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Strom ukazuje původ každého procesu. Správce tak snadno odhalí podezřelý program (např. když Word nečekaně spustí CMD). Pozor: zavřením rodiče se potomek ve Windows sám neukončí – Poznámkový blok poběží dál i po zavření CMD.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-purple-100 shadow-xs">
              <span className="font-bold text-purple-900 block mb-1">💬 3. Návratový kód</span>
              <p className="text-[11px] text-slate-600 leading-normal">
                Potomek po svém skončení vrátí rodiči zprávu, zda úloha dopadla v pořádku (kód 0), nebo s chybou.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ÚKOL 7*: Program na disku vs. Proces v RAM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-amber-100">
          <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs">
            7*
          </span>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Úkol 7*: Program na disku vs. Proces v paměti RAM (Instrukce vs. Data)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Porovnání neměnnosti instrukcí kódu vůči dynamickému růstu datového segmentu na haldě
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700">
          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_7a'] || !!checkedItems['task_4a']}
              onChange={() => handleCheckChange('task_7a')}
              className="w-4 h-4 mt-0.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <span className="font-bold">
              Krok 7a: Vyhledejte soubor <code>notepad.exe</code> na disku C: (v <code>C:\Windows\System32\notepad.exe</code>) a odečtěte jeho velikost na disku.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_7b'] || !!checkedItems['task_4b']}
              onChange={() => handleCheckChange('task_7b')}
              className="w-4 h-4 mt-0.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 7b: Ve Správci úloh nebo v příkazu <code>tasklist</code> odečtěte spotřebu paměti RAM po spuštění prázdného Poznámkového bloku.
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                ⚠️ Všechna měření RAM v tomto úkolu provádějte <strong>stále stejným nástrojem</strong>. Správce úloh a <code>tasklist</code> počítají paměť jinak (Správce úloh ukazuje jen privátní paměť procesu, <code>tasklist</code> včetně sdílených knihoven), proto se jejich čísla liší.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors border border-slate-200">
            <input
              type="checkbox"
              checked={!!checkedItems['task_7c'] || !!checkedItems['task_4c']}
              onChange={() => handleCheckChange('task_7c')}
              className="w-4 h-4 mt-0.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <div className="space-y-1">
              <span className="font-bold">
                Krok 7c: Vložte nebo otevřete v Poznámkovém bloku velký textový soubor (např. 1 MB).
              </span>
              <p className="text-[11px] text-slate-500 font-normal">
                Vzorový textový soubor o požadované velikosti (např. 1 MB) si můžete vygenerovat a stáhnout na stránce{' '}
                <a
                  href="https://textfilegenerator.com/sample-text-file/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  textfilegenerator.com/sample-text-file/
                  <ExternalLink className="w-3 h-3" />
                </a>
                . Následně sledujte změnu hodnoty v příkazu <code>tasklist</code> nebo ve Správci úloh ve sloupci <em>Využití paměti</em>.
              </p>
            </div>
          </label>
        </div>

        {/* Tabulka hodnot */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[11px]">
              <tr>
                <th className="p-3 border-b border-slate-200">Stav / Místo</th>
                <th className="p-3 border-b border-slate-200">Naměřená hodnota</th>
                <th className="p-3 border-b border-slate-200">Jednotka / Poznámka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-800">Velikost souboru na disku (SSD)</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t7_disk_size'] || answers['t4_disk_size'] || answers['t2_disk_size'] || ''}
                    onChange={(e) => handleAnswerChange('t7_disk_size', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">C:\Windows\System32\notepad.exe</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Využití RAM po čistém spuštění</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t7_ram_initial'] || answers['t4_ram_initial'] || answers['t2_ram_initial'] || ''}
                    onChange={(e) => handleAnswerChange('t7_ram_initial', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">Prázdný dokument bez textu</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-800">Využití RAM po vložení velkého textu</td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder=""
                    value={answers['t7_ram_loaded'] || answers['t4_ram_loaded'] || answers['t2_ram_loaded'] || ''}
                    onChange={(e) => handleAnswerChange('t7_ram_loaded', e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </td>
                <td className="p-3 text-slate-500 font-mono text-xs">Dokument naplněný textem</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Otázky k úkolu 7* */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              7.1 Proč proces v RAM zabírá podstatně více místa než samotný soubor .exe na disku? Co všechno si proces v RAM musel po spuštění vytvořit navíc?
            </label>
            <textarea
              rows={3}
              placeholder=""
              value={answers['t7_ram_growth_reason'] || answers['t4_ram_growth_reason'] || answers['t2_ram_growth_reason'] || ''}
              onChange={(e) => handleAnswerChange('t7_ram_growth_reason', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              7.2 Která část paměti procesu (Instrukce vs. Data) se po vložení velkého textu zvětšila a proč? Mohou se během psaní textu měnit instrukce programu?
            </label>
            <textarea
              rows={2}
              placeholder=""
              value={answers['t7_code_vs_data'] || answers['t4_code_vs_data'] || answers['t2_code_vs_data'] || ''}
              onChange={(e) => handleAnswerChange('t7_code_vs_data', e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
