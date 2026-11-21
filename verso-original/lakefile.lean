import Lake
open Lake DSL

require VersoBlueprint from git "https://github.com/leanprover/verso-blueprint"@"e0d667222e8222ac4bfd74780f69a2e89cd4655f"
package RiemannProof where
  precompileModules := false
  leanOptions := #[⟨`experimental.module, true⟩]

@[default_target]
lean_lib RiemannProof where
