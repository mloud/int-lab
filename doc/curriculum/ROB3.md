# Profil kurikula: Robotika 1 (ROB 3) – 3. ročník SŠ

**Kód předmětu:** ROB 3  
**Ročník:** 3. ročník SŠ  
**Obor:** 18-20-M/01 Informační technologie  
**Hodinová dotace:** 2 hodiny týdně / 66 hodin ročně (33 týdnů)  
**Forma výuky:** Teorie a praktická laboratorní cvičení (1:1 / 1:2 na fyzickém hardware)  
**Hardware stack:** BBC micro:bit v2, Elecfreaks IOKit (senzory), Elecfreaks Cutebot (diferenciální podvozek)  
**Software stack:** MicroPython, VS Code / Python Editor for micro:bit  

---

## 1. Napojení na Rámcový vzdělávací program (RVP)

### Kód a název oboru:
18-20-M/01 Informační technologie

### Klíčové kompetence RVP:
- **Kompetence k řešení problémů:** Žák analyzuje fyzikální a senzorický problém reálného světa, navrhuje algoritmy pro kompenzaci nepřesností měření a mechanických tolerancí robotu.
- **Kompetence pracovní a digitální:** Ovládá nástroje pro programování mikrokontrolérů, bezpečně manipuluje s elektronickými stavebnicemi, akumulátory a mechatronickými pohony.

### Odborné kompetence a očekávané výstupy RVP:
- Volí a konfiguruje vhodné technické prostředky vestavných systémů.
- Navrhuje a programuje algoritmy řízení reálných mechatronických soustav.
- Aplikuje zásady neblokujícího programování a obsluhy periferií vestavného mikropočítače.
- Využívá bezdrátovou komunikaci pro telemetrii a dálkové ovládání mobilního systému.

---

## 2. Školní vzdělávací program (ŠVP InspIS)

### Cíle předmětu:
Cílem předmětu je převést studenta ze světa čistě virtuálního software na monitoru počítače do **světa fyzických mechatronických a vestavných systémů**. Student se učí porozumět architektuře mikrokontrolérů (MCU), práci s fyzickými GPIO piny, zpracování analogových signálů ze senzorů a řízení reálných motorů mobilního robota.

### Profil absolventa:
Absolvent předmětu rozumí rozdílu mezi operačním systémem PC a jednočipovým mikrokontrolérem. Dokáže navrhnout neblokující stavový automat (FSM), implementovat softwarovou filtraci šumu senzorů, zkalibrovat diferenciální podvozek mobilního robota a realizovat autonomní sledování trasy pomocí proporcionální regulace.

---

## 3. Výsledky vzdělávání a rozpis učiva (ŠVP InspIS)

