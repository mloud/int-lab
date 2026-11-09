'use client';

import React from 'react';
import { HardDrive, Cpu, Shield, Search, Clock, Activity } from 'lucide-react';
import { TheoryCard, Callout, TermCard, RevealQuestions } from '../FsShared';
import hddImg from '@/public/images/os/hdd_internals.jpg';
import ssdImg from '@/public/images/os/ssd_internals.jpg';

export const DiskMediaTheoryTab: React.FC = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <TheoryCard icon={HardDrive} title="Pevný disk (HDD)" letter="A" tone="indigo">
        <p>
          Pevný disk (Hard Disk Drive) je tradiční typ úložiště, který využívá k zápisu dat 
          <strong> rotující magnetické plotny</strong> a mechanické čtecí hlavičky.
        </p>
        
        <div className="my-6 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-sm relative group">
          <img src={hddImg.src} alt="Vnitřní uspořádání mechanického pevného disku (HDD)" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <span className="text-white font-bold text-sm tracking-wide">Pohyblivé mechanické části (Rotující plotna a hlavička)</span>
          </div>
        </div>
        
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 mt-6 grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-400" />
            <div>
              <div className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Rychlost (Čtení/Zápis)</div>
              <div className="text-2xl font-black text-indigo-700">~ 150 MB/s</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-indigo-400" />
            <div>
              <div className="text-sm font-bold text-indigo-900 uppercase tracking-wide">Přístupová doba</div>
              <div className="text-2xl font-black text-indigo-700">10 – 15 ms</div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-6 mt-6">
          <TermCard term="Výhody" icon={Shield} tone="emerald">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Nízká cena za kapacitu</li>
              <li>Vysoká životnost při archivaci</li>
              <li>Velké kapacity (desítky TB)</li>
            </ul>
          </TermCard>
          <TermCard term="Nevýhody" icon={Search} tone="rose">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Pomalá rychlost čtení/zápisu</li>
              <li>Náchylnost na mechanické otřesy</li>
              <li>Vyšší spotřeba a hlučnost</li>
            </ul>
          </TermCard>
        </div>
      </TheoryCard>

      <TheoryCard icon={Cpu} title="SSD Disk" letter="B" tone="teal">
        <p>
          SSD (Solid State Drive) nepoužívá žádné pohyblivé části. Data se ukládají do 
          <strong> paměťových čipů</strong> (tzv. flash paměť), podobně jako v USB flash disku nebo mobilním telefonu.
        </p>

        <div className="my-6 rounded-2xl overflow-hidden border-2 border-teal-100 shadow-sm relative group">
          <img src={ssdImg.src} alt="Vnitřní uspořádání paměťového SSD disku (NVMe)" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <span className="text-white font-bold text-sm tracking-wide">Žádné pohyblivé části (Paměťové čipy NAND a řadič)</span>
          </div>
        </div>

        <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 mt-6 grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-teal-400" />
            <div>
              <div className="text-sm font-bold text-teal-900 uppercase tracking-wide">Rychlost (NVMe)</div>
              <div className="text-2xl font-black text-teal-700">až 7 000 MB/s</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-teal-400" />
            <div>
              <div className="text-sm font-bold text-teal-900 uppercase tracking-wide">Přístupová doba</div>
              <div className="text-2xl font-black text-teal-700">~ 0.1 ms</div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-6 mt-6">
          <TermCard term="Výhody" icon={Shield} tone="emerald">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Extrémně rychlé čtení a zápis</li>
              <li>Téměř nulová přístupová doba</li>
              <li>Odolné proti mechanickým otřesům</li>
              <li>Zcela bezhlučné a energeticky úsporné</li>
            </ul>
          </TermCard>
          <TermCard term="Nevýhody" icon={Search} tone="rose">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Vyšší pořizovací cena za stejnou kapacitu</li>
              <li>Omezený počet přepisů (opotřebení čipů)</li>
              <li>Velmi obtížná obnova smazaných dat</li>
            </ul>
          </TermCard>
        </div>

        <div className="mt-6">
          <Callout kind="tip" title="Kdy jaký disk použít?">
            <p>
              Dnes se SSD disky používají primárně pro operační systém a často spouštěné programy díky své extrémní rychlosti (jsou až 100x rychlejší v přístupové době!). 
              HDD se hodí spíše jako obří archiv nebo datové úložiště pro fotky a videa.
            </p>
          </Callout>
        </div>
      </TheoryCard>
    </div>

    <TheoryCard icon={HardDrive} title="Logické členění na sektory" letter="C" tone="slate">
      <div className="space-y-6">
        <p className="text-slate-600">
          Ať už máte klasický pevný disk nebo superrychlé SSD, operační systém k němu přistupuje naprosto stejně. Vnímá celý disk jako jednu obrovskou mřížku malých přihrádek. Každé takové přihrádce se říká <strong>Sektor</strong>.
        </p>

        <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-200">
          <div className="max-w-2xl mx-auto">
            <h4 className="font-bold text-slate-800 uppercase text-center mb-4 text-sm tracking-widest">Kapacita disku</h4>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {[...Array(24)].map((_, i) => {
                const isFile1 = i >= 10 && i <= 12;
                const isFile2 = i === 3 || i === 4;
                
                let bgClass = 'bg-white border-slate-200 text-slate-400';
                let textTop = 'text-slate-300';
                let textBot = 'text-slate-500';
                
                if (isFile1) {
                  bgClass = 'bg-purple-500 border-purple-600 shadow-lg shadow-purple-200 z-10';
                  textTop = 'text-purple-100';
                  textBot = 'text-white';
                } else if (isFile2) {
                  bgClass = 'bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-200 z-10';
                  textTop = 'text-emerald-100';
                  textBot = 'text-white';
                }

                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 border-2 transition-transform hover:scale-110 relative ${bgClass}`}
                  >
                    <div className={`absolute top-1 left-1.5 text-[9px] font-mono opacity-80 ${textTop}`}>#{i}</div>
                    <div className={`text-[10px] font-bold ${textTop}`}>Sektor</div>
                    <div className={`text-xs font-black mt-1 ${textBot}`}>4 KB</div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="w-5 h-5 rounded bg-purple-500 shrink-0 mt-0.5"></div>
                <div>
                  <div className="font-bold text-purple-900 text-sm">&quot;tajnosti.txt&quot; (12 KB)</div>
                  <div className="text-xs text-purple-700 mt-1 leading-relaxed">
                    Soubor má 12 KB. Zabere přesně <strong>3 sektory</strong> (10, 11 a 12).
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                <div className="w-5 h-5 rounded bg-emerald-500 shrink-0 mt-0.5"></div>
                <div>
                  <div className="font-bold text-emerald-900 text-sm">&quot;fotka.jpg&quot; (7 KB)</div>
                  <div className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    Má 7 KB. I když se do druhého sektoru už celá nevejde, zabere <strong>2 sektory</strong> (3 a 4). Zbytek ve druhém sektoru propadne.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="list-disc list-inside space-y-4">
          <li>
            <strong>Sektor je nejmenší dílek:</strong> I kdyby měl váš textový soubor pouhý jeden znak (1 bajt), disk pro něj vždy vyhradí a spotřebuje celý jeden sektor (4096 bajtů). Zbytek místa v sektoru zůstane prázdný.
          </li>
          <li>
            <strong>Skládání větších souborů:</strong> Větší soubory se automaticky rozsekají na kousky a uloží do tolika sektorů, kolik je zrovna potřeba. Operační systém si pamatuje, které sektory ke kterému souboru patří.
          </li>
        </ul>
      </div>
    </TheoryCard>

    <RevealQuestions 
      questions={[
        {
          q: "Jaký je hlavní rozdíl mezi HDD a SSD?",
          a: "HDD má mechanické pohyblivé části (rotující plotny a hlavičku) a data zapisuje magneticky, zatímco SSD nemá pohyblivé části a používá paměťové čipy (flash paměť)."
        },
        {
          q: "Proč je lepší mít na SSD nainstalovaný operační systém?",
          a: "SSD disky mají téměř nulovou přístupovou dobu (kolem 0.1 ms). Start operačního systému z SSD trvá sekundy, protože systém nemusí čekat, až se mechanická hlavička fyzicky přesune na správné místo na plotně."
        }
      ]} 
    />
  </div>
);

