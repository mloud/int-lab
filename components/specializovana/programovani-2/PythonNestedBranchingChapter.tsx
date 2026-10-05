'use client';
import React, { useState } from 'react';
import { CheckCircle, GraduationCap, Unlock, Lock, Network, Code } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';

interface PythonNestedBranchingChapterProps {
  onBack: () => void;
}

const PythonSnippet = ({ code }: { code: string }) => (
  <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-pink-400 overflow-x-auto shadow-inner border border-slate-700">
    {code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        {line.startsWith('>>>') ? (
          <>
            <span className="text-pink-500 mr-2 select-none">{">>>"}</span>
            <span className="text-pink-300">{line.substring(3).trim()}</span>
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
  <div className="mt-4 bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-5 h-5 text-pink-600" />
      <span className="font-bold text-pink-800 uppercase tracking-widest text-xs">Metodika pro učitele</span>
    </div>
    <div className="text-sm text-pink-900 leading-relaxed">
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
  const [done, setDone] = useLocalStorage(`py18-task-${taskId}`, false);

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 transition-colors ${done ? 'border-emerald-200 bg-emerald-50/10' : 'border-white'}`}>
      <div className="flex gap-4">
        <div className="shrink-0 w-12 h-12 bg-pink-100 text-pink-700 rounded-2xl flex items-center justify-center font-black text-xl">
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

const PythonNestedBranchingChapter: React.FC<PythonNestedBranchingChapterProps> = ({ onBack }) => {
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
      title="Vnořené větvení"
      subtitle="Podmínky v podmínkách a složité rozhodování (iMyšlení Lekce 18)"
      icon={<Network className="w-8 h-8 text-pink-600" />}
      onBack={onBack}
      accentColor="pink"
      tabs={[{ id: 'lekce', label: 'Lekce', icon: Code }]}
    >
      <div className="flex justify-end mb-6">
        {pinMode ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border-2 border-pink-100">
            <input 
              type="password" 
              placeholder="Zadej PIN" 
              className="px-3 py-1 bg-slate-100 rounded-lg outline-none w-24 text-center font-mono"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitPin()}
              autoFocus
            />
            <button onClick={submitPin} className="bg-pink-600 text-white px-3 py-1 rounded-lg font-bold text-sm">OK</button>
          </div>
        ) : (
          <button 
            onClick={handleToggleTeacher}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border-2 ${
              teacherMode ? 'bg-pink-100 text-pink-700 border-pink-200' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
            }`}
          >
            {teacherMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            Učitelský režim {teacherMode ? 'ZAPNUT' : 'VYPNUT'}
          </button>
        )}
      </div>

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-pink-900 text-lg mb-2">Instrukce</h2>
          <p className="text-pink-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dosud jsme se u počítače ptali vždy jen na jednu jedinou věc (např. "je teplo?"). Ale svět je složitější a my často potřebujeme udělat rozhodnutí, ve kterém je hned několik cest ("Když nemají rohlíky, kup housky, ale POKUD nemají ani ty, tak kup chleba"). Vítá tě vnořené větvení! A taky si ukážeme, že jeden znak "=" v Pythonu neznamená porovnání, ale přiřazení do paměti!
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Absolutní hodnota" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha z minulé lekce na jednoduchý IF. Pokud je číslo a &lt; 0, vynásobí se -1 (nebo se napíše <code>-a</code>), jinak zůstane <code>a</code>. Pokročilí znají rovnou funkci <code>abs(a)</code>.</p>}>
          <p>Napiš program <code>absolutni_hodnota.py</code>, který zobrazí matematickou absolutní hodnotu čísla. (Tedy odstraní z něj záporné znaménko mínus).</p>
          <p>Ulož si do proměnné jakékoliv číslo. Pak zjisti (přes <code>if</code>), jestli je to číslo menší než nula. Pokud je, vypiš jej s plusem (k tomu ti stačí jej v printu poslat rovnou jako <code>-a</code>). Pokud ale menší než nula není, rovnou ho vypiš, protože už kladné je!</p>
        </TaskCard>

        <TaskCard number="2" title="Operátor rovnosti (==)" taskId="2" showTeacher={teacherMode} teacherNote={<p>Úplně nová věc: porovnávací operátory <code>==</code> a <code>!=</code>. Je klíčové vysvětlit rozdíl mezi <code>=</code> (ulož do paměti!) a <code>==</code> (zeptej se, jestli jsou stejné!).</p>}>
          <p>Zatím umíš porovnávat čísla jen pomocí šipek (větší/menší). Ale jak se počítače zeptáš, jestli se dvě hodnoty sobě rovnají?</p>
          <p className="font-bold text-pink-700">Pozor! Znak "=" už máš zabraný pro vkládání věcí do krabiček (proměnných)!</p>
          <p>Když se chceš počítače ZEPTAT na rovnost, musíš použít rovnou dva znaky za sebou: <code>==</code>. A na nerovnost ("není to rovno") se používá znak <code>!=</code>. Vyzkoušej tyto podivné zápisy v dolním terminálu (kde bliká <code>{">>>"}</code>) a sleduj, jak počítač odpovídá True nebo False!</p>
          <ul className="list-disc pl-5 mt-2 space-y-3 font-mono bg-slate-50 p-4 rounded-xl text-sm">
            <li>{">>>"} 1 == 2</li>
            <li>{">>>"} 0 != 2</li>
            <li>{">>>"} 11 * 11 == 121</li>
            <li>{">>>"} 1000 / 10 - 1 != 99</li>
          </ul>
        </TaskCard>

        <TaskCard number="3" title="Ochrana před nulou" taskId="3" showTeacher={teacherMode} teacherNote={<p>Klasické řešení dělení nulou přes IF: <code>if n == 0: print("Nelze") else: print(1 / n)</code>. Toto je takzvaný ochranný kód, který se dělá velmi často.</p>}>
          <p>Víš, co se stane, když se pokusíš počítač přinutit dělit nějaké číslo nulou? Zkus to napsat do terminálu (např. <code>1 / 0</code>). Počítač zpanikaří a zhroutí se na chybu (Zjevně ho to dost bolí: <code>ZeroDivisionError</code>).</p>
          <p>Vytvoř program <code>prevracena_hodnota.py</code>, který spočítá výsledek dělení <code>1 / n</code> (kde <code>n</code> je tvá proměnná).</p>
          <p>ALE ještě předtím, než tento nebezpečný výpočet provedeš, ochraň program pomocí podmínky! <strong>Pokud</strong> <code>n == 0</code> (je to přesně rovno nule), ať počítač nevinně napíše "Nulou dělit neumím" (a výpočet se vůbec neprovede!). JINAK ať to normálně vypočítá.</p>
        </TaskCard>

        <TaskCard number="4" title="Porovnání čísel a útvarů" taskId="4" showTeacher={teacherMode} teacherNote={<p>Úloha kombinuje nové logické operátory a `if / else`. Čtverec má <code>a == b</code>, jinak obdélník (nebo kruh).</p>}>
          <p>Vyber si aspoň jeden z těchto dvou programů a otestuj si to v něm:</p>
          <p className="font-bold mt-4 mb-1">A) Stejná čísla?</p>
          <p className="text-sm">Vytvoř <code>stejna_cisla.py</code>, dej si na začátek do proměnných <code>x</code> a <code>y</code> libovolná dvě čísla a napiš if/else kód, který je dokáže porovnat a vždy správně vypíše hlášku "Čísla jsou stejná" nebo "Čísla jsou různá". Zkusíš na to využít operátor vykřičník-rovná-se (<code>!=</code>)?</p>
          
          <p className="font-bold mt-4 mb-1">B) Obdélník nebo čtverec?</p>
          <p className="text-sm">Vytvoř <code>obdelnik_nebo_ctverec.py</code>. Nadefinuj si v proměnných délky dvou stran (třeba <code>a = 10, b = 20</code>). Pomocí if/else a operátoru <code>==</code> zjisti a vypiš na obrazovku, jestli je takto zadaný útvar obdélník, anebo dokonalý čtverec!</p>
        </TaskCard>

        <TaskCard number="5" title="Sběratelé hodnot" taskId="5" showTeacher={teacherMode} teacherNote={<p>Uvedení počítadla. Na začátku <code>pocet_6 = 0</code>. Pak se to vkládá do ifu uvnitř cyklu: <code>if n == 6: pocet_6 = pocet_6 + 1</code>. Počítadlo si tak celou dobu načítá jedničky za každý úspěch a na konci se printem venku z cyklu vypíše konečné skóre.</p>}>
          <p>Házíme desetkrát po sobě hrací kostkou a chceme přesně vědět, kolikrát nám padla vysněná šestka.</p>
          <p>Vytvoř program <code>pocet_sestek.py</code>. Na jeho úplný začátek (před všechno) vlož počítadlo (tedy speciální proměnnou, kterou nastavíš na nulu <code>pocet_sestek = 0</code>). Pak udělej cyklus desetkrát. V každém kole si vylosuj novou kostku.</p>
          <p>Uvnitř cyklu nahoď podmínku! POKUD padla přesně šestka, vezmi své počítadlo, a přičti k němu jednu (<code>pocet = pocet + 1</code>). Když padne jiné číslo, tak nedělej prostě vůbec nic. Jakmile celý cyklus doběhne, vytiskni printem nasbíranou hodnotu v počítadle!</p>
          <p className="mt-2 text-pink-700 font-bold">Kolikrát ti padne šestka, pokud cyklus natočíš na absurdních 6000 hodů?</p>
        </TaskCard>

        <TaskCard number="6" title="Fotbalový rozhodčí" taskId="6" showTeacher={teacherMode} teacherNote={<p>Zde se vnořuje IF do ELSE bloku. Tím vznikají 3 možné cesty (tzv. switch case). Důrazně hlídejte odsazování žáků!</p>}>
          <p>Fotbaloví rozhodčí stanovili, jak budou hráče hodnotit za přestupky proti pravidlům:</p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>Když se hráč dopustil 0 přestupků, hraje férově,</li>
            <li>Když se dopustil 1 nebo 2 přestupků, dostane žlutou kartu,</li>
            <li>Jinak (3 a více) dostane červenou kartu a je vyloučen ze hry!</li>
          </ul>
          <p>Tohle už obyčejný if/else nezvládne, to má totiž 3 možnosti! Takže do starého <code>else</code> budeš muset tajně vnořit zbrusu nový <code>if</code>! Pozorně si prostuduj odsazení v tomto kódu, je to zlomový okamžik:</p>
          <PythonSnippet code={`pocet = 1\nif pocet == 0:\n    print('Hraješ férově')\nelse:\n    if pocet < 3:\n        print('Máš žlutou kartu')\n    else:\n        print('Máš červenou kartu')`} />
        </TaskCard>

        <TaskCard number="7" title="Soutěž v pečení" taskId="7" showTeacher={teacherMode} teacherNote={<p>Samostatný trénink na vnořený if. (do 10, do 20, víc než 20).</p>}>
          <p>V televizní soutěži o pečení <em>Můj děda peče líp než tvůj</em> jsou následující pravidla:</p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>Když soutěžící stihne upéct <strong>méně než 10 koláčků</strong>, je hodnocen jako začátečník.</li>
            <li>Když stihne upéct <strong>méně než 20 koláčků</strong> (tedy od 10 do 19), je to pokročilý.</li>
            <li>Jinak (od 20 výše) je hodnocen jako mistr a expert.</li>
          </ul>
          <p>Vytvoř program <code>kolacky.py</code>, ve kterém bude proměnná s počtem upečených koláčků, a podle těchto 3 možností se to rozvětví jako u fotbalu na výpis "Začátečník", "Pokročilý" nebo "Expert"!</p>
        </TaskCard>

        <TaskCard number="8" title="Zrádné skloňování" taskId="8" showTeacher={teacherMode} teacherNote={<p>Stejný princip. Na ukázku Pythoní zkratky <code>elif</code> můžeme představit konstrukci: <code>if n==1: ... elif n&lt;5: ... else: ...</code>.</p>}>
          <p>Zkusil sis někdy psát aplikaci s počítáním pro Český jazyk? Máme šílené skloňování! Počítač přece nemůže napsat "Padla 5 šestka." Jaké jsou vlastně naše pravidla pro skloňování? Pro číslo jedna říkáme "šestka", pro 2-4 říkáme "šestky", a od 5 nahoru to jsou "šestek". To jsou 3 možnosti!</p>
          <p>Vytvoř program <code>sklonovani.py</code> s proměnnou a použij tvoji novou tajnou zbraň <strong>vnořený if do else bloku</strong>, aby program vždy napsal gramaticky dokonalou zprávu (padla 1 šestka / padly 3 šestky / padlo 6 šestek).</p>
        </TaskCard>

        <TaskCard number="9" title="Německá vlajka (3 pásy)" taskId="9" showTeacher={teacherMode} teacherNote={<p>Vnořený if/else určující barvy bodů do Canvasu! Osa y=90 a y=170 rozděluje plátno na třetiny. Zde se vykreslí tisíce kroužků a vznikne hrubá bitmapová verze vlajky.</p>}>
          <p>A teď tu logiku tří možností (vnořeného ifu) narveme do grafiky! Vytvoř program <code>nemecka_vlajka.py</code>.</p>
          <p>Budeš kreslit na plátno německou vlajku. Tu budeš vytvářet tak, že pomocí cyklu vygeneruješ <strong>10 000krát</strong> na plátně malinký barevný kroužek s poloměrem 5 na naprosto náhodných souřadnicích. Jak se z toho rozsypaného čaje stane vlajka?</p>
          <p className="mt-2 font-bold text-pink-700">Barvu kroužku (parametr <code>fill</code>) zvolíš logicky podle Y-ové souřadnice (jak moc vysoko ten bod vyletěl):</p>
          <ul className="list-disc pl-5 mb-2 space-y-1 text-sm">
            <li>Když daný bod leží do y=90 (horní pruh), nakresli ho jako černý kroužek.</li>
            <li>Jinak, když daný bod leží do y=170 (prostřední pruh), nakresli ho červeně.</li>
            <li>Jinak (leží úplně dole) ho nakresli čistě žlutě!</li>
          </ul>
          <CanvasPreview width={300} height={200} className="bg-slate-50 border border-slate-300">
            <div className="absolute inset-0 p-[2px]">
              {Array.from({ length: 450 }).map((_, i) => {
                const x = Math.floor(Math.random() * 296);
                const y = Math.floor(Math.random() * 196);
                let color = "yellow";
                if (y < 65) color = "black";
                else if (y < 130) color = "red";
                return <Oval key={i} x1={x} y1={y} width={5} height={5} fill={color} noBorder />;
              })}
            </div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10*" title="Česká vlajka" taskId="10" showTeacher={teacherMode} teacherNote={<p>Česká vlajka (dvě poloviny přes osu a modrý klín) vyžaduje hardcore matematiku na odvození klínu (šikmé funkce y = x apod.). Tady si to žáci potrénují, jestli vůbec rozumně dají obří podmínky: <code>if y &lt; 130: if x &lt; y: modrý else: bílý...</code> a pak druhá půlka. Kdo to dá, pochopil vše!</p>}>
          <p className="flex items-center gap-2 font-bold text-pink-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Německá vlajka je jenom o horizontálních pruzích, takže stačí kontrolovat souřadnici "y". Ale co vlajka Česká? Ta má horizontální dělení vpravo, a do toho se motá zkosený modrý klín pro horní i dolní část vlajky!</p>
          <p>Pokus se to naprogramovat. Tohle už je hardcore matematika (Budeš se u toho muset ptát počítače na otázky typu: "Když je ypsilon dole a když je x dokonce menší než y, tak ho teprve nabarvi namodro...") Kdo to vyřeší přes tisíc rozsypaných teček, je rozený programátor algoritmů a počítačových her.</p>
          <CanvasPreview width={300} height={200} className="bg-slate-50 border border-slate-300">
            <div className="absolute inset-0 p-[2px]">
              {Array.from({ length: 500 }).map((_, i) => {
                const x = Math.floor(Math.random() * 296);
                const y = Math.floor(Math.random() * 196);
                let color = "red";
                if (y < 100) {
                  if (x < y) color = "blue";
                  else color = "white";
                } else {
                  if (x < (200 - y)) color = "blue";
                  else color = "red";
                }
                return <Oval key={i} x1={x} y1={y} width={5} height={5} fill={color} noBorder />;
              })}
            </div>
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonNestedBranchingChapter;
