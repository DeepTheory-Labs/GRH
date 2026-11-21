'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const svgNS = 'http://www.w3.org/2000/svg';
  function icon(name) {
    const svg = document.createElementNS(svgNS, 'svg'),
      use = document.createElementNS(svgNS, 'use');
    use.setAttribute('href', '#i-' + name);
    svg.setAttribute('aria-hidden', 'true');
    svg.append(use);
    return svg;
  }
  function tag(name, cls, text) {
    const el = document.createElement(name);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function button(cls, text, act) {
    const el = tag('button', cls, text);
    el.type = 'button';
    el.addEventListener('click', act);
    return el;
  }
  function link(text, url, cls, ico) {
    const a = tag('a', cls, text);
    a.href = url;
    if (ico) a.prepend(icon(ico));
    return a;
  }
  const data = window.PROOF_ATLAS;
  if (!data?.nodes?.length) {
    $('inspector').append(
      tag(
        'p',
        'summary',
        'Graph data could not be loaded. Open index.html with graph-data.js in the same folder.',
      ),
    );
    return;
  }
  const nodes = data.nodes.map((n) => ({
    ...n,
    id: String(n.id),
    name: n.name || n.title,
    title: n.title || n.name,
    kind: n.kind === 'mathlib' ? 'mathlib' : 'project',
  }));
  const byId = new Map(nodes.map((n) => [n.id, n])),
    edges = data.edges
      .map((e) => ({ ...e, from: String(e.from), to: String(e.to) }))
      .filter((e) => byId.has(e.from) && byId.has(e.to));
  const incoming = new Map(nodes.map((n) => [n.id, []])),
    outgoing = new Map(nodes.map((n) => [n.id, []]));
  edges.forEach((e) => {
    incoming.get(e.to).push(e);
    outgoing.get(e.from).push(e);
  });
  const hub =
    byId.get('every') ||
    nodes.find((n) => n.name.endsWith('.FinalTheorems.everyCharacter')) ||
    nodes.find((n) => n.kind === 'project') ||
    nodes[0];
  const publicNode = (n) => /public concl|public result/i.test(n.group);
  const cls = (n) =>
    n.kind === 'mathlib' ? 'mathlib' : publicNode(n) ? 'public' : 'project';
  const mark = (n) => tag('span', 'mark ' + cls(n));
  const mathNeighbors = new Set(
    edges
      .filter(
        (e) =>
          byId.get(e.from).kind === 'mathlib' ||
          byId.get(e.to).kind === 'mathlib',
      )
      .flatMap((e) => [e.from, e.to]),
  );
  $('node-count').textContent = nodes.length.toLocaleString();
  $('edge-count').textContent = edges.length.toLocaleString();
  $('math-count').textContent = nodes
    .filter((n) => n.kind === 'mathlib')
    .length.toLocaleString();
  const initialHash = new URLSearchParams(location.hash.slice(1)).get('node');
  let selected = byId.has(initialHash) ? initialHash : hub.id,
    mode = 'graph',
    layer = 'all',
    focused = false,
    openEdge = null,
    manualSearch = false;
  function setSelected(id) {
    if (!byId.has(id)) return;
    selected = id;
    openEdge = null;
    if ($('search').value.trim()) $('search').value = '';
    mode = 'graph';
    manualSearch = false;
    // Local files support fragment navigation even when history.replaceState is restricted.
    try {
      history.replaceState(null, '', '#' + new URLSearchParams({ node: id }));
    } catch {
      location.hash = new URLSearchParams({ node: id });
    }
    render();
  }
  const scene = new ProofScene($('stage'), nodes, edges, hub.id, setSelected);
  function available(n) {
    return layer === 'project'
      ? n.kind === 'project'
      : layer === 'mathlib'
        ? mathNeighbors.has(n.id)
        : true;
  }
  function neighborhood(id) {
    const found = new Set([id]);
    incoming.get(id).forEach((e) => found.add(e.from));
    outgoing.get(id).forEach((e) => found.add(e.to));
    return found;
  }
  function setMode(next) {
    mode = next;
    manualSearch = false;
    render();
  }
  $('graph-mode').addEventListener('click', () => setMode('graph'));
  $('index-mode').addEventListener('click', () => setMode('index'));
  $('search').addEventListener('input', () => {
    manualSearch = Boolean($('search').value.trim());
    render();
  });
  $('search').addEventListener('keydown', (e) => {
    const first = $('index-list').querySelector('.index-entry');
    if (!first) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      first.focus();
    } else if (e.key === 'Enter' && $('search').value.trim()) {
      e.preventDefault();
      first.click();
      $('stage').focus();
    }
  });
  $('index-list').addEventListener('keydown', (e) => {
    const entry = e.target.closest('.index-entry');
    if (!entry) return;
    const next =
      e.key === 'ArrowDown'
        ? entry.nextElementSibling
        : e.key === 'ArrowUp'
          ? entry.previousElementSibling
          : null;
    if (next) {
      e.preventDefault();
      next.focus();
    }
  });
  $('layer').addEventListener('change', () => {
    layer = $('layer').value;
    $('layer').style.width =
      layer === 'all' ? '72px' : layer === 'project' ? '92px' : '139px';
    if (!available(byId.get(selected)))
      selected = nodes.find((n) => available(n))?.id || hub.id;
    openEdge = null;
    render();
  });
  $('zoom-in').onclick = () => scene.changeZoom(1.24);
  $('zoom-out').onclick = () => scene.changeZoom(1 / 1.24);
  const spin = $('spin');
  const showSpin = () => {
    const label = scene.spinning ? 'Pause rotation' : 'Resume rotation';
    spin.setAttribute('aria-label', label);
    spin.title = label;
    spin.setAttribute('aria-pressed', String(!scene.spinning));
    spin.querySelector('use').setAttribute('href', scene.spinning ? '#i-pause' : '#i-play');
  };
  spin.onclick = () => {
    scene.setSpinning(!scene.spinning);
    showSpin();
  };
  showSpin();
  $('reset').onclick = () => {
    focused = false;
    scene.reset();
    render();
  };
  document.addEventListener('keydown', (e) => {
    if (
      e.key === '/' &&
      !e.altKey &&
      !e.metaKey &&
      !e.ctrlKey &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
    ) {
      e.preventDefault();
      $('search').focus();
    }
    if (e.key === 'Escape' && $('search').value) {
      $('search').value = '';
      manualSearch = false;
      render();
    }
  });
  window.addEventListener('hashchange', () => {
    const id = new URLSearchParams(location.hash.slice(1)).get('node');
    if (byId.has(id) && id !== selected) {
      selected = id;
      if (!available(byId.get(id))) {
        layer = 'all';
        $('layer').value = 'all';
        $('layer').style.width = '72px';
      }
      openEdge = null;
      render();
    }
  });
  function render() {
    const n = byId.get(selected),
      near = neighborhood(selected),
      q = $('search').value.toLowerCase().trim();
    const filtered = nodes.filter(
      (n) => available(n) && (!focused || near.has(n.id)),
    );
    const matching = filtered.filter(
      (n) =>
        !q ||
        (n.title + ' ' + n.name + ' ' + n.group + ' ' + n.source)
          .toLowerCase()
          .includes(q),
    );
    const listShown = mode === 'index' || manualSearch;
    $('graph-view').hidden = listShown;
    $('index-view').hidden = !listShown;
    $('graph-mode').setAttribute('aria-pressed', String(!listShown));
    $('index-mode').setAttribute('aria-pressed', String(listShown));
    scene.setState(
      new Set((q ? matching : filtered).map((n) => n.id)),
      selected,
      near,
    );
    if (listShown) renderIndex(matching, q);
    else scene.resize();
    renderInspector(n);
  }
  function renderIndex(list, q) {
    const wrap = $('index-list');
    wrap.replaceChildren();
    $('index-count').textContent =
      list.length + ' ' + (list.length === 1 ? 'declaration' : 'declarations');
    if (!list.length) {
      wrap.append(
        tag(
          'p',
          'empty',
          q
            ? 'No declarations match “' + $('search').value.trim() + '”.'
            : 'No declarations are visible in this layer.',
        ),
      );
      return;
    }
    const sorted = [...list].sort((a, b) => a.title.localeCompare(b.title));
    for (const n of sorted) {
      const row = button(
        'index-entry' + (n.id === selected ? ' selected' : ''),
        undefined,
        () => {
          if (q) {
            mode = 'graph';
          }
          setSelected(n.id);
        },
      );
      row.dataset.node = n.id;
      const text = tag('span', 'text');
      text.append(tag('strong', '', n.title), tag('small', '', n.name));
      row.append(mark(n), text, tag('span', 'group', n.group));
      wrap.append(row);
    }
  }
  function renderInspector(n) {
    const panel = $('inspector'),
      oldScroll = panel.dataset.node === n.id ? panel.scrollTop : 0;
    panel.replaceChildren();
    panel.dataset.node = n.id;
    const eyebrow = tag('div', 'eyebrow');
    eyebrow.append(
      mark(n),
      tag('span', '', n.kind === 'mathlib' ? 'Mathlib4 declaration' : n.group),
    );
    panel.append(
      eyebrow,
      tag('h2', 'inspector-title', n.title),
      tag('code', 'qualified', n.name),
    );
    if (n.summary) panel.append(tag('p', 'summary', n.summary));
    if (n.status) panel.append(tag('p', 'status', n.status));
    const tools = tag('div', 'inspector-tools');
    if (n.url) tools.append(link('Source', n.url, 'source-link', 'source'));
    if (n.blueprintUrl && n.blueprintUrl !== n.url)
      tools.append(
        link('Blueprint', n.blueprintUrl, 'source-link', 'external'),
      );
    const focus = button(
      'focus-button',
      focused ? 'Show full graph' : 'Isolate node',
      () => {
        focused = !focused;
        mode = 'graph';
        manualSearch = false;
        $('search').value = '';
        render();
      },
    );
    focus.prepend(icon('focus'));
    focus.setAttribute('aria-pressed', String(focused));
    tools.append(focus);
    panel.append(tools);
    for (const [name, direction, all] of [
      ['Prerequisites', 'in', incoming.get(n.id)],
      ['Used by', 'out', outgoing.get(n.id)],
    ]) {
      const items = all
        .filter((e) => available(byId.get(direction === 'in' ? e.from : e.to)))
        .sort((a, b) =>
          byId
            .get(direction === 'in' ? a.from : a.to)
            .title.localeCompare(
              byId.get(direction === 'in' ? b.from : b.to).title,
            ),
        );
      const head = tag('div', 'connection-head');
      head.append(tag('h3', '', name), tag('span', '', String(items.length)));
      panel.append(head);
      if (!items.length) {
        panel.append(
          tag(
            'p',
            'muted',
            'No ' +
              (direction === 'in' ? 'incoming' : 'outgoing') +
              ' connections in this layer.',
          ),
        );
        continue;
      }
      const list = tag('ul', 'connection-list');
      for (const e of items) {
        const other = byId.get(direction === 'in' ? e.from : e.to),
          li = tag('li'),
          row = button('connection-row', undefined, () => {
            openEdge = openEdge === e ? null : e;
            renderInspector(n);
          });
        row.dataset.edge = e.from + '|' + e.to;
        row.setAttribute(
          'aria-label',
          `Connection evidence for ${other.title}`,
        );
        row.setAttribute('aria-expanded', String(openEdge === e));
        row.append(mark(other), tag('span', '', other.title), icon('down'));
        li.append(row);
        if (openEdge === e) {
          const detail = tag('div', 'connection-detail');
          detail.append(tag('h4', '', e.kind), tag('p', '', e.evidence));
          if (e.url) detail.append(link('Open evidence', e.url));
          const nav = button('detail-nav', `Inspect ${other.title}`, () =>
            setSelected(other.id),
          );
          nav.prepend(icon('arrow'));
          detail.append(nav);
          li.append(detail);
        }
        list.append(li);
      }
      panel.append(list);
    }
    panel.scrollTop = oldScroll;
  }
  render();
})();
