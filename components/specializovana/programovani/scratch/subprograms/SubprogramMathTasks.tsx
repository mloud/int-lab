import React from 'react';
import { ScratchBlock, ScratchInput, ScratchDefBlock, ScratchParam, ScratchSpeechBubble } from '../ScratchBlocks';
import { TaskCard } from '../ScratchShared';

export const SubprogramMathTasks: React.FC<{ teacherMode: boolean }> = ({ teacherMode }) => (
  <>
    <TaskCard 
      number="7" 
      title="Vyplněný čtverec" 
      taskId="subprograms_7" 
      showTeacher={teacherMode} 
      teacherNote={<p>Jak nakreslit vyplněný čtverec? Nejjednodušší způsob je nastavit tloušťku pera na požadovanou &apos;velikost&apos; a nakreslit jedinou krátkou úsečku ve středu. Nebo kreslit čáry těsně vedle sebe v cyklu (šrafování).</p>}
    >
      <div className="flex flex-col gap-6 items-stretch">
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col justify-center">
          <h4 className="text-xl font-black text-slate-800 mb-6">Zadání úkolu:</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-bold text-blue-500 mb-1">1 Nový vlastní blok</h5>
              <p className="text-sm text-slate-600">Vytvořte vlastní blok s parametry pro vykreslení plného čtverce.</p>
            </div>
            <div>
              <h5 className="font-bold text-blue-500 mb-1">2 Vstupní parametry</h5>
              <p className="text-sm text-slate-600">Definujte parametry pro pozici <strong>x, y</strong>, velikost (<strong>strana</strong>) a <strong>barva</strong>.</p>
            </div>
            <div>
              <h5 className="font-bold text-blue-500 mb-1">3 Vyplněný čtverec</h5>
              <p className="text-sm text-slate-600">Blok vykreslí vyplněný čtverec o dané velikosti a barvě na pozici x, y.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-center justify-between">
          <h4 className="text-lg font-black text-slate-800 mb-6">Ukázka vykreslení a blok</h4>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[160px] bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <svg width="120" height="120" viewBox="0 0 120 120" className="overflow-visible">
              <rect x="20" y="20" width="80" height="80" fill="#00ff00" />
            </svg>
          </div>
          
          <div className="w-full max-w-full overflow-x-auto pb-2 flex justify-center">
            <ScratchDefBlock>
              Kresli Vyplneni Ctverec Stred
              <ScratchParam>x</ScratchParam>
              <ScratchParam>y</ScratchParam>
              <ScratchParam>velikost</ScratchParam>
              <ScratchParam>barva</ScratchParam>
            </ScratchDefBlock>
          </div>
        </div>
      </div>
    </TaskCard>

    <TaskCard 
      number="8" 
      title="Kresba pomocí připravené knihovny" 
      taskId="subprograms_8" 
      showTeacher={teacherMode} 
      teacherNote={<p>Zde se propojuje veškeré učivo. Žáci by měli pochopit, že hlavní program bude obsahovat už jen několik růžových bloků volání podprogramů s konkrétními čísly (souřadnicemi, velikostmi a barvami).</p>}
      saveAs="GrafickaKnihovna.sb3"
    >
      <p className="mb-6 text-lg text-slate-800 text-center font-bold">
        Nakresli tento obraz pomocí existujících bloků, které sis připravil. Barvy vol dle uvážení.
      </p>
      
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden">
          <svg width="200" height="280" viewBox="0 0 200 280" className="overflow-visible z-10">
            <polygon points="100,10 10,140 190,140" fill="none" stroke="#06b6d4" strokeWidth="3" />
            <rect x="10" y="140" width="180" height="130" fill="#4ade80" />
            <circle cx="100" cy="95" r="18" fill="none" stroke="#d97706" strokeWidth="3" />
            <rect x="35" y="170" width="35" height="35" fill="none" stroke="#2563eb" strokeWidth="3" />
            <rect x="130" y="170" width="35" height="35" fill="none" stroke="#2563eb" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </TaskCard>

    <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-3xl p-6 sm:p-8 mb-8 mt-12">
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Matematické výpočty v podprogramech</h3>
      <p className="text-slate-600 leading-relaxed mb-6">
        Ve Scratchi neexistuje možnost, jak by vlastní růžový blok sám &quot;vrátil&quot; hodnotu a dal se vložit do zeleného operátoru (na rozdíl od funkcí v Pythonu). Proto v této sekci bude platit pravidlo: <strong className="text-slate-800">Každý váš matematický blok bude na svém konci obsahovat fialový blok Bublina (bublinový výpis) s vypočteným výsledkem.</strong>
      </p>
    </div>

    <TaskCard 
      number="9" 
      title="Aritmetický průměr 3 známek" 
      taskId="subprograms_9" 
      showTeacher={teacherMode} 
      teacherNote={<p>Důležité je upozornit na prioritu operátorů – nejprve součet, pak dělení. Ve Scratchi to znamená vložit operátory sčítání do sebe a celé to pak vložit do levé části dělení.</p>}
      saveAs="MatematickaKnihovna.sb3"
    >
      <p className="mb-4">
        Vytvořte podprogram s názvem <strong>Aritmeticky Prumer</strong>. Bude mít tři číselné parametry (tři různé známky). 
        Jeho úkolem je sečíst tyto tři známky, vydělit je třemi a výsledek říct v bublině ve tvaru <code>Prumer je X</code>.
      </p>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <ScratchDefBlock>
          Aritmeticky Prumer
          <ScratchParam>znamka1</ScratchParam>
          <ScratchParam>znamka2</ScratchParam>
          <ScratchParam>znamka3</ScratchParam>
        </ScratchDefBlock>
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (např. 1, 3, 5):</span>
          <ScratchSpeechBubble>Prumer je 3</ScratchSpeechBubble>
        </div>
      </div>
    </TaskCard>

    <TaskCard 
      number="10" 
      title="Převod teploty (Celsia na Fahrenheita)" 
      taskId="subprograms_10" 
      showTeacher={teacherMode} 
      teacherNote={<p>Vzorec pro převod je: <code>F = C * 1.8 + 32</code>. Žáci skládají zelené operátory. Výsledný výpis se spojuje textem <code>°C je </code> a <code>°F</code>.</p>}
    >
      <p className="mb-4">
        Vytvořte blok <strong>Celsius Na Fahrenheit</strong>, který má jeden parametr (teplotu ve stupních Celsia). Vypočítejte odpovídající teplotu ve stupních Fahrenheita.
      </p>
      <p className="mb-4 text-sm text-slate-500 italic">Nápověda: Vzorec je F = (C * 1.8) + 32.</p>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <ScratchDefBlock>
          Celsius Na Fahrenheit
          <ScratchParam>teplota_celsius</ScratchParam>
        </ScratchDefBlock>
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (např. 10):</span>
          <ScratchSpeechBubble>10 °C je 50 °F</ScratchSpeechBubble>
        </div>
      </div>
    </TaskCard>

    <TaskCard 
      number="11" 
      title="Délka přepony (Pythagorova věta)" 
      taskId="subprograms_11" 
      showTeacher={teacherMode} 
      teacherNote={<p>Úloha vyžaduje nalezení bloku &quot;odmocnina z&quot; ve složitějších operátorech (dole v zelené sekci). Vzorec je <code>c = sqrt(a*a + b*b)</code>.</p>}
    >
      <p className="mb-4">
        Vytvořte blok <strong>Delka Prepony</strong> se dvěma parametry (odvěsny pravoúhlého trojúhelníku <code>a</code>, <code>b</code>). 
        Pomocí Pythagorovy věty vypočítejte přeponu <code>c</code>.
      </p>
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <ScratchDefBlock>
              Delka Prepony
              <ScratchParam>a</ScratchParam>
              <ScratchParam>b</ScratchParam>
            </ScratchDefBlock>
            <div className="mt-4 text-sm text-slate-500 italic">
              Nápověda: Budete potřebovat blok <span className="bg-green-500 text-white px-2 py-0.5 rounded-full">odmocnina z ▼ (9)</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (3, 4):</span>
            <ScratchSpeechBubble>Prepona je 5</ScratchSpeechBubble>
          </div>
        </div>
      </div>
    </TaskCard>

    <TaskCard 
      number="12" 
      title="Formátování času (HH:MM)" 
      taskId="subprograms_12" 
      showTeacher={teacherMode} 
      teacherNote={<p>Zde se využije modulo (zbytek po dělení) a zaokrouhlování dolů. Hodiny = zaokrouhlit dolů(minuty / 60). Zbylé minuty = zbytek po dělení(minuty / 60).</p>}
    >
      <p className="mb-4">
        Máme celkový počet minut. Úkolem je tyto minuty rozdělit na celé hodiny a zbylé minuty a vypsat je. Vytvořte blok <strong>Formatuj cas</strong> s jedním parametrem <code>minutCelkem</code>.
      </p>
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <div className="flex flex-col xl:flex-row gap-8 justify-between">
          <div>
            <ScratchDefBlock>
              Formatuj cas
              <ScratchParam>minutCelkem</ScratchParam>
            </ScratchDefBlock>
            
            <div className="mt-6 flex flex-col gap-3">
              <h4 className="font-bold text-slate-700 text-sm">Potřebné bloky:</h4>
              <div className="flex flex-col gap-3 items-start mt-2">
                <ScratchBlock category="operators">
                  <span className="flex items-center gap-1 bg-black/10 px-2 py-0.5 rounded-md mr-1 cursor-pointer">
                    zaokr. dolů
                    <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                  </span>
                  <ScratchInput type="empty" />
                </ScratchBlock>
                <ScratchBlock category="operators">
                  zbytek <ScratchInput type="empty" /> děleno <ScratchInput type="empty" />
                </ScratchBlock>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-2 mt-4 xl:mt-0 xl:self-center">
            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Ukázka výstupu (78 minut):</span>
            <ScratchSpeechBubble>1H:18M</ScratchSpeechBubble>
          </div>
        </div>
      </div>
    </TaskCard>
  </>
);

