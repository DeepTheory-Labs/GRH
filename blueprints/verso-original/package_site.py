# Package the single-page output with the graph runtime versions declared by Verso Blueprint.
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tarfile
import tempfile

ROOT = Path(__file__).resolve().parent
RUNTIMES = [
    ('d3', '7.9.0', 'dist/d3.min.js', '7e36605710a2ba54846797c8c6d888911341b215ae53257dc32a49a0b824355e'),
    ('d3-graphviz', '5.6.0', 'build/d3-graphviz.min.js', 'b1f44015c37e5ef18cb0aed8d361fc5756a81f66926c7f691ef2b470e4be665e'),
]


def main():
    build = ROOT / '_out' / 'html-single'
    if not (build / 'index.html').is_file():
        raise SystemExit('Render the Verso document before packaging it.')
    dest = ROOT / 'site'
    shutil.copytree(build, dest, dirs_exist_ok=True)
    shutil.copy2(ROOT / 'sources.html', dest / 'sources.html')
    assets = dest / 'graph-runtime'
    assets.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as cache:
        packages = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(cache)
        for name, version, member, digest in RUNTIMES:
            archive = packages / f'{name}-{version}.tgz'
            if not archive.exists():
                subprocess.run(['npm', 'pack', '--silent', '--ignore-scripts', f'{name}@{version}'], cwd=packages, check=True)
            if hashlib.sha256(archive.read_bytes()).hexdigest() != digest:
                raise SystemExit(f'Unexpected package checksum for {name}')
            with tarfile.open(archive) as src:
                for entry, target in [(member, Path(member).name), ('LICENSE', name+'-LICENSE')]:
                    (assets/target).write_bytes(src.extractfile('package/'+entry).read())
    index = dest/'index.html'
    text = index.read_text()
    marker = '<head>'
    if marker not in text:
        raise SystemExit('Unexpected Verso HTML head')
    scripts = ''.join(f'<script src="graph-runtime/{Path(record[2]).name}"></script>' for record in RUNTIMES)
    # The runtime infers block layout from an /html-single/ URL. Preserve its single-page
    # layout after publishing the same document under /site/.
    block = '<div class="bp_graph_fullwidth"'
    if text.count(block) != 1:
        raise SystemExit('Expected one native Blueprint graph block')
    text = text.replace(block, block + ' data-bp-graph-layout="block"', 1)
    index.write_text(text.replace(marker, marker+scripts, 1))
    if not (dest/'-verso-data'/'blueprint-manifest.json').is_file():
        raise SystemExit('Missing Blueprint preview manifest')
    graph, = json.loads((dest/'-verso-data'/'blueprint-manifest.json').read_text())['graphs']
    nodes = json.loads((ROOT/'nodes.json').read_text())
    assert {n['label'] for n in nodes} == {n['label'] for n in graph['nodes']}
    expected = {(e['node'], n['label']) for n in nodes for e in n['uses']}
    actual = {(e['source'], e['target']) for e in graph['edges'] if e['axes'] == ['proof']}
    assert expected == actual and len(expected) == len(graph['edges']), 'Verso proof graph differs from source witnesses'
    print(dest/'index.html')


if __name__ == '__main__':
    main()
