'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { DynamicSubjectHub } from '@/components/curriculum';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout title="Informatika pro SŠ" category="specializovana">
      <DynamicSubjectHub subjectId="inf-ss" onBack={() => router.push('/stredni-skola')} />
    </CategoryLayout>
  );
}
