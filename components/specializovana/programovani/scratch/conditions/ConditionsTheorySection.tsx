"use client";

import React from 'react';
import { KeyRound, Landmark, ShieldCheck } from 'lucide-react';
import { TaskCard } from '../ScratchShared';
import {
  ScratchBlock,
  ScratchInput,
  ScratchCBlock,
  ScratchHexagon,
  ScratchCElseBlock,
  ScratchSpeechBubble,
  ScratchDistanceBlock,
  ScratchReporter
} from '../ScratchBlocks';

export const ConditionsTheorySection = ({ teacherMode }: { teacherMode: boolean }) => {
  return (
    <>
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Podmíněný příkaz</h2>
          <p className="text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Podmínky umožňují našim programům rozhodovat se. Kód už nepoběží jen jednoduše shora dolů, ale rozvětví se podle toho, zda je nějaká podmínka pravdivá (platí) nebo nepravdivá (neplatí).
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-3xl p-6 sm:p-8 mb-12">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Nové bloky</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Abychom mohli podmínky využívat, musíme se seznámit se speciálními bloky ve tvaru <strong>šestiúhelníku</strong>. Ty reprezentují pravdu/nepravdu a pasují do bloku "když – tak".
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4">Relační operátory (Porovnávání)</h4>
              <div className="flex flex-col gap-2 items-start">
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {">"} <ScratchInput>50</ScratchInput>
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {"<"} <ScratchInput>50</ScratchInput>
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  <ScratchInput> </ScratchInput> {"="} <ScratchInput>50</ScratchInput>
                </ScratchHexagon>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4">Logické operátory (Kombinování)</h4>
              <div className="flex flex-col gap-2 items-start">
                <ScratchHexagon category="operators">
                  <ScratchHexagon isSlot /> a <ScratchHexagon isSlot />
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  <ScratchHexagon isSlot /> nebo <ScratchHexagon isSlot />
                </ScratchHexagon>
                <ScratchHexagon category="operators">
                  ne <ScratchHexagon isSlot />
                </ScratchHexagon>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full">
              <h4 className="font-bold text-slate-800 mb-4 text-center">Ukázka:</h4>
              <div className="flex justify-center">
                <ScratchCBlock
                  category="control"
                  topLabel={
                    <>
                      když
                      <span className="mx-1">
                        <ScratchHexagon category="operators">
                          <ScratchBlock category="variables">penez</ScratchBlock> {">"} <ScratchInput>1000000</ScratchInput>
                        </ScratchHexagon>
                      </span>
                      tak
                    </>
                  }
                >
                  <div className="py-1">
                    <ScratchBlock category="looks">bublina <ScratchInput type="text">Jsem bohatý</ScratchInput></ScratchBlock>
                  </div>
                </ScratchCBlock>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};
