# IntLab Analytics Dashboard

Analytický admin panel pro portál **IntLab** — zobrazuje statistiky návštěvnosti načítané z **Cloudflare Web Analytics API**.

## 🏗️ Architektura

```
IntLab (hlavní web)     IntLab Analytics (tento projekt)
    |                          |
GitHub Pages      ←→    Cloudflare Pages
                              ↕
                    Cloudflare Web Analytics API
```

**Zabezpečení:** Přístup řízen přes **Cloudflare Zero Trust Access** — přihlášení přes GitHub OAuth. Nikdo bez povoleného GitHub účtu stránku ani neuvidí.

## 🚀 Lokální spuštění

### 1. Naklonuj repozitář a přejdi do složky

```bash
cd analytics
npm install
```

### 2. Nastav environment variables

Zkopíruj soubor `.env.example` jako `.env.local` a doplň své hodnoty:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_CF_ACCOUNT_ID=tvuj_account_id
NEXT_PUBLIC_CF_API_TOKEN=tvuj_api_token
NEXT_PUBLIC_CF_SITE_TAG=tvuj_site_tag
```

**Jak najít hodnoty:**
- **Account ID:** `dash.cloudflare.com` → pravý panel
- **API Token:** `dash.cloudflare.com/profile/api-tokens` → Create Token → s oprávněním `Account Analytics Read`
- **Site Tag:** `dash.cloudflare.com` → Analytics → Web Analytics → vyber svůj web → Settings → Site Tag

### 3. Spusť dev server

```bash
npm run dev
# Dashboard je dostupný na http://localhost:3001
```

## 📦 Deploy na Cloudflare Pages

1. Přejdi na `dash.cloudflare.com` → **Pages** → Create a project
2. Připoj GitHub repozitář `IntLab`
3. Nastav:
   - **Root Directory:** `analytics`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. V sekci **Environment Variables** přidej tři proměnné (stejné jako v `.env.local`)
5. Nastav **Cloudflare Access** na tento Pages projekt:
   - Zero Trust → Access → Applications → Add Application
   - Zvol "Self-hosted" a nastav GitHub OAuth s tvojí email adresou/username

## 📊 Co dashboard zobrazuje

| Sekce | Obsah |
|-------|-------|
| **Přehled** | Celková zobrazení, návštěvníci, rychlost, trend v čase |
| **Stránky** | Všechny stránky portálu s počty zobrazení a časem načítání |
| **Geografie** | Rozložení návštěvníků podle zemí |
| **Zařízení** | Desktop vs. mobil vs. tablet + prohlížeče |
| **Referrery** | Odkud přicházejí návštěvníci |

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (Static Export)
- **UI:** React 19 + TypeScript
- **Grafy:** Recharts v3
- **Ikony:** Lucide React
- **Data:** Cloudflare Web Analytics GraphQL API
