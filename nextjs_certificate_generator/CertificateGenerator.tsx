'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './certificate.css';

type CertificateProps = {
  participantName: string;
  certificateNo: string;
};

export default function CertificateGenerator({
  participantName = 'Participant Name',
  certificateNo = 'CARF-2026-0001',
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: 1492,
      height: 1054,
      windowWidth: 1492,
      windowHeight: 1054,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Certificate aspect ratio is close to A4 landscape.
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(`${certificateNo}-${participantName}.pdf`.replace(/\s+/g, '_'));
  };

  return (
    <div className="certificate-tool">
      <div ref={certificateRef} className="certificate-canvas">
        <div className="left-panel">
          <div className="gold-line top-line" />

          <h1 className="certificate-title">CERTIFICATE</h1>
          <div className="certificate-subtitle">OF PARTICIPATION</div>
          <div className="gold-line small-line" />

          <p className="certify-text">This is to certify that</p>

          <h2 className="participant-name">{participantName}</h2>
          <div className="participant-underline" />

          <p className="webinar-text">has successfully participated in the webinar</p>

          <div className="program-title">
            THE HIDDEN OPERATIONAL RISKS<br />
            IN <span>CARF</span> REPORTING
          </div>
          <div className="gold-line title-line" />

          <p className="description-text">
            covering key operational challenges associated with the Crypto-Asset Reporting Framework (CARF),<br />
            including Self-Certification Controls, Due Diligence Requirements, Transaction Data Accuracy,<br />
            Classification Risks, and Governance Frameworks.
          </p>

          <div className="info-row">
            <div className="info-item date-item">
              <div className="icon calendar-icon" aria-hidden="true">
                <span />
              </div>
              <div>
                <div className="info-label">DATE</div>
                <div className="info-value">25 June 2026</div>
              </div>
            </div>

            <div className="divider" />

            <div className="info-item time-item">
              <div className="icon clock-icon" aria-hidden="true">
                <span />
              </div>
              <div>
                <div className="info-label">TIME</div>
                <div className="info-value">10:30 am to 11:30 am</div>
              </div>
            </div>

            <div className="divider" />

            <div className="info-item cert-item">
              <div className="icon certificate-icon" aria-hidden="true">
                <span />
              </div>
              <div>
                <div className="info-label">CERTIFICATE NO.</div>
                <div className="info-value">{certificateNo}</div>
              </div>
            </div>
          </div>

          <div className="signature-row">
            <div className="signature-block">
              <div className="signature signature-one">Sanjay Prabhu</div>
              <div className="signature-line" />
              <div className="sign-name">Adv. Sanjay Prabhu</div>
              <div className="sign-title">Director – Regulatory Compliance</div>
              <div className="sign-org">Edu-Dubai</div>
            </div>

            <div className="signature-divider" />

            <div className="signature-block second-signature">
              <div className="signature signature-two">Shaini</div>
              <div className="signature-line" />
              <div className="sign-name">Authorized Signatory</div>
              <div className="sign-title">Trans World Compliance</div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="diagonal-gold" />
          <div className="building-overlay" />

          <div className="logo-area">
            <img
              src="/cert-assets/edudubai-logo.png"
              alt="Edu-Dubai"
              className="edudubai-logo"
              crossOrigin="anonymous"
            />
            <div className="right-gold-line" />
            <img
              src="/cert-assets/transworld-logo.png"
              alt="Trans World Compliance"
              className="transworld-logo"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <div className="bottom-gold-border" />
      </div>

      <button type="button" onClick={downloadPDF} className="download-btn">
        Download Certificate PDF
      </button>
    </div>
  );
}
