'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_ROB_SHARED_INFO, SVP_ROB4_DATA } from '@/registry/curriculum/svpData';

const PLAN_ROB4: PlanTopic[] = [
  {
    month: 'Září – Prosinec',
    topic: '1. Všesměrová mobilní robotika a herní aréna (VEX AIM)',
    topicHours: 28,
    subtopics: [
      { name: 'Seznámení s robotem VEX AIM a vývojovým prostředím VEXcode', hours: 4, note: 'Tříkolový podvozek s Omni koly a konfigurace Python API' },
      { name: 'Programování holonomního všesměrového pohybu v Pythonu', hours: 8, note: 'Pohyb do stran bez natáčení robota a trajektorie po hřišti' },
      { name: 'Ovládání akčních členů: Elektromagnet na puky a vyhazovač', hours: 6, note: 'Sepnutí magnetu, sběr puků, manipulace a odpalování do branky' },
      { name: 'Autonomní herní strategie a třídní turnaj v aréně', hours: 10, note: 'Soutěžní zápasy dvojic robotů na hřišti VEX AIM a vyhodnocení kódu' }
    ]
  },
  {
    month: 'Leden – Únor',
    topic: '2. Průmyslová robotika a manipulátory (KUKA)',
    topicHours: 12,
    subtopics: [
      { name: 'Průmyslová bezpečnost a seznámení s ramenem KUKA', hours: 2, note: 'Bezpečnostní normy, E-Stop tlačítko, souhlasný spínač a prohlídka stroje' },
      { name: 'Ruční pojezd (Jogging) přes KUKA smartPAD v souřadnicích', hours: 2, note: 'Ovládací panel smartPAD a samostatný nácvik pojezdu v prostoru' },
      { name: 'Metoda Teach-In: Ukládání bodů a trajektorie PTP vs. LIN', hours: 2, note: 'Uložení prostorových referenčních bodů a přejíždění po trajektorii' },
      { name: 'Manipulační úloha Pick & Place (přemístění objektu)', hours: 4, note: 'Uchopení kostky chapadlem, zvednutí, přemístění a položení na cíl' },
      { name: 'Samostatná jízda a ověření bezpečné obsluhy stroje', hours: 2, note: 'Praktické ověření samostatného bezpečného spuštění programu žákem' }
    ]
  },
  {
    month: 'Březen – Červen',
    topic: '3. Závěrečný komplexní inženýrský projekt a obhajoba',
    topicHours: 26,
    subtopics: [
      { name: 'Volba tématu a zadání inženýrského projektu', hours: 2, note: 'Výběr platformy (VEX AIM / KUKA / VEX IQ / IoT), zadání a harmonogram' },
      { name: 'Vývoj řídicího softwaru a integrace hardwaru', hours: 12, note: 'Programování algoritmů v Pythonu, integrace senzoriky a testování' },
      { name: 'Optimalizace spolehlivosti a technická dokumentace', hours: 8, note: 'Zátěžové testy, ošetření nestandardních stavů a sepsání dokumentace' },
      { name: 'Maturitní obhajoba a živá demonstrace projektu', hours: 4, note: 'Veřejné předvedení projektu před komisí, diskuse a závěrečné hodnocení' }
    ]
  }
];

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Robotika 2"
      category="specializovana"
      parent={{ title: 'Robotika 2', path: '/specializovana/robotika-4' }}
    >
      <SimplePlanTable
        title="Robotika 2 (4. ročník SŠ)"
        gradeLabel="4. Ročník SŠ"
        backRoute="/specializovana/robotika-4"
        topics={PLAN_ROB4}
        svpData={SVP_ROB4_DATA}
        sharedInfo={SVP_ROB_SHARED_INFO}
        weeklyInfo="2 hodiny týdně · 66 hodin ročně · 33 výukových týdnů"
      />
    </CategoryLayout>
  );
}
