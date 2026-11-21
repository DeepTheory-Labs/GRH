# Riemann proof in LeanArchitect

> **Published copy (`-original`).** Links to archive source files point to [leanprover-community/riemann-hypothesis@e7c8972c](https://github.com/leanprover-community/riemann-hypothesis/tree/e7c8972c701d3396947808ab20cc16dc14623d33/src). The generator scripts still expect the workspace they were written in: the archive's `lean/` directory next to `leanarchitect-blueprint/`, `proof-blueprint/` and `proof-atlas/` (published here as `leanarchitect-original/`, `verso-original/` and `threejs-original/`).

Open [the interactive blueprint](index.html) or the [standalone dependency graph](dependencies.svg). The conclusion selector highlights the prerequisites of each of the five public statements. Selecting a node opens its name, source path, original line, and Lean declaration. The standalone SVG links back to those same entries.

The archive’s public RH theorem specializes Dirichlet nonvanishing to the character of level one and uses the zeta functional equation. The primitive Dirichlet conclusion has a separate reflection proof. The general strip conclusion projects a component of `claimAll`. The unconditional step shared across these branches is `UpperTheory.FinalTheorems.everyCharacter`. Its row hypothesis is supplied by `galoisLocalGlobalStrong_recParameter`. The blueprint follows the associated local-parameter, automorphic-window, and theta-matching arguments to selected upstream lemmas. The original five public statements are defined in [Main.lean](https://github.com/leanprover-community/riemann-hypothesis/blob/e7c8972c701d3396947808ab20cc16dc14623d33/src/Main.lean).

## Evidence for the edges

* The 14 green nodes are the archive's original analytic definitions and proofs, copied declaration by declaration, annotated with `@[blueprint]` and compiled against the archive’s Lean 4.33.1 and Mathlib revision `0df444a360eaa60ab8c11dca51a86af692955474`. LeanArchitect inferred seven proof edges and six statement edges by traversing elaborated expressions to annotated declarations. Its LaTeX export contains the inferred `\uses` and `\leanok` markers.
* The 21 remaining nodes, including all five public theorems and the unconditional nonvanishing theorem, are source-traced. The archived `Main.olean` was unavailable. Each of the 24 dashed edges is an explicit, selected name reference in the original declaration’s proof body. These nodes use native `blueprint_comment` blocks and omit `\leanok`. Opening a card shows the argument that motivates the edge. For `claimAll.2.1`, the public wrapper selects only the general strip component of the constructed conjunction.
* Arrows run from prerequisite to consumer. The graph follows the existing proof route and shows the selected declarations reachable from the five public statements. A node without incoming edges can depend on other mathematics outside this selection. The separate simplification experiments do not occur in this graph.

## Files and reproduction

The [annotated module](RiemannArchitect.lean) is the input to LeanArchitect v4.33.1, commit `c74a8acc9e8a1a82096867dd3aeec18fbfc560b9`. [assemble.py](assemble.py) copies the selected proofs unchanged from the neighboring `lean/src` directory and checks the manually listed dependencies against their declaration bodies. [source-index.json](source-index.json) records the path, starting line, and SHA-256 of each extracted declaration. The extractor produced the [module JSON](export/blueprint/module/RiemannArchitect.json), [module LaTeX](export/blueprint/module/RiemannArchitect.tex) and [library LaTeX](export/blueprint/library/RiemannArchitect.tex). The JSON retains the LeanArchitect attributes and informal notes. [render.py](render.py) reads inferred dependencies from the exported LaTeX, reads source-traced dependencies from the exported module notes, validates the graph, and renders [Graphviz DOT](dependencies.dot), SVG and the standalone HTML page.

From this directory run the following with the pinned Lean toolchain, Python 3 and Graphviz `dot` available. The existing workspace reuses the neighboring archive’s matching prebuilt Mathlib dependencies. In a fresh checkout, `lake update` followed by `lake exe cache get` prepares those dependencies before rebuilding.

```sh
bash rebuild.sh
```

The graph shipped here was rendered with the official Graphviz WebAssembly build `@viz-js/viz` 3.17.0. The renderer also supports a standard `dot -Tsvg` installation. To use the same fallback, unpack the npm package under `.lake/render-tools/package` and put Node on `PATH` or set `NODE` to its executable.

All 35 source anchors, 37 graph edges, and 109 local links in the rendered HTML passed verification. An independent `#print axioms` check on all ten copied theorems reported only `propext`, `Classical.choice`, and `Quot.sound`. The Lean module compiled with one `haveI` style suggestion inherited from `Claim.strip`. The upstream source-traced results and the unconditional RH theorem were outside this compilation.
