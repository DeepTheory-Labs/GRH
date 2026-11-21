import Mathlib
import Architect

/-! Selected original declarations checked in a separate Lake package on the archive pin. -/
open Complex DirichletCharacter

-- Development/AutomorphicArithmetic/CharacterBoxes/EveryCharacter.lean, line 13
@[blueprint "everyDef" (title := "Dirichlet nonvanishing premise")
  (statement := /-- Every Dirichlet L-function is nonzero to the right of one half, excluding the principal-character point at one. -/)]
def UpperTheory.EveryCharacter : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ), 1 / 2 < s.re → (χ ≠ 1 ∨ s ≠ 1) → DirichletCharacter.LFunction χ s ≠ 0

-- Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean, line 3
@[blueprint "half" (title := "Right half-plane predicate")
  (statement := /-- Nonvanishing in the open right half-plane for every positive level, subject to the exception at one. -/)]
def Claim.HalfPlane : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ), 1 / 2 < s.re → (χ ≠ 1 ∨ s ≠ 1) → DirichletCharacter.LFunction χ s ≠ 0

-- Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean, line 6
@[blueprint "stripDef" (title := "Strip predicate")
  (statement := /-- A Dirichlet L-function zero in the open critical strip has real part one half. -/)]
def Claim.Strip : Prop :=
  ∀ (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (s : ℂ), 0 < s.re → s.re < 1 → DirichletCharacter.LFunction χ s = 0 → s.re = 1 / 2

-- Development/AutomorphicArithmetic/CharacterBoxes/HalfPlane.lean, line 9
@[blueprint "zetaDef" (title := "Zeta-zero predicate")
  (statement := /-- Every nontrivial zeta zero distinct from one lies on the critical line. -/)]
def Claim.Zeta : Prop :=
  ∀ s : ℂ, riemannZeta s = 0 → (¬ ∃ n : ℕ, s = -2 * (n + 1)) → s ≠ 1 → s.re = 1 / 2

-- Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean, line 7
namespace Claim
@[blueprint "factor" (title := "Euler factor is nonzero")
  (statement := /-- At positive real part the prime-power term has norm less than one, so a deleted Euler factor cannot vanish. -/)]
theorem factor_ne_zero {M : ℕ} (ψ : DirichletCharacter ℂ M) {s : ℂ} (hs : 0 < s.re) (p : ℕ)
    (hp : p.Prime) : (1 : ℂ) - ψ p * (p : ℂ) ^ (-s) ≠ 0 := by
  intro h
  have h1 : ψ p * (p : ℂ) ^ (-s) = 1 := by linear_combination -h
  have hp1 : (1 : ℝ) < p := by exact_mod_cast hp.one_lt
  have hpow : ‖(p : ℂ) ^ (-s)‖ < 1 := by
    rw [Complex.norm_natCast_cpow_of_pos hp.pos, Complex.neg_re]
    exact Real.rpow_lt_one_of_one_lt_of_neg hp1 (by linarith)
  have hn : ‖ψ p * (p : ℂ) ^ (-s)‖ < 1 := by
    rw [norm_mul]
    calc ‖ψ p‖ * ‖(p : ℂ) ^ (-s)‖ ≤ 1 * ‖(p : ℂ) ^ (-s)‖ := by
          gcongr; exact ψ.norm_le_one _
      _ < 1 := by rw [one_mul]; exact hpow
  rw [h1, norm_one] at hn
  exact lt_irrefl _ hn
end Claim

-- Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean, line 23
namespace Claim
@[blueprint "primZero" (title := "Pass a zero to the primitive character")
  (statement := /-- Change level to the conductor and rule out zeros of the deleted Euler factors. -/)]
theorem prim_zero {N : ℕ} [NeZero N] (χ : DirichletCharacter ℂ N) [NeZero χ.conductor] {s : ℂ}
    (hs0 : 0 < s.re) (hs1 : s.re < 1) (h : DirichletCharacter.LFunction χ s = 0) :
    DirichletCharacter.LFunction χ.primitiveCharacter s = 0 := by
  have hs : s ≠ 1 := fun e => by rw [e, Complex.one_re] at hs1; exact lt_irrefl _ hs1
  have key := DirichletCharacter.LFunction_changeLevel χ.conductor_dvd_level
    χ.primitiveCharacter (Or.inr hs)
  rw [χ.changeLevel_primitiveCharacter, h] at key
  rcases mul_eq_zero.mp key.symm with h' | h'
  · exact h'
  · obtain ⟨p, hp, hp0⟩ := Finset.prod_eq_zero_iff.mp h'
    exact absurd hp0 (factor_ne_zero _ hs0 p (Nat.prime_of_mem_primeFactors hp))
end Claim

-- Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean, line 35
namespace Claim
@[blueprint "gamma" (title := "Gamma factor is nonzero")
  (statement := /-- Both possible archimedean factors are nonzero at positive real part. -/)]
theorem gamma_ne_zero {M : ℕ} [NeZero M] (φ : DirichletCharacter ℂ M) {t : ℂ} (ht : 0 < t.re) :
    DirichletCharacter.gammaFactor φ t ≠ 0 := by
  rcases φ.even_or_odd with hφ | hφ
  · rw [hφ.gammaFactor_def]; exact Complex.Gammaℝ_ne_zero_of_re_pos ht
  · rw [hφ.gammaFactor_def]
    exact Complex.Gammaℝ_ne_zero_of_re_pos (by rw [Complex.add_re, Complex.one_re]; linarith)
end Claim

-- Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean, line 42
namespace Claim
@[blueprint "reflect" (title := "Reflect a primitive zero")
  (statement := /-- The completed functional equation transfers a primitive zero to the inverse character at one minus the original argument. -/)]
theorem prim_reflect {M : ℕ} [NeZero M] (ψ : DirichletCharacter ℂ M) (hψ : ψ.IsPrimitive) {s : ℂ}
    (hs0 : 0 < s.re) (hs1 : s.re < 1) (h : DirichletCharacter.LFunction ψ s = 0) :
    DirichletCharacter.LFunction ψ⁻¹ (1 - s) = 0 := by
  have hs0' : s ≠ 0 := fun e => by rw [e, Complex.zero_re] at hs0; exact lt_irrefl _ hs0
  have ht0 : 0 < (1 - s).re := by rw [Complex.sub_re, Complex.one_re]; linarith
  have ht0' : 1 - s ≠ 0 := fun e => by rw [e, Complex.zero_re] at ht0; exact lt_irrefl _ ht0
  have hc : DirichletCharacter.completedLFunction ψ s = 0 := by
    rw [DirichletCharacter.LFunction_eq_completed_div_gammaFactor ψ s (Or.inl hs0'),
      div_eq_zero_iff] at h
    exact h.resolve_right (gamma_ne_zero ψ hs0)
  have hψ' : (ψ⁻¹).IsPrimitive := by
    rw [DirichletCharacter.isPrimitive_def, DirichletCharacter.conductor_inv]; exact hψ
  have fe := hψ'.completedLFunction_one_sub s
  rw [inv_inv, hc, mul_zero] at fe
  rw [DirichletCharacter.LFunction_eq_completed_div_gammaFactor ψ⁻¹ (1 - s) (Or.inl ht0'), fe,
    zero_div]
end Claim

-- Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean, line 59
namespace Claim
@[blueprint "strip" (title := "All Dirichlet zeros in the strip")
  (statement := /-- Use half-plane nonvanishing on the right. On the left, pass to the primitive character and reflect its zero to the right. -/)]
theorem strip (h : HalfPlane) : Strip := by
  unfold HalfPlane at h
  intro N _ χ s hs0 hs1 hz
  have hs : s ≠ 1 := fun e => by rw [e, Complex.one_re] at hs1; exact lt_irrefl _ hs1
  have hs0' : s ≠ 0 := fun e => by rw [e, Complex.zero_re] at hs0; exact lt_irrefl _ hs0
  rcases lt_trichotomy s.re (1 / 2) with hlt | heq | hgt
  · exfalso
    haveI : NeZero χ.conductor := ⟨χ.conductor_ne_zero⟩
    have hp := prim_zero χ hs0 hs1 hz
    have hr := prim_reflect χ.primitiveCharacter χ.primitiveCharacter_isPrimitive hs0 hs1 hp
    have ht : (1 : ℂ) - s ≠ 1 := fun e => hs0' (sub_eq_self.mp e)
    exact h χ.conductor χ.primitiveCharacter⁻¹ (1 - s)
      (by rw [Complex.sub_re, Complex.one_re]; linarith) (Or.inr ht) hr
  · exact heq
  · exact absurd hz (h N χ s hgt (Or.inr hs))
end Claim

-- Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean, line 75
namespace Claim
@[blueprint "zeta" (title := "Zeta consequence of nonvanishing")
  (statement := /-- Use the level-one character in the strip and the zeta functional equation and nonvanishing outside it. -/)]
theorem zeta (h : HalfPlane) : Zeta := by
  intro s hz htriv hs1
  have hs0 : s ≠ 0 := fun e => by rw [e, riemannZeta_zero] at hz; norm_num at hz
  rcases lt_or_ge 0 s.re with hpos | hnpos
  · rcases lt_or_ge s.re 1 with hlt1 | hge1
    · have hL : DirichletCharacter.LFunction (1 : DirichletCharacter ℂ 1) s = 0 := by
        rw [DirichletCharacter.LFunction_modOne_eq]; exact hz
      exact strip h 1 1 s hpos hlt1 hL
    · exact absurd hz (riemannZeta_ne_zero_of_one_le_re hge1)
  · exfalso
    have hG : Gammaℝ s ≠ 0 := by
      intro hg
      obtain ⟨n, hn⟩ := Complex.Gammaℝ_eq_zero_iff.mp hg
      rcases n with _ | n
      · exact hs0 (by simpa using hn)
      · exact htriv ⟨n, by rw [hn]; push_cast; ring⟩
    have hc : completedRiemannZeta s = 0 := by
      rw [riemannZeta_def_of_ne_zero hs0, div_eq_zero_iff] at hz
      exact hz.resolve_right hG
    have h1s : 1 - s ≠ 0 := fun e => by
      have := congrArg Complex.re e
      rw [Complex.sub_re, Complex.one_re, Complex.zero_re] at this
      linarith
    have hz' : riemannZeta (1 - s) = 0 := by
      rw [riemannZeta_def_of_ne_zero h1s, completedRiemannZeta_one_sub, hc, zero_div]
    exact riemannZeta_ne_zero_of_one_le_re (by rw [Complex.sub_re, Complex.one_re]; linarith) hz'
end Claim

-- Formalism/GammaFactorNonvanishing/RhOfRight.lean, line 5
@[blueprint "right" (title := "Reflect a hypothetical zeta zero")
  (statement := /-- Right-half-plane nonvanishing implies RH by the zeta functional equation, with the exceptional gamma and trigonometric factors handled explicitly. -/)]
theorem Formalism.VW.rh_of_right (hz : ∀ s : ℂ, 1 / 2 < s.re → s ≠ 1 → riemannZeta s ≠ 0) : RiemannHypothesis := by
  unfold RiemannHypothesis
  intro s hs htriv hs1
  rcases lt_trichotomy s.re (1 / 2) with hlt | heq | hgt
  · exfalso
    have hpi : (Real.pi : ℂ) ≠ 0 := by exact_mod_cast Real.pi_ne_zero
    have hs0 : s ≠ 0 := by
      rintro rfl
      rw [riemannZeta_zero] at hs
      norm_num at hs
    have ht : 1 / 2 < (1 - s).re := by
      rw [Complex.sub_re, Complex.one_re]
      linarith
    have h1 : (1 - s) ≠ 1 := by
      intro h
      apply hs0
      linear_combination -h
    have hnat : ∀ n : ℕ, (1 - s) ≠ -(n : ℂ) := by
      intro n h
      have hr := congrArg Complex.re h
      rw [Complex.sub_re, Complex.one_re, Complex.neg_re, Complex.natCast_re] at hr
      have : (0 : ℝ) ≤ n := n.cast_nonneg
      linarith
    have key := riemannZeta_one_sub hnat h1
    rw [sub_sub_cancel, hs] at key
    have hz' := hz (1 - s) ht h1
    have h2pi : (2 : ℂ) * (2 * (Real.pi : ℂ)) ^ (-(1 - s)) ≠ 0 :=
      mul_ne_zero two_ne_zero (Complex.cpow_ne_zero_iff.2 (Or.inl (mul_ne_zero two_ne_zero hpi)))
    have hG : Complex.Gamma (1 - s) ≠ 0 := Complex.Gamma_ne_zero_of_re_pos (by linarith)
    have hcos : Complex.cos ((Real.pi : ℂ) * (1 - s) / 2) ≠ 0 := by
      rw [Ne, Complex.cos_eq_zero_iff]
      rintro ⟨k, hk⟩
      have h3 : ((1 - s) - (2 * (k : ℂ) + 1)) * (Real.pi : ℂ) = 0 := by
        linear_combination 2 * hk
      rcases mul_eq_zero.1 h3 with h | h
      · have hsk : s = -2 * (k : ℂ) := by linear_combination -h
        have hre : s.re = -2 * (k : ℝ) := by
          rw [hsk, Complex.mul_re]
          simp
        rcases lt_trichotomy k 0 with hk0 | hk0 | hk0
        · have : (k : ℝ) ≤ -1 := by exact_mod_cast (show k ≤ -1 by omega)
          linarith
        · apply hs0
          rw [hsk, hk0]
          simp
        · apply htriv
          refine ⟨(k - 1).toNat, ?_⟩
          have hnk : ((k - 1).toNat : ℤ) = k - 1 := Int.toNat_of_nonneg (by omega)
          have h' : (((k - 1).toNat : ℕ) : ℂ) = (k : ℂ) - 1 := by
            have := congrArg (fun m : ℤ => (m : ℂ)) hnk
            push_cast at this
            exact this
          rw [hsk, h']
          ring
      · exact hpi h
    exact (mul_ne_zero (mul_ne_zero (mul_ne_zero h2pi hG) hcos) hz') key.symm
  · exact heq
  · exact absurd hs (hz s hgt hs1)

-- Formalism/GammaFactorNonvanishing/CritLine.lean, line 6
@[blueprint "vGamma" (title := "Archimedean factor for the primitive proof")
  (statement := /-- Compute the gamma factor according to character parity on the positive half-plane. -/)]
theorem Formalism.VW.gammaFactor_ne_zero {N : ℕ} (χ : DirichletCharacter ℂ N) {s : ℂ} (hs : 0 < s.re) : gammaFactor χ s ≠ 0 := by
  rcases χ.even_or_odd with h | h
  · rw [h.gammaFactor_def]; exact Gammaℝ_ne_zero_of_re_pos hs
  · rw [h.gammaFactor_def]; exact Gammaℝ_ne_zero_of_re_pos (by rw [add_re, one_re]; linarith)

-- Formalism/GammaFactorNonvanishing/CritLine.lean, line 11
@[blueprint "crit" (title := "Primitive zeros on the critical line")
  (statement := /-- Half-plane nonvanishing and the primitive functional equation force a zero in the strip onto the critical line. -/)]
theorem Formalism.VW.critLine (h : UpperTheory.EveryCharacter) (N : ℕ) [NeZero N] (χ : DirichletCharacter ℂ N) (hχ : χ.IsPrimitive) (s : ℂ)
    (h0 : 0 < s.re) (h1 : s.re < 1) (hz : LFunction χ s = 0) : s.re = 1 / 2 := by
  have hs0 : s ≠ 0 := fun e => by simp [e] at h0
  have hs1 : s ≠ 1 := fun e => by simp [e] at h1
  by_contra hne
  rcases lt_or_gt_of_ne hne with hlt | hgt
  · have hinv : χ⁻¹.IsPrimitive := by
      rw [isPrimitive_def, conductor_inv]; exact hχ
    have hc : completedLFunction χ s = 0 := by
      rw [LFunction_eq_completed_div_gammaFactor χ s (Or.inl hs0)] at hz
      exact (div_eq_zero_iff.1 hz).resolve_right (Formalism.VW.gammaFactor_ne_zero χ h0)
    have hfe := hinv.completedLFunction_one_sub s
    rw [inv_inv, hc, mul_zero] at hfe
    have h2 : (1 - s) ≠ 0 := sub_ne_zero.2 hs1.symm
    refine h N χ⁻¹ (1 - s) (by rw [sub_re, one_re]; linarith) (Or.inr fun e => hs0 (by linear_combination -e)) ?_
    rw [LFunction_eq_completed_div_gammaFactor χ⁻¹ (1 - s) (Or.inl h2), hfe, zero_div]
  · exact h N χ s hgt (Or.inr hs1) hz

-- Formalism/GammaFactorNonvanishing/CritLine.lean, line 29
@[blueprint "rhEvery" (title := "Specialize to the level-one character")
  (statement := /-- Apply the zeta reduction to the trivial character modulo one, whose L-function is zeta. -/)]
theorem Formalism.VW.rh_of_every (h : UpperTheory.EveryCharacter) : RiemannHypothesis :=
  Formalism.VW.rh_of_right fun s hs hs1 => by
    have := h 1 (1 : DirichletCharacter ℂ 1) s hs (Or.inr hs1)
    rwa [LFunction_modOne_eq] at this

blueprint_comment /--
\begin{theorem}[Primitive zero-free criterion]
\label{topG}
Combine the top-level condition with the required host data for each primitive character.
\end{theorem}
\begin{proof}
Source-traced declaration \texttt{UpperTheory.Top.zeroFreeAll\_of\_topG}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Primitive character nonvanishing]
\label{greenZero}
The Green and window hypotheses and a definite-side witness provide the inputs of the primitive criterion.
\end{theorem}
\begin{proof}
\uses{topG}
Source-traced declaration \texttt{UpperTheory.Top.zero\_free\_all\_of\_green\_v\_win}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Extend to imprimitive characters]
\label{imprimitive}
Use the character of minimal conductor and show that the remaining Euler factors cannot vanish.
\end{theorem}
\begin{proof}
Source-traced declaration \texttt{UpperTheory.Top.imprimitive}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[From windows to all characters]
\label{greenEvery}
First derive the primitive zero-free result, then extend to arbitrary positive levels.
\end{theorem}
\begin{proof}
\uses{greenZero,imprimitive}
Source-traced declaration \texttt{UpperTheory.Top.every\_character\_of\_green\_v\_win}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Construct a definite-side witness]
\label{definite}
Theta integrals, local matching, a covolume bound, and local parameters supply a nonempty family of definite-side hypotheses.
\end{theorem}
\begin{proof}
Source-traced declaration \texttt{UpperTheory.Lit.nonempty\_hyps\_definite\_side\_of\_closed\_bound}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Theta integrals and local matching]
\label{match}
Combine the definite-side witness with the Green and window input to obtain the all-character conclusion.
\end{theorem}
\begin{proof}
\uses{definite,greenEvery}
Source-traced declaration \texttt{UpperTheory.Lit.every\_character\_of\_theta\_integrals\_local\_matching}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Assemble the literature inputs]
\label{literature}
Package published results, local matching, theta integrals and a covolume estimate for the theta-to-nonvanishing theorem.
\end{theorem}
\begin{proof}
\uses{match}
Source-traced declaration \texttt{UpperTheory.LiteratureTheorems.every\_character\_of\_literature\_of\_vWin}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Galois row for the local parameter]
\label{row}
The source obtains its local–global row by applying a Galois-representations result to a theta lift.
\end{theorem}
\begin{proof}
Source-traced declaration \texttt{UpperTheory.Gal.Int.galoisLocalGlobalStrong\_recParameter}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Local parameter construction]
\label{local}
The project constructs the local parameter with the required compatibilities.
\end{theorem}
\begin{proof}
Source-traced declaration \texttt{UpperTheory.Zero.LLC.recTExists}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Window condition from a row]
\label{window}
Use open-image and base-change inputs together with the given row to obtain the automorphic window.
\end{theorem}
\begin{proof}
Source-traced declaration \texttt{UpperTheory.One.vwin\_of\_row}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Nonvanishing given the Galois row]
\label{ofRow}
Assemble the literature package using the supplied row and local parameter existence. Apply the window result to that same row.
\end{theorem}
\begin{proof}
\uses{literature,local,window}
Source-traced declaration \texttt{UpperTheory.FinalTheorems.everyCharacter\_of\_row}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Nonvanishing for all characters]
\label{every}
Discharge the row assumption with the local–global result. This is the unconditional input consumed by the public analytic deductions.
\end{theorem}
\begin{proof}
\uses{ofRow,row}
Source-traced declaration \texttt{UpperTheory.FinalTheorems.everyCharacter}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Public nonvanishing bridge]
\label{allChi}
Expose the unconditional all-character result to the final deduction module.
\end{theorem}
\begin{proof}
\uses{every}
Source-traced declaration \texttt{allChi}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Riemann hypothesis from all characters]
\label{rhAll}
Apply the checked level-one reduction to the nonvanishing bridge.
\end{theorem}
\begin{proof}
\uses{rhEvery,allChi}
Source-traced declaration \texttt{rhOfAll}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Primitive critical-line bridge]
\label{critAll}
Apply the primitive critical-line theorem with the unconditional nonvanishing input.
\end{theorem}
\begin{proof}
\uses{crit,allChi}
Source-traced declaration \texttt{critAll}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Package the three analytic claims]
\label{claimAll}
Assemble the half-plane result, the general Dirichlet strip result and the zeta statement in a conjunction.
\end{theorem}
\begin{proof}
\uses{allChi,strip,zeta}
Source-traced declaration \texttt{claimAll}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Riemann hypothesis]
\label{mainRH}
The first public theorem takes its proof from the zeta bridge.
\end{theorem}
\begin{proof}
\uses{rhAll}
Source-traced declaration \texttt{riemannHypothesis}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Nontrivial zeta zeros on the line]
\label{mainZeta}
The second public statement uses the same bridge under a definitionally equal type.
\end{theorem}
\begin{proof}
\uses{rhAll}
Source-traced declaration \texttt{riemannZeta\_eq\_zero\_re}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Dirichlet half-plane nonvanishing]
\label{mainNV}
The public theorem is the all-character nonvanishing bridge.
\end{theorem}
\begin{proof}
\uses{allChi}
Source-traced declaration \texttt{LFunction\_ne\_zero\_of\_half\_lt\_re}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[All Dirichlet zeros on the line]
\label{mainStrip}
Project the strip proof from the three-part conjunction. Only the strip component is selected at this use.
\end{theorem}
\begin{proof}
\uses{claimAll}
Source-traced declaration \texttt{LFunction\_eq\_zero\_re}.
\end{proof}
-/

blueprint_comment /--
\begin{theorem}[Primitive Dirichlet zeros on the line]
\label{mainPrim}
The original public theorem uses the dedicated primitive bridge.
\end{theorem}
\begin{proof}
\uses{critAll}
Source-traced declaration \texttt{LFunction\_eq\_zero\_re\_of\_isPrimitive}.
\end{proof}
-/
