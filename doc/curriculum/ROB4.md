# Profil kurikula: Robotika 2 (ROB 4) – 4. ročník SŠ

**Kód předmětu:** ROB 4  
**Ročník:** 4. ročník SŠ  
**Obor:** 18-20-M/01 Informační technologie  
**Hodinová dotace:** 2 hodiny týdně / 66 hodin ročně (33 týdnů)  
**Forma výuky:** Teorie, simulace a týmová projektová laboratoř  
**Hardware stack:** Mobilní platforma VEX AIM (3-kolový omni podvozek), AI kamera (HuskyLens / OpenMV), stavebnice VEX IQ (Smart motory, mechanické převody), průmyslové 6-osé rameno KUKA EDU  
**Software stack:** Python, KUKA WorkVisual / RoboDK simulátor, OpenCV / AI Vision utility  

---

## 1. Napojení na Rámcový vzdělávací program (RVP)

### Kód a název oboru:
18-20-M/01 Informační technologie

### Klíčové kompetence RVP:
- **Kompetence k řešení problémů:** Žák aplikuje pokročilou vektorovou matematiku a trigonometrii na řízení všesměrového pohybu a kinematické transformace robotických ramen.
- **Kompetence komunikativní a personální:** Pracuje v interdisciplinárním týmu, dělí si odpovědnost za mechanickou, senzorickou, softwarovou a vizuální část robotické buňky a obhajuje technická rozhodnutí.

### Odborné kompetence a očekávané výstupy RVP:
- Aplikuje kinematické modely pro řízení mobilních robotických platforem a manipulátorů.
- Integruje počítačové vidění pro lokalizaci objektů a navigaci v reálném čase.
- Využívá průmyslové robotické simulátory a konfiguruje trajektorie pohybu.
- Realizuje komplexní kooperativní projekt propojující autonomní robotiku s průmyslovou výrobou.

---

## 2. Školní vzdělávací program (ŠVP InspIS)

### Cíle předmětu:
Cílem předmětu je posunout studenta z úrovně základního řízení mikrokontrolérů do **světa pokročilé mobilní a průmyslové robotiky (Průmysl 4.0)**. Student zvládá holonomní kinematiku (všesměrový pohyb), počítačové vidění s umělou inteligencí, mechaniku a odometrii Smart motorů a programování 6-osých průmyslových ramen KUKA v simulátoru i na reálném stroji.

### Profil absolventa:
Absolvent rozumí vektorové matematice všesměrových podvozků, ovládá zpracování obrazu pro vizuální navádění (Visual Servoing), zná bezpečnostní normy a souřadnicové systémy průmyslových manipulátorů (WORLD, BASE, TOOL) a je schopen v týmu navrhnout, odladit a předvést komplexní automatizovanou buňku.

---

## 3. Výsledky vzdělávání a rozpis učiva (ŠVP InspIS)

