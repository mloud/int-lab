'use client';
import React from 'react';
import { Zap, Code } from 'lucide-react';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import { createTaskKit, useTeacherMode, TeacherPinBar } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'purple',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py4', id),
});


interface PythonOutputsChapterProps {
  onBack: () => void;
}

const PythonOutputsChapter: React.FC<PythonOutputsChapterProps> = ({ onBack }) => {
  const teacher = useTeacherMode();
  const { teacherMode } = teacher;

  return (
    <FsChapterShell
      title="Výpisy"
      subtitle="Lekce 4"
      icon={<Zap className="w-8 h-8 text-purple-600" />}
      onBack={onBack}
      accentColor="purple"
      tabs={[{ id: 'lekce', label: 'Lekce 4', icon: Code }]}
    >
      <TeacherPinBar tone="purple" state={teacher} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <TaskCard number="1" title="" taskId="1" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print('Dobrý den')</code><br/><code>print('Začíná programování')</code></p>}>
          <p>Vytvoř program <code>zaciname.py</code>, který tě po spuštění přivítá zprávou se dvěma řádky:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Dobrý den<br/>
Začíná programování
          </div>
        </TaskCard>

        <TaskCard number="2" title="" taskId="2" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>print(1 * 1)</code><br/><code>print(11 * 11)</code><br/><code>...</code><br/><code>print(111111111 * 111111111)</code></p>}>
          <p>Doplň do předchozího programu příkazy <code>print</code> a vypiš pomocí nich pod sebou hodnoty výrazů: <code>1*1</code>, <code>11*11</code>, <code>111*111</code>, <code>1111*1111</code>, …, <code>111111111*111111111</code>.</p>
        </TaskCard>

        <TaskCard number="3" title="" taskId="3" showTeacher={teacherMode}>
          <p>I ve svém programu můžeš používat proměnné – vytvoř program <code>vek.py</code>, který bude obsahovat následující kód, a spusť jej:</p>
          <PythonSnippet code={`vek = 16\nprint('Je mi', vek, 'let')`} />
          <p>Když program spustíš, vypíše se:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Je mi 16 let
          </div>
        </TaskCard>

        <TaskCard number="4" title="" taskId="4" showTeacher={teacherMode} teacherNote={<p>Je chybou použít <code>print('Příští rok mi bude 17 let')</code>, protože číslo je „zadrátované“ natvrdo. Správně je:<br/><code>print('Příští rok mi bude', vek + 1, 'let')</code></p>}>
          <p>Přidej na konec programu <code>vek.py</code> další příkaz, pomocí kterého vypíšeš zprávu:</p>
          <div className="font-mono bg-slate-50 p-2 rounded-lg text-sm mb-4">
Příští rok mi bude 17 let
          </div>
          <p>Až budeš mít hotovo, program otestuj.</p>
        </TaskCard>

        <TaskCard number="5" title="" taskId="5" showTeacher={teacherMode}>
          <p>Představ si, že program <code>vek.py</code> spustí tvůj otec. Vyzkoušej program za něj – dosaď do proměnné <code>vek</code> skutečný věk tvého otce. Zobrazí mu program <code>vek.py</code> správný výsledek i na druhém řádku svého výstupu? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="6" title="" taskId="6" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>penize = 250</code><br/><code>platba = 180</code><br/><code>print('Mám', penize, 'korun')</code><br/><code>print('Platím', platba, 'korun')</code><br/><code>print('Zbyde mi', penize - platba, 'korun')</code></p>}>
          <p>Vytvoř program <code>penezenka.py</code>. Na začátku přiřaď do proměnně <code>penize</code>, kolik korun máš. Do proměnné <code>platba</code> přiřaď cenu nákupu. Použij proměnné a vypiš pomocí nich:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Mám ... korun<br/>
Platím ... korun<br/>
Zbyde mi ... korun
          </div>
          <p className="mt-4">V následujících úlohách se <strong>tučně zvýrazněné</strong> hodnoty mohou měnit. Ve výpisech nepiš konkrétní čísla, ale použij vytvořené proměnné.</p>
        </TaskCard>

        <TaskCard number="7" title="" taskId="7" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>sirka = 50</code><br/><code>delka = 80</code><br/><code>pocet_kol = 7</code><br/><code>print('Šířka hřiště je', sirka, 'metrů, délka je', delka, 'metrů')</code><br/><code>print('Jedno kolo okolo hřiště je', 2 * (sirka + delka), 'metrů')</code><br/><code>print('Po', pocet_kol, 'kolech uběhneš', pocet_kol * 2 * (sirka + delka), 'metrů')</code></p>}>
          <p>Školní hřiště má šířku <strong>50</strong> metrů a délku <strong>80</strong> metrů. V rámci tělocviku budeš běhat po jeho obvodě. Vytvoř program <code>hriste.py</code>, který spočítá a vypíše, kolik metrů uběhneš po <strong>7</strong> kolech. Na začátku programu přiřaď do proměnné <code>sirka</code> hodnotu <strong>50</strong>, do proměnné <code>delka</code> hodnotu <strong>80</strong> a do proměnné <code>pocet_kol</code> hodnotu <strong>7</strong> a pomocí těchto proměnných vypiš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Šířka hřiště je 50 metrů, délka je 80 metrů<br/>
