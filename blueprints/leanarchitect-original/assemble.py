"""Extract annotated analytic proofs and source-traced blueprint notes from the sibling archive."""
from pathlib import Path
import hashlib
import json
import re

HERE = Path(__file__).resolve().parent
SRC = HERE.parent / 'lean' / 'src'
A = 'Development/AutomorphicArithmetic/'
CHAR = A + 'CharacterBoxes/'
THETA = A + 'ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/'
GAMMA = 'Formalism/GammaFactorNonvanishing/'
MAIN = 'Main'
KERNEL = 'Supplements/Kernels/MainTheorems'
FINAL = CHAR + 'MainConclusion'
GREEN = THETA + 'TopPlug'
MATCH = THETA + 'SiegelEisensteinSecondTermHypotheses'

# ID, fully qualified Lean declaration, source module, graph title, description.
# The optional final field lists *selected* proof references in a source-only note.
formal = [
 ('everyDef','UpperTheory.EveryCharacter',CHAR+'EveryCharacter','Dirichlet nonvanishing premise','Every Dirichlet L-function is nonzero to the right of one half, excluding the principal-character point at one.'),
 ('half','Claim.HalfPlane',CHAR+'HalfPlane','Right half-plane predicate','Nonvanishing in the open right half-plane for every positive level, subject to the exception at one.'),
 ('stripDef','Claim.Strip',CHAR+'HalfPlane','Strip predicate','A Dirichlet L-function zero in the open critical strip has real part one half.'),
 ('zetaDef','Claim.Zeta',CHAR+'HalfPlane','Zeta-zero predicate','Every nontrivial zeta zero distinct from one lies on the critical line.'),
 ('factor','Claim.factor_ne_zero',CHAR+'ClaimStrip','Euler factor is nonzero','At positive real part the prime-power term has norm less than one, so a deleted Euler factor cannot vanish.'),
 ('primZero','Claim.prim_zero',CHAR+'ClaimStrip','Pass a zero to the primitive character','Change level to the conductor and rule out zeros of the deleted Euler factors.'),
 ('gamma','Claim.gamma_ne_zero',CHAR+'ClaimStrip','Gamma factor is nonzero','Both possible archimedean factors are nonzero at positive real part.'),
 ('reflect','Claim.prim_reflect',CHAR+'ClaimStrip','Reflect a primitive zero','The completed functional equation transfers a primitive zero to the inverse character at one minus the original argument.'),
 ('strip','Claim.strip',CHAR+'ClaimStrip','All Dirichlet zeros in the strip','Use half-plane nonvanishing on the right. On the left, pass to the primitive character and reflect its zero to the right.'),
 ('zeta','Claim.zeta',CHAR+'ClaimStrip','Zeta consequence of nonvanishing','Use the level-one character in the strip and the zeta functional equation and nonvanishing outside it.'),
 ('right','Formalism.VW.rh_of_right',GAMMA+'RhOfRight','Reflect a hypothetical zeta zero','Right-half-plane nonvanishing implies RH by the zeta functional equation, with the exceptional gamma and trigonometric factors handled explicitly.'),
 ('vGamma','Formalism.VW.gammaFactor_ne_zero',GAMMA+'CritLine','Archimedean factor for the primitive proof','Compute the gamma factor according to character parity on the positive half-plane.'),
 ('crit','Formalism.VW.critLine',GAMMA+'CritLine','Primitive zeros on the critical line','Half-plane nonvanishing and the primitive functional equation force a zero in the strip onto the critical line.'),
 ('rhEvery','Formalism.VW.rh_of_every',GAMMA+'CritLine','Specialize to the level-one character','Apply the zeta reduction to the trivial character modulo one, whose L-function is zeta.'),
]
traced = [
 ('topG','UpperTheory.Top.zeroFreeAll_of_topG',CHAR+'ZeroFreeAllOfTopG','Primitive zero-free criterion','Combine the top-level condition with the required host data for each primitive character.',[]),
 ('greenZero','UpperTheory.Top.zero_free_all_of_green_v_win',GREEN,'Primitive character nonvanishing','The Green and window hypotheses and a definite-side witness provide the inputs of the primitive criterion.',['topG']),
 ('imprimitive','UpperTheory.Top.imprimitive',CHAR+'Imprimitive','Extend to imprimitive characters','Use the character of minimal conductor and show that the remaining Euler factors cannot vanish.',[]),
 ('greenEvery','UpperTheory.Top.every_character_of_green_v_win',GREEN,'From windows to all characters','First derive the primitive zero-free result, then extend to arbitrary positive levels.',['greenZero','imprimitive']),
 ('definite','UpperTheory.Lit.nonempty_hyps_definite_side_of_closed_bound',MATCH,'Construct a definite-side witness','Theta integrals, local matching, a covolume bound, and local parameters supply a nonempty family of definite-side hypotheses.',[]),
 ('match','UpperTheory.Lit.every_character_of_theta_integrals_local_matching',MATCH,'Theta integrals and local matching','Combine the definite-side witness with the Green and window input to obtain the all-character conclusion.',['definite','greenEvery']),
 ('literature','UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin',THETA+'EveryCharacterOfLiteratureOfVWin','Assemble the literature inputs','Package published results, local matching, theta integrals and a covolume estimate for the theta-to-nonvanishing theorem.',['match']),
 ('row','UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter',A+'Foundations/GaloisRepresentations/IntegralStructures/RowSrc','Galois row for the local parameter','The source obtains its local–global row by applying a Galois-representations result to a theta lift.',[]),
 ('local','UpperTheory.Zero.LLC.recTExists',A+'Foundations/LocalLanglands/LocalCentralUnits/RecTExists','Local parameter construction','The project constructs the local parameter with the required compatibilities.',[]),
 ('window','UpperTheory.One.vwin_of_row',A+'AutomorphicVarieties/ModularityArgument/ThresholdArguments/DenseThresholdCases/VwinOfRow','Window condition from a row','Use open-image and base-change inputs together with the given row to obtain the automorphic window.',[]),
 ('ofRow','UpperTheory.FinalTheorems.everyCharacter_of_row',FINAL,'Nonvanishing given the Galois row','Assemble the literature package using the supplied row and local parameter existence. Apply the window result to that same row.',['literature','local','window']),
 ('every','UpperTheory.FinalTheorems.everyCharacter',FINAL,'Nonvanishing for all characters','Discharge the row assumption with the local–global result. This is the unconditional input consumed by the public analytic deductions.',['ofRow','row']),
 ('allChi','allChi',KERNEL,'Public nonvanishing bridge','Expose the unconditional all-character result to the final deduction module.',['every']),
 ('rhAll','rhOfAll',KERNEL,'Riemann hypothesis from all characters','Apply the checked level-one reduction to the nonvanishing bridge.',['rhEvery','allChi']),
 ('critAll','critAll',KERNEL,'Primitive critical-line bridge','Apply the primitive critical-line theorem with the unconditional nonvanishing input.',['crit','allChi']),
 ('claimAll','claimAll',KERNEL,'Package the three analytic claims','Assemble the half-plane result, the general Dirichlet strip result and the zeta statement in a conjunction.',['allChi','strip','zeta']),
 ('mainRH','riemannHypothesis',MAIN,'Riemann hypothesis','The first public theorem takes its proof from the zeta bridge.',['rhAll']),
 ('mainZeta','riemannZeta_eq_zero_re',MAIN,'Nontrivial zeta zeros on the line','The second public statement uses the same bridge under a definitionally equal type.',['rhAll']),
 ('mainNV','LFunction_ne_zero_of_half_lt_re',MAIN,'Dirichlet half-plane nonvanishing','The public theorem is the all-character nonvanishing bridge.',['allChi']),
 ('mainStrip','LFunction_eq_zero_re',MAIN,'All Dirichlet zeros on the line','Project the strip proof from the three-part conjunction. Only the strip component is selected at this use.',['claimAll']),
 ('mainPrim','LFunction_eq_zero_re_of_isPrimitive',MAIN,'Primitive Dirichlet zeros on the line','The original public theorem uses the dedicated primitive bridge.',['critAll']),
]


