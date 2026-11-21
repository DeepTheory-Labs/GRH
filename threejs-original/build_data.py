"""Build the Riemann proof atlas from both blueprints and the pinned Lean environment."""
import csv
import hashlib
import html
import json
import os
from collections import defaultdict
from pathlib import Path
import re
import subprocess
import sys
import tempfile
from urllib.parse import quote

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
ARCH = ROOT / 'leanarchitect-blueprint'
VERSO = ROOT / 'proof-blueprint'
MATH = ARCH / '.lake/packages/mathlib'
sys.path[:0] = [str(ARCH), str(VERSO)]
sys.dont_write_bytecode = True
from assemble import declaration, formal, traced
from check_sources import validate
from render import extract_graph

# Keep the mathematical objects and lemmas legible in the initial graph. The complete
# unfiltered direct dependency table is also exported and includes elaborator instances.
TITLES = {
    'Complex.Gamma': 'Complex gamma function',
    'Complex.Gamma_ne_zero_of_re_pos': 'Gamma is nonzero on the right',
    'Complex.Gammaℝ': 'Real gamma factor Γℝ',
    'Complex.Gammaℝ_eq_zero_iff': 'Zeros of Γℝ',
    'Complex.Gammaℝ_ne_zero_of_re_pos': 'Γℝ is nonzero on the right',
    'Complex.cos': 'Complex cosine',
    'Complex.cos_eq_zero_iff': 'Zeros of complex cosine',
    'Complex.cpow_ne_zero_iff': 'Nonvanishing of a complex power',
    'Complex.norm_natCast_cpow_of_pos': 'Norm of an integer base to a complex power',
    'DirichletCharacter': 'Dirichlet characters',
    'DirichletCharacter.Even': 'Even characters',
    'DirichletCharacter.Even.gammaFactor_def': 'Gamma factor of an even character',
    'DirichletCharacter.IsPrimitive': 'Primitive characters',
    'DirichletCharacter.IsPrimitive.completedLFunction_one_sub': 'Dirichlet functional equation',
    'DirichletCharacter.LFunction': 'Dirichlet L-function',
    'DirichletCharacter.LFunction_changeLevel': 'Change of level for L-functions',
    'DirichletCharacter.LFunction_eq_completed_div_gammaFactor': 'Recover L from its completion',
    'DirichletCharacter.LFunction_modOne_eq': 'The level-one L-function is zeta',
    'DirichletCharacter.Odd': 'Odd characters',
    'DirichletCharacter.Odd.gammaFactor_def': 'Gamma factor of an odd character',
    'DirichletCharacter.changeLevel': 'Change a character’s level',
    'DirichletCharacter.changeLevel_primitiveCharacter': 'Recover a character from its primitive part',
    'DirichletCharacter.completedLFunction': 'Completed Dirichlet L-function',
    'DirichletCharacter.conductor': 'Character conductor',
    'DirichletCharacter.conductor_dvd_level': 'The conductor divides the level',
    'DirichletCharacter.conductor_inv': 'Conductor of an inverse character',
    'DirichletCharacter.conductor_ne_zero': 'The conductor is nonzero',
    'DirichletCharacter.even_or_odd': 'Parity of a character',
    'DirichletCharacter.gammaFactor': 'Archimedean gamma factor',
    'DirichletCharacter.isPrimitive_def': 'Primitivity in terms of the conductor',
    'DirichletCharacter.norm_le_one': 'Character norm is at most one',
    'DirichletCharacter.primitiveCharacter': 'Associated primitive character',
    'DirichletCharacter.primitiveCharacter_isPrimitive': 'The induced primitive character is primitive',
    'DirichletCharacter.rootNumber': 'Root number',
    'Real.pi_ne_zero': 'π is nonzero',
    'Real.rpow_lt_one_of_one_lt_of_neg': 'A negative real power is below one',
    'RiemannHypothesis': 'Riemann hypothesis statement',
    'completedRiemannZeta': 'Completed Riemann zeta function',
    'completedRiemannZeta_one_sub': 'Completed zeta functional equation',
    'riemannZeta': 'Riemann zeta function',
    'riemannZeta_def_of_ne_zero': 'Zeta from completed zeta',
    'riemannZeta_ne_zero_of_one_le_re': 'Zeta is nonzero for Re(s) ≥ 1',
    'riemannZeta_one_sub': 'Zeta functional equation',
    'riemannZeta_zero': 'Value of zeta at zero',
}
EXTRA_PROJECT_TITLES = {
    'reciprocity_from_literature': 'Local reciprocity from the literature',
    'covolume_bound': 'Arithmetic covolume bound', 'theta_to_Galois': 'From a theta lift to Galois data',
    'theta_lift': 'Theta lift', 'third_place_inputs': 'Third-place eigenvalue inputs',
    'theta_local_inputs': 'Local theta inputs', 'theta_matching': 'Theta integrals and local matching',
}


