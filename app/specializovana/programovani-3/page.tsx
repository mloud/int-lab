'use client';
import DynamicSubjectHub from '@/components/curriculum/DynamicSubjectHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout 
      title="Programování a hry 3" 
      category="specializovana"
      parent={{ title: 'Specializovaná IT', path: '/specializovana' }}
    >
      <DynamicSubjectHub subjectId="prg3" />
    </CategoryLayout>
  );
}
