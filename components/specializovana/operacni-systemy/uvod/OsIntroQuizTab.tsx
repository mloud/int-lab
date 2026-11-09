'use client';

import React from 'react';
import TopicReviewQuiz, { ReviewQuestion } from '@/components/ui/TopicReviewQuiz';
import { STORAGE_KEYS } from '@/lib/storageKeys';

const OS_INTRO_QUESTIONS: ReviewQuestion[] = [
  {
    id: 1,
    type: 'single',
    category: 'Licencování',
    question: 'Kamarád si koupil nový notebook s předinstalovanými Windows. Za rok se mu notebook nenávratně rozbije a koupí si nový, tentokrát bez systému. Může na něj použít licenci ze starého rozbitého notebooku?',
    options: [
      'Ano, je to jeho zaplacená licence.',
      'Ne, protože předinstalovaný systém je vázaný na hardware (OEM) a nelze ho přenést.',
      'Ano, ale musí si doplatit Volume poplatek.'
    ],
    correctIndices: [1],
    explanation: 'Předinstalované systémy bývají licencovány jako OEM – jsou pevně svázány s konkrétní základní deskou a nelze je přenést na jiný počítač.'
  },
  {
    id: 2,
    type: 'multiple',
    category: 'Funkce OS',
    question: 'Které z následujících činností zajišťuje samotný operační systém? (Vyber přesně 2 možnosti)',
    options: [
      'Komunikace s tiskárnou',
      'Tvorba webových stránek',
      'Chlazení procesoru termopastou',
      'Zabraňování aplikacím přepisovat si data v paměti RAM'
    ],
    correctIndices: [0, 3],
    explanation: 'OS zajišťuje komunikaci se zařízeními (přes ovladače) a správu/ochranu operační paměti RAM mezi běžícími procesy.'
  },
  {
    id: 3,
    type: 'fill',
    category: 'Licencování',
    question: 'Jak se anglickým termínem označuje typ softwarové licence, kde je zdrojový kód volně dostupný každému k úpravám a distribuci?',
    correctAnswers: ['open-source', 'open source', 'opensource'],
    expectedFormat: 'Anglický termín (např. freeware)',
    explanation: 'Open-source (otevřený software) umožňuje komukoliv nahlížet do zdrojového kódu, upravovat jej a dále šířit.'
  },
  {
    id: 4,
    type: 'single',
    category: 'Základy OS',
    question: 'Co by se stalo s běžným počítačem, kdybys úplně vymazal z disku operační systém a zapnul ho?',
    options: [
      'Fungoval by normálně, ale mnohem pomaleji.',
      'Nedokázal by spustit žádný program ani reagovat na klávesnici v běžném uživatelském prostředí.',
      'Automaticky by se připojil k záchrannému cloudu a stáhl si nový OS.'
    ],
    correctIndices: [1],
    explanation: 'Bez operačního systému zůstane počítač po proběhnutí BIOS/UEFI bez prostředníka, který by zavedl uživatelské rozhraní a spouštěl aplikace.'
  },
  {
    id: 5,
    type: 'fill',
    category: 'Funkce OS',
    question: 'Operační systém umožňuje spouštět více programů najednou (např. zároveň hraje hudba a píšeš v textovém editoru). Jak se tato vlastnost jedním slovem nazývá?',
    correctAnswers: ['multitasking', 'víceúlohovost'],
    expectedFormat: 'Jedno slovo (anglicky)',
    explanation: 'Multitasking (víceúlohovost) je schopnost OS rychle přepínat či paralelně spouštět více procesů současně.'
  },
  {
    id: 6,
    type: 'single',
    category: 'Typy OS',
    question: 'Které přiřazení zařízení a typu operačního systému je zcela správné?',
    options: [
      'Běžný školní notebook = Desktopový, Chytrá pračka = Vestavěný (Embedded), Databázový stroj = Serverový, iPhone = Mobilní',
      'Běžný školní notebook = Serverový, Chytrá pračka = Mobilní, Databázový stroj = Desktopový, iPhone = Vestavěný',
      'Všechna tato zařízení používají identický desktopový operační systém.'
    ],
    correctIndices: [0],
    explanation: 'Osobní počítače používají desktopové OS, jednoúčelová elektronika vestavěné (embedded) OS, servery serverové OS a smartphony mobilní OS.'
  },
  {
    id: 7,
    type: 'multiple',
    category: 'Typy OS',
    question: 'Firma potřebuje nasadit operační systém pro své webové servery. Které z následujících systémů bys doporučil, protože jsou k tomu přímo určeny? (Vyber 2 možnosti)',
    options: [
      'Ubuntu Server',
      'Windows Server',
      'Android',
      'QNX'
    ],
    correctIndices: [0, 1],
    explanation: 'Ubuntu Server (Linux) a Windows Server jsou specializované serverové operační systémy navržené pro nepřetržitý síťový provoz.'
  },
  {
    id: 8,
    type: 'single',
    category: 'Licencování',
    question: 'Stáhnul sis z internetu program úplně zdarma a je to freeware. Znamená to automaticky, že smíš otevřít jeho kód, upravit ho a vydávat za svůj?',
    options: [
      'Ne, freeware znamená jen, že je zdarma k použití, ale nedává ti právo ke kódu a úpravám.',
      'Ano, pokud je něco freeware, znamená to automaticky i open-source.'
    ],
    correctIndices: [0],
    explanation: 'Freeware je sice bezplatný, ale jeho zdrojový kód zůstává uzavřený (proprietární).'
  },
  {
    id: 9,
    type: 'single',
    category: 'Licencování',
    question: 'Jaká licence se používá ve školách a velkých firmách, kde jeden licenční klíč aktivuje stovky počítačů najednou?',
    options: [
      'Volume (multilicence)',
      'Shareware / Trial',
      'OEM licence',
      'Freeware'
    ],
    correctIndices: [0],
    explanation: 'Volume licence (hromadná multilicence) umožňuje centrální aktivaci a správu velkého počtu firemních či školních stanic.'
  },
  {
    id: 10,
    type: 'single',
    category: 'Správa aplikací',
    question: 'Z jakého důvodu je dnes běžnější instalovat aplikace centrálně (např. přes App Store, Google Play, repozitáře) oproti dřívějšímu ručnímu stahování instalátorů z webu?',
    options: [
      'Je to bezpečnější pro uživatele a aktualizace se hlídají automaticky.',
      'Centrální distribuce funguje i bez připojení k internetu.',
      'Aplikace z centrálních obchodů nezabírají žádné místo na disku.'
    ],
    correctIndices: [0],
    explanation: 'Centrální obchody a repozitáře kontrolují balíčky na přítomnost malwaru, ověřují digitální podpisy a automaticky aktualizují nainstalované programy.'
  },
  {
    id: 11,
    type: 'single',
    category: 'Funkce OS',
    question: 'Společnost vydala aktualizaci ovladače (driveru) pro novou grafickou kartu. Co by se stalo, kdyby operační systém žádné ovladače nepoužíval?',
    options: [
      'Hry by měly lepší grafiku, protože by ovladač systém nebrzdil.',
      'Počítač by nevěděl, jak správně komunikovat s grafickou kartou, a ta by nefungovala optimálně nebo vůbec.',
      'Operační systém by se z bezpečnostních důvodů odinstaloval.'
    ],
    correctIndices: [1],
    explanation: 'Ovladač (driver) slouží jako překladač mezi obecnými příkazy operačního systému a specifickým hardwarem daného výrobce.'
  },
  {
    id: 12,
    type: 'multiple',
    category: 'Základy OS',
    question: 'Představ si, že bys z mobilního telefonu smazal jeho operační systém (např. Android) a telefon jen zapnul. Které z následujících věcí by se staly? (Vyber 2 možnosti)',
    options: [
      'Fotoaparát by v běžném režimu nevyfotil jedinou fotku.',
      'Baterie by se sama okamžitě vybila.',
      'Nešlo by spustit prostředí pro odeslání SMS zprávy.',
      'Signál od operátora by se zdvojnásobil.'
    ],
    correctIndices: [0, 2],
    explanation: 'Bez operačního systému nemá telefon grafické rozhraní, ovladače fotoaparátu ani telefonní aplikace.'
  },
  {
    id: 13,
    type: 'single',
    category: 'Typy OS',
    question: 'Uživatel má doma velmi pomalý, starý notebook s Windows a chce ho zrychlit alespoň pro jednoduché prohlížení webu a psaní e-mailů. Jaký systém by dávalo smysl nainstalovat místo něj?',
    options: [
      'Odlehčenou distribuci Linuxu (např. Lubuntu nebo Linux Mint).',
      'Windows Server, protože servery jsou dělané na rychlost a stabilitu.',
      'Android 14, protože je optimalizovaný pro velké notebooky.'
    ],
    correctIndices: [0],
    explanation: 'Odlehčené linuxové distribuce mají minimální nároky na RAM a procesor a dokáží vdechnout druhý život staršímu hardwaru.'
  },
  {
    id: 14,
    type: 'fill',
    category: 'Typy OS',
    question: 'Navrhuješ chytrou pračku, která má jen jedno dotykové tlačítko, malý displej a obvod s mikročipem. Jaký typ operačního systému (jedním slovem česky nebo anglicky) v ní pravděpodobně poběží?',
    correctAnswers: ['vestavěný', 'vestaveny', 'embedded'],
    expectedFormat: 'Jedno slovo (česky nebo anglicky)',
    explanation: 'Vestavěný (embedded) operační systém je navržen přímo pro řízení konkrétního stroje či spotřebiče.'
  },
  {
    id: 15,
    type: 'single',
    category: 'Typy OS',
    question: 'Který typ operačního systému zvolíš, pokud potřebuješ, aby na tvé webové stránky mohlo přijít 100 000 lidí denně a databáze běžela nepřetržitě 24/7?',
    options: [
      'Serverový operační systém',
      'Vestavěný (Embedded) systém z chytrých hodinek',
      'Mobilní operační systém iOS'
    ],
    correctIndices: [0],
    explanation: 'Serverové OS jsou optimalizované pro paralelní obsluhu tisíců síťových spojení, vysokou dostupnost a bezpečnost.'
  },
  {
    id: 16,
    type: 'single',
    category: 'Typy OS',
    question: 'Proč si nemůžeš běžně nainstalovat iOS (systém z iPhonu) na svůj starší mobil značky Samsung?',
    options: [
      'Protože telefony Samsung mají pomalejší procesory a nezvládly by to.',
      'Protože iOS je proprietární (uzavřený) a Apple ho navrhuje striktně jen pro svůj vlastní hardware.',
      'Protože iOS zabírá moc místa a na Android by se nevešel.'
    ],
    correctIndices: [1],
    explanation: 'Apple licencuje a kompiluje iOS výhradně pro své vlastní čipy a zařízení (uzavřený ekosystém).'
  },
  {
    id: 17,
    type: 'multiple',
    category: 'Licencování',
    question: 'Student IT by rád vyvinul vlastní úpravu operačního systému (svou vlastní distribuci) a potřebuje přístup k jeho zdrojovým kódům. U kterých systémů (open-source) je to legálně a technicky možné? (Vyber 2 možnosti)',
    options: [
      'Linux (např. Ubuntu / Debian)',
      'Android (AOSP)',
      'Microsoft Windows 11',
      'Apple macOS'
    ],
    correctIndices: [0, 1],
    explanation: 'Jádro Linuxu i projekt Android Open Source Project (AOSP) mají otevřený zdrojový kód.'
  },
  {
    id: 18,
    type: 'single',
    category: 'Licencování',
    question: 'Uživatel si stáhl populární program „WinRAR“. Při každém spuštění se mu na obrazovce ukáže okno s žádostí o zakoupení plné verze, ale program je určen k vyzkoušení před koupí. O jaký model licencování se jedná?',
    options: [
      'Shareware / Trialware',
      'Open-source',
      'OEM'
    ],
    correctIndices: [0],
    explanation: 'Shareware / Trialware umožňuje program zdarma vyzkoušet po určitou dobu, po jejímž uplynutí vyžaduje zakoupení licence.'
  },
  {
    id: 19,
    type: 'fill',
    category: 'Funkce OS',
    question: 'Která logická struktura a funkce v rámci operačního systému se stará o to, abychom mohli data bezpečně uložit na pevný disk a roztřídit je do složek? (odpověď na 2 slova)',
    correctAnswers: ['souborový systém', 'souborovy system', 'file system', 'filesystem'],
    expectedFormat: '2 slova (např. správce procesů)',
    explanation: 'Souborový systém (File System, např. NTFS, FAT32, ext4) organizuje uložení dat do souborů a adresářů na disku.'
  },
  {
    id: 20,
    type: 'single',
    category: 'Funkce OS',
    question: 'Dva programy se najednou perou o procesor. Která vnitřní součást operačního systému rozhodne, kdo dostane přednost?',
    options: [
      'Správa procesů (Plánovač / Scheduler)',
      'Souborový systém',
      'Ovladač zvukové karty'
    ],
    correctIndices: [0],
    explanation: 'Plánovač procesů (Scheduler) v jádře OS přiděluje procesorový čas jednotlivým vláknům podle jejich priority.'
  }
];

export const OsIntroQuizTab: React.FC = () => (
  <TopicReviewQuiz
    storageKey={STORAGE_KEYS.quiz('oss1_uvod_review_v1')}
    title="Ověření znalostí: Úvod do operačních systémů"
    subtitle="Vrstvený model počítače, hlavní funkce OS, typy systémů a licencování"
    questions={OS_INTRO_QUESTIONS}
  />
);

