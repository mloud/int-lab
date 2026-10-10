# Plán vývoje portálu (IntLab)

Tento dokument slouží jako hlavní rozcestník a to-do list pro náš projekt.

## 📝 Aktuální cíle
- [x] Dokumentace architektury a vize (viz `ARCHITECTURE.md`) ✅
- [x] Dynamické kurikulum s podporou více škol (SŠ Nerudovka Vimperk + Základní škola) ✅
- [x] Sjednocený brand "INTERAKTIVNÍ LAB" a červený testovací styl karet (`isTest: true`) ✅
- [x] Důkladné vyčištění kódu a odstranění zastaralých statických menu ✅
- [ ] **PLÁNOVANÝ DALŠÍ KROK: Přesun dat na server & Administrační rozhraní (CMS)** ⏳

---

## 🎯 Hlavní milník: Serverová data a Administrační rozhraní (CMS)
Cílem je umožnit správu škol, předmětů, ročníků a lekcí bez nutnosti ručních úprav kódu v gitu a rebuildu:
- [ ] **1. Architektura serverových dat / API:**
  - Návrh schématu pro školy, divize, ročníky, předměty a lekce/kapitoly (vycházející ze stávajícího `registry/types.ts`).
  - Volba backendu (např. Cloudflare D1 / KV, Supabase nebo serverless API).
- [ ] **2. Administrační rozhraní (Admin Panel):**
  - Vizuální rozhraní pro přidávání a úpravy položek kurikula.
  - Možnost dynamicky měnit pořadí kapitol, přepínat viditelnost (`isTest`, `hasSubchapters`).
  - Správa přístupových PINů pro testy (studentský a učitelský PIN).
- [ ] **3. Zabezpečení přístupu:**
  - Ochrana administrace (Cloudflare Access / GitHub OAuth nebo token-based autentizace).

---

## 🛑 Dokončeno v nedávných krocích
- ✅ **Multi-school podpora:** Přepínač škol na homepage (SŠ Nerudovka / ZŠ) s dynamickým filtrováním předmětů.
- ✅ **Čištění repozitáře:** Odstraněno 15+ zastaralých menu a dočasných scratch skriptů; build prochází čistě se 128 statickými stránkami.
- ✅ **Analytika:** Analytický dashboard v `/analytics` propojený s Cloudflare API.

---

## 🚀 Dlouhodobá roadmapa
- Přesun dat na server a admin panel
- Sledování pokroku žáků (Progress tracking / gamifikace)
- Rozšiřování interaktivního obsahu pro ZŠ i SŠ
