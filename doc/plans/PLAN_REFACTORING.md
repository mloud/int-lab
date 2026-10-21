# Pracovní plán: Technický dluh & Dekompozice monolitů (Pravidlo 13)

Tento dokument slouží k evidenci velkých souborů v aplikaci IntLab, které přesahují doporučenou délku (nad 700 řádků), a k plánování jejich systematického rozdělování do modulárních komponent.

---

## 🎯 Pravidlo 13 z AGENTS.md
* **Zákaz nových monolitů:** Každá komplexní kapitola s více záložkami nebo složitější logikou se ihned dělí do dedikované podsložky.
* **Orchestrátor kapitoly:** Hlavní soubor kapitoly slouží pouze jako štíhlý přepínač (~50–200 řádků) obalující šablonu.
* **Samostatné záložky a simulátory:** Každá záložka i simulátor mají vlastní komponentu a lokální stav.

---

## 🏆 Již dokončený refaktoring (Úspěšně dekomponováno)

1. **`MalwareDetectionChapter.tsx` (OSS 2 – Bezpečnost BZ1):**
   * *Původní stav:* 3 492 řádků v jediném souboru.
   * *Nový stav:* Orchestrátor 42 řádků + podsložka `components/.../malware/` se 7 samostatnými komponentami.
2. **`ProcessCertificatesChapter.tsx` (OSS 2 – Bezpečnost BZ2):**
   * *Původní stav:* 2 457 řádků v jediném souboru.
   * *Nový stav:* Orchestrátor 258 řádků + podsložka `components/.../procesy/` se 4 samostatnými záložkami.

---

## 📋 Backlog kandidátů na budoucí dekompozici

### Priorita 1 (Komponenty nad 1 000 řádků)
- [ ] **`OsArchitectureChapter.tsx` (1 454 řádků – OSS 1 Architektura):**
  - Cíl: Rozdělení do podsložky `architektura/` (`ArchitectureTheoryTab`, `SyscallsSimulator`, `KernelTypesTab`, `ArchitectureQuizTab`).
- [ ] **`WindowsInstallGame.tsx` (1 352 řádků – OSS 1 Instalace):**
  - Cíl: Rozdělení do podsložky `instalace/` (`UefiSetupSimulator`, `DiskPartitionWizard`, `OobeConfigWizard`, `installTypes.ts`).
- [ ] **`ScratchRaycasterProject.tsx` (1 194 řádků – PRG 1 Raycaster):**
  - Cíl: Rozdělení do podsložky `raycaster/` (`RaycasterCanvas`, `RaycasterMapEditor`, `raycasterEngine.ts`).
- [ ] **`OsEvolutionChapter.tsx` (1 091 řádků – OSS 1 Vývoj OS):**
  - Cíl: Rozdělení do podsložky `vyvoj/` (`EvolutionTimelineTab`, `FamilyTreeTab`, `evolutionData.ts`).
- [ ] **`HuffmanGame.tsx` (1 024 řádků – Informatika ZŠ Komprese):**
  - Cíl: Rozdělení do podsložky `huffman/` (`HuffmanTreeCanvas`, `HuffmanTable`, `huffmanLogic.ts`).

### Priorita 2 (Komponenty 700–1 000 řádků)
- [ ] `BarChartsChapter.tsx` (921 řádků – INF grafy)
- [ ] `VonNeumannGame.tsx` (895 řádků – OSS 1 hardware)
- [ ] `ScratchConditionsChapter.tsx` (815 řádků – PRG 1 podmínky)
- [ ] `FatChapter.tsx` (791 řádků – OSS 1 FS)
- [ ] `DiskMediaChapter.tsx` (765 řádků – OSS 1 FS)
- [ ] `BackupCobianChapter.tsx` (740 řádků – OSS 2 zálohování)
