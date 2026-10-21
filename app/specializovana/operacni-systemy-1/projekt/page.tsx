'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function ProjektHubPage() {
  return (
    <CategoryLayout 
      title="Závěrečný integrující projekt klientské stanice" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1' }}
    >
      <DynamicSubchapterHub chapterId="os-project" />
    </CategoryLayout>
  );
}
