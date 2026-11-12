import { LunchSysCardItem } from './LunchSysTypes';

export const LUNCHSYS_CARDS: LunchSysCardItem[] = [
  // 6 NUTNÝCH ÚDAJŮ
  {
    id: 'name',
    title: 'Jméno a příjmení žáka',
    category: 'identifikace',
    isNecessary: true,
    iconName: 'User',
    whyYes:
      'Kuchařka u okénka i systém musí mít jistotu, kterému žákovi jídlo vydávají. Když čtečka pípne, na displeji se kuchařce zobrazí jméno.',
    whyNo: '',
  },
  {
    id: 'classGroup',
    title: 'Třída (např. 7.A)',
    category: 'identifikace',
    isNecessary: true,
    iconName: 'GraduationCap',
    whyYes:
      'Pomáhá personálu rychle žáka zařadit, rozlišit jmenovce a řešit situace, když žák zapomene čip nebo má náhradní lístek.',
    whyNo: '',
  },
  {
    id: 'chipNumber',
    title: 'Číslo RFID čipu / karty',
    category: 'identifikace',
    isNecessary: true,
    iconName: 'CreditCard',
    whyYes:
      'Čtečka u okénka nečte písmena, ale jedinečné digitální číslo čipu. Podle něj systém v databázi ihned najde správnou kartu žáka.',
    whyNo: '',
  },
  {
    id: 'mealChoice',
    title: 'Objednané jídlo (Oběd 1 / Oběd 2)',
    category: 'strava',
    isNecessary: true,
    iconName: 'Utensils',
    whyYes:
      'Klíčový údaj pro výdej. Na displeji kuchařky se okamžitě rozsvítí číslo oběda, který si žák předem přes internet či terminál navolil.',
    whyNo: '',
  },
  {
    id: 'servedStatus',
    title: 'Stav výdeje (Vydáno / Nevydáno)',
    category: 'strava',
    isNecessary: true,
    iconName: 'CheckCircle2',
    whyYes:
      'Jakmile kuchařka talíř předá, systém zaznamená „Vydáno“. Kdyby žák přišel za 10 minut znovu, čtečka červeně zahlásí, že oběd už dostal.',
    whyNo: '',
  },
  {
    id: 'accountBalance',
    title: 'Stav konta (Zůstatek / Zaplaceno)',
    category: 'finance',
    isNecessary: true,
    iconName: 'Wallet',
    whyYes:
      'Jídelna musí ověřit, zda má žák na daný měsíc obědy uhrazené a zda mu zbývá kredit na účtu.',
    whyNo: '',
  },

  // 5 ZBYTEČNÝCH ÚDAJŮ / CHYTÁKŮ (Zásada minimalizace údajů / soukromí)
  {
    id: 'birthId',
    title: 'Rodné číslo žáka',
    category: 'soukromi',
    isNecessary: false,
    iconName: 'ShieldAlert',
    whyYes: '',
    whyNo:
      'Rodné číslo je velmi citlivý osobní údaj, který se smí používat jen ve státem daných případech. Kuchařka u okénka ho k výdeji jídla vůbec nepotřebuje.',
  },
  {
    id: 'homeAddress',
    title: 'Přesná adresa bydliště (ulice, č.p., PSČ)',
    category: 'soukromi',
    isNecessary: false,
    iconName: 'Home',
    whyYes: '',
    whyNo:
      'Kde žák bydlí, nemá pro přípravu a výdej polévky ani řízku žádný význam. Systém má podle zákona shromažďovat pouze údaje nezbytné pro daný účel.',
  },
  {
    id: 'mathGrade',
    title: 'Známka z matematiky / vysvědčení',
    category: 'skola',
    isNecessary: false,
    iconName: 'Award',
    whyYes: '',
    whyNo:
      'Školní prospěch je záležitostí výuky a třídního učitele. Výdej obědů s tím nemá žádnou souvislost a personál jídelny tyto informace vidět nesmí.',
  },
  {
    id: 'parentPhone',
    title: 'Telefonní číslo na rodiče',
    category: 'soukromi',
    isNecessary: false,
    iconName: 'Phone',
    whyYes: '',
    whyNo:
      'Kontakt na rodiče eviduje vedení školy a třídní učitel pro případ úrazu. Pro samotný každodenní výdej stravy u pultu je telefonní číslo nadbytečné.',
  },
  {
    id: 'parentMaritalStatus',
    title: 'Rodinný stav rodičů (svobodní, rozvedení)',
    category: 'soukromi',
    isNecessary: false,
    iconName: 'Users',
    whyYes: '',
    whyNo:
      'Jde o čistě soukromou rodinnou záležitost. Ukládání takových dat v obědovém systému by bylo hrubým porušením ochrany osobních údajů.',
  },
];

