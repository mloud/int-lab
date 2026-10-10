'use client';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout 
      title="KUKA EDU: Průmyslová robotika" 
      category="specializovana"
      parent={{ title: 'Robotika 2', path: '/specializovana/robotika-4' }}
    >
      <DynamicSubchapterHub chapterId="rob4-kuka" />
    </CategoryLayout>
  );
}
