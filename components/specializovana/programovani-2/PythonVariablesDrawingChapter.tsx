'use client';
import React from 'react';
import { Square, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard } = createTaskKit({
  tone: 'amber',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py7', id),
});


interface PythonVariablesDrawingChapterProps {
  onBack: () => void;
}

const PythonVariablesDrawingChapter: React.FC<PythonVariablesDrawingChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Kreslení s proměnnými"
      subtitle="Lekce 7"
      icon={<Square className="w-8 h-8 text-amber-600" />}
      onBack={onBack}
      accentColor="amber"
      tabs={[{ id: 'lekce', label: 'Lekce 7', icon: Code }]}
    >
      <TeacherPinBar tone="amber" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>canvas.create_rectangle(50, 50, 150, 150, fill='red')</code><br/><code>canvas.create_rectangle(150, 150, 250, 250, fill='blue')</code></p>}>
          <p>Vytvoř nový program <code>dotykajici.py</code>, který nakreslí dva dotýkající se čtverce jako na obrázku. Oba mají délku strany 100, přitom červený má levý horní roh v bodě [50, 50] a modrý má levý horní roh v bodě [150, 150].</p>
          <CanvasPreview width={300} height={300}>
            <Rect x1={50} y1={50} width={100} height={100} fill="red" />
            <Rect x1={150} y1={150} width={100} height={100} fill="blue" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Chceme, aby se žáci naučili vyjadřovat souřadnice pomocí výrazů s proměnnými. Pokud by se žáci ptali na důvod, proč nestačí nadále používat konkrétní čísla, můžeme odpovědět, že tento nový přístup umožňuje snadnou změnu pozice útvaru při zachování jeho rozměrů. Žákům se tento přístup bude hodit i v následujících lekcích, v nichž budou útvary vykreslovány na náhodných pozicích.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 100</code><br/><code>y = 70</code><br/><code>canvas.create_rectangle(x, y, x + 100, y + 100, fill='yellow')</code></p>}>
          <p>Vytvoř nový program <code>pozice_promenne.py</code> a opiš do něj kód uvedený níže. V proměnných <code>x</code>, <code>y</code> jsou uložené souřadnice levého horního rohu čtverce. Dokonči kód programu tak, abys pomocí uvedených proměnných nakreslil čtverec se stranou délky 100:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-amber-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">import tkinter</span></div>
            <br />
            <div><span className="text-slate-300">canvas = tkinter.Canvas()</span></div>
            <div><span className="text-slate-300">canvas.pack()</span></div>
            <div><span className="text-slate-300">x = 100</span></div>
            <div><span className="text-slate-300">y = 70</span></div>
            <div><span className="text-slate-300">canvas.create_rectangle(x, y, x + </span><span className="text-yellow-300 bg-yellow-500/20 px-4">&nbsp;</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-4">&nbsp;</span><span className="text-slate-300">, fill='yellow')</span></div>
          </div>
          <CanvasPreview width={300} height={200}>
            <Rect x1={100} y1={70} width={100} height={100} fill="yellow" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 100</code><br/><code>y = 70</code><br/><code>sirka = 200</code><br/><code>vyska = 50</code><br/><code>canvas.create_rectangle(x, y, x + sirka, y + vyska, fill='red')</code></p>}>
          <p>Vytvoř nový program <code>obdelnik_promenne.py</code>, který použije čtyři proměnné <code>x</code>, <code>y</code>, <code>sirka</code>, <code>vyska</code> a na jejich základě nakreslí obdélník s levým horním rohem na souřadnicích <code>x</code>, <code>y</code>, danou šířkou a výškou. Barvu si zvol podle svého. Například když bude v programu:</p>
          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <div className="flex-1 font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
