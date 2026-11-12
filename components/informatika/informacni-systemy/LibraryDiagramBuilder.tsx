'use client';
import React, { useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Library,
  Sparkles,
} from 'lucide-react';

interface StepQuestion {
  step: number;
  title: string;
  situation: string;
  question: string;
  targetLink: 'ctenari-vytisky' | 'knihy-vytisky' | 'autori-knihy' | 'knihy-obory';
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  lessonPoint: string;
}

const STEPS: StepQuestion[] = [
  {
    step: 1,
    title: '1. Krok: Kdo si knížku odnese domů?',
    situation:
      'Přijdeš do knihovny a chceš si půjčit knížku domů na víkend. Paní knihovnice vezme čtečku a pípne čárový kód na konkrétním kuse z poličky.',
    question: 'Kam v diagramu povede spojnice od [ Čtenáři ]?',
    targetLink: 'ctenari-vytisky',
    options: [
      {
        id: 'a',
        label: 'K [ Knihám ]',
        isCorrect: false,
        explanation:
          'Pozor, častý chyták! Kniha představuje název a záznam díla v katalogu. Když má knihovna 5 kusů stejné knihy na polici, čtenář si domů půjčuje konkrétní fyzický výtisk s čárovým kódem, ne samotný název v katalogu.',
      },
      {
        id: 'b',
        label: 'K [ Autorům ]',
        isCorrect: false,
        explanation: 'Autor knihu napsal, ale domů si ho nepůjčuješ!',
      },
      {
        id: 'c',
        label: 'K [ Oborům ]',
        isCorrect: false,
        explanation: 'Obor je žánr (např. Sci-fi), ten v batohu neodneseš.',
      },
      {
        id: 'd',
        label: 'K [ Výtiskům ] – konkrétní fyzická kniha s čárovým kódem',
        isCorrect: true,
        explanation:
          'Správně! Čtenář si půjčuje konkrétní fyzický výtisk z regálu s vlastním evidenčním číslem / čárovým kódem.',
      },
    ],
    lessonPoint:
      'Jeden čtenář si může půjčit více výtisků, ale jeden konkrétní výtisk může mít v danou chvíli jen jediný čtenář.',
  },
  {
    step: 2,
    title: '2. Krok: Odkud se berou výtisky?',
    situation:
      'Knihovna nakoupila pro velký zájem 5 stejných kusů knihy „Harry Potter“. Každý kus má na hřbetu vlastní čárový kód (výtisk #1 až #5), ale název i text příběhu je stejný.',
    question: 'Se kterou kartičkou musíme propojit [ Výtisky ]?',
    targetLink: 'knihy-vytisky',
    options: [
      {
        id: 'a',
        label: 'S kartičkou [ Knihy ] (Jeden titul může mít na polici víc výtisků)',
        isCorrect: true,
        explanation:
          'Výborně! Kniha představuje dílo/titul a výtisky jsou její skutečné fyzické kopie na regálech.',
      },
      {
        id: 'b',
        label: 'S kartičkou [ Autoři ]',
        isCorrect: false,
        explanation:
          'Autor napsal knihu jako příběh, nevyrábí jednotlivé papírové výtisky v tiskárně.',
      },
      {
        id: 'c',
        label: 'S kartičkou [ Obory ]',
        isCorrect: false,
        explanation:
          'Obor určuje žánr díla (např. Fantasy), nikoliv kolik papírových kusů leží na skladě.',
      },
    ],
    lessonPoint:
      'Jedna kniha (titul) má v knihovně více fyzických výtisků (např. 5 kusů).',
  },
  {
    step: 3,
    title: '3. Krok: Kdo příběh vytvořil?',
    situation:
      'Karel Čapek napsal R.U.R., Bílou nemoc i Dášenku. Zároveň však existují knihy (např. školní atlas), které psalo více autorů společně.',
    question: 'Jak propojíme kartičku [ Autoři ] s kartičkou [ Knihy ]?',
    targetLink: 'autori-knihy',
    options: [
      {
        id: 'a',
        label: 'Autoři ↔ Knihy (Autor může mít víc knih a kniha může mít víc autorů)',
        isCorrect: true,
        explanation:
          'Přesně tak! Vztah funguje oběma směry: autor píše více knih a na jedné knize může spolupracovat více autorů.',
      },
      {
        id: 'b',
        label: 'Autoři ➔ pouze k [ Výtiskům ]',
        isCorrect: false,
        explanation:
          'Autor se váže k dílu/knize jako celku, nikoliv k jednotlivým papírovým kusům.',
      },
      {
        id: 'c',
        label: 'Autoři ➔ přímo ke [ Čtenářům ]',
        isCorrect: false,
        explanation:
          'Autor sice píše pro čtenáře, ale v knihovním systému jsou propojeni skrze knihu, kterou si čtenář půjčuje.',
      },
    ],
    lessonPoint:
      'Jeden autor může mít více knih a jedna kniha může mít více autorů.',
  },
  {
    step: 4,
    title: '4. Krok: Kam knížku zařadit na polici?',
    situation:
      'Knihu „Zaklínač“ najdeš v regálu Fantasy, ale klidně i v Dobrodružné literatuře. A v regálu Fantasy samozřejmě stojí desítky dalších knih.',
    question: 'Se kterou kartičkou propojíme [ Obory ] (žánry)?',
    targetLink: 'knihy-obory',
    options: [
      {
        id: 'a',
        label: 'S kartičkou [ Knihy ] (Kniha může mít víc oborů a do jednoho oboru patří víc knih)',
        isCorrect: true,
        explanation:
          'Skvěle! Kniha může patřit do více oborů (např. Fantasy + Dobrodružné) a jeden obor obsahuje mnoho knih.',
      },
      {
        id: 'b',
        label: 'S kartičkou [ Čtenáři ]',
        isCorrect: false,
        explanation:
          'Čtenář má sice rád určité žánry, ale v evidenci knihovny se žánr přiřazuje přímo ke knize.',
      },
      {
        id: 'c',
        label: 'S kartičkou [ Výtisky ]',
        isCorrect: false,
        explanation:
          'Žánr patří celému příběhu (knize), ne každému jednotlivému papírovému výtisku zvlášť.',
      },
    ],
    lessonPoint:
      'Kniha může patřit do více oborů a do jednoho oboru patří v knihovně mnoho knih.',
  },
];

