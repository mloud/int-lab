'use client';
import React from 'react';
import { Type, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect, Text } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'pink',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py10', id),
});


interface PythonTextDrawingChapterProps {
  onBack: () => void;
}

const PythonTextDrawingChapter: React.FC<PythonTextDrawingChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Kreslení textu"
      subtitle="Lekce 10"
      icon={<Type className="w-8 h-8 text-pink-600" />}
      onBack={onBack}
      accentColor="pink"
      tabs={[{ id: 'lekce', label: 'Lekce 10', icon: Code }]}
    >
      <TeacherPinBar tone="pink" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import random</code><br/><br/><code>def nakupy():</code><br/><code>    n1 = random.randint(100, 300)</code><br/><code>    n2 = random.randint(100, 300)</code><br/><code>    n3 = random.randint(100, 300)</code><br/><code>    print('Tvůj první nákup stál', n1, 'korun')</code><br/><code>    print('Tvůj druhý nákup stál', n2, 'korun')</code><br/><code>    print('Tvůj třetí nákup stál', n3, 'korun')</code><br/><code>    print('Celkem jsi zaplatil', n1 + n2 + n3, 'korun')</code><br/><br/><code>nakupy()</code></p>}>
          <p>Na 1. dubna jsme šli do tří obchodů, kde měli prodavači rozvernou náladu. Každý prodavač chtěl za nákup zaplatit náhodnou sumu peněz z intervalu od 100 do 300 korun. Napiš program <code>nakupy.py</code> a v něm podprogram <code>nakupy</code>, který vygeneruje tři náhodné sumy, vypíše je a na závěr vypíše i jejich součet. Výpis může vypadat například takto:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Tvůj první nákup stál 190 korun<br/>
