# GRH

Visualizations, simplifications and interpretability work on the Lean formalization of the
Riemann hypothesis and the generalized Riemann hypothesis for Dirichlet L-functions.

The formalization studied here is the published archive, as mirrored in
[leanprover-community/riemann-hypothesis](https://github.com/leanprover-community/riemann-hypothesis).

**Preview:** <https://deeptheory-labs.github.io/GRH/>

**Blueprints of the original proof:**

- [LeanArchitect blueprint](https://deeptheory-labs.github.io/GRH/leanarchitect-original/)
- [Verso Blueprint](https://deeptheory-labs.github.io/GRH/verso-original/site/)
- [Three.js Proof Map](https://deeptheory-labs.github.io/GRH/threejs-original/)

## Releases

Each release is a folder named `<tool>-<stage>`. A stage is never changed after it is published;
simplifications appear as new stages (`simp-01`, `simp-02`, …), each tagged in git.

| Stage | Lean source | Folder | Contents |
|---|---|---|---|
| `original` | archive, [`e7c8972c`](https://github.com/leanprover-community/riemann-hypothesis/tree/e7c8972c701d3396947808ab20cc16dc14623d33/src) | [`leanarchitect-original/`](leanarchitect-original/) — [preview](https://deeptheory-labs.github.io/GRH/leanarchitect-original/index.html) | LeanArchitect blueprint: 35 declarations, 37 edges; 14 compiled with LeanArchitect, 21 traced in source |
| `original` | archive, [`e7c8972c`](https://github.com/leanprover-community/riemann-hypothesis/tree/e7c8972c701d3396947808ab20cc16dc14623d33/src) | [`verso-original/`](verso-original/) — [preview](https://deeptheory-labs.github.io/GRH/verso-original/site/index.html) | Verso Blueprint: 38 declarations, 38 line-checked proof references |
| `original` | archive, [`e7c8972c`](https://github.com/leanprover-community/riemann-hypothesis/tree/e7c8972c701d3396947808ab20cc16dc14623d33/src) | [`threejs-original/`](threejs-original/) — [preview](https://deeptheory-labs.github.io/GRH/threejs-original/index.html) | Three.js Proof Map: 3D graph, 42 project and 44 Mathlib declarations, 204 arrows |

The `original` graphs select declarations along the proof route from the five public statements
in `Main.lean`. They describe the archive's proof structure; they do not verify it.

## License

Apache 2.0, see [LICENSE](LICENSE).
