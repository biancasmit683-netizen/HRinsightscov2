import React from 'react'
import { Icon, BtnPrimary, BtnGhost, useIsMobile } from './shared'
import HeroGraph from './landing-hero-graph'
import { Dashboard, MobileDashboard } from './page-dashboard'

// Landing page sections — in order of appearance.

// A bigger, more prominent section label for the left 220px rail.
// The numbered index IS the title. Children are optional secondary text
// (rendered small below), and can be omitted entirely for a single-line label.
function SectionLabel({ index, children, dark }) {
  const dim = dark ? '#a6a6d4' : 'var(--slate)';
  const ink = dark ? '#fff' : 'var(--ink)';
  return (
    <div>
      <div style={{ height: 1, background: dark ? '#ffffff26' : 'var(--rule)', marginBottom: 20 }}/>
      <div style={{
        fontFamily:'JetBrains Mono,monospace',
        fontSize: 18, fontWeight: 500, letterSpacing:'.08em',
        color: ink, lineHeight: 1.15,
      }}>
        {index}
      </div>
      {children && (
        <div style={{
          fontFamily:'Inter,sans-serif',
          fontSize: 13, fontWeight: 400, letterSpacing:'0',
          color: dim, marginTop: 10, lineHeight: 1.4,
          textTransform:'none',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ---------- Section 1: Hero -------------------------------------------------
function HeroSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="top" style={{ background:'var(--ink)', color:'#fff', padding: isMobile ? '56px 20px 48px' : '96px 48px 72px', position:'relative', overflow:'hidden' }}>
      <div aria-hidden="true" style={{
        position:'absolute', inset: 0,
        backgroundImage:'url(/brand/hero-photo.jpg)',
        backgroundSize:'cover',
        backgroundPosition:'right center',
        filter:'blur(6px) saturate(0.85)',
        transform:'scale(1.06)',
        opacity: 0.55,
      }}/>
      <div aria-hidden="true" style={{
        position:'absolute', inset: 0,
        background:'linear-gradient(90deg, var(--ink) 0%, var(--ink) 38%, rgba(6,6,68,0.88) 58%, rgba(6,6,68,0.65) 100%)',
      }}/>
      <div aria-hidden="true" style={{
        position:'absolute', left: 0, right: 0, bottom: 0, height: 120,
        background:'linear-gradient(180deg, rgba(6,6,68,0) 0%, var(--ink) 100%)',
      }}/>

      <div style={{ position:'relative', display:'grid', gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 560px)', gap: isMobile ? 32 : 56, alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize: isMobile ? 34 : 82, lineHeight: isMobile ? 1.15 : 1.02, fontWeight: 600, letterSpacing:'-0.035em', margin: 0 }}>
            Workforce data,<br/>
            <span style={{ position:'relative', whiteSpace:'nowrap' }}>
              financial decisions
              <span style={{ position:'absolute', right: isMobile ? -13 : -26, top: isMobile ? 6 : 12, width: isMobile ? 8 : 16, height: isMobile ? 8 : 16, background:'var(--orange)', borderRadius:'50%' }}/>
            </span>.
          </h1>
          <div style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.55, color:'#e5e7ff', marginTop: isMobile ? 22 : 36, maxWidth: 620, fontWeight: 400 }}>
            We help mid-sized South African organisations turn fragmented workforce data into financial decisions. HR leads people. Finance leads money. Analytics is the specialism that connects them.
          </div>

          <div style={{ display:'flex', flexWrap:'wrap', gap: 12, marginTop: isMobile ? 28 : 40 }}>
            <BtnPrimary dark onClick={() => document.getElementById('pulse').scrollIntoView({ behavior:'smooth' })}>
              Book a Pulse Check <Icon name="arrowSm" size={14} color="var(--ink)"/>
            </BtnPrimary>
            <BtnGhost dark onClick={() => document.getElementById('approach').scrollIntoView({ behavior:'smooth' })}>
              See how we work
            </BtnGhost>
          </div>
        </div>

        {!isMobile && (
          <div style={{ justifySelf:'end', width:'100%', maxWidth: 560 }}>
            <HeroGraph />
          </div>
        )}
      </div>

    </section>
  );
}

function HeroStat({ n, label, value, accent }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'#a6a6d4', letterSpacing:'.1em' }}>{n}</span>
        {accent && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>}
      </div>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'#a6a6d4', letterSpacing:'.1em', marginTop: 8 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 15, color:'#fff', fontWeight: 500, marginTop: 10, lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

// ---------- Section 2: About -----------------------------------------------
function AboutSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="about" style={{ background:'#fff', padding: isMobile ? '56px 20px' : '96px 48px' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 24 : 48 }}>
        <SectionLabel index="02 / ABOUT"/>
        <div>
          <div style={{ fontSize: isMobile ? 30 : 40, lineHeight: 1.1, fontWeight: 600, letterSpacing:'-0.025em', maxWidth: 560 }}>
            Built for the decision.
          </div>
        </div>
        <div style={{ fontSize: isMobile ? 15.5 : 16.5, lineHeight: 1.65, color:'var(--graphite)', maxWidth: 520 }}>
          <p style={{ margin: 0 }}>
            The HR Insights Co. helps mid-sized South African organisations turn fragmented workforce data into financial decisions. Founded by three women from HR, finance, and data, we connect HR metrics with financial cost, give teams one reliable view of what is happening, and measure ourselves on whether the data changed a decision.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 3: Our Audience ----------------------------------------
function AudienceSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="audience" data-screen-label="03 Our Audience" style={{ background:'#fff', padding: isMobile ? '56px 20px' : '96px 48px', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 16 : 40, marginBottom: isMobile ? 24 : 48 }}>
        <SectionLabel index="03 / OUR AUDIENCE"/>
        <div style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', maxWidth: 760 }}>
          Two audiences. One shared view.
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 16 : 36 }}>
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
    <div style={{ background:'var(--mist)', padding:'28px 28px 30px', position:'relative' }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 14 }}>
        {accent && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>}
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color: accent ? 'var(--orange)' : 'var(--slate)', letterSpacing:'.1em' }}>
          FOR THE {role.toUpperCase()}
        </span>
      </div>
      <div style={{ fontSize: 19, fontWeight: 500, color:'var(--ink)', lineHeight: 1.35, letterSpacing:'-0.01em', marginBottom: 18 }}>
        {line}
      </div>
      <div style={{ borderTop:'1px solid var(--rule)', paddingTop: 14, display:'flex', flexDirection:'column', gap: 10 }}>
        {bullets.map((b,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'18px 1fr', gap: 10, fontSize: 14, lineHeight: 1.5, color:'var(--graphite)' }}>
            <Icon name="check" size={14} color="var(--ink)"/>
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
      color:'#3b3b86',
    },
  ];
  const isMobile = useIsMobile();
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section id={id} data-anchor="approach" style={{ background:'var(--mist)', padding: isMobile ? '56px 20px' : '96px 48px', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 16 : 40, marginBottom: isMobile ? 24 : 48 }}>
        <SectionLabel index="04 / HOW WE WORK"/>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 32, flexWrap:'wrap' }}>
          <div style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', maxWidth: 760 }}>
            One continuous process. Three phases, in order.
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: 40 }}>
        {!isMobile && <div/>}
        <div style={{ background:'#fff', borderTop:'1px solid var(--ink)' }}>
          {phases.map((p, i) => (
            <PhaseRow
              key={i}
              {...p}
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
          background: open ? '#fafaf7' : (hover ? '#fafaf7' : '#fff'),
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
          <div style={{ padding:'16px 16px 24px 24px', background:'#fafaf7' }}>
            <div style={{ fontSize: 15, lineHeight: 1.65, color:'var(--graphite)' }}>{body}</div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color: color, letterSpacing:'.1em', marginBottom: 6, fontWeight: 600 }}>OUTPUT</div>
              <div style={{ fontSize: 14, fontWeight: 500, color:'var(--ink)', lineHeight: 1.45 }}>{output}</div>
            </div>
          </div>
        ) : (
          <div style={{ padding:'32px 32px 40px 40px', display:'grid', gridTemplateColumns:'80px 180px 1fr 260px', gap: 24, background:'#fafaf7' }}>
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
function TeamSection({ id }) {
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
        <SectionLabel index="05 / FOUNDERS"/>
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

// ---------- Section 5: Work in action --------------------------------------
function WorkSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="work" style={{ background:'var(--ink)', color:'#fff', padding: isMobile ? '56px 20px' : '96px 48px' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 16 : 40, marginBottom: isMobile ? 24 : 48 }}>
        <SectionLabel index="06 / INDUSTRY FOCUS" dark/>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 32, flexWrap:'wrap' }}>
          <div style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', maxWidth: 760 }}>
            Hospitality.
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: 40 }}>
        {!isMobile && <div/>}
        <div>
          {/* Live dashboard embed */}
          <div style={{
            maxHeight: isMobile ? 600 : 720,
            overflowY: 'auto', overflowX: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent',
          }}>
            {isMobile ? <MobileDashboard /> : <Dashboard />}
          </div>

          {/* Other industries — understated */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop:'1px solid rgba(255,255,255,0.14)', display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'rgba(255,255,255,0.55)', letterSpacing:'.14em' }}>ALSO SERVING</span>
            <span style={{ fontSize: 13.5, color:'rgba(255,255,255,0.7)', letterSpacing:'-0.005em' }}>
              Mining · Professional services · Other mid-sized industries
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniTile({ n, name, value, sub, accent }) {
  return (
    <div style={{ background:'#fff', padding:'14px 14px 14px', border: accent ? '1px solid var(--orange)' : '1px solid var(--rule)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10, color: accent ? 'var(--orange)' : 'var(--slate)', letterSpacing:'.1em' }}>{n}</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 500, color:'var(--graphite)', marginTop: 8, lineHeight: 1.3 }}>{name}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: accent ? 'var(--orange)' : 'var(--ink)', letterSpacing:'-0.02em', marginTop: 4, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10.5, color:'var(--slate)', fontFamily:'JetBrains Mono,monospace', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

// ---------- Section 6: Clients ---------------------------------------------
function ClientsSection({ id }) {
  const items = [
    {
      tag:'HOSPITALITY · MULTI-SITE',
      sector:'Lodge group, 5 properties',
      problem:'Labour cost running above plan, no single view across properties.',
      change:'Roster templates reset against occupancy curve. R 720k run-rate saving modelled.',
      metric:{ v:'−3.1 pp', label:'Labour cost / revenue' },
      period:'Q2 2026',
    },
    {
      tag:'PROFESSIONAL SERVICES',
      sector:'Partnership, 140 people',
      problem:'Regrettable exits in billable roles, fill times exceeding 60 days.',
      change:'Retention programme on 20 critical roles. Pre-built pipeline for senior associates.',
      metric:{ v:'−38 days', label:'Time to fill, critical roles', accent:true },
      period:'H1 2026',
    },
  ];
  return (
    <section id={id} data-anchor="clients" style={{ background:'#fff', padding:'96px 48px', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 40, marginBottom: 48 }}>
        <SectionLabel index="06 / CLIENTS"/>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 32, flexWrap:'wrap' }}>
          <div style={{ fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', maxWidth: 760 }}>
            Where the data changed a decision.
          </div>
          <div style={{ fontSize: 14, color:'var(--slate)', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.06em', marginBottom: 6 }}>
            CLIENT DETAIL ANONYMISED ·&nbsp;NUMBERS FROM LIVE ENGAGEMENTS
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 28 }}>
        {items.map((it, i) => (
          <ClientCard key={i} {...it}/>
        ))}
      </div>
    </section>
  );
}

function ClientCard({ tag, sector, problem, change, metric, period }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        background:'var(--mist)', padding:'32px 32px 28px',
        borderTop: metric.accent ? '3px solid var(--orange)' : '3px solid var(--ink)',
        transition:'transform 200ms ease, box-shadow 200ms ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 10px 30px rgba(6,6,68,0.08)' : 'none',
      }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>
          {tag}
        </div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.06em' }}>
          {period}
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing:'-0.02em', color:'var(--ink)', marginTop: 10 }}>{sector}</div>

      <div style={{ marginTop: 24, display:'grid', gridTemplateColumns:'90px 1fr', gap: 14, borderTop:'1px solid var(--rule)', paddingTop: 20 }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.1em' }}>PROBLEM</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color:'var(--graphite)' }}>{problem}</div>

        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.1em' }}>CHANGE</div>
        <div style={{ fontSize: 15, lineHeight: 1.55, color:'var(--ink)', fontWeight: 500 }}>{change}</div>
      </div>

      <div style={{ marginTop: 24, borderTop:'1px solid var(--rule)', paddingTop: 20, display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.1em' }}>WHAT MOVED</div>
          <div style={{ fontSize: 15, color:'var(--ink)', marginTop: 6, fontWeight: 500 }}>{metric.label}</div>
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, letterSpacing:'-0.03em', color: metric.accent ? 'var(--orange)' : 'var(--ink)', lineHeight: 1 }}>
          {metric.v}
        </div>
      </div>
    </div>
  );
}

// ---------- Section 7: Pulse Check form -----------------------------------
function PulseSection({ id }) {
  const isMobile = useIsMobile();
  return (
    <section id={id} data-anchor="pulse" style={{ background:'var(--mist)', padding: isMobile ? '56px 20px' : '96px 48px', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 32 : 48, alignItems:'start' }}>
        <SectionLabel index="08 / PULSE CHECK"/>

        <div>
          <h2 style={{ fontSize: isMobile ? 32 : 48, lineHeight: 1.06, fontWeight: 600, letterSpacing:'-0.03em', margin: 0, maxWidth: 520 }}>
            Start with a Pulse Check.
          </h2>
          <div style={{ fontSize: 16.5, lineHeight: 1.6, color:'var(--graphite)', marginTop: 22, maxWidth: 480 }}>
            The Pulse Check ends with a written analysis of where your data stands and where insight can be driven from it. Clients who do not continue to Implementation still walk away with something usable. We answer new enquiries in a working day.
          </div>

          <div style={{ marginTop: 40, background:'#fff', borderLeft:'3px solid var(--ink)', padding:'22px 24px' }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em', marginBottom: 10 }}>WHEN A PULSE CHECK FITS</div>
            <ul style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 10 }}>
              {[
                '50 to 300 employees',
                'CFO and HR leader jointly own workforce costs',
                'Data sits across systems, with no shared view',
                'A decision is being made this quarter',
              ].map((t,i) => (
                <li key={i} style={{ display:'grid', gridTemplateColumns:'18px 1fr', gap: 10, fontSize: 14, color:'var(--ink)', lineHeight: 1.5 }}>
                  <Icon name="check" size={14} color="var(--ink)"/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form style={{ background:'#fff', padding:'32px 32px 32px', display:'flex', flexDirection:'column', gap: 22 }} onSubmit={(e)=>e.preventDefault()}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em', marginBottom: 4 }}>ENQUIRY FORM</div>

          <FieldInput label="Name" placeholder="First and last"/>
          <FieldInput label="Role" placeholder="e.g. CFO, HR Director"/>
          <FieldInput label="Organisation" placeholder="Company name"/>
          <FieldSelect label="Employees"/>
          <FieldInput label="Email" type="email" placeholder="you@company.co.za"/>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', marginTop: 10 }}>
            <BtnPrimary>Send enquiry <Icon name="arrowSm" size={14} color="#fff"/></BtnPrimary>
          </div>
        </form>
      </div>
    </section>
  );
}

function DirectLineMini_UNUSED({ label, value, accent }) {
  return (
    <div style={{ padding:'16px 0', borderBottom:'1px solid var(--rule)', borderRight: accent ? 'none' : '1px solid var(--rule)', paddingRight: 20, paddingLeft: accent ? 20 : 0 }}>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color: accent ? 'var(--orange)' : 'var(--slate)', letterSpacing:'.08em', marginBottom: 6 }}>
        {accent && <span style={{ marginRight: 6 }}>●</span>}{label}
      </div>
      <div style={{ fontSize: 14.5, color:'var(--ink)', fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function FieldInput({ label, placeholder, type = 'text' }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6 }}>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>{label.toUpperCase()}</span>
      <input
        type={type} placeholder={placeholder}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{
          border:'none', borderBottom: focus ? '1px solid var(--ink)' : '1px solid var(--rule)',
          padding:'12px 0', fontSize: 15, fontFamily:'Inter,sans-serif', color:'var(--ink)', background:'transparent',
          outline:'none', transition:'border-color 160ms ease',
        }}
      />
    </label>
  );
}

function FieldSelect({ label }) {
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState('');
  const opts = ['Under 50','50–100','100–200','200–300','300+'];
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6, position:'relative' }}>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>{label.toUpperCase()}</span>
      <div
        onClick={()=>setOpen(!open)}
        style={{
          borderBottom: open ? '1px solid var(--ink)' : '1px solid var(--rule)',
          padding:'12px 0', fontSize: 15, color: val ? 'var(--ink)' : 'var(--slate)',
          display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer',
        }}
      >
        <span>{val || 'Select range'}</span>
        <Icon name="down" size={14} color="var(--slate)"/>
      </div>
      {open && (
        <div style={{ position:'absolute', top:'100%', left:0, right:0, background:'#fff', border:'1px solid var(--rule)', zIndex: 10, marginTop: 2, boxShadow:'0 8px 24px rgba(6,6,68,0.08)' }}>
          {opts.map(o => (
            <div key={o} onClick={()=>{ setVal(o); setOpen(false); }}
              style={{ padding:'10px 14px', fontSize: 14, cursor:'pointer', color:'var(--ink)' }}
              onMouseEnter={(e)=>e.currentTarget.style.background='var(--mist)'}
              onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
              {o}
            </div>
          ))}
        </div>
      )}
    </label>
  );
}

