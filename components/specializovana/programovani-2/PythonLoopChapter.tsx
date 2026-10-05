'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Repeat, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-rose-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-rose-500 mr-2 select-none">{">>>"}</span>
            <span className="text-rose-300">{line.substring(3).trim()}</span>
          </>
        ) : line.startsWith('SyntaxError') || line.startsWith('Traceback') || line.startsWith('File') || line.startsWith('NameError') ? (
          <span className="text-rose-400">{line}</span>
        ) : (
          <span className="text-slate-300 whitespace-pre">{line}</span>
        )}
      </div>
    ))}
  </div>
);

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-rose-600" />
      <span className="font-bold text-rose-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-rose-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ children, width = 300, height = 200, className = "", bgColor = "white" }: { children: React.ReactNode, width?: number, height?: number, className?: string, bgColor?: string }) => (
  <div className={`relative border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height, backgroundColor: bgColor }}>
    {children}
  </div>
);

const Rect = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'}`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
);

const TaskCard = ({ 
  number, 
  title, 
  children, 
  teacherNote, 
  showTeacher,
  taskId
}: { 
  number: string, 
  title: string, 
  children: React.ReactNode, 
  teacherNote?: React.ReactNode,
  showTeacher: boolean,
  taskId: string
}) => {
  const [done, setDone] = useLocalStorage(`py11-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center font-black text-xl">
          {number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">{title}</h3>
          <div className="text-slate-600 leading-relaxed text-sm sm:text-base space-y-4">
            {children}
          </div>

          {showTeacher && teacherNote && (
            <TeacherNote>{teacherNote}</TeacherNote>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setDone(!done)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                done 
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${done ? 'text-emerald-600' : 'text-slate-400'}`} />
              {done ? 'Splněno' : 'Označit jako splněné'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PythonLoopChapter: React.FC<PythonLoopChapterProps> = ({ onBack }) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState('');

  const handleToggleTeacher = () => {
    if (teacherMode) {
      setTeacherMode(false);
    } else {
      setPinMode(true);
      setPin('');
    }
  };

  const submitPin = () => {
    if (pin === '1234') {
      setTeacherMode(true);
      setPinMode(false);
    } else {
      alert('Nesprávný PIN');
      setPinMode(false);
    }
  };

  return (
    <FsChapterShell
      title="Program s opakováním"
      subtitle="Základy for cyklu a automatizace (iMyšlení Lekce 11)"
      icon={<Repeat className="w-8 h-8 text-rose-600" />}
      onBack={onBack}
      accentColor="rose"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-rose-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-rose-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-rose-900 text-lg mb-2">Instrukce</h2>
          <p className="text-rose-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Někdy chceme, aby počítač udělal tu samou věc tisíckrát. Zapisovat deset nebo tisíc stejných příkazů pod sebe je hrozná nuda. Programátoři jsou líní a proto vymysleli <strong>CYKLY</strong> (smyčky)!
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Ztraceni na louce" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha slouží k zopakování předchozí látky (podprogram, kreslení textu). Trik spočívá v tom zavolat ten podprogram 10x tak, že žáci opíší 10x <code>gps()</code> pod sebe, což je má unavit a připravit půdu pro cyklus v dalších úlohách.</p>}>
          <p>Běháme po louce a zaznamenáváme si naši GPS pozici.</p>
          <p>Vytvoř program <code>gps.py</code> a v něm podprogram <code>gps()</code>, který vygeneruje náhodné souřadnice x, y představující tvoji pozici na louce.</p>
          <p>Poté na tomto místě na obrazovce nakresli znak '+' a pod něj pomocí příkazu <code>create_text</code> vypiš tyto dvě souřadnice. Když nakonec tento podprogram zavoláš desetkrát pod sebou (ať si to počítač aspoň trošku odpracuje), uvidíš zhruba takový výsledek:</p>
          <CanvasPreview width={300} height={200}>
            {[
              [50, 40], [120, 60], [200, 30], [250, 150], [80, 120], 
              [160, 100], [140, 160], [220, 80], [60, 170], [180, 140]
            ].map((pos, i) => (
              <div key={i} className="absolute flex flex-col items-center justify-center text-[8px] font-sans" style={{ left: pos[0], top: pos[1], transform: 'translate(-50%, -50%)' }}>
                <span className="text-[12px] leading-none mb-1">+</span>
                <span className="leading-none">{pos[0]} {pos[1]}</span>
              </div>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="Ruční práce" taskId="2" showTeacher={teacherMode} teacherNote={<p>Ať to klidně nakopírují přes Ctrl+C a Ctrl+V. Důležité je, aby je to trochu otravovalo.</p>}>
          <p>Zatím pracuj bez grafiky. Vytvoř program <code>tesim_se.py</code> a pomocí obyčejného příkazu <code>print</code> vypiš text "Těším se na prázdniny" přesně pětkrát pod sebe.</p>
        </TaskCard>

        <TaskCard number="3" title="Kouzlo zvané FOR" taskId="3" showTeacher={teacherMode} teacherNote={<p>První ostré seznámení se syntaxí for cyklu. Upozorněte žáky na slovo <code>for</code>, na důležitou dvojtečku <code>:</code> a na automatické <strong>odsazení zleva</strong> u vnořeného příkazu!</p>}>
          <p>V obou předchozích programech jsi měl vícekrát nakopírované ty samé příkazy pod sebou. Abys je nemusel opakovaně kopírovat a vkládat, můžeš to zapsat mnohem elegantněji. Kód programu <code>tesim_se.py</code> uprav takto:</p>
          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')`} />
          <p>Tento program spusť a urči, co vykonal!</p>
          <p className="text-rose-700 font-bold mt-2">Důležité: Příkaz print <strong>musí</strong> být odsunutý kousek doprava (zpravidla na 4 mezery, Thonny ti je tam po dvojtečce udělá po stisku Enter automaticky). Tím počítač ví, že tenhle příkaz patří do naší opakující se smyčky!</p>
        </TaskCard>

        <TaskCard number="4" title="100x těším se" taskId="4" showTeacher={teacherMode} teacherNote={<p>Žáci si zkouší upravit parametr ve funkci <code>range(5)</code> na jiná čísla. Zjišťují, že to ovlivňuje počet proběhnutí smyčky.</p>}>
          <p>Zkus místo čísla 5 uvnitř závorky napsat číslo 10 a program znovu spusť. Poté zaexperimentuj s obrovskými čísly (třeba 100 nebo 1000). Urči, co se stane!</p>
        </TaskCard>

        <TaskCard number="5" title="Více příkazů ve smyčce" taskId="5" showTeacher={teacherMode} teacherNote={<p>Žáci zjišťují, že do těla cyklu se vejde libovolný počet příkazů pod sebe. Hlavní je, aby byly <strong>všechny stejně odsazené!</strong></p>}>
          <p>Uprav program přesně podle následující ukázky a spusť jej. Všimni si, že počítač pokaždé vypíše nejen větu, ale podtrhne ji i řádkem z rovnítek.</p>
          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')\n    print('=====================')`} />
        </TaskCard>

        <TaskCard number="6" title="Zrádné odsazení" taskId="6" showTeacher={teacherMode} teacherNote={<p>Nejčastější chyba začátečníků: špatné odsazení. Tím, že žáci odmažou mezery před druhým printem, tento print vypadne ze smyčky. Počítač 5x napíše větu a teprve na konci, až cyklus skončí, podtrhne vše jednou čárou z rovnítek!</p>}>
          <p>Je extrémně důležité pochopit, co odsazení dělá! Odmaž nyní mezery před druhým printem, aby ležel úplně nalevo (tzv. přiraz ho ke kraji, ať je přesně pod slovem <code>for</code>):</p>
          <PythonSnippet code={`for i in range(5):\n    print('Těším se na prázdniny')\nprint('=====================')`} />
          <p>Spusť to. Vidíš ten obrovský rozdíl? Druhý příkaz z rovnítek totiž <strong>vypadl z naší opakující se smyčky</strong>, protože nemá odstup zleva! Takže se provede jen jednou jedinkrát, až když celá pětinásobná smyčka skončí.</p>
        </TaskCard>

        <TaskCard number="7" title="Smyčka a podprogram" taskId="7" showTeacher={teacherMode} teacherNote={<p>Uplatnění cyklu z předchozích úloh na úlohu 1. Místo 10 stejných volání napíší jen <code>for i in range(10): gps()</code>. Nutno vysvětlit, že cyklus umí opakovat cokoliv, i celá volání grafických podprogramů.</p>}>
          <p>Otevři znovu program <code>gps.py</code>, který jsi dělal v první úloze (s pobíháním po louce). Vymaž těch tvých ručně napsaných 10 volání <code>gps()</code> pod sebou a nahraď je nádherným kraťoučkým cyklem! Výsledek bude na obrazovce úplně stejný, ale kód bude mnohem čistší.</p>
        </TaskCard>

        <TaskCard number="8" title="Útok červených čtverců" taskId="8" showTeacher={teacherMode} teacherNote={<p>Žáci definují podprogram pro kreslení čtverce a pak do grafiky vysypou 2000 čtverců přes <code>for</code> cyklus.</p>}>
          <p>Vytvoř nový program <code>opakovany_ctverec.py</code> a v něm podprogram <code>cerveny_ctverec()</code>. Ten nakreslí na grafickou plochu na náhodné souřadnice malý červený čtverec (třeba 10x10).</p>
          <p>A teď pod něj použij tvůj nový mocný for cyklus na to, abys tento čtverec nakreslil <strong>2000x</strong> (dvatisícekrát!). Výsledek bude připomínat hrubou zrnitou texturu.</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 400 }).map((_, i) => {
              const x = Math.floor(Math.random() * 290);
              const y = Math.floor(Math.random() * 190);
              return <Rect key={i} x1={x} y1={y} width={10} height={10} fill="red" />;
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="9" title="Modrý útok" taskId="9" showTeacher={teacherMode} teacherNote={<p>Dvě volání v jednom cyklu: <code>cerveny_ctverec()</code> a <code>modry_ctverec()</code>. Nakreslí se jeden červený a hned modrý, takže se rovnoměrně mísí celou dobu.</p>}>
          <p>Doplň do svého programu ještě druhý podprogram <code>modry_ctverec()</code>. Ten bude logicky kreslit náhodné modré čtverce.</p>
          <p>Poté svůj starý cyklus s 2000 opakováními trochu natáhni – zajisti, aby v jeho těle (odsazené pod ním) byla obě dvě volání najednou. Počítač tak bude rovnoměrně losovat a kreslit jeden červený, jeden modrý, jeden červený, jeden modrý...</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 600 }).map((_, i) => {
              const x = Math.floor(Math.random() * 290);
              const y = Math.floor(Math.random() * 190);
              return <Rect key={i} x1={x} y1={y} width={10} height={10} fill={i % 2 === 0 ? "red" : "blue"} />;
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10" title="Proč záleží na pořadí" taskId="10" showTeacher={teacherMode} teacherNote={<p>Kritická myšlenková úloha! Žáci mají dva cykly pod sebou (nejdřív se nakreslí všechny červené a AŽ PAK všechny modré). Tím pádem 2000 modrých čtverců nakreslených nakonec vizuálně "přikryje" většinu těch červených vespod.</p>}>
          <p>Uprav kód tvého programu do takovéto podoby (dva samostatné cykly jdoucí po sobě, místo jednoho společného):</p>
          <PythonSnippet code={`for i in range(2000):\n    cerveny_ctverec()\n    \nfor i in range(2000):\n    modry_ctverec()`} />
          <p className="text-rose-700 font-bold mt-2">Zobrazil se naprosto stejný obrázek jako předtím? Pokud ne, zamysli se a diskutuj, proč nyní grafika vypadá úplně jinak a z drtivé většiny jen jako modrá machule!</p>
        </TaskCard>

        <TaskCard number="11" title="Hvězdná obloha" taskId="11" showTeacher={teacherMode} teacherNote={<p>Úloha kombinuje tmavé pozadí a drobné žluté "tečky" kreslené ve vysokém počtu v cyklu. Pozadí se buď kreslí obřím obdélníkem, nebo přes <code>canvas = tkinter.Canvas(bg='navy')</code>.</p>}>
          <p>Vytvoř nový program <code>obloha.py</code>, který pomocí grafických příkazů nakreslí krásnou hvězdnou noční oblohu.</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Napiš podprogram <code>hvezdicka()</code>, který nakreslí na náhodnou pozici malinkatý žlutý čtvereček o náhodné velikosti strany 2 až 4 pixely.</li>
            <li>Noční oblohu nakresli přes celou obrazovku jako gigantický obdélník s barvou <code>'navy'</code> (námořnická modř).</li>
            <li>Poté použij obří cyklus a zavolej 1000x svou hvězdičku! Tím plátno zasypeš hvězdami.</li>
          </ul>
          <CanvasPreview width={300} height={200} bgColor="#000080" noBorder>
            {Array.from({ length: 300 }).map((_, i) => {
              const x = Math.floor(Math.random() * 296);
              const y = Math.floor(Math.random() * 196);
              const size = Math.floor(Math.random() * 3) + 2;
              return <Rect key={i} x1={x} y1={y} width={size} height={size} fill="yellow" noBorder />;
            })}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="12" title="Simulátor losování" taskId="12" showTeacher={teacherMode} teacherNote={<p>Očekávaný výsledek: pět vět "bylo vylosováno číslo X", kde X je náhodné od 1 do 100.</p>}>
          <p>Je dán následující program:</p>
          <PythonSnippet code={`import random\n\nfor i in range(5):\n    n = random.randint(1, 100)\n    print('bylo vylosováno číslo', n)`} />
          <p>Zamysli se, co přesně tento program udělá (je to jen v terminálu bez grafiky) a zkus odhadnout jeho celkový výpis, aniž bys ho hned spouštěl.</p>
        </TaskCard>

        <TaskCard number="13" title="Házíme dvěma kostkami naráz" taskId="13" showTeacher={teacherMode} teacherNote={<p>Úloha demonstruje použití dvou nezávislých proměnných <code>a, b</code> vygenerovaných v rámci jedné obrátky cyklu. A nakonec výpočet a výpis součtu: <code>print('Součet je', a+b)</code>.</p>}>
          <p>Napiš program <code>dve_kostky.py</code>, který pomocí for cyklu simuluje přesně pět hodů <strong>dvěma</strong> kostkami.</p>
          <p>V těle cyklu si do dvou proměnných ulož nezávisle dvě náhodná čísla od 1 do 6, ty pomocí <code>print</code> vypiš a nakonec vypiš i jejich aktuální součet! Pak se cyklus protočí a vygenerují se dvě zcela nová čísla.</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl">
            Na první kostce padlo číslo 4<br/>
            Na druhé kostce padlo číslo 3<br/>
            Součet obou čísel je 7<br/><br/>
            Na první kostce padlo číslo 2<br/>
            Na druhé kostce padlo číslo 4<br/>
            Součet obou čísel je 6<br/>
            ...
          </div>
        </TaskCard>

        <TaskCard number="14" title="Kostky s čísly na plátně" taskId="14" showTeacher={teacherMode} teacherNote={<p>Přiřazení a kreslení uvnitř cyklu. Kreslí 5 čtverců a doprostřed píše čísla. Pro zvětšení textu se používá parametr font: <code>canvas.create_text(x, y, text=..., font='arial 50')</code>.</p>}>
          <p>Pojďme házet graficky! Napiš program <code>kostky_s_cisly.py</code>, který nakreslí na plátno na náhodná místa pět bílých hracích kostek.</p>
          <p>Každou kostku nakresli jako čtverec a do jeho středu umísti velké náhodné číslo od 1 do 6. Celé to zabal do jednoho cyklu, takže obdélníky i texty se musí generovat najednou pod sebou uvnitř tvého odsazení.</p>
          <CanvasPreview width={300} height={200}>
            {[
              [50, 40, 3], [120, 140, 6], [200, 60, 5], [230, 150, 2], [140, 80, 1]
            ].map((d, i) => (
              <div key={i} className="absolute border border-black bg-white flex items-center justify-center font-bold text-2xl" style={{ left: d[0], top: d[1], width: 40, height: 40, transform: 'translate(-50%, -50%)' }}>
                {d[2]}
              </div>
            ))}
          </CanvasPreview>
          <p>Tip: Pokud chceš čísla na kostce veliká, použij ve svém textovém příkazu nový parametr <code>font='arial 30'</code> (kde číslo 30 určuje velikost písma).</p>
        </TaskCard>

        <TaskCard number="15*" title="Generátor QR kódu" taskId="15" showTeacher={teacherMode} teacherNote={<p>Úžasná výzkumná úloha. Generují náhodné čtverečky do mřížky. Trik je generovat `random.randint(1, 21) * 10` (souřadnici vynásobit destítkou, aby skákala po políčkách 10x10). Kdo to zvládne, dostane se o level výš v pochopení algoritmizace!</p>}>
          <p className="flex items-center gap-2 font-bold text-rose-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Vytvoř program <code>qr_kod.py</code>, který představuje generátor náhodného fiktivního QR kódu.</p>
          <p>Obrázek se skládá ze stovek malých černých čtverečků (každý o velikosti 10x10 pixelů). Vtip je ale v tom, že čtverečky <strong>nesmí ležet náhodně kdekoli</strong> (aby se nepřekrývaly napůl), ale musí být zasazeny do přesné neviditelné "šachovnicové mřížky" velikosti 21x21 buněk.</p>
          <p>Dokážeš vymyslet matematický trik s funkcí <code>random.randint()</code> a obyčejným násobením, aby tvé malé černé čtverečky vždy přesně "zapadly" na nějakou souřadnici jako např. [10,20], [50,150], [210,30] a nikdy ne např. na [13, 27]?</p>
          <CanvasPreview width={220} height={220} className="border border-slate-400 bg-white">
            <div className="absolute inset-0 p-[5px]">
              {Array.from({ length: 220 }).map((_, i) => {
                const x = (Math.floor(Math.random() * 21) + 1) * 10 - 5;
                const y = (Math.floor(Math.random() * 21) + 1) * 10 - 5;
                return <Rect key={i} x1={x} y1={y} width={10} height={10} fill="black" noBorder />;
              })}
            </div>
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopChapter;
