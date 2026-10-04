'use client';

import React, { useState } from 'react';
import { Table, Grid, MonitorPlay, Save, Database, ShieldAlert } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  TermCard,
  RevealQuestions, 
  PracticeLink 
} from './FsShared';
import { useRouter } from 'next/navigation';

export default function FatChapter({ 
  onBack,
  onOpenFatGame,
  onOpenClusterGame,
  onOpenAllocationGame
}: { 
  onBack: () => void,
  onOpenFatGame: () => void,
  onOpenClusterGame: () => void,
  onOpenAllocationGame: () => void
}) {  const [activeTab, setActiveTab] = useState('theory');
  const router = useRouter();

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Database },
    { id: 'sim', label: 'Simulace', icon: MonitorPlay },
  ];

  return (
    <FsChapterShell
      chapterNumber={3}
      title="Alokace a"
      highlight="Souborové systémy"
      subtitle="Jak si počítač pamatuje, kde leží jaká data."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          <TheoryCard icon={Grid} title="Alokační jednotka (Cluster)" letter="A" tone="purple">
            <p>
              Disk si můžeme představit jako obrovskou plochu rozdělenou na malá políčka. Tomuto nejmenšímu
              políčku, na které lze něco zapsat, se říká <strong>alokační jednotka</strong> nebo <strong>cluster</strong>.
            </p>
            <div className="mt-6">
              <Callout kind="warning" title="Pravidlo celého políčka">
                <p>
                  I když máte soubor, který má jen 1 byte, zabere na disku celou jednu alokační jednotku 
                  (typicky 4 KB). Dva různé soubory nesmí sdílet stejnou alokační jednotku. Zbytek místa 
                  v clusteru je tak pro systém "ztracen".
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={Table} title="Souborové systémy (FAT, NTFS, ext4)" letter="B" tone="emerald">
            <p>
              Aby operační systém věděl, které clustery jsou volné a ve kterých se nachází jaký soubor, 
              potřebuje jakousi "mapu" nebo "kartotéku". Tomu se říká <strong>Souborový systém</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <TermCard term="FAT32" tone="amber">
                <p>
                  Velmi starý, ale absolutně nejuniverzálnější. Přečte ho Windows, Mac, Linux, televize i rádio v autě.
                  <br /><br />
                  <strong>Nevýhoda:</strong> Neumí uložit soubor větší než 4 GB (problém u 4K videí).
                </p>
              </TermCard>
              <TermCard term="NTFS" tone="sky">
                <p>
                  Standardní systém pro <strong>Windows</strong>. Zvládá obrovské soubory, přidává kompresi, 
                  šifrování a lepší zabezpečení přístupových práv.
                </p>
              </TermCard>
              <TermCard term="ext4" tone="indigo">
                <p>
                  Standardní systém pro <strong>Linux</strong> a Android. Je velmi rychlý a méně náchylný 
                  k fragmentaci. Windows ho bez speciálního softwaru nepřečte.
                </p>
              </TermCard>
            </div>
          </TheoryCard>

          <RevealQuestions 
            questions={[
              {
                q: "Proč má textový soubor obsahující jen písmeno 'A' (1 byte) velikost na disku např. 4096 bytů?",
                a: "Protože soubor zabere vždy minimálně jednu celou alokační jednotku (cluster). A ta má často velikost právě 4 KB (4096 bytů)."
              },
              {
                q: "Mám flash disk a chci na něj nahrát 8 GB film, ale hlásí to chybu, ačkoli je na něm dost místa. Proč?",
                a: "Pravděpodobně je flash disk naformátován na starý souborový systém FAT32. Ten nedokáže pracovat s žádným souborem, který je větší než 4 GB. Bude nutné jej přeformátovat na exFAT nebo NTFS."
              }
            ]} 
          />
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink 
            tag="SIMULACE" 
            title="Tabulka FAT" 
            desc="Sledujte a simulujte, jak se data řetězí a zapisují do paměti." 
            icon={Save} 
            tone="emerald" 
            onClick={onOpenFatGame} 
          />
          <PracticeLink 
            tag="HRA" 
            title="Velikost clusteru" 
            desc="Zjistěte, jak velikost clusteru ovlivňuje ztracené místo (slack space)." 
            icon={Grid} 
            tone="purple" 
            onClick={onOpenClusterGame} 
          />
          <PracticeLink 
            tag="HRA" 
            title="Alokace souborů" 
            desc="Jak systém hledá místo pro uložení velkých souborů." 
            icon={Database} 
            tone="sky" 
            onClick={onOpenAllocationGame} 
          />
        </div>
      )}
    </FsChapterShell>
  );
}
