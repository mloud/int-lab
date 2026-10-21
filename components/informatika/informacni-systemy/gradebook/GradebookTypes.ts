export enum Role {
  STUDENT = 'Žák',
  PARENT = 'Rodič',
  TEACHER = 'Učitel',
  ADMIN = 'Administrátor',
}

export interface Grade {
  id: string;
  subject: string;
  grade: number; // 1 to 5
  weight: number; // 1 to 10
  date: string;
  topic?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  classGroup?: string;
  grades: Grade[];
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  childIds: string[];
}

export interface TeacherUser {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
}
