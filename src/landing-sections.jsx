import React from 'react'
import { Icon, useIsMobile } from './shared'
import { SectionLabel, SectionHead, BtnOrange, Field, inputStyle, labelStyle, FadeSection } from './ui'

// Landing page sections — in order of appearance.

// ---------- Section 2: About -----------------------------------------------
function AboutSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="about" style={{ background:'#fff', padding: isMobile ? '56px 20px' : '96px 48px' }}>
      <SectionHead last index="01 / ABOUT" title="Built for the decision."
        lede="The HR Insights Co. helps mid-sized South African organisations turn fragmented workforce data into financial decisions. Founded by three women from HR, finance, and data, we connect HR metrics with financial cost, give teams one reliable view of what is happening, and measure ourselves on whether the data changed a decision."/>
    </section>
  );
}

// ---------- Section 3: Our Audience ----------------------------------------
function AudienceSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="audience" style={{ background:'var(--paper)', padding: isMobile ? '56px 20px' : '96px 48px', borderTop:'1px solid var(--rule)' }}>
      <SectionHead index="02 / OUR AUDIENCE" title="Two audiences. One shared view."
        lede="The CFO carries the people cost line. The HR leader carries the people. We give both the same numbers, framed for the decisions each of them makes."/>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 16 : 20 }}>
        {!isMobile && <div/>}
        <AudienceCard
          role="CFO"
          line="You carry the people cost line and rarely see workforce data framed in terms you can act on."
          bullets={[
            'Labour cost as % of revenue, against plan',
            'Cost of turnover, separated: regrettable vs not',
            'People cost mix: permanent, overtime, agency',
          ]}
        />
        <AudienceCard
          role="HR Leader"
          line="You want your insights to land with the numbers to back them."
          bullets={[
            'Engagement read, operationalised by population',
            'Time to fill, on the critical roles',
            'Retention economics, not retention sentiment',
          ]}
          accent
        />
      </div>
    </section>
  );
}

