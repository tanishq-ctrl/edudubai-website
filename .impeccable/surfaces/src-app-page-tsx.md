---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface brief — `/` (homepage)

**Scope:** `src/app/page.tsx` and the sections it composes.
**Visitor mode:** Persuade.

**Audience:** the individual compliance professional — AML/CFT officer, MLRO,
sanctions or financial-crime staff, internal auditor — choosing a certification
for their own career, usually against an employer expectation or a regulatory
obligation they already carry.

**Job:** work out whether a specific credential is worth their time, and reach
the programme that covers the exposure they are responsible for.

**Action:** reach a named programme. Not a contact form — there is no payment
gateway, so browse is the real first step and enquiry follows from the course
page.

**Proof on hand:** 2,500+ specialists certified since 2017; 850+ sessions; 12
jurisdictions; 8 programmes; ACAMS and GCI mapping; named faculty with current
roles (Sonali Prabhu, Sanjay Prabhu). Partner logo strip. Existing testimonials
are fixed content — do not invent more.

**Constraints:** never imply checkout or instant purchase. British spelling.
Preserve the skip link, `sr-only` labels, `aria-live` counts, reduced-motion
handling and the `no-js` reveal failsafe.

## Direction contract

**THESIS:** The hero carousel and its trust rail are user-pinned and stay — they
are what makes the top of the page read as one object, and a pinned decision
beats the roll. What the page refuses is everything that used to follow them:
the feature trio and the separate featured-courses grid. In their place the
obligation index runs on the same dark ground as the hero, so the visitor
crosses no seam between "what this is" and "which programme is mine", and every
row lands on a real programme.

**OWN-WORLD:** Midnight, inherited and unchanged. Grounds are `--ink-975`
(#08101e) and `--navy-900` (#0f1f35), alternating so no two adjacent bands share
a value; gold `--gold-400` (#d4af37) is the single accent and carries ordinals,
rules and the primary action only. Sora at 600 for display, Inter for body.
Panels are opaque or `.panel-dark`, never blurred — blur is the site header's
alone. Components: numbered index rows separated by hairline rules, gold ordinal
markers, `.bloom-gold` / `.bloom-navy` radial grounds, full-bleed bands with no
Container padding fighting them. Recognisable with all content removed by the
hairline register and the gold ordinals.

**STORY:** The visitor understands within one line that this page is addressed
to someone who carries regulatory responsibility. They believe EduDubai
understands their exposure because the page names ten of them precisely, in the
regulator's own vocabulary, before it asks for anything. They act by selecting
the obligation that is theirs, which delivers them to a named programme.

**FIRST VIEWPORT:** The existing carousel, full height, photograph behind copy
set left: eyebrow, headline with its gold accent half, subheadline, primary and
secondary actions, then the slide indicators with their progress fill. The trust
rail closes the band — "Trusted by teams at" and the partner marquee on
`glass-dark` behind a hairline top border, inside the hero's own section rather
than as a strip beneath it. Below the fold the ground stays dark and the
obligation index begins, so the hero hands over without a value jump.

**FORM:** The Obligation Index, below a pinned carousel hero — candidate 3 of my seven ordered structures,
dealt as the lead by seed `e6db68cf` (scope surface, mode persuade). Raised by
the declined oscilloscope challenger with density courage: every row is measured
against a visible register and nothing on screen is unlabelled decoration.
Signature interaction: hovering a row draws its gold rule from the ordinal
outward to full measure and lifts the mapped programme name from muted to full
contrast — the register filling in, not a colour swap. Motion grammar is the
site's existing `ease-out-expo` at `duration-slow`, honouring
`prefers-reduced-motion`.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.

## Unresolved

- `/courses` gets its own round after this one; it is a different mode and must
  not inherit this composition by default.
- Both Sora weight defects are fixed: the hero headline now uses 700 and the
  stats `dd` 600, which are loaded weights.
- `public/images/partners/emirates-nbd.png` is a reversed logo — a solid brand
  slab with the wordmark knocked out — and cannot survive the rail's white
  silhouette treatment. Needs a mono or transparent-background asset, or to be
  dropped from the marquee. Awaiting the user's call; not changed unilaterally.
- `WhyEduDubai` and `FeaturedCoursesSection` are no longer rendered but remain
  in the repo.
