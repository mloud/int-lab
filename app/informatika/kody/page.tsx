'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CodesMenu from '@/components/informatika/codes/CodesMenu';

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <CodesMenu onBack={() => router.push('/informatika')}
            onStartLaundryGame={() => router.push('/informatika/kody/prani')}
            onStartEmojiGame={() => router.push('/informatika/kody/emoji')}
            onStartCountryCodesGame={() => router.push('/informatika/kody/staty')} />
    </div>
  );
}
