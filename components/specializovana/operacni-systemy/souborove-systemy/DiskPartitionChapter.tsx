'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Layers, MonitorPlay, List, Key } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  RevealQuestions, 
  PracticeLink 
} from './FsShared';
import { useRouter } from 'next/navigation';

export default function DiskPartitionChapter({ onBack, onOpenBoot }: { onBack: () => void, onOpenBoot?: () => void }) {
  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Layers },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
  ];

  return (
    <FsChapterShell
      chapterNumber={2}
      title="Dělení"
      highlight="disku"
      subtitle="Proč jeden fyzický disk rozdělujeme na více částí."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          <TheoryCard icon={LayoutDashboard} title="Oddíly (Partitions)" letter="A" tone="amber">
            <p>
              Zcela nový disk je jako velká prázdná hala. Abychom do ní mohli ukládat data (a nainstalovat operační systém),
              musíme ji nejdříve rozdělit na místnosti - těmto místnostem se říká <strong>oddíly (partitions)</strong>.
            </p>
            <div className="mt-6">
              <Callout kind="info" title="Logický vs. Fyzický disk">
                <p>
                  Můžete mít jeden fyzický disk zapojený v počítači, ale v operačním systému uvidíte disky dva
                  (např. C: a D:). Každý z nich je jen logickým <strong>oddílem</strong> na tomtéž fyzickém disku.
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={List} title="Proč dělíme disk?" letter="B" tone="sky">
            <ul className="list-disc list-inside space-y-4 text-xl">
              <li><strong>Bezpečnost dat:</strong> Pokud se zhroutí operační systém (obvykle na oddílu C:), můžete jej přeinstalovat, aniž byste přišli o data na druhém oddílu (D:).</li>
              <li><strong>Organizace:</strong> Oddělení systémových souborů od osobních (fotky, videa, dokumenty).</li>
              <li><strong>Více operačních systémů:</strong> Můžete mít na jednom disku nainstalovaný Windows i Linux.</li>
            </ul>
          </TheoryCard>

          <RevealQuestions 
            questions={[
              {
                q: "Mohu mít v počítači 1 fyzický disk, ale systém mi ukazuje disky C: a D:?",
                a: "Ano, přesně to je dělení disku. Jeden fyzický disk je rozdělen na dva logické oddíly (C: a D:)."
              },
              {
                q: "Co se stane s mými fotkami na disku D:, když zformátuji disk C: kvůli přeinstalaci Windows?",
                a: "Data na disku D: zůstanou nedotčena. Formátování ovlivní pouze ten oddíl, který právě formátujete (tedy C:)."
              }
            ]} 
          />
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink 
            tag="HRA" 
            title="Start operačního systému (Boot)" 
            desc="Podívejte se, jak počítač hledá oddíl, ze kterého může spustit operační systém." 
            icon={Key} 
            tone="rose" 
            onClick={() => {
               if(onOpenBoot) onOpenBoot();
               else router.push('/specializovana/operacni-systemy/boot');
            }} 
          />
        </div>
      )}
    </FsChapterShell>
  );
}
