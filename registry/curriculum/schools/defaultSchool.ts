import { SchoolConfig } from '../types';
import {
  OSS1_GUI,
  OSS1_CLI,
  OSS1_USERS,
  OSS1_SOFTWARE,
  OSS2_BEZPECNOST,
  OSS2_POKROCILA,
  OSS2_AD,
  OSS2_SLUZBY,
  OSS3_LINUX,
  OSS3_GIT,
  OSS3_CYBER,
  OSS3_TEAM,
  outlineToChapter,
  outlineToSubchapters
} from '../outlines';

export const DEFAULT_SCHOOL: SchoolConfig = {
  id: 'zs-vimperk',
  name: 'Gymnázium Vimperk',
  shortName: 'Gymnázium Vimperk',
  description: 'Kompletní výukový portál všeobecné i odborné informatiky pro základní i střední školy',
  divisions: [
    // =========================================================================
    // 1. DIVIZE: OBECNÁ INFORMATIKA (ZŠ)
    // =========================================================================
    {
      id: 'obecna-it',
      title: 'Nižší Gymnázium',
      subtitle: 'Nižší Gymnázium',
      description: 'Objevte základy digitálního světa. Od binární soustavy, přes barvy, kompresi a algoritmy až po fungování moderního internetu.',
      icon: 'Binary',
      watermarkIcon: 'Code',
      colorScheme: 'blue',
      route: '/informatika',
      grades: [
        // 6. ROČNÍK (PRIMA)
        {
          grade: 6,
          gradeLabel: 'Prima (6. ročník)',
          pillColor: 'bg-blue-600',
          subjects: [
            {
              id: 'inf-6',
              title: 'Informatika 6',
              tag: 'inf6',
              description: 'Základy digitálního světa, kódování, šifrování dat, barvy v RGB, vektorová grafika a binární čísla.',
              icon: 'Binary',
              gradient: 'from-blue-600 to-indigo-600',
              route: '/informatika/6',
              chapters: [
                {
                  id: 'kody',
                  title: 'Kódy kolem nás',
                  description: 'Piktogramy, prací symboly, digitální emoce (Emoji) a mezinárodní kódy států.',
                  tag: 'cod',
                  icon: 'Binary',
                  gradient: 'from-rose-500 to-pink-500',
                  route: '/informatika/kody',
                  hasSubchapters: false,
                },
                {
                  id: 'sifry',
                  title: 'Šifrování dat',
                  description: 'Principy kryptografie, Caesarova substituční šifra, mřížka a vlastní šifrování.',
                  tag: 'enc',
                  icon: 'Lock',
                  gradient: 'from-emerald-500 to-teal-500',
                  route: '/informatika/sifry',
                  hasSubchapters: false,
                },
                {
                  id: 'barvy',
                  title: 'Kódování barev',
                  description: 'Aditivní skládání světel RGB na monitoru, míchací laboratoř a omalovánky.',
                  tag: 'rgb',
                  icon: 'Palette',
                  gradient: 'from-blue-500 to-indigo-500',
                  route: '/informatika/barvy',
                  hasSubchapters: false,
                },
                {
                  id: 'cary',
                  title: 'Obrázek z čar',
                  description: 'Vektorová geometrie, skládání tvarů, body a úsečky v souřadnicovém plátně.',
                  tag: 'lin',
                  icon: 'Shapes',
                  gradient: 'from-indigo-500 to-purple-500',
                  route: '/informatika/cary',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'cary-cary', title: 'Úsečky a čáry', description: 'Kreslení čar v souřadnicovém systému', tag: 'ln1', icon: 'Shapes', gradient: 'from-indigo-500 to-purple-500', route: '/informatika/cary/cary' },
                    { id: 'cary-tvary', title: 'Geometrické tvary', description: 'Polygonové obrazce a skládání geometrie', tag: 'ln2', icon: 'Shapes', gradient: 'from-purple-500 to-pink-500', route: '/informatika/cary/tvary' },
                    { id: 'cary-vektory', title: 'Vektorové plátno', description: 'Editor a manipulace s vektorovými body', tag: 'ln3', icon: 'Shapes', gradient: 'from-blue-500 to-indigo-500', route: '/informatika/cary/vektory' }
                  ]
                },
                {
                  id: 'komprese-zs',
                  title: 'Komprese (jednoduše)',
                  description: 'Základy zmenšování dat, slovníková metoda textu a slučování barevných pixelů.',
                  tag: 'com',
                  icon: 'BoxSelect',
                  gradient: 'from-teal-500 to-emerald-500',
                  route: '/informatika/komprese',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'kom-text', title: 'Slovníková metoda', description: 'Zmenšování textu nahrazováním slov', tag: 'c1', icon: 'BoxSelect', gradient: 'from-teal-500 to-emerald-500', route: '/informatika/komprese/text' },
                    { id: 'kom-obrazek', title: 'Slučování pixelů', description: 'Komprese jednoduchých obrázků', tag: 'c2', icon: 'BoxSelect', gradient: 'from-emerald-500 to-teal-600', route: '/informatika/komprese/formaty/obrazek' },
                    { id: 'kom-hra', title: 'Interaktivní kompresní hra', description: 'Trénink komprese v herním simulátoru', tag: 'c3', icon: 'BoxSelect', gradient: 'from-cyan-500 to-blue-500', route: '/informatika/komprese/hra' }
                  ]
                },
                {
                  id: 'binarni-zs',
                  title: 'Binární čísla',
                  description: 'Dvojková soustava hravě, převodník čísel, logická hradla a binární sčítání.',
                  tag: 'bin',
                  icon: 'Binary',
                  gradient: 'from-amber-500 to-orange-500',
                  route: '/informatika/binarni',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'bin-prevod', title: 'Převodník soustav', description: 'Převod mezi desítkovou a dvojkovou', tag: 'b1', icon: 'Binary', gradient: 'from-amber-500 to-orange-500', route: '/informatika/binarni/prevod' },
                    { id: 'bin-scitani', title: 'Binární sčítání', description: 'Algoritmus sčítání nul a jedniček', tag: 'b2', icon: 'Binary', gradient: 'from-orange-500 to-amber-600', route: '/informatika/binarni/scitani' },
                    { id: 'bin-pravdivost', title: 'Logická hradla', description: 'Pravdivostní tabulky AND, OR, NOT', tag: 'b3', icon: 'Binary', gradient: 'from-yellow-500 to-orange-500', route: '/informatika/binarni/pravdivostni-tabulka' }
                  ]
                }
              ]
            }
          ]
        },

        // 7. ROČNÍK (SEKUNDA)
        {
          grade: 7,
          gradeLabel: 'Sekunda (7. ročník)',
          pillColor: 'bg-teal-600',
          subjects: [
            {
              id: 'inf-7',
              title: 'Informatika 7',
              tag: 'inf7',
              description: 'Algoritmické myšlení, grafové modely, Eulerovské tahy, kolize v rozvrhu a plánování procesů.',
              icon: 'Network',
              gradient: 'from-teal-600 to-emerald-600',
              route: '/informatika/7',
              chapters: [
                {
                  id: 'modely',
                  title: 'Modely a sítě',
                  description: 'Pokročilé grafové algoritmy, minimální kostra, Petriho sítě a plánování procesů.',
                  tag: 'mod',
                  icon: 'Network',
                  gradient: 'from-purple-500 to-pink-500',
                  route: '/informatika/modely',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'mod-cesty', title: 'Hledání cest', description: 'Dijkstrův algoritmus a navigace', tag: 'm1', icon: 'Network', gradient: 'from-purple-500 to-pink-500', route: '/informatika/modely/hledani-cesty' },
                    { id: 'mod-blatov', title: 'Eulerovské tahy', description: 'Problém mostů a procházení grafu', tag: 'm2', icon: 'Network', gradient: 'from-pink-500 to-rose-500', route: '/informatika/modely/blatov' },
                    { id: 'mod-kostra', title: 'Minimální kostra', description: 'Kruskalův algoritmus propojení sítě', tag: 'm3', icon: 'Network', gradient: 'from-indigo-500 to-purple-500', route: '/informatika/modely/kostra' },
                    { id: 'mod-rozvrh', title: 'Graf rozvrhu', description: 'Barvení grafů a kolize hodin', tag: 'm4', icon: 'Network', gradient: 'from-violet-500 to-purple-600', route: '/informatika/modely/graf-rozvrhu' },
                    { id: 'mod-paralel', title: 'Paralelní procesy', description: 'Petriho sítě a synchronizace úloh', tag: 'm5', icon: 'Network', gradient: 'from-purple-600 to-indigo-600', route: '/informatika/modely/paralelni-procesy' }
                  ]
                }
              ]
            }
          ]
        },

        // 8. ROČNÍK (TERCIE)
        {
          grade: 8,
          gradeLabel: 'Tercie (8. ročník)',
          pillColor: 'bg-indigo-600',
          subjects: [
            {
              id: 'inf-8',
              title: 'Informatika 8',
              tag: 'inf8',
              description: 'Měření velikosti dat, jednotky KB až TB, paměťová média, výpočty kapacity a rychlosti stahování.',
              icon: 'HardDrive',
              gradient: 'from-indigo-600 to-purple-600',
              route: '/informatika/8',
              chapters: [
                {
                  id: 'jednotky',
                  title: 'Jednotky dat',
                  description: 'Bity, bajty, předpony KB až TB, výpočty kapacity paměti a rychlosti stahování.',
                  tag: 'dum',
                  icon: 'HardDrive',
                  gradient: 'from-fuchsia-500 to-purple-600',
                  route: '/informatika/jednotky',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'jed-teorie', title: 'Teorie jednotek', description: 'Přehled předpon a převodní tabulka', tag: 'u1', icon: 'HardDrive', gradient: 'from-fuchsia-500 to-purple-600', route: '/informatika/jednotky/teorie' },
                    { id: 'jed-praxe', title: 'Praktické výpočty', description: 'Kapacita disků a rychlost stahování v praxi', tag: 'u2', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/informatika/jednotky/praxe' }
                  ]
                }
              ]
            }
          ]
        },

        // 9. ROČNÍK (KVARTA)
        {
          grade: 9,
          gradeLabel: 'Kvarta (9. ročník)',
          pillColor: 'bg-rose-600',
          subjects: [
            {
              id: 'inf-9',
              title: 'Informatika 9',
              tag: 'inf9',
              description: 'Hardware a architektura PC, operační systémy, pokročilá komprese dat, grafy a technologie budoucnosti.',
              icon: 'Cpu',
              gradient: 'from-rose-600 to-pink-600',
              route: '/informatika/9',
              chapters: [
                {
                  id: 'hardware-zs',
                  title: 'Součásti počítače',
                  description: 'Hardware komponenty, procesor, paměť RAM, sběrnice a konfigurátor sestavy.',
                  tag: 'hwm',
                  icon: 'Cpu',
                  gradient: 'from-sky-500 to-cyan-500',
                  route: '/informatika/hardware',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'hw-trideni', title: 'Třídění komponent', description: 'Vstupní, výstupní a vnitřní komponenty', tag: 'h1', icon: 'Cpu', gradient: 'from-sky-500 to-cyan-500', route: '/informatika/hardware/trideni' },
                    { id: 'hw-cesta', title: 'Cesta dat', description: 'Sběrnice a tok dat mezi CPU, RAM a diskem', tag: 'h2', icon: 'Cpu', gradient: 'from-cyan-500 to-blue-500', route: '/informatika/hardware/cesta-dat' },
                    { id: 'hw-konfig', title: 'Konfigurátor PC', description: 'Návrh počítačové sestavy na míru', tag: 'h3', icon: 'Cpu', gradient: 'from-blue-500 to-indigo-500', route: '/informatika/hardware/konfigurator' },
                    { id: 'hw-stavba', title: 'Stavba PC', description: 'Virtuální montáž základní desky a komponent', tag: 'h4', icon: 'Cpu', gradient: 'from-indigo-500 to-purple-500', route: '/informatika/hardware/stavba-pc' }
                  ]
                },
                {
                  id: 'os-zs',
                  title: 'Operační systémy',
                  description: 'Správa procesů a paměti, bootovací sekvence, přípony a klávesové zkratky.',
                  tag: 'osm',
                  icon: 'Monitor',
                  gradient: 'from-slate-600 to-gray-700',
                  route: '/informatika/os',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'os-boot', title: 'Bootování OS', description: 'Startovací fáze systému a BIOS/UEFI', tag: 'o1', icon: 'Monitor', gradient: 'from-slate-600 to-gray-700', route: '/informatika/os/boot' },
                    { id: 'os-ram', title: 'Správa RAM', description: 'Simulátor obsazení operační paměti', tag: 'o2', icon: 'Monitor', gradient: 'from-gray-700 to-slate-800', route: '/informatika/os/ram' },
                    { id: 'os-pripony', title: 'Přípony souborů', description: 'Asociace programů a formáty souborů', tag: 'o3', icon: 'Monitor', gradient: 'from-slate-700 to-gray-600', route: '/informatika/os/pripony' },
                    { id: 'os-zkratky', title: 'Klávesové zkratky', description: 'Efektivní ovládání prostředí OS', tag: 'o4', icon: 'Monitor', gradient: 'from-gray-600 to-slate-700', route: '/informatika/os/zkratky' },
                    { id: 'os-match', title: 'Přiřazování OS', description: 'Znaky a porovnání systémů Win, Linux, Mac', tag: 'o5', icon: 'Monitor', gradient: 'from-slate-800 to-gray-900', route: '/informatika/os/match' }
                  ]
                },
                {
                  id: 'komprese-formaty',
                  title: 'Komprese (pokročilejší)',
                  description: 'Barevná hloubka, RLE kódování, ztrátový JPEG a porovnání multimediálních formátů.',
                  tag: 'ko2',
                  icon: 'BoxSelect',
                  gradient: 'from-orange-500 to-red-500',
                  route: '/informatika/komprese/formaty',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'kf-velikost', title: 'Porovnání velikosti', description: 'Porovnání multimediálních souborů', tag: 'f1', icon: 'BoxSelect', gradient: 'from-orange-500 to-red-500', route: '/informatika/komprese/formaty/velikost' },
                    { id: 'kf-text', title: 'Krokování komprese', description: 'Fáze algoritmu krok za krokem', tag: 'f2', icon: 'BoxSelect', gradient: 'from-red-500 to-orange-600', route: '/informatika/komprese/formaty/text-kroky' },
                    { id: 'kf-rle', title: 'RLE komprese', description: 'Běhové kódování opakujících se hodnot', tag: 'f3', icon: 'BoxSelect', gradient: 'from-amber-500 to-red-500', route: '/informatika/komprese/formaty/rle' },
                    { id: 'kf-jpeg', title: 'JPEG simulátor', description: 'Ztrátová komprese a artefakty', tag: 'f4', icon: 'BoxSelect', gradient: 'from-red-600 to-rose-600', route: '/informatika/komprese/formaty/jpeg' }
                  ]
                },
                {
                  id: 'budoucnost',
                  title: 'Technologie budoucnosti',
                  description: 'Internet věcí (IoT), automatizace Průmyslu 4.0 a virtuální realita (VR).',
                  tag: 'fut',
                  icon: 'Sparkles',
                  gradient: 'from-yellow-500 to-amber-500',
                  route: '/informatika/budoucnost',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'fut-iot', title: 'Internet věcí (IoT)', description: 'Chytrá domácnost a senzory', tag: 't1', icon: 'Sparkles', gradient: 'from-yellow-500 to-amber-500', route: '/informatika/budoucnost/iot' },
                    { id: 'fut-prumysl', title: 'Průmysl 4.0', description: 'Robotizace a automatizovaná výroba', tag: 't2', icon: 'Sparkles', gradient: 'from-amber-500 to-orange-500', route: '/informatika/budoucnost/prumysl' },
                    { id: 'fut-vr', title: 'Virtuální realita', description: 'VR brýle a imerzivní simulace', tag: 't3', icon: 'Sparkles', gradient: 'from-orange-500 to-yellow-600', route: '/informatika/budoucnost/vr' }
                  ]
                },
                {
                  id: 'grafy',
                  title: 'Sloupcové grafy',
                  description: 'Čtení, vizualizace a interpretace datových řad pomocí sloupcových grafů.',
                  tag: 'gra',
                  icon: 'BarChart3',
                  gradient: 'from-emerald-500 to-green-600',
                  route: '/informatika/grafy',
                  hasSubchapters: false,
                },
                {
                  id: 'ar',
                  title: 'Laboratoř AR',
                  description: 'Interaktivní rozšířená realita a 3D virtuální modely přímo ve vašem mobilním telefonu.',
                  tag: 'ar',
                  icon: 'ScanFace',
                  gradient: 'from-rose-500 to-pink-500',
                  actionLabel: 'Otevřít AR Laboratoř',
                  route: '/informatika/ar',
                  hasSubchapters: false,
                }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // 2. DIVIZE: VŠEOBECNÁ INFORMATIKA SŠ (Gymnázium / Střední škola)
    // =========================================================================
    {
      id: 'stredni-skola',
      title: 'Všeobecná informatika SŠ',
      subtitle: 'Gymnázium a všeobecné SŠ',
      description: 'Pokročilé matematické a algoritmické principy kódování, stromové struktury a teorie informací.',
      icon: 'BoxSelect',
      watermarkIcon: 'Cpu',
      colorScheme: 'emerald',
      route: '/stredni-skola',
      grades: [
        {
          grade: 1,
          gradeLabel: '1. Ročník SŠ',
          pillColor: 'bg-emerald-600',
          subjects: [
            {
              id: 'inf-ss',
              title: 'Informatika pro SŠ',
              tag: 'inss',
              description: 'Matematické algoritmy kódování dat, Huffmanův strom a optimální prefixové kódy.',
              icon: 'BoxSelect',
              gradient: 'from-emerald-600 to-teal-600',
              route: '/stredni-skola/1',
              chapters: [
                {
                  id: 'komprese-algoritmy',
                  title: 'Komprese algoritmy',
                  description: 'Matematické a stromové algoritmy kódování dat, Huffmanův optimální strom.',
                  tag: 'cpa',
                  icon: 'BoxSelect',
                  gradient: 'from-emerald-600 to-teal-600',
                  route: '/informatika/komprese/algoritmy',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'huffman', title: 'Huffmanův algoritmus', description: 'Stavba optimálního prefixového binárního stromu', tag: 'huf', icon: 'BoxSelect', gradient: 'from-emerald-600 to-teal-600', route: '/informatika/komprese/algoritmy/huffman' },
                    { id: 'kontrolni-soucet', title: 'Kontrolní součet', description: 'Detekce chyb a hashování dat', tag: 'chk', icon: 'ShieldCheck', gradient: 'from-teal-600 to-emerald-700', route: '/informatika/komprese/kontrolni-soucet' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // =========================================================================
    // 3. DIVIZE: SPECIALIZOVANÁ IT (Odborné SŠ předměty)
    // =========================================================================
    {
      id: 'specializovana-it',
      title: 'Specializovaná IT',
      subtitle: 'Odborná informatika pro IT obory',
      description: 'Ponořte se do hloubky počítačových věd. Operační systémy, struktury na disku, simulátory paměti, vývoj her a architektura OS.',
      icon: 'Cpu',
      watermarkIcon: 'Database',
      colorScheme: 'purple',
      route: '/specializovana',
      grades: [
        // 1. ROČNÍK SŠ
        {
          grade: 1,
          gradeLabel: '1. Ročník',
          pillColor: 'bg-purple-600',
          subjects: [
            {
              id: 'ops1',
              title: 'Operační systémy 1',
              tag: 'ops1',
              description: 'Základy architektury OS, bootování, simulátory a souborové systémy.',
              icon: 'Cpu',
              gradient: 'from-purple-600 to-indigo-600',
              route: '/specializovana/operacni-systemy-1',
              chapters: [
                {
                  id: 'win-install',
                  title: 'Instalace OS',
                  description: 'Simulátor instalace Windows 11 pro IT techniky.',
                  tag: 'win',
                  icon: 'MonitorUp',
                  gradient: 'from-purple-600 to-indigo-600',
                  actionLabel: 'Spustit simulátor',
                  route: '/specializovana/operacni-systemy-1/instalace',
                  hasSubchapters: false
                },
                {
                  id: 'os-hardware',
                  title: 'Základy hardwaru pro OS',
                  description: 'Hardware z pohledu operačního systému a komunikace s komponentami.',
                  tag: 'osh',
                  icon: 'Cpu',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/hardware',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'von-neumann', title: 'Von Neumannova architektura', description: 'Sběrnice, řadič a registry procesoru', tag: 'vna', icon: 'Cpu', gradient: 'from-indigo-600 to-purple-700', route: '/specializovana/operacni-systemy-1/hardware/von-neumann' },
                    { id: 'ram', title: 'Operační paměť RAM', description: 'Architektura paměťových buněk a adresace', tag: 'ram', icon: 'Cpu', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy-1/hardware/ram' }
                  ]
                },
                {
                  id: 'os-intro',
                  title: 'Úvod do OS',
                  description: 'Základní pojmy, kernel, vrstvy systému a komunikace hardwaru.',
                  tag: 'osi',
                  icon: 'Monitor',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/uvod',
                  hasSubchapters: false
                },
                {
                  id: 'os-arch',
                  title: 'Architektura OS',
                  description: 'Struktura a moduly moderního operačního systému.',
                  tag: 'osa',
                  icon: 'Layers',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/architektura',
                  hasSubchapters: false
                },
                {
                  id: 'os-test-practice',
                  title: 'Procvičování na test 1',
                  description: 'Interaktivní příprava a procvičování: 11 otázek z hardwaru a základů OS s okamžitým vyhodnocením a vysvětlením.',
                  tag: 'KVÍZ',
                  icon: 'HelpCircle',
                  gradient: 'from-emerald-500 to-teal-600',
                  actionLabel: 'Spustit procvičování',
                  route: '/specializovana/operacni-systemy-1/test01-rozbor',
                  hasSubchapters: false
                },
                {
                  id: 'os-test',
                  title: 'Hodnocená práce',
                  description: 'Hardware, úvod do OS a architektura OS. 45 minut, 50 bodů. Odemčení na heslo.',
                  tag: 'TEST',
                  icon: 'ShieldCheck',
                  gradient: 'from-rose-500 to-red-600',
                  actionLabel: 'Otevřít zadání',
                  route: '/specializovana/operacni-systemy-1/test01',
                  hasSubchapters: false,
                  isTest: true
                },
                {
                  id: 'os-history',
                  title: 'Evoluce OS',
                  description: 'Historie operačních systémů, přehled distribucí a rodiny OS.',
                  tag: 'osh',
                  icon: 'Clock',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/vyvoj',
                  hasSubchapters: false
                },
                {
                  id: 'os-boot-seq',
                  title: 'Start systému (Boot)',
                  description: 'Průběh startu počítače od BIOSu po spuštění operačního systému.',
                  tag: 'osb',
                  icon: 'Hourglass',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/boot',
                  hasSubchapters: false
                },
                {
                  id: 'os-virt',
                  title: 'Virtualizace',
                  description: 'Hypervisory, virtuální stroje a izolace prostředí.',
                  tag: 'vrt',
                  icon: 'Layers',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/virtualizace',
                  hasSubchapters: false
                },
                {
                  id: 'fs-menu',
                  title: 'Souborový systém a disky',
                  description: 'FAT, NTFS, alokace dat, klastry a simulátory disků.',
                  tag: 'fs',
                  icon: 'HardDrive',
                  gradient: 'from-purple-600 to-indigo-500',
                  route: '/specializovana/operacni-systemy-1/souborove-systemy',
                  hasSubchapters: true,
                  subchapters: [
                    {
                      id: 'fs-uvod',
                      title: 'Úvod a architektura',
                      description: 'K čemu slouží souborový systém a jak si předává data s hardwarem a aplikacemi.',
                      tag: 'FS1',
                      icon: 'Layers',
                      gradient: 'from-blue-500 to-indigo-500',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/uvod',
                      orderNumber: 1,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'fs-media',
                      title: 'Paměťová média',
                      description: 'HDD a SSD pod lupou. Plotny, stopy, sektory, NAND paměť a proč je SSD tak rychlé.',
                      tag: 'FS2',
                      icon: 'Disc3',
                      gradient: 'from-sky-500 to-cyan-500',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/media',
                      orderNumber: 2,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'fs-deleni',
                      title: 'Dělení disku',
                      description: 'Oddíly a svazky, MBR vs. GPT, formátování a co je na disku potřeba ke startu OS.',
                      tag: 'FS3',
                      icon: 'PieChart',
                      gradient: 'from-emerald-500 to-teal-500',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/deleni-disku',
                      orderNumber: 3,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'fs-fat',
                      title: 'Systém souborů',
                      description: 'Od hardwaru k OS. Clustery, tabulka souborů, vnitřní fragmentace a mýtus o smazaných datech.',
                      tag: 'FS4',
                      icon: 'Table2',
                      gradient: 'from-purple-500 to-fuchsia-500',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/alokace-fat',
                      orderNumber: 4,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'fs-frag',
                      title: 'Fragmentace a údržba',
                      description: 'Jak vzniká fragmentace, defragmentace vs. TRIM, kontrola disku a vadné sektory.',
                      tag: 'FS5',
                      icon: 'Wrench',
                      gradient: 'from-amber-500 to-orange-500',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/fragmentace',
                      orderNumber: 5,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'fs-read',
                      title: 'Architektura v praxi',
                      description: 'Simulace toku dat při čtení souboru. Propojení OS, FAT tabulky a samotného disku.',
                      tag: 'FS6',
                      icon: 'AppWindow',
                      gradient: 'from-rose-500 to-red-500',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/cteni-souboru',
                      orderNumber: 6,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'fs-adv',
                      title: 'Pokročilá témata',
                      description: 'Alokační strategie (First/Best Fit) a další komplexní principy z univerzitních osnov.',
                      tag: 'FS-ADV',
                      icon: 'Database',
                      gradient: 'from-slate-600 to-slate-800',
                      route: '/specializovana/operacni-systemy-1/souborove-systemy/pokrocile',
                      orderNumber: 99,
                      actionLabel: 'Otevřít kapitolu'
                    }
                  ]
                },
                {
                  id: 'proc-mem',
                  title: 'Procesy a paměť',
                  description: 'Vznik procesu, identifikace PID, paměťový prostor a střídání procesů na CPU.',
                  tag: 'pm',
                  icon: 'Cpu',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/procesy',
                  hasSubchapters: true,
                  subchapters: [
                    {
                      id: 'proc-intro',
                      title: 'Úvod a vznik procesu',
                      description: 'Co je program, jak z něj vznikne proces, identifikace PID a rozdělení na kód a data.',
                      tag: 'PR1',
                      icon: 'Layers',
                      gradient: 'from-blue-500 to-indigo-500',
                      route: '/specializovana/operacni-systemy-1/procesy/uvod',
                      orderNumber: 1,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'proc-states',
                      title: 'Životní cyklus a stavy',
                      description: 'Stavový diagram procesu: Běžící, Připravený a Čekající na I/O operace disku.',
                      tag: 'PR2',
                      icon: 'Activity',
                      gradient: 'from-purple-500 to-indigo-500',
                      route: '/specializovana/operacni-systemy-1/procesy/stavy',
                      orderNumber: 2,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'proc-threads',
                      title: 'Vlákna (Threads)',
                      description: 'Rozdíl mezi těžkým procesem a lehkým vláknem, sdílená paměť a moderní multitasking.',
                      tag: 'PR3',
                      icon: 'GitBranch',
                      gradient: 'from-emerald-500 to-teal-500',
                      route: '/specializovana/operacni-systemy-1/procesy/vlakna',
                      orderNumber: 3,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'proc-adv',
                      title: 'Pokročilá témata',
                      description: 'Plánování procesoru (FIFO, Round Robin), alokátor paměti a krokování instrukcí.',
                      tag: 'PR-ADV',
                      icon: 'Database',
                      gradient: 'from-slate-600 to-slate-800',
                      route: '/specializovana/operacni-systemy-1/procesy/pokrocile',
                      orderNumber: 99,
                      actionLabel: 'Otevřít kapitolu'
                    }
                  ]
                },
                outlineToChapter(OSS1_GUI),
                outlineToChapter(OSS1_CLI),
                outlineToChapter(OSS1_USERS),
                outlineToChapter(OSS1_SOFTWARE),
                {
                  id: 'os-devices',
                  title: 'Správa zařízení a ovladače',
                  description: 'Architektura ovladačů, Plug and Play, Správce zařízení, tiskárny a nástroj pnputil.',
                  tag: 'dev',
                  icon: 'Cpu',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/zarizeni',
                  hasSubchapters: false
                },
                {
                  id: 'os-scheduler',
                  title: 'Plánovač úloh a automatický provoz',
                  description: 'Konzole taskschd.msc, spouštěče a akce, běh pod účtem SYSTEM a příkaz schtasks.',
                  tag: 'plan',
                  icon: 'Clock',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy-1/planovac',
                  hasSubchapters: false
                }
              ]
            },
            {
              id: 'prg1',
              title: 'Programování a hry 1',
              tag: 'prg1',
              description: 'Základy algoritmizace, vizuální blokový jazyk Scratch a herní projekty.',
              icon: 'Code',
              gradient: 'from-emerald-600 to-teal-600',
              route: '/specializovana/programovani',
              chapters: [
                {
                  id: 'scratch',
                  title: 'Scratch projekty',
                  description: 'Vizuální blokové programování, proměnné, podmínky, cykly a tvorba her.',
                  tag: 'scr',
                  icon: 'Code',
                  gradient: 'from-emerald-600 to-teal-600',
                  route: '/specializovana/programovani/scratch',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'scr-uvod', title: 'Úvod do Scratche', description: 'Prostředí, postavy a základní bloky', tag: 's1', icon: 'Code', gradient: 'from-emerald-600 to-teal-600', route: '/specializovana/programovani/scratch' }
                  ]
                },
                {
                  id: 'raycaster',
                  title: '3D Raycaster hra',
                  description: 'Herní retro engine ve stylu Wolfenstein 3D, raycasting a vykreslování stěn.',
                  tag: 'ray',
                  icon: 'Code',
                  gradient: 'from-emerald-600 to-teal-600',
                  route: '/specializovana/programovani/projekty/raycaster',
                  hasSubchapters: false
                }
              ]
            }
          ]
        },

        // 2. ROČNÍK SŠ
        {
          grade: 2,
          gradeLabel: '2. Ročník',
          pillColor: 'bg-pink-600',
          subjects: [
            {
              id: 'ops2',
              title: 'Operační systémy 2',
              tag: 'ops2',
              description: 'Zálohování, bezpečnost Windows 11, pokročilá konfigurace, Active Directory a serverové služby.',
              icon: 'Cpu',
              gradient: 'from-blue-600 to-cyan-600',
              route: '/specializovana/operacni-systemy-2',
              chapters: [
                {
                  id: 'zalohovani',
                  title: 'Zálohování dat',
                  description: 'Metody zálohování, pravidlo 3-2-1, inkrementální a cloudové zálohy.',
                  tag: 'bak',
                  icon: 'HardDrive',
                  gradient: 'from-blue-600 to-cyan-600',
                  route: '/specializovana/operacni-systemy-2/zalohovani',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'bak-uvod', title: 'Úvod do zálohování', description: 'Význam záloh a pravidlo 3-2-1', tag: 'b1', icon: 'HardDrive', gradient: 'from-blue-600 to-cyan-600', route: '/specializovana/operacni-systemy-2/zalohovani/uvod' },
                    { id: 'bak-manual', title: 'Manuální záloha', description: 'Kopírování a struktura složek', tag: 'b2', icon: 'HardDrive', gradient: 'from-blue-600 to-cyan-600', route: '/specializovana/operacni-systemy-2/zalohovani/manualni' },
                    { id: 'bak-system', title: 'Systémové nástroje', description: 'Zálohování ve Windows a historie souborů', tag: 'b3', icon: 'HardDrive', gradient: 'from-blue-600 to-cyan-600', route: '/specializovana/operacni-systemy-2/zalohovani/system' },
                    { id: 'bak-cloud', title: 'Cloudové zálohy', description: 'Synchronizace a vzdálená úložiště', tag: 'b4', icon: 'HardDrive', gradient: 'from-blue-600 to-cyan-600', route: '/specializovana/operacni-systemy-2/zalohovani/cloud' },
                    { id: 'bak-cobian', title: 'Cobian Reflector', description: 'Konfigurace automatizovaného zálohování', tag: 'b5', icon: 'HardDrive', gradient: 'from-blue-600 to-cyan-600', route: '/specializovana/operacni-systemy-2/zalohovani/cobian' }
                  ]
                },
                {
                  id: 'bezpecnost',
                  title: 'Bezpečnost 1',
                  description: 'Zabezpečení Windows 11, analýza procesů, Sandbox, Defender, Firewall a šifrování.',
                  tag: 'sec',
                  icon: 'ShieldCheck',
                  gradient: 'from-blue-600 to-cyan-600',
                  route: '/specializovana/operacni-systemy-2/bezpecnost',
                  hasSubchapters: true,
                  subchapters: [
                    {
                      id: 'bezp-malware',
                      title: 'Úvod do malwaru a principy nákazy',
                      description: 'Proč CPU vykoná škodlivý kód, typologie 6 hrozeb, simulace mazání disku a chování v RAM.',
                      tag: 'BZ1',
                      icon: 'ShieldAlert',
                      gradient: 'from-blue-600 to-indigo-600',
                      route: '/specializovana/operacni-systemy-2/bezpecnost/malware',
                      orderNumber: 1,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    {
                      id: 'bezp-procesy-certifikaty',
                      title: 'Správa procesů a digitální certifikáty',
                      description: 'Procesní strom, ověřování podpisů Authenticode, reputační cloud a praktická laboratoř v OS.',
                      tag: 'BZ2',
                      icon: 'FileCheck',
                      gradient: 'from-blue-600 to-cyan-600',
                      route: '/specializovana/operacni-systemy-2/bezpecnost/procesy-a-certifikaty',
                      orderNumber: 2,
                      actionLabel: 'Otevřít kapitolu'
                    },
                    // BZ3–BZ9: zatím přehledové stránky (viz registry/curriculum/outlines)
                    ...outlineToSubchapters(OSS2_BEZPECNOST)
                  ]
                },
                outlineToChapter(OSS2_POKROCILA),
                outlineToChapter(OSS2_AD),
                outlineToChapter(OSS2_SLUZBY)
              ]
            },
            {
              id: 'prg2',
              title: 'Programování a hry 2',
              tag: 'prg2',
              description: 'Výuka programovacího jazyka Python, grafika v Tkinter a interaktivní úlohy.',
              icon: 'Code',
              gradient: 'from-amber-500 to-orange-600',
              route: '/specializovana/programovani-2',
              chapters: [
                {
                  id: 'python-zaklady',
                  title: 'Python Výpisy a výrazy',
                  description: 'Interaktivní konzole, matematické výpočty, priority operací a chybová hlášení.',
                  tag: 'py1',
                  icon: 'Terminal',
                  gradient: 'from-amber-500 to-orange-500',
                  route: '/specializovana/programovani-2/python-zaklady',
                  hasSubchapters: false
                },
                {
                  id: 'python-promenne',
                  title: 'Python Proměnné',
                  description: 'Krabičky v paměti, operace a práce s proměnnými.',
                  tag: 'py2',
                  icon: 'Folder',
                  gradient: 'from-orange-500 to-amber-600',
                  route: '/specializovana/programovani-2/python-promenne',
                  hasSubchapters: false
                },
                {
                  id: 'python-program',
                  title: 'První Program',
                  description: 'Příkaz print, psaní prvních skriptů, ukládání souborů a textové obrázky.',
                  tag: 'py3',
                  icon: 'Code',
                  gradient: 'from-rose-500 to-pink-600',
                  route: '/specializovana/programovani-2/python-program',
                  hasSubchapters: false
                },
                {
                  id: 'python-vypisy',
                  title: 'Proměnné a výpisy',
                  description: 'Kombinování textu s proměnnými, matematické vzorce a formátování.',
                  tag: 'py4',
                  icon: 'Code',
                  gradient: 'from-purple-500 to-indigo-600',
                  route: '/specializovana/programovani-2/python-vypisy',
                  hasSubchapters: false
                },
                {
                  id: 'python-kresleni',
                  title: 'Kreslení v Tkinter',
                  description: 'Grafické plátno, kreslení tvarů a souřadnicový systém počítače.',
                  tag: 'py5',
                  icon: 'Palette',
                  gradient: 'from-sky-500 to-blue-600',
                  route: '/specializovana/programovani-2/python-kresleni',
                  hasSubchapters: false
                },
                {
                  id: 'python-barvy',
                  title: 'Barvy a Vlajky',
                  description: 'Vybarvování tvarů, kreslení státních vlajek a překrývání vrstev.',
                  tag: 'py6',
                  icon: 'Palette',
                  gradient: 'from-emerald-500 to-teal-600',
                  route: '/specializovana/programovani-2/python-barvy',
                  hasSubchapters: false
                },
                {
                  id: 'python-kresleni-s-promennymi',
                  title: 'Kreslení s proměnnými',
                  description: 'Matematika v souřadnicích, posouvání tvarů a hledání středů.',
                  tag: 'py7',
                  icon: 'Code',
                  gradient: 'from-indigo-500 to-violet-600',
                  route: '/specializovana/programovani-2/python-kresleni-s-promennymi',
                  hasSubchapters: false
                },
                {
                  id: 'python-podprogramy',
                  title: 'Podprogramy',
                  description: 'Vlastní příkazy, skládání funkcí a kreslení složitých obrazců.',
                  tag: 'py8',
                  icon: 'Code',
                  gradient: 'from-amber-500 to-yellow-600',
                  route: '/specializovana/programovani-2/python-podprogramy',
                  hasSubchapters: false
                },
                {
                  id: 'python-nahoda',
                  title: 'Náhoda',
                  description: 'Generování čísel, házení kostkou a náhodné generování obrazců.',
                  tag: 'py9',
                  icon: 'Sparkles',
                  gradient: 'from-fuchsia-500 to-pink-600',
                  route: '/specializovana/programovani-2/python-nahoda',
                  hasSubchapters: false
                },
                {
                  id: 'python-text',
                  title: 'Kreslení textu',
                  description: 'Vypisování slov na grafickou plochu a popisky obrazců.',
                  tag: 'py10',
                  icon: 'Code',
                  gradient: 'from-cyan-500 to-teal-600',
                  route: '/specializovana/programovani-2/python-text',
                  hasSubchapters: false
                },
                {
                  id: 'python-cyklus',
                  title: 'Program s opakováním',
                  description: 'Základy for cyklu, opakování příkazů a kreslení tisíců tvarů.',
                  tag: 'py11',
                  icon: 'Code',
                  gradient: 'from-rose-500 to-red-600',
                  route: '/specializovana/programovani-2/python-cyklus',
                  hasSubchapters: false
                },
                {
                  id: 'python-promenna-cyklu',
                  title: 'Proměnná cyklu',
                  description: 'Využití čísla kroku \'i\' pro posouvání tvarů a pokročilou matematiku.',
                  tag: 'py12',
                  icon: 'Code',
                  gradient: 'from-violet-500 to-purple-600',
                  route: '/specializovana/programovani-2/python-promenna-cyklu',
                  hasSubchapters: false
                },
                {
                  id: 'python-vyrazy',
                  title: 'Výrazy v cyklu',
                  description: 'Postupné přičítání hodnot k proměnné (x = x + 10) a akumulace sumy.',
                  tag: 'py13',
                  icon: 'Code',
                  gradient: 'from-orange-500 to-amber-600',
                  route: '/specializovana/programovani-2/python-vyrazy',
                  hasSubchapters: false
                },
                {
                  id: 'python-elipsy',
                  title: 'Elipsy a kruhy',
                  description: 'Kreslení oblin, kružnic, sněhuláků, stromů a dopravních značek.',
                  tag: 'py14',
                  icon: 'Shapes',
                  gradient: 'from-teal-500 to-emerald-600',
                  route: '/specializovana/programovani-2/python-elipsy',
                  hasSubchapters: false
                },
                {
                  id: 'python-kruhy-a-cykly',
                  title: 'Kruhy a cykly',
                  description: 'Náhodný výběr choice, protnutí elips a kreslení desky a mincí.',
                  tag: 'py15',
                  icon: 'Code',
                  gradient: 'from-yellow-500 to-amber-600',
                  route: '/specializovana/programovani-2/python-kruhy-a-cykly',
                  hasSubchapters: false
                },
                {
                  id: 'python-vetveni',
                  title: 'Větvení (if/else)',
                  description: 'Rozhodování počítače, podmínky a interaktivní chování programu.',
                  tag: 'py16',
                  icon: 'GitBranch',
                  gradient: 'from-red-500 to-rose-600',
                  route: '/specializovana/programovani-2/python-vetveni',
                  hasSubchapters: false
                },
                {
                  id: 'python-vetveni-a-konstrukce',
                  title: 'Větvení a konstrukce',
                  description: 'Rozbočky uvnitř for cyklů pro střídání tvarů a animaci dne a noci.',
                  tag: 'py17',
                  icon: 'GitBranch',
                  gradient: 'from-indigo-500 to-blue-600',
                  route: '/specializovana/programovani-2/python-vetveni-a-konstrukce',
                  hasSubchapters: false
                },
                {
                  id: 'python-vnorene-vetveni',
                  title: 'Vnořené větvení',
                  description: 'Podmínky uvnitř podmínek, počítadla a operátory == a !=.',
                  tag: 'py18',
                  icon: 'GitBranch',
                  gradient: 'from-pink-500 to-rose-600',
                  route: '/specializovana/programovani-2/python-vnorene-vetveni',
                  hasSubchapters: false
                },
                {
                  id: 'python-podprogram-s-parametrem',
                  title: 'Parametry funkcí',
                  description: 'Tajemství v závorkách. Posílání argumentů a interaktivní kvízy.',
                  tag: 'py19',
                  icon: 'Code',
                  gradient: 'from-emerald-500 to-teal-600',
                  route: '/specializovana/programovani-2/python-podprogram-s-parametrem',
                  hasSubchapters: false
                },
                {
                  id: 'python-kresleni-mysi',
                  title: 'Kreslení myší',
                  description: 'Události z myši (motion, press), Canvas bind a efekt spreje!',
                  tag: 'py20',
                  icon: 'Code',
                  gradient: 'from-cyan-500 to-blue-600',
                  route: '/specializovana/programovani-2/python-kresleni-mysi',
                  hasSubchapters: false
                }
              ]
            }
          ]
        },

        // 3. ROČNÍK SŠ
        {
          grade: 3,
          gradeLabel: '3. Ročník',
          pillColor: 'bg-emerald-600',
          subjects: [
            {
              id: 'ops3',
              title: 'Operační systémy 3',
              tag: 'ops3',
              description: 'Linux a jeho správa, verzování v Gitu, kyberbezpečnost a týmová spolupráce.',
              icon: 'Terminal',
              gradient: 'from-slate-700 to-slate-900',
              route: '/specializovana/operacni-systemy-3',
              analysis: {
                goal: 'Přejít z role správce Windows do role správce Linuxu a bezpečnostního analytika, ovládat verzování v Gitu a pracovat v týmu s plánovacími a komunikačními nástroji.',
                targetProfile: 'Absolvent 3. ročníku spravuje Linuxový server z příkazové řádky, pracuje s repozitářem v Gitu, rozumí útokům i obraně a umí se podílet na týmovém projektu.',
                expectedOutcomes: [
                  'Orientace v Linuxu: souborový systém, oprávnění, balíčky, služby, logy a plánování úloh.',
                  'Vzdálená správa serveru přes SSH a nastavení firewallu.',
                  'Práce s Gitem: commity, větve, slučování a GitHub.',
                  'Pochopení útoků a obrany: kill chain, OSINT, zranitelnosti a bezpečnost webu.',
                  'Znalost právních a etických pravidel kybernetické bezpečnosti.',
                  'Plánování a komunikace v týmu (Kanban, harmonogram, týmové nástroje).'
                ],
                steps: [
                  {
                    step: '1. Linux (~24 h)',
                    description: 'Příkazová řádka, souborový systém, oprávnění, balíčky, služby, logy a SSH.',
                    why: 'Stejné pojmy jako ve Windows z 2. ročníku, jen v jiném prostředí – studenti vidí, že principy jsou obecné.'
                  },
                  {
                    step: '2. Git (~8 h)',
                    description: 'Verzování, větve a spolupráce přes GitHub.',
                    why: 'Navazuje na příkazovou řádku z Linuxu a je potřeba pro závěrečný týmový projekt.'
                  },
                  {
                    step: '3. Kyberbezpečnost (~20 h)',
                    description: 'Útočník, právo, průzkum, zranitelnosti, web, útoky na AD a závěrečné CTF.',
                    why: 'Zastřešuje Windows i Linux a staví na Bezpečnosti a Active Directory z 2. ročníku.'
                  },
                  {
                    step: '4. Týmová spolupráce (~10 h)',
                    description: 'Kanban, harmonogram, komunikační nástroje a závěrečný týmový projekt.',
                    why: 'Propojí Git, plánování a komunikaci v jednom projektu a připraví na práci v IT týmu.'
                  }
                ],
                hardwareRequirements: ['Počítače s VirtualBoxem', 'Virtuální stroje s Linuxem a Windows'],
                softwareStack: ['Ubuntu Server', 'Git a GitHub', 'Nmap', 'Trello / Jira (plánování)', 'Teams / Slack (komunikace)']
              },
              chapters: [
                outlineToChapter(OSS3_LINUX),
                outlineToChapter(OSS3_GIT),
                outlineToChapter(OSS3_CYBER),
                outlineToChapter(OSS3_TEAM)
              ]
            },
            {
              id: 'rob3',
              title: 'Robotika 1',
              tag: 'rob3',
              description: 'Mikrokontroléry, architektura MCU, senzorika s IOKit, diferenciální podvozek Cutebot a IoT v MicroPythonu.',
              icon: 'Bot',
              gradient: 'from-emerald-600 to-teal-700',
              route: '/specializovana/robotika-3',
              analysis: {
                goal: 'Osvojit si architekturu vestavných systémů, práci se senzorickými a analogovými signály, řízení diferenciálního podvozku a základy IoT komunikace v jazyce MicroPython.',
                targetProfile: 'Absolvent 3. ročníku rozumí principům hardware-software rozhraní. Dokáže samostatně zapojit a naprogramovat senzorický systém, odfiltrovat šum měření, řídit motory přes PWM, navrhnout stavový automat (FSM) pro autonomní navigaci a zprostředkovat bezdrátovou telemetrii.',
                expectedOutcomes: [
                  'Samostatná tvorba neblokujícího embedded kódu v MicroPythonu bez použití blokujícího sleep().',
                  'Konstrukce a implementace konečného stavového automatu (FSM) pro řízení logiky robotu.',
                  'Čtení a softwarová filtrace dat z analogových i digitálních I2C/SPI senzorů (plovoucí průměr, hystereze).',
                  'Řízení stejnosměrných motorů pomocí PWM a H-můstku, kalibrace diferenciálního podvozku.',
                  'Algoritmizace autonomního sledování trasy pomocí proporcionálního P/PD regulátoru.',
                  'Využití bezdrátové komunikace na 2.4 GHz (Radio pakety) pro telemetrii a dálkové ovládání.'
                ],
                steps: [
                  {
                    step: '1. Architektura MCU & MicroPython (1:1 na micro:bitu)',
                    description: 'Přechod z PC Pythonu na embedded svět, GPIO piny, práce s časem (ticks_ms) a stavový automat.',
                    why: 'Eliminace černých pasažérů individuální prací 1:1. Žáci musí pochopit hardwarové limity a neblokující architekturu dříve, než začnou řídit motory.'
                  },
                  {
                    step: '2. Senzorika, ADC & Sběrnice (IOKit v 5 dvojicích)',
                    description: 'Analogové vzorkování napětí, protokol I2C, OLED displej, filtrace šumu a hystereze.',
                    why: 'Fyzický svět není binární – signály šumí a kolísají. Bez kalibrace a filtrace nelze postavit spolehlivého autonomního robota.'
                  },
                  {
                    step: '3. Pohony & Diferenciální kinematika (Cutebot)',
                    description: 'DC motory, H-můstek, PWM střída, kalibrace přímého směru a proporcionální brzdění.',
                    why: 'Cutebot je hotové vozítko, takže se žáci nezdržují mechanickou montáží a ihned aplikují matematiku motoriky.'
                  },
                  {
                    step: '4. Autonomní navigace po čáře (Cutebot)',
                    description: 'IR reflexní senzory, srovnání Bang-Bang řízení, stavového automatu a P/PD regulátoru.',
                    why: 'Klíčový didaktický přechod od jednoduchého kmitavého řízení k plynulé regulaci a rozhodovacím algoritmům.'
                  },
                  {
                    step: '5. IoT & Bezdrátová telemetrie (micro:bit Radio)',
                    description: 'Paketový přenos dat na 2.4 GHz, dálkové ovládání akcelerometrem a distribuovaná senzorová síť.',
                    why: 'Příprava na Průmysl 4.0 – robotika v praxi nefunguje izolovaně, ale komunikuje v síti s ostatními uzly a dispečinkem.'
                  }
                ],
                hardwareRequirements: ['30x BBC micro:bit v2', '10x Elecfreaks Cutebot', '10x Elecfreaks IOKit', 'OLED displeje SSD1306', 'IR a ultrazvukové senzory'],
                softwareStack: ['MicroPython', 'VS Code (Serial monitor / REPL)', 'Python Editor for micro:bit (WebUSB)']
              },
              chapters: [
                {
                  id: 'rob3-mcu',
                  title: 'Architektura MCU a MicroPython',
                  description: 'Embedded systémy, GPIO piny, vnitřní periferie a neblokující stavový automat.',
                  tag: 'mcu',
                  icon: 'Cpu',
                  gradient: 'from-emerald-600 to-teal-700',
                  route: '/specializovana/robotika-3/mcu',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob3-mcu-gpio', title: 'GPIO a digitální signály', description: 'Ovládání vstupů/výstupů a logické úrovně', tag: 'gp', icon: 'Cpu', gradient: 'from-emerald-600 to-teal-700', route: '/specializovana/robotika-3/mcu/gpio' },
                    { id: 'rob3-mcu-periferie', title: 'Periferie micro:bitu', description: 'LED matice, tlačítka a interní senzory', tag: 'mb', icon: 'Cpu', gradient: 'from-emerald-600 to-teal-700', route: '/specializovana/robotika-3/mcu/periferie' },
                    { id: 'rob3-mcu-cas', title: 'Neblokující časování', description: 'Eliminace sleep() pomocí ticks_ms()', tag: 'tm', icon: 'Clock', gradient: 'from-emerald-600 to-teal-700', route: '/specializovana/robotika-3/mcu/casovani' },
                    { id: 'rob3-mcu-fsm', title: 'Stavový automat (FSM)', description: 'Řízení logiky zařízení konečným automatem', tag: 'fsm', icon: 'Layers', gradient: 'from-emerald-600 to-teal-700', route: '/specializovana/robotika-3/mcu/fsm' }
                  ]
                },
                {
                  id: 'rob3-senzory',
                  title: 'Senzory a sběrnice (IOKit)',
                  description: 'A/D převodník, analogové vzorkování, protokol I2C a filtrace šumu.',
                  tag: 'snz',
                  icon: 'Activity',
                  gradient: 'from-teal-600 to-cyan-700',
                  route: '/specializovana/robotika-3/senzory',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob3-snz-adc', title: 'A/D převod & analogová čidla', description: 'Vzorkování napětí, fotorezistor a potenciometr', tag: 'adc', icon: 'Activity', gradient: 'from-teal-600 to-cyan-700', route: '/specializovana/robotika-3/senzory/adc' },
                    { id: 'rob3-snz-i2c', title: 'I2C protokol a OLED displej', description: 'Adresace zařízení a zobrazení telemetrie', tag: 'i2c', icon: 'Monitor', gradient: 'from-teal-600 to-cyan-700', route: '/specializovana/robotika-3/senzory/i2c' },
                    { id: 'rob3-snz-us', title: 'Ultrazvukový senzor', description: 'Měření vzdálenosti metodou Time-of-Flight', tag: 'tof', icon: 'Radio', gradient: 'from-teal-600 to-cyan-700', route: '/specializovana/robotika-3/senzory/ultrazvuk' },
                    { id: 'rob3-snz-flt', title: 'Filtrace dat a hystereze', description: 'Plovoucí průměr a eliminace falešných sepnutí', tag: 'flt', icon: 'Activity', gradient: 'from-teal-600 to-cyan-700', route: '/specializovana/robotika-3/senzory/filtrace' }
                  ]
                },
                {
                  id: 'rob3-cutebot',
                  title: 'Pohony a Cutebot',
                  description: 'DC motory, H-můstek, PWM regulace a diferenciální kinematika.',
                  tag: 'cut',
                  icon: 'Cog',
                  gradient: 'from-cyan-600 to-blue-700',
                  route: '/specializovana/robotika-3/cutebot',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob3-cut-pwm', title: 'DC motory a PWM', description: 'H-můstek a střída signálu pro regulaci otáček', tag: 'pwm', icon: 'Cog', gradient: 'from-cyan-600 to-blue-700', route: '/specializovana/robotika-3/cutebot/motory' },
                    { id: 'rob3-cut-kin', title: 'Diferenciální kinematika', description: 'Kalibrace přímého směru a otáčení na místě', tag: 'kin', icon: 'Compass', gradient: 'from-cyan-600 to-blue-700', route: '/specializovana/robotika-3/cutebot/kinematika' },
                    { id: 'rob3-cut-brk', title: 'Detekce překážek', description: 'Proporcionální brzdění před překážkou', tag: 'brk', icon: 'Radio', gradient: 'from-cyan-600 to-blue-700', route: '/specializovana/robotika-3/cutebot/prekazky' },
                    { id: 'rob3-cut-rgb', title: 'RGB světlomety a tóny', description: 'Stavová signalizace a piezo telemetrie', tag: 'rgb', icon: 'Palette', gradient: 'from-cyan-600 to-blue-700', route: '/specializovana/robotika-3/cutebot/telemetrie' }
                  ]
                },
                {
                  id: 'rob3-navigace',
                  title: 'Autonomní navigace',
                  description: 'IR reflexní senzory, Bang-Bang vs. stavový automat a P-regulátor trati.',
                  tag: 'nav',
                  icon: 'Compass',
                  gradient: 'from-blue-600 to-indigo-700',
                  route: '/specializovana/robotika-3/navigace',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob3-nav-ir', title: 'IR senzory povrchu', description: 'Odrazivost podkladu a kalibrace prahů', tag: 'ir', icon: 'Activity', gradient: 'from-blue-600 to-indigo-700', route: '/specializovana/robotika-3/navigace/ir-senzory' },
                    { id: 'rob3-nav-kriz', title: 'Stavový automat pro trať', description: 'Řešení odboček, pravoúhlých zatáček a křižovatek', tag: 'fsm', icon: 'Layers', gradient: 'from-blue-600 to-indigo-700', route: '/specializovana/robotika-3/navigace/krizovatky' },
                    { id: 'rob3-nav-pid', title: 'Proporcionální regulátor (P)', description: 'Plynulé vyrovnávání směru bez kmitání', tag: 'pid', icon: 'Compass', gradient: 'from-blue-600 to-indigo-700', route: '/specializovana/robotika-3/navigace/pid' },
                    { id: 'rob3-nav-sumo', title: 'Aréna Sumo & Bludiště', description: 'Autonomní vyhledávání cíle a únik ze zóny', tag: 'sum', icon: 'Bot', gradient: 'from-blue-600 to-indigo-700', route: '/specializovana/robotika-3/navigace/sumo' }
                  ]
                },
                {
                  id: 'rob3-iot',
                  title: 'Internet věcí & Telemetrie',
                  description: 'Micro:bit Radio pakety, dálkové ovládání a distribuovaná senzorová síť.',
                  tag: 'iot',
                  icon: 'Radio',
                  gradient: 'from-indigo-600 to-violet-700',
                  route: '/specializovana/robotika-3/iot',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob3-iot-rad', title: 'Micro:bit Radio protokol', description: 'Bezdrátový přenos paketů na 2.4 GHz', tag: 'rad', icon: 'Radio', gradient: 'from-indigo-600 to-violet-700', route: '/specializovana/robotika-3/iot/radio' },
                    { id: 'rob3-iot-rc', title: 'Dálkové řízení akcelerometrem', description: 'Naklápění vysílače pro ovládání Cutebota', tag: 'rc', icon: 'Compass', gradient: 'from-indigo-600 to-violet-700', route: '/specializovana/robotika-3/iot/ovladani' },
                    { id: 'rob3-iot-net', title: 'Senzorová IoT síť', description: 'Sběr telemetrie z uzlů do centrálního OLED hubu', tag: 'net', icon: 'Network', gradient: 'from-indigo-600 to-violet-700', route: '/specializovana/robotika-3/iot/sit' }
                  ]
                }
              ]
            }
          ]
        },

        // 4. ROČNÍK SŠ
        {
          grade: 4,
          gradeLabel: '4. Ročník',
          pillColor: 'bg-indigo-600',
          subjects: [
            {
              id: 'rob4',
              title: 'Robotika 2',
              tag: 'rob4',
              description: 'Holonomní kinematika VEX AIM, AI počítačové vidění, Smart motory VEX IQ a simulace KUKA EDU.',
              icon: 'Bot',
              gradient: 'from-indigo-600 to-purple-700',
              route: '/specializovana/robotika-4',
              analysis: {
                goal: 'Proniknout do pokročilé mobilní kinematiky, počítačového vidění s AI, inženýrské mechaniky se Smart motory a průmyslové robotiky v simulátoru i na reálném manipulátoru KUKA EDU.',
                targetProfile: 'Absolvent 4. ročníku ovládá holonomní (všesměrový) pohyb a vektorovou matematiku v Pythonu. Dokáže naprogramovat autonomní navigaci s využitím AI kamery a AprilTags, navrhnout zvedací mechanismus s motorovými enkodéry a odometrií, a odsimulovat i nahrát průmyslový Pick & Place program pro 6-osou KUKA buňku.',
                expectedOutcomes: [
                  'Matematický rozklad vektorů rychlosti pro řízení 3-kolového všesměrového (omni) podvozku VEX AIM.',
                  'Implementace počítačového vidění v reálném čase: sledování cílů (Visual Servoing) a prostorová orientace přes 2D AprilTags.',
                  'Konstrukční návrh mechanických převodů, práce s točivým momentem a odometrií s využitím Smart motorů VEX IQ a IMU gyroskopu.',
                  'Pochopení 6-DoF kinematiky, bezpečnostních norem a souřadnicových systémů (WORLD, BASE, TOOL/TCP) průmyslových manipulátorů.',
                  'Offline programování a ladění trajektorií (PTP, LIN) v robotickém simulátoru s následným přenosem na fyzický stroj KUKA EDU.',
                  'Týmová integrace heterogenního hardwaru (mobilní roboti + průmyslová buňka + IoT) v rámci maturitního projektu.'
                ],
                steps: [
                  {
                    step: '1. VEX AIM: Všesměrový podvozek & Vektory (14 h)',
                    description: 'Tříkolová omni kinematika, goniometrický rozklad sil a rychlostí, elektromagnet a mechanický kicker.',
                    why: 'AIM je zkompletovaný, takže v září ihned programují. Přechod od diferenciálního k holonomnímu pohybu rozvíjí aplikovanou matematiku a prostorové myšlení.'
                  },
                  {
                    step: '2. VEX AIM: Počítačové vidění s AI kamerou (14 h)',
                    description: 'Kamera jako senzor, Visual Servoing (dojíždění k pohybujícímu se cíli), čtení AprilTags a herní strategie.',
                    why: 'Žáci už umí robota přesně ovládat, takže přidání zraku a autonomního rozhodování dává okamžitý smysl a je vizuálně atraktivní.'
                  },
                  {
                    step: '3. VEX IQ: Inženýrská mechanika & Smart motory (14 h)',
                    description: 'Převodové poměry, točivý moment, optické enkodéry motorů, IMU gyroskop a zdvihací mechanismy.',
                    why: 'Po softwarové fázi přichází fyzická inženýrská konstrukce – žáci se učí dimenzovat sílu a rychlost a měřit absolutní dráhu odometrií.'
                  },
                  {
                    step: '4. KUKA EDU: Simulátor & Průmyslová manipulace (8 h)',
                    description: '6-DoF kinematika, TCP kalibrace, bezpečnostní zóny a Pick & Place. 5 dvojic u simulátoru na PC + ověření na reálném KUKA robotu.',
                    why: 'Příprava na reálný průmysl. Díky simulátoru všech 10 žáků intenzivně programuje na PC bez prostojů a k fyzickému robotu jdou s odladěným programem.'
                  },
                  {
                    step: '5. Závěrečný projekt: Kooperativní buňka & Obhajoba (10 h)',
                    description: 'Týmová syntéza VEX AIM + VEX IQ + KUKA EDU + IoT v autonomní logistické misi, technická dokumentace a obhajoba.',
                    why: 'Komplexní prověrka samostatnosti a týmové práce před praktickou maturitou – simulace reálného inženýrského workflow v Průmyslu 4.0.'
                  }
                ],
                hardwareRequirements: ['VEX AIM školní sada robotů', '5x VEX IQ školní sada robotů s AI Vision senzorem', '1x KUKA EDU robotická buňka', 'Simulační software na PC', 'Soutěžní aréna s míčky a AprilTags'],
                softwareStack: ['VEXcode Python', 'VS Code (VEX Extension)', 'KUKA Simulační prostředí (RoboDK / KUKA.Sim)', 'Python 3']
              },
              chapters: [
                {
                  id: 'rob4-aim-pohyb',
                  title: 'VEX AIM: Holonomní podvozek',
                  description: '3-wheel omni kinematika, rozklad vektorů rychlosti, elektromagnet a kicker.',
                  tag: 'aim1',
                  icon: 'Compass',
                  gradient: 'from-indigo-600 to-purple-700',
                  route: '/specializovana/robotika-4/aim-kinematika',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob4-aim-omni', title: 'Tříkolový Kiwi/Omni pohon', description: 'Všesměrový pohyb bez otáčení šasi', tag: 'omn', icon: 'Compass', gradient: 'from-indigo-600 to-purple-700', route: '/specializovana/robotika-4/aim-kinematika/omni' },
                    { id: 'rob4-aim-vec', title: 'Vektorový rozklad v Pythonu', description: 'Výpočet otáček motorů pomocí goniometrie', tag: 'vec', icon: 'Code', gradient: 'from-indigo-600 to-purple-700', route: '/specializovana/robotika-4/aim-kinematika/vektory' },
                    { id: 'rob4-aim-mag', title: 'Elektromagnet a kicker', description: 'Aktivní zachycení a vystřelení herního míčku', tag: 'kck', icon: 'Cog', gradient: 'from-indigo-600 to-purple-700', route: '/specializovana/robotika-4/aim-kinematika/manipulace' },
                    { id: 'rob4-aim-arn', title: 'Přesné manévrování v aréně', description: 'Trajektorie a diagonální jízda (strafe)', tag: 'arn', icon: 'Bot', gradient: 'from-indigo-600 to-purple-700', route: '/specializovana/robotika-4/aim-kinematika/arena' }
                  ]
                },
                {
                  id: 'rob4-aim-vision',
                  title: 'VEX AIM: Počítačové vidění',
                  description: 'Barevné signatury, Visual Servoing a prostorová orientace pomocí AprilTags.',
                  tag: 'aim2',
                  icon: 'Eye',
                  gradient: 'from-purple-600 to-pink-700',
                  route: '/specializovana/robotika-4/aim-vision',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob4-vis-col', title: 'Kamera jako senzor & barvy', description: 'Kalibrace barevných signatur a detekce objektů', tag: 'col', icon: 'Palette', gradient: 'from-purple-600 to-pink-700', route: '/specializovana/robotika-4/aim-vision/barvy' },
                    { id: 'rob4-vis-srv', title: 'Visual Servoing (Sledování cíle)', description: 'Autonomní natáčení a dojíždění k pohybujícímu se cíli', tag: 'srv', icon: 'Eye', gradient: 'from-purple-600 to-pink-700', route: '/specializovana/robotika-4/aim-vision/tracking' },
                    { id: 'rob4-vis-tag', title: 'Lokalizace přes AprilTags', description: '2D vizuální značky pro navigaci k brance a zónám', tag: 'tag', icon: 'ScanFace', gradient: 'from-purple-600 to-pink-700', route: '/specializovana/robotika-4/aim-vision/apriltags' },
                    { id: 'rob4-vis-mis', title: 'Autonomní sportovní mise', description: 'Vyhledání míčku, uchopení magnetem a střelba', tag: 'mis', icon: 'Bot', gradient: 'from-purple-600 to-pink-700', route: '/specializovana/robotika-4/aim-vision/mise' }
                  ]
                },
                {
                  id: 'rob4-vex-iq',
                  title: 'VEX IQ: Inženýrské systémy',
                  description: 'Převodové poměry, optické enkodéry, gyroskop a přesná odometrie.',
                  tag: 'viq',
                  icon: 'Wrench',
                  gradient: 'from-pink-600 to-rose-700',
                  route: '/specializovana/robotika-4/vex-iq',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob4-viq-gr', title: 'Převodové poměry & točivý moment', description: 'Vztah rychlosti a síly v konstrukci robotu', tag: 'gr', icon: 'Cog', gradient: 'from-pink-600 to-rose-700', route: '/specializovana/robotika-4/vex-iq/prevody' },
                    { id: 'rob4-viq-enc', title: 'Smart motory & optické enkodéry', description: 'Řízení na přesný úhel a čtení zátěže', tag: 'enc', icon: 'Activity', gradient: 'from-pink-600 to-rose-700', route: '/specializovana/robotika-4/vex-iq/enkodery' },
                    { id: 'rob4-viq-odo', title: 'Odometrie & IMU gyroskop', description: 'Výpočet absolutní polohy z rotace kol', tag: 'odo', icon: 'Compass', gradient: 'from-pink-600 to-rose-700', route: '/specializovana/robotika-4/vex-iq/odometrie' },
                    { id: 'rob4-viq-lft', title: 'Zdvihací mechanismy', description: 'Autonomní nabírání a vykládání materiálu', tag: 'lft', icon: 'Wrench', gradient: 'from-pink-600 to-rose-700', route: '/specializovana/robotika-4/vex-iq/mechanismy' }
                  ]
                },
                {
                  id: 'rob4-kuka',
                  title: 'KUKA EDU: Průmyslová robotika',
                  description: '6-DoF kinematika, bezpečnostní zóny, offline simulace a Pick & Place.',
                  tag: 'kuka',
                  icon: 'Bot',
                  gradient: 'from-amber-600 to-orange-700',
                  route: '/specializovana/robotika-4/kuka',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob4-kuka-kin', title: '6-DoF kinematika & bezpečnost', description: 'Osy A1-A6, kartézský prostor a E-Stop okruhy', tag: 'kin', icon: 'ShieldCheck', gradient: 'from-amber-600 to-orange-700', route: '/specializovana/robotika-4/kuka/kinematika' },
                    { id: 'rob4-kuka-tcp', title: 'Simulátor: Kalibrace TCP', description: 'Tool Center Point a souřadnicový systém BASE', tag: 'tcp', icon: 'Wrench', gradient: 'from-amber-600 to-orange-700', route: '/specializovana/robotika-4/kuka/tcp' },
                    { id: 'rob4-kuka-pnp', title: 'Simulátor: Pick & Place trajektorie', description: 'PTP a LIN pohyby bez kolizních stavů', tag: 'pnp', icon: 'Layers', gradient: 'from-amber-600 to-orange-700', route: '/specializovana/robotika-4/kuka/pick-and-place' },
                    { id: 'rob4-kuka-hw', title: 'Ověření na fyzickém robotu KUKA', description: 'Režim T1, nahrání odzkoušeného kódu a cyklus', tag: 'krl', icon: 'Bot', gradient: 'from-amber-600 to-orange-700', route: '/specializovana/robotika-4/kuka/realny-robot' }
                  ]
                },
                {
                  id: 'rob4-projekt',
                  title: 'Závěrečný kooperativní projekt',
                  description: 'Propojení VEX AIM, VEX IQ, KUKA a IoT do funkční automatizované buňky.',
                  tag: 'prj',
                  icon: 'FolderKanban',
                  gradient: 'from-rose-600 to-red-700',
                  route: '/specializovana/robotika-4/projekt',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'rob4-prj-arch', title: 'Architektura kooperativní linky', description: 'Definice rozhraní a rozdělení týmových rolí', tag: 'arc', icon: 'Network', gradient: 'from-rose-600 to-red-700', route: '/specializovana/robotika-4/projekt/architektura' },
                    { id: 'rob4-prj-run', title: 'Týmová integrace a ladění', description: 'Autonomní logistika a kooperace v reálném čase', tag: 'run', icon: 'Bot', gradient: 'from-rose-600 to-red-700', route: '/specializovana/robotika-4/projekt/realizace' },
                    { id: 'rob4-prj-prez', title: 'Obhajoba & Troubleshooting', description: 'Prezentace projektu a řešení simulovaných poruch', tag: 'def', icon: 'ShieldCheck', gradient: 'from-rose-600 to-red-700', route: '/specializovana/robotika-4/projekt/obhajoba' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
