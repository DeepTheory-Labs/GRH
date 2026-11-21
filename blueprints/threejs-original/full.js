/* Proof Map, full proof: folder → module → declaration drill-down over chunked JSON data. */
'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const DATA = '../data/original-full/';
  const fmt = (n) => Number(n).toLocaleString('en-US');
  const cache = new Map();
  const load = (url) => {
    if (!cache.has(url)) cache.set(url, fetch(DATA + url).then((r) => {
      if (!r.ok) throw new Error(url + ': ' + r.status);
      return r.json();
    }));
    return cache.get(url);
  };
  const COLORS = { folder: 0x61dedb, module: 0xb09bf6, thm: 0xf3c17f, def: 0x7fb7f3, other: 0xe88fb4 };

  // ---------- scene ----------
  const stage = $('stage'), surface = $('surface'), labels = $('graph-labels'), tip = $('hover-tip');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  surface.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  const view = { yaw: 0, pitch: 0.35, dist: 14, spinning: !matchMedia('(prefers-reduced-motion: reduce)').matches };
  let clouds = [], lines = null, items = [], pos = [], hover = -1, selected = -1, dragging = null;
  // Round point sprite; the vendored bundle has no instancing, so nodes are Points in size classes.
  const dot = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d'), r = g.createRadialGradient(32, 32, 4, 32, 32, 31);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.7, 'rgba(255,255,255,0.95)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.beginPath(); g.arc(32, 32, 31, 0, 2 * Math.PI); g.fill();
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const CLASSES = 6;

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);

  function hash(s) {
    let h = 2166136261;
    for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return (h >>> 0) / 4294967296;
  }

  // Many nodes: golden-angle sphere.
  function sphereLayout(nodes) {
    // Scatter by name hash so the largest nodes (and their labels) spread over the whole sphere.
    const order = nodes.map((n, i) => i).sort((a, b) => hash(nodes[a].label) - hash(nodes[b].label)), p = new Array(nodes.length), n = nodes.length;
    order.forEach((i, j) => {
      const y = 1 - (2 * (j + 0.5)) / n, r = Math.sqrt(1 - y * y), ph = j * 2.399963;
      const rad = 4.2 + 0.8 * hash(nodes[i].label);
      p[i] = [rad * r * Math.cos(ph), rad * y, rad * r * Math.sin(ph)];
    });
    return p;
  }

  // Force layout in 3D; plain O(n²) repulsion is fine for a few hundred nodes per level.
  function layout(n, edges, sizes, seed) {
    const p = [];
    for (let i = 0; i < n; i++) {
      const u = hash(seed + i), v = hash(seed + 'v' + i);
      const t = Math.acos(1 - 2 * ((i + 0.5) / n)), ph = Math.PI * (1 + Math.sqrt(5)) * i + u;
      const r = 3 + 2 * v;
      p.push([r * Math.sin(t) * Math.cos(ph), r * Math.cos(t), r * Math.sin(t) * Math.sin(ph)]);
    }
    if (n > 1 && n <= 900) {
      // Fruchterman–Reingold: repulsion k²/d (stronger for big nodes), attraction d²/k on log-scaled weights.
      const k = 2.2, maxW = Math.max(1, ...edges.map((e) => e[2] || 1));
      const wt = edges.map((e) => 0.25 + 0.75 * Math.log1p(((e[2] || 1) / maxW) * 50) / Math.log1p(50));
      const iters = n > 300 ? 120 : 320;
      for (let it = 0; it < iters; it++) {
        const t = 1.6 * (1 - it / iters) + 0.02, f = p.map(() => [0, 0, 0]);
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++) {
            const d = [p[i][0] - p[j][0], p[i][1] - p[j][1], p[i][2] - p[j][2]];
            const dist = Math.hypot(...d) + 0.01, rep = (k * k * (1 + 3 * (sizes[i] + sizes[j]))) / dist;
            for (let a = 0; a < 3; a++) { const v = (d[a] / dist) * rep; f[i][a] += v; f[j][a] -= v; }
          }
        edges.forEach(([a, b], e) => {
          const d = [p[b][0] - p[a][0], p[b][1] - p[a][1], p[b][2] - p[a][2]];
          const dist = Math.hypot(...d) + 0.01, att = ((dist * dist) / k) * wt[e];
          for (let c = 0; c < 3; c++) { const v = (d[c] / dist) * att; f[a][c] += v; f[b][c] -= v; }
        });
        for (let i = 0; i < n; i++) {
          for (let a = 0; a < 3; a++) f[i][a] -= p[i][a] * 0.05;
          const len = Math.hypot(...f[i]) + 1e-9, step = Math.min(len, t);
          for (let a = 0; a < 3; a++) p[i][a] += (f[i][a] / len) * step;
        }
      }
    }
    // Center, then scale so most nodes fall inside radius 5; outliers may sit a little further out.
    const mid = [0, 1, 2].map((a) => p.reduce((s, q) => s + q[a], 0) / n);
    const c = p.map((q) => q.map((x, a) => x - mid[a]));
    const radii = c.map((q) => Math.hypot(...q)).sort((a, b) => a - b);
    const r = Math.max(1e-6, radii[Math.floor(0.9 * (n - 1))]);
    return c.map((q) => {
      const l = Math.hypot(...q), s = l > 1.3 * r ? (1.3 * r) / l : 1;   // pull far outliers in
      return q.map((x) => (x * s * 4.6) / r);
    });
  }

  function build(nodes, edges) {
    for (const c of clouds) { scene.remove(c); c.geometry.dispose(); c.material.dispose(); }
    clouds = [];
    if (lines) { scene.remove(lines); lines.geometry.dispose(); }
    items = nodes;
    const maxD = Math.max(1, ...nodes.map((n) => n.size));
    const rel = nodes.map((n) => Math.sqrt(n.size / maxD));
    const sizes = rel.map((r) => 0.07 + 0.55 * r);
    pos = nodes.length > 900 ? sphereLayout(nodes) :
      layout(nodes.length, edges, sizes, nodes.map((n) => n.label).join('|').slice(0, 64));
    const c = new THREE.Color(), byClass = Array.from({ length: CLASSES }, () => ({ p: [], col: [] }));
    nodes.forEach((n, i) => {
      const k = Math.min(CLASSES - 1, Math.floor(rel[i] * CLASSES));
      c.setHex(COLORS[n.type] || COLORS.other);
      byClass[k].p.push(...pos[i]); byClass[k].col.push(c.r, c.g, c.b);
    });
    byClass.forEach(({ p, col }, k) => {
      if (!p.length) return;
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
      g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
      const big = nodes.length > 2000, size = (big ? 0.035 : 0.25) + (big ? 0.5 : 2.2) * ((k + 0.5) / CLASSES) ** 1.4;
      const cloud = new THREE.Points(g, new THREE.PointsMaterial({ size, map: dot, vertexColors: true, transparent: true, alphaTest: 0.2, depthWrite: false }));
      clouds.push(cloud); scene.add(cloud);
    });
    const maxW = Math.max(1, ...edges.map((e) => e[2] || 1));
    const verts = [], cols = [];
    for (const [a, b, w] of edges) {
      const s = 0.18 + 0.82 * Math.log1p(((w || 1) / maxW) * 30) / Math.log1p(30);
      verts.push(...pos[a], ...pos[b]);
      cols.push(0.25 * s, 0.55 * s, 0.6 * s, 0.95 * s, 0.75 * s, 0.45 * s); // from teal to gold
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    lines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75 }));
    scene.add(lines);
    // Labels for the largest nodes.
    labels.replaceChildren();
    const top = nodes.map((n, i) => i).sort((a, b) => nodes[b].size - nodes[a].size).slice(0, nodes.length > 2000 ? 10 : 18);
    for (const i of top) {
      const el = document.createElement('div');
      el.className = 'node-label';
      el.textContent = nodes[i].label;
      el.dataset.i = i;
      labels.append(el);
    }
    selected = hover = -1;
  }

  const screen = [];
  function frame(t) {
    if (view.spinning && !dragging && hover < 0) view.yaw += 0.0015;
    const cp = Math.cos(view.pitch);
    camera.position.set(view.dist * cp * Math.sin(view.yaw), view.dist * Math.sin(view.pitch), view.dist * cp * Math.cos(view.yaw));
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    const w = stage.clientWidth, h = stage.clientHeight, v = new THREE.Vector3();
    screen.length = 0;
    pos.forEach((p, i) => {
      v.set(...p).project(camera);
      screen[i] = [(v.x + 1) * w / 2, (1 - v.y) * h / 2, v.z];
    });
    for (const el of labels.children) {
      const s = screen[+el.dataset.i];
      el.style.transform = `translate(${s[0]}px, ${s[1] + 10}px) translate(-50%, 0)`;
      el.classList.toggle('selected', +el.dataset.i === selected);
    }
    requestAnimationFrame(frame);
  }

  function nearest(x, y) {
    let best = -1, bd = 18 * 18;
    screen.forEach((s, i) => {
      const d = (s[0] - x) ** 2 + (s[1] - y) ** 2;
      if (d < bd && s[2] < 1) { bd = d; best = i; }
    });
    return best;
  }
  const local = (e) => { const b = stage.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
  stage.addEventListener('pointerdown', (e) => { dragging = { p: local(e), moved: false }; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', (e) => {
    const [x, y] = local(e);
    if (dragging) {
      const dx = x - dragging.p[0], dy = y - dragging.p[1];
      if (Math.abs(dx) + Math.abs(dy) > 2) dragging.moved = true;
      view.yaw -= dx * 0.006;
      view.pitch = Math.max(-1.2, Math.min(1.2, view.pitch + dy * 0.006));
      dragging.p = [x, y];
      return;
    }
    hover = nearest(x, y);
    tip.hidden = hover < 0;
    stage.style.cursor = hover < 0 ? 'grab' : 'pointer';
    if (hover >= 0) {
      tip.textContent = items[hover].label + ' · ' + fmt(items[hover].size);
      tip.style.left = Math.min(stage.clientWidth - tip.offsetWidth - 4, x + 13) + 'px';
      tip.style.top = Math.max(3, y - 32) + 'px';
    }
  });
  // One click opens a folder or module; inside a module it selects the declaration.
  stage.addEventListener('pointerup', (e) => {
    if (dragging && !dragging.moved) {
      const i = nearest(...local(e));
      if (i >= 0) current.kind === 'folder' ? open(items[i]) : select(i);
    }
    dragging = null;
  });
  stage.addEventListener('pointerleave', () => { hover = -1; tip.hidden = true; });
  stage.addEventListener('wheel', (e) => { e.preventDefault(); view.dist = Math.max(5, Math.min(30, view.dist * Math.exp(e.deltaY * 0.001))); }, { passive: false });
  $('zoom-in').onclick = () => (view.dist = Math.max(5, view.dist / 1.2));
  $('zoom-out').onclick = () => (view.dist = Math.min(30, view.dist * 1.2));
  $('reset').onclick = () => Object.assign(view, { yaw: 0, pitch: 0.35, dist: 14 });
  const spin = $('spin');
  const showSpin = () => {
    const label = view.spinning ? 'Pause rotation' : 'Resume rotation';
    spin.title = label; spin.setAttribute('aria-label', label);
    spin.setAttribute('aria-pressed', String(!view.spinning));
    spin.querySelector('use').setAttribute('href', view.spinning ? '#i-pause' : '#i-play');
  };
  spin.onclick = () => { view.spinning = !view.spinning; showSpin(); };
  showSpin();

  // ---------- navigation ----------
  let index = null, current = null;   // current: {kind:'folder', doc} | {kind:'module', path, parent, doc}
  const tag = (t, cls, text) => { const e = document.createElement(t); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function crumbs(path, isModule) {
    const nav = $('crumbs');
    nav.replaceChildren();
    const parts = path ? path.split('/') : [];
    const steps = [['Proof', '']].concat(parts.map((p, i) => [p, parts.slice(0, i + 1).join('/')]));
    steps.forEach(([label, p], i) => {
      if (i) nav.append(tag('span', 'sep', '/'));
      const b = tag('button', '', label);
      b.type = 'button';
      if (i === steps.length - 1) b.setAttribute('aria-current', 'true');
      else b.onclick = () => go(p);
      nav.append(b);
    });
  }

  async function go(path) {
    const key = await keyOf(path);
    const doc = await load('f/' + key + '.json');
    current = { kind: 'folder', doc };
    location.hash = path ? 'path=' + encodeURIComponent(path) : '';
    crumbs(path);
    const nodes = doc.children.map((c) => ({ label: c.name, size: c.decls, type: c.module ? 'module' : 'folder', data: c }));
    build(nodes, doc.edges);
    $('level-note').textContent = `${fmt(doc.children.length)} ${doc.path ? 'items' : 'top-level items'} · ` +
      `${fmt(doc.edges.length)}${doc.edgesTotal > doc.edges.length ? ' strongest of ' + fmt(doc.edgesTotal) : ''} links`;
    inspectFolder(doc);
  }

  async function openModule(child, parentDoc) {
    const decls = await load('d/' + parentDoc.key + '.json');
    const m = decls[child.path];
    current = { kind: 'module', path: child.path, parent: parentDoc, doc: m, child };
    location.hash = 'path=' + encodeURIComponent(child.path);
    crumbs(child.path, true);
    const nodes = m.decls.map(([name, kind, folded, din, dout]) => ({
      label: name.split('.').slice(-1)[0], size: 1 + din, type: kind === 'thm' ? 'thm' : kind === 'def' ? 'def' : 'other',
      data: { name, kind, folded, din, dout },
    }));
    build(nodes, m.edges.map(([a, b]) => [a, b, 1]));
    $('level-note').textContent = `${fmt(nodes.length)} declarations · ${fmt(m.edges.length)} links inside the module`;
    inspectModule(child, m);
  }

  // Folder keys are SHA-1 prefixes of the path; walk down from the root to find them.
  async function keyOf(path) {
    if (!path) return index.root;
    let doc = await load('f/' + index.root + '.json');
    const parts = path.split('/');
    for (let i = 1; i <= parts.length; i++) {
      const p = parts.slice(0, i).join('/');
      const c = doc.children.find((x) => x.path === p);
      if (!c) throw new Error('unknown path ' + p);
      if (i === parts.length) return c.key;
      doc = await load('f/' + c.key + '.json');
    }
  }

  async function goHash() {
    const p = decodeURIComponent((location.hash.match(/path=([^&]*)/) || [])[1] || '');
    if (!p) return go('');
    const parent = p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : '';
    const pdoc = await load('f/' + (await keyOf(parent)) + '.json');
    const c = pdoc.children.find((x) => x.path === p);
    if (c && c.module) return openModule(c, pdoc);
    return go(p);
  }

  function open(item) {
    if (current.kind !== 'folder') return;
    const c = item.data;
    if (c.module) openModule(c, current.doc);
    else go(c.path);
  }

  function select(i) {
    selected = i;
    const it = items[i];
    if (current.kind === 'folder') inspectChild(it.data);
    else inspectDecl(it.data);
  }

  // ---------- inspector ----------
  const panel = $('inspector');
  function stats(pairs) {
    const dl = tag('dl', 'stat-grid');
    for (const [k, v] of pairs) { const d = tag('div'); d.append(tag('dt', '', k), tag('dd', '', fmt(v))); dl.append(d); }
    return dl;
  }
  function head(eyebrow, title, qualified) {
    panel.replaceChildren();
    const e = tag('div', 'eyebrow'); e.append(tag('span', '', eyebrow));
    panel.append(e, tag('h2', 'inspector-title', title));
    if (qualified) panel.append(tag('code', 'qualified', qualified));
  }
  function srcLink(modulePath) {
    const a = tag('a', 'source-link', 'Source');
    a.href = index.srcUrl + modulePath; a.target = '_blank'; a.rel = 'noopener';
    return a;
  }
  function inspectFolder(doc) {
    head(doc.path ? 'Folder' : 'Whole proof', doc.path ? doc.path.split('/').pop() : 'All five public theorems', doc.path || null);
    panel.append(stats([['Declarations', doc.counts.decls], ['Theorems', doc.counts.thms], ['Definitions', doc.counts.defs], ['Modules', doc.counts.modules]]));
    panel.append(tag('p', 'muted', 'Largest items here. Click one, here or in the graph, to open it.'));
    const ul = tag('ul', 'kid-list');
    for (const c of doc.children.slice(0, 60)) {
      const li = tag('li'), b = tag('button');
      b.type = 'button';
      b.append(tag('span', '', (c.module ? '▪ ' : '▸ ') + c.name), tag('span', '', fmt(c.decls)));
      b.onclick = () => (c.module ? openModule(c, doc) : go(c.path));
      li.append(b); ul.append(li);
    }
    panel.append(ul);
  }
  function inspectChild(c) {
    head(c.module ? 'Module' : 'Folder', c.name, c.path.replace(/\.lean$/, '').replaceAll('/', '.'));
    panel.append(stats([['Declarations', c.decls], ['Theorems', c.thms], ['Used from outside', c.outEdges], ['Uses from outside', c.inEdges]]));
    const tools = tag('div', 'inspector-tools'), b = tag('button', 'open-button', c.module ? 'Open module' : 'Open folder');
    b.type = 'button'; b.onclick = () => open({ data: c });
    tools.append(b);
    if (c.module) tools.append(srcLink(c.path));
    panel.append(tools);
  }
  function inspectModule(c, m) {
    head('Module', c.name, c.path.replace(/\.lean$/, '').replaceAll('/', '.'));
    const thms = m.decls.filter((d) => d[1] === 'thm').length;
    panel.append(stats([['Declarations', m.decls.length], ['Theorems', thms], ['Used from outside', c.outEdges], ['Uses from outside', c.inEdges]]));
    const tools = tag('div', 'inspector-tools'); tools.append(srcLink(c.path)); panel.append(tools);
  }
  function inspectDecl(d) {
    head(d.kind === 'thm' ? 'Theorem' : d.kind === 'def' ? 'Definition' : d.kind, d.name.split('.').pop(), d.name);
    panel.append(stats([['Used by', d.din], ['Uses', d.dout], ['Folded helpers', d.folded], ['', 0]].slice(0, 3)));
    const tools = tag('div', 'inspector-tools'); tools.append(srcLink(current.path)); panel.append(tools);
  }

  // ---------- start ----------
  addEventListener('hashchange', () => { if (index) goHash(); });
  load('index.json').then((ix) => {
    index = ix;
    $('m-decls').textContent = fmt(ix.stats.visible);
    $('m-edges').textContent = fmt(ix.stats.visible_edges);
    $('m-modules').textContent = fmt(ix.stats.modules);
    resize();
    requestAnimationFrame(frame);
    return goHash();
  }).catch((err) => { panel.replaceChildren(tag('p', 'muted', 'Could not load the proof data: ' + err.message)); });
})();
