'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function GuiHubPage() {
  return (
    <CategoryLayout 
      title="Grafické rozhraní Windows 11" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy' }}
    >
      <DynamicSubchapterHub chapterId="os-gui" />
    </CategoryLayout>
  );
}
