'use client';
import React from 'react';
import { TestWorksheetShell, Question, Sub, DrawBox, Answer, Lines } from '@/components/ui/TestWorksheetShell';

interface OsSummaryWorksheetProps {
  onBack: () => void;
}

export default function OsSummaryWorksheet({ onBack }: OsSummaryWorksheetProps) {
  return (
    <TestWorksheetShell
      id="os-summary"
      title="Hodnocená práce"
      subtitle="Operační systémy (OSS) — Hardware a základy operačních systémů"
      studentPin="ZAK2026"
      teacherPin="OS2026"
      onBack={onBack}
    >
      {(showSolutions) => (
        <>
          {/* ========================= ČÁST A ========================= */}
          <h2 className="text-[14pt] font-bold uppercase bg-slate-200 px-3 py-1.5 mb-5">Část A — Hardware</h2>

          <Question id="A1" title="Základní součásti počítače">
            <p>
              Vyberte a popište <strong>3 základní hardwarové součásti</strong> počítače a uveďte, k čemu slouží.
            </p>
          </Question>

          {[1, 2, 3].map((n) => (
            <section key={n} className="print-avoid-break mb-6 pl-3 border-l-4 border-slate-300">
              <div className="flex items-end gap-2 text-[11pt]">
                <span className="font-bold whitespace-nowrap">Součást {n}:</span>
                {showSolutions ? (
                  <span className="text-rose-600 font-bold italic ml-2">
                    {n === 1 ? 'Vzor: Procesor (CPU)' : n === 2 ? 'Vzor: Operační paměť (RAM)' : 'Vzor: Pevný disk (SSD/HDD)'}
                  </span>
                ) : (
                  <span className="flex-1 border-b border-slate-700" style={{ height: '8mm' }} />
                )}
              </div>
              <div className="text-[11pt]">
                <p className="mt-2"><strong>K čemu slouží:</strong></p>
                <Answer 
                  show={showSolutions} 
                  lines={3} 
                  solution={
                    n === 1 
                      ? 'Provádí veškeré výpočty, vykonává instrukce programu a řídí činnost ostatních komponent.' 
                      : n === 2 
                      ? 'Rychlé dočasné úložiště pro běžící programy, instrukce a data. Po vypnutí PC se maže.' 
                      : 'Trvalé úložiště pro uložení operačního systému, programů a uživatelských souborů i po vypnutí PC.'
                  } 
                />
              </div>
            </section>
          ))}

          <Question id="A2" title="UEFI">
            <Sub label="a)">Co je to UEFI a jaký má v počítači hlavní úkol?</Sub>
            <Answer show={showSolutions} lines={4} solution="Je to firmware (základní programový kód), který provádí inicializaci hardwaru po zapnutí PC a zavádí bootloader (zavaděč) operačního systému z disku do paměti." />
            <Sub label="b)">Kde přesně se v počítači fyzicky nachází?</Sub>
            <Answer show={showSolutions} lines={2} solution="Je uložen na flash paměťovém čipu umístěném přímo na základní desce." />
          </Question>

          <Question id="A3" title="Von Neumannova architektura">
            <Sub label="a)">Nakreslete blokové schéma Von Neumannovy architektury počítače obsahující všechny její základní bloky.</Sub>
            {showSolutions ? (
              <div className="mt-2 border-2 border-slate-700 rounded-md w-full p-4 flex flex-col items-center justify-center text-rose-600 font-bold italic text-center gap-1.5" style={{ height: '60mm' }}>
                <p className="text-xs uppercase tracking-wider font-black">Vzorové řešení schématu:</p>
                <p className="text-sm">Nahoře: Společná paměť RAM (obsahuje instrukce i data)</p>
                <p className="text-sm">Uprostřed: Procesor (CPU) rozdělený na Řadič (CU) a ALU (včetně registrů)</p>
                <p className="text-sm">Vlevo: Vstupní jednotka  |  Vpravo: Výstupní jednotka</p>
                <p className="text-xs text-rose-500 font-normal mt-1">Jednotlivé bloky jsou navzájem propojeny sběrnicemi (šipky Vstup → CPU, CPU ↔ Paměť, CPU → Výstup).</p>
              </div>
            ) : (
              <DrawBox height="60mm" />
            )}
          </Question>

          <section className="print-avoid-break mb-7 text-[11pt]">
            <Sub label="b)">Ke každému ze základních bloků stručně napište, jakou má funkci.</Sub>
            <Answer show={showSolutions} lines={6} solution="ALU - provádí matematické a logické operace. Řadič - řídí běh programu a ostatní bloky. Paměť - obsahuje instrukce i data. V/V zařízení - slouží k interakci s okolím (např. klávesnice, monitor)." />
          </section>

          <Question id="A4" title="Uspořádání programu v operační paměti">
            <p>
              Spuštěný program je v paměti RAM rozdělen na <strong>dvě základní části</strong>. Napište, jak se tyto dvě části nazývají, a stručně uveďte, co která z nich obsahuje.
            </p>
            <Answer 
              show={showSolutions} 
              lines={4} 
              solution="1. Instrukce (Kód) – obsahuje samotné příkazy a povely pro procesor (CO má dělat). 2. Data – obsahují hodnoty, čísla a proměnné, se kterými program počítá (S ČÍM se pracuje)." 
            />
          </Question>

          {/* ========================= ČÁST B ========================= */}
          <h2 className="print-page-break text-[14pt] font-bold uppercase bg-slate-200 px-3 py-1.5 mb-5 mt-4">
            Část B — Operační systémy
          </h2>

          <Question id="B1" title="Definice a funkce OS">
            <Sub label="a)">Co je operační systém? Napište definici vlastními slovy. Uveďte, kdy se spouští a do kdy je aktivní.</Sub>
            <Answer show={showSolutions} lines={4} solution="Základní systémový software tvořící rozhraní mezi hardwarem a aplikacemi (uživatelem). Spouští se při startu počítače (zavádí se do RAM) a zůstává aktivní až do jeho vypnutí." />
            <Sub label="b)">Vyjmenujte a stručně popište 4 hlavní funkce operačního systému.</Sub>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex items-start gap-2 mt-1">
                <span className="pt-[5mm]">{n}.</span>
                <div className="flex-1">
                   <Answer show={showSolutions} lines={2} solution={n === 1 ? 'Správa procesů (přidělování času procesoru, multitasking)' : n === 2 ? 'Správa paměti (přidělování operační paměti procesům)' : n === 3 ? 'Správa souborů a I/O (ukládání dat, obsluha periferií)' : 'Zajištění rozhraní (GUI pro uživatele a API pro aplikace)'} />
                </div>
              </div>
            ))}
          </Question>

          <Question id="B2" title="Vrstvený model počítače">
            <p>
              Počítač si můžeme představit jako dům o třech patrech (vrstvách), od fyzických součástek až po programy pro uživatele. Nakreslete tyto <strong>tři hlavní vrstvy</strong>. U každého patra (vrstvy) napište jeho obecný název a uveďte jeden konkrétní příklad, co do něj patří.
            </p>
            {showSolutions ? (
               <div className="mt-2 border-2 border-slate-700 rounded-md w-full p-4 flex flex-col items-center justify-center text-rose-600 font-bold italic gap-4" style={{ height: '50mm' }}>
                 <p>3. Patro: Aplikační SW (např. Word, Hra, Prohlížeč)</p>
                 <p>2. Patro: Operační systém (např. Windows, Android, Linux)</p>
                 <p>1. Patro: Hardware (např. CPU, disk, paměť RAM)</p>
               </div>
            ) : (
               <DrawBox height="50mm" />
            )}
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
                    {showSolutions ? (
                       <>
                         <td className="border border-slate-700 px-2 text-rose-600 italic font-bold">{n === 1 ? 'Desktopový (stolní)' : n === 2 ? 'Mobilní' : 'Serverový / Vestavěný'}</td>
                         <td className="border border-slate-700 px-2 text-rose-600 italic font-bold">{n === 1 ? 'Stolní PC, Notebook' : n === 2 ? 'Chytrý telefon, Tablet' : 'Webový server, Router'}</td>
                       </>
                    ) : (
                       <>
                         <td className="border border-slate-700" />
                         <td className="border border-slate-700" />
                       </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Question>

          <Question id="B4" title="Licence OS">
            <p className="border border-slate-400 bg-slate-50 p-3 italic">
              Jan si koupil hotový počítač s předinstalovaným OS Windows 11 s <strong>OEM licencí</strong> (licenční štítek byl přilepený přímo na původním počítači / základní desce). Počítač mu po čase přestal vyhovovat, proto ho daroval kamarádovi a sestavil si zcela nový PC z jiných součástek. Na nový PC nainstaloval Windows 11 a zadal licenční klíč ze svého původního počítače.
            </p>
            <p className="mt-3"><strong>Zachoval se Jan v souladu s licenční smlouvou? Svou odpověď zdůvodněte.</strong></p>
            <Answer show={showSolutions} lines={6} solution="Nezachoval. OEM licence je ze své podstaty nevratně svázána s konkrétním hardwarem (nejčastěji se základní deskou), se kterým byla pořízena. Tuto licenci nelze legálně přenést na jiný počítač. Kamarád s původním PC může systém legálně dál používat, ale Jan si pro nový počítač musí zakoupit novou licenci." />
          </Question>

          <Question id="B5" title="Architektura OS">
            <Sub label="a)">Nakreslete blokové schéma architektury monolitického jádra a mikrojádra (2 samostatná schémata).</Sub>
            <div className="grid grid-cols-2 gap-4">
              {showSolutions ? (
                 <>
                   <div className="border-2 border-slate-700 rounded-md w-full flex items-center justify-center p-4 text-rose-600 font-bold italic text-center" style={{ height: '55mm' }}>ŘEŠENÍ: Vše (ovladače, souborový systém) běží společně v privilegovaném Kernel Space. User space obsahuje jen uživ. aplikace.</div>
                   <div className="border-2 border-slate-700 rounded-md w-full flex items-center justify-center p-4 text-rose-600 font-bold italic text-center" style={{ height: '55mm' }}>ŘEŠENÍ: V Kernel Space běží jen minimum (např. plánovač procesů, IPC). Ovladače a služby běží izolovaně v User Space jako servery.</div>
                 </>
              ) : (
                 <>
                   <DrawBox height="55mm" label="Monolitické jádro" />
                   <DrawBox height="55mm" label="Mikrojádro" />
                 </>
              )}
            </div>
          </Question>

          <section className="print-avoid-break mb-7 text-[11pt]">
            <Sub label="b)">Slovně popište hlavní rozdíl mezi oběma architekturami.</Sub>
            <Answer show={showSolutions} lines={3} solution="Monolitické jádro spouští většinu systémových služeb v privilegovaném režimu jádra (sdílí adresní prostor). Mikrojádro přesouvá služby do uživatelského režimu jako samostatné procesy, které spolu komunikují zasíláním zpráv (IPC)." />

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
                    {showSolutions ? (
                       <>
                         <td className="border border-slate-700 px-2 text-rose-600 italic font-bold">{a.includes('Monolit') ? 'Vysoký výkon (nízká režie na komunikaci služeb)' : 'Vysoká stabilita a bezpečnost (izolace komponent)'}</td>
                         <td className="border border-slate-700 px-2 text-rose-600 italic font-bold">{a.includes('Monolit') ? 'Pád jedné komponenty (např. ovladače) shodí celý systém' : 'Nižší výkon (režie kvůli předávání zpráv IPC)'}</td>
                       </>
                    ) : (
                       <>
                         <td className="border border-slate-700" />
                         <td className="border border-slate-700" />
                       </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <Sub label="d)">Hardwarové ochranné kruhy (Protection Rings): vysvětlete, k čemu slouží a čemu mají zabránit.</Sub>
            <Answer show={showSolutions} lines={4} solution="Jedná se o hardwarové vrstvy oprávnění CPU. Oddělují privilegovaný kód OS (Ring 0) od běžných aplikací (Ring 3). Brání aplikacím v přímém přístupu k hardwaru či paměti jiných procesů, čímž chrání systém před nestabilitou či útoky (o IO operace žádají přes systémová volání - Syscalls)." />
          </section>

          <Question id="B6" title="Výběr architektury OS">
            <p>
              U každé situace uveďte vhodný typ jádra (monolitické / mikrojádro) <strong>a zdůvodněte</strong>, proč je
              pro daný případ vhodnější.
            </p>
            {[
              'Situace 1: Systém pro řízení letu dopravního letadla.',
              'Situace 2: Chytrá televize, na které chcete sledovat Netflix a hrát hry z Google Play.',
            ].map((s, i) => (
              <div key={s} className="mt-4">
                <p><strong>{s}</strong></p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="whitespace-nowrap">Typ jádra:</span>
                  {showSolutions ? (
                    <span className="text-rose-600 font-bold italic ml-2">{i === 0 ? 'Mikrojádro (např. QNX)' : 'Monolitické jádro (např. Linux/Android)'}</span>
                  ) : (
                    <span className="flex-1 border-b border-dotted border-slate-500" style={{ height: '9mm' }} />
                  )}
                </div>
                <p className="mt-2">Zdůvodnění:</p>
                <Answer show={showSolutions} lines={3} solution={i === 0 ? 'Klíčová je bezpečnost a stabilita. Výpadek jednoho senzoru nebo ovladače nesmí (díky izolaci) způsobit pád celého operačního systému.' : 'Klíčový je výkon (nízká latence) pro 4K video a hry. Občasný pád aplikace nevadí tolik jako plynulost.'} />
              </div>
            ))}
          </Question>
        </>
      )}
    </TestWorksheetShell>
  );
}
