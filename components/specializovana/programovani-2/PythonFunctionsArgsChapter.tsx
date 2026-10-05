'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Puzzle, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonFunctionsArgsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-emerald-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-emerald-500 mr-2 select-none">{">>>"}</span>
            <span className="text-emerald-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-emerald-600" />
      <span className="font-bold text-emerald-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-emerald-900 leading-relaxed">
      {children}
    </div>
  </div>
);

const CanvasPreview = ({ children, width = 300, height = 200, className = "", bgColor = "white" }: { children: React.ReactNode, width?: number, height?: number, className?: string, bgColor?: string }) => (
  <div className={`relative border-2 border-slate-300 shadow-md mx-auto my-6 overflow-hidden ${className}`} style={{ width, height, backgroundColor: bgColor }}>
    {children}
  </div>
);

const Oval = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'} rounded-[50%]`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
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
  const [done, setDone] = useLocalStorage(`py19-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonFunctionsArgsChapter: React.FC<PythonFunctionsArgsChapterProps> = ({ onBack }) => {
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
      title="Podprogram s parametrem"
      subtitle="Objevení tajné schránky uvnitř kulatých závorek def (iMyšlení Lekce 19)"
      icon={<Puzzle className="w-8 h-8 text-emerald-600" />}
      onBack={onBack}
      accentColor="emerald"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-emerald-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-emerald-900 text-lg mb-2">Instrukce</h2>
          <p className="text-emerald-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Už umíš vytvářet vlastní programy (funkce) pomocí kouzelného slova <code>def neco():</code>. Ale celou dobu ti leží ladem ty prazdné kulaté závorky na konci! Dneska zjistíme, že do těch závorek jde vkládat informace (tzv. parametry), a podprogramy tím získají gigantickou moc a univerzálnost!
          </p>
        </div>

        <TaskCard number="1" title="Kolik číslic to má?" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha na procvičení if/else struktur (buď 3 vnořené ify do else, nebo použít elif). Slouží jen na rozehřátí logiky. Do 10 je to jednociferné, do 100 dvouciferné, pak troj.</p>}>
          <p>Napiš si malý opakovací program <code>cifry_cisla.py</code>, ve kterém nahoře přiřadíš do proměnné <code>cislo</code> libovolnou hodnotu (od 0 do 999). Pomocí vnořeného větvení urči, kolika-ciferné to číslo je.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Pokud je menší než 10, napiš, že je jednociferné.</li>
            <li>Pokud ne, a je menší než 100, tak napiš, že je dvouciferné.</li>
            <li>Pokud ani to ne, tak vypiš, že je trojciferné!</li>
          </ul>
        </TaskCard>

        <TaskCard number="2" title="Hloupé programy" taskId="2" showTeacher={teacherMode} teacherNote={<p>Zde záměrně demonstrujeme, jak neefektivní je dělat 3 stejné funkce bez parametru. Připravujeme je na objev parametru.</p>}>
          <p>Podívej se na tento kód tří strašně hloupých funkcí, které nedělají nic jiného, než že nastaví proměnnou a vypíší ji do printu. Přepiš si je a spusť je pro otestování.</p>
          <PythonSnippet code={`def jemi10():\n    vek = 10\n    print('Je mi', vek, 'let')\n\ndef jemi20():\n    vek = 20\n    print('Je mi', vek, 'let')\n\ndef jemi30():\n    vek = 30\n    print('Je mi', vek, 'let')`} />
          <p>Vidíš, jak neuvěřitelně hloupé a zbytečné je kopírovat 3x úplně stejný kód, když jediné co se mění je to číslo uvnitř? Takhle se to opravdu nedělá!</p>
        </TaskCard>

        <TaskCard number="3" title="Kouzlo parametru!" taskId="3" showTeacher={teacherMode} teacherNote={<p>Revoluce! Místo definice nové funkce prostě vpustíme <code>vek</code> dovnitř přes <strong>parametr</strong>. Ptejte se žáků, jak to funguje, protože tohle je jádro moderního programování (argumenty a parametry funkcí).</p>}>
          <p>Místo tří hloupých funkcí napíšeme <strong>jednu univerzální supersilnou funkci</strong>!</p>
          <p>Napiš slovo <code>vek</code> přímo DOVNITŘ těch dosud prázdných kulatých závorek u definice funkce (tam, kde jsi vždycky psal jen prázdné <code>()</code>). A odstraň ten řádek, kde jsi věk nastavoval číslem (<code>vek=10</code> atd).</p>
          <p className="mt-2">Tím proměníš <code>vek</code> na takzvaný <strong>parametr</strong>. Pak ho prostě "nacpeš" dovnitř až v momentě, kdy tu funkci někdo volá! Přepiš ten starý program na tohle a vyzkoušej ho:</p>
          <PythonSnippet code={`def jemi(vek):\n    print('Je mi', vek, 'let')\n\njemi(10)\njemi(20)\njemi(30)`} />
        </TaskCard>

        <TaskCard number="4" title="Umocňování parametru" taskId="4" showTeacher={teacherMode} teacherNote={<p>Parametr uvnitř funguje jako normální proměnná! Dá se s ním i počítat (x * x).</p>}>
          <p>Jakmile parametr vejde z kulatých závorek dovnitř funkce, funguje jako úplně normální klasická proměnná. Můžeš s ním dokonce dělat matematiku!</p>
          <p>Vytvoř program <code>druha_mocnina.py</code> a definuj podprogram <code>vypis(x)</code>. Tato funkce přijme dovnitř nějaké číslo x zapsané v závorce. Potom vypíše "Číslo x", a pod to vypíše "Umocněné na druhou se rovná", a necháš tam rovnou matematicky počítač to číslo z parametru vynásobit sebou samým (<code>x * x</code>)!</p>
          <p>Až funkci dokončíš, zavolej v programu za sebou <code>vypis(1)</code>, <code>vypis(2)</code>, <code>vypis(3)</code> a zkontroluj výsledky!</p>
        </TaskCard>

        <TaskCard number="5" title="Kruhy s parametrem" taskId="5" showTeacher={teacherMode} teacherNote={<p>Parametr se přesouvá do kreslení. `r` se používá k dopočítání okrajů bounding boxu od pevného středu 200, 150.</p>}>
          <p>Zahodíme text a jdeme zpět do grafiky! Vytvoř <code>kruh_parametr.py</code>. Naprogramuj v něm grafický podprogram, do kterého půjde odeslat parametr <code>r</code> (poloměr).</p>
          <PythonSnippet code={`def kruh(r):\n    canvas.create_oval(200-r, 150-r, 200+r, 150+r)`} />
          <p>Zkus ho následně otestovat tak, že do něj třikrát pod sebe pošleš tyto parametry: <code>kruh(10)</code>, <code>kruh(100)</code> a nakonec <code>kruh(50)</code>. Na obrazovce by měl vzniknout perfektní trojitý terč, aniž bys musel pro každý kruh složitě vypisovat čtyři zdlouhavé souřadnice!</p>
        </TaskCard>

        <TaskCard number="6" title="Náhodné kruhy a parametr" taskId="6" showTeacher={teacherMode} teacherNote={<p>Propojení parametru `r` a náhodnosti <code>randint</code> uvnitř funkce.</p>}>
          <p>A teď tu tvoji geniální zbraň <code>kruh(r)</code> propojíme s náhodností! Vytvoř kopii kódu jako <code>nahodny_kruh.py</code>.</p>
          <p>Uvnitř tvojí funkce před vykreslením vylosuj (přes <code>randint</code>) a ulož do proměnných nějaké náhodné <code>x</code> a <code>y</code>. Následně z těchto x,y a přijatého parametru <code>r</code> spočítej přes <code>create_oval</code> pozici kruhu (bude to červený kruh). Takže teď funkce pošle libovolně velký kruh na libovolnou pozici obrazovky!</p>
          <p className="mt-2 text-emerald-700 font-bold">Mocná past: Poslání proměnné z cyklu jako parametr!</p>
          <p className="text-sm">Co se stane, když teď pustíš cyklus z <code>i</code> desetkrát a pošleš jako poloměr do té funkce rovnou samo <code>i</code> (<code>nahodny_kruh(i)</code>)? A co kdybys tam udělal rovnou matematiku uvnitř závorky: <code>nahodny_kruh(i + 5)</code>?</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Oval key={i} x1={Math.floor(Math.random() * 250)} y1={Math.floor(Math.random() * 150)} width={(i+5)*2} height={(i+5)*2} fill="red" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="7" title="Hra: Myslím si číslo" taskId="7" showTeacher={teacherMode} teacherNote={<p>Interaktivní hra. Globální proměnná cislo vs. parametr <code>n</code>, a podmínka if uvnitř funkce zkus().</p>}>
          <p>Znáš hru Myslím si číslo? Vytvoříme rovnou celou interaktivní PC hru, pomocí <code>def</code>!</p>
          <p>Vytvoř program <code>uhadni_cislo.py</code>. Po spuštění ihned (ještě nad funkcemi!) do proměnné <code>cislo</code> vylosuj přes <code>random</code> číslo od 1 do 5. Pak udělej tisk printem: "Myslím si číslo, zkus ho uhodnout!".</p>
          <p>Pak definuj funkci <code>zkus(n)</code> (její parametr <code>n</code> je ten tvůj tip z klávesnice!). Uvnitř vlož podmínku IF a ELSE, která porovná parametr <code>n</code> s vylosovaným <code>cislo</code>. Když to trefíš, vytiskni "Hurá!", jinak napiš "Ne, moje číslo je jiné...".</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl mt-4 leading-relaxed">
            Myslím si číslo od 1 do 5. Zkus ho uhádnout...<br/>
            <span className="text-white">{">>>"}</span> zkus(3)<br/>
            Ne, moje číslo je jiné...<br/>
            <span className="text-white">{">>>"}</span> zkus(5)<br/>
            Hurá, uhádl jsi!
          </div>
        </TaskCard>

        <TaskCard number="8*" title="Chytrá nápověda" taskId="8" showTeacher={teacherMode} teacherNote={<p>Doplnění <code>if n &lt; cislo:</code>. Vyžaduje vnořený if pro ty experty.</p>}>
          <p className="flex items-center gap-2 font-bold text-emerald-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>To tvoje hádání naslepo je nuda. Uprav funkci <code>zkus(n)</code>, a do <code>else</code> větve (když jsi to netrefil) tajně vnoř další úplně nový IF a ELSE!</p>
          <p>Nyní, když to neuhodneš, nová podmínka ještě prozkoumá, jestli tvůj parametr <code>n</code> byl MĚNŠÍ, než vylosované <code>cislo</code>. Pokud ano, tak ti místo pouhého "Netrefil" chytře napoví: "Ne, moje číslo je větší!". Jinak ti napoví, že je její číslo menší.</p>
        </TaskCard>

        <TaskCard number="9*" title="Experiment: Kostky a Pravděpodobnost" taskId="9" showTeacher={teacherMode} teacherNote={<p>Příklad matematického modelování. Program hází 10x, pak 1000x atd. a počítá frekvenci šestek oproti parametru <code>n</code>.</p>}>
          <p className="flex items-center gap-2 font-bold text-emerald-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Vytvoř program <code>stesti.py</code> s funkcí <code>stesti(n)</code>. Parametr <code>n</code> je počet hodů kostkou v experimentu.</p>
          <p>Funkce vynuluje nějaké počítadlo, a pak udělá <code>for</code> cyklus, který se zopakuje tolikrát, kolik sis poslal v parametru <code>n</code>. Uvnitř si kostka hodí, a pokud padne 6, přidá bod.</p>
          <p>Nakonec funkce vytiskne (přes lomítko!): "Pravděpodobnost padnutí šestky je:" <code>pocet / n</code>.</p>
          <p>Zavolej ji pod sebe: <code>stesti(10)</code>, pak <code>stesti(100)</code> a nakonec zkus extrém <code>stesti(100000)</code>! Co vidíš u obřích čísel? Jak se to matematicky srovná?</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonFunctionsArgsChapter;
