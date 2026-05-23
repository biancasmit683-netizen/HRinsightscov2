import React from 'react'
import { Wordmark } from './shared'

// ─── style helpers ───────────────────────────────────────────────────────────
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
  docTitle: {
    fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', color: '#fff',
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
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ num, title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={S.sectionNumber}>{String(num).padStart(2,'0')} / 16</div>
      <div style={S.sectionHeading}>{title}</div>
      {children}
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
function PrivacyModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // prevent body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div style={S.overlay} role="dialog" aria-modal="true" aria-label="Privacy Notice">
      {/* Sticky header */}
      <div style={S.header}>
        <div>
          <Wordmark size={14} onInk />
          <div style={S.docMeta}>PRIVACY NOTICE · HR ANALYTICS (PTY) LTD</div>
        </div>
        <button style={S.closeBtn} onClick={onClose} aria-label="Close privacy notice">
          ×
        </button>
      </div>

      {/* Document body */}
      <div style={S.body}>

        <div style={S.heroHeading}>Privacy Notice</div>
        <div style={S.heroMeta}>
          LAST UPDATED: 23 MAY 2026 · VERSION 1.0
        </div>

        {/* ── 1. Introduction ─────────────────────────────────────────────── */}
        <Section num={1} title="Introduction">
          <p style={S.para}>
            This Privacy Policy explains how The HR Insights Co. collects, uses, stores, and protects
            personal information when we provide employee engagement surveys, HR analytics, and related
            workforce research services to our clients.
          </p>
          <p style={S.para}>
            We are committed to protecting the personal information entrusted to us and complying with
            the Protection of Personal Information Act, 4 of 2013 (POPIA). This policy applies to all
            personal information we process, including information collected through our website
            (thehrinsightsco.co.za), through surveys we conduct on behalf of our clients, and through
            any other interaction with our business.
          </p>
          <p style={S.para}>
            If you have questions about this policy or how we handle personal information, contact our
            Information Officer using the details in section 13.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 2. Who we are ────────────────────────────────────────────────── */}
        <Section num={2} title="Who we are and our role under POPIA">
          <p style={S.para}>
            The HR Insights Co. is a South African business that designs and delivers employee
            engagement surveys and workforce analytics on behalf of client organisations.
          </p>
          <p style={S.para}>
            Under POPIA, we typically act in one of two roles depending on the context:
          </p>
          <p style={S.para}>
            <strong style={{ color: '#fff' }}>As an Operator:</strong> When we process employee
            personal information on behalf of a client organisation (for example, when running an
            engagement survey for that client's staff), the client is the Responsible Party. We act
            as the Operator and process personal information only on the client's documented
            instructions and under a written agreement.
          </p>
          <p style={S.para}>
            <strong style={{ color: '#fff' }}>As a Responsible Party:</strong> When we collect
            information directly from you (for example, when you contact us via our website, email, or
            WhatsApp), we are the Responsible Party for that information.
          </p>
          <p style={S.para}>This policy explains how we handle information in both roles.</p>
        </Section>

        <div style={S.rule}/>

        {/* ── 3. Personal information we collect ───────────────────────────── */}
        <Section num={3} title="Personal information we collect">
          <p style={S.para}>
            The categories of personal information we collect depend on how you interact with us.
          </p>

          <div style={S.subHeading}>3.1 Information collected through engagement surveys</div>
          <p style={S.para}>
            When we run a survey on behalf of a client, we receive the following information about
            that client's employees from the client:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Employee identifier or number',
              'First name and surname',
              'Contact details (mobile phone number, email address)',
              'Job-related information (department, direct manager, site or location, job title, employment type)',
              'Demographic information (gender, race, age) where the client has chosen to include this for segmentation purposes',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
          <p style={S.para}>In addition, when an employee participates in a survey, we collect:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Survey responses (which are pseudonymous during the active survey period — responses are associated internally with a unique, randomly generated identifier, never with a respondent\'s name, phone number, or email address — and are reported only at group level, making them effectively anonymous in all outputs delivered to the client)',
              'Technical metadata related to survey completion (timestamps, device type, completion status)',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>3.2 Information collected via our website</div>
          <p style={S.para}>When you visit thehrinsightsco.co.za, we may collect:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Information you voluntarily provide via contact forms (name, email, phone number, message content)',
              'Standard server log information (IP address, browser type, pages visited, referring URL, date and time of access)',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>

          <div style={S.subHeading}>3.3 Information collected via WhatsApp</div>
          <p style={S.para}>
            When we send messages to survey participants via WhatsApp, we process:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Mobile phone numbers (provided by the client)',
              'Message delivery status (delivered, read, opt-out)',
              'Inbound replies (if the recipient replies to our messages)',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
          <p style={S.para}>
            We do not collect WhatsApp profile information beyond the phone number used for delivery.
          </p>

          <div style={S.subHeading}>3.4 Information collected via direct communications</div>
          <p style={S.para}>
            If you email, call, or otherwise contact us, we collect the information you provide in
            that communication.
          </p>

          <div style={S.subHeading}>3.5 How our survey platform processes personal information</div>
          <p style={S.para}>
            When we run an engagement survey on behalf of a client, personal information flows through
            a purpose-built survey platform hosted on Vercel (EU region) and backed by a Supabase
            Postgres database (EU West region). The following describes how personal information is
            handled at each stage of the survey lifecycle.
          </p>
          {[
            {
              title: 'Staff list upload',
              body: 'The client provides a staff list containing employee number, first name, WhatsApp number, email address, and any segmentation fields (such as department, site, manager, job title, or employment type). This information is uploaded to the platform by The HR Insights Co. administrator. Personal contact details — first name, WhatsApp number, and email address — are stored in dedicated, clearly separated database columns. All segmentation fields are stored separately and are never concatenated with or embedded alongside contact information. At the same time, the platform generates a unique, single-use access token for each staff member. This token is used to create the individual\'s personalised survey link. Tokens are randomly generated and are not derived from any personal information.',
            },
            {
              title: 'Survey delivery',
              body: 'When a survey is launched, the platform sends each staff member their unique survey link via WhatsApp (through Twilio) or email (through Resend), depending on which contact details are available. The message uses the staff member\'s first name in the greeting only. No other personal information is included in the message content. Message delivery status is recorded against each staff member record for operational purposes, including sending reminders to non-responders.',
            },
            {
              title: 'Survey submission',
              body: 'The survey form is token-gated. A respondent\'s link resolves to their unique token; the platform validates the token before displaying the form and marks it as used only after a successful submission, preventing duplicate responses. Survey responses are never stored alongside the respondent\'s name, phone number, or email address. Responses are stored with a snapshot of the respondent\'s segmentation metadata (for example, their department and site) taken at the time of submission. The only internal link between a response record and an identifiable individual is a database row identifier used to enforce single-use token logic and to track response rates; this identifier is never exposed in any report or export delivered to the client.',
            },
            {
              title: 'PII removal and data export',
              body: 'When a survey is formally closed, the administrator initiates a PII strip. This process sets the first name, WhatsApp number, and email address fields to null across all staff records for that survey. The PII strip event is recorded with a timestamp in the platform\'s audit log. The PII strip can only be performed once a survey is closed and cannot be applied to an active survey. Two export types are available, accessible only to The HR Insights Co. administrator and only after a survey is closed. The internal export contains employee numbers, all question responses, submission timestamps, and segmentation metadata; it is used for The HR Insights Co.\'s analysis only and is never shared with the client. The client-safe export contains only anonymous response data: each respondent is assigned a fresh random identifier generated at export time that bears no relationship to any internal record, and no employee number, name, phone number, or email address is included. Suppression is applied automatically — any segmentation segment with fewer than five respondents is excluded from the export entirely and recorded in a separate suppression log included in the file delivered to the client. All export events are recorded in the audit log with the export type, row count, and timestamp.',
            },
            {
              title: 'Infrastructure and access controls',
              body: 'All data is transmitted over HTTPS/TLS. Data at rest is encrypted by the database provider. Access to the administrator panel requires authenticated login; all administrator API routes verify the session on every request. Service credentials are stored as server-side environment variables and are never exposed to the browser or included in client-side code. The survey platform is hosted on Vercel (EU region) and Supabase (EU West); sub-operator details for both providers are listed in section 7.2 of this policy.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{title}</div>
              <p style={{ ...S.para, marginBottom: 0 }}>{body}</p>
            </div>
          ))}
        </Section>

        <div style={S.rule}/>

        {/* ── 4. How we collect ─────────────────────────────────────────────── */}
        <Section num={4} title="How we collect personal information">
          <p style={S.para}>We collect personal information in the following ways:</p>
          <ul style={{ paddingLeft: 20 }}>
            {[
              'From our clients: Client organisations provide us with employee contact and demographic data so that we can administer surveys on their behalf. We rely on our clients to ensure they have a lawful basis under POPIA to share this information with us and that their employees have been appropriately informed.',
              'Directly from individuals: When you submit information via our website contact form, email us, or respond to a survey we administer.',
              'Through automated means: Standard analytics and server logs when you visit our website. We also receive automated delivery and engagement data from WhatsApp and our messaging infrastructure providers.',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
        </Section>

        <div style={S.rule}/>

        {/* ── 5. Why we process ─────────────────────────────────────────────── */}
        <Section num={5} title="Why we process personal information">
          <p style={S.para}>
            We process personal information for the following purposes, relying on the lawful
            processing grounds set out in section 11 of POPIA:
          </p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Purpose</th>
                <th style={S.th}>Lawful basis</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Delivering employee engagement surveys on behalf of clients', 'Performance of a contract with the client; legitimate interest of the client employer in understanding workforce sentiment'],
                ['Producing anonymous, group-level analytical reports for clients', 'Same as above'],
                ['Communicating with survey participants (invitations, reminders, thank-you messages)', 'Legitimate interest of the client employer, with employee participation being voluntary'],
                ['Responding to enquiries received via our website, email, or telephone', 'Legitimate interest in operating our business; consent where applicable'],
                ['Improving our services and survey methodology', 'Legitimate interest, using aggregated and anonymised data only'],
                ['Complying with legal and regulatory obligations', 'Compliance with law'],
              ].map(([purpose, basis], i) => (
                <tr key={i}>
                  <td style={S.td}>{purpose}</td>
                  <td style={S.td}>{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={S.para}>
            Survey participation is always voluntary. Employees may decline to participate or withdraw
            at any time without consequence.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 6. WhatsApp ───────────────────────────────────────────────────── */}
        <Section num={6} title="How we use WhatsApp for survey delivery">
          <p style={S.para}>
            We use the WhatsApp Business Platform (operated by Meta Platforms Inc.) to deliver survey
            invitations, reminders, and thank-you messages to participating employees.
          </p>
          <div style={S.subHeading}>What this means for you</div>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Opt-in: Your employer has provided your phone number to us specifically for the purpose of this survey. Your employer is responsible for informing you in advance that you may receive a WhatsApp from us.',
              'Opt-out: You may opt out of receiving WhatsApp messages from us at any time by replying "STOP" to any message we send. Once you opt out, we will not send you further messages from that sender. Your opt-out is recorded immediately and permanently.',
              'Anonymity: Although we know your phone number (because your employer provided it), your survey responses remain anonymous. The link between your phone number and your responses is never shared with your employer or any third party. Responses are reported only at group level.',
              'What Meta sees: Meta processes the technical delivery of WhatsApp messages and necessarily sees the phone numbers, message content, and delivery status. Meta\'s handling of this data is governed by its own privacy terms, available at whatsapp.com/legal.',
              'What our messaging provider sees: We use Twilio Inc. as our messaging infrastructure provider. Twilio processes phone numbers and message metadata to deliver messages. Twilio acts as a sub-operator and is contractually bound to process personal information only on our documented instructions.',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
          <p style={S.para}>
            If you do not wish to receive WhatsApp messages from us at all, you can advise your
            employer and we will exclude your number from future sends.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 7. Who we share with ──────────────────────────────────────────── */}
        <Section num={7} title="Who we share personal information with">
          <p style={S.para}>
            We do not sell personal information. We share personal information only in the limited
            circumstances set out below.
          </p>

          <div style={S.subHeading}>7.1 Our client (the employer)</div>
          <p style={S.para}>
            For survey engagements, we share aggregated, anonymous results with the client employer.
            We never share individual responses or any data that could identify an individual
            respondent. To protect anonymity further, we suppress results for any segment with fewer
            than five responses.
          </p>

          <div style={S.subHeading}>7.2 Sub-operators (service providers)</div>
          <p style={S.para}>
            We use the following third parties to deliver our services. Each is contractually bound to
            process personal information only on our instructions and to apply appropriate security
            measures:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead>
                <tr>
                  <th style={S.th}>Sub-operator</th>
                  <th style={S.th}>Service</th>
                  <th style={S.th}>Information processed</th>
                  <th style={S.th}>Location</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Meta Platforms Inc. (WhatsApp Business Platform)', 'Messaging delivery to participants', 'Phone numbers, message content, delivery metadata', 'United States, with global infrastructure'],
                  ['Twilio Inc.', 'Messaging infrastructure and API', 'Phone numbers, message metadata', 'United States'],
                  ['Vercel Inc.', 'Website hosting; survey platform application hosting (EU deployment)', 'Website visitor information; staff contact data, survey responses, segmentation metadata, access tokens, audit logs (EU deployment only)', 'United States (website); European Union (survey platform)'],
                  ['Supabase Inc.', 'Survey database (Postgres) — stores staff records, responses, tokens, and audit logs', 'Staff contact data (pre-PII strip), survey responses, segmentation metadata, access tokens, audit logs', 'European Union (EU West region)'],
                  ['Resend Inc.', 'Email delivery for survey invitations and reminders', 'Email addresses, first names, message content', 'United States'],
                  ['Microsoft Corporation (M365)', 'Email, file storage, productivity', 'Communications, client files', 'Various, incl. South Africa region'],
                ].map(([name, service, info, location], i) => (
                  <tr key={i}>
                    <td style={S.td}>{name}</td>
                    <td style={S.td}>{service}</td>
                    <td style={S.td}>{info}</td>
                    <td style={S.td}>{location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={S.para}>
            Some of these sub-operators are located outside South Africa. Where personal information
            is transferred outside South Africa, we ensure that the receiving party is subject to
            laws, binding rules, or contractual arrangements that provide an adequate level of
            protection, as required by section 72 of POPIA.
          </p>

          <div style={S.subHeading}>7.3 Legal and regulatory disclosures</div>
          <p style={S.para}>
            We may disclose personal information if required by law, court order, or a legitimate
            request from a regulatory authority, including the Information Regulator of South Africa.
          </p>

          <div style={S.subHeading}>7.4 Business transfers</div>
          <p style={S.para}>
            If our business is sold, merged, or restructured, personal information may be transferred
            to the acquiring or successor entity. We will notify affected individuals where required
            by law.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 8. Retention ──────────────────────────────────────────────────── */}
        <Section num={8} title="How long we keep personal information">
          <p style={S.para}>
            We retain personal information only for as long as necessary to fulfil the purposes for
            which it was collected, subject to any legal retention requirements.
          </p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Category</th>
                <th style={S.th}>Retention period</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Client-supplied employee contact data (for survey delivery)', 'Deleted on written request once the final report has been delivered to the client; otherwise retained for the duration of the engagement and for up to 90 days thereafter for query-resolution purposes'],
                ['Survey responses (anonymised)', 'Retained in anonymised form for up to 24 months for benchmarking and methodology improvement, then deleted or further anonymised'],
                ['Website contact form submissions', 'Retained for 24 months from last contact, then deleted'],
                ['Business communications (emails, contracts)', 'Retained for 7 years for tax, audit, and contractual record-keeping purposes, as required by South African law'],
                ['WhatsApp opt-out records', 'Retained indefinitely to honour opt-out requests permanently'],
                ['Server logs', 'Retained for 12 months for security and operational purposes'],
              ].map(([cat, period], i) => (
                <tr key={i}>
                  <td style={S.td}>{cat}</td>
                  <td style={S.td}>{period}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={S.para}>
            We review retained personal information periodically and delete or anonymise information
            that is no longer needed.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 9. How we protect ─────────────────────────────────────────────── */}
        <Section num={9} title="How we protect personal information">
          <p style={S.para}>
            We apply reasonable technical and organisational security measures to protect personal
            information against loss, unauthorised access, alteration, disclosure, or destruction.
            These measures include:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Encrypted transmission of personal information (HTTPS for our website, TLS for email, end-to-end encryption for WhatsApp messages where applicable)',
              'Encrypted storage of personal information at rest',
              'Access controls limiting access to personal information to authorised personnel only',
              'Use of reputable cloud service providers with recognised security certifications',
              'Written agreements with all sub-operators requiring equivalent security measures',
              'Regular review of our security practices and incident response procedures',
              'A documented breach response plan that includes notification of the Information Regulator and affected data subjects within 72 hours of becoming aware of a security compromise, as required by POPIA',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
          <p style={S.para}>
            Despite our best efforts, no system is completely secure. If you have reason to believe
            that your personal information has been compromised, please contact our Information
            Officer immediately.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 10. Your rights ───────────────────────────────────────────────── */}
        <Section num={10} title="Your rights under POPIA">
          <p style={S.para}>
            POPIA gives you the following rights in relation to your personal information. You may
            exercise these rights free of charge by contacting our Information Officer using the
            details in section 13. We will respond within a reasonable time and, in any event, within
            the time periods required by law.
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            {[
              'Right to be notified: that personal information about you is being collected, and notified if it is subject to unauthorised access.',
              'Right of access: to confirm whether we hold personal information about you, and to receive a copy of that information.',
              'Right to correction or deletion: of personal information that is inaccurate, irrelevant, excessive, out of date, incomplete, misleading, or obtained unlawfully.',
              'Right to object: to the processing of personal information, on reasonable grounds.',
              'Right to withdraw consent: where processing is based on consent.',
              'Right to lodge a complaint: with the Information Regulator (see section 14).',
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
          <p style={S.para}>
            To exercise any of these rights, send a written request to our Information Officer. We
            may need to verify your identity before processing your request.
          </p>
          <p style={S.para}>
            If you are participating in a survey we are running on behalf of your employer, please be
            aware that your employer is the Responsible Party for your information. We will assist
            with rights requests but may need to coordinate with your employer.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 11. Children ──────────────────────────────────────────────────── */}
        <Section num={11} title="Children's information">
          <p style={S.para}>
            Our services are not directed at children under the age of 18. We do not knowingly
            collect personal information from children. If you believe we have inadvertently
            collected information about a child, contact our Information Officer and we will delete
            it promptly.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 12. Cookies ───────────────────────────────────────────────────── */}
        <Section num={12} title="Cookies and website tracking">
          <p style={S.para}>
            Our website uses minimal cookies necessary for basic functionality. We do not currently
            use advertising or marketing cookies. If we add additional cookies in future, we will
            update this policy and, where required, request your consent.
          </p>
          <p style={S.para}>
            You can configure your browser to refuse cookies or alert you when cookies are being
            sent. Some parts of our website may not function correctly if cookies are disabled.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 13. Contact ───────────────────────────────────────────────────── */}
        <Section num={13} title="Contact our Information Officer">
          <p style={S.para}>
            Our Information Officer is registered with the Information Regulator of South Africa.
          </p>
          <table style={S.table}>
            <tbody>
              {[
                ['Information Officer', 'B Janse van Vuuren'],
                ['Registered organisation', 'HR Analytics (Pty) Ltd, trading as The HR Insights Co.'],
                ['Information Regulator registration number', '2026-018806'],
                ['Registration date', '23 May 2026'],
                ['Email', <a key="email" href="mailto:info@thehrinsightsco.co.za" style={{ color: '#a6a6d4' }}>info@thehrinsightsco.co.za</a>],
                ['Website', <a key="web" href="https://thehrinsightsco.co.za" style={{ color: '#a6a6d4' }}>thehrinsightsco.co.za</a>],
              ].map(([label, value], i) => (
                <tr key={i}>
                  <td style={{ ...S.td, color: '#fff', fontWeight: 500, width: '40%' }}>{label}</td>
                  <td style={S.td}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={S.para}>
            We aim to respond to all privacy-related communications within 5 business days, and to
            formal POPIA requests within the timeframes required by law (typically 30 days,
            extendable in defined circumstances).
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 14. Complaints ────────────────────────────────────────────────── */}
        <Section num={14} title="Complaints to the Information Regulator">
          <p style={S.para}>
            If you are not satisfied with how we have handled your personal information or a
            privacy-related complaint, you have the right to lodge a complaint with the Information
            Regulator of South Africa.
          </p>
          <div style={{ background: '#ffffff08', padding: '20px 24px', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              Information Regulator of South Africa
            </div>
            {[
              'JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001',
              'PO Box 31533, Braamfontein, Johannesburg, 2017',
            ].map((line, i) => (
              <div key={i} style={{ fontSize: 13, color: '#c8caee', lineHeight: 1.6 }}>{line}</div>
            ))}
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <a href="mailto:enquiries@inforegulator.org.za" style={{ fontSize: 13, color: '#a6a6d4' }}>
                General enquiries: enquiries@inforegulator.org.za
              </a>
              <a href="mailto:POPIAComplaints@inforegulator.org.za" style={{ fontSize: 13, color: '#a6a6d4' }}>
                POPIA complaints: POPIAComplaints@inforegulator.org.za
              </a>
              <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#a6a6d4' }}>
                inforegulator.org.za
              </a>
            </div>
          </div>
          <p style={S.para}>
            We encourage you to contact us first so that we can attempt to resolve any concerns
            directly.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* ── 15. Changes ───────────────────────────────────────────────────── */}
        <Section num={15} title="Changes to this policy">
          <p style={S.para}>
            We may update this Privacy Policy from time to time to reflect changes in our practices,
            services, or legal requirements. When we make material changes, we will update the "Last
            updated" date at the top of this policy and, where appropriate, notify affected
            individuals through our website or by direct communication.
          </p>
          <p style={S.para}>We encourage you to review this policy periodically.</p>
        </Section>

        <div style={S.rule}/>

        {/* ── 16. Governing law ─────────────────────────────────────────────── */}
        <Section num={16} title="Governing law">
          <p style={S.para}>
            This policy is governed by the laws of the Republic of South Africa. Any disputes arising
            from this policy or our processing of personal information will be subject to the
            jurisdiction of the South African courts.
          </p>
        </Section>

        <div style={S.rule}/>

        {/* Footer note */}
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#a6a6d4', letterSpacing: '.06em', lineHeight: 1.8 }}>
          <div>This Privacy Policy is published by HR Analytics (Pty) Ltd, trading as The HR Insights Co.</div>
          <div>Registered with the Information Regulator of South Africa, registration number 2026-018806.</div>
        </div>

      </div>
    </div>
  );
}

export { PrivacyModal };
