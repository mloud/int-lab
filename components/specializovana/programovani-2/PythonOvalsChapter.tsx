'use client';
import React from 'react';
import { GraduationCap, Circle, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'teal',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py14', id),
});


interface PythonOvalsChapterProps {
  onBack: () => void;
}

const Oval = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'} rounded-[50%]`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
);

const PythonOvalsChapter: React.FC<PythonOvalsChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Elipsy a kruhy"
      subtitle="Kreslení oblin, sněhuláků a dopravních značek (iMyšlení Lekce 14)"
      icon={<Circle className="w-8 h-8 text-teal-600" />}
      onBack={onBack}
      accentColor="teal"
      tabs={[{ id: 'lekce', label: 'Lekce 14', icon: Code }]}
    >
      <TeacherPinBar tone="teal" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-teal-900 text-lg mb-2">Instrukce</h2>
          <p className="text-teal-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Doposud jsme kreslili jen ostré a hranaté tvary. Ale co když chceme nakreslit slunce, míč nebo dopravní značku? Dnes vyměníme náš známý příkaz <code>create_rectangle</code> za zbrusu nový příkaz <code>create_oval</code>, který umí vyčarovat úžasné elipsy a kružnice!
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Součet 0..99" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha slouží k zopakování "akumulátoru" z minulé lekce bez grafiky. Žáci udělají <code>soucet = 0</code> a v cyklu od 0 do 99 (<code>for i in range(100)</code>) dají <code>soucet = soucet + i</code>. Nakonec jedním printem součet vypíší. Správný výsledek je 4950.</p>}>
          <p>Napiš program <code>soucet_99.py</code>, který pomocí cyklu zjistí (a na úplném konci jediným příkazem <code>print</code> vypíše), jaký je celkový matematický součet všech čísel od 0 až do 99! Tedy 0 + 1 + 2 + ... + 99.</p>
          <p className="text-sm italic">Tip: Založ si na začátku programu mimo cyklus proměnnou <code>soucet = 0</code> a do ní pak celou dobu krůček po krůčku v cyklu přičítej nová čísla (tak jako jsme minule sčítali pšeničná zrna)!</p>
        </TaskCard>

        <TaskCard number="2" title="Moje první elipsa" taskId="2" showTeacher={teacherMode} teacherNote={<p>Úvod k příkazu <code>create_oval</code>. Očekává se jen opis a spuštění kódu.</p>}>
          <p>V jazyce Python kreslíme obliny pomocí příkazu <code>create_oval</code>. Vytvoř nový program <code>elipsa.py</code> a zapiš do něj tento kód:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ncanvas.create_oval(10, 10, 200, 150)`} />
          <p>Vyzkoušej, co program nakreslí na obrazovku!</p>
          <CanvasPreview width={300} height={200} className="border-none shadow-none bg-white">
            <Oval x1={50} y1={25} width={200} height={150} fill="transparent" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="Tajemství tvarů" taskId="3" showTeacher={teacherMode} teacherNote={<p>Fantastická úloha na pochopení souřadnic. Žáci zjistí, že elipsa je vždy <strong>vepsaná</strong> do pomyslného obdélníku. Její vrcholy (x1,y1 a x2,y2) nedefinují okraje kulatého tvaru, ale okraje právě toho pravoúhlého "mantinelu", který ji ohraničuje!</p>}>
          <p>Přidej na úplný konec předchozího programu příkaz pro kreslení obyčejného obdélníku (<code>create_rectangle</code>) a dej do něj naprosto stejná 4 čísla (souřadnice), jaká jsi použil u té elipsy nad ním!</p>
          <p className="font-bold text-teal-700">Před spuštěním hádej: Jaká bude vzájemná pozice té elipsy a tohoto obdélníku, když mají do puntíku stejné souřadnice?</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={50} y1={25} width={200} height={150} fill="transparent" />
            <Oval x1={50} y1={25} width={200} height={150} fill="transparent" />
          </CanvasPreview>
          <p className="text-sm mt-2">Teď už víš, jak se v Pythonu kreslí kulaté věci: Počítač si ve skutečnosti vždy tajně narýsuje neviditelný obdélník a pak do něj tvoji elipsu natěsno "vepíše", aby se dotýkala všech jeho čtyř stěn!</p>
        </TaskCard>

        <TaskCard number="4" title="Věž z obdélníků" taskId="4" showTeacher={teacherMode} teacherNote={<p>Žáci nejdříve musí obdélníky propočítat. Pokud znají horní rohy (např. <code>170,50</code>) a ví, že výška se dopočítá z Y vrcholu toho pod ním (první obdélník dosahuje do Y=90 dalšího obdélníku). Pak z x a šířky symetrie dopočítají zbytek. Tohle je hrubá příprava pro kreslení sněhuláka.</p>}>
          <p>Pomocí čtverců/obdélníků je možné nakreslit věž z kostek. Vytvoř program <code>vez.py</code> a nakresli tyto tři boxy na sobě.</p>
          <p>Pozor! Na obrázku je u každého boxu jen nápověda, kde leží jeho <strong>levý horní a pravý dolní roh</strong>, ale chybí některá čísla, která si z obrázku musíš logicky odvodit!</p>
          <CanvasPreview width={300} height={260} className="border-4 border-slate-700 border-none bg-white">
            <Rect x1={130} y1={20} width={40} height={40} fill="transparent" />
            <div className="absolute text-[10px] text-slate-500" style={{ left: 130, top: 20, transform: 'translate(-110%, -50%)' }}>[170, 50]</div>
            
            <Rect x1={120} y1={60} width={60} height={60} fill="transparent" />
            <div className="absolute text-[10px] text-slate-500" style={{ left: 120, top: 60, transform: 'translate(-110%, -50%)' }}>[160, 90]</div>
            
            <Rect x1={110} y1={120} width={80} height={80} fill="transparent" />
            <div className="absolute text-[10px] text-slate-500" style={{ left: 110, top: 120, transform: 'translate(-110%, -50%)' }}>[150, 150]</div>
            <div className="absolute text-[10px] text-slate-500" style={{ left: 190, top: 200, transform: 'translate(10%, 50%)' }}>[230, 230]</div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="Sněhulák" taskId="5" showTeacher={teacherMode} teacherNote={<p>Úžasný Aha-efekt. Stačí v předchozím kódu ve třech slovech přepsat <code>rectangle</code> na <code>oval</code> a protože jsou souřadnice stejné (čtvercové boxy tvoří dokonalé hranice), počítač do nich vepíše dokonalé kruhy = sněhuláka!</p>}>
          <p>Diskutuj se sousedem: Jak bychom dokázali nakreslit dokonalý kruh? (Vždyť příkaz je přece jen na šišaté "elipsy" a dáváme do něj rozměry pro obdélníky!)</p>
          <p className="font-bold text-teal-700 mt-2">Pak vezmi program z minulé úlohy s věží z krabic, a změň v něm pouze slovo `rectangle` na slovo `oval`. Spusť ho a nech se překvapit! Z hranatých krabic se najednou vyloupne dokonalý sněhulák!</p>
          <CanvasPreview width={300} height={260} className="border-4 border-slate-700 border-none bg-white">
            <Oval x1={130} y1={20} width={40} height={40} fill="transparent" />
            <Oval x1={120} y1={60} width={60} height={60} fill="transparent" />
            <Oval x1={110} y1={120} width={80} height={80} fill="transparent" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="Návštěva z vesmíru" taskId="6" showTeacher={teacherMode} teacherNote={<p>Otestování vyplňování kruhů <code>fill='barva'</code>.</p>}>
          <p>Napiš program <code>ufo.py</code>, který pomocí alespoň pěti barevných elips položených přes sebe nakreslí létající talíř UFO! Rozměry i barvy zvol dle svého uvážení.</p>
          <p className="text-sm text-slate-500">Barevné elipsy se obarvují úplně stejně jako obdélníky, tedy parametrem <code>fill</code>: <code>canvas.create_oval(..., fill='barva')</code></p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={110} y1={40} width={80} height={100} fill="darkgray" />
            <Oval x1={50} y1={100} width={200} height={60} fill="gray" />
            <Oval x1={80} y1={120} width={20} height={20} fill="skyblue" />
            <Oval x1={140} y1={120} width={20} height={20} fill="yellow" />
            <Oval x1={200} y1={120} width={20} height={20} fill="lime" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="7" title="Výsadba stromu" taskId="7" showTeacher={teacherMode} teacherNote={<p>Úloha kombinuje přesný obdélník (kmen) a elipsu (korunu). Žáci musí zafixovat souřadnice pomocí <code>x</code> a <code>y</code>. Pokud koruna začíná o 100 nad kmenem, bude např. y-100 pro Y-horní atd.</p>}>
          <p>Vytvoř program <code>strom.py</code> a v něm podprogram <code>strom()</code>, který do proměnných <code>x</code> a <code>y</code> přiřadí pevná čísla (třeba 150 a 100) a pomocí nich nakreslí krásný jehličnatý strom.</p>
          <p>Proměnné x, y musí představovat <strong>souřadnici středu té vrchní strany pařezu</strong>! Korunu nakresli jako zelenou elipsu (vysokou třeba 100), a kmen jako úzký hnědý obdélník směrem dolů.</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={145} y1={100} width={10} height={50} fill="saddlebrown" />
            <Oval x1={120} y1={10} width={60} height={100} fill="green" />
            <div className="absolute text-blue-500 text-lg font-bold" style={{ left: 150, top: 100, transform: 'translate(-50%, -50%)' }}>×</div>
            <div className="absolute text-blue-500 text-sm font-sans font-bold" style={{ left: 165, top: 100, transform: 'translate(0%, -50%)' }}>x, y</div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="Celý les" taskId="8" showTeacher={teacherMode} teacherNote={<p>Úprava spočívá v dosazení <code>random.randint()</code> do proměnných <code>x</code> a <code>y</code> přímo uvnitř podprogramu, a zavolání 10x přes for cyklus. Vznikne hustý les.</p>}>
          <p>Uprav předchozí program tak, abys vyčaroval obrovský les. Stačí v podprogramu u tvého stromu vyměnit pevně zadaná čísla u X a Y za losování přes náhodná čísla <code>randint</code>! A poté celý tvůj podprogram <code>strom()</code> prostě venku zavolej desetkrát za sebou v cyklu!</p>
        </TaskCard>

        <TaskCard number="9" title="Dopravní značka" taskId="9" showTeacher={teacherMode} teacherNote={<p>Návod, jak kreslit "kruh", když víme poloměr a střed. Pokud je střed 200, 100 a poloměr 45, okraje boxu jsou 200-45, 100-45, 200+45, 100+45. Červený kruh je velký, bílý do něj kreslený přes něj poloměrem 35.</p>}>
          <p>Diskutuj se sousedem: Jak přesně počítači nakreslit kruh, když znáš jen <strong>jeho střed a poloměr</strong> (tak, jak se to učíte v geometrii z kružítka)? Vždyť počítač vždycky vyžaduje souřadnice dvou protilehlých rohů krabice!</p>
          <p>Zkus na to přijít a vytvoř program <code>znacka.py</code>, který pomocí odčítání a přičítání poloměru nakreslí dopravní značku "Zákaz vjezdu"! Bude mít střed přesně v bodě [150, 100]. Velký červený kruh bude mít poloměr 45, a do něj vykresli menší bílý s poloměrem 35.</p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={150-45} y1={100-45} width={90} height={90} fill="red" noBorder />
            <Oval x1={150-35} y1={100-35} width={70} height={70} fill="white" noBorder />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10" title="Průjezd zakázán" taskId="10" showTeacher={teacherMode} teacherNote={<p>Do programu žáci prostě jen doplní další dva příkazy <code>create_text</code> (s textem PRŮJEZD a pod ním ZAKÁZÁN), oba vycentrované kolem x=200 a rozesazené na y-ose.</p>}>
          <p>Uprav předchozí program tak, aby ze "Zákazu vjezdu" udělal ještě mnohem přísnější "Průjezd zakázán" (viz obrázek). Od předchozí značky se liší jen tím, že doprostřed bílého kruhu vypíšeš (do dvou řádků pod sebe) tento text.</p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={150-45} y1={100-45} width={90} height={90} fill="red" noBorder />
            <Oval x1={150-35} y1={100-35} width={70} height={70} fill="white" noBorder />
            <div className="absolute font-sans font-bold text-[8px] flex flex-col items-center justify-center leading-tight" style={{ left: 150, top: 100, transform: 'translate(-50%, -50%)' }}>
              <span>PRŮJEZD</span>
              <span>ZAKÁZÁN</span>
            </div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11*" title="Zpráva od mimozemšťanů" taskId="11" showTeacher={teacherMode} teacherNote={<p>Geniální úloha kombinující grid systém, posuny, náhodné poloměry (a, b) a smyčky. Pokaždé vygenerují náhodný střed jako u QR kódu (násobek 20), ale namísto čtverce tam dají <code>create_oval(x-a/2, y-b/2, x+a/2, y+b/2)</code>, kde a a b jsou velikosti.</p>}>
          <p className="flex items-center gap-2 font-bold text-teal-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Mimozemšťané nám poslali zprávu z 256 divných elips! Napiš program <code>ufo_zprava.py</code>, který takovou (byť pro nás naprosto náhodnou) zprávu dovede generovat.</p>
          <p>Všechny ty ošklivé elipsy musí ale přesně zapadnout do neviditelné "šachovnicové mřížky", kde má každá buňka velikost přesně 20x20. Pomůžeš si tím, že do os <code>X</code> a <code>Y</code> budeš generovat náhodná čísla jako "pořadové číslo buňky" a to pak chytře vynásobíš dvacítkou, abys dostal <strong>přesný střed buňky</strong>.</p>
          <p>Zároveň si musíš vylosovat náhodnou výšku a šířku elipsy a od tohoto středu se u každé elipsy posouvat doleva/doprava o "polovinu" těchto velikostí, aby elipsy vždy přesně trčely ze středu buňky! Tohle už je čistá středoškolská matematika!</p>
          <CanvasPreview width={300} height={200} className="border border-slate-400 bg-white">
            <div className="absolute inset-0 p-[10px]">
              {Array.from({ length: 150 }).map((_, i) => {
                const x = (Math.floor(Math.random() * 14) + 1) * 20 - 10;
                const y = (Math.floor(Math.random() * 9) + 1) * 20 - 10;
                const a = Math.floor(Math.random() * 16) + 4;
                const b = Math.floor(Math.random() * 16) + 4;
                return <Oval key={i} x1={x - a/2} y1={y - b/2} width={a} height={b} fill="transparent" />;
              })}
            </div>
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonOvalsChapter;
