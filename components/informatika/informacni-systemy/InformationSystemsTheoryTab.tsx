import React from 'react';
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
} from 'lucide-react';

export const InformationSystemsTheoryTab: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-800 max-w-5xl mx-auto">
      {/* 1. CO JE INFORMAČNÍ SYSTÉM + PŘÍKLADY */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 sm:p-8 rounded-[2.5rem] border-2 border-indigo-200 shadow-lg space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b-2 border-indigo-100">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block mb-0.5">
              Základní definice
            </span>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              1. Co je informační systém?
            </h2>
          </div>
        </div>

        {/* Definiční rámec */}
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-md border-2 border-indigo-500">
          <p className="text-base sm:text-lg font-bold leading-relaxed">
            Informační systém (IS) je systém (v počítači konkrétní program), který{' '}
            <span className="underline decoration-indigo-300 decoration-2 underline-offset-4">
              shromažďuje, ukládá a zpracovává informace
            </span>
            .
          </p>
        </div>

        {/* Příklady informačních systémů v rámcích */}
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 mb-3">
            Příklady informačních systémů
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border-2 border-blue-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">Bakaláři</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Školní žákovská knížka – známky, rozvrh hodin a omluvenky.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Library className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">Knihovna</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Katalog knih, evidence čtenářů a přehled výpůjček.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">E-shop</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sklad zboží, nákupní košík, objednávky a platby.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">Banka</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Správa účtů, přehled plateb a převody peněz.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
                <Film className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-slate-900 mb-1">Netflix</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Katalog filmů a seriálů, profily rodiny a historie sledování.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. JAK INFORMAČNÍ SYSTÉM FUNGUJE: VSTUP -> IS -> VÝSTUP */}
      <section className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-lg space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              2. Jak informační systém funguje?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Princip ve třech krocích:{' '}
              <strong className="text-indigo-800">VSTUP ➔ ZPRACOVÁNÍ (IS) ➔ VÝSTUP</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Krok 1: VSTUP */}
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-blue-200 flex flex-col justify-between">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
                  Vstup dat
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1.5">📥 Vstup</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Data, která do systému zadáme, naťukáme nebo naskenujeme:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block mb-0.5">
                  1. Školní známka
                </span>
                <p className="text-sm text-slate-700 leading-snug">
                  Učitel zapíše známku 1 do formuláře v Bakalářích.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block mb-0.5">
                  2. Školní oběd
                </span>
                <p className="text-sm text-slate-700 leading-snug">
                  Přiložíš svůj čip ke čtečce u výdejního okénka.
                </p>
              </div>
            </div>
          </div>

          {/* Krok 2: ZPRACOVÁNÍ */}
          <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-md flex flex-col justify-between">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-white/20 text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-100 bg-white/15 px-2.5 py-0.5 rounded-md">
                  Uvnitř systému
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-1.5">⚙️ Zpracování</h3>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Systém data bezpečně porovná, propočítá a uloží:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="bg-indigo-700/70 p-3 rounded-xl border border-indigo-400/40 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200 block mb-0.5">
                  1. Školní známka
                </span>
                <p className="text-sm text-indigo-50 leading-snug">
                  Zapíše známku do databáze a přepočítá průměr.
                </p>
              </div>

              <div className="bg-indigo-700/70 p-3 rounded-xl border border-indigo-400/40 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-200 block mb-0.5">
                  2. Školní oběd
                </span>
                <p className="text-sm text-indigo-50 leading-snug">
                  Ověří v databázi, zda máš oběd na dnešek zaplacený.
                </p>
              </div>
            </div>
          </div>

          {/* Krok 3: VÝSTUP */}
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-emerald-200 flex flex-col justify-between">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                  Výsledek
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1.5">📤 Výstup</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hotová informace, kterou systém předá nebo ukáže:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 block mb-0.5">
                  1. Školní známka
                </span>
                <p className="text-sm text-slate-700 leading-snug">
                  Nová známka v mobilu žáka a vytištěné vysvědčení.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-xs">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 block mb-0.5">
                  2. Školní oběd
                </span>
                <p className="text-sm text-slate-700 leading-snug">
                  Zelené světlo na čtečce a kuchařka ti vydá oběd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Z ČEHO SE INFORMAČNÍ SYSTÉM SKLÁDÁ */}
      <section className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-lg space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              3. Z čeho se informační systém skládá?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Aby program a celý systém fungoval v praxi, potřebuje tyto 4 části:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5">1. Hardware</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Počítače, servery, mobily, čtečky čipů a tiskárny.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5">2. Software</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Samotný program, webová stránka nebo mobilní aplikace.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5">3. Data</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Uložená jména, známky, rozvrh hodin, knihy či zboží.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5">4. Lidé</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Uživatelé systému – žáci, rodiče, učitelé i správci.
            </p>
          </div>
        </div>
      </section>

      {/* 4. UŽIVATEL, ÚČET A PROFIL */}
      <section className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-lg space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            4. Uživatel, účet a profil
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-teal-50/70 p-5 rounded-2xl border-2 border-teal-200">
            <h3 className="text-xl font-black text-teal-900 mb-2">👤 Uživatel</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Konkrétní člověk, který právě sedí u počítače nebo mobilu.
            </p>
          </div>

          <div className="bg-blue-50/70 p-5 rounded-2xl border-2 border-blue-200">
            <h3 className="text-xl font-black text-blue-900 mb-2">🔑 Uživatelský účet</h3>
            <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <li>• Slouží k <strong>přihlášení</strong> (jméno + heslo).</li>
              <li>• Systém díky němu pozná, kdo jste.</li>
            </ul>
          </div>

          <div className="bg-indigo-50/70 p-5 rounded-2xl border-2 border-indigo-200">
            <h3 className="text-xl font-black text-indigo-900 mb-2">🛡️ Uživatelský profil</h3>
            <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <li>• Osobní nastavení a soukromá data.</li>
              <li>• Chrání vaše informace před cizími lidmi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. ROLE A OPRÁVNĚNÍ */}
      <section className="bg-white p-6 sm:p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-lg space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              5. Role a oprávnění (Kdo co smí?)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Role určuje práva uživatele – každý vidí a upravuje jen to, co potřebuje ke své práci.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/60">
            <div className="flex items-center gap-2 text-blue-900 mb-2">
              <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
              <h3 className="text-xl font-black">Žák</h3>
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <li>• <strong>Čte</strong> jen své známky.</li>
              <li>• Nesmí nic přepisovat.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60">
            <div className="flex items-center gap-2 text-emerald-900 mb-2">
              <Users className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="text-xl font-black">Rodič</h3>
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <li>• <strong>Čte</strong> známky svých dětí.</li>
              <li>• Nevidí cizí žáky.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/60">
            <div className="flex items-center gap-2 text-purple-900 mb-2">
              <UserCheck className="w-5 h-5 text-purple-600 shrink-0" />
              <h3 className="text-xl font-black">Učitel</h3>
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <li>• <strong>Zapisuje a maže</strong> známky.</li>
              <li>• Vidí celou třídu.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/60">
            <div className="flex items-center gap-2 text-amber-900 mb-2">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-xl font-black">Správce</h3>
            </div>
            <ul className="text-sm text-slate-700 space-y-1.5 leading-relaxed">
              <li>• <strong>Zakládá a maže</strong> účty.</li>
              <li>• Propojuje rodiče s dětmi.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformationSystemsTheoryTab;
