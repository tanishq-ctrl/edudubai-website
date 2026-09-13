# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: the individual compliance professional choosing a certification for
their own career — AML/CFT officers, MLROs, sanctions and financial-crime
staff, internal auditors and risk teams inside regulated institutions. They
arrive evaluating whether a specific credential is worth their time and money,
usually against an employer expectation or a regulatory obligation they already
know they have.

The site addresses all three lines of defence explicitly: front-line officers
and branch managers, head-office compliance and risk teams, and internal
auditors. Accounts and finance professionals, and MLROs appointed under local
regulation, are named as secondary audiences.

Secondary: the corporate buyer commissioning cohort training for a team. Served
by `/corporate-training`, not by the homepage.

Sectors served: banking, insurance, custodial and investment entities; Virtual
Asset Service Providers; exchange and remittance houses; DNFBPs (real estate,
corporate service providers, law firms, chartered accountants); DPMS (dealers
in precious metals and stones).

## Product Purpose

Online and in-person certification training in regulatory compliance — AML/CFT,
sanctions, financial crime, tax transparency and corporate governance — for
professionals in regulated institutions across India, the Gulf and
international markets.

Success on the homepage is the visitor reaching the catalogue and seeing a
specific programme. There is no payment gateway, so browsing is the real first
step; enquiry follows from the course page rather than from home.

## Positioning

Taught by people who still do the job. Faculty are serving MLROs, heads of
compliance and former regulators, and case material comes from live enforcement
actions rather than textbook scenarios. This is the claim a neighbouring
training provider could not truthfully copy, and the one the site should lead
with.

Supporting, not leading: programmes map to ACAMS and GCI credentials, so the
certificate carries weight with the regulator as well as the employer.

## Operating Context

Visitors are evaluating a credential against a real obligation — an employer
requirement, a regulatory appointment, or a career move into a compliance
function. They compare issuing bodies, hours, level and delivery mode, and they
need to know whether the certificate is recognised where they work.

Delivery modes are live virtual and in person. Programmes are sized in hours
(16–100) and levelled intermediate or advanced.

## Capabilities and Constraints

- Eight programmes in the catalogue: CAMS, CGSS, AMLS, FATCA & CRS (FCS),
  Sanctions Compliance (SCS), Regulatory Compliance (RCS), Certified Compliance
  Manager (CCM), and Trade-Based Money Laundering (TBML).
- Issuing bodies: ACAMS, and GCI (GCI Australia, accredited by LIBF UK).
- Filterable by category, level, delivery mode and issuing body.
- **No payment gateway.** Razorpay was removed deliberately. Enrolment is
  enquiry-led; `/dashboard/payments` renders historical rows only. Future work
  must not imply checkout, cart, or instant purchase.
- Catalogue has two sources behind a `COURSES_SOURCE` switch (static file or
  Supabase). Consumers never know which one they got.
- Signed-in dashboard covers enrollments, payments, support requests; trainer
  and scholarship applications exist as forms.
- Free-tier Supabase backs Postgres, Auth and Storage.

## Brand Commitments

- Name: EduDubai. Wordmark reads "Edu-Dubai" with the strapline "Global
  Education and Training Specialist".
- Palette is brand navy and gold. Navy ramp resolves to `#1e3a5f` / `#0f1f35`;
  `--ink-975` sits one stop below it so adjacent dark bands differ in value.
- Typefaces: Inter for body, Sora for display headings.
- Voice is sober and specific, written for an executive compliance audience.
  British spelling ("programmes", "recognised", "defence").
- `/about` was rebuilt into a dark "Midnight" treatment the user selected as
  direction A. It is the newest visual reference in the codebase.

## Evidence on Hand

Real, and safe to use:

- 2,500+ specialists certified since 2023.
- 850+ professional sessions delivered.
- 12 jurisdictions.
- 8+ certifications offered.
- Founded 2023.
- Faculty portraits and bios: Sonali Prabhu (Founder & CEO; banking operations,
  policy and regulatory compliance at HDFC Bank) and Sanjay Prabhu (Director,
  GRC consulting & training; eighteen years in trade finance and banking
  operations, nine in compliance training; CCM (GCI), CFCS, CTP).
- Course hero photography in `public/hero/`, course card art, ACAMS/GCI
  credential badges.
- Partner/client logo strip on the homepage.

Absent — must not be fabricated: named customer case studies, pricing,
pass rates, employment outcomes, or accreditation claims beyond ACAMS and GCI.
Testimonials exist on the homepage; treat their wording as fixed content, not
as something to invent more of.

## Product Principles

1. **Lead with the faculty, not the certificate.** The credential is table
   stakes in this category; who teaches it is the differentiator.
2. **Name the obligation, not the benefit.** This audience responds to the
   specific regulatory exposure they already carry, not to aspirational
   career copy.
3. **The catalogue is the destination.** Every homepage path should end at a
   named programme, not at a generic contact form.
4. **Specificity is the proof.** Hours, levels, issuing bodies, jurisdictions
   and sectors do more credibility work here than adjectives.
5. **Never imply instant purchase.** There is no checkout; the next step is
   always browse, then enquire.

## Accessibility & Inclusion

No external standard has been set by the user. The incumbent codebase already
commits to: a skip-to-content link, `sr-only` headings and labels,
`aria-live` result counts, `prefers-reduced-motion` handling with a reveal
failsafe so content is never permanently hidden, and a `no-js` fallback that
forces revealed content visible. Future work must preserve these.
