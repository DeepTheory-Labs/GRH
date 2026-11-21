import VersoManual
import VersoBlueprint.PreviewManifest
import RiemannProof

open Verso Doc
open Verso.Genre Manual

def main (args : List String) : IO UInt32 :=
  Informal.PreviewManifest.blueprintMainWithPreviewData
    (%doc RiemannProof)
    args
    (extensionImpls := by exact extension_impls%)
