'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_ROB_SHARED_INFO, SVP_ROB3_DATA } from '@/registry/curriculum/svpData';

const PLAN_ROB3: PlanTopic[] = [
  {
    month: 'Září',
    topic: '1. Úvod do robotiky',
    topicHours: 2,
    subtopics: [
      { name: 'Robotika a její využití, architektura robotu a bezpečnost práce', hours: 2, note: 'Typy robotů, MCU, senzory, akční členy a bezpečnost v laboratoři' }
    ]
  },
  {
    month: 'Září – Říjen',
    topic: '2. Mikrokontroléry a programování robotických systémů',
    topicHours: 12,
    subtopics: [
      { name: 'Úvod do MicroPythonu na micro:bit v2 a REPL konzole', hours: 2, note: 'Sériová konzole REPL, 5x5 LED matice, tlačítka A a B v kódu' },
      { name: 'Digitální vstupy a výstupy GPIO', hours: 2, note: 'Logické úrovně 3.3V, pull-up/down, zapojení tlačítek a LED' },
      { name: 'Časování programu bez zpoždění: ticks_ms() vs. sleep()', hours: 4, note: 'Neblokující periodické smyčky namísto zpožďovacího sleep()' },
      { name: 'Konečný stavový automat (FSM) v Pythonu', hours: 4, note: 'Stavový automat, stavy, přechody a deterministické řízení semaforu' }
    ]
  },
  {
    month: 'Říjen – Listopad',
    topic: '3. Senzory a zpracování dat',
    topicHours: 10,
    subtopics: [
      { name: 'Sériová sběrnice I2C a OLED displej SSD1306', hours: 2, note: 'Protokol I2C, adresace periferií SDA/SCL, telemetrický grafický dashboard' },
      { name: 'Environmentální senzory z IoT sady (teplota, vlhkost, světlo)', hours: 4, note: 'Analogový převodník ADC, snímání fyzikálních veličin prostředí' },
      { name: 'Fyzikální šum ze senzorů a plovoucí průměr', hours: 4, note: 'Eliminace šumu reálného světa, kruhový buffer a hystereze v Pythonu' }
    ]
  },
  {
    month: 'Listopad – Prosinec',
    topic: '4. Řízení motorů a pohyb robotu',
    topicHours: 8,
    subtopics: [
      { name: 'Řízení DC motorů přes PWM a kalibrace přímé jízdy Cutebota', hours: 2, note: 'H-můstek, reverzace chodu, PWM střída, trim motorů pro rovnou jízdu' },
      { name: 'Ultrazvukový dálkoměr Sonar a bezpečnostní zónové brzdění', hours: 2, note: 'Měření vzdálenosti v cm, parkovací asistent a zastavení před zdí' },
      { name: 'Sledování vodicí linie pomocí infračervených senzorů', hours: 4, note: 'Reflexní IR senzory, kontrast povrchu a sledování černé čáry' }
    ]
  },
  {
    month: 'Prosinec – Leden',
    topic: '5. Autonomní robotika',
    topicHours: 6,
    subtopics: [
      { name: 'Rozhodovací logika autonomního robota (FSM v aréně)', hours: 2, note: 'Kombinace čidla čáry a sonaru pro reakci na překážku' },
      { name: 'Mise v bludišti a optimalizace autonomního průjezdu', hours: 4, note: 'Algoritmus sledování stěny, řešení slepých uliček a autonomní průjezd' }
    ]
  },
  {
    month: 'Leden – Únor',
    topic: '6. 3D modelování a konstrukce pro robotiku',
    topicHours: 6,
    subtopics: [
      { name: 'Návrh konstrukčních prvků v CAD (Tinkercad / Onshape)', hours: 2, note: 'Objemové 3D modelování držáku senzoru a nárazníku s tolerancemi' },
      { name: 'Příprava pro 3D tisk a výroba na Prusa MINI', hours: 4, note: 'Slicing v PrusaSliceru, volba parametrů a tisk na tiskárně Prusa MINI' }
    ]
  },
  {
    month: 'Únor – Březen',
    topic: '7. Internet věcí a komunikace robotických zařízení',
    topicHours: 6,
    subtopics: [
      { name: 'Bezdrátová síťová komunikace micro:bit Radio (2.4 GHz)', hours: 2, note: 'Rádiové pakety, skupiny kanálů a dálkový ovladač s akcelerometrem' },
      { name: 'M2M telemetrie a odesílání dat do cloudového dashboardu', hours: 4, note: 'Přenos dat z jedoucího Cutebota na PC stanici a do cloudu ThingSpeak' }
    ]
  },
  {
    month: 'Březen',
    topic: '8. Robotika a umělá inteligence',
    topicHours: 4,
    subtopics: [
      { name: 'SmartLens AI kamera: Detekce barev a obrazových značek', hours: 2, note: 'Kamera jako senzor v Pythonu, reakce na barevné karty a AprilTags' },
      { name: 'Vizuální sledování pohybujícího se cíle (Ball Tracking)', hours: 2, note: 'Vyhodnocení souřadnic středu objektu a autonomní dojíždění k míčku' }
    ]
  },
  {
    month: 'Duben – Květen',
    topic: '9. Závěrečný robotický projekt',
    topicHours: 10,
    subtopics: [
      { name: 'Specifikace zadání projektu a návrh architektury', hours: 2, note: 'Výběr tématu ve dvojici, definice vstupů/výstupů a časového plánu' },
      { name: 'Vývoj a integrace hardwaru a softwaru v Pythonu', hours: 4, note: 'Programování řídicího programu a integrace senzorů a 3D dílů' },
      { name: 'Testování v aréně, ladění chyb a dokumentace', hours: 4, note: 'Zátěžové testy na modelové trati a tvorba technické dokumentace' }
    ]
  },
  {
    month: 'Květen – Červen',
    topic: '10. Prezentace a obhajoba projektu',
    topicHours: 2,
    subtopics: [
      { name: 'Živá demonstrace funkčnosti robota a ústní obhajoba', hours: 2, note: 'Předvedení chování v aréně, vysvětlení kódu v Pythonu a hodnocení' }
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
        title="Robotika 1 (3. ročník SŠ)"
        gradeLabel="3. Ročník SŠ"
        backRoute="/specializovana/robotika-3"
        topics={PLAN_ROB3}
        svpData={SVP_ROB3_DATA}
        sharedInfo={SVP_ROB_SHARED_INFO}
        weeklyInfo="2 hodiny týdně · 66 hodin ročně · 33 výukových týdnů"
      />
    </CategoryLayout>
  );
}
