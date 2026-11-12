'use client';
import React, { useState } from 'react';
import { Role } from './GradebookTypes';
import { Lock, Eye, EyeOff, KeyRound, AlertCircle, ArrowRight, X } from 'lucide-react';

interface BakalariPasswordModalProps {
  role: Role;
  user: any;
  onSuccess: (role: Role, user: any) => void;
  onCancel: () => void;
}

export const BakalariPasswordModal: React.FC<BakalariPasswordModalProps> = ({
  role,
  user,
  onSuccess,
  onCancel,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const expectedPassword = user.password || '1234';
  const username = user.username || user.firstName.toLowerCase();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === expectedPassword) {
      setErrorMsg(null);
      onSuccess(role, user);
    } else {
      setErrorMsg('Nesprávné heslo! Zkontrolujte zadání a zkuste to znovu.');
    }
  };

  const handleUseHint = () => {
    setPasswordInput(expectedPassword);
    setErrorMsg(null);
  };

  const getUserFullName = () => {
    if (user.title) {
      return `${user.title} ${user.firstName} ${user.lastName}`;
    }
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Horní lišta */}
        <div className="bg-[#0B3A60] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center font-black text-sm border border-white/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-200 block">
                Zabezpečené přihlášení
              </span>
              <h3 className="text-base font-black tracking-wide">Bakaláři · Ověření hesla</h3>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulář */}
        <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                Přihlašovaný účet ({role})
              </span>
              <div className="font-black text-slate-900 text-base">{getUserFullName()}</div>
              <div className="text-sm text-slate-600 font-mono font-bold">login: @{username}</div>
            </div>
            <span className="text-sm font-black px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-200">
              {role}
            </span>
          </div>

          {/* Vstup pro heslo */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-800 flex items-center justify-between">
              <span>Zadejte heslo:</span>
              <button
                type="button"
                onClick={handleUseHint}
                className="text-sm text-blue-700 hover:text-blue-900 font-black underline cursor-pointer"
              >
                Vyplnit nápovědu
              </button>
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="Zadejte heslo..."
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-base font-mono font-bold transition-all pr-12 text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Nápověda hesla pro žáky */}
          <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 text-sm text-amber-950 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <KeyRound className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Školní heslo: <strong className="font-mono text-base font-black">{expectedPassword}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleUseHint}
              className="text-xs font-black text-amber-900 hover:text-amber-950 bg-amber-200/80 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Vložit
            </button>
          </div>

          {/* Chybová hláška */}
          {errorMsg && (
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs text-rose-800 font-bold flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tlačítka */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/3 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-xl bg-[#0B3A60] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Ověřit a vstoupit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BakalariPasswordModal;

