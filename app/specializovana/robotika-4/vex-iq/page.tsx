'use client';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout 
      title="VEX IQ: Inženýrské systémy" 
      category="specializovana"
      parent={{ title: 'Robotika 2', path: '/specializovana/robotika-4' }}
    >
      <DynamicSubchapterHub chapterId="rob4-vex-iq" />
    </CategoryLayout>
  );
}
