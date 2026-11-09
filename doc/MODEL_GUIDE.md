# Průvodce výběrem AI modelů pro projekt IntLab

Tento dokument slouží jako stálá referenční příručka pro volbu optimálního AI modelu a úrovně přemýšlení (*Thinking Effort*) při vývoji výukové platformy **IntLab**.

---

## 1. Rychlá přehledová tabulka

| AI Model | Úroveň Thinking | Typ úkolu v IntLabu | Důvod a silná stránka |
| :--- | :---: | :--- | :--- |
| **Gemini 3.8 Flash** | **Low / Medium** | Běžné úpravy textů, didaktické zkrácení úloh, drobné opravy chyb, refaktoring popisků | Blesková odezva (sekundy), minimální latence, přesné plnění konkrétních pokynů. |
| **Claude Sonnet 5.5** | **Medium** | Tvorba UI komponent, Tailwind CSS styling, dělení monolitů na záložky, implementace lekcí | Špičkový frontendový kód, estetické cítění pro čisté UI, precizní dodržování pravidel z `AGENTS.md`. |
| **Claude Opus 5.5** | **High** | Složité simulátory, herní mechaniky, matematické modely (Raycaster, PID regulace, správa paměti) | Nejsilnější reasoning a hluboké logické uvažování, bezchybné vícevnořené algoritmy. |
| **Gemini 4 Argon** | **Medium / High** | Celoprojektové audity, synchronizace ŠVP kurikula napříč ročníky, rozsáhlé analýzy repozitáře | Obrovské 1M+ kontextové okno, nativní optimalizace v prostředí Antigravity, komplexní přehled o celém projektu. |
| **GPT-OSS 120B** | **Medium** | Nezávislá kontrola kódu v Pythonu, algoritmické verifikace | Efektivní open-weight model s alternativní perspektivou pro čistou syntaxi a logické testy. |

---

## 2. Podrobná charakteristika modelů pro IntLab

### 🔹 Claude Sonnet 5.5 (Doporučený hlavní model pro tvorbu kapitol a UI)
* **Kdy použít:**
  * Psaní nových interaktivních kapitol ve Scratchi, Pythonu a Operačních systémech.
  * Tvorba a úprava layoutů (`TaskCard`, `FsChapterShell`, `TechnicalCard`, `SchoolDivisionCard`).
  * Rozpad velkých monolitických komponent na záložky podle Pravidla 13 (`*TheoryTab.tsx`, `*SimulatorsTab.tsx`, `*LabTab.tsx`).
* **Doporučený Thinking:** **Medium**.

### 🔹 Gemini 3.8 Flash (Model pro rychlé denní iterace)
* **Kdy použít:**
  * Drobná didaktická vylepšení existujících úkolů (např. otočení směru čtení seznamu, zjednodušení textu úlohy Bankomat).
  * Rychlé vyhledávání v dokumentaci a kontrola stavu repozitáře.
  * Formátování markdownu a tabulek.
* **Doporučený Thinking:** **Low** pro textové korektury, **Medium** pro úpravu kódu.

### 🔹 Claude Opus 5.5 (Model pro nejsložitější logické a algoritmické výzvy)
* **Kdy použít:**
  * Implementace složitých simulátorů od nuly (simulátor přidělování paměti, plánovač procesů CPU, FAT alokace, 3D Raycaster).
  * Robotické kinematické výpočty (inverzní kinematika KUKA, odometrie Cutebot/VEX, filtrace senzorů).
  * Ladění zapeklitých TypeScript / React stavových bugů.
* **Doporučený Thinking:** **High**.

### 🔹 Gemini 4 Argon (Vlajková loď pro globální správu projektu)
* **Kdy použít:**
  * Práce s kurikulární znalostní databází (`doc/curriculum/OSS1.md`, `PRG1.md` atd.) a synchronizace s `registry/lessons.ts`.
  * Globální refaktoring zasahující desítky souborů napříč různými předměty.
  * Ověřování návaznosti učiva mezi 1., 2. a 3. ročníkem (didaktická gradace).
* **Doporučený Thinking:** **Medium / High**.

### 🔹 GPT-OSS 120B (Specialista na Python a algoritmy)
* **Kdy použít:**
  * Kontrola didaktické čistoty příkladů v jazyce Python (PRG 2).
  * Návrh a revize opakovacích kvízů a algoritmických hádanek.
* **Doporučený Thinking:** **Medium**.

---

## 3. Volba úrovně přemýšlení (Thinking Effort)

* **Low:** Pro přímé a jednoznačné úkoly (úpravy textů, přejmenování, formátování).
* **Medium (Výchozí):** Pro 80 % běžné práce — tvorbu komponent, úpravu logiky a psaní lekcí.
* **High:** Pro náročné algoritmické návrhy, tvorbu herních/fyzikálních simulátorů a hluboké plánování architektur.

