import Verso
import VersoManual
import VersoBlueprint
import VersoBlueprint.Commands.Graph

open Verso.Genre Verso.Genre.Manual Informal

#doc (Manual) "The Riemann proof structure" =>

The original five public results share a theorem giving nonvanishing of Dirichlet L-functions to the right of the critical line. The zeta result specializes it to level one. The two Dirichlet zero results follow different formal reductions in the archive.

This source map follows selected direct references in the original Lean proof bodies, including projections from conjunctions. Each dependency records a line where the consumer names the prerequisite. The graph stops at selected arithmetic and analytic inputs. The source excerpts show additional prerequisites at those boundaries. Blueprint tracks these as informal nodes linked to the archive. Checking this document verifies the map and its markup, independently of a full build or axiom audit of the original project.

{blueprint_graph}

# Public conclusions

:::theorem "Riemann_hypothesis"
`riemannHypothesis`

The public Riemann hypothesis theorem in Mathlib’s formulation.

[Original declaration, line 4](sources.html#Riemann_hypothesis)
:::

:::proof "Riemann_hypothesis" (uses := "RH_wrapper")
[Line 4](sources.html#Riemann_hypothesis-L4) uses `rhOfAll`.
:::

:::theorem "zeta_zeros"
`riemannZeta_eq_zero_re`

The explicitly quantified claim about the real parts of nontrivial zeta zeros uses the same proof as RH.

[Original declaration, line 6](sources.html#zeta_zeros)
:::

:::proof "zeta_zeros" (uses := "RH_wrapper")
[Line 6](sources.html#zeta_zeros-L6) uses `rhOfAll`.
:::

:::theorem "Dirichlet_nonvanishing"
`LFunction_ne_zero_of_half_lt_re`

The public nonvanishing theorem for Dirichlet L-functions to the right of the critical line, with the stated exception at one.

[Original declaration, line 8](sources.html#Dirichlet_nonvanishing)
:::

:::proof "Dirichlet_nonvanishing" (uses := "half_plane_input")
[Line 8](sources.html#Dirichlet_nonvanishing-L8) uses `allChi`.
:::

:::theorem "Dirichlet_zeros"
`LFunction_eq_zero_re`

The public strip result for all characters projects the middle field of the conjunction.

[Original declaration, line 10](sources.html#Dirichlet_zeros)
:::

:::proof "Dirichlet_zeros" (uses := "strip_bundle")
[Line 10](sources.html#Dirichlet_zeros-L10) uses `claimAll`.
:::

:::theorem "primitive_zeros"
`LFunction_eq_zero_re_of_isPrimitive`

The public strip result for primitive characters uses the dedicated primitive wrapper.

[Original declaration, line 12](sources.html#primitive_zeros)
:::

:::proof "primitive_zeros" (uses := "primitive_wrapper")
[Line 12](sources.html#primitive_zeros-L12) uses `critAll`.
:::

# Export wrappers

:::theorem "half_plane_input"
`allChi`

Binds the all-character theorem used by the public-facing wrappers.

[Original declaration, line 7](sources.html#half_plane_input)
:::

:::proof "half_plane_input" (uses := "every_character")
[Line 7](sources.html#half_plane_input-L7) uses `everyCharacter`.
:::

:::theorem "RH_wrapper"
`rhOfAll`

Supplies the half-plane input to the level-one zeta reduction.

[Original declaration, line 9](sources.html#RH_wrapper)
:::

:::proof "RH_wrapper" (uses := "level_one_zeta, half_plane_input")
[Line 9](sources.html#RH_wrapper-L9) uses `rh_of_every`, `allChi`.
:::

:::theorem "strip_bundle"
`claimAll`

Stores half-plane nonvanishing, the strip result, and the zeta result in one conjunction. The all-character strip export selects its middle field.

[Original declaration, line 15](sources.html#strip_bundle)
:::

:::proof "strip_bundle" (uses := "half_plane_input, Dirichlet_strip, zeta_claim")
[Line 16](sources.html#strip_bundle-L16) uses `allChi`, `strip`, `zeta`.
:::

:::theorem "primitive_wrapper"
`critAll`

Supplies the half-plane input to the primitive critical-line reduction.

[Original declaration, line 11](sources.html#primitive_wrapper)
:::

:::proof "primitive_wrapper" (uses := "primitive_line, half_plane_input")
[Line 13](sources.html#primitive_wrapper-L13) uses `critLine`, `allChi`.
:::

# Nonvanishing

:::theorem "family_zero_free"
`UpperTheory.Top.zeroFreeAll_of_topG`

Derives primitive-character zero-freeness from connected families and a host for each character.

[Original declaration, line 26](sources.html#family_zero_free)
:::

:::theorem "primitive_zero_free"
`UpperTheory.Top.zero_free_all_of_green_v_win`

Supplies the family and host inputs using the Green condition, the window and the definite-side hypotheses.

[Original declaration, line 12](sources.html#primitive_zero_free)
:::

:::proof "primitive_zero_free" (uses := "family_zero_free")
[Line 14](sources.html#primitive_zero_free-L14) uses `zeroFreeAll_of_topG`.
:::

:::theorem "change_of_level"
`UpperTheory.Top.imprimitive`

Extends primitive-character nonvanishing to arbitrary level by the change-of-level formula and nonzero Euler factors.

[Original declaration, line 5](sources.html#change_of_level)
:::

:::theorem "all_levels"
`UpperTheory.Top.every_character_of_green_v_win`

Combines primitive nonvanishing with change of level to cover every Dirichlet character.

[Original declaration, line 16](sources.html#all_levels)
:::

:::proof "all_levels" (uses := "primitive_zero_free, change_of_level")
[Line 18](sources.html#all_levels-L18) uses `zero_free_all_of_green_v_win`, `imprimitive`.
:::

:::theorem "theta_to_nonvanishing"
`UpperTheory.Lit.every_character_of_theta_integrals_local_matching`

Uses regular characters for the Green condition and theta matching for the definite-side hypotheses, then applies the all-level theorem.

[Original declaration, line 69](sources.html#theta_to_nonvanishing)
:::

:::proof "theta_to_nonvanishing" (uses := "all_levels, definite_side")
[Line 72](sources.html#theta_to_nonvanishing-L72) uses `every_character_of_green_v_win`. [Line 73](sources.html#theta_to_nonvanishing-L73) uses `nonempty_hyps_definite_side_of_closed_bound`.
:::

:::theorem "literature_to_nonvanishing"
`UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin`

Feeds the assembled third-place and theta inputs, both matching facts, a covolume bound, local reciprocity and the window into the theta argument.

[Original declaration, line 810](sources.html#literature_to_nonvanishing)
:::

:::proof "literature_to_nonvanishing" (uses := "third_place_inputs, theta_local_inputs, theta_matching, theta_to_nonvanishing, covolume_bound, reciprocity_from_literature")
[Line 811](sources.html#literature_to_nonvanishing-L811) uses `published_results_eigen`, `published_results_first`, `theta_integrals_agree_and_local_matching_of_literature`, `every_character_of_theta_integrals_local_matching`. [Line 812](sources.html#literature_to_nonvanishing-L812) uses `topCovolSlim2_use_alt_alt`. [Line 813](sources.html#literature_to_nonvanishing-L813) uses `local_langlands_gl_recT_exists_of_literature`.
:::

:::theorem "row_to_nonvanishing"
`UpperTheory.FinalTheorems.everyCharacter_of_row`

Supplies the row twice in the literature record, supplies local reciprocity, and builds the required window from that row.

[Original declaration, line 7](sources.html#row_to_nonvanishing)
:::

:::proof "row_to_nonvanishing" (uses := "local_Langlands, automorphic_window, literature_to_nonvanishing")
[Line 8](sources.html#row_to_nonvanishing-L8) uses `recTExists`, `vwin_of_row`, `every_character_of_literature_of_vWin`.
:::

:::theorem "every_character"
`UpperTheory.FinalTheorems.everyCharacter`

Applies the row-to-nonvanishing implication to the constructed Galois row.

[Original declaration, line 10](sources.html#every_character)
:::

:::proof "every_character" (uses := "Galois_row, row_to_nonvanishing")
[Line 11](sources.html#every_character-L11) uses `galoisLocalGlobalStrong_recParameter`, `everyCharacter_of_row`.
:::

# Arithmetic inputs

:::theorem "reciprocity_from_literature"
`UpperTheory.LiteratureTheorems.local_langlands_gl_recT_exists_of_literature`

Extracts existence of local reciprocity from the supplied literature record.

[Original declaration, line 313](sources.html#reciprocity_from_literature)
:::

:::theorem "covolume_bound"
`SelfIntersectionVolumeEstimates.topCovolSlim2_use_alt_alt`

Derives the required covolume bound from arithmetic geometry inputs including Hilbert–Samuel, positivity, toroidal compactifications and deformation theory.

[Original declaration, line 16](sources.html#covolume_bound)
:::

:::theorem "theta_to_Galois"
`UpperTheory.Gal.Int.galoisRepresentations_of_thetaLift`

Converts the theta lift and the geometric input into the local–global reciprocity row.

[Original declaration, line 6](sources.html#theta_to_Galois)
:::

:::theorem "theta_lift"
`UpperTheory.TP.K.tLiftK`

Supplies the theta lift fed into the Galois representation construction.

[Original declaration, line 4](sources.html#theta_lift)
:::

:::theorem "Galois_row"
`UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter`

The local–global Galois row for the reciprocity parameter comes from the theta-lift construction.

[Original declaration, line 6](sources.html#Galois_row)
:::

:::proof "Galois_row" (uses := "theta_lift, theta_to_Galois")
[Line 6](sources.html#Galois_row-L6) uses `tLiftK`, `galoisRepresentations_of_thetaLift`.
:::

:::theorem "local_Langlands"
`UpperTheory.Zero.LLC.recTExists`

Constructs the local reciprocity datum and proves its required compatibility properties.

[Original declaration, line 20](sources.html#local_Langlands)
:::

:::theorem "automorphic_window"
`UpperTheory.One.vwin_of_row`

Turns the local–global row and base-change input into the automorphic window.

[Original declaration, line 4](sources.html#automorphic_window)
:::

:::theorem "third_place_inputs"
`UpperTheory.LiteratureTheorems.published_results_eigen`

Assembles the unitary-group third-place hypotheses from the literature package.

[Original declaration, line 666](sources.html#third_place_inputs)
:::

:::theorem "theta_local_inputs"
`UpperTheory.LiteratureTheorems.published_results_first`

Builds the local theta input record used in the matching argument.

[Original declaration, line 727](sources.html#theta_local_inputs)
:::

:::theorem "theta_matching"
`UpperTheory.LiteratureTheorems.theta_integrals_agree_and_local_matching_of_literature`

Produces both agreement of theta integrals and local matching.

[Original declaration, line 565](sources.html#theta_matching)
:::

:::theorem "definite_side"
`UpperTheory.Lit.nonempty_hyps_definite_side_of_closed_bound`

Uses the theta, covolume and reciprocity data to construct the definite-side hypotheses.

[Original declaration, line 44](sources.html#definite_side)
:::

# Analytic reductions

:::theorem "Euler_factor"
`Claim.factor_ne_zero`

A removed prime Euler factor cannot vanish when the real part is positive.

[Original declaration, line 7](sources.html#Euler_factor)
:::

:::theorem "primitive_zero"
`Claim.prim_zero`

A zero in the open strip descends to the primitive character after removing the nonvanishing Euler factors.

[Original declaration, line 23](sources.html#primitive_zero)
:::

:::proof "primitive_zero" (uses := "Euler_factor")
[Line 33](sources.html#primitive_zero-L33) uses `factor_ne_zero`.
:::

:::theorem "strip_gamma"
`Claim.gamma_ne_zero`

The character gamma factor is nonzero in the open right half-plane.

[Original declaration, line 35](sources.html#strip_gamma)
:::

:::theorem "reflect_zero"
`Claim.prim_reflect`

Reflects a primitive zero to the inverse character at one minus the original point by the completed functional equation.

[Original declaration, line 42](sources.html#reflect_zero)
:::

:::proof "reflect_zero" (uses := "strip_gamma")
[Line 51](sources.html#reflect_zero-L51) uses `gamma_ne_zero`.
:::

:::theorem "Dirichlet_strip"
`Claim.strip`

For a zero left of the critical line, descend to the primitive character and reflect it into the zero-free half-plane. Right-side zeros are excluded directly.

[Original declaration, line 59](sources.html#Dirichlet_strip)
:::

:::proof "Dirichlet_strip" (uses := "primitive_zero, reflect_zero")
[Line 67](sources.html#Dirichlet_strip-L67) uses `prim_zero`. [Line 68](sources.html#Dirichlet_strip-L68) uses `prim_reflect`.
:::

:::theorem "zeta_claim"
`Claim.zeta`

Uses the level-one instance of the strip result and the zeta functional equation outside the strip. This is a component of the conjunction used by an export.

[Original declaration, line 75](sources.html#zeta_claim)
:::

:::proof "zeta_claim" (uses := "Dirichlet_strip")
[Line 82](sources.html#zeta_claim-L82) uses `strip`.
:::

:::theorem "primitive_gamma"
`Formalism.VW.gammaFactor_ne_zero`

Proves gamma-factor nonvanishing in the separate primitive-character reduction.

[Original declaration, line 6](sources.html#primitive_gamma)
:::

:::theorem "primitive_line"
`Formalism.VW.critLine`

Reflects a primitive Dirichlet zero and applies the half-plane hypothesis. This is the reduction used by the original primitive export.

[Original declaration, line 11](sources.html#primitive_line)
:::

:::proof "primitive_line" (uses := "primitive_gamma")
[Line 21](sources.html#primitive_line-L21) uses `gammaFactor_ne_zero`.
:::

:::theorem "zeta_reflection"
`Formalism.VW.rh_of_right`

Reflects a nontrivial zeta zero to show that right-half-plane nonvanishing forces real part one half.

[Original declaration, line 5](sources.html#zeta_reflection)
:::

:::theorem "level_one_zeta"
`Formalism.VW.rh_of_every`

Specializes all-character nonvanishing to the trivial character at level one, identifies its L-function with zeta, and applies reflection.

[Original declaration, line 29](sources.html#level_one_zeta)
:::

:::proof "level_one_zeta" (uses := "zeta_reflection")
[Line 30](sources.html#level_one_zeta-L30) uses `rh_of_right`.
:::
