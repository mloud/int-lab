'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DynamicDivisionHub } from '@/components/curriculum';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout title="Všeobecná informatika SŠ" category="specializovana">
      <DynamicDivisionHub divisionId="stredni-skola" onBack={() => router.push('/')} />
    </CategoryLayout>
  );
}
