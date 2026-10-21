# Pracovní plán: Robotika a vestavěné systémy (ROB 3 & ROB 4)

**Cílový ročník:** 3. a 4. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 66 vyučovacích hodin ročně (2 hodiny týdně)  
**Výchozí routy v IntLab:**  
- ROB 3 (3. ročník): `/specializovana/robotika-3`  
- ROB 4 (4. ročník): `/specializovana/robotika-4`  

---

## 🎯 Hlavní pedagogický cíl
Propojit software s fyzickým světem: od programování mikrokontrolérů (BBC micro:bit v2, senzory, motory, mobilní robot Cutebot) ve 3. ročníku po pokročilou průmyslovou robotiku (kinematika ramen KUKA, počítačové vidění, AprilTags, stavebnice VEX IQ) a realizaci komplexního týmového robotického projektu ve 4. ročníku.

---

## 📊 Stav realizace na portálu IntLab

### 3. Ročník (ROB 3 – Micro:bit, Cutebot, Senzory, IoT)
* [x] **MCU & GPIO:** Časování, přerušení, konektory, stavové automaty FSM (`/robotika-3/mcu/*`).
* [x] **Senzory:** Analogově-digitální převodník ADC, sběrnice I2C, ultrazvukový dálkoměr, filtrace šumu (`/robotika-3/senzory/*`).
* [x] **Mobilní robot Cutebot:** Řízení motorů, diferenciální podvozek, telemetrie (`/robotika-3/cutebot/*`).
* [x] **Autonomní navigace:** Sledovač čáry, řešení křižovatek, PID regulátor, Sumo aréna (`/robotika-3/navigace/*`).
* [x] **IoT & Rádiová komunikace:** Micro:bit rádio, síťové pakety, dálkové ovládání robota (`/robotika-3/iot/*`).

### 4. Ročník (ROB 4 – KUKA, Vision, Kinematika, VEX IQ)
* [x] **Průmyslová robotika KUKA:** Souřadnicové systémy (Base/Tool), dopředná a inverzní kinematika, Pick & Place úlohy, řízení fyzického ramene (`/robotika-4/kuka/*`).
* [x] **Počítačové vidění (Vision):** Barevná segmentace, lokalizace značek AprilTags, vizuální trasování objektu (`/robotika-4/aim-vision/*`).
* [x] **AIM Kinematika:** Vektorové řízení, všesměrové podvozky (Omni wheels), manipulátory v aréně (`/robotika-4/aim-kinematika/*`).
* [x] **VEX IQ:** Enkodéry, převody, odometrie, robotické mechanismy (`/robotika-4/vex-iq/*`).
* [x] **Týmový maturitní projekt:** Návrh systémové architektury, realizace a veřejná obhajoba (`/robotika-4/projekt/*`).

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj)

- [ ] Doplnění interaktivních simulátorů kinamatiky KUKA přímo do prohlížeče (3D vizualizace kloubů v Three.js).
- [ ] Vytvoření interaktivního PID simulátoru sledování čáry s grafem regulační odchylky.
