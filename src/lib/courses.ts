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
        name: "Weekday Evening Batch",
        schedule: "Mon & Wed | 7:00 PM – 9:00 PM",
        duration: "6 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Sundays | 10:00 AM – 2:00 PM",
        duration: "6 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customizable schedules",
        duration: "3-5 consecutive days"
      }
    ],
    level: "ADVANCED",
    duration: 40,
    priceUsd: 765,
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
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "While other institutes offer \"crash courses\" of just 30–32 hours, EduDubai provides a full 40-Hour Flagship Program. This ensures you meet the strict 40 Eligibility Credits required by ACAMS to even register for the exam—something shorter courses fail to guarantee.",
      points: [
        "Don't Just Study, Practice: We are one of the few providers to include AI-Driven Mock Exams that simulate the difficulty of the actual test.",
        "Pass Guarantee: We are so confident in our training that if you don't pass, we offer free retraining in our next batch.",
        "The \"Gap\" Filler: Most providers skip the complex \"US Patriot Act\" details because it's boring. We double down on it because it's 30% of the exam."
      ]
    },
    faq: [
      {
        question: "Do I need prior experience?",
        answer: "While ACAMS recommends experience, our course covers the fundamentals, making it accessible for beginners."
      },
      {
        question: "Is the exam fee included?",
        answer: "No, the exam fee is paid directly to ACAMS. Our fee covers the expert-led training."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/certified-anti-money-laundering-specialist.jpg",
  },
  {
    id: "cgss",
    slug: "certified-global-sanctions-specialist",
    title: "Certified Global Sanctions Specialist (CGSS)",
    shortDescription: "In an era of rapid geopolitical change, Sanctions Compliance has become a critical skill. The CGSS course dives deep into the complex web of UN, EU, and OFAC sanctions regimes.",
    longDescription: "In an era of rapid geopolitical change, Sanctions Compliance has become a critical skill. The CGSS course dives deep into the complex web of UN, EU, and OFAC sanctions regimes. This training moves beyond basic lists to teach you the logic of sanctions—how to screen effectively, how to investigate false positives versus true hits, and how to manage the risks of evasion techniques like stripping and nesting.",
    category: "SANCTIONS",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Evening Batch",
        schedule: "Tue & Thu | 7:00 PM – 9:00 PM",
        duration: "5 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Sundays | 2:00 PM – 6:00 PM",
        duration: "5 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customizable schedules",
        duration: "3-Day Bootcamp"
      }
    ],
    level: "ADVANCED",
    duration: 40,
    priceUsd: 1090,
    currency: "USD",
    outcomes: [
      "Understand the history, purpose, and types of sanctions (Sectoral, Comprehensive, Targeted)",
      "Navigate the differences between OFAC (USA), UN, and EU sanctions",
      "Master best practices for name and payment screening, including fuzzy logic and resolving false positives",
      "Detect stripping, nesting, and trade-based sanctions evasion",
      "Master global sanctions regimes and regulatory frameworks"
    ],
    whoItsFor: [
      "Sanctions Screening Analysts",
      "Trade Finance Professionals",
      "Legal Counsel",
      "Compliance Staff",
      "Sanctions Compliance Officers and Managers"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "Sanctions is the hardest topic to self-study because the rules change daily. Unlike generic \"online recordings\" offered by others, our course is Live & Current.",
      points: [
        "Real-World War Rooms: We don't just teach the OFAC list; we run \"Sanctions War Room\" simulations where you have to decide—in real-time—whether to block a transaction involving Russia, Iran, or Venezuela.",
        "Trade Finance Focus: 40% of the CGSS exam is about shipping and trade. Most trainers are generalists; our instructors are Trade Finance Specialists who understand the difference between a Bill of Lading and a Letter of Indemnity.",
        "Visual Learning: We use proprietary \"Sanctions Flowcharts\" to simplify complex ownership structures (50% Rule) that usually confuse students."
      ]
    },
    faq: [
      {
        question: "Is this harder than CAMS?",
        answer: "It is more specialized. If you work in Trade Finance or payment filtering, you may find it more relevant than general AML."
      },
      {
        question: "Does this cover Russia/Iran sanctions?",
        answer: "Yes, we use real-world examples of major sanctions regimes to explain compliance principles."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/certified-global-sanctions-specialist.jpg",
  },
  {
    id: "aml-specialist",
    slug: "anti-money-laundering-specialist",
    title: "Anti-Money Laundering Specialist (AMLS)",
    shortDescription: "The GCI Anti-Money Laundering Specialist (AMLS) certification is designed for professionals who need a practical, hands-on understanding of AML without the high cost of other global certifications.",
    longDescription: "The GCI Anti-Money Laundering Specialist (AMLS) certification is designed for professionals who need a practical, hands-on understanding of AML without the high cost of other global certifications. This course focuses on the 'how-to'—how to write a policy, how to screen a customer, and how to detect a suspicious transaction—making it ideal for operational staff and those new to the field.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Evening Batch",
        schedule: "Mon & Wed | 7:00 PM – 9:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Saturdays | 10:00 AM – 2:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "Customizable schedules",
        duration: "2-3 Days"
      }
    ],
    level: "INTERMEDIATE",
    duration: 24,
    priceUsd: 410,
    currency: "USD",
    outcomes: [
      "Understand Money Laundering Cycle: Placement, Layering, and Integration in modern contexts (including Crypto)",
      "Master KYC & Onboarding: Practical steps for verifying customer identity and beneficial ownership",
      "Implement Risk-Based Approach: How to score customers as Low, Medium, or High risk",
      "Learn Reporting: How to draft a high-quality Suspicious Transaction Report (STR)",
      "Design and implement risk-based AML/CTF frameworks"
    ],
    whoItsFor: [
      "Entry-level Compliance staff",
      "Front-line staff (Tellers, RMs)",
      "Real Estate Agents",
      "Jewelers",
      "AML & Financial Crime Professionals"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "We are an Authorized GCI Partner. Many \"General Institutes\" in MENA sell exam prep but cannot sell you the exam voucher. With EduDubai, you get the Official Bundle.",
      points: [
        "Better Value than ADGM: You get the same Official GCI Curriculum and the same Internationally Recognized Certificate as the big government academies, but at 50% of the cost and with more flexible evening schedules.",
        "The \"Checklist\" Advantage: We don't just teach theory; we give you editable Word/Excel templates for KYC Forms, Risk Assessments, and STRs that you can take back to your office and use the next day."
      ]
    },
    faq: [
      {
        question: "Is GCI recognized?",
        answer: "Yes, GCI is a growing international body. EduDubai is an Authorized Training Partner."
      },
      {
        question: "Is the exam difficult?",
        answer: "The exam is 50 multiple-choice questions. Our students have a very high pass rate."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/anti-money-laundering-specialist.jpg",
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
        name: "Weekday Evening Batch",
        schedule: "Tue & Thu | 7:00 PM – 9:00 PM",
        duration: "3 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Sundays | 10:00 AM – 2:00 PM",
        duration: "3 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "2-Day Intensive Workshop",
        duration: "2 Days"
      }
    ],
    level: "INTERMEDIATE",
    duration: 16,
    priceUsd: 410,
    currency: "USD",
    outcomes: [
      "Understand FATCA vs. CRS: The key differences in scope, penalties, and implementation",
      "Master Entity Classification: How to distinguish between FFIs, NFFEs, and Active vs. Passive entities",
      "Learn Documentation: How to correctly fill and validate IRS Forms W-9 and the W-8 series",
      "Identify Indicia: Indicators of US status or foreign tax residency",
      "Navigate CRS framework and participating jurisdictions"
    ],
    whoItsFor: [
      "Tax Officers",
      "Finance Managers",
      "Client Onboarding & KYC Teams",
      "Investment Fund Administrators",
      "FATCA & CRS Responsible Officers"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "Most FATCA training is designed for tax lawyers, making it impossible for banking staff to understand. EduDubai breaks it down for Operations Teams.",
      points: [
        "No \"Tax Lawyer\" Jargon: We speak the language of the Front Office. We teach you exactly how to look at a passport and decide if a customer is a \"US Person.\"",
        "Form W-9 Mastery: We dedicate full sessions to filling out IRS forms. While competitors talk about the law, we teach you how to process the paper.",
        "The \"Nil Report\" Guide: We show you exactly how to file a report when you have nothing to report—a common headache for Compliance Officers that other courses ignore."
      ]
    },
    faq: [
      {
        question: "Is this course technical?",
        answer: "It covers the operational side (forms and due diligence) rather than deep legal tax advice, making it perfect for bank staff."
      },
      {
        question: "What is included in the certification fee?",
        answer: "The total fee of USD 774 includes training fee (USD 275) and certification fee (USD 499), which covers the proctored exam, study materials, and certification."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/fatca-crs-specialist.jpg",
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
        name: "Weekday Evening Batch",
        schedule: "Mon & Wed | 7:00 PM – 9:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Saturdays | 2:00 PM – 6:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "2-3 Day Workshop",
        duration: "2-3 Days"
      }
    ],
    level: "INTERMEDIATE",
    duration: 24,
    priceUsd: 410,
    currency: "USD",
    outcomes: [
      "Understand Sanctions Lists: UN, EU, OFAC, and HM Treasury lists",
      "Master Name Screening: How algorithms work (Exact match vs. Fuzzy logic) and handling false positives",
      "Analyze SWIFT Messages: Payment messages (MT103, MT202) for sanctions risks",
      "Identify Trade Finance Sanctions: Dual-use goods and red flags in shipping documents",
      "Navigate global sanctions regimes (UN, EU, OFAC, UK, Australia)"
    ],
    whoItsFor: [
      "Payment Operations Staff",
      "Trade Finance Officers",
      "Sanctions Alerts Investigators",
      "Sanctions Compliance Officers"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "This is the only course in the market designed specifically for the \"Alert Investigator.\"",
      points: [
        "Tools Over Theory: While others discuss the history of sanctions, we train you on Fuzzy Logic Algorithms. You will learn why \"Mohammad Ali\" might match with \"Mhd Aly\" and how to justify closing that alert.",
        "SWIFT Message Decoding: We are the only institute that teaches you how to read raw MT103 and MT202 payment messages to spot hidden sanctions evasion—a skill normally reserved for senior bankers."
      ]
    },
    faq: [
      {
        question: "How does this differ from CGSS?",
        answer: "This is a more concise, operationally focused certification ideal for junior to mid-level analysts."
      },
      {
        question: "What is the total program fee?",
        answer: "The total fee is USD 849, which includes training, exam preparation, and the proctored certification exam."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/sanctions-compliance-specialist.jpg",
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
        name: "Weekday Evening Batch",
        schedule: "Tue & Thu | 7:00 PM – 9:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Sundays | 10:00 AM – 2:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "3-Day Workshop",
        duration: "3 Days"
      }
    ],
    level: "INTERMEDIATE",
    duration: 24,
    priceUsd: 410,
    currency: "USD",
    outcomes: [
      "Understand The Compliance Function: Structuring the department and its independence from business lines",
      "Master Regulatory Relationships: How to handle on-site inspections and correspondence with Central Banks",
      "Implement Risk-Based Monitoring: Creating a 'Compliance Monitoring Plan' (CMP) to test internal controls",
      "Manage Conflict of Interest: Chinese Walls, gifts policies, and personal account dealing",
      "Establish effective internal controls and governance"
    ],
    whoItsFor: [
      "Newly appointed Compliance Officers",
      "Internal Auditors moving into Compliance",
      "Managers in regulated entities",
      "Compliance Officers and Managers"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "Compliance isn't just about reading laws; it's about managing the Central Bank.",
      points: [
        "The \"Soft Skills\" of Compliance: We teach you how to write a letter to the Regulator that doesn't get you in trouble. No other technical course covers this critical communication skill.",
        "Inspection Survival Guide: Our instructors include former auditors who show you exactly what to do (and what NOT to do) when the Central Bank inspectors arrive at your reception."
      ]
    },
    faq: [
      {
        question: "Is this only for banks?",
        answer: "No, the principles apply to Exchange Houses, Brokers, and Insurance firms as well."
      },
      {
        question: "What is the program delivery mode?",
        answer: "The program is delivered virtually via MS Teams or Zoom, making it accessible from anywhere."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/regulatory-compliance-specialist.jpg",
  },
  {
    id: "certified-compliance-manager",
    slug: "certified-compliance-manager",
    title: "Certified Compliance Manager (CCM)",
    shortDescription: "The CCM is the most comprehensive executive-level certification offered by GCI. It integrates five core disciplines—AML, KYC, Sanctions, Regulatory Compliance, and FATCA/CRS—into a single powerful curriculum.",
    longDescription: "The CCM is the most comprehensive executive-level certification offered by GCI. It integrates five core disciplines—AML, KYC, Sanctions, Regulatory Compliance, and FATCA/CRS—into a single powerful curriculum. This course transforms you from an operational analyst into a strategic leader capable of designing frameworks, managing regulatory examinations, and protecting the institution's reputation.",
    category: "GOVERNANCE",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Evening Batch",
        schedule: "Mon, Wed, Fri | 7:00 PM – 9:30 PM",
        duration: "8 Weeks"
      },
      {
        name: "Weekend Executive Batch",
        schedule: "Saturdays | 10:00 AM – 3:00 PM",
        duration: "8 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "5-Day Intensive Management Bootcamp",
        duration: "5 Days"
      }
    ],
    level: "ADVANCED",
    duration: 45,
    priceUsd: 1090,
    currency: "USD",
    outcomes: [
      "Build Integrated Frameworks: Create a 'Unified Compliance Policy' covering AML, Sanctions, and Tax",
      "Master Advanced Investigations: Managing complex cross-border investigations and Law Enforcement requests",
      "Implement Regulatory Management: Strategies for handling Central Bank inspections and remediation plans",
      "Conduct Risk Assessment: Enterprise-Wide Risk Assessment (EWRA)",
      "Develop robust AML & Compliance systems",
      "Prepare senior management and board-level reports"
    ],
    whoItsFor: [
      "Aspiring MLROs",
      "Compliance Heads",
      "Internal Audit Managers",
      "Senior Operations Managers",
      "Compliance Managers and Senior Compliance Officers",
      "AML / CFT Professionals"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "The CCM is a beast of an exam. Doing it alone (Self-Study) has a high failure rate. EduDubai offers the Executive Mentorship Model.",
      points: [
        "Strategy, Not Just Tactics: We shift your mindset from \"How do I clear this alert?\" to \"How do I design a Global Compliance Framework?\" This is essential for passing the CCM.",
        "The \"Board Report\" Workshop: We teach you how to draft and present the Quarterly MLRO Report to a Board of Directors—a skill that will define your career as a Manager.",
        "Exclusive Study Circle: You get access to a private WhatsApp group with other Senior Compliance Managers to discuss exam questions and industry trends 24/7."
      ]
    },
    faq: [
      {
        question: "Is this higher than the Specialist courses?",
        answer: "Yes. The CCM is an advanced designation for those who want to manage compliance functions."
      },
      {
        question: "What is included in the certification fee?",
        answer: "The GCI Certification Fee of USD 1,099 includes one-year membership, study guide, practice questions, online proctored exam, e-certificate, digital badge, and one free exam retake."
      },
      {
        question: "What is the exam format?",
        answer: "The exam is 180 minutes with 150 multiple-choice questions. The pass mark is 75% overall with a minimum 50% per chapter. Results are displayed immediately upon submission."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/certified-compliance-manager.jpg",
  },
  {
    id: "tbml",
    slug: "trade-based-money-laundering",
    title: "Trade Based Money Laundering (TBML)",
    shortDescription: "Trade-Based Money Laundering (TBML) is widely recognized as the most complex method of moving illicit value.",
    longDescription: "Trade-Based Money Laundering (TBML) is widely recognized as the most complex method of moving illicit value. This specialized course is designed for Trade Finance and Compliance professionals who need to look beyond the 'name screen' and understand the transaction itself. We decode the complexities of Letters of Credit, Guarantees, and Open Accounts to teach you how to spot price manipulation, phantom shipments, and dual-use goods.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    deliverySchedules: [
      {
        name: "Weekday Evening Batch",
        schedule: "Tue & Thu | 7:00 PM – 9:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Weekend Intensive Batch",
        schedule: "Sundays | 2:00 PM – 6:00 PM",
        duration: "4 Weeks"
      },
      {
        name: "Corporate / In-House",
        schedule: "2-Day Specialized Workshop",
        duration: "2 Days"
      }
    ],
    level: "ADVANCED",
    duration: 24,
    priceUsd: 550,
    currency: "USD",
    outcomes: [
      "Understand Trade Lifecycle: The flow of documents (Bill of Lading, Invoice) and where fraud happens",
      "Detect Typologies: Over/Under-Invoicing, Multiple Invoicing, and Phantom Shipments",
      "Identify Dual-Use Goods: Items with both civil and military applications",
      "Master Vessel Tracking: Track ships to detect 'Dark Activity' or sanctions evasion",
      "Analyze trade documentation for anomalies"
    ],
    whoItsFor: [
      "Trade Finance Operations Staff",
      "Commercial Lenders",
      "Sanctions Investigators",
      "Trade Finance Professionals",
      "AML and Compliance Officers"
    ],
    whyChooseUs: {
      title: "Why Choose EduDubai?",
      description: "You cannot learn Trade Finance from a book; you need to see the documents. EduDubai offers the only Live Document Workshop in the region.",
      points: [
        "The \"Red Flag\" Lab: We give you real (sanitized) sets of shipping documents—Invoices, Packing Lists, Bills of Lading—and challenge you to find the fraud.",
        "Vessel Tracking LIVE: We log into live vessel tracking tools (like MarineTraffic) in class to show you how to spot \"Dark Activity\" and ship-to-ship transfers.",
        "Price Disruption: We offer this specialized technical training at a fraction of the cost of international banking academies."
      ]
    },
    faq: [
      {
        question: "Is this suitable for beginners?",
        answer: "We recommend having a basic understanding of banking or trade finance before taking this course."
      },
      {
        question: "What is included in the program?",
        answer: "The program includes comprehensive TBML training, case studies, practical exercises, and certification upon completion."
      }
    ],
    featured: true,
    imageUrl: "/images/certifications/trade-based-money-laundering.jpg",
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

export function getCoursesByDeliveryMode(mode: DeliveryMode): Course[] {
  return courses.filter(course => course.deliveryModes.includes(mode))
}
