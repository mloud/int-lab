'use client';
import React from 'react';
import DynamicSubchapterHub from '@/components/curriculum/DynamicSubchapterHub';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function UsersHubPage() {
  return (
    <CategoryLayout 
      title="Správa uživatelů a oprávnění" 
      category="specializovana"
      parent={{ title: 'Operační systémy 1', path: '/specializovana/operacni-systemy' }}
    >
      <DynamicSubchapterHub chapterId="os-users" />
    </CategoryLayout>
  );
}
