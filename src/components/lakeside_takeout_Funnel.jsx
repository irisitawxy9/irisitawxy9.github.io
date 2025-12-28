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
            <div className="content">Social Media - Organic Posts | Highway Signage | Third-Party Partner Listing - MyCollingwood.ca | Elevator Flyers | Print Posters</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#3b82f6', clipPath: 'polygon(0% 0%, 100% 0%, 92.5% 100%, 7.5% 100%)' }}>
            <div className="segment-type">Awareness</div>
            <div className="segment-title">Generate broad visibility and initial interest in takeout offerings</div>
          </div>
          <div className="side-content text-left">
            <div className="label">Outcome</div>
            <div className="content">This established brand presence within the local community and drove a 35% increase in profile visits and a 40% increase in first-time takeout customers.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-1">
          <div className="side-content text-right">
            <div className="content">Event Marketing - Facebook Event | Website Enhancement | Email Marketing - Customer Database</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#6366f1', clipPath: 'polygon(7.5% 0%, 92.5% 0%, 85% 100%, 15% 100%)' }}>
            <div className="segment-type">Consideration</div>
            <div className="segment-title">Provide detailed menu information</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This re-engaged existing customers and provided comprehensive information for new customers, driving a 55% increase in repeat customer orders and 85% increase in online menu views.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-2">
          <div className="side-content text-right">
            <div className="content">Hotel Guest Pre-Arrival Email | Email Signature Campaign | Social Media - Promotional Posts | Website - Online Ordering Integration</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#10b981', clipPath: 'polygon(15% 0%, 85% 0%, 77.5% 100%, 22.5% 100%)' }}>
            <div className="segment-type">Conversion</div>
            <div className="segment-title">Drive immediate takeout orders</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This captured travelers during trip planning and created urgency, generating higher order volume on promotional post days.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-3">
          <div className="side-content text-right">
            <div className="content">Email Marketing - Post-Purchase Follow-Up | Social Media - Customer Feature Content | Loyalty Program Communication</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#f59e0b', clipPath: 'polygon(22.5% 0%, 77.5% 0%, 70% 100%, 30% 100%)' }}>
            <div className="segment-type">Loyalty</div>
            <div className="segment-title">Encourage repeat orders</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This built relationship with new takeout customers and increased repeat order rate among first-time customers.</div>
          </div>
        </div>
        <div className="funnel-row" key="phase-4">
          <div className="side-content text-right">
            <div className="content">Email Marketing - Review Request Campaign | Social Media - Testimonial Sharing | Referral Incentive Program</div>
          </div>
          <div className="funnel-segment" style={{ backgroundColor: '#f43f5e', clipPath: 'polygon(30% 0%, 70% 0%, 50% 100%)' }}>
            <div className="segment-type">Advocacy</div>
            <div className="segment-title">Referrals</div>
          </div>
          <div className="side-content text-left">
            <div className="content">This generated positive reviews and referred customers.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default yorkinternationalFunnel;