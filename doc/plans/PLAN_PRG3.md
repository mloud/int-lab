# Pracovní plán: Programování a vývoj aplikací 3 (PRG 3)

**Cílový ročník:** 3. ročník SŠ (Obor 18-20-M/01 Informační technologie)  
**Hodinová dotace:** 99 vyučovacích hodin (3 hodiny týdně, 33 týdnů)  
**Výchozí routa v IntLab:** `/specializovana/programovani-3`  
**Odpovídající profil kurikula (ŠVP InspIS):** [`doc/curriculum/PRG_SVP_INSPIS.md`](../curriculum/PRG_SVP_INSPIS.md)

---

## 🎯 Hlavní pedagogický cíl
Rozvoj dovedností v oblasti prostorových interaktivních prostředí a simulačních enginů (Unity) s lehkým skriptováním v 1. pololetí, a následný přechod k síťové architektuře klient–server, webovému backendu v jazyce **Python**, znovuvyužití znalostí jazyka SQL a tvorbě moderního aplikačního rozhraní (REST API) ve 2. pololetí.

---

## 📊 Stav realizace na portálu IntLab (Rozpis 99 hodin)

| Blok | Tematický celek | Dotace | Obsah a plánovaná témata | Stav na portálu |
|:---:|---|:---:|---|:---:|
| **1** | **Tvorba prostorové scény, prostředí a materiály v enginu Unity** *(Září – Říjen)* | **20 h** | • Seznámení s editorem Unity, struktura projektu<br>• Prostorová scéna, souřadnice X/Y/Z, hierarchie objektů<br>• Transformace objektu (posun, rotace, měřítko)<br>• Tvorba prostředí, geometrie, zdi, podlahy<br>• Povrchové materiály, barvy, osvětlení a stíny<br>• Pohyb v prostoru ze školní šablony hráče | 🟡 K vytvoření |
| **2** | **Fyzikální model, prostorový zvuk, jednoduché skripty a export** *(Listopad – Leden)* | **25 h** | • Komponenta `Rigidbody`, gravitace, tření, kolize těles<br>• Detekční zóny (`isTrigger`), událost vstupu do zóny<br>• Jednoduché skripty interakce: zvednutí předmětu, rozsvícení světla, otevření dveří<br>• 3D prostorový zvuk (`AudioSource`) se směrovým útlumem<br>• Jednoduché animace posunu a rotace spouštěné interakcí<br>• Export spustitelné aplikace (Build) a volitelný test na cílovém zařízení (VR / interaktivní periférie) | 🟡 K vytvoření |
| **3** | **Základy síťové komunikace, architektura klient–server a Python backend** *(Únor – Březen)* | **24 h** | • Protokol HTTP, architektura klient–server, GET vs. POST, stavové kódy<br>• Sémantický web zaměřený na data: formuláře `<form>`, `<input>`, tabulky<br>• První síťové propojení desktopové aplikace z PRG 2 na server v Pythonu<br>• Aplikační backend v Pythonu (webový mikrorámec), směrování a endpointy<br>• Zpracování příchozích dat z formuláře a generování odpovědí | 🟡 K vytvoření |
| **4** | **Opakování jazyka SQL, integrace databáze s Pythonem a REST API** *(Duben – Červen)* | **30 h** | • Rekapitulace jazyka SQL (zopakování `SELECT`, `INSERT`, `UPDATE`, `DELETE` z předmětu Databáze)<br>• Databázový ovladač v Pythonu (SQLite), připojení a kurzor<br>• Bezpečné parametrizované dotazy z Python kódu<br>• Transformace dat z databáze do slovníků a seznamů v Pythonu<br>• REST API a formát JSON: server vrací strukturovaná data<br>• Komplexní systém: 1 server a databáze obsluhuje web i desktopovou aplikaci | 🟡 K vytvoření |
| **Σ** | **Celkem** | **99 h** | **Plně navrženo a harmonizováno** | |

---

## 🔥 Aktuální úkoly a Backlog (Další rozvoj PRG 3)

- [ ] Příprava školní Starter Template pro Unity (First-Person pohyb, interakční paprsek, světla a zvuky).
- [ ] Zpracování metodiky pro napojení Tkinter klienta na Python server (knihovna `requests`).
- [ ] Vytvoření ukázkového mikrorámce (Flask / FastAPI) propojujícího formulář, SQLite a JSON API.
