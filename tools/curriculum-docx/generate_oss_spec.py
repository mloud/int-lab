"""
Generátor kurikulární specifikace InspIS pro Operační systémy (OSS 1–3).
Extrahuje data z doc/curriculum/SVP_INSPIS.md a sestavuje JSON specifikaci pro DOCX šablonu.
"""

import json
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
MD_PATH = os.path.join(ROOT, 'doc', 'curriculum', 'SVP_INSPIS.md')
OUT_JSON = os.path.join(os.path.dirname(__file__), 'oss_curriculum_spec.json')

with open(MD_PATH, encoding='utf-8') as f:
    txt = f.read()

sec2 = txt[txt.find('## II. Učební osnova: 1. Ročník'):txt.find('## III. Učební osnova: 2. Ročník')]
sec3 = txt[txt.find('## III. Učební osnova: 2. Ročník'):txt.find('## IV. Učební osnova: 3. Ročník')]
sec4 = txt[txt.find('## IV. Učební osnova: 3. Ročník'):]

def parse_section(sec_text):
    blocks = []
    lines = sec_text.split('\n')
    for l in lines:
        if l.startswith('| •'):
            parts = [p.strip() for p in l.split('|')[1:-1]]
            svp_raw = parts[0]
            content_raw = parts[1]
            hours = parts[2].replace('*', '').strip()
            
            m_title = re.match(r'\*\*([^*]+)\*\*', content_raw)
            title = m_title.group(1).strip() if m_title else content_raw.split('<br>')[0]
            clean_title = re.sub(r'^\d+\.\s*', '', title)
            
            svp_lines = [s.replace('•', '').strip() for s in svp_raw.split('<br>') if s.strip()]
            c_lines = [c.replace('•', '').strip() for c in content_raw.split('<br>') if c.strip() and not c.startswith('**') and not c.startswith('*PT')]
            
            blocks.append({
                'name': clean_title,
                'hours': hours,
                'svp': svp_lines,
                'ucivo': c_lines
            })
    return blocks

b1 = parse_section(sec2)
b2 = parse_section(sec3)
b3 = parse_section(sec4)

b1[0]['rvp'] = [
    'popíše, jakým způsobem operační systém zajišťuje své hlavní úkoly',
    'rozlišuje mezi používanými OS a zvolí vhodný OS s ohledem na jeho nasazení',
    'volí operační systém a vhodnou licenci',
    'uvede příklady použití'
]
b1[1]['rvp'] = ['nainstaluje operační systém']
b1[2]['rvp'] = ['popíše, jakým způsobem operační systém zajišťuje své hlavní úkoly']
b1[3]['rvp'] = ['nakonfiguruje operační systém pro použití periferních zařízení']
b1[4]['rvp'] = ['popíše, jakým způsobem operační systém zajišťuje své hlavní úkoly']
b1[5]['rvp'] = [
    'nastaví účty uživatelů a skupin a jejich oprávnění',
    'navrhne procesy zpracování dat a roli/role jednotlivých uživatelů'
]
b1[6]['rvp'] = ['zaktualizuje OS']
b1[7]['rvp'] = [
    'nakonfiguruje operační systém pro použití periferních zařízení',
    'orientuje se v možnostech výběru plánovacího software',
    'používá pokročilé funkce plánovacího software'
]
b1[8]['rvp'] = [
    'připojí počítač k internetu',
    'porovná jednotlivé způsoby propojení digitálních zařízení, charakterizuje počítačové sítě a internet; vysvětlí, pomocí čeho a jak je komunikace mezi jednotlivými zařízeními v síti zajištěna',
    'připojí a nakonfiguruje počítač v rámci počítačové sítě'
]
b1[9]['rvp'] = ['připojí a nakonfiguruje počítač v rámci počítačové sítě']

b2[0]['rvp'] = ['zálohuje OS a data']
b2[1]['rvp'] = [
    'zabezpečí počítače proti zneužití',
    'zajistí integritu, důvěrnost a bezpečnost dat v OS',
    'rozezná druhy škodlivého SW a aplikuje antivirus s pravidelnou aktualizací',
    'popíše a využívá instalaci certifikátů',
    'nakonfiguruje webového klienta podle požadavků a potřeb'
]
b2[2]['rvp'] = ['zaktivuje a nakonfiguruje síťové služby na osobním počítači']
b2[3]['rvp'] = [
    'zaktivuje a nakonfiguruje síťové služby na osobním počítači',
    'nakonfiguruje komunikační software podle požadavků a potřeb',
    'nastaví komunikační software'
]

b3[0]['rvp'] = [
    'rozlišuje mezi používanými OS a zvolí vhodný OS s ohledem na jeho nasazení',
    'nainstaluje operační systém'
]
b3[1]['rvp'] = [
    'definuje funkci a význam jednotlivých síťových služeb',
    'nastaví proxy server pro webový provoz',
    'zaktivuje a nakonfiguruje síťové služby na osobním počítači',
    'orientuje se v možnostech výběru plánovacího software',
    'používá pokročilé funkce plánovacího software'
]
b3[2]['rvp'] = [
    'vysvětlí principy činností SW prostředků pro nastavení kybernetické bezpečnosti',
    'nadefinuje pravidla pro bezpečnou práci na internetu',
    'zabezpečí počítače proti zneužití',
    'zabezpečí webový prohlížeč'
]
b3[3]['rvp'] = [
    'připojí a nakonfiguruje počítač v rámci počítačové sítě',
    'nastaví účty pro komunikaci'
]
b3[4]['rvp'] = ['popíše, jakým způsobem operační systém zajišťuje své hlavní úkoly']

unassigned = [
    'nastaví parametry běhu prezentace (např. časování, ovládání)',
    'odhaluje chyby v datech',
    'navrhne způsob využití informačního systému k řešení problému ve svém oboru, otestuje ho se skupinou uživatelů a vyhodnotí případné chyby, chybové stavy a jejich příčiny',
    'v případě personalizovaného obsahu dokáže identifikovat obsah generovaný algoritmy doporučovacích systémů'
]

spec = {
    'grades': [
        {
            'grade': '1. ročník',
            'hours_label': 'Počet vyučovacích hodin: 66',
            'blocks': b1
        },
        {
            'grade': '2. ročník',
            'hours_label': 'Počet vyučovacích hodin: 66',
            'blocks': b2
        },
        {
            'grade': '3. ročník',
            'hours_label': 'Počet vyučovacích hodin: 66',
            'blocks': b3
        }
    ],
    'unassigned': unassigned
}

with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(spec, f, ensure_ascii=False, indent=2)

print(f"Uloženo: {OUT_JSON}")
