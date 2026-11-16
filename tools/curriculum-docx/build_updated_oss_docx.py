"""
Sestavovač oficiálního DOCX dokumentu pro Operační systémy a software (OSS 1–3).
Načte původní šablonu (včetně tabulek, šířek a stylů) a vygeneruje čistý DOCX pro všechny 3 ročníky.
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

def build_docx(orig_docx_path, out_docx_path, spec_json_path):
    with zipfile.ZipFile(orig_docx_path, 'r') as zin:
        xml_bytes = zin.read('word/document.xml')

    xml_str = xml_bytes.decode('utf-8-sig')

    m_root = re.match(r'^(<\?xml[^?]*\?>\s*)(<w:document\b[^>]*>)', xml_str)
    assert m_root, "Nelze naparsovat úvodní značku <w:document>"
    xml_decl = m_root.group(1)
    root_open_tag = m_root.group(2)

    for prefix, uri in re.findall(r'xmlns:([a-zA-Z0-9_]+)="([^"]+)"', root_open_tag):
        ET.register_namespace(prefix, uri)

    root = ET.fromstring(xml_bytes)
    body = root.find('w:body', NS)
    children = list(body)

    spacer_tpl = copy.deepcopy(children[4])
    t_grade_tpl = children[5]
    t_unassigned_tpl = children[7]

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

    t_unassigned_shell = copy.deepcopy(t_unassigned_tpl)
    for tr in t_unassigned_shell.findall('w:tr', NS):
        t_unassigned_shell.remove(tr)
    u_rows = t_unassigned_tpl.findall('w:tr', NS)
    u_row0_tpl = copy.deepcopy(u_rows[0])
    u_row1_tpl = copy.deepcopy(u_rows[1])

    para_counter = 0x3000
    def bump_para_id(elem):
        nonlocal para_counter
        for p in elem.iter(wtag('p')):
            para_counter += 1
            pid_attr = f'{{{W14_NS}}}paraId'
            if pid_attr in p.attrib:
                p.attrib[pid_attr] = f'{para_counter:08X}'

    def set_cell_lines(tc, lines):
        p = tc.find('w:p', NS)
        existing_runs = p.findall('w:r', NS)
        first_r = existing_runs[0]
        rpr_tpl = copy.deepcopy(first_r.find('w:rPr', NS))
        run_attribs = dict(first_r.attrib)

        for r in existing_runs:
            p.remove(r)

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
        t0 = runs[0].find('w:t', NS)
        t0.text = 'Tematický celek - '
        t1 = runs[1].find('w:t', NS)
        t1.text = topic_name

    with open(spec_json_path, 'r', encoding='utf-8') as f:
        spec = json.load(f)

    kept_head = children[:5]
    kept_tail = children[8:]

    for child in children:
        body.remove(child)

    for el in kept_head:
        body.append(el)

    for g in spec['grades']:
        tbl = copy.deepcopy(t_grade_shell)
        r0 = copy.deepcopy(row0_tpl)
        tcs0 = r0.findall('w:tc', NS)
        set_cell_lines(tcs0[0], ["Operační systémy a software"])
        set_cell_lines(tcs0[1], [g["grade"]])
        set_cell_lines(tcs0[2], [g["hours_label"]])
        bump_para_id(r0)
        tbl.append(r0)

        r1 = copy.deepcopy(row1_tpl)
        bump_para_id(r1)
        tbl.append(r1)

        for b in g["blocks"]:
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

    for el in kept_tail:
        body.append(el)

    body_xml_bytes = ET.tostring(body, encoding='utf-8')
    final_xml_str = xml_decl + root_open_tag + body_xml_bytes.decode('utf-8') + '</w:document>'

    with zipfile.ZipFile(orig_docx_path, 'r') as zin, zipfile.ZipFile(out_docx_path, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == 'word/document.xml':
                zout.writestr(item, final_xml_str.encode('utf-8'))
            else:
                zout.writestr(item, zin.read(item.filename))

    print(f"Úspěšně sestaven DOCX: {out_docx_path}")

if __name__ == '__main__':
    cur_dir = os.path.dirname(__file__)
    spec_path = os.path.join(cur_dir, 'oss_curriculum_spec.json')
    scratch_orig = r'C:\Users\mloud\.gemini\antigravity\brain\4a46149c-baa2-41bc-8ee3-f370a56528e4\scratch\oss_original.docx'
    scratch_out = r'C:\Users\mloud\.gemini\antigravity\brain\4a46149c-baa2-41bc-8ee3-f370a56528e4\scratch\oss_updated.docx'
    
    build_docx(scratch_orig, scratch_out, spec_path)
