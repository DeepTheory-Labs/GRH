/* The browser bundle exposes only the Three.js APIs used by this scene. */
'use strict';
window.ProofScene = class ProofScene {
  constructor(stage, nodes, edges, hub, onSelect) {
    this.stage = stage;
    this.nodes = nodes;
    this.edges = edges;
    this.hub = hub;
    this.onSelect = onSelect;
    this.surface = document.getElementById('surface');
    this.labels = document.getElementById('graph-labels');
    this.tip = document.getElementById('hover-tip');
    this.index = new Map(nodes.map((n) => [n.id, n]));
    this.degree = new Map(nodes.map((n) => [n.id, 0]));
    for (const e of edges)
      for (const id of [e.from, e.to])
        this.degree.set(id, this.degree.get(id) + 1);
    this.layout();
    this.yaw = this.pitch = 0;
    this.zoom = 1;
    this.target = { x: 0, y: 0, z: 0 };
    this.visible = new Set(nodes.map((n) => n.id));
    this.active = hub;
    this.lit = new Set();
    this.screen = [];
    this.labelNodes = new Map();
    this.pending = false;
    this.pointsDown = new Map();
    this.hover = null;
    try {
      this.startWebGL();
    } catch (err) {
      this.startCanvas();
    }
    this.events();
    this.spinning = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.spinLoop();
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(stage);
    this.resize();
  }
  hash(value) {
    let h = 2166136261;
    for (const c of String(value)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return (h >>> 0) / 4294967296;
  }
  palette(n) {
    return n.kind === 'mathlib'
      ? '#b39afa'
      : this.isPublic(n)
        ? '#f5c584'
        : '#64d8d0';
  }
  isPublic(n) {
    return /public concl|public result/i.test(n.group);
  }
  layout() {
    const bins = new Map();
    const classify = (n) => {
      if (n.kind === 'mathlib') return 'math';
      if (this.isPublic(n)) return 'public';
      const t = n.group + ' ' + n.name;
      if (
        /arithmetic inputs|theta|local_langlands|topcovol|galois|vwin_of_row/i.test(
          t,
        )
      )
        return 'arithmetic';
      if (
        /analytic reductions|\.Claim\.|Formalism\.VW\.|\.critLine|rh_of_right|rh_of_every/i.test(
          t,
        )
      )
        return 'analytic';
      if (/export wrappers|\.rhOfAll|\.critAll|\.claimAll|\.allChi/i.test(t))
        return 'wrappers';
      return 'nonvanishing';
    };
    const zones = {
      arithmetic: [-2.7, 1.49, 1.8, 1.04],
      nonvanishing: [-1.35, 0.04, 1.4, 1.1],
      analytic: [1.2, -0.6, 1.6, 1.08],
      wrappers: [1.63, 1.18, 0.94, 0.75],
      public: [3.48, 0.32, 0.77, 1.58],
    };
    this.pos = new Map();
    for (const n of this.nodes) {
      if (n.id === this.hub) continue;
      const key = classify(n);
      if (!bins.has(key)) bins.set(key, []);
      bins.get(key).push(n);
    }
    this.pos.set(this.hub, { x: 0, y: 0.34, z: 0.64 });
    for (const [key, list] of bins) {
      list.sort((a, b) => a.name.localeCompare(b.name));
      list.forEach((n, i) => {
        const phase = this.hash(n.id),
          z = (phase - 0.48) * 0.95;
        if (key === 'math') {
          // Two staggered arcs leave the analytic connections visible between the bands.
          const lane = i % 2,
            ordinal = Math.floor(i / 2),
            length = Math.ceil((list.length - lane) / 2);
          const theta =
            ((149 +
              (186 * (ordinal + 0.5 + 0.22 * (phase - 0.5))) /
                Math.max(1, length)) *
              Math.PI) /
            180;
          this.pos.set(n.id, {
            x: Math.cos(theta) * (4.0 + lane * 0.59),
            y: Math.sin(theta) * (2.06 + lane * 0.52) - 0.2,
            z: z - 0.34,
          });
        } else {
          const [x, y, w, h] = zones[key],
            radius = Math.sqrt((i + 0.6) / list.length),
            angle = i * 2.39996323 + this.hash(key) * Math.PI * 2;
          this.pos.set(n.id, {
            x: x + Math.cos(angle) * radius * w,
            y: y + Math.sin(angle) * radius * h,
            z: z + (key === 'public' ? 0.33 : 0),
          });
        }
      });
    }
    // Resolve close projected positions while keeping each region's broad placement.
    const pinned = this.hub,
      ordered = [...this.pos.keys()];
    for (let pass = 0; pass < 14; pass++)
      for (let i = 0; i < ordered.length; i++)
        for (let j = i + 1; j < ordered.length; j++) {
          const a = this.pos.get(ordered[i]),
            b = this.pos.get(ordered[j]),
            dx = b.x - a.x,
            dy = b.y - a.y,
            d = Math.hypot(dx, dy),
            min = 0.3;
          if (d < min && d > 0.0001) {
            const s = ((min - d) * 0.42) / d;
            if (ordered[i] !== pinned) {
              a.x -= dx * s;
              a.y -= dy * s;
            }
            if (ordered[j] !== pinned) {
              b.x += dx * s;
              b.y += dy * s;
            }
          }
        }
    this.nodes.forEach((n) => {
      n.atlasPoint = this.pos.get(n.id);
    });
    this.baseSize = (n) =>
      n.id === this.hub
        ? 0.126
        : this.isPublic(n)
          ? 0.087
          : n.kind === 'mathlib'
            ? 0.048 + Math.min(4, this.degree.get(n.id)) * 0.004
            : 0.061 + Math.min(8, this.degree.get(n.id)) * 0.0045;
    this.edgePoints = this.edges.map((e, i) => {
      const a = this.pos.get(e.from),
        b = this.pos.get(e.to),
        dx = b.x - a.x,
        dy = b.y - a.y,
        dz = b.z - a.z,
        d = Math.hypot(dx, dy, dz) || 1;
      const bend = (this.hash(e.from + e.to) - 0.5) * Math.min(0.56, d * 0.19),
        out = [];
      const curve = (t) => ({
        x: a.x + (b.x - a.x) * t - (dy / d) * bend * Math.sin(Math.PI * t),
        y: a.y + (b.y - a.y) * t + (dx / d) * bend * Math.sin(Math.PI * t),
        z: a.z + dz * t + Math.sin(Math.PI * t) * Math.min(0.2, d * 0.04),
      });
      const end =
          1 - Math.min(0.2, (this.baseSize(this.index.get(e.to)) * 1.6) / d),
        start = Math.min(
          0.2,
          (this.baseSize(this.index.get(e.from)) * 1.45) / d,
        );
      for (let j = 0; j <= 10; j++)
        out.push(curve(start + ((end - start) * j) / 10));
      const tip = out[out.length - 1],
        prev = out[out.length - 2],
        vx = tip.x - prev.x,
        vy = tip.y - prev.y,
        len = Math.hypot(vx, vy) || 1,
        ux = vx / len,
        uy = vy / len,
        wing = Math.min(0.065, d * 0.12);
      const wings = [
        {
          x: tip.x - (ux + 0.5 * uy) * wing,
          y: tip.y - (uy - 0.5 * ux) * wing,
          z: tip.z,
        },
        tip,
        {
          x: tip.x - (ux - 0.5 * uy) * wing,
          y: tip.y - (uy + 0.5 * ux) * wing,
          z: tip.z,
        },
      ];
      return { out, wings };
    });
    this.guides = [];
    // Dotted reference rings provide orientation during rotation. They carry no graph semantics.
    for (const radius of [2.42, 4.47]) {
      const pts = [];
      for (let i = 0; i <= 220; i++) {
        const a = (2 * Math.PI * i) / 220;
        pts.push({
          x: Math.cos(a) * radius,
          y: Math.sin(a) * radius * 0.58 - 0.1,
          z: -0.82,
        });
      }
      this.guides.push(pts);
    }
  }
  startWebGL() {
    const T = window.THREE;
    if (!T) throw new Error('Three.js is unavailable');
    const renderer = new T.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    this.renderer = renderer;
    renderer.setClearColor(0x000000, 0);
    this.surface.replaceChildren(renderer.domElement);
    this.scene = new T.Scene();
    this.camera = new T.PerspectiveCamera(42, 1, 0.06, 100);
    this.nodeObjects = new Map();
    this.edgeObjects = [];
    this.selectionRing = document.createElement('span');
    this.selectionRing.className = 'selection-ring';
    this.selectionRing.setAttribute('aria-hidden', 'true');
    this.labels.appendChild(this.selectionRing);
    const disk = document.createElement('canvas');
    disk.width = disk.height = 64;
    const c = disk.getContext('2d'),
      g = c.createRadialGradient(32, 32, 1, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,.90)');
    g.addColorStop(0.15, 'rgba(255,255,255,.56)');
    g.addColorStop(0.42, 'rgba(255,255,255,.20)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
    const halo = new T.CanvasTexture(disk);
    const sphere = new T.SphereGeometry(1, 16, 10),
      vec = (p) => [p.x, p.y, p.z];
    const makeGeometry = (points) => {
      const geo = new T.BufferGeometry();
      geo.setAttribute(
        'position',
        new T.Float32BufferAttribute(points.flatMap(vec), 3),
      );
      return geo;
    };
    const diamond = new T.BufferGeometry();
    diamond.setAttribute(
      'position',
      new T.Float32BufferAttribute(
        [
          0, 0.78, 0, -0.68, 0, 0, 0, 0, 0.48, 0, 0.78, 0, 0, 0, 0.48, 0.68, 0,
          0, 0, -0.78, 0, 0, 0, 0.48, -0.68, 0, 0, 0, -0.78, 0, 0.68, 0, 0, 0,
          0, 0.48, 0, 0.78, 0, 0, 0, -0.48, -0.68, 0, 0, 0, 0.78, 0, 0.68, 0, 0,
          0, 0, -0.48, 0, -0.78, 0, -0.68, 0, 0, 0, 0, -0.48, 0, -0.78, 0, 0, 0,
          -0.48, 0.68, 0, 0,
        ],
        3,
      ),
    );
    for (const n of this.nodes) {
      const p = this.pos.get(n.id),
        color = this.palette(n),
        mat = new T.MeshBasicMaterial({
          color,
          transparent: true,
          depthWrite: false,
        }),
        mesh = new T.Mesh(this.isPublic(n) ? diamond : sphere, mat);
      mesh.position.set(p.x, p.y, p.z);
      this.scene.add(mesh);
      const glow = new T.Points(
        makeGeometry([p]),
        new T.PointsMaterial({
          color,
          map: halo,
          size: 0.72,
          transparent: true,
          opacity: 0.62,
          blending: T.AdditiveBlending,
          depthWrite: false,
        }),
      );
      this.scene.add(glow);
      this.nodeObjects.set(n.id, { mesh, glow });
    }
    this.edges.forEach((e, i) => {
      const path = this.edgePoints[i],
        segments = [];
      for (let j = 1; j < path.out.length; j++)
        segments.push(path.out[j - 1], path.out[j]);
      segments.push(path.wings[0], path.wings[1], path.wings[1], path.wings[2]);
      const line = new T.LineSegments(
        makeGeometry(segments),
        new T.LineBasicMaterial({ transparent: true, depthWrite: false }),
      );
      this.scene.add(line);
      this.edgeObjects.push(line);
    });
    for (const ring of this.guides) {
      const line = new T.LineSegments(
        makeGeometry(ring.slice(0, -1)),
        new T.LineBasicMaterial({
          color: 0x8baeb7,
          transparent: true,
          opacity: 0.125,
          depthWrite: false,
        }),
      );
      this.scene.add(line);
    }
    renderer.domElement.addEventListener(
      'webglcontextlost',
      (e) => {
        e.preventDefault();
        this.startCanvas();
        this.resize();
        this.update();
      },
      { once: true },
    );
    this.stage.dataset.renderer = 'webgl';
    document.getElementById('render-mode').textContent = '3D view';
  }
  startCanvas() {
    this.renderer = null;
    if (!this.selectionRing) {
      this.selectionRing = document.createElement('span');
      this.selectionRing.className = 'selection-ring';
      this.labels.appendChild(this.selectionRing);
    }
    const canvas = document.createElement('canvas');
    this.surface.replaceChildren(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stage.dataset.renderer = 'canvas';
    document.getElementById('render-mode').textContent = 'Canvas view';
  }
  setState(visible, active, lit) {
    this.visible = visible;
    this.active = active;
    this.lit = lit;
    this.hover = null;
    this.tip.hidden = true;
    this.update();
  }
  update() {
    this.prepare();
    this.invalidate();
  }
  edgeStyle(e) {
    const shared = e.from === this.active || e.to === this.active,
      adj = this.hover && (e.from === this.hover || e.to === this.hover),
      isMath =
        this.index.get(e.from).kind === 'mathlib' ||
        this.index.get(e.to).kind === 'mathlib';
    const pub = this.isPublic(this.index.get(e.to));
    return {
      color: isMath ? '#9f86e4' : pub ? '#cfa468' : '#5caeaf',
      alpha: adj ? 0.91 : shared ? 0.82 : isMath ? 0.32 : 0.38,
    };
  }
  prepare() {
    if (!this.renderer) return;
    for (const n of this.nodes) {
      const { mesh, glow } = this.nodeObjects.get(n.id),
        focus = n.id === this.active,
        hover = n.id === this.hover;
      mesh.visible = glow.visible = this.visible.has(n.id);
      const size =
        this.baseSize(n) * (focus ? 1.2 : 1) * (this.isPublic(n) ? 1.5 : 1);
      mesh.scale.setScalar(size);
      glow.material.size = size * (focus ? 8.3 : 6.2);
      glow.material.opacity = focus ? 0.93 : hover ? 0.85 : 0.46;
      mesh.material.color.set(hover ? '#ffffff' : this.palette(n));
      mesh.material.opacity = 1;
    }
    this.edges.forEach((e, i) => {
      const line = this.edgeObjects[i],
        style = this.edgeStyle(e);
      line.visible = this.visible.has(e.from) && this.visible.has(e.to);
      line.material.color.set(style.color);
      line.material.opacity = style.alpha;
    });
  }
  resize() {
    const rect = this.stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.w = rect.width;
    this.h = rect.height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (this.renderer) {
      this.renderer.setPixelRatio(this.dpr);
      this.renderer.setSize(this.w, this.h, false);
      this.camera.aspect = this.w / this.h;
      this.camera.updateProjectionMatrix();
    } else {
      this.canvas.width = Math.round(this.w * this.dpr);
      this.canvas.height = Math.round(this.h * this.dpr);
    }
    this.invalidate();
  }
  project(p) {
    const dx = p.x - this.target.x,
      dy = p.y - this.target.y,
      dz = p.z - this.target.z,
      cy = Math.cos(this.yaw),
      sy = Math.sin(this.yaw),
      cp = Math.cos(this.pitch),
      sp = Math.sin(this.pitch),
      x = cy * dx - sy * dz,
      y = -sy * sp * dx + cp * dy - cy * sp * dz,
      z = this.distance - (sy * cp * dx + sp * dy + cy * cp * dz);
    return {
      x: this.w / 2 + (x * this.focal) / z,
      y: this.h / 2 - (y * this.focal) / z,
      s: this.focal / z,
      depth: z,
    };
  }
  invalidate() {
    if (this.pending) return;
    this.pending = true;
    requestAnimationFrame(() => {
      this.pending = false;
      this.draw();
    });
  }
  draw() {
    if (!this.w || !this.h) return;
    this.focal = this.h / 2 / Math.tan((21 * Math.PI) / 180);
    this.distance = Math.max(
      2.4,
      (Math.max(3.08, (4.98 * this.h) / this.w) /
        Math.tan((21 * Math.PI) / 180) +
        0.45) /
        this.zoom,
    );
    if (this.renderer) {
      const cp = Math.cos(this.pitch);
      this.camera.position.set(
        this.target.x + Math.sin(this.yaw) * cp * this.distance,
        this.target.y + Math.sin(this.pitch) * this.distance,
        this.target.z + Math.cos(this.yaw) * cp * this.distance,
      );
      this.camera.lookAt(this.target.x, this.target.y, this.target.z);
      this.renderer.render(this.scene, this.camera);
    } else this.drawCanvas();
    this.screen = this.nodes
      .filter((n) => this.visible.has(n.id))
      .map((n) => ({ node: n, ...this.project(this.pos.get(n.id)) }));
    const active = this.screen.find((p) => p.node.id === this.active);
    if (this.selectionRing) {
      this.selectionRing.hidden = !active;
      if (active) {
        const diameter = Math.max(
          17,
          (this.baseSize(active.node) * active.s * 1.22 + 4.5) * 2,
        );
        Object.assign(this.selectionRing.style, {
          left: active.x + 'px',
          top: active.y + 'px',
          width: diameter + 'px',
          height: diameter + 'px',
          borderColor: this.palette(active.node),
        });
      }
    }
    this.placeLabels();
  }
  drawCanvas() {
    const c = this.ctx;
    if (!c) return;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.clearRect(0, 0, this.w, this.h);
    const move = (p, start) => {
      const s = this.project(p);
      if (start) c.moveTo(s.x, s.y);
      else c.lineTo(s.x, s.y);
    };
    c.lineWidth = 0.8;
    c.strokeStyle = 'rgba(139,174,183,.15)';
    c.setLineDash([3, 5]);
    for (const ring of this.guides) {
      c.beginPath();
      ring.forEach((p, j) => move(p, !j));
      c.stroke();
    }
    c.setLineDash([]);
    this.edges.forEach((e, i) => {
      if (!this.visible.has(e.from) || !this.visible.has(e.to)) return;
      const style = this.edgeStyle(e),
        pp = this.edgePoints[i];
      c.strokeStyle = style.color;
      c.globalAlpha = style.alpha;
      c.lineWidth = e.from === this.active || e.to === this.active ? 1.3 : 1;
      c.beginPath();
      pp.out.forEach((p, j) => move(p, !j));
      pp.wings.forEach((p, j) => move(p, !j));
      c.stroke();
    });
    c.globalAlpha = 1;
    for (const n of this.nodes) {
      if (!this.visible.has(n.id)) continue;
      const s = this.project(this.pos.get(n.id)),
        r = Math.max(
          1.8,
          this.baseSize(n) * s.s * (n.id === this.active ? 1.2 : 1),
        );
      c.fillStyle = this.palette(n);
      c.shadowColor = c.fillStyle;
      c.shadowBlur = n.id === this.active ? 16 : 7;
      c.beginPath();
      if (this.isPublic(n)) {
        c.moveTo(s.x, s.y - r);
        c.lineTo(s.x + r, s.y);
        c.lineTo(s.x, s.y + r);
        c.lineTo(s.x - r, s.y);
        c.closePath();
      } else c.arc(s.x, s.y, r, 0, Math.PI * 2);
      c.fill();
    }
    c.shadowBlur = 0;
  }
  placeLabels() {
    for (const el of this.labelNodes.values()) el.hidden = true;
    const sorted = [...this.screen].sort(
      (a, b) => this.labelRank(b.node) - this.labelRank(a.node),
    );
    const boxes = [],
      limit = this.w < 500 ? 7 : Math.min(16, 10 + Math.floor(this.zoom * 2));
    let shown = 0;
    for (const pt of sorted) {
      const n = pt.node,
        sel = n.id === this.active;
      if (
        shown >= limit ||
        pt.depth < 0.1 ||
        pt.x < 13 ||
        pt.y < 17 ||
        pt.x > this.w - 13 ||
        pt.y > this.h - 22
      )
        continue;
      let el = this.labelNodes.get(n.id);
      if (!el) {
        el = document.createElement('span');
        this.labels.append(el);
        this.labelNodes.set(n.id, el);
      }
      let title = n.title || n.name;
      const maxLength = sel ? 35 : 29;
      title =
        title.length > maxLength ? title.slice(0, maxLength - 1) + '…' : title;
      const width = Math.min(
          sel ? 200 : 158,
          title.length * (sel ? 6 : 5.3) + 10,
        ),
        height = sel ? 21 : 14,
        px = Math.max(width / 2 + 3, Math.min(this.w - width / 2 - 3, pt.x)),
        py = pt.y + Math.max(4, this.baseSize(n) * pt.s) + (sel ? 8 : 3);
      const box = {
        x: px - width / 2 - 4,
        y: py - 3,
        w: width + 8,
        h: height + 5,
      };
      if (
        !sel &&
        boxes.some(
          (b) =>
            b.x < box.x + box.w &&
            b.x + b.w > box.x &&
            b.y < box.y + box.h &&
            b.y + b.h > box.y,
        )
      )
        continue;
      boxes.push(box);
      el.hidden = false;
      el.textContent = title;
      el.className =
        'node-label' +
        (sel
          ? ' selected'
          : n.kind === 'mathlib'
            ? ' mat'
            : this.isPublic(n)
              ? ' pub'
              : '');
      el.style.left = px + 'px';
      el.style.top = py + 'px';
      shown++;
    }
  }
  labelRank(n) {
    if (n.id === this.active) return 1000;
    if (n.id === this.hover) return 900;
    if (n.id === this.hub) return 130;
    const d = this.degree.get(n.id);
    const landmarks = {
      mainRH: 92,
      row: 70,
      theta_lift: 66,
      greenZero: 64,
      rhEvery: 62,
      factor: 61,
      'math-DirichletCharacter.LFunction': 59,
      'math-riemannZeta': 58,
    };
    return (
      (landmarks[n.id] || 0) +
      (this.isPublic(n) ? 32 : 0) +
      (n.kind === 'mathlib' ? Math.min(4, d) * 5 : 0) +
      (this.lit.has(n.id) ? 10 : 0) +
      Math.min(10, d) * 2 +
      this.hash(n.id)
    );
  }
  nearest(x, y) {
    let best = null,
      score = Infinity;
    for (const p of this.screen) {
      const d = Math.hypot(x - p.x, y - p.y),
        hit = Math.max(8, Math.min(18, this.baseSize(p.node) * p.s + 5));
      if (d <= hit && d < score) {
        best = p.node;
        score = d;
      }
    }
    return best;
  }
  changeZoom(scale) {
    this.zoom = Math.max(0.6, Math.min(4.5, this.zoom * scale));
    this.invalidate();
  }
  reset() {
    this.target = { x: 0, y: 0, z: 0 };
    this.zoom = 1;
    this.pitch = this.yaw = 0;
    this.resize();
    this.invalidate();
  }
  // Slow turntable rotation. It holds while the user drags or points at a node.
  spinLoop() {
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (this.spinning && !this.pointsDown.size && !this.hover) {
        this.yaw -= 0.09 * dt;
        this.invalidate();
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  setSpinning(on) {
    this.spinning = on;
  }
  rotate(dx, dy) {
    this.yaw -= dx * 0.006;
    this.pitch = Math.max(-1.13, Math.min(1.13, this.pitch + dy * 0.006));
    this.invalidate();
  }
  events() {
    const local = (e) => {
      const b = this.stage.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    this.stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const p = local(e);
      this.stage.setPointerCapture(e.pointerId);
      this.pointsDown.set(e.pointerId, {
        ...p,
        sx: p.x,
        sy: p.y,
        moved: false,
      });
      this.tip.hidden = true;
    });
    this.stage.addEventListener('pointermove', (e) => {
      const p = local(e),
        last = this.pointsDown.get(e.pointerId);
      if (last) {
        const other = [...this.pointsDown.entries()].find(
          ([id]) => id !== e.pointerId,
        )?.[1];
        if (other) {
          const old = Math.hypot(last.x - other.x, last.y - other.y),
            next = Math.hypot(p.x - other.x, p.y - other.y);
          if (old > 2 && next > 2) this.changeZoom(next / old);
          last.moved = other.moved = true;
        } else if (last.moved || Math.hypot(p.x - last.sx, p.y - last.sy) > 3) {
          last.moved = true;
          this.rotate(p.x - last.x, p.y - last.y);
        }
        last.x = p.x;
        last.y = p.y;
        return;
      }
      const n = this.nearest(p.x, p.y);
      if (this.hover !== n?.id) {
        this.hover = n?.id || null;
        this.update();
      }
      this.stage.style.cursor = n ? 'pointer' : 'grab';
      this.tip.hidden = !n;
      if (n) {
        this.tip.textContent = n.title;
        this.tip.style.left =
          Math.max(2, Math.min(this.w - this.tip.offsetWidth - 4, p.x + 13)) +
          'px';
        this.tip.style.top = Math.max(3, p.y - 32) + 'px';
      }
    });
    this.stage.addEventListener('pointerup', (e) => {
      const last = this.pointsDown.get(e.pointerId);
      if (last && !last.moved) {
        const p = local(e),
          n = this.nearest(p.x, p.y);
        if (n) this.onSelect(n.id);
      }
      this.pointsDown.delete(e.pointerId);
    });
    this.stage.addEventListener('pointercancel', (e) =>
      this.pointsDown.delete(e.pointerId),
    );
    this.stage.addEventListener('pointerleave', () => {
      this.hover = null;
      this.tip.hidden = true;
      this.update();
    });
    this.stage.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        this.changeZoom(
          Math.exp(-Math.max(-150, Math.min(150, e.deltaY)) * 0.002),
        );
      },
      { passive: false },
    );
    this.stage.addEventListener('keydown', (e) => {
      const keys = {
        ArrowLeft: [-16, 0],
        ArrowRight: [16, 0],
        ArrowUp: [0, -16],
        ArrowDown: [0, 16],
      };
      if (keys[e.key]) {
        e.preventDefault();
        this.rotate(...keys[e.key]);
      } else if (e.key === '+' || e.key === '=') {
        this.changeZoom(1.18);
      } else if (e.key === '-') {
        this.changeZoom(1 / 1.18);
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.reset();
      }
    });
  }
};
