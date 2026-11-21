#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
python3 assemble.py
lake build LeanArchitect/extract_blueprint
mkdir -p .lake/build/lib/lean
lake env lean -DautoImplicit=false -DrelaxedAutoImplicit=false -DmaxSynthPendingDepth=3 -DmaxHeartbeats=4000000 \
  -o .lake/build/lib/lean/RiemannArchitect.olean -i .lake/build/lib/lean/RiemannArchitect.ilean RiemannArchitect.lean
extract=.lake/packages/LeanArchitect/.lake/build/bin/extract_blueprint
for format in tex json; do
  flags=()
  if [[ $format == json ]]; then flags+=(--json); fi
  lake env "$extract" single --build export "${flags[@]}" RiemannArchitect
  lake env "$extract" index --build export "${flags[@]}" RiemannArchitect RiemannArchitect
done
python3 render.py
