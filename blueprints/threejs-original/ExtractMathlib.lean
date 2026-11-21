import RiemannArchitect
import Lean

open Lean

/- Emit the direct Mathlib constants in the type and body of each selected declaration. -/
run_cmd do
  let env ← getEnv
  let some input ← IO.getEnv "ATLAS_DECLARATIONS" | throwError "Missing ATLAS_DECLARATIONS"
  let lines := (← IO.FS.readFile input).splitOn "\n"
  for line in lines do
    unless line.isEmpty do
      let name := line.toName
      let some info := env.find? name | throwError "Missing declaration {name}"
      let mut expressions := #[("type", info.type)]
      -- Imported Mathlib statement types are available even when a theorem body is opaque.
      let some owner := env.getModuleIdxFor? name | throwError "Missing owner of {name}"
      unless (env.header.moduleNames[owner.toNat]!).getRoot == `Mathlib do
        let some value := info.value? (allowOpaque := true) | throwError "No body for {name}"
        expressions := expressions.push ("body", value)
      for (phase, term) in expressions do
        for dep in term.getUsedConstants.qsort Name.lt do
          let some idx := env.getModuleIdxFor? dep | continue
          let mod := env.header.moduleNames[idx.toNat]!
          unless mod.getRoot == `Mathlib do continue
          let ranges ← findDeclarationRanges? dep
          let pos := (ranges.map fun loc => loc.selectionRange.pos.line).getD 0
          IO.println (String.intercalate "\t" ["ATLAS", name.toString, phase, dep.toString, mod.toString, toString pos])
