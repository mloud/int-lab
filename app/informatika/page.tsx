'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import InformatikaMenu from '@/components/informatika/InformatikaMenu';
import CategoryLayout from '@/components/layout/CategoryLayout';

export default function Page() {
  const router = useRouter();
  return (
    <CategoryLayout title="Obecná Informatika" category="informatika">
      <InformatikaMenu onBack={() => router.push('/')} />
    </CategoryLayout>
  );
}
