import { ProcessIntroWorksheetAnswers, ProcessIntroCheckedItems } from '../ProcessIntroTypes';

export const exportProcessIntroWord = (
  studentName: string,
  answers: ProcessIntroWorksheetAnswers,
  checkedItems: ProcessIntroCheckedItems
) => {
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
        <h2>3. Identifikace procesů (PID) v grafickém rozhraní (Správce úloh)</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_3_paint_calc_a'] || checkedItems['task_3a'] ? 'X' : ' '} ] 1. Spusťte Malování (mspaint.exe) a Kalkulačku (calc.exe).</div>
          <div class="step">[ ${checkedItems['task_3_paint_calc_b'] || checkedItems['task_3b'] ? 'X' : ' '} ] 2. Otevřete Správce úloh (Ctrl+Shift+Esc), přepněte na záložku Podrobnosti a vyhledejte jejich přesná PID.</div>
          
          <table border="1">
            <tr>
              <th>Aplikace</th>
              <th>Spustitelný soubor (.exe)</th>
              <th>Zjištěné PID (Správce úloh — záložka Podrobnosti)</th>
            </tr>
            <tr>
              <td>Malování</td>
              <td><code>mspaint.exe</code></td>
              <td>${answers['t3_mspaint_pid_gui'] || answers['t3_notepad_pid_gui'] || ''}</td>
            </tr>
            <tr>
              <td>Kalkulačka</td>
              <td><code>calc.exe</code> / <code>CalculatorApp.exe</code></td>
              <td>${answers['t3_calc_pid_gui'] || ''}</td>
            </tr>
          </table>

          <div class="question">3.1 Co se stane, když Malování zavřete a spustíte znovu? Získá stejné PID, nebo jiné? Proč operační systém přiděluje PID dynamicky?</div>
          <div class="answer">${(answers['t3_pid_dynamic'] || answers['t1_pid_dynamic'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 4 -->
        <h2>4. První seznámení s CLI — příkaz tasklist a ruční vyhledání PID</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_4_cli_intro_a'] ? 'X' : ' '} ] 1. Spusťte Příkazový řádek (Win + R ➔ zadejte cmd ➔ Enter).</div>
          <div class="step">[ ${checkedItems['task_4_cli_intro_b'] ? 'X' : ' '} ] 2. Zadejte příkaz <code>tasklist</code> a stiskněte Enter. Vypíše se kompletní tabulka běžících procesů v systému.</div>
          <div class="step">[ ${checkedItems['task_4_cli_intro_c'] ? 'X' : ' '} ] 3. V dlouhém výpisu ručně vyhledejte procesy mspaint.exe a Kalkulačku, odečtěte jejich PID a porovnejte s Úkolem 3.</div>

          <table border="1">
            <tr>
              <th>Proces v CLI</th>
              <th>PID zjištěné v tasklistu</th>
              <th>PID z Úkolu 3 (Správce úloh)</th>
              <th>Shodují se obě čísla?</th>
            </tr>
            <tr>
              <td>mspaint.exe</td>
              <td>${answers['t4_mspaint_pid_cli'] || answers['t3_notepad_pid_cli'] || ''}</td>
              <td>${answers['t3_mspaint_pid_gui'] || answers['t3_notepad_pid_gui'] || ''}</td>
              <td>${answers['t4_mspaint_match'] || answers['t3_notepad_match'] || ''}</td>
            </tr>
            <tr>
              <td>CalculatorApp.exe / calc.exe</td>
              <td>${answers['t4_calc_pid_cli'] || answers['t3_calc_pid_cli'] || ''}</td>
              <td>${answers['t3_calc_pid_gui'] || ''}</td>
              <td>${answers['t4_calc_match'] || answers['t3_calc_match'] || ''}</td>
            </tr>
          </table>
        </div>

        <!-- ÚKOL 5 -->
        <h2>5. Filtrování procesů podle názvu v CLI (tasklist /FI)</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_5_filter_name_a'] ? 'X' : ' '} ] 1. Spusťte příkaz pro vyfiltrování pouze Malování: <code>tasklist /FI "IMAGENAME eq mspaint.exe"</code>.</div>
          <div class="step">[ ${checkedItems['task_5_filter_name_b'] ? 'X' : ' '} ] 2. Ověřte, že se vypsal pouze jeden řádek s procesem Malování namísto stovek procesů.</div>
          <div class="step">[ ${checkedItems['task_5_filter_name_c'] ? 'X' : ' '} ] 3. Vyzkoušejte zástupný znak * pro vyhledání procesů na písmeno 'm': <code>tasklist /FI "IMAGENAME eq m*"</code>.</div>

          <div class="question">5.1 Kolik procesů celkem začínajících na písmeno „m“ se vám po zadání příkazu tasklist /FI "IMAGENAME eq m*" ve výpisu zobrazilo? (Zapište počet nalezených procesů / řádků):</div>
          <div class="answer">${answers['t5_filter_wildcard_count'] || answers['t5_filter_wildcard_result'] || ''}</div>
        </div>

        <!-- ÚKOL 6 -->
        <h2>6. Samostatné filtrování procesů podle spotřeby paměti RAM (tasklist /?)</h2>
        <div class="task">
          <div class="step">[ ${checkedItems['task_6_filter_mem_a'] || checkedItems['task_4_filter_a'] ? 'X' : ' '} ] 1. V nápovědě <code>tasklist /?</code> vyhledejte filtr pro paměť RAM (MEMUSAGE) a operátor 'gt' (greater than / větší než).</div>
          <div class="step">[ ${checkedItems['task_6_filter_mem_b'] || checkedItems['task_4_filter_b'] ? 'X' : ' '} ] 2. Přepočítejte 300 MB na kB (300000) a spusťte filtrační příkaz v CMD.</div>
          <div class="step">[ ${checkedItems['task_6_filter_mem_c'] || checkedItems['task_4_filter_c'] ? 'X' : ' '} ] 3. Zapište použitý příkaz a zaznamenejte 3 nalezené procesy s nejvyšší spotřebou RAM do tabulky.</div>

          <p><strong>Použitý příkaz v CMD:</strong> <code>${answers['t6_filter_cmd'] || answers['t4_filter_cmd'] || ''}</code></p>

          <table border="1">
            <tr>
              <th>Pořadí</th>
              <th>Název procesu (.exe)</th>
              <th>PID</th>
              <th>Spotřeba paměti RAM (v kB nebo MB)</th>
            </tr>
            <tr>
              <td>1. proces</td>
              <td>${answers['t6_p1_name'] || answers['t4_p1_name'] || ''}</td>
              <td>${answers['t6_p1_pid'] || answers['t4_p1_pid'] || ''}</td>
              <td>${answers['t6_p1_mem'] || answers['t4_p1_mem'] || ''}</td>
            </tr>
            <tr>
              <td>2. proces</td>
              <td>${answers['t6_p2_name'] || answers['t4_p2_name'] || ''}</td>
              <td>${answers['t6_p2_pid'] || answers['t4_p2_pid'] || ''}</td>
              <td>${answers['t6_p2_mem'] || answers['t4_p2_mem'] || ''}</td>
            </tr>
            <tr>
              <td>3. proces</td>
              <td>${answers['t6_p3_name'] || answers['t4_p3_name'] || ''}</td>
              <td>${answers['t6_p3_pid'] || answers['t4_p3_pid'] || ''}</td>
              <td>${answers['t6_p3_mem'] || answers['t4_p3_mem'] || ''}</td>
            </tr>
          </table>

          <div class="question">6.1 Jak by vypadal příkaz, kdybyste naopak chtěli vyhledat procesy s pamětí MENŠÍ než 10 MB, tj. 10000 kB?</div>
          <div class="answer">${(answers['t6_filter_lt_example'] || answers['t4_filter_lt_example'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 7* -->
        <h2>7*. Spuštění dvou stejných programů současně (Dvě instance v RAM — Malování)</h2>
        <div class="task" style="border-left: 3pt solid #8b5cf6; background: #faf5ff;">
          <div class="step">[ ${checkedItems['task_7_instance_a'] || checkedItems['task_5_instance_a'] ? 'X' : ' '} ] 1. Spusťte Malování (mspaint.exe).</div>
          <div class="step">[ ${checkedItems['task_7_instance_b'] || checkedItems['task_5_instance_b'] ? 'X' : ' '} ] 2. Bez zavření prvního okna spusťte Malování podruhé (dvě samostatná okna vedle sebe).</div>
          <div class="step">[ ${checkedItems['task_7_instance_c'] || checkedItems['task_5_instance_c'] ? 'X' : ' '} ] 3. Pomocí příkazu <code>tasklist /FI "IMAGENAME eq mspaint.exe"</code> v CMD vyhledejte obě běžící instance a zapište jejich PID.</div>

          <table border="1">
            <tr>
              <th>Běžící instance</th>
              <th>Zjištěné PID</th>
              <th>Kolik procesů celkem vzniklo v RAM?</th>
              <th>Mají obě okna stejné, nebo odlišné PID?</th>
            </tr>
            <tr>
              <td>1. okno Malování (mspaint.exe)</td>
              <td>${answers['t7_instance1_pid'] || answers['t5_instance1_pid'] || ''}</td>
              <td rowspan="2">${answers['t7_process_count'] || answers['t5_process_count'] || ''}</td>
              <td rowspan="2">${answers['t7_pid_same_or_diff'] || answers['t5_pid_same_or_diff'] || ''}</td>
            </tr>
            <tr>
              <td>2. okno Malování (mspaint.exe)</td>
              <td>${answers['t7_instance2_pid'] || answers['t5_instance2_pid'] || ''}</td>
            </tr>
          </table>

          <div class="question">7.1 Proč má každé otevřené okno téhož programu své vlastní unikátní PID a nemůže ho sdílet? Co by se stalo, kdyby dvě okna měla stejné číslo procesu?</div>
          <div class="answer">${(answers['t7_why_unique_pid'] || answers['t5_why_unique_pid'] || '').replace(/\n/g, '<br/>')}</div>

          <div class="question">7.2 Představte si, že v 1. okně Malování kreslíte výkres a 2. okno náhle zamrzne a spadne. Jaká je výhoda toho, že jde o dva nezávislé procesy s oddělenou pamětí?</div>
          <div class="answer">${(answers['t7_isolation_benefit'] || answers['t5_isolation_benefit'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 8* -->
        <h2>8*. Program na disku vs. Proces v paměti RAM (Instrukce vs. Data)</h2>
        <div class="task" style="border-left: 3pt solid #f59e0b; background: #fffbeb;">
          <div class="step">[ ${checkedItems['task_8_ram_disk_a'] || checkedItems['task_9_ram_disk_a'] || checkedItems['task_7a'] ? 'X' : ' '} ] 1. Vyhledejte soubor notepad.exe na disku C: (v C:\Windows\System32\notepad.exe) a zjistěte jeho velikost na disku.</div>
          <div class="step">[ ${checkedItems['task_8_ram_disk_b'] || checkedItems['task_9_ram_disk_b'] || checkedItems['task_7b'] ? 'X' : ' '} ] 2. Ve Správci úloh nebo v tasklistu odečtěte spotřebu RAM bezprostředně po spuštění čistého Poznámkového bloku.</div>

          <table border="1">
            <tr>
              <th>Metrika</th>
              <th>Hodnota</th>
              <th>Poznámka / Jednotka</th>
            </tr>
            <tr>
              <td>Velikost souboru na disku (SSD)</td>
              <td>${answers['t8_disk_size'] || answers['t9_disk_size'] || answers['t7_disk_size'] || answers['t4_disk_size'] || ''}</td>
              <td>kB na disku C:\Windows\System32</td>
            </tr>
            <tr>
              <td>Využití RAM po spuštění (čistý stav)</td>
              <td>${answers['t8_ram_initial'] || answers['t9_ram_initial'] || answers['t7_ram_initial'] || ''}</td>
              <td>kB v paměti RAM</td>
            </tr>
          </table>

          <div class="question">8.1 Proč čistě spuštěný proces v RAM zabírá podstatně více místa než samotný soubor .exe na disku?</div>
          <div class="answer">${(answers['t8_ram_growth_reason'] || answers['t9_ram_growth_reason'] || answers['t7_ram_growth_reason'] || '').replace(/\n/g, '<br/>')}</div>
        </div>

        <!-- ÚKOL 9* -->
        <h2>9*. Rodičovský proces (PPID) a stromová hierarchie v Process Exploreru</h2>
        <div class="task" style="border-left: 3pt solid #8b5cf6; background: #faf5ff;">
          <div class="step">[ ${checkedItems['task_9_procexp_a'] || checkedItems['task_8_procexp_a'] || checkedItems['task_6a'] ? 'X' : ' '} ] 1. Stáhněte a spusťte nástroj Process Explorer (<a href="https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer">learn.microsoft.com/en-us/sysinternals/downloads/process-explorer</a>).</div>
          <div class="step">[ ${checkedItems['task_9_procexp_b'] || checkedItems['task_8_procexp_b'] || checkedItems['task_6b'] ? 'X' : ' '} ] 2. Spusťte jeden Poznámkový blok běžně (z plochy / Startu) a druhý z Příkazového řádku příkazem: <code>start notepad.exe</code>.</div>
          <div class="step">[ ${checkedItems['task_9_procexp_c'] || checkedItems['task_8_procexp_c'] || checkedItems['task_6c'] ? 'X' : ' '} ] 3. V Process Exploreru vyhledejte obě okna ve stromu (Process Tree) a odečtěte rodiče a PPID.</div>

          <table border="1">
            <tr>
              <th>Instance Notepadu</th>
              <th>PID Notepadu</th>
              <th>Rodičovský proces (Parent Name)</th>
              <th>PPID rodiče</th>
            </tr>
            <tr>
              <td>1. Spuštěný z plochy / Startu</td>
              <td>${answers['t9_inst1_pid'] || answers['t8_inst1_pid'] || answers['t6_inst1_pid'] || ''}</td>
              <td>${answers['t9_inst1_parent'] || answers['t8_inst1_parent'] || answers['t6_inst1_parent'] || ''}</td>
              <td>${answers['t9_inst1_ppid'] || answers['t8_inst1_ppid'] || answers['t6_inst1_ppid'] || ''}</td>
            </tr>
            <tr>
              <td>2. Spuštěný z CMD (start notepad.exe)</td>
              <td>${answers['t9_inst2_pid'] || answers['t8_inst2_pid'] || answers['t6_inst2_pid'] || ''}</td>
              <td>${answers['t9_inst2_parent'] || answers['t8_inst2_parent'] || answers['t6_inst2_parent'] || ''}</td>
              <td>${answers['t9_inst2_ppid'] || answers['t8_inst2_ppid'] || answers['t6_inst2_ppid'] || ''}</td>
            </tr>
          </table>

          <div class="task" style="border-left: 3pt solid #8b5cf6; background: #f5f3ff; margin-top: 14px;">
            <strong style="color: #6d28d9;">Jednoduché vysvětlení: Co rodič procesu v systému ovlivňuje?</strong>
            <ul style="margin-top: 6px; margin-bottom: 0;">
              <li><strong>1. Dědění práv:</strong> Nový proces přebírá bezpečnostní oprávnění svého rodiče (program spuštěný ze správcovského okna běží také jako Správce).</li>
              <li><strong>2. Kdo koho spustil:</strong> Strom ukazuje původ každého procesu. Správce tak snadno odhalí podezřelý program (např. když Word nečekaně spustí CMD). Pozor: ukončením rodiče se potomek ve Windows automaticky nezavře – program poběží dál i po zavření CMD.</li>
              <li><strong>3. Návratový kód:</strong> Potomek po skončení své práce předá rodiči zprávu, zda úkol proběhl úspěšně (kód 0), nebo s chybou.</li>
            </ul>
          </div>
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
