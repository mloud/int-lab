'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubjectSelection from '@/components/common/SubjectSelection';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Zpětná kompatibilita pro staré Vite hash odkazy (např. domena.cz/#informatika/barvy)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      const route = hash.substring(1);
      if (route.length > 0) {
        // Přesměruje z /#cesta na /cesta
        const formattedRoute = route.startsWith('/') ? route : `/${route}`;
        router.push(formattedRoute);
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] relative">
      <SubjectSelection 
        onSelectInformatika={() => router.push('/informatika')} 
        onSelectSpecializovana={() => router.push('/specializovana')} 
        onSelectArHub={() => router.push('/informatika/ar')}
      />
    </div>
  );
}
