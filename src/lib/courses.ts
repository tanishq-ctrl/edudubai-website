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
      "Understand how money launderers and terrorist financiers move funds through banks, insurance, and DNFBPs",
      "Master FATF 40 Recommendations, EU Directives, and the USA PATRIOT Act",
      "Build an effective AML compliance program, including KYC/CDD and Enhanced Due Diligence (EDD)",
      "Conduct internal investigations and file Suspicious Activity Reports (SARs/STRs)",
      "Master the critical pillars of AML—Risk Assessment, Internal Controls, Independent Audit, and Training"
    ],
    whoItsFor: [
      "Compliance Officers",
      "AML Analysts",
      "Bankers",
      "Auditors",
      "Risk Managers"
    ],
    programOverview: {
      whatIs: "The Certified Anti-Money Laundering Specialist (CAMS) is the global gold standard in AML certifications, recognized by financial institutions and regulators worldwide.",
      whyItMatters: "As financial crime becomes more sophisticated, the demand for certified AML professionals is at an all-time high. CAMS proves your expertise in detecting and preventing money laundering.",
      jobReadySkills: "Learn to build robust AML frameworks, conduct effective customer due diligence, and satisfy regulatory requirements in the MENA region and beyond."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Institutions",
        roles: ["Compliance Officers", "AML Investigators", "Risk Managers", "Internal Auditors", "Retail & Commercial Bankers"]
      },
      {
        title: "⚖️ Law & Regulation",
        roles: ["Law Enforcement Agents", "Regulators", "Legal Counsel", "Financial Intelligence Unit Staff"]
      }
    ],
    examInfo: {
      questions: "120",
      duration: "210 Minutes",
      passingScore: "75/120 (approx. 63%)",
      format: "Multiple Choice & Multiple Select",
      requirements: [
        "40 Eligibility Credits (Education, Experience, Training)",
        "Active ACAMS Membership",
        "Official CAMS Study Guide Mastery"
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "While other institutes offer \"crash courses\" of just 30–32 hours, Edu-Dubai provides a full 100-Hour Flagship Program. This ensures you meet the strict 40 Eligibility Credits required by ACAMS to even register for the exam.",
      points: [
        "Pass Guarantee: We offer free retraining in our next batch if you don't pass.",
        "AI-Driven Mock Exams: Practice with simulations that mimic the actual ACAMS exam environment.",
        "Expert Practitioners: Learn from instructors with decades of field experience in MENA banking.",
        "MENA Focus: Real-world cases from UAE, Saudi Arabia, and regional financial hubs."
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
        "Candidates must hold an active ACAMS membership",
        "Meet the 40 eligibility credit requirement",
        "Apply and register directly through the ACAMS website",
        "Earn 30 recertification credits every three years"
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
        "Open enrollment",
        "Official AMLS Study Material provided",
        "Online proctored examination"
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
    issuingBody: "GCI"
  },
  {
    id: "fatca-crs-specialist",
    slug: "fatca-crs-specialist",
    title: "FATCA & CRS Specialist (FCS)",
    shortDescription: "The Foreign Account Tax Compliance Act (FATCA) and Common Reporting Standard (CRS) are mandatory for almost all financial institutions today.",
    longDescription: "The Foreign Account Tax Compliance Act (FATCA) and Common Reporting Standard (CRS) are mandatory for almost all financial institutions today. This specialized course demystifies the complex IRS forms and OECD standards. We transform 'tax jargon' into clear operational steps, teaching you exactly how to classify customers, validate W-8/W-9 forms, and manage the annual reporting cycle.",
    category: "FATCA_CRS",
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
        duration: "Concise 2-day format"
      }
    ],
    level: "INTERMEDIATE",
    duration: 16,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand FATCA vs. CRS: The key differences in scope and implementation",
      "Master Entity Classification: FFI, NFFE, and Active vs. Passive entities",
      "Learn Documentation: How to correctly validate IRS Forms W-9 and W-8 series",
      "Identify Indicia: US status and foreign tax residency indicators",
      "Master the reporting process for local and international authorities"
    ],
    whoItsFor: [
      "Tax Officers",
      "Finance Managers",
      "Client Onboarding & KYC Teams",
      "Investment Fund Administrators",
      "Responsible Officers (ROs)"
    ],
    programOverview: {
      whatIs: "FATCA & CRS Specialist (FCS) is a critical operational certification covering US and international automatic exchange of information (AEOI) requirements.",
      whyItMatters: "Regulators heavily penalize firms for incorrect tax classification. Expertise in AEOI is a must-have for modern financial institutions.",
      jobReadySkills: "Validate complex tax forms, manage annual reporting cycles, and ensure your firm stays compliant with international tax treaties."
    },
    audienceCategories: [
      {
        title: "🏢 Banking & Finance",
        roles: ["Tax Compliance Officers", "KYC Managers", "Operations Staff", "Finance Leads"]
      },
      {
        title: "💼 Asset Management",
        roles: ["Fund Administrators", "Wealth Managers", "Custodial Service Teams"]
      }
    ],
    examInfo: {
      questions: "50",
      duration: "90 Minutes",
      passingScore: "70%",
      format: "Multiple Choice Questions",
      requirements: [
        "Proctored online exam",
        "Official GCI study guide",
        "Open to all professionals"
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "We turn complex tax Law into simple bank Operations. We speak the language of the Front Office, not just tax lawyers.",
      points: [
        "No Tax Jargon: We teach you how to look at a passport and determine tax status without needing a law degree.",
        "Form W-8 Mastery: Detailed workshops on validating the most difficult IRS forms to process.",
        "The Nil Report Guide: Step-by-step instructions on filing when you have zero reportable accounts.",
        "Local MENA Context: Focus on the reporting portals used in UAE, KSA, and Bahrain."
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
    issuingBody: "GCI"
  },
  {
    id: "sanctions-compliance-specialist",
    slug: "sanctions-compliance-specialist",
    title: "Sanctions Compliance Specialist (SCS)",
    shortDescription: "While other sanctions courses focus on law, the GCI Sanctions Compliance Specialist (SCS) focuses on operations.",
    longDescription: "While other sanctions courses focus on law, the GCI Sanctions Compliance Specialist (SCS) focuses on operations. This course is perfect for the staff who actually sit behind the screen: the people clearing alerts and processing payments. We cover the 'Three Pillars' of Sanctions—Processes, Systems, and Reports—to ensure your team knows exactly which button to push and why.",
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
        duration: "Concise 2–3 day format"
      }
    ],
    level: "INTERMEDIATE",
    duration: 24,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand Sanctions Lists: UN, EU, OFAC, and local MENA lists",
      "Master Name Screening: Algorithms (Fuzzy logic) and handling false positives",
      "Analyze SWIFT Messages: Spotting risks in MT103/MT202 messages",
      "Identify Trade red flags: Dual-use goods and shipping anomalies",
      "Manage escalation protocols for true sanctions hits"
    ],
    whoItsFor: [
      "Payment Operations Staff",
      "Trade Finance Officers",
      "Sanctions Alerts Investigators",
      "Sanctions Compliance Officers"
    ],
    programOverview: {
      whatIs: "The Sanctions Compliance Specialist (SCS) is an operational certification by GCI for the professionals clearing daily screening alerts.",
      whyItMatters: "Processes and systems are only as good as the people running them. SCS ensures your team has the technical skill to clear false hits safely.",
      jobReadySkills: "Decode SWIFT messages, fine-tune fuzzy logic algorithms, and master the investigative path for sanctions alerts."
    },
    audienceCategories: [
      {
        title: "🏧 Banking Operations",
        roles: ["Payment Clearers", "SWIFT Desk Staff", "Alert Investigators", "Remittance Teams"]
      },
      {
        title: "🏛️ Regulatory",
        roles: ["Compliance Testers", "Internal Auditors", "Regulatory Reporting Teams"]
      }
    ],
    examInfo: {
      questions: "50",
      duration: "90 Minutes",
      passingScore: "70%",
      format: "Multiple Choice",
      requirements: [
        "Official SCS Material",
        "Online exam",
        "No prior prerequisites"
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "This is the only course in the market designed specifically for the 'Alert Investigator.'",
      points: [
        "Tools Over Theory: Learn why 'Mohammad Ali' matches 'Mhd Aly' and how to justify closing the alert correctly.",
        "SWIFT Message Decoding: We teach you how to read raw MT messages to spot hidden sanctions evasion.",
        "Operational Roadmap: Practical workflows for escalating and blocking transactions in real-time.",
        "MENA Authority: Focus on regional sanctions and local reporting requirements."
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
    issuingBody: "GCI"
  },
  {
    id: "regulatory-compliance-specialist",
    slug: "regulatory-compliance-specialist",
    title: "Regulatory Compliance Specialist (RCS)",
    shortDescription: "Compliance is more than just stopping money laundering—it is about managing the relationship with your regulator.",
    longDescription: "Compliance is more than just stopping money laundering—it is about managing the relationship with your regulator. The RCS course covers the broader scope of the Compliance Officer's role. From managing regulatory correspondence to conducting 'Compliance Monitoring' visits within your own firm, this course teaches you how to be an effective internal guardian of ethics and rules.",
    category: "GOVERNANCE",
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
        duration: "Concise 3-day format"
      }
    ],
    level: "INTERMEDIATE",
    duration: 24,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand The Compliance Function: Independence and structure",
      "Manage Regulatory Relationships: Handling inspections and Central Bank letters",
      "Implement Risk-Based Monitoring: Creating an effective Monitoring Plan (CMP)",
      "Manage Conflict of Interest: Chinese Walls, gifts, and personal dealing",
      "Establish internal governance and ethics frameworks"
    ],
    whoItsFor: [
      "Newly appointed Compliance Officers",
      "Internal Auditors moving into Compliance",
      "Managers in regulated entities",
      "Regulatory Affairs Specialists"
    ],
    programOverview: {
      whatIs: "Regulatory Compliance Specialist (RCS) covers the broad governance and regulatory management responsibilities of a compliance officer.",
      whyItMatters: "Technical AML skill is not enough. You must know how to manage your regulator and your firm's internal ethical standards.",
      jobReadySkills: "Conduct internal compliance audits, draft regulatory responses, and build a risk-based monitoring program from scratch."
    },
    audienceCategories: [
      {
        title: "🏦 Financial Guardian",
        roles: ["Compliance Officers", "Audit Managers", "Risk Leads", "Company Secretaries"]
      },
      {
        title: "💼 High-Risk Sectors",
        roles: ["Exchange House Managers", "Brokerage Compliance", "Insurance Governance Teams"]
      }
    ],
    examInfo: {
      questions: "50",
      duration: "90 Minutes",
      passingScore: "70%",
      format: "Multiple Choice",
      requirements: [
        "Official GCI Study guide mastery",
        "Online proctored exam",
        "Recommended 1-2 years experience"
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "Compliance isn't just about reading laws; it's about managing your local regulator (Central Bank, DFSA, ADGM).",
      points: [
        "Soft Skills Mastery: Learn how to write letters to the Regulator that minimize risk and professional exposure.",
        "Inspection Survival: Tips from former auditors on surviving the 'On-Site Inspection' process.",
        "Practical Governance: Build real-world Chinese Walls and conflict of interest policies.",
        "MENA Focus: Tailored to regional regulatory styles and expectations."
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
    issuingBody: "GCI"
  },
  {
    id: "certified-compliance-manager",
    slug: "certified-compliance-manager",
    title: "Certified Compliance Manager (CCM)",
    shortDescription: "The CCM is the most comprehensive executive-level certification offered by GCI. It integrates five core disciplines into a single curriculum.",
    longDescription: "The CCM is the most comprehensive executive-level certification offered by GCI. It integrates five core disciplines—AML, KYC, Sanctions, Regulatory Compliance, and FATCA/CRS—into a single powerful curriculum. This course transforms you from an operational analyst into a strategic leader capable of designing frameworks and managing regulatory audits.",
    category: "GOVERNANCE",
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
        duration: "Concise 5-day bootcamp"
      }
    ],
    level: "ADVANCED",
    duration: 45,
    priceUsd: 1599,
    currency: "USD",
    outcomes: [
      "Build Integrated Frameworks: Unified AML, Sanctions, and Tax policies",
      "Master Advanced Investigations: Cross-border cases and Law Enforcement requests",
      "Implement Regulatory Management: Handling inspections and remediation plans",
      "Conduct Enterprise Risk Assessments: Complex EWRA methodologies",
      "Direct Board-level reporting and strategic compliance oversight"
    ],
    whoItsFor: [
      "Aspiring MLROs",
      "Heads of Compliance",
      "Internal Audit Managers",
      "Senior Risk Professionals",
      "Strategic L&D Managers"
    ],
    programOverview: {
      whatIs: "The Certified Compliance Manager (CCM) is the pinnacle executive certification integrating all major compliance pillars into one strategic leadership role.",
      whyItMatters: "The market needs leaders, not just analysts. CCM prepares you to own the compliance function at an institutional level.",
      jobReadySkills: "Design global compliance frameworks, lead multi-disciplinary teams, and interact at the Board and Regulatory executive levels."
    },
    audienceCategories: [
      {
        title: "👔 Executive Leadership",
        roles: ["Heads of Compliance", "MLROs", "Chief Risk Officers", "Senior Audit Managers"]
      },
      {
        title: "📈 Career Path",
        roles: ["Aspiring Managers", "Deputy MLROs", "Compliance Consultants"]
      }
    ],
    examInfo: {
      questions: "150",
      duration: "180 Minutes",
      passingScore: "75% (Min 50% per chapter)",
      format: "Multiple Choice Questions",
      requirements: [
        "Executive-level study guide",
        "Online proctored exam",
        "One year GCI membership included"
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "The CCM is a beast of an exam. We offer an Executive Mentorship Model to ensure you cross the finish line.",
      points: [
        "Strategy Mentorship: We shift your mindset from 'clearing alerts' to 'designing global frameworks.'",
        "The Boardroom Workshop: Learn to draft and present high-stakes reports to the Board of Directors.",
        "Exclusive Study Circle: Network with other Senior Compliance Managers in our private mentorship group.",
        "MENA Leadership: Taught by regional MLROs with real-world institutional experience."
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
    issuingBody: "GCI"
  },
  {
    id: "tbml",
    slug: "trade-based-money-laundering",
    title: "Trade Based Money Laundering (TBML)",
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
    duration: 24,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand Trade Lifecycle: Bill of Lading, Invoices, and fraud red flags",
      "Detect Typologies: Over/Under-Invoicing and Phantom Shipments",
      "Identify Dual-Use Goods: Strategic military/civilian applications",
      "Master Vessel Tracking: Identifying 'Dark Activity' and ship-to-ship transfers",
      "Analyze full sets of shipping documents for potential money laundering"
    ],
    whoItsFor: [
      "Trade Finance Ops Staff",
      "Commercial Lenders",
      "Sanctions Investigators",
      "Correspondent Banking Managers"
    ],
    programOverview: {
      whatIs: "Trade-Based Money Laundering (TBML) is a specialized advanced technical course decoding the documents and flows of global trade fraud.",
      whyItMatters: "Traditional AML fails to catch trade fraud. You must understand the underlying shipping documents to protect your firm.",
      jobReadySkills: "Scan Bills of Lading for anomalies, track vessels globally, and detect price manipulation in complex trade financing."
    },
    audienceCategories: [
      {
        title: "🚢 Trade Specialist",
        roles: ["Trade Finance Officers", "L/C Processors", "Shipment Investigators"]
      },
      {
        title: "🏦 Advanced Compliance",
        roles: ["High-Level AML Investigators", "Sanctions Experts", "Corporate Risk Managers"]
      }
    ],
    examInfo: {
      questions: "N/A (Certificate of Completion)",
      duration: "Practical Assessment",
      passingScore: "Successful Workshop Completion",
      format: "Case Study & practical Workshop",
      requirements: [
        "Basic Trade Finance knowledge recommended",
        "Successful completion of Lab sessions",
        "Attendance of all practical modules"
      ]
    },
    whyChooseUs: {
      title: "Why Choose Edu-Dubai?",
      description: "You cannot learn trade fraud from a book; you need to see the documents. We host a live document workshop in every session.",
      points: [
        "The Red Flag Lab: Practice on real sanitized document sets (Invoices, Packing Lists, BoLs) to find the fraud.",
        "Vessel Tracking LIVE: Log into professional maritime tracking tools in class to spot 'Dark Activity' at sea.",
        "Global trade context: Specialized training for the major trade hubs in MENA (Jebel Ali, etc.).",
        "Practical Experts: Taught by professionals who clear hundreds of trade alerts daily."
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
    issuingBody: "GCI"
  },
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