function AudienceCard({ role, line, bullets, accent }) {
  return (
    <div style={{ background:'#fff', padding:'30px 30px 32px', position:'relative', borderTop:'3px solid var(--orange)' }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 14 }}>
        {accent && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>}
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, color:'var(--orange)', letterSpacing:'.1em' }}>
          FOR THE {role.toUpperCase()}
        </span>
      </div>
      <div style={{ fontSize: 19, fontWeight: 500, color:'var(--ink)', lineHeight: 1.35, letterSpacing:'-0.01em', marginBottom: 18 }}>
        {line}
      </div>
      <div style={{ borderTop:'1px solid var(--rule)', paddingTop: 14, display:'flex', flexDirection:'column', gap: 10 }}>
        {bullets.map((b,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'18px 1fr', gap: 10, fontSize: 14, lineHeight: 1.5, color:'var(--graphite)' }}>
            <Icon name="check" size={14} color="var(--orange)" stroke={2}/>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Section 3: Approach / How we work ------------------------------
function ApproachSection({ id }) {
  const phases = [
    {
      n:'01', tag:'Starting point', title:'Pulse Check',
      headline:'A written analysis of where your workforce data can take you.',
      body:'The starting point. We meet you where you are and work two legs in parallel. On the data side, we assess which workforce metrics your current data can support and where the gaps sit. On the insights side, we agree which metrics will change decisions for a business like yours. We arrive with a view on what matters in your industry, so clients who cannot yet put words to what they need do not start from a blank page. The output is a robust written analysis of where the client stands and where insight can be driven from the data they have. Clients who do not continue to Implementation still walk away with something usable.',
      duration:'2 to 4 weeks',
      output:'Written analysis · where the data stands · metric shortlist',
      color:'var(--orange)',
    },
    {
      n:'02', tag:'Hands-on', title:'Implementation',
      headline:'Closing the gaps the Pulse Check named.',
      body:'The hands-on phase. The Pulse Check gives us a specific picture of where the client stands, and Implementation closes the gaps it surfaced. Two legs again. Where data exists but is fragmented or messy, we clean and structure it so the numbers can be trusted. Where the Pulse Check identified data points the client does not yet capture, we build the systems or tools to generate them. Scope and price are set per engagement, against the specific gaps the Pulse Check named and the insights the client wants to use.',
      duration:'Scoped per engagement',
      output:'Working dashboard · trusted source of truth · gaps closed',
      color:'var(--ink)',
    },
    {
      n:'03', tag:'Ongoing', title:'Monthly Insights',
      headline:'A board-ready read of the workforce, built to drive decisions.',
      body:'The ongoing layer. Implementation leaves the client with a working dashboard; Monthly Insights keeps it current and turns what it shows into decisions. Each month we maintain the dashboard and produce an accompanying analysis: what the numbers are saying, what has changed, what is driving the change, and where the data points to further investigation. Where we have operating experience in the client\'s sector, we add the external view: how a metric compares to the industry norm and what the gap means in practice. Our initial focus is hospitality. This is where our team\'s depth in people data earns its keep.',
      duration:'Monthly · ongoing',
      output:'Live dashboard · monthly analysis · industry comparison',
      accent: true,
      color:'#060644',
    },
  ];
  const isMobile = useIsMobile();
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section id={id} data-anchor="approach" style={{ background:'#fff', padding: isMobile ? '56px 20px' : '96px 48px', borderTop:'1px solid var(--rule)' }}>
      <SectionHead index="03 / HOW WE WORK" title="One continuous process. Three phases, in order."
        lede="Start with a Pulse Check, close the gaps it finds, then keep the numbers current every month. Open a phase to see what it involves."/>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: 40 }}>
        {!isMobile && <div/>}
        <div style={{ background:'#fff', borderTop:'1px solid var(--ink)' }}>
          {phases.map((p, i) => (
            <PhaseRow
              key={i}
              {...p}
              color={openIdx === i ? 'var(--orange)' : 'var(--ink)'}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              isLast={i === phases.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseRow({ n, tag, title, headline, body, duration, output, accent, color = 'var(--ink)', open, onToggle, isLast }) {
  const isMobile = useIsMobile();
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid var(--rule)', position:'relative' }}>
      {/* Colored left accent bar */}
      <div aria-hidden="true" style={{
        position:'absolute', left: 0, top: 0, bottom: 0,
        width: open ? 6 : 3,
        background: color,
        transition:'width 220ms ease',
      }}/>
      {/* Row header */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: isMobile ? 'flex' : 'grid',
          gridTemplateColumns: isMobile ? undefined : '80px 180px 1fr 40px',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: isMobile ? 'space-between' : undefined,
          gap: isMobile ? 0 : 24,
          padding: isMobile ? '18px 16px 18px 24px' : '28px 32px 28px 40px',
          cursor:'pointer',
          background: open ? '#F6F3EE' : (hover ? '#F6F3EE' : '#fff'),
          transition:'background 160ms ease',
        }}
      >
        {isMobile ? (
          <>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.08em', marginBottom: 6 }}>
                {n} · {tag.toUpperCase()}
              </div>
              <div style={{ fontSize: 21, fontWeight: 600, letterSpacing:'-0.02em', color:'var(--ink)', lineHeight: 1.2 }}>{title}</div>
              <div style={{ fontSize: 14, color:'var(--graphite)', lineHeight: 1.45, marginTop: 4 }}>{headline}</div>
            </div>
            <div style={{
              width: 32, height: 32, border:`1px solid ${color}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0, marginTop: 2,
              transform: open ? 'rotate(45deg)' : 'rotate(0)', transition:'transform 220ms ease, background 160ms ease',
              background: (hover || open) ? color : 'transparent',
            }}>
              <Icon name="plus" size={16} color={(hover || open) ? '#fff' : color}/>
            </div>
          </>
        ) : (
          <>
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 12, color: color, letterSpacing:'.1em', fontWeight: 600 }}>{n}</span>
              <span style={{ width:6, height:6, borderRadius:'50%', background: color }}/>
            </div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em', textTransform:'uppercase' }}>
              {tag}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing:'-0.02em', color:'var(--ink)', display:'inline-flex', alignItems:'center' }}>
                <span style={{
                  borderBottom: open ? `2px solid ${color}` : '2px solid transparent',
                  paddingBottom: 2, transition:'border-color 200ms ease',
                }}>{title}</span>
              </div>
              <div style={{ fontSize: 15, color:'var(--graphite)', lineHeight: 1.45, maxWidth: 640 }}>{headline}</div>
            </div>
            <div style={{
              width: 32, height: 32, border:`1px solid ${color}`, display:'flex', alignItems:'center', justifyContent:'center',
              transform: open ? 'rotate(45deg)' : 'rotate(0)', transition:'transform 220ms ease, background 160ms ease',
              background: (hover || open) ? color : 'transparent',
              color: (hover || open) ? '#fff' : color,
            }}>
              <Icon name="plus" size={16} color={(hover || open) ? '#fff' : color}/>
            </div>
          </>
        )}
      </div>

      {/* Expand */}
      <div style={{
        maxHeight: open ? 800 : 0, overflow:'hidden',
        transition:'max-height 340ms ease',
        borderTop: open ? '1px solid var(--rule)' : 'none',
      }}>
        {isMobile ? (
          <div style={{ padding:'16px 16px 24px 24px', background:'#F6F3EE' }}>
            <div style={{ fontSize: 15, lineHeight: 1.65, color:'var(--graphite)' }}>{body}</div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color: color, letterSpacing:'.1em', marginBottom: 6, fontWeight: 600 }}>OUTPUT</div>
              <div style={{ fontSize: 14, fontWeight: 500, color:'var(--ink)', lineHeight: 1.45 }}>{output}</div>
            </div>
          </div>
        ) : (
          <div style={{ padding:'32px 32px 40px 40px', display:'grid', gridTemplateColumns:'80px 180px 1fr 260px', gap: 24, background:'#F6F3EE' }}>
            <div/>
            <div/>
            <div style={{ fontSize: 16.5, lineHeight: 1.65, color:'var(--graphite)', maxWidth: 640 }}>{body}</div>
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color: color, letterSpacing:'.1em', marginBottom: 8, fontWeight: 600 }}>OUTPUT</div>
              <div style={{ fontSize: 14, fontWeight: 500, color:'var(--ink)', lineHeight: 1.45 }}>{output}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Section 4: Team ------------------------------------------------
function TeamSection({ id, index = '05 / FOUNDERS' }) {
  const isMobile = useIsMobile();
  const people = [
    { photo:'/brand/founder-bianca.jpg', name:'Bianca Janse van Vuuren', role:'Finance, Data and AI Strategy', accent:true,
      bio:'Finance and data strategist. Designs data architectures that turn disconnected workforce, financial, and operational data into a single source of truth. Leads analytics frameworks that embed financial thinking into people data, and the practical application of AI to speed the work.',
      cred:[['Discipline','Finance · Data · AI'], ['Focus','Data architecture and analytics']],
    },
    { photo:'/brand/founder-marizanne.jpg', name:'Marizanne Koen', role:'Industrial Psychology and Remuneration',
      bio:'Registered Industrial Psychologist and Remuneration Specialist. Eighteen years across grading, benchmarking, variable pay design, and executive assessment. Teaches Strategic HRM at Honours and Postgraduate level at the University of Stellenbosch.',
      cred:[['Discipline','IO Psych · Reward'], ['Registration','HPCSA PS 0119300']],
    },
    { photo:'/brand/founder-liza.jpg', name:'Liza Burger', role:'HR, Organisational Design and Change',
      bio:'HR Specialist with fifteen years in professional services, most at BDO South Africa in regional HR leadership. Leads organisational design, change management, and the people-side of mergers and acquisitions. Accredited Lumina Practitioner and registered NLP Consultant.',
      cred:[['Discipline','HR · OD · M&A'], ['Accreditation','Lumina · NLP']],
    },
  ];
  return (
    <section id={id} data-anchor="team" style={{ background:'#fff', padding: isMobile ? '56px 20px' : '96px 48px' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 16 : 40, marginBottom: isMobile ? 24 : 56 }}>
        <SectionLabel index={index}/>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 40, flexWrap:'wrap' }}>
          <div>
            <div style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', maxWidth: 760 }}>
              Three founders. HR, finance, and data, at the same table.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: 40 }}>
        {!isMobile && <div/>}
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 36 : 28, borderTop:'1px solid var(--ink)', paddingTop: 36, maxWidth: 1040 }}>
          {people.map((p, i) => (
            <FounderCard key={i} idx={'0'+(i+1)} {...p}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderCard({ idx, photo, name, role, bio, cred, accent }) {
  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      <div style={{ width:'100%', aspectRatio:'1/1', background:'#D6D6D6', overflow:'hidden', position:'relative' }}>
        <img src={photo} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 15%', display:'block' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(210,210,210,0.18)', mixBlendMode:'color', pointerEvents:'none' }}/>
      </div>
      <div style={{ display:'flex', alignItems:'flex-start', gap: 10, marginTop: 18, minHeight: 42 }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color: accent ? 'var(--orange)' : 'var(--slate)', letterSpacing:'.1em', whiteSpace:'nowrap', paddingTop: 1 }}>{idx} / 03</span>
        {accent && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)', flexShrink:0, marginTop: 4 }}/>}
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em', textTransform:'uppercase', lineHeight: 1.5 }}>{role}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing:'-0.02em', marginTop: 10, color:'var(--ink)', lineHeight: 1.15 }}>{name}</div>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color:'var(--graphite)', marginTop: 14, maxWidth: 420 }}>{bio}</p>
    </div>
  );
}

// ---------- Section 7: Pulse Check form -----------------------------------
function PulseSection({ id }) {
  const isMobile = useIsMobile();
  const [fields, setFields] = React.useState({ name:'', role:'', organisation:'', employees:'', email:'' });
  const [sending, setSending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'pulse-check', ...fields }).toString(),
      });
    } catch (_) { /* network errors still show success */ }
    setSending(false);
    setSubmitted(true);
  };

  const row = { display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 22 : 24 };
  const card = { background:'#fff', color:'var(--ink)', boxShadow:'0 30px 60px rgba(0,0,0,.35)', borderTop:'3px solid var(--orange)' };

  return (
    <FadeSection id={id}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1.2fr', gap: isMobile ? 32 : 48, alignItems:'start' }}>
        <SectionLabel index="05 / PULSE CHECK" dark/>
        <div>
          <h2 style={{ fontSize: isMobile ? 32 : 50, lineHeight: 1.05, fontWeight: 700, letterSpacing:'-0.03em', margin: 0 }}>Start with a Pulse Check.</h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, color:'#EFEBE4', margin:'22px 0 0' }}>
            The Pulse Check ends with a written analysis of where your data stands and where insight can be driven from it. Clients who do not continue to Implementation still walk away with something usable.
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, color:'#EFEBE4', margin:'22px 0 12px' }}>A Pulse Check fits when:</p>
          <ul style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 10 }}>
            {['You have 50 to 300 employees', 'Your CFO and HR leader jointly own workforce costs', 'Your data sits across systems, with no shared view', 'A decision is being made this quarter'].map(t => (
              <li key={t} style={{ display:'grid', gridTemplateColumns:'20px 1fr', gap: 10, fontSize: 15, lineHeight: 1.5 }}>
                <Icon name="check" size={15} color="var(--orange)" stroke={2}/><span>{t}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 15, color:'#EFEBE4', marginTop: 24 }}>
            Prefer email? <a href="mailto:info@thehrinsightsco.co.za" style={{ color:'#fff' }}>info@thehrinsightsco.co.za</a>
          </p>
        </div>

        {submitted ? (
          <div role="status" style={{ ...card, padding: isMobile ? '28px 22px' : '40px 36px' }}>
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius:'50%', background:'var(--orange)' }}/>
              <span style={labelStyle}>ENQUIRY RECEIVED</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.2, letterSpacing:'-0.02em', margin:'16px 0 12px' }}>Thank you. We'll be in touch within a working day.</div>
            <p style={{ fontSize: 15.5, color:'var(--graphite)', lineHeight: 1.6, margin: 0 }}>
              We answer every enquiry personally. Expect a reply from one of the three founders.
            </p>
          </div>
        ) : (
          <form
            name="pulse-check"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            style={{ ...card, padding: isMobile ? '26px 20px' : '36px', display:'flex', flexDirection:'column', gap: 22 }}
          >
            <input type="hidden" name="form-name" value="pulse-check"/>
            <input type="hidden" name="bot-field" style={{ display:'none' }}/>
            <div style={row}>
              <Field label="Name"><input style={inputStyle} name="name" required autoComplete="name" value={fields.name} onChange={set('name')}/></Field>
              <Field label="Role"><input style={inputStyle} name="role" required autoComplete="organization-title" placeholder="e.g. CFO, HR Director" value={fields.role} onChange={set('role')}/></Field>
            </div>
            <div style={row}>
              <Field label="Organisation"><input style={inputStyle} name="organisation" required autoComplete="organization" value={fields.organisation} onChange={set('organisation')}/></Field>
              <Field label="Employees">
                <select style={inputStyle} name="employees" required value={fields.employees} onChange={set('employees')}>
                  <option value="">Select range</option>
                  {['Under 50','50–100','100–200','200–300','300+'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Work email"><input style={inputStyle} type="email" name="email" required autoComplete="email" value={fields.email} onChange={set('email')}/></Field>
            <BtnOrange type="submit" disabled={sending} full>
              {sending ? 'Sending…' : 'Send enquiry'} {!sending && <Icon name="arrowSm" size={14} color="#fff"/>}
            </BtnOrange>
            <p style={{ fontSize: 12.5, color:'var(--slate)', margin: 0 }}>We reply within one working day.</p>
          </form>
        )}
      </div>
    </FadeSection>
  );
}

export { SectionLabel, FounderCard, AboutSection, AudienceSection, ApproachSection, TeamSection, PulseSection };
