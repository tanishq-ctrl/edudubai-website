"use client"

import React from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { Course } from "@/lib/types"

interface CourseCustomContentProps {
  course: Course
}

export function CourseCustomContent({ course }: CourseCustomContentProps) {
  // Default values if data is missing
  const programOverview = course.programOverview || {
    whatIs: `The ${course.title} is a premier professional certification designed to provide mastery in ${course.category.replace(/_/g, ' ')}.`,
    whyItMatters: `As the regulatory landscape evolves, the demand for specialists in ${course.category.replace(/_/g, ' ')} is at an all-time high.`,
    jobReadySkills: `This program builds real-world capability in ${course.category.replace(/_/g, ' ')} essential for career advancement.`
  }

  const examInfo = course.examInfo || {
    questions: "Varies",
    duration: "120-180 Minutes",
    passingScore: "70-75%",
    format: "Multiple Choice Questions",
    requirements: ["Completion of training", "Study guide mastery", "Proctored exam"]
  }

  const whyChooseUs = course.whyChooseUs || {
    title: "Why Choose Edu-Dubai?",
    description: "Leading professional training provider in the MENA region.",
    points: ["Expert Instructors", "Modern Curriculum", "High Pass Rates", "Industry Recognition"]
  }

  return (
    <div className="course-custom-wrapper">
      {/* Training Schedule */}
      {course.deliverySchedules && (
        <section id="schedule" className="course-section course-schedule-section">
          <div className="course-container">
            <h2 className="course-section-title">Flexible Training Schedule Options</h2>
            <p className="course-section-subtitle">Choose the format that fits your professional schedule</p>

            <div className="course-schedule-grid">
              {course.deliverySchedules.map((schedule, idx) => (
                <article className="course-schedule-card" key={idx}>
                  <h3>{schedule.name}</h3>
                  <div className="course-schedule-details">
                    <p><strong>Days:</strong> {schedule.schedule}</p>
                    <p><strong>Time:</strong> {schedule.duration}</p>
                  </div>
                  <span className="course-schedule-badge">
                    {idx === 0 ? "Most Popular" : idx === 1 ? "Intensive" : "Custom Solution"}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .course-custom-wrapper {
          font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: rgb(var(--text));
          background: rgb(var(--surface-raised));
        }

        /* Section Styles */
        .course-section {
          padding: var(--section-sm) var(--gutter);
        }

        .course-container {
          max-width: 80rem;
          margin: 0 auto;
        }

        .course-section-title {
          font-size: var(--step-4);
          color: rgb(var(--navy-900));
          margin-bottom: 15px;
          text-align: center;
          font-weight: 700;
        }

        .course-section-subtitle {
          font-size: var(--step-1);
          color: rgb(var(--text-muted));
          text-align: center;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Program Overview */
        .course-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .course-overview-card {
          background: rgb(var(--surface-sunken));
          padding: 30px;
          border-radius: var(--radius-lg);
          border-left: 4px solid rgb(var(--gold-400));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
        }

        .course-overview-card:hover {
          transform: translateY(-5px);
        }

        .course-overview-card h3 {
          color: rgb(var(--navy-900));
          font-size: var(--step-2);
          margin-bottom: 15px;
          font-weight: 700;
        }

        .course-overview-card p {
          color: rgb(var(--text));
          line-height: 1.8;
        }

        /* Learning Outcomes */
        .course-outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }

        .course-outcome-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: white;
          border-radius: var(--radius-sm);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .course-outcome-icon {
          background: linear-gradient(135deg, rgb(var(--gold-400)) 0%, rgb(var(--gold-300)) 100%);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: var(--step-1);
          flex-shrink: 0;
        }

        .course-outcome-text {
          color: rgb(var(--text));
          line-height: 1.6;
        }

        /* Schedule Section */
        .course-schedule-section {
          background: linear-gradient(to bottom, rgb(var(--surface-sunken)) 0%, rgb(var(--surface-raised)) 100%);
        }

        .course-schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .course-schedule-card {
          background: white;
          padding: 30px;
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          border-top: 4px solid rgb(var(--gold-400));
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .course-schedule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .course-schedule-card h3 {
          color: rgb(var(--navy-900));
          font-size: var(--step-2);
          margin-bottom: 15px;
          font-weight: 700;
        }

        .course-schedule-details {
          color: rgb(var(--text));
          margin-bottom: 15px;
          line-height: 1.8;
        }

        .course-schedule-badge {
          display: inline-block;
          background: rgb(var(--navy-50));
          color: rgb(var(--navy-900));
          padding: 6px 12px;
          border-radius: var(--radius-lg);
          font-size: var(--step--1);
          font-weight: 600;
          margin-top: 10px;
        }

        /* Who Should Attend */
        .course-audience-section {
          background: rgb(var(--navy-50));
        }

        .course-audience-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .course-audience-category {
          background: white;
          padding: 35px;
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .course-audience-category h3 {
          color: rgb(var(--navy-900));
          font-size: var(--step-3);
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 3px solid rgb(var(--gold-400));
          font-weight: 700;
        }

        .course-role-list {
          list-style: none;
        }

        .course-role-list li {
          padding: 12px 0 12px 30px;
          color: rgb(var(--text));
          position: relative;
          line-height: 1.6;
          border-bottom: 1px solid rgb(var(--line));
        }

        .course-role-list li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: rgb(var(--gold-400));
          font-weight: bold;
          font-size: var(--step-1);
        }

        /* Benefits Section */
        .course-benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .course-benefit-card {
          background: linear-gradient(135deg, rgb(var(--surface-sunken)) 0%, rgb(var(--surface-raised)) 100%);
          padding: 25px;
          border-radius: var(--radius);
          border-left: 4px solid rgb(var(--navy-600));
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        }

        .course-benefit-card h3 {
          color: rgb(var(--navy-900));
          font-size: var(--step-1);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
        }

        .course-benefit-icon {
          background: linear-gradient(135deg, rgb(var(--navy-600)) 0%, rgb(var(--navy-700)) 100%);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--step--1);
        }

        .course-benefit-card p {
          color: rgb(var(--text));
          line-height: 1.6;
        }

        /* Exam Info */
        .course-exam-section {
          background: rgb(var(--gold-50));
        }

        .course-exam-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .course-exam-stat {
          background: white;
          padding: 25px;
          border-radius: var(--radius);
          text-align: center;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          border-top: 3px solid rgb(var(--gold-400));
        }

        .course-exam-stat-number {
          font-size: var(--step-4);
          font-weight: bold;
          color: rgb(var(--navy-900));
          margin-bottom: 10px;
        }

        .course-exam-stat-label {
          color: rgb(var(--text-muted));
          font-size: var(--step--1);
        }

        .course-exam-requirements {
          background: white;
          padding: 30px;
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .course-exam-requirements h3 {
          color: rgb(var(--navy-900));
          font-size: var(--step-2);
          margin-bottom: 20px;
          font-weight: 700;
        }

        .course-exam-requirements ul {
          list-style: none;
        }

        .course-exam-requirements li {
          padding: 12px 0 12px 35px;
          color: rgb(var(--text));
          position: relative;
          line-height: 1.6;
        }

        .course-exam-requirements li::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: rgb(var(--gold-400));
          font-size: var(--step-0);
        }

        /* FAQ Section */
        .course-faq-section {
          background: rgb(var(--surface-sunken));
        }

        .course-faq-item {
          background: white;
          padding: 25px;
          margin-bottom: 15px;
          border-radius: var(--radius-sm);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .course-faq-question {
          color: rgb(var(--navy-900));
          font-size: var(--step-1);
          font-weight: bold;
          margin-bottom: 10px;
        }

        .course-faq-answer {
          color: rgb(var(--text));
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .course-section-title {
            font-size: var(--step-3);
          }

          .course-audience-grid {
            grid-template-columns: 1fr;
          }
        }
      ` }} />



      {/* Program Overview Section */}
      <section id="overview" className="course-section">
        <div className="course-container">
          <h2 className="course-section-title">{course.title} Preparation Training</h2>
          <p className="course-section-subtitle">Leading professional certification training in the MENA region</p>

          <div className="course-overview-grid">
            <article className="course-overview-card">
              <h3>Program Overview</h3>
              <p>{programOverview.whatIs}</p>
            </article>

            <article className="course-overview-card">
              <h3>Why It Matters</h3>
              <p>{programOverview.whyItMatters}</p>
            </article>

            <article className="course-overview-card">
              <h3>Job-Ready Skills</h3>
              <p>{programOverview.jobReadySkills}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section id="outcomes" className="course-section">
        <div className="course-container">
          <h2 className="course-section-title">What You Will Master in This Training</h2>
          <p className="course-section-subtitle">Comprehensive {course.category.replace(/_/g, ' ')} skills for banking and finance professionals</p>

          <div className="course-outcomes-grid">
            {course.outcomes.slice(0, 6).map((outcome, idx) => {
              const parts = outcome.split(':')
              const title = parts[0]
              const description = parts.slice(1).join(':')

              return (
                <div className="course-outcome-item" key={idx}>
                  <div className="course-outcome-icon">{idx + 1}</div>
                  <div className="course-outcome-text">
                    {description ? (
                      <>
                        <strong>{title}:</strong> {description}
                      </>
                    ) : (
                      outcome
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section id="audience" className="course-section course-audience-section">
        <div className="course-container">
          <h2 className="course-section-title">Who Should Attend?</h2>
          <p className="course-section-subtitle">This certification is essential for compliance and risk professionals across the financial sector</p>

          <div className="course-audience-grid">
            {(course.audienceCategories || [
              { title: "🏦 Financial Professionals", roles: course.whoItsFor.slice(0, 5) },
              { title: "⚖️ Risk & Legal", roles: course.whoItsFor.slice(5) }
            ]).map((cat, idx) => (
              <article className="course-audience-category" key={idx}>
                <h3>{cat.title}</h3>
                <ul className="course-role-list">
                  {cat.roles.map((role, ridx) => (
                    <li key={ridx}><strong>{role}</strong></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Edu-Dubai */}
      <section id="benefits" className="course-section">
        <div className="course-container">
          <h2 className="course-section-title">Why Choose Edu-Dubai?</h2>
          <p className="course-section-subtitle">Leading professional training provider in the MENA region</p>

          <div className="course-benefits-grid">
            {(course.whyChooseUs?.points || [
              "Expert Instructors with 15+ years experience",
              "Complete Study Materials and Practice Exams",
              "Interactive Live Virtual and In-Person classes",
              "90-Day Post-Training Support",
              "Proven Pass Rate across MENA",
              "Global Recognition within the Industry"
            ]).map((point, idx) => {
              const parts = point.split(':')
              const title = parts.length > 1 ? parts[0] : (idx === 0 ? "Expert Tip" : idx === 1 ? "Resources" : idx === 2 ? "Quality" : idx === 3 ? "Support" : idx === 4 ? "Results" : "Network")
              const text = parts.length > 1 ? parts.slice(1).join(':') : point

              return (
                <article className="course-benefit-card" key={idx}>
                  <h3><span className="course-benefit-icon">✓</span> {title}</h3>
                  <p>{text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Exam Information */}
      <section id="exam" className="course-section course-exam-section">
        <div className="course-container">
          <h2 className="course-section-title">Certification Exam Details</h2>
          <p className="course-section-subtitle">Everything you need to know about the certification process</p>

          <div className="course-exam-grid">
            <div className="course-exam-stat">
              <div className="course-exam-stat-number">{examInfo.questions}</div>
              <div className="course-exam-stat-label">Questions</div>
            </div>

            <div className="course-exam-stat">
              <div className="course-exam-stat-number">{examInfo.duration}</div>
              <div className="course-exam-stat-label">Duration</div>
            </div>

            <div className="course-exam-stat">
              <div className="course-exam-stat-number">{examInfo.passingScore}</div>
              <div className="course-exam-stat-label">Passing Score</div>
            </div>

            <div className="course-exam-stat">
              <div className="course-exam-stat-number">{examInfo.format || "Online"}</div>
              <div className="course-exam-stat-label">Exam Format</div>
            </div>
          </div>

          <div className="course-exam-requirements">
            <h3>Exam Eligibility & Requirements</h3>
            {examInfo.requirements && typeof examInfo.requirements[0] !== 'string' ? (
              <div>
                {(examInfo.requirements as Array<{ title: string; items: string[] }>).map((section, idx) => {
                  if (section.title === "Disclaimer") {
                    return (
                      <p key={idx} style={{ marginTop: '15px', borderTop: '1px solid rgb(var(--line))', paddingTop: '10px', fontSize: '0.85em', color: 'rgb(var(--text-muted))', lineHeight: '1.4' }}>
                        <strong>Disclaimer:</strong> {section.items[0]}
                      </p>
                    )
                  }

                  return (
                    <div key={idx} className={idx > 0 ? "mt-6" : ""}>
                      {section.title !== "Exam Eligibility & Requirements" && (
                        <h3 className="text-lg font-bold text-navy-700 mb-2 border-b border-gold-400/20 pb-1">{section.title}</h3>
                      )}
                      <ul>
                        {section.items.map((item, i) => {
                          const firstColonIndex = item.indexOf(':');
                          if (firstColonIndex !== -1) {
                            const title = item.substring(0, firstColonIndex);
                            const desc = item.substring(firstColonIndex + 1);
                            return (
                              <li key={i}>
                                <strong>{title}:</strong>{desc}
                              </li>
                            );
                          }
                          return <li key={i}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  )
                })}
              </div>
            ) : (
              <ul>
                {(examInfo.requirements || []).map((req, idx) => (
                  <li key={idx}><strong>{req as string}</strong></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section
      <section id="faq" className="course-section course-faq-section">
        <div className="course-container">
          <h2 className="course-section-title">Frequently Asked Questions</h2>
          <p className="course-section-subtitle">Common questions about {course.title} training</p>

          {course.faq.map((item, idx) => (
            <div className="course-faq-item" key={idx}>
              <div className="course-faq-question">{item.question}</div>
              <div className="course-faq-answer">{item.answer}</div>
            </div>
          ))}
        </div>
      </section>
      */}
    </div>
  )
}
