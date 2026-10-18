'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function GrafyHubPage() {
  return (
    <CategoryLayout 
      title="Grafy a vizualizace" 
      category="informatika"
      parent={{ title: 'Informatika 9', path: '/informatika/9' }}
    >
      <DynamicSubchapterHub chapterId="grafy" />
    </CategoryLayout>
  );
}
