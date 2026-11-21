"""Render the LeanArchitect export and cross-check its nodes against the archive."""
from collections import Counter
from html import escape
from pathlib import Path
from xml.etree import ElementTree as ET
import json
import os
import re
import shutil
import subprocess
import textwrap

from assemble import HERE, declaration, formal, traced

BASE = HERE / 'export/blueprint/module'
DATA = json.loads((HERE / 'source-index.json').read_text())
TARGETS = ['mainRH','mainZeta','mainNV','mainStrip','mainPrim']

def extract_graph():
    exported = json.loads((BASE / 'RiemannArchitect.json').read_text())
    nodes = {}
    edges = set()
    for item in exported:
        form = item['type'] == 'node'
        if form:
            rec = item['data']
            key = rec['latexLabel']
            assert rec['hasLean'] and rec['name'] == DATA[key]['name']
            tex = (BASE / 'RiemannArchitect.artifacts' / (key+'.tex')).read_text()
            parts = re.split(r'\\begin\{proof\}',tex,maxsplit=1)
            # LeanArchitect's LaTeX contains inferred uses. The JSON stores attribute arguments.
            assert all(r'\leanok' in part for part in parts), key
        else:
            tex = item['data']
            key = re.search(r'\\label\{([^}]+)\}', tex).group(1)
            assert r'\leanok' not in tex
            parts = re.split(r'\\begin\{proof\}',tex,maxsplit=1)
        assert key not in nodes and DATA[key]['kind'] == ('compiled' if form else 'source'), key
        nodes[key] = DATA[key]
        for n,part in enumerate(parts):
            for raw in re.findall(r'\\uses\{([^}]+)\}',part):
                for dep in raw.split(','):
                    assert dep in DATA and dep != key, (key,dep)
                    edges.add((dep,key,'type' if n == 0 else ('proof' if form else 'trace')))
    assert nodes.keys() == DATA.keys()
    # Check that each source-traced proof's exported uses survived extraction.
    for key,_,_,_,_,deps in traced:
        assert {d for d,k,p in edges if p == 'trace' and k == key} == set(deps)
    for dep, use in [('factor','primZero'),('gamma','reflect'),('reflect','strip'),('strip','zeta'),('right','rhEvery'),('vGamma','crit')]:
        assert (dep,use,'proof') in edges, (dep,use)
    ancestors = {}
    def visit(k,stack=()):
        assert k not in stack, ('cycle',stack,k)
        if k not in ancestors:
            tree = {k}
            for d, use, kind in edges:
                if use == k:
                    tree.update(visit(d,stack+(k,)))
            ancestors[k] = tree
        return ancestors[k]
    for k in nodes:
        visit(k)
    assert set().union(*(ancestors[k] for k in TARGETS)) == set(nodes)
    return nodes, sorted(edges), ancestors


def render_svg(nodes, edges):
    lines = ['digraph Proof {','graph [rankdir=TB, nodesep=.22, ranksep=.55, pad=.14, bgcolor="white", outputorder=edgesfirst];','node [shape=box, style="rounded,filled", fontname="Helvetica", fontsize=11, margin=".12,.08", penwidth=1.2];','edge [color="#70869a", arrowsize=.58, penwidth=1.15];']
    for k,n in nodes.items():
        fill,stroke = ('#e0f4ee','#2a7059') if n['kind']=='compiled' else ('#edf2fb','#516c94')
        if k in TARGETS:
            fill,stroke='#223f65','#223f65'
        if k=='every':
            fill,stroke='#fff0d7','#a46622'
        title = '\n'.join(textwrap.wrap(n['title'],width=24,break_long_words=False))
        opts = {'id':'n-'+k,'label':title,'fillcolor':fill,'color':stroke,'fontcolor':'white' if k in TARGETS else '#183349','URL':'index.html#'+k,'tooltip':n['name']}
        lines.append(f'{k} ['+', '.join(a+'='+json.dumps(v,ensure_ascii=False) for a,v in opts.items())+'];')
    for dep,use,kind in edges:
        style={'trace':'dashed','type':'dotted','proof':'solid'}[kind]
        lines.append(f'{dep} -> {use} [id="e-{dep}-{use}", style="{style}", tooltip="{kind}"];')
    lines += ['{rank=same; '+'; '.join(TARGETS)+';}', '}']
    dot='\n'.join(lines)+'\n'
    (HERE/'dependencies.dot').write_text(dot)
    if (engine:=shutil.which('dot')):
        svg=subprocess.run([engine,'-Tsvg'],input=dot,text=True,capture_output=True,check=True).stdout
    else:
        wasm = HERE/'.lake/render-tools/package/dist/viz.cjs'
        node = os.environ.get('NODE') or shutil.which('node') or str(HERE/'.lake/render-tools/node/nodejs_wheel/bin/node')
        if not wasm.exists():
            raise SystemExit('Install Graphviz (dot) or unpack @viz-js/viz in .lake/render-tools/package.')
        js="require(process.argv[1]).instance().then(v=>process.stdout.write(v.renderString(require('fs').readFileSync(0,'utf8'),{format:'svg',engine:'dot'}))).catch(e=>{console.error(e);process.exit(1)});"
        svg=subprocess.run([node,'-e',js,str(wasm)],input=dot,text=True,capture_output=True,check=True).stdout
    ET.fromstring(svg)
    (HERE/'dependencies.svg').write_text(svg)
    return svg[svg.index('<svg'):]


