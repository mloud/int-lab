# Pracovní plán: Robotika a vestavěné systémy (ROB 3 & ROB 4)

**Cílový ročník:** 3. a 4. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin ročně (2 hodiny týdně, 33 týdnů)  
**Výchozí routy v IntLab:**  
- ROB 3 (3. ročník): `/specializovana/robotika-3`  
- ROB 4 (4. ročník): `/specializovana/robotika-4`  

---

## 🎯 Hlavní pedagogický cíl
Propojit programování v Pythonu s reálným fyzickým hardwarem:
- Ve 3. ročníku zvládnout vestavné systémy (BBC micro:bit v2 v MicroPythonu), čtení senzorů a IoT, mobilního robota Cutebot, základy 3D modelování pro robotiku a AI kameru SmartLens (10 tematických celků podle oficiálního ŠVP).
- Ve 4. ročníku ovládnout všesměrovou arénu VEX AIM, reálné průmyslové rameno KUKA (12 h bezpečné praxe s panelem smartPAD) a obhájit samostatný inženýrský maturitní projekt.

---

## 📊 Stav realizace na portálu IntLab

### 3. Ročník (ROB 3 – Micro:bit, IoT, Cutebot, 3D tisk, AI kamera – 66 h)
* [x] **1. Úvod do robotiky (2 h):** Architektura robotického systému, bezpečnost práce v laboratoři.
* [x] **2. Mikrokontroléry a programování (12 h):** BBC micro:bit v2, MicroPython, REPL konzole, GPIO, neblokující časování `ticks_ms()`, stavový automat FSM (`/robotika-3/mcu/*`).
* [x] **3. Senzory a zpracování dat (10 h):** Sběrnice I2C, OLED displej, IoT senzory prostředí, plovoucí průměr a filtrace šumu (`/robotika-3/senzory/*`).
* [x] **4. Řízení motorů a pohyb robotu (8 h):** Cutebot, H-můstek, PWM regulace, parkovací asistent se sonarem, sledování čáry (`/robotika-3/cutebot/*`).
* [x] **5. Autonomní robotika (6 h):** Rozhodovací logika, řešení bludiště a vyhýbání se překážkám (`/robotika-3/navigace/*`).
* [x] **6. 3D modelování a konstrukce (6 h):** Tinkercad / Onshape, tisk držáků senzorů na Prusa MINI.
* [x] **7. Internet věcí a komunikace (6 h):** Micro:bit Radio 2.4 GHz, M2M telemetrie a odesílání dat do cloudu ThingSpeak (`/robotika-3/iot/*`).
* [x] **8. Robotika a umělá inteligence (4 h):** SmartLens AI kamera, reakce na barvy a sledování míčku.
* [x] **9. Závěrečný robotický projekt (10 h):** Týmový vývoj a integrace zařízení v Pythonu.
* [x] **10. Prezentace a obhajoba projektu (2 h):** Živá demonstrace v aréně a obhajoba před třídou.

### 4. Ročník (ROB 4 – VEX AIM aréna, KUKA rameno, Inženýrský projekt – 66 h)
* [x] **1. Všesměrová mobilní robotika VEX AIM (28 h):** 6 robotů v aréně, 3 Omni kola, pohyb do všech směrů v Pythonu, elektromagnet na puky a třídní turnaj (`/robotika-4/aim-kinematika/*`).
* [x] **2. Průmyslová robotika s ramenem KUKA (12 h):** 6 dvouhodinovek: bezpečnost a E-Stop, ruční pojezd přes smartPAD v souřadnicích WORLD/BASE, Teach-In a Pick & Place manipulace s kostkou (`/robotika-4/kuka/*`).
* [x] **3. Závěrečný komplexní inženýrský projekt a obhajoba (26 h):** Samostatný vývoj na zvolené platformě, technická dokumentace a ústní maturitní obhajoba před komisí (`/robotika-4/projekt/*`).

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj)

- [ ] Doplnění interaktivních návodů a kódových snippetů v MicroPythonu do podkapitol na webu IntLab.
- [ ] Vytvoření interaktivního kontrolního kvízu bezpečnosti práce u ramene KUKA.
