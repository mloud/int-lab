'use client';
import React from 'react';
import { GraduationCap, Settings2, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview, Rect } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'orange',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py13', id),
});


interface PythonExpressionsChapterProps {
  onBack: () => void;
}

const PythonExpressionsChapter: React.FC<PythonExpressionsChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Výrazy v cyklu"
      subtitle="Akumulace hodnot a postupné navyšování proměnné (iMyšlení Lekce 13)"
      icon={<Settings2 className="w-8 h-8 text-orange-600" />}
      onBack={onBack}
      accentColor="orange"
      tabs={[{ id: 'lekce', label: 'Lekce 13', icon: Code }]}
    >
      <TeacherPinBar tone="orange" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-orange-900 text-lg mb-2">Instrukce</h2>
          <p className="text-orange-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dnes si ukážeme ten nejdůležitější trik v programování – jak k nějaké krabičce (proměnné) pomalu přičítat nová a nová čísla, dokud z ní není třeba milion! Dělá se to zápisem, který by učitelům matematiky přišel jako úplný nesmysl: <code>x = x + 10</code>. Pojďme si to vysvětlit!
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Druhé mocniny" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha jen opakuje cyklus a práci s proměnnou <code>i</code> (jako v předchozí lekci), akorát tentokrát s výpisem na plátno: <code>canvas.create_text(10, 10 + i * 20, text=i)</code> a to samé s <code>text=i*i</code> pro mocninu.</p>}>
          <p>Minule jsme vytvářeli program, který v terminálu (textovém režimu) vypisoval čísla a jejich druhé mocniny.</p>
          <p>Vytvoř teď takový podobný program <code>druhe_mocniny_platno.py</code>, v němž ale budou čísla od 0 do 10 a jejich druhé mocniny zobrazeny <strong>v grafické ploše</strong> pěkně pod sebou pomocí příkazu <code>canvas.create_text</code> (budeš k tomu potřebovat dva tyto příkazy, jeden pro to číslo a jeden vedle pro mocninu).</p>
        </TaskCard>

        <TaskCard number="2" title="Záhada zvětšujícího se Ypsilonu" taskId="2" showTeacher={teacherMode} teacherNote={<p>Zde dochází ke zlomu! Zápis <code>y = y + 20</code> znamená: vezmi to, co je TEĎ v ypsilonu (10), přičti 20 (vznikne 30) a tuto novou hodnotu nacpi zpět do ypsilonu (takže se ypsilon navždy změní na 30). V dalším kole je v něm 30, stane se z něj 50 atd. Tím pádem po skončení cyklu, kdy 11. krok provede y=210+20, bude v proměnné y hodnota <strong>230</strong>.</p>}>
          <p>Přečti si následující program:</p>
          <PythonSnippet code={`import tkinter\ncanvas = tkinter.Canvas()\ncanvas.pack()\n\ny = 10\nfor i in range(11):\n    canvas.create_text(10, y, text=i)\n    y = y + 20`} />
          <p>Na posledním řádku se stalo něco šíleného! V matematice by rovnost <code>y = y + 20</code> nedávala vůbec smysl (žádné číslo se nerovná sobě samému zvětšenému o 20).</p>
          <p className="text-orange-700 font-bold mt-2">V programování ale znak "=" neznamená rovná se, ale "ULOŽ DO!".</p>
          <p>Přečteš to takto: <em>Vezmi to, co je TEĎ v krabičce Y, přičti k tomu 20, a celý tenhle nový výsledek ULOŽ zpět do krabičky Y.</em> Takže krabička ztloustne o dvacet!</p>
          <p className="mt-2">Vyplň tuto krokovací tabulku. Jakou hodnotu podle tebe bude mít proměnná <code>y</code> úplně na konci, až cyklus dvanáctkrát doběhne?</p>
          <table className="w-full mt-4 bg-slate-50 border border-slate-200 text-sm text-center">
            <thead>
              <tr className="bg-slate-200">
                <th className="p-2 border border-slate-300">kolo cyklu (i)</th>
                <th className="p-2 border border-slate-300">Y před výpisem textu</th>
                <th className="p-2 border border-slate-300">Y po vykonání <code>y = y + 20</code></th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border border-slate-300">0</td><td className="p-2 border border-slate-300">10</td><td className="p-2 border border-slate-300 font-bold">30</td></tr>
              <tr><td className="p-2 border border-slate-300">1</td><td className="p-2 border border-slate-300">30</td><td className="p-2 border border-slate-300">?</td></tr>
              <tr><td className="p-2 border border-slate-300">2</td><td className="p-2 border border-slate-300">?</td><td className="p-2 border border-slate-300">?</td></tr>
            </tbody>
          </table>
        </TaskCard>

        <TaskCard number="3" title="Řada čtverců" taskId="3" showTeacher={teacherMode} teacherNote={<p>Délka strany je 30, mezera je 10. Obdélník se kreslí s šířkou 30 (např. <code>x, 100, x+30, 130</code>) a po jeho nakreslení se k x přičte 40: <code>x = x + 40</code>.</p>}>
          <p>Vytvoř nový program <code>rada_ctvercu.py</code> a v něm pomocí tohoto nového triku s přičítáním k proměnné (<code>x = x + něco</code>) nakresli do jedné řady přesně 9 malých čtverců vedle sebe.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Délka strany čtverce je 30.</li>
            <li>Mezera mezi nimi je 10.</li>
            <li>Použij proměnnou <code>x</code>, kterou na začátku (před cyklem!) nastavíš na 10 a uvnitř cyklu ji po nakreslení každého čtverce zvětšíš přesně o 40.</li>
          </ul>
          <CanvasPreview width={300} height={100} className="border-none shadow-none bg-white">
            {Array.from({ length: 9 }).map((_, i) => (
              <Rect key={i} x1={10 + i * 40} y1={30} width={30} height={30} fill="red" />
            ))}
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="4" title="Zlatý poklad" taskId="4" showTeacher={teacherMode} teacherNote={<p>Do cyklu přibude náhodnost! Do pomocné proměnné, třeba <code>a = random.randint(10, 40)</code>, se vygeneruje velikost strany. Nakreslí se čtverec a poté se <code>x</code> zvětší přesně o velikost <code>a</code> (tedy <code>x = x + a</code>)!</p>}>
          <p>Zlatokop našel poklad – 10 zlatých krychliček, ale každá má úplně jinou náhodnou velikost. Tyto krychličky postupně ukládal na stůl těsně jednu vedle druhé, takže mezi nimi není žádná mezera.</p>
          <p>Vytvoř program <code>zlaty_poklad.py</code>, který takový poklad nakreslí (na jednu rovnou čáru dolů).</p>
          <p className="text-orange-700 font-bold mt-2">Nápověda k postupu:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Každá zlatá krychlička má v cyklu náhodně zvolenou velikost do proměnné <code>a</code> (např. od 10 do 40).</li>
            <li>Použij proměnnou <code>x</code>, která se bude starat o pozici zleva, tak jako v minulé úloze.</li>
            <li>Ale jak tentokrát po nakreslení čtverce posunout x, když pokaždé čtverec zabral různě velký kus místa? Úplně jednoduše: přičti k němu tu vylosovanou šířku z proměnné! (<code>x = x + a</code>)</li>
          </ul>
        </TaskCard>

        <TaskCard number="5" title="Mezery v pokladu" taskId="5" showTeacher={teacherMode} teacherNote={<p>Úprava spočívá ve změně řádku posunu: <code>x = x + a + 5</code>.</p>}>
          <p>Vylepši tvůj předchozí program s pokladem jedinou malou úpravou. Zlatokop ty krychličky začal skládat trošku dál od sebe, takže mezi každou z nich má být mezera o velikosti přesně 5 pixelů. Uprav ten výpočet, kterým zvětšuješ <code>x</code>!</p>
        </TaskCard>

        <TaskCard number="6" title="Počítáme skóre z levelů" taskId="6" showTeacher={teacherMode} teacherNote={<p>Zde se v proměnné ukládá "akumulátor" (postupná suma). <code>skore = 0</code>, v cyklu pak <code>skore = skore + (i + 1)</code>.</p>}>
          <p>Hrajeme počítačovou hru, která má 10 úrovní (levelů). Po úspěšném průchodu libovolným levelem získáš tolik bodů, jaké je číslo daného levelu! (Tedy po prvním levelu získáš 1 bod, po druhém 2 body atd.).</p>
          <p>Vytvoř program <code>skore_hry.py</code>, který pomocí cyklu vypočítá tvoje celkové skóre. Vytvoř si na začátku programu mimo cyklus proměnnou <code>skore = 0</code>. V každém kole cyklu k tomuto skóre přičti "číslo aktuálního levelu" (které lze odvodit z naší proměnné <code>i</code>!).</p>
          <div className="bg-black p-4 text-emerald-400 font-mono text-sm rounded-xl">
            Po levelu 1 bude tvé skóre 1 bodů.<br/>
            Po levelu 2 bude tvé skóre 3 bodů.<br/>
            Po levelu 3 bude tvé skóre 6 bodů.<br/>
            Po levelu 4 bude tvé skóre 10 bodů.<br/>
            ...
          </div>
          <p className="font-bold mt-2">Jaké bude tvé celkové skóre po průchodu celou desátou úrovní?</p>
        </TaskCard>

        <TaskCard number="7" title="Šachovnice s pšenicí" taskId="7" showTeacher={teacherMode} teacherNote={<p>Cílem je zrní sčítat na šachovnici 64 polí. V prvním (i=0) dá 10, v druhém (i=1) 20 atd. Formule pro přičítané zrno v daném kroku je <code>(i+1)*10</code>, což se v cyklu hází do akumulátoru: <code>zrnek = zrnek + (i+1)*10</code>. Celkem by to mělo po 64 průchodech vyhodit 20800.</p>}>
          <p>Znáš tu starou pověst o králi, který slíbil mudrci za odměnu tolik zrnek pšenice, kolik jich bude na šachovnici? Zkusíme si to naprogramovat!</p>
          <p>Král mudrci dovolil, aby si dal na první políčko 10 zrnek, na druhé 20, na třetí 30 a tak dále (pokaždé o 10 víc). Šachovnice má přesně 64 políček.</p>
          <p>Vytvoř program <code>zrnka_sachovnice.py</code> a pomocí cyklu zjisti (a na konci jedním printem vypiš), kolik zrnek dohromady musel král nakonec odevzdat!</p>
        </TaskCard>

        <TaskCard number="8" title="Skutečná pověst (Dvojnásobek)" taskId="8" showTeacher={teacherMode} teacherNote={<p>Mnohem děsivější varianta. Zde mudrc žádal vždy dvojnásobek zrnek z předešlého pole! Políček je 64. V prvním dal 1 zrnko. Ve druhém 2. Ve třetím 4. Ve čtvrtém 8. (Tedy mocniny: <code>policko = policko * 2</code> nebo <code>2**i</code>). Do akumulátoru sčítá: <code>zrnek = zrnek + policko</code>. Výsledek je gigantický: cca 18.4 trilionů zrn (18 446 744 073 709 551 615)!</p>}>
          <p>Jiná verze pověsti praví, že král byl napálen a že to bylo mnohem horší! Mudrc chtěl na první políčko dát jen ubohé 1 zrnko. Ale na každé další políčko žádal dát přesně <strong>dvakrát více zrnek než na to předchozí</strong> (takže: 1, 2, 4, 8, 16, 32, 64...).</p>
          <p>Uprav svůj program z předchozího úkolu tak, aby odhalil, kolik zrnek celkem král mudrci odevzdal v této verzi. Z výsledku ti asi spadne brada – je to ohromné číslo.</p>
        </TaskCard>

        <TaskCard number="9*" title="Vysílač Ještěd" taskId="9" showTeacher={teacherMode} teacherNote={<p>Úloha na dvě proměnné zmenšované/zvětšované v cyklu zároveň! Kreslí se odzdola, kde má první obdélník a=210, b=10, y=250. V cyklu: nakreslí <code>rect(190-a/2, y-b, 190+a/2, y)</code>, pak se obě proměnné zmenší/zvětší: <code>y = y-b</code> (posun nahoru přesně o výšku předchozího patra), <code>a = a-40</code> (zúžení), <code>b = b+10</code> (patro je vyšší). Toto 6x zopakováno postaví věž!</p>}>
          <p className="flex items-center gap-2 font-bold text-orange-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Vytvoř program <code>jested.py</code>, který pomocí cyklu nakreslí úžasný model vysílače na Ještědu!</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>Kreslení začni úplně od spodního obdélníku. Nastav mu startovní šířku (např. do proměnné <code>a=210</code>) a výšku (např. <code>b=10</code>).</li>
            <li>Každý další obdélník postavený na něm se musí <strong>zúžit o 40</strong> (tzn. nová šířka bude menší: <code>a = a - 40</code>).</li>
            <li>A zároveň se každý další obdélník <strong>natáhne na výšku o 10 víc</strong> než ten pod ním (tzn. nová výška bude větší: <code>b = b + 10</code>).</li>
            <li>Nezapomeň při každém kroku zmenšovat svou startovní kreslící souřadnici <code>y</code> o tu minulou výšku <code>b</code>, ať na sobě patra přesně sedí a stavba roste směrem vzhůru!</li>
          </ul>
          <CanvasPreview width={300} height={200}>
            {Array.from({ length: 6 }).map((_, i) => {
              // start conditions
              let a = 210, b = 10, y = 190;
              // fast forward state
              for(let j=0; j<i; j++) {
                y -= b;
                a -= 40;
                b += 10;
              }
              return <Rect key={i} x1={150 - a/2} y1={y - b} width={a} height={b} fill="silver" />;
            })}
          </CanvasPreview>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonExpressionsChapter;
