import React from 'react'
import { SiteHeader, SiteFooter, Circles, Icon, useIsMobile } from './shared'
import { SectionLabel } from './landing-sections'

// Engagement Surveys — the home page (/). Leads with WhatsApp/QR surveys for deskless teams.

const pad = (isMobile) => (isMobile ? '56px 20px' : '96px 48px');

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
}

function BtnOrange({ children, onClick, type = 'button', disabled, full }) {
  const [h, setH] = React.useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? '#9A3412' : 'var(--orange)', color:'#fff', border:'none',
        padding:'14px 22px', fontFamily:'Inter,sans-serif', fontWeight: 600, fontSize: 14.5,
        cursor: disabled ? 'wait' : 'pointer', borderRadius: 0,
        display:'inline-flex', alignItems:'center', justifyContent:'center', gap: 10,
        width: full ? '100%' : 'auto',
        transition:'background 160ms ease',
      }}
    >
      {children}
    </button>
  );
}

function BtnOutlineLight({ children, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? '#fff' : 'transparent', color: h ? 'var(--ink)' : '#fff',
        border:'1px solid rgba(255,255,255,0.55)', padding:'14px 22px',
        fontFamily:'Inter,sans-serif', fontWeight: 500, fontSize: 14.5, cursor:'pointer', borderRadius: 0,
        transition:'background 160ms ease, color 160ms ease',
      }}
    >
      {children}
    </button>
  );
}

function SectionHead({ index, title, lede, dark, last }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 16 : 40, marginBottom: last ? 0 : (isMobile ? 32 : 56), alignItems:'end' }}>
      <SectionLabel index={index} dark={dark}/>
      <h2 style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', margin: 0, maxWidth: 560 }}>{title}</h2>
      {lede && <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.6, color: dark ? 'var(--ink-soft)' : 'var(--graphite)', margin: 0, maxWidth: 520 }}>{lede}</p>}
    </div>
  );
}

