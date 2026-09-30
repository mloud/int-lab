---
description: Pravidla pro tvorbu a strukturu pracovních listů (Worksheets) v aplikaci IntLab.
---

# Zásady pro Pracovní listy (Worksheets)
Kdykoliv vytváříš nebo upravuješ "Pracovní list" (Worksheet) pro interaktivní kapitoly (např. v sekci Operační systémy nebo Sítě), musíš dodržovat následující standardy, abys zajistil jednotný vizuální vzhled a uživatelský zážitek.

## 1. Povinná struktura
Všechny pracovní listy musí sdílet jednotný obal (tzv. `WorksheetLayout`). Obalovací komponenta zajišťuje:
- **Jednotnou hlavičku:** S ikonou `CheckSquare` a jasným nadpisem.
- **Jméno žáka:** Fixní pole na začátku listu pro zadání jména a příjmení.
- **Tlačítko na stažení:** Na úplném konci listu, aktivní pouze tehdy, když je zadané jméno.
- **Generování `.doc`:** Mechanismus pro export HTML do kompatibilního Word dokumentu, kterému se předá obsah.

## 2. Trvalé uložení stavu (Persistent Storage)
Pracovní listy většinou obsahují mnoho vstupních polí (input, textarea, radio buttons). Studenti je vyplňují v průběhu delšího času (celá vyučovací hodina).
- **ZÁKAZ ztráty dat:** Kdykoliv student omylem obnoví stránku, NESMÍ přijít o svou práci.
- Všechna vstupní pole musí být řízena pomocí React state a jejich hodnoty musí být ukládány do `localStorage` (např. využitím hooku `useLocalStorage` namísto běžného `useState`). 
- Toto platí pro všechny prvky – texty, checkbox list, radio buttony i jméno.

## 3. Výstupy do dokumentu
Když žák klikne na tlačítko stažení, vygenerovaný `.doc` dokument (realizovaný formou HTML blob uložení s extenzí `.doc`) musí přesně kopírovat otázky a zadání, aby učitel mohl jasně číst odpovědi studenta. 

Používej sdílené komponenty z `components/common/worksheets/` k rychlému sestavení těchto listů.
