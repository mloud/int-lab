import { SchoolConfig } from '../types';

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
              route: '/specializovana/operacni-systemy',
              chapters: [
                {
                  id: 'win-install',
                  title: 'Instalace OS',
                  description: 'Simulátor instalace Windows 11 pro IT techniky.',
                  tag: 'win',
                  icon: 'MonitorUp',
                  gradient: 'from-purple-600 to-indigo-600',
                  actionLabel: 'Spustit simulátor',
                  route: '/specializovana/operacni-systemy/instalace',
                  hasSubchapters: false
                },
                {
                  id: 'os-hardware',
                  title: 'Základy hardwaru pro OS',
                  description: 'Hardware z pohledu operačního systému a komunikace s komponentami.',
                  tag: 'osh',
                  icon: 'Cpu',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/hardware',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'ram', title: 'Operační paměť RAM', description: 'Architektura paměťových buněk a adresace', tag: 'ram', icon: 'Cpu', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/hardware/ram' },
                    { id: 'von-neumann', title: 'Von Neumannova architektura', description: 'Sběrnice, řadič a registry procesoru', tag: 'vna', icon: 'Cpu', gradient: 'from-indigo-600 to-purple-700', route: '/specializovana/operacni-systemy/hardware/von-neumann' }
                  ]
                },
                {
                  id: 'os-intro',
                  title: 'Úvod do OS',
                  description: 'Základní pojmy, kernel, vrstvy systému a komunikace hardwaru.',
                  tag: 'osi',
                  icon: 'Monitor',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/uvod',
                  hasSubchapters: false
                },
                {
                  id: 'os-arch',
                  title: 'Architektura OS',
                  description: 'Struktura a moduly moderního operačního systému.',
                  tag: 'osa',
                  icon: 'Layers',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/architektura',
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
                  route: '/specializovana/operacni-systemy/test01',
                  hasSubchapters: false,
                  isTest: true
                },
                {
                  id: 'os-history',
                  title: 'Vývoj a distribuce',
                  description: 'Historie operačních systémů, přehled distribucí a rodiny OS.',
                  tag: 'osh',
                  icon: 'Clock',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/vyvoj',
                  hasSubchapters: false
                },
                {
                  id: 'os-boot-seq',
                  title: 'Start systému (Boot)',
                  description: 'Průběh startu počítače od BIOSu po spuštění operačního systému.',
                  tag: 'osb',
                  icon: 'Hourglass',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/boot',
                  hasSubchapters: false
                },
                {
                  id: 'os-virt',
                  title: 'Virtualizace',
                  description: 'Hypervisory, virtuální stroje a izolace prostředí.',
                  tag: 'vrt',
                  icon: 'Layers',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/virtualizace',
                  hasSubchapters: false
                },
                {
                  id: 'fs-menu',
                  title: 'Souborové systémy',
                  description: 'FAT, NTFS, alokace dat, klastry a simulátory disků.',
                  tag: 'fs',
                  icon: 'HardDrive',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/souborove-systemy',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'fs-uvod', title: 'Úvod do souborových systémů', description: 'Hierarchie souborů a adresářů', tag: 'fsu', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/uvod' },
                    { id: 'fs-deleni', title: 'Dělení disku (Partitions)', description: 'MBR vs GPT a oddíly na disku', tag: 'del', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/deleni-disku' },
                    { id: 'fs-form', title: 'Formátování', description: 'Příprava disku a vytváření struktur', tag: 'fmt', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/formatovani' },
                    { id: 'fs-cluster', title: 'Velikost clusteru', description: 'Vliv clusteru na využití disku', tag: 'cls', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/velikost-clusteru' },
                    { id: 'fs-fat', title: 'FAT a FAT32', description: 'Struktura alokační tabulky', tag: 'fat', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/fat' },
                    { id: 'fs-alloc', title: 'Alokace FAT simulátor', description: 'Zápis a řetězení clusterů', tag: 'alc', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/alokace-fat' },
                    { id: 'fs-read', title: 'Čtení souboru', description: 'Jak OS dohledává clustery', tag: 'rea', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/cteni-souboru' },
                    { id: 'fs-del', title: 'Mazání a obnova dat', description: 'Co se stane při smazání souboru', tag: 'del', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/mazani' },
                    { id: 'fs-frag', title: 'Fragmentace disku', description: 'Rozpad souborů do nesouvislých bloků', tag: 'frg', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/fragmentace' },
                    { id: 'fs-defrag', title: 'Defragmentace', description: 'Uspořádání dat pro rychlejší čtení', tag: 'dfg', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/defrag' },
                    { id: 'fs-chkdsk', title: 'Kontrola chyb (CHKDSK)', description: 'Oprava nekonzistentních záznamů', tag: 'chk', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/chkdsk' },
                    { id: 'fs-media', title: 'Paměťová média', description: 'HDD, SSD, Flash disky a optical média', tag: 'med', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/media' },
                    { id: 'fs-adv', title: 'Pokročilé funkce NTFS', description: 'Žurnálování, komprese a práva ACL', tag: 'adv', icon: 'HardDrive', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/souborove-systemy/pokrocile' }
                  ]
                },
                {
                  id: 'proc-mem',
                  title: 'Procesy a paměť',
                  description: 'Plánování CPU, stavy procesů a alokátor paměti.',
                  tag: 'pm',
                  icon: 'Cpu',
                  gradient: 'from-purple-600 to-indigo-600',
                  route: '/specializovana/operacni-systemy/procesy',
                  hasSubchapters: true,
                  subchapters: [
                    { id: 'pm-cpu', title: 'Plánování procesoru', description: 'Simulátor CPU scheduleru (FIFO, Round Robin)', tag: 'cpu', icon: 'Cpu', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/procesy/cpu' },
                    { id: 'pm-alloc', title: 'Alokátor paměti', description: 'First-fit, Best-fit alokace bloků', tag: 'alc', icon: 'Cpu', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/procesy/allocator' },
                    { id: 'pm-step', title: 'Krokování procesů', description: 'Stavy procesů (Ready, Running, Blocked)', tag: 'stp', icon: 'Cpu', gradient: 'from-purple-600 to-indigo-600', route: '/specializovana/operacni-systemy/procesy/stepper' }
                  ]
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
              description: 'Pokročilá správa, zálohování dat, cloudové technologie a údržba.',
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
                }
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
                  title: 'Python: Základy syntaxe',
                  description: 'Výpisy, proměnné, výrazy a datové typy v jazyce Python.',
                  tag: 'py1',
                  icon: 'Code',
                  gradient: 'from-amber-500 to-orange-600',
                  route: '/specializovana/programovani-2/python-zaklady',
                  hasSubchapters: false
                },
                {
                  id: 'python-kresleni',
                  title: 'Python: Kreslení a Tkinter',
                  description: 'Grafické plátno, kreslení tvarů, souřadnice a barvy.',
                  tag: 'py2',
                  icon: 'Code',
                  gradient: 'from-amber-500 to-orange-600',
                  route: '/specializovana/programovani-2/python-kresleni',
                  hasSubchapters: false
                },
                {
                  id: 'python-cykly',
                  title: 'Python: Cykly a opakování',
                  description: 'For cykly, generování řad a ornamentů pomocí cyklu.',
                  tag: 'py3',
                  icon: 'Code',
                  gradient: 'from-amber-500 to-orange-600',
                  route: '/specializovana/programovani-2/python-cyklus',
                  hasSubchapters: false
                },
                {
                  id: 'python-vetveni',
                  title: 'Python: Podmínky a větvení',
                  description: 'If, elif, else konstrukce a logické rozhodování v kódu.',
                  tag: 'py4',
                  icon: 'Code',
                  gradient: 'from-amber-500 to-orange-600',
                  route: '/specializovana/programovani-2/python-vetveni',
                  hasSubchapters: false
                },
                {
                  id: 'python-podprogramy',
                  title: 'Python: Vlastní funkce (Def)',
                  description: 'Deklarace podprogramů, parametry a znovupoužitelnost kódu.',
                  tag: 'py5',
                  icon: 'Code',
                  gradient: 'from-amber-500 to-orange-600',
                  route: '/specializovana/programovani-2/python-podprogramy',
                  hasSubchapters: false
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
