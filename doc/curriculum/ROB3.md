# Kurikulární profil předmětu: Robotika 1 (ROB 3)

**Obor vzdělání:** 18-20-M/01 Informační technologie  
**Předmět:** Robotika  
**Ročník:** 3. ročník SŠ  
**Hodinová dotace:** 2 hodiny týdně, celkem 66 hodin (33 výukových týdnů)  
**Charakteristika:** Odborný, prakticky orientovaný předmět  
**Výchozí routa v IntLab:** `/specializovana/robotika-3`  

---

## 1. Charakteristika vyučovacího předmětu

Předmět Robotika 1 rozvíjí znalosti a dovednosti žáků v oblasti programování vestavných systémů, mikrokontrolérů, senzoriky, internetu věcí (IoT), mobilních podvozků a počítačového vidění.

Navazuje na znalosti získané v předmětu Programování (jazyk Python ve 2. ročníku), Hardware a Počítačové sítě. Výuka probíhá formou praktických cvičení a laboratorních výzev. Žáci programují mikrokontroléry v Pythonu, čtou data ze senzorů prostředí, odesílají telemetrii na web a programují autonomní navigaci mobilních robotů s využitím počítačového vidění.

Důraz je kladen na samostatné řešení úloh, algoritmické myšlení, ošetření chyb a ladění kódu v reálném fyzickém prostředí.

---

## 2. Hardwarová platforma a vybavení školy

- **Mikrokontroléry:** BBC micro:bit v2 (20 ks – každý žák pracuje samostatně 1:1).
- **Vývojové prostředí a jazyk:** Textový Python 3 / MicroPython.
- **Senzorika a IoT:** 10 rozšiřujících sad IoT Kit (čidla teploty, vlhkosti, osvětlení, OLED displej SSD1306, relé pro spínání zátěže, síťová komunikace).
- **Mobilní podvozek:** 10 robotických vozítek Cutebot (2 DC motory, ultrazvukový senzor Sonar, infračervené podvozkové senzory na sledování čáry, RGB světlomety).
- **Autonomní aréna VEX AIM:** 6 robotů VEX AIM (3 všesměrová Omni kola, integrovaná AI Vision kamera, permanentní elektromagnet, mechanický vykopávač kicker, gyroskop, akcelerometr) a oficiální aréna s mantinely a AprilTags.

---

## 3. Učební osnova ŠVP (3 tematické celky – celkem 66 hodin)

| # | Tematický celek | Učivo | Výsledky vzdělávání – žák | Dotace |
|---|---|---|---|:---:|
| **1.** | **Mikrokontroléry a internet věcí** | Architektura výukového mikrokontroléru, vývojové prostředí, textový programovací jazyk (Python). Vstupně-výstupní piny (GPIO), digitální a analogové signály, PWM regulace. Snímání fyzikálních veličin prostředí (teplota, osvětlení, vlhkost, tlačítka). Zobrazovací a akční členy (displej, relé, signalizace). Síťová komunikace, základy IoT, přenos naměřených dat do webového prostředí a jejich vizualizace. | vytvoří a odladí program pro čtení digitálních i analogových senzorů; zobrazí naměřené údaje a stavové ikony na lokálním displeji; ovládá spínací a akční prvky v závislosti na hodnotách ze senzorů; zajistí přenos telemetrických dat a jejich zobrazení ve webovém rozhraní | **12 h** |
| **2.** | **Autonomní mobilní podvozky** | Mobilní podvozek s diferenciálním řízením, princip regulace rychlosti a směru. Bezkontaktní měření vzdálenosti a detekce překážek. Optické senzory pro detekci podkladu a sledování vyznačené trasy. Algoritmy autonomního pohybu: reaktivní chování, stavové řízení, řešení jednoduchých překážkových situací. | programově řídí rychlost a směr pohybu kolového podvozku; naprogramuje bezpečné zastavení před překážkou ve stanovené vzdálenosti; vytvoří stabilní program pro sledování vodicí linie na podkladu; navrhne a otestuje autonomní průjezd podvozku vymezenou trasou | **12 h** |
| **3.** | **Pokročilá mobilní robotika a počítačové vidění** | Řízení a kinematika pohybu mobilní platformy, udržení kurzu a manévrování v ploše. Počítačové vidění v mobilní robotice: kamera jako senzor, snímání a analýza scény v reálném čase. Detekce optických pozičních značek pro prostorovou lokalizaci a orientaci. Rozpoznávání herních a pracovních objektů podle barevných a tvarových příznaků. Inerciální senzory (gyroskop, akcelerometr) pro sledování pohybu a prostorovou stabilitu. Interakce s objekty na ploše: vyhledání cíle, záchyt a transport do určené zóny. Autonomní strategie a řešení komplexních úloh v aréně na čas. | programově řídí pohyb robotické platformy a provádí přesné prostorové manévry; využije kameru a algoritmy počítačového vidění pro detekci orientačních značek v prostoru; naprogramuje vyhledání barevného objektu a samostatné navedení robota k němu; implementuje algoritmus pro záchyt objektu a jeho přemístění do cílové oblasti; navrhne, odladí a otestuje autonomní strategii pro řešení komplexní arénové výzvy | **42 h** |
| | **CELKEM** | | | **66 h** |

---

## 4. Rozvoj klíčových kompetencí

- **Digitální kompetence:** Žák propojuje algoritmizaci v Pythonu s reálným hardwarem, čte senzorická data a odesílá je do webového rozhraní.
- **Kompetence k řešení problémů:** Žák diagnostikuje neshody mezi programovým modelem a chováním robota v reálném fyzickém prostředí (odlesky senzorů, prokluz kol), systematicky kód testuje a optimalizuje.
- **Pracovní kompetence a bezpečnost:** Žák dodržuje bezpečnostní pravidla při práci s elektronickými obvody, bateriemi a pohyblivými mechanickými částmi mobilních robotů.