// ---------- Hero ------------------------------------------------------------
// Background photo. Navy fades in from the bottom, like the print campaign.
const HERO_PHOTO = '/brand/hero-surveys.jpg';

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section id="top" style={{ background:'var(--ink)', color:'#fff', padding: isMobile ? '72px 20px 64px' : '120px 48px 96px', minHeight: isMobile ? 0 : 640, position:'relative', overflow:'hidden', display:'flex', alignItems:'flex-end' }}>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, backgroundImage:`url(${HERO_PHOTO})`, backgroundSize:'cover', backgroundPosition: isMobile ? '60% 40%' : 'center 45%', filter:'saturate(0.5) brightness(0.92)' }}/>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, background:'rgba(6,6,68,0.28)' }}/>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, background:'linear-gradient(180deg, rgba(6,6,68,0) 0%, rgba(6,6,68,0) 35%, rgba(6,6,68,0.55) 62%, rgba(6,6,68,0.92) 85%, #060644 100%)' }}/>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, background: isMobile ? 'rgba(0,0,0,0.3)' : 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 62%)' }}/>
      <Circles items={isMobile ? [
        { size: 96, right: -52, top: 24, coral: true, opacity: 0.8 },
        { size: 150, left: -40, bottom: -90, coral: true, opacity: 0.75 },
        { size: 110, right: 30, bottom: 40, opacity: 0.08 },
      ] : [
        { size: 180, right: -90, top: '36%', coral: true, opacity: 0.8 },
        { size: 220, left: '12%', bottom: -170, coral: true, opacity: 0.75 },
        { size: 190, right: '22%', bottom: 30, opacity: 0.08 },
        { size: 150, right: '6%', bottom: -40, opacity: 0.07 },
        { size: 120, left: '46%', bottom: 90, opacity: 0.06 },
      ]}/>
      <div style={{ position:'relative', maxWidth: 680 }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.14em', color:'#fff', display:'flex', alignItems:'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius:'50%', background:'var(--orange)' }}/>EMPLOYEE ENGAGEMENT SURVEYS
        </div>
        <h1 style={{ fontSize: isMobile ? 38 : 72, lineHeight: 1.02, fontWeight: 700, letterSpacing:'-0.035em', margin: isMobile ? '18px 0 0' : '22px 0 0', textShadow:'0 2px 18px rgba(0,0,0,0.45)' }}>
          Hear from every employee.<br/>
          Not just the ones with email.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color:'#fff', fontWeight: 500, margin: isMobile ? '22px 0 30px' : '28px 0 36px', maxWidth: 580 }}>
          End-to-end engagement surveys for deskless teams. Each staff member gets a private survey link on WhatsApp, or scans a QR poster on site. No app, no login, no email, no shared device.
        </p>
        <div style={{ display:'flex', gap: 12, flexWrap:'wrap' }}>
          <BtnOrange onClick={() => scrollTo('book')}>Book a demo <Icon name="arrowSm" size={14} color="#fff"/></BtnOrange>
          <BtnOutlineLight onClick={() => scrollTo('how')}>See how it works</BtnOutlineLight>
        </div>
        <div style={{ display:'flex', gap: isMobile ? 14 : 26, flexWrap:'wrap', marginTop: isMobile ? 32 : 40, fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.08em', color:'#EFEBE4' }}>
          {['WHATSAPP & QR','LOCAL LANGUAGES','ONE FIXED FEE','POPIA-COMPLIANT'].map(f => (
            <span key={f} style={{ display:'inline-flex', alignItems:'center', gap: 8 }}><Icon name="check" size={13} color="var(--orange)" stroke={2.2}/>{f}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 01 The problem --------------------------------------------------
function Problem() {
  const isMobile = useIsMobile();
  return (
    <section id="problem" style={{ background:'#fff', padding: pad(isMobile) }}>
      <SectionHead last index="01 / THE PROBLEM" title="Most surveys stop at the front desk."
        lede="In hospitality, mining, agriculture, retail, manufacturing, security and logistics, most of the workforce never sits behind a company email address. So most surveys never reach them, and the results describe the office, not the operation."/>
    </section>
  );
}

// ---------- 02 How it works -------------------------------------------------
function HowItWorks() {
  const isMobile = useIsMobile();
  const steps = [
    ['We set it up together', 'We meet your HR lead or operations head to understand your sites, workforce groups and what you most need to hear. Questions are designed by HR professionals and tuned to your industry.'],
    ['We reach your people', 'Invitations go out by WhatsApp and QR poster, supported by team champions and announcement templates. We watch response rates live and send targeted reminders to groups that lag.'],
    ['You get the picture', 'A clear, actionable insights report broken down by department, site and role, showing what is driving engagement and where to act first, delivered within an agreed timeframe.'],
  ];
  return (
    <section id="how" style={{ background:'var(--paper)', padding: pad(isMobile), borderTop:'1px solid var(--rule)' }}>
      <SectionHead index="02 / HOW IT WORKS" title="Three steps. Fully supported."
        lede="We run the survey with you from set-up to results, so your HR team isn't left chasing responses."/>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: 40 }}>
        {!isMobile && <div/>}
        <div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
            {steps.map(([t, b], i) => (
              <div key={i} style={{ background:'#fff', padding: isMobile ? 24 : 30, borderTop:'3px solid var(--orange)' }}>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.1em', color:'var(--orange)' }}>STEP 0{i + 1}</div>
                <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing:'-0.015em', margin:'16px 0 10px' }}>{t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color:'var(--graphite)', margin: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- 03 Why us -------------------------------------------------------
// Phone mockup: the survey screen a staff member sees after opening their private link.
function SurveyPhone() {
  const isMobile = useIsMobile();
  const opts = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
  const picked = 3;
  const W = isMobile ? 280 : 300;
  return (
    <div role="img" aria-label="Example survey screen on a smartphone: question 7 of 24, 'I feel safe performing my duties at work', with 'Agree' selected"
      style={{ width: W, maxWidth:'100%', margin:'0 auto', background:'#0d0d1a', borderRadius: 44, padding: 11, boxShadow:'0 40px 80px rgba(6,6,68,.28), 0 0 0 1px rgba(6,6,68,.12)', position:'relative' }}>
      <div style={{ background:'#fff', borderRadius: 34, overflow:'hidden', fontFamily:'Inter,sans-serif', color:'var(--ink)', position:'relative' }}>
        {/* status bar + notch */}
        <div style={{ height: 38, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px', fontSize: 12, fontWeight: 600 }}>
          <span>08:15</span>
          <span style={{ position:'absolute', left:'50%', top: 9, transform:'translateX(-50%)', width: 92, height: 24, borderRadius: 14, background:'#0d0d1a' }}/>
          <span style={{ display:'flex', gap: 4, alignItems:'center' }}>
            <span style={{ width: 16, height: 9, borderRadius: 2, border:'1.5px solid var(--ink)', position:'relative' }}><span style={{ position:'absolute', inset: 1, right: 4, background:'var(--ink)', borderRadius: 1 }}/></span>
          </span>
        </div>
        {/* address bar */}
        <div style={{ margin:'0 14px', padding:'7px 12px', borderRadius: 10, background:'#F1EFEA', fontSize: 11, color:'var(--graphite)', display:'flex', alignItems:'center', gap: 6 }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
          survey.thehrinsightsco.co.za
        </div>
        <div style={{ padding:'18px 20px 22px' }}>
          {/* header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <img src="/brand/logo-primary-white-bg.png" alt="" style={{ height: 15, width:'auto', display:'block' }}/>
            <div style={{ display:'flex', gap: 4, fontSize: 10.5, fontWeight: 600 }}>
              {['EN', 'isiZulu', 'Afr'].map((l, i) => (
                <span key={l} style={{ padding:'3px 7px', borderRadius: 999, background: i === 0 ? 'var(--ink)' : '#F1EFEA', color: i === 0 ? '#fff' : 'var(--graphite)' }}>{l}</span>
              ))}
            </div>
          </div>
          {/* progress */}
          <div style={{ marginTop: 18, display:'flex', justifyContent:'space-between', fontSize: 11, color:'var(--slate)' }}>
            <span>Question 7 of 24</span><span>Wellbeing &amp; safety</span>
          </div>
          <div style={{ marginTop: 6, height: 5, borderRadius: 3, background:'#ECE6DC', overflow:'hidden' }}>
            <div style={{ width:'29%', height:'100%', background:'var(--orange)', borderRadius: 3 }}/>
          </div>
          {/* question */}
          <div style={{ marginTop: 20, fontSize: 18, fontWeight: 700, lineHeight: 1.3, letterSpacing:'-0.01em' }}>
            I feel safe performing my duties at work.
          </div>
          <div style={{ marginTop: 6, fontSize: 11.5, color:'var(--slate)' }}>Choose one answer</div>
          {/* options */}
          <div style={{ marginTop: 14, display:'flex', flexDirection:'column', gap: 7 }}>
            {opts.map((o, i) => {
              const on = i === picked;
              return (
                <div key={o} style={{ display:'flex', alignItems:'center', gap: 10, padding:'10px 12px', borderRadius: 10, fontSize: 13, fontWeight: on ? 700 : 500,
                  border: on ? '1.5px solid var(--orange)' : '1px solid #E4DED3', background: on ? '#FBEDE6' : '#fff' }}>
                  <span style={{ width: 16, height: 16, borderRadius:'50%', flexShrink: 0, border: on ? '5px solid var(--orange)' : '1.5px solid #C9C2B6', background:'#fff' }}/>
                  {o}
                </div>
              );
            })}
          </div>
          {/* nav */}
          <div style={{ marginTop: 16, display:'grid', gridTemplateColumns:'1fr 2fr', gap: 8 }}>
            <div style={{ padding:'11px 0', textAlign:'center', borderRadius: 10, border:'1px solid #E4DED3', fontSize: 13, fontWeight: 600, color:'var(--graphite)' }}>Back</div>
            <div style={{ padding:'11px 0', textAlign:'center', borderRadius: 10, background:'var(--ink)', color:'#fff', fontSize: 13, fontWeight: 600 }}>Next →</div>
          </div>
          <div style={{ marginTop: 14, display:'flex', alignItems:'center', justifyContent:'center', gap: 6, fontSize: 10.5, color:'var(--slate)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
            Anonymous and private · POPIA-compliant
          </div>
        </div>
        {/* home indicator */}
        <div style={{ height: 18, display:'flex', justifyContent:'center', alignItems:'flex-start' }}><span style={{ width: 110, height: 4, borderRadius: 2, background:'#0d0d1a' }}/></div>
      </div>
    </div>
  );
}

function WhyUs() {
  const isMobile = useIsMobile();
  const feats = [
    ['QR · WHATSAPP', 'Reach everyone, no email required', 'A personal link on WhatsApp, or a branded QR poster on site. Staff scan, WhatsApp opens, and they receive their own private survey link.'],
    ['LANGUAGES', 'In the languages your staff speak', 'English plus additional local languages, so everyone can answer honestly and in their own words.'],
    ['LIVE', 'We chase the gaps', 'Live response rates by department, site and role. When one group lags, we see it and follow up, so the data represents everyone.'],
    ['ZA · POPIA', 'Fully POPIA-compliant', 'Built in South Africa, for South African employers, with personal information handled in line with POPIA.'],
  ];
  return (
    <section id="why" style={{ background:'#fff', padding: pad(isMobile), borderTop:'1px solid var(--rule)' }}>
      <SectionHead index="03 / WHY US" title="Built for how South African workplaces actually work."
        lede="Three founders from HR, industrial psychology, finance and data, running surveys that represent the whole workforce, not just the part with a laptop."/>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px minmax(0,1fr) 340px', gap: isMobile ? 40 : 48, alignItems:'center' }}>
        {!isMobile && <div/>}
        <div style={{ borderTop:'1px solid var(--ink)' }}>
          {feats.map(([tag, t, b], i) => (
            <div key={i} style={{ padding: isMobile ? '22px 0' : '24px 0', borderBottom:'1px solid var(--rule)' }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.1em', color:'var(--orange)' }}>{tag}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing:'-0.015em', margin:'10px 0 6px' }}>{t}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color:'var(--graphite)', margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
        <SurveyPhone/>
      </div>
    </section>
  );
}

// ---------- 04 Who it's for + 05 Pricing -----------------------------------
function WhoFor() {
  const isMobile = useIsMobile();
  const inds = ['Mining','Agriculture','Retail','Manufacturing','Security','Logistics & transport','Healthcare & care services'];
  const chip = { display:'flex', alignItems:'center', padding: isMobile ? '12px 14px' : '14px 18px', background:'#fff', border:'1px solid var(--rule)', fontWeight: 500, fontSize: isMobile ? 14 : 15, lineHeight: 1.35 };
  return (
    <section id="industries" style={{ background:'var(--paper)', padding: pad(isMobile), borderTop:'1px solid var(--rule)', position:'relative', overflow:'hidden' }}>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, backgroundImage:'url(/brand/who-farm.jpg)', backgroundSize:'cover', backgroundPosition: isMobile ? '70% 55%' : 'center 55%', filter:'saturate(0.75)' }}/>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, background: isMobile
        ? 'linear-gradient(180deg, rgba(246,243,238,1) 0%, rgba(246,243,238,0.86) 30%, rgba(246,243,238,0.8) 70%, rgba(246,243,238,1) 100%)'
        : 'linear-gradient(90deg, rgba(246,243,238,0.97) 0%, rgba(246,243,238,0.9) 40%, rgba(246,243,238,0.78) 100%)' }}/>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, background:'linear-gradient(180deg, rgba(246,243,238,1) 0%, rgba(246,243,238,0) 22%, rgba(246,243,238,0) 78%, rgba(246,243,238,1) 100%)' }}/>
      <div style={{ position:'relative' }}>
      <SectionHead index="04 / WHO IT'S FOR" title="Any employer with a deskless workforce."
        lede="If a large share of your people work on the floor, in the field, on shift or on site, this is built for you."/>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: 40 }}>
        {!isMobile && <div/>}
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0,1fr))' : 'repeat(4, minmax(0,1fr))', gridAutoRows:'1fr', gap: 10 }}>
          <span style={{ ...chip, background:'var(--orange)', borderColor:'var(--orange)', color:'#fff' }}>Hospitality: lodges, hotels &amp; game reserves</span>
          {inds.map(i => <span key={i} style={chip}>{i}</span>)}
        </div>
      </div>
      </div>
    </section>
  );
}

function Pricing() {
  const isMobile = useIsMobile();
  const rows = [['Subscription','None'], ['Per-person charges','None'], ['Lock-in','None'], ['Set-up, reminders & report','Included']];
  return (
    <section id="pricing" style={{ background:'#fff', padding: pad(isMobile), borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 24 : 40, alignItems:'start' }}>
        <SectionLabel index="05 / PRICING"/>
        <div>
          <h2 style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', margin: 0 }}>One survey. One price.</h2>
          <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.6, color:'var(--graphite)', margin:'18px 0 0', maxWidth: 440 }}>A single fixed fee per survey, agreed upfront. You know exactly what it costs before we start.</p>
        </div>
        <ul style={{ listStyle:'none', margin: 0, padding: 0, borderTop:'1px solid var(--ink)' }}>
          {rows.map(([k, v]) => (
            <li key={k} style={{ display:'flex', justifyContent:'space-between', gap: 16, padding:'17px 0', borderBottom:'1px solid var(--rule)', fontSize: 16.5 }}>
              <span>{k}</span>
              <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 12.5, letterSpacing:'.08em', color:'var(--orange)' }}>{v.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Client testimonial (anonymous for now; attribution to be added later).
function Testimonial() {
  const isMobile = useIsMobile();
  const light = 'var(--ink-soft)';
  return (
    <section id="testimonial" style={{ background:'var(--ink)', color:'#fff', padding: isMobile ? '56px 20px' : '88px 48px', position:'relative', overflow:'hidden' }}>
      <Circles items={[
        { size: isMobile ? 120 : 220, right: isMobile ? -60 : -90, top: isMobile ? -50 : -90, coral: true },
        { size: isMobile ? 110 : 180, left: isMobile ? -50 : '14%', bottom: isMobile ? -60 : -110, opacity: 0.07 },
      ]}/>
      <figure style={{ position:'relative', margin: 0, display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px minmax(0,1fr)', gap: isMobile ? 24 : 40, alignItems:'center' }}>
        <div style={{ display:'flex', flexDirection:'column', gap: 18, alignItems:'flex-start' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 12, letterSpacing:'.14em', color: light, display:'flex', alignItems:'center', gap: 10 }}><span style={{ width: 7, height: 7, borderRadius:'50%', background:'var(--orange)' }}/>FROM A CLIENT</div>
          <div aria-hidden="true" style={{ fontSize: isMobile ? 56 : 120, lineHeight: isMobile ? 0.5 : 0.8, height: isMobile ? 22 : 'auto', fontWeight: 700, color:'var(--orange)' }}>“</div>
        </div>
        <div>
          <blockquote style={{ margin: 0, fontSize: isMobile ? 22 : 34, lineHeight: 1.3, fontWeight: 600, letterSpacing:'-0.02em', maxWidth: 900 }}>
            Most of our team never check an email, so surveys used to miss them. With The HR Insights Co., everyone got a private link on WhatsApp, and we finally heard from most of our team.
          </blockquote>
          <figcaption style={{ marginTop: isMobile ? 22 : 30, display:'flex', flexWrap:'wrap', alignItems:'center', gap:'12px 22px' }}>
            <span style={{ width: 28, height: 2, background:'var(--orange)' }}/>
            <span style={{ fontWeight: 600, fontSize: 16 }}>Client A</span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}

// ---------- 06 Survey results ----------------------------------------------
// Sample figures from the Lodge Co. sample report. Favourable = 4–5 on a 5-point scale.
const RESULT_THEMES = ['Physical Wellbeing & Safety', 'Psychological Safety & Ethics', 'My Manager', 'Pay, Reward & Benefits', 'Facilities & Resources', 'Belonging & Retention'];
const RESULT_GROUPS = [
  { id:'All',          n:150, overall:67, enps:17,  themes:[74, 78, 81, 43, 47, 79] },
  { id:'Hospitality',  n:47,  overall:68, enps:4,   themes:[83, 78, 79, 42, 44, 80] },
  { id:'Guide',        n:26,  overall:80, enps:69,  themes:[88, 91, 94, 62, 58, 91] },
  { id:'Kitchen',      n:19,  overall:59, enps:11,  themes:[61, 76, 77, 37, 32, 75] },
  { id:'Admin',        n:17,  overall:50, enps:-24, themes:[48, 59, 62, 20, 38, 71] },
];

function ResultsPreview() {
  const isMobile = useIsMobile();
  const [groupId, setGroupId] = React.useState('All');
  const g = RESULT_GROUPS.find(x => x.id === groupId);
  const tile = { display:'flex', flexDirection:'column', gap: 4 };
  const tileLabel = { fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, letterSpacing:'.1em', color:'var(--slate)' };
  const tileValue = { fontSize: isMobile ? 24 : 26, fontWeight: 700, letterSpacing:'-0.02em', fontVariantNumeric:'tabular-nums' };
  return (
    <div style={{ background:'#fff', padding: isMobile ? 20 : 28, borderTop:'3px solid var(--orange)', height:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Engagement by theme <span style={{ fontSize: 12, fontWeight: 400, color:'var(--slate)' }}>· % favourable</span></div>
        <div style={tileLabel}>SAMPLE DATA · LODGE CO.</div>
      </div>

      <div role="group" aria-label="Filter by department" style={{ display:'flex', flexWrap:'wrap', gap: 6, margin:'14px 0 14px' }}>
        {RESULT_GROUPS.map(x => {
          const on = x.id === groupId;
          return (
            <button key={x.id} type="button" aria-pressed={on} onClick={() => setGroupId(x.id)}
              style={{ fontFamily:'Inter,sans-serif', fontSize: 12.5, fontWeight: 500, padding:'7px 12px', borderRadius: 999, cursor:'pointer',
                border: on ? '1px solid var(--ink)' : '1px solid var(--warm-grey)', background: on ? 'var(--ink)' : '#fff', color: on ? '#fff' : 'var(--ink)' }}>
              {x.id === 'All' ? 'All staff' : x.id}
            </button>
          );
        })}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12, paddingBottom: 12, borderBottom:'1px solid var(--rule)' }}>
        <div style={tile}><span style={tileLabel}>ENGAGEMENT</span><span style={tileValue}>{g.overall}%</span></div>
        <div style={tile}><span style={tileLabel}>ENPS</span><span style={tileValue}>{g.enps > 0 ? '+' : ''}{g.enps}</span></div>
        <div style={tile}><span style={tileLabel}>RESPONSES</span><span style={tileValue}>{g.n}</span></div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', marginTop: 6 }}>
        {RESULT_THEMES.map((t, i) => {
          const v = g.themes[i];
          const low = v < 50;
          return (
            <div key={t} title={`${t}: ${v}% favourable`}
              style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 44px' : 'minmax(0,1fr) 120px 40px', gap: isMobile ? '6px 10px' : 14, alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--rule)' }}>
              <span style={{ fontSize: 13.5 }}>
                {t}
                {low && <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10, letterSpacing:'.06em', color:'var(--orange)', marginLeft: 8, whiteSpace:'nowrap' }}>FOCUS AREA</span>}
              </span>
              <div style={{ height: 8, background:'var(--sand)', borderRadius: 4, overflow:'hidden', gridColumn: isMobile ? '1 / -1' : 'auto', gridRow: isMobile ? 2 : 'auto' }}>
                <div style={{ width: v + '%', height:'100%', borderRadius: 4, background: low ? 'var(--orange)' : 'var(--ink)', transition:'width 400ms ease' }}/>
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 600, textAlign:'right', fontVariantNumeric:'tabular-nums' }}>{v}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SurveyResults() {
  const isMobile = useIsMobile();
  const results = ['Engagement by theme', 'Strengths and opportunities', 'Every question, ranked'];
  const insights = ['Strengths to protect', 'Company-wide drags', 'Where leadership is the issue'];
  const list = (title, items) => (
    <div>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.1em', color:'var(--orange)', marginBottom: 10 }}>{title}</div>
      <ul style={{ listStyle:'none', margin: 0, padding: 0, display:'flex', flexDirection:'column', gap: 8 }}>
        {items.map(t => (
          <li key={t} style={{ display:'grid', gridTemplateColumns:'18px 1fr', gap: 8, fontSize: 14.5, lineHeight: 1.45 }}>
            <Icon name="check" size={14} color="var(--orange)" stroke={2}/><span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section id="results" style={{ background:'var(--paper)', padding: isMobile ? '56px 20px 24px' : '96px 48px 32px', borderTop:'1px solid var(--rule)' }}>
      <SectionHead index="06 / RESULTS" title="Interactive results. Deep insights."
        lede="Your results arrive as a live dashboard, not a static PDF. Filter by department, site, manager or tenure and every score recalculates. Then we tell you what it means and where to act first."/>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px minmax(0,1fr) minmax(0,1fr)', gap: isMobile ? 32 : 40, alignItems:'stretch' }}>
        {!isMobile && <div/>}
        <div style={{ display:'flex', flexDirection:'column', gap: 24 }}>
          {list('INTERACTIVE RESULTS', results)}
          {list('DEEP INSIGHTS', insights)}
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color:'var(--graphite)', margin: 0, marginTop: isMobile ? 0 : 'auto', paddingTop: isMobile ? 0 : 8 }}>
            Anonymity is built in: any group with fewer than five responses is hidden, so no individual can be identified.
          </p>
        </div>
        <ResultsPreview/>
      </div>
    </section>
  );
}

// ---------- 07 Book a demo --------------------------------------------------
const labelStyle = { fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' };
const inputStyle = { border:'none', borderBottom:'1px solid var(--warm-grey)', padding:'11px 0', fontSize: 15, fontFamily:'Inter,sans-serif', color:'var(--ink)', background:'transparent', borderRadius: 0, width:'100%' };

function Field({ label, children }) {
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6, minWidth: 0 }}>
      <span style={labelStyle}>{label.toUpperCase()}</span>
      {children}
    </label>
  );
}

function BookDemo() {
  const isMobile = useIsMobile();
  const empty = { name:'', role:'', organisation:'', industry:'', employees:'', email:'', phone:'', consent:'' };
  const [fields, setFields] = React.useState(empty);
  const [sending, setSending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target.checked ? 'yes' : '') : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'demo-request', ...fields }).toString(),
      });
    } catch (_) { /* network errors still show success */ }
    setSending(false);
    setSubmitted(true);
  };

  const row = { display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 22 : 24 };

  return (
    <section id="book" style={{ background: isMobile ? 'linear-gradient(180deg, #F6F3EE 0px, rgba(246,243,238,0.7) 40px, rgba(246,243,238,0.28) 85px, rgba(246,243,238,0) 130px), #060644' : 'linear-gradient(180deg, #F6F3EE 0px, rgba(246,243,238,0.72) 45px, rgba(246,243,238,0.32) 105px, rgba(246,243,238,0.08) 155px, rgba(246,243,238,0) 190px), #060644', color:'#fff', padding: isMobile ? '140px 20px 72px' : '200px 48px 120px', position:'relative', overflow:'hidden' }}>
      <Circles items={isMobile ? [
        { size: 90, right: -45, top: 130, coral: true },
        { size: 140, left: -70, bottom: -70, coral: true },
      ] : [
        { size: 220, right: -110, top: 230, coral: true },
        { size: 260, left: -120, bottom: -150, coral: true },
        { size: 170, left: '34%', bottom: -60 },
      ]}/>
      <div style={{ position:'relative', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1.2fr', gap: isMobile ? 32 : 48, alignItems:'start' }}>
        <SectionLabel index="07 / BOOK A DEMO" dark/>
        <div>
          <h2 style={{ fontSize: isMobile ? 32 : 50, lineHeight: 1.05, fontWeight: 700, letterSpacing:'-0.03em', margin: 0 }}>See what a survey looks like for a business your size.</h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, color:'#EFEBE4', margin:'22px 0 12px' }}>In 30 minutes we'll walk you through:</p>
          <ul style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 10 }}>
            {['What your staff see on WhatsApp, step by step', 'How we lift response rates in hard-to-reach teams', 'A sample insights report by site, department and role', 'A fixed quote for your workforce'].map(t => (
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
          <div role="status" style={{ background:'#fff', color:'var(--ink)', boxShadow:'0 30px 60px rgba(0,0,0,.35)', padding: isMobile ? '28px 22px' : '40px 36px', borderTop:'3px solid var(--orange)' }}>
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius:'50%', background:'var(--orange)' }}/>
              <span style={labelStyle}>REQUEST RECEIVED</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.2, letterSpacing:'-0.02em', margin:'16px 0 12px' }}>Thank you. We'll be in touch within a working day.</div>
            <p style={{ fontSize: 15.5, color:'var(--graphite)', lineHeight: 1.6, margin: 0 }}>
              In the meantime, you can look through our <a href="https://engagementsurveysdeck.thehrinsightsco.co.za/" style={{ color:'var(--ink)' }}>engagement surveys overview</a>.
            </p>
          </div>
        ) : (
          <form
            name="demo-request"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            style={{ background:'#fff', color:'var(--ink)', boxShadow:'0 30px 60px rgba(0,0,0,.35)', padding: isMobile ? '26px 20px' : '36px', display:'flex', flexDirection:'column', gap: 22, borderTop:'3px solid var(--orange)' }}
          >
            <input type="hidden" name="form-name" value="demo-request"/>
            <input type="hidden" name="bot-field" style={{ display:'none' }}/>
            <div style={row}>
              <Field label="Name"><input style={inputStyle} name="name" required autoComplete="name" value={fields.name} onChange={set('name')}/></Field>
              <Field label="Role"><input style={inputStyle} name="role" required autoComplete="organization-title" placeholder="e.g. HR Manager" value={fields.role} onChange={set('role')}/></Field>
            </div>
            <div style={row}>
              <Field label="Organisation"><input style={inputStyle} name="organisation" required autoComplete="organization" value={fields.organisation} onChange={set('organisation')}/></Field>
              <Field label="Industry">
                <select style={inputStyle} name="industry" required value={fields.industry} onChange={set('industry')}>
                  <option value="">Select</option>
                  {['Hospitality','Mining','Agriculture','Retail','Manufacturing','Security','Logistics & transport','Healthcare & care','Other'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <div style={row}>
              <Field label="Employees">
                <select style={inputStyle} name="employees" required value={fields.employees} onChange={set('employees')}>
                  <option value="">Select range</option>
                  {['Under 50','50–150','151–300','301–1,000','1,000+'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Work email"><input style={inputStyle} type="email" name="email" required autoComplete="email" value={fields.email} onChange={set('email')}/></Field>
            </div>
            <div style={row}>
              <Field label="Phone (optional)"><input style={inputStyle} type="tel" name="phone" autoComplete="tel" value={fields.phone} onChange={set('phone')}/></Field>
            </div>
            <label style={{ display:'flex', gap: 10, alignItems:'flex-start', fontSize: 13, color:'var(--graphite)', lineHeight: 1.5 }}>
              <input type="checkbox" name="consent" value="yes" required checked={fields.consent === 'yes'} onChange={set('consent')} style={{ marginTop: 3 }}/>
              I agree that The HR Insights Co. may use these details to contact me about a demo, in line with POPIA.
            </label>
            <BtnOrange type="submit" disabled={sending} full>
              {sending ? 'Sending…' : 'Request a demo'} {!sending && <Icon name="arrowSm" size={14} color="#fff"/>}
            </BtnOrange>
            <p style={{ fontSize: 12.5, color:'var(--slate)', margin: 0 }}>We reply within one working day to confirm a time.</p>
          </form>
        )}
      </div>
    </section>
  );
}

function EngagementPage({ startAt }) {
  React.useEffect(() => { document.title = 'Employee Engagement Surveys via WhatsApp — The HR Insights Co.'; }, []);
  // Land on a section (e.g. /book-a-demo → the demo form). Re-align once images and fonts have loaded.
  React.useEffect(() => {
    if (!startAt) return;
    const go = () => { const el = document.getElementById(startAt); if (el) el.scrollIntoView({ block:'start' }); };
    go();
    window.addEventListener('load', go, { once: true });
    const t = setTimeout(go, 600);
    return () => { window.removeEventListener('load', go); clearTimeout(t); };
  }, [startAt]);
  return (
    <div>
      <SiteHeader current="surveys"/>
      <Hero/>
      <Problem/>
      <HowItWorks/>
      <Testimonial/>
      <WhyUs/>
      <WhoFor/>
      <Pricing/>
      <SurveyResults/>
      <BookDemo/>
      <SiteFooter showCta={false}/>
    </div>
  );
}

export default EngagementPage;
