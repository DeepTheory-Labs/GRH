"""Generate the Verso source and linked excerpts after validating the named source occurrences."""
import argparse
import html
import json
import re
from pathlib import Path
from urllib.parse import quote

HERE = Path(__file__).resolve().parent
SOURCE = HERE.parent / 'lean' / 'src'
GROUPS = ['Public conclusions', 'Export wrappers', 'Nonvanishing', 'Arithmetic inputs', 'Analytic reductions']


def validate(nodes):
    by_label = {n['label']: n for n in nodes}
    assert len(by_label) == len(nodes), 'duplicate node'
    visiting, done = set(), set()

    def visit(label):
        if label in visiting:
            raise ValueError(f'cycle at {label}')
        if label not in done:
            visiting.add(label)
            for edge in by_label[label]['uses']:
                visit(edge['node'])
            visiting.remove(label)
            done.add(label)

    for n in nodes:
        visit(n['label'])
        lines = (SOURCE / n['file']).read_text().splitlines()
        i = n['line'] - 1
        m = re.match(r'(?:theorem|lemma|def)\s+([^\s(:]+)', lines[i])
        assert m and (n['decl'] == m[1] or n['decl'].endswith('.' + m[1])), (n['file'], i+1)
        end = i+1
        while end < len(lines) and not re.match(r'^(?:theorem|lemma|def|abbrev|end|namespace|section)\b', lines[end]):
            end += 1
        while end > i+1 and not lines[end-1].strip():
            end -= 1
        n['excerpt'] = lines[i:end]
        for edge in n['uses']:
            ref = by_label[edge['node']]['decl'].split('.')[-1]
            j = edge['line'] - 1
            assert i <= j < end and re.search(r'(?<!\w)' + re.escape(ref) + r'(?!\w)', lines[j]), (n['decl'], j+1, ref)
    reachable = set()
    def from_public(label):
        if label not in reachable:
            reachable.add(label)
            for dep in by_label[label]['uses']:
                from_public(dep['node'])
    for n in nodes:
        if n['group'] == 'Public conclusions':
            from_public(n['label'])
    assert reachable == set(by_label), 'disconnected from the public endpoints'
    return by_label


def verso(nodes, by_label):
    doc = '''import Verso
import VersoManual
import VersoBlueprint
import VersoBlueprint.Commands.Graph

open Verso.Genre Verso.Genre.Manual Informal

#doc (Manual) "The Riemann proof structure" =>

The original five public results share a theorem giving nonvanishing of Dirichlet L-functions to the right of the critical line. The zeta result specializes it to level one. The two Dirichlet zero results follow different formal reductions in the archive.

This source map follows selected direct references in the original Lean proof bodies, including projections from conjunctions. Each dependency records a line where the consumer names the prerequisite. The graph stops at selected arithmetic and analytic inputs. The source excerpts show additional prerequisites at those boundaries. Blueprint tracks these as informal nodes linked to the archive. Checking this document verifies the map and its markup, independently of a full build or axiom audit of the original project.

{blueprint_graph}
'''
    for group in GROUPS:
        doc += f'\n# {group}\n'
        for n in nodes:
            if n['group'] != group:
                continue
            label = n['label']
            doc += f'\n:::theorem "{label}"\n`{n["decl"]}`\n\n{n["summary"]}\n\n[Original declaration, line {n["line"]}](sources.html#{label})\n:::\n'
            if n['uses']:
                deps = ', '.join(e['node'] for e in n['uses'])
                by_line = {}
                for e in n['uses']:
                    by_line.setdefault(e['line'], []).append(by_label[e['node']]['decl'].split('.')[-1])
                evidence = ' '.join(f'[Line {line}](sources.html#{label}-L{line}) uses '+', '.join('`'+v+'`' for v in names)+'.' for line,names in by_line.items())
                doc += f'\n:::proof "{label}" (uses := "{deps}")\n{evidence}\n:::\n'
    return doc


def evidence_page(nodes):
    esc = html.escape
    parts = ['<!doctype html><html lang="en"><meta charset="utf-8"><title>Lean source evidence</title>',
        '<meta name="viewport" content="width=device-width, initial-scale=1"><style>body{max-width:96ch;margin:2rem auto;padding:0 1rem;font:1rem/1.5 system-ui}h2{overflow-wrap:anywhere}code{white-space:pre-wrap;overflow-wrap:anywhere}pre{padding:.8rem;background:#f2f4f7}pre a{display:inline-block;min-width:3em}span:target{background:#fff4b8}nav{position:sticky;top:0;background:white;padding:6px 0}</style>',
        '<nav><a href="index.html">Return to the proof graph</a></nav><h1>Lean source evidence</h1>']
    for n in nodes:
        label=n['label']
        parts.append(f'<section id="{label}"><h2><code>{esc(n["decl"])}</code></h2><a href="https://github.com/leanprover-community/riemann-hypothesis/blob/e7c8972c701d3396947808ab20cc16dc14623d33/src/{quote(n["file"])}">{esc(n["file"])}</a><pre><code>')
        for j, line in enumerate(n['excerpt'], n['line']):
            anchor=f'{label}-L{j}'
            parts.append(f'<span id="{anchor}"><a href="#{anchor}">{j}</a>{esc(line)}</span>\n')
        parts.append('</code></pre></section>')
    return ''.join(parts)+'</html>\n'


def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--write', action='store_true', help='regenerate the Verso source and source-excerpt HTML')
    args=ap.parse_args()
    nodes=json.loads((HERE/'nodes.json').read_text())
    by_label=validate(nodes)
    files={'RiemannProof.lean':verso(nodes,by_label), 'sources.html':evidence_page(nodes)}
    for name, text in files.items():
        if args.write:
            (HERE/name).write_text(text)
        else:
            assert (HERE/name).read_text() == text, f'regenerate {name} with --write'
    print(f'{len(nodes)} source declarations, {sum(len(n["uses"]) for n in nodes)} line-checked references, five public roots')


if __name__ == '__main__':
    main()