export const LibraryDiagramBuilder: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [activeLinks, setActiveLinks] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentStep = STEPS[currentStepIndex];

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const handleConfirm = () => {
    if (!selectedOptionId) return;
    const selected = currentStep.options.find((o) => o.id === selectedOptionId);
    if (!selected?.isCorrect) return;

    if (!activeLinks.includes(currentStep.targetLink)) {
      setActiveLinks((prev) => [...prev, currentStep.targetLink]);
    }

    if (currentStepIndex + 1 < STEPS.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setActiveLinks([]);
    setIsCompleted(false);
  };

  const hasLink = (linkId: string) => activeLinks.includes(linkId);

  const selectedOption = currentStep?.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-4 max-w-7xl mx-auto font-sans">
      {/* Kompaktní hlavička s tlačítkem restart */}
      <div className="bg-white rounded-2xl px-5 py-3 border border-slate-200 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold shrink-0 shadow-sm">
            <Library className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Diagram knihovny
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Aktivita z učebnice: sestav propojení mezi prvky knihovny
            </span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Začít znovu</span>
        </button>
      </div>

      {/* DVOUSLOUPCOVÝ LAYOUT: DIAGRAM VLEVO, ZADÁNÍ ÚKOLU VPRAVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEVÝ SLOUPEC: DIAGRAM KNIHOVNY (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Schéma databáze knihovny
            </span>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              Aktivní šipky: {activeLinks.length} / 4
            </span>
          </div>

          <div className="w-full relative h-[250px] sm:h-[280px] bg-slate-50 rounded-2xl border border-slate-200 select-none overflow-hidden">
            {/* SVG šipky na pevných souřadnicích viewBoxu 0 0 700 280 */}
            <svg
              viewBox="0 0 700 280"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Oboustranná modrá šipka (Autoři <-> Knihy) */}
                <marker
                  id="arrow-blue-end"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb" />
                </marker>
                <marker
                  id="arrow-blue-start"
                  viewBox="0 0 10 10"
                  refX="2"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563eb" />
                </marker>

                {/* Oboustranná oranžová šipka (Knihy <-> Obory) */}
                <marker
                  id="arrow-amber-end"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" />
                </marker>
                <marker
                  id="arrow-amber-start"
                  viewBox="0 0 10 10"
                  refX="2"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" />
                </marker>

                {/* Jednosměrná fialová šipka (Knihy -> Výtisky) */}
                <marker
                  id="arrow-purple-end"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#7c3aed" />
                </marker>

                {/* Oboustranná zelená šipka (Čtenáři <-> Výtisky) */}
                <marker
                  id="arrow-emerald-end"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
                </marker>
                <marker
                  id="arrow-emerald-start"
                  viewBox="0 0 10 10"
                  refX="2"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
                </marker>
              </defs>

              {/* 1. Spojnice: Autoři (185, 60) <-> Knihy (285, 60) */}
              {hasLink('autori-knihy') && (
                <g className="animate-in fade-in duration-300">
                  <line
                    x1="185"
                    y1="60"
                    x2="285"
                    y2="60"
                    stroke="#2563eb"
                    strokeWidth="4"
                    markerStart="url(#arrow-blue-start)"
                    markerEnd="url(#arrow-blue-end)"
                  />
                </g>
              )}

              {/* 2. Spojnice: Knihy (320, 95) <-> Obory (255, 185) */}
              {hasLink('knihy-obory') && (
                <g className="animate-in fade-in duration-300">
                  <line
                    x1="320"
                    y1="95"
                    x2="255"
                    y2="185"
                    stroke="#d97706"
                    strokeWidth="4"
                    markerStart="url(#arrow-amber-start)"
                    markerEnd="url(#arrow-amber-end)"
                  />
                </g>
              )}

              {/* 3. Spojnice: Knihy (375, 95) -> Výtisky (415, 185) */}
              {hasLink('knihy-vytisky') && (
                <g className="animate-in fade-in duration-300">
                  <line
                    x1="375"
                    y1="95"
                    x2="415"
                    y2="185"
                    stroke="#7c3aed"
                    strokeWidth="4"
                    markerEnd="url(#arrow-purple-end)"
                  />
                </g>
              )}

              {/* 4. Spojnice: Čtenáři (540, 95) <-> Výtisky (500, 185) */}
              {hasLink('ctenari-vytisky') && (
                <g className="animate-in fade-in duration-300">
                  <line
                    x1="540"
                    y1="95"
                    x2="500"
                    y2="185"
                    stroke="#059669"
                    strokeWidth="4"
                    markerStart="url(#arrow-emerald-start)"
                    markerEnd="url(#arrow-emerald-end)"
                  />
                </g>
              )}
            </svg>

            {/* 5 KARTIČEK NA PŘESNÝCH POZICÍCH (přesně podle obrázku z učebnice) */}

            {/* HORNÍ ŘADA: Autoři (vlevo), Knihy (uprostřed), Čtenáři (vpravo) */}
            <div className="absolute top-4 left-[5%] w-[21%] z-10">
              <div className="bg-white p-2.5 rounded-xl border-2 border-blue-400 shadow-sm text-center">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block uppercase">
                  Kdo píše
                </span>
                <span className="text-sm sm:text-base font-black text-blue-900 block leading-tight">
                  autoři
                </span>
              </div>
            </div>

            <div className="absolute top-4 left-[41%] w-[22%] z-10">
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl border-2 border-indigo-400 shadow-lg text-center">
                <span className="text-[10px] sm:text-[11px] font-black text-indigo-200 block uppercase">
                  Středobod
                </span>
                <span className="text-sm sm:text-base font-black block leading-tight">
                  knihy
                </span>
              </div>
            </div>

            <div className="absolute top-4 right-[5%] w-[21%] z-10">
              <div className="bg-white p-2.5 rounded-xl border-2 border-emerald-400 shadow-sm text-center">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block uppercase">
                  Kdo si půjčuje
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-900 block leading-tight">
                  čtenáři
                </span>
              </div>
            </div>

            {/* SPODNÍ ŘADA: Obory (vlevo dole), Výtisky (vpravo dole) */}
            <div className="absolute bottom-4 left-[26%] w-[21%] z-10">
              <div className="bg-white p-2.5 rounded-xl border-2 border-amber-400 shadow-sm text-center">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block uppercase">
                  Žánry
                </span>
                <span className="text-sm sm:text-base font-black text-amber-900 block leading-tight">
                  obory
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-[26%] w-[21%] z-10">
              <div className="bg-white p-2.5 rounded-xl border-2 border-purple-400 shadow-sm text-center">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block uppercase">
                  Fyzické kusy
                </span>
                <span className="text-sm sm:text-base font-black text-purple-900 block leading-tight">
                  výtisky
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PRAVÝ SLOUPEC: ZADÁNÍ ÚKOLU A OTÁZKY (lg:col-span-5) */}
        <div className="lg:col-span-5">
          {!isCompleted ? (
            <div className="bg-white rounded-3xl p-5 border-2 border-indigo-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                    {currentStep.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    {currentStep.title}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400 shrink-0">
                  Krok {currentStepIndex + 1} ze 4
                </span>
              </div>

              {/* Krátká situace a otázka */}
              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-sm sm:text-base text-slate-800 leading-relaxed font-bold">
                💡 <strong>Představ si:</strong> {currentStep.situation}
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentStep.question}
              </h4>

              {/* Možnosti odpovědí */}
              <div className="grid grid-cols-1 gap-2.5">
                {currentStep.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs'
                            : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-slate-50 text-slate-900'
                      }`}
                    >
                      <span className="leading-snug">{opt.label}</span>
                      {isSelected && (
                        <span className="shrink-0 ml-2">
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <span className="text-xs font-black text-rose-600">Zkus to znovu</span>
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stručné vysvětlení po volbě */}
              {selectedOption && (
                <div
                  className={`p-4 rounded-2xl border-2 text-sm font-semibold leading-relaxed animate-in fade-in duration-200 ${
                    selectedOption.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  {selectedOption.isCorrect ? '✅ ' : '❌ '}
                  {selectedOption.explanation}
                  {selectedOption.isCorrect && (
                    <span className="block mt-1.5 font-black text-emerald-900">
                      📌 Pravidlo: {currentStep.lessonPoint}
                    </span>
                  )}
                </div>
              )}

              {/* Tlačítko pro zakreslení šipky */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedOption?.isCorrect}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentStepIndex + 1 === STEPS.length
                      ? 'Dokončit diagram'
                      : 'Zakreslit šipku do diagramu'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* HOTOVO */
            <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-xl space-y-3 text-center animate-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/20 mx-auto flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">
                Diagram je kompletní!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-sm mx-auto leading-relaxed font-medium">
                Výborně! Všechny šipky jsou na svém místě: oddělili jsme{' '}
                <strong>knihu</strong> od <strong>fyzických výtisků</strong>, spojili{' '}
                <strong>čtenáře s výtisky</strong> a umožnili vazby na{' '}
                <strong>více oborů</strong> i <strong>více autorů</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Projít si diagram znovu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryDiagramBuilder;
