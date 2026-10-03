'use client';
import React, { useState } from 'react';
import { Lock, Unlock, ArrowLeft, Printer } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface OsSummaryWorksheetProps {
  onBack: () => void;
}

const PIN_CODE = 'OS2026'; // Heslo pro odemčení testu (porovnává se velkými písmeny)

/* ------------------------------------------------------------------ */
/* Pomocné komponenty pro tištěný arch                                 */
/* ------------------------------------------------------------------ */

/** Linky pro psaní odpovědi */
const Lines: React.FC<{ count: number }> = ({ count }) => (
  <div className="mt-1">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="border-b border-dotted border-slate-500" style={{ height: '9mm' }} />
    ))}
  </div>
);

/** Prázdný rámeček pro kreslení */
const DrawBox: React.FC<{ height: string; label?: string }> = ({ height, label }) => (
  <div className="mt-2">
    {label && <div className="text-[10pt] font-semibold text-slate-700 mb-1">{label}</div>}
    <div className="border-2 border-slate-700 rounded-md w-full" style={{ height }} />
  </div>
);

/** Otázka – nepřerušuje se mezi stránkami */
const Question: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section className="print-avoid-break mb-7">
    <div className="border-b-2 border-slate-800 pb-1 mb-2">
      <h3 className="text-[12.5pt] font-bold text-slate-900">
        {id} — {title}
      </h3>
    </div>
    <div className="text-[11pt] text-slate-900 leading-snug">{children}</div>
  </section>
);

/** Podotázka */
const Sub: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mt-3">
    <p>
      <strong>{label}</strong> {children}
    </p>
  </div>
);

/* ------------------------------------------------------------------ */

