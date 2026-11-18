import { ProcessStatesWorksheetAnswers, ProcessStatesCheckedItems } from '../ProcessStatesTypes';

export const exportProcessStatesWord = (
  studentName: string,
  answers: ProcessStatesWorksheetAnswers,
  _checkedItems: ProcessStatesCheckedItems
) => {
  const date = new Date().toLocaleDateString('cs-CZ');

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Praktický list: Životní cyklus a stavy procesů</title>
      <style>
        body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 20mm; }
        h1 { color: #1e1b4b; font-size: 18pt; border-bottom: 2pt solid #4338ca; padding-bottom: 4px; margin-bottom: 10px; }
        h2 { color: #3730a3; font-size: 12pt; margin-top: 14px; margin-bottom: 6px; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2px; }
        .meta { font-size: 10pt; margin-bottom: 14px; color: #475569; background: #f8fafc; padding: 8px 12px; border: 1pt solid #e2e8f0; }
        .task { margin-bottom: 12px; padding: 8px 12px; background: #fafafa; border-left: 3pt solid #6366f1; }
        .field-label { font-weight: bold; font-size: 10pt; color: #334155; margin-top: 6px; }
        .field-value { font-size: 10.5pt; color: #0f172a; background: #ffffff; padding: 4px 8px; border: 1pt solid #cbd5e1; margin-bottom: 6px; min-height: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 6px; margin-bottom: 8px; }
        th, td { border: 1pt solid #cbd5e1; padding: 6px 8px; text-align: left; font-size: 10pt; }
        th { background-color: #e0e7ff; color: #1e1b4b; font-weight: bold; }
        code { font-family: Consolas, monospace; background: #f1f5f9; padding: 1px 4px; border: 1pt solid #cbd5e1; }
      </style>
    </head>
    <body>
      <h1>Laboratorní protokol: Životní cyklus a stavy procesů</h1>
      <div class="meta">
        <strong>Jméno a příjmení studenta:</strong> ${studentName || '........................................'}<br/>
        <strong>Datum:</strong> ${date} | <strong>Předmět:</strong> Operační systémy 1 — Životní cyklus procesů
      </div>

      <!-- ÚKOL 1 -->
      <h2>1. Úloha: Regulérní ukončení procesu (Korektní EXIT)</h2>
      <div class="task">
        <div class="field-label">Co se stalo po pokusu o zavření okna Notepadu křížkem?</div>
        <div class="field-value">${answers['t1_behavior'] || 'Nevyplněno'}</div>

        <div class="field-label">Didaktické zhodnocení: Dostal proces možnost zareagovat a do jakého stavu přešel?</div>
        <div class="field-value">${answers['t1_explanation'] || 'Nevyplněno'}</div>
      </div>

      <!-- ÚKOL 2 -->
      <h2>2. Úloha: Násilné ukončení procesu (Tvrdý EXIT / Kill)</h2>
      <div class="task">
        <table border="1">
          <tr>
            <th style="width: 50%;">Sledovaný parametr</th>
            <th style="width: 50%;">Zjištěný výsledek</th>
          </tr>
          <tr>
            <td>Zvolená metoda ukončení</td>
            <td>${answers['t2_method'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Co se stalo s neuloženým textem?</td>
            <td>${answers['t2_data_loss'] || 'Nevyplněno'}</td>
          </tr>
        </table>
        <div class="field-label">Kdy je nutné proces ukončit násilně a jaké je hlavní riziko?</div>
        <div class="field-value">${answers['t2_risk'] || 'Nevyplněno'}</div>
      </div>

      <!-- ÚKOL 3 -->
      <h2>3. Úloha: Zmrazení procesu do stavu BLOCKED (Suspend & Resume)</h2>
      <div class="task">
        <table border="1">
          <tr>
            <th style="width: 50%;">Krok v Process Exploreru</th>
            <th style="width: 50%;">Pozorování a naměřené hodnoty</th>
          </tr>
          <tr>
            <td>Chování okna po volbě <strong>Suspend</strong></td>
            <td>${answers['t3_suspend_behavior'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Vytížení CPU ve sloupci Process Exploreru při zmrazení</td>
            <td>${answers['t3_suspend_cpu'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Chování okna po volbě <strong>Resume</strong></td>
            <td>${answers['t3_resume_behavior'] || 'Nevyplněno'}</td>
          </tr>
        </table>
        <div class="field-label">Didaktické vysvětlení stavu: Proč plánovač OS zmrazenému procesu nepřidělí CPU?</div>
        <div class="field-value">${answers['t3_explanation'] || 'Nevyplněno'}</div>
      </div>

      <!-- ÚKOL 4 -->
      <h2>4. Úloha: Důkaz I/O-bound procesu (Klidový Notepad vs. psaní)</h2>
      <div class="task">
        <table border="1">
          <tr>
            <th style="width: 50%;">Stav Notepadu</th>
            <th style="width: 50%;">Naměřené vytížení CPU (%)</th>
          </tr>
          <tr>
            <td>Notepad v klidu (žádné psaní)</td>
            <td>${answers['t4_idle_cpu'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Notepad při nepřetržitém držení klávesy</td>
            <td>${answers['t4_typing_cpu'] || 'Nevyplněno'}</td>
          </tr>
        </table>
        <div class="field-label">Závěr: Ve kterém stavu tráví textový editor 99 % svého života a proč?</div>
        <div class="field-value">${answers['t4_conclusion'] || 'Nevyplněno'}</div>
      </div>

      <!-- ÚKOL 5 -->
      <h2>5. Úloha: Souboj o jádro CPU – Afinita a Priority</h2>
      <div class="task">
        <table border="1">
          <tr>
            <th style="width: 60%;">Metrika a konfigurace</th>
            <th style="width: 40%;">Hodnota</th>
          </tr>
          <tr>
            <td>Počet logických procesorů (vláken) počítače</td>
            <td>${answers['t5_cpu_threads'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Teoretické maximum 1 plně vytíženého jádra (100 % / počet vláken)</td>
            <td>${answers['t5_core_cap'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Zvolené společné jádro pro afinitu</td>
            <td>${answers['t5_affinity_core'] || 'CPU 0'}</td>
          </tr>
          <tr>
            <td>Rozdělení CPU při stejné prioritě (Proces A / Proces B)</td>
            <td>${answers['t5_balanced_split'] || 'Nevyplněno'}</td>
          </tr>
          <tr>
            <td>Rozdělení CPU při změně priority (Proces A: Vysoká / Proces B: Nízká)</td>
            <td>${answers['t5_priority_split'] || 'Nevyplněno'}</td>
          </tr>
        </table>
        <div class="field-label">Závěrečné zhodnocení: Jak plánovač Windows vyřešil soutěž o jedno jádro?</div>
        <div class="field-value">${answers['t5_conclusion'] || 'Nevyplněno'}</div>
      </div>

    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Protokol_Stavy_Procesu_${studentName.replace(/\s+/g, '_') || 'student'}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
