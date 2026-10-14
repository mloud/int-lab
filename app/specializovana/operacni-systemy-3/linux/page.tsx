'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function LinuxPage() {
  return (
    <CategoryLayout 
      title="Linux" 
      category="specializovana"
      parent={{ title: 'Operační systémy 3', path: '/specializovana/operacni-systemy-3' }}
    >
      <DynamicSubchapterHub chapterId="os3-linux" />
    </CategoryLayout>
  );
}
