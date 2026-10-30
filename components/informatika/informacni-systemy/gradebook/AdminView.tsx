import React from 'react';
import { Grade, Parent, Student } from './GradebookTypes';
import { TeacherView } from './TeacherView';

interface AdminViewProps {
  students: Student[];
  parents: Parent[];
  onUpdateGrades: (studentId: string, newGrades: Grade[]) => void;
  onUpdateStudents: (students: Student[]) => void;
  onUpdateParents: (parents: Parent[]) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  students,
  onUpdateGrades,
}) => {
  return <TeacherView students={students} onUpdateGrades={onUpdateGrades} />;
};
