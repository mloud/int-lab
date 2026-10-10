'use client';
import React from 'react';
import GradeMenu from '@/components/informatika/GradeMenu';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  return (
    <CategoryLayout title="Informatika 8" category="informatika">
      <GradeMenu grade={8} />
    </CategoryLayout>
  );
}
