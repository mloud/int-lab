'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function BezpecnostPage() {
  return (
    <CategoryLayout 
      title="Bezpečnost 1" 
      category="specializovana"
      parent={{ title: 'Operační systémy 2', path: '/specializovana/operacni-systemy-2' }}
    >
      <DynamicSubchapterHub chapterId="bezpecnost" />
    </CategoryLayout>
  );
}
