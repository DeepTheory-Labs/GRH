window.PROOF_ATLAS = {
  "meta": {
    "mathlibRev": "0df444a360eaa60ab8c11dca51a86af692955474",
    "compiledProjectDeclarations": 14,
    "rawReferences": 1634,
    "rawConstants": 374,
    "projectNodes": 42,
    "mathlibNodes": 44,
    "leanVersion": "leanprover/lean4:v4.33.1",
    "fullTable": "mathlib-references.tsv"
  },
  "nodes": [
    {
      "id": "everyDef",
      "name": "UpperTheory.EveryCharacter",
      "title": "Dirichlet nonvanishing premise",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Every Dirichlet L-function is nonzero to the right of one half, excluding the principal-character point at one.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean",
      "line": 13,
      "url": "../leanarchitect-original/index.html#everyDef",
      "blueprintUrl": "../leanarchitect-original/index.html#everyDef",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "half",
      "name": "Claim.HalfPlane",
      "title": "Right half-plane predicate",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Nonvanishing in the open right half-plane for every positive level, subject to the exception at one.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean",
      "line": 3,
      "url": "../leanarchitect-original/index.html#half",
      "blueprintUrl": "../leanarchitect-original/index.html#half",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "stripDef",
      "name": "Claim.Strip",
      "title": "Strip predicate",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "A Dirichlet L-function zero in the open critical strip has real part one half.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean",
      "line": 6,
      "url": "../leanarchitect-original/index.html#stripDef",
      "blueprintUrl": "../leanarchitect-original/index.html#stripDef",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "zetaDef",
      "name": "Claim.Zeta",
      "title": "Zeta-zero predicate",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Every nontrivial zeta zero distinct from one lies on the critical line.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean",
      "line": 9,
      "url": "../leanarchitect-original/index.html#zetaDef",
      "blueprintUrl": "../leanarchitect-original/index.html#zetaDef",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "factor",
      "name": "Claim.factor_ne_zero",
      "title": "Euler factor is nonzero",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "At positive real part the prime-power term has norm less than one, so a deleted Euler factor cannot vanish.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean",
      "line": 7,
      "url": "../verso-original/site/sources.html#Euler_factor",
      "blueprintUrl": "../leanarchitect-original/index.html#factor",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "primZero",
      "name": "Claim.prim_zero",
      "title": "Pass a zero to the primitive character",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Change level to the conductor and rule out zeros of the deleted Euler factors.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean",
      "line": 23,
      "url": "../verso-original/site/sources.html#primitive_zero",
      "blueprintUrl": "../leanarchitect-original/index.html#primZero",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "gamma",
      "name": "Claim.gamma_ne_zero",
      "title": "Gamma factor is nonzero",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Both possible archimedean factors are nonzero at positive real part.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean",
      "line": 35,
      "url": "../verso-original/site/sources.html#strip_gamma",
      "blueprintUrl": "../leanarchitect-original/index.html#gamma",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "reflect",
      "name": "Claim.prim_reflect",
      "title": "Reflect a primitive zero",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "The completed functional equation transfers a primitive zero to the inverse character at one minus the original argument.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean",
      "line": 42,
      "url": "../verso-original/site/sources.html#reflect_zero",
      "blueprintUrl": "../leanarchitect-original/index.html#reflect",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "strip",
      "name": "Claim.strip",
      "title": "All Dirichlet zeros in the strip",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Use half-plane nonvanishing on the right. On the left, pass to the primitive character and reflect its zero to the right.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean",
      "line": 59,
      "url": "../verso-original/site/sources.html#Dirichlet_strip",
      "blueprintUrl": "../leanarchitect-original/index.html#strip",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "zeta",
      "name": "Claim.zeta",
      "title": "Zeta consequence of nonvanishing",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Use the level-one character in the strip and the zeta functional equation and nonvanishing outside it.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean",
      "line": 75,
      "url": "../verso-original/site/sources.html#zeta_claim",
      "blueprintUrl": "../leanarchitect-original/index.html#zeta",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "right",
      "name": "Formalism.VW.rh_of_right",
      "title": "Reflect a hypothetical zeta zero",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Right-half-plane nonvanishing implies RH by the zeta functional equation, with the exceptional gamma and trigonometric factors handled explicitly.",
      "source": "Formalism/GammaFactorNonvanishing/RhOfRight.lean",
      "line": 5,
      "url": "../verso-original/site/sources.html#zeta_reflection",
      "blueprintUrl": "../leanarchitect-original/index.html#right",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "vGamma",
      "name": "Formalism.VW.gammaFactor_ne_zero",
      "title": "Archimedean factor for the primitive proof",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Compute the gamma factor according to character parity on the positive half-plane.",
      "source": "Formalism/GammaFactorNonvanishing/CritLine.lean",
      "line": 6,
      "url": "../verso-original/site/sources.html#primitive_gamma",
      "blueprintUrl": "../leanarchitect-original/index.html#vGamma",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "crit",
      "name": "Formalism.VW.critLine",
      "title": "Primitive zeros on the critical line",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Half-plane nonvanishing and the primitive functional equation force a zero in the strip onto the critical line.",
      "source": "Formalism/GammaFactorNonvanishing/CritLine.lean",
      "line": 11,
      "url": "../verso-original/site/sources.html#primitive_line",
      "blueprintUrl": "../leanarchitect-original/index.html#crit",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "rhEvery",
      "name": "Formalism.VW.rh_of_every",
      "title": "Specialize to the level-one character",
      "group": "Analytic reductions",
      "kind": "project",
      "summary": "Apply the zeta reduction to the trivial character modulo one, whose L-function is zeta.",
      "source": "Formalism/GammaFactorNonvanishing/CritLine.lean",
      "line": 29,
      "url": "../verso-original/site/sources.html#level_one_zeta",
      "blueprintUrl": "../leanarchitect-original/index.html#rhEvery",
      "status": "Compiled in LeanArchitect"
    },
    {
      "id": "topG",
      "name": "UpperTheory.Top.zeroFreeAll_of_topG",
      "title": "Primitive zero-free criterion",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "Combine the top-level condition with the required host data for each primitive character.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean",
      "line": 26,
      "url": "../verso-original/site/sources.html#family_zero_free",
      "blueprintUrl": "../leanarchitect-original/index.html#topG",
      "status": "Traced in source"
    },
    {
      "id": "greenZero",
      "name": "UpperTheory.Top.zero_free_all_of_green_v_win",
      "title": "Primitive character nonvanishing",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "The Green and window hypotheses and a definite-side witness provide the inputs of the primitive criterion.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean",
      "line": 12,
      "url": "../verso-original/site/sources.html#primitive_zero_free",
      "blueprintUrl": "../leanarchitect-original/index.html#greenZero",
      "status": "Traced in source"
    },
    {
      "id": "imprimitive",
      "name": "UpperTheory.Top.imprimitive",
      "title": "Extend to imprimitive characters",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "Use the character of minimal conductor and show that the remaining Euler factors cannot vanish.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/Imprimitive.lean",
      "line": 5,
      "url": "../verso-original/site/sources.html#change_of_level",
      "blueprintUrl": "../leanarchitect-original/index.html#imprimitive",
      "status": "Traced in source"
    },
    {
      "id": "greenEvery",
      "name": "UpperTheory.Top.every_character_of_green_v_win",
      "title": "From windows to all characters",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "First derive the primitive zero-free result, then extend to arbitrary positive levels.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean",
      "line": 16,
      "url": "../verso-original/site/sources.html#all_levels",
      "blueprintUrl": "../leanarchitect-original/index.html#greenEvery",
      "status": "Traced in source"
    },
    {
      "id": "definite",
      "name": "UpperTheory.Lit.nonempty_hyps_definite_side_of_closed_bound",
      "title": "Construct a definite-side witness",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Theta integrals, local matching, a covolume bound, and local parameters supply a nonempty family of definite-side hypotheses.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean",
      "line": 44,
      "url": "../verso-original/site/sources.html#definite_side",
      "blueprintUrl": "../leanarchitect-original/index.html#definite",
      "status": "Traced in source"
    },
    {
      "id": "match",
      "name": "UpperTheory.Lit.every_character_of_theta_integrals_local_matching",
      "title": "Theta integrals and local matching",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "Combine the definite-side witness with the Green and window input to obtain the all-character conclusion.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean",
      "line": 69,
      "url": "../verso-original/site/sources.html#theta_to_nonvanishing",
      "blueprintUrl": "../leanarchitect-original/index.html#match",
      "status": "Traced in source"
    },
    {
      "id": "literature",
      "name": "UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin",
      "title": "Assemble the literature inputs",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "Package published results, local matching, theta integrals and a covolume estimate for the theta-to-nonvanishing theorem.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean",
      "line": 810,
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing",
      "blueprintUrl": "../leanarchitect-original/index.html#literature",
      "status": "Traced in source"
    },
    {
      "id": "row",
      "name": "UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter",
      "title": "Galois row for the local parameter",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "The source obtains its local–global row by applying a Galois-representations result to a theta lift.",
      "source": "Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/IntegralStructures/RowSrc.lean",
      "line": 6,
      "url": "../verso-original/site/sources.html#Galois_row",
      "blueprintUrl": "../leanarchitect-original/index.html#row",
      "status": "Traced in source"
    },
    {
      "id": "local",
      "name": "UpperTheory.Zero.LLC.recTExists",
      "title": "Local parameter construction",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "The project constructs the local parameter with the required compatibilities.",
      "source": "Development/AutomorphicArithmetic/Foundations/LocalLanglands/LocalCentralUnits/RecTExists.lean",
      "line": 20,
      "url": "../verso-original/site/sources.html#local_Langlands",
      "blueprintUrl": "../leanarchitect-original/index.html#local",
      "status": "Traced in source"
    },
    {
      "id": "window",
      "name": "UpperTheory.One.vwin_of_row",
      "title": "Window condition from a row",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Use open-image and base-change inputs together with the given row to obtain the automorphic window.",
      "source": "Development/AutomorphicArithmetic/AutomorphicVarieties/ModularityArgument/ThresholdArguments/DenseThresholdCases/VwinOfRow.lean",
      "line": 4,
      "url": "../verso-original/site/sources.html#automorphic_window",
      "blueprintUrl": "../leanarchitect-original/index.html#window",
      "status": "Traced in source"
    },
    {
      "id": "ofRow",
      "name": "UpperTheory.FinalTheorems.everyCharacter_of_row",
      "title": "Nonvanishing given the Galois row",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "Assemble the literature package using the supplied row and local parameter existence. Apply the window result to that same row.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean",
      "line": 7,
      "url": "../verso-original/site/sources.html#row_to_nonvanishing",
      "blueprintUrl": "../leanarchitect-original/index.html#ofRow",
      "status": "Traced in source"
    },
    {
      "id": "every",
      "name": "UpperTheory.FinalTheorems.everyCharacter",
      "title": "Nonvanishing for all characters",
      "group": "Nonvanishing",
      "kind": "project",
      "summary": "Discharge the row assumption with the local–global result. This is the unconditional input consumed by the public analytic deductions.",
      "source": "Development/AutomorphicArithmetic/CharacterBoxes/MainConclusion.lean",
      "line": 10,
      "url": "../verso-original/site/sources.html#every_character",
      "blueprintUrl": "../leanarchitect-original/index.html#every",
      "status": "Traced in source"
    },
    {
      "id": "allChi",
      "name": "allChi",
      "title": "Public nonvanishing bridge",
      "group": "Export wrappers",
      "kind": "project",
      "summary": "Expose the unconditional all-character result to the final deduction module.",
      "source": "Supplements/Kernels/MainTheorems.lean",
      "line": 7,
      "url": "../verso-original/site/sources.html#half_plane_input",
      "blueprintUrl": "../leanarchitect-original/index.html#allChi",
      "status": "Traced in source"
    },
    {
      "id": "rhAll",
      "name": "rhOfAll",
      "title": "Riemann hypothesis from all characters",
      "group": "Export wrappers",
      "kind": "project",
      "summary": "Apply the checked level-one reduction to the nonvanishing bridge.",
      "source": "Supplements/Kernels/MainTheorems.lean",
      "line": 9,
      "url": "../verso-original/site/sources.html#RH_wrapper",
      "blueprintUrl": "../leanarchitect-original/index.html#rhAll",
      "status": "Traced in source"
    },
    {
      "id": "critAll",
      "name": "critAll",
      "title": "Primitive critical-line bridge",
      "group": "Export wrappers",
      "kind": "project",
      "summary": "Apply the primitive critical-line theorem with the unconditional nonvanishing input.",
      "source": "Supplements/Kernels/MainTheorems.lean",
      "line": 11,
      "url": "../verso-original/site/sources.html#primitive_wrapper",
      "blueprintUrl": "../leanarchitect-original/index.html#critAll",
      "status": "Traced in source"
    },
    {
      "id": "claimAll",
      "name": "claimAll",
      "title": "Package the three analytic claims",
      "group": "Export wrappers",
      "kind": "project",
      "summary": "Assemble the half-plane result, the general Dirichlet strip result and the zeta statement in a conjunction.",
      "source": "Supplements/Kernels/MainTheorems.lean",
      "line": 15,
      "url": "../verso-original/site/sources.html#strip_bundle",
      "blueprintUrl": "../leanarchitect-original/index.html#claimAll",
      "status": "Traced in source"
    },
    {
      "id": "mainRH",
      "name": "riemannHypothesis",
      "title": "Riemann hypothesis",
      "group": "Public conclusions",
      "kind": "project",
      "summary": "The first public theorem takes its proof from the zeta bridge.",
      "source": "Main.lean",
      "line": 4,
      "url": "../verso-original/site/sources.html#Riemann_hypothesis",
      "blueprintUrl": "../leanarchitect-original/index.html#mainRH",
      "status": "Traced in source"
    },
    {
      "id": "mainZeta",
      "name": "riemannZeta_eq_zero_re",
      "title": "Nontrivial zeta zeros on the line",
      "group": "Public conclusions",
      "kind": "project",
      "summary": "The second public statement uses the same bridge under a definitionally equal type.",
      "source": "Main.lean",
      "line": 6,
      "url": "../verso-original/site/sources.html#zeta_zeros",
      "blueprintUrl": "../leanarchitect-original/index.html#mainZeta",
      "status": "Traced in source"
    },
    {
      "id": "mainNV",
      "name": "LFunction_ne_zero_of_half_lt_re",
      "title": "Dirichlet half-plane nonvanishing",
      "group": "Public conclusions",
      "kind": "project",
      "summary": "The public theorem is the all-character nonvanishing bridge.",
      "source": "Main.lean",
      "line": 8,
      "url": "../verso-original/site/sources.html#Dirichlet_nonvanishing",
      "blueprintUrl": "../leanarchitect-original/index.html#mainNV",
      "status": "Traced in source"
    },
    {
      "id": "mainStrip",
      "name": "LFunction_eq_zero_re",
      "title": "All Dirichlet zeros on the line",
      "group": "Public conclusions",
      "kind": "project",
      "summary": "Project the strip proof from the three-part conjunction. Only the strip component is selected at this use.",
      "source": "Main.lean",
      "line": 10,
      "url": "../verso-original/site/sources.html#Dirichlet_zeros",
      "blueprintUrl": "../leanarchitect-original/index.html#mainStrip",
      "status": "Traced in source"
    },
    {
      "id": "mainPrim",
      "name": "LFunction_eq_zero_re_of_isPrimitive",
      "title": "Primitive Dirichlet zeros on the line",
      "group": "Public conclusions",
      "kind": "project",
      "summary": "The original public theorem uses the dedicated primitive bridge.",
      "source": "Main.lean",
      "line": 12,
      "url": "../verso-original/site/sources.html#primitive_zeros",
      "blueprintUrl": "../leanarchitect-original/index.html#mainPrim",
      "status": "Traced in source"
    },
    {
      "id": "reciprocity_from_literature",
      "name": "UpperTheory.LiteratureTheorems.local_langlands_gl_recT_exists_of_literature",
      "title": "Local reciprocity from the literature",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Extracts existence of local reciprocity from the supplied literature record.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean",
      "line": 313,
      "url": "../verso-original/site/sources.html#reciprocity_from_literature",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-reciprocity_from_literature--statement",
      "status": "Traced in source"
    },
    {
      "id": "covolume_bound",
      "name": "SelfIntersectionVolumeEstimates.topCovolSlim2_use_alt_alt",
      "title": "Arithmetic covolume bound",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Derives the required covolume bound from arithmetic geometry inputs including Hilbert–Samuel, positivity, toroidal compactifications and deformation theory.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopCovolSlim2Use.lean",
      "line": 16,
      "url": "../verso-original/site/sources.html#covolume_bound",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-covolume_bound--statement",
      "status": "Traced in source"
    },
    {
      "id": "theta_to_Galois",
      "name": "UpperTheory.Gal.Int.galoisRepresentations_of_thetaLift",
      "title": "From a theta lift to Galois data",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Converts the theta lift and the geometric input into the local–global reciprocity row.",
      "source": "Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/IntegralStructures/GaloisRepresentationsOfThetaLift.lean",
      "line": 6,
      "url": "../verso-original/site/sources.html#theta_to_Galois",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-theta_to_Galois--statement",
      "status": "Traced in source"
    },
    {
      "id": "theta_lift",
      "name": "UpperTheory.TP.K.tLiftK",
      "title": "Theta lift",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Supplies the theta lift fed into the Galois representation construction.",
      "source": "Development/AutomorphicArithmetic/Foundations/GaloisRepresentations/ThetaParseval/ThetaKernels/TLiftK.lean",
      "line": 4,
      "url": "../verso-original/site/sources.html#theta_lift",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-theta_lift--statement",
      "status": "Traced in source"
    },
    {
      "id": "third_place_inputs",
      "name": "UpperTheory.LiteratureTheorems.published_results_eigen",
      "title": "Third-place eigenvalue inputs",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Assembles the unitary-group third-place hypotheses from the literature package.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean",
      "line": 666,
      "url": "../verso-original/site/sources.html#third_place_inputs",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-third_place_inputs--statement",
      "status": "Traced in source"
    },
    {
      "id": "theta_local_inputs",
      "name": "UpperTheory.LiteratureTheorems.published_results_first",
      "title": "Local theta inputs",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Builds the local theta input record used in the matching argument.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean",
      "line": 727,
      "url": "../verso-original/site/sources.html#theta_local_inputs",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-theta_local_inputs--statement",
      "status": "Traced in source"
    },
    {
      "id": "theta_matching",
      "name": "UpperTheory.LiteratureTheorems.theta_integrals_agree_and_local_matching_of_literature",
      "title": "Theta integrals and local matching",
      "group": "Arithmetic inputs",
      "kind": "project",
      "summary": "Produces both agreement of theta integrals and local matching.",
      "source": "Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean",
      "line": 565,
      "url": "../verso-original/site/sources.html#theta_matching",
      "blueprintUrl": "../verso-original/site/index.html#--informal-preview-theta_matching--statement",
      "status": "Traced in source"
    },
    {
      "id": "math-Complex.Gamma",
      "name": "Complex.Gamma",
      "title": "Complex gamma function",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "@[irreducible, pp_nodot] def Gamma (s : ℂ) : ℂ",
      "source": "Mathlib/Analysis/SpecialFunctions/Gamma/Basic.lean",
      "line": 287,
      "url": "mathlib-sources.html#math-Complex.Gamma",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Basic.lean#L287",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.Gamma_ne_zero_of_re_pos",
      "name": "Complex.Gamma_ne_zero_of_re_pos",
      "title": "Gamma is nonzero on the right",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem Gamma_ne_zero_of_re_pos {s : ℂ} (hs : 0 < re s) : Gamma s ≠ 0",
      "source": "Mathlib/Analysis/SpecialFunctions/Gamma/Beta.lean",
      "line": 454,
      "url": "mathlib-sources.html#math-Complex.Gamma_ne_zero_of_re_pos",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Beta.lean#L454",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.Gammaℝ",
      "name": "Complex.Gammaℝ",
      "title": "Real gamma factor Γℝ",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def Gammaℝ (s : ℂ)",
      "source": "Mathlib/Analysis/SpecialFunctions/Gamma/Deligne.lean",
      "line": 43,
      "url": "mathlib-sources.html#math-Complex.Gamma%E2%84%9D",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Deligne.lean#L43",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.Gammaℝ_eq_zero_iff",
      "name": "Complex.Gammaℝ_eq_zero_iff",
      "title": "Zeros of Γℝ",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma Gammaℝ_eq_zero_iff {s : ℂ} : Gammaℝ s = 0 ↔ ∃ n : ℕ, s = -(2 * n)",
      "source": "Mathlib/Analysis/SpecialFunctions/Gamma/Deligne.lean",
      "line": 73,
      "url": "mathlib-sources.html#math-Complex.Gamma%E2%84%9D_eq_zero_iff",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Deligne.lean#L73",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.Gammaℝ_ne_zero_of_re_pos",
      "name": "Complex.Gammaℝ_ne_zero_of_re_pos",
      "title": "Γℝ is nonzero on the right",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma Gammaℝ_ne_zero_of_re_pos {s : ℂ} (hs : 0 < re s) : Gammaℝ s ≠ 0",
      "source": "Mathlib/Analysis/SpecialFunctions/Gamma/Deligne.lean",
      "line": 66,
      "url": "mathlib-sources.html#math-Complex.Gamma%E2%84%9D_ne_zero_of_re_pos",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Gamma/Deligne.lean#L66",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.cos",
      "name": "Complex.cos",
      "title": "Complex cosine",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def cos (z : ℂ) : ℂ",
      "source": "Mathlib/Analysis/Complex/Trigonometric.lean",
      "line": 35,
      "url": "mathlib-sources.html#math-Complex.cos",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/Complex/Trigonometric.lean#L35",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.cos_eq_zero_iff",
      "name": "Complex.cos_eq_zero_iff",
      "title": "Zeros of complex cosine",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem cos_eq_zero_iff {θ : ℂ} : cos θ = 0 ↔ ∃ k : ℤ, θ = (2 * k + 1) * π / 2",
      "source": "Mathlib/Analysis/SpecialFunctions/Trigonometric/Complex.lean",
      "line": 33,
      "url": "mathlib-sources.html#math-Complex.cos_eq_zero_iff",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Trigonometric/Complex.lean#L33",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.cpow_ne_zero_iff",
      "name": "Complex.cpow_ne_zero_iff",
      "title": "Nonvanishing of a complex power",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem cpow_ne_zero_iff {x y : ℂ} :\n    x ^ y ≠ 0 ↔ x ≠ 0 ∨ y = 0",
      "source": "Mathlib/Analysis/SpecialFunctions/Pow/Complex.lean",
      "line": 49,
      "url": "mathlib-sources.html#math-Complex.cpow_ne_zero_iff",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Pow/Complex.lean#L49",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Complex.norm_natCast_cpow_of_pos",
      "name": "Complex.norm_natCast_cpow_of_pos",
      "title": "Norm of an integer base to a complex power",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma norm_natCast_cpow_of_pos {n : ℕ} (hn : 0 < n) (s : ℂ) :\n    ‖(n : ℂ) ^ s‖ = (n : ℝ) ^ (s.re)",
      "source": "Mathlib/Analysis/SpecialFunctions/Pow/Real.lean",
      "line": 355,
      "url": "mathlib-sources.html#math-Complex.norm_natCast_cpow_of_pos",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Pow/Real.lean#L355",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter",
      "name": "DirichletCharacter",
      "title": "Dirichlet characters",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "abbrev DirichletCharacter (R : Type*) [CommMonoidWithZero R] (n : ℕ)",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 40,
      "url": "mathlib-sources.html#math-DirichletCharacter",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L40",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.Even",
      "name": "DirichletCharacter.Even",
      "title": "Even characters",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def Even : Prop",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 536,
      "url": "mathlib-sources.html#math-DirichletCharacter.Even",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L536",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.Even.gammaFactor_def",
      "name": "DirichletCharacter.Even.gammaFactor_def",
      "title": "Gamma factor of an even character",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma Even.gammaFactor_def {χ : DirichletCharacter ℂ N} (hχ : χ.Even) (s : ℂ) :\n    gammaFactor χ s = Gammaℝ s",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 210,
      "url": "mathlib-sources.html#math-DirichletCharacter.Even.gammaFactor_def",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L210",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.IsPrimitive",
      "name": "DirichletCharacter.IsPrimitive",
      "title": "Primitive characters",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def IsPrimitive : Prop",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 292,
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L292",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "name": "DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "title": "Dirichlet functional equation",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem completedLFunction_one_sub {χ : DirichletCharacter ℂ N} (hχ : IsPrimitive χ) (s : ℂ) :\n    completedLFunction χ (1 - s) = N ^ (s - 1 / 2) * rootNumber χ * completedLFunction χ⁻¹ s",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 284,
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L284",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.LFunction",
      "name": "DirichletCharacter.LFunction",
      "title": "Dirichlet L-function",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def LFunction (χ : DirichletCharacter ℂ N) (s : ℂ) : ℂ",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 61,
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L61",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.LFunction_changeLevel",
      "name": "DirichletCharacter.LFunction_changeLevel",
      "title": "Change of level for L-functions",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma LFunction_changeLevel {M N : ℕ} [NeZero M] [NeZero N] (hMN : M ∣ N)\n    (χ : DirichletCharacter ℂ M) {s : ℂ} (h : χ ≠ 1 ∨ s ≠ 1) :\n    LFunction (changeLevel hMN χ) s =\n      LFunction χ s * ∏ p ∈ N.primeFactors, (1 - χ p * p ^ (-s))",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 150,
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_changeLevel",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L150",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "name": "DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "title": "Recover L from its completion",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma LFunction_eq_completed_div_gammaFactor (χ : DirichletCharacter ℂ N) (s : ℂ)\n    (h : s ≠ 0 ∨ N ≠ 1) : LFunction χ s = completedLFunction χ s / gammaFactor χ s",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 259,
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L259",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.LFunction_modOne_eq",
      "name": "DirichletCharacter.LFunction_modOne_eq",
      "title": "The level-one L-function is zeta",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "@[simp] lemma LFunction_modOne_eq {χ : DirichletCharacter ℂ 1} :\n    LFunction χ = riemannZeta",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 67,
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_modOne_eq",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L67",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.Odd",
      "name": "DirichletCharacter.Odd",
      "title": "Odd characters",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def Odd : Prop",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 533,
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L533",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.Odd.gammaFactor_def",
      "name": "DirichletCharacter.Odd.gammaFactor_def",
      "title": "Gamma factor of an odd character",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma Odd.gammaFactor_def {χ : DirichletCharacter ℂ N} (hχ : χ.Odd) (s : ℂ) :\n    gammaFactor χ s = Gammaℝ (s + 1)",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 214,
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd.gammaFactor_def",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L214",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.changeLevel",
      "name": "DirichletCharacter.changeLevel",
      "title": "Change a character’s level",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def changeLevel {n m : ℕ} (hm : n ∣ m) :\n    DirichletCharacter R n →* DirichletCharacter R m",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 66,
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L66",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "name": "DirichletCharacter.changeLevel_primitiveCharacter",
      "title": "Recover a character from its primitive part",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem changeLevel_primitiveCharacter :\n    (changeLevel χ.conductor_dvd_level) χ.primitiveCharacter = χ",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 310,
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel_primitiveCharacter",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L310",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.completedLFunction",
      "name": "DirichletCharacter.completedLFunction",
      "title": "Completed Dirichlet L-function",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "@[pp_nodot] noncomputable def completedLFunction (χ : DirichletCharacter ℂ N) (s : ℂ) : ℂ",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 224,
      "url": "mathlib-sources.html#math-DirichletCharacter.completedLFunction",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L224",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.conductor",
      "name": "DirichletCharacter.conductor",
      "title": "Character conductor",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def conductor : ℕ",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 246,
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L246",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.conductor_dvd_level",
      "name": "DirichletCharacter.conductor_dvd_level",
      "title": "The conductor divides the level",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma conductor_dvd_level : conductor χ ∣ n",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 251,
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_dvd_level",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L251",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.conductor_inv",
      "name": "DirichletCharacter.conductor_inv",
      "title": "Conductor of an inverse character",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem conductor_inv (χ : DirichletCharacter R n) :\n    χ⁻¹.conductor = χ.conductor",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 405,
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_inv",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L405",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.conductor_ne_zero",
      "name": "DirichletCharacter.conductor_ne_zero",
      "title": "The conductor is nonzero",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma conductor_ne_zero [NeZero n] : conductor χ ≠ 0",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 255,
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_ne_zero",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L255",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.even_or_odd",
      "name": "DirichletCharacter.even_or_odd",
      "title": "Parity of a character",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma even_or_odd [NoZeroDivisors S] : ψ.Even ∨ ψ.Odd",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 538,
      "url": "mathlib-sources.html#math-DirichletCharacter.even_or_odd",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L538",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.gammaFactor",
      "name": "DirichletCharacter.gammaFactor",
      "title": "Archimedean gamma factor",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def gammaFactor (χ : DirichletCharacter ℂ N) (s : ℂ)",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 207,
      "url": "mathlib-sources.html#math-DirichletCharacter.gammaFactor",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L207",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.isPrimitive_def",
      "name": "DirichletCharacter.isPrimitive_def",
      "title": "Primitivity in terms of the conductor",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma isPrimitive_def : IsPrimitive χ ↔ conductor χ = n",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 294,
      "url": "mathlib-sources.html#math-DirichletCharacter.isPrimitive_def",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L294",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.norm_le_one",
      "name": "DirichletCharacter.norm_le_one",
      "title": "Character norm is at most one",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma norm_le_one (a : ZMod n) : ‖χ a‖ ≤ 1",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Bounds.lean",
      "line": 33,
      "url": "mathlib-sources.html#math-DirichletCharacter.norm_le_one",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Bounds.lean#L33",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.primitiveCharacter",
      "name": "DirichletCharacter.primitiveCharacter",
      "title": "Associated primitive character",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def primitiveCharacter : DirichletCharacter R χ.conductor",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 307,
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L307",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "name": "DirichletCharacter.primitiveCharacter_isPrimitive",
      "title": "The induced primitive character is primitive",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma primitiveCharacter_isPrimitive : IsPrimitive (χ.primitiveCharacter)",
      "source": "Mathlib/NumberTheory/DirichletCharacter/Basic.lean",
      "line": 314,
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/DirichletCharacter/Basic.lean#L314",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-DirichletCharacter.rootNumber",
      "name": "DirichletCharacter.rootNumber",
      "title": "Root number",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "noncomputable def rootNumber (χ : DirichletCharacter ℂ N) : ℂ",
      "source": "Mathlib/NumberTheory/LSeries/DirichletContinuation.lean",
      "line": 272,
      "url": "mathlib-sources.html#math-DirichletCharacter.rootNumber",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L272",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Real.pi_ne_zero",
      "name": "Real.pi_ne_zero",
      "title": "π is nonzero",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem pi_ne_zero : π ≠ 0",
      "source": "Mathlib/Analysis/SpecialFunctions/Trigonometric/Basic.lean",
      "line": 165,
      "url": "mathlib-sources.html#math-Real.pi_ne_zero",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Trigonometric/Basic.lean#L165",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-Real.rpow_lt_one_of_one_lt_of_neg",
      "name": "Real.rpow_lt_one_of_one_lt_of_neg",
      "title": "A negative real power is below one",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem rpow_lt_one_of_one_lt_of_neg {x z : ℝ} (hx : 1 < x) (hz : z < 0) : x ^ z < 1",
      "source": "Mathlib/Analysis/SpecialFunctions/Pow/Real.lean",
      "line": 664,
      "url": "mathlib-sources.html#math-Real.rpow_lt_one_of_one_lt_of_neg",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/Analysis/SpecialFunctions/Pow/Real.lean#L664",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-RiemannHypothesis",
      "name": "RiemannHypothesis",
      "title": "Riemann hypothesis statement",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def RiemannHypothesis : Prop",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 185,
      "url": "mathlib-sources.html#math-RiemannHypothesis",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L185",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-completedRiemannZeta",
      "name": "completedRiemannZeta",
      "title": "Completed Riemann zeta function",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def completedRiemannZeta (s : ℂ) : ℂ",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 68,
      "url": "mathlib-sources.html#math-completedRiemannZeta",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L68",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-completedRiemannZeta_one_sub",
      "name": "completedRiemannZeta_one_sub",
      "title": "Completed zeta functional equation",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem completedRiemannZeta_one_sub (s : ℂ) :\n    completedRiemannZeta (1 - s) = completedRiemannZeta s",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 106,
      "url": "mathlib-sources.html#math-completedRiemannZeta_one_sub",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L106",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-riemannZeta",
      "name": "riemannZeta",
      "title": "Riemann zeta function",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "def riemannZeta",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 121,
      "url": "mathlib-sources.html#math-riemannZeta",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L121",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-riemannZeta_def_of_ne_zero",
      "name": "riemannZeta_def_of_ne_zero",
      "title": "Zeta from completed zeta",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma riemannZeta_def_of_ne_zero {s : ℂ} (hs : s ≠ 0) :\n    riemannZeta s = completedRiemannZeta s / Gammaℝ s",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 154,
      "url": "mathlib-sources.html#math-riemannZeta_def_of_ne_zero",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L154",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-riemannZeta_ne_zero_of_one_le_re",
      "name": "riemannZeta_ne_zero_of_one_le_re",
      "title": "Zeta is nonzero for Re(s) ≥ 1",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "lemma _root_.riemannZeta_ne_zero_of_one_le_re ⦃s : ℂ⦄ (hs : 1 ≤ s.re) :\n    riemannZeta s ≠ 0",
      "source": "Mathlib/NumberTheory/LSeries/Nonvanishing.lean",
      "line": 411,
      "url": "mathlib-sources.html#math-riemannZeta_ne_zero_of_one_le_re",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/Nonvanishing.lean#L411",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-riemannZeta_one_sub",
      "name": "riemannZeta_one_sub",
      "title": "Zeta functional equation",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem riemannZeta_one_sub {s : ℂ} (hs : ∀ n : ℕ, s ≠ -n) (hs' : s ≠ 1) :\n    riemannZeta (1 - s) = 2 * (2 * π) ^ (-s) * Gamma s * cos (π * s / 2) * riemannZeta s",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 178,
      "url": "mathlib-sources.html#math-riemannZeta_one_sub",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L178",
      "status": "Pinned Mathlib declaration"
    },
    {
      "id": "math-riemannZeta_zero",
      "name": "riemannZeta_zero",
      "title": "Value of zeta at zero",
      "group": "Mathlib",
      "kind": "mathlib",
      "summary": "theorem riemannZeta_zero : riemannZeta 0 = -1 / 2",
      "source": "Mathlib/NumberTheory/LSeries/RiemannZeta.lean",
      "line": 151,
      "url": "mathlib-sources.html#math-riemannZeta_zero",
      "upstreamUrl": "https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L151",
      "status": "Pinned Mathlib declaration"
    }
  ],
  "edges": [
    {
      "from": "allChi",
      "to": "claimAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 16.",
      "url": "../verso-original/site/sources.html#strip_bundle-L16"
    },
    {
      "from": "allChi",
      "to": "critAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 13.",
      "url": "../verso-original/site/sources.html#primitive_wrapper-L13"
    },
    {
      "from": "allChi",
      "to": "mainNV",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at Main.lean line 8.",
      "url": "../verso-original/site/sources.html#Dirichlet_nonvanishing-L8"
    },
    {
      "from": "allChi",
      "to": "rhAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 9.",
      "url": "../verso-original/site/sources.html#RH_wrapper-L9"
    },
    {
      "from": "claimAll",
      "to": "mainStrip",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at Main.lean line 10.",
      "url": "../verso-original/site/sources.html#Dirichlet_zeros-L10"
    },
    {
      "from": "crit",
      "to": "critAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 13.",
      "url": "../verso-original/site/sources.html#primitive_wrapper-L13"
    },
    {
      "from": "critAll",
      "to": "mainPrim",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at Main.lean line 12.",
      "url": "../verso-original/site/sources.html#primitive_zeros-L12"
    },
    {
      "from": "definite",
      "to": "match",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at SiegelEisensteinSecondTermHypotheses.lean line 73.",
      "url": "../verso-original/site/sources.html#theta_to_nonvanishing-L73"
    },
    {
      "from": "every",
      "to": "allChi",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 7.",
      "url": "../verso-original/site/sources.html#half_plane_input-L7"
    },
    {
      "from": "everyDef",
      "to": "crit",
      "kind": "Statement",
      "evidence": "LeanArchitect found this declaration in the elaborated type.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "everyDef",
      "to": "rhEvery",
      "kind": "Statement",
      "evidence": "LeanArchitect found this declaration in the elaborated type.",
      "url": "../verso-original/site/sources.html#level_one_zeta"
    },
    {
      "from": "factor",
      "to": "primZero",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at ClaimStrip.lean line 33.",
      "url": "../verso-original/site/sources.html#primitive_zero-L33"
    },
    {
      "from": "gamma",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at ClaimStrip.lean line 51.",
      "url": "../verso-original/site/sources.html#reflect_zero-L51"
    },
    {
      "from": "greenEvery",
      "to": "match",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at SiegelEisensteinSecondTermHypotheses.lean line 72.",
      "url": "../verso-original/site/sources.html#theta_to_nonvanishing-L72"
    },
    {
      "from": "greenZero",
      "to": "greenEvery",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at TopPlug.lean line 18.",
      "url": "../verso-original/site/sources.html#all_levels-L18"
    },
    {
      "from": "half",
      "to": "strip",
      "kind": "Statement",
      "evidence": "LeanArchitect found this declaration in the elaborated type.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "half",
      "to": "zeta",
      "kind": "Statement",
      "evidence": "LeanArchitect found this declaration in the elaborated type.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "imprimitive",
      "to": "greenEvery",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at TopPlug.lean line 18.",
      "url": "../verso-original/site/sources.html#all_levels-L18"
    },
    {
      "from": "literature",
      "to": "ofRow",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainConclusion.lean line 8.",
      "url": "../verso-original/site/sources.html#row_to_nonvanishing-L8"
    },
    {
      "from": "local",
      "to": "ofRow",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainConclusion.lean line 8.",
      "url": "../verso-original/site/sources.html#row_to_nonvanishing-L8"
    },
    {
      "from": "match",
      "to": "literature",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at EveryCharacterOfLiteratureOfVWin.lean line 811.",
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing-L811"
    },
    {
      "from": "ofRow",
      "to": "every",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainConclusion.lean line 11.",
      "url": "../verso-original/site/sources.html#every_character-L11"
    },
    {
      "from": "primZero",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at ClaimStrip.lean line 67.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip-L67"
    },
    {
      "from": "reflect",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at ClaimStrip.lean line 68.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip-L68"
    },
    {
      "from": "rhAll",
      "to": "mainRH",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at Main.lean line 4.",
      "url": "../verso-original/site/sources.html#Riemann_hypothesis-L4"
    },
    {
      "from": "rhAll",
      "to": "mainZeta",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at Main.lean line 6.",
      "url": "../verso-original/site/sources.html#zeta_zeros-L6"
    },
    {
      "from": "rhEvery",
      "to": "rhAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 9.",
      "url": "../verso-original/site/sources.html#RH_wrapper-L9"
    },
    {
      "from": "right",
      "to": "rhEvery",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at CritLine.lean line 30.",
      "url": "../verso-original/site/sources.html#level_one_zeta-L30"
    },
    {
      "from": "row",
      "to": "every",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainConclusion.lean line 11.",
      "url": "../verso-original/site/sources.html#every_character-L11"
    },
    {
      "from": "strip",
      "to": "claimAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 16.",
      "url": "../verso-original/site/sources.html#strip_bundle-L16"
    },
    {
      "from": "strip",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at ClaimStrip.lean line 82.",
      "url": "../verso-original/site/sources.html#zeta_claim-L82"
    },
    {
      "from": "stripDef",
      "to": "strip",
      "kind": "Statement",
      "evidence": "LeanArchitect found this declaration in the elaborated type.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "topG",
      "to": "greenZero",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at TopPlug.lean line 14.",
      "url": "../verso-original/site/sources.html#primitive_zero_free-L14"
    },
    {
      "from": "vGamma",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "LeanArchitect found this declaration in the elaborated proof. The original proof names it at CritLine.lean line 21.",
      "url": "../verso-original/site/sources.html#primitive_line-L21"
    },
    {
      "from": "window",
      "to": "ofRow",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainConclusion.lean line 8.",
      "url": "../verso-original/site/sources.html#row_to_nonvanishing-L8"
    },
    {
      "from": "zeta",
      "to": "claimAll",
      "kind": "Source reference",
      "evidence": "The LeanArchitect source note cites this prerequisite. The original proof names it at MainTheorems.lean line 16.",
      "url": "../verso-original/site/sources.html#strip_bundle-L16"
    },
    {
      "from": "zetaDef",
      "to": "zeta",
      "kind": "Statement",
      "evidence": "LeanArchitect found this declaration in the elaborated type.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "theta_lift",
      "to": "row",
      "kind": "Source reference",
      "evidence": "The original proof names it at RowSrc.lean line 6.",
      "url": "../verso-original/site/sources.html#Galois_row-L6"
    },
    {
      "from": "theta_to_Galois",
      "to": "row",
      "kind": "Source reference",
      "evidence": "The original proof names it at RowSrc.lean line 6.",
      "url": "../verso-original/site/sources.html#Galois_row-L6"
    },
    {
      "from": "third_place_inputs",
      "to": "literature",
      "kind": "Source reference",
      "evidence": "The original proof names it at EveryCharacterOfLiteratureOfVWin.lean line 811.",
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing-L811"
    },
    {
      "from": "theta_local_inputs",
      "to": "literature",
      "kind": "Source reference",
      "evidence": "The original proof names it at EveryCharacterOfLiteratureOfVWin.lean line 811.",
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing-L811"
    },
    {
      "from": "theta_matching",
      "to": "literature",
      "kind": "Source reference",
      "evidence": "The original proof names it at EveryCharacterOfLiteratureOfVWin.lean line 811.",
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing-L811"
    },
    {
      "from": "covolume_bound",
      "to": "literature",
      "kind": "Source reference",
      "evidence": "The original proof names it at EveryCharacterOfLiteratureOfVWin.lean line 812.",
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing-L812"
    },
    {
      "from": "reciprocity_from_literature",
      "to": "literature",
      "kind": "Source reference",
      "evidence": "The original proof names it at EveryCharacterOfLiteratureOfVWin.lean line 813.",
      "url": "../verso-original/site/sources.html#literature_to_nonvanishing-L813"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "half",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of Claim.HalfPlane directly contains the constant DirichletCharacter.",
      "url": "../leanarchitect-original/index.html#half"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "half",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of Claim.HalfPlane directly contains the constant DirichletCharacter.LFunction.",
      "url": "../leanarchitect-original/index.html#half"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "stripDef",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of Claim.Strip directly contains the constant DirichletCharacter.",
      "url": "../leanarchitect-original/index.html#stripDef"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "stripDef",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of Claim.Strip directly contains the constant DirichletCharacter.LFunction.",
      "url": "../leanarchitect-original/index.html#stripDef"
    },
    {
      "from": "math-riemannZeta",
      "to": "zetaDef",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of Claim.Zeta directly contains the constant riemannZeta.",
      "url": "../leanarchitect-original/index.html#zetaDef"
    },
    {
      "from": "math-Complex.norm_natCast_cpow_of_pos",
      "to": "factor",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.factor_ne_zero directly contains the constant Complex.norm_natCast_cpow_of_pos.",
      "url": "../verso-original/site/sources.html#Euler_factor"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "factor",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.factor_ne_zero directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#Euler_factor"
    },
    {
      "from": "math-DirichletCharacter.norm_le_one",
      "to": "factor",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.factor_ne_zero directly contains the constant DirichletCharacter.norm_le_one.",
      "url": "../verso-original/site/sources.html#Euler_factor"
    },
    {
      "from": "math-Real.rpow_lt_one_of_one_lt_of_neg",
      "to": "factor",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.factor_ne_zero directly contains the constant Real.rpow_lt_one_of_one_lt_of_neg.",
      "url": "../verso-original/site/sources.html#Euler_factor"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant Complex.Gammaℝ.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-Complex.Gammaℝ_ne_zero_of_re_pos",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant Complex.Gammaℝ_ne_zero_of_re_pos.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "gamma",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter.Even",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.Even.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter.Even.gammaFactor_def",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.Even.gammaFactor_def.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter.Odd",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.Odd.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter.Odd.gammaFactor_def",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.Odd.gammaFactor_def.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter.even_or_odd",
      "to": "gamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.even_or_odd.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "gamma",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.gamma_ne_zero directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "../verso-original/site/sources.html#strip_gamma"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "reflect",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive",
      "to": "reflect",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.IsPrimitive.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.IsPrimitive.completedLFunction_one_sub.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "reflect",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.LFunction.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.LFunction_eq_completed_div_gammaFactor.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.completedLFunction",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.completedLFunction.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.conductor.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.conductor_inv",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.conductor_inv.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.isPrimitive_def",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.isPrimitive_def.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter.rootNumber",
      "to": "reflect",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_reflect directly contains the constant DirichletCharacter.rootNumber.",
      "url": "../verso-original/site/sources.html#reflect_zero"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "primZero",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_zero directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "primZero",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_zero directly contains the constant DirichletCharacter.LFunction.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.LFunction_changeLevel",
      "to": "primZero",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_zero directly contains the constant DirichletCharacter.LFunction_changeLevel.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.changeLevel",
      "to": "primZero",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_zero directly contains the constant DirichletCharacter.changeLevel.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "to": "primZero",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_zero directly contains the constant DirichletCharacter.changeLevel_primitiveCharacter.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "primZero",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_zero directly contains the constant DirichletCharacter.conductor.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.conductor_dvd_level",
      "to": "primZero",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.prim_zero directly contains the constant DirichletCharacter.conductor_dvd_level.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter.primitiveCharacter",
      "to": "primZero",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Claim.prim_zero directly contains the constant DirichletCharacter.primitiveCharacter.",
      "url": "../verso-original/site/sources.html#primitive_zero"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.strip directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.strip directly contains the constant DirichletCharacter.LFunction.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.strip directly contains the constant DirichletCharacter.conductor.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "math-DirichletCharacter.conductor_ne_zero",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.strip directly contains the constant DirichletCharacter.conductor_ne_zero.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "math-DirichletCharacter.primitiveCharacter",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.strip directly contains the constant DirichletCharacter.primitiveCharacter.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "to": "strip",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.strip directly contains the constant DirichletCharacter.primitiveCharacter_isPrimitive.",
      "url": "../verso-original/site/sources.html#Dirichlet_strip"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant Complex.Gammaℝ.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-Complex.Gammaℝ_eq_zero_iff",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant Complex.Gammaℝ_eq_zero_iff.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant DirichletCharacter.LFunction.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-DirichletCharacter.LFunction_modOne_eq",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant DirichletCharacter.LFunction_modOne_eq.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-completedRiemannZeta",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant completedRiemannZeta.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-completedRiemannZeta_one_sub",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant completedRiemannZeta_one_sub.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-riemannZeta",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant riemannZeta.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-riemannZeta_def_of_ne_zero",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant riemannZeta_def_of_ne_zero.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-riemannZeta_ne_zero_of_one_le_re",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant riemannZeta_ne_zero_of_one_le_re.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-riemannZeta_zero",
      "to": "zeta",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Claim.zeta directly contains the constant riemannZeta_zero.",
      "url": "../verso-original/site/sources.html#zeta_claim"
    },
    {
      "from": "math-Complex.Gamma",
      "to": "math-Complex.Gamma_ne_zero_of_re_pos",
      "kind": "Statement",
      "evidence": "The elaborated statement of Complex.Gamma_ne_zero_of_re_pos directly contains the constant Complex.Gamma.",
      "url": "mathlib-sources.html#math-Complex.Gamma_ne_zero_of_re_pos"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "math-Complex.Gammaℝ_eq_zero_iff",
      "kind": "Statement",
      "evidence": "The elaborated statement of Complex.Gammaℝ_eq_zero_iff directly contains the constant Complex.Gammaℝ.",
      "url": "mathlib-sources.html#math-Complex.Gamma%E2%84%9D_eq_zero_iff"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "math-Complex.Gammaℝ_ne_zero_of_re_pos",
      "kind": "Statement",
      "evidence": "The elaborated statement of Complex.Gammaℝ_ne_zero_of_re_pos directly contains the constant Complex.Gammaℝ.",
      "url": "mathlib-sources.html#math-Complex.Gamma%E2%84%9D_ne_zero_of_re_pos"
    },
    {
      "from": "math-Complex.cos",
      "to": "math-Complex.cos_eq_zero_iff",
      "kind": "Statement",
      "evidence": "The elaborated statement of Complex.cos_eq_zero_iff directly contains the constant Complex.cos.",
      "url": "mathlib-sources.html#math-Complex.cos_eq_zero_iff"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.Even",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Even directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Even"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "math-DirichletCharacter.Even.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Even.gammaFactor_def directly contains the constant Complex.Gammaℝ.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Even.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.Even.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Even.gammaFactor_def directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Even.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter.Even",
      "to": "math-DirichletCharacter.Even.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Even.gammaFactor_def directly contains the constant DirichletCharacter.Even.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Even.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "math-DirichletCharacter.Even.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Even.gammaFactor_def directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Even.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.IsPrimitive",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.IsPrimitive directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.IsPrimitive.completedLFunction_one_sub directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive",
      "to": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.IsPrimitive.completedLFunction_one_sub directly contains the constant DirichletCharacter.IsPrimitive.",
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub"
    },
    {
      "from": "math-DirichletCharacter.completedLFunction",
      "to": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.IsPrimitive.completedLFunction_one_sub directly contains the constant DirichletCharacter.completedLFunction.",
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub"
    },
    {
      "from": "math-DirichletCharacter.rootNumber",
      "to": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.IsPrimitive.completedLFunction_one_sub directly contains the constant DirichletCharacter.rootNumber.",
      "url": "mathlib-sources.html#math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.LFunction",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.LFunction_changeLevel",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_changeLevel directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_changeLevel"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "math-DirichletCharacter.LFunction_changeLevel",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_changeLevel directly contains the constant DirichletCharacter.LFunction.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_changeLevel"
    },
    {
      "from": "math-DirichletCharacter.changeLevel",
      "to": "math-DirichletCharacter.LFunction_changeLevel",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_changeLevel directly contains the constant DirichletCharacter.changeLevel.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_changeLevel"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_eq_completed_div_gammaFactor directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_eq_completed_div_gammaFactor directly contains the constant DirichletCharacter.LFunction.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor"
    },
    {
      "from": "math-DirichletCharacter.completedLFunction",
      "to": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_eq_completed_div_gammaFactor directly contains the constant DirichletCharacter.completedLFunction.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_eq_completed_div_gammaFactor directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.LFunction_modOne_eq",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_modOne_eq directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_modOne_eq"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "math-DirichletCharacter.LFunction_modOne_eq",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_modOne_eq directly contains the constant DirichletCharacter.LFunction.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_modOne_eq"
    },
    {
      "from": "math-riemannZeta",
      "to": "math-DirichletCharacter.LFunction_modOne_eq",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.LFunction_modOne_eq directly contains the constant riemannZeta.",
      "url": "mathlib-sources.html#math-DirichletCharacter.LFunction_modOne_eq"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.Odd",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Odd directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "math-DirichletCharacter.Odd.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Odd.gammaFactor_def directly contains the constant Complex.Gammaℝ.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.Odd.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Odd.gammaFactor_def directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter.Odd",
      "to": "math-DirichletCharacter.Odd.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Odd.gammaFactor_def directly contains the constant DirichletCharacter.Odd.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "math-DirichletCharacter.Odd.gammaFactor_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.Odd.gammaFactor_def directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.Odd.gammaFactor_def"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.changeLevel",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.changeLevel directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.changeLevel_primitiveCharacter directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel_primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter.changeLevel",
      "to": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.changeLevel_primitiveCharacter directly contains the constant DirichletCharacter.changeLevel.",
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel_primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.changeLevel_primitiveCharacter directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel_primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter.conductor_dvd_level",
      "to": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.changeLevel_primitiveCharacter directly contains the constant DirichletCharacter.conductor_dvd_level.",
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel_primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter.primitiveCharacter",
      "to": "math-DirichletCharacter.changeLevel_primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.changeLevel_primitiveCharacter directly contains the constant DirichletCharacter.primitiveCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.changeLevel_primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.completedLFunction",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.completedLFunction directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.completedLFunction"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.conductor",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.conductor_dvd_level",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor_dvd_level directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_dvd_level"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.conductor_dvd_level",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor_dvd_level directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_dvd_level"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.conductor_inv",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor_inv directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_inv"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.conductor_inv",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor_inv directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_inv"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.conductor_ne_zero",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor_ne_zero directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_ne_zero"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.conductor_ne_zero",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.conductor_ne_zero directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.conductor_ne_zero"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.even_or_odd",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.even_or_odd directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.even_or_odd"
    },
    {
      "from": "math-DirichletCharacter.Even",
      "to": "math-DirichletCharacter.even_or_odd",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.even_or_odd directly contains the constant DirichletCharacter.Even.",
      "url": "mathlib-sources.html#math-DirichletCharacter.even_or_odd"
    },
    {
      "from": "math-DirichletCharacter.Odd",
      "to": "math-DirichletCharacter.even_or_odd",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.even_or_odd directly contains the constant DirichletCharacter.Odd.",
      "url": "mathlib-sources.html#math-DirichletCharacter.even_or_odd"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.gammaFactor",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.gammaFactor directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.gammaFactor"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.isPrimitive_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.isPrimitive_def directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.isPrimitive_def"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive",
      "to": "math-DirichletCharacter.isPrimitive_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.isPrimitive_def directly contains the constant DirichletCharacter.IsPrimitive.",
      "url": "mathlib-sources.html#math-DirichletCharacter.isPrimitive_def"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.isPrimitive_def",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.isPrimitive_def directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.isPrimitive_def"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.norm_le_one",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.norm_le_one directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.norm_le_one"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.primitiveCharacter directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.primitiveCharacter",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.primitiveCharacter directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.primitiveCharacter_isPrimitive directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter_isPrimitive"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive",
      "to": "math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.primitiveCharacter_isPrimitive directly contains the constant DirichletCharacter.IsPrimitive.",
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter_isPrimitive"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.primitiveCharacter_isPrimitive directly contains the constant DirichletCharacter.conductor.",
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter_isPrimitive"
    },
    {
      "from": "math-DirichletCharacter.primitiveCharacter",
      "to": "math-DirichletCharacter.primitiveCharacter_isPrimitive",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.primitiveCharacter_isPrimitive directly contains the constant DirichletCharacter.primitiveCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.primitiveCharacter_isPrimitive"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "math-DirichletCharacter.rootNumber",
      "kind": "Statement",
      "evidence": "The elaborated statement of DirichletCharacter.rootNumber directly contains the constant DirichletCharacter.",
      "url": "mathlib-sources.html#math-DirichletCharacter.rootNumber"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "crit",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive",
      "to": "crit",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.IsPrimitive.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.IsPrimitive.completedLFunction_one_sub",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.IsPrimitive.completedLFunction_one_sub.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "crit",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.LFunction.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.LFunction_eq_completed_div_gammaFactor",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.LFunction_eq_completed_div_gammaFactor.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.completedLFunction",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.completedLFunction.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.conductor",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.conductor.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.conductor_inv",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.conductor_inv.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.isPrimitive_def",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.isPrimitive_def.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-DirichletCharacter.rootNumber",
      "to": "crit",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.critLine directly contains the constant DirichletCharacter.rootNumber.",
      "url": "../verso-original/site/sources.html#primitive_line"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant Complex.Gammaℝ.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-Complex.Gammaℝ_ne_zero_of_re_pos",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant Complex.Gammaℝ_ne_zero_of_re_pos.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "vGamma",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter.Even",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.Even.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter.Even.gammaFactor_def",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.Even.gammaFactor_def.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter.Odd",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.Odd.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter.Odd.gammaFactor_def",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.Odd.gammaFactor_def.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter.even_or_odd",
      "to": "vGamma",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.even_or_odd.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter.gammaFactor",
      "to": "vGamma",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.gammaFactor_ne_zero directly contains the constant DirichletCharacter.gammaFactor.",
      "url": "../verso-original/site/sources.html#primitive_gamma"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "rhEvery",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_every directly contains the constant DirichletCharacter.",
      "url": "../verso-original/site/sources.html#level_one_zeta"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "rhEvery",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_every directly contains the constant DirichletCharacter.LFunction.",
      "url": "../verso-original/site/sources.html#level_one_zeta"
    },
    {
      "from": "math-DirichletCharacter.LFunction_modOne_eq",
      "to": "rhEvery",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_every directly contains the constant DirichletCharacter.LFunction_modOne_eq.",
      "url": "../verso-original/site/sources.html#level_one_zeta"
    },
    {
      "from": "math-riemannZeta",
      "to": "rhEvery",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_every directly contains the constant riemannZeta.",
      "url": "../verso-original/site/sources.html#level_one_zeta"
    },
    {
      "from": "math-RiemannHypothesis",
      "to": "rhEvery",
      "kind": "Statement",
      "evidence": "The elaborated statement of Formalism.VW.rh_of_every directly contains the constant RiemannHypothesis.",
      "url": "../verso-original/site/sources.html#level_one_zeta"
    },
    {
      "from": "math-Complex.Gamma",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant Complex.Gamma.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-Complex.Gamma_ne_zero_of_re_pos",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant Complex.Gamma_ne_zero_of_re_pos.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-Complex.cos",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant Complex.cos.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-Complex.cos_eq_zero_iff",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant Complex.cos_eq_zero_iff.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-Complex.cpow_ne_zero_iff",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant Complex.cpow_ne_zero_iff.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-Real.pi_ne_zero",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant Real.pi_ne_zero.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-RiemannHypothesis",
      "to": "right",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.rh_of_right directly contains the constant RiemannHypothesis.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-riemannZeta",
      "to": "right",
      "kind": "Statement and proof term",
      "evidence": "The elaborated statement and proof term of Formalism.VW.rh_of_right directly contains the constant riemannZeta.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-riemannZeta_one_sub",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant riemannZeta_one_sub.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-riemannZeta_zero",
      "to": "right",
      "kind": "Proof term",
      "evidence": "The elaborated proof term of Formalism.VW.rh_of_right directly contains the constant riemannZeta_zero.",
      "url": "../verso-original/site/sources.html#zeta_reflection"
    },
    {
      "from": "math-DirichletCharacter",
      "to": "everyDef",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of UpperTheory.EveryCharacter directly contains the constant DirichletCharacter.",
      "url": "../leanarchitect-original/index.html#everyDef"
    },
    {
      "from": "math-DirichletCharacter.LFunction",
      "to": "everyDef",
      "kind": "Definition body",
      "evidence": "The elaborated definition body of UpperTheory.EveryCharacter directly contains the constant DirichletCharacter.LFunction.",
      "url": "../leanarchitect-original/index.html#everyDef"
    },
    {
      "from": "math-completedRiemannZeta",
      "to": "math-completedRiemannZeta_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of completedRiemannZeta_one_sub directly contains the constant completedRiemannZeta.",
      "url": "mathlib-sources.html#math-completedRiemannZeta_one_sub"
    },
    {
      "from": "math-Complex.Gammaℝ",
      "to": "math-riemannZeta_def_of_ne_zero",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_def_of_ne_zero directly contains the constant Complex.Gammaℝ.",
      "url": "mathlib-sources.html#math-riemannZeta_def_of_ne_zero"
    },
    {
      "from": "math-completedRiemannZeta",
      "to": "math-riemannZeta_def_of_ne_zero",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_def_of_ne_zero directly contains the constant completedRiemannZeta.",
      "url": "mathlib-sources.html#math-riemannZeta_def_of_ne_zero"
    },
    {
      "from": "math-riemannZeta",
      "to": "math-riemannZeta_def_of_ne_zero",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_def_of_ne_zero directly contains the constant riemannZeta.",
      "url": "mathlib-sources.html#math-riemannZeta_def_of_ne_zero"
    },
    {
      "from": "math-riemannZeta",
      "to": "math-riemannZeta_ne_zero_of_one_le_re",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_ne_zero_of_one_le_re directly contains the constant riemannZeta.",
      "url": "mathlib-sources.html#math-riemannZeta_ne_zero_of_one_le_re"
    },
    {
      "from": "math-Complex.Gamma",
      "to": "math-riemannZeta_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_one_sub directly contains the constant Complex.Gamma.",
      "url": "mathlib-sources.html#math-riemannZeta_one_sub"
    },
    {
      "from": "math-Complex.cos",
      "to": "math-riemannZeta_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_one_sub directly contains the constant Complex.cos.",
      "url": "mathlib-sources.html#math-riemannZeta_one_sub"
    },
    {
      "from": "math-riemannZeta",
      "to": "math-riemannZeta_one_sub",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_one_sub directly contains the constant riemannZeta.",
      "url": "mathlib-sources.html#math-riemannZeta_one_sub"
    },
    {
      "from": "math-riemannZeta",
      "to": "math-riemannZeta_zero",
      "kind": "Statement",
      "evidence": "The elaborated statement of riemannZeta_zero directly contains the constant riemannZeta.",
      "url": "mathlib-sources.html#math-riemannZeta_zero"
    },
    {
      "from": "math-RiemannHypothesis",
      "to": "mainRH",
      "kind": "Source statement",
      "evidence": "The original public declaration states Mathlib’s RiemannHypothesis verbatim.",
      "url": "../verso-original/site/sources.html#Riemann_hypothesis"
    }
  ]
};
