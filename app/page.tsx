'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubjectSelection from '@/components/common/SubjectSelection';

const SHORT_LINKS: Record<string, string> = {
  'win': '/specializovana/operacni-systemy-1/instalace',
  'osh': '/specializovana/operacni-systemy-1/hardware',
  'osi': '/specializovana/operacni-systemy-1/uvod',
  'osa': '/specializovana/operacni-systemy-1/architektura',
  'ose': '/specializovana/operacni-systemy-1/vyvoj',
  'osv': '/specializovana/operacni-systemy-1/virtualizace',
  'osb': '/specializovana/operacni-systemy-1/boot',
  'pmm': '/specializovana/operacni-systemy-1/procesy',
  'fsm': '/specializovana/operacni-systemy-1/souborove-systemy',
  'fs1': '/specializovana/operacni-systemy-1/souborove-systemy/media',
  'fs2': '/specializovana/operacni-systemy-1/souborove-systemy/deleni-disku',
  'fs3': '/specializovana/operacni-systemy-1/souborove-systemy/alokace-fat',
  'fs4': '/specializovana/operacni-systemy-1/souborove-systemy/fragmentace'
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative">
      <SubjectSelection 
        onSelectInformatika={() => router.push('/informatika')} 
        onSelectSpecializovana={() => router.push('/specializovana')} 
        onSelectArHub={() => router.push('/informatika/ar')}
      />
    </div>
  );
}
