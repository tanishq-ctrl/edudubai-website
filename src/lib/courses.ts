import { Course, Category, DeliveryMode } from "./types"

export const courses: Course[] = [
  {
    id: "cams",
    slug: "certified-anti-money-laundering-specialist",
    title: "Certified Anti-Money Laundering Specialist (CAMS)",
    shortDescription: "The CAMS designation is recognized worldwide by regulators, financial institutions, and law enforcement as the benchmark for AML/CFT competence.",
    longDescription: "The CAMS designation is recognized worldwide by regulators, financial institutions, and law enforcement as the benchmark for AML/CFT competence. This comprehensive preparation course equips you with the strategies to detect and prevent financial crime, covering everything from money laundering methods to the practical implementation of a compliance program. You will master the critical pillars of AML—Risk Assessment, Internal Controls, Independent Audit, and Training—ensuring you are fully prepared to pass the exam and protect your organization from regulatory risk.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Batch",
        schedule: "Mon – Thu",
        duration: "5:00 PM – 9:00 PM (Dubai Time)"
      },
      {
        name: "Weekend Batch",
        schedule: "Sat & Sun",
        duration: "9:00 AM – 1:00 PM (Dubai Time)"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized schedule and delivery",
        duration: "Concise 2–4 day format"
      }
    ],
    level: "ADVANCED",
    duration: 100,
    priceUsd: 350,
    currency: "USD",
    outcomes: [
      "Understand ML/TF Methods: Across banks, insurance, MSBs, DNFBPs, and real estate sectors",
      "Master Global Standards: FATF, Basel, Wolfsberg, EU AMLD, USA PATRIOT Act, OFAC",
      "Build AML Programs: KYC/CDD, EDD, governance, controls, and monitoring systems",
      "Conduct Investigations: SAR/STR filing, fund tracing, law enforcement coordination",
      "Apply Risk-Based Judgment: Enterprise-wide risk assessment, sanctions decisions, audit response"
    ],
    whoItsFor: [
      "Compliance Officers",
      "AML Analysts",
      "Bankers",
      "Auditors",
      "Risk Managers"
    ],
    programOverview: {
      whatIs: "A scenario-driven, regulator-aligned CAMS® preparation program designed to help professionals Prepare, Apply, and Defend compliance decisions. Aligned with ACAMS Candidate Handbook & Exam Blueprint.",
      whyItMatters: "As financial crime grows more complex, regulators expect professionals to demonstrate strong judgment, defensibility, and accountability. This program builds regulator-ready thinking.",
      jobReadySkills: "Develop practical AML skills to: Handle real investigations, Manage alerts and escalations, Draft defensible SAR/STRs, Support audits and regulators, and Manage sanctions and PEP risk."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Institutions",
        roles: ["Compliance Officers", "AML Investigators", "Risk Managers", "Internal Auditors", "Bankers"]
      },
      {
        title: "⚖️ Law & Regulation",
        roles: ["Regulators", "FIU Staff", "Law Enforcement", "Legal Counsel", "Governance Officers"]
      },
      {
        title: "🏢 Industry & DNFBPs",
        roles: ["Exchange Houses", "MSBs", "Real Estate", "TCSPs", "Auditors", "Consultants"]
      }
    ],
    examInfo: {
      questions: "120",
      duration: "210 Minutes (3.5 Hours)",
      passingScore: "75%",
      format: "Online Proctored Exam",
      requirements: [
        { title: "Eligibility", items: ["Open to AML & Compliance Professionals", "No mandatory prerequisites"] },
        { title: "Training", items: ["25 Days × 4 Hours = 100 Hours", "5 Full Mock Exams", "Performance Reviews"] },
        { title: "Registration Process", items: ["Enroll with Edu-Dubai", "Complete Training", "Register on ACAMS®", "Schedule Exam", "Get Certified"] },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by ACAMS. Training fees charged by EduDubai are separate from ACAMS certificate fees."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "While other institutes offer \"crash courses\" of just 30–32 hours, Edu-Dubai provides a full 100-Hour Flagship Program. This ensures you meet the strict 40 Eligibility Credits required by ACAMS to even register for the exam.",
      points: [
        "Expert Training: Regulator-aligned instructors with MENA experience.",
        "Quality Learning: Scenario-based, exam-focused, practical approach.",
        "Resources: Mock exams, simulations, case labs.",
        "Support: Ongoing mentoring and extended exam support.",
        "Ethics First: No dumps. No shortcuts. No compromises."
      ]
    },
    faq: [
      {
        question: "Do I need prior experience?",
        answer: "While ACAMS recommends experience, our course covers the fundamentals, making it accessible for baseline professional knowledge."
      },
      {
        question: "Is the exam fee included?",
        answer: "No, the ACAMS exam fee is paid directly to ACAMS. Our fee covers the expert-led training and preparation."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/certified-anti-money-laundering-specialist.jpg",
    heroImageUrl: "/images/certifications/cams-flyer.png",
    issuingBody: "ACAMS"
  },
  {
    id: "cgss",
    slug: "certified-global-sanctions-specialist",
    title: "Certified Global Sanctions Specialist (CGSS®)",
    shortDescription: "In an era of rapid geopolitical change, Sanctions Compliance has become a critical skill. The CGSS course dives deep into the complex web of UN, EU, and OFAC sanctions regimes.",
    longDescription: "In an era of rapid geopolitical change, Sanctions Compliance has become a critical skill. The CGSS course dives deep into the complex web of UN, EU, and OFAC sanctions regimes. This training moves beyond basic lists to teach you the logic of sanctions—how to screen effectively, how to investigate false positives versus true hits, and how to manage the risks of evasion techniques like stripping and nesting.",
    category: "SANCTIONS",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Batch",
        schedule: "Mon – Thu",
        duration: "5:00 PM – 9:00 PM (Dubai Time)"
      },
      {
        name: "Weekend Batch",
        schedule: "Sat & Sun",
        duration: "9:00 AM – 1:00 PM (Dubai Time)"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized schedule and delivery",
        duration: "Concise 2–4 day format"
      }
    ],
    level: "ADVANCED",
    duration: 40,
    priceUsd: 350,
    currency: "USD",
    outcomes: [
      "Understand the history, purpose, and types of sanctions (Sectoral, Comprehensive, Targeted)",
      "Navigate the differences between OFAC (USA), UN, and EU sanctions",
      "Master best practices for name and payment screening, including fuzzy logic and resolving false positives",
      "Detect stripping, nesting, and trade-based sanctions evasion",
      "Conduct in-depth sanctions investigations and regulatory reporting"
    ],
    whoItsFor: [
      "Sanctions Screening Analysts",
      "Trade Finance Professionals",
      "Legal Counsel",
      "Compliance Staff",
      "Sanctions Compliance Officers and Managers"
    ],
    programOverview: {
      whatIs: "The Certified Global Sanctions Specialist (CGSS) is ACAMS' premier certification for professionals managing the complex world of global sanctions.",
      whyItMatters: "With global enforcement hitting record highs, organizations need specialists who can interpret complex EU, UN, and OFAC requirements.",
      jobReadySkills: "Master name screening, payment filtering, and evasion detection to protect your firm from multi-billion dollar penalties."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Sector",
        roles: ["Sanctions Compliance Officers", "AML Investigators", "KYC/CDD Teams", "Correspondent Banking Staff", "Trade Finance Operations"]
      },
      {
        title: "🚢 Global Trade & Logistics",
        roles: ["Export/Import Compliance", "Shipping Officers", "Freight Forwarders", "Legal & Risk Governance"]
      }
    ],
    examInfo: {
      questions: "100 MCQ & MRQ",
      duration: "175 Minutes",
      passingScore: "75%",
      format: "Computer-based Exam Proctored via Pearson",
      requirements: [
        {
          title: "Eligibility & Requirements",
          items: [
            "Candidates must hold an active ACAMS membership",
            "Meet the 40 eligibility credit requirement",
            "Apply and register directly through the ACAMS website",
            "Earn 30 recertification credits every three years"
          ]
        },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by ACAMS. Training fees charged by EduDubai are separate from ACAMS certificate fees."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "Sanctions is the hardest topic to self-study because rules change daily. Our course is live, current, and taught by field experts.",
      points: [
        "Sanctions War Rooms: Real-time simulations deciding whether to block transactions involving major regimes.",
        "Trade Finance Focus: Deep dives into shipping documents, Bill of Ladings, and trade-based evasion.",
        "92% Pass Rate: Proven methodology to secure your certification on the first attempt.",
        "MENA Expert Instructors: Taught by professionals with 15+ years experience in UAE and GCC banking."
      ]
    },
    faq: [
      {
        question: "Is this harder than CAMS?",
        answer: "It is more specialized. If you work in Trade Finance or payment filtering, you may find it more relevant and naturally intuitive."
      },
      {
        question: "Does this cover Russia/Iran sanctions?",
        answer: "Yes, we use the most current real-world examples including recent Russia and Middle East sanctions regimes."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/certified-global-sanctions-specialist.jpg",
    heroImageUrl: "/images/certifications/cgss-flyer.png",
    issuingBody: "ACAMS"
  },
  {
    id: "aml-specialist",
    slug: "anti-money-laundering-specialist",
    title: "Anti-Money Laundering Specialist (AMLS)",
    shortDescription: "The GCI Anti-Money Laundering Specialist (AMLS) certification is designed for professionals who need a practical, hands-on understanding of AML.",
    longDescription: "The GCI Anti-Money Laundering Specialist (AMLS) certification is designed for professionals who need a practical, hands-on understanding of AML without the high cost of other global certifications. This course focuses on the 'how-to'—how to write a policy, how to screen a customer, and how to detect a suspicious transaction—making it ideal for operational staff and those new to the field.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Batch",
        schedule: "Mon – Thu",
        duration: "5:00 PM – 9:00 PM (Dubai Time)"
      },
      {
        name: "Weekend Batch",
        schedule: "Sat & Sun",
        duration: "9:00 AM – 1:00 PM (Dubai Time)"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized schedule and delivery",
        duration: "Concise 2–3 day format"
      }
    ],
    level: "INTERMEDIATE",
    duration: 24,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand Money Laundering Cycle: Placement, Layering, and Integration",
      "Master KYC & Onboarding: Practical steps for verifying customer identity",
      "Implement Risk-Based Approach: How to score customers accurately",
      "Learn Reporting: How to draft high-quality Suspicious Transaction Reports (STRs)",
      "Understand the global regulatory landscape for AML/CTF"
    ],
    whoItsFor: [
      "Entry-level Compliance staff",
      "Front-line staff (Tellers, RMs)",
      "Real Estate Agents",
      "Jewelers",
      "Legal and Accounting Professionals"
    ],
    programOverview: {
      whatIs: "The Anti-Money Laundering Specialist (AMLS) is a practical, job-focused certification by GCI designed for operational excellence in AML.",
      whyItMatters: "It provides the essential toolkit for front-line and middle-office staff to detect illicit activity without the academic overhead of other programs.",
      jobReadySkills: "Write effective AML policies, conduct customer risk scoring, and master the art of filing Suspicious Transaction Reports."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Support",
        roles: ["Compliance Assistants", "Transaction Monitors", "Branch Managers", "Customer Service Representatives"]
      },
      {
        title: "💍 Non-Financial Sector (DNFBPs)",
        roles: ["Real Estate Brokers", "Dealers in Precious Metals", "Lawyers", "Accountants", "Art Dealers"]
      }
    ],
    examInfo: {
      questions: "50",
      duration: "90 Minutes",
      passingScore: "70%",
      format: "Multiple Choice Questions",
      requirements: [
        {
          title: "Eligibility",
          items: [
            "Open enrollment",
            "Official AMLS Study Material provided",
            "Online proctored examination"
          ]
        },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "As an Authorized GCI Partner, we provide the official curriculum and exam bundle, ensuring you have everything needed to succeed.",
      points: [
        "Practical Templates: Receive editable KYC forms, risk assessment tools, and STR templates for your firm.",
        "Official Partner: We are the designated partner for GCI training in the MENA region.",
        "Focused Learning: No unnecessary theory—just the tools you need to do your job effectively tomorrow.",
        "Affordable Certification: International designation at a more accessible cost point."
      ]
    },
    faq: [
      {
        question: "Is GCI recognized?",
        answer: "Yes, GCI (Global Compliance Institute) is a recognized international certification body for compliance professionals."
      },
      {
        question: "Is the exam difficult?",
        answer: "The exam is designed to test practical application. Our students maintain a high pass rate due to our hands-on training style."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/anti-money-laundering-specialist.jpg",
    heroImageUrl: "/images/certifications/amls-flyer.png",
    issuingBody: "GCI"
  },
  {
    id: "fatca-crs-specialist",
    slug: "fatca-crs-specialist",
    title: "FATCA & CRS Specialist (FCS®)",
    shortDescription: "Globally recognized FATCA & CRS certification by GCI, accredited by LIBF (UK).",
    longDescription: "The FCS® Certification Program provides comprehensive training on FATCA and CRS implementation, reporting, and governance. Designed to help professionals manage international tax compliance obligations and regulatory reporting with confidence. It is accredited by GCI and The London Institute of Banking & Finance (UK).",
    category: "FATCA_CRS",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Regional Live Virtual Batches",
        schedule: "Twice Every Month",
        duration: "Dubai: 9AM-3PM | India: 10:30AM-4:30PM | Singapore: 1PM"
      },
      {
        name: "Weekend / Fast-Track Batch",
        schedule: "Available on Demand",
        duration: "Intensive Exam-Focused Format"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized",
        duration: "Flexible Delivery"
      }
    ],
    level: "INTERMEDIATE",
    duration: 16,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "FATCA Agreements & Scope: Model 1 & Model 2 IGAs, FFI agreements, Entity classification, Compliance obligations",
      "FATCA Registration & Governance: IRS registration, GIIN management, IDES setup, Certification & renewal, Risk management",
      "FATCA Documentation & Due Diligence: Compliance frameworks, Responsible Officer roles, Pre-existing & new accounts, W-9, W-8BEN, Secrecy waivers",
      "FATCA Reporting: Entity and account reporting, Shareholder reporting, Payment reporting, Pooled and nil reporting",
      "CRS Compliance Management: Participating jurisdictions, Individual & entity accounts, Anti-avoidance rules, FATCA vs CRS comparison"
    ],
    whoItsFor: [
      "FATCA/CRS Officers",
      "Banking & Insurance Professionals",
      "Compliance Managers",
      "Central Bank Staff",
      "Tax Consultants"
    ],
    programOverview: {
      whatIs: "The FCS® Certification Program provides comprehensive training on FATCA and CRS implementation, reporting, and governance. Designed to help professionals manage international tax compliance obligations and regulatory reporting with confidence. Accredited by GCI and The London Institute of Banking & Finance (UK).",
      whyItMatters: "Non-compliance with FATCA and CRS can lead to Regulatory penalties, Withholding taxes, Cross-border restrictions, and Reputational damage. This program enables organizations to Maintain global tax transparency, Reduce compliance risk, and Meet international regulatory expectations.",
      jobReadySkills: "Develop hands-on FATCA & CRS compliance expertise including: Entity classification, Due diligence framework design, Documentation validation, Reportable account identification, Regulatory reporting preparation, and Audit response management."
    },
    audienceCategories: [
      {
        title: "� Financial Institutions",
        roles: ["FATCA/CRS Officers", "Banking & Insurance Professionals", "Brokerage & Investment Teams", "Compliance Managers"]
      },
      {
        title: "🏛️ Regulators & Authorities",
        roles: ["Central Bank Staff", "Tax Authority Officials", "Financial Regulators", "Policy Officers"]
      },
      {
        title: "⚖️ Advisors & Providers",
        roles: ["Tax Consultants", "Legal Advisors", "Reporting System Providers", "RegTech Vendors"]
      }
    ],
    examInfo: {
      questions: "50 Scenario-Based Questions",
      duration: "Online Proctored Exam",
      passingScore: "75%",
      format: "Multiple Choice",
      requirements: [
        { title: "Eligibility", items: ["Open to compliance, tax, and reporting professionals", "No mandatory prerequisites"] },
        { title: "Training Structure", items: ["Duration: 2 Days (Intensive Program)", "Includes:", "Exam Preparation", "Multiple Mock Tests", "Case Simulations"] },
        { title: "Registration Process", items: ["Enroll with Edu-Dubai", "Attend Live Training", "Complete Practice Assessments", "Sit for Proctored Exam", "Receive Certification"] },
        { title: "Personalized Support", items: ["Individual performance assessment", "Half-day free reinforcement (if needed)", "Ongoing mentoring"] },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "Leading professional training provider in the MENA region.",
      points: [
        "Accredited Curriculum: Aligned with global FATCA & CRS standards.",
        "Practical Training: Real implementation case studies.",
        "Advanced Resources: Mock audits and reporting simulations.",
        "Expert Faculty: Trainers with international tax compliance experience.",
        "Extended Support: Free reinforcement sessions if required.",
        "First-Attempt Focus: Our goal is certification success."
      ]
    },
    faq: [
      {
        question: "Is this course too technical?",
        answer: "It is operational. We focus on the forms and the due diligence rather than deep tax legal theory, making it perfect for bank staff."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/fatca-crs-specialist.jpg",
    heroImageUrl: "/images/certifications/fcs-flyer.png",
    issuingBody: "GCI"
  },
  {
    id: "sanctions-compliance-specialist",
    slug: "sanctions-compliance-specialist",
    title: "Sanctions Compliance Specialist (SCS®)",
    shortDescription: "Globally recognized sanctions compliance certification by GCI Australia, accredited by LIBF (UK).",
    longDescription: "The SCS® Certification Program provides comprehensive training in global sanctions compliance, covering UN, EU, OFAC, UK, and Australian frameworks. Designed to help professionals understand, implement, and defend sanctions controls while mitigating regulatory and reputational risk. It is accredited by GCI Australia and The London Institute of Banking & Finance (UK).",
    category: "SANCTIONS",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Evening Batch (Live Virtual)",
        schedule: "Mon – Thu (9th Dec – 19th Dec 2024)",
        duration: "UAE: 5:00 PM – 8:00 PM | India: 6:30 PM – 9:30 PM"
      },
      {
        name: "Weekend Support Sessions",
        schedule: "As per batch schedule",
        duration: "Dedicated Exam Prep & Mock Support"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized",
        duration: "Flexible Delivery Format"
      }
    ],
    level: "INTERMEDIATE",
    duration: 16,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Sanctions & Proliferation Finance: Sanctions, embargoes, CPF concepts, UN, EU, OFAC frameworks, Sectoral/targeted sanctions, Proliferation finance risk indicators",
      "International Sanctions Regimes: UN, EU, UK, US, Australia sanctions systems, Role of regulators and institutions, Global enforcement coordination",
      "Processes & Systems: CAAT tools, Screening system configuration, False positive management, Customer onboarding controls, SWIFT message screening, Wolfsberg Guidance implementation",
      "Reporting & Violation Analysis: Violation report structure, Root cause analysis, Regulatory reporting obligations, Documentation standards",
      "Governance & Controls: Policy design, Risk frameworks, Internal reviews, Remediation planning"
    ],
    whoItsFor: [
      "Sanctions Officers",
      "Compliance Managers",
      "Trade Finance Teams",
      "Remittance Professionals",
      "Risk Officers",
      "Regulators",
      "Screening System Providers"
    ],
    programOverview: {
      whatIs: "The SCS® Certification Program provides comprehensive training in global sanctions compliance, covering UN, EU, OFAC, UK, and Australian frameworks. Designed to help professionals understand, implement, and defend sanctions controls while mitigating regulatory and reputational risk. Accredited by GCI Australia and The London Institute of Banking & Finance (UK).",
      whyItMatters: "Sanctions violations can result in Heavy financial penalties, Criminal liability, Reputational damage, and Regulatory restrictions. This program equips professionals to Prevent breaches, Strengthen screening systems, Improve governance, Respond to regulators, and Build defensible compliance frameworks.",
      jobReadySkills: "Develop practical sanctions compliance capabilities including: Sanctions risk assessment, Name screening optimization, False positive reduction, SWIFT and transaction monitoring, De-risking management, Regulatory reporting, Violation investigation, and Documentation standards. Graduates become operationally ready for sanctions roles."
    },
    audienceCategories: [
      {
        title: "� Financial Institutions",
        roles: ["Sanctions Officers", "Compliance Managers", "Trade Finance Teams", "Remittance Professionals", "Risk Officers"]
      },
      {
        title: "⚖️ Regulators & Authorities",
        roles: ["Central Bank Staff", "FIU Personnel", "Supervisory Officers", "Policy Analysts"]
      },
      {
        title: "🖥️ Technology & Systems",
        roles: ["Screening System Providers", "Compliance Software Teams", "Risk Analytics Professionals"]
      }
    ],
    examInfo: {
      questions: "50 Questions",
      duration: "90 Minutes",
      passingScore: "75%",
      format: "Proctored Exam (Online)",
      requirements: [
        { title: "Eligibility", items: ["Open to compliance, sanctions, and risk professionals", "No mandatory prerequisites"] },
        { title: "Training Structure", items: ["Total Duration: 16 Hours", "Includes:", "10 Hours Exam Preparation", "Multiple Mock Tests", "Practice Screenings"] },
        { title: "Registration Process", items: ["Enroll with Edu-Dubai", "Attend Virtual Training", "Complete Mock Assessments", "Sit for Proctored Exam", "Receive Certification"] },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "Leading professional training provider in the MENA region.",
      points: [
        "Accredited Training: Official SCS-aligned curriculum.",
        "Practical Approach: Real-life violation cases and simulations.",
        "Advanced Resources: Mock screenings and exam simulations.",
        "Expert Faculty: Trainers with international sanctions experience.",
        "Continuous Support: Mentoring until certification."
      ]
    },
    faq: [
      {
        question: "How does this differ from CGSS?",
        answer: "This is a more concise, operationally focused certification ideal for junior to mid-level analysts focused on daily alert clearing."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/sanctions-compliance-specialist.jpg",
    heroImageUrl: "/images/certifications/scs-flyer.png",
    issuingBody: "GCI"
  },
  {
    id: "regulatory-compliance-specialist",
    slug: "regulatory-compliance-specialist",
    title: "Regulatory Compliance Specialist (RCS®)",
    shortDescription: "Globally recognized compliance certification by GCI Australia, accredited by LIBF (UK).",
    longDescription: "The RCS® Certification Program delivers comprehensive training in regulatory compliance, governance, and risk-based supervision. Designed to prepare professionals to manage regulatory inspections, build strong control environments, and demonstrate defensible compliance practices. Accredited by GCI Australia and The London Institute of Banking & Finance (UK).",
    category: "GOVERNANCE",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Live Virtual Intensive Batch",
        schedule: "24th – 28th February 2025",
        duration: "Dubai: 9AM–1PM | India: 10:30AM–3:30PM | Singapore: 1PM–5PM"
      },
      {
        name: "Fast-Track Exam Prep Sessions",
        schedule: "As per Batch Plan",
        duration: "Dedicated Review & Mock Tests"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized",
        duration: "Flexible Delivery"
      }
    ],
    level: "INTERMEDIATE",
    duration: 16,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Global Regulatory Frameworks: BIS, BCBS, GDPR, Local and international regulations, Supervisory expectations",
      "Compliance Testing & Monitoring: Testing methodologies, Control assessments, Policy adherence checks, Risk indicator monitoring",
      "Internal Controls & Governance: Compliance department roles, Collaboration with audit, risk, legal, Board and management reporting",
      "Risk-Based Compliance Management: Residual risk measurement, Control optimization, Continuous monitoring",
      "Regulatory Examinations & Reporting: Audit responses, Breach reporting, Regulator communication, Remediation planning"
    ],
    whoItsFor: [
      "Compliance Officers",
      "Risk Managers",
      "Governance Professionals",
      "Internal Auditors",
      "Operations Managers",
      "Supervisory Staff",
      "Compliance Consultants"
    ],
    programOverview: {
      whatIs: "The RCS® Certification Program delivers comprehensive training in regulatory compliance, governance, and risk-based supervision. Designed to prepare professionals to manage regulatory inspections, build strong control environments, and demonstrate defensible compliance practices. Accredited by GCI Australia and The London Institute of Banking & Finance (UK).",
      whyItMatters: "Regulatory failures can result in Financial penalties, License restrictions, Increased supervision, Management accountability, and Reputational loss. This program empowers professionals to Strengthen governance frameworks, Reduce compliance breaches, Improve examination outcomes, and Build regulator confidence.",
      jobReadySkills: "Develop advanced compliance capabilities including: Regulatory gap analysis, Compliance testing frameworks, Control effectiveness reviews, Risk monitoring systems, Breach management, Regulatory reporting, and Governance oversight."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Institutions",
        roles: ["Compliance Officers", "Risk Managers", "Governance Professionals", "Internal Auditors", "Operations Managers"]
      },
      {
        title: "🏛️ Regulators & Authorities",
        roles: ["Supervisory Staff", "Policy Officers", "Regulatory Analysts"]
      },
      {
        title: "⚖️ Advisory & Consulting",
        roles: ["Compliance Consultants", "Legal Advisors", "Governance Specialists"]
      }
    ],
    examInfo: {
      questions: "50 Multiple-Choice Questions",
      duration: "Online Proctored Exam",
      passingScore: "75%",
      format: "Online Proctored Exam",
      requirements: [
        { title: "Eligibility", items: ["Open to compliance, risk, and governance professionals", "No mandatory prerequisites"] },
        { title: "Training Structure", items: ["Duration: 16 Hours (4 Days × 4 Hours)", "Includes:", "8 Hours Exam Preparation", "Multiple Mock Tests", "Audit Simulations"] },
        { title: "Registration Process", items: ["Enroll with Edu-Dubai", "Attend Live Virtual Sessions", "Complete Practice Assessments", "Sit for Proctored Exam", "Receive Certification"] },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "Leading professional training provider in the MENA region.",
      points: [
        "Accredited Program: Aligned with GCI and LIBF standards.",
        "Practical Learning: Live audits, simulations, and case studies.",
        "Expert Faculty: Senior trainers with regulatory experience.",
        "Advanced Resources: Mock exams and compliance toolkits.",
        "Extended Support: Ongoing mentoring until certification.",
        "Exam Success Focus: First-attempt certification priority."
      ]
    },
    faq: [
      {
        question: "Is this only for banks?",
        answer: "No, the RCS principles are critical for Exchange Houses, Brokers, Real Estate, and Insurance firms as well."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/regulatory-compliance-specialist.jpg",
    heroImageUrl: "/images/certifications/rcs-flyer.png",
    issuingBody: "GCI"
  },
  {
    id: "certified-compliance-manager",
    slug: "certified-compliance-manager",
    title: "Certified Compliance Manager (CCM®)",
    shortDescription: "Flagship leadership certification by GCI Australia for senior compliance professionals.",
    longDescription: "The CCM® Certification Program prepares professionals to think, decide, and defend like senior compliance leaders. Built on EduDubai’s Prepare – Apply – Defend Framework, this regulator-aligned program focuses on enterprise-wide governance across AML/CFT, Sanctions, FATCA/CRS, KYC, and Regulatory Compliance. Fully aligned with GCI’s official CCM Handbook, syllabus, and exam weightage.",
    category: "GOVERNANCE",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday / Evening Batches",
        schedule: "Designed for Working Professionals",
        duration: "Morning & Evening Options (Global Time Zones)"
      },
      {
        name: "Weekend / Fast-Track Batch",
        schedule: "Intensive Exam-Focused Format",
        duration: "As per Batch Plan"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized",
        duration: "Flexible Delivery"
      }
    ],
    level: "ADVANCED",
    duration: 100,
    priceUsd: 1599,
    currency: "USD",
    outcomes: [
      "Customer Onboarding & KYC (26%): Risk-based onboarding, Customer classification, Digital KYC & e-KYC, Lifecycle management, Geographic & product risks",
      "AML & CFT Management (24%): ML/TF typologies, Fintech & virtual assets, Transaction monitoring systems, Correspondent banking risks, Blockchain misuse",
      "Sanctions & Embargoes (21%): Sanctions fundamentals, CPF risks, Screening systems, Payment & trade exposure, Violation reporting",
      "Regulatory Compliance Management (12%): Compliance governance, Regulatory Control Matrix, Examination handling, RFI/RIM processes, Audit vs compliance testing",
      "FATCA & CRS Governance (17%): IGAs & obligations, Registration & GIIN, Documentation, Reporting structures, FATCA vs CRS differences"
    ],
    whoItsFor: [
      "Compliance Officers & Managers",
      "MLROs & Deputies",
      "Risk & Governance Heads",
      "Supervisory Officers",
      "Consultants"
    ],
    programOverview: {
      whatIs: "The CCM® Certification Program prepares professionals to think, decide, and defend like senior compliance leaders. Built on EduDubai’s unique framework, it focuses on enterprise-wide governance across AML/CFT, Sanctions, FATCA/CRS, KYC, and Regulatory Compliance.",
      whyItMatters: "Regulators no longer assess policies alone—they assess Leadership judgment, Governance effectiveness, Control maturity, Accountability, and Decision defensibility. This program empowers you to Prevent systemic compliance failures, Lead regulatory engagements, and Defend decisions confidently.",
      jobReadySkills: "Develop executive-level compliance capabilities including: Enterprise risk governance, Integrated compliance frameworks, Regulatory inspection management, Multi-domain risk supervision, Board reporting, Cross-functional leadership, and Crisis response."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Institutions",
        roles: ["Compliance Officers & Managers", "MLROs & Deputies", "AML Investigators", "Risk & Governance Heads"]
      },
      {
        title: "🏛️ Regulators & Authorities",
        roles: ["Supervisory Officers", "FIU Staff", "Policy Analysts"]
      },
      {
        title: "🏢 Industry & DNFBPs",
        roles: ["Exchange Houses & MSBs", "Real Estate & TCSPs", "Lawyers & Auditors", "Consultants"]
      }
    ],
    examInfo: {
      questions: "150 Multiple-Choice Questions",
      duration: "180 Minutes",
      passingScore: "75% (Minimum 50% per Module)",
      format: "Online Proctored Exam",
      requirements: [
        { title: "Eligibility", items: ["Compliance, risk, and governance professionals", "Senior and mid-management roles preferred"] },
        { title: "Training Structure", items: ["Instructor-Led: 20 Days × 5 Hours = 100 Hours", "Guided Self-Study (GCI Standards)", "Scenario Reviews", "Mock Exams"] },
        { title: "Registration Process", items: ["Enroll with EduDubai", "Attend Instructor-Led Program", "Complete Guided Study", "Attempt Mock Exams", "Sit for Proctored Exam", "Receive Certification"] },
        { title: "Personalized Support", items: ["Individual performance assessment", "Free reinforcement sessions", "Weak-area strengthening", "Exam confidence building"] },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by GCI. Training fees charged by EduDubai are separate from GCI certificate fees unless specified otherwise in a bundle."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "Available Across: India | UAE | GCC | Southeast Asia | Africa | MENA",
      points: [
        "Prepare – Apply – Defend Framework: Unique leadership-oriented methodology.",
        "Full Exam Alignment: Mapped to GCI syllabus & weightage.",
        "Scenario-Based Learning: No memorization. No dumps.",
        "Senior Faculty: Trainers with regulatory leadership experience.",
        "Extended Mentorship: Support until certification.",
        "First-Attempt Success Focus: Performance over participation."
      ]
    },
    faq: [
      {
        question: "Is this much harder than Specialist courses?",
        answer: "Yes, it tests strategic decision-making and function management, not just operational steps."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/certified-compliance-manager.jpg",
    heroImageUrl: "/images/certifications/ccm-flyer.png",
    issuingBody: "GCI"
  },
  {
    id: "tbml",
    slug: "trade-based-money-laundering",
    title: "Trade Finance and Trade-Based Money Laundering (TBML)",
    shortDescription: "Trade-Based Money Laundering (TBML) is widely recognized as the most complex method of moving illicit value.",
    longDescription: "Trade-Based Money Laundering (TBML) is widely recognized as the most complex method of moving illicit value. This specialized course is designed for Trade Finance and Compliance professionals who need to look beyond the 'name screen' and understand the transaction itself. We decode Letters of Credit and Open Accounts to teach you how to spot price manipulation and phantom shipments.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Batch",
        schedule: "Mon – Thu",
        duration: "5:00 PM – 9:00 PM (Dubai Time)"
      },
      {
        name: "Weekend Batch",
        schedule: "Sat & Sun",
        duration: "9:00 AM – 1:00 PM (Dubai Time)"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customized schedule and delivery",
        duration: "Concise 2-day workshop"
      }
    ],
    level: "ADVANCED",
    duration: 40,
    priceUsd: 350,
    currency: "USD",
    outcomes: [
      "Understand Trade & Trade Finance Fundamentals: Learn how goods move across borders, how trade is financed, key trade documents, Incoterms, payment methods, and trade finance products such as documentary credits, collections, guarantees, and trade loans.",
      "Identify Trade-Based Financial Crime Risk: Assess TBML risk across customers, jurisdictions, products, and channels, including shell companies, dual-use goods, high-risk trade corridors, and complex delivery models.",
      "Recognize TBML Typologies & Trade Abuse: Understand common TBML techniques such as over-/under-invoicing, misrepresentation of goods, document manipulation, trade diversion, and U-turn transactions using real-world case examples.",
      "Understand Sanctions & Tax Evasion Through Trade: Explore how trade is used to evade sanctions, arms embargoes, VAT, customs duties, and export controls, including transshipment and open-sea cargo switching.",
      "Apply Global Guidance & Controls: Learn expected controls such as KYC in trade, trade activity screening, trade cost awareness, digital trade documentation, AI-enabled monitoring, and network analysis in investigations.",
      "Successfully Complete the ACAMS TBML Assessment: Prepare to confidently pass the 20-question final assessment and earn your official ACAMS TBML Certificate and credits."
    ],
    whoItsFor: [
      "Trade Finance Operations Teams",
      "AML & Transaction Monitoring Analysts",
      "Sanctions Compliance Officers",
      "Import/Export & Logistics Pros",
      "Risk Managers & MLROs"
    ],
    programOverview: {
      whatIs: "The Trade Finance and Trade-Based Money Laundering (TBML) Certificate is an official ACAMS program designed to build a strong foundation in international trade, trade finance products, and trade-based financial crime risks.",
      whyItMatters: "Trade finance is one of the highest-risk yet least-understood areas of financial crime compliance, often exploited through documentation abuse and complex trade structures.",
      jobReadySkills: "This program builds practical trade finance awareness, enabling professionals to identify TBML red flags, assess trade-related risks, and apply global control and regulatory expectations across AML, sanctions, and compliance functions."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Sector Professionals",
        roles: [
          "Trade Finance Operations & Processing Teams",
          "AML, CDD, EDD & Transaction Monitoring Analysts",
          "Sanctions & Export Control Compliance Officers",
          "Correspondent Banking & Payments Teams",
          "MLRO / Deputy MLRO",
          "Risk Management & Compliance Officers",
          "Internal Audit & Compliance Testing Teams"
        ]
      },
      {
        title: "🏢 Non-Financial Sector Professionals",
        roles: [
          "Import / Export & Trade Compliance Officers",
          "Shipping, Logistics & Freight Forwarding Professionals",
          "DPMS Sector (Dealers in Precious Metals & Stones)",
          "Corporate Legal, Governance & Risk Teams",
          "Free Zone Compliance Officers",
          "Consultants & Advisory Professionals"
        ]
      }
    ],
    examInfo: {
      questions: "20 MCQs",
      duration: "~4 Hours (Self-Paced)",
      passingScore: "80%",
      format: "Online Assessment",
      requirements: [
        {
          title: "Exam Eligibility & Requirements",
          items: [
            "Prerequisites: None",
            "Study Format: Online, self-paced (with guided support through EduDubai)",
            "Attempts: Multiple attempts allowed",
            "Certificate: Digital ACAMS TBML Certificate upon passing",
            "Credits Earned: 4 ACAMS Credits",
            "Validity: Certificate does not expire",
            "Language: English"
          ]
        },
        {
          title: "Disclaimer",
          items: [
            "Assessment access, certificate issuance, and credit allocation are governed by ACAMS. Training fees charged by EduDubai are separate from ACAMS certificate fees."
          ]
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "You cannot learn trade fraud from a book; you need to see the documents. We host a live document workshop in every session.",
      points: [
        "Expert-Led Instruction: Training delivered by senior AML, sanctions, and trade finance professionals with real-world experience in banking, exchange houses, and regulatory compliance.",
        "Official ACAMS-Aligned Coverage: Our training strictly aligns with the official ACAMS TBML certificate syllabus and learning outcomes.",
        "Real-World Trade Case Studies: Understand TBML risk using realistic trade scenarios, red flags, and enforcement-driven examples.",
        "Small Interactive Batches: Limited participants per batch to ensure discussion, clarity, and instructor interaction.",
        "Flexible Delivery Formats: Live virtual sessions, structured workshops, or customized in-house training for banks and corporates.",
        "Assessment & Certificate Guidance: Clear guidance on completing the ACAMS assessment and earning your certificate and credits.",
        "Career Foundation Value: Ideal stepping-stone for advanced certifications such as CAMS, CGSS, CAFS, and specialist financial crime roles."
      ]
    },
    faq: [
      {
        question: "Is this suitable for beginners?",
        answer: "We recommend having a basic understanding of banking or trade finance flows before taking this advanced course."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/trade-based-money-laundering.jpg",
    heroImageUrl: "/images/certifications/tbml-flyer.png",
    issuingBody: "ACAMS"
  },
  /*
    {
      id: "cma",
      slug: "certified-management-accountant",
      title: "Certified Management Accountant (CMA)",
      shortDescription: "The CMA is the gold standard in management accounting and financial management.",
      longDescription: "The Certified Management Accountant (CMA) credential is the advanced professional certification that delivers tangible value. It is the global benchmark for management accountants and financial professionals. Master the skills of strategic financial management and performance measurement—ensuring you are ready to drive business results in a complex global economy.",
      category: "TAX",
      deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
      deliverySchedules: [
        {
          name: "Morning Batch",
          schedule: "Sun – Wed",
          duration: "10:00 AM – 1:00 PM (Dubai Time)"
        },
        {
          name: "Weekend Batch",
          schedule: "Sat",
          duration: "10:00 AM – 4:00 PM (Dubai Time)"
        }
      ],
      level: "ADVANCED",
      duration: 60,
      priceUsd: 850,
      currency: "USD",
      outcomes: [
        "Master Financial Planning, Performance, and Analytics",
        "Gain expertise in Strategic Financial Management",
        "Prepare for the Part 1 and Part 2 CMA exams with confidence",
        "Learn to apply management accounting principles in real-world scenarios",
        "Understand ethics in the professional accounting environment"
      ],
      whoItsFor: [
        "Finance Managers",
        "Cost Accountants",
        "Financial Analysts",
        "Budgeting Managers",
        "Strategic Planners"
      ],
      programOverview: {
        whatIs: "The CMA is a globally recognized certification that validates your expertise in financial planning, analysis, control, and decision support.",
        whyItMatters: "CMAs earn more and advance faster. It proves your ability to think strategically and lead finance functions.",
        jobReadySkills: "Performance measurement, budgeting, risk management, and strategic financial decision making."
      },
      audienceCategories: [
        {
          title: "📈 Finance & Strategy",
          roles: ["Financial Controllers", "CFOs", "Strategy Analysts", "FP&A Professionals"]
        }
      ],
      examInfo: {
        questions: "100 MCQs + 2 Essay Scenarios",
        duration: "4 Hours (Each Part)",
        passingScore: "360/500",
        format: "Computer Based",
        requirements: [
          "Bachelor's Degree",
          "2 Years Professional Experience",
          "Active IMA Membership"
        ]
      },
      whyChooseUs: {
        title: "Why Choose Edu-Dubai?",
        description: "As a Hock International partner, we provide the best-in-class study materials and diagnostic tools to ensure you pass on your first try.",
        points: [
          "Hock Study Suite: Access to world-class videos, textbooks, and test banks.",
          "Progress Tracking: Weekly feedback on your performance and focus areas.",
          "Exam Simulation: Practice under real exam conditions with our software.",
          "Expert Coaching: Learn from industry veterans who simplify complex concepts."
        ]
      },
      faq: [
        {
          question: "How many parts are in the CMA exam?",
          answer: "There are two parts: Part 1 (Financial Planning, Performance, and Analytics) and Part 2 (Strategic Financial Management)."
        }
      ],
      featured: true,
      imageUrl: "/images/certifications/certified-management-accountant.jpg",
      issuingBody: "HOCK_INTERNATIONAL"
    },
    {
      id: "cia",
      slug: "certified-internal-auditor",
      title: "Certified Internal Auditor (CIA)",
      shortDescription: "The CIA is the only globally recognized certification for internal auditors.",
      longDescription: "The Certified Internal Auditor (CIA) designation is the only globally recognized certification for internal auditors. CIAs are equipped with the skills and knowledge to conduct effective internal audits, manage risk, and add value to their organizations. This course covers everything from the basics of internal auditing to advanced topics like risk management and governance.",
      category: "GOVERNANCE",
      deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
      deliverySchedules: [
        {
          name: "Evening Batch",
          schedule: "Mon & Wed",
          duration: "6:30 PM – 9:30 PM (Dubai Time)"
        },
        {
          name: "Weekend Intensive",
          schedule: "Fri",
          duration: "2:00 PM – 8:00 PM (Dubai Time)"
        }
      ],
      level: "ADVANCED",
      duration: 50,
      priceUsd: 820,
      currency: "USD",
      outcomes: [
        "Master the Fundamentals of Internal Auditing",
        "Understand Internal Audit Practice and Knowledge Elements",
        "Prepare for all three parts of the CIA exam",
        "Learn to assess risk and evaluate internal controls",
        "Develop skills in governance, risk, and control (GRC)"
      ],
      whoItsFor: [
        "Internal Auditors",
        "External Auditors",
        "Compliance Officers",
        "Risk Management Professionals",
        "Accounting Students"
      ],
      programOverview: {
        whatIs: "The CIA is the premier global certification for internal audit professionals, awarded by the IIA.",
        whyItMatters: "CIA status proves your professionalism and commitment to the industry standard for internal audit excellence.",
        jobReadySkills: "Internal control evaluation, risk management auditing, and organizational governance oversight."
      },
      audienceCategories: [
        {
          title: "🛡️ Audit & Risk",
          roles: ["Chief Audit Executives", "Audit Managers", "IT Auditors", "GRC Specialists"]
        }
      ],
      examInfo: {
        questions: "125 (Part 1), 100 (Part 2 & 3)",
        duration: "150 mins (Part 1), 120 mins (Part 2 & 3)",
        passingScore: "600/750",
        format: "MCQ (Multiple Choice)",
        requirements: [
          "Bachelor's Degree or Equivalent",
          "Character Reference",
          "Verified Professional Experience"
        ]
      },
      whyChooseUs: {
        title: "Why Choose Edu-Dubai?",
        description: "We use Hock International's award-winning curriculum to ensure our students have the most comprehensive audit training in the UAE.",
        points: [
          "Hock Adaptive Learning: Focuses your study time on your weakest areas.",
          "Interactive Workshops: Dive deep into real-world audit scenarios.",
          "Mock Exams: Full-length simulations to build exam stamina.",
          "Certified Experts: Learn from instructors who hold the CIA designation themselves."
        ]
      },
      faq: [
        {
          question: "Is the exam fee separate?",
          answer: "Yes, exam registration and fees are handled directly with The IIA."
        }
      ],
      featured: true,
      imageUrl: "/images/certifications/certified-internal-auditor.jpg",
      issuingBody: "HOCK_INTERNATIONAL"
    },
  */
]

// Helper functions
export function getAllCourses(): Course[] {
  return courses
}

export function getFeaturedCourses(): Course[] {
  return courses.filter(course => course.featured)
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug)
}

export function getCategories(): Category[] {
  return Array.from(new Set(courses.map(course => course.category))) as Category[]
}

export function getCoursesByCategory(category: Category): Course[] {
  return courses.filter(course => course.category === category)
}

export function getCoursesByIssuingBody(body: string): Course[] {
  return courses.filter(course => course.issuingBody === body)
}

export function getCoursesByDeliveryMode(mode: DeliveryMode): Course[] {
  return courses.filter(course => course.deliveryModes.includes(mode))
}
