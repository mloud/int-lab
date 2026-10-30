import React from 'react';
import { Student } from './GradebookTypes';
import { GradeTable } from './GradeTable';

interface StudentViewProps {
  student: Student;
}

export const StudentView: React.FC<StudentViewProps> = ({ student }) => {
  return <GradeTable grades={student.grades} />;
};