def extract_mathlib(names):
    with tempfile.TemporaryDirectory() as tmp:
        declarations = Path(tmp) / 'declarations.txt'
        declarations.write_text('\n'.join(names) + '\n')
        output = subprocess.check_output(['lake', 'env', 'lean', str(HERE / 'ExtractMathlib.lean')],
            cwd=ARCH, env={**os.environ, 'ATLAS_DECLARATIONS': str(declarations)}, text=True)
    rows = []
    for text in output.splitlines():
        if text.startswith('ATLAS\t'):
            _, owner, part, dep, module, line = text.split('\t')
            rows.append((owner, part, dep, module, int(line)))
    return sorted(set(rows))


def build():
    arch, edges, _ = extract_graph()
    verso = json.loads((VERSO / 'nodes.json').read_text())
    validate(verso)
    v_by_name = {v['decl']: v for v in verso}
    a_by_name = {n['name']: k for k, n in arch.items()}
    pin = next(p['rev'] for p in json.loads((ARCH / 'lake-manifest.json').read_text())['packages'] if p['name'] == 'mathlib')
    if subprocess.check_output(['git','rev-parse','HEAD'], cwd=MATH,text=True).strip() != pin:
        raise ValueError('Mathlib checkout does not match the blueprint manifest')
    nodes, links, sources = {}, {}, []
    excerpts = {}
    for item in formal + traced:
        key, name = item[:2]
        line, _, body = declaration(item)
        a = arch[key]
        if hashlib.sha256(body.encode()).hexdigest() != a['sha256'] or line != a['line']:
            raise ValueError('Stale blueprint source index for ' + name)
        excerpts[key] = body
        v = v_by_name.get(name)
        blue = '../leanarchitect-original/index.html#' + key
        url = '../verso-original/site/sources.html#' + v['label'] if v else blue
        nodes[key] = dict(id=key, name=name, title=a['title'], group=v['group'] if v else 'Analytic reductions',
            kind='project', summary=a['summary'], source=a['source'], line=line, url=url, blueprintUrl=blue,
            status='Compiled in LeanArchitect' if a['kind']=='compiled' else 'Traced in source')
    label_id = {}
    for v in verso:
        key = a_by_name.get(v['decl'], v['label'])
        label_id[v['label']] = key
        if key in nodes:
            assert nodes[key]['source'] == v['file'] and nodes[key]['line'] == v['line']
        else:
            url = '../verso-original/site/sources.html#' + v['label']
            nodes[key] = dict(id=key, name=v['decl'], title=EXTRA_PROJECT_TITLES[key], group=v['group'],
                kind='project', summary=v['summary'], source=v['file'], line=v['line'], url=url,
                blueprintUrl='../verso-original/site/index.html#--informal-preview-'+v['label']+'--statement',status='Traced in source')
    def link(dep, owner, kind, evidence, url):
        pair = (dep, owner)
        if pair in links:
            links[pair]['evidence'] += ' ' + evidence
        else:
            links[pair] = {'from':dep,'to':owner,'kind':kind,'evidence':evidence,'url':url}
    for dep, owner, kind in edges:
        key = {'type':'Statement','proof':'Proof term','trace':'Source reference'}[kind]
        evidence = {'type':'LeanArchitect found this declaration in the elaborated type.',
                    'proof':'LeanArchitect found this declaration in the elaborated proof.',
                    'trace':'The LeanArchitect source note cites this prerequisite.'}[kind]
        link(dep, owner, key, evidence, nodes[owner]['url'])
    for v in verso:
        for e in v['uses']:
            dep,owner = label_id[e['node']], label_id[v['label']]
            url = f"../verso-original/site/sources.html#{v['label']}-L{e['line']}"
            link(dep,owner,'Source reference',f"The original proof names it at {v['file'].split('/')[-1]} line {e['line']}.",url)
            links[(dep,owner)]['url'] = url

    compiled = [n['name'] for n in arch.values() if n['kind']=='compiled']
    rows = extract_mathlib(compiled + list(TITLES))
    project_rows = [r for r in rows if r[0] in compiled]
    assert set(compiled) == {r[0] for r in project_rows}
    with (HERE/'mathlib-references.tsv').open('w',newline='') as file:
        out = csv.writer(file, delimiter='\t',lineterminator='\n')
        out.writerow(['project_declaration','expression','mathlib_constant','mathlib_module','declaration_line'])
        out.writerows(project_rows)
    locs = {name:(mod,line) for _,_,name,mod,line in project_rows if name in TITLES}
    assert set(locs) == set(TITLES)
    mid = lambda name: 'math-' + name
    for name, title in TITLES.items():
        mod, line = locs[name]
        file = mod.replace('.','/') + '.lean'
        src = (MATH / file).read_text().splitlines()
        assert line and name.split('.')[-1] in src[line-1], (name, line)
        key = mid(name)
        url = 'mathlib-sources.html#' + quote(key)
        end = line
        while end < min(line+14,len(src)) and ':=' not in src[end-1] and ' where' not in src[end-1] and src[end].strip():
            end += 1
        statement = '\n'.join(src[line-1:end])
        signature = re.split(r'\s+:=|\s+where\b', statement, maxsplit=1)[0]
        github = 'https://github.com/leanprover-community/mathlib4/blob/'+pin+'/'+quote(file)+'#L'+str(line)
        nodes[key] = dict(id=key, name=name, title=title, group='Mathlib', kind='mathlib', summary=signature,
            source=file, line=line, url=url, upstreamUrl=github, status='Pinned Mathlib declaration')
        sources.append((key,name,file,line,src[max(0,line-3):min(len(src),end+3)],max(1,line-2),github))
    paired = defaultdict(set)
    for owner,part,dep,mod,line in rows:
        if dep in TITLES:
            paired[dep,owner].add(part)
    definitions = {item[1] for item in formal if excerpts[item[0]].startswith('def ')}
    for (dep,owner),phases in paired.items():
        key = a_by_name.get(owner) or mid(owner)
        body = 'definition body' if owner in definitions else 'proof term'
        phase = 'statement and '+body if len(phases)==2 else ('statement' if 'type' in phases else body)
        kind = phase[0].upper()+phase[1:]
        link(mid(dep),key,kind, f'The elaborated {phase} of {owner} directly contains the constant {dep}.',nodes[key]['url'])
    # The public theorem uses the Mathlib proposition as its entire statement.
    pub = nodes['mainRH']; original = (ROOT/'lean/src'/pub['source']).read_text().splitlines()[pub['line']-1]
    assert re.match(r'theorem riemannHypothesis\s*:\s*RiemannHypothesis\s*:=',original)
    link(mid('RiemannHypothesis'),'mainRH','Source statement','The original public declaration states Mathlib’s RiemannHypothesis verbatim.',pub['url'])
    targets = {k for k,n in nodes.items() if n['group']=='Public conclusions'}
    parents = defaultdict(list)
    for dep,owner in links:
        assert dep in nodes and owner in nodes and dep != owner
        parents[owner].append(dep)
    seen = set()
    def visit(node, stack):
        if node in stack: raise ValueError('Cycle through ' + node)
        if node in seen: return
        for prev in parents[node]: visit(prev, stack | {node})
        seen.add(node)
    for key in targets: visit(key,set())
    assert len(targets)==5 and set(nodes)==seen
    info = dict(mathlibRev=pin, compiledProjectDeclarations=len(compiled), rawReferences=len(project_rows),
        rawConstants=len({r[2] for r in project_rows}), projectNodes=len(nodes)-len(TITLES),mathlibNodes=len(TITLES),
        leanVersion=(ARCH/'lean-toolchain').read_text().strip(),fullTable='mathlib-references.tsv')
    data = dict(meta=info,nodes=list(nodes.values()),edges=list(links.values()))
    (HERE/'graph-data.js').write_text('window.PROOF_ATLAS = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')
    publish_sources(sources,pin)
    print(f"{len(nodes)} nodes, {len(links)} edges. {len(project_rows)} direct project-to-Mathlib expression references.")


