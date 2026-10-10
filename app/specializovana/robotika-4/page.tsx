'use client';
import DynamicSubjectHub from '@/components/curriculum/DynamicSubjectHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout 
      title="Robotika 2" 
      category="specializovana"
      parent={{ title: 'Specializovaná IT', path: '/specializovana' }}
    >
      <DynamicSubjectHub subjectId="rob4" />
    </CategoryLayout>
  );
}