def render_html(nodes,edges,ancestors,svg):
    def h(x):return escape(str(x),quote=True)
    labels = {'compiled':'Checked analytic declaration','source':'Source-traced declaration'}
    allitems={x[0]:x for x in formal+traced}
    cards=[]
    for k,meta in nodes.items():
        deps=sorted([(d,t) for d,u,t in edges if u==k],key=lambda pair:nodes[pair[0]]['title'])
        line,_,body=declaration(allitems[k]); assert line==meta['line']
        parents=''.join(f'<li><a href="#{d}">{h(nodes[d]["title"])}</a> <small>{ {"type":"statement","proof":"checked proof","trace":"source reference"}[t] }</small></li>' for d,t in deps)
        cards.append(f'''<article id="{k}" class="card"><header><span class="status {meta['kind']}">{labels[meta['kind']]}</span><h3>{h(meta['title'])}</h3></header><code class="name">{h(meta['name'])}</code><p>{h(meta['summary'])}</p>{('<ul>'+parents+'</ul>') if parents else ''}<details><summary>Original Lean declaration · line {line}</summary><pre><code>{h(body)}</code></pre></details><a class="file" href="https://github.com/leanprover-community/riemann-hypothesis/blob/e7c8972c701d3396947808ab20cc16dc14623d33/src/{h(meta['source'])}">{h(meta['source'])}</a></article>''')
    options=''.join(f'<option value="{k}">{h(nodes[k]["title"])}</option>' for k in TARGETS)
    state = json.dumps({k:sorted(v) for k,v in ancestors.items()})
    edge_json=json.dumps(edges)
    page='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Riemann proof · LeanArchitect</title><style>
*{box-sizing:border-box}body{margin:0;color:#1f3040;background:#f7f8fa;font:16px/1.5 system-ui,sans-serif}main{max-width:1500px;padding:clamp(16px,3vw,44px);margin:auto}h1,h2,h3{line-height:1.18;margin:.2rem 0 .65rem;font-family:Georgia,serif}h1{font-size:clamp(2.25rem,5vw,4.5rem);font-weight:500}h2{font-size:1.7rem;margin-top:1.3rem}.intro{max-width:83ch}.toolbar,.legend{display:flex;align-items:center;gap:1em;flex-wrap:wrap;margin:.8em 0}.toolbar select,button{font:inherit;padding:.4em .65em;border:1px solid #91a4b8;border-radius:4px;background:white;color:#183349}.viewport{background:white;border:1px solid #cbd5df;overflow:auto}.viewport svg{display:block;width:100%;height:auto}.viewport.actual svg{width:auto;max-width:none}.node,.edge{transition:opacity .14s}.dim{opacity:.10}.legend{font-size:.88rem}.line{display:inline-block;width:2rem;border-top:2px solid #425975;vertical-align:middle}.line.trace{border-top-style:dashed}.line.type{border-top-style:dotted}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,355px),1fr));gap:1rem}.card{padding:1rem;background:white;border:1px solid #d3dbe4;border-radius:5px;min-width:0;scroll-margin-top:1rem}.card:target{outline:3px solid #ab722b}.card h3{margin:.4em 0}.card ul{padding-left:1.2em}.file,.name{overflow-wrap:anywhere}.file,small,.status{font-size:.80rem}.status{color:#476187;font-weight:650}.status.compiled{color:#28654e}.file{display:block;margin-top:.5rem}summary{cursor:pointer}a{color:#245581}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:.78rem;line-height:1.38;background:#f5f7fa;padding:.65rem}.cards code{font-size:.82rem}label{font-weight:550}button{cursor:pointer}
</style></head><body><main><h1>Riemann proof structure</h1><p class="intro">The archive derives the five public statements from nonvanishing of Dirichlet L-functions to the right of the critical line. Follow the Galois row, local parameters and theta-matching inputs into that result, then follow each analytic deduction to its public name.</p><p class="intro">LeanArchitect checked the selected analytic statements and their proofs on Lean 4.33.1. The unconditional nonvanishing result and the five public exports were traced in the original source. A compiled proof of the unconditional theorem was unavailable in this checkout.</p><div class="toolbar"><label>Follow a conclusion <select id="focus"><option value="">All five conclusions</option>OPTIONS</select></label><button id="zoom">Actual size</button><a href="dependencies.svg">Open SVG</a><a href="export/blueprint/module/RiemannArchitect.json">LeanArchitect JSON</a></div><div class="legend"><span><i class="line"></i> checked proof</span><span><i class="line type"></i> checked statement</span><span><i class="line trace"></i> source reference</span><span>Arrows point from prerequisite to consumer. Select a node for its source.</span></div><div class="viewport" id="graph">SVG</div><h2>Declarations</h2><section class="cards">CARDS</section></main><script>
const ancestors=ANCESTORS,edges=EDGES;document.querySelector('#focus').addEventListener('change',e=>{const id=e.target.value,wanted=new Set(ancestors[id]||Object.keys(ancestors));Object.keys(ancestors).forEach(k=>document.getElementById('n-'+k)?.classList.toggle('dim',!wanted.has(k)));edges.forEach(([d,u])=>document.getElementById('e-'+d+'-'+u)?.classList.toggle('dim',!(wanted.has(d)&&wanted.has(u))));});document.querySelector('#zoom').onclick=e=>{const active=document.querySelector('#graph').classList.toggle('actual');e.target.textContent=active?'Fit to page':'Actual size';};</script></body></html>'''
    page=page.replace('OPTIONS',options).replace('CARDS',''.join(cards)).replace('ANCESTORS',state).replace('EDGES',edge_json).replace('SVG</div>',svg.replace('index.html#','#')+'</div>')
    (HERE/'index.html').write_text(page)


if __name__=='__main__':
    nodes,edges,ancestors=extract_graph()
    svg=render_svg(nodes,edges)
    render_html(nodes,edges,ancestors,svg)
    print(f'{len(nodes)} nodes, {len(edges)} dependencies',dict(Counter(t for _,_,t in edges)))
