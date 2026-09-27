const fs = require('fs');

const subMappings = [
  { folder: 'app/specializovana/operacni-systemy/uvod', id: 'os-uvod', title: 'Úvod', path: '/specializovana/operacni-systemy/uvod' },
  { folder: 'app/specializovana/operacni-systemy/architektura', id: 'os-arch', title: 'Architektura', path: '/specializovana/operacni-systemy/architektura' },
  { folder: 'app/specializovana/operacni-systemy/vyvoj', id: 'os-vyvoj', title: 'Vývoj', path: '/specializovana/operacni-systemy/vyvoj' },
  { folder: 'app/specializovana/operacni-systemy/boot', id: 'os-boot', title: 'Boot', path: '/specializovana/operacni-systemy/boot' },
  { folder: 'app/specializovana/operacni-systemy/souborove-systemy', id: 'os-fs', title: 'Souborové systémy', path: '/specializovana/operacni-systemy/souborove-systemy' },
  { folder: 'app/specializovana/operacni-systemy/instalace', id: 'os-install', title: 'Instalace', path: '/specializovana/operacni-systemy/instalace' },
  { folder: 'app/specializovana/operacni-systemy/procesy', id: 'os-proc', title: 'Procesy', path: '/specializovana/operacni-systemy/procesy' },
  { folder: 'app/specializovana/operacni-systemy/hardware', id: 'os-hw', title: 'Hardware a OS', path: '/specializovana/operacni-systemy/hardware' },
];

for (const map of subMappings) {
  const path = map.folder + '/page.tsx';
  if (!fs.existsSync(path)) continue;
  
  let content = fs.readFileSync(path, 'utf8');
  
  if (!content.includes('ChapterLayout')) {
    content = content.replace("import React from 'react';", "import React from 'react';\nimport ChapterLayout from '@/components/layout/ChapterLayout';");
  }
  
  const divStartMatch = content.match(/<div className="min-h-screen[^>]*>/);
  if (divStartMatch) {
     content = content.replace(divStartMatch[0], `<ChapterLayout chapterId="${map.id}">\n      <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[60vh]">`);
     const lastDivIdx = content.lastIndexOf('</div>');
     if (lastDivIdx !== -1) {
       content = content.slice(0, lastDivIdx) + '</div>\n    </ChapterLayout>' + content.slice(lastDivIdx + 6);
     }
  }
  fs.writeFileSync(path, content);
}
