"use client";

import React, { useState } from 'react';
import {
  Blocks,
  Lock,
  Unlock,
  CheckCircle,
  Save,
  ListOrdered,
  Database,
  ListPlus,
  Trash2,
  Search,
  Dices,
  Trophy,
  Sparkles,
  ShoppingBag,
  Backpack,
  ShieldCheck,
  Calculator,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FsChapterShell } from '@/components/specializovana/operacni-systemy/souborove-systemy/FsShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchCElseBlock,
  ScratchReporter,
  ScratchDefBlock,
  ScratchParam,
  ScratchSpeechBubble
} from './ScratchBlocks';

const TeacherNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm animate-in fade-in zoom-in-95">
    <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
      <Unlock className="w-4 h-4" />
      Metodická poznámka pro učitele
    </div>
    <div className="text-sm text-slate-700 leading-relaxed">
      {children}
    </div>
  </div>
);

const TaskCard = ({
  number,
  title,
  children,
  teacherNote,
  showTeacher,
  taskId,
  saveAs
}: {
  number: string,
  title: string,
  children: React.ReactNode,
  teacherNote?: React.ReactNode,
  showTeacher?: boolean,
  taskId: string,
  saveAs?: string
}) => {
  const [completed, setCompleted] = useLocalStorage(`scratch-task-${taskId}-completed`, false);

  return (
    <div className={`
      bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 transition-all duration-300
      ${completed ? 'border-amber-200 bg-amber-50/10' : 'border-white'}
    `}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 font-black text-xl shrink-0">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">{title}</h3>
            {saveAs && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 mt-1 uppercase tracking-wider">
                <Save className="w-3.5 h-3.5" />
                Uložit jako: {saveAs}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setCompleted(!completed)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors
            ${completed
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
            }
          `}
        >
          <CheckCircle className={`w-5 h-5 ${completed ? 'opacity-100' : 'opacity-50'}`} />
          {completed ? 'Hotovo' : 'Označit za hotové'}
        </button>
      </div>

      <div className="text-slate-700 text-sm leading-relaxed space-y-4">
        {children}
      </div>

      {showTeacher && teacherNote && (
        <TeacherNote>{teacherNote}</TeacherNote>
      )}
    </div>
  );
};

export const ScratchListsChapter = ({ onBack }: { onBack?: () => void }) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState("");

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234" || pin === "OS2026") {
      setTeacherMode(true);
      setPinMode(false);
      setPin("");
    }
  };

  return (
    <FsChapterShell
      title="Seznamy a práce s daty (Lekce 6)"
      subtitle="Objev sílu polí a seznamů: jak uložit inventář hráče, nákupní lístek, tabulku nejlepších skóre a jak v datech vyhledávat."
      icon={<ListOrdered className="w-8 h-8 text-white" />}
      accentColor="border-amber-500"
      onBack={onBack}
    >
      {/* Tlačítko pro metodický režim */}
      <div className="flex justify-end mb-6">
        {teacherMode ? (
          <button
            onClick={() => setTeacherMode(false)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-all"
          >
            <Unlock className="w-4 h-4" />
            Metodický režim aktivní (Skrýt řešení)
          </button>
        ) : pinMode ? (
          <form onSubmit={handlePinSubmit} className="flex gap-2">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN"
              className="w-24 px-3 py-1 text-xs border-2 border-slate-300 rounded-xl outline-none focus:border-amber-500 font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 text-xs bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
            >
              OK
            </button>
          </form>
        ) : (
          <button
            onClick={() => setPinMode(true)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl transition-all"
          >
            <Lock className="w-4 h-4" />
            Učitelský režim (PIN)
          </button>
        )}
      </div>

      {/* Úvodní výkladový blok – Teorie */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-white mb-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <Database className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            Co je to seznam a proč už nám proměnná nestačí?
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Doposud jsme používali <strong>proměnné</strong>. Proměnná je jako <em>jedna krabička</em> s popiskem – pojme v danou chvíli pouze
          jednu jedinou hodnotu (např. jedno číslo pro skóre nebo jedno slovo pro jméno hráče). Když do ní uložíme novou hodnotu, původní se přepíše a ztratí.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-4">
            <h4 className="font-black text-amber-900 text-sm uppercase mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Proměnná (Běžná krabička)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pojme <strong>pouze 1 položku</strong>. Hodí se na skóre, životy, rychlost nebo aktuální čas.
            </p>
          </div>

          <div className="bg-orange-50/60 border-2 border-orange-200 rounded-2xl p-4">
            <h4 className="font-black text-orange-900 text-sm uppercase mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
              Seznam / Pole (Pořadač s přihrádkami)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Může obsahovat <strong>neomezeně mnoho položek</strong> pod jedním jménem. Každá položka má své pevné číslo – <strong>index</strong> (1, 2, 3...).
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide mb-2">
            Kde se seznamy používají v praxi a hrách?
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
            <li><strong>Inventář hráče v RPG:</strong> seznam sebraných předmětů (meč, štít, lektvar, zlaťáky).</li>
            <li><strong>Tabulka nejvyšších skóre (High Scores):</strong> TOP 10 nejlepších výsledků na herním automatu.</li>
            <li><strong>Hrací balíček karet:</strong> tahání karet z balíčku a jejich vyřazování ze seznamu.</li>
            <li><strong>Slovník pro slovní fotbal / Šibenici:</strong> seznam slov, ze kterého počítač náhodně vybírá tajenku.</li>
          </ul>
        </div>

        <div className="pt-2">
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-wide mb-3">
            Klíčové bloky pro práci se seznamy (Kategorie Proměnné – Seznamy):
          </h4>
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <ScratchBlock category="lists">přidej <ScratchInput type="text">věc</ScratchInput> k <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchBlock category="lists">smaž <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchBlock category="lists">vlož <ScratchInput type="text">věc</ScratchInput> na pozici <ScratchInput>1</ScratchInput> v <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock>
            <ScratchReporter category="lists">položka <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchReporter>
            <ScratchReporter category="lists">délka <ScratchInput type="dropdown">seznam</ScratchInput></ScratchReporter>
            <ScratchHexagon category="lists"><ScratchInput type="dropdown">seznam</ScratchInput> obsahuje <ScratchInput type="text">věc</ScratchInput>?</ScratchHexagon>
          </div>
        </div>
      </div>

      {/* Kontejner úkolů – přesně v souladu s Pravidlem 6: flex flex-col gap-8 */}
      <div className="flex flex-col gap-8">
        {/* ÚKOL 1 */}
        <TaskCard
          number="1"
          title="Nákupní seznam a inicializace dat"
          taskId="lists-1"
          saveAs="NakupniSeznam.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Zlaté pravidlo seznamů:</strong> Seznamy v prostředí Scratch zůstávají uloženy i po zastavení programu (uchovávají svůj stav).
                Pokud na začátek scénáře nedáme blok <ScratchBlock category="lists">smaž všechno z [seznam]</ScratchBlock>,
                při každém novém stisku zelené vlajky se seznam nafoukne o další 4 položky.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Chléb</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Mléko</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Máslo</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">přidej <ScratchInput type="text">Jablka</ScratchInput> k <ScratchInput type="dropdown">nákup</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Seznam je připraven!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř program, který po startu připraví nákupní lístek do obchodu.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>V kategorii <strong>Proměnné</strong> klikni na tlačítko <em>„Vytvoř seznam“</em> a pojmenuj jej <span className="font-bold text-orange-600">nákup</span>. Na scéně se objeví tabulka.</li>
            <li>Po kliknutí na zelenou vlajku zajisti, aby se seznam nejprve úplně vyprázdnil blokem <ScratchBlock category="lists">smaž všechno z [nákup]</ScratchBlock>.</li>
            <li>Následně pomocí bloků <ScratchBlock category="lists">přidej [text] k [nákup]</ScratchBlock> vlož do seznamu 4 položky: <strong>Chléb</strong>, <strong>Mléko</strong>, <strong>Máslo</strong> a <strong>Jablka</strong>.</li>
            <li>Kocour na závěr oznámí: <em>„Máme nákupní seznam se 4 položkami!“</em>.</li>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3 text-xs text-amber-900">
            💡 <strong>Otázka k zamyšlení:</strong> Co by se stalo, kdybys blok <code>smaž všechno z nákup</code> vynechal a kliknul na zelenou vlajku třikrát za sebou? Vyzkoušej to!
          </div>
        </TaskCard>

        {/* ÚKOL 2 */}
        <TaskCard
          number="2"
          title="Interaktivní sběr položek do batohu"
          taskId="lists-2"
          saveAs="BatohHrace.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                Zde propojujeme dotazování <ScratchBlock category="sensing">zeptej se [] a čekej</ScratchBlock> s blokem <ScratchReporter category="sensing">odpověď</ScratchReporter> a vkládáním do seznamu.
                Využití cyklu učí žáka opakovanému volání téže sekvence.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">batoh</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>3</ScratchInput> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Co chceš sbalit do batohu?</ScratchInput> a čekej</ScratchBlock></div>
                      <div><ScratchBlock category="lists">přidej <ScratchReporter category="sensing">odpověď</ScratchReporter> k <ScratchInput type="dropdown">batoh</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (spoj [V batohu máš ] a (spoj <ScratchReporter category="lists">délka [batoh]</ScratchReporter> [ věci!])) na <ScratchInput>3</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř herní inventář, do kterého hráč sám zadává předměty, které si chce vzít na výpravu.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">batoh</span> a při startu jej vymaž.</li>
            <li>Pomocí cyklu <ScratchBlock category="control">opakuj (3) krát</ScratchBlock> se třikrát zeptej uživatele: <em>„Co chceš sbalit do batohu?“</em>.</li>
            <li>Každou zadanou hodnotu z <ScratchReporter category="sensing">odpověď</ScratchReporter> přidej do seznamu batohu.</li>
            <li>Po skončení cyklu kocour řekne celkový počet věcí v batohu pomocí bloku <ScratchReporter category="lists">délka [batoh]</ScratchReporter>.</li>
          </ol>
        </TaskCard>

        {/* ÚKOL 3 */}
        <TaskCard
          number="3"
          title="Použití předmětu a automatické posouvání indexů"
          taskId="lists-3"
          saveAs="InventarLektvaru.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Zásadní vlastnost Scratch seznamů:</strong> Když smažeme položku na pozici 1,
                druhá položka v pořadí se automaticky posune na pozici 1, třetí na pozici 2 atd.
                V seznamu nevznikají žádné „díry“.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po stisku klávesy [mezerník]</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    condition={<ScratchHexagon category="operators"><ScratchReporter category="lists">délka [lektvary]</ScratchReporter> &gt; <ScratchInput>0</ScratchInput></ScratchHexagon>}
                    elseChildren={
                      <div className="pl-2">
                        <ScratchBlock category="looks">bublina [Už nemáš žádné lektvary!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock>
                      </div>
                    }
                  >
                    <div className="pl-2 space-y-1">
                      <div>
                        <ScratchBlock category="looks">
                          bublina (spoj [Vypil jsi: ] <ScratchReporter category="lists">položka [1] z [lektvary]</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                        </ScratchBlock>
                      </div>
                      <div>
                        <ScratchBlock category="lists">smaž <ScratchInput>1</ScratchInput> z <ScratchInput type="dropdown">lektvary</ScratchInput></ScratchBlock>
                      </div>
                    </div>
                  </ScratchCElseBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            V dobrodružných hrách hrdina spotřebovává zásoby. Vyzkoušej si, jak funguje mazání položek a jak na něj seznam reaguje.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">lektvary</span> a při startu do něj vlož 4 položky: <em>Léčivý lektvar</em>, <em>Lektvar síly</em>, <em>Lektvar neviditelnosti</em> a <em>Mana lektvar</em>.</li>
            <li>Vytvoř scénář <ScratchBlock category="events">po stisku klávesy [mezerník]</ScratchBlock>:</li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Pokud je v seznamu alespoň 1 lektvar (<ScratchReporter category="lists">délka [lektvary]</ScratchReporter> &gt; 0), kocour řekne: <em>„Vypil jsi: [položka 1 z lektvary]“</em>.</li>
              <li>Následně smaž první položku blokem <ScratchBlock category="lists">smaž (1) z [lektvary]</ScratchBlock>.</li>
              <li>Pokud je seznam už prázdný, kocour oznámí: <em>„Nemáš žádné lektvary!“</em>.</li>
            </ul>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mt-3 text-xs text-amber-900">
            🔍 <strong>Sleduj tabulku na obrazovce:</strong> Stiskni mezerník. Který lektvar se stal novou položkou č. 1?
          </div>
        </TaskCard>

        {/* ÚKOL 4 */}
        <TaskCard
          number="4"
          title="VIP Vstupní brána – Test přítomnosti v seznamu"
          taskId="lists-4"
          saveAs="VipBrana.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                Blok <ScratchHexagon category="lists">[seznam] obsahuje [věc]?</ScratchHexagon> vrací pravdu (true) nebo nepravdu (false).
                Nahrazuje složité procházení cyklem a je ideální pro rychlou kontrolu oprávnění, přihlášení či hesla.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Jak se jmenuješ?</ScratchInput> a čekej</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    condition={<ScratchHexagon category="lists"><ScratchInput type="dropdown">VIP_hosté</ScratchInput> obsahuje <ScratchReporter category="sensing">odpověď</ScratchReporter>?</ScratchHexagon>}
                    elseChildren={
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="looks">bublina [Bohužel, tvé jméno na seznamu hostů není!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                        <div><ScratchBlock category="looks">změň efekt [duch] o <ScratchInput>25</ScratchInput></ScratchBlock></div>
                      </div>
                    }
                  >
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="looks">bublina [Vítej v klubu, jsi na VIP seznamu!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                      <div><ScratchBlock category="looks">převlek na <ScratchInput type="dropdown">kostým2</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCElseBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř vyhazovače před klubem, který zkontroluje, zda má návštěvník VIP pozvánku.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">VIP_hosté</span> a vlož do něj 4 jména (např. <em>Petr</em>, <em>Jana</em>, <em>Adam</em>, <em>Tereza</em>).</li>
            <li>Postava ochranky se zeptá: <em>„Jak se jmenuješ?“</em> a počká na vstup.</li>
            <li>Pomocí podmínky <ScratchBlock category="control">když - tak - jinak</ScratchBlock> a bloku <ScratchHexagon category="lists">[VIP_hosté] obsahuje (odpověď)?</ScratchHexagon> ověř:</li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li><strong>Pokud jméno v seznamu je:</strong> postava tě vřele přivítá: <em>„Vítej, jsi na seznamu hostů!“</em>.</li>
              <li><strong>Pokud jméno v seznamu není:</strong> postava tě odmítne: <em>„Vstup zakázán, nemáš rezervaci!“</em>.</li>
            </ul>
          </ol>
        </TaskCard>

        {/* ÚKOL 5 */}
        <TaskCard
          number="5"
          title="Procházení seznamu cyklem – Čtečka zpráv"
          taskId="lists-5"
          saveAs="CtenarSeznamu.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Základní programátorský vzor (Traverzování pole):</strong> Nastavíme index <ScratchReporter category="variables">i = 1</ScratchReporter>,
                v cyklu přečteme <ScratchReporter category="lists">položka (i) z [seznam]</ScratchReporter> a zvýšíme <ScratchBlock category="variables">změň [i] o 1</ScratchBlock>.
                Přesně tento princip se používá v každém programovacím jazyce na světě!
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [zprávy]</ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <div>
                        <ScratchBlock category="looks">
                          bublina (položka <ScratchReporter category="variables">i</ScratchReporter> z <ScratchInput type="dropdown">zprávy</ScratchInput>) na <ScratchInput>1.5</ScratchInput> sekund
                        </ScratchBlock>
                      </div>
                      <div>
                        <ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
                      </div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [To byly všechny zprávy!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p>
            Jak zařídit, aby kocour postupně přečetl všechny položky ze seznamu, ať už jich je 5, nebo 100?
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">zprávy</span> a vlož do něj 4 různé věty.</li>
            <li>Vytvoř pomocnou proměnnou <span className="font-bold text-amber-600">i</span> (bude sloužit jako ukazatel / index).</li>
            <li>Před začátkem cyklu nastav <ScratchBlock category="variables">nastav [i] na 1</ScratchBlock>.</li>
            <li>Použij cyklus <ScratchBlock category="control">opakuj (délka [zprávy]) krát</ScratchBlock>:</li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Kocour řekne položku na aktuální pozici: <ScratchBlock category="looks">bublina (položka (i) z [zprávy]) na 1.5 s</ScratchBlock>.</li>
              <li>Následně posune ukazatel na další položku: <ScratchBlock category="variables">změň [i] o 1</ScratchBlock>.</li>
            </ul>
          </ol>
        </TaskCard>

        {/* ÚKOL 6 */}
        <TaskCard
          number="6"
          title="Zábavná věštírna – Náhodný výběr ze seznamu"
          taskId="lists-6"
          saveAs="Vestirna.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                Místo pevného čísla pozice vložíme do oválu položky blok náhody:
                <ScratchReporter category="operators">náhodné číslo od (1) do (<ScratchReporter category="lists">délka [věštby]</ScratchReporter>)</ScratchReporter>.
                Tento kód je plně dynamický – když do seznamu přidáme 20 nových hlášek, nemusíme v kódu změnit ani jeden blok!
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po kliknutí na postavu</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Hledím do křišťálové koule...] na <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (položka (náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchReporter category="lists">délka [věštby]</ScratchReporter>) z <ScratchInput type="dropdown">věštby</ScratchInput>) na <ScratchInput>3</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř interaktivní věšteckou kouli nebo čaroděje, který po kliknutí myší vygeneruje náhodné proroctví.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">věštby</span> a vlož do něj alespoň 5 různých vtipných hlášek (např. <em>„Zítra dostaneš jedničku z informatiky!“</em>, <em>„Dnes neodpovídej na neznámá čísla.“</em>, <em>„Čeká tě velká pizza.“</em>).</li>
            <li>Nastav událost <ScratchBlock category="events">po kliknutí na tuto postavu</ScratchBlock>.</li>
            <li>Postava nejprve zahraje tajemný zvuk nebo řekne <em>„Vidím tvou budoucnost...“</em>.</li>
            <li>Následně vysloví náhodnou položku ze seznamu pomocí kombinace:
              <div className="my-2">
                <ScratchReporter category="lists">
                  položka (náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchReporter category="lists">délka [věštby]</ScratchReporter>) z [věštby]
                </ScratchReporter>
              </div>
            </li>
          </ol>
        </TaskCard>

        {/* ÚKOL 7 */}
        <TaskCard
          number="7"
          title="Žebříček TOP 3 nejvyšších skóre"
          taskId="lists-7"
          saveAs="TopSkore.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Algoritmus vkládání do seřazeného seznamu:</strong> Porovnáme nový výsledek s 1., 2. a 3. místem.
                Jakmile vložíme nové skóre blokem <ScratchBlock category="lists">vlož [skóre] na pozici (1) v [top_skore]</ScratchBlock>,
                seznam má najednou 4 položky. Proto na konci vždy zavoláme <ScratchBlock category="lists">smaž (4) z [top_skore]</ScratchBlock>,
                abychom zachovali přesně TOP 3.
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div><ScratchBlock category="events">po obdržení zprávy [konec_hry]</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCElseBlock
                    category="control"
                    condition={<ScratchHexagon category="operators"><ScratchReporter category="variables">skore</ScratchReporter> &gt; <ScratchReporter category="lists">položka [1] z [top_skore]</ScratchReporter></ScratchHexagon>}
                    elseChildren={
                      <div className="pl-2 space-y-1">
                        <ScratchCElseBlock
                          category="control"
                          condition={<ScratchHexagon category="operators"><ScratchReporter category="variables">skore</ScratchReporter> &gt; <ScratchReporter category="lists">položka [2] z [top_skore]</ScratchReporter></ScratchHexagon>}
                          elseChildren={
                            <div className="pl-2 space-y-1">
                              <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="variables">skore</ScratchReporter> &gt; <ScratchReporter category="lists">položka [3] z [top_skore]</ScratchReporter></ScratchHexagon> tak</span>}>
                                <div className="pl-2 space-y-1">
                                  <div><ScratchBlock category="lists">vlož <ScratchReporter category="variables">skore</ScratchReporter> na pozici <ScratchInput>3</ScratchInput> v <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                                  <div><ScratchBlock category="lists">smaž <ScratchInput>4</ScratchInput> z <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                                  <div><ScratchBlock category="looks">bublina [Nové 3. místo v žebříčku!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                                </div>
                              </ScratchCBlock>
                            </div>
                          }
                        >
                          <div className="pl-2 space-y-1">
                            <div><ScratchBlock category="lists">vlož <ScratchReporter category="variables">skore</ScratchReporter> na pozici <ScratchInput>2</ScratchInput> v <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                            <div><ScratchBlock category="lists">smaž <ScratchInput>4</ScratchInput> z <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                            <div><ScratchBlock category="looks">bublina [Stříbrná příčka! Nové 2. místo!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                          </div>
                        </ScratchCElseBlock>
                      </div>
                    }
                  >
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="lists">vlož <ScratchReporter category="variables">skore</ScratchReporter> na pozici <ScratchInput>1</ScratchInput> v <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                      <div><ScratchBlock category="lists">smaž <ScratchInput>4</ScratchInput> z <ScratchInput type="dropdown">top_skore</ScratchInput></ScratchBlock></div>
                      <div><ScratchBlock category="looks">bublina [NOVÝ REKORD! Jsi na 1. místě!] na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                    </div>
                  </ScratchCElseBlock>
                </div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř skutečnou tabulku 3 nejlepších výsledků, jakou mají arkádové hry v hernách.
          </p>

          <ol className="list-decimal pl-5 space-y-2 mt-2">
            <li>Vytvoř seznam <span className="font-bold text-orange-600">top_skore</span> a proměnnou <span className="font-bold text-amber-600">skore</span>.</li>
            <li>Výchozí hodnoty v seznamu nastav na: <code>100</code> (1. místo), <code>70</code> (2. místo), <code>40</code> (3. místo).</li>
            <li>Hráč zadá své dosažené skóre (nebo jej nasimuluj dotazem: <em>„Kolik bodů jsi nahrál?“</em>).</li>
            <li><strong>Porovnání a zařazení do žebříčku:</strong></li>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Pokud je skóre větší než 1. místo ➔ vlož jej na pozici 1 a oslav nový rekord!</li>
              <li>Jinak pokud je větší než 2. místo ➔ vlož jej na pozici 2.</li>
              <li>Jinak pokud je větší než 3. místo ➔ vlož jej na pozici 3.</li>
              <li>Jinak kocour smutně oznámí: <em>„Bohužel, do TOP 3 jsi se neprobojoval.“</em>.</li>
            </ul>
            <li><strong>Udržení TOP 3:</strong> Po vložení nového skóre má seznam 4 položky. Nezapomeň zavolat <ScratchBlock category="lists">smaž (4) z [top_skore]</ScratchBlock>, aby poslední odpadl!</li>
          </ol>
        </TaskCard>

        {/* ÚKOL 8 */}
        <TaskCard
          number="8"
          title="Seznamy vlastními bloky"
          taskId="lists-8"
          saveAs="SeznamyLehkePriklady2.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-4">
              <p>
                <strong>Kompletní řešení úlohy:</strong> Program je rozdělen do 4 vlastních bloků (funkcí) z kategorie <em>Moje bloky</em>.
                Tím je kód čistý, přehledný a snadno testovatelný po částech.
              </p>

              {/* 1. Naplň seznam */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  1. Blok: Naplň seznam
                </div>
                <div><ScratchDefBlock>Naplň seznam</ScratchDefBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">čísla</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchInput>10</ScratchInput> krát</span>}>
                    <div className="pl-2">
                      <ScratchBlock category="lists">
                        přidej <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>10</ScratchInput></ScratchReporter> k <ScratchInput type="dropdown">čísla</ScratchInput>
                      </ScratchBlock>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              {/* 2. Najdi největší číslo */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  2. Blok: Najdi největší číslo (Hledání maxima)
                </div>
                <div><ScratchDefBlock>Najdi největší číslo</ScratchDefBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejvetsi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchInput>1</ScratchInput> z [čísla]</ScratchReporter></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>2</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="operators"><ScratchReporter category="lists">délka [čísla]</ScratchReporter> - <ScratchInput>1</ScratchInput></ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter> &gt; <ScratchReporter category="variables">nejvetsi</ScratchReporter></ScratchHexagon> tak</span>}>
                        <div className="pl-2">
                          <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejvetsi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter></ScratchBlock>
                        </div>
                      </ScratchCBlock>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (spoj [Největší číslo je: ] a <ScratchReporter category="variables">nejvetsi</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>

              {/* 3. Najdi nejmenší číslo */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  3. Blok: Najdi nejmenší číslo (Hledání minima)
                </div>
                <div><ScratchDefBlock>Najdi nejmenší číslo</ScratchDefBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejmensi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchInput>1</ScratchInput> z [čísla]</ScratchReporter></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>2</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="operators"><ScratchReporter category="lists">délka [čísla]</ScratchReporter> - <ScratchInput>1</ScratchInput></ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter> &lt; <ScratchReporter category="variables">nejmensi</ScratchReporter></ScratchHexagon> tak</span>}>
                        <div className="pl-2">
                          <ScratchBlock category="variables">nastav <ScratchInput type="dropdown">nejmensi</ScratchInput> na <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter></ScratchBlock>
                        </div>
                      </ScratchCBlock>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (spoj [Nejmenší číslo je: ] a <ScratchReporter category="variables">nejmensi</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>

              {/* 4. Spočítej průměr */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  4. Blok: Spočítej průměr (Suma a aritmetický průměr)
                </div>
                <div><ScratchDefBlock>Spocitej prumer</ScratchDefBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">suma</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [čísla]</ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">suma</ScratchInput> o <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter></ScratchBlock></div>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
                <div className="pl-4">
                  <ScratchBlock category="variables">
                    nastav <ScratchInput type="dropdown">prumer</ScratchInput> na <ScratchReporter category="operators">zaokrouhli (<ScratchReporter category="variables">suma</ScratchReporter> / <ScratchReporter category="lists">délka [čísla]</ScratchReporter>)</ScratchReporter>
                  </ScratchBlock>
                </div>
                <div className="pl-4">
                  <ScratchBlock category="looks">
                    bublina (spoj [Průměr je: ] a <ScratchReporter category="variables">prumer</ScratchReporter>) na <ScratchInput>2</ScratchInput> sekund
                  </ScratchBlock>
                </div>
              </div>

              {/* 5. Hlavní řídicí scénář */}
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300 font-mono text-xs text-slate-900 space-y-1">
                <div className="text-amber-900 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  Hlavní řídicí scénář (Po kliknutí na zelenou vlajku)
                </div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="custom">Naplň seznam</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="custom">Najdi největší číslo</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="custom">Najdi nejmenší číslo</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="custom">Spocitej prumer</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p>
            Vytvoř přehledný modulární program, ve kterém pomocí vlastních bloků (z kategorie <em>Moje bloky</em>) naplníš seznam a provedeš jeho analýzu:
          </p>

          <ol className="list-decimal pl-5 space-y-4 my-4">
            <li className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-medium">
                  Vytvoř vlastní blok, který naplní seznam 10 náhodnými čísly.
                </span>
                <ScratchDefBlock>Naplň seznam</ScratchDefBlock>
              </div>
            </li>

            <li className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-medium">
                  Sestav vlastní blok, který seznam projde a vypíše největší číslo.
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <ScratchDefBlock>Najdi největší číslo</ScratchDefBlock>
                  <ScratchSpeechBubble>Nejvetsi cislo je:9</ScratchSpeechBubble>
                </div>
              </div>
            </li>

            <li className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-medium">
                  Sestav vlastní blok, který seznam projde a vypíše nejmenší číslo.
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <ScratchDefBlock>Najdi nejmenší číslo</ScratchDefBlock>
                  <ScratchSpeechBubble>Nejmensi cislo je:3</ScratchSpeechBubble>
                </div>
              </div>
            </li>

            <li className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-medium">
                  Sestav vlastní blok, který spočítá a vypíše průměr všech čísel.
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <ScratchDefBlock>Spocitej prumer</ScratchDefBlock>
                  <ScratchSpeechBubble>Průměr je:6</ScratchSpeechBubble>
                </div>
              </div>
            </li>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
            💡 <strong>Spuštění programu:</strong> Všechny vytvořené bloky následně spusť v hlavním scénáři po kliknutí na zelenou vlajku.
          </div>
        </TaskCard>

        {/* ÚKOL 9 */}
        <TaskCard
          number="9"
          title="Počet výskytů čísla s parametrem"
          taskId="lists-9"
          saveAs="PocetVyskytu.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div>
              <p className="mb-2">
                <strong>Vlastní blok s parametrem (Procedura s argumentem):</strong> Blok přijímá hledanou hodnotu jako formální parametr <ScratchParam>hledané číslo</ScratchParam>. 
                Při procházení seznamu porovnáváme <ScratchHexagon category="operators"><ScratchReporter category="lists">položka (i) z [čísla]</ScratchReporter> = <ScratchParam>hledané číslo</ScratchParam></ScratchHexagon>. 
                Tento přístup je mnohem čistší než globální proměnné a umožňuje blok volat opakovaně pro libovolná čísla!
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-2">
                <div>
                  <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                    1. Definice vlastního bloku s parametrem
                  </div>
                  <div>
                    <ScratchDefBlock>
                      tiskni počet výskytů <ScratchParam>hledané číslo</ScratchParam>
                    </ScratchDefBlock>
                  </div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pocet_vyskytu</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [čísla]</ScratchReporter> krát</span>}>
                      <div className="pl-2 space-y-1">
                        <ScratchCBlock category="control" topLabel={<span>když <ScratchHexagon category="operators"><ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [čísla]</ScratchReporter> = <ScratchParam>hledané číslo</ScratchParam></ScratchHexagon> tak</span>}>
                          <div className="pl-2">
                            <ScratchBlock category="variables">změň <ScratchInput type="dropdown">pocet_vyskytu</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
                          </div>
                        </ScratchCBlock>
                        <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                      </div>
                    </ScratchCBlock>
                  </div>
                  <div className="pl-4">
                    <ScratchBlock category="looks">
                      bublina (spoj [Pocet vyskytu cisla ] (spoj <ScratchParam>hledané číslo</ScratchParam> (spoj [ je ] <ScratchReporter category="variables">pocet_vyskytu</ScratchReporter>))) na <ScratchInput>3</ScratchInput> sekund
                    </ScratchBlock>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100">
                  <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                    2. Hlavní řídicí scénář
                  </div>
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="custom">Naplň seznam</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="custom">tiskni počet výskytů <ScratchInput>3</ScratchInput></ScratchBlock></div>
                </div>
              </div>
            </div>
          }
        >
          <p className="leading-relaxed">
            Vytvoř vlastní blok s parametrem, který najde a vypíše, kolikrát se v seznamu vyskytuje zadaná hodnota:
          </p>

          <ol className="list-decimal pl-5 space-y-3 my-4 text-sm text-slate-800">
            <li>
              Pro vygenerování 10 náhodných čísel do seznamu využij vlastní blok <strong className="text-pink-600">Naplň seznam</strong> z předchozí úlohy.
            </li>
            <li>
              Vytvoř nový vlastní blok <strong className="text-pink-600">tiskni počet výskytů (hledané číslo)</strong>, kde hledaná hodnota je <strong>vstupní parametr</strong> (číslo / text):
              <div className="mt-2">
                <ScratchDefBlock>
                  tiskni počet výskytů <ScratchParam>hledané číslo</ScratchParam>
                </ScratchDefBlock>
              </div>
            </li>
            <li>
              Uvnitř bloku projdi seznam cyklem, spočítej počet shod s parametrem <strong className="text-pink-600">hledané číslo</strong> a na závěr výsledek vypiš bublinou:
              <div className="mt-2">
                <ScratchSpeechBubble>Pocet vyskytu cisla 3 je 2</ScratchSpeechBubble>
              </div>
            </li>
          </ol>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
            💡 <strong>Vyzkoušení v hlavním scénáři:</strong> Pod zelenou vlajku zavolej nejprve <ScratchBlock category="custom">Naplň seznam</ScratchBlock> a poté svůj nový blok s libovolným číslem v závorce, např. <ScratchBlock category="custom">tiskni počet výskytů <ScratchInput>3</ScratchInput></ScratchBlock>.
          </div>
        </TaskCard>

        {/* ÚKOL 10 */}
        <TaskCard
          number="10"
          title="Vytvoření unikátního seznamu (Deduplikace)"
          taskId="lists-10"
          saveAs="UnikatniSeznam.sb3"
          showTeacher={teacherMode}
          teacherNote={
            <div className="space-y-4">
              <p>
                <strong>Algoritmus deduplikace (Odstranění duplicit):</strong> Procházíme výchozí seznam od začátku do konce. 
                Před vložením každé hodnoty do <span className="font-bold text-orange-600">unikatni_seznam</span> otestujeme pomocí predikátu 
                <ScratchHexagon category="lists">[unikatni_seznam] obsahuje (položka (i) z [seznam])?</ScratchHexagon> a negace <ScratchHexagon category="operators">ne &lt; &gt;</ScratchHexagon>, 
                zda tam dané číslo již není. Pokud tam není, přidáme jej.
              </p>

              {/* 1. Rozšířený blok Naplň seznam se 2 parametry */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  1. Blok: Naplň seznam (2 parametry: počet prvků a maximum)
                </div>
                <div>
                  <ScratchDefBlock>
                    Naplň seznam <ScratchParam>počet</ScratchParam> <ScratchParam>max</ScratchParam>
                  </ScratchDefBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">seznam</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchParam>počet</ScratchParam> krát</span>}>
                    <div className="pl-2">
                      <ScratchBlock category="lists">
                        přidej <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchParam>max</ScratchParam></ScratchReporter> k <ScratchInput type="dropdown">seznam</ScratchInput>
                      </ScratchBlock>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              {/* 2. Blok Vytvoř unikátní seznam */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  2. Blok: Vytvoř unikátní seznam (Deduplikace)
                </div>
                <div><ScratchDefBlock>Vytvoř unikátní seznam</ScratchDefBlock></div>
                <div className="pl-4"><ScratchBlock category="lists">smaž všechno z <ScratchInput type="dropdown">unikatni_seznam</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">i</ScratchInput> na <ScratchInput>1</ScratchInput></ScratchBlock></div>
                <div className="pl-4">
                  <ScratchCBlock category="control" topLabel={<span>opakuj <ScratchReporter category="lists">délka [seznam]</ScratchReporter> krát</span>}>
                    <div className="pl-2 space-y-1">
                      <ScratchCBlock
                        category="control"
                        topLabel={
                          <span>
                            když <ScratchHexagon category="operators">ne &lt;<ScratchHexagon category="lists"><ScratchInput type="dropdown">unikatni_seznam</ScratchInput> obsahuje <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [seznam]</ScratchReporter>?</ScratchHexagon>&gt;</ScratchHexagon> tak
                          </span>
                        }
                      >
                        <div className="pl-2">
                          <ScratchBlock category="lists">
                            přidej <ScratchReporter category="lists">položka <ScratchReporter category="variables">i</ScratchReporter> z [seznam]</ScratchReporter> k <ScratchInput type="dropdown">unikatni_seznam</ScratchInput>
                          </ScratchBlock>
                        </div>
                      </ScratchCBlock>
                      <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">i</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                    </div>
                  </ScratchCBlock>
                </div>
              </div>

              {/* 3. Hlavní scénář */}
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-300 font-mono text-xs text-slate-900 space-y-1">
                <div className="text-amber-900 font-bold font-sans uppercase tracking-wider text-[11px] mb-1">
                  Hlavní řídicí scénář
                </div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4">
                  <ScratchBlock category="custom">
                    Naplň seznam <ScratchInput>15</ScratchInput> <ScratchInput>5</ScratchInput>
                  </ScratchBlock>
                </div>
                <div className="pl-4"><ScratchBlock category="control">čekej <ScratchInput>1</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="custom">Vytvoř unikátní seznam</ScratchBlock></div>
              </div>
            </div>
          }
        >
          <p className="leading-relaxed">
            Vytvoř program, který z libovolného seznamu čísel vyfiltruje všechny duplicity a vytvoří nový seznam obsahující každou hodnotu pouze jednou:
          </p>

          <ol className="list-decimal pl-5 space-y-3 my-4 text-sm text-slate-800">
            <li>
              Vytvoř dva seznamy: <strong className="text-orange-600">seznam</strong> a <strong className="text-orange-600">unikatni_seznam</strong>.
            </li>
            <li>
              Uprav vlastní blok <strong className="text-pink-600">Naplň seznam</strong> tak, aby přijímal dva vstupní parametry: <strong>počet prvků</strong> a <strong>maximální hodnotu</strong>:
              <div className="mt-2">
                <ScratchDefBlock>
                  Naplň seznam <ScratchParam>počet</ScratchParam> <ScratchParam>max</ScratchParam>
                </ScratchDefBlock>
              </div>
            </li>
            <li>
              Vytvoř vlastní blok <strong className="text-pink-600">Vytvoř unikátní seznam</strong>, který projde původní seznam a do nového seznamu vloží každou hodnotu bez opakování:
              <div className="mt-2">
                <ScratchDefBlock>Vytvoř unikátní seznam</ScratchDefBlock>
              </div>
            </li>
          </ol>

          {/* Vizuální schéma deduplikace (podle předlohy) */}
          <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 text-center sm:text-left">
              Schéma převodu do unikátního seznamu (odstranění duplicit):
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              {/* Původní seznam */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-700 mb-1">seznam</span>
                <div className="w-24 bg-white border-2 border-slate-300 rounded-lg overflow-hidden shadow-sm text-center text-xs font-mono">
                  <div className="p-1.5 border-b border-slate-200">1</div>
                  <div className="p-1.5 border-b border-slate-200 bg-amber-50">2</div>
                  <div className="p-1.5 border-b border-slate-200 text-slate-400">1</div>
                  <div className="p-1.5 border-b border-slate-200 text-slate-400 bg-amber-50">2</div>
                  <div className="p-1.5">5</div>
                </div>
              </div>

              {/* Šipka */}
              <div className="flex flex-col items-center text-amber-600">
                <span className="text-xl font-black">➔</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">bez opakování</span>
              </div>

              {/* Unikátní seznam */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-emerald-700 mb-1">unikatni_seznam</span>
                <div className="w-24 bg-emerald-50/50 border-2 border-emerald-400 rounded-lg overflow-hidden shadow-sm text-center text-xs font-mono font-bold text-emerald-900">
                  <div className="p-1.5 border-b border-emerald-200">1</div>
                  <div className="p-1.5 border-b border-emerald-200">2</div>
                  <div className="p-1.5">5</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 mt-2">
            💡 <strong>Doporučení pro testování:</strong> Zavolej např. <ScratchBlock category="custom">Naplň seznam <ScratchInput>15</ScratchInput> <ScratchInput>5</ScratchInput></ScratchBlock>. Z 15 vygenerovaných čísel vznikne seznam s maximálně 5 unikátními čísly (1 až 5), kde je výsledek okamžitě krásně vidět!
          </div>
        </TaskCard>
      </div>
    </FsChapterShell>
  );
};

export default ScratchListsChapter;
