'use client';

import React from 'react';
import CategoryLayout from '@/components/layout/CategoryLayout';
import SimplePlanTable, { PlanTopic } from '@/components/curriculum/SimplePlanTable';
import { SVP_ROB_SHARED_INFO, SVP_ROB3_DATA } from '@/registry/curriculum/svpData';

const PLAN_ROB3: PlanTopic[] = [
  {
    month: 'Září – Říjen',
    topic: '1. Architektura MCU a digitální GPIO',
    topicHours: 10,
    subtopics: [
      { name: 'Úvod do architektury MCU: Od PC k mikrokontroléru (micro:bit v2)', hours: 2, note: 'Srovnání PC vs. MCU, Flash vs. RAM, REPL v MicroPythonu' },
      { name: 'Digitální vstupy a výstupy GPIO: Logické úrovně a tlačítka', hours: 2, note: 'Logické úrovně 3.3V, pull-up/pull-down, ošetření zákmitů (debouncing)' },
      { name: 'Časování bez zpoždění: Funkce ticks_ms() vs. blokující sleep()', hours: 2, note: 'Neblokující periodické smyčky namísto zpožďovacího sleep()' },
      { name: 'Konečný stavový automat (FSM) v řízení hardware', hours: 4, note: 'Stavový automat, stavy, přechody a deterministické řízení semaforu' },
    ]
  },
  {
    month: 'Říjen – Listopad',
    topic: '2. Senzorika, ADC a sběrnice I2C',
    topicHours: 14,
    subtopics: [
      { name: 'Analogový svět a ADC převodník: Vzorkování napětí a potenciometr', hours: 2, note: 'Princip A/D převodníku, 10bit/12bit rozlišení, vzorkování napětí' },
      { name: 'Sériová sběrnice I2C a OLED displej SSD1306', hours: 4, note: 'Protokol I2C, adresace periferií SDA/SCL, telemetrický grafický dashboard' },
      { name: 'Ultrazvukový dálkoměr a měření vzdálenosti (Sonar)', hours: 2, note: 'Rychlost zvuku, Trigger a Echo impulzy, parkovací asistent' },
      { name: 'Zpracování signálu: Filtrace šumu a klouzavý průměr', hours: 4, note: 'Eliminace šumu reálného světa, kruhový buffer a klouzavý průměr' },
      { name: 'Prahování a hystereze v rozhodovací logice', hours: 2, note: 'Odstranění kmitání stavů v hraničních podmínkách osvětlení a vzdálenosti' },
    ]
  },
  {
    month: 'Prosinec – Leden',
    topic: '3. Pohony a diferenciální kinematika (Cutebot)',
    topicHours: 12,
    subtopics: [
      { name: 'DC motory, H-můstek a regulace otáček pomocí PWM', hours: 2, note: 'H-můstek, reverzace chodu, PWM střída pro regulaci rychlosti' },
      { name: 'Kinematika diferenciálního podvozku: Jízda v oblouku a rotace', hours: 4, note: 'Rozdíl rychlostí levého a pravého kola, poloměr zatáčení, otáčení na místě' },
      { name: 'Kalibrace mechanických nesouměrností a trimování motorů', hours: 2, note: 'Kompenzace tolerancí převodovek a motorů pro přímý směr jízdy' },
      { name: 'Pohybové profily a bezpečné zastavení před překážkou', hours: 4, note: 'Proporcionální zpomalování podle sonaru a nouzové zastavení' },
    ]
  },
  {
    month: 'Únor – Duben',
    topic: '4. Autonomní navigace a regulační smyčky',
    topicHours: 18,
    subtopics: [
      { name: 'Optické sledování linie: Pole infračervených senzorů a kalibrace', hours: 2, note: 'Reflexní IR senzory, kontrast povrchu, kalibrace černé a bílé' },
      { name: 'Diskrétní řízení Bang-Bang a jeho limity (kmitání)', hours: 4, note: 'Dvoustavové skokové řízení a analýza stability na cvičné dráze' },
      { name: 'Proporcionální regulátor (P-regulátor): Výpočet odchylky', hours: 4, note: 'Regulační odchylka Error, konstanta Kp, plynulá korekce motorů' },
      { name: 'Derivační složka (PD regulátor) a zvládání ostrých zatáček', hours: 4, note: 'Rychlost změny chyby (derivace), tlumení překmitů ve vlásenkách' },
      { name: 'Autonomní Sumo aréna: Vyhledání soupeře a udržení na bojišti', hours: 4, note: 'Detekce hrany bojiště, vyhledání protivníka sonarem a Sumo výzva' },
    ]
  },
  {
    month: 'Květen – Červen',
    topic: '5. IoT a bezdrátová telemetrie (micro:bit Radio)',
    topicHours: 12,
    subtopics: [
      { name: 'Bezdrátová komunikace na 2.4 GHz: micro:bit Radio a kanály', hours: 2, note: 'Rádiové skupiny Radio Group, kanály a měření signálu RSSI' },
      { name: 'Struktura paketů a telemetrický protokol', hours: 4, note: 'Definice a parsování vlastních datových paketů v reálném čase' },
      { name: 'Dálkový ovladač s využitím vestavěného akcelerometru', hours: 4, note: 'Ovládání robota gesty a náklonem v osách Pitch a Roll' },
      { name: 'Závěrečný dispečink a rekapitulace ročníku', hours: 2, note: 'Centrální dispečink sledující flotilu robotů a uzavření klasifikace' },
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
