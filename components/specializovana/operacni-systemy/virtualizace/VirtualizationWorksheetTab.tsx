'use client';

import React from 'react';
import { DeclarativeWorksheet, WorksheetSchema } from '@/components/ui/WorksheetKit';

const VIRTUALIZATION_WORKSHEET_SCHEMA: WorksheetSchema = {
  title: 'Pracovní list: Virtualizace',
  subject: 'Operační systémy',
  fileName: 'Pracovni_list_Virtualizace',
  storageKey: 'intlab:worksheet:virtualization_v1',
  tasks: [
    {
      id: 'vm_deploy',
      number: '1',
      title: 'Nasazení virtuálního stroje',
      subtitle: 'Následující postup vás provede kompletním procesem nasazení virtuálního počítače pomocí nástroje Oracle VM VirtualBox. Odškrtněte si každý úspěšně dokončený krok.',
      steps: [
        {
          id: 'w1',
          text: 'Stáhněte a nainstalujte Oracle VM VirtualBox.',
          explanation: 'VirtualBox je tzv. Hypervizor typu 2. Znamená to, že je to běžná aplikace běžící nad vaším stávajícím (hostitelským) operačním systémem, která dokáže emulovat hardware a spouštět další (hostované) systémy.',
        },
        {
          id: 'w2',
          text: 'Stáhněte si instalační obraz (ISO) operačního systému ReactOS (má pouze kolem 150 MB a stáhne se za okamžik).',
          explanation: 'ISO soubor je přesná digitální kopie optického disku (CD/DVD). Obsahuje všechny instalační soubory systému přesně v takové podobě, v jaké by byly vypáleny na fyzickém nosiči.',
        },
        {
          id: 'w3',
          text: 'Ve VirtualBoxu vytvořte "Nový" virtuální stroj. Pojmenujte ho ve formátu "ReactOS - Příjmení" a jako Typ a Verzi vyberte "Windows XP" nebo "Windows 2003".',
          explanation: 'Pojmenování stroje podle vašeho příjmení je klíčové pro pořádek na sdílených školních počítačích. Volba správného typu a verze pak říká VirtualBoxu, jaký fyzický hardware má emulovat (např. typ síťové karty nebo řadiče disku), aby s ním byl systém kompatibilní.',
        },
        {
          id: 'w4',
          text: 'Vyhraďte virtuálnímu stroji 1 GB (1024 MB) RAM. Tento systém je extrémně nenáročný.',
          explanation: 'Tato paměť se "odkrojí" z vaší fyzické paměti (RAM) a propůjčí se virtuálnímu stroji. Jakmile stroj vypnete, paměť se vašemu hlavnímu systému opět vrátí.',
        },
        {
          id: 'w5',
          text: 'Vytvořte virtuální pevný disk (VDI) o velikosti pouhé 2 GB.',
          explanation: 'VDI (Virtual Disk Image) je obrovský soubor ležící na vašem skutečném disku. Dynamická alokace znamená, že zpočátku zabere na vašem PC jen pár megabajtů a roste, až když do něj systém opravdu něco zapisuje.',
        },
        {
          id: 'w6',
          text: 'V Nastavení -> Úložiště připojte stažený soubor ISO (ReactOS) do virtuální optické mechaniky.',
          explanation: 'Stejně jako u starých počítačů musíte před instalací systému fyzicky vložit CD do mechaniky, i tady musíte virtuální CD (ISO obraz) vložit do emulované optické mechaniky.',
        },
        {
          id: 'w7',
          text: 'Spusťte stroj. Projděte modrým textovým instalátorem (stačí potvrzovat Enterem pro zformátování disku a kopírování souborů).',
          explanation: 'Zde vidíte skutečnou instalaci. Probíhá formátování (vytvoření souborového systému na virtuálním disku) a kopírování běhových souborů, aby mohl systém následně fungovat bez instalačního CD.',
        },
        {
          id: 'w8',
          text: 'Po dokončení instalace vás systém vyzve k restartu. Nyní vás přivítá grafická plocha nainstalovaná za méně než minutu!',
          explanation: 'Virtuální stroj se chová jako skutečné PC, takže po instalaci se musí restartovat a následně nabootuje svůj nově nahraný zavaděč z (virtuálního) pevného disku.',
        },
      ],
    },
    {
      id: 'vm_tuning',
      number: '2',
      title: 'Pokročilá instalace (Ladění výkonu)',
      subtitle: 'Nyní si vyzkoušíme instalaci moderního operačního systému, který vyžaduje manuální konfiguraci přidělených prostředků pro plynulý běh.',
      steps: [
        {
          id: 'a1',
          text: 'Stáhněte si ISO obraz moderního operačního systému (např. Linux Mint XFCE).',
          explanation: 'Na rozdíl od ReactOS je plnohodnotný moderní Linux mnohem větší (kolem 3 GB) a pro plynulý běh vyžaduje silnější virtuální hardware.',
        },
        {
          id: 'a2',
          text: 'V průvodci vytvořením stroje přidělte systému minimálně 2 GB (2048 MB) RAM.',
          explanation: 'Plnohodnotný moderní operační systém s grafickým uživatelským rozhraním potřebuje mnohem více operační paměti k tomu, aby se vyhnul tzv. "swapování" (odkládání dat na pomalý disk).',
        },
        {
          id: 'a2b',
          text: 'Při tvorbě virtuálního pevného disku (VDI) zvolte velikost alespoň 25 GB.',
          explanation: 'Zatímco ReactOS si vystačí s 2 GB, samotná instalace Linuxu Mint zabere na disku zhruba 15 GB. Pokud byste zvolili menší disk, instalátor by v polovině spadl kvůli nedostatku místa.',
        },
        {
          id: 'a3',
          text: 'Stroj NEZAPÍNEJTE! Místo toho klikněte na žlutou ikonu "Nastavení" a přejděte do sekce "Systém -> Procesor". Zvyšte počet jader na 2 (nebo 4, pokud to váš PC dovolí).',
          explanation: 'Více jader CPU umožní virtuálnímu systému zpracovávat více procesů najednou. Zelená zóna na posuvníku ukazuje bezpečný počet jader, který můžete stroji přidělit, aniž by to ohrozilo běh vašeho hlavního systému Windows.',
        },
        {
          id: 'a4',
          text: 'V Nastavení přejděte do sekce "Obrazovka" a zvyšte Video paměť (VRAM) na 128 MB (nebo maximum, které posuvník dovolí).',
          explanation: 'Video paměť se stará o vykreslování oken, animací a myši uvnitř virtuálního stroje. Bez dostatku VRAM bude pohyb oken "trhaný".',
        },
        {
          id: 'a5',
          text: 'V sekci "Obrazovka" zaškrtněte možnost "Povolit 3D akceleraci".',
          explanation: 'Tato funkce předá část vykreslování grafiky z virtuálního (pomalého) procesoru přímo vaší skutečné (fyzické) grafické kartě. To razantně zrychlí celou plochu virtuálního systému.',
        },
        {
          id: 'a6',
          text: 'Připojte stažené ISO do mechaniky a systém spusťte. Otestujte, jak plynule systém běží díky vašemu pokročilému nastavení.',
          explanation: 'Správné ladění virtuálního hardwaru je klíčovou schopností každého administrátora – hledáme rovnováhu mezi tím, aby měl virtuální stroj dostatek výkonu, ale aby zároveň nezpomalil náš hostitelský počítač.',
        },
      ],
    },
    {
      id: 'vm_snapshots',
      number: '3',
      title: 'Tvorba snímku a obnova systému',
      subtitle: 'Pojďme si vytvořit bezpečnostní záchytný bod a následně otestovat záchranu úmyslně zničeného systému.',
      steps: [
        {
          id: 's_snap1',
          text: 'Při vypnutém stroji vytvořte Snímek (Snapshot) vaší čisté instalace ReactOS.',
          explanation: 'Snímek funguje jako "save game". Uloží naprosto přesný stav celého virtuálního počítače (všechny soubory i nastavení), takže se k němu můžete kdykoliv bezpečně vrátit.',
        },
        {
          id: 's_snap2',
          text: 'Test záchrany ze Snímku: Zapněte systém, přes Application Manager nainstalujte aplikaci a následně smažte všechny soubory z disku C:. Systém zhavaruje. Zkuste jej restartovat a poté obnovte pomocí vytvořeného Snímku.',
          explanation: 'Díky Snímku se nemusíte bát experimentovat. Pokud systém rozbijete nebo smažete klíčové soubory, obnova ze snapshotu ho během vteřiny vrátí do plně funkčního stavu, ve kterém byl vytvořen.',
        },
      ],
    },
    {
      id: 'vm_scenarios',
      number: '4',
      title: 'Krizové scénáře (Řešení problémů)',
      subtitle: 'Při provozu virtualizovaných systémů můžete narazit na specifické problémy. Zkuste identifikovat příčinu a napište vlastní řešení do pole níže. Poté si můžete ověřit správný postup.',
      questions: [
        {
          id: 's1',
          type: 'textarea',
          label: 'Scénář 1: Uzamčení ukazatele myši',
          description: 'Kurzor myši je uzamčen uvnitř okna virtuálního stroje a nelze jej přesunout zpět do hostitelského systému (Windows).',
          placeholder: 'Napište svůj návrh řešení...',
          solution: 'Stiskněte tzv. Host klávesu. U VirtualBoxu je to ve výchozím nastavení Pravý CTRL. Tím uvolníte kurzor myši a klávesnici pro potřeby hostitelského systému.',
        },
        {
          id: 's2',
          type: 'textarea',
          label: 'Scénář 2: Absence síťového připojení',
          description: 'Hostitelský počítač je připojen k síti, avšak virtuální systém hlásí absenci síťového připojení a neumožňuje prohlížení webu či instalaci aktualizací.',
          placeholder: 'Napište svůj návrh řešení...',
          solution: 'Ověřte nastavení virtuálního stroje (ve vypnutém stavu) v sekci Nastavení -> Síť. Zkontrolujte, že je virtuální síťový adaptér povolen a nastaven na režim NAT. Pokud potřebujete, aby měl stroj vlastní IP adresu ve stejné fyzické síti, přepněte do režimu Síťový most (Bridged Adapter).',
        },
        {
          id: 's3',
          type: 'textarea',
          label: 'Scénář 3: Omezená integrace systémů',
          description: 'Virtuální stroj běží v malém rozlišení, prostředí se zasekává a nelze používat sdílenou schránku či přenos souborů mezi hostitelským a hostovaným systémem.',
          placeholder: 'Napište svůj návrh řešení...',
          solution: 'Řešením je instalace Přídavků pro hosta (Guest Additions). Za běhu virtuálního stroje vyberte v horním menu VirtualBoxu volbu Zařízení -> Vložit obraz CD Přídavků pro hosta. Uvnitř hostovaného OS instalaci dokončete. Poté v Nastavení -> Obecné -> Pokročilé povolte Obousměrnou sdílenou schránku.',
        },
      ],
    },
  ],
};

export const VirtualizationWorksheetTab: React.FC = () => (
  <DeclarativeWorksheet schema={VIRTUALIZATION_WORKSHEET_SCHEMA} />
);
