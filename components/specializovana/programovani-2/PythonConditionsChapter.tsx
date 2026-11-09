'use client';
import React from 'react';
import { GraduationCap, GitBranch, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar, CanvasPreview } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'red',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py16', id),
});


interface PythonConditionsChapterProps {
  onBack: () => void;
}

const Oval = ({ x1, y1, width, height, fill = "transparent", noBorder = false }: { x1: number, y1: number, width: number, height: number, fill?: string, noBorder?: boolean }) => (
  <div 
    className={`absolute ${noBorder ? '' : 'border border-black'} rounded-[50%]`} 
    style={{ left: x1, top: y1, width, height, backgroundColor: fill }} 
  />
);

const PythonConditionsChapter: React.FC<PythonConditionsChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Větvení (if / else)"
      subtitle="Rozhodování počítače a podmínky (iMyšlení Lekce 16)"
      icon={<GitBranch className="w-8 h-8 text-red-600" />}
      onBack={onBack}
      accentColor="red"
      tabs={[{ id: 'lekce', label: 'Lekce 16', icon: Code }]}
    >
      <TeacherPinBar tone="red" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl mb-8">
          <h2 className="font-black text-red-900 text-lg mb-2">Instrukce</h2>
          <p className="text-red-800/80 text-sm sm:text-base">
            Otevři si Thonny nebo IDLE na levé polovině obrazovky. Dosud tvoje programy dělaly vždy jedno a to samé dokolečka. Odteď ale dostanou inteligenci! Podle nějaké podmínky (třeba jakou ti uživatel zadá teplotu nebo jestli hráč nasbíral dost bodů) se dokážou rozhodnout, jakou cestou se vydají. Naučíme se psát příkazy <code>if</code> a <code>else</code>!
          </p>
        </div>

        <TaskCard number="1" title="Opakování: Velký semafor" taskId="1" showTeacher={teacherMode} teacherNote={<p>Úloha jen na ruční poskládání tří elips pod sebe (s červenou, žlutou a zelenou výplní), oboje o průměru třeba 50 pixelů.</p>}>
          <p>Na rozehřátí nakresli klasický semafor. Vytvoř program <code>semafor_velky.py</code>, který pomocí tří barevných kruhů pod sebou (bez použití cyklů, prostě ručně) nakreslí semafor se třemi světly.</p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={150-25} y1={50-25} width={50} height={50} fill="red" />
            <Oval x1={150-25} y1={100-25} width={50} height={50} fill="gold" />
            <Oval x1={150-25} y1={150-25} width={50} height={50} fill="green" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="2" title="Pravda nebo Lež?" taskId="2" showTeacher={teacherMode} teacherNote={<p>Žáci poprvé objevují, že program umí vyhodnocovat znaky větší/menší jako matematickou pravdu (True/False).</p>}>
          <p>Než se vrhneme na samotné rozhodování (if), musíš pochopit, jak vlastně počítač přemýšlí o pravdě a lži.</p>
          <p>Napiš do spodního interaktivního příkazového řádku (tam, kde blikají šipky <code>{">>>"}</code>) tento výraz a stiskni Enter:</p>
          <PythonSnippet code={`>>> 1 < 2`} />
          <p>Počítač ta čísla porovná a vyhodí anglické slůvko <code>True</code>, což znamená PRAVDA! Ano, jednička opravdu je menší než dvojka.</p>
          <p className="font-bold text-red-700">A teď vyzkoušej, co počítač odpoví, když se ho zeptáš na lež. Co vyplivne, když do terminálu zadáš <code>3 {">"} 4</code>?</p>
        </TaskCard>

        <TaskCard number="3" title="Složitější výroky" taskId="3" showTeacher={teacherMode} teacherNote={<p>Testujeme prioritu operátorů (závorky a násobení se řeší dříve než porovnávání `&lt;`). V (c) se porovnává 9 a 7, takže je to lež.</p>}>
          <p>Počítač ale dokáže vyhodnocovat úplné matematické šílenosti a vzorce, než se rozhodne, jestli je to True nebo False. Jaké výsledky na tebe vyhodí u těchto čtyř tvrzení?</p>
          <ul className="list-disc pl-5 mt-2 space-y-3 font-mono bg-slate-50 p-4 rounded-xl text-sm">
            <li><span className="font-sans font-bold">a)</span> {">>>"} 1 + 2 {">"} 3</li>
            <li><span className="font-sans font-bold">b)</span> {">>>"} -1 {">"} -2</li>
            <li><span className="font-sans font-bold">c)</span> {">>>"} (1 + 2) * 3 {"<"} 1 + 2 * 3</li>
            <li><span className="font-sans font-bold">d)</span> {">>>"} a = 100<br/>{">>>"} a {"<"} 101</li>
          </ul>
        </TaskCard>

        <TaskCard number="4" title="Teplo nebo Zima" taskId="4" showTeacher={teacherMode} teacherNote={<p>Základní zavedení if/else struktury. Zásadní je pohlídat, že po slovech <code>if ...:</code> a <code>else:</code> následují dvojtečky, a po odentrování Python automaticky odsadí nový řádek. Tento řádek tvoří tzv. <strong>větev větvení</strong>. Pokud není odsazen, dojde k chybě.</p>}>
          <p>Teď konečně vytvoříme chytrou aplikaci! Chceme vytvořit program <code>teplo_zima.py</code>, který by nám po svém spuštění vždy sám ohlásil, zda je venku teplo, nebo zima.</p>
          <p>Bude to fungovat tak, že do proměnné <code>teplota</code> nahoře napevno napíšeš číslo. A pokud je teplota větší než 20, počítač odsekne že je teplo. JINAK řekne že je zima.</p>
          <PythonSnippet code={`teplota = 25\nprint('Je', teplota, 'stupňů.')\n\nif teplota > 20:\n    print('Dnes je teplo.')\nelse:\n    print('Dnes je zima.')\n\nprint('Správně se obleč.')`} />
          <p className="font-bold text-red-700">Přepiš to a spusť. Dvojtečky na konci <code>if:</code> a <code>else:</code> jsou extrémně důležité, nezapomeň na ně! Stejně tak odsazení u obou vnořených printů.</p>
        </TaskCard>

        <TaskCard number="5" title="Testujeme inteligenci" taskId="5" showTeacher={teacherMode} teacherNote={<p>Triviální úprava proměnné teplota zkoumá, jestli žáci pochopili, jak ten program reaguje na různé vstupy (že "skočí" do bloku else, když podmínka nevyjde).</p>}>
          <p>Změň v tvém hotovém programu <code>teplo_zima.py</code> úvodní hodnotu proměnné z původních 25 na pouhých <code>10</code>. Program znovu spusť.</p>
          <p>Dokázal se teď program vyhnout větvi "Dnes je teplo" a přeskočil rovnou do bloku "Dnes je zima"?</p>
        </TaskCard>

        <TaskCard number="6" title="Zimní úprava" taskId="6" showTeacher={teacherMode} teacherNote={<p>Úprava na <code>if teplota &lt; 0</code>. Else vypíše "Rukavice nejsou potřeba".</p>}>
          <p>Pojďme naučit tvůj program radit s oblečením! Smaž obsah <code>if / else</code> a naprogramuj to znovu podle těchto pravidel:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>Pokud budou venku <strong>záporné teploty</strong> (tzn. teplota bude menší než nula), program vypíše "Vezmi si rukavice".</li>
            <li>Jinak (tzn. pro nulu a všechny kladné čísla) program vypíše "Rukavice nejsou potřeba".</li>
          </ul>
          <p className="mt-2 text-red-700 font-bold">Otestuj to s čísly 10, -5 a 0. Opravdu to doporučilo rukavice jenom u té -5?</p>
        </TaskCard>

        <TaskCard number="7" title="Pošta a zmrzlinárna" taskId="7" showTeacher={teacherMode} teacherNote={<p>Obě úlohy jsou další variací na jednoduchý <code>if/else</code> pro peněžní výpočty. U zmrzliny navíc výsledek vyžaduje i matematiku s proměnnou (<code>pocet * 20</code> a <code>pocet * 25</code>).</p>}>
          <p>Dva rychlé programátorské úkoly pro tebe! Vyber si aspoň jeden z nich a naprogramuj to.</p>
          <p className="font-bold mt-4 mb-1">Úkol A) Česká pošta</p>
          <p className="text-sm">Vytvoř <code>cena_dopisu.py</code>, který zjistí cenu dopisu z jeho hmotnosti. Na začátku přiřaď např. <code>hmotnost = 100</code>. Napiš podmínku, že pokud je dopis těžší než 50 gramů, vypíše se "Zaplatíš 55 korun", ale JINAK se vypíše "Zaplatíš 47 korun".</p>
          
          <p className="font-bold mt-4 mb-1">Úkol B) Množstevní sleva</p>
          <p className="text-sm">Vytvoř <code>zmrzlina.py</code>. Jeden kopeček stojí 25 korun. Zmrzlinář ale láká na slevu: kdo si dá víc než 4 kopečky, bude mít každý z nich jen za 20 korun! Zkus naprogramovat <code>if/else</code> systém, do kterého dáš proměnnou počtu kopečků (např. <code>pocet = 5</code>) a ono to přes <code>pocet * 20</code> (nebo <code>pocet * 25</code> ve větvi else) vypočítá konečnou cenu k placení!</p>
        </TaskCard>

        <TaskCard number="8" title="Chytrý semafor" taskId="8" showTeacher={teacherMode} teacherNote={<p>Úloha kombinuje podmínky a grafiku! Do <code>if</code> bloku se dá kreslení červeného kola, do <code>else</code> zeleného.</p>}>
          <p>Nyní přidáme trochu inteligence i do plátna s grafikou! Vrať se ke svému starému programu se semaforem, ten všechno jen nudně tiskl přes sebe.</p>
          <p>Přidej nahoru proměnnou <code>cas = 5</code> (představuje 5. sekundu na světelné křižovatce). Následně vymaž ty své tři příkazy s kreslením elips a nahraď to chytrou podmínkou <code>if / else</code>.</p>
          <p><strong>Nová pravidla semaforu:</strong></p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Když je čas na semaforu MENŠÍ než 30 vteřin, nakreslí se uprostřed plátna POUZE červený kruh.</li>
            <li>Jinak (tzn. pokud je 30 a více) se na plátně dole nakreslí POUZE kruh zelený! (Pro teď se smíříme se semaforem beze žluté).</li>
          </ul>
        </TaskCard>

        <TaskCard number="9" title="Zhasnutá světla" taskId="9" showTeacher={teacherMode} teacherNote={<p>A tohle je mistrovská kombinace. Nahoře se přes sebe normálně bezpodmínečně vytečkují tři tmavě šedé kruhy (jakožto "prázdná nesvítící světla"). Teprve pod to se zařadí IF s červeným světlem a ELSE se zeleným, čímž to barevné nažhavené světlo šikovně zakryje to zhasnuté, zatímco zbytek zůstane tmavý.</p>}>
          <p>Náš chytrý semafor ale vypadá spíše jako divné vznášející se kolečko ve vesmíru, místo aby na něm byla vidět i ta prázdná, zhasnutá nesvítící sklíčka.</p>
          <p>Než se program dostane ke tvé chytré <code>if/else</code> rozbočce s rozsvěcováním těch správných barev, nakresli úplně nahoře prostě natvrdo přes sebe všechna ta 3 sklíčka, ale vyplň je barvou <code>'gray'</code> (šedá). Když pak dole počítač spustí tvůj IF a rozhodne se rožnout třeba červenou, prostě ho tím přemaluje přes ten dříve nakreslený šedý, zatímco zelený vespod zůstane zhasnutý šedivý!</p>
          <CanvasPreview width={300} height={200}>
            <Oval x1={150-25} y1={40-25} width={50} height={50} fill="red" />
            <Oval x1={150-25} y1={100-25} width={50} height={50} fill="gray" />
            <Oval x1={150-25} y1={160-25} width={50} height={50} fill="gray" />
          </CanvasPreview>
        </TaskCard>

        <TaskCard number="10*" title="Obdélníkový souboj" taskId="10" showTeacher={teacherMode} teacherNote={<p>Pokud a=50, b=100 a my to chceme naležato, tak `width` musí být to větší číslo z nich, a `height` to menší. O to se tady musí podmínkou postarat (když a &gt; b pak a je šířka... atd.).</p>}>
          <p className="flex items-center gap-2 font-bold text-red-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Máme krabici s nějakými uloženými velikostmi stran (např. do proměnných vložíš <code>a = 50</code>, <code>b = 100</code>). Chceme tu krabici ale položit na zem vždycky tou její delší stranou a nakreslit ji jako červený obdélník naležato.</p>
          <p>Vytvoř program <code>krabice.py</code>, který vždy dokáže správně rozhodnout, jak má ten obdélník do plátna zapsat tak, aby to delší číslo (ať už je uloženo v ačku nebo béčku) sloužilo pro určení šířky na zemi, a to menší číslo udávalo výšku krabice.</p>
        </TaskCard>

        <TaskCard number="11*" title="Nepřekrývající se kruhy" taskId="11" showTeacher={teacherMode} teacherNote={<p>Další skvělý expertní úkol. Pokud totiž velký kruh nakreslíš později, tak ten malý kruh překryje a z plátna ho nevratně zamaže a vyzmizíkuje. Žáci tedy musí napsat <code>if r1 &lt; r2</code> a podle toho rozvrhnout i to <strong>pořadí kreslení obou elips v kódu</strong>, aby ten obří kruh šel do plátna zapsat a vymalovat vždycky jako první (aby sloužil jako ten spodní pozadí) a ten menší přes něj jako druhý.</p>}>
          <p className="flex items-center gap-2 font-bold text-red-600 mb-2">
            <GraduationCap className="w-5 h-5" /> Výzkumný úkol pro experty
          </p>
          <p>Zkus vymyslet program <code>kruhy_nad_sebou.py</code>. Nadefinuješ si dva rozdílné poloměry, třeba <code>r1 = 30</code>, <code>r2 = 20</code> (nebo i naopak, aby to byla sranda a program se s tím musel poprat).</p>
          <p>A ty chceš, aby program tyhle dvě modré kružnice položil na plátně na sebe (na střed). Jistě si ale pamatuješ ten trapas s tím, když počítač vymaluje obrovský kruh přes ten menší – prostě mu ho smaže! Vymysli tedy if a else tak, aby to ten kruh s VĚTŠÍM POLOMĚREM nakreslilo a vymalovalo jako úplně první z obou.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonConditionsChapter;
