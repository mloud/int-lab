'use client';
import React from 'react';
import { TestWorksheetShell, Question, Sub, Answer } from '@/components/ui/TestWorksheetShell';
import { HardDrive, Layers, Table2 } from 'lucide-react';

interface FsTestWorksheetProps {
  onBack: () => void;
}

export default function FsTestWorksheet({ onBack }: FsTestWorksheetProps) {
  return (
    <TestWorksheetShell
      id="fs-summary-test02"
      title="Hodnocená práce"
      subtitle="Operační systémy 1 (OSS 1) — Souborové systémy, paměťová média a formátování disku"
      studentPinHash="c65f8eccc82462d02bdcaa9dc5bba508baee2951c2a858fd4737b232ed45a04a"
      teacherPinHash="1315e5df74ae234ea7d73028d852847e6ef87634f0189016e86e1f23deb5034f"
      onBack={onBack}
    >
      {(showSolutions) => (
        <>
          {/* Informační hlavička parametrů testu */}
          <div className="mb-6 p-4 bg-slate-100 rounded-xl border border-slate-300 flex flex-wrap items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>Časový limit: 40 minut</span>
            <span>Celkem otázek: 11</span>
            <span>Maximální počet bodů: 45 bodů</span>
          </div>

          {/* ========================================================= */}
          {/* ========================= ČÁST A ========================= */}
          {/* ========================================================= */}
          <div className="flex items-center justify-between bg-slate-800 text-white px-4 py-2 rounded-lg mb-6 shadow-sm">
            <h2 className="text-[13pt] font-black uppercase tracking-wider flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-indigo-400" /> Část A — Architektura FS a paměťová média
            </h2>
            <span className="text-xs font-bold bg-slate-700 px-2.5 py-1 rounded">13 bodů</span>
          </div>

          {/* Otázka 1 */}
          <Question id="1" title="Funkce modulu správy souborů v architektuře OS (4 body)">
            <p>
              Popište, jakou funkci plní modul <strong>souborového systému (File System)</strong> v architektuře operačního systému.
              Proč se v odborné literatuře označuje jako <strong>překladová vrstva (knihovník)</strong> mezi uživatelskými aplikacemi a diskovým hardwarem?
            </p>
            <Answer
              show={showSolutions}
              lines={4}
              solution="Uživatelské aplikace pracují s logickými abstrakcemi — jmény souborů a hierarchií složek (např. „Ulož referat.docx“). Samotný hardware (disk) však soubory ani složky nezná, umí pracovat pouze s očíslovanými fyzickými sektory. Souborový systém funguje jako nezbytná překladová vrstva: přijme požadavek na soubor, vyhledá v tabulce jeho umístění a přeloží jej na konkrétní čísla fyzických sektorů/clusterů pro ovladač disku."
            />
          </Question>

          {/* Otázka 2 */}
          <Question id="2" title="Srovnávací tabulka vlastností HDD a SSD (5 bodů)">
            <p>
              Doplňte do tabulky srovnání vlastností obou diskových technologií. Do jednotlivých políček doplňte odpovídající hodnocení podle nápovědy (např. <em>pomalá / rychlá, malá / velká, nízká / vysoká, hlučný / tichý</em>):
            </p>
            <div className="mt-3 overflow-hidden rounded-lg border-2 border-slate-700 text-[10.5pt]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-200 text-slate-900 border-b-2 border-slate-700 font-bold">
                    <th className="p-2 text-left border-r border-slate-400 w-1/3">Kritérium</th>
                    <th className="p-2 text-left border-r border-slate-400 w-1/3">Mechanický disk (HDD)</th>
                    <th className="p-2 text-left w-1/3">Polovodičový disk (SSD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  <tr>
                    <td className="p-2 font-semibold bg-slate-50 border-r border-slate-400">
                      Typická přístupová doba
                      <span className="block text-[9pt] text-slate-500 font-normal italic">(nápověda: pomalá / rychlá)</span>
                    </td>
                    <td className="p-2 border-r border-slate-400">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">pomalá (10–15 ms)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                    <td className="p-2">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">rychlá (cca 0,1 ms)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold bg-slate-50 border-r border-slate-400">
                      Odolnost proti pádům a otřesům
                      <span className="block text-[9pt] text-slate-500 font-normal italic">(nápověda: malá / velká)</span>
                    </td>
                    <td className="p-2 border-r border-slate-400">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">malá (hrozí poškození plotny)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                    <td className="p-2">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">velká (bez pohyblivých částí)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold bg-slate-50 border-r border-slate-400">
                      Cena za 1 GB úložného prostoru
                      <span className="block text-[9pt] text-slate-500 font-normal italic">(nápověda: nízká / vysoká)</span>
                    </td>
                    <td className="p-2 border-r border-slate-400">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">nízká (velmi výhodná)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                    <td className="p-2">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">vysoká</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold bg-slate-50 border-r border-slate-400">
                      Hlučnost a provozní vibrace
                      <span className="block text-[9pt] text-slate-500 font-normal italic">(nápověda: hlučný / tichý)</span>
                    </td>
                    <td className="p-2 border-r border-slate-400">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">hlučný (motor a hlavičky)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                    <td className="p-2">
                      {showSolutions ? <span className="text-rose-600 font-bold italic">tichý (zcela bezhlučné 0 dB)</span> : <span className="text-slate-400 font-mono text-[9.5pt]">........................</span>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Question>

          {/* Otázka 3 */}
          <Question id="3" title="Proč instalovat operační systém na SSD? (4 body)">
            <p>
              Proč je pro běh operačního systému (např. Windows 11) zásadně výhodnější instalace na SSD disk než na klasický HDD?
              Ve své odpovědi vysvětlete rozdíl mezi <strong>sekvenčním čtením</strong> a <strong>náhodným čtením mnoha drobných souborů</strong>.
            </p>
            <Answer
              show={showSolutions}
              lines={4}
              solution="Běh a start operačního systému vyžaduje neustálé otevírání a načítání tisíců drobných souborů, registrů a knihoven DLL (náhodné čtení). U plotnového disku musí mechanické raménko s hlavičkou pro každý drobný soubor fyzicky přejet na jinou stopu a čekat na dotočení plotny (přístupová doba 10–15 ms na soubor systém citelně zasekává). SSD disk provádí přístup čistě elektronicky za zlomek milisekundy (~0,1 ms) a čte všechny buňky okamžitě."
            />
          </Question>

          {/* ========================================================= */}
          {/* ========================= ČÁST B ========================= */}
          {/* ========================================================= */}
          <div className="print-page-break flex items-center justify-between bg-slate-800 text-white px-4 py-2 rounded-lg mb-6 mt-8 shadow-sm">
            <h2 className="text-[13pt] font-black uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" /> Část B
            </h2>
            <span className="text-xs font-bold bg-slate-700 px-2.5 py-1 rounded">18 bodů</span>
          </div>

          {/* Otázka 4 */}
          <Question id="4" title="Fyzická jednotka disku (Sektor) (3 body)">
            <Sub label="a)">Jak se nazývá nejmenší fyzicky adresovatelná jednotka disku vytvořená výrobcem při výrobě?</Sub>
            <Answer show={showSolutions} lines={1} solution="Sektor (Sector)." />

            <Sub label="b)">Jaká je její standardní velikost u moderních pevných disků?</Sub>
            <Answer show={showSolutions} lines={1} solution="4 KB (4 096 bajtů) — u starších disků to bylo 512 bajtů." />

            <Sub label="c)">Kolika znakům běžného textu (bez diakritiky) tato kapacita přibližně odpovídá?</Sub>
            <Answer show={showSolutions} lines={1} solution="Protože 1 znak odpovídá 1 bajtu, odpovídá kapacita 4 KB přesně 4 096 znakům (cca 2 normostrany textu; u 512B sektorů je to 512 znaků)." />
          </Question>

          {/* Otázka 5 */}
          <Question id="5" title="Výpočet alokace pro 1 000 malých souborů (4 body)">
            <p>
              Předpokládejte disk naformátovaný se standardní velikostí klastru (alokační jednotky) <strong>4 KB</strong>.
              Na tento disk uložíte <strong>1 000 malých konfiguračních souborů</strong>, z nichž každý má velikost pouze <strong>10 B</strong>.
            </p>
            <Sub label="a)">Kolik místa na disku celkově těchto 1 000 souborů reálně obsadí? Uveďte výpočet v KB nebo MB.</Sub>
            <Answer
              show={showSolutions}
              lines={2}
              solution="Jeden klastr nesmí nikdy sdílet dva různé soubory. Každý 10bajtový soubor proto obsadí celý 4KB klastr. Výpočet: 1 000 × 4 KB = 4 000 KB (cca 3,91 MB). Přitom samotná data mají pouhých 10 KB!"
            />

            <Sub label="b)">Jak se nazývá jev, při kterém dochází k tomuto plýtvání místem, a proč k němu dochází?</Sub>
            <Answer
              show={showSolutions}
              lines={2}
              solution="Nazývá se vnitřní fragmentace (slack space). Dochází k ní proto, že souborový systém neumí souboru přidělit menší jednotku než jeden celý klastr a zbytek kapacity klastru propadá."
            />
          </Question>

          {/* Otázka 6 */}
          <Question id="6" title="Výpočet alokace pro jeden větší soubor (4 body)">
            <p>
              Máte soubor <code>protokol.docx</code> o velikosti <strong>22 KB</strong> uložený na disku s velikostí klastru <strong>4 KB</strong>.
            </p>
            <Sub label="a)">Kolik celých klastrů souborový systém tomuto souboru přidělí?</Sub>
            <Answer show={showSolutions} lines={1} solution="22 / 4 = 5,5 → zaokrouhleno nahoru = 6 klastrů." />

            <Sub label="b)">Kolik KB místa na disku bude pro tento soubor celkově rezervováno?</Sub>
            <Answer show={showSolutions} lines={1} solution="6 klastrů × 4 KB = 24 KB místa na disku." />

            <Sub label="c)">Kolik KB činí nevyužité místo (vnitřní fragmentace) v posledním klastru?</Sub>
            <Answer show={showSolutions} lines={1} solution="24 KB - 22 KB = 2 KB nevyužitého místa." />
          </Question>

          {/* Otázka 7 */}
          <Question id="7" title="Výhody dělení disku na logické oddíly (3 body)">
            <p>
              Jaké jsou výhody rozdělení jednoho fyzického disku na více logických oddílů (partitions)?
              Uveďte alespoň <strong>2 konkrétní praktické důvody</strong>, proč se disk dělí např. na systémový oddíl C: a datový oddíl D:.
            </p>
            <Answer
              show={showSolutions}
              lines={4}
              solution="1. Bezpečí dat při havárii OS: Při nutnosti přeinstalovat poškozený systém na oddílu C: zůstanou uživatelská data na oddílu D: netknutá. 2. Ochrana před zaplněním: Pokud uživatel zaplní disk D: (např. staženými hrami či filmy), neohrozí to chod operačního systému na C:, který má vyhrazený svůj prostor. 3. Více operačních systémů (Dual-boot): Možnost provozovat na jednom PC současně např. Windows a Linux. 4. Různé souborové systémy (např. NTFS pro systém a exFAT pro data)."
            />
          </Question>

          {/* Otázka 8 */}
          <Question id="8" title="Oddíly bez přiřazeného písmene jednotky (4 body)">
            <Sub label="a)">Může v operačním systému Windows 11 existovat diskový oddíl, který nemá přiřazené logické písmeno (např. C:, D:)?</Sub>
            <Answer show={showSolutions} lines={1} solution="Ano, může." />

            <Sub label="b)">K čemu se takové oddíly bez písmene v praxi využívají? Uveďte alespoň jeden konkrétní příklad.</Sub>
            <Answer
              show={showSolutions}
              lines={3}
              solution="1. Ochrana systémových oddílů: Záchranný oddíl (Recovery Partition) a zavaděč EFI nemají písmeno záměrně, aby se nezobrazovaly v Průzkumníku a uživatel je omylem nepoškodil. 2. Připojení disku do prázdné složky (NTFS Mount Point): Celý svazek lze připojit jako podsložku (např. C:\Hry) bez spotřebování písmene abecedy. 3. Skrytí citlivých dat (tzv. Trezor): Odebráním písmene svazek zmizí z nabídky Tento počítač."
            />
          </Question>

          {/* ========================================================= */}
          {/* ========================= ČÁST C ========================= */}
          {/* ========================================================= */}
          <div className="print-page-break flex items-center justify-between bg-slate-800 text-white px-4 py-2 rounded-lg mb-6 mt-8 shadow-sm">
            <h2 className="text-[13pt] font-black uppercase tracking-wider flex items-center gap-2">
              <Table2 className="w-5 h-5 text-teal-400" /> Část C
            </h2>
            <span className="text-xs font-bold bg-slate-700 px-2.5 py-1 rounded">14 bodů</span>
          </div>

          {/* Otázka 9 */}
          <Question id="9" title="Čtení z FAT tabulky – soubor o 4 clusterech (5 bodů)">
            <p>
              V adresáři disku byl vyhledán soubor <code>zprava.docx</code>, u kterého je zapsán počáteční cluster <strong>#4</strong>.
            </p>

            <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start text-xs">
              {/* FAT tabulka */}
              <div className="bg-white border-2 border-slate-700 rounded-lg p-2.5">
                <div className="font-bold text-slate-800 uppercase border-b pb-1 mb-2">Výřez FAT tabulky</div>
                <div className="grid grid-cols-2 font-mono">
                  <span className="font-bold text-slate-500">Číslo clusteru</span>
                  <span className="font-bold text-slate-500">Odkaz</span>
                  <span>4</span>
                  <span className="font-bold text-indigo-700">7</span>
                  <span>5</span>
                  <span className="text-slate-400">0 (volný)</span>
                  <span>6</span>
                  <span className="text-slate-400">0 (volný)</span>
                  <span>7</span>
                  <span className="font-bold text-indigo-700">11</span>
                  <span>8</span>
                  <span className="text-slate-400">0 (volný)</span>
                  <span>11</span>
                  <span className="font-bold text-indigo-700">15</span>
                  <span>15</span>
                  <span className="font-bold text-rose-600">EOF</span>
                </div>
              </div>

              {/* Mřížka disku */}
              <div className="bg-slate-50 border-2 border-slate-700 rounded-lg p-2.5 text-center">
                <div className="font-bold text-slate-800 uppercase border-b pb-1 mb-2">Fyzická mřížka klastrů disku</div>
                <div className="grid grid-cols-4 gap-1.5 font-mono text-[10pt]">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((idx) => {
                    const isTarget = [4, 7, 11, 15].includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`p-1.5 rounded border ${showSolutions && isTarget
                          ? 'bg-rose-500 text-white font-bold border-rose-700 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-600'
                          }`}
                      >
                        #{idx}
                      </div>
                    );
                  })}
                </div>
                {showSolutions && (
                  <p className="text-[9pt] text-rose-600 font-bold mt-2">
                    Vyznačeny klastry: #4, #7, #11, #15
                  </p>
                )}
              </div>
            </div>

            <Sub label="a)">Vypište přesné pořadí klastrů, ve kterých je soubor uložen na disku (řetězec klastrů):</Sub>
            <Answer show={showSolutions} lines={1} solution="Řetězec klastrů: #4 ➔ #7 ➔ #11 ➔ #15 (celkem 4 klastry)." />

            <Sub label="b)">V přiložené mřížce klastrů disku zakřížkujte nebo vybarvěte všechny klastry tohoto souboru.</Sub>
            <Answer show={showSolutions} lines={1} solution="V mřížce jsou správně označeny klastry #4, #7, #11 a #15." />

            <Sub label="c)">Co v tabulce FAT vyjadřuje speciální hodnota EOF?</Sub>
            <Answer show={showSolutions} lines={1} solution="EOF (End of File) = značka konce souboru. Informuje operační systém, že tento klastr je poslední částí souboru a žádný další odkaz už nenásleduje." />
          </Question>

          {/* Otázka 10 */}
          <Question id="10" title="Kombinovaná doplňovačka FAT – soubor o 5 clusterech (5 bodů)">
            <p>
              Na disku je uložen soubor <code>video.mp4</code> o velikosti <strong>5 klastrů</strong>.
              V adresáři má zapsán počáteční cluster <strong>#2</strong>.
              Z mřížky disku víme, že soubor leží v klastrech <strong>#2, #5, #6, #9 a #13</strong>.
            </p>

            <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start text-xs">
              {/* Neúplná FAT tabulka */}
              <div className="bg-white border-2 border-slate-700 rounded-lg p-2.5">
                <div className="font-bold text-slate-800 uppercase border-b pb-1 mb-2">Neúplná FAT tabulka</div>
                <div className="grid grid-cols-2 font-mono text-[10.5pt] py-1">
                  <span className="font-bold text-slate-500">Číslo clusteru</span>
                  <span className="font-bold text-slate-500">Odkaz</span>
                  <span>2</span>
                  <span className="font-bold text-slate-700">5</span>
                  <span>5</span>
                  <span className="font-bold text-slate-700">
                    {showSolutions ? <span className="text-rose-600 font-bold italic">6 (Hodnota A)</span> : '[ Doplnit A ]'}
                  </span>
                  <span>6</span>
                  <span className="font-bold text-slate-700">9</span>
                  <span>9</span>
                  <span className="font-bold text-slate-700">
                    {showSolutions ? <span className="text-rose-600 font-bold italic">13 (Hodnota B)</span> : '[ Doplnit B ]'}
                  </span>
                  <span>13</span>
                  <span className="font-bold text-slate-700">
                    {showSolutions ? <span className="text-rose-600 font-bold italic">EOF (Hodnota C)</span> : '[ Doplnit C ]'}
                  </span>
                </div>
              </div>

              {/* Mřížka disku */}
              <div className="bg-slate-50 border-2 border-slate-700 rounded-lg p-2.5 text-center">
                <div className="font-bold text-slate-800 uppercase border-b pb-1 mb-2">Fyzická mřížka klastrů disku</div>
                <div className="grid grid-cols-4 gap-1.5 font-mono text-[10pt]">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((idx) => {
                    const isTarget = [2, 5, 6, 9, 13].includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`p-1.5 rounded border ${showSolutions && isTarget
                          ? 'bg-purple-600 text-white font-bold border-purple-800 shadow-xs'
                          : 'bg-white border-slate-300 text-slate-600'
                          }`}
                      >
                        #{idx}
                      </div>
                    );
                  })}
                </div>
                {showSolutions && (
                  <p className="text-[9pt] text-purple-700 font-bold mt-2">
                    Vyznačeno 5 klastrů: #2, #5, #6, #9, #13
                  </p>
                )}
              </div>
            </div>

            <Sub label="a)">Doplňte chybějící hodnoty A, B a C do tabulky FAT tak, aby byl soubor správně zřetězen a ukončen:</Sub>
            <Answer show={showSolutions} lines={1} solution="A = 6, B = 13, C = EOF." />

            <Sub label="b)">V mřížce disku označte všech 5 klastrů, které soubor obsazuje.</Sub>
            <Answer show={showSolutions} lines={1} solution="V mřížce jsou správně označeny klastry #2, #5, #6, #9 a #13." />

            <Sub label="c)">Co by se stalo, kdyby se v klastru #9 objevila speciální značka BAD?</Sub>
            <Answer show={showSolutions} lines={2} solution="Značka BAD označuje poškozený / nečitelný klastr (vadný blok). Operační systém by řetězec nedokázal dočíst do konce a při pokusu o přehrání videa by došlo k chybě čtení nebo zamrznutí přehrávače." />
          </Question>

          {/* Otázka 11 */}
          <Question id="11" title="Formátování disku a bezpečnost dat při prodeji (4 body)">
            <Sub label="a)">
              Jaký je zásadní technický rozdíl mezi <strong>Rychlým formátováním</strong> (Quick Format) a <strong>Úplným / Pomalým formátováním</strong> (Full Format)?
              Popište, co se při každém z nich fyzicky děje s daty v sektorech disku.
            </Sub>
            <Answer
              show={showSolutions}
              lines={4}
              solution="Rychlé formátování pouze vymaže alokační tabulku (FAT/MFT) a vytvoří prázdný kořenový adresář. Samotné sektory s daty zůstávají fyzicky netknuté (zápis proběhne za sekundu). Úplné formátování provede kontrolu čitelnosti všech sektorů a všechny sektory fyzicky přepíše nulami (Zero-fill), což trvá podstatně déle (minuty až hodiny)."
            />

            <Sub label="b)">
              Představte si, že se chystáte prodat svůj starý počítač nebo externí disk cizímu člověku na inzerát.
              Jaký typ formátování použijete a proč? Co by hrozilo, kdybyste zvolili pouze Rychlé formátování?
            </Sub>
            <Answer
              show={showSolutions}
              lines={3}
              solution="Je nutné použít Úplné formátování (nebo specializovaný přepisovací software). Při pouhém Rychlém formátování totiž data na disku fyzicky zůstala a nový majitel by je mohl pomocí bezplatných programů pro obnovu dat (např. Windows File Recovery winfr nebo Recuva) snadno a kompletně obnovit, včetně osobních fotek, dokumentů a hesel."
            />
          </Question>
        </>
      )}
    </TestWorksheetShell>
  );
}
