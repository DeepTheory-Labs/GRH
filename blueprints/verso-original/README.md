# Riemann proof structure

> **Published copy (`-original`).** Links to archive source files point to [leanprover-community/riemann-hypothesis@e7c8972c](https://github.com/leanprover-community/riemann-hypothesis/tree/e7c8972c701d3396947808ab20cc16dc14623d33/src). The generator scripts still expect the workspace they were written in: the archive's `lean/` directory next to `leanarchitect-blueprint/`, `proof-blueprint/` and `proof-atlas/` (published here as `leanarchitect-original/`, `verso-original/` and `threejs-original/`).

Open the [interactive Verso Blueprint](site/index.html) and choose **Dependency Graph**, or open the [standalone SVG](site/graph.svg) to view the labels and arrows directly. The five statements of `lean/src/Main.lean` appear under **Public conclusions**. An arrow points from the prerequisite to the declaration whose proof cites it. The native graph has 38 declarations and 38 line-checked proof references. The evidence links show the line and surrounding proof. A leaf marks where this overview stops tracing. The generated colors reflect the informal Blueprint entries. Proof status and a complete kernel dependency closure would require a separate audit of the original project.

To preview locally, run `python3 -m http.server 8000 --bind 127.0.0.1` in the repository root and open `http://127.0.0.1:8000/verso-original/site/`. The two graph rendering libraries ship with the site.

## What the graph follows

`riemannHypothesis` and `riemannZeta_eq_zero_re` both cite `rhOfAll`. Its proof gets zeta nonvanishing by specializing the all-character theorem to level one, then uses reflection. The public Dirichlet nonvanishing result exposes `allChi` itself. For strip zeros, `LFunction_eq_zero_re` selects the middle field of `claimAll`, while the primitive public theorem follows `critAll`. The graph preserves both original branches.

The central arithmetic step constructs `UpperTheory.FinalTheorems.everyCharacter` from a Galois local–global row. The argument uses an automorphic window, local reciprocity, theta matching, third-place data and a covolume bound. The primitive nonvanishing argument and the extension by change of level are shown separately.

## Rebuild

The Blueprint is an independent Lake project using the archive’s Lean `v4.33.1` and `leanprover/verso-blueprint` revision `e0d667222e8222ac4bfd74780f69a2e89cd4655f`. A C compiler with standard development headers is needed for its Markdown dependency. Packaging uses Python 3 and npm.

```sh
cd proof-blueprint
python3 check_sources.py
lake build RiemannProof VersoBlueprint.PreviewManifest
lake env lean --run RiemannProofMain.lean --output _out --with-html-single --without-html-multi --without-tex
python3 package_site.py
```

`nodes.json` records the exact original declaration path and line, description and direct proof references for each node. After editing that data, run `python3 check_sources.py --write` to check the evidence and regenerate the [Verso source](RiemannProof.lean) and linked excerpts before rebuilding. Graph rendering uses the native `{blueprint_graph}` command and proof-level `uses` directives. The five public roots are retained when the checker verifies reachability and acyclicity.