Tvůj druhý nákup stál 299 korun<br/>
Tvůj třetí nákup stál 111 korun<br/>
Celkem jsi zaplatil 600 korun
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>v1 = random.randint(10, 200)</code><br/><code>v2 = random.randint(10, 200)</code><br/><code>v3 = random.randint(10, 200)</code><br/><br/><code>canvas.create_rectangle(50, 250 - v1, 150, 250, fill='limegreen')</code><br/><code>canvas.create_rectangle(150, 250 - v2, 250, 250, fill='tomato')</code><br/><code>canvas.create_rectangle(250, 250 - v3, 350, 250, fill='lightblue')</code></p>}>
          <p>Přišly nám tři balíky obdélníkových tvarů. Balíky jsme položili na stůl vedle sebe. Šírka každého z nich je 100 a výška je náhodné číslo od 10 do 200. Napiš program <code>baliky.py</code>, který je nakreslí třemi různými barvami, například:</p>
          <CanvasPreview width={380} height={200}>
            <Rect x1={40} y1={120} width={100} height={60} fill="limegreen" />
            <Rect x1={140} y1={50} width={100} height={130} fill="tomato" />
            <Rect x1={240} y1={160} width={100} height={20} fill="lightblue" />
            <div className="absolute left-[30px] top-[180px] w-[320px] border-t border-slate-400"></div>
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Jak jsi určitě pochopil(a), vypsání textu zajišťuje příkaz <code>canvas.create_text</code>. Souřadnice v tomto příkazu určují střed vypisovaného textu.</p>}>
          <p>Když chceš do grafické plochy psát texty, musíš se naučit nový příkaz. Vytvoř nový program <code>text_grafika.py</code> a zapiš do něj následující kód:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-pink-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">import tkinter</span></div>
            <br />
            <div><span className="text-slate-300">canvas = tkinter.Canvas()</span></div>
            <div><span className="text-slate-300">canvas.pack()</span></div>
            <div><span className="text-slate-300">canvas.create_text(</span><span className="text-yellow-300 bg-yellow-500/20 px-1">150</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">, text='posílám pozdrav z grafické plochy')</span></div>
          </div>
          <p>Jak jsi určitě pochopil(a), vypsání textu zajišťuje příkaz <code>canvas.create_text</code>. Souřadnice v tomto příkazu určují střed vypisovaného textu.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_text(190, 10, text='Horní okraj')</code><br/><code>canvas.create_text(190, 255, text='Dolní okraj')</code><br/><code>canvas.create_text(35, 133, text='Levý okraj')</code><br/><code>canvas.create_text(345, 133, text='Pravý okraj')</code></p>}>
          <p>Vytvoř nový program <code>pojmenuj_okraje.py</code> a napiš do něj příkazy, kterými pojmenuješ okraje grafické plochy jako na následujícím obrázku (souřadnice odhadni):</p>
          <CanvasPreview>
            <Text x={190} y={15} text="Horní okraj" color="#8b008b" />
            <Text x={190} y={250} text="Dolní okraj" color="#8b008b" />
            <Text x={40} y={133} text="Levý okraj" color="#8b008b" />
            <Text x={340} y={133} text="Pravý okraj" color="#8b008b" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x1 = 100</code><br/><code>y1 = 50</code><br/><code>x2 = 330</code><br/><code>y2 = 200</code><br/><br/><code>canvas.create_rectangle(x1, y1, x2, y2)</code><br/><code>canvas.create_text(x1, y1, text='A')</code><br/><code>canvas.create_text(x2, y1, text='B')</code><br/><code>canvas.create_text(x2, y2, text='C')</code><br/><code>canvas.create_text(x1, y2, text='D')</code></p>}>
          <p>Vytvoř nový program <code>vrcholy_obdelniku.py</code> a do proměnných <code>x1</code>, <code>y1</code>, <code>x2</code>, <code>y2</code> přiřaď souřadnice dvou protilehlých vrcholů obdélníku (například 100, 50, 330, 200). Nakresli obdélník s těmito souřadnicemi. Pomocí příkazů <code>canvas.create_text</code> a proměnných <code>x1</code>, <code>y1</code>, <code>x2</code>, <code>y2</code> označ vrcholy obdélníku písmeny A, B, C, D:</p>
          <CanvasPreview width={380} height={200}>
            <Rect x1={100} y1={50} width={180} height={100} />
            <Text x={100} y={50} text="D" />
            <Text x={280} y={50} text="C" />
            <Text x={280} y={150} text="B" />
            <Text x={100} y={150} text="A" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>canvas.create_text(x1 - 10, y1 - 10, text='A')</code><br/><code>canvas.create_text(x2 + 10, y1 - 10, text='B')</code><br/><code>canvas.create_text(x2 + 10, y2 + 10, text='C')</code><br/><code>canvas.create_text(x1 - 10, y2 + 10, text='D')</code><br/><br/>Žáci zjistí, že pomocí posunutí o například 10 obrazových bodů doleva se písmeno <code>D</code> odlepí od hrany obdélníku.</p>}>
          <p>Uprav příkazy pro psaní textů v programu <code>vrcholy_obdelniku.py</code> tak, aby se označení vrcholů nepřekrývalo s hranami obdélníku:</p>
          <CanvasPreview width={380} height={200}>
            <Rect x1={100} y1={50} width={180} height={100} />
            <Text x={85} y={35} text="D" />
            <Text x={295} y={35} text="C" />
            <Text x={295} y={165} text="B" />
            <Text x={85} y={165} text="A" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>canvas.create_text(190, 50, text='Sbohem, galánečko, já už musím jí - ti')</code><br/><code>canvas.create_text(190, 70, text='Sbohem, galánečko, já už musím jí - ti')</code><br/><code>canvas.create_text(190, 90, text='Kyselé vínečko, kyselé vínečko')</code><br/><code>canvas.create_text(190, 110, text='podalas\\' mně k pití')</code><br/><code>canvas.create_text(190, 130, text='Kyselé vínečko, kyselé vínečko')</code><br/><code>canvas.create_text(190, 150, text='podalas\\' mně k pití')</code></p>}>
          <p>Vytvoř nový program <code>pisnicka.py</code>, ve kterém do grafické plochy vypiš několik prvních řádků svojí oblíbené písničky, například:</p>
          <CanvasPreview width={380} height={200}>
            <Text x={190} y={40} text="Sbohem, galánečko, já už musím jí - ti" />
            <Text x={190} y={60} text="Sbohem, galánečko, já už musím jí - ti" />
            <Text x={190} y={80} text="Kyselé vínečko, kyselé vínečko" />
            <Text x={190} y={100} text="podalas' mně k pití" />
            <Text x={190} y={120} text="Kyselé vínečko, kyselé vínečko" />
            <Text x={190} y={140} text="podalas' mně k pití" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>x = 100</code><br/><code>y = 50</code><br/><code>canvas.create_rectangle(x - 25, y - 10, x + 25, y + 10, fill='white')</code><br/><code>canvas.create_text(x, y, text='Vašek')</code></p>}>
          <p>Vytvoř nový program <code>stitek.py</code>, v němž navrhneš svůj štítek. Do proměnných <code>x</code>, <code>y</code> přiřaď souřadnice jeho budoucího středu. Potom nakresli bílý obdélník o velikosti například 50 x 20 a do jeho středu napiš své jméno. Výsledek může vypadat například jako na následujícím obrázku:</p>
          <CanvasPreview width={380} height={150}>
            <Rect x1={100} y1={50} width={50} height={20} fill="white" />
            <Text x={125} y={60} text="Vašek" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def stitek():</code><br/><code>    x = random.randint(30, 350)</code><br/><code>    y = random.randint(20, 240)</code><br/><code>    canvas.create_rectangle(x - 25, y - 10, x + 25, y + 10, fill='white')</code><br/><code>    canvas.create_text(x, y, text='Vašek')</code><br/><br/><code>stitek()</code><br/><code>... (10 volání)</code></p>}>
          <p>Uprav předchozí program tak, že vytvoříš z kreslení štítku podprogram <code>stitek</code>. Podprogram bude kreslit štítek na náhodných souřadnicích <code>[x, y]</code>. Nakonec podprogram desetkrát zavolej. Výsledek může vypadat například jako na následujícím obrázku:</p>
          <CanvasPreview width={380} height={200}>
            <Rect x1={50} y1={50} width={50} height={20} fill="white" />
            <Text x={75} y={60} text="Vašek" />
            <Rect x1={120} y1={40} width={50} height={20} fill="white" />
            <Text x={145} y={50} text="Vašek" />
            <Rect x1={100} y1={80} width={50} height={20} fill="white" />
            <Text x={125} y={90} text="Vašek" />
            <Rect x1={200} y1={70} width={50} height={20} fill="white" />
            <Text x={225} y={80} text="Vašek" />
            <Rect x1={60} y1={120} width={50} height={20} fill="white" />
            <Text x={85} y={130} text="Vašek" />
            <Rect x1={220} y1={150} width={50} height={20} fill="white" />
            <Text x={245} y={160} text="Vašek" />
            <Rect x1={180} y1={100} width={50} height={20} fill="white" />
            <Text x={205} y={110} text="Vašek" />
            <Rect x1={150} y1={140} width={50} height={20} fill="white" />
            <Text x={175} y={150} text="Vašek" />
            <Rect x1={280} y1={130} width={50} height={20} fill="white" />
            <Text x={305} y={140} text="Vašek" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Z ústřižků textu umístěných do různých sloupců a řádků vznikne věta „dnes je pěkný den“.</p>}>
          <p>Bez toho, abys následující příkazy spouštěl na počítači, urči, jaká věta se objeví v grafické ploše:</p>
          <PythonSnippet code={`canvas.create_text(random.randint(180, 260), 40, text='den')\ncanvas.create_text(random.randint(80, 110), 50, text='je')\ncanvas.create_text(random.randint(120, 170), 70, text='pěkný')\ncanvas.create_text(random.randint(30, 70), 60, text='dnes')`} />
          <p>Na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>import random</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><br/><code>def nahodne_cislo():</code><br/><code>    x = random.randint(20, 360)</code><br/><code>    y = random.randint(20, 240)</code><br/><code>    hodnota = random.randint(100000, 999999)</code><br/><code>    canvas.create_text(x, y, text=hodnota)</code><br/><br/><code>nahodne_cislo()</code><br/><code>...</code><br/><br/>Příkaz <code>canvas.create_text(x, y, text=123+468)</code> vypíše hodnotu <code>591</code>.</p>}>
          <p>Vytvoř nový program <code>nah_cislo_grafika.py</code>, ve kterém vytvoř podprogram <code>nahodne_cislo</code>, který na náhodnou pozici v grafické ploše vypíše náhodné šesticiferné číslo, tedy číslo z intervalu od 100000 do 999999. Po několika zavoláních podprogramu můžeš dostat například takovýto výsledek:</p>
          <CanvasPreview width={380} height={200}>
            <Text x={280} y={60} text="461754" />
            <Text x={100} y={80} text="743921" />
            <Text x={260} y={70} text="537093" />
            <Text x={150} y={130} text="730227" />
            <Text x={270} y={130} text="417030" />
            <Text x={170} y={150} text="343585" />
            <Text x={110} y={160} text="970308" />
            <Text x={120} y={165} text="791687" />
            <Text x={220} y={170} text="776330" />
            <Text x={230} y={175} text="559117" />
          </CanvasPreview>
          <p className="mt-4">Příkaz <code>create_text</code> umí vypsat i čísla nebo hodnoty výrazů. Zjisti, co vypíše následující příkaz:</p>
          <PythonSnippet code={`canvas.create_text(x, y, text=123+468)`} />
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonTextDrawingChapter;