export default function OsSummaryWorksheet({ onBack }: OsSummaryWorksheetProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useLocalStorage('os-summary-unlocked', false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim().toUpperCase() === PIN_CODE) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-rose-100 max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Hodnocená práce</h1>
          <p className="text-slate-500 font-medium mb-8">Zadejte heslo vyučujícího pro zobrazení zadání k tisku.</p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="****"
              className={`w-full text-center text-3xl font-bold tracking-[0.5em] p-4 rounded-2xl border-2 transition-colors ${
                error ? 'border-red-400 bg-red-50 text-red-600' : 'border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
              }`}
              autoFocus
            />
            {error && <p className="text-red-500 font-bold text-sm animate-bounce">Nesprávné heslo!</p>}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" /> Odemknout test
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8">
      {/* Tiskové styly – při tisku se zobrazí pouze arch s testem */}
      <style>{`
        @page { size: A4; margin: 14mm 15mm; }
        @media print {
          body * { visibility: hidden !important; }
          #print-sheet, #print-sheet * { visibility: visible !important; }
          #print-sheet {
            position: absolute; left: 0; top: 0;
            width: 100% !important; max-width: none !important;
            margin: 0 !important; padding: 0 !important;
            box-shadow: none !important; border: none !important;
          }
          .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
          .print-page-break { break-before: page; page-break-before: always; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Ovládací lišta (netiskne se) */}
      <div className="max-w-[210mm] mx-auto flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-all border border-slate-200 uppercase tracking-wider text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět do menu
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-xs"
        >
          <Printer className="w-4 h-4" /> Vytisknout test
        </button>
      </div>

      {/* ============================ ARCH A4 ============================ */}
      <article
        id="print-sheet"
        className="max-w-[210mm] mx-auto bg-white shadow-xl border border-slate-200 font-serif"
        style={{ padding: '14mm 15mm' }}
      >
        {/* Hlavička */}
        <header className="mb-6">
          <div className="flex items-end justify-between border-b-4 border-slate-900 pb-2 mb-4">
            <div>
              <h1 className="text-[20pt] font-bold uppercase tracking-tight leading-none">Hodnocená práce</h1>
              <p className="text-[11pt] mt-1">Operační systémy (OSS) — Hardware a základy operačních systémů</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 text-[11pt]">
            <div className="col-span-6 flex items-end gap-2">
              <span className="font-semibold whitespace-nowrap">Jméno a příjmení:</span>
              <span className="flex-1 border-b border-slate-700" style={{ height: '7mm' }} />
            </div>
            <div className="col-span-3 flex items-end gap-2">
              <span className="font-semibold">Třída:</span>
              <span className="flex-1 border-b border-slate-700" style={{ height: '7mm' }} />
            </div>
            <div className="col-span-3 flex items-end gap-2">
              <span className="font-semibold">Datum:</span>
              <span className="flex-1 border-b border-slate-700" style={{ height: '7mm' }} />
            </div>
          </div>

          <p className="text-[10pt] italic text-slate-700 mt-4">
            Odpovídejte vlastními slovy a čitelně. U otázek se schématem nakreslete přehledné blokové schéma a popište jej.
          </p>
        </header>

        {/* ========================= ČÁST A ========================= */}
        <h2 className="text-[14pt] font-bold uppercase bg-slate-200 px-3 py-1.5 mb-5">Část A — Hardware</h2>

        <Question id="A1" title="Základní součásti počítače">
          <p>
            Vyberte a popište <strong>3 základní hardwarové součásti</strong> počítače. Pro každou součást uveďte:
            a) k čemu slouží, b) jak spolupracuje s ostatními součástmi, c) podle jakých parametrů ji posuzujeme
            z hlediska výkonu.
          </p>
        </Question>

        {[1, 2, 3].map((n) => (
          <section key={n} className="print-avoid-break mb-6 pl-3 border-l-4 border-slate-300">
            <div className="flex items-end gap-2 text-[11pt]">
              <span className="font-bold whitespace-nowrap">Součást {n}:</span>
              <span className="flex-1 border-b border-slate-700" style={{ height: '8mm' }} />
            </div>
            <div className="text-[11pt]">
              <p className="mt-2"><strong>a)</strong> K čemu slouží</p>
              <Lines count={2} />
              <p className="mt-2"><strong>b)</strong> Vztah k ostatním součástem</p>
              <Lines count={2} />
              <p className="mt-2"><strong>c)</strong> Posouzení výkonu</p>
              <Lines count={2} />
            </div>
          </section>
        ))}

        <Question id="A2" title="UEFI">
          <Sub label="a)">Co je UEFI? Popište, o jaký typ softwaru se jedná.</Sub>
          <Lines count={2} />
          <Sub label="b)">K čemu slouží? Popište jeho hlavní úlohu při startu počítače.</Sub>
          <Lines count={2} />
          <Sub label="c)">Kde je fyzicky uložen? Uveďte konkrétní místo v počítači.</Sub>
          <Lines count={2} />
        </Question>

        <Question id="A3" title="Von Neumannova architektura">
          <Sub label="a)">Nakreslete blokové schéma Von Neumannovy architektury počítače obsahující všechny její základní bloky.</Sub>
          <DrawBox height="85mm" />
        </Question>

        <section className="print-avoid-break mb-7 text-[11pt]">
          <Sub label="b)">Ke každému ze základních bloků stručně napište, jakou má funkci.</Sub>
          <Lines count={6} />
          <Sub label="c)">Slovně popište, jak se zpracovává program v této architektuře.</Sub>
          <Lines count={5} />
        </section>

        <Question id="A4" title="Paměťová struktura procesu">
          <p>Program (proces) je za běhu uložen v operační paměti (RAM) ve dvou základních oblastech.</p>
          <Sub label="a)">Pojmenujte obě oblasti.</Sub>
          <div className="grid grid-cols-2 gap-6 mt-1">
            <div className="flex items-end gap-2"><span>1.</span><span className="flex-1 border-b border-dotted border-slate-500" style={{ height: '9mm' }} /></div>
            <div className="flex items-end gap-2"><span>2.</span><span className="flex-1 border-b border-dotted border-slate-500" style={{ height: '9mm' }} /></div>
          </div>
          <Sub label="b)">Vysvětlete, co každá z oblastí obsahuje a čím se od sebe liší.</Sub>
          <Lines count={5} />
        </Question>

        {/* ========================= ČÁST B ========================= */}
        <h2 className="print-page-break text-[14pt] font-bold uppercase bg-slate-200 px-3 py-1.5 mb-5 mt-4">
          Část B — Operační systémy
        </h2>

        <Question id="B1" title="Definice a funkce OS">
          <Sub label="a)">Co je operační systém? Napište definici vlastními slovy. Uveďte, kdy se spouští a do kdy je aktivní.</Sub>
          <Lines count={4} />
          <Sub label="b)">Vyjmenujte a stručně popište 4 hlavní funkce operačního systému.</Sub>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-start gap-2 mt-1">
              <span className="pt-[5mm]">{n}.</span>
              <div className="flex-1"><Lines count={2} /></div>
            </div>
          ))}
        </Question>

        <Question id="B2" title="Vrstvený model počítače">
          <p>
            Nakreslete vrstvený model počítače z pohledu operačního systému (3 vrstvy). U každé vrstvy uveďte
            její název a jeden konkrétní příklad toho, co do ní patří.
          </p>
          <DrawBox height="70mm" />
        </Question>

        <Question id="B3" title="Typy operačních systémů">
          <p>Vyjmenujte 3 typy operačních systémů z hlediska určení (kde se používají). Ke každému uveďte příklad konkrétního zařízení.</p>
          <table className="w-full border-collapse mt-3 text-[11pt]">
            <thead>
              <tr>
                <th className="border border-slate-700 px-2 py-1.5 w-10 bg-slate-100">#</th>
                <th className="border border-slate-700 px-2 py-1.5 text-left bg-slate-100">Typ OS</th>
                <th className="border border-slate-700 px-2 py-1.5 text-left bg-slate-100">Příklad zařízení</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((n) => (
                <tr key={n}>
                  <td className="border border-slate-700 text-center" style={{ height: '13mm' }}>{n}.</td>
                  <td className="border border-slate-700" />
                  <td className="border border-slate-700" />
                </tr>
              ))}
            </tbody>
          </table>
        </Question>

        <Question id="B4" title="Licence OS">
          <p className="border border-slate-400 bg-slate-50 p-3 italic">
            Jan si koupil počítač s nainstalovaným OS Windows 11. Licenční klíč se nachází na štítku přilepeném na
            základní desce. Počítač mu přestal vyhovovat, proto ho daroval kamarádovi a sestavil si zcela nový PC
            z jiných součástek. Na nový PC nainstaloval Windows 11 a zadal licenční klíč ze svého původního počítače.
          </p>
          <p className="mt-3"><strong>Zachoval se Jan v souladu s licenční smlouvou? Svou odpověď zdůvodněte.</strong></p>
          <Lines count={6} />
        </Question>

        <Question id="B5" title="Architektura OS">
          <Sub label="a)">Nakreslete blokové schéma architektury monolitického jádra a mikrojádra (2 samostatná schémata).</Sub>
          <div className="grid grid-cols-2 gap-4">
            <DrawBox height="75mm" label="Monolitické jádro" />
            <DrawBox height="75mm" label="Mikrojádro" />
          </div>
        </Question>

        <section className="print-avoid-break mb-7 text-[11pt]">
          <Sub label="b)">Slovně popište hlavní rozdíl mezi oběma architekturami.</Sub>
          <Lines count={3} />

          <Sub label="c)">Uveďte výhodu a nevýhodu každé architektury.</Sub>
          <table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className="border border-slate-700 px-2 py-1.5 text-left bg-slate-100 w-1/4">Architektura</th>
                <th className="border border-slate-700 px-2 py-1.5 text-left bg-slate-100">Výhoda</th>
                <th className="border border-slate-700 px-2 py-1.5 text-left bg-slate-100">Nevýhoda</th>
              </tr>
            </thead>
            <tbody>
              {['Monolitické jádro', 'Mikrojádro'].map((a) => (
                <tr key={a}>
                  <td className="border border-slate-700 px-2 font-semibold" style={{ height: '20mm' }}>{a}</td>
                  <td className="border border-slate-700" />
                  <td className="border border-slate-700" />
                </tr>
              ))}
            </tbody>
          </table>

          <Sub label="d)">Hardwarové ochranné kruhy (Protection Rings): vysvětlete, k čemu slouží a čemu mají zabránit.</Sub>
          <Lines count={4} />
        </section>

        <Question id="B6" title="Výběr architektury OS">
          <p>
            U každé situace uveďte vhodný typ jádra (monolitické / mikrojádro) <strong>a zdůvodněte</strong>, proč je
            pro daný případ vhodnější.
          </p>
          {[
            'Situace 1: Systém pro řízení letu dopravního letadla.',
            'Situace 2: Chytrá televize, na které chcete sledovat Netflix a hrát hry z Google Play.',
          ].map((s) => (
            <div key={s} className="mt-4">
              <p><strong>{s}</strong></p>
              <div className="flex items-end gap-2 mt-1">
                <span className="whitespace-nowrap">Typ jádra:</span>
                <span className="flex-1 border-b border-dotted border-slate-500" style={{ height: '9mm' }} />
              </div>
              <p className="mt-2">Zdůvodnění:</p>
              <Lines count={3} />
            </div>
          ))}
        </Question>
      </article>
    </div>
  );
}
