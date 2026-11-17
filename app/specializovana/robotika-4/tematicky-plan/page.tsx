'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_ROB_SHARED_INFO, SVP_ROB4_DATA } from '@/registry/curriculum/svpData';

const PLAN_ROB4: PlanTopic[] = [
  {
    month: 'Září – Říjen',
    topic: '1. Všesměrová holonomní kinematika (VEX AIM)',
    topicHours: 14,
    subtopics: [
      { name: 'Holonomní vs. neholonomní podvozky: Princip všesměrových kol Omni', hours: 2, note: 'Stupně volnosti 3-DoF, konstrukce všesměrových válečků a srovnání s diferenčním řízením' },
      { name: 'Vektorová matematika: Goniometrický rozklad sil na 3 motory (120°)', hours: 4, note: 'Vektorový rozklad Vx, Vy a rotační složky w na 3 omni kola' },
      { name: 'Translace s rotací: Složené trajektorie a plynulé oblouky', hours: 4, note: 'Kombinace translačního pohybu a nezávislé rotace, obíhání cíle' },
      { name: 'Akční členy VEX AIM: Elektromagnet a mechanický kicker', hours: 4, note: 'Ovládání elektromagnetu pro manipulaci s puky a pružinový odpalovací mechanismus' },
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: '2. Počítačové vidění a AI navigace',
    topicHours: 14,
    subtopics: [
      { name: 'Kamera jako senzor: Zpracování obrazu a barevný prostor HSV', hours: 2, note: 'Barevné modely RGB vs. HSV, odolnost vůči světlu a maskování' },
      { name: 'Visual Servoing: Zpětnovazební dojíždění k pohybujícímu se cíli', hours: 4, note: 'Vizuální zpětná vazba a plynulé navádění k nalezenému objektu' },
      { name: 'Prostorové značky AprilTags: 2D poziční kódy a výpočet polohy', hours: 4, note: 'Detekce AprilTags, výpočet vzdálenosti a úhlu v prostoru' },
      { name: 'Integrovaná herní mise: Vizuální vyhledání, nájezd a skórování', hours: 4, note: 'Komplexní autonomní mise propojující omni pohyb, AI kameru a AprilTags' },
    ]
  },
  {
    month: 'Leden – Březen',
    topic: '3. Inženýrská mechanika a Smart motory (VEX IQ)',
    topicHours: 14,
    subtopics: [
      { name: 'Mechanické převody v robotice: Rychlost vs. točivý moment', hours: 2, note: 'Čelní ozubená kola, převodový poměr a točivý moment při zátěži' },
      { name: 'Smart motory VEX IQ: Optické enkodéry a PID řízení polohy', hours: 4, note: 'Měření úhlu s přesností na desetiny stupně, vnitřní PID smyčka polohy' },
      { name: 'Odometrie a IMU gyroskop: Přesná navigace v souřadnicích', hours: 4, note: 'Odometrie z otáček kol, kompenzace prokluzu pomocí gyroskopu' },
      { name: 'Zdvihací mechanismy a robotická chapadla', hours: 4, note: 'Mechanika čtyřkloubových mechanismů, paralelogram a chapadla' },
    ]
  },
  {
    month: 'Březen – Květen',
    topic: '4. Průmyslová robotika a manipulátory (KUKA EDU)',
    topicHours: 14,
    subtopics: [
      { name: 'Kinematika 6-osého průmyslového ramene: Stupně volnosti A1–A6', hours: 2, note: 'Struktura 6-DoF, kloubové souřadnice, dopředná a inverzní kinematika' },
      { name: 'Kartézské souřadnicové systémy: WORLD, BASE a kalibrace TOOL (TCP)', hours: 4, note: 'Pohyb v prostoru X, Y, Z a kalibrace středu nástroje TCP metodou 4 bodů' },
      { name: 'Interpolace pohybů: Bod z bodu do bodu (PTP) vs. Lineární pohyb (LIN)', hours: 4, note: 'Rozdíl mezi rychlým přesunem PTP a přesnou přímkou LIN, aproximační zóny' },
      { name: 'Průmyslová úloha Pick & Place a digitální vstupy/výstupy buňky', hours: 4, note: 'Logika cyklu Pick & Place, synchronizace buňky přes digitální signály' },
    ]
  },
  {
    month: 'Květen – Červen',
    topic: '5. Závěrečný komplexní kooperativní projekt',
    topicHours: 10,
    subtopics: [
      { name: 'Architektura kooperativní linky: Rozhraní a komunikační protokol', hours: 2, note: 'Definice komunikačního rozhraní mezi mobilním robotem a KUKA ramenem' },
      { name: 'Týmová integrace a ladění kooperace v reálném čase', hours: 6, note: 'Společné ladění v dílně: předávání materiálu a odvoz výrobku' },
      { name: 'Odborná veřejná obhajoba projektu a reflexe', hours: 2, note: 'Živá demonstrace funkční linky před komisí a obhajoba dokumentace' },
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
