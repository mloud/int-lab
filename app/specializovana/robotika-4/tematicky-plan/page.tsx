'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_ROB_SHARED_INFO, SVP_ROB4_DATA } from '@/registry/curriculum/svpData';

const PLAN_ROB4: PlanTopic[] = [
  {
    month: 'Září',
    topic: '1. Stavebnice VEX IQ a pohony',
    topicHours: 8,
    subtopics: [
      { name: 'Architektura VEX IQ Brain 2nd Gen a Smart Motory', hours: 2, note: 'Mozek VEX IQ, Smart Porty, baterie a propojení s VEXcode Python' },
      { name: 'Sestavení základní mechaniky a převodových poměrů', hours: 2, note: 'Stavba podvozku, převodová kola, vztah otáček a točivého momentu' },
      { name: 'Programování motorů s využitím enkodérů (úhel, otáčky)', hours: 2, note: 'Metody spin_for, otáčení o úhel ve stupních a čtení polohy' },
      { name: 'Přesný pojezd a měření ujeté dráhy v milimetrech', hours: 2, note: 'Objekt Drivetrain, jízda na přesnou vzdálenost v mm a otáčení' }
    ]
  },
  {
    month: 'Říjen',
    topic: '1. Senzorika VEX IQ (Laser & Barvy)',
    topicHours: 8,
    subtopics: [
      { name: 'Laserový dálkoměr ToF: měření vzdálenosti a velikosti', hours: 2, note: 'Class 1 laserový senzor, měření 20-2000 mm, odhad velikosti břemene' },
      { name: 'Optický senzor barev a detekce předmětů', hours: 2, note: 'Detekce barevných kostek, odstín (hue) a detekce přiblížení' },
      { name: 'Konstrukce motorizovaného chapadla (Clawbot)', hours: 2, note: 'Mechanismus kleští a ramínka pro úchop herní kostky' },
      { name: 'Programování úchopu a zdvihu břemene v prostoru', hours: 2, note: 'Synchronizace motorů pojezdu a ramene pro bezpečné zvednutí' }
    ]
  },
  {
    month: 'Listopad – Leden',
    topic: '1. Autonomní prostorová manipulace',
    topicHours: 12,
    subtopics: [
      { name: 'Přesun břemene z bodu A do bodu B na zadanou vzdálenost', hours: 4, note: 'Autonomní cyklus: dojezd k předmětu, sevření kleští, odvoz a uložení' },
      { name: 'Třídění předmětů podle barev a velikosti', hours: 4, note: 'Senzorické třídění kostek do různých zón podle naměřených dat' },
      { name: 'Řešení komplexní manipulační úlohy v týmu', hours: 4, note: 'Týmová výzva: vyčištění herního pole od rozesetých břemen na čas' }
    ]
  },
  {
    month: 'Únor – Březen',
    topic: '2. Průmyslové 6-osé rameno KUKA',
    topicHours: 12,
    subtopics: [
      { name: '1. dvouhodinovka: Bezpečnost práce, ochranné zóny, E-STOP', hours: 2, note: 'Zásady bezpečnosti, bezpečnostní okruhy, tlačítko nouzového zastavení' },
      { name: '2. dvouhodinovka: smartPAD ovládací panel, Jogging v osách A1–A6', hours: 2, note: 'Ruční pojezd jednotlivými rotačními osami, souhlasný spínač' },
      { name: '3. dvouhodinovka: Kartézské souřadné systémy WORLD a TOOL', hours: 2, note: 'Pohyb v prostoru X, Y, Z, orientace nástroje a souřadné báze' },
      { name: '4. dvouhodinovka: Ukládání bodů metodou Teach-In, pohyby PTP a LIN', hours: 2, note: 'Záznam prostorových bodů, bod-bod (PTP) a lineární pohyb (LIN)' },
      { name: '5. dvouhodinovka: Sestavení manipulačního cyklu Pick & Place', hours: 2, note: 'Naprogramování cyklu přemístění součástky mezi zásobníkem a paletkou' },
      { name: '6. dvouhodinovka: Samostatné zvládnutí a odzkoušení celého cyklu', hours: 2, note: 'Ověření samostatné obsluhy každým žákem a ladění trajektorie' }
    ]
  },
  {
    month: 'Duben – Červen',
    topic: '3. Projekt',
    topicHours: 26,
    subtopics: [
      { name: 'Volba zadání, analýza problému a rozvržení etap', hours: 4, note: 'Výběr technologické platformy, specifikace požadavků a plán milníků' },
      { name: 'Týmový vývoj a programování řídicího systému v Pythonu', hours: 8, note: 'Stavba konstrukce nebo buňky, vývoj řídicího softwaru v Pythonu' },
      { name: 'Systémová integrace senzorů, pohonů a testování', hours: 6, note: 'Propojení celého systému, testování mezních stavů a ladění chyb' },
      { name: 'Zpracování technické zprávy a dokumentace', hours: 4, note: 'Tvorba technické dokumentace, schéma zapojení a uživatelský manuál' },
      { name: 'Závěrečná veřejná prezentace a praktická obhajoba', hours: 4, note: 'Živá demonstrace funkčnosti projektu, odborná obhajoba a hodnocení' }
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
        title="Robotika 2"
        gradeLabel="4. Ročník SŠ"
        backRoute="/specializovana/robotika-4"
        topics={PLAN_ROB4}
        svpData={SVP_ROB4_DATA}
        sharedInfo={SVP_ROB_SHARED_INFO}
        weeklyInfo="33 výukových týdnů × 2 h/týden"
      />
    </CategoryLayout>
  );
}
