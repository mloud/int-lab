'use client';
import React from 'react';
import { FileSpreadsheet, HelpCircle, Smartphone, CheckSquare } from 'lucide-react';

export const PieChartsWorksheetTab: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Hlavička pracovního listu */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200/80 shadow-sm text-center">
        <span className="text-xs font-black uppercase tracking-widest text-amber-700">
          Samostatná práce v MS Excel • 9. ročník
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-1 mb-3 uppercase tracking-tight">
          Analýza času u obrazovky (Screen Time)
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Přečtěte si týdenní statistiku využití chytrého telefonu, sestavte z textu tabulku v MS
          Excelu, vytvořte správně naformátovaný výsečový graf a odpovězte na otázky k datům.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* 1. Slovní zadání */}
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-sm">
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                Výchozí text se statistickými daty
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Lukášův týdenní přehled „Doba u obrazovky“
              </h3>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              Deváťák Lukáš si v neděli večer otevřel v nastavení svého telefonu týdenní přehled{' '}
              <strong>Doba u obrazovky</strong>, aby zjistil, které aplikace mu za posledních 7 dnů
              sebraly nejvíce času (průměrně na telefonu strávil 3 hodiny a 20 minut denně).
            </p>
            <p>
              V přehledu našel celkem <strong>10 používaných aplikací</strong> v tomto pořadí: Na{' '}
              <strong>YouTube</strong> sledoval videa <strong>294 minut</strong> a přes{' '}
              <strong>WhatsApp</strong> si psal se spolužáky <strong>154 minut</strong>. Úplně
              nejvíce času strávil u krátkých videí na <strong>TikToku</strong>, kde mu telefon
              naměřil <strong>420 minut</strong>. Na sociální síti <strong>Instagram</strong> strávil{' '}
              <strong>210 minut</strong>, hraním mobilní hry <strong>Brawl Stars</strong>{' '}
              <strong>112 minut</strong> a poslechem hudby na <strong>Spotify</strong>{' '}
              <strong>84 minut</strong>.
            </p>
            <p>
              Zbylý čas připadl na drobnější aplikace: webový prohlížeč <strong>Chrome</strong> (
              <strong>49 minut</strong>), školní aplikaci <strong>Bakaláři</strong> (
              <strong>35 minut</strong>), navigaci <strong>Mapy.cz</strong> (
              <strong>28 minut</strong>) a <strong>Kalkulačku</strong> (<strong>14 minut</strong>).
            </p>
          </div>
        </div>

        {/* 2. Požadavky na zpracování v Excelu (stručně, bez postupu) */}
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Úkol v tabulkovém procesoru
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Zpracování tabulky a tvorba výsečového grafu v MS Excelu
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 leading-relaxed">
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">
                  Max. 7 položek a kategorie „Ostatní“
                </strong>
                Graf nesmí obsahovat více než 7 výsečí. Méně významné aplikace slučte do souhrnné
                kategorie <strong>Ostatní</strong>.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">
                  Seřazení dat a „Ostatní“ na konci
                </strong>
                Data v tabulce seřaďte sestupně od největší hodnoty po nejmenší. Kategorie{' '}
                <strong>Ostatní</strong> však musí zůstat vždy na posledním řádku tabulky.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 md:col-span-2">
              <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 block mb-0.5">
                  Správně naformátovaný výsečový graf
                </strong>
                Vytvořte 2D výsečový graf s výstižným nadpisem a popisky dat v procentech (%).
                Nejdůležitější hodnota musí začínat nahoře <strong>na 12. hodině</strong> a výseč{' '}
                <strong>Ostatní</strong> graf uzavírá vlevo nahoře před 12. hodinou.
              </div>
            </div>
          </div>
        </div>

        {/* 3. Otázky na data v grafu */}
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-200 shadow-sm">
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                Interpretace dat
              </span>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Otázky k datům ve vašem grafu
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Pod hotový graf přímo do listu v MS Excelu zapište odpovědi na následující otázky:
          </p>

          <ol className="space-y-3 text-sm text-slate-700">
            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong>Celkový čas a vítěz:</strong> Kolik minut (a kolik hodin) celkem strávil
                Lukáš za celý týden na telefonu a jaký procentuální podíl (%) z tohoto času zabírá
                samotná nejvyužívanější aplikace?
              </div>
            </li>

            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong>Hranice 50 % času:</strong> Které konkrétní aplikace (počítáno od 12. hodiny
                po směru hodinových ručiček) musíte zkombinovat, abyste překročili{' '}
                <strong>polovinu (50 %)</strong> veškerého času na telefonu?
              </div>
            </li>

            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong>Dominance sociálních sítí a videa:</strong> Kolik procent (%) času a kolik
                minut dohromady spolkla trojice největších aplikací (
                <strong>TikTok, YouTube a Instagram</strong>)?
              </div>
            </li>

            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <strong>Váha kategorie „Ostatní“:</strong> Kolik minut a kolik procent (%) tvoří
                souhrnná výseč <strong>Ostatní</strong>? Které jednotlivé aplikace z hlavní šestky v
                grafu tato souhrnná kategorie svou velikostí překonala?
              </div>
            </li>

            <li className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                5
              </span>
              <div>
                <strong>Digitální detox (úspora 25 %):</strong> Pokud by chtěl Lukáš příští týden
                snížit svůj celkový čas u obrazovky přesně o <strong>čtvrtinu (25 %)</strong>, kolik
                minut by musel ušetřit a jakou kombinací aplikací z grafu by toho mohl dosáhnout?
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

