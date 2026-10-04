'use client';

import React, { useState } from 'react';
import { Settings, ShieldAlert, Trash2, HeartPulse, Activity } from 'lucide-react';
import { 
  FsChapterShell, 
  TheoryCard, 
  Callout, 
  RevealQuestions, 
  PracticeLink 
} from './FsShared';

interface FragmentationChapterProps {
  onBack: () => void;
  onOpenDefragGame: () => void;
  onOpenChkdskGame: () => void;
}

export default function FragmentationChapter({ onBack, onOpenDefragGame, onOpenChkdskGame }: FragmentationChapterProps) {
  const [activeTab, setActiveTab] = useState('theory');

  const tabs = [
    { id: 'theory', label: 'Teorie', icon: Activity },
    { id: 'sim', label: 'Simulace', icon: Settings },
  ];

  return (
    <FsChapterShell
      chapterNumber={4}
      title="Údržba a"
      highlight="Fragmentace"
      subtitle="Co se děje po smazání souboru a jak udržet disk v kondici."
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBack={onBack}
    >
      {activeTab === 'theory' && (
        <div className="space-y-12">
          <TheoryCard icon={Trash2} title="Mazání souborů" letter="A" tone="rose">
            <p>
              Když v počítači smažete soubor a vysypete koš, <strong>data z disku ve skutečnosti nezmizí!</strong>
            </p>
            <p className="mt-4">
              Operační systém pouze vezme tabulku souborů (např. FAT) a u daného souboru 
              změní první písmenko názvu na speciální znak (např. <code className="bg-rose-100 text-rose-800 px-2 rounded">?</code>). 
              Tím řekne: <i>„Místo, kde leží tato data, je od teď volné k přepsání.“</i>
            </p>
            <div className="mt-6">
              <Callout kind="warning" title="Bezpečnostní riziko">
                <p>
                  Dokud na toto "volné" místo neuložíte nějaký nový soubor, stará data tam 
                  fyzicky stále jsou a dají se pomocí speciálních programů poměrně snadno <strong>obnovit</strong>.
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <TheoryCard icon={HeartPulse} title="Fragmentace" letter="B" tone="indigo">
            <p>
              Po delším používání disku (zápis a mazání) vznikají na disku "díry" volného místa. 
              Když pak ukládáte velký soubor, systém ho musí rozkouskovat (fragmentovat) 
              a uložit do různých děr napříč celým diskem.
            </p>
            <div className="mt-6">
              <Callout kind="tip" title="Defragmentace = úklid">
                <p>
                  Rozkouskovaný soubor se z klasického pevného disku (HDD) velmi pomalu čte, 
                  protože čtecí hlavička musí neustále přeskakovat. Proces <strong>defragmentace</strong> 
                  tyto kousky poskládá pěkně za sebe. 
                  <br/><br/>
                  <strong>Pozor:</strong> SSD disky se nedeframentují (nepoužívají mechanickou hlavičku, takže přesouvání by jen zbytečně zkrátilo jejich životnost).
                </p>
              </Callout>
            </div>
          </TheoryCard>

          <RevealQuestions 
            questions={[
              {
                q: "Proč je záchrana smazaných dat vůbec možná?",
                a: "Protože při běžném smazání systém data nepřepisuje nulami. Jen si poznačí v FAT tabulce, že je dané místo volné pro budoucí zápis. Dokud tam nic nového nezapíšete, původní data tam stále leží."
              },
              {
                q: "Mám si pořídit program na defragmentaci, pokud mám v počítači pouze SSD disk?",
                a: "Ne, to by byla chyba. U SSD disku neexistuje žádná mechanická čtecí hlavička, která by se zdržovala hledáním kousků. Defragmentace u SSD nepřinese zrychlení, jen zbytečně opotřebuje paměťové čipy přepisy."
              }
            ]} 
          />
        </div>
      )}

      {activeTab === 'sim' && (
        <div className="space-y-6">
          <PracticeLink 
            tag="SIMULACE" 
            title="Defragmentace disku" 
            desc="Srovnejte rozkouskované soubory zpět k sobě jako v populárním nástroji Windows." 
            icon={Activity} 
            tone="sky" 
            onClick={onOpenDefragGame} 
          />
          <PracticeLink 
            tag="SIMULACE" 
            title="Oprava chyb (CHKDSK)" 
            desc="Najděte vadné sektory a zachraňte z nich data dříve, než bude pozdě." 
            icon={ShieldAlert} 
            tone="rose" 
            onClick={onOpenChkdskGame} 
          />
        </div>
      )}
    </FsChapterShell>
  );
}
