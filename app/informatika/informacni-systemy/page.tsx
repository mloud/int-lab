'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import InformationSystemsChapter from '@/components/informatika/informacni-systemy/InformationSystemsChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();

  return (
    <CategoryLayout
      title="Informační systémy"
      category="informatika"
      parent={{ title: 'Informatika 7', path: '/informatika/7' }}
    >
      <InformationSystemsChapter onBack={() => router.push('/informatika/7')} />
    </CategoryLayout>
  );
}