| Výsledky vzdělávání (Žák:) | Rozpis učiva | Hodiny |
| :--- | :--- | :---: |
| • vysvětlí princip a výhody holonomního (všesměrového) pohybu oproti podvozkům neholonomním<br>• provádí goniometrický rozklad sil a rychlostí pro řízení 3-kolového všesměrového podvozku (Omni wheels)<br>• programuje autonomní pohybové trajektorie v rovině s nezávislou orientací podvozku<br>• ovládá elektromagnetické a mechanické akční členy mobilního robota | **1. Všesměrová holonomní kinematika (VEX AIM)**<br>• Holonomní kinematika (omni-directional kola, srovnání s diferenciálním podvozkem)<br>• Vektorová matematika podvozku (goniometrický rozklad rychlostí na 3 motory pod úhlem 120°, nezávislá translace a rotace)<br>• Autonomní trajektorie (plynulé najíždění na souřadnice, vyhýbání se překážkám bez nutnosti otáčení)<br>• Akční členy v aréně (ovládání elektromagnetu pro manipulaci s objekty, mechanický vyhazovač/kicker)<br>*PT - ČSP* | **14** |
| • integruje AI kameru jako senzor pro lokalizaci objektů v zorném poli<br>• aplikuje techniky počítačového vidění pro barevnou segmentaci a detekci tvarů<br>• využívá 2D poziční značky (AprilTags) pro přesné prostorové určení polohy robota v aréně<br>• implementuje algoritmy vizuálního navádění (Visual Servoing) pro sledování a dojíždění k pohybujícím se cílům | **2. Počítačové vidění a AI navigace**<br>• Architektura vizuálního senzoru (kamera jako inteligentní senzor, zorné pole, snímková frekvence)<br>• Barevná segmentace a klasifikace (barevné prostory HSV, prahování, nalezení těžiště objektu)<br>• Poziční značky AprilTags (princip 2D kódů, dekódování ID značky, výpočet vzdálenosti a úhlu natočení)<br>• Visual Servoing a herní strategie (algoritmy zpětnovazebního dojíždění k objektu, rozhodovací logika v reálném čase)<br>*PT - ČDS* | **14** |
| • navrhuje mechanické ozubené převody pro optimalizaci rychlosti a točivého momentu<br>• využívá optické enkodéry Smart motorů pro odometrii a přesné odměřování ujeté vzdálenosti<br>• integruje vestavěný IMU gyroskop pro kompenzaci prokluzu kol a stabilizaci orientace<br>• konstruuje a programuje víceosé zdvihací a manipulační mechanismy | **3. Inženýrská mechanika a Smart motory (VEX IQ)**<br>• Mechanické převody v robotice (převodový poměr, točivý moment vs. úhlová rychlost, tření)<br>• Smart motory a enkodéry (měření úhlu natočení, odometrie, PID regulace polohy motoru)<br>• IMU jednotka a gyroskop (fúze dat, měření úhlové rychlosti, eliminace driftu podvozku)<br>• Zdvihací mechanismy (paralelogram, nůžkový mechanismus, lineární vedení a chapadla)<br>*PT - ČSP* | **14** |
| • popíše kinematickou strukturu 6-osého průmyslového robotického ramene (6-DoF)<br>• orientuje se v souřadnicových systémech průmyslových manipulátorů (WORLD, BASE, TOOL / TCP)<br>• definuje a porovnává trajektorie pohybu z bodu do bodu (PTP) a lineární pohyby (LIN)<br>• vytváří, simuluje a ladí manipulační úlohy (Pick & Place) v robotickém simulátoru s následným přenosem na fyzický stroj | **4. Průmyslová robotika a manipulátory (KUKA EDU)**<br>• Kinematika 6-DoF ramen (stupně volnosti, dopředná a inverzní kinematika, singulární polohy)<br>• Kartézské souřadnicové systémy (bázový systém BASE, nástrojový systém TOOL/TCP, kalibrace hrotu nástroje)<br>• Řízení pohybu (interpolace PTP vs. lineární LIN, aproximace bodů, rychlostní a zrychlovací rampy)<br>• Offline programování a simulace (virtuální buňka v simulátoru, detekce kolizí, nahrání kódu do reálného KUKA kontroléru)<br>*PT - ČSP, PT - ČDS* | **14** |
| • navrhne systémovou architekturu komplexní kooperativní výrobní linky<br>• integruje různorodý hardware (mobilní podvozky, senzorické stanice, průmyslové rameno) přes společné komunikační rozhraní<br>• provádí systematickou diagnostiku chybových stavů a ladění celku v reálném čase<br>• prezentuje a odborně obhájí realizované technické řešení | **5. Závěrečný komplexní kooperativní projekt**<br>• Návrh systémové architektury (specifikace rozhraní mezi mobilním robotem, KUKA ramenem a dispečinkem)<br>• Týmová integrace a ladění (koordinace předávání materiálu mezi mobilním robotem a manipulátorem)<br>• Zabezpečení buňky a ošetření chyb (nouzové zastavení, obnovení po výpadku, diagnostika)<br>• Technická dokumentace a odborná ústní obhajoba projektu<br>*PT - ČSP* | **10** |
| **Celková hodinová dotace ročníku:** | | **66 h** |

---

## 4. Tematický plán předmětu (Rozpis 66 hodin)

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Cílové výstupy a praxe |
|:---:|:---:|---|:---:|---|
| **1** | **Září – Říjen** (1.–7. týden) | **Všesměrová holonomní kinematika (VEX AIM)** | 14 h | 3-kolový omni podvozek, vektorový rozklad sil a rychlostí, elektromagnet, mechanický kicker. |
| **2** | **Listopad – Leden** (8.–14. týden) | **Počítačové vidění & AI navigace** | 14 h | AI kamera (HuskyLens / OpenMV), Visual Servoing, 2D poziční značky AprilTags, sledování cílů. |
| **3** | **Leden – Březen** (15.–21. týden) | **Inženýrská mechanika & Smart motory (VEX IQ)** | 14 h | Smart motory s optickými enkodéry, točivý moment, mechanické převody, odometrie, gyroskop. |
| **4** | **Březen – Květen** (22.–28. týden) | **Průmyslová robotika & Manipulátory (KUKA EDU)** | 14 h | 6-DoF kinematika, souřadnicové systémy (WORLD, BASE, TOOL), trajektorie PTP a LIN, simulace i reálný stroj. |
| **5** | **Květen – Červen** (29.–33. týden) | **Závěrečný komplexní kooperativní projekt** | 10 h | Integrace heterogenního HW (mobilní robot + průmyslová buňka + IoT dispečink), obhajoba. |
| **Σ** | **Celý školní rok (33 týdnů)** | **Celkem** | **66 h** | **Pravidelná 2hodinová týdenní dotace (33 týdnů × 2 h)** |
