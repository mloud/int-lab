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
} from 'lucide-react';

export const InformationSystemsTheoryTab: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-800 max-w-5xl mx-auto">
      {/* 0. ZÁKLADNÍ PRINCIP: VSTUP -> IS -> VÝSTUP */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8 sm:p-10 rounded-[2.5rem] border-2 border-indigo-200 shadow-lg">
        <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block mb-2">
          Základní princip informatiky
        </span>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
          Jak funguje informační systém?
        </h2>

        <p className="text-xl text-slate-700 font-medium mb-8 leading-relaxed">
          Každý informační systém funguje úplně jednoduše na třech krocích:{' '}
          <strong className="text-indigo-900 font-black">VSTUP ➔ ZPRACOVÁNÍ (IS) ➔ VÝSTUP</strong>.
        </p>

        {/* Vizuální schéma Vstup -> IS -> Výstup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch relative">
          {/* Krok 1: VSTUP */}
          <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  Vstup
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">📥 Vstup dat</h3>
              <p className="text-base text-slate-600 font-medium mb-4">
                To, co do systému zadáme nebo pošleme:
              </p>
            </div>
            <ul className="text-base text-slate-700 space-y-2 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <li>• Učitel zapíše známku 1.</li>
              <li>• Přiložíš čip na oběd.</li>
              <li>• Vyplníš jméno a heslo.</li>
            </ul>
          </div>

          {/* Krok 2: IS (ZPRACOVÁNÍ A DATABÁZE) */}
          <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-white/20 text-white font-black text-sm flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-indigo-200 bg-white/10 px-2.5 py-1 rounded-md">
                  Systém uvnitř
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">⚙️ Informační systém</h3>
              <p className="text-base text-indigo-100 font-medium mb-4">
                Uloží data a udělá s nimi práci:
              </p>
            </div>
            <ul className="text-base text-indigo-50 space-y-2 font-medium bg-indigo-700/60 p-3.5 rounded-xl border border-indigo-500/50">
              <li>• Uloží známku do databáze.</li>
              <li>• Přepočítá vážený průměr.</li>
              <li>• Zkontroluje, zda máš zaplaceno.</li>
            </ul>
          </div>

          {/* Krok 3: VÝSTUP */}
          <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Výstup
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">📤 Výstup</h3>
              <p className="text-base text-slate-600 font-medium mb-4">
                Výsledek, který systém ukáže nebo vydá:
              </p>
            </div>
            <ul className="text-base text-slate-700 space-y-2 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <li>• Zpráva s novou známkou v mobilu.</li>
              <li>• Zelené světlo na čtečce u kuchařky.</li>
              <li>• Vytištěné vysvědčení na papíře.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 1. CO JE INFORMAČNÍ SYSTÉM */}
      <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-lg">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
            <Laptop className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            1. Informační systém (IS)
          </h2>
        </div>

        <ul className="text-xl text-slate-700 space-y-3 mb-8 font-medium leading-relaxed">
          <li>• Slouží k <strong>ukládání, vyhledávání a správě informací</strong>.</li>
          <li>• <strong>Příklady ve škole:</strong> Bakaláři (žákovská knížka), objednávání obědů, školní knihovna.</li>
        </ul>

        <h3 className="text-lg font-black uppercase tracking-wider text-slate-500 mb-4">
          4 části každého informačního systému:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
              <HardDrive className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-xl mb-2">1. Hardware</h4>
            <p className="text-base text-slate-600 font-medium leading-snug">
              Počítače, servery, mobily, čtečky čipů.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-xl mb-2">2. Software</h4>
            <p className="text-base text-slate-600 font-medium leading-snug">
              Program, webová stránka nebo mobilní aplikace.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-xl mb-2">3. Data</h4>
            <p className="text-base text-slate-600 font-medium leading-snug">
              Jména, známky, rozvrh hodin, jídelníček.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-black text-slate-900 text-xl mb-2">4. Lidé</h4>
            <p className="text-base text-slate-600 font-medium leading-snug">
              Uživatelé – žáci, rodiče, učitelé, správci.
            </p>
          </div>
        </div>
      </section>

      {/* 2. UŽIVATEL, ÚČET A PROFIL */}
      <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-lg">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            2. Uživatel, účet a profil
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-teal-50/80 p-6 rounded-2xl border-2 border-teal-200">
            <h4 className="font-black text-teal-900 text-xl mb-2">👤 Uživatel</h4>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• Konkrétní člověk u počítače nebo mobilu.</li>
            </ul>
          </div>

          <div className="bg-blue-50/80 p-6 rounded-2xl border-2 border-blue-200">
            <h4 className="font-black text-blue-900 text-xl mb-2">🔑 Uživatelský účet</h4>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• Slouží k <strong>přihlášení</strong> (jméno + heslo).</li>
              <li>• Systém díky němu pozná, kdo se hlásí.</li>
            </ul>
          </div>

          <div className="bg-indigo-50/80 p-6 rounded-2xl border-2 border-indigo-200">
            <h4 className="font-black text-indigo-900 text-xl mb-2">🛡️ Uživatelský profil</h4>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• Osobní nastavení a soukromá data.</li>
              <li>• Chrání soukromí před cizími lidmi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. UŽIVATELSKÉ ROLE */}
      <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-lg">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            3. Role a oprávnění (Kdo co smí?)
          </h2>
        </div>

        <ul className="text-xl text-slate-700 space-y-2 mb-8 font-medium">
          <li>• <strong>Role</strong> určuje, jaká má uživatel v systému <strong>práva</strong>.</li>
          <li>• Každý vidí a smí upravovat jen to, co potřebuje ke své práci.</li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/60">
            <div className="flex items-center gap-2.5 font-black text-blue-900 text-xl mb-3">
              <GraduationCap className="w-6 h-6 text-blue-600 shrink-0" /> Žák
            </div>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• <strong>Čte</strong> jen své známky.</li>
              <li>• Nesmí nic přepisovat.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60">
            <div className="flex items-center gap-2.5 font-black text-emerald-900 text-xl mb-3">
              <Users className="w-6 h-6 text-emerald-600 shrink-0" /> Rodič
            </div>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• <strong>Čte</strong> známky svých dětí.</li>
              <li>• Nevidí cizí žáky.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50/60">
            <div className="flex items-center gap-2.5 font-black text-purple-900 text-xl mb-3">
              <UserCheck className="w-6 h-6 text-purple-600 shrink-0" /> Učitel
            </div>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• <strong>Zapisuje a maže</strong> známky.</li>
              <li>• Vidí celou třídu.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border-2 border-amber-200 bg-amber-50/60">
            <div className="flex items-center gap-2.5 font-black text-amber-900 text-xl mb-3">
              <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" /> Správce
            </div>
            <ul className="text-base text-slate-700 space-y-1.5 font-medium">
              <li>• <strong>Zakládá a maže účty</strong>.</li>
              <li>• Propojuje rodiče s dětmi.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformationSystemsTheoryTab;
