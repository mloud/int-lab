'use client';
import React from 'react';
import { Square, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'teal',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py5', id),
});


interface PythonDrawingChapterProps {
  onBack: () => void;
}

const PythonDrawingChapter: React.FC<PythonDrawingChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Kreslení"
      subtitle="Lekce 5"
      icon={<Square className="w-8 h-8 text-teal-600" />}
      onBack={onBack}
      accentColor="teal"
      tabs={[{ id: 'lekce', label: 'Lekce 5', icon: Code }]}
    >
      <TeacherPinBar tone="teal" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-2xl mb-8">
          <p className="text-teal-800/80 text-sm sm:text-base font-bold">
            První i druhá úloha slouží k opakování práce s proměnnými a výpisy.
          </p>
        </div>

        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>suma = 20</code><br/><code>kurz = 25.23</code><br/><code>dostanes = suma * kurz</code><br/><code>print('Za', suma, 'eur dostaneš', dostanes, 'korun při kurzu', kurz, 'korun za euro.')</code></p>}>
          <p>Už jsi směňoval koruny na eura. Teď vytvoř nový program <code>smena2.py</code>, který bude umět směnit eura na koruny. Použij proměnné <code>suma</code> a <code>kurz</code>, do kterých přiřadíš počáteční hodnoty – kolik eur chceš vyměnit a aktuální kurz (například 25.23 korun za 1 euro). Do proměnné <code>dostanes</code> přiřaď hodnotu výrazu, kterým se vypočítá, kolik korun dostaneš za svou sumu. Program vypíše výsledek například ve tvaru:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Za ... eur dostaneš ... korun při kurzu ... korun za euro.
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení – počítač vypíše:<br/><code>Za jízdu o délce 8 km s naším taxi zaplatíš 290 korun</code></p>}>
          <p>Následující program pracuje s proměnnými. Urči bez použití počítače, co program vypíše:</p>
          <PythonSnippet code={`km = 8\nc = 30\ns = km * c + 50\nprint('Za jízdu o délce', km, 'km s naším taxi zaplatíš', s, 'korun')`} />
          <p>Na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode} teacherNote={<p>V části 3.A se inicializuje grafická plocha, do proměnné <code>canvas</code> se přiřazuje objekt grafické plochy. Toto žákům nevysvětlujeme (je to příliš brzo). Tyto příkazy je potřeba opsat z pracovního listu nebo je odtud zkopírovat. Když se žáci budou dožadovat vysvětlení významu těchto příkazů, stačí jim říci, že: „tyto příkazy slouží k tomu, aby se vytvořilo prázdné okno“. Žáky ze znalosti těchto příkazů nebudeme zkoušet.<br/><br/>Protože se slovo <code>canvas</code> bude v dalších zápisech často vyskytovat, můžeme se žáky diskutovat o jeho významu (např. „grafická plocha“, „malířské plátno“ apod.). Případně si při vysvětlovaní můžeme pomoci metaforou: „Windowsovské okno je rám, ve kterém se musí nacházet malířské plátno, abychom do něj mohli kreslit. Jsou ale i taková windowsovská okna, do kterých se kreslit nedá.“</p>}>
          <p>Doposud tvé programy počítaly a vypisovaly textové zprávy. Teď se naučíš vytvářet programy, které budou umět kreslit obrázky. Postupuj takto:</p>
          <ul className="list-none pl-0 mt-4 space-y-4">
            <li>A) Vytvoř nový program <code>platno.py</code> s následujícím obsahem:
              <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()`} />
            </li>
            <li>B) Program spusť – na obrazovce uvidíš nové okno:</li>
            <li>C) Zjisti, zda se dá okno posouvat, měnit jeho velikost. Nakonec toto nové okno zavři.</li>
          </ul>
          <p className="mt-4">Tvůj program vyrobil grafickou plochu <code>canvas</code>. Slovo <code>canvas</code> budeš používat i v dalších příkazech na kreslení.</p>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>V této úloze jsou z pohledu žáka dvě nové věci:<br/>• Jak funguje souřadnicová soustava (je jiná, než znají z matematiky)<br/>• Jak funguje kreslení obdélníků (zadávají se souřadnice protilehlých vrcholů)</p>}>
          <p>Přidej do svého programu <code>platno.py</code> nový příkaz (je žlutě označený) a program opět spusť:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-teal-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">import tkinter</span></div>
            <div><span className="text-slate-300">canvas = tkinter.Canvas()</span></div>
            <div><span className="text-slate-300">canvas.pack()</span></div>
            <div className="bg-yellow-500/20 px-1 -mx-1"><span className="text-yellow-300">canvas.create_rectangle(50, 70, 220, 150)</span></div>
          </div>
          <p>Uvidíš obdélník:</p>
          <CanvasPreview>
            <Rect x1={50} y1={70} width={170} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode}>
          <p>V závorkách příkazu <code>canvas.create_rectangle( , , , )</code> jsou 4 čísla. Zkus je v programu <code>platno.py</code> postupně měnit (změny oproti předchozímu zápisu jsou zvýrazněny žlutě). Program pokaždé spusť, abys viděl, co nakreslí:</p>
          <div className="bg-slate-900 rounded-xl p-4 my-3 font-mono text-sm sm:text-base text-teal-400 overflow-x-auto shadow-inner border border-slate-700">
            <div><span className="text-slate-300">a) canvas.create_rectangle(</span><span className="text-yellow-300 bg-yellow-500/20 px-1">0</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">0</span><span className="text-slate-300">, 220, 150)</span></div>
            <div><span className="text-slate-300">b) canvas.create_rectangle(0, 0, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">)</span></div>
            <div><span className="text-slate-300">c) canvas.create_rectangle(0, 0, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">250</span><span className="text-slate-300">, 50)</span></div>
            <div><span className="text-slate-300">d) canvas.create_rectangle(</span><span className="text-yellow-300 bg-yellow-500/20 px-1">20</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">10</span><span className="text-slate-300">, 250, 50)</span></div>
            <div><span className="text-slate-300">e) canvas.create_rectangle(20, 10, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">50</span><span className="text-slate-300">, </span><span className="text-yellow-300 bg-yellow-500/20 px-1">250</span><span className="text-slate-300">)</span></div>
          </div>
          <p>Víš, jak tato čísla fungují?</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>canvas.create_rectangle(50, 30, 300, 200)</code><br/><br/>V této lekci žáci nepracují jen se dvěma dříve používanými okny (textovým editorem s programem a interaktivní konzolí), ale seznamují se zde s dalším oknem obsahujícím grafickou plochu.</p>}>
          <p>Změň svůj program <code>platno.py</code> tak, aby nakreslil obdélník, který má souřadnice protilehlých vrcholů [50, 30] a [300, 200].</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení – stačí takovýto výpočet:<br/>Šířka: <code>300 - 50</code><br/>Výška: <code>200 - 30</code></p>}>
          <p>a) Spočítej bez použití počítače, jakou šířku a výšku má obdélník z předchozí úlohy.</p>
          <p>b*) Svou domněnku ověř za použití snímku obrazovky a libovolného grafického editoru.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>canvas.create_rectangle(200, 100, 200 + 60, 100 + 140)</code><br/>nebo:<br/><code>canvas.create_rectangle(200, 100, 260, 240)</code><br/><br/>Samozřejmě uznáme i řešení s volbou jiných protilehlých vrcholů.</p>}>
          <p>Vytvoř nový program <code>obdelnik.py</code> a nakresli obdélník, který má jeden vrchol na souřadnicích [200, 100], jeho šířka je 60 a výška 140.</p>
        </TaskCard>

        <TaskCard number="9" title="" taskId="9" showTeacher={teacherMode}>
          <p>Bez použití počítače urči a do sešitu nakresli, jak přibližně budou rozmístěné následující obdélníky. Jaká je výška a šířka každého z nich?</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\ncanvas.create_rectangle(50, 70, 220, 150)\ncanvas.create_rectangle(60, 80, 130, 140)\ncanvas.create_rectangle(160, 90, 230, 160)`} />
          <p>Na počítači za použití Pythonu zkontroluj, zda byla tvá domněnka správná.</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Možné řešení:<br/><code>canvas.create_rectangle(100, 50, 100 + 80, 50 + 80)</code><br/><code>canvas.create_rectangle(200, 50, 200 + 80, 50 + 80)</code><br/><br/>Když se budou žáci ptát, jakým příkazem se kreslí čtverec, je třeba s nimi diskutovat a přivést je na myšlenku, že mohou použit již známý příkaz.<br/><br/>Můžeme vidět, že v našem řešení píšeme na místech některých parametrů výrazy se součty (například 100 + 80). Nevadí nám ani řešení s nevypočítanými výrazy – z nich je lepší vidět, jak souřadnice vznikají a jsou z nich dobře čitelné i rozměry obdélníku.</p>}>
          <p>Vytvoř nový program <code>vedle_sebe.py</code>, který vedle sebe nakreslí dva čtverce se stranami délky 80 (pozici čtverců zvol podle uvážení):</p>
          <CanvasPreview width={300} height={150}>
            <Rect x1={50} y1={35} width={80} height={80} />
            <Rect x1={150} y1={35} width={80} height={80} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Úlohu lze řešit vícero způsoby:<br/>• Na nějaké pozici nakreslíme větší čtverec a menší do něj umístíme tak, aby mezi nimi byla mezera 25:<br/><code>canvas.create_rectangle(100, 50, 250, 200)</code><br/><code>canvas.create_rectangle(100 + 25, 50 + 25, 250 - 25, 200 - 25)</code><br/>• Na nějaké pozici nakreslíme menší čtverec a větší nakreslíme okolo něj tak, aby mezi nimi byla mezera 25:<br/><code>canvas.create_rectangle(150, 100, 250, 200)</code><br/><code>canvas.create_rectangle(150 - 25, 100 - 25, 250 + 25, 200 + 25)</code><br/>• Zvolíme si střed a dopočítáme souřadnice vrcholů:<br/><code>canvas.create_rectangle(200 - 50, 100 - 50, 200 + 50, 100 + 50)</code><br/><code>canvas.create_rectangle(200 - 75, 100 - 75, 200 + 75, 100 + 75)</code></p>}>
          <p>Vytvoř program <code>soustredne.py</code>, který nakreslí dva velké čtverce – jeden se stranou délky 100 a druhý 150. Čtverce budou mít společný střed jako na následujícím obrázku:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={75} y1={25} width={150} height={150} />
            <Rect x1={100} y1={50} width={100} height={100} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="12" title="" taskId="12" showTeacher={teacherMode} teacherNote={<p>Možná řešení:<br/>• Kreslíme od spodního největšího obdélníku. Postupujeme jako bychom obdélníky na sebe pokládali. Každý další obdélník má y-ové souřadnice vrcholů menší o 50, x-ová souřadnice levého vrcholu je zvětšená o 25 a x-ová souřadnice pravého vrcholu je zmenšená o 25:<br/><code>canvas.create_rectangle(100, 200, 100 + 150, 200 + 50)</code><br/><code>canvas.create_rectangle(100 + 25, 150, 100 + 150 - 25, 150 + 50)</code><br/><code>canvas.create_rectangle(100 + 50, 100, 100 + 150 - 50, 100 + 50)</code><br/>• Zvolíme x-ovou souřadnici středu celé stavby (například 200). Kreslíme od horního obdélníku a počítáme souřadnice protilehlých vrcholů:<br/><code>canvas.create_rectangle(200 - 25, 100, 200 + 25, 100 + 50)</code><br/><code>canvas.create_rectangle(200 - 50, 150, 200 + 50, 150 + 50)</code><br/><code>canvas.create_rectangle(200 - 75, 200, 200 + 75, 200 + 50)</code></p>}>
          <p>Vytvoř program <code>pyramida.py</code>, který ze tří obdélníků o rozměrech 150x50, 100x50 a 50x50 nakreslí následující pyramidu:</p>
          <CanvasPreview width={300} height={200}>
            <Rect x1={125} y1={25} width={50} height={50} />
            <Rect x1={100} y1={75} width={100} height={50} />
            <Rect x1={75} y1={125} width={150} height={50} />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="13*" title="" taskId="13" showTeacher={teacherMode} teacherNote={<p>Nejprve nakreslíme velký středový čtverec a poté menší čtverce v následujícím pořadí: horní čtverec, dolní čtverec, levý čtverec, pravý čtverec<br/><code>canvas.create_rectangle(100, 100, 200, 200)</code><br/><code>canvas.create_rectangle(100, 100 - 50, 100 + 50, 100)</code><br/><code>canvas.create_rectangle(200 - 50, 200, 200, 200 + 50)</code><br/><code>canvas.create_rectangle(100 - 50, 200 - 50, 100, 200)</code><br/><code>canvas.create_rectangle(200, 100, 200 + 50, 100 + 50)</code></p>}>
          <p>13* Vytvoř program <code>ornament.py</code>, který z pěti čtverců nakreslí následující ornament. Rozměry čtverců zvol podle svého uvážení (všechny menší čtverce budou stejně velké):</p>
          <CanvasPreview width={300} height={250}>
            <Rect x1={100} y1={100} width={100} height={100} />
            <Rect x1={100} y1={50} width={50} height={50} />
            <Rect x1={150} y1={200} width={50} height={50} />
            <Rect x1={50} y1={150} width={50} height={50} />
            <Rect x1={200} y1={100} width={50} height={50} />
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonDrawingChapter;
