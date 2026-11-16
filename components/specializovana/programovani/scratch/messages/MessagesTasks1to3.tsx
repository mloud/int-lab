"use client";

import React from 'react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchReporter
} from '../ScratchBlocks';

export const MessagesTasks1to3 = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ÚKOL 1 */}
      <TaskCard
        number="1"
        title="Zvonek u dveří (Signál 1:1)"
        taskId="msg-1"
        saveAs="Zvonek.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Tlačítko slouží jako vysílač signálu přes blok <code>vyšli zprávu [zazvon]</code>. Kocour má spouštěcí klobouček <code>po obdržení zprávy [zazvon]</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář postavy Tlačítko:</div>
                <div><ScratchBlock category="events">po kliknutí na mě</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">zazvon</ScratchInput></ScratchBlock></div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář postavy Kocour:</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">zazvon</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Někdo zvoní u dveří!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Vytvoř program se dvěma postavami: <strong>Tlačítkem</strong> (z knihovny postav) a <strong>Kocourem</strong>.
        </p>

        <ol className="list-decimal pl-5 space-y-2 my-4 text-sm text-slate-800">
          <li>Po kliknutí na tlačítko odešli zprávu <span className="font-bold text-amber-600">zazvon</span>.</li>
          <li>Kocour po obdržení této zprávy řekne bublinou: <em>„Někdo zvoní u dveří!“</em> na 2 sekundy.</li>
        </ol>
      </TaskCard>

      {/* ÚKOL 2 */}
      <TaskCard
        number="2"
        title="Rozhlas v domě (Rozeslání 1:N)"
        taskId="msg-2"
        saveAs="Rozhlas.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Tlačítko vyšle stále stejnou jednu zprávu <code>zazvon</code>. Každá postava v projektu na ni může zareagovat vlastním scénářem a vlastním textem současně.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář postavy Kocour:</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">zazvon</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Slyším zvonek v obýváku!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář postavy Pes (druhá postava):</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">zazvon</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Návštěva je tady, jdu otevřít!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Rozšiř předchozí projekt. Přidej do projektu další libovolnou postavu (např. <strong>Psa</strong>).
        </p>

        <ol className="list-decimal pl-5 space-y-2 my-4 text-sm text-slate-800">
          <li>Tlačítko po kliknutí vysílá stále stejnou zprávu <span className="font-bold text-amber-600">zazvon</span>.</li>
          <li>Kocour po obdržení zprávy řekne: <em>„Slyším zvonek v obýváku!“</em> (na 2 s).</li>
          <li>Druhá postava bude reagovat na tu samou zprávu a ve stejnou chvíli řekne: <em>„Návštěva je tady, jdu otevřít!“</em> (na 2 s).</li>
        </ol>
      </TaskCard>

      {/* ÚKOL 3 */}
      <TaskCard
        number="3"
        title="Řízený dialog postav (Předávání štafety)"
        taskId="msg-3"
        saveAs="Dialog.sb3"
        showTeacher={teacherMode}
        teacherNote={
          <div className="space-y-3">
            <p className="text-xs text-slate-700">
              <strong>Princip:</strong> Žádné odhadování časů pomocí <code>čekej X sekund</code>. Krok 1 vyšle zprávu pro Krok 2, Krok 2 po domluvení vyšle zprávu pro Krok 3.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář postavy Kocour:</div>
                <div><ScratchBlock category="events">po kliknutí na zelenou vlajku</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Ahoj, jak se jmenuješ?] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">odpovez</ScratchInput></ScratchBlock></div>
                <div className="pt-2"><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">dalsi_otazka</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Rád tě poznávám!] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-1">
                <div className="text-amber-800 font-bold font-sans uppercase text-[11px] mb-1">Scénář druhé postavy (Abby):</div>
                <div><ScratchBlock category="events">po obdržení zprávy <ScratchInput type="dropdown">odpovez</ScratchInput></ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="looks">bublina [Ahoj, já jsem Abby.] na <ScratchInput>2</ScratchInput> sekund</ScratchBlock></div>
                <div className="pl-4"><ScratchBlock category="events">vyšli zprávu <ScratchInput type="dropdown">dalsi_otazka</ScratchInput></ScratchBlock></div>
              </div>
            </div>
          </div>
        }
      >
        <p className="leading-relaxed">
          Vytvoř plynulý rozhovor mezi dvěma postavami řízený výhradně zprávami (bez použití bloků <em>čekej</em>).
        </p>

        <ol className="list-decimal pl-5 space-y-2 my-4 text-sm text-slate-800">
          <li>Po kliknutí na zelenou vlajku kocour řekne: <em>„Ahoj, jak se jmenuješ?“</em> (na 2 s) a pošle zprávu <span className="font-bold text-amber-600">odpovez</span>.</li>
          <li>Druhá postava po obdržení zprávy odpoví: <em>„Ahoj, já jsem Abby.“</em> (na 2 s) a pošle zprávu <span className="font-bold text-amber-600">dalsi_otazka</span>.</li>
          <li>Kocour po obdržení zprávy dialog uzavře větou: <em>„Rád tě poznávám!“</em> (na 2 s).</li>
        </ol>
      </TaskCard>
    </div>
  );
};
