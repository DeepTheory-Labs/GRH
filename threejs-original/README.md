# Riemann proof atlas

> **Published copy (`-original`).** Links to archive source files point to [leanprover-community/riemann-hypothesis@e7c8972c](https://github.com/leanprover-community/riemann-hypothesis/tree/e7c8972c701d3396947808ab20cc16dc14623d33/src). The generator scripts still expect the workspace they were written in: the archive's `lean/` directory next to `leanarchitect-blueprint/`, `proof-blueprint/` and `proof-atlas/` (published here as `leanarchitect-original/`, `verso-original/` and `threejs-original/`).

Open [the interactive Three.js graph](index.html) directly in a browser. Its JavaScript, fonts, data, and source excerpts are local. Drag to orbit, scroll or pinch to zoom, or use the declaration index with the keyboard. Press `/` to search. Select **Mathlib4 connections** to show the library and the project declarations that touch it. **Isolate node** shows one declaration with its immediate prerequisites and consumers. An arrow runs from a prerequisite to its consumer. Expand a connection to inspect its evidence.

For a worked example, open the [Dirichlet functional equation](index.html#node=math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub). Its statement uses the completed L-function and the root number. Its **Used by** list links to the archive’s reflection argument `Claim.prim_reflect` and the primitive critical-line argument `Formalism.VW.critLine`. [Pinned statement and source lines](mathlib-sources.html#math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub)

## Evidence and scope

The graph combines 42 project declarations and 44 selected Mathlib declarations. Its 204 distinct arrows break down as follows.

| Connection | Arrows | Evidence |
| --- | ---: | --- |
| Project → project | 44 | Union of the [LeanArchitect graph](../leanarchitect-original/index.html) and [Verso graph](../verso-original/site/index.html). Shared edges retain both sources of evidence. |
| Mathlib → project | 92 | 91 direct references in the types or bodies of 14 compiled project declarations. One additional edge connects the archive’s public RH declaration to the Mathlib proposition named in its source. |
| Mathlib → Mathlib | 68 | Direct constants in the elaborated statements of the selected library declarations. |

The library selection covers zeta, Dirichlet characters, L-functions, gamma factors, and a few supporting analytic identities. Open the [full direct-reference table](mathlib-references.tsv) for all **1,634** type/body references, spanning **374** different Mathlib constants in those 14 project declarations. It includes instances and elaboration helpers. A given constant can occur in the type and the body of the same declaration. The table records these separately, while the visual graph combines them into a single arrow. The source line column identifies the Mathlib declaration. A zero means Lean provided no source range for that constant.

The upstream unconditional nonvanishing theorem is source-traced. The two blueprints and this atlas do not independently verify the full archive or establish RH. Proof status for each project node appears in its inspector.

## Regenerate the data

Use the LeanArchitect package’s Lean 4.33.1 toolchain and Mathlib revision `0df444a360eaa60ab8c11dca51a86af692955474`. The generator reads its compiled `RiemannArchitect.olean` and exported blueprint. To restore these in a fresh checkout, first follow the [LeanArchitect rebuild instructions](../leanarchitect-original/README.md).

```sh
cd proof-atlas   # in the original workspace
python3 build_data.py
```

The generator merges declarations by Lean name, checks source witnesses, invokes [ExtractMathlib.lean](ExtractMathlib.lean) through `lake env lean` in the sibling package, and validates that every node leads to at least one public endpoint. It writes `graph-data.js`, `mathlib-sources.html`, and `mathlib-references.tsv`. The viewer uses the bundled Three.js 0.182.0 runtime and supports a Canvas fallback. Library and font licenses are in `vendor/`.
