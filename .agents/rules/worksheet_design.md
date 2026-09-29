---
description: Pravidla pro tvorbu interaktivních pracovních listů a úkolů v aplikaci.
---

# Tvorba Pracovních Listů (Worksheets)

Kdykoliv budeš požádán o vytvoření "pracovního listu" (worksheet) pro libovolnou kapitolu v aplikaci, **MUSÍŠ VŽDY** dodržet tyto 3 základní požadavky:

## 1. Zvýrazněné tlačítko "Pracovní list" v menu/záložkách
- Záložka (nebo tlačítko), která přepíná na pracovní list, musí vždy nést přesný název `"Pracovní list"`.
- Musí být vizuálně zvýrazněna oproti ostatním záložkám (např. pomocí jiné barvy pozadí – např. `bg-emerald-50 text-emerald-700` jako kontrast k výchozí šedé nebo modré, a musí mít výraznou ikonu jako `CheckSquare`).

## 2. Dočasné ukládání stavu (Auto-save)
- Pracovní list musí být odolný proti restartu nebo zavření prohlížeče.
- Pro všechna textová pole, checkboxy a jméno studenta použij `localStorage` v Reactu.
- **Implementace:** Načti data v `useEffect` při startu komponenty a ukládej je přes debounced `useEffect` (např. `setTimeout` na 500ms) při každé změně.
- Na obrazovce by měl být vždy vizuální indikátor stavu ukládání ("Ukládám..." a "Uloženo").

## 3. Export pro Google Docs (.doc / HTML Blob)
- Na konci pracovního listu musí být vždy povinné pole "Jméno studenta".
- Velké, zvýrazněné tlačítko na stažení smí být aktivní, pouze pokud je jméno vyplněno.
- Kliknutím na tlačítko se nesmí generovat pouhý prostý text, ale musí se vygenerovat **editovatelný formát podporovaný Google Docs**.
- **Implementace:** Vygeneruj validní HTML string obsahující zadání i odpovědi studenta (včetně CSS stylů pro pěkné formátování), vlož tento string do `Blob` s MIME typem `application/msword` a stáhni soubor s příponou `.doc`. Tento trik zaručí, že po nahrání na Google Drive se dokument perfektně otevře v Google Docs včetně veškerého formátování, tučného písma a odpovědí, které tam student může dál editovat.