x = 100<br/>
y = 70<br/>
sirka = 200<br/>
vyska = 50
            </div>
            <div className="flex-1">
              <p className="mb-2">nakreslí se obdélník jako na obrázku vpravo:</p>
              <CanvasPreview width={300} height={200} className="!m-0">
                <Rect x1={100} y1={70} width={200} height={50} fill="red" />
              </CanvasPreview>
            </div>
          </div>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>V následující úloze je důležité, aby žáci důsledně dodržovali zadání – ačkoliv lze úlohu řešit s konstantami, měli bychom vyžadovat, aby byla použita řešení s proměnnými:<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 100</code><br/><code>y = 70</code><br/><code>canvas.create_rectangle(x, y, x + 100, y + 100, fill='red')</code><br/><code>canvas.create_rectangle(x, y, x + 70, y + 70, fill='blue')</code><br/><code>canvas.create_rectangle(x, y, x + 40, y + 40, fill='navy')</code><br/><br/>V případě, že žák vyřeší úlohu bez proměnných <code>x</code>, <code>y</code> jen s konstantami, lze mu například říci: „přiřaď do proměnné <code>x</code> hodnotu 200, jestli se nakreslí správný obrázek“.</p>}>
          <p>Vytvoř program <code>levy_roh.py</code>, který nakreslí následující čtverce:</p>
          <CanvasPreview width={250} height={250}>
            <Rect x1={50} y1={50} width={100} height={100} fill="red" />
            <Rect x1={50} y1={50} width={70} height={70} fill="blue" />
            <Rect x1={50} y1={50} width={40} height={40} fill="navy" />
          </CanvasPreview>
          <p>Tyto čtverce mají společný levý horní roh, jehož souřadnice jsou v proměnných <code>x</code>, <code>y</code>. Čtverce se postupně zmenšují tak, že červený má délku strany 100, modrý 70 a tmavomodrý 40.</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 30</code><br/><code>y = 100</code><br/><code>a = 100</code><br/><code>b = 70</code><br/><code>canvas.create_rectangle(x, y, x + a, y + b, fill='blue')</code><br/><code>canvas.create_rectangle(x + a, y, x + 2 * a, y + b, fill='lightblue')</code><br/><code>canvas.create_rectangle(x + 2 * a, y, x + 3 * a, y + b, fill='darkblue')</code><br/><br/>Pokud budou mít žáci s řešením problémy, je potřeba s nimi nad úlohou diskutovat a řešit ji společně na tabuli.</p>}>
          <p>Vytvoř program <code>vedle_sebe.py</code>, který nakreslí tři vzájemně se dotýkající obdélníky:</p>
          <CanvasPreview width={380} height={200}>
            <Rect x1={40} y1={50} width={100} height={100} fill="blue" />
            <Rect x1={140} y1={50} width={100} height={100} fill="lightblue" />
            <Rect x1={240} y1={50} width={100} height={100} fill="darkblue" />
          </CanvasPreview>
          <p>Souřadnice levého horního rohu prvního obdélníku jsou uložené v proměnných <code>x</code>, <code>y</code>. Všechny tři obdélníky mají stejnou šířku a výšku – tyto rozměry jsou uložené v proměnných <code>a</code>, <code>b</code>.</p>
          <p className="mt-4">Bude program fungovat správně i v případě, že hodnotu proměnné <code>a</code> zvětšíš o 20 a hodnotu proměnné <code>y</code> zvětšíš o 10? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Doposud, když se kreslil čtverec se zadaným středem, používala se konkrétní čísla. V následující úloze je střed daný obecně, tj. je uložený v proměnných <code>x</code>, <code>y</code>. Když to bude potřeba, vzorce odvodíme společně na tabuli – zdá se nám důležité, aby žáci rozuměli matematickému postupu, jak vzorec vznikl (tj. aby to nebyla „prozrazená magie“).<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 200</code><br/><code>y = 100</code><br/><code>canvas.create_rectangle(x - 50, y - 50, x + 50, y + 50, fill='green')</code></p>}>
          <p>Teď budeš kreslit čtverec, jehož střed má souřadnice <code>[x, y]</code> a jehož strany mají délku 100. Souřadnice <code>x</code>, <code>y</code> jsou uloženy ve stejnojmenných proměnných. Abys mohl tento čtverec nakreslit, musíš vypočítat souřadnice jeho levého horního i pravého dolního rohu:</p>
          <div className="flex justify-center my-6">
            <div className="relative w-48 h-48 border-2 border-black flex items-center justify-center">
              <div className="absolute top-1/2 w-full border-t border-dashed border-slate-400"></div>
              <div className="absolute left-1/2 h-full border-l border-dashed border-slate-400"></div>
              <div className="absolute top-1/2 left-1/2 bg-black w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 translate-x-2 translate-y-2 font-mono text-sm font-bold">[x, y]</div>
              <div className="absolute right-0 top-1/2 translate-x-8 -translate-y-1/2 font-mono text-sm font-bold">100</div>
              <div className="absolute top-0 left-0 -translate-x-2 -translate-y-6 font-mono text-sm font-bold">[? , ?]</div>
              <div className="absolute bottom-0 right-0 translate-x-2 translate-y-6 font-mono text-sm font-bold">[? , ?]</div>
            </div>
          </div>
          <p>Do nového programu <code>stred_ctverce.py</code> napiš kód, který nakreslí zelený čtverec se středem <code>[x, y]</code> a stranou o délce 100.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 150</code><br/><code>y = 100</code><br/><code>canvas.create_rectangle(x - 50, y - 50, x + 50, y + 50, fill='red')</code><br/><code>canvas.create_rectangle(x - 30, y - 30, x + 30, y + 30, fill='blue')</code><br/><code>canvas.create_rectangle(x - 10, y - 10, x + 10, y + 10, fill='white')</code></p>}>
          <p>Vytvoř program <code>tri_soustredne.py</code>, který nakreslí tři čtverce – všechny mají společný střed v bodě <code>[x, y]</code> a postupně se zmenšují (červený má délku stran 100, modrý 60 a bílý 20). Předpokládej, že souřadnice <code>x</code>, <code>y</code> jsou uloženy ve stejnojmenných proměnných.</p>
          <CanvasPreview width={200} height={200}>
            <Rect x1={50} y1={50} width={100} height={100} fill="red" />
            <Rect x1={70} y1={70} width={60} height={60} fill="blue" />
            <Rect x1={90} y1={90} width={20} height={20} fill="white" />
          </CanvasPreview>
          <p>Bude program fungovat správně i v případě, že hodnotu proměnné <code>x</code> zvětšíš o 17 a hodnotu proměnné <code>y</code> zvětšíš o 29? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Žákům můžeme pomoci radou, aby pro všechny tyto obdélníky vypočítali délky stran (šířku a výšku). Pokud by toho nebyli schopni, mohou si do sešitu do souřadnicové soustavy načrtnout jednotlivé obdélníky a délky stran odvodit z těchto náčrtků.<br/><br/>Řešení: Všechny příkazy nakreslí čtverce.</p>}>
          <p>Bez toho, abys následující příkazy spouštěl na počítači, zjisti, které z nich kreslí čtverce (předpokládej, že hodnoty proměnných <code>x</code> i <code>y</code> jsou 100):</p>
          <ul className="list-none pl-5 mt-2 space-y-1 font-mono text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
            <li>a) canvas.create_rectangle(0, 0, 1, 1)</li>
            <li>b) canvas.create_rectangle(10, 20, 30, 40)</li>
            <li>c) canvas.create_rectangle(100, 150, 150, 100)</li>
            <li>d) canvas.create_rectangle(x, y - 50, x + 50, y)</li>
            <li>e) canvas.create_rectangle(100 - 20, 70 - 30, 100 + 30, 70 + 20)</li>
          </ul>
          <p className="mt-4">Na počítači za použití Pythonu zkontroluj, zda byly tvé domněnky správné.</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 200</code><br/><code>y = 100</code><br/><code>a = 100</code><br/><code>b = 50</code><br/><code>canvas.create_rectangle(x - a / 2, y - b / 2, x + a / 2, y + b / 2, fill='orange')</code></p>}>
          <p>Zkus (podobně jako v úloze 6) vymyslet kreslení obdélníku, jehož střed má souřadnice <code>[x, y]</code> a strany mají délky <code>a</code>, <code>b</code>. Napiš program <code>stred_obdelniku.py</code>, který takový obdélník nakreslí.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Přechod od vyjádření rozměrů obdélníku pomocí konkrétních hodnot, které byly použity v předchozích úlohách, k vyjádření rozměrů pomocí proměnných může žákům činit obtíže. Bude-li to potřeba, je vhodné nechat žáky, aby si do sešitu nakreslili náčrtek, z nějž souřadnice vrcholů obdélníku snáze odvodí. Pokud budou mít žáci s řešením stále problémy, je potřeba s nimi nad úlohou diskutovat a řešit ji společně na tabuli.<br/><br/>Možné řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 190</code><br/><code>y = 100</code><br/><code>canvas.create_rectangle(x - 50, y - 75, x + 50, y + 75, fill='limegreen')</code><br/><code>canvas.create_rectangle(x - 30 - 20, y - 50, x - 30 + 20, y + 10, fill='black')</code><br/><code>canvas.create_rectangle(x + 30 - 20, y - 50, x + 30 + 20, y + 10, fill='black')</code><br/><code>canvas.create_rectangle(x - 30 - 5, y - 30, x - 30 + 5, y - 10, fill='white')</code><br/><code>canvas.create_rectangle(x + 30 - 5, y - 30, x + 30 + 5, y - 10, fill='white')</code><br/><code>canvas.create_rectangle(x - 40, y + 40, x + 40, y + 50, fill='darkgreen')</code><br/><code>canvas.create_rectangle(x - 15, y + 20, x - 5, y + 30, fill='darkgreen')</code><br/><code>canvas.create_rectangle(x + 5, y + 20, x + 15, y + 30, fill='darkgreen')</code><br/><br/>Toto je ukázka jednoho z možných řešení. Žáci zřejmě sestaví zcela odlišné obrázky podle vlastních představ.</p>}>
          <p>Napiš program <code>mimozemstan.py</code>, který pomocí barevných obdélníků nakreslí hlavu mimozemšťana. Na hlavě by měly být minimálně dvě stejné oči a jedna ústa. Souřadnice středu hlavy jsou uloženy v proměnných <code>x</code>, <code>y</code>.</p>
          <p className="mt-4">Bude program fungovat správně i v případě, že hodnotu proměnné <code>x</code> zvětšíš o 30 a hodnotu proměnné <code>y</code> zvětšíš o 40? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Žáci pravděpodobně nebudou schopni souřadnice určit zpaměti, ale budou si vytvářet nákres obrázku na papír a na jeho základě teprve souřadnice určí.<br/><br/>Řešení:<br/><code>import tkinter</code><br/><code>canvas = tkinter.Canvas()</code><br/><code>canvas.pack()</code><br/><code>x = 50</code><br/><code>y = 200</code><br/><code>canvas.create_rectangle(x, y - 100, x + 100, y, fill='red')</code><br/><code>canvas.create_rectangle(x + 100, y - 80, x + 180, y, fill='yellow')</code><br/><code>canvas.create_rectangle(x + 180, y - 60, x + 240, y, fill='green')</code><br/><code>canvas.create_rectangle(x + 240, y - 40, x + 280, y, fill='violet')</code><br/><code>canvas.create_rectangle(x + 280, y - 20, x + 300, y, fill='blue')</code></p>}>
          <p>Pět barevných čtverců leží těsně vedle sebe na jedné podložce. Velikosti stran jsou postupně 100, 80, 60, 40, 20. Napiš program <code>rada_ctvercu.py</code>, jestliže souřadnice levého dolního rohu prvního čtverce jsou v proměnných <code>x</code>, <code>y</code>:</p>
          <CanvasPreview width={350} height={150}>
            <Rect x1={25} y1={25} width={100} height={100} fill="red" />
            <Rect x1={125} y1={45} width={80} height={80} fill="yellow" />
            <Rect x1={205} y1={65} width={60} height={60} fill="green" />
            <Rect x1={265} y1={85} width={40} height={40} fill="violet" />
            <Rect x1={305} y1={105} width={20} height={20} fill="blue" />
          </CanvasPreview>
          <p>Bude program fungovat správně i v případě, že hodnotu proměnné <code>x</code> zvětšíš o 20 a hodnotu proměnné <code>y</code> zvětšíš o 18? Jestli ne, program oprav.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonVariablesDrawingChapter;
