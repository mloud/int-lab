'use client';
import React from 'react';
import { Type, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'cyan',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py10', id),
});


interface PythonTextChapterProps {
  onBack: () => void;
}

const PythonTextChapter: React.FC<PythonTextChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Kreslení textu"
      subtitle="Vypisování slov na grafickou plochu a popisky obrazců (iMyšlení Lekce 10)"
      icon={<Type className="w-8 h-8 text-cyan-600" />}
      onBack={onBack}
      accentColor="cyan"
      tabs={[{ id: 'lekce', label: 'Lekce 10', icon: Code }]}
    >
      <TeacherPinBar tone="cyan" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-cyan-900 text-lg mb-2">Instrukce</h2>
          <p className="text-cyan-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Doposud jsme text vypisovali pomocí příkazu <code>print()</code> dolů do černého terminálu. Ale co když chceme napsat text přímo do naší bílé grafické plochy, např. pojmenovat tlačítko nebo nakreslit štítek se jménem? Na to slouží nový příkaz <code>canvas.create_text()</code>!
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Aprílové nákupy" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha pro zopakování textového režimu, losování čísel a vytváření podprogramu. Řešením jsou 3 proměnné <code>a, b, c</code>, kterým se přiřadí <code>random.randint(100, 300)</code> a na konci se sečtou: <code>a + b + c</code> v printu.</p>}>
          <p>Na 1. dubna jsme šli do tří obchodů, kde měli prodavači rozvernou náladu. Každý prodavač chtěl za nákup zaplatit náhodnou sumu peněz z intervalu od 100 do 300 korun.</p>
          <p>Napiš program <code>nakupy.py</code> a v něm podprogram <code>nakupy()</code>, který vygeneruje tři náhodné sumy, vypíše je a na závěr vypíše i jejich součet. Výpis může vypadat například takto:</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Tvůj první nákup stál 190 korun<br/>
            Tvůj druhý nákup stál 299 korun<br/>
            Tvůj třetí nákup stál 111 korun<br/>
            Celkem jsi zaplatil 600 korun
          </div>
        </TaskCard>

        <TaskCard number="2" title="Opakování: Balíky" taskId="2" showTeacher={teacherMode} teacherNote={<p>Zde už řešíme grafiku. Levý dolní vrchol prvního balíku je pevný, třeba na y=250. Výška se mění (náhodná od 10 do 200). Takže y1 je <code>250 - v1</code>.</p>}>
          <p>Přišly nám tři balíky obdélníkových tvarů. Balíky jsme položili na stůl vedle sebe. Šířka každého z nich je pevná (100) a výška je náhodné číslo od 10 do 200.</p>
          <p>Napiš program <code>baliky.py</code>, který je nakreslí třemi různými barvami vedle sebe, aby stály na jedné společné čáře.</p>
          <CanvasPreview width={300} height={200}>
            <div className="absolute left-0 right-0 bottom-0 top-[180px] bg-slate-100 border-t border-black"></div>
            <Rect x1={0} y1={180 - 80} width={100} height={80} fill="limegreen" />
            <Rect x1={100} y1={180 - 150} width={100} height={150} fill="tomato" />
            <Rect x1={200} y1={180 - 20} width={100} height={20} fill="skyblue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="První text v grafice" taskId="3" showTeacher={teacherMode} teacherNote={<p>Základní zavedení příkazu <code>create_text</code>. Upozorněte žáky, že souřadnice udávají <strong>střed textu</strong>, nikoliv jeho levý horní roh jako u obdélníků.</p>}>
          <p>Když chceš do grafické plochy psát texty, musíš se naučit nový příkaz. Vytvoř program <code>text_grafika.py</code> a zapiš do něj tento kód:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ncanvas.create_text(150, 50, text='posílám pozdrav z grafické plochy')`} />
          <p>Jak jsi určitě pochopil(a), vypsání textu zajišťuje příkaz <code>canvas.create_text</code>. Souřadnice v tomto příkazu určují <strong>přibližný střed vypisovaného textu</strong>.</p>
        </TaskCard>

        <TaskCard number="4" title="Pojmenování okrajů" taskId="4" showTeacher={teacherMode} teacherNote={<p>Úloha zkouší, zda žáci umí přibližně odhadnout velikost canvasu a nakreslit 4 různé texty do čtyř různých stran obrazovky.</p>}>
          <p>Vytvoř program <code>pojmenuj_okraje.py</code> a napiš do něj příkazy, kterými pojmenuješ okraje grafické plochy. Souřadnice musíš pro svůj konkrétní počítač odhadnout zkusmo!</p>
          <CanvasPreview width={300} height={200} className="rounded-xl border-4 border-slate-400">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-sans text-rose-800">Horní okraj</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-sans text-rose-800">Dolní okraj</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-sans text-indigo-800">Levý okraj</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-sans text-indigo-800">Pravý okraj</div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="Vrcholy obdélníku" taskId="5" showTeacher={teacherMode} teacherNote={<p>Text se vykreslí přesně do zadaných souřadnic obdélníku: A do levo-dolního, B do pravo-dolního atd. Upozorněte, že text se překrývá s čárou obdélníku (je položen svým středem přímo na hranu). Řešení např. <code>canvas.create_text(x1, y2, text='A')</code></p>}>
          <p>Vytvoř program <code>vrcholy_obdelniku.py</code> a do čtyř proměnných <code>x1, y1, x2, y2</code> přiřaď souřadnice dvou protilehlých vrcholů obdélníku (např. 100, 50, 230, 150).</p>
          <p>Nakresli obdélník z těchto proměnných. A poté pomocí nového příkazu pro text označ tyto čtyři rohy obdélníku písmeny A, B, C a D. Všimni si, že když napíšeš do textu úplně stejné proměnné jako do obdélníku, písmenko leží přesně na jeho hraně!</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={80} y1={50} width={140} height={100} fill="transparent" />
            <div className="absolute" style={{ left: 80, top: 150, transform: 'translate(-50%, -50%)' }}>A</div>
            <div className="absolute" style={{ left: 220, top: 150, transform: 'translate(-50%, -50%)' }}>B</div>
            <div className="absolute" style={{ left: 220, top: 50, transform: 'translate(-50%, -50%)' }}>C</div>
            <div className="absolute" style={{ left: 80, top: 50, transform: 'translate(-50%, -50%)' }}>D</div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="Posunutí vrcholů" taskId="6" showTeacher={teacherMode} teacherNote={<p>Tady už žáci musí upravit souřadnice matematicky: <code>x1 - 10, y2 + 10</code> pro A a tak dále. Text už tak nebude zasahovat do obrysu obdélníku.</p>}>
          <p>Uprav příkazy pro psaní textů z minulé úlohy tak, aby písmenka "poodstoupila" kousek ven od obdélníku a nepřekrývala se s jeho hranou. Musíš k proměnným ve vypsání textu chytře přičíst nebo odečíst nějaká menší čísla (např. 10)!</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={80} y1={50} width={140} height={100} fill="transparent" />
            <div className="absolute text-slate-500 text-xs" style={{ left: 80-10, top: 150+10, transform: 'translate(-50%, -50%)' }}>A</div>
            <div className="absolute text-slate-500 text-xs" style={{ left: 220+10, top: 150+10, transform: 'translate(-50%, -50%)' }}>B</div>
            <div className="absolute text-slate-500 text-xs" style={{ left: 220+10, top: 50-10, transform: 'translate(-50%, -50%)' }}>C</div>
            <div className="absolute text-slate-500 text-xs" style={{ left: 80-10, top: 50-10, transform: 'translate(-50%, -50%)' }}>D</div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="7" title="Písnička" taskId="7" showTeacher={teacherMode} teacherNote={<p>Dobře demonstruje zarovnání na střed (texty leží nad sebou). Důležité je ukázat záludnost anglického apostrofu: <code>text="podalas' mně k pití"</code> (použít jiný typ uvozovek vně) nebo escape znak <code>\'</code>.</p>}>
          <p>Vytvoř program <code>pisnicka.py</code>, ve kterém do grafické plochy vypíšeš 6 řádků své oblíbené písničky. Co třeba nějakou lidovku?</p>
          <CanvasPreview width={300} height={200}>
            <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-slate-800 space-y-1">
              <p>Sbohem, galánečko, já už musím jí-ti</p>
              <p>Sbohem, galánečko, já už musím jí-ti</p>
              <p>Kyselé vínečko, kyselé vínečko</p>
              <p>podalas' mně k pití</p>
              <p>Kyselé vínečko, kyselé vínečko</p>
              <p>podalas' mně k pití</p>
            </div>
          </CanvasPreview>
          <p className="text-cyan-700 font-bold mt-4">Pozor: Jak se počítači vysvětluje znak apostrof (podalas'), aby si nemyslel, že mu tím končí text? (Tip: Použij uvnitř jednoduchý apostrof, ale kód celého textu obal dvojitými uvozovkami <code>text="..."</code>!)</p>
        </TaskCard>

        <TaskCard number="8" title="Můj štítek" taskId="8" showTeacher={teacherMode} teacherNote={<p>Úloha kombinuje obdélník a text na stejných souřadnicích. Obdélník se kreslí: <code>x-25, y-10, x+25, y+10</code>, a text přímo na <code>x, y</code>. <strong>Text se vždy kreslí až po obdélníku</strong>, jinak by jej bílá výplň překryla!</p>}>
          <p>Vytvoř nový program <code>stitek.py</code>, v němž navrhneš svůj vlastní štítek.</p>
          <p>Do proměnných <code>x, y</code> přiřaď souřadnice budoucího středu. Potom nakresli bílý obdélník o šířce zhruba 50 a do jeho středu napiš (své) jméno. Budeš k tomu obdélníku muset šikovně vypočítat vrcholy odečítáním od toho tvého středu!</p>
          <CanvasPreview width={300} height={200}>
            <div className="absolute border border-black bg-white shadow-sm flex items-center justify-center text-xs" style={{ left: 150, top: 100, width: 60, height: 24, transform: 'translate(-50%, -50%)' }}>
              Vašek
            </div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="9" title="Létající štítky" taskId="9" showTeacher={teacherMode} teacherNote={<p>Tvorba podprogramu <code>def stitek():</code>, uvnitř kterého se do x a y vloží náhodná souřadnice z randint. Volání podprogramu pak štítek náhodně rozhází po obrazovce.</p>}>
          <p>Z kreslení tvého štítku (obou příkazů: pro obdélník i text) vyrob podprogram nazvaný <code>stitek()</code>.</p>
          <p>Na začátek podprogramu dopiš losování náhodných souřadnic pro střed štítku (do <code>x</code> a <code>y</code>). A nakonec ten svůj nový podprogram na úplném konci souboru prostě zavolej 10x pod sebou!</p>
          <CanvasPreview width={300} height={200}>
            {[
              [50, 40], [120, 60], [200, 30], [250, 150], [80, 120], 
              [160, 100], [140, 160], [220, 80], [60, 170], [180, 140]
            ].map((pos, i) => (
              <div key={i} className="absolute border border-black bg-white shadow-sm flex items-center justify-center text-[9px]" style={{ left: pos[0], top: pos[1], width: 40, height: 16, transform: 'translate(-50%, -50%)' }}>
                Vašek
              </div>
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10" title="Věštba" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešením je věta "dnes je pěkný den" zhora dolů, resp. "den" (y=40), "je" (y=50), "dnes" (y=60), "pěkný" (y=70). Seřadit slova podle osy y!</p>}>
          <p>Bez toho, abys následující kód zkoušel spustit, si ho pečlivě přečti a uhodni, jaká smysluplná věta z něj vzejde, když si ji budeš číst po řádcích (od shora dolů):</p>
          <PythonSnippet code={`canvas.create_text(random.randint(180, 260), 40, text='den')\ncanvas.create_text(random.randint(80, 110), 50, text='je')\ncanvas.create_text(random.randint(120, 170), 70, text='pěkný')\ncanvas.create_text(random.randint(30, 70), 60, text='dnes')`} />
        </TaskCard>

        <TaskCard number="11" title="Matematika uvnitř grafiky" taskId="11" showTeacher={teacherMode} teacherNote={<p><code>canvas.create_text</code> dokáže vypsat i číselnou proměnnou <code>n</code>, aniž by se musela převádět na string. Kód <code>text=123+468</code> se v Pythonu nejprve vyhodnotí na 591 a pak se vypíše. Užitečné k zjištění, že text může psát i výsledky kalkulačky!</p>}>
          <p>Vytvoř program <code>nah_cislo_grafika.py</code> a napiš do něj podprogram <code>nahodne_cislo()</code>, který na náhodnou pozici na plátně napíše velké šestimístné náhodné číslo (třeba od 100000 do 999999). Zkus zavolat podprogram mockrát po sobě.</p>
          <p className="mt-4 font-bold text-cyan-700">A závěrečná hádanka: Příkaz pro vypsání textu umí místo slova napsat i výsledek matematického příkladu! Zjisti, co vyhodí tento kód (bez uvozovek u textu!):</p>
          <PythonSnippet code={`canvas.create_text(150, 150, text=123+468)`} />
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonTextChapter;
