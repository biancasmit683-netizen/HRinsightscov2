import React from 'react'
import { Wordmark } from './shared'

// ─── style helpers (mirrors page-privacy.jsx) ────────────────────────────────
const S = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'var(--ink)', color: '#e5e7ff',
    fontFamily: 'Inter, system-ui, sans-serif',
    overflowY: 'auto',
  },
  header: {
    position: 'sticky', top: 0, zIndex: 10,
    background: 'var(--ink)',
    borderBottom: '1px solid #ffffff14',
    padding: '18px 32px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  body: {
    maxWidth: 720, margin: '0 auto',
    padding: '56px 32px 96px',
  },
  docMeta: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10, color: '#a6a6d4', letterSpacing: '.08em',
    marginTop: 4,
  },
  closeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#a6a6d4', padding: '6px 8px', lineHeight: 1,
    fontSize: 22, fontWeight: 300,
    display: 'flex', alignItems: 'center',
  },
  heroHeading: {
    fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em',
    lineHeight: 1.1, color: '#fff', marginBottom: 8,
  },
  heroMeta: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11, color: '#a6a6d4', letterSpacing: '.08em',
    marginBottom: 48,
  },
  rule: {
    height: 1, background: '#ffffff14', margin: '40px 0',
  },
  sectionNumber: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10, color: '#a6a6d4', letterSpacing: '.12em',
    marginBottom: 6,
  },
  sectionHeading: {
    fontSize: 20, fontWeight: 600, letterSpacing: '-0.018em',
    color: '#fff', marginBottom: 14,
  },
  subHeading: {
    fontSize: 15, fontWeight: 600, color: '#fff',
    marginTop: 20, marginBottom: 8,
  },
  para: {
    fontSize: 15, lineHeight: 1.7, color: '#c8caee',
    marginBottom: 12,
  },
  li: {
    fontSize: 15, lineHeight: 1.7, color: '#c8caee',
    marginBottom: 6,
  },
  table: {
    width: '100%', borderCollapse: 'collapse',
    fontSize: 13, lineHeight: 1.5,
    marginTop: 12, marginBottom: 12,
  },
  th: {
    textAlign: 'left', padding: '8px 12px',
    background: '#ffffff0d',
    color: '#fff', fontWeight: 500,
    borderBottom: '1px solid #ffffff20',
  },
  td: {
    padding: '8px 12px', color: '#c8caee',
    borderBottom: '1px solid #ffffff0d',
    verticalAlign: 'top',
  },
  highlight: {
    background: '#ffffff08', padding: '20px 24px', marginBottom: 12,
  },
};

function Section({ num, total = 9, title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={S.sectionNumber}>{String(num).padStart(2,'0')} / {total}</div>
      <div style={S.sectionHeading}>{title}</div>
      {children}
    </div>
  );
}

function PAIAModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div style={S.overlay} role="dialog" aria-modal="true" aria-label="PAIA Manual">
      {/* Sticky header */}
      <div style={S.header}>
        <div>
          <Wordmark size={14} onInk />
          <div style={S.docMeta}>PAIA MANUAL · HR ANALYTICS (PTY) LTD</div>
        </div>
        <button style={S.closeBtn} onClick={onClose} aria-label="Close PAIA manual">
          ×
        </button>
      </div>

      <div style={S.body}>

        <div style={S.heroHeading}>PAIA Manual</div>
        <div style={S.heroMeta}>
          PROMOTION OF ACCESS TO INFORMATION ACT, 2 OF 2000 · LAST UPDATED: 23 MAY 2026 · VERSION 1.0
        </div>

        {/* ── 1. Introduction ─────────────────────────────────────────────── */}
        <Section num={1} title="Introduction">
          <p style={S.para}>
            This manual is published by HR Analytics (Pty) Ltd, trading as The HR Insights Co.,
            in compliance with section 51 of the Promotion of Access to Information Act, 2 of 2000
            (PAIA).
          </p>
          <p style={S.para}>
            PAIA gives effect to section 32 of the Constitution of the Republic of South Africa,
            which guarantees everyone the right of access to information held by the state or by
            another person, where that information is required to exercise or protect any right.
          </p>
          <p style={S.para}>
            This manual describes the categories of records held by our organisation, explains how
            to submit a request for access to those records, sets out the applicable fees, and
            identifies the grounds on which a request may be refused.
          </p>
          <p style={S.para}>
            The Information Regulator of South Africa has published a guide on how to use PAIA.
            That guide is available free of charge from the Information Regulator (see section 9).
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 2. The organisation ──────────────────────────────────────────── */}
        <Section num={2} title="The organisation and its Information Officer">
          <table style={S.table}>
            <tbody>
              {[
                ['Registered name', 'HR Analytics (Pty) Ltd'],
                ['Trading name', 'The HR Insights Co.'],
                ['Website', <a key="web" href="https://thehrinsightsco.co.za" style={{ color:'#a6a6d4' }}>thehrinsightsco.co.za</a>],
                ['General email', <a key="email" href="mailto:info@thehrinsightsco.co.za" style={{ color:'#a6a6d4' }}>info@thehrinsightsco.co.za</a>],
                ['Information Officer', 'B Janse van Vuuren'],
                ['Information Officer email', <a key="ioemail" href="mailto:info@thehrinsightsco.co.za" style={{ color:'#a6a6d4' }}>info@thehrinsightsco.co.za</a>],
                ['Information Regulator registration number', '2026-018806'],
                ['Registration date', '23 May 2026'],
              ].map(([label, value], i) => (
                <tr key={i}>
                  <td style={{ ...S.td, color:'#fff', fontWeight:500, width:'45%' }}>{label}</td>
                  <td style={S.td}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={S.para}>
            PAIA requests and related correspondence should be directed to the Information Officer
            at the email address above.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 3. Description of the organisation ───────────────────────────── */}
        <Section num={3} title="Description of the organisation">
          <p style={S.para}>
            HR Analytics (Pty) Ltd, trading as The HR Insights Co., is a South African professional
            services company that designs and delivers employee engagement surveys, workforce
            analytics, and remuneration advisory services to mid-sized South African organisations.
          </p>
          <p style={S.para}>Our work falls into three service areas:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Pulse Check — a structured data-readiness assessment that identifies which workforce metrics a client\'s data can support and where the gaps sit, delivered as a written analytical report.',
              'Implementation — hands-on data structuring and dashboard build, closing the specific gaps identified in the Pulse Check.',
              'Monthly Insights — ongoing dashboard maintenance and accompanying written analysis, turning workforce data into board-ready decisions each month.',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
          <p style={S.para}>
            The company does not employ staff directly beyond its three founders and does not operate
            physical premises open to the public. All client work is delivered remotely.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 4. Categories of records ─────────────────────────────────────── */}
        <Section num={4} title="Categories of records held">
          <p style={S.para}>
            The following categories of records are held by HR Analytics (Pty) Ltd. Not all records
            will be accessible under PAIA — access is subject to the grounds for refusal set out in
            section 7 of this manual.
          </p>

          <div style={S.subHeading}>Client records</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {[
              'Engagement letters and service agreements',
              'Scope of work documents and project correspondence',
              'Invoices and payment records',
              'Deliverables and reports produced for clients',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>Survey and analytics records</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {[
              'Employee lists supplied by clients (held only for the duration of the engagement)',
              'Anonymised and pseudonymised survey response data',
              'Workforce analytics reports and dashboards',
              'Data processing logs and audit trails',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>Financial and administrative records</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {[
              'Financial statements and management accounts',
              'Tax records and SARS correspondence',
              'Bank records',
              'Supplier and sub-contractor agreements',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>People records</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {[
              'Records relating to founders and any contractors engaged by the company',
              'Independent contractor agreements',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>Website and communications records</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {[
              'Website contact form submissions',
              'Email and business communications',
              'Server logs (retained for 12 months)',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>Statutory and compliance records</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            {[
              'Company registration documents',
              'POPIA Information Officer registration',
              'This PAIA manual and any associated records',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
        </Section>

        <div style={S.rule}/>

        {/* ── 5. How to submit a request ───────────────────────────────────── */}
        <Section num={5} title="How to submit a request for access">
          <p style={S.para}>
            Any person wishing to request access to a record held by HR Analytics (Pty) Ltd must
            submit a written request to the Information Officer. Requests must be made on the
            prescribed Form C, which is available from the Information Regulator of South Africa at{' '}
            <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" style={{ color:'#a6a6d4' }}>
              inforegulator.org.za
            </a>.
          </p>

          <div style={S.subHeading}>How to submit</div>
          <p style={S.para}>
            Completed requests must be submitted by email to our Information Officer at{' '}
            <a href="mailto:info@thehrinsightsco.co.za" style={{ color:'#a6a6d4' }}>
              info@thehrinsightsco.co.za
            </a>.
            Please include "PAIA Request" in the subject line.
          </p>

          <div style={S.subHeading}>What your request must include</div>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Your full name, contact details, and identity number (or, if requesting on behalf of another person, that person\'s details and your authority to act on their behalf)',
              'A description of the record you are requesting, in sufficient detail to enable us to identify it',
              'The form in which you wish to receive the record (e.g. copy, inspection, electronic format)',
              'The right you are seeking to exercise or protect, and why access to the record is required for that purpose',
              'If applicable, confirmation that you are seeking access on behalf of a public or private body',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>Response timeframe</div>
          <p style={S.para}>
            We will acknowledge receipt of your request and provide a decision within 30 days of
            receiving a valid, complete request. In exceptional circumstances this period may be
            extended by a further 30 days, in which case we will notify you in writing with the
            reason for the extension.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 6. Prescribed forms ──────────────────────────────────────────── */}
        <Section num={6} title="Prescribed forms">
          <p style={S.para}>
            The following form applies to requests made to HR Analytics (Pty) Ltd as a private body:
          </p>
          <div style={S.highlight}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
              Form C — Request for access to records of a private body
            </div>
            <p style={{ ...S.para, marginBottom: 8 }}>
              This is the prescribed form for all PAIA requests submitted to private bodies.
              It is available free of charge from the Information Regulator.
            </p>
            <a
              href="https://inforegulator.org.za"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color:'#a6a6d4' }}
            >
              Download from inforegulator.org.za →
            </a>
          </div>
        </Section>

        <div style={S.rule}/>

        {/* ── 7. Fees ──────────────────────────────────────────────────────── */}
        <Section num={7} title="Fees">
          <p style={S.para}>
            PAIA provides for prescribed fees in relation to requests for access. Fees are set by
            regulation and are subject to change. The current schedule is published by the
            Information Regulator.
          </p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Fee type</th>
                <th style={S.th}>Amount</th>
                <th style={S.th}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Request fee', 'R 50.00', 'Payable on submission of a request. Non-refundable regardless of outcome.'],
                ['Access fee (copies)', 'As prescribed', 'Charged per page of the record copied. Current rates set by the PAIA Regulations.'],
                ['Access fee (electronic)', 'As prescribed', 'Charged per electronic copy prepared on a CD, USB, or similar medium.'],
                ['Reproduction fee', 'As prescribed', 'For records not in written form (e.g. audio or visual records).'],
                ['Search and preparation time', 'As prescribed', 'Charged per hour where more than six hours of search or preparation time is required.'],
              ].map(([type, amount, notes], i) => (
                <tr key={i}>
                  <td style={{ ...S.td, color:'#fff', fontWeight:500 }}>{type}</td>
                  <td style={S.td}>{amount}</td>
                  <td style={S.td}>{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={S.para}>
            Where the total fee is estimated to exceed R 50.00, we will notify you of the estimated
            amount and may require a deposit before proceeding. Fees must be paid before access is
            granted.
          </p>
          <p style={S.para}>
            Persons whose financial circumstances prevent them from paying the request fee may apply
            for a waiver in writing, setting out the grounds. We will consider such applications at
            our reasonable discretion.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 8. Grounds for refusal ───────────────────────────────────────── */}
        <Section num={8} title="Grounds on which a request may be refused">
          <p style={S.para}>
            HR Analytics (Pty) Ltd may refuse a request for access to a record on one or more of
            the following grounds, as provided for in PAIA:
          </p>

          {[
            {
              heading: 'Mandatory protection of privacy',
              body: 'A request will be refused where disclosure would involve the unreasonable disclosure of personal information about a third party, including a natural person or a deceased person, unless that person has consented to the disclosure.',
            },
            {
              heading: 'Commercial information of a third party',
              body: 'A request will be refused where the record contains trade secrets, financial, commercial, scientific, or technical information of a third party whose disclosure could reasonably be expected to harm the commercial or financial interests of that party.',
            },
            {
              heading: 'Confidential information of a third party',
              body: 'A request will be refused where the record contains information supplied in confidence by a third party, and disclosure could reasonably be expected to put that party at a disadvantage in contractual or other negotiations, or prejudice that party in commercial competition.',
            },
            {
              heading: 'Research information',
              body: 'A request will be refused where the record contains information about research being or to be carried out by or on behalf of a third party, and disclosure could reasonably be expected to expose the research, the researcher, or the subject of the research to serious disadvantage.',
            },
            {
              heading: 'Records not available',
              body: 'A request will be refused where the record does not exist, cannot be found after all reasonable steps have been taken to locate it, or is in a form that cannot be reproduced.',
            },
            {
              heading: 'Records that are not subject to PAIA',
              body: 'A request will be refused where the record is not subject to PAIA, for example where it falls outside the scope of information held by HR Analytics (Pty) Ltd as a private body.',
            },
          ].map(({ heading, body }) => (
            <div key={heading} style={{ marginBottom: 16 }}>
              <div style={S.subHeading}>{heading}</div>
              <p style={{ ...S.para, marginBottom: 0 }}>{body}</p>
            </div>
          ))}

          <p style={S.para} style={{ marginTop: 16, ...S.para }}>
            Where we refuse a request, we will notify you in writing of the reasons for refusal and
            advise you of your right to appeal or seek judicial review in terms of PAIA.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 9. Information Regulator ─────────────────────────────────────── */}
        <Section num={9} title="The Information Regulator and guide to PAIA">
          <p style={S.para}>
            The Information Regulator of South Africa is the body responsible for overseeing
            compliance with PAIA and the Protection of Personal Information Act (POPIA). The
            Information Regulator has published a guide on how to use PAIA, which is available
            free of charge.
          </p>
          <div style={S.highlight}>
            <div style={{ fontSize: 14, fontWeight: 600, color:'#fff', marginBottom: 8 }}>
              Information Regulator of South Africa
            </div>
            {[
              'JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001',
              'PO Box 31533, Braamfontein, Johannesburg, 2017',
            ].map((line, i) => (
              <div key={i} style={{ fontSize: 13, color:'#c8caee', lineHeight: 1.6 }}>{line}</div>
            ))}
            <div style={{ marginTop: 10, display:'flex', flexDirection:'column', gap: 4 }}>
              <a href="mailto:enquiries@inforegulator.org.za" style={{ fontSize:13, color:'#a6a6d4' }}>
                General enquiries: enquiries@inforegulator.org.za
              </a>
              <a href="mailto:PAIAComplaints@inforegulator.org.za" style={{ fontSize:13, color:'#a6a6d4' }}>
                PAIA complaints: PAIAComplaints@inforegulator.org.za
              </a>
              <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:'#a6a6d4' }}>
                inforegulator.org.za
              </a>
            </div>
          </div>
          <p style={S.para}>
            If you are not satisfied with the outcome of a PAIA request or wish to lodge a complaint
            about our handling of a request, you may approach the Information Regulator.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* Footer note */}
        <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, color:'#a6a6d4', letterSpacing:'.06em', lineHeight:1.8 }}>
          <div>This PAIA Manual is published by HR Analytics (Pty) Ltd, trading as The HR Insights Co.</div>
          <div>Published in compliance with section 51 of the Promotion of Access to Information Act, 2 of 2000.</div>
          <div>Version 1.0 · 23 May 2026.</div>
        </div>

      </div>
    </div>
  );
}

export { PAIAModal };
