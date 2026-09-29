'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ArHubChapter from '@/components/informatika/ar/ArHubChapter';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  
  return (
    <CategoryLayout title="Laboratoř AR" category="informatika">
      <ArHubChapter onBack={() => router.push('/informatika')} />
    </CategoryLayout>
  );
}
