import { Student, Parent, TeacherUser, AdminUser } from './GradebookTypes';

export const initialStudents: Student[] = [
  {
    id: 's1',
    firstName: 'Jan',
    lastName: 'Novák',
    classGroup: '7.A',
    grades: [
      { id: 'g1', subject: 'Matematika', grade: 1, weight: 10, date: '2024-10-05', topic: 'Zlomky a desetinná čísla' },
      { id: 'g2', subject: 'Český jazyk', grade: 2, weight: 5, date: '2024-10-12', topic: 'Pravopis velkých písmen' },
      { id: 'g3', subject: 'Matematika', grade: 3, weight: 5, date: '2024-11-01', topic: 'Slovní úlohy o pohybu' },
      { id: 'g10', subject: 'Informatika', grade: 1, weight: 8, date: '2024-11-14', topic: 'Práce s databází a tabulkou' },
    ],
  },
  {
    id: 's2',
    firstName: 'Petra',
    lastName: 'Krásná',
    classGroup: '7.A',
    grades: [
      { id: 'g4', subject: 'Anglický jazyk', grade: 1, weight: 10, date: '2024-10-08', topic: 'Past simple test' },
      { id: 'g5', subject: 'Dějepis', grade: 1, weight: 5, date: '2024-10-20', topic: 'Středověká města' },
      { id: 'g11', subject: 'Matematika', grade: 2, weight: 10, date: '2024-11-02', topic: 'Čtvrtletní písemná práce' },
    ],
  },
  {
    id: 's3',
    firstName: 'Tomáš',
    lastName: 'Krásný',
    classGroup: '7.A',
    grades: [
      { id: 'g6', subject: 'Fyzika', grade: 4, weight: 10, date: '2024-11-05', topic: 'Rychlost a dráha' },
      { id: 'g7', subject: 'Český jazyk', grade: 3, weight: 10, date: '2024-11-10', topic: 'Větné členy a souvětí' },
      { id: 'g8', subject: 'Tělesná výchova', grade: 1, weight: 2, date: '2024-11-15', topic: 'Běh na 60 metrů' },
      { id: 'g12', subject: 'Informatika', grade: 2, weight: 8, date: '2024-11-18', topic: 'Grafové modely a cesty' },
    ],
  },
  {
    id: 's4',
    firstName: 'Lucie',
    lastName: 'Černá',
    classGroup: '7.A',
    grades: [
      { id: 'g9', subject: 'Chemie', grade: 2, weight: 8, date: '2024-10-18', topic: 'Směsi a filtrace' },
      { id: 'g13', subject: 'Matematika', grade: 1, weight: 10, date: '2024-11-03', topic: 'Geometrické konstrukce' },
      { id: 'g14', subject: 'Anglický jazyk', grade: 1, weight: 5, date: '2024-11-12', topic: 'Slovní zásoba – Cestování' },
    ],
  },
];

export const initialParents: Parent[] = [
  {
    id: 'p1',
    firstName: 'Pavel',
    lastName: 'Novák',
    childIds: ['s1'],
  },
  {
    id: 'p2',
    firstName: 'Eva',
    lastName: 'Krásná',
    childIds: ['s2', 's3'],
  },
  {
    id: 'p3',
    firstName: 'Jana',
    lastName: 'Černá',
    childIds: ['s4'],
  },
];

export const teachers: TeacherUser[] = [
  { id: 't1', firstName: 'Karel', lastName: 'Vomáčka', title: 'Mgr.' }
];

export const admins: AdminUser[] = [
  { id: 'a1', firstName: 'Alena', lastName: 'Ředitelová', title: 'Mgr.' }
];

export const availableSubjects = [
  'Matematika',
  'Český jazyk',
  'Anglický jazyk',
  'Informatika',
  'Fyzika',
  'Chemie',
  'Dějepis',
  'Přírodopis',
  'Zeměpis',
  'Tělesná výchova'
];
