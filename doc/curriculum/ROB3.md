# Kurikulární profil předmětu: Robotika 1 (ROB 3)

**Obor vzdělání:** 18-20-M/01 Informační technologie  
**Předmět:** Robotika  
**Ročník:** 3. ročník SŠ  
**Hodinová dotace:** 2 hodiny týdně, celkem 66 hodin (33 výukových týdnů)  
**Charakteristika:** Odborný, prakticky orientovaný předmět  
**Výchozí routa v IntLab:** `/specializovana/robotika-3`  

---

## 1. Charakteristika vyučovacího předmětu

Předmět Robotika rozvíjí znalosti a dovednosti žáků v oblasti programování, řízení robotických systémů, práce se senzory, automatizace, internetu věcí a využití umělé inteligence v robotice.

Navazuje na znalosti získané zejména v předmětech Programování (jazyk Python ve 2. ročníku), Hardware a Základy elektrotechniky. Elektrotechnické principy a elektronické obvody proto nejsou v předmětu Robotika znovu systematicky probírány, ale žáci je využívají při praktické práci s robotickými systémy.

Výuka je založena především na praktických cvičeních, experimentování, problémových úlohách a projektové práci. Žáci programují mikrokontroléry, pracují se senzory a pohony, sestavují a programují robotická zařízení, vytvářejí algoritmy pro autonomní řízení a zpracování dat. Seznamují se také s využitím 3D modelování při konstrukci robotických zařízení, s principy IoT a s možnostmi využití umělé inteligence a počítačového vidění.

Důraz je kladen na samostatné řešení problémů, algoritmické a logické myšlení, týmovou spolupráci, experimentování a schopnost navrhnout, realizovat, otestovat a prezentovat vlastní technické řešení. Doporučený poměr výuky je přibližně 70 % praktických činností a 30 % výkladu, návrhu, analýzy a dokumentace.

---

## 2. Hardwarová platforma a vybavení školy

- **Mikrokontroléry:** BBC micro:bit v2 (20 ks – každý žák má k dispozici vlastní desku).
- **Vývojové prostředí a jazyk:** MicroPython / Python 3 (textové kódování, návaznost na PRG 2).
- **Senzorika a IoT:** 10 rozšiřujících sad IoT Kit (čidla teploty, vlhkosti, osvětlení, půdní vlhkosti, OLED displej SSD1306, relé, Wi-Fi modul).
- **Mobilní robotické platformy:** 10 robotických podvozků Cutebot (diferenciální pohon, ultrazvukový dálkoměr, sledovač čáry, RGB LED).
- **Počítačové vidění:** SmartLens AI kamera (barevné sledování, detekce objektů a značek).
- **3D modelování a prototypování:** 3D tiskárna Prusa MINI pro tisk funkčních úchytů a nárazníků.

---

## 3. Učební osnova (10 tematických celků – celkem 66 hodin)

