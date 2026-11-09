'use client';
import React, { useState } from 'react';
import {
  CheckCircle2, XCircle, ShieldAlert, ShieldCheck, Cpu, Activity
} from 'lucide-react';
import { ProcessItem, PROCESS_TREE_DATA } from '../processTypes';

export const ProcessExplorerSimulator: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<ProcessItem>(PROCESS_TREE_DATA[1]);
  const [processFilter, setProcessFilter] = useState<'all' | 'malicious' | 'services'>('all');

  const filteredProcesses = PROCESS_TREE_DATA.filter(p => {
    if (processFilter === 'malicious') return p.isMalicious;
    if (processFilter === 'services') return p.typeColor === 'service';
    return true;
  });

  return (
      <div className="p-6 sm:p-8 bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-600" />
              3. Simulátor: Sysinternals Process Explorer
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Klikněte na proces v seznamu a analyzujte jeho rodiče, digitální podpis, VirusTotal skóre a síťové spojení.
            </p>
          </div>

          {/* Filtry */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setProcessFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                processFilter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Všechny ({PROCESS_TREE_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setProcessFilter('malicious')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                processFilter === 'malicious' ? 'bg-rose-600 text-white shadow-xs' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Jen hrozby
            </button>
            <button
              type="button"
              onClick={() => setProcessFilter('services')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                processFilter === 'services' ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Systémové služby
            </button>
          </div>
        </div>

        {/* Tabulka procesů + detail v gridu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Seznam procesů (7 sloupců) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-3 border border-slate-800 text-xs font-mono overflow-x-auto">
            <div className="grid grid-cols-12 gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-800 px-2">
              <div className="col-span-5">Proces (Název)</div>
              <div className="col-span-2 text-right">PID</div>
              <div className="col-span-2 text-right">CPU %</div>
              <div className="col-span-3 text-right">VirusTotal</div>
            </div>

            <div className="space-y-1 mt-1">
              {filteredProcesses.map((proc) => {
                const isSelected = selectedProcess.pid === proc.pid;
                let rowBg = 'hover:bg-slate-800/80 text-slate-200';
                if (proc.typeColor === 'service') rowBg = 'text-pink-300 hover:bg-pink-950/30';
                if (proc.typeColor === 'packed') rowBg = 'text-purple-300 hover:bg-purple-950/30';
                if (proc.isMalicious) rowBg = 'text-rose-400 hover:bg-rose-950/40';

                return (
                  <div
                    key={proc.pid}
                    onClick={() => setSelectedProcess(proc)}
                    className={`grid grid-cols-12 gap-2 px-2 py-2 rounded-xl cursor-pointer transition-all items-center ${
                      isSelected ? 'bg-indigo-600/40 border border-indigo-400/80 shadow-xs' : rowBg
                    }`}
                  >
                    <div className="col-span-5 flex items-center gap-1.5 truncate font-bold">
                      {proc.parentPid === 720 || proc.parentPid === 5120 ? (
                        <span className="text-slate-500 text-[10px]">└──</span>
                      ) : null}
                      <span className="truncate">{proc.name}</span>
                    </div>
                    <div className="col-span-2 text-right text-slate-400">{proc.pid}</div>
                    <div className="col-span-2 text-right text-slate-400">{proc.cpu}%</div>
                    <div className="col-span-3 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        proc.virusTotalScore === '0/75' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {proc.virusTotalScore}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Karta detailu vybraného procesu (5 sloupců) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <h4 className="font-mono font-black text-base text-slate-900">{selectedProcess.name}</h4>
                <span className="text-[11px] text-slate-500 font-mono">PID: {selectedProcess.pid}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                selectedProcess.isMalicious ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedProcess.isMalicious ? 'Škodlivá aktivita' : 'Legitimní proces'}
              </span>
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Cesta k souboru (Path):</span>
                <span className="font-mono text-slate-800 break-all bg-white p-1.5 rounded border border-slate-200 block text-[11px]">
                  {selectedProcess.path}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Digitální podpis (Signer):</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {selectedProcess.isSignedValid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className={`font-bold ${selectedProcess.isSignedValid ? 'text-emerald-800' : 'text-rose-700'}`}>
                    {selectedProcess.signer}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Rodičovský proces:</span>
                  <span className="font-mono font-bold text-slate-700">{selectedProcess.parentName} ({selectedProcess.parentPid})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">VirusTotal detekce:</span>
                  <span className="font-mono font-bold text-slate-700">{selectedProcess.virusTotalScore}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Síťová aktivita:</span>
                <span className="font-mono text-slate-800 text-[11px] block">{selectedProcess.networkRemote}</span>
              </div>

              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 text-blue-950 text-[11px] leading-relaxed">
                <strong>Forenzní zjištění:</strong> {selectedProcess.explanation}
              </div>
            </div>
          </div>

        </div>
      </div>
  );
};
