# Integrace s GitHub Pages

Tento projekt je nastaven tak, aby se po každém nahrání (pushnutí) změn do hlavní větve `main` na GitHubu automaticky sestavil a zveřejnil (nasadil) na **GitHub Pages**. 

Toho je dosaženo pomocí tzv. **GitHub Actions**, což je služba pro automatizaci přímo na GitHubu.

## Jak to celé funguje

1. **Commit a Push**: 
   Jakmile vývojář upraví kód, přidá (commitne) změny a odešle je (pushne) na vzdálený repozitář na GitHubu do větve `main`.

2. **Spuštění Action (Workflow)**: 
   GitHub zaznamená, že došlo ke změně v branchi `main` a podívá se do složky `.github/workflows/deploy.yml`. Tento soubor obsahuje návod pro GitHub, co má v takovém případě udělat.

3. **Kompilace (Build) aplikace**: 
   GitHub spustí na svém virtuálním serveru proces podobný tomu, jako byste aplikaci instalovali u sebe:
   - Nainstaluje si potřebné závislosti ze souboru `package.json` (příkaz `npm ci`).
   - Spustí sestavení pro produkční prostředí (příkaz `npm run build`), který pomocí nástroje Vite vytvoří optimalizované statické soubory (HTML, CSS a sbalený Javascript).

4. **Deploy (Nasazení) na GitHub Pages**: 
   Sestavené soubory (ze složky `dist`) Github přesune a vystaví na webovém serveru GitHub Pages.

## Důležitá nastavení

Aby tento proces fungoval, je třeba mít v repozitáři na GitHubu zapnuté nasazování přes GitHub Actions:
- V sekci **Settings** -> **Pages** -> **Build and deployment** musí být **Source** nastaveno na volbu **GitHub Actions**.

Zároveň má tento projekt v konfiguračním souboru `vite.config.ts` nastavenu hodnotu `base: '/int-lab/'`. To říká nástroji Vite, aby všechny cesty na webu pro linky a obrázky generoval pro podadresář `/int-lab/`, protože adresa aplikace na GitHub Pages je standardně ve formátu `https://<JMENO>.github.io/<NAZEV_REPOZITARE>/`.
