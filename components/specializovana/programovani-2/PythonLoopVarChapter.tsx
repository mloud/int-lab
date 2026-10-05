'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Calculator, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonLoopVarChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-violet-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-violet-500 mr-2 select-none">{">>>"}</span>
            <span className="text-violet-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-violet-600" />
      <span className="font-bold text-violet-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-violet-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py12-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-violet-100 text-violet-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonLoopVarChapter: React.FC<PythonLoopVarChapterProps> = ({ onBack }) => {
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
      title="Proměnná cyklu"
      subtitle="Použití čísla kroku pro chytrou matematiku (iMyšlení Lekce 12)"
      icon={<Calculator className="w-8 h-8 text-violet-600" />}
      onBack={onBack}
      accentColor="violet"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-violet-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-violet-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-violet-900 text-lg mb-2">Instrukce</h2>
          <p className="text-violet-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Náš cyklus <code>for i in range(5)</code> v sobě celou dobu skrýval jedno obrovské tajemství! To písmenko <code>i</code> není jen písmenko pro parádu – je to plnohodnotná <strong>proměnná</strong>, která si celou dobu tajně počítá, v kolikátém kole cyklu zrovna jsme! Dnes toto číslo odhalíme a použijeme na úžasné věci.
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Dvojitá říkanka" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha slouží k zopakování tvorby obyčejných cyklů. K vyřešení žáci potřebují napsat dva samostatné cykly: jeden, který 2x vypíše "pes oknem", a druhý, který 2x vypíše "nebude-li pršet, nezmoknem".</p>}>
          <p>Tvůj mladší sourozenec našel následující říkanku, kde se spousta textu zbytečně opakuje. Vytvoř program <code>rikanka.py</code>, který ji vypíše pomocí příkazů <code>print</code>, ale použij cykly tak, abys měl v celém programu napsaný příkaz print maximálně třikrát!</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Kočka leze dírou<br/>
            pes oknem<br/>
            pes oknem<br/>
            nebude-li pršet<br/>
            nezmoknem<br/>
            nebude-li pršet<br/>
            nezmoknem
          </div>
        </TaskCard>

        <TaskCard number="2" title="Odhalení písmene I" taskId="2" showTeacher={teacherMode} teacherNote={<p>Tady žáci odhalí, že `i` se při každém průchodu cyklem mění z 0 na 1, 2... atd. Je nutné zdůraznit, že programování začíná počítat už od nuly!</p>}>
          <p>Vytvoř program <code>rada_cisel.py</code> a pomocí následujícího kódu si nech vypsat "vnitřnosti" naší smyčky. Poprvé použijeme písmenko <code>i</code> přímo v printu!</p>
          <PythonSnippet code={`for i in range(10):\n    print('číslo', i)`} />
          <p className="font-bold text-violet-700">Co myslíš, že to vypíše? Kde se vůbec vzala nula?</p>
          <p className="text-sm">Počítače a programátoři mají jednu zvláštnost – vždycky začínají počítat věci od nuly. Takže 10 opakování je vlastně počítání od 0 do 9!</p>
        </TaskCard>

        <TaskCard number="3" title="Matematika s I" taskId="3" showTeacher={teacherMode} teacherNote={<p>Extrémně důležitá gradovaná úloha. a) <code>range(11)</code>, b) <code>print(i+1)</code>, c) <code>print((i+1)*2)</code>, d) <code>print((i+1)*10)</code>. Žáci postupně odvozují vzorce, neustále pracují s původním indexem 0-9.</p>}>
          <p>Urči, co je potřeba v předchozím programu změnit u samotného vypsání písmene <code>i</code>, aby se ti místo klasického (0 až 9) vypsala tato konkrétní čísla:</p>
          <ul className="list-disc pl-5 mt-2 space-y-3 font-mono bg-slate-50 p-4 rounded-xl text-sm">
            <li><span className="font-sans font-bold">a) Vypiš včetně 10:</span> 0, 1, 2 ... až 10 <span className="font-sans text-slate-400 ml-2">(Tip: Stačí změnit jen range)</span></li>
            <li><span className="font-sans font-bold">b) Odstranění nuly:</span> 1, 2, 3 ... až 10 <span className="font-sans text-slate-400 ml-2">(Tip: Ke každému číslu v printu zkusmo něco přičti)</span></li>
            <li><span className="font-sans font-bold">c) Dvojnásobně:</span> 2, 4, 6 ... až 20 <span className="font-sans text-slate-400 ml-2">(Tip: Nejdřív jako minule udělej 1 až 10 a výsledek vynásob *2)</span></li>
            <li><span className="font-sans font-bold">d) Desítky:</span> 10, 20, 30 ... až 100 <span className="font-sans text-slate-400 ml-2">(Tip: Stejný princip, jen násobíš jiným číslem)</span></li>
          </ul>
        </TaskCard>

        <TaskCard number="4" title="Druhé mocniny" taskId="4" showTeacher={teacherMode} teacherNote={<p>Aplikace proměnné cyklu. Řešení: <code>print(i, 'na druhou je', i * i)</code>.</p>}>
          <p>Vytvoř program <code>druhe_mocniny.py</code>, který pomocí for cyklu vypíše čísla a jejich druhé mocniny (číslo vynásobené samo sebou):</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            0 na druhou je 0<br/>
            1 na druhou je 1<br/>
            2 na druhou je 4<br/>
            3 na druhou je 9<br/>
            4 na druhou je 16<br/>
            5 na druhou je 25<br/>
            6 na druhou je 36
          </div>
        </TaskCard>

        <TaskCard number="5" title="Slet vrabců" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešením je spojování textu s proměnnou <code>i</code> a s matematickým výrazem <code>i+1</code> uvnitř jednoho příkazu print. <code>print("Na stromě bylo", i, "vrabců, jeden přiletěl a už je tam", i+1, "vrabců")</code>.</p>}>
          <p>Napiš do nového programu <code>povidka.py</code> kód, který pomocí jediného cyklu vygeneruje postupně celou tuto vrabčí povídku:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl overflow-x-auto whitespace-nowrap">
            Na stromě bylo 0 vrabců, jeden přiletěl a už je tam 1 vrabců<br/>
            Na stromě bylo 1 vrabců, jeden přiletěl a už je tam 2 vrabců<br/>
            Na stromě bylo 2 vrabců, jeden přiletěl a už je tam 3 vrabců<br/>
            ... a tak dále, až po:<br/>
            Na stromě bylo 9 vrabců, jeden přiletěl a už je tam 10 vrabců
          </div>
        </TaskCard>

        <TaskCard number="6" title="Odlet vrabců" taskId="6" showTeacher={teacherMode} teacherNote={<p>Zde se žáci poprvé učí "couvat" (odečítat od maxima dolů). Řešení: <code>print("Na stromě bylo", 10-i, "vrabců...", 9-i)</code>.</p>}>
          <p>A teď to nejtěžší – vrabci z předchozí povídky odlétají! Vymysli cyklus, který bude tuto povídku vyprávět "pozpátku", z 10 postupně až dolů na nulu.</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-xs sm:text-sm rounded-xl overflow-x-auto whitespace-nowrap">
            Na stromě bylo 10 vrabců, jeden odletěl a zůstalo tam 9 vrabců<br/>
            Na stromě bylo 9 vrabců, jeden odletěl a zůstalo tam 8 vrabců<br/>
            ... a tak dále, až po:<br/>
            Na stromě bylo 1 vrabců, jeden odletěl a zůstalo tam 0 vrabců
          </div>
          <p className="text-violet-700 font-bold mt-2">Nápověda: Programování umí jen přičítat od nuly (0, 1, 2, 3...). Když chceš čísla zmenšovat (10, 9, 8, 7...), musíš v printu to vzrůstající "i" šikovně odečítat od desítky: <code>10 - i</code>.</p>
        </TaskCard>

        <TaskCard number="7" title="Deset popsaných kartiček" taskId="7" showTeacher={teacherMode} teacherNote={<p>Tady se propojuje grafika s vypsáním proměnné cyklu. Řešení kombinuje <code>random.randint</code> pro pozici a příkaz <code>canvas.create_text(x, y, text=i)</code>.</p>}>
          <p>Zpátky do grafiky! Máme kartičky s čísly od 0 do 9, které chceme náhodně rozložit po ploše. Vytvoř program <code>deset_karticek.py</code>, který pomocí cyklu postupně nakreslí deset takových modrých kartiček na náhodných pozicích, a doprostřed nich vypíše číslo z proměnné `i`.</p>
          <CanvasPreview width={300} height={200}>
            {[
              [50, 40, 0], [120, 140, 1], [200, 60, 2], [230, 150, 3], [140, 80, 4],
              [80, 110, 5], [160, 40, 6], [260, 90, 7], [100, 170, 8], [20, 150, 9]
            ].map((d, i) => (
              <div key={i} className="absolute border border-black bg-sky-400 flex items-center justify-center font-bold text-lg" style={{ left: d[0], top: d[1], width: 30, height: 40, transform: 'translate(-50%, -50%)' }}>
                {d[2]}
              </div>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="Zahraniční bankovky" taskId="8" showTeacher={teacherMode} teacherNote={<p>Rozšíření předchozí úlohy, jen s tím rozdílem, že text nebude `i`, ale třeba <code>(i+1)*10</code>, čímž vzniknou nápisy 10, 20, 30, 40, 50. Pozadí zelené a obdélník horizontální.</p>}>
          <p>Na chodníku je rozhozených pět cizokrajných zelených bankovek s hodnotami 10, 20, 30, 40 a 50. Napiš program <code>bankovky.py</code>, který takové bankovky (široké zelené obdélníky) nakreslí i s těmito čísly na náhodné místo pomocí <code>for</code> cyklu.</p>
        </TaskCard>

        <TaskCard number="9" title="Geometrie: Pohyb po ose" taskId="9" showTeacher={teacherMode} teacherNote={<p>Klíčová myšlenka lekce. X-ová souřadnice už není z <code>random</code>, ale je vypočtená přímo z <code>i</code>, což zaručí matematicky přesnou rovnou řadu! Zde: <code>x = i * 50</code>, y je pevné 100.</p>}>
          <p>Tohle je magie! Proměnnou <code>i</code> můžeme použít i jako přesnou souřadnici, takže se nám už nebudou věci kreslit náhodně na přeskáčku, ale vytvoří přesnou geometrickou řadu!</p>
          <p>Vytvoř program <code>kresleni_cisel.py</code> a přepiš do něj tento kód:</p>
          <PythonSnippet code={`for i in range(8):\n    x = i * 50\n    canvas.create_text(x, 100, text=i, font='arial 30')`} />
          <p className="font-bold text-violet-700 mt-2">Dříve než to spustíš: Zkus si propočítat v hlavě, co vlastně ten řádek <code>x = i * 50</code> dělá pro první i=0, i=1 a i=2? Jaké číslo tím vyjde?</p>
        </TaskCard>

        <TaskCard number="10" title="Klesající schody" taskId="10" showTeacher={teacherMode} teacherNote={<p>Posun i na obou osách najednou vytvoří diagonálu. Řešení: do y se dosadí <code>y = i * 30</code>.</p>}>
          <p>Uprav předchozí program tak, aby se čísla 0 až 7 kreslila přibližně do šikmých "schodů" klesajících z levého horního rohu doprava dolů. Musíš tedy k proměnné <code>x</code> (která to posouvá doprava) vymyslet podobný výpočet i pro proměnnou <code>y</code> (která to bude posouvat dolů)!</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute font-bold text-xl" style={{ left: i * 30, top: i * 20 }}>
                {i}
              </div>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11" title="Záchrana nuly" taskId="11" showTeacher={teacherMode} teacherNote={<p>Nula byla na začátku na pozici 0,0 a tím pádem byla polovina textu oříznutá rohem obrazovky. Řešení: přidat na konec výpočtu statický posun, např. <code>x = i * 50 + 15</code>.</p>}>
          <p>V předchozím programu se číslo 0 kreslilo přesně v souřadnici [0,0] za úplný roh grafické plochy, takže z něj nebylo skoro nic vidět. Uprav oba své výpočty na těch dvou řádcích s násobením jednoduše tak, že k nim na konci ještě nějaké napevno zvolené číslo přičteš (třeba <code>+ 15</code> nebo <code>+ 20</code>). Tím se celá úhlopříčka celkově posune doprostřed plátna!</p>
        </TaskCard>

        <TaskCard number="12" title="Kostky domina" taskId="12" showTeacher={teacherMode} teacherNote={<p>Přesunutí konceptu "i * 50 + posun" i na obdélníky. Tím se vykreslí mřížka nebo řada bez použití textu.</p>}>
          <p>Víš, jak vypadá padající had z domina? Vytvoř program <code>domino.py</code>, který pomocí cyklu a obdélníku nakreslí vedle sebe takto krásně srovnané (zatím ještě stojící) kostky domina.</p>
          <p>Budeš k tomu zase potřebovat svůj spolehlivý matematický vzorec pro výpočet souřadnice <code>x</code> (souřadnici y si nastav nějakou pevnou, tyhle kostky nepadají šikmo po schodech jako čísla minule!).</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Rect key={i} x1={i * 30 + 40} y1={80} width={15} height={60} fill="red" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="13*" title="Incká pyramida" taskId="13" showTeacher={teacherMode} teacherNote={<p>Velmi těžká úloha, kde se `i` používá nejen pro y-souřadnici (stavba nahoru), ale také pro odečítání velikosti (aby obdélníky byly čím dál tím užší). Polovina šířky <code>d = 100 - i * 10</code>. Pak obdélník <code>150 - d, y, 150 + d, y + 20</code>.</p>}>
          <p className="flex items-center gap-2 font-bold text-violet-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Napiš program <code>velka_pyramida.py</code>, který pomocí jednoho cyklu a jediného kreslícího příkazu obdélníku (vykonaného samozřejmě 10x) nakreslí dokonale souměrnou pyramidu postavenou z deseti pater na sobě, od nejširšího až po to nejužší.</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 10 }).map((_, i) => {
              const d = 100 - i * 10;
              const y = 180 - i * 15;
              return <Rect key={i} x1={150 - d} y1={y} width={d * 2} height={15} fill="orange" />;
            })}
          </CanvasPreview>
          <p className="text-violet-700 font-bold mt-2">Dvojitá záludnost: Aby se ti patra stavěla odzdola nahoru, musíš jejich <code>y</code> od spodku plátna postupně v každém kroku <strong>odečítat</strong> (třeba <code>200 - i*15</code>). A aby se zužovaly obě zdi pyramidy stejně, musíš si vymyslet extra proměnnou např. <code>šířka</code>, která se bude s přibývajícím <code>i</code> zmenšovat, a přičítat ji a odečítat k pevnému středu základny osy <code>x</code>!</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonLoopVarChapter;
