'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function NetworksHubPage() {
  return (
    <CategoryLayout 
      title="Síťová konfigurace a lokální sítě (LAN)" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy-1' }}
    >
      <DynamicSubchapterHub chapterId="os-networks" />
    </CategoryLayout>
  );
}
