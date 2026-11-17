'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_ROB_SHARED_INFO, SVP_ROB3_DATA } from '@/registry/curriculum/svpData';

const PLAN_ROB3: PlanTopic[] = [
  {
    month: 'Září',
    topic: '1. Mikrokontrolér a IoT v Pythonu',
    topicHours: 8,
    subtopics: [
      { name: 'Architektura micro:bit v2, vývojové prostředí v Pythonu', hours: 2, note: 'Vývojové prostředí, nahrání kódu, 5x5 LED matice, tlačítka A/B v Pythonu' },
      { name: 'GPIO piny, digitální výstupy a čtení tlačítek', hours: 2, note: 'Logické úrovně 3.3V, vstupy/výstupy, zapojení a ovládání externích LED' },
      { name: 'Analogové vstupy a vzorkování senzorů prostředí', hours: 2, note: 'Analogový převodník ADC, fotorezistor, teplotní čidlo a čtení hodnot' },
      { name: 'Zapojení OLED displeje SSD1306 a zobrazení hodnot', hours: 2, note: 'Sériová sběrnice I2C, vykreslování textu a naměřených dat na displej' }
    ]
  },
  {
    month: 'Říjen',
    topic: '1. IoT a přenos dat na web',
    topicHours: 4,
    subtopics: [
      { name: 'Řízení akčních členů a relé podle limitů senzorů', hours: 2, note: 'Spínání zátěže reléovým modulem na základě překročení nastaveného prahu' },
      { name: 'Odesílání telemetrických dat do sítě / webový dashboard', hours: 2, note: 'Přenos naměřených údajů přes sériovou linku / síť do webového rozhraní' }
    ]
  },
  {
    month: 'Listopad',
    topic: '2. Mobilní podvozek Cutebot',
    topicHours: 8,
    subtopics: [
      { name: 'Konstrukce Cutebota, řízení DC motorů v Pythonu', hours: 2, note: 'Zapojení micro:bitu do podvozku, import knihovny a řízení motorů' },
      { name: 'Regulace rychlosti a přesné zatáčení na ploše', hours: 2, note: 'PWM regulace otáček, jízda vpřed, vzad, plynulé zatáčení a rotace' },
      { name: 'Měření vzdálenosti ultrazvukem a bezpečné zastavení', hours: 2, note: 'Ultrazvukový senzor Sonar, výpočet vzdálenosti v cm, parkovací asistent' },
      { name: 'Detekce a objíždění překážek v prostoru', hours: 2, note: 'Reakce na překážku v dráze, bezpečné vyhnutí a pokračování v jízdě' }
    ]
  },
  {
    month: 'Prosinec',
    topic: '2. Autonomní jízda po čáře',
    topicHours: 4,
    subtopics: [
      { name: 'Princip infračervených podvozkových senzorů', hours: 2, note: 'Odrazivost světla od podkladu, kalibrace černé čáry a světlého okolí' },
      { name: 'Algoritmus sledování černé vodicí linie (Line Tracking)', hours: 2, note: 'Rozhodovací logika pro jízdu po čáře, projetí zatáček bez vykolejení' }
    ]
  },
  {
    month: 'Leden',
    topic: '3. Platforma VEX AIM a kinematika',
    topicHours: 6,
    subtopics: [
      { name: 'Seznámení s VEX AIM, prostředí VEXcode Python', hours: 2, note: 'Kompaktní robot AIM, připojení, nahrání kódu a základní API' },
      { name: 'Kinematika 3-motorového podvozku a Omni kol', hours: 2, note: '3 všesměrová Omni kola, princip pohybu do všech směrů bez otáčení' },
      { name: 'Plynulý všesměrový pohyb a rotace na místě', hours: 2, note: 'Nezávislá translace do stran (strafe), diagonální jízda a rotace' }
    ]
  },
  {
    month: 'Únor',
    topic: '3. AI Vision kamera a AprilTags',
    topicHours: 6,
    subtopics: [
      { name: 'AI Vision kamera: zorné pole a princip detekce scény', hours: 2, note: 'Vestavěná kamera v čele robota, parametry zorného pole a kalibrace' },
      { name: 'Čtení AprilTags pozičních značek na mantinelech arény', hours: 2, note: 'Rozpoznání identifikačních kódů na mantinelech pro prostorovou orientaci' },
      { name: 'Určení vzdálenosti od mantinelu a bezpečné manévry', hours: 2, note: 'Odhad vzdálenosti podle velikosti značky v obraze a včasný úhyb' }
    ]
  },
  {
    month: 'Březen',
    topic: '3. Detekce objektů a manipulace',
    topicHours: 8,
    subtopics: [
      { name: 'Detekce herních sudů a míčků podle barevných podpisů', hours: 2, note: 'Nastavení barevných podpisů a spolehlivé rozpoznání herních cílů' },
      { name: 'Automatické navedení robota k rozpoznanému objektu', hours: 2, note: 'Autonomní dojezd k hernímu sudu podle horizontálního středu v kameře' },
      { name: 'Řízení magnetického záchytu herního předmětu', hours: 2, note: 'Aktivace integrovaného magnetu na čele pro pevný záchyt předmětu' },
      { name: 'Mechanický vykopávač (kicker) a odložení předmětu', hours: 2, note: 'Programové spuštění kicker mechanismu a odkopnutí předmětu do cíle' }
    ]
  },
  {
    month: 'Duben',
    topic: '3. Taktika v herní aréně',
    topicHours: 8,
    subtopics: [
      { name: 'Využití gyroskopu a akcelerometru pro prostorovou stabilitu', hours: 2, note: 'Udržení přesného směru v aréně a detekce otřesů při kontaktu se stěnou' },
      { name: 'Algoritmus pro kombinaci detekce mantinelů a objektů', hours: 2, note: 'Kombinace zraku kamery: současné sledování cíle i hranic hřiště' },
      { name: 'Strategie vyhledání, sebrání a transportu puků/sudů', hours: 2, note: 'Autonomní sběr bodovaných prvků a jejich odvoz do cílové zóny' },
      { name: 'Ladění a optimalizace času průjezdu herního pole', hours: 2, note: 'Zkrácení reakčních dob a plynulé navazování pohybových manévrů' }
    ]
  },
  {
    month: 'Květen – Červen',
    topic: '3. Závěrečná arénová výzva',
    topicHours: 14,
    subtopics: [
      { name: 'Komplexní autonomní mise v aréně na čas', hours: 6, note: 'Samostatná jízda robota v uzavřené aréně bez manuálního zásahu člověka' },
      { name: 'Soutěžní jízdy a testování spolehlivosti kódu', hours: 4, note: 'Třídní soutěžní výzvy, opakované pokusy a optimalizace spolehlivosti' },
      { name: 'Vyhodnocení autonomní strategie a uzavření ročníku', hours: 4, note: 'Analýza výsledků, prezentace strategií a celková reflexe práce' }
    ]
  }
];

export default function Page() {
  return (
    <CategoryLayout
      title="Tematický plán: Robotika 1"
      category="specializovana"
      parent={{ title: 'Robotika 1', path: '/specializovana/robotika-3' }}
    >
      <SimplePlanTable
        title="Robotika 1"
        gradeLabel="3. Ročník SŠ"
        backRoute="/specializovana/robotika-3"
        topics={PLAN_ROB3}
        svpData={SVP_ROB3_DATA}
        sharedInfo={SVP_ROB_SHARED_INFO}
        weeklyInfo="33 výukových týdnů × 2 h/týden"
      />
    </CategoryLayout>
  );
}
