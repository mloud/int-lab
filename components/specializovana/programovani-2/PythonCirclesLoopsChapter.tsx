'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Target, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonCirclesLoopsChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-yellow-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-yellow-500 mr-2 select-none">{">>>"}</span>
            <span className="text-yellow-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-yellow-600" />
      <span className="font-bold text-yellow-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-yellow-900 leading-relaxed">
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

const Oval = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'} rounded-[50%]`} 
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
  const [done, setDone] = useLocalStorage(`py15-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonCirclesLoopsChapter: React.FC<PythonCirclesLoopsChapterProps> = ({ onBack }) => {
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
      title="Kruhy a cykly"
      subtitle="Geometrie kružnic a náhodný výběr choice (iMyšlení Lekce 15)"
      icon={<Target className="w-8 h-8 text-yellow-600" />}
      onBack={onBack}
      accentColor="yellow"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-yellow-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-yellow-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-yellow-900 text-lg mb-2">Instrukce</h2>
          <p className="text-yellow-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dnes spojíme dvě nejsilnější zbraně programátora: magii <code>for</code> cyklů a kreslení kulatých kružnic! Také se naučíme losovat věci z klobouku pomocí tajného příkazu <code>random.choice</code>.
          </p>
        </div>

        <TaskCard number="1" title="Dvě dotýkající se kružnice" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha slouží k ověření výpočtu středů. Jestliže je bod dotyku <code>[200, 100]</code> a poloměr je 50, pak levý kruh má střed na 150 a pravý na 250. Vzorec je: levý `x-100, y-50, x, y+50` a pravý `x, y-50, x+100, y+50`.</p>}>
          <p>Vytvoř program <code>dve_kruznice.py</code>, který nakreslí přesně dvě kružnice (s poloměrem 50) položené tak, aby se na obrazovce dotýkaly přesně svým okrajem jen v jediném bodě!</p>
          <p>Tento středový bod dotyku si nejprve napevno zapiš do proměnných <code>x</code> a <code>y</code> (třeba <code>x=200, y=100</code>). Pak zkus obě kružnice nakreslit odvozováním od těchto dvou proměnných. Až to dokážeš, zkus <code>x</code> a <code>y</code> změnit na něco jiného – a obě kružnice by se měly najednou přemístit, aniž bys musel přepisovat příkazy pro kreslení!</p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={150-50} y1={100-50} width={100} height={100} fill="transparent" />
            <Oval x1={150+50} y1={100-50} width={100} height={100} fill="transparent" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="Asymetrický dotyk" taskId="2" showTeacher={teacherMode} teacherNote={<p>Zavedení <code>r1</code> a <code>r2</code>. Zde si žáci trénují vzorce s poloměry. Levý: <code>x - 2*r1, y - r1, x, y + r1</code>. Pravý: <code>x, y - r2, x + 2*r2, y + r2</code>. Tento přepis je učí, že všechny rozměry mohou být plně parametrizované z proměnných.</p>}>
          <p>Co kdyby byl každý kruh jinak velký? Uprav předchozí program tak, že si na začátku nadefinuješ poloměry kružnic do proměnných <code>r1</code> a <code>r2</code> (např. <code>r1 = 50</code>, <code>r2 = 25</code>).</p>
          <p>Musíš kompletně překopat odvozování souřadnic tak, aby v příkazech vůbec nebyla vidět čísla (kromě násobení třeba dvojkou <code>2 * r1</code>). Bude program pak fungovat vždy, když zkusíš zvětšit jeden a zmenšit druhý?</p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={150-50} y1={100-50} width={100} height={100} fill="transparent" />
            <Oval x1={150+50} y1={100-25} width={50} height={50} fill="transparent" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="Střelecký terč" taskId="3" showTeacher={teacherMode} teacherNote={<p>Úloha z procvičování cyklů s odvozováním. Lze řešit např. přes odvození z proměnné cyklu <code>r = i * 10 + 10</code>. Všechny kruhy mají střed ve 150, 100.</p>}>
          <p>Napiš program <code>terc.py</code>, který pomocí jediného cyklu a deseti po sobě zvětšovaných kružnic nakreslí takovýto soustředný terč. Nejmenší kružnice uprostřed bude mít poloměr 10, a každá další o 10 více než ta předchozí!</p>
          <p className="text-yellow-700 font-bold mt-2">Dvě možné cesty řešení:</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Buď založíš <code>r = 10</code> před cyklem a v každém kole ho zvětšíš <code>r = r + 10</code>.</li>
            <li>Nebo to budeš matematicky odvozovat rovnou z čísla kroku: <code>r = i * 10 + 10</code>!</li>
          </ul>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Oval key={i} x1={150 - (100 - i * 10)} y1={100 - (100 - i * 10)} width={(100 - i * 10) * 2} height={(100 - i * 10) * 2} fill="transparent" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="4" title="Gramofonová deska" taskId="4" showTeacher={teacherMode} teacherNote={<p>Úprava na mnohem hustější terč, tzv. gramodesku. <code>for i in range(50)</code> a odvození poloměru s menším krokem: <code>r = i * 2 + 20</code> (nebo podobně). Očekáváme od žáků experimentování.</p>}>
          <p>Zkopíruj si kód do nového programu <code>gramofon.py</code>. Nyní nech program v cyklu běžet padesátkrát, ale přičítej o mnohem menší čísla (třeba o dvojku namísto desítky). Snaž se vyladit čísla tak, aby se nakreslila tlustá gramofonová deska s dírkou uprostřed (nejmenší kruh na začátku nemůže být nula, ale třeba 20)!</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 50 }).map((_, i) => (
              <Oval key={i} x1={150 - (i * 1.5 + 15)} y1={100 - (i * 1.5 + 15)} width={(i * 1.5 + 15) * 2} height={(i * 1.5 + 15) * 2} fill="transparent" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="Vybarvování terče" taskId="5" showTeacher={teacherMode} teacherNote={<p>Pokud žák použije <code>fill='white'</code> na kód, kde roste poloměr (r=10..100), stane se mu, že každý další velký kruh VZAPĚTÍ zakryje ty malé (přemaluje je na bílo). Proto budou žáci donuceni přemýšlet a obrátit generování – nejprve největší <code>r=100</code>, pak zmenšovat <code>r = r - 10</code>. Nebo přes vzorec <code>r = 100 - 10 * i</code>.</p>}>
          <p>Vrať se ke klasickému programu s deseti kružnicemi <code>terc.py</code> a přidej dovnitř vybarvení: <code>fill='white'</code>. Spusť to. Zmizely ti všechny čáry a vidíš jen jeden bílý kruh? To proto, že každý nově vygenerovaný VĚTŠÍ bílý kruh nekompromisně překryl a "vylepil" z plátna ten menší kruh pod ním!</p>
          <p className="font-bold text-yellow-700 mt-2">Důležitý úkol: Jak to musíš matematicky otočit (od jakého poloměru <code>r</code> musíš začít a co s ním musíš dělat v každém kole?), aby se ti menší bílé kruhy kreslily AŽ NA TY velké, a vznikly by tak pěkné soustředné prstence?</p>
        </TaskCard>

        <TaskCard number="6" title="Závodní terč" taskId="6" showTeacher={teacherMode} teacherNote={<p>Dva kruhy na jedno kolo cyklu: jeden s `fill='white'` a hned menší `fill='black'`. Cyklus běží 5x místo 10x. Nebo testování liché/sudé, ale to ještě neumí.</p>}>
          <p>Uprav ten předchozí vybarvený, postupně se ZMENŠUJÍCÍ terč tak, aby se po sobě střídaly černé a bílé zóny přesně takhle:</p>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Oval key={i} x1={150 - (100 - i * 10)} y1={100 - (100 - i * 10)} width={(100 - i * 10) * 2} height={(100 - i * 10) * 2} fill={i % 2 === 0 ? "white" : "black"} />
            ))}
          </CanvasPreview>
          <p className="mt-2 text-sm italic">Tip: Budeš to muset vyřešit tak, že v každém kole nakreslíš hned dva zmenšující se kruhy – velký bílý a pod ním s menším poloměrem černý. Tím pádem ti bude stačit jen 5 opakování cyklu (protože v každém kole vyčaruješ dva kruhy)!</p>
        </TaskCard>

        <TaskCard number="7" title="Zlatý řetízek" taskId="7" showTeacher={teacherMode} teacherNote={<p>Triviální úloha pro odlehčení. <code>create_oval</code> posouvaný po ose x, stejně jako dříve obdélníky.</p>}>
          <p>Zkus si na chvilku odpočinout a napsat program <code>retizek.py</code>, který nakreslí do vodorovné lajny vedle sebe řetízek přesně z patnácti zlatých pospojovaných kroužků (podobně jako se tvoří olympijské kruhy)!</p>
          <CanvasPreview width={300} height={100} className="border-none shadow-none bg-white">
            {Array.from({ length: 15 }).map((_, i) => (
              <Oval key={i} x1={30 + i * 16} y1={40} width={20} height={20} fill="gold" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="Mincovna" taskId="8" showTeacher={teacherMode} teacherNote={<p>Podprogram mince() kreslí kruh s výplní a text uvnitř kruhu (vše na stejném středu).</p>}>
          <p>Vytvoř nový program <code>mince.py</code> a v něm podprogram <code>mince()</code>.</p>
          <p>Podprogram si vylosuje náhodnou souřadnici středu <code>[x,y]</code> a následně náhodné číslo od 1 do 5 do proměnné <code>h</code>. Následně tam nakreslí světle šedý kruh (minci) a do jejího centra pak velkým písmem vloží to vymyšlené číslo jako svou hodnotu!</p>
          <p>Zavolej podprogram desetkrát z cyklu, aby se mince rozesypaly na stůl.</p>
        </TaskCard>

        <TaskCard number="9" title="Klobouk jménem CHOICE" taskId="9" showTeacher={teacherMode} teacherNote={<p>Zavedení magického příkazu <code>random.choice([])</code> pro losování z nesouvislé množiny hodnot.</p>}>
          <p>Je na čase naučit se nový magický příkaz Pythonu! Funkce <code>randint(1,5)</code> umí losovat jen souvislá čísla (1,2,3,4,5). Ale co když chceš vypsat skutečné koruny a chceš nechat počítač náhodně tahat jen mince z reálných hodnot jako "desetikorunu" nebo "padesátikorunu"? Nula, trojka nebo čtyřka přece na stůl padnout nesmí!</p>
          <p>Na to použijeme příkaz <code>random.choice()</code> (anglicky "náhodná volba"), kterému předložíme "kloubouk" plný přesných hodnot (oddělených čárkou v hranatých závorkách).</p>
          <PythonSnippet code={`h = random.choice([1, 2, 5, 10, 20, 50])`} />
          <p>Přepiš tuto novou funkci do svých mincí a obdivuj, jak program losuje jen platná česká oběživa!</p>
        </TaskCard>

        <TaskCard number="10*" title="Barvy z klobouku" taskId="10" showTeacher={teacherMode} teacherNote={<p>Aplikace choice na textové řetězce (stringy). <code>random.choice(['silver', 'gold', 'white'])</code>.</p>}>
          <p className="flex items-center gap-2 font-bold text-yellow-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Dokážeš udělat to, aby si tvá mincovna také losovala barvy (zlatá, stříbrná a bronzová)? Stačí do <code>random.choice()</code> nedávat čísla, ale seznam různých stringů s anglickými názvy barev, a proměnnou <code>barva</code> pak narvat do `fill` kružnice!</p>
          <CanvasPreview width={300} height={200}>
            {[
              [50, 40, 5, "silver"], [120, 140, 50, "gold"], [200, 60, 2, "peru"], 
              [230, 150, 10, "silver"], [140, 80, 20, "gold"], [80, 110, 1, "peru"]
            ].map((d, i) => (
              <div key={i} className="absolute border border-black flex items-center justify-center font-bold text-lg rounded-[50%]" style={{ left: d[0], top: d[1], width: 40, height: 40, transform: 'translate(-50%, -50%)', backgroundColor: d[3] as string }}>
                {d[2]}
              </div>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11" title="Rosnička" taskId="11" showTeacher={teacherMode} teacherNote={<p>Úplné odpojení z grafiky do terminálu. Zpráva používá choice na stringy pro zábavný textový generátor.</p>}>
          <p>Na závěr dnešní lekce vytvoř krátký textový program <code>pocasi.py</code>, který bude dělat automatickou (a zcela náhodnou) televizní rosničku!</p>
          <p>Pomocí příkazu print má na obrazovku vypisovat např. <em>Dnes je ošklivý den</em>. Místo slova "ošklivý" však dej proměnnou, do které program přes <code>random.choice</code> vylosuje jednu z těchto možností: <code>'pěkný', 'ošklivý', 'deštivý', 'slunečný'</code>.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonCirclesLoopsChapter;
