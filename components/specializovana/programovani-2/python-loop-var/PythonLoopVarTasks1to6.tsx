'use client';
import React from 'react';
import { createTaskKit } from '@/components/ui/TaskKit';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const { TaskCard, PythonSnippet } = createTaskKit({
  tone: 'violet',
  layout: 'footer',
  storageKeyFor: id => STORAGE_KEYS.pythonTask('py12', id),
});

export const PythonLoopVarTasks1to6: React.FC<{ teacherMode: boolean }> = ({ teacherMode }) => (
  <>
    {/* Úloha 1 */}
    <TaskCard 
      number="1" 
      taskId="1" 
      showTeacher={teacherMode} 
      teacherNote={
        <div>
          <p className="mb-2">Úloha slouží k zopakování tvorby cyklu for. Žáci by měli použít dva samostatné cykly for:</p>
          <PythonSnippet code={`print('kočka leze dírou')\nfor i in range(2):\n    print('pes oknem')\nfor i in range(2):\n    print('nebude-li pršet')\n    print('nezmoknem')`} />
        </div>
      }
    >
      <p>Tvůj mladší sourozenec našel následující říkanku:</p>
      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-sm leading-relaxed">
        kočka leze dírou<br/>
        pes oknem<br/>
        pes oknem<br/>
        nebude-li pršet<br/>
        nezmoknem<br/>
        nebude-li pršet<br/>
        nezmoknem
      </div>
      <p>
        Vytvoř program <code>rikanka.py</code>, který ji vypíše pomocí příkazů <code>print</code>. Použij <code>for</code> cykly, aby bylo v programu co nejméně příkazů <code>print</code>.
      </p>
    </TaskCard>

    {/* Úloha 2 */}
    <TaskCard 
      number="2" 
      taskId="2" 
      showTeacher={teacherMode} 
      teacherNote={
        <div>
          <p className="mb-2">V této úloze žáci poprvé využívají proměnnou cyklu. Zásadní je uvědomit si, že čísla generovaná funkcí <code>range(10)</code> začínají od 0 a končí u 9 (tedy celkem 10 čísel z polootevřeného intervalu &lt;0, 10)).</p>
        </div>
      }
    >
      <p>
        Vytvoř program <code>rada_cisel.py</code> a pomocí následujícího kódu vypiš celá čísla od 0 do 9:
      </p>
      
      <PythonSnippet code={`for i in range(10):\n    print('číslo', i)`} />

      <p>Jestli jsi kód zapsal(a) správně, program po spuštění vypíše:</p>

      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-sm leading-snug">
        číslo 0<br/>
        číslo 1<br/>
        číslo 2<br/>
        číslo 3<br/>
        číslo 4<br/>
        číslo 5<br/>
        číslo 6<br/>
        číslo 7<br/>
        číslo 8<br/>
        číslo 9
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200">
        <h4 className="font-bold text-slate-800 text-base mb-3">Jak to funguje?</h4>
        
        <div className="bg-slate-900 rounded-xl p-5 font-mono text-sm text-slate-200 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-violet-400 font-bold">for</span>
            <span className="text-sky-300 font-bold bg-sky-950/60 px-1 rounded">i</span>
            <span>in range(</span>
            <span className="text-amber-300 font-bold bg-amber-950/60 px-1 rounded">10</span>
            <span>):</span>
          </div>
          <div className="pl-6 border-l-4 border-violet-500 ml-2 py-1 flex items-center gap-1">
            <span>print(&apos;číslo&apos;,</span>
            <span className="text-sky-300 font-bold bg-sky-950/60 px-1 rounded">i</span>
            <span>)</span>
          </div>
        </div>

        <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
          <li className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0 mt-1"></span>
            <span><strong>i je proměnná</strong>, do které příkaz <code>for</code> postupně přiřazuje celá čísla od 0 do 9</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1"></span>
            <span><strong>rozsah čísel</strong> je z intervalu &lt;0, 10)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0 mt-1"></span>
            <span><strong>pro každé číslo</strong> se vykoná tělo cyklu, a tak se vypíše hodnota proměnné <code>i</code></span>
          </li>
        </ul>

        <div className="mt-5 p-3.5 bg-slate-100 rounded-xl border border-slate-300 text-center text-xs sm:text-sm text-slate-800 font-medium">
          Příkaz <code>for</code> čteme: <em>„pro i v rozsahu(...) vykonej tělo cyklu“</em>
        </div>
      </div>
    </TaskCard>

    {/* Úloha 3 */}
    <TaskCard 
      number="3" 
      taskId="3" 
      showTeacher={teacherMode} 
      teacherNote={
        <div>
          <p className="mb-2">Možná řešení:</p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
            <li>a) <code>for i in range(11): print(&apos;číslo&apos;, i)</code></li>
            <li>b) <code>for i in range(10): print(&apos;číslo&apos;, i + 1)</code> (nebo <code>range(1, 11)</code>)</li>
            <li>c) <code>for i in range(10): print(&apos;číslo&apos;, (i + 1) * 2)</code> (nebo <code>range(2, 21, 2)</code>)</li>
            <li>d) <code>for i in range(10): print(&apos;číslo&apos;, (i + 1) * 10)</code> (nebo <code>range(10, 101, 10)</code>)</li>
          </ul>
        </div>
      }
    >
      <p>Urči, co je potřeba v předchozím programu změnit, aby se vypsala čísla:</p>
      <div className="pl-2 space-y-1.5 font-mono text-sm sm:text-base text-slate-800">
        <div>a) 0, 1, ... 10 – tedy i číslo 10</div>
        <div>b) 1, 2, ... 10</div>
        <div>c) 2, 4, ... 20</div>
        <div>d) 10, 20, ... 100</div>
      </div>
      <p className="text-slate-600 text-sm">
        Program pokaždé vyzkoušej, abys ověřil, zda byla tvá domněnka správná.
      </p>
    </TaskCard>

    {/* Úloha 4 */}
    <TaskCard 
      number="4" 
      taskId="4" 
      showTeacher={teacherMode} 
      teacherNote={
        <div>
          <p className="mb-2">Řešení:</p>
          <PythonSnippet code={`for i in range(7):\n    print(i, 'na druhou je', i * i)`} />
        </div>
      }
    >
      <p>
        Vytvoř program <code>druhe_mocniny.py</code>, který pomocí <code>for</code> cyklu vypíše čísla a jejich druhé mocniny:
      </p>
      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-sm leading-snug">
        0 na druhou je 0<br/>
        1 na druhou je 1<br/>
        2 na druhou je 4<br/>
        3 na druhou je 9<br/>
        4 na druhou je 16<br/>
        5 na druhou je 25<br/>
        6 na druhou je 36
      </div>
    </TaskCard>

    {/* Úloha 5 */}
    <TaskCard 
      number="5" 
      taskId="5" 
      showTeacher={teacherMode} 
      teacherNote={
        <div>
          <p className="mb-2">Řešení:</p>
          <PythonSnippet code={`for i in range(10):\n    print('Na stromě bylo', i, 'vrabců, jeden přiletěl a už je tam', i + 1, 'vrabců')`} />
        </div>
      }
    >
      <p>Máme takovouto povídku:</p>
      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-nowrap">
        Na stromě bylo 0 vrabců, jeden přiletěl a už je tam 1 vrabců<br/>
        Na stromě bylo 1 vrabců, jeden přiletěl a už je tam 2 vrabců<br/>
        Na stromě bylo 2 vrabců, jeden přiletěl a už je tam 3 vrabců<br/>
        Na stromě bylo 3 vrabců, jeden přiletěl a už je tam 4 vrabců<br/>
        Na stromě bylo 4 vrabců, jeden přiletěl a už je tam 5 vrabců<br/>
        Na stromě bylo 5 vrabců, jeden přiletěl a už je tam 6 vrabců<br/>
        Na stromě bylo 6 vrabců, jeden přiletěl a už je tam 7 vrabců<br/>
        Na stromě bylo 7 vrabců, jeden přiletěl a už je tam 8 vrabců<br/>
        Na stromě bylo 8 vrabců, jeden přiletěl a už je tam 9 vrabců<br/>
        Na stromě bylo 9 vrabců, jeden přiletěl a už je tam 10 vrabců
      </div>
      <p>
        Zapiš ji pomocí <code>for</code> cyklu do nového programu <code>povidka.py</code>.
      </p>
    </TaskCard>

    {/* Úloha 6 */}
    <TaskCard 
      number="6" 
      taskId="6" 
      showTeacher={teacherMode} 
      teacherNote={
        <div>
          <p className="mb-2">Řešení:</p>
          <PythonSnippet code={`for i in range(10):\n    print('Na stromě bylo', 10 - i, 'vrabců, jeden odletěl a zůstalo tam', 9 - i, 'vrabců')`} />
        </div>
      }
    >
      <p>
        Vrabci z předchozí povídky odlétají – vymysli v programu <code>povidka.py</code> kód, který to bude pomocí <code>for</code> cyklu vyprávět:
      </p>
      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-700 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-nowrap">
        Na stromě bylo 10 vrabců, jeden odletěl a zůstalo tam 9 vrabců<br/>
        Na stromě bylo 9 vrabců, jeden odletěl a zůstalo tam 8 vrabců<br/>
        Na stromě bylo 8 vrabců, jeden odletěl a zůstalo tam 7 vrabců<br/>
        Na stromě bylo 7 vrabců, jeden odletěl a zůstalo tam 6 vrabců<br/>
        Na stromě bylo 6 vrabců, jeden odletěl a zůstalo tam 5 vrabců<br/>
        Na stromě bylo 5 vrabců, jeden odletěl a zůstalo tam 4 vrabců<br/>
        Na stromě bylo 4 vrabců, jeden odletěl a zůstalo tam 3 vrabců<br/>
        Na stromě bylo 3 vrabců, jeden odletěl a zůstalo tam 2 vrabců<br/>
        Na stromě bylo 2 vrabců, jeden odletěl a zůstalo tam 1 vrabců<br/>
        Na stromě bylo 1 vrabců, jeden odletěl a zůstalo tam 0 vrabců
      </div>
    </TaskCard>
  </>
);

