'use client';
import DynamicSubjectHub from '@/components/curriculum/DynamicSubjectHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout 
      title="Operační systémy 3" 
      category="specializovana"
      parent={{ title: 'Specializovaná IT', path: '/specializovana' }}
    >
      <DynamicSubjectHub subjectId="ops3" />
    </CategoryLayout>
  );
}
