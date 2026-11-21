/* Blueprint-style 2D drill-down of the full proof: folder → module → declarations, laid out by
   Graphviz (WebAssembly). Shared by the LeanArchitect and Verso full pages; the page sets the theme. */
'use strict';
(() => {
  const root = document.querySelector('[data-blueprint-full]');
  const DATA = root.dataset.data, THEME = root.dataset.theme;
  const SHOW = 120, EDGES = 600;
  const fmt = (n) => Number(n).toLocaleString('en-US');
  const $ = (s) => root.querySelector(s);
  const tag = (t, cls, text) => { const e = document.createElement(t); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const cache = new Map();
  const load = (u) => { if (!cache.has(u)) cache.set(u, fetch(DATA + u).then((r) => { if (!r.ok) throw new Error(u + ': ' + r.status); return r.json(); })); return cache.get(u); };
  const T = {
    leanarchitect: { bg: 'white', font: 'Helvetica', edge: '#7d8ea3', folder: ['#edf2fb', '#516c94'], module: ['#e7f4ec', '#2a7059'],
      thm: ['#e7f4ec', '#2a7059'], def: ['#edf2fb', '#516c94'], other: ['#f6eef8', '#7b4f8f'], more: ['#f4f4f4', '#9a9a9a'], rank: 'TB' },
    verso: { bg: 'white', font: 'Helvetica', edge: '#8c95a3', folder: ['#eef3ff', '#3f5fa8'], module: ['#f3eefc', '#6b4fa8'],
      thm: ['#e9f6ee', '#2f7a4f'], def: ['#fdf4e6', '#9a6a1c'], other: ['#f9edf1', '#a24a6b'], more: ['#f4f4f4', '#9a9a9a'], rank: 'TB' },
  }[THEME];
  const q = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  let index, vizPromise = Viz.instance();

  function dot(nodes, edges) {
    const maxW = Math.max(1, ...edges.map((e) => e[2] || 1));
    const lines = [`digraph G { graph [rankdir=${T.rank}, bgcolor="${T.bg}", nodesep=.25, ranksep=.45, pad=.2, outputorder=edgesfirst];`,
      `node [fontname="${T.font}", fontsize=11, style="rounded,filled", penwidth=1.2, margin=".12,.06"];`,
      `edge [color="${T.edge}", arrowsize=.55];`];
    nodes.forEach((n, i) => {
      const [fill, stroke] = T[n.type] || T.other;
      const shape = n.type === 'folder' ? 'folder' : n.type === 'module' ? 'note' : n.type === 'thm' ? 'ellipse' : n.type === 'more' ? 'plaintext' : 'box';
      lines.push(`n${i} [id="n${i}", label=${q(n.label + (n.sub ? '\n' + n.sub : ''))}, shape=${shape}, fillcolor="${fill}", color="${stroke}", tooltip=${q(n.tip || n.label)}];`);
    });
    for (const [a, b, w] of edges) {
      const pw = 0.6 + 2.6 * Math.log1p(((w || 1) / maxW) * 30) / Math.log1p(30);
      lines.push(`n${a} -> n${b} [penwidth=${pw.toFixed(2)}${w > 1 ? `, tooltip="${fmt(w)} dependencies"` : ''}];`);
    }
    // Unconnected nodes would line up in one rank; stack them into a grid with invisible edges.
    const linked = new Set(edges.flatMap(([a, b]) => [a, b])), alone = nodes.map((n, i) => i).filter((i) => !linked.has(i));
    const COLS = 8;
    for (let j = 0; j + COLS < alone.length; j++) lines.push(`n${alone[j]} -> n${alone[j + COLS]} [style=invis];`);
    lines.push('}');
    return lines.join('\n');
  }

  async function draw(nodes, edges, onClick) {
    const view = $('.bf-viewport');
    view.replaceChildren(tag('p', 'bf-muted', 'Laying out ' + fmt(nodes.length) + ' nodes…'));
    const svg = (await vizPromise).renderSVGElement(dot(nodes, edges));
    view.replaceChildren(svg);
    // Wide graphs stay at natural size and scroll; shrinking them would make labels unreadable.
    const natural = parseFloat(svg.getAttribute('width')) * 4 / 3;   // pt → px
    view.classList.toggle('bf-natural', natural > view.clientWidth * 1.3);
    svg.querySelectorAll('g.node').forEach((g) => {
      const i = +g.id.slice(1), n = nodes[i];
      if (!n || n.type === 'more') return;
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => onClick(n, i));
    });
  }

  // Keep the largest children; fold the rest into one node with summed edges.
  function capChildren(children, edges) {
    if (children.length <= SHOW) return { kids: children, es: edges.slice(0, EDGES), hidden: 0 };
    const kids = children.slice(0, SHOW - 1), rest = children.length - kids.length, more = kids.length;
    const restDecls = children.slice(SHOW - 1).reduce((s, c) => s + c.decls, 0);
    kids.push({ name: `… ${fmt(rest)} more`, decls: restDecls, more: true });
    const merged = new Map();
    for (const [a, b, w] of edges) {
      const x = a >= more ? more : a, y = b >= more ? more : b;
      if (x === y) continue;
      merged.set(x + ',' + y, (merged.get(x + ',' + y) || 0) + w);
    }
    const es = [...merged].map(([k, w]) => [...k.split(',').map(Number), w]).sort((u, v) => v[2] - u[2]).slice(0, EDGES);
    return { kids, es, hidden: rest };
  }

  async function keyOf(path) {
    if (!path) return index.root;
    let doc = await load('f/' + index.root + '.json');
    const parts = path.split('/');
    for (let i = 1; i <= parts.length; i++) {
      const p = parts.slice(0, i).join('/'), c = doc.children.find((x) => x.path === p);
      if (!c) throw new Error('unknown path ' + p);
      if (i === parts.length) return c.key;
      doc = await load('f/' + c.key + '.json');
    }
  }

  function crumbs(path) {
    const nav = $('.bf-crumbs');
    nav.replaceChildren();
    const parts = path ? path.split('/') : [];
    [['Proof', '']].concat(parts.map((p, i) => [p.replace(/\.lean$/, ''), parts.slice(0, i + 1).join('/')])).forEach(([label, p], i, all) => {
      if (i) nav.append(tag('span', 'bf-sep', '/'));
      const b = tag('button', '', label);
      b.type = 'button';
      if (i === all.length - 1) b.setAttribute('aria-current', 'true'); else b.onclick = () => (location.hash = p ? 'path=' + encodeURIComponent(p) : '');
      nav.append(b);
    });
  }

  function details(title, sub, rows, links) {
    const d = $('.bf-details');
    d.replaceChildren(tag('h3', '', title));
    if (sub) d.append(tag('code', 'bf-qual', sub));
    const dl = tag('dl', 'bf-stats');
    for (const [k, v] of rows) { dl.append(tag('dt', '', k), tag('dd', '', fmt(v))); }
    d.append(dl);
    for (const [label, href] of links || []) { const a = tag('a', 'bf-link', label); a.href = href; a.target = '_blank'; a.rel = 'noopener'; d.append(a); }
  }

  async function showFolder(path) {
    const doc = await load('f/' + (await keyOf(path)) + '.json');
    crumbs(path);
    const { kids, es, hidden } = capChildren(doc.children, doc.edges);
    $('.bf-note').textContent = `${fmt(doc.children.length)} items${hidden ? `, largest ${SHOW - 1} shown` : ''} · ${fmt(es.length)}${doc.edgesTotal > es.length ? ' strongest of ' + fmt(doc.edgesTotal) : ''} links`;
    const nodes = kids.map((c) => c.more ? { label: c.name, sub: fmt(c.decls) + ' declarations', type: 'more' } :
      { label: c.name, sub: fmt(c.decls) + (c.module ? ' decl.' : ' declarations'), type: c.module ? 'module' : 'folder', data: c });
    details(doc.path ? doc.path.split('/').pop() : 'All five public theorems', doc.path || null,
      [['Declarations', doc.counts.decls], ['Theorems', doc.counts.thms], ['Definitions', doc.counts.defs], ['Modules', doc.counts.modules]]);
    await draw(nodes, es, (n) => (location.hash = 'path=' + encodeURIComponent(n.data.path)));
  }

  async function showModule(path) {
    const parent = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
    const pdoc = await load('f/' + (await keyOf(parent)) + '.json');
    const child = pdoc.children.find((c) => c.path === path);
    const m = (await load('d/' + pdoc.key + '.json'))[path];
    crumbs(path);
    // Most-used declarations first; keep the module's internal edges among those shown.
    const order = m.decls.map((d, i) => i).sort((a, b) => m.decls[b][3] - m.decls[a][3]).slice(0, SHOW);
    const pos = new Map(order.map((i, j) => [i, j]));
    const es = m.edges.filter(([a, b]) => pos.has(a) && pos.has(b)).map(([a, b]) => [pos.get(a), pos.get(b), 1]).slice(0, EDGES);
    const nodes = order.map((i) => {
      const [name, kind, folded, din, dout] = m.decls[i];
      return { label: name.split('.').pop(), sub: `used by ${fmt(din)}`, tip: name, type: kind === 'thm' ? 'thm' : kind === 'def' ? 'def' : 'other', data: { name, kind, folded, din, dout } };
    });
    $('.bf-note').textContent = `${fmt(m.decls.length)} declarations${m.decls.length > SHOW ? `, ${SHOW} most used shown` : ''} · ${fmt(es.length)} links inside the module`;
    const src = [['Source', index.srcUrl + path]];
    details(child.name, path.replace(/\.lean$/, '').replaceAll('/', '.'),
      [['Declarations', m.decls.length], ['Used from outside', child.outEdges], ['Uses from outside', child.inEdges]], src);
    await draw(nodes, es, (n) => details(n.data.name.split('.').pop(), n.data.name,
      [['Used by', n.data.din], ['Uses', n.data.dout], ['Folded helpers', n.data.folded]], src));
  }

  async function route() {
    const p = decodeURIComponent((location.hash.match(/path=([^&]*)/) || [])[1] || '');
    try {
      await (p.endsWith('.lean') ? showModule(p) : showFolder(p));
    } catch (err) {
      $('.bf-viewport').replaceChildren(tag('p', 'bf-muted', 'Could not load: ' + err.message));
    }
  }

  addEventListener('hashchange', route);
  load('index.json').then((ix) => {
    index = ix;
    $('.bf-total').textContent = `${fmt(ix.stats.visible)} declarations · ${fmt(ix.stats.visible_edges)} dependencies · ${fmt(ix.stats.modules)} modules`;
    return route();
  });
})();
