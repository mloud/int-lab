import { Role } from './GradebookTypes';
import { GradebookTask } from './GradebookTasksTypes';

export const GRADEBOOK_TASKS: GradebookTask[] = [
  {
    id: 1,
    title: '1. Úkol: Role ŽÁK – Hledání v osobním hodnocení',
    roleRequired: Role.STUDENT,
    goal: 'Přihlas se pod účtem žáka Jana Nováka a prozkoumej jeho známky a předměty v systému.',
    question: 'Jaká je hodnota Janova nejhoršího průměru?',
    acceptedAnswers: [
      '2',
      '2.0',
      '2.00',
      '2,0',
      '2,00',
      'český jazyk',
      'cesky jazyk',
      'čeština',
      'cestina',
      'čj',
      'cj',
    ],
    didacticPoint:
      'V roli žáka vidíš pouze své osobní známky. Systém z jednotlivých známek a jejich vah automaticky počítá vážený průměr. Žák nemá možnost známky jakkoliv upravovat.',
  },
  {
    id: 2,
    title: '2. Úkol: Role RODIČ – Sledování prospěchu dětí',
    roleRequired: Role.PARENT,
    goal: 'Odhlaste se a přihlaste se jako zákonný zástupce paní Eva Krásná.',
    question: 'Kolik jedniček (známek 1) mají děti paní Krásné v systému celkem dohromady?',
    acceptedAnswers: ['3', 'tři', 'tri'],
    didacticPoint:
      'Rodič má přístup výhradně ke svým spárovaným dětem v databázi. Cizí děti z třídy vůbec nevidí – systém tím chrání osobní údaje žáků a rodin.',
  },
  {
    id: 3,
    title: '3. Úkol: Role UČITEL – Přehled za celou třídu',
    roleRequired: Role.TEACHER,
    goal: 'Přihlaste se jako vyučující Mgr. Karel Vomáčka a prohlédněte si žáky své třídy 7.A.',
    question: 'Který žák ze třídy 7.A má v tuto chvíli nejlepší celkový průměr?',
    acceptedAnswers: [
      'lucie černá',
      'lucie cerna',
      'lucie',
      'černá',
      'cerna',
      '1.35',
      '1,35',
    ],
    didacticPoint:
      'Vyučující vidí souhrnná data za celou třídu, kterou učí. Může porovnávat prospěch všech žáků a zapisovat jim nové známky s různou vahou.',
  },
  {
    id: 4,
    title: '4. Úkol: Role SPRÁVCE – Správa školní databáze',
    roleRequired: Role.ADMIN,
    goal: 'Přihlaste se jako správkyně systému Mgr. Alena Ředitelská a otevřete správu školních dat.',
    question: 'Kolik rodičovských účtů je v databázi školy celkem evidováno?',
    acceptedAnswers: ['3', 'tři', 'tri'],
    didacticPoint:
      'Správce (administrátor) má nejvyšší systémová oprávnění. Jako jediný může spravovat uživatelské účty v databázi a přiřazovat rodičům přístup k jejich dětem.',
  },
  {
    id: 5,
    title: '5. Úkol: Role SPRÁVCE – Přidání nového rodiče a dětí',
    roleRequired: Role.ADMIN,
    goal: 'V roli správce systému (Mgr. Alena Ředitelská) vytvořte v sekci Správa uživatelů nového zákonného zástupce Petra Svobodu a přiřaďte mu dvě děti: Jana Nováka a Adama Svobodu.',
    isActionTask: true,
    didacticPoint:
      'Výborně! V relační databázi lze relace (vazby mezi rodičem a dítětem) propojovat obousměrně a kdykoliv – jak pro dříve existující žáky, tak pro nově vytvořené žáky.',
  },
];
