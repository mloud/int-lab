"""
Sestavovač oficiálního DOCX dokumentu pro Robotiku (ROB 3 a ROB 4).
Načte původní šablonu z Google Disku (Robotika_V2_original.docx),
využije XML šablony tabulek z InspIS (oss_original.docx) a vygeneruje kompletní DOCX
včetně identifikačních tabulek, hodinových dotací, učebních osnov ročníků a nepřiřazených RVP výstupů.
"""

import copy
import json
import os
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
W14_NS = 'http://schemas.microsoft.com/office/word/2010/wordml'
XML_NS = 'http://www.w3.org/XML/1998/namespace'
NS = {'w': W_NS, 'w14': W14_NS}

def wtag(name):
    return f'{{{W_NS}}}{name}'

def build_rob_docx(rob_orig_path, oss_tpl_path, spec_json_path, out_docx_path):
    # 1. Načíst původní document.xml z Robotika_V2_original.docx
    with zipfile.ZipFile(rob_orig_path, 'r') as zin:
        rob_xml_bytes = zin.read('word/document.xml')

    rob_xml_str = rob_xml_bytes.decode('utf-8-sig')

    m_root = re.match(r'^(<\?xml[^?]*\?>\s*)(<w:document\b[^>]*>)', rob_xml_str)
    assert m_root, "Nelze naparsovat úvodní značku <w:document> v šabloně Robotiky"
    xml_decl = m_root.group(1)
    root_open_tag = m_root.group(2)

    for prefix, uri in re.findall(r'xmlns:([a-zA-Z0-9_]+)="([^"]+)"', root_open_tag):
        ET.register_namespace(prefix, uri)

    root = ET.fromstring(rob_xml_bytes)
    body = root.find('w:body', NS)

    # 2. Načíst šablony tabulek osnov a nepřiřazených výstupů z oss_original.docx
    with zipfile.ZipFile(oss_tpl_path, 'r') as z_oss:
        oss_xml_bytes = z_oss.read('word/document.xml')
    oss_root = ET.fromstring(oss_xml_bytes)
    oss_body = oss_root.find('w:body', NS)
    oss_children = list(oss_body)

    spacer_tpl = copy.deepcopy(oss_children[4])
    t_grade_tpl = oss_children[5]
    t_unassigned_tpl = oss_children[7]

    # Šablona těla tabulky ročníku
    t_grade_shell = copy.deepcopy(t_grade_tpl)
    for tr in t_grade_shell.findall('w:tr', NS):
        t_grade_shell.remove(tr)

    g_rows = t_grade_tpl.findall('w:tr', NS)
    row0_tpl = copy.deepcopy(g_rows[0])
    row1_tpl = copy.deepcopy(g_rows[1])
    row_topic_tpl = copy.deepcopy(g_rows[2])
    row_merged_first_tpl = copy.deepcopy(g_rows[3])
    row_cont_tpl = copy.deepcopy(g_rows[4])
    row_single_tpl = copy.deepcopy(g_rows[7])

    # Šablona tabulky nepřiřazených výstupů
    t_unassigned_shell = copy.deepcopy(t_unassigned_tpl)
    for tr in t_unassigned_shell.findall('w:tr', NS):
        t_unassigned_shell.remove(tr)
    u_rows = t_unassigned_tpl.findall('w:tr', NS)
    u_row0_tpl = copy.deepcopy(u_rows[0])
    u_row1_tpl = copy.deepcopy(u_rows[1])

    # Počítadlo paraId
    para_counter = 0x5000
    def bump_para_id(elem):
        nonlocal para_counter
        for p in elem.iter(wtag('p')):
            para_counter += 1
            pid_attr = f'{{{W14_NS}}}paraId'
            if pid_attr in p.attrib:
                p.attrib[pid_attr] = f'{para_counter:08X}'

    def set_cell_lines(tc, lines):
        p = tc.find('w:p', NS)
        if p is None:
            p = ET.SubElement(tc, wtag('p'))

        existing_runs = p.findall('w:r', NS)
        run_attribs = {}
        rpr_tpl = None
        if existing_runs:
            first_r = existing_runs[0]
            rpr_el = first_r.find('w:rPr', NS)
            if rpr_el is not None:
                rpr_tpl = copy.deepcopy(rpr_el)
            run_attribs = dict(first_r.attrib)
            for r in existing_runs:
                p.remove(r)
        else:
            # Default run style for empty cell
            rpr_tpl = ET.Element(wtag('rPr'))
            ET.SubElement(rpr_tpl, wtag('rFonts'), {
                wtag('ascii'): 'Calibri',
                wtag('hAnsi'): 'Calibri',
                wtag('cs'): 'Calibri'
            })
            ET.SubElement(rpr_tpl, wtag('sz'), {wtag('val'): '20'})
            ET.SubElement(rpr_tpl, wtag('szCs'), {wtag('val'): '24'})

        r_el = ET.SubElement(p, wtag('r'), run_attribs)
        if rpr_tpl is not None:
            r_el.append(rpr_tpl)

        for idx, line in enumerate(lines):
            if idx > 0:
                ET.SubElement(r_el, wtag('br'), {wtag('type'): 'textWrapping'})
            t_el = ET.SubElement(r_el, wtag('t'), {f'{{{XML_NS}}}space': 'preserve'})
            t_el.text = line

        tail_r = ET.SubElement(p, wtag('r'), run_attribs)
        tail_rpr = ET.SubElement(tail_r, wtag('rPr'))
        ET.SubElement(tail_rpr, wtag('rtl'), {wtag('val'): '0'})

    def set_topic_row(tr, topic_name):
        tc = tr.find('w:tc', NS)
        p = tc.find('w:p', NS)
        runs = p.findall('w:r', NS)
        if len(runs) >= 2:
            t0 = runs[0].find('w:t', NS)
            if t0 is not None:
                t0.text = 'Tematický celek - '
            t1 = runs[1].find('w:t', NS)
            if t1 is not None:
                t1.text = topic_name
        else:
            set_cell_lines(tc, [f'Tematický celek - {topic_name}'])

    # 3. Načtení JSON specifikace Robotiky
    with open(spec_json_path, 'r', encoding='utf-8') as f:
        spec = json.load(f)

    def set_p_text(p, text):
        existing_runs = p.findall('w:r', NS)
        if existing_runs:
            first_r = existing_runs[0]
            t = first_r.find('w:t', NS)
            if t is not None:
                t.text = text
            for r in existing_runs[1:]:
                p.remove(r)
        else:
            r = ET.SubElement(p, wtag('r'))
            t = ET.SubElement(r, wtag('t'))
            t.text = text

    # 4. Úprava existujících prvků v hlavičce Robotika_V2_original.docx
    rob_children = list(body)
    
    # 4a. Titulek dokumentu (rob_children[0])
    title_p = rob_children[0]
    set_p_text(title_p, "Robotika")
    bump_para_id(title_p)

    # 4b. Tabulka 0: Počet vyučovacích hodin za týden (rob_children[1])
    tbl0 = rob_children[1]
    tbl0_rows = tbl0.findall('w:tr', NS)
    # Row 2: 1.roč(0), 2.roč(0), 3.roč(2), 4.roč(2), Celkem(4)
    r2_cells = tbl0_rows[2].findall('w:tc', NS)
    set_cell_lines(r2_cells[0], ["0"])
    set_cell_lines(r2_cells[1], ["0"])
    set_cell_lines(r2_cells[2], ["2"])
    set_cell_lines(r2_cells[3], ["2"])
    set_cell_lines(r2_cells[4], ["4"])
    bump_para_id(tbl0_rows[2])

    # Row 3: Volitelný ve 3. a 4. ročníku
    r3_cells = tbl0_rows[3].findall('w:tc', NS)
    set_cell_lines(r3_cells[0], [""])
    set_cell_lines(r3_cells[1], [""])
    set_cell_lines(r3_cells[2], ["Volitelný"])
    set_cell_lines(r3_cells[3], ["Volitelný"])
    set_cell_lines(r3_cells[4], [""])
    bump_para_id(tbl0_rows[3])

    # 4c. Tabulka 1: Identifikace a charakteristika předmětu (rob_children[3])
    tbl1 = rob_children[3]
    tbl1_rows = tbl1.findall('w:tr', NS)

    # Row 0: Název předmětu
    set_cell_lines(tbl1_rows[0].findall('w:tc', NS)[1], ["Robotika"])
    # Row 1: Oblast
    set_cell_lines(tbl1_rows[1].findall('w:tc', NS)[1], [spec['metadata']['fieldArea']])
    # Row 2: Charakteristika předmětu
    set_cell_lines(tbl1_rows[2].findall('w:tc', NS)[1], [spec['metadata']['description']])
    # Row 3: Obsahové, časové a organizační vymezení
    set_cell_lines(tbl1_rows[3].findall('w:tc', NS)[1], [spec['metadata']['scope']])

    # Přidání Row 4 (Integrace předmětů) a Row 5 (Způsob hodnocení žáků)
    if len(tbl1_rows) == 4:
        # Klonujeme řádek 3
        r4 = copy.deepcopy(tbl1_rows[3])
        r4_tcs = r4.findall('w:tc', NS)
        set_cell_lines(r4_tcs[0], ["Integrace předmětů"])
        set_cell_lines(r4_tcs[1], [spec['metadata']['integration']])
        bump_para_id(r4)
        tbl1.append(r4)

        r5 = copy.deepcopy(tbl1_rows[3])
        r5_tcs = r5.findall('w:tc', NS)
        set_cell_lines(r5_tcs[0], ["Způsob hodnocení žáků"])
        set_cell_lines(r5_tcs[1], [spec['metadata']['evaluation']])
        bump_para_id(r5)
        tbl1.append(r5)

    for tr in tbl1.findall('w:tr', NS):
        bump_para_id(tr)

    # 5. Vyčištění těla za Table 1 a příprava pro přidání nových tabulek
    # Zachováme prvních 5 elementů (0: p(title), 1: tbl0, 2: p(spacer), 3: tbl1, 4: p(spacer))
    # a na konec dáme sectPr
    kept_head = rob_children[:5]
    sect_pr = rob_children[-1]  # w:sectPr

    for ch in list(body):
        body.remove(ch)

    for el in kept_head:
        body.append(el)

    # 6. Přidání tabulek osnov pro 3. a 4. ročník
    for g in spec['grades']:
        tbl = copy.deepcopy(t_grade_shell)
        
        # Řádek 0: Název předmětu, Ročník, Hodinová dotace
        r0 = copy.deepcopy(row0_tpl)
        tcs0 = r0.findall('w:tc', NS)
        set_cell_lines(tcs0[0], ["Robotika"])
        set_cell_lines(tcs0[1], [g["grade"]])
        set_cell_lines(tcs0[2], [g["hours_label"]])
        bump_para_id(r0)
        tbl.append(r0)

        # Řádek 1: Záhlaví sloupců
        r1 = copy.deepcopy(row1_tpl)
        bump_para_id(r1)
        tbl.append(r1)

        # Bloky ročníku
        for b in g["blocks"]:
            # Řádek tematického celku
            rt = copy.deepcopy(row_topic_tpl)
            set_topic_row(rt, b["name"])
            bump_para_id(rt)
            tbl.append(rt)

            rvps = b["rvp"]
            n = len(rvps)
            if n == 1:
                rf = copy.deepcopy(row_single_tpl)
                tcs = rf.findall('w:tc', NS)
                set_cell_lines(tcs[0], [rvps[0]])
                set_cell_lines(tcs[1], b["svp"])
                set_cell_lines(tcs[2], b["ucivo"])
                bump_para_id(rf)
                tbl.append(rf)
            else:
                rf = copy.deepcopy(row_merged_first_tpl)
                tcs = rf.findall('w:tc', NS)
                set_cell_lines(tcs[0], [rvps[0]])
                set_cell_lines(tcs[1], b["svp"])
                set_cell_lines(tcs[2], b["ucivo"])
                bump_para_id(rf)
                tbl.append(rf)

                for i in range(1, n):
                    rc = copy.deepcopy(row_cont_tpl)
                    tcs_c = rc.findall('w:tc', NS)
                    set_cell_lines(tcs_c[0], [rvps[i]])
                    bump_para_id(rc)
                    tbl.append(rc)

        body.append(tbl)
        sp = copy.deepcopy(spacer_tpl)
        bump_para_id(sp)
        body.append(sp)

    # 7. Přidání tabulky nepřiřazených RVP výstupů
    utbl = copy.deepcopy(t_unassigned_shell)
    ur0 = copy.deepcopy(u_row0_tpl)
    bump_para_id(ur0)
    utbl.append(ur0)
    for u in spec['unassigned']:
        ur = copy.deepcopy(u_row1_tpl)
        set_cell_lines(ur.find('w:tc', NS), [u])
        bump_para_id(ur)
        utbl.append(ur)
    body.append(utbl)

    sp_end = copy.deepcopy(spacer_tpl)
    bump_para_id(sp_end)
    body.append(sp_end)

    # 8. Vrátit závěrečný w:sectPr
    body.append(sect_pr)

    # 9. Serializace XML
    body_xml_bytes = ET.tostring(body, encoding='utf-8')
    final_xml_str = xml_decl + root_open_tag + body_xml_bytes.decode('utf-8') + '</w:document>'

    # 10. Zápis výsledného docx souboru
    with zipfile.ZipFile(rob_orig_path, 'r') as zin, zipfile.ZipFile(out_docx_path, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == 'word/document.xml':
                zout.writestr(item, final_xml_str.encode('utf-8'))
            else:
                zout.writestr(item, zin.read(item.filename))

    print(f"Úspěšně sestaven DOCX pro Robotiku: {out_docx_path}")

if __name__ == '__main__':
    cur_dir = os.path.dirname(__file__)
    rob_orig = os.path.join(cur_dir, 'Robotika_V2_original.docx')
    oss_orig = r'C:\Users\mloud\.gemini\antigravity\brain\4a46149c-baa2-41bc-8ee3-f370a56528e4\scratch\oss_original.docx'
    spec_path = os.path.join(cur_dir, 'rob_curriculum_spec.json')
    rob_out = os.path.join(cur_dir, 'Robotika_V2_updated.docx')

    build_rob_docx(rob_orig, oss_orig, spec_path, rob_out)
