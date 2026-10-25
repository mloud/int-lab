# Kurikulární a pedagogická znalostní databáze (ŠVP, RVP & Tematické plány)

Tato složka slouží jako **oficiální a trvalá znalostní báze pro výuku** na portálu IntLab. Je primárním zdrojem pravdy pro:
1. **Generování ŠVP (Školních vzdělávacích programů)** – formulace cílů, profilu absolventa a výsledků vzdělávání.
2. **Generování Tematických plánů** – přesné hodinové dotace, rozpis učiva po týdnech a blocích, rozdělení na teorii a praktická cvičení.
3. **Mapování na RVP (Rámcové vzdělávací programy)**:
   - RVP **18-20-M/01 Informační technologie** (Střední odborné vzdělávání)
   - RVP **Základní vzdělávání (RVP ZV)** – vzdělávací oblast *Informatika*
4. **Globální kurikulární dotazy** – návaznost mezi ročníky, mezipředmětové vazby, kontrola duplicit a didaktická gradace.

---

## 1. Struktura znalostních profilů

| Soubor | Kód předmětu | Oficiální název | Ročník | Dotace (týdně / ročně) | RVP Zaměření |
|---|---|---|---|---|---|
| [`OSS1.md`](./OSS1.md) | **OSS 1** | Operační systémy 1 | 1. Ročník SŠ | 2 h / 68 h | Hardware, Architektura OS, Disky, CLI, Win 11 |
| [`OSS2.md`](./OSS2.md) | **OSS 2** | Operační systémy 2 | 2. Ročník SŠ | 2 h / 68 h | Zálohování, Bezpečnost OS, Active Directory, Služby |
| [`OSS3.md`](./OSS3.md) | **OSS 3** | Operační systémy 3 & Linux | 3. Ročník SŠ | 2 h / 68 h | Administrace Linuxu, Kyberbezpečnost, Projekty |
| [`PRG_SVP_INSPIS.md`](./PRG_SVP_INSPIS.md) | **PRG 1–4** | Programování a vývoj aplikací | 1.–4. Ročník SŠ | 3-2-3-2 h / 314 h | Kompletní 4leté kurikulum (Scratch, Python, Unity, SQL, REST API, Git, Bezpečnost) |
| [`ROB3.md`](./ROB3.md) | **ROB 3** | Robotika a vestavěné systémy 1 | 3. Ročník SŠ | 2 h / 68 h | Micro:bit, Cutebot, Senzory, IoT |
| [`ROB4.md`](./ROB4.md) | **ROB 4** | Robotika a vestavěné systémy 2 | 4. Ročník SŠ | 2 h / 68 h | Průmyslová robotika, VEX IQ, Kinematika |
| [`INF_ZS.md`](./INF_ZS.md) | **INF ZŠ** | Informatika pro 2. stupeň ZŠ | 6.–9. Třída | 1–2 h / ročník | Nová informatika ZŠ (Kódování, Algoritmy, Data) |

---

## 2. Oficiální dokumentace pro InspIS ČŠI a externí reference

* [`PRG_SVP_INSPIS.md`](./PRG_SVP_INSPIS.md) – Oficiální ŠVP dokumentace předmětu *Programování a vývoj aplikací (PRG 1–4)* pro import do modulu InspIS ČŠI.
* [`SVP_INSPIS.md`](./SVP_INSPIS.md) – Oficiální ŠVP dokumentace předmětů *Operační systémy (OSS 1–3)*.
* [`references/horazdovice_svp_vyvoj_aplikaci_a_her.pdf`](./references/horazdovice_svp_vyvoj_aplikaci_a_her.pdf) – Kompletní akreditované kurikulum SŠ Horažďovice (*Vývoj aplikací a her*, 146 stran, 3.6 MB) uložené pro trvalou komparaci a harmonizaci.

---

## 3. Standardní struktura každého profilu předmětu

Každý soubor předmětu v této složce má jednotnou osnovu, která umožňuje okamžité strojové i lidské vyhledávání:
- **Část 1: Identifikace a časová dotace** (kód, ročník, formát výuky, učebny).
- **Část 2: Vztah k RVP 18-20-M/01** (vzdělávací okruhy, klíčové a odborné kompetence).
- **Část 3: Školní vzdělávací program (ŠVP)** (hlavní cíle, profil a kompetence absolventa).
- **Část 4: Detailní tematický plán** (tabulka tematických celků s přesnými hodinami, teorií vs. cvičením a očekávanými výstupy žáka).
- **Část 5: Mezipředmětové vazby** (vertikální spirála i horizontální synergie s hardwarem, sítěmi a programováním).
- **Část 6: Mapování na portál IntLab** (konkrétní routy, komponenty, simulátory a testovací PINy).