| Výsledky vzdělávání (Žák:) | Rozpis učiva | Hodiny |
| :--- | :--- | :---: |
| • popíše architekturu jednočipového mikrokontroléru a porovná jej s univerzálním počítačem<br>• bezpečně zapojuje periferie na GPIO piny mikrokontroléru<br>• vytváří neblokující řídicí kód v MicroPythonu s využitím časových čítačů namísto blokujících prodlev<br>• navrhuje a implementuje stavové automaty (FSM) pro deterministické řízení logiky vestavného systému | **1. Architektura MCU a digitální GPIO**<br>• Architektura mikrokontroléru (jádro ARM Cortex-M4, paměť Flash a RAM, taktovací frekvence, spotřeba)<br>• Digitální vstupy a výstupy GPIO (logické úrovně, pull-up / pull-down rezistory, ochrana pinů)<br>• Časování a neblokující architektura (funkce `ticks_ms()`, periodické obslužné smyčky namísto `sleep()`)<br>• Deterministické řízení (koncept konečného stavového automatu FSM, stavy, přechody a události)<br>*PT - ČSP* | **10** |
| • vysvětlí princip převodu spojitého analogového signálu do digitální podoby (ADC převodník)<br>• připojuje a programově obsluhuje senzory fyzikálních veličin na sběrnici I2C<br>• navrhuje algoritmy pro softwarové filtrování šumu a kompenzaci kolísání měřených hodnot<br>• aplikuje hysterezi pro stabilní rozhodování v hraničních stavech | **2. Senzorika, ADC a sběrnice I2C**<br>• Analogový signál a ADC (vzorkování napětí, rozlišení převodníku, kvantování)<br>• Sériová sběrnice I2C (adresace periferií na sběrnici, vodiče SDA/SCL, čtení registrů senzorů)<br>• Zpracování signálu (šum reálného světa, plovoucí průměr, dolní propust)<br>• Prahování a hystereze (eliminace kmitání stavu na rozhraní prahových hodnot světla a vzdálenosti)<br>*PT - ČDS* | **14** |
| • popíše funkci H-můstku a princip pulzně-šířkové modulace (PWM) pro řízení stejnosměrných motorů<br>• ovládá kinematiku dvoukolového diferenciálního podvozku<br>• provádí kalibraci mechanických nesouměrností pohonu pro dosažení přímého směru jízdy<br>• implementuje plynulý rozjezd, brzdění a přesné otáčení na místě | **3. Pohony a diferenciální kinematika (Cutebot)**<br>• Řízení DC motorů (H-můstek, reverzace chodu, PWM střída a regulace rychlosti otáčení)<br>• Kinematika diferenciálního podvozku (rychlost levého a pravého kola, poloměr zatáčení, otáčení kolem středu)<br>• Hardwarová kalibrace (odchylky převodovek a motorů, trimování rychlostí pro přímou jízdu)<br>• Pohybové profily (proporcionální brzdění před překážkou, bezpečnostní zastavení)<br>*PT - ČSP* | **12** |
| • navrhne algoritmus sledování vodicí linie pomocí pole infračervených odrazových senzorů<br>• porovná a vyhodnotí diskrétní skokové řízení (Bang-Bang) oproti spojité proporcionální regulaci (P/PD)<br>• řeší krizové situace na trase (ztráta linie, pravoúhlé odbočky, křižovatky)<br>• naprogramuje autonomní chování mobilního robota v aréně | **4. Autonomní navigace a regulační smyčky**<br>• Detekce vodicí čáry (reflexní optické senzory, kontrast povrchu, kalibrace černé a bílé)<br>• Regulační algoritmy (diskrétní Bang-Bang regulace vs. spojitý proporcionální P/PD regulátor)<br>• Zpracování regulační odchylky (výpočet chyby vystředění na čáře, dynamická korekce rychlostí motorů)<br>• Řešení křižovatek a rozhodovací logika autonomního robota v aréně (Sumo výzva)<br>*PT - ČSP* | **18** |
| • nakonfiguruje bezdrátovou síťovou komunikaci na frekvenci 2.4 GHz mezi mikrokontroléry<br>• sestavuje a parsuje síťové telemetrické pakety pro přenos dat v reálném čase<br>• vytvoří bezdrátový ovladač mobilního robota s využitím vestavěného akcelerometru<br>• zprovozní monitorovací dispečink zobrazující stav autonomních robotů v síti | **5. IoT a bezdrátová telemetrie (micro:bit Radio)**<br>• Bezdrátový přenos dat (protokol micro:bit Radio, 2.4 GHz kanály, síťové skupiny)<br>• Struktura paketů (hlavička, identifikace odesílatele, datový náklad, parsování příkazů)<br>• Dálkové ovládání a interakce (využití vnitřního akcelerometru a gest pro řízení pohybu)<br>• Telemetrie a dispečink (sběr dat ze senzorů v reálném čase, diagnostika baterie a stavu robotů)<br>*PT - ČDS* | **12** |
| **Celková hodinová dotace ročníku:** | | **66 h** |

---

## 4. Tematický plán předmětu (Rozpis 66 hodin)

| Blok | Měsíce & Týdny | Tematický celek | Dotace | Cílové výstupy a praxe |
|:---:|:---:|---|:---:|---|
| **1** | **Září – Říjen** (1.–5. týden) | **Architektura MCU & GPIO** | 10 h | Architektura mikrokontroléru, MicroPython REPL, GPIO piny, časování bez sleep(), stavový automat FSM. |
| **2** | **Říjen – Listopad** (6.–12. týden) | **Senzorika, ADC & Sběrnice** | 14 h | Analogové senzory (IOKit), ADC převodník, I2C sběrnice (OLED displej, ultrazvuk), filtrace šumu, hystereze. |
| **3** | **Prosinec – Leden** (13.–18. týden) | **Pohony & Diferenciální kinematika** | 12 h | Cutebot podvozek, H-můstek, PWM regulace DC motorů, kalibrace přímého směru jízdy, pohybové profily. |
| **4** | **Únor – Duben** (19.–27. týden) | **Autonomní navigace & Řízení** | 18 h | IR sledovače čáry, Bang-Bang vs. proporcionální P/PD regulátor, křižovatky, autonomní Sumo aréna. |
| **5** | **Květen – Červen** (28.–33. týden) | **IoT & Bezdrátová telemetrie** | 12 h | micro:bit Radio 2.4 GHz, parsování paketů, dálkové ovládání akcelerometrem, telemetrický dispečink. |
| **Σ** | **Celý školní rok (33 týdnů)** | **Celkem** | **66 h** | **Pravidelná 2hodinová týdenní dotace (33 týdnů × 2 h)** |
