'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function LinuxServicesPage() {
  return (
    <CategoryLayout 
      title="Linux: Sítě, služby a Bash" 
      category="specializovana"
      parent={{ title: 'Operační systémy 3', path: '/specializovana/operacni-systemy-3' }}
    >
      <DynamicSubchapterHub chapterId="os3-sluzby" />
    </CategoryLayout>
  );
}
