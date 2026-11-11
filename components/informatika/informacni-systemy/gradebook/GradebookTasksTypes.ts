import { Role, Student, Parent } from './GradebookTypes';

export interface GradebookTaskState {
  currentRole: Role | null;
  currentUser: any | null;
  activeTab: string;
  students: Student[];
  parents: Parent[];
}

export interface GradebookTask {
  id: number;
  title: string;
  roleRequired: Role;
  loginHint?: {
    name: string;
    username: string;
    password: string;
  };
  goal: string;
  question?: string;
  placeholder?: string;
  acceptedAnswers?: string[];
  didacticPoint: string;
  isActionTask?: boolean;
}
