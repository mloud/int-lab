# Aktivní plánovací tabule: Robotika a vestavěné systémy (ROB 3 & ROB 4)

**Aktivní předmět:** Robotika 1 (3. ročník SŠ) & Robotika 2 (4. ročník SŠ, obor 18-20-M/01 Informační technologie)  
**Celková hodinová dotace:** 66 vyučovacích hodin ročně (2 hodiny týdně, 33 týdnů) na každý ročník  
**Dedikovaný podrobný plán:** [`doc/plans/PLAN_ROB.md`](plans/PLAN_ROB.md)  
**Výchozí routy v IntLab:**  
- ROB 3 (3. ročník): `/specializovana/robotika-3`  
- ROB 4 (4. ročník): `/specializovana/robotika-4`  

---

## 🎯 Hlavní pedagogický cíl předmětů
Propojit svět softwaru a programování s fyzickým hardwarem. 
- **Ve 3. ročníku (ROB 3 – Micro:bit v2, IOKit, Cutebot):** žák proniká do architektury vestavných systémů (MCU), digitálních a analogových GPIO, sběrnic (I2C), řízení DC motorů pomocí PWM, stavových automatů (FSM), proporcionální regulace sledování trasy a bezdrátové telemetrie (micro:bit Radio).
- **Ve 4. ročníku (ROB 4 – VEX AIM, KUKA EDU, Počítačové vidění, VEX IQ):** žák řeší holonomní (všesměrovou) kinematiku, lokalizaci pomocí AprilTags a AI kamery, kinematiku 6-osých průmyslových manipulátorů (KUKA, souřadnicové systémy WORLD/BASE/TOOL, trajektorie PTP/LIN) a týmový integrující maturitní projekt.

---

## 📊 Přehled tematických celků – Robotika 1 (3. ročník, 66 h)

| Kód | Tematický celek | Dotace | Klíčový hardware & software | Stav v aplikaci |
|:---:|---|:---:|---|:---:|
| **ROB3-1** | **Architektura MCU & GPIO** | 10 h | BBC micro:bit v2, GPIO piny, časování `ticks_ms`, stavový automat (FSM) | `/robotika-3/mcu/*` |
| **ROB3-2** | **Senzorika, ADC & Sběrnice** | 14 h | Elecfreaks IOKit, analogové vzorkování ADC, sběrnice I2C, filtrace šumu, hystereze | `/robotika-3/senzory/*` |
| **ROB3-3** | **Pohony & Diferenciální kinematika** | 12 h | Elecfreaks Cutebot, DC motory, H-můstek, PWM střída, kalibrace přímého směru | `/robotika-3/cutebot/*` |
| **ROB3-4** | **Autonomní navigace & Řízení** | 18 h | Sledování čáry, IR senzory, stavový automat vs. proporcionální P/PD regulátor, křižovatky | `/robotika-3/navigace/*` |
| **ROB3-5** | **IoT & Bezdrátová telemetrie** | 12 h | micro:bit Radio (2.4 GHz pakety), dálkové ovládání akcelerometrem, telemetrický dispečink | `/robotika-3/iot/*` |
| **Σ** | **Celkem 3. ročník** | **66 h** | **33 týdnů × 2 hodiny týdně** | |

---

## 📊 Přehled tematických celků – Robotika 2 (4. ročník, 66 h)

| Kód | Tematický celek | Dotace | Klíčový hardware & software | Stav v aplikaci |
|:---:|---|:---:|---|:---:|
| **ROB4-1** | **Všesměrová holonomní kinematika (VEX AIM)** | 14 h | 3-kolový omni podvozek, vektorový rozklad sil a rychlostí, elektromagnet, mechanický kicker | `/robotika-4/aim-kinematika/*` |
| **ROB4-2** | **Počítačové vidění & AI navigace** | 14 h | AI kamera HuskyLens / OpenMV, Visual Servoing, 2D poziční značky AprilTags, sledování cílů | `/robotika-4/aim-vision/*` |
| **ROB4-3** | **Inženýrská mechanika & Smart motory (VEX IQ)** | 14 h | Smart motory s optickými enkodéry, točivý moment, mechanické převody, odometrie, gyroskop | `/robotika-4/vex-iq/*` |
| **ROB4-4** | **Průmyslová robotika & Manipulátory (KUKA EDU)** | 14 h | 6-DoF kinematika, souřadnicové systémy (WORLD, BASE, TOOL), trajektorie PTP a LIN, KUKA WorkVisual / RoboDK | `/robotika-4/kuka/*` |
| **ROB4-5** | **Závěrečný komplexní kooperativní projekt** | 10 h | Integrace heterogenního HW (mobilní robot + průmyslová buňka + IoT dispečink), obhajoba | `/robotika-4/projekt/*` |
| **Σ** | **Celkem 4. ročník** | **66 h** | **33 týdnů × 2 hodiny týdně** | |
