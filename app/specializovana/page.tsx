'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DynamicDivisionHub } from '@/components/curriculum';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout title="Specializovaná IT" category="specializovana">
      <DynamicDivisionHub divisionId="specializovana-it" onBack={() => router.push('/')} />
    </CategoryLayout>
  );
}
