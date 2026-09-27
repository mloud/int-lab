'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import EmojiGame from '@/components/informatika/codes/EmojiGame';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <EmojiGame onBack={() => router.push('/informatika/kody')} />
    </div>
  );
}