| # | Tematický celek | Učivo | Výsledky vzdělávání – žák | Dotace |
|---|---|---|---|:---:|
| **1.** | **Úvod do robotiky** | Robotika a její využití. Robotické systémy. Typy robotů. Autonomní a dálkově řízené systémy. Základní části robotického systému – řídicí jednotka, senzory, akční členy. Robotika v průmyslu, službách, dopravě a domácnosti. Bezpečnost práce. | vysvětlí pojem robotika a uvede oblasti jejího využití; rozliší základní typy robotů; popíše funkci základních částí robotického systému; rozliší autonomní a dálkově řízený systém; dodržuje zásady bezpečné práce | **2 h** |
| **2.** | **Mikrokontroléry a programování robotických systémů** | Mikrokontroléry BBC micro:bit v2 / ARM jádro. Vývojové prostředí a REPL v MicroPythonu. Struktura programu. Proměnné a datové typy. Podmínky, cykly, funkce. Digitální a analogové vstupy a výstupy GPIO. Knihovny. Časování bez zpoždění (`ticks_ms()`). Ladění programu. Jednoduchý stavový automat. | pracuje s vývojovým prostředím mikrokontroléru; vytvoří, upraví a nahraje program; využívá proměnné, podmínky, cykly a funkce; pracuje s knihovnami; využívá digitální a analogové vstupy a výstupy; vyhledává a odstraňuje chyby programu; vytvoří jednoduchý stavový automat | **12 h** |
| **3.** | **Senzory a zpracování dat** | Princip činnosti senzorů. Digitální a analogové senzory. Světelné, teplotní a vlhkostní senzory. Ultrazvukový a infračervený senzor. Akcelerometr a sběrnice I2C. Získávání, převod a zpracování dat. Filtrování hodnot (plovoucí průměr). Kombinace senzorů. | vysvětlí princip funkce vybraných senzorů; připojí a naprogramuje senzor; načte a zpracuje naměřené hodnoty; vyhodnotí získaná data; využije více senzorů současně; vytvoří program reagující na hodnoty ze senzorů; odhalí chyby měření a navrhne jejich odstranění | **10 h** |
| **4.** | **Řízení motorů a pohyb robotu** | Řízení pohybu. Stejnosměrné motory a servomotory. Řízení rychlosti a směru. Pulzně-šířková modulace (PWM). Robotické vozítko Cutebot. Základní algoritmy pohybu. Přesnost pohybu a zatáčení. Detekce překážek sonarem. Sledování čáry optickými senzory. | vysvětlí princip řízení pohonu; naprogramuje směr a rychlost pohybu; vytvoří algoritmus pro řízení robotického vozítka; využije senzory pro řízení pohybu; naprogramuje detekci překážky; vytvoří program pro sledování vyznačené trasy; optimalizuje algoritmus pohybu | **8 h** |
| **5.** | **Autonomní robotika** | Autonomní systém. Vstup – zpracování – rozhodnutí – výstup. Rozhodovací algoritmy. Kombinace více senzorů. Stavový automat v Pythonu. Reakce na prostředí. Navigace v prostoru. Vyhýbání překážkám. Řešení bludiště. Optimalizace autonomního chování. | vysvětlí princip autonomního řízení; navrhne algoritmus autonomního chování; kombinuje údaje z více senzorů; vytvoří program, který umožní robotu samostatně reagovat na okolí; testuje a optimalizuje chování robotu; analyzuje chyby autonomního systému | **6 h** |
| **6.** | **3D modelování a konstrukce pro robotiku** | Základy 3D modelování (Tinkercad / Onshape). Návrh konstrukčních prvků pro robota. Rozměry a tolerance. Držák senzoru, kryt, nárazník apod. Příprava modelu pro 3D tisk (slicing v PrusaSliceru). Využití vytištěného dílu v robotickém projektu na Cutebotu. | vytvoří jednoduchý 3D model funkčního dílu; přizpůsobí návrh konkrétnímu robotickému zařízení; připraví model pro 3D tisk; ověří funkčnost vytištěného dílu; upraví návrh podle výsledků testování | **6 h** |
| **7.** | **Internet věcí a komunikace robotických zařízení** | Princip IoT. Propojená zařízení. Micro:bit Radio (2.4 GHz) a bezdrátová Wi-Fi komunikace. Přenos telemetrických dat. Vzdálené monitorování a ovládání. Zpracování a zobrazování dat na OLED displeji a v PC/cloudu (ThingSpeak / web dashboard). Základy bezpečnosti IoT zařízení. | vysvětlí princip internetu věcí; propojí zařízení podle zadání; odešle a přijme data; vytvoří jednoduchý systém vzdáleného monitorování nebo ovládání; zobrazí data ze senzoru; uvede základní bezpečnostní rizika IoT zařízení | **6 h** |
| **8.** | **Robotika a umělá inteligence** | Umělá inteligence v robotice. Autonomní systémy. Počítačové vidění. Kamera SmartLens jako senzor. Rozpoznávání objektů, barev a obrazových značek (AprilTags). Možnosti a limity AI. Bezpečnostní a etické otázky. | uvede příklady využití AI v robotice; vysvětlí základní princip počítačového vidění; využije kameru jako zdroj dat; pracuje s jednoduchou ukázkou rozpoznávání objektů nebo obrazu; diskutuje možnosti a omezení AI v robotických systémech | **4 h** |
| **9.** | **Závěrečný robotický projekt** | Návrh vlastního robotického řešení. Analýza problému. Stanovení požadavků. Návrh algoritmu. Konstrukce. Programování v MicroPythonu. Využití senzorů. Případné využití 3D tisku, IoT nebo AI kamery. Testování. Ladění. Dokumentace. | analyzuje zadaný problém; navrhne vhodné technické řešení; vytvoří algoritmus; samostatně nebo v týmu sestaví a naprogramuje robotické zařízení; využije senzory a další prvky; testuje a optimalizuje vytvořené řešení; vede dokumentaci projektu | **10 h** |
| **10.** | **Prezentace a obhajoba projektu** | Prezentace výsledku. Demonstrace funkce zařízení v aréně. Vysvětlení principu fungování kódu. Obhajoba zvoleného technického řešení. Reflexe práce. Možnosti dalšího rozvoje projektu. | prezentuje vytvořené řešení; vysvětlí princip jeho fungování; obhájí zvolený postup; reaguje na otázky; zhodnotí vlastní práci a navrhne možnosti dalšího rozvoje | **2 h** |
| | **CELKEM** | | | **66 h** |