Jedno kolo okolo hřiště je 260 metrů<br/>
Po 7 kolech uběhneš 1820 metrů
          </div>
          <p className="mt-4">Předpokládejme nyní, že školní hřiště má šířku <strong>45</strong> metrů a délku <strong>70</strong> metrů. Přiřaď tedy do proměnné <code>sirka</code> hodnotu <strong>45</strong> a do proměnné <code>delka</code> hodnotu <strong>70</strong>. Zobrazí program správné hodnoty na druhém a na třetím řádku svého výstupu? Jestli ne, program oprav.</p>
        </TaskCard>

        <TaskCard number="8" title="" taskId="8" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>puvodni_cena = 199</code><br/><code>sleva = 20</code><br/><code>cena_po_sleve = puvodni_cena * (1 - sleva / 100)</code><br/><code>print('Cena alba je', puvodni_cena, 'korun')</code><br/><code>print('Sleva činí', sleva, 'procent')</code><br/><code>print('Zaplatíš', cena_po_sleve, 'korun')</code><br/><br/>Pro původní cenu 399 a slevu 30 % program vypíše zaplatíš 279.3 korun.</p>}>
          <p>Internetový obchod s hudbou nabízí <strong>20</strong>% slevu. Chceš si koupit album, jehož původní cena byla <strong>199</strong> korun. Napiš program <code>sleva.py</code>, který vypočítá, kolik zaplatíš. V programu použij proměnné <code>puvodni_cena</code>, <code>sleva</code>, <code>cena_po_sleve</code> a pomocí nich proveď výpočty a vypiš:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Cena alba je 199 korun<br/>
Sleva činí 20 procent<br/>
Zaplatíš 159.2 korun
          </div>
          <p className="mt-4">Jakou výslednou cenu program vypíše pro album, jehož původní cena byla <strong>399</strong> korun, jestliže sleva činí <strong>30</strong> %?</p>
        </TaskCard>

        <TaskCard number="9*" title="" taskId="9" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>puvodni_cena = 256</code><br/><code>cena_po_sleve = 214</code><br/><code>sleva = (1 - cena_po_sleve / puvodni_cena) * 100</code><br/><code>print('Cena alba je', puvodni_cena, 'korun')</code><br/><code>print('Sleva činí', sleva, 'procent')</code><br/><code>print('Zaplatíš', cena_po_sleve, 'korun')</code><br/><br/>Pro původní cenu 250 a cenu po slevě 230 vypíše slevu 8 procent.</p>}>
          <p>9* Uprav program <code>sleva.py</code> tak, aby byl schopen spočítat výši slevy, jestliže původní cena alba byla <strong>256</strong> korun a cena alba po slevě je <strong>214</strong> korun.</p>
          <p>Jakou výši slevy program vypíše pro album, jehož původní cena byla <strong>250</strong> korun a cena po slevě je <strong>230</strong> korun?</p>
        </TaskCard>

        <TaskCard number="10" title="" taskId="10" showTeacher={teacherMode} teacherNote={<p>Řešení:<br/><code>pocet1 = 3</code><br/><code>pocet2 = 2</code><br/><code>pocet3 = 5</code><br/><code>print('Počet příspěvků od Aleny:', pocet1)</code><br/><code>print('Počet příspěvků od Petra:', pocet1 * pocet2)</code><br/><code>print('Počet příspěvků od Pavly:', pocet1 * pocet3 + pocet1 * pocet2 * pocet3)</code></p>}>
          <p>Kamarádi Alena, Petr a Pavla diskutují na sociální síti. Alena napsala <strong>3</strong> příspěvky. Petr na každý z nich poslal <strong>2</strong> odpovědi. Pavla všechno komentuje a ke každému z příspěvků Aleny a Petra poslala <strong>5</strong> komentářů. Napiš program <code>diskuze.py</code>, který tuto diskuzi zhodnotí:</p>
          <div className="font-mono bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm whitespace-pre">
Počet příspěvků od Aleny: 3<br/>
Počet příspěvků od Petra: 6<br/>
Počet příspěvků od Pavly: 45
          </div>
          <p className="mt-4">Program vytvoř tak, aby se na začátku do proměnných <code>pocet1</code>, <code>pocet2</code> a <code>pocet3</code> přiřadil počet příspěvků Aleny, počet odpovědí na každý z nich od Petra a počet komentářů na každý z příspěvků od Pavly.</p>
        </TaskCard>

        <TaskCard number="11" title="" taskId="11" showTeacher={teacherMode} teacherNote={<p>Pro 4 příspěvky Aleny (<code>pocet1 = 4</code>) vypíše program 60 pro Pavlu.</p>}>
          <p>Kolik komentářů by podle tvého programu musela napsat Pavla, jestliže by Alena napsala <strong>4</strong> příspěvky? Počet odpovědí Petra a Pavly a způsob výpočtu se nemění.</p>
        </TaskCard>

      </div>
    </FsChapterShell>
  );
};

export default PythonOutputsChapter;
