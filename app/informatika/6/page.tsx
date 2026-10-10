'use client';
import React from 'react';
import { DynamicSubjectHub } from '@/components/curriculum';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout title="Informatika 6" category="informatika">
      <DynamicSubjectHub subjectId="inf-6" />
    </CategoryLayout>
  );
}
