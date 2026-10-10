import { SchoolConfig } from '../types';
import { DEFAULT_SCHOOL } from './defaultSchool';

/**
 * Konfigurace pro čistě Základní školu (pouze 2. stupeň ZŠ: 6.–9. třída).
 * Neobsahuje střední školu ani odborné předměty (PRG 2, OS 2 atd.).
 */
export const ZS_SCHOOL: SchoolConfig = {
  id: 'zs-skola',
  name: 'Základní škola (pouze ZŠ)',
  shortName: 'Základní škola',
  description: 'Výukový portál zaměřený výhradně na 2. stupeň základní školy (6., 7., 8. a 9. ročník).',
  divisions: [
    {
      id: 'obecna-it',
      title: 'Informatika ZŠ',
      subtitle: '2. stupeň ZŠ (6.–9. ročník)',
      description: 'Základy digitálního světa, šifrování dat, grafové modely, jednotky dat, hardware a operační systémy přizpůsobené pro žáky základních škol.',
      icon: 'Binary',
      watermarkIcon: 'Code',
      colorScheme: 'blue',
      route: '/informatika',
      // Přebírá ročníky 6, 7, 8, 9 z kurikula a nastavuje tradiční značení pro ZŠ (6.–9. Třída)
      grades: (DEFAULT_SCHOOL.divisions[0]?.grades || []).map((g) => ({
        ...g,
        gradeLabel: `${g.grade}. Třída`,
      })),
    }
  ]
};
