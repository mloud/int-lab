'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import LaundryGame from '@/components/informatika/codes/LaundryGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <LaundryGame onBack={() => router.push('/informatika/kody')} />
    </div>
  );
}