def declaration(item):
    key, name, module, *_ = item
    p = SRC / (module+'.lean')
    rows = p.read_text().splitlines()
    pattern = re.compile(r'^(?:def|theorem) (\S+)')
    matches = [(i,m[1]) for i,row in enumerate(rows) if (m:=pattern.match(row)) and (m[1]==name or m[1]==name.split('.')[-1])]
    if len(matches)!=1:
        raise ValueError((name, matches))
    start, written = matches[0]
    end = next((i for i in range(start+1,len(rows)) if re.match(r'^(def |theorem |end(?:\s|$)|namespace |section(?:\s|$)|omit |attribute |open |variable |set_option )',rows[i])),len(rows))
    body = '\n'.join(rows[start:end]).rstrip()
    return start+1, written, body


def main():
    index = {}
    chunks = ['import Mathlib','import Architect','','/-! Selected original declarations checked in a separate Lake package on the archive pin. -/','open Complex DirichletCharacter','']
    for item in formal+traced:
        key,name,module,title,summary,*deps = item
        line,written,body=declaration(item)
        index[key]={'name':name,'source':module+'.lean','line':line,'title':title,'summary':summary,'kind':'source' if deps else 'compiled','sha256':hashlib.sha256(body.encode()).hexdigest()}
    for item in formal:
        key,name,module,title,summary=item
        line,written,body=declaration(item)
        chunks += [f'-- {module}.lean, line {line}']
        if written!=name:
            chunks += ['namespace '+name.rsplit('.',1)[0]]
        chunks += [f'@[blueprint "{key}" (title := "{title}")',f'  (statement := /-- {summary} -/)]',body]
        if written!=name:
            chunks += ['end '+name.rsplit('.',1)[0]]
        chunks += ['']
    for item in traced:
        key,name,module,title,summary,deps=item
        line,written,body=declaration(item)
        proof=body.split(':=',1)[1]
        for dep in deps:
            tail=index[dep]['name'].split('.')[-1]
            if not re.search(r'(?<![\w])'+re.escape(tail)+r'(?![\w])',proof):
                raise ValueError(f'{name} does not mention {index[dep]["name"]} in its proof')
        chunks += [r'blueprint_comment /--',r'\begin{theorem}['+title+']',r'\label{'+key+'}',summary,r'\end{theorem}',r'\begin{proof}']
        if deps:
            chunks += [r'\uses{'+','.join(deps)+'}']
        chunks += [r'Source-traced declaration \texttt{'+name.replace('_',r'\_')+r'}.',r'\end{proof}','-/','']
    (HERE/'RiemannArchitect.lean').write_text('\n'.join(chunks))
    (HERE/'source-index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2)+'\n')


if __name__ == '__main__':
    main()
