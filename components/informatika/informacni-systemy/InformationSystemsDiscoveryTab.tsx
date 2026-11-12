'use client';
import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Users,
  ShieldCheck,
  KeyRound,
  HardDrive,
  Code2,
  FileText,
  GraduationCap,
  Library,
  ShoppingCart,
  Landmark,
  Film,
  Bell,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface DiscoveryStep {
  id: number;
  badge: string;
  question: string;
  solution: {
    heading: string;
    description: string;
    content: React.ReactNode;
    keyAnswers?: { q: string; a: string }[];
    takeaway: string;
  };
}

interface InformationSystemsDiscoveryTabProps {
  onGoToSimulator?: () => void;
  onGoToTheory?: () => void;
}

export const InformationSystemsDiscoveryTab: React.FC<InformationSystemsDiscoveryTabProps> = ({
  onGoToSimulator,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState<Record<number, boolean>>({});

  const steps: DiscoveryStep[] = [
    {
      id: 1,
      badge: '1. Krok: Hádanka na úvod',
      question:
        'Co má společného školní žákovská (Bakaláři), Netflix, e-shop (Alza) a internetová banka v mobilu?',
      solution: {
        heading: 'Pointa: Všechno jsou to Informační systémy (IS)',
        description:
          'Informační systém je počítačový program, který shromažďuje, bezpečně ukládá a zpracovává informace.',
        takeaway: 'Informační systém = program, který organizuje data tak, aby nám usnadnil život a práci.',
        content: (
          <div className="space-y-4 mt-4">
            {/* 5 příkladů */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              <div className="bg-white/95 p-4 rounded-2xl border-2 border-blue-200 text-center shadow-xs">
                <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-base font-black text-slate-900">Bakaláři</div>
                <div className="text-sm font-semibold text-slate-600">Známky a rozvrh</div>
              </div>
              <div className="bg-white/95 p-4 rounded-2xl border-2 border-amber-200 text-center shadow-xs">
                <Library className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <div className="text-base font-black text-slate-900">Knihovna</div>
                <div className="text-sm font-semibold text-slate-600">Katalog a výpůjčky</div>
              </div>
              <div className="bg-white/95 p-4 rounded-2xl border-2 border-emerald-200 text-center shadow-xs">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-base font-black text-slate-900">E-shop</div>
                <div className="text-sm font-semibold text-slate-600">Košík a objednávky</div>
              </div>
              <div className="bg-white/95 p-4 rounded-2xl border-2 border-slate-300 text-center shadow-xs">
                <Landmark className="w-8 h-8 mx-auto mb-2 text-slate-700" />
                <div className="text-base font-black text-slate-900">Banka</div>
                <div className="text-sm font-semibold text-slate-600">Účty a platby</div>
              </div>
              <div className="bg-white/95 p-4 rounded-2xl border-2 border-rose-200 text-center col-span-2 sm:col-span-1 shadow-xs">
                <Film className="w-8 h-8 mx-auto mb-2 text-rose-600" />
                <div className="text-base font-black text-slate-900">Netflix</div>
                <div className="text-sm font-semibold text-slate-600">Filmy a profily</div>
              </div>
            </div>

            {/* Společné vlastnosti informačních systémů */}
            <div className="bg-indigo-50/80 p-5 rounded-3xl border-2 border-indigo-200 space-y-3">
              <span className="text-sm font-black uppercase tracking-wider text-indigo-900 block">
                ⭐ 4 společné vlastnosti každého informačního systému:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex items-start gap-3 shadow-xs">
                  <span className="text-2xl shrink-0">💾</span>
                  <div>
                    <div className="text-base font-black text-slate-900">1. Pamatuje si data</div>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed">
                      Ukládá obrovské množství údajů (známky, zboží, filmy či platby).
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex items-start gap-3 shadow-xs">
                  <span className="text-2xl shrink-0">🔑</span>
                  <div>
                    <div className="text-base font-black text-slate-900">2. Má uživatelské účty</div>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed">
                      Každý se přihlašuje vlastním jménem a heslem pro ochranu soukromí.
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex items-start gap-3 shadow-xs">
                  <span className="text-2xl shrink-0">🌐</span>
                  <div>
                    <div className="text-base font-black text-slate-900">3. Funguje online pro mnoho lidí</div>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed">
                      Běží na serveru a přistupujeme k němu přes mobil, tablet i počítač.
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex items-start gap-3 shadow-xs">
                  <span className="text-2xl shrink-0">🛡️</span>
                  <div>
                    <div className="text-base font-black text-slate-900">4. Řídí práva (role)</div>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed">
                      Každý smí vidět a měnit jen to, co má dovoleno (žák vs. učitel).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    },
    {
      id: 2,
      badge: '2. Krok: Jak to uvnitř funguje?',
      question:
        'Učitel v hodině sedí u počítače a zapíše ti jedničku. Jak se stane, že za pár vteřin pípne tvému rodiči notifikace na mobilu?',
      solution: {
        heading: 'Pointa: Základní cyklus VSTUP ➔ ZPRACOVÁNÍ ➔ VÝSTUP',
        description:
          'Každý informační systém funguje přesně v těchto třech po sobě jdoucích krocích:',
        takeaway: 'Data do systému vstoupí, ten je uloží a vyhodnotí, a výsledek předá správnému člověku.',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
            <div className="bg-white/95 p-4 rounded-2xl border-2 border-blue-200 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md inline-block mb-2">
                1. Krok: VSTUP
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1">📥 Učitel zapíše známku</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Učitel se přihlásí do Bakalářů a do formuláře naťuká známku 1.
              </p>
            </div>

            <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-md border-2 border-indigo-400">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-100 bg-white/20 px-2 py-0.5 rounded-md inline-block mb-2">
                2. Krok: ZPRACOVÁNÍ
              </span>
              <h4 className="text-base font-black text-white mb-1">⚙️ Systém data uloží</h4>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Systém zapíše známku do databáze, přepočítá průměr a vytvoří notifikaci.
              </p>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border-2 border-emerald-200 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-2">
                3. Krok: VÝSTUP
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <span>📤 Pípne notifikace</span>
                <Bell className="w-4 h-4 text-emerald-600" />
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Telefon rodiče i žáka pípne: <em>„Nová známka z Informatiky: 1“</em>.
              </p>
            </div>
          </div>
        ),
        keyAnswers: [
          {
            q: 'Kudy informace do systému vešla?',
            a: 'Přes formulář na počítači učitele (vstup dat).',
          },
          {
            q: 'Co se stalo uvnitř?',
            a: 'Systém známku bezpečně uložil do databáze a přepočítal celkový průměr.',
          },
          {
            q: 'Kdo a jak se výsledek dozvěděl?',
            a: 'Rodič i žák formou okamžité notifikace v mobilní aplikaci (výstup).',
          },
        ],
      },
    },
    {
      id: 3,
      badge: '3. Krok: Z čeho se systém skládá?',
      question:
        'Představte si, že programátoři napsali skvělý kód Bakalářů. Bude to fungovat samo o sobě? Co všechno dalšího k tomu nutně potřebujeme, aby to ve škole žilo?',
      solution: {
        heading: 'Pointa: 4 nepostradatelné části každého IS',
        description:
          'Informační systém není jen software v počítači. Aby fungoval, potřebuje všechny 4 stavební kameny:',
        takeaway: 'Hardware + Software + Data + Lidé. Chybí-li jediný dílek, systém nefunguje.',
        content: (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-blue-200 shadow-xs">
              <HardDrive className="w-5 h-5 text-blue-600 mb-1.5" />
              <div className="text-sm font-black text-slate-900">1. Hardware</div>
              <p className="text-xs text-slate-600 leading-snug mt-1">
                Počítače, servery, mobily a Wi-Fi sítě.
              </p>
            </div>

            <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-purple-200 shadow-xs">
              <Code2 className="w-5 h-5 text-purple-600 mb-1.5" />
              <div className="text-sm font-black text-slate-900">2. Software</div>
              <p className="text-xs text-slate-600 leading-snug mt-1">
                Aplikace, programový kód a webová stránka.
              </p>
            </div>

            <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-emerald-200 shadow-xs">
              <FileText className="w-5 h-5 text-emerald-600 mb-1.5" />
              <div className="text-sm font-black text-slate-900">3. Data</div>
              <p className="text-xs text-slate-600 leading-snug mt-1">
                Uložená jména žáků, známky a rozvrhy.
              </p>
            </div>

            <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-amber-200 shadow-xs">
              <Users className="w-5 h-5 text-amber-600 mb-1.5" />
              <div className="text-sm font-black text-slate-900">4. Lidé</div>
              <p className="text-xs text-slate-600 leading-snug mt-1">
                Žáci, rodiče, učitelé i IT správce.
              </p>
            </div>
          </div>
        ),
        keyAnswers: [
          {
            q: 'Na čem program běží?',
            a: 'Na serverech a v mobilech uživatelů (Hardware).',
          },
          {
            q: 'Co do něj musíme nahrát, aby nebyl prázdný?',
            a: 'Seznamy tříd, žáků, učitelů a předmětů (Data).',
          },
          {
            q: 'Kdo to celé udržuje v chodu?',
            a: 'Učitelé, správci sítě a samotní žáci (Lidé).',
          },
        ],
      },
    },
    {
      id: 4,
      badge: '4. Krok: Účet a profil',
      question:
        'Na Wikipedii nebo zprávy může koukat kdokoliv bez přihlášení. Proč se do žákovské nebo na Netflix musíme přihlašovat jménem a heslem?',
      solution: {
        heading: 'Pointa: Účet je tvůj klíč a profil chrání tvé soukromí',
        description:
          'Přihlášení chrání naše osobní údaje a zajišťuje, že každý vidí přesně to, co patří jen jemu.',
        takeaway: 'Uživatel = živý člověk. Účet = jméno a heslo. Profil = soukromá data a nastavení.',
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
            <div className="bg-white/95 p-4 rounded-2xl border-2 border-teal-200 shadow-xs">
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md block w-fit mb-1.5">
                Kdo
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1">👤 Uživatel</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Živý člověk (ty, učitel, rodič), který právě sedí u klávesnice nebo drží mobil.
              </p>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border-2 border-blue-200 shadow-xs">
              <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md block w-fit mb-1.5">
                Klíč
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1">🔑 Uživatelský účet</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jméno a tajné heslo. Slouží k tomu, aby systém bezpečně poznal, kdo se hlásí.
              </p>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border-2 border-indigo-200 shadow-xs">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md block w-fit mb-1.5">
                Trezor
              </span>
              <h4 className="text-base font-black text-slate-900 mb-1">🛡️ Uživatelský profil</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tvá osobní data, známky a nastavení, ke kterým cizí lidé nemají přístup.
              </p>
            </div>
          </div>
        ),
        keyAnswers: [
          {
            q: 'Proč nestačí mít data volně přístupná?',
            a: 'Žákovská knížka obsahuje soukromé osobní údaje, které cizí lidé nesmí vidět.',
          },
          {
            q: 'Jak systém pozná, komu poslat notifikaci?',
            a: 'Podle přihlašovacích údajů účtu ví, ke kterému žákovi či rodiči profil patří.',
          },
        ],
      },
    },
    {
      id: 5,
      badge: '5. Krok: Role a oprávnění',
      question:
        'Proč žák v Bakalářích nemůže sám sobě zapsat známku? A proč rodič ze sousedního města nevidí tvoje vysvědčení?',
      solution: {
        heading: 'Pointa: Role a oprávnění uživatelů',
        description:
          'Každý uživatel má v systému přiřazenou svou ROLI. Role přesně určuje, co uživatel smí ČÍST a co smí UPRAVOVAT.',
        takeaway: 'Role chrání systém před zmatkem i podvody. Každý má právě taková práva, jaká ke své roli potřebuje.',
        content: (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-blue-50/80 p-3 rounded-2xl border-2 border-blue-200 shadow-xs">
              <div className="flex items-center gap-1.5 mb-1 text-blue-900">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="font-black text-sm">Žák</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Jen <strong>čte své známky</strong>. Nemůže nic měnit.
              </p>
            </div>

            <div className="bg-emerald-50/80 p-3 rounded-2xl border-2 border-emerald-200 shadow-xs">
              <div className="flex items-center gap-1.5 mb-1 text-emerald-900">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="font-black text-sm">Rodič</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                <strong>Čte data svých dětí</strong>. Nevidí cizí žáky.
              </p>
            </div>

            <div className="bg-purple-50/80 p-3 rounded-2xl border-2 border-purple-200 shadow-xs">
              <div className="flex items-center gap-1.5 mb-1 text-purple-900">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span className="font-black text-sm">Učitel</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                <strong>Zapisuje a maže známky</strong> celé své třídě.
              </p>
            </div>

            <div className="bg-amber-50/80 p-3 rounded-2xl border-2 border-amber-200 shadow-xs">
              <div className="flex items-center gap-1.5 mb-1 text-amber-900">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span className="font-black text-sm">Správce</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                <strong>Zakládá účty</strong> a řídí celou školní databázi.
              </p>
            </div>
          </div>
        ),
        keyAnswers: [
          {
            q: 'Proč žák nesmí známky měnit?',
            a: 'Aby se zabránilo podvodům a zmatkům. Hodnotit smí pouze vyučující.',
          },
          {
            q: 'Proč cizí rodič nevidí tvoje známky?',
            a: 'Systém má každého rodiče bezpečně propojeného pouze s jeho vlastními dětmi.',
          },
        ],
      },
    },
  ];

  const currentStep = steps[currentStepIndex];
  const isRevealed = !!revealedSteps[currentStep.id];

  const handleReveal = () => {
    setRevealedSteps(prev => ({ ...prev, [currentStep.id]: true }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setRevealedSteps({});
    setCurrentStepIndex(0);
  };

  // Keyboard navigation for projector / presenter: Space / ArrowRight / ArrowLeft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === ' ' || e.key === 'Enter') {
        if (!revealedSteps[currentStep.id]) {
          e.preventDefault();
          handleReveal();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(i => i + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentStepIndex > 0) {
          setCurrentStepIndex(i => i - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, revealedSteps, currentStep.id]);

  return (
    <div className="space-y-6 text-slate-800 max-w-5xl mx-auto">
      {/* HORNÍ LIŠTA: STEPPER A REŽIM PROJEKTORU */}
      <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border-2 border-indigo-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block">
                Prezentační režim na tabuli / projektor
              </span>
              <h2 className="text-xl font-black text-slate-800 leading-tight">
                Společné objevování: Jak fungují informační systémy?
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReset}
              title="Resetovat celou diskuzi"
              className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Krokovací tlačítka 1..5 */}
        <div className="grid grid-cols-5 gap-2 pt-3">
          {steps.map((s, idx) => {
            const isActive = idx === currentStepIndex;
            const isDone = !!revealedSteps[s.id];

            return (
              <button
                key={s.id}
                onClick={() => setCurrentStepIndex(idx)}
                className={`py-2 px-2.5 rounded-xl border-2 text-left transition-all flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm ring-2 ring-indigo-200'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:border-emerald-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-white text-indigo-700'
                      : isDone
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isDone && !isActive ? '✓' : s.id}
                </span>
                <span className="text-xs font-bold truncate hidden sm:inline">
                  {s.id === 1 && 'Hádanka'}
                  {s.id === 2 && 'Cesta známky'}
                  {s.id === 3 && '4 pilíře'}
                  {s.id === 4 && 'Účet a profil'}
                  {s.id === 5 && 'Role'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HLAVNÍ PREZENTAČNÍ KARTA (STAGE) */}
      <div className="bg-white p-6 sm:p-9 rounded-[2.5rem] border-2 border-slate-200 shadow-xl space-y-6">
        {/* Odznak a název fáze */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            {currentStep.badge}
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            Tip pro učitele: Klávesa Mezerník = odkrýt | Šipky = další otázka
          </span>
        </div>

        {/* Velká čistá otázka do třídy bez spoilerů a nadpisů */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/80 p-5 sm:p-7 rounded-2xl shadow-xs">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-black text-xl shadow-xs">
              ?
            </span>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed pt-0.5">
              „{currentStep.question}“
            </p>
          </div>
        </div>

        {/* AKCE: ODKRÝT ODPOVĚĎ */}
        {!isRevealed ? (
          <div className="text-center py-6">
            <button
              onClick={handleReveal}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 mx-auto"
            >
              <Eye className="w-5 h-5" />
              <span>Odkrýt řešení a shrnutí diskuze</span>
              <span className="text-xs bg-indigo-500 px-2 py-0.5 rounded-md font-medium text-indigo-100">
                Mezerník
              </span>
            </button>
          </div>
        ) : (
          /* ODKRYTÉ ŘEŠENÍ A SHRNUTÍ VČETNĚ ODPOVĚDÍ NA OTÁZKY */
          <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 sm:p-7 rounded-2xl border-2 border-indigo-300 shadow-md space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2.5 pb-2 border-b border-indigo-100">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 block">
                  Závěr diskuze
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  {currentStep.solution.heading}
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {currentStep.solution.description}
            </p>

            {currentStep.solution.content}

            {/* Zodpovězené otázky z diskuze */}
            {currentStep.solution.keyAnswers && currentStep.solution.keyAnswers.length > 0 && (
              <div className="bg-white/90 p-4 rounded-2xl border border-indigo-200/80 space-y-2 mt-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-800 block">
                  💡 Co jsme si v diskuzi objasnili:
                </span>
                <div className="space-y-2">
                  {currentStep.solution.keyAnswers.map((item, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900">• {item.q}</span>{' '}
                      <span className="text-slate-600">{item.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 mt-4 shadow-xs">
              <span className="shrink-0 bg-white/20 px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider">
                Pravidlo
              </span>
              <span>{currentStep.solution.takeaway}</span>
            </div>
          </div>
        )}

        {/* DOLNÍ NAVIGACE MEZI KROKY */}
        <div className="flex items-center justify-between pt-5 border-t-2 border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-5 py-3 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Předchozí otázka</span>
          </button>

          <div className="text-sm font-black text-slate-500">
            Otázka {currentStepIndex + 1} z {steps.length}
          </div>

          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Další otázka</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onGoToSimulator}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Vyzkoušet v simulátoru</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformationSystemsDiscoveryTab;
