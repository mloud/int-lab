"use client";

import React from 'react';
import { KeyRound, Landmark, ShieldCheck } from 'lucide-react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchCElseBlock,
  ScratchSpeechBubble,
  ScratchDistanceBlock,
  ScratchReporter
} from '../ScratchBlocks';

export const ConditionsTasks13to14 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-3xl p-8 my-8 shadow-sm">
            <h3 className="text-2xl font-black text-amber-900 mb-6 uppercase tracking-tight">Cyklus s podmínkou</h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="flex flex-col items-start bg-white p-4 rounded-xl shadow-sm border border-amber-100 relative">
                  <ScratchBlock category="variables">
                    nastav <ScratchInput type="dropdown">cislo</ScratchInput> na <ScratchInput>0</ScratchInput>
                  </ScratchBlock>
                  <ScratchCBlock
                    category="control"
                    topLabel={
                      <>
                        opakuj dokud nenastane
                        <span className="mx-1">
                          <ScratchHexagon category="operators">
                            <ScratchBlock category="variables">cislo</ScratchBlock> {"="} <ScratchInput>3</ScratchInput>
                          </ScratchHexagon>
                        </span>
                      </>
                    }
                  >
                    <div className="flex flex-col gap-1 w-fit">
                      <ScratchBlock category="looks">bublina <ScratchBlock category="variables">cislo</ScratchBlock> <ScratchInput>1</ScratchInput> sekund</ScratchBlock>
                      <ScratchBlock category="variables">změň <ScratchInput type="dropdown">cislo</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock>
                    </div>
                  </ScratchCBlock>

                  {/* Šipka ukazující na podmínku */}
                  <div className="hidden md:block absolute -top-4 -right-16 w-32 h-24 border-t-2 border-r-2 border-slate-400 rounded-tr-[3rem] opacity-60 z-0">
                    <div className="absolute -bottom-1 -left-2 text-slate-400">▼</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  Nejdříve se vyhodnotí podmínka a pak se opakují příkazy v těle cyklu dokud není podmínka splněna.
                </p>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Co vypíše tento scénář?</p>
                </div>
              </div>
            </div>
          </div>

          <TaskCard
            number="13"
            title="Hádání čísla (vylepšené)"
            taskId="cond-13"
            showTeacher={teacherMode}
            teacherNote={
              <div>
                <p className="mb-2">
                  <strong>Metodické vysvětlení:</strong> Přechod na cyklus s podmínkou <code>opakuj dokud nenastane (odpověď = tajne_cislo)</code>. V každém průchodu cyklem zvýšíme počítadlo pokusů o 1 a pomocí vnitřního <code>když – jinak</code> napovíme hráči <em>Přidej!</em> nebo <em>Uber!</em>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                  <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">tajne_cislo</ScratchInput> na <ScratchReporter category="operators">náhodné číslo od <ScratchInput>1</ScratchInput> do <ScratchInput>100</ScratchInput></ScratchReporter></ScratchBlock></div>
                  <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokusy</ScratchInput> na <ScratchInput>0</ScratchInput></ScratchBlock></div>
                  <div className="pl-4">
                    <ScratchCBlock
                      category="control"
                      topLabel={
                        <>
                          opakuj dokud nenastane
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="sensing">odpověď</ScratchReporter>
                            {" = "}
                            <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                          </ScratchHexagon>
                        </>
                      }
                    >
                      <div className="pl-2 space-y-1">
                        <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Hádej číslo (1-100):</ScratchInput> a čekej</ScratchBlock></div>
                        <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">pokusy</ScratchInput> o <ScratchInput>1</ScratchInput></ScratchBlock></div>
                        <div>
                          <ScratchCBlock
                            category="control"
                            topLabel={
                              <>
                                když
                                <ScratchHexagon category="operators">
                                  ne
                                  <ScratchHexagon isSlot>
                                    <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                                  </ScratchHexagon>
                                </ScratchHexagon>
                                tak
                              </>
                            }
                          >
                            <div className="pl-2">
                              <ScratchCElseBlock
                                category="control"
                                condition={
                                  <ScratchHexagon category="operators">
                                    <ScratchReporter category="sensing">odpověď</ScratchReporter> {"<"} <ScratchReporter category="variables">tajne_cislo</ScratchReporter>
                                  </ScratchHexagon>
                                }
                                elseChildren={
                                  <div className="pl-2">
                                    <ScratchBlock category="looks">bublina <ScratchInput type="text">Uber! (Moje číslo je menší)</ScratchInput> na <ScratchInput>1.5</ScratchInput> sekund</ScratchBlock>
                                  </div>
                                }
                              >
                                <div className="pl-2">
                                  <ScratchBlock category="looks">bublina <ScratchInput type="text">Přidej! (Moje číslo je větší)</ScratchInput> na <ScratchInput>1.5</ScratchInput> sekund</ScratchBlock>
                                </div>
                              </ScratchCElseBlock>
                            </div>
                          </ScratchCBlock>
                        </div>
                      </div>
                    </ScratchCBlock>
                  </div>
                  <div className="pl-4">
                    <ScratchBlock category="looks">
                      bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Gratuluji! Uhodl jsi na </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">pokusy</ScratchReporter> <ScratchInput type="text"> pokusů!</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>3</ScratchInput> sekund
                    </ScratchBlock>
                  </div>
                </div>
              </div>
            }
            saveAs="HadaniCisla2.sb3"
          >
            <div className="space-y-6 text-sm text-slate-600">
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  <p>Upravte program na hádání čísla tak, aby uživatel hádal tak dlouho, dokud číslo neuhádne.</p>
                  <div className="mt-2 inline-block">
                    <ScratchCBlock category="control" topLabel={<>opakuj dokud nenastane <ScratchHexagon isSlot category="control" /></>}>
                      <div className="h-4"></div>
                    </ScratchCBlock>
                  </div>
                </li>
                <li>Upravte program tak, aby počítal počet pokusů.</li>
                <li>Přidejte do programu nápovědu při špatné odpovědi, zda je hádané číslo větší nebo menší.</li>
                <li className="italic font-bold text-amber-600">
                  Extra Bonus - Přidejte ještě opakování celého hádání - do doby než uživatel nepotvrdí, že chce skončit.
                </li>
              </ul>
            </div>
          </TaskCard>

          <TaskCard
            number="14"
            title="Bankomat (ATM) a bezpečnostní trezor"
            taskId="cond-14"
            showTeacher={teacherMode}
            teacherNote={
              <div className="space-y-4">
                <p>
                  <strong>Metodické vysvětlení:</strong> Syntetický projekt. Program je přehledně hierarchizován do dvou logických celků:
                  (1) Bezpečné přihlášení cyklem <code>opakuj dokud nenastane</code> s odpočtem pokusů (3 pokusy dolů k 0),
                  (2) Vyhodnocení správnosti PINu za cyklem – ve větvi úspěchu proběhne dotaz na částku a dvě diagnostické podmínky omezení výběru (zůstatek a jednorázový limit 3 000 Kč).
                </p>

                {/* 1. Hlavní skript bankomatu */}
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    Základní program bankomatu (Fáze 1, 2 a 3):
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-slate-800 space-y-1">
                    <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                    <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">PIN</ScratchInput> na <ScratchInput>1234</ScratchInput></ScratchBlock></div>
                    <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">zustatek</ScratchInput> na <ScratchInput>5000</ScratchInput></ScratchBlock></div>
                    <div className="pl-4"><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">zbyvajici_pokusy</ScratchInput> na <ScratchInput>3</ScratchInput></ScratchBlock></div>

                    {/* Cyklus zadávání PINu */}
                    <div className="pl-4">
                      <ScratchCBlock
                        category="control"
                        topLabel={
                          <>
                            opakuj dokud nenastane
                            <ScratchHexagon category="operators">
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">PIN</ScratchReporter>
                              </ScratchHexagon>
                              nebo
                              <ScratchHexagon category="operators">
                                <ScratchReporter category="variables">zbyvajici_pokusy</ScratchReporter> {" = "} <ScratchInput>0</ScratchInput>
                              </ScratchHexagon>
                            </ScratchHexagon>
                          </>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Zadejte 4místný PIN:</ScratchInput> a čekej</ScratchBlock></div>
                          <div>
                            <ScratchCBlock
                              category="control"
                              topLabel={
                                <>
                                  když
                                  <ScratchHexagon category="operators">
                                    ne
                                    <ScratchHexagon isSlot>
                                      <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">PIN</ScratchReporter>
                                    </ScratchHexagon>
                                  </ScratchHexagon>
                                  tak
                                </>
                              }
                            >
                              <div className="pl-2 space-y-1">
                                <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">zbyvajici_pokusy</ScratchInput> o <ScratchInput>-1</ScratchInput></ScratchBlock></div>
                                <div>
                                  <ScratchCBlock
                                    category="control"
                                    topLabel={
                                      <>
                                        když
                                        <ScratchHexagon category="operators">
                                          <ScratchReporter category="variables">zbyvajici_pokusy</ScratchReporter> {">"} <ScratchInput>0</ScratchInput>
                                        </ScratchHexagon>
                                        tak
                                      </>
                                    }
                                  >
                                    <div className="pl-2">
                                      <ScratchBlock category="looks">
                                        bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Špatný PIN! Zbývá pokusů: </ScratchInput> <ScratchReporter category="variables">zbyvajici_pokusy</ScratchReporter></ScratchReporter> na <ScratchInput>2</ScratchInput> sekund
                                      </ScratchBlock>
                                    </div>
                                  </ScratchCBlock>
                                </div>
                              </div>
                            </ScratchCBlock>
                          </div>
                        </div>
                      </ScratchCBlock>
                    </div>

                    {/* Vyhodnocení za cyklem */}
                    <div className="pl-4">
                      <ScratchCElseBlock
                        category="control"
                        condition={
                          <ScratchHexagon category="operators">
                            <ScratchReporter category="sensing">odpověď</ScratchReporter> {" = "} <ScratchReporter category="variables">PIN</ScratchReporter>
                          </ScratchHexagon>
                        }
                        elseChildren={
                          <div className="pl-2 space-y-1">
                            <div><ScratchBlock category="looks">bublina <ScratchInput type="text">3× špatně zadaný PIN! Karta zablokována. 🚨</ScratchInput> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                            <div><ScratchBlock category="control">zastav <ScratchInput type="dropdown">všechno</ScratchInput></ScratchBlock></div>
                          </div>
                        }
                      >
                        <div className="pl-2 space-y-1">
                          <div><ScratchBlock category="looks">bublina <ScratchInput type="text">PIN v pořádku! Vítejte v bance. 👋</ScratchInput> na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                          <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Kolik Kč si přejete vybrat?</ScratchInput> a čekej</ScratchBlock></div>
                          <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">vyber</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>

                          {/* 2 diagnostické podmínky omezení výběru */}
                          <div>
                            <ScratchCElseBlock
                              category="control"
                              condition={
                                <ScratchHexagon category="operators">
                                  <ScratchReporter category="variables">vyber</ScratchReporter> {">"} <ScratchReporter category="variables">zustatek</ScratchReporter>
                                </ScratchHexagon>
                              }
                              elseChildren={
                                <div className="pl-2">
                                  <ScratchCElseBlock
                                    category="control"
                                    condition={
                                      <ScratchHexagon category="operators">
                                        <ScratchReporter category="variables">vyber</ScratchReporter> {">"} <ScratchInput>3000</ScratchInput>
                                      </ScratchHexagon>
                                    }
                                    elseChildren={
                                      <div className="pl-2 space-y-1">
                                        <div><ScratchBlock category="variables">změň <ScratchInput type="dropdown">zustatek</ScratchInput> o <ScratchReporter category="operators"><ScratchInput>0</ScratchInput> - <ScratchReporter category="variables">vyber</ScratchReporter></ScratchReporter></ScratchBlock></div>
                                        <div><ScratchBlock category="looks">bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Výběr schválen! Zůstatek: </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">zustatek</ScratchReporter> <ScratchInput type="text"> Kč 💵</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>3</ScratchInput> sekund</ScratchBlock></div>
                                      </div>
                                    }
                                  >
                                    <div className="pl-2">
                                      <ScratchBlock category="looks">bublina <ScratchInput type="text">Chyba: Částka překračuje jednorázový limit (max 3 000 Kč)! ⚠️</ScratchInput> na <ScratchInput>2.5</ScratchInput> sekund</ScratchBlock>
                                    </div>
                                  </ScratchCElseBlock>
                                </div>
                              }
                            >
                              <div className="pl-2">
                                <ScratchBlock category="looks">bublina <ScratchReporter category="operators">spoj <ScratchInput type="text">Chyba: Nedostatek financí! Zůstatek je jen </ScratchInput> <ScratchReporter category="operators">spoj <ScratchReporter category="variables">zustatek</ScratchReporter> <ScratchInput type="text"> Kč 💳</ScratchInput></ScratchReporter></ScratchReporter> na <ScratchInput>2.5</ScratchInput> sekund</ScratchBlock>
                              </div>
                            </ScratchCElseBlock>
                          </div>
                        </div>
                      </ScratchCElseBlock>
                    </div>
                  </div>
                </div>

                {/* 2. Bonusové rozšíření – cyklus opakování */}
                <div className="space-y-1 pt-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                    Volitelné rozšíření (Krok 4): Cyklus opakování transakcí:
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono text-xs text-slate-800 space-y-1">
                    <p className="font-sans text-[11px] text-slate-600 mb-1">
                      Sekci zadání částky a obě podmínky obalíme do cyklu <code>opakuj dokud nenastane (pokracovat = ne)</code>. Na konci se zeptáme:
                    </p>
                    <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokracovat</ScratchInput> na <ScratchInput type="text">ano</ScratchInput></ScratchBlock></div>
                    <div className="pl-2 text-slate-400">... [kaskáda výběru a odečtení peněz] ...</div>
                    <div><ScratchBlock category="sensing">zeptej se <ScratchInput type="text">Přejete si další transakci? (ano / ne)</ScratchInput> a čekej</ScratchBlock></div>
                    <div><ScratchBlock category="variables">nastav <ScratchInput type="dropdown">pokracovat</ScratchInput> na <ScratchReporter category="sensing">odpověď</ScratchReporter></ScratchBlock></div>
                  </div>
                </div>
              </div>
            }
            saveAs="Bankomat.sb3"
          >
            <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-800 text-base">
                Závěrečný syntetický projekt: Vytvořte spolehlivý bankomat, který spravuje uživatelský účet, chrání kartu před neoprávněným vniknutím a kontroluje dvě základní pravidla pro výběr peněz.
              </p>

              {/* 4 přehledné kroky stavby */}
              <div className="space-y-4">
                {/* KROK 1 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">1</span>
                    Příprava proměnných (Inicializace bankomatu)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vytvoř 4 proměnné a pod zelenou vlajku vlož jejich počáteční nastavení:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 block text-[10px] font-sans">Tajný PIN:</span>
                      <strong className="text-amber-700">PIN = 1234</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 block text-[10px] font-sans">Počáteční stav:</span>
                      <strong className="text-emerald-700">zustatek = 5000</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 block text-[10px] font-sans">Počet pokusů:</span>
                      <strong className="text-blue-700">zbyvajici_pokusy = 3</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-400 block text-[10px] font-sans">Výběr:</span>
                      <strong className="text-slate-700">vyber = 0</strong>
                    </div>
                  </div>
                </div>

                {/* KROK 2 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">2</span>
                    Zadávání PINu s odpočtem pokusů
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vytvoř cyklus, ve kterém se bankomat opakovaně ptá na 4místný PIN. Uživatel má k dispozici maximálně <strong>3 pokusy</strong>.
                    Při každém chybném zadání bankomat ohlásí chybu a odečte jeden pokus. Cyklus skončí, jakmile uživatel zadá správný PIN, nebo když vyčerpá všechny 3 pokusy.
                  </p>
                </div>

                {/* KROK 3 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">3</span>
                    Ověření PINu a kontrola pravidel výběru
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Za cyklem otestuj výsledek přihlášení:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 leading-relaxed">
                    <li>
                      <strong>Pokud byl PIN zadán špatně (vyčerpány 3 pokusy):</strong> Bankomat ohlásí zablokování karty a program se zastaví.
                    </li>
                    <li>
                      <strong>Pokud je PIN správný:</strong> Bankomat uživatele přivítá, zeptá se na částku výběru a ověří dvě pravidla:
                      <ol className="list-decimal pl-4 mt-1 space-y-1">
                        <li>Zda částka nepřesahuje aktuální zůstatek na účtu.</li>
                        <li>Zda částka nepřekračuje jednorázový limit 3 000 Kč.</li>
                      </ol>
                      Pokud některé pravidlo neprojde, bankomat nahlásí příslušnou chybu. Pokud jsou obě pravidla splněna, částku odečte ze zůstatku a potvrdí úspěšný výběr.
                    </li>
                  </ul>
                </div>

                {/* KROK 4 - VOLITELNÝ BONUS */}
                <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-300 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-amber-900 flex items-center gap-2 text-sm">
                    <span className="text-base">💡</span>
                    <span>Krok 4 (Volitelná bonusová výzva): Opakování výběru transakcí</span>
                  </div>
                  <p className="leading-relaxed">
                    Máte hotovo dříve? Umožněte uživateli provést více výběrů za sebou, aniž by musel znovu zadávat PIN:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                    <li>Vytvoř proměnnou <code>pokracovat</code> a před výběrem ji nastav na <code>ano</code>.</li>
                    <li>Dotaz na výběr a kontrolu obou pravidel obal do cyklu <ScratchBlock category="control">opakuj dokud nenastane &lt;pokracovat = ne&gt;</ScratchBlock>.</li>
                    <li>
                      Na konci každého výběru se zeptej: <strong>„Přejete si další transakci? (ano / ne)“</strong> a odpověď ulož do proměnné <code>pokracovat</code>.
                    </li>
                    <li>
                      Pokud uživatel zadá <strong>„ne“</strong>, bankomat vypíše: <em>„Děkujeme za návštěvu, nezapomeňte si vzít platební kartu! 👋“</em>.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TaskCard>
    </div>
  );
};
