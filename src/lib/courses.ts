import { Course, Category, DeliveryMode } from "./types"

export const courses: Course[] = [
  {
    id: "aml-specialist",
    slug: "anti-money-laundering-specialist",
    title: "Anti-Money Laundering Specialist",
    shortDescription: "Comprehensive AML/CTF training covering risk-based frameworks, transaction monitoring, investigations, and regulatory compliance aligned with global standards.",
    longDescription: "This program provides an in-depth understanding of AML/CTF frameworks, money laundering stages, and terrorist financing risks. Participants learn to design and implement an effective risk-based AML program, use transaction monitoring systems, and conduct investigations aligned with global regulatory expectations. The course includes practical activities such as developing Suspicious Transaction Reports (STR), analyzing real-world case studies of compliance failures, and role-playing full suspicious activity investigations.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON", "SELF_PACED"],
    level: "INTERMEDIATE",
    duration: 40,
    priceUsd: 650,
    currency: "USD",
    outcomes: [
      "Understand AML/CTF principles and stages of money laundering",
      "Design and implement risk-based AML/CTF frameworks",
      "Use transaction monitoring systems effectively",
      "Conduct thorough AML investigations",
      "Prepare quality Suspicious Transaction Reports (STR)",
      "Identify and mitigate counter-proliferation financing risks"
    ],
    whoItsFor: [
      "AML & Financial Crime Professionals",
      "Compliance Officers and MLROs",
      "Banking, Exchange House, and DNFBP professionals",
      "Auditors, Risk Managers, and Investigators"
    ],
    faq: [
      {
        question: "What certification will I receive?",
        answer: "Upon completion, you will receive an AML Specialist Certificate from EduDubai."
      },
      {
        question: "What delivery modes are available?",
        answer: "The program is available in Live Virtual, In-House, and Self-Paced formats to suit your schedule and learning preferences."
      },
      {
        question: "Are practical activities included?",
        answer: "Yes, the program includes developing STR reports, analyzing case studies, and role-playing investigation scenarios."
      }
    ],
    featured: true,
    imageUrl: "/images/courses/anti-money-laundering-specialist.jpg",
  },
  {
    id: "fatca-crs-specialist",
    slug: "fatca-crs-specialist",
    title: "FATCA & CRS Specialist (FCS)",
    shortDescription: "Globally recognized certification for implementing and managing FATCA and CRS compliance frameworks, covering registration, documentation, due diligence, and reporting.",
    longDescription: "This globally recognized certification equips professionals with the expertise to implement and manage FATCA and CRS compliance frameworks. The program covers registration, documentation, due diligence, reporting, and ongoing compliance obligations across jurisdictions. Participants will learn about FATCA agreements (Model 1 IGA, Model 2 IGA), IRS registration, FI classification, documentation requirements, W-9 and W-8 series forms, CRS framework, participating jurisdictions, and key differences between FATCA and CRS. The program includes practical activities such as conducting mock compliance audits and role-playing compliance reviews.",
    category: "FATCA_CRS",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON", "SELF_PACED"],
    level: "INTERMEDIATE",
    duration: 16, // 2 days intensive
    priceUsd: 774,
    currency: "USD",
    outcomes: [
      "Understand FATCA agreements and scope",
      "Complete FATCA registration and FI classification",
      "Implement FATCA documentation and due diligence",
      "Prepare accurate FATCA and CRS reports",
      "Navigate CRS framework and participating jurisdictions",
      "Distinguish between FATCA and CRS requirements"
    ],
    whoItsFor: [
      "FATCA & CRS Responsible Officers",
      "Banking, Insurance, Brokerage, and Financial Institution Professionals",
      "Regulators, Tax Authorities, and Central Bank Staff",
      "Tax Consultants, Lawyers, and System Providers"
    ],
    faq: [
      {
        question: "What is included in the certification fee?",
        answer: "The total fee of USD 774 includes training fee (USD 275) and certification fee (USD 499), which covers the proctored exam, study materials, and certification."
      },
      {
        question: "What is the exam format?",
        answer: "The exam is proctored with 50 scenario-based multiple-choice questions. The pass mark is 75%."
      },
      {
        question: "How long is the program?",
        answer: "The program duration is 2 days, which includes exam preparation and mock tests."
      }
    ],
    featured: true,
    imageUrl: "/images/courses/fatca-crs-specialist.jpg",
  },
  {
    id: "sanctions-compliance-specialist",
    slug: "sanctions-compliance-specialist",
    title: "Sanctions Compliance Specialist (SCS)",
    shortDescription: "Comprehensive training on global sanctions regimes, counter-proliferation finance, sanctions screening systems, and managing sanctions risks.",
    longDescription: "This program delivers comprehensive knowledge of global sanctions regimes, counter-proliferation finance, and sanctions screening systems. It equips professionals to manage sanctions risks and regulatory expectations. Participants will learn about sanctions and counter-proliferation finance concepts, typologies, and red flags; global sanctions regimes including UN, EU, OFAC, UK, and Australia; screening processes and systems including name screening, SWIFT messages, and false-positive management; Wolfsberg Sanctions Screening Guidance; and violations and reporting requirements. The program includes hands-on sanctions screening exercises, case studies of major violations, and role-playing sanctions risk assessments.",
    category: "SANCTIONS",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON", "SELF_PACED"],
    level: "INTERMEDIATE",
    duration: 30,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand sanctions and counter-proliferation finance",
      "Navigate global sanctions regimes (UN, EU, OFAC, UK, Australia)",
      "Implement effective sanctions screening processes",
      "Manage false positives in screening systems",
      "Conduct sanctions risk assessments",
      "Handle sanctions violations and regulatory reporting"
    ],
    whoItsFor: [
      "Sanctions Compliance Officers",
      "Trade Finance, Banking, and Remittance Professionals",
      "Regulators and FIU Staff",
      "Screening System Providers"
    ],
    faq: [
      {
        question: "What is the total program fee?",
        answer: "The total fee is USD 849, which includes training, exam preparation, and the proctored certification exam."
      },
      {
        question: "What is the exam pass mark?",
        answer: "The exam pass mark is 75%. The exam is proctored to ensure integrity."
      },
      {
        question: "How long is the program?",
        answer: "The program duration is 30 hours, which includes exam preparation time."
      }
    ],
    featured: true,
    imageUrl: "/images/courses/sanctions-compliance-specialist.jpg",
  },
  {
    id: "regulatory-compliance-specialist",
    slug: "regulatory-compliance-specialist",
    title: "Regulatory Compliance Specialist (RCS)",
    shortDescription: "Advanced expertise in global regulatory compliance frameworks, risk-based monitoring, compliance testing, and managing regulatory examinations.",
    longDescription: "This program builds advanced expertise in global regulatory compliance frameworks, risk-based monitoring, and compliance testing. Participants gain practical skills to manage regulatory examinations and establish strong internal controls. The course covers global regulatory frameworks including BIS, BCBS, GDPR, and international standards; compliance testing and monitoring methodologies; internal controls and governance structures; risk-based compliance approaches; and regulatory examinations and reporting requirements. Participants will perform simulated compliance testing, review real regulatory breaches, and role-play leading regulatory compliance audits.",
    category: "GOVERNANCE",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    level: "INTERMEDIATE",
    duration: 20,
    priceUsd: 849,
    currency: "USD",
    outcomes: [
      "Understand global regulatory frameworks and standards",
      "Design and execute compliance testing programs",
      "Establish effective internal controls and governance",
      "Implement risk-based compliance methodologies",
      "Manage regulatory examinations and reporting",
      "Respond to regulatory breaches and disclosures"
    ],
    whoItsFor: [
      "Compliance Officers and Managers",
      "Risk, Audit, and Legal Professionals",
      "Banking, Insurance, and Financial Services Staff"
    ],
    faq: [
      {
        question: "What is the program delivery mode?",
        answer: "The program is delivered virtually via MS Teams or Zoom, making it accessible from anywhere."
      },
      {
        question: "What is included in the fee?",
        answer: "The total fee of USD 849 includes training, exam preparation, and the proctored certification exam."
      },
      {
        question: "What is the exam format?",
        answer: "The exam is proctored with a pass mark of 75%. The program includes 20 hours of training and exam preparation."
      }
    ],
    featured: true,
    imageUrl: "/images/courses/regulatory-compliance-specialist.jpg",
  },
  {
    id: "kyc-specialist",
    slug: "know-your-customer-specialist",
    title: "Know Your Customer Specialist (KYC Specialist)",
    shortDescription: "Practical and regulatory-aligned training on KYC, CDD, EDD, and digital identity systems for effective customer onboarding and ongoing monitoring.",
    longDescription: "This program delivers a practical and regulatory-aligned understanding of KYC, CDD, EDD, and digital identity systems. Participants learn to manage onboarding risks and conduct effective ongoing monitoring. The course covers KYC fundamentals and regulatory expectations; customer identification and verification including beneficial ownership and PEPs; risk-based CDD with risk models and customer segmentation; enhanced due diligence for high-risk customers and jurisdictions; digital identity and e-KYC for FATF-compliant digital onboarding; and ongoing monitoring and KYC refresh requirements. Participants will simulate end-to-end customer onboarding, analyze real KYC failures, and role-play customer interviews.",
    category: "AML_CFT",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON"],
    level: "BEGINNER",
    duration: 24,
    priceUsd: 550,
    currency: "USD",
    outcomes: [
      "Understand KYC fundamentals and regulatory expectations",
      "Conduct customer identification and verification",
      "Implement risk-based CDD methodologies",
      "Perform enhanced due diligence for high-risk customers",
      "Navigate digital identity and e-KYC systems",
      "Manage ongoing monitoring and KYC refresh processes"
    ],
    whoItsFor: [
      "KYC & Compliance Officers",
      "Onboarding & Operations Teams",
      "Banking, Exchange House, and DNFBP Professionals"
    ],
    faq: [
      {
        question: "What certification will I receive?",
        answer: "Upon completion, you will receive a KYC Specialist Certificate from EduDubai."
      },
      {
        question: "What delivery modes are available?",
        answer: "The program is available in Live Virtual and In-House formats to suit your organization's needs."
      },
      {
        question: "Is this suitable for beginners?",
        answer: "Yes, this program is designed for professionals starting their KYC career and covers fundamentals before advancing to complex scenarios."
      }
    ],
    featured: true,
    imageUrl: "/images/courses/know-your-customer-specialist.jpg",
  },
  {
    id: "certified-compliance-manager",
    slug: "certified-compliance-manager",
    title: "Certified Compliance Manager (CCM)",
    shortDescription: "The most advanced global certification in Compliance and Anti-Money Laundering, covering governance, AML/CTF, sanctions, FATCA/CRS, investigations, and regulatory oversight.",
    longDescription: "The Certified Compliance Manager (CCM) is one of the most advanced and comprehensive global certifications in the field of Compliance and Anti-Money Laundering. This program is designed for professionals who need a complete, end-to-end understanding of the compliance function, covering governance, AML/CFT, sanctions, FATCA/CRS, investigations, and regulatory oversight. The CCM program is built on GCI's proven 'Know-How' concept, combining practical frameworks, real-world systems, and intuitive learning modules. It equips professionals to design, implement, manage, and supervise enterprise-wide compliance programs. The program includes designing complete Compliance & AML frameworks, analyzing global compliance failures, and simulated Compliance Manager scenarios including board reporting and regulatory examinations.",
    category: "GOVERNANCE",
    deliveryModes: ["LIVE_VIRTUAL", "IN_PERSON", "SELF_PACED"],
    level: "ADVANCED",
    duration: 60,
    priceUsd: 1399,
    currency: "USD",
    outcomes: [
      "Develop robust AML & Compliance systems",
      "Build effective onboarding and CDD processes",
      "Design FATF-aligned risk-based AML methodologies",
      "Implement GDPR-compliant data protection practices",
      "Prepare senior management and board-level reports",
      "Reduce false positives in screening systems",
      "Manage sanctions at multiple levels",
      "Stay aligned with modern technology and developments"
    ],
    whoItsFor: [
      "Compliance Managers and Senior Compliance Officers",
      "AML / CFT Professionals and MLROs",
      "Risk, Audit, and Governance Professionals",
      "Banking, Insurance, Brokerage, and Financial Services Professionals",
      "Professionals working with Compliance & AML Technology Providers",
      "Regulators, Supervisory Authorities, and FIU Staff"
    ],
    faq: [
      {
        question: "What is included in the certification fee?",
        answer: "The GCI Certification Fee of USD 1,099 includes one-year membership, study guide, practice questions, online proctored exam, e-certificate, digital badge, and one free exam retake."
      },
      {
        question: "What is the exam format?",
        answer: "The exam is 180 minutes with 150 multiple-choice questions. The pass mark is 75% overall with a minimum 50% per chapter. Results are displayed immediately upon submission."
      },
      {
        question: "What enrollment options are available?",
        answer: "You can choose between Self-Study (24/7 access to GCI portal) or Instructor-Led Program with EduDubai (live expert-led sessions)."
      },
      {
        question: "What certification will I receive?",
        answer: "Upon passing, you will receive a Digital Certificate and Verifiable Digital Badge issued instantly by GCI."
      }
    ],
    featured: true,
    imageUrl: "/images/courses/certified-compliance-manager.jpg",
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
