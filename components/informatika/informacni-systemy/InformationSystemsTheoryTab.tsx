'use client';
import React, { useState } from 'react';
import {
  Laptop,
  Users,
  ShieldCheck,
  UserCheck,
  KeyRound,
  FileText,
  GraduationCap,
  HardDrive,
  Code2,
  Library,
  ShoppingCart,
  Landmark,
  Film,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  List,
  Layers,
} from 'lucide-react';

interface TheoryStep {
  id: number;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const THEORY_STEPS: TheoryStep[] = [
  { id: 1, label: 'Co je IS?', shortLabel: '1. Co je IS', icon: Laptop },
  { id: 2, label: 'Jak funguje?', shortLabel: '2. Cyklus IS', icon: Settings },
  { id: 3, label: '4 pilíře', shortLabel: '3. Pilíře', icon: HardDrive },
  { id: 4, label: 'Účet a profil', shortLabel: '4. Účet', icon: KeyRound },
  { id: 5, label: 'Role a práva', shortLabel: '5. Role', icon: ShieldCheck },
];

export const InformationSystemsTheoryTab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showAllAtOnce, setShowAllAtOnce] = useState<boolean>(false);

  return (
    <div className="space-y-6 text-slate-900 max-w-5xl mx-auto font-sans">
      {/* HORNÍ LIŠTA: KROKOVÁNÍ A PŘEPÍNAČ REŽIMU */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
        {/* Krokovací tlačítka 1..5 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          {THEORY_STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.id && !showAllAtOnce;

            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStep(s.id);
                  setShowAllAtOnce(false);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-sm sm:text-base font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-slate-300 text-slate-800'
                  }`}
                >
                  {s.id}
                </span>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden md:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Přepínač na celý přehled */}
        <button
          onClick={() => setShowAllAtOnce(!showAllAtOnce)}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            showAllAtOnce
              ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-black'
              : 'border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          {showAllAtOnce ? <Layers className="w-4 h-4" /> : <List className="w-4 h-4" />}
          <span>{showAllAtOnce ? 'Režim po krocích' : 'Zobrazit vše najednou'}</span>
        </button>
      </div>

      {/* OBSAH: KROK 1 – CO JE TO INFORMAČNÍ SYSTÉM */}
      {(showAllAtOnce || currentStep === 1) && (
        <section className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-3 border-indigo-200 shadow-xl space-y-7 animate-in fade-in duration-200">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Laptop className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block mb-1">
                Krok 1 ze 5 · Základní pojem
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                1. Co je to informační systém?
              </h2>
            </div>
          </div>

          {/* Hlavní velká definice */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-200">
              Zapamatuj si do života:
            </span>
            <p className="text-xl sm:text-2xl font-black leading-snug">
              Informační systém (IS) je program, který{' '}
              <span className="underline decoration-amber-400 decoration-4 underline-offset-6">
                sbírá, bezpečně ukládá a zpracovává data
              </span>
              .
            </p>
            <p className="text-base text-indigo-100 font-medium pt-1">
              Pomáhá lidem snadno najít potřebné informace a řídit práva (kdo co smí vidět).
            </p>
          </div>

          {/* 5 velkých karet z reálného života */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span>🌟 Příklady informačních systémů kolem nás:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50/80 p-5 rounded-3xl border-2 border-blue-200 flex items-start gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Školní žákovská</h4>
                  <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                    Pamatuje si tvé známky, rozvrh hodin i omluvenky od rodičů.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/80 p-5 rounded-3xl border-2 border-amber-200 flex items-start gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Library className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Městská knihovna</h4>
                  <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                    Ví, kdo má jakou knihu půjčenou a kdy ji musí vrátit.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/80 p-5 rounded-3xl border-2 border-emerald-200 flex items-start gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Internetový obchod</h4>
                  <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                    Eviduje zboží ve skladu, tvůj nákupní košík a adresu pro doručení.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50/80 p-5 rounded-3xl border-2 border-purple-200 flex items-start gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Banka v mobilu</h4>
                  <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                    Hlídá zůstatek peněz na účtu a provádí platby mezi lidmi.
                  </p>
                </div>
              </div>

              <div className="bg-rose-50/80 p-5 rounded-3xl border-2 border-rose-200 flex items-start gap-4 shadow-xs sm:col-span-2 lg:col-span-2">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Film className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Netflix / YouTube</h4>
                  <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                    Katalog filmů a videí, profily pro každého člena rodiny a historie sledování.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OBSAH: KROK 2 – JAK FUNGUJE: VSTUP -> ZPRACOVÁNÍ -> VÝSTUP */}
      {(showAllAtOnce || currentStep === 2) && (
        <section className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-3 border-blue-200 shadow-xl space-y-7 animate-in fade-in duration-200">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Settings className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-1">
                Krok 2 ze 5 · Princip fungování
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                2. Jak systém uvnitř funguje?
              </h2>
            </div>
          </div>

          <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
            Každý systém na světě pracuje ve 3 krocích za sebou:{' '}
            <span className="text-indigo-700 font-black">VSTUP ➔ ZPRACOVÁNÍ ➔ VÝSTUP</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* VSTUP */}
            <div className="bg-blue-50/80 p-6 rounded-3xl border-3 border-blue-300 flex flex-col justify-between space-y-4 shadow-sm">
              <div>
                <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider inline-block mb-3">
                  1. Krok: VSTUP
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">📥 Vstup dat</h3>
                <p className="text-base text-slate-700 font-medium mt-2 leading-relaxed">
                  Data, která člověk do systému zadá nebo načte čtečkou.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs space-y-1">
                <span className="text-xs font-black text-blue-700 uppercase">Příklad ze školy:</span>
                <p className="text-base font-bold text-slate-900">
                  Učitel v počítači naťuká jedničku nebo u výdeje pípneš čipem.
                </p>
              </div>
            </div>

            {/* ZPRACOVÁNÍ */}
            <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-md flex flex-col justify-between space-y-4">
              <div>
                <span className="px-3 py-1 rounded-xl bg-white text-indigo-700 text-xs font-black uppercase tracking-wider inline-block mb-3">
                  2. Krok: ZPRACOVÁNÍ
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">⚙️ Zpracování</h3>
                <p className="text-base text-indigo-100 font-medium mt-2 leading-relaxed">
                  Systém data zkontroluje v databázi, přepočítá a bezpečně uloží.
                </p>
              </div>

              <div className="bg-indigo-700/80 p-4 rounded-2xl border border-indigo-400/40 shadow-2xs space-y-1">
                <span className="text-xs font-black text-indigo-200 uppercase">Příklad ze školy:</span>
                <p className="text-base font-bold text-white">
                  Program přepočítá průměr známek nebo ověří, zda máš oběd zaplacený.
                </p>
              </div>
            </div>

            {/* VÝSTUP */}
            <div className="bg-emerald-50/80 p-6 rounded-3xl border-3 border-emerald-300 flex flex-col justify-between space-y-4 shadow-sm">
              <div>
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-wider inline-block mb-3">
                  3. Krok: VÝSTUP
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">📤 Výstup</h3>
                <p className="text-base text-slate-700 font-medium mt-2 leading-relaxed">
                  Výsledek předaný správnému člověku na obrazovku či tiskárnu.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-xs font-black text-emerald-700 uppercase">Příklad ze školy:</span>
                <p className="text-base font-bold text-slate-900">
                  Rodiči pípne známka v mobilu a kuchařce se rozsvítí zelené světlo.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OBSAH: KROK 3 – 4 PILÍŘE SYSTÉMU */}
      {(showAllAtOnce || currentStep === 3) && (
        <section className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-3 border-purple-200 shadow-xl space-y-7 animate-in fade-in duration-200">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <HardDrive className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-purple-600 block mb-1">
                Krok 3 ze 5 · Složení systému
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                3. Ze kterých 4 pilířů se systém skládá?
              </h2>
            </div>
          </div>

          <p className="text-lg font-bold text-slate-800 leading-relaxed">
            Pokud by chyběl kterýkoliv z těchto 4 pilířů, systém by nemohl fungovat:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-blue-50/70 p-6 rounded-3xl border-2 border-blue-200 flex items-start gap-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <HardDrive className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">1. Hardware (Železo)</h3>
                <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                  Vše, na co si můžeš sáhnout: počítače, servery v datacentru, mobily, kabely, čtečky čipů a tiskárny.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/70 p-6 rounded-3xl border-2 border-purple-200 flex items-start gap-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">2. Software (Program)</h3>
                <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                  Kód a aplikace, kterou programátoři napsali – webová stránka, mobilní appka a databázový program.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50/70 p-6 rounded-3xl border-2 border-emerald-200 flex items-start gap-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">3. Data (Obsah)</h3>
                <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                  Uložené záznamy: jména žáků, udělené známky, rozvrhy hodin, zaplacené obědy a čísla účtů.
                </p>
              </div>
            </div>

            <div className="bg-amber-50/70 p-6 rounded-3xl border-2 border-amber-200 flex items-start gap-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">4. Lidé (Uživatelé)</h3>
                <p className="text-base text-slate-700 font-medium leading-relaxed mt-1">
                  My všichni, kdo systém používáme: žáci, rodiče, učitelé, kuchařky a správci, kteří systém nastavují.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OBSAH: KROK 4 – ÚČET, PROFIL A PŘIHLAŠOVÁNÍ */}
      {(showAllAtOnce || currentStep === 4) && (
        <section className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-3 border-teal-200 shadow-xl space-y-7 animate-in fade-in duration-200">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <KeyRound className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-teal-600 block mb-1">
                Krok 4 ze 5 · Zabezpečení a identifikace
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                4. Proč se musíme přihlašovat?
              </h2>
            </div>
          </div>

          <div className="bg-teal-50 border-2 border-teal-300 p-6 rounded-3xl space-y-2">
            <p className="text-lg sm:text-xl font-black text-teal-950">
              Na svém mobilu jsi přihlášený pořád. Proč to na sdíleném počítači ve škole nebo v bance nestačí?
            </p>
            <p className="text-base text-teal-900 font-medium leading-relaxed">
              Když se ke stejnému počítači střídají desítky žáků, systém musí stoprocentně vědět, <strong>kdo právě u klávesnice sedí</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-black flex items-center justify-center text-lg">
                👤
              </div>
              <h3 className="text-xl font-black text-slate-900">Uživatel</h3>
              <p className="text-base text-slate-700 font-medium leading-relaxed">
                Živý člověk, který se právě posadil k počítači.
              </p>
            </div>

            <div className="bg-blue-50/80 p-6 rounded-3xl border-2 border-blue-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-lg">
                🔑
              </div>
              <h3 className="text-xl font-black text-slate-900">Uživatelský účet</h3>
              <p className="text-base text-slate-700 font-medium leading-relaxed">
                Přihlašovací jméno a tajné heslo. Slouží k tomu, aby se za tebe nikdo cizí nevydával.
              </p>
            </div>

            <div className="bg-indigo-50/80 p-6 rounded-3xl border-2 border-indigo-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-lg">
                🛡️
              </div>
              <h3 className="text-xl font-black text-slate-900">Uživatelský profil</h3>
              <p className="text-base text-slate-700 font-medium leading-relaxed">
                Tvoje soukromá plocha, známky a nastavení, ke kterým se dostaneš jenom ty.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* OBSAH: KROK 5 – ROLE V SYSTÉMU */}
      {(showAllAtOnce || currentStep === 5) && (
        <section className="bg-white p-7 sm:p-10 rounded-[2.5rem] border-3 border-indigo-200 shadow-xl space-y-7 animate-in fade-in duration-200">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block mb-1">
                Krok 5 ze 5 · Kdo co smí a nesmí
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                5. Uživatelské role a přístupová práva
              </h2>
            </div>
          </div>

          <div className="bg-slate-100 p-6 rounded-3xl border border-slate-300">
            <p className="text-lg sm:text-xl font-black text-slate-900">
              Zásada minimálních práv: Každý smí v systému vidět a měnit pouze to, co nezbytně potřebuje ke své práci!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* ŽÁK */}
            <div className="bg-blue-50/80 p-6 rounded-3xl border-3 border-blue-300 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700">Role 1</span>
                  <h3 className="text-2xl font-black text-slate-900">Žák</h3>
                </div>
              </div>
              <ul className="text-base text-slate-800 font-semibold space-y-2 pt-2 border-t border-blue-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-black text-lg">✓</span>
                  <span><strong>Čte</strong> své vlastní známky a rozvrh.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-600 font-black text-lg">✕</span>
                  <span><strong>Nesmí měnit</strong> známky ani nahlížet spolužákům.</span>
                </li>
              </ul>
            </div>

            {/* RODIČ */}
            <div className="bg-emerald-50/80 p-6 rounded-3xl border-3 border-emerald-300 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Role 2</span>
                  <h3 className="text-2xl font-black text-slate-900">Zákonný zástupce (Rodič)</h3>
                </div>
              </div>
              <ul className="text-base text-slate-800 font-semibold space-y-2 pt-2 border-t border-emerald-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-black text-lg">✓</span>
                  <span><strong>Čte</strong> známky svých vlastních dětí.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-600 font-black text-lg">✕</span>
                  <span><strong>Nevidí</strong> cizí žáky ze třídy ani jejich rodiče.</span>
                </li>
              </ul>
            </div>

            {/* UČITEL */}
            <div className="bg-purple-50/80 p-6 rounded-3xl border-3 border-purple-300 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-purple-700">Role 3</span>
                  <h3 className="text-2xl font-black text-slate-900">Vyučující (Učitel)</h3>
                </div>
              </div>
              <ul className="text-base text-slate-800 font-semibold space-y-2 pt-2 border-t border-purple-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-black text-lg">✓</span>
                  <span><strong>Zapisuje a opravuje</strong> známky všem žákům ve své třídě.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-600 font-black text-lg">✕</span>
                  <span><strong>Nesmí mazat</strong> uživatelské účty ani měnit nastavení serveru.</span>
                </li>
              </ul>
            </div>

            {/* SPRÁVCE */}
            <div className="bg-amber-50/80 p-6 rounded-3xl border-3 border-amber-300 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700">Role 4</span>
                  <h3 className="text-2xl font-black text-slate-900">Správce (Administrátor)</h3>
                </div>
              </div>
              <ul className="text-base text-slate-800 font-semibold space-y-2 pt-2 border-t border-amber-200">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-black text-lg">✓</span>
                  <span><strong>Zakládá nové účty</strong>, resetuje hesla a propojuje rodiče s dětmi.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-700 font-black text-lg">⚙</span>
                  <span>Má nejvyšší technická práva v celé databázi.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SPODNÍ NAVIGAČNÍ TLAČÍTKA MEZI KROKY (POUZE V REŽIMU KROKOVÁNÍ) */}
      {!showAllAtOnce && (
        <div className="flex items-center justify-between gap-4 pt-4">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-base rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Předchozí téma</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < THEORY_STEPS.length ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>Další téma: {THEORY_STEPS[currentStep].label}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-sm font-bold text-emerald-700 flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 ml-auto">
              <CheckCircle2 className="w-5 h-5" />
              <span>Prošli jste celou teorii! Nyní vyzkoušejte aktivity.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InformationSystemsTheoryTab;
