import { ProcessSwitchingWorksheetAnswers, ProcessSwitchingCheckedItems } from '../ProcessSwitchingTypes';

export const exportProcessSwitchingWord = (
  studentName: string,
  answers: ProcessSwitchingWorksheetAnswers,
  _checkedItems: ProcessSwitchingCheckedItems
) => {
  const date = new Date().toLocaleDateString('cs-CZ');

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Praktický list: Měření přepnutí kontextu na CPU</title>
      <style>
        body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 20mm; }
        h1 { color: #1e1b4b; font-size: 18pt; border-bottom: 2pt solid #4338ca; padding-bottom: 4px; margin-bottom: 10px; }
        h2 { color: #3730a3; font-size: 12pt; margin-top: 14px; margin-bottom: 6px; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2px; }
        .meta { font-size: 10pt; margin-bottom: 14px; color: #475569; background: #f8fafc; padding: 8px 12px; border: 1pt solid #e2e8f0; }
        .task { margin-bottom: 12px; padding: 8px 12px; background: #fafafa; border-left: 3pt solid #6366f1; }
        .note { margin-top: 10px; padding: 8px 12px; background: #ecfdf5; border-left: 3pt solid #10b981; font-size: 9.5pt; color: #065f46; }
        table { width: 100%; border-collapse: collapse; margin-top: 6px; margin-bottom: 8px; }
        th, td { border: 1pt solid #cbd5e1; padding: 5px 8px; text-align: left; font-size: 10pt; }
        th { background-color: #e0e7ff; color: #1e1b4b; font-weight: bold; }
        code { font-family: Consolas, monospace; background: #f1f5f9; padding: 1px 4px; border: 1pt solid #cbd5e1; }
      </style>
    </head>
    <body>
      <h1>Praktický list: Parametry CPU a měření přepnutí kontextu</h1>
      <div class="meta">
        <strong>Jméno a příjmení studenta:</strong> ${studentName || '........................................'}<br/>
        <strong>Datum:</strong> ${date} | <strong>Předmět:</strong> Operační systémy 1 — Multitasking
      </div>

      <!-- ÚKOL 1 -->
      <h2>1. Parametry procesoru (Správce úloh)</h2>
      <div class="task">
        <table border="1">
          <tr>
            <th style="width: 60%;">Parametr</th>
            <th style="width: 40%;">Hodnota</th>
          </tr>
          <tr>
            <td>Typ a model CPU</td>
            <td>${answers['t1_cpu_model'] || ''}</td>
          </tr>
          <tr>
            <td>Počet logických procesorů CPU (hardwarových vláken)</td>
            <td>${answers['t1_cpu_threads'] || ''}</td>
          </tr>
          <tr>
            <td>Celkový počet běžících vláken v systému (Threads)</td>
            <td>${answers['t1_system_threads'] || ''}</td>
          </tr>
          <tr style="background-color: #eff6ff; font-weight: bold;">
            <td>Výpočet: Průměrný počet vláken na 1 logické jádro CPU</td>
            <td>${answers['t1_threads_per_core'] || ''}</td>
          </tr>
        </table>
      </div>

      <!-- ÚKOL 2 -->
      <h2>2. Měření přepnutí kontextu (perfmon.exe)</h2>
      <div class="task">
        <p style="margin: 0 0 6px 0; font-size: 9.5pt; color: #475569;">
          Postup: <code>perfmon</code> ➔ Sledování výkonu ➔ smazat výchozí čítač ➔ přidat <code>Systém \\ Přepnutí kontextu/s</code> ➔ Vlastnosti čítače: Měřítko 0,001.
        </p>
        <table border="1">
          <tr>
            <th>Měřený stav</th>
            <th>Co dělat</th>
            <th>Zjištěná hodnota (přepnutí/s)</th>
          </tr>
          <tr>
            <td>1. Klid (Idle) – Průměr</td>
            <td>PC 10 s bez dotyku myši</td>
            <td>${answers['t2_idle_avg'] || ''}</td>
          </tr>
          <tr>
            <td>2. Klid (Idle) – Nejméně</td>
            <td>Stále v klidu</td>
            <td>${answers['t2_idle_min'] || ''}</td>
          </tr>
          <tr style="background-color: #fffbeb; font-weight: bold;">
            <td>3. Pohyb myší – Nejvíce (špička)</td>
            <td>Rychlé kroužení myší po ploše</td>
            <td>${answers['t2_mouse_max'] || ''}</td>
          </tr>
        </table>

        <div class="note">
          <strong>Vysvětlení: Proč hodnota při pohybu myši tak prudce stoupne?</strong><br/>
          Pohyb myši posílá do procesoru hardwarová přerušení. Operační systém musí okamžitě přepnout kontext na obslužný program ovladače, který spočítá novou pozici kurzoru a překreslí obrazovku.
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Prakticky_list_CPU_Prepnuti_Kontextu_${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
