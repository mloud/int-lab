'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubjectSelection from '@/components/common/SubjectSelection';

const SHORT_LINKS: Record<string, string> = {
  'win': '/specializovana/operacni-systemy/instalace',
  'osh': '/specializovana/operacni-systemy/hardware',
  'osi': '/specializovana/operacni-systemy/uvod',
  'osa': '/specializovana/operacni-systemy/architektura',
  'ose': '/specializovana/operacni-systemy/vyvoj',
  'osv': '/specializovana/operacni-systemy/virtualizace',
  'osb': '/specializovana/operacni-systemy/boot',
  'pmm': '/specializovana/operacni-systemy/procesy',
  'fsm': '/specializovana/operacni-systemy/souborove-systemy'
};

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Zpětná kompatibilita pro staré Vite hash odkazy (např. domena.cz/#informatika/barvy) a zkratky (#osa)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      const route = hash.substring(1);
      if (route.length > 0) {
        // Kontrola zkratek
        if (SHORT_LINKS[route]) {
          router.push(SHORT_LINKS[route]);
          return;
        }
        
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
