'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function GitPage() {
  return (
    <CategoryLayout 
      title="Git a verzování" 
      category="specializovana"
      parent={{ title: 'Operační systémy 3', path: '/specializovana/operacni-systemy-3' }}
    >
      <DynamicSubchapterHub chapterId="os3-git" />
    </CategoryLayout>
  );
}