---

## 4. Rozvoj klíčových kompetencí

- **Kompetence k učení:** Žák vyhledává a využívá informace z odborných zdrojů a technické dokumentace; propojuje poznatky z programování, elektrotechniky, matematiky a fyziky; experimentuje a vyhodnocuje výsledky své práce; samostatně získává nové znalosti potřebné k řešení úkolu.
- **Kompetence k řešení problémů:** Žák analyzuje zadaný problém a stanovuje požadavky na řešení; navrhuje algoritmus a vhodné technické řešení; testuje funkčnost řešení; systematicky vyhledává a odstraňuje chyby; upravuje a optimalizuje vytvořený program nebo konstrukci.
- **Komunikativní kompetence:** Žák používá odbornou terminologii; pracuje s technickou dokumentací; dokumentuje průběh a výsledky projektu; prezentuje a obhajuje vlastní řešení; reaguje na dotazy a konstruktivně diskutuje o navržených řešeních.
- **Personální a sociální kompetence:** Žák spolupracuje při řešení týmových projektů; rozděluje si úkoly a přijímá odpovědnost za jejich splnění; respektuje názory ostatních; poskytuje a přijímá zpětnou vazbu; vyhodnocuje vlastní práci a podíl na společném výsledku.
- **Digitální kompetence:** Žák využívá vývojová prostředí a specializovaný software; pracuje s digitálními daty získanými ze senzorů; využívá síťovou komunikaci a IoT technologie; využívá digitální nástroje pro návrh, programování, testování a dokumentaci; respektuje zásady bezpečného používání propojených zařízení.
- **Odborné kompetence:** Žák se orientuje v principech robotických systémů; programuje mikrokontroléry; pracuje se senzory a akčními členy; vytváří algoritmy pro řízení robotických zařízení; navrhuje a realizuje jednoduché autonomní systémy; využívá 3D modelování při návrhu robotických konstrukcí; využívá principy IoT; orientuje se v možnostech využití AI v robotice; dokumentuje, testuje a prezentuje vlastní technické řešení.

---

## 5. Průřezová témata

- **Člověk a svět práce (PT - ČSP):** Žáci řeší praktické technické problémy, pracují s technickou dokumentací, plánují pracovní postup a získávají zkušenosti s týmovou spoluprací a projektovým řízením.
- **Člověk a životní prostředí (PT - ČŽP):** Žáci se seznamují s možnostmi využití robotiky při monitorování životního prostředí, automatizaci a efektivním využívání zdrojů. Součástí je také odpovědný přístup k elektronickým zařízením a jejich životnímu cyklu.
- **Občan v demokratické společnosti (PT - ODS):** Žáci diskutují o dopadech automatizace, robotizace a umělé inteligence na společnost, zaměstnanost a každodenní život.
- **Informační a komunikační technologie (PT - IKT):** Průřezové téma je přirozeně integrováno do celého předmětu – žáci programují, zpracovávají data, využívají počítačové sítě, IoT, digitální nástroje a technologie umělé inteligence.

---

## 6. Mezipředmětové vztahy

- **Programování (PRG 1 & PRG 2):** Algoritmizace, proměnné, podmínky, cykly, funkce, ladění programů a práce s daty v jazyce Python.
- **Hardware (HW):** Mikrokontroléry, digitální a analogové senzory, akční členy, napájení a periferní zařízení.
- **Základy elektrotechniky:** Aplikace již získaných znalostí při zapojování a bezpečném používání robotických zařízení.
- **Počítačové sítě:** Komunikace zařízení, bezdrátové připojení, síťové pakety a IoT.
- **Matematika a fyzika:** Práce s veličinami, převody, vyhodnocování naměřených dat, mechanický pohyb, rychlost, čas, principy fungování senzorů a pohonů.
- **Multimediální tvorba:** Technická dokumentace, prezentace projektu a zpracování obrazových dat.
