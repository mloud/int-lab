'use client';
import React from 'react';
import { TestWorksheetShell, Question, Sub, Answer, Lines } from '@/components/ui/TestWorksheetShell';
import { Info, CheckCircle2 } from 'lucide-react';

interface BackupCapacityTestWorksheetProps {
  onBack: () => void;
}

export default function BackupCapacityTestWorksheet({ onBack }: BackupCapacityTestWorksheetProps) {
  return (
    <TestWorksheetShell
      id="oss2-backup-capacity"
      title="Hodnocená práce: Výpočet kapacity záloh"
      subtitle="Operační systémy 2 (OSS 2) — Správa podnikových dat a zálohování"
      studentPin="ZAK2026"
      teacherPin="OS2026"
      onBack={onBack}
    >
      {(showSolutions) => (
        <div className="space-y-6 text-slate-900 font-serif leading-relaxed">
          {/* ========================= PRAVIDLA A PŘEDPOKLADY ========================= */}
          <section className="print-avoid-break bg-slate-50 border-2 border-slate-700 p-4 rounded-md mb-6">
            <h2 className="text-[12pt] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-1 mb-2">
              Pravidla a předpoklady pro řešení:
            </h2>
            <ul className="text-[10.5pt] space-y-1 list-disc pl-5 text-slate-800">
              <li>
                <strong>Zálohování probíhá automaticky jednou denně večer.</strong>
              </li>
              <li>
                <strong>V pondělí večer se provádí vždy výchozí plná záloha.</strong>
              </li>
              <li>
                <strong>Software pracuje na souborové úrovni</strong> (při úpravě souboru se zálohuje celý modifikovaný soubor v jeho nové velikosti).
              </li>
              <li>
                <strong>Žádné dřívější zálohy se nepřepisují</strong> – každá denní záloha tvoří samostatný archiv na zálohovacím disku.
              </li>
            </ul>
          </section>

          {/* ========================= ÚLOHA 1 ========================= */}
          <section className="print-avoid-break mb-8">
            <div className="border-b-2 border-slate-900 pb-1 mb-3">
              <h2 className="text-[13pt] font-bold uppercase tracking-tight text-slate-900">
                Úloha 1: Pouze vznik nových souborů
              </h2>
            </div>

            <p className="text-[11pt] mb-3">
              Během týdne vznikají na disku nové dokumenty podle tohoto harmonogramu:
            </p>

            <div className="bg-white border border-slate-300 p-3 rounded mb-3 text-[10.5pt] grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <strong>Pondělí:</strong> PlanProjektu.docx (100 kB)
              </div>
              <div>
                <strong>Úterý:</strong> Prezentace.pptx (200 kB)
              </div>
              <div>
                <strong>Středa:</strong> Web.html (50 kB)
              </div>
              <div>
                <strong>Čtvrtek:</strong> Styly.css (10 kB)
              </div>
            </div>

            <p className="text-[11pt] mb-3">
              <strong>Úkol:</strong> Doplňte do tabulky velikost zálohy vytvořené v daný den (v kB) a spočítejte celkový objem dat na zálohovacím disku ve čtvrtek večer po záloze.
            </p>

            {/* TABULKA 1 */}
            <div className="overflow-x-auto my-3">
              <table className="w-full border-collapse border-2 border-slate-800 text-center text-[10.5pt]">
                <thead>
                  <tr className="bg-slate-200 border-b-2 border-slate-800 font-bold">
                    <th className="border border-slate-700 py-2 px-3 text-left w-52">Typ zálohy</th>
                    <th className="border border-slate-700 py-2 px-2">Pondělí (kB)</th>
                    <th className="border border-slate-700 py-2 px-2">Úterý (kB)</th>
                    <th className="border border-slate-700 py-2 px-2">Středa (kB)</th>
                    <th className="border border-slate-700 py-2 px-2">Čtvrtek (kB)</th>
                    <th className="border border-slate-700 py-2 px-3 bg-slate-300 w-44">Celkem na disku (kB)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* a) Plná záloha */}
                  <tr>
                    <td className="border border-slate-700 py-2.5 px-3 text-left font-semibold">
                      a) Plná záloha
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">100</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">300</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">350</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">360</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-3 bg-slate-50 font-bold">
                      {showSolutions ? <span className="text-rose-600 font-black">1 110 kB</span> : ''}
                    </td>
                  </tr>

                  {/* b) Inkrementální záloha */}
                  <tr>
                    <td className="border border-slate-700 py-2.5 px-3 text-left font-semibold">
                      b) Inkrementální záloha
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">100</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">200</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">50</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">10</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-3 bg-slate-50 font-bold">
                      {showSolutions ? <span className="text-rose-600 font-black">360 kB</span> : ''}
                    </td>
                  </tr>

                  {/* c) Diferenciální záloha */}
                  <tr>
                    <td className="border border-slate-700 py-2.5 px-3 text-left font-semibold">
                      c) Diferenciální záloha
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">100</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">200</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">250</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">260</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-3 bg-slate-50 font-bold">
                      {showSolutions ? <span className="text-rose-600 font-black">810 kB</span> : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Podúkoly k obnově dat */}
            <div className="mt-4 space-y-3 print-avoid-break">
              <div>
                <p className="text-[11pt]">
                  <strong>a) Jak budete postupovat při obnově dat (stav ve čtvrtek večer) z inkrementální zálohy?</strong>
                </p>
                <Answer
                  show={showSolutions}
                  lines={2}
                  solution="Nejprve obnovíme výchozí plnou zálohu z pondělí. Následně v chronologickém pořadí aplikujeme všechny inkrementální zálohy: úterý ➔ středa ➔ čtvrtek (obnova vyžaduje celou nepřerušenou řadu záloh)."
                />
              </div>

              <div>
                <p className="text-[11pt]">
                  <strong>b) Jak budete postupovat při obnově dat (stav ve čtvrtek večer) z diferenciální zálohy?</strong>
                </p>
                <Answer
                  show={showSolutions}
                  lines={2}
                  solution="Nejprve obnovíme výchozí plnou zálohu z pondělí. Následně obnovíme pouze poslední diferenciální zálohu ze čtvrtka (ta kumuluje všechny změny od pondělí; úterní ani středeční zálohy nejsou k obnově potřeba)."
                />
              </div>
            </div>

            {showSolutions && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded text-[10pt] text-rose-800 leading-snug">
                <strong>Vysvětlení výpočtu tabulky k úloze 1:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  <li><strong>Plná:</strong> Po=100; Út=(100+200)=300; St=(300+50)=350; Čt=(350+10)=360. Součet všech 4 plných záloh = 1 110 kB.</li>
                  <li><strong>Inkrementální:</strong> Po=100 (plná); Út=200 (nové od Út); St=50 (nové od St); Čt=10 (nové od Čt). Součet = 360 kB.</li>
                  <li><strong>Diferenciální:</strong> Po=100 (plná); Út=200; St=(200+50)=250; Čt=(200+50+10)=260. Součet = 810 kB.</li>
                </ul>
              </div>
            )}
          </section>

          {/* ========================= ÚLOHA 2 ========================= */}
          <section className="print-avoid-break mb-8">
            <div className="border-b-2 border-slate-900 pb-1 mb-3">
              <h2 className="text-[13pt] font-bold uppercase tracking-tight text-slate-900">
                Úloha 2: Vznik nových souborů a úprava stávajících
              </h2>
            </div>

            <p className="text-[11pt] mb-3">
              Na serveru jsou uložena projektová data. V průběhu týdne dochází jak k úpravám stávajících databází, tak k přidávání nových souborů:
            </p>

            <div className="bg-white border border-slate-300 p-3 rounded mb-3 text-[10.5pt] space-y-1">
              <div>
                <strong>Pondělí:</strong> vytvořeny soubory <code>System.cfg</code> (100 kB) a <code>Databaze.db</code> (400 kB)
              </div>
              <div>
                <strong>Úterý:</strong> upraven soubor <code>Databaze.db</code> (jeho nová velikost je 500 kB); soubor <code>System.cfg</code> se nezměnil
              </div>
              <div>
                <strong>Středa:</strong> vytvořen nový soubor <code>Report.pdf</code> (150 kB); ostatní soubory beze změny
              </div>
              <div>
                <strong>Čtvrtek:</strong> beze změn (žádný soubor nevznikl ani nebyl upraven)
              </div>
            </div>

            <p className="text-[11pt] mb-3">
              <strong>Úkol:</strong> Doplňte do tabulky velikost zálohy vytvořené v daný den (v kB) a spočítejte celkový objem dat na zálohovacím disku ve čtvrtek večer po záloze.
            </p>

            {/* TABULKA 2 */}
            <div className="overflow-x-auto my-3">
              <table className="w-full border-collapse border-2 border-slate-800 text-center text-[10.5pt]">
                <thead>
                  <tr className="bg-slate-200 border-b-2 border-slate-800 font-bold">
                    <th className="border border-slate-700 py-2 px-3 text-left w-52">Typ zálohy</th>
                    <th className="border border-slate-700 py-2 px-2">Pondělí (kB)</th>
                    <th className="border border-slate-700 py-2 px-2">Úterý (kB)</th>
                    <th className="border border-slate-700 py-2 px-2">Středa (kB)</th>
                    <th className="border border-slate-700 py-2 px-2">Čtvrtek (kB)</th>
                    <th className="border border-slate-700 py-2 px-3 bg-slate-300 w-44">Celkem na disku (kB)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* a) Plná záloha */}
                  <tr>
                    <td className="border border-slate-700 py-2.5 px-3 text-left font-semibold">
                      a) Plná záloha
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">500</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">600</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">750</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">750</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-3 bg-slate-50 font-bold">
                      {showSolutions ? <span className="text-rose-600 font-black">2 600 kB</span> : ''}
                    </td>
                  </tr>

                  {/* b) Inkrementální záloha */}
                  <tr>
                    <td className="border border-slate-700 py-2.5 px-3 text-left font-semibold">
                      b) Inkrementální záloha
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">500</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">500</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">150</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">0</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-3 bg-slate-50 font-bold">
                      {showSolutions ? <span className="text-rose-600 font-black">1 150 kB</span> : ''}
                    </td>
                  </tr>

                  {/* c) Diferenciální záloha */}
                  <tr>
                    <td className="border border-slate-700 py-2.5 px-3 text-left font-semibold">
                      c) Diferenciální záloha
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">500</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">500</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">650</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-2">
                      {showSolutions ? <span className="text-rose-600 font-bold">650</span> : ''}
                    </td>
                    <td className="border border-slate-700 py-2 px-3 bg-slate-50 font-bold">
                      {showSolutions ? <span className="text-rose-600 font-black">2 300 kB</span> : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {showSolutions && (
              <div className="mt-2 p-3 bg-rose-50 border border-rose-200 rounded text-[10pt] text-rose-800 leading-snug">
                <strong>Vysvětlení výpočtu k úloze 2:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  <li>
                    <strong>Plná:</strong> Po=100+400=500; Út=100+500=600; St=100+500+150=750; Čt=beze změn, ale plná záloha bere všechna aktuální data=750. Součet = 2 600 kB.
                  </li>
                  <li>
                    <strong>Inkrementální:</strong> Po=500 (plná); Út=500 (celý upravený Databaze.db v nové velikosti); St=150 (nový Report.pdf); Čt=0 (žádná změna od středy, archivní atribut se nenastavil). Součet = 1 150 kB.
                  </li>
                  <li>
                    <strong>Diferenciální:</strong> Po=500 (plná); Út=500 (změna od pondělní plné); St=(500+150)=650 (všechny změny od pondělní plné); Čt=650 (protože od pondělní plné zálohy se nic nového nepřidalo, zálohuje se stále týž kumulovaný stav změn). Součet = 2 300 kB.
                  </li>
                </ul>
              </div>
            )}
          </section>
        </div>
      )}
    </TestWorksheetShell>
  );
}