def publish_sources(sources,pin):
    esc = html.escape
    parts = ['<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Mathlib source excerpts · Proof atlas</title>',
        '<style>body{max-width:85ch;margin:auto;padding:2rem 1.2rem;background:#11151d;color:#eef0f1;font:16px/1.55 system-ui,sans-serif}section{margin:2.2rem 0;scroll-margin:1.2rem}h2,code{overflow-wrap:anywhere}h2{font-size:1.1rem}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#1c222e;padding:1rem;font-size:.88rem}a{color:#9bdcde}small{color:#b8c5cf}mark{background:#544520;color:#fff}nav{display:flex;gap:1rem}</style></head><body>',
        '<nav><a href="index.html">Back to the proof atlas</a></nav><h1>Mathlib source excerpts</h1>',f'<p>Exact source lines from Mathlib revision <code>{esc(pin)}</code>.</p>']
    for key,name,file,line,lines,start,url in sources:
        parts.append(f'<section id="{esc(key)}"><h2>{esc(name)}</h2><small>{esc(file)} · line {line}</small><pre>')
        for n,text in enumerate(lines,start):
            content = f'{n:>4}  '+esc(text)
            parts.append(('<mark>'+content+'</mark>' if n==line else content)+'\n')
        parts.append(f'</pre><a href="{esc(url)}">View pinned Mathlib source</a></section>')
    (HERE/'mathlib-sources.html').write_text(''.join(parts)+'</body></html>\n')


if __name__ == '__main__':
    build()
