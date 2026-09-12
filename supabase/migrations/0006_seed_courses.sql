-- 0006_seed_courses.sql
--
-- GENERATED FILE - do not edit by hand.
-- Regenerate with: npx vite-node scripts/generate-course-seed.ts
--
-- Seeds public.courses from src/lib/courses.ts, the static catalogue that has
-- been driving the public site. Content is copied verbatim, including the
-- nested schedules, outcomes, FAQ, exam info and audience categories that the
-- old Prisma courses model could not represent.
--
-- legacy_id preserves the original Course.id. It is NOT cosmetic:
-- src/app/courses/[slug]/course-hero.tsx switches on 'cams', 'cgss', 'tbml'
-- and 'certified-compliance-manager' to render per-course hero content, and
-- two courses have an id that differs from their slug (cgss, aml-specialist).
--
-- display_order preserves the array order of the original file so the
-- catalogue lists identically after the cutover.
--
-- Idempotent: re-running updates the existing rows by slug rather than
-- inserting duplicates.

begin;

alter table public.courses
  add column if not exists legacy_id text;

create unique index if not exists courses_legacy_id_idx
  on public.courses (legacy_id) where legacy_id is not null;

insert into public.courses (
  slug, legacy_id, title, short_description, long_description,
  category, issuing_body, level, duration_hours, price_usd, currency,
  delivery_modes, featured, published, display_order,
  image_url, hero_image_url,
  delivery_schedules, outcomes, who_its_for, faq, audience_categories,
  why_choose_us, exam_info, program_overview
) values
  (
    'cams',
    'cams',
    'Certified Anti-Money Laundering Specialist (CAMS)',
    'The CAMS designation is recognized worldwide by regulators, financial institutions, and law enforcement as the benchmark for AML/CFT competence.',
    'The CAMS designation is recognized worldwide by regulators, financial institutions, and law enforcement as the benchmark for AML/CFT competence. This comprehensive preparation course equips you with the strategies to detect and prevent financial crime, covering everything from money laundering methods to the practical implementation of a compliance program. You will master the critical pillars of AML—Risk Assessment, Internal Controls, Independent Audit, and Training—ensuring you are fully prepared to pass the exam and protect your organization from regulatory risk.',
    'AML_CFT',
    'ACAMS',
    'ADVANCED',
    100,
    350,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    0,
    '/images/certifications/certified-anti-money-laundering-specialist.jpg',
    '/images/certifications/cams-flyer.png',
    '[{"name":"Weekday Batch","schedule":"Mon – Thu","duration":"5:00 PM – 9:00 PM (Dubai Time)"},{"name":"Weekend Batch","schedule":"Sat & Sun","duration":"9:00 AM – 1:00 PM (Dubai Time)"},{"name":"Corporate / In-House","schedule":"Customized schedule and delivery","duration":"Concise 2–4 day format"}]'::jsonb,
    '["Understand ML/TF Methods: Across banks, insurance, MSBs, DNFBPs, and real estate sectors","Master Global Standards: FATF, Basel, Wolfsberg, EU AMLD, USA PATRIOT Act, OFAC","Build AML Programs: KYC/CDD, EDD, governance, controls, and monitoring systems","Conduct Investigations: SAR/STR filing, fund tracing, law enforcement coordination","Apply Risk-Based Judgment: Enterprise-wide risk assessment, sanctions decisions, audit response"]'::jsonb,
    '["Compliance Officers","AML Analysts","Bankers","Auditors","Risk Managers"]'::jsonb,
    '[{"question":"Do I need prior experience?","answer":"While ACAMS recommends experience, our course covers the fundamentals, making it accessible for baseline professional knowledge."},{"question":"Is the exam fee included?","answer":"No, the ACAMS exam fee is paid directly to ACAMS. Our fee covers the expert-led training and preparation."}]'::jsonb,
    '[{"title":"🏦 Financial Institutions","roles":["Compliance Officers","AML Investigators","Risk Managers","Internal Auditors","Bankers"]},{"title":"⚖️ Law & Regulation","roles":["Regulators","FIU Staff","Law Enforcement","Legal Counsel","Governance Officers"]},{"title":"🏢 Industry & DNFBPs","roles":["Exchange Houses","MSBs","Real Estate","TCSPs","Auditors","Consultants"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"While other institutes offer \"crash courses\" of just 30–32 hours, Edu-Dubai provides a full 100-Hour Flagship Program. This ensures you meet the strict 40 Eligibility Credits required by ACAMS to even register for the exam.","points":["Expert Training: Regulator-aligned instructors with MENA experience.","Quality Learning: Scenario-based, exam-focused, practical approach.","Resources: Mock exams, simulations, case labs.","Support: Ongoing mentoring and extended exam support.","Ethics First: No dumps. No shortcuts. No compromises."]}'::jsonb,
    '{"questions":"120","duration":"210 Minutes (3.5 Hours)","passingScore":"75%","format":"Online Proctored Exam","requirements":[{"title":"Eligibility","items":["Open to AML & Compliance Professionals","No mandatory prerequisites"]},{"title":"Training","items":["25 Days × 4 Hours = 100 Hours","5 Full Mock Exams","Performance Reviews"]},{"title":"Registration Process","items":["Enroll with Edu-Dubai","Complete Training","Register on ACAMS®","Schedule Exam","Get Certified"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by ACAMS. Training fees charged by EduDubai are separate from ACAMS certificate fees."]}]}'::jsonb,
    '{"whatIs":"A scenario-driven, regulator-aligned CAMS® preparation program designed to help professionals Prepare, Apply, and Defend compliance decisions. Aligned with ACAMS Candidate Handbook & Exam Blueprint.","whyItMatters":"As financial crime grows more complex, regulators expect professionals to demonstrate strong judgment, defensibility, and accountability. This program builds regulator-ready thinking.","jobReadySkills":"Develop practical AML skills to: Handle real investigations, Manage alerts and escalations, Draft defensible SAR/STRs, Support audits and regulators, and Manage sanctions and PEP risk."}'::jsonb
  ),
  (
    'certified-global-sanctions-specialist',
    'cgss',
    'Certified Global Sanctions Specialist (CGSS®)',
    'In an era of rapid geopolitical change, Sanctions Compliance has become a critical skill. The CGSS course dives deep into the complex web of UN, EU, and OFAC sanctions regimes.',
    'In an era of rapid geopolitical change, Sanctions Compliance has become a critical skill. The CGSS course dives deep into the complex web of UN, EU, and OFAC sanctions regimes. This training moves beyond basic lists to teach you the logic of sanctions—how to screen effectively, how to investigate false positives versus true hits, and how to manage the risks of evasion techniques like stripping and nesting.',
    'SANCTIONS',
    'ACAMS',
    'ADVANCED',
    40,
    350,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    1,
    '/images/certifications/certified-global-sanctions-specialist.jpg',
    '/images/certifications/cgss-flyer.png',
    '[{"name":"Weekday Batch","schedule":"Mon – Thu","duration":"5:00 PM – 9:00 PM (Dubai Time)"},{"name":"Weekend Batch","schedule":"Sat & Sun","duration":"9:00 AM – 1:00 PM (Dubai Time)"},{"name":"Corporate / In-House","schedule":"Customized schedule and delivery","duration":"Concise 2–4 day format"}]'::jsonb,
    '["Understand the history, purpose, and types of sanctions (Sectoral, Comprehensive, Targeted)","Navigate the differences between OFAC (USA), UN, and EU sanctions","Master best practices for name and payment screening, including fuzzy logic and resolving false positives","Detect stripping, nesting, and trade-based sanctions evasion","Conduct in-depth sanctions investigations and regulatory reporting"]'::jsonb,
    '["Sanctions Screening Analysts","Trade Finance Professionals","Legal Counsel","Compliance Staff","Sanctions Compliance Officers and Managers"]'::jsonb,
    '[{"question":"Is this harder than CAMS?","answer":"It is more specialized. If you work in Trade Finance or payment filtering, you may find it more relevant and naturally intuitive."},{"question":"Does this cover Russia/Iran sanctions?","answer":"Yes, we use the most current real-world examples including recent Russia and Middle East sanctions regimes."}]'::jsonb,
    '[{"title":"🏦 Financial Sector","roles":["Sanctions Compliance Officers","AML Investigators","KYC/CDD Teams","Correspondent Banking Staff","Trade Finance Operations"]},{"title":"🚢 Global Trade & Logistics","roles":["Export/Import Compliance","Shipping Officers","Freight Forwarders","Legal & Risk Governance"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"Sanctions is the hardest topic to self-study because rules change daily. Our course is live, current, and taught by field experts.","points":["Sanctions War Rooms: Real-time simulations deciding whether to block transactions involving major regimes.","Trade Finance Focus: Deep dives into shipping documents, Bill of Ladings, and trade-based evasion.","92% Pass Rate: Proven methodology to secure your certification on the first attempt.","MENA Expert Instructors: Taught by professionals with 15+ years experience in UAE and GCC banking."]}'::jsonb,
    '{"questions":"100 MCQ & MRQ","duration":"175 Minutes","passingScore":"75%","format":"Computer-based Exam Proctored via Pearson","requirements":[{"title":"Eligibility & Requirements","items":["Candidates must hold an active ACAMS membership","Meet the 40 eligibility credit requirement","Apply and register directly through the ACAMS website","Earn 30 recertification credits every three years"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by ACAMS. Training fees charged by EduDubai are separate from ACAMS certificate fees."]}]}'::jsonb,
    '{"whatIs":"The Certified Global Sanctions Specialist (CGSS) is ACAMS'' premier certification for professionals managing the complex world of global sanctions.","whyItMatters":"With global enforcement hitting record highs, organizations need specialists who can interpret complex EU, UN, and OFAC requirements.","jobReadySkills":"Master name screening, payment filtering, and evasion detection to protect your firm from multi-billion dollar penalties."}'::jsonb
  ),
  (
    'anti-money-laundering-specialist',
    'aml-specialist',
    'Anti-Money Laundering Specialist (AMLS)',
    'The GCI Anti-Money Laundering Specialist (AMLS) certification is designed for professionals who need a practical, hands-on understanding of AML.',
    'The GCI Anti-Money Laundering Specialist (AMLS) certification is designed for professionals who need a practical, hands-on understanding of AML without the high cost of other global certifications. This course focuses on the ''how-to''—how to write a policy, how to screen a customer, and how to detect a suspicious transaction—making it ideal for operational staff and those new to the field.',
    'AML_CFT',
    'GCI',
    'INTERMEDIATE',
    24,
    849,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    2,
    '/images/certifications/anti-money-laundering-specialist.jpg',
    '/images/certifications/amls-flyer.png',
    '[{"name":"Weekday Batch","schedule":"Mon – Thu","duration":"5:00 PM – 9:00 PM (Dubai Time)"},{"name":"Weekend Batch","schedule":"Sat & Sun","duration":"9:00 AM – 1:00 PM (Dubai Time)"},{"name":"Corporate / In-House","schedule":"Customized schedule and delivery","duration":"Concise 2–3 day format"}]'::jsonb,
    '["Understand Money Laundering Cycle: Placement, Layering, and Integration","Master KYC & Onboarding: Practical steps for verifying customer identity","Implement Risk-Based Approach: How to score customers accurately","Learn Reporting: How to draft high-quality Suspicious Transaction Reports (STRs)","Understand the global regulatory landscape for AML/CTF"]'::jsonb,
    '["Entry-level Compliance staff","Front-line staff (Tellers, RMs)","Real Estate Agents","Jewelers","Legal and Accounting Professionals"]'::jsonb,
    '[{"question":"Is GCI recognized?","answer":"Yes, GCI (Global Compliance Institute) is a recognized international certification body for compliance professionals."},{"question":"Is the exam difficult?","answer":"The exam is designed to test practical application. Our students maintain a high pass rate due to our hands-on training style."}]'::jsonb,
    '[{"title":"🏦 Financial Support","roles":["Compliance Assistants","Transaction Monitors","Branch Managers","Customer Service Representatives"]},{"title":"💍 Non-Financial Sector (DNFBPs)","roles":["Real Estate Brokers","Dealers in Precious Metals","Lawyers","Accountants","Art Dealers"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"As an Authorized GCI Partner, we provide the official curriculum and exam bundle, ensuring you have everything needed to succeed.","points":["Practical Templates: Receive editable KYC forms, risk assessment tools, and STR templates for your firm.","Official Partner: We are the designated partner for GCI training in the MENA region.","Focused Learning: No unnecessary theory—just the tools you need to do your job effectively tomorrow.","Affordable Certification: International designation at a more accessible cost point."]}'::jsonb,
    '{"questions":"50","duration":"90 Minutes","passingScore":"70%","format":"Multiple Choice Questions","requirements":[{"title":"Eligibility","items":["Open enrollment","Official AMLS Study Material provided","Online proctored examination"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."]}]}'::jsonb,
    '{"whatIs":"The Anti-Money Laundering Specialist (AMLS) is a practical, job-focused certification by GCI designed for operational excellence in AML.","whyItMatters":"It provides the essential toolkit for front-line and middle-office staff to detect illicit activity without the academic overhead of other programs.","jobReadySkills":"Write effective AML policies, conduct customer risk scoring, and master the art of filing Suspicious Transaction Reports."}'::jsonb
  ),
  (
    'fatca-crs-specialist',
    'fatca-crs-specialist',
    'FATCA & CRS Specialist (FCS®)',
    'Globally recognized FATCA & CRS certification by GCI, accredited by LIBF (UK).',
    'The FCS® Certification Program provides comprehensive training on FATCA and CRS implementation, reporting, and governance. Designed to help professionals manage international tax compliance obligations and regulatory reporting with confidence. It is accredited by GCI and The London Institute of Banking & Finance (UK).',
    'FATCA_CRS',
    'GCI',
    'INTERMEDIATE',
    16,
    849,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    3,
    '/images/certifications/fatca-crs-specialist.jpg',
    '/images/certifications/fcs-flyer.png',
    '[{"name":"Regional Live Virtual Batches","schedule":"Twice Every Month","duration":"Dubai: 9AM-3PM | India: 10:30AM-4:30PM | Singapore: 1PM"},{"name":"Weekend / Fast-Track Batch","schedule":"Available on Demand","duration":"Intensive Exam-Focused Format"},{"name":"Corporate / In-House","schedule":"Customized","duration":"Flexible Delivery"}]'::jsonb,
    '["FATCA Agreements & Scope: Model 1 & Model 2 IGAs, FFI agreements, Entity classification, Compliance obligations","FATCA Registration & Governance: IRS registration, GIIN management, IDES setup, Certification & renewal, Risk management","FATCA Documentation & Due Diligence: Compliance frameworks, Responsible Officer roles, Pre-existing & new accounts, W-9, W-8BEN, Secrecy waivers","FATCA Reporting: Entity and account reporting, Shareholder reporting, Payment reporting, Pooled and nil reporting","CRS Compliance Management: Participating jurisdictions, Individual & entity accounts, Anti-avoidance rules, FATCA vs CRS comparison"]'::jsonb,
    '["FATCA/CRS Officers","Banking & Insurance Professionals","Compliance Managers","Central Bank Staff","Tax Consultants"]'::jsonb,
    '[{"question":"Is this course too technical?","answer":"It is operational. We focus on the forms and the due diligence rather than deep tax legal theory, making it perfect for bank staff."}]'::jsonb,
    '[{"title":"� Financial Institutions","roles":["FATCA/CRS Officers","Banking & Insurance Professionals","Brokerage & Investment Teams","Compliance Managers"]},{"title":"🏛️ Regulators & Authorities","roles":["Central Bank Staff","Tax Authority Officials","Financial Regulators","Policy Officers"]},{"title":"⚖️ Advisors & Providers","roles":["Tax Consultants","Legal Advisors","Reporting System Providers","RegTech Vendors"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"Leading professional training provider in the MENA region.","points":["Accredited Curriculum: Aligned with global FATCA & CRS standards.","Practical Training: Real implementation case studies.","Advanced Resources: Mock audits and reporting simulations.","Expert Faculty: Trainers with international tax compliance experience.","Extended Support: Free reinforcement sessions if required.","First-Attempt Focus: Our goal is certification success."]}'::jsonb,
    '{"questions":"50 Scenario-Based Questions","duration":"Online Proctored Exam","passingScore":"75%","format":"Multiple Choice","requirements":[{"title":"Eligibility","items":["Open to compliance, tax, and reporting professionals","No mandatory prerequisites"]},{"title":"Training Structure","items":["Duration: 2 Days (Intensive Program)","Includes:","Exam Preparation","Multiple Mock Tests","Case Simulations"]},{"title":"Registration Process","items":["Enroll with Edu-Dubai","Attend Live Training","Complete Practice Assessments","Sit for Proctored Exam","Receive Certification"]},{"title":"Personalized Support","items":["Individual performance assessment","Half-day free reinforcement (if needed)","Ongoing mentoring"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."]}]}'::jsonb,
    '{"whatIs":"The FCS® Certification Program provides comprehensive training on FATCA and CRS implementation, reporting, and governance. Designed to help professionals manage international tax compliance obligations and regulatory reporting with confidence. Accredited by GCI and The London Institute of Banking & Finance (UK).","whyItMatters":"Non-compliance with FATCA and CRS can lead to Regulatory penalties, Withholding taxes, Cross-border restrictions, and Reputational damage. This program enables organizations to Maintain global tax transparency, Reduce compliance risk, and Meet international regulatory expectations.","jobReadySkills":"Develop hands-on FATCA & CRS compliance expertise including: Entity classification, Due diligence framework design, Documentation validation, Reportable account identification, Regulatory reporting preparation, and Audit response management."}'::jsonb
  ),
  (
    'sanctions-compliance-specialist',
    'sanctions-compliance-specialist',
    'Sanctions Compliance Specialist (SCS®)',
    'Globally recognized sanctions compliance certification by GCI Australia, accredited by LIBF (UK).',
    'The SCS® Certification Program provides comprehensive training in global sanctions compliance, covering UN, EU, OFAC, UK, and Australian frameworks. Designed to help professionals understand, implement, and defend sanctions controls while mitigating regulatory and reputational risk. It is accredited by GCI Australia and The London Institute of Banking & Finance (UK).',
    'SANCTIONS',
    'GCI',
    'INTERMEDIATE',
    16,
    849,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    4,
    '/images/certifications/sanctions-compliance-specialist.jpg',
    '/images/certifications/scs-flyer.png',
    '[{"name":"Evening Batch (Live Virtual)","schedule":"Mon – Thu (9th Dec – 19th Dec 2024)","duration":"UAE: 5:00 PM – 8:00 PM | India: 6:30 PM – 9:30 PM"},{"name":"Weekend Support Sessions","schedule":"As per batch schedule","duration":"Dedicated Exam Prep & Mock Support"},{"name":"Corporate / In-House","schedule":"Customized","duration":"Flexible Delivery Format"}]'::jsonb,
    '["Sanctions & Proliferation Finance: Sanctions, embargoes, CPF concepts, UN, EU, OFAC frameworks, Sectoral/targeted sanctions, Proliferation finance risk indicators","International Sanctions Regimes: UN, EU, UK, US, Australia sanctions systems, Role of regulators and institutions, Global enforcement coordination","Processes & Systems: CAAT tools, Screening system configuration, False positive management, Customer onboarding controls, SWIFT message screening, Wolfsberg Guidance implementation","Reporting & Violation Analysis: Violation report structure, Root cause analysis, Regulatory reporting obligations, Documentation standards","Governance & Controls: Policy design, Risk frameworks, Internal reviews, Remediation planning"]'::jsonb,
    '["Sanctions Officers","Compliance Managers","Trade Finance Teams","Remittance Professionals","Risk Officers","Regulators","Screening System Providers"]'::jsonb,
    '[{"question":"How does this differ from CGSS?","answer":"This is a more concise, operationally focused certification ideal for junior to mid-level analysts focused on daily alert clearing."}]'::jsonb,
    '[{"title":"� Financial Institutions","roles":["Sanctions Officers","Compliance Managers","Trade Finance Teams","Remittance Professionals","Risk Officers"]},{"title":"⚖️ Regulators & Authorities","roles":["Central Bank Staff","FIU Personnel","Supervisory Officers","Policy Analysts"]},{"title":"🖥️ Technology & Systems","roles":["Screening System Providers","Compliance Software Teams","Risk Analytics Professionals"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"Leading professional training provider in the MENA region.","points":["Accredited Training: Official SCS-aligned curriculum.","Practical Approach: Real-life violation cases and simulations.","Advanced Resources: Mock screenings and exam simulations.","Expert Faculty: Trainers with international sanctions experience.","Continuous Support: Mentoring until certification."]}'::jsonb,
    '{"questions":"50 Questions","duration":"90 Minutes","passingScore":"75%","format":"Proctored Exam (Online)","requirements":[{"title":"Eligibility","items":["Open to compliance, sanctions, and risk professionals","No mandatory prerequisites"]},{"title":"Training Structure","items":["Total Duration: 16 Hours","Includes:","10 Hours Exam Preparation","Multiple Mock Tests","Practice Screenings"]},{"title":"Registration Process","items":["Enroll with Edu-Dubai","Attend Virtual Training","Complete Mock Assessments","Sit for Proctored Exam","Receive Certification"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."]}]}'::jsonb,
    '{"whatIs":"The SCS® Certification Program provides comprehensive training in global sanctions compliance, covering UN, EU, OFAC, UK, and Australian frameworks. Designed to help professionals understand, implement, and defend sanctions controls while mitigating regulatory and reputational risk. Accredited by GCI Australia and The London Institute of Banking & Finance (UK).","whyItMatters":"Sanctions violations can result in Heavy financial penalties, Criminal liability, Reputational damage, and Regulatory restrictions. This program equips professionals to Prevent breaches, Strengthen screening systems, Improve governance, Respond to regulators, and Build defensible compliance frameworks.","jobReadySkills":"Develop practical sanctions compliance capabilities including: Sanctions risk assessment, Name screening optimization, False positive reduction, SWIFT and transaction monitoring, De-risking management, Regulatory reporting, Violation investigation, and Documentation standards. Graduates become operationally ready for sanctions roles."}'::jsonb
  ),
  (
    'regulatory-compliance-specialist',
    'regulatory-compliance-specialist',
    'Regulatory Compliance Specialist (RCS®)',
    'Globally recognized compliance certification by GCI Australia, accredited by LIBF (UK).',
    'The RCS® Certification Program delivers comprehensive training in regulatory compliance, governance, and risk-based supervision. Designed to prepare professionals to manage regulatory inspections, build strong control environments, and demonstrate defensible compliance practices. Accredited by GCI Australia and The London Institute of Banking & Finance (UK).',
    'GOVERNANCE',
    'GCI',
    'INTERMEDIATE',
    16,
    849,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    5,
    '/images/certifications/regulatory-compliance-specialist.jpg',
    '/images/certifications/rcs-flyer.png',
    '[{"name":"Live Virtual Intensive Batch","schedule":"24th – 28th February 2025","duration":"Dubai: 9AM–1PM | India: 10:30AM–3:30PM | Singapore: 1PM–5PM"},{"name":"Fast-Track Exam Prep Sessions","schedule":"As per Batch Plan","duration":"Dedicated Review & Mock Tests"},{"name":"Corporate / In-House","schedule":"Customized","duration":"Flexible Delivery"}]'::jsonb,
    '["Global Regulatory Frameworks: BIS, BCBS, GDPR, Local and international regulations, Supervisory expectations","Compliance Testing & Monitoring: Testing methodologies, Control assessments, Policy adherence checks, Risk indicator monitoring","Internal Controls & Governance: Compliance department roles, Collaboration with audit, risk, legal, Board and management reporting","Risk-Based Compliance Management: Residual risk measurement, Control optimization, Continuous monitoring","Regulatory Examinations & Reporting: Audit responses, Breach reporting, Regulator communication, Remediation planning"]'::jsonb,
    '["Compliance Officers","Risk Managers","Governance Professionals","Internal Auditors","Operations Managers","Supervisory Staff","Compliance Consultants"]'::jsonb,
    '[{"question":"Is this only for banks?","answer":"No, the RCS principles are critical for Exchange Houses, Brokers, Real Estate, and Insurance firms as well."}]'::jsonb,
    '[{"title":"🏦 Financial Institutions","roles":["Compliance Officers","Risk Managers","Governance Professionals","Internal Auditors","Operations Managers"]},{"title":"🏛️ Regulators & Authorities","roles":["Supervisory Staff","Policy Officers","Regulatory Analysts"]},{"title":"⚖️ Advisory & Consulting","roles":["Compliance Consultants","Legal Advisors","Governance Specialists"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"Leading professional training provider in the MENA region.","points":["Accredited Program: Aligned with GCI and LIBF standards.","Practical Learning: Live audits, simulations, and case studies.","Expert Faculty: Senior trainers with regulatory experience.","Advanced Resources: Mock exams and compliance toolkits.","Extended Support: Ongoing mentoring until certification.","Exam Success Focus: First-attempt certification priority."]}'::jsonb,
    '{"questions":"50 Multiple-Choice Questions","duration":"Online Proctored Exam","passingScore":"75%","format":"Online Proctored Exam","requirements":[{"title":"Eligibility","items":["Open to compliance, risk, and governance professionals","No mandatory prerequisites"]},{"title":"Training Structure","items":["Duration: 16 Hours (4 Days × 4 Hours)","Includes:","8 Hours Exam Preparation","Multiple Mock Tests","Audit Simulations"]},{"title":"Registration Process","items":["Enroll with Edu-Dubai","Attend Live Virtual Sessions","Complete Practice Assessments","Sit for Proctored Exam","Receive Certification"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."]}]}'::jsonb,
    '{"whatIs":"The RCS® Certification Program delivers comprehensive training in regulatory compliance, governance, and risk-based supervision. Designed to prepare professionals to manage regulatory inspections, build strong control environments, and demonstrate defensible compliance practices. Accredited by GCI Australia and The London Institute of Banking & Finance (UK).","whyItMatters":"Regulatory failures can result in Financial penalties, License restrictions, Increased supervision, Management accountability, and Reputational loss. This program empowers professionals to Strengthen governance frameworks, Reduce compliance breaches, Improve examination outcomes, and Build regulator confidence.","jobReadySkills":"Develop advanced compliance capabilities including: Regulatory gap analysis, Compliance testing frameworks, Control effectiveness reviews, Risk monitoring systems, Breach management, Regulatory reporting, and Governance oversight."}'::jsonb
  ),
  (
    'certified-compliance-manager',
    'certified-compliance-manager',
    'Certified Compliance Manager (CCM®)',
    'Flagship leadership certification by GCI Australia for senior compliance professionals.',
    'The CCM® Certification Program prepares professionals to think, decide, and defend like senior compliance leaders. Built on EduDubai’s Prepare – Apply – Defend Framework, this regulator-aligned program focuses on enterprise-wide governance across AML/CFT, Sanctions, FATCA/CRS, KYC, and Regulatory Compliance. Fully aligned with GCI’s official CCM Handbook, syllabus, and exam weightage.',
    'GOVERNANCE',
    'GCI',
    'ADVANCED',
    60,
    1599,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    6,
    '/images/certifications/certified-compliance-manager.jpg',
    '/images/certifications/ccm-flyer.png',
    '[{"name":"Weekday / Evening Batches","schedule":"Designed for Working Professionals","duration":"Morning & Evening Options (Global Time Zones)"},{"name":"Weekend / Fast-Track Batch","schedule":"Intensive Exam-Focused Format","duration":"As per Batch Plan"},{"name":"Corporate / In-House","schedule":"Customized","duration":"Flexible Delivery"}]'::jsonb,
    '["Customer Onboarding & KYC (26%): Risk-based onboarding, Customer classification, Digital KYC & e-KYC, Lifecycle management, Geographic & product risks","AML & CFT Management (24%): ML/TF typologies, Fintech & virtual assets, Transaction monitoring systems, Correspondent banking risks, Blockchain misuse","Sanctions & Embargoes (21%): Sanctions fundamentals, CPF risks, Screening systems, Payment & trade exposure, Violation reporting","Regulatory Compliance Management (12%): Compliance governance, Regulatory Control Matrix, Examination handling, RFI/RIM processes, Audit vs compliance testing","FATCA & CRS Governance (17%): IGAs & obligations, Registration & GIIN, Documentation, Reporting structures, FATCA vs CRS differences"]'::jsonb,
    '["Compliance Officers & Managers","MLROs & Deputies","Risk & Governance Heads","Supervisory Officers","Consultants"]'::jsonb,
    '[{"question":"Is this much harder than Specialist courses?","answer":"Yes, it tests strategic decision-making and function management, not just operational steps."}]'::jsonb,
    '[{"title":"🏦 Financial Institutions","roles":["Compliance Officers & Managers","MLROs & Deputies","AML Investigators","Risk & Governance Heads"]},{"title":"🏛️ Regulators & Authorities","roles":["Supervisory Officers","FIU Staff","Policy Analysts"]},{"title":"🏢 Industry & DNFBPs","roles":["Exchange Houses & MSBs","Real Estate & TCSPs","Lawyers & Auditors","Consultants"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"Available Across: India | UAE | GCC | Southeast Asia | Africa | MENA","points":["Prepare – Apply – Defend Framework: Unique leadership-oriented methodology.","Full Exam Alignment: Mapped to GCI syllabus & weightage.","Scenario-Based Learning: No memorization. No dumps.","Senior Faculty: Trainers with regulatory leadership experience.","Extended Mentorship: Support until certification.","First-Attempt Success Focus: Performance over participation."]}'::jsonb,
    '{"questions":"150 Multiple-Choice Questions","duration":"180 Minutes","passingScore":"75% (Minimum 50% per Module)","format":"Online Proctored Exam","requirements":[{"title":"Eligibility","items":["Compliance, risk, and governance professionals","Senior and mid-management roles preferred"]},{"title":"Training Structure","items":["Instructor-Led: 60 Hours","Guided Self-Study (GCI Standards)","Scenario Reviews","Mock Exams"]},{"title":"Registration Process","items":["Enroll with EduDubai","Attend Instructor-Led Program","Complete Guided Study","Attempt Mock Exams","Sit for Proctored Exam","Receive Certification"]},{"title":"Personalized Support","items":["Individual performance assessment","Free reinforcement sessions","Weak-area strengthening","Exam confidence building"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."]}]}'::jsonb,
    '{"whatIs":"The CCM® Certification Program prepares professionals to think, decide, and defend like senior compliance leaders. Built on EduDubai’s unique framework, it focuses on enterprise-wide governance across AML/CFT, Sanctions, FATCA/CRS, KYC, and Regulatory Compliance.","whyItMatters":"Regulators no longer assess policies alone—they assess Leadership judgment, Governance effectiveness, Control maturity, Accountability, and Decision defensibility. This program empowers you to Prevent systemic compliance failures, Lead regulatory engagements, and Defend decisions confidently.","jobReadySkills":"Develop executive-level compliance capabilities including: Enterprise risk governance, Integrated compliance frameworks, Regulatory inspection management, Multi-domain risk supervision, Board reporting, Cross-functional leadership, and Crisis response."}'::jsonb
  ),
  (
    'trade-based-money-laundering',
    'tbml',
    'Trade Finance and Trade-Based Money Laundering (TBML)',
    'Trade-Based Money Laundering (TBML) is widely recognized as the most complex method of moving illicit value.',
    'Trade-Based Money Laundering (TBML) is widely recognized as the most complex method of moving illicit value. This specialized course is designed for Trade Finance and Compliance professionals who need to look beyond the ''name screen'' and understand the transaction itself. We decode Letters of Credit and Open Accounts to teach you how to spot price manipulation and phantom shipments.',
    'AML_CFT',
    'ACAMS',
    'ADVANCED',
    40,
    350,
    'USD',
    '{"LIVE_VIRTUAL","IN_PERSON"}'::text[],
    true,
    true,
    7,
    '/images/certifications/trade-based-money-laundering.jpg',
    '/images/certifications/tbml-flyer.png',
    '[{"name":"Weekday Batch","schedule":"Mon – Thu","duration":"5:00 PM – 9:00 PM (Dubai Time)"},{"name":"Weekend Batch","schedule":"Sat & Sun","duration":"9:00 AM – 1:00 PM (Dubai Time)"},{"name":"Corporate / In-House","schedule":"Customized schedule and delivery","duration":"Concise 2-day workshop"}]'::jsonb,
    '["Understand Trade & Trade Finance Fundamentals: Learn how goods move across borders, how trade is financed, key trade documents, Incoterms, payment methods, and trade finance products such as documentary credits, collections, guarantees, and trade loans.","Identify Trade-Based Financial Crime Risk: Assess TBML risk across customers, jurisdictions, products, and channels, including shell companies, dual-use goods, high-risk trade corridors, and complex delivery models.","Recognize TBML Typologies & Trade Abuse: Understand common TBML techniques such as over-/under-invoicing, misrepresentation of goods, document manipulation, trade diversion, and U-turn transactions using real-world case examples.","Understand Sanctions & Tax Evasion Through Trade: Explore how trade is used to evade sanctions, arms embargoes, VAT, customs duties, and export controls, including transshipment and open-sea cargo switching.","Apply Global Guidance & Controls: Learn expected controls such as KYC in trade, trade activity screening, trade cost awareness, digital trade documentation, AI-enabled monitoring, and network analysis in investigations.","Successfully Complete the ACAMS TBML Assessment: Prepare to confidently pass the 20-question final assessment and earn your official ACAMS TBML Certificate and credits."]'::jsonb,
    '["Trade Finance Operations Teams","AML & Transaction Monitoring Analysts","Sanctions Compliance Officers","Import/Export & Logistics Pros","Risk Managers & MLROs"]'::jsonb,
    '[{"question":"Is this suitable for beginners?","answer":"We recommend having a basic understanding of banking or trade finance flows before taking this advanced course."}]'::jsonb,
    '[{"title":"🏦 Financial Sector Professionals","roles":["Trade Finance Operations & Processing Teams","AML, CDD, EDD & Transaction Monitoring Analysts","Sanctions & Export Control Compliance Officers","Correspondent Banking & Payments Teams","MLRO / Deputy MLRO","Risk Management & Compliance Officers","Internal Audit & Compliance Testing Teams"]},{"title":"🏢 Non-Financial Sector Professionals","roles":["Import / Export & Trade Compliance Officers","Shipping, Logistics & Freight Forwarding Professionals","DPMS Sector (Dealers in Precious Metals & Stones)","Corporate Legal, Governance & Risk Teams","Free Zone Compliance Officers","Consultants & Advisory Professionals"]}]'::jsonb,
    '{"title":"Why Choose Edu-Dubai?","description":"You cannot learn trade fraud from a book; you need to see the documents. We host a live document workshop in every session.","points":["Expert-Led Instruction: Training delivered by senior AML, sanctions, and trade finance professionals with real-world experience in banking, exchange houses, and regulatory compliance.","Official ACAMS-Aligned Coverage: Our training strictly aligns with the official ACAMS TBML certificate syllabus and learning outcomes.","Real-World Trade Case Studies: Understand TBML risk using realistic trade scenarios, red flags, and enforcement-driven examples.","Small Interactive Batches: Limited participants per batch to ensure discussion, clarity, and instructor interaction.","Flexible Delivery Formats: Live virtual sessions, structured workshops, or customized in-house training for banks and corporates.","Assessment & Certificate Guidance: Clear guidance on completing the ACAMS assessment and earning your certificate and credits.","Career Foundation Value: Ideal stepping-stone for advanced certifications such as CAMS, CGSS, CAFS, and specialist financial crime roles."]}'::jsonb,
    '{"questions":"20 MCQs","duration":"~4 Hours (Self-Paced)","passingScore":"80%","format":"Online Assessment","requirements":[{"title":"Exam Eligibility & Requirements","items":["Prerequisites: None","Study Format: Online, self-paced (with guided support through EduDubai)","Attempts: Multiple attempts allowed","Certificate: Digital ACAMS TBML Certificate upon passing","Credits Earned: 4 ACAMS Credits","Validity: Certificate does not expire","Language: English"]},{"title":"Disclaimer","items":["Assessment access, certificate issuance, and credit allocation are governed by ACAMS. Training fees charged by EduDubai are separate from ACAMS certificate fees."]}]}'::jsonb,
    '{"whatIs":"The Trade Finance and Trade-Based Money Laundering (TBML) Certificate is an official ACAMS program designed to build a strong foundation in international trade, trade finance products, and trade-based financial crime risks.","whyItMatters":"Trade finance is one of the highest-risk yet least-understood areas of financial crime compliance, often exploited through documentation abuse and complex trade structures.","jobReadySkills":"This program builds practical trade finance awareness, enabling professionals to identify TBML red flags, assess trade-related risks, and apply global control and regulatory expectations across AML, sanctions, and compliance functions."}'::jsonb
  )
