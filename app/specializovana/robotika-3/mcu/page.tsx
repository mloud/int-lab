'use client';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout 
      title="Architektura MCU a MicroPython" 
      category="specializovana"
      parent={{ title: 'Robotika 1', path: '/specializovana/robotika-3' }}
    >
      <DynamicSubchapterHub chapterId="rob3-mcu" />
    </CategoryLayout>
  );
}