function FieldTextarea({ label, placeholder }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6 }}>
      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>{label.toUpperCase()}</span>
      <textarea
        placeholder={placeholder} rows={4}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{
          border:'none', borderBottom: focus ? '1px solid var(--ink)' : '1px solid var(--rule)',
          padding:'12px 0', fontSize: 15, fontFamily:'Inter,sans-serif', color:'var(--ink)', background:'transparent',
          outline:'none', resize:'vertical', transition:'border-color 160ms ease',
        }}
      />
    </label>
  );
}

// ---------- Section 8: Start Here (final CTA) ------------------------------
function StartHereSection() {
  return (
    <section style={{ background:'var(--ink)', color:'#fff', padding:'72px 48px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr auto', gap: 40, alignItems:'center' }}>
        <div>
          <SectionLabel index="08 / START HERE" dark>Reply in a day</SectionLabel>
        </div>
        <div style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.1, letterSpacing:'-0.025em', maxWidth: 900 }}>
          If the numbers do not change a decision, they are not insight. Let us show you where yours can.
        </div>
        <div>
          <BtnPrimary dark onClick={() => document.getElementById('pulse').scrollIntoView({ behavior:'smooth' })}>
            Book a Pulse Check <Icon name="arrowSm" size={14} color="var(--ink)"/>
          </BtnPrimary>
        </div>
      </div>
    </section>
  );
}

export { SectionLabel, HeroSection, AboutSection, AudienceSection, ApproachSection, TeamSection, WorkSection, PulseSection };