on conflict (slug) do update set
  legacy_id           = excluded.legacy_id,
  title               = excluded.title,
  short_description   = excluded.short_description,
  long_description    = excluded.long_description,
  category            = excluded.category,
  issuing_body        = excluded.issuing_body,
  level               = excluded.level,
  duration_hours      = excluded.duration_hours,
  price_usd           = excluded.price_usd,
  currency            = excluded.currency,
  delivery_modes      = excluded.delivery_modes,
  featured            = excluded.featured,
  display_order       = excluded.display_order,
  image_url           = excluded.image_url,
  hero_image_url      = excluded.hero_image_url,
  delivery_schedules  = excluded.delivery_schedules,
  outcomes            = excluded.outcomes,
  who_its_for         = excluded.who_its_for,
  faq                 = excluded.faq,
  audience_categories = excluded.audience_categories,
  why_choose_us       = excluded.why_choose_us,
  exam_info           = excluded.exam_info,
  program_overview    = excluded.program_overview;

commit;

-- Verification: expect 8 rows, all published, and the same
-- featured count as the source file (8).
select count(*) as total,
       count(*) filter (where published) as published,
       count(*) filter (where featured) as featured,
       count(*) filter (where jsonb_array_length(outcomes) > 0) as with_outcomes,
       count(*) filter (where jsonb_array_length(faq) > 0) as with_faq
from public.courses;

select slug, legacy_id, level, price_usd, display_order,
       jsonb_array_length(outcomes) as outcomes,
       jsonb_array_length(faq) as faq
from public.courses
order by display_order;
