# Pracovní plán: Programování a vývoj aplikací 3 (PRG 3)

**Cílový ročník:** 3. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 99 vyučovacích hodin (3 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani-3`  
**Odpovídající profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](../curriculum/PRG_SVP_INSPIS.md)

---

## 🎯 Hlavní pedagogický cíl
Rozvoj dovedností v oblasti 3D prostorových interaktivních prostředí a herních či simulačních enginů (např. Unity) s lehkým skriptováním v 1. pololetí, a následný přechod k síťové architektuře klient–server, správě balíčků a backendu v jazyce **Python**, práci s databázovým úložištěm a tvorbě aplikačního rozhraní serveru (API) ve 2. pololetí.

---

## 📊 Stav realizace na portálu IntLab (Rozpis 99 hodin)

| Blok | Tematický celek | Dotace | Obsah a plánovaná témata | Stav na portálu |
|:---:|---|:---:|---|:---:|
| **1** | **Tvorba prostorové scény, prostředí a materiály ve 3D enginu** *(Září – Říjen)* | **20 h** | • Seznámení s editorem 3D enginu (např. Unity), struktura projektu<br>• Prostorová scéna, souřadnice X/Y/Z, hierarchie objektů<br>• Transformace objektu (posun, rotace, měřítko)<br>• Tvorba prostředí, geometrie, zdi, podlahy<br>• Povrchové materiály, barvy, osvětlení a stíny<br>• Pohyb v prostoru ze školní šablony hráče | 🟡 K vytvoření |
| **2** | **Fyzikální model, prostorový zvuk, jednoduché skripty a export** *(Listopad – Leden)* | **25 h** | • Komponenta `Rigidbody`, gravitace, tření, kolize těles<br>• Detekční zóny (`isTrigger`), událost vstupu do zóny<br>• Jednoduché skripty interakce: zvednutí předmětu, rozsvícení světla, otevření dveří<br>• 3D prostorový zvuk (`AudioSource`) se směrovým útlumem<br>• Jednoduché animace posunu a rotace spouštěné interakcí<br>• Export spustitelné aplikace (Build) a volitelný test na cílovém zařízení (VR / interaktivní periférie) | 🟡 K vytvoření |
| **3** | **Základy síťové komunikace, architektura klient–server a Python backend** *(Únor – Březen)* | **24 h** | • Protokol HTTP, architektura klient–server, GET vs. POST, stavové kódy<br>• Návrat k Pythonu po 3D grafice, instalace externích knihoven (`pip`) a dělení projektu do více modulů (`import`)<br>• Sémantický web zaměřený na data: formuláře `<form>`, `<input>`, tabulky<br>• První síťové propojení desktopové aplikace z PRG 2 na server v Pythonu<br>• Aplikační backend v Pythonu (Flask), směrování a endpointy<br>• Zpracování příchozích dat z formuláře a generování odpovědí | 🟡 K vytvoření |
| **4** | **Databáze a aplikační rozhraní serveru (API)** *(Duben – Červen)* | **30 h** | • Relační databáze a základní operace s daty<br>• Propojení serverové aplikace s databází a provádění dotazů<br>• Bezpečná práce s databází a ochrana před zneužitím vstupů<br>• Zpracování a transformace databázových dat v programu<br>• Tvorba aplikačního programového rozhraní (API) a obsluha klientů (web i desktop) | 🟡 K vytvoření |
| **Σ** | **Celkem** | **99 h** | **Plně navrženo a harmonizováno** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PRG 3)

- [ ] Příprava školní Starter Template pro Unity (First-Person pohyb, interakční paprsek, světla a zvuky).
- [ ] Zpracování metodiky pro napojení Tkinter klienta na Python server (knihovna `requests`).
- [ ] Vytvoření ukázkového backendu v Pythonu (Flask) propojujícího formulář, SQLite a JSON API.
