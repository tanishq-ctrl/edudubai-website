"use client"

import React from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { Course } from "@/lib/types"

interface CGSSCustomContentProps {
  course: Course
}

export function CGSSCustomContent({ course }: CGSSCustomContentProps) {
  return (
    <div className="cgss-custom-wrapper">
      <style dangerouslySetInnerHTML={{
        __html: `
        .cgss-custom-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #fff;
        }

        /* Section Styles */
        .cgss-section {
          padding: 80px 20px;
        }

        .cgss-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .cgss-section-title {
          font-size: 36px;
          color: #0f2557;
          margin-bottom: 15px;
          text-align: center;
          font-weight: 700;
        }

        .cgss-section-subtitle {
          font-size: 18px;
          color: #666;
          text-align: center;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Program Overview */
        .cgss-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .cgss-overview-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          border-left: 4px solid #d4af37;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }

        .cgss-overview-card:hover {
          transform: translateY(-5px);
        }

        .cgss-overview-card h3 {
          color: #0f2557;
          font-size: 22px;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .cgss-overview-card p {
          color: #555;
          line-height: 1.8;
        }

        /* Learning Outcomes */
        .cgss-outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }

        .cgss-outcome-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .cgss-outcome-icon {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
          flex-shrink: 0;
        }

        .cgss-outcome-text {
          color: #444;
          line-height: 1.6;
        }

        /* Schedule Section */
        .cgss-schedule-section {
          background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }

        .cgss-schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .cgss-schedule-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-top: 4px solid #d4af37;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .cgss-schedule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .cgss-schedule-card h3 {
          color: #0f2557;
          font-size: 24px;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .cgss-schedule-details {
          color: #555;
          margin-bottom: 15px;
          line-height: 1.8;
        }

        .cgss-schedule-badge {
          display: inline-block;
          background: #e8f4f8;
          color: #0f2557;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 13px;
          font-weight: 600;
          margin-top: 10px;
        }

        /* Who Should Attend */
        .cgss-audience-section {
          background: #e8f4f8;
        }

        .cgss-audience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
        }

        .cgss-audience-category {
          background: white;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .cgss-audience-category h3 {
          color: #0f2557;
          font-size: 26px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 3px solid #d4af37;
          font-weight: 700;
        }

        .cgss-role-list {
          list-style: none;
        }

        .cgss-role-list li {
          padding: 12px 0 12px 30px;
          color: #444;
          position: relative;
          line-height: 1.6;
          border-bottom: 1px solid #f0f0f0;
        }

        .cgss-role-list li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #d4af37;
          font-weight: bold;
          font-size: 18px;
        }

        /* Benefits Section */
        .cgss-benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .cgss-benefit-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          padding: 25px;
          border-radius: 10px;
          border-left: 4px solid #2a5298;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }

        .cgss-benefit-card h4 {
          color: #0f2557;
          font-size: 18px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
        }

        .cgss-benefit-icon {
          background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .cgss-benefit-card p {
          color: #555;
          line-height: 1.6;
        }

        /* Exam Info */
        .cgss-exam-section {
          background: #fff8e7;
        }

        .cgss-exam-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .cgss-exam-stat {
          background: white;
          padding: 25px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          border-top: 3px solid #d4af37;
        }

        .cgss-exam-stat-number {
          font-size: 36px;
          font-weight: bold;
          color: #0f2557;
          margin-bottom: 10px;
        }

        .cgss-exam-stat-label {
          color: #666;
          font-size: 14px;
        }

        .cgss-exam-requirements {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .cgss-exam-requirements h3 {
          color: #0f2557;
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .cgss-exam-requirements ul {
          list-style: none;
        }

        .cgss-exam-requirements li {
          padding: 12px 0 12px 35px;
          color: #444;
          position: relative;
          line-height: 1.6;
        }

        .cgss-exam-requirements li::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: #d4af37;
          font-size: 16px;
        }

        /* FAQ Section */
        .cgss-faq-section {
          background: #f8f9fa;
        }

        .cgss-faq-item {
          background: white;
          padding: 25px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .cgss-faq-question {
          color: #0f2557;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .cgss-faq-answer {
          color: #555;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .cgss-section-title {
            font-size: 28px;
          }

          .cgss-audience-grid {
            grid-template-columns: 1fr;
          }
        }
      ` }} />

      {/* Training Schedule */}
      <section id="schedule" className="cgss-section cgss-schedule-section">
        <div className="cgss-container">
          <h2 className="cgss-section-title">Flexible CGSS Training Schedule Options across the globe</h2>
          <p className="cgss-section-subtitle">Choose the format that fits your professional schedule</p>

          <div className="cgss-schedule-grid">
            <article className="cgss-schedule-card">
              <h3>📅 Weekday Batch</h3>
              <div className="cgss-schedule-details">
                <p><strong>Days:</strong> Mon – Thu</p>
                <p><strong>Time:</strong> 5:00 PM – 9:00 PM (Dubai Time)</p>
                <p><strong>Duration:</strong> 10 sessions × 4 hours = 40 hours</p>
                <p><strong>Ideal for:</strong> Working professionals</p>
              </div>
              <span className="cgss-schedule-badge">Most Popular</span>
            </article>

            <article className="cgss-schedule-card">
              <h3>📅 Weekend Batch</h3>
              <div className="cgss-schedule-details">
                <p><strong>Days:</strong> Sat & Sun</p>
                <p><strong>Time:</strong> 9:00 AM – 1:00 PM (Dubai Time)</p>
                <p><strong>Duration:</strong> 10 sessions × 4 hours = 40 hours</p>
                <p><strong>Ideal for:</strong> Perfect for weekend learners</p>
              </div>
              <span className="cgss-schedule-badge">Weekend Intensive</span>
            </article>

            <article className="cgss-schedule-card">
              <h3>🏢 Corporate / In-House</h3>
              <div className="cgss-schedule-details">
                <p><strong>Format:</strong> Customized schedule and delivery</p>
                <p><strong>Duration:</strong> Concise 2–4 day format</p>
                <p><strong>Ideal for:</strong> Based on organizational requirements</p>
              </div>
              <span className="cgss-schedule-badge">Custom Solution</span>
            </article>
          </div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section id="overview" className="cgss-section">
        <div className="cgss-container">
          <h2 className="cgss-section-title">ACAMS CGSS Certification Training across the globe</h2>
          <p className="cgss-section-subtitle">The premier sanctions compliance certification for financial crime professionals across the globe</p>

          <div className="cgss-overview-grid">
            <article className="cgss-overview-card">
              <h3>What is CGSS?</h3>
              <p>The <strong>Certified Global Sanctions Specialist (CGSS)</strong> is ACAMS&apos; flagship certification for sanctions compliance professionals. This comprehensive training covers UN, OFAC, EU, and UK sanctions frameworks, screening technologies, due diligence procedures, and investigation techniques essential for banking, finance, and trade compliance roles.</p>
            </article>

            <article className="cgss-overview-card">
              <h3>Why CGSS Matters</h3>
              <p>With global sanctions enforcement increasing and penalties reaching billions of dollars, organizations need certified specialists who understand complex sanctions regimes. CGSS certification demonstrates expertise in sanctions compliance, risk management, and regulatory requirements demanded by employers and regulators across the globe.</p>
            </article>

            <article className="cgss-overview-card">
              <h3>Job-Ready Skills</h3>
              <p>This practical, hands-on program builds real-world capability in sanctions screening, KYC due diligence, beneficial ownership verification, trade-based evasion detection, payment screening, and regulatory reporting. Learn from actual enforcement cases and apply techniques immediately in your compliance role.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section id="outcomes" className="cgss-section">
        <div className="cgss-container">
          <h2 className="cgss-section-title">What You Will Master in This CGSS Training</h2>
          <p className="cgss-section-subtitle">Comprehensive sanctions compliance skills for banking, finance, and trade professionals</p>

          <div className="cgss-outcomes-grid">
            <div className="cgss-outcome-item">
              <div className="cgss-outcome-icon">1</div>
              <div className="cgss-outcome-text"><strong>Navigate Global Sanctions Regimes:</strong> Master OFAC, EU, UN, UK sanctions frameworks with real-world case studies from banking, trade finance, and correspondent banking sectors</div>
            </div>

            <div className="cgss-outcome-item">
              <div className="cgss-outcome-icon">2</div>
              <div className="cgss-outcome-text"><strong>Build Compliance Programs:</strong> Design and assess risk-based sanctions compliance programs including governance structures, policies, procedures, and internal controls</div>
            </div>

            <div className="cgss-outcome-item">
              <div className="cgss-outcome-icon">3</div>
              <div className="cgss-outcome-text"><strong>Detect Sanctions Evasion:</strong> Identify trade-based money laundering, maritime sanctions evasion, beneficial ownership concealment, and payment manipulation schemes</div>
            </div>

            <div className="cgss-outcome-item">
              <div className="cgss-outcome-icon">4</div>
              <div className="cgss-outcome-text"><strong>Perform Due Diligence & Screening:</strong> Conduct name screening, payment screening, KYC procedures, beneficial ownership verification, and manage false positives effectively</div>
            </div>

            <div className="cgss-outcome-item">
              <div className="cgss-outcome-icon">5</div>
              <div className="cgss-outcome-text"><strong>Conduct Investigations:</strong> Execute sanctions investigations, asset freeze procedures, regulatory reporting, escalation protocols, and licensing requirements</div>
            </div>

            <div className="cgss-outcome-item">
              <div className="cgss-outcome-icon">6</div>
              <div className="cgss-outcome-text"><strong>Pass CGSS Exam:</strong> Prepare confidently with exam strategies, practice questions, time management techniques, and study guide navigation for first-attempt success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Schedule */}


      {/* Who Should Attend */}
      <section id="audience" className="cgss-section cgss-audience-section">
        <div className="cgss-container">
          <h2 className="cgss-section-title">Who Should Attend CGSS Training?</h2>
          <p className="cgss-section-subtitle">This certification is essential for compliance, AML, KYC, and risk professionals across financial and Designated Non-Financial Businesses and Professions (DNFBPs)</p>

          <div className="cgss-audience-grid">
            <article className="cgss-audience-category">
              <h3>🏦 Financial Sector Professionals</h3>
              <ul className="cgss-role-list">
                <li><strong>Sanctions Compliance Officers</strong> and Sanctions Analysts</li>
                <li><strong>AML Investigators</strong>, Transaction Monitoring Analysts, FIU Staff</li>
                <li><strong>MLRO / Deputy MLRO</strong> (Money Laundering Reporting Officers)</li>
                <li><strong>KYC / CDD / EDD Teams</strong> performing customer due diligence</li>
                <li><strong>Correspondent Banking</strong> and Payments Operations staff</li>
                <li><strong>Trade Finance, Treasury, FX</strong> and Remittance Operations</li>
                <li><strong>Internal Audit</strong> and Compliance Testing Teams</li>
                <li><strong>Risk Management</strong> and Compliance Officers in banks</li>
              </ul>
            </article>

            <article className="cgss-audience-category">
              <h3>🏢 Non-Financial Sector Professionals</h3>
              <ul className="cgss-role-list">
                <li><strong>Export / Import Compliance Officers</strong> in trading companies</li>
                <li><strong>Shipping & Logistics Compliance</strong> Professionals</li>
                <li><strong>DPMS Sector Compliance</strong> (Dealers in Precious Metals & Stones)</li>
                <li><strong>Corporate Legal, Risk & Governance</strong> Professionals</li>
                <li><strong>Compliance Technology</strong>, Screening & RegTech teams</li>
                <li><strong>Free Zone Compliance Officers</strong> in free zones across the globe</li>
                <li><strong>Government & Regulatory Affairs</strong> Specialists</li>
                <li><strong>Consultants & Advisory Firms</strong> serving compliance clients</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Why Edu-Dubai */}
      <section id="benefits" className="cgss-section">
        <div className="cgss-container">
          <h2 className="cgss-section-title">Why Choose Edu-Dubai for CGSS Training?</h2>
          <p className="cgss-section-subtitle">Leading sanctions compliance training provider across the globe</p>

          <div className="cgss-benefits-grid">
            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Expert Instructors</h4>
              <p>Our trainers aren&apos;t just teachers; they are senior compliance executives with direct experience in sanctions screening and investigations at major international banks.</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Complete Materials</h4>
              <p>Receive ACAMS CGSS Study Guide, scenario-based practice quizzes, 100-question practice exam, and comprehensive reference materials</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Real Case Studies</h4>
              <p>Learn from actual enforcement actions including HSBC, BNP Paribas, Standard Chartered cases with detailed analysis of compliance failures and lessons learned</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Small Class Sizes</h4>
              <p>Limited to 15 participants per batch ensuring personalized attention, interactive discussions, and direct instructor engagement throughout the program</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Flexible Delivery</h4>
              <p>Choose from weekday evening, weekend, virtual online, or customized in-house corporate training formats to match your schedule and learning preferences</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Post-Training Support</h4>
              <p>Access 90-day post-training support including exam preparation guidance, study tips, and instructor consultation to ensure your certification success</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Proven Track Record</h4>
              <p>Join 500+ certified professionals trained by Edu-Dubai with 92% first-attempt pass rate and strong career advancement outcomes</p>
            </article>

            <article className="cgss-benefit-card">
              <h4><span className="cgss-benefit-icon">✓</span> Networking Opportunities</h4>
              <p>Connect with compliance professionals from leading banks, financial institutions, and multinational corporations across the globe</p>
            </article>
          </div>
        </div>
      </section>

      {/* Exam Information */}
      <section id="exam" className="cgss-section cgss-exam-section">
        <div className="cgss-container">
          <h2 className="cgss-section-title">CGSS Certification Exam Details</h2>
          <p className="cgss-section-subtitle">Everything you need to know about the ACAMS CGSS certification exam</p>

          <div className="cgss-exam-grid">
            <div className="cgss-exam-stat">
              <div className="cgss-exam-stat-number">100</div>
              <div className="cgss-exam-stat-label">Multiple Choice Questions</div>
            </div>

            <div className="cgss-exam-stat">
              <div className="cgss-exam-stat-number">150</div>
              <div className="cgss-exam-stat-label">Minutes Duration</div>
            </div>

            <div className="cgss-exam-stat">
              <div className="cgss-exam-stat-number">75%</div>
              <div className="cgss-exam-stat-label">Passing Score Required</div>
            </div>

            <div className="cgss-exam-stat">
              <div className="cgss-exam-stat-number">Online</div>
              <div className="cgss-exam-stat-label">Proctored Exam Format</div>
            </div>
          </div>

          <div className="cgss-exam-requirements">
            <h3>Exam Eligibility & Requirements</h3>
            <ul>
              <li><strong>No Prerequisites:</strong> Open to all professionals seeking sanctions compliance expertise</li>
              <li><strong>Study Materials:</strong> ACAMS CGSS Study Guide included in training</li>
              <li><strong>Exam Registration:</strong> Register directly through ACAMS website after completing training</li>
              <li><strong>Exam Fee:</strong> USD $795 for ACAMS members | USD $995 for non-members (separate from training fee)</li>
              <li><strong>Validity:</strong> 180 days from registration to schedule and complete your exam</li>
              <li><strong>Recertification:</strong> 30 ACAMS credits every 3 years to maintain certification</li>
              <li><strong>Language:</strong> Exam available in English only</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section
            <section id="faq" className="cgss-section cgss-faq-section">
                <div className="cgss-container">
                    <h2 className="cgss-section-title">Frequently Asked Questions</h2>
                    <p className="cgss-section-subtitle">Common questions about CGSS certification training across the globe</p>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">What is the difference between CGSS and CAMS certification?</div>
                        <div className="cgss-faq-answer">CAMS (Certified Anti-Money Laundering Specialist) covers broad AML compliance including customer due diligence, transaction monitoring, and reporting. CGSS (Certified Global Sanctions Specialist) focuses specifically on sanctions compliance including OFAC, EU, UN sanctions regimes, screening, and sanctions evasion detection. CGSS is ideal for professionals working in sanctions-heavy roles, while CAMS is broader AML certification.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">Is CGSS certification recognized across the globe?</div>
                        <div className="cgss-faq-answer">Yes, CGSS is highly valued by Central Banks, DFSA, ADGM, and major banks across the globe. Leading institutions actively seek CGSS-certified professionals for sanctions compliance roles.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">Do I need prior compliance experience to take CGSS training?</div>
                        <div className="cgss-faq-answer">No formal prerequisites exist, but the program is designed for professionals with basic understanding of financial services. Ideal candidates work in compliance, AML, KYC, risk, audit, or operations roles. Fresh graduates entering compliance careers can also benefit with dedicated study effort.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">What is included in the training fee?</div>
                        <div className="cgss-faq-answer">Training fee includes: 40 hours of live instructor-led training, ACAMS CGSS Study Guide (official textbook), practice quizzes and mock exams, case study materials, course completion certificate, 90-day post-training support, and lifetime access to training recordings. The ACAMS exam fee ($795-$995) is separate and paid directly to ACAMS.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">Can I attend the training online or must it be in-person?</div>
                        <div className="cgss-faq-answer">We offer both formats. Live virtual training via Zoom/Teams provides the same interactive experience as classroom training with real-time instructor interaction, breakout sessions, and Q&A. In-person training is available at our global training facilities. Both formats cover identical content and provide the same certification preparation.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">How soon can I take the CGSS exam after training?</div>
                        <div className="cgss-faq-answer">You can register for the exam immediately after training. We recommend 2-4 weeks of self-study using the ACAMS study guide and practice materials before attempting the exam. The exam can be scheduled at your convenience within 180 days of ACAMS registration.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">What is the pass rate for CGSS exam?</div>
                        <div className="cgss-faq-answer">ACAMS does not publish official pass rates. However, Edu-Dubai participants achieve approximately 92% first-attempt success rate when they complete the full training program and dedicate 30-40 hours of self-study before the exam.</div>
                    </div>

                    <div className="cgss-faq-item">
                        <div className="cgss-faq-question">Does Edu-Dubai offer corporate training for banks and financial institutions?</div>
                        <div className="cgss-faq-answer">Yes, we provide customized in-house CGSS training for corporate clients. Programs can be tailored to your organization&apos;s specific sanctions compliance needs, delivered at your office or our facility, and scheduled to minimize business disruption. Contact us for volume pricing and custom curriculum options.</div>
                    </div>
                </div>
            </section>
            */}
    </div>
  )
}
