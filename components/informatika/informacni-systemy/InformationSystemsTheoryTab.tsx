import React from 'react';
import {
  Laptop,
  Users,
  ShieldCheck,
  UserCheck,
  KeyRound,
  FileText,
  Smartphone,
  Sparkles,
  ArrowRight,
  GraduationCap,
  HardDrive,
  Code2,
} from 'lucide-react';

export const InformationSystemsTheoryTab: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-800 max-w-4xl mx-auto">
      {/* 1. CO JE INFORMAČNÍ SYSTÉM A Z ČEHO SE SKLÁDÁ */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Co je informační systém (IS)?</h2>
            <p className="text-sm text-slate-500 font-medium">Základní definice a stavební kameny</p>
          </div>
        </div>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          <strong>Informační systém</strong> je počítačový systém, který pomáhá lidem ukládat informace, vyhledávat v nich
          a pracovat s nimi. Příkladem ze školy je <strong>elektronická žákovská knížka</strong>, <strong>obědový systém</strong> nebo <strong>školní knihovna</strong>.
        </p>

        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-3">Z čeho se informační systém skládá?</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-2">
                <HardDrive className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">1. Technika (Hardware)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fyzická zařízení – počítače, servery, mobily a čtečky čipů.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">2. Programy (Software)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Samotná aplikace, webová stránka nebo mobilní rozhraní.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">3. Data (Informace)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Uložené údaje – jména žáků, známky, rozvrh hodin či jídelníček.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">4. Lidé (Uživatelé)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Všichni, kdo systém používají – žáci, učitelé i rodiče.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UŽIVATEL, ÚČET A PROFIL */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Kdo je uživatel a co je profil?</h2>
            <p className="text-sm text-slate-500 font-medium">Proč se musíme do systémů přihlašovat?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200">
            <h4 className="font-bold text-teal-900 text-base mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-700" /> Uživatel a účet
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Uživatel</strong> je konkrétní člověk. Aby systém poznal, kdo u počítače sedí, vyžaduje <strong>přihlášení</strong> (jméno a heslo, čip nebo otisk prstu).
            </p>
          </div>

          <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-200">
            <h4 className="font-bold text-indigo-900 text-base mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-700" /> Uživatelský profil
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Profil</strong> je osobní prostor uživatele – jeho vlastní nastavení a soukromé údaje. Díky profilu nikdo cizí nevidí tvoje zprávy ani známky.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UŽIVATELSKÉ ROLE A PRÁVA */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Uživatelské role (Kdo co smí?)</h2>
            <p className="text-sm text-slate-500 font-medium">Každý má v systému jiná oprávnění</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          V systému nemůže mít každý stejná práva – žák si nesmí sám psát známky a rodiče nesmí nahlížet do hodnocení cizích dětí. Proto má každý přidělenou svoji <strong>roli</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/50">
            <div className="flex items-center gap-2 font-black text-blue-800 text-sm mb-1">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Žák
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Smí <strong>pouze prohlížet</strong> své vlastní známky a rozvrh.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50">
            <div className="flex items-center gap-2 font-black text-purple-800 text-sm mb-1">
              <UserCheck className="w-4 h-4 text-purple-600" /> Učitel
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Smí <strong>zapisovat a upravovat</strong> známky žákům své třídy.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center gap-2 font-black text-emerald-800 text-sm mb-1">
              <Users className="w-4 h-4 text-emerald-600" /> Rodič
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Smí <strong>prohlížet</strong> známky a docházku svých vlastních dětí.
            </p>
          </div>

          <div className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/50">
            <div className="flex items-center gap-2 font-black text-amber-800 text-sm mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Administrátor
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Smí <strong>spravovat uživatele</strong>, zakládat účty a řídit systém.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <p className="text-xs text-slate-600">
              Přepni se do záložky <strong>Simulátory</strong> a vyzkoušej si roli žáka, učitele, rodiče i správce v praxi!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InformationSystemsTheoryTab;
