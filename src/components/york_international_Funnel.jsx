import React from 'react';

const yorkinternationalFunnel = () => {
  return (
    <>
      <style>{`
        .funnel-container {
          max-width: 1000px;
          margin: 40px auto;
          font-family: 'Inter', -apple-system, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .funnel-row {
          display: grid;
          grid-template-columns: 1fr 400px 1fr;
          align-items: center;
          min-height: 120px;
          width: 100%;
        }
        .funnel-segment {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 20px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          transition: transform 0.2s ease;
        }
        .funnel-segment:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
        .segment-type {
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.05em;
        }
        .segment-title {
          font-size: 11px;
          opacity: 0.8;
          text-transform: uppercase;
          font-weight: 700;
          margin-top: 4px;
        }
        .side-content {
          padding: 0 30px;
        }
        .side-content.text-right { text-align: right; }
        .side-content.text-left { text-align: left; }
        .label {
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          color: #7c927b;
          margin-bottom: 4px;
        }
        .content {
          font-size: 12px;
          color: black;
          line-height: 1.4;
        }
        @media (max-width: 768px) {
          .funnel-row {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }
          .side-content { text-align: center !important; }
        }
      `}</style>
      <div className="funnel-container">
        
        <div className="funnel-row" key="phase-0">
          <div className="side-content text-right">
            <div className="label">Touchpoints & Tactics</div>
            <div className="content">Social Media - Organic Posts | Digital Screen Ads | Email Marketing - YFile News | Print Marketing</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#3b82f6', clipPath: 'polygon(0% 0%, 100% 0%, 92.5% 100%, 7.5% 100%)' }}>
            <div className="segment-type">Awareness</div>
            <div className="segment-title">Generate broad visibility and initial interest</div>
          </div>
          <div className="side-content text-left">
            <div className="label">Outcome</div>
            <div className="content">This established initial brand presence and drove a 25% increase in landing page traffic compared to baseline.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-1">
          <div className="side-content text-right">
            <div className="content">Event Marketing - Facebook Event | University Event Listings | Strategic Partnership - Student Clubs | Targeted Email Marketing - Faculty Partners
</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#6366f1', clipPath: 'polygon(7.5% 0%, 92.5% 0%, 85% 100%, 15% 100%)' }}>
            <div className="segment-type">Consideration</div>
            <div className="segment-title">Provide detailed program information</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This accessed highly-engaged audiences already interested in international experiences and generated a 20% increase in qualified inquiries from students with demonstrated interest in global education.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-2">
          <div className="side-content text-right">
            <div className="content">Email Marketing - Global Engagement Newsletter & This Week Newsletter | Email Signature Campaign | Direct Faculty Outreach | Experiential Education Coordinators | </div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#10b981', clipPath: 'polygon(15% 0%, 85% 0%, 77.5% 100%, 22.5% 100%)' }}>
            <div className="segment-type">Conversion</div>
            <div className="segment-title">Drive applications and registrations</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This reached students at the decision-making stage and drove a 40% increase in application completion rates.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-3">
          <div className="side-content text-right">
            <div className="content">Social Media - Student Feature Content | Email Marketing - Pre-Departure Series</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#f59e0b', clipPath: 'polygon(22.5% 0%, 77.5% 0%, 70% 100%, 30% 100%)' }}>
            <div className="segment-type">Loyalty</div>
            <div className="segment-title">The Pura Vida Alumni Circle</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This built excitement and community among confirmed participants and reduced the drop-out rate.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-4">
          <div className="side-content text-right">
            <div className="content">Social Media - User-Generated Content Campaign & Alumni Testimonial Series | Student Club Partnerships - Ambassador Program</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#f43f5e', clipPath: 'polygon(30% 0%, 70% 0%, 50% 100%)' }}>
            <div className="segment-type">Advocacy</div>
            <div className="segment-title">Referrals</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This leveraged peer influence for next cycle's awareness and consideration phases, as peer testimonials carry more weight than traditional ads.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default yorkinternationalFunnel;