'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function CliHubPage() {
  return (
    <CategoryLayout 
      title="Příkazová řádka a dávkové soubory" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy' }}
    >
      <DynamicSubchapterHub chapterId="os-cli" />
    </CategoryLayout>
  );
}
