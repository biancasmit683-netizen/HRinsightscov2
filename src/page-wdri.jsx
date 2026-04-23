import React from 'react'

// Workforce Data Readiness Index — lead-magnet diagnostic
// Interactive prototype. Landing → 10 questions → result. Copy is verbatim from the content spec.

const WDRI_QUESTIONS = [
  {
    q: 'How many separate systems hold your workforce data?',
    clar: 'Think payroll, HRIS, time and attendance, learning, recruitment, engagement, and spreadsheets the team maintains on the side.',
    short: 'How many systems hold your workforce data.',
    interp: 'The more systems, the more work to reconcile. Integration or consolidation is usually the first unlock.',
    opts: [
      { t:'One or two, fully integrated.', s:4 },
      { t:'Three or four.', s:3 },
      { t:'Five to seven.', s:1 },
      { t:'Eight or more.', s:0 },
      { t:'I do not know.', s:0 },
    ],
  },
  {
    q: 'When your CFO and HR director look at total headcount on the same day, do they see the same number?',
    clar: 'Not what it should be. What it actually is, when checked.',
    short: 'CFO and HR director agree on today\u2019s headcount.',
    interp: 'If HR and Finance do not see the same headcount, every derived metric is already compromised.',
    opts: [
      { t:'Always. Reconciled monthly and signed off.', s:4 },
      { t:'Usually within five percent.', s:2 },
      { t:'Often differs.', s:1 },
      { t:'We have never actually checked.', s:0 },
      { t:'I do not know.', s:0 },
    ],
  },
  {
    q: 'Can you state, right now, what a regrettable resignation in a critical role costs your business in Rands?',
    clar: 'A regrettable resignation is an exit the business did not want. A critical role is one where a 30-day vacancy materially affects revenue or service.',
    short: 'Regrettable resignation cost in a critical role.',
    interp: 'Without a Rand figure on regrettable exits, retention spend has no business case and no target.',
    opts: [
      { t:'Yes. We calculate it per role, including replacement cost and lost productivity.', s:4 },
      { t:'Yes. We use a blended estimate.', s:2 },
      { t:'No. We report a single recruitment line in the financials.', s:1 },
      { t:'No. We do not track exit cost.', s:0 },
    ],
  },
  {
    q: 'What percentage of your workforce cost data reconciles to the general ledger each month?',
    clar: 'Reconciled means the HR numbers tie to Finance, and both sides agree on the result.',
    short: 'Workforce cost reconciled to the GL monthly.',
    interp: 'Workforce data that does not reconcile to the GL cannot carry weight in a financial conversation.',
    opts: [
      { t:'All of it. Formally reconciled and signed off every month.', s:4 },
      { t:'Payroll only.', s:2 },
      { t:'Partial, with known gaps.', s:1 },
      { t:'None, or only at year end.', s:0 },
      { t:'I do not know.', s:0 },
    ],
  },
  {
    q: 'If you asked HR today for labour cost as a percentage of revenue for last month, broken down by business unit, how long would it take?',
    clar: 'Assume the ExCo asked for it in the next meeting.',
    short: 'Speed to labour cost % of revenue by business unit.',
    interp: 'If labour cost to revenue is not on a dashboard, the exec team is making decisions on a lag.',
    opts: [
      { t:'It is already on a live dashboard.', s:4 },
      { t:'Within a day.', s:3 },
      { t:'Within a week.', s:1 },
      { t:'Would need a special project.', s:0 },
      { t:'Cannot be produced.', s:0 },
    ],
  },
  {
    q: 'Which of these do you currently track in a trusted, consistent way: engagement score, leave utilisation, absenteeism rate, time to fill, cost per hire, revenue per FTE?',
    clar: 'Trusted means the exec team would actually use the number. Consistent means the definition does not change from one report to the next.',
    short: 'Core six metrics tracked in a trusted way.',
    interp: 'The six metrics together form the minimum viable view. Missing three or more leaves too much in the dark.',
    opts: [
      { t:'All six.', s:4 },
      { t:'Four or five.', s:3 },
      { t:'Two or three.', s:2 },
      { t:'One.', s:1 },
      { t:'None, or tracked but not trusted.', s:0 },
    ],
  },
  {
    q: 'When a critical role sits unfilled for 30 days or more, does anyone calculate the cost of the vacancy?',
    clar: 'The cost of a vacancy is not the recruitment fee. It is the revenue, productivity, or service impact of the role being empty.',
    short: 'Cost of a 30+ day critical vacancy.',
    interp: 'Unpriced vacancies mean slow hiring is treated as a process problem, not a revenue problem.',
    opts: [
      { t:'Yes. Per role, in Rands, tracked monthly.', s:4 },
      { t:'Occasionally. For senior roles only.', s:2 },
      { t:'No, but we track time to fill.', s:1 },
      { t:'No. Neither.', s:0 },
    ],
  },
  {
    q: 'Who owns workforce data in your organisation?',
    clar: 'Owns means is accountable for its accuracy, its definitions, and its use in decisions.',
    short: 'Ownership of workforce data.',
    interp: 'Without shared ownership between HR and Finance, workforce data stays an HR artefact and never reaches the decision.',
    opts: [
      { t:'Jointly owned by HR and Finance under a formal governance model.', s:4 },
      { t:'HR owns it. Finance reviews it monthly.', s:3 },
      { t:'HR owns it. Finance does not engage with it.', s:1 },
      { t:'Nobody has clear ownership.', s:0 },
      { t:'I do not know.', s:0 },
    ],
  },
  {
    q: 'When was the last time a workforce metric actually changed an executive decision in your business?',
    clar: 'Changed a decision. Not informed a conversation.',
    short: 'A workforce metric actually changing a decision.',
    interp: 'If workforce data has not changed a decision recently, it is reporting, not insight.',
    opts: [
      { t:'In the last month.', s:4 },
      { t:'In the last quarter.', s:3 },
      { t:'In the last year.', s:1 },
      { t:'I cannot recall a specific instance.', s:0 },
      { t:'Never, to my knowledge.', s:0 },
    ],
  },
  {
    q: 'If you had to hand your workforce data to a new analyst tomorrow, how much of it would you trust them to use without correction?',
    clar: 'Without correction means the numbers are defensible as they stand.',
    short: 'Data a new analyst could use without correction.',
    interp: 'Data that needs correction before it can be used is not yet an asset. It is a liability with potential.',
    opts: [
      { t:'Most of it. Documented, clean, and consistently structured.', s:4 },
      { t:'Some of it. With caveats.', s:2 },
      { t:'Very little.', s:1 },
      { t:'I would ask them to start from scratch.', s:0 },
      { t:'I do not know.', s:0 },
    ],
  },
];

const WDRI_BANDS = [
  { name:'Foundational', min:0, max:25,
    narr:'Your workforce data is not yet in a state to drive decisions. That is more common than most leaders realise, and it is fixable. The systems, the ownership, and the definitions all need structure before the numbers can carry weight at the exec table. The return on getting this right is high, because most of your competitors sit in the same place. Starting with a clear view of where you stand is the single highest-leverage thing you can do.' },
  { name:'Fragmented', min:26, max:50,
    narr:'You have data. You do not yet have one view of it. The numbers live in different systems, owned by different teams, and rarely arrive at the exec table in the same form twice. The gap is structural, not effort. Closing it is a matter of connecting what you already have and naming what you still need to build. A Pulse Check maps that gap against the decisions your exec team actually wants to make.' },
  { name:'Emerging', min:51, max:75,
    narr:'You are ahead of most mid-sized South African businesses. Your data is mostly in place and mostly trusted. The remaining gap is usually in how the data connects to financial decisions: pricing a vacancy, costing regrettable turnover, reading labour cost against revenue in something close to real time. That is where the sharpest return sits. A short, focused engagement can move you from good data to decisions at the planning cycle.' },
  { name:'Advanced', min:76, max:100,
    narr:'Your workforce data is working for you. You have the systems, the ownership, and the discipline to trust the numbers in front of the exec team. The conversation worth having is how to extend the edge, particularly where workforce data meets the planning cycle: scenario modelling, succession economics, and the metrics that do not yet sit on a dashboard but should. Businesses in this band benefit most from a thinking partner, not a clean-up project.' },
];

function bandForPct(p) {
  return WDRI_BANDS.find(b => p >= b.min && p <= b.max) || WDRI_BANDS[0];
}

// ---------- Shell ----------
function WDRIShell({ children, narrow = false }) {
  return (
    <div style={{ background:'#fff', minHeight: 900, fontFamily:'Inter,sans-serif', color:'var(--ink)' }}>
      <SiteNav active="" />
      <div style={{ padding:'72px 48px 80px', maxWidth: narrow ? 900 : 1240, margin:'0 auto' }}>
        {children}
      </div>
    </div>
  );
}

// ---------- Landing ----------
function WDRILanding({ onStart }) {
  return (
    <WDRIShell>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 48 }}>
        <div>
          <Eyebrow>Diagnostic · free</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', marginTop: 12, letterSpacing:'.06em', lineHeight: 1.7 }}>
            WORKFORCE DATA<br/>READINESS INDEX<br/>v1.0
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: 56, lineHeight: 1.06, letterSpacing:'-0.025em', fontWeight: 600, margin: 0, maxWidth: 880 }}>
            How ready is your workforce data to drive decisions?
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, color:'var(--ink)', fontWeight: 500, marginTop: 26, maxWidth: 720 }}>
            Ten questions. About five minutes. Honest answers give you a more useful result.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color:'var(--graphite)', marginTop: 20, maxWidth: 720 }}>
            Most mid-sized South African businesses have more workforce data than they think, and less insight than they need. This assessment surfaces the gap. It asks the questions a CFO and an HR leader should be able to answer together. Wherever you land, the result tells you what is worth doing next.
          </p>
          <div style={{ marginTop: 40, display:'flex', alignItems:'center', gap: 22 }}>
            <button onClick={onStart} style={{ background:'var(--ink)', color:'#fff', border:'none', padding:'15px 24px', fontFamily:'Inter', fontWeight: 500, fontSize: 15, cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 12 }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--orange)' }}/>
              Start the assessment
              <Icon name="arrowSm" size={16} color="#fff"/>
            </button>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.06em' }}>
              10 QUESTIONS · ~5 MIN · NO SIGN-UP TO TAKE
            </span>
          </div>

          <div style={{ marginTop: 56, paddingTop: 28, borderTop:'1px solid var(--rule)', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 40 }}>
            <div>
              <Eyebrow>Why this exists</Eyebrow>
              <p style={{ fontSize: 14.5, color:'var(--graphite)', lineHeight: 1.6, marginTop: 12, maxWidth: 460 }}>
                Built by a team from HR, finance, and data. Informed by how CFOs and HR leaders actually make workforce decisions.
              </p>
            </div>
            <div>
              <Eyebrow>What happens at the end</Eyebrow>
              <p style={{ fontSize: 14.5, color:'var(--graphite)', lineHeight: 1.6, marginTop: 12, maxWidth: 460 }}>
                You see a readiness percentage, the band you sit in, and the three gaps worth addressing first. Nothing is emailed unless you ask for it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WDRIShell>
  );
}

// ---------- Progress bar ----------
function WDRIProgress({ n, total, phase = 'q' }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 14, fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.08em' }}>
      <span>Q{String(n+1).padStart(2,'0')} OF {String(total).padStart(2,'0')}</span>
      <div style={{ display:'flex', gap: 6, alignItems:'center' }}>
        {Array.from({length: total}).map((_,i) => {
          const done = i < n;
          const active = i === n && phase === 'q';
          return (
            <span key={i} style={{
              width: active ? 14 : 6,
              height: 6,
              background: active ? 'var(--orange)' : (done ? 'var(--ink)' : 'var(--rule)'),
              borderRadius: active ? 3 : 0,
              transition: 'all .25s ease',
            }}/>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Question ----------
function WDRIQuestion({ idx, total, selected, onSelect, onNext, onBack }) {
  const q = WDRI_QUESTIONS[idx];
  const [hover, setHover] = React.useState(-1);
  return (
    <WDRIShell narrow>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <WDRIProgress n={idx} total={total}/>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.08em' }}>
          WORKFORCE DATA READINESS INDEX
        </span>
      </div>

      <div style={{ marginTop: 56, maxWidth: 820 }}>
        <h2 style={{ fontSize: 34, lineHeight: 1.2, letterSpacing:'-0.02em', fontWeight: 600, margin: 0 }}>
          {q.q}
        </h2>
        {q.clar && (
          <p style={{ fontSize: 15, color:'var(--graphite)', marginTop: 16, lineHeight: 1.55, maxWidth: 740 }}>
            {q.clar}
          </p>
        )}
      </div>

      <div style={{ marginTop: 36, display:'flex', flexDirection:'column', gap: 10, maxWidth: 820 }}>
        {q.opts.map((o, i) => {
          const sel = selected === i;
          const hov = hover === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              style={{
                textAlign:'left',
                background: sel ? 'var(--ink)' : '#fff',
                color: sel ? '#fff' : 'var(--ink)',
                border: `1px solid ${sel ? 'var(--ink)' : (hov ? 'var(--ink)' : 'var(--rule)')}`,
                padding:'18px 22px',
                fontFamily:'Inter,sans-serif',
                fontSize: 15.5,
                fontWeight: 500,
                cursor:'pointer',
                transition: 'all .18s ease',
                transform: hov && !sel ? 'translateY(-1px)' : 'none',
                display:'flex', alignItems:'center', gap: 16,
              }}
            >
              <span style={{
                width: 16, height: 16, borderRadius:'50%',
                border: `1.5px solid ${sel ? '#fff' : 'var(--ink)'}`,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                flexShrink: 0,
              }}>
                {sel && <span style={{ width: 7, height: 7, borderRadius:'50%', background:'#fff' }}/>}
              </span>
              <span>{o.t}</span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 40, display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth: 820 }}>
        <button
          onClick={onBack}
          disabled={idx === 0}
          style={{
            background:'transparent', border:'none', padding:0, cursor: idx===0?'default':'pointer',
            fontFamily:'Inter', fontSize: 14, fontWeight: 500, color: idx===0 ? 'var(--rule)' : 'var(--slate)',
            display:'inline-flex', alignItems:'center', gap: 8,
          }}
        >
          <span style={{ transform:'rotate(180deg)', display:'inline-flex' }}><Icon name="arrowSm" size={14} color={idx===0 ? '#c7c7d6' : 'var(--slate)'}/></span>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selected === undefined || selected === null}
          style={{
            background: selected!=null ? 'var(--ink)' : 'transparent',
            color: selected!=null ? '#fff' : 'var(--slate)',
            border: selected!=null ? 'none' : '1px solid var(--rule)',
            padding:'13px 22px',
            fontFamily:'Inter', fontSize: 14, fontWeight: 500,
            cursor: selected!=null ? 'pointer' : 'default',
            display:'inline-flex', alignItems:'center', gap: 10,
            transition:'all .18s ease',
          }}
        >
          {idx === total - 1 ? 'See your result' : 'Next'}
          <Icon name="arrowSm" size={14} color={selected!=null ? '#fff' : 'var(--slate)'}/>
        </button>
      </div>
    </WDRIShell>
  );
}

// ---------- Loading ----------
function WDRILoading() {
  return (
    <WDRIShell narrow>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: 540, gap: 28 }}>
        <div style={{ position:'relative', width: 40, height: 40 }}>
          <div style={{ position:'absolute', inset: 0, borderRadius:'50%', background:'var(--orange)', animation:'wdriPulse 1.2s ease-in-out infinite' }}/>
        </div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>
          SCORING · READING YOUR ANSWERS
        </div>
      </div>
      <style>{`@keyframes wdriPulse { 0%,100% { transform: scale(.7); opacity:.7 } 50% { transform: scale(1); opacity: 1 } }`}</style>
    </WDRIShell>
  );
}

// ---------- Result ----------
function AnimatedNumber({ target, duration = 1000 }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let start;
    let raf;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{v}</>;
}

function WDRIResult({ answers, onReset }) {
  const scores = answers.map((a, i) => WDRI_QUESTIONS[i].opts[a].s);
  const raw = scores.reduce((a,b)=>a+b, 0);
  const pct = Math.round((raw / 40) * 100);
  const band = bandForPct(pct);
  const bandIdx = WDRI_BANDS.findIndex(b => b.name === band.name);

  // three lowest-scoring questions
  const gaps = scores
    .map((s, i) => ({ s, i }))
    .sort((a, b) => a.s - b.s || a.i - b.i)
    .slice(0, 3)
    .map(g => ({
      ...g,
      q: WDRI_QUESTIONS[g.i],
      selectedText: WDRI_QUESTIONS[g.i].opts[answers[g.i]].t,
    }));

  const allTop = scores.every(s => s === 4);

  return (
    <WDRIShell>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 48 }}>
        <div>
          <Eyebrow>Result</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', marginTop: 12, letterSpacing:'.06em', lineHeight: 1.7 }}>
            WORKFORCE DATA<br/>READINESS INDEX<br/>{new Date().toISOString().slice(0,10).toUpperCase()}
          </div>
          <button onClick={onReset} style={{ marginTop: 24, background:'transparent', border:'none', padding:0, cursor:'pointer', fontFamily:'Inter', fontSize: 13, fontWeight: 500, color:'var(--slate)', display:'inline-flex', alignItems:'center', gap: 8 }}>
            <span style={{ transform:'rotate(180deg)', display:'inline-flex' }}><Icon name="arrowSm" size={13} color="var(--slate)"/></span>
            Retake the assessment
          </button>
        </div>

        <div>
          <h1 style={{ fontSize: 46, lineHeight: 1.12, letterSpacing:'-0.025em', fontWeight: 600, margin: 0, maxWidth: 960 }}>
            You are <span style={{ color:'var(--orange)', fontSize: 120, letterSpacing:'-0.04em', lineHeight: 1, display:'inline-block', verticalAlign:'baseline', fontWeight: 600 }}>
              <AnimatedNumber target={pct}/>%
            </span>
            {' '}ready to extract meaningful insight from your workforce data.
          </h1>

          <div style={{ marginTop: 24, display:'flex', alignItems:'center', gap: 14 }}>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>BAND</span>
            <span style={{ fontSize: 18, fontWeight: 500, color:'var(--graphite)' }}>{band.name}</span>
          </div>

          {/* band chart */}
          <div style={{ marginTop: 36, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing:'-0.005em', marginBottom: 18 }}>
              Where you sit across the four bands.
            </div>
            <BandChart pct={pct} bandIdx={bandIdx}/>
          </div>

          {/* narrative */}
          <div style={{ marginTop: 40, maxWidth: 880 }}>
            <p style={{ fontSize: 17, lineHeight: 1.65, color:'var(--ink)', margin: 0, fontWeight: 400 }}>
              {band.narr}
            </p>
          </div>

          {/* gaps */}
          <div style={{ marginTop: 48, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <Eyebrow>What your answers suggest</Eyebrow>
            {allTop ? (
              <p style={{ fontSize: 17, color:'var(--ink)', lineHeight: 1.55, marginTop: 16, maxWidth: 840 }}>
                You answered every question at the highest band. The conversation worth having is about what is next, not what is missing.
              </p>
            ) : (
              <div style={{ marginTop: 20, display:'flex', flexDirection:'column' }}>
                {gaps.map((g, i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'48px 1fr 1fr', gap: 24, padding:'22px 0', borderBottom: i < 2 ? '1px solid var(--rule)' : 'none' }}>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--orange)', letterSpacing:'.08em' }}>0{g.i+1}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing:'-0.005em' }}>{g.q.short}</div>
                      <div style={{ fontSize: 13.5, color:'var(--slate)', marginTop: 6, fontStyle:'italic' }}>
                        You answered: {g.selectedText}
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color:'var(--graphite)', lineHeight: 1.55 }}>
                      {g.q.interp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 48, background:'var(--mist)', padding:'36px 32px', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap: 32, alignItems:'center' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing:'-0.01em', lineHeight: 1.3 }}>
                The result is a starting point, not a plan.
              </div>
              <p style={{ fontSize: 14, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55, maxWidth: 520, margin:'10px 0 0' }}>
                A 30-minute conversation with the team translates your answers into the specific Pulse Check scope that would fit your business. The team arrives already knowing where you are.
              </p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap: 14 }}>
              <button style={{ background:'var(--ink)', color:'#fff', border:'none', padding:'15px 24px', fontFamily:'Inter', fontWeight: 500, fontSize: 15, cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 10 }}>
                Book a conversation with the team
                <Icon name="arrowSm" size={15} color="#fff"/>
              </button>
              <button style={{ background:'transparent', border:'none', padding:0, fontFamily:'Inter', fontWeight: 500, fontSize: 14, color:'var(--graphite)', cursor:'pointer', borderBottom:'1px solid var(--graphite)', paddingBottom: 2 }}>
                Email the result to me
              </button>
            </div>
          </div>
        </div>
      </div>
    </WDRIShell>
  );
}

function BandChart({ pct, bandIdx }) {
  const w = 900;
  const h = 54;
  const markerX = (pct / 100) * w;
  return (
    <div style={{ width: w, maxWidth:'100%' }}>
      <div style={{ position:'relative', height: h }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', height: 14, border:'1px solid var(--rule)' }}>
          {WDRI_BANDS.map((b, i) => (
            <div key={i} style={{
              background: i === bandIdx ? 'var(--ink)' : 'transparent',
              borderRight: i < 3 ? '1px solid var(--rule)' : 'none',
            }}/>
          ))}
        </div>
        <div style={{ position:'absolute', left: markerX, top: -4, transform:'translateX(-50%)' }}>
          <div style={{ width: 2, height: 30, background:'var(--orange)' }}/>
          <div style={{ width: 12, height: 12, background:'var(--orange)', borderRadius:'50%', marginLeft: -5, marginTop: -6, boxShadow:'0 0 0 3px #fff' }}/>
        </div>
        <div style={{ position:'absolute', left: markerX, top: 32, transform:'translateX(-50%)', fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--orange)', letterSpacing:'.06em', whiteSpace:'nowrap', fontWeight: 600 }}>
          YOU · {pct}%
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', marginTop: 12, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.06em' }}>
        {WDRI_BANDS.map((b,i) => (
          <div key={i} style={{ color: i === bandIdx ? 'var(--ink)' : 'var(--slate)', fontWeight: i === bandIdx ? 600 : 400 }}>
            {b.min}–{b.max}% · {b.name.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Controller (desktop) ----------
function WDRIApp({ initialPhase = 'landing', initialAnswers = [] }) {
  const [phase, setPhase] = React.useState(initialPhase); // landing | q | loading | result
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState(initialAnswers.length ? initialAnswers : Array(10).fill(null));

  const start = () => { setAnswers(Array(10).fill(null)); setIdx(0); setPhase('q'); };
  const select = (opt) => { const a = [...answers]; a[idx] = opt; setAnswers(a); };
  const next = () => {
    if (idx === 9) {
      setPhase('loading');
      setTimeout(() => setPhase('result'), 1400);
    } else {
      setIdx(idx + 1);
    }
  };
  const back = () => { if (idx > 0) setIdx(idx - 1); };
  const reset = () => { setPhase('landing'); setIdx(0); setAnswers(Array(10).fill(null)); };

  if (phase === 'landing')  return <WDRILanding onStart={start}/>;
  if (phase === 'loading')  return <WDRILoading/>;
  if (phase === 'result')   return <WDRIResult answers={answers} onReset={reset}/>;
  return (
    <WDRIQuestion
      idx={idx} total={10}
      selected={answers[idx]}
      onSelect={select} onNext={next} onBack={back}
    />
  );
}

// ---------- Mobile ----------
function WDRIMobileShell({ children }) {
  return (
    <div style={{ width: 390, background:'#fff', fontFamily:'Inter,sans-serif', color:'var(--ink)' }}>
      <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--rule)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Wordmark size={11}/>
        <Icon name="menu" size={18} color="var(--ink)"/>
      </div>
      <div style={{ padding:'28px 18px 40px' }}>{children}</div>
    </div>
  );
}

function WDRIMobileLanding() {
  return (
    <WDRIMobileShell>
      <Eyebrow>Diagnostic · free</Eyebrow>
      <h1 style={{ fontSize: 30, lineHeight: 1.15, letterSpacing:'-0.02em', fontWeight: 600, margin:'14px 0 0' }}>
        How ready is your workforce data to drive decisions?
      </h1>
      <p style={{ fontSize: 15.5, lineHeight: 1.5, color:'var(--ink)', fontWeight: 500, marginTop: 16 }}>
        Ten questions. About five minutes. Honest answers give you a more useful result.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.6, color:'var(--graphite)', marginTop: 16 }}>
        Most mid-sized South African businesses have more workforce data than they think, and less insight than they need. This assessment surfaces the gap. It asks the questions a CFO and an HR leader should be able to answer together. Wherever you land, the result tells you what is worth doing next.
      </p>
      <button style={{ marginTop: 28, background:'var(--ink)', color:'#fff', border:'none', padding:'14px 22px', fontFamily:'Inter', fontWeight: 500, fontSize: 15, cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 10, width:'100%', justifyContent:'center' }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--orange)' }}/>
        Start the assessment
      </button>
      <div style={{ marginTop: 22, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.06em', textAlign:'center' }}>
        10 QUESTIONS · ~5 MIN · NO SIGN-UP
      </div>
      <div style={{ marginTop: 32, paddingTop: 20, borderTop:'1px solid var(--rule)' }}>
        <Eyebrow>Why this exists</Eyebrow>
        <p style={{ fontSize: 13.5, color:'var(--graphite)', lineHeight: 1.55, marginTop: 10 }}>
          Built by a team from HR, finance, and data. Informed by how CFOs and HR leaders actually make workforce decisions.
        </p>
      </div>
    </WDRIMobileShell>
  );
}

function WDRIMobileQuestion() {
  const idx = 2;
  const total = 10;
  const q = WDRI_QUESTIONS[idx];
  const selected = 1;
  return (
    <WDRIMobileShell>
      <WDRIProgress n={idx} total={total}/>
      <h2 style={{ fontSize: 22, lineHeight: 1.25, letterSpacing:'-0.015em', fontWeight: 600, margin:'22px 0 0' }}>
        {q.q}
      </h2>
      <p style={{ fontSize: 13.5, color:'var(--graphite)', marginTop: 12, lineHeight: 1.55 }}>
        {q.clar}
      </p>
      <div style={{ marginTop: 22, display:'flex', flexDirection:'column', gap: 8 }}>
        {q.opts.map((o, i) => {
          const sel = selected === i;
          return (
            <div key={i} style={{
              background: sel ? 'var(--ink)' : '#fff',
              color: sel ? '#fff' : 'var(--ink)',
              border: `1px solid ${sel ? 'var(--ink)' : 'var(--rule)'}`,
              padding:'14px 16px',
              fontSize: 14, fontWeight: 500,
              display:'flex', alignItems:'center', gap: 12,
            }}>
              <span style={{
                width: 14, height: 14, borderRadius:'50%',
                border: `1.5px solid ${sel ? '#fff' : 'var(--ink)'}`,
                display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
              }}>
                {sel && <span style={{ width: 6, height: 6, borderRadius:'50%', background:'#fff' }}/>}
              </span>
              <span>{o.t}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 28, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'Inter', fontSize: 13, color:'var(--slate)', display:'inline-flex', alignItems:'center', gap: 6 }}>
          <span style={{ transform:'rotate(180deg)', display:'inline-flex' }}><Icon name="arrowSm" size={12} color="var(--slate)"/></span>
          Back
        </span>
        <button style={{ background:'var(--ink)', color:'#fff', border:'none', padding:'12px 20px', fontSize: 13.5, fontWeight: 500, display:'inline-flex', alignItems:'center', gap: 8 }}>
          Next <Icon name="arrowSm" size={13} color="#fff"/>
        </button>
      </div>
    </WDRIMobileShell>
  );
}

function WDRIMobileResult() {
  // sample: 58% Emerging
  const pct = 58;
  const band = bandForPct(pct);
  const bandIdx = WDRI_BANDS.findIndex(b => b.name === band.name);
  return (
    <WDRIMobileShell>
      <Eyebrow>Result</Eyebrow>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 84, fontWeight: 600, color:'var(--orange)', letterSpacing:'-0.04em', lineHeight: 1 }}>{pct}%</div>
        <div style={{ fontSize: 20, fontWeight: 600, marginTop: 14, letterSpacing:'-0.015em', lineHeight: 1.25 }}>
          ready to extract meaningful insight from your workforce data.
        </div>
        <div style={{ marginTop: 10, fontSize: 14, color:'var(--graphite)' }}>
          Band · <span style={{ color:'var(--ink)', fontWeight: 500 }}>{band.name}</span>
        </div>
      </div>

      <div style={{ marginTop: 22, paddingTop: 18, borderTop:'1px solid var(--rule)' }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 12 }}>Where you sit across the four bands.</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', height: 10, border:'1px solid var(--rule)' }}>
          {WDRI_BANDS.map((b,i) => (
            <div key={i} style={{ background: i === bandIdx ? 'var(--ink)' : 'transparent', borderRight: i<3?'1px solid var(--rule)':'none' }}/>
          ))}
        </div>
        <div style={{ position:'relative', height: 24 }}>
          <div style={{ position:'absolute', left:`${pct}%`, top: -6, transform:'translateX(-50%)', width: 10, height: 10, background:'var(--orange)', borderRadius:'50%' }}/>
        </div>
      </div>

      <p style={{ fontSize: 14.5, lineHeight: 1.6, color:'var(--ink)', marginTop: 14 }}>
        {band.narr}
      </p>

      <div style={{ marginTop: 26, paddingTop: 18, borderTop:'1px solid var(--rule)' }}>
        <Eyebrow>What your answers suggest</Eyebrow>
        {[2, 4, 6].map((qi, i) => (
          <div key={i} style={{ padding:'14px 0', borderBottom: i < 2 ? '1px solid var(--rule)' : 'none' }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--orange)', letterSpacing:'.08em' }}>0{qi+1}</div>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing:'-0.005em', marginTop: 4 }}>
              {WDRI_QUESTIONS[qi].short}
            </div>
            <div style={{ fontSize: 12.5, color:'var(--graphite)', lineHeight: 1.5, marginTop: 6 }}>
              {WDRI_QUESTIONS[qi].interp}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26, background:'var(--mist)', padding:'20px 18px' }}>
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing:'-0.01em', lineHeight: 1.3 }}>
          The result is a starting point, not a plan.
        </div>
        <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 8, lineHeight: 1.55 }}>
          A 30-minute conversation translates your answers into the Pulse Check scope that would fit your business.
        </p>
        <button style={{ marginTop: 14, background:'var(--ink)', color:'#fff', border:'none', padding:'13px 18px', fontSize: 14, fontWeight: 500, width:'100%', display:'inline-flex', justifyContent:'center', alignItems:'center', gap: 8 }}>
          Book a conversation with the team <Icon name="arrowSm" size={13} color="#fff"/>
        </button>
        <div style={{ marginTop: 12, textAlign:'center' }}>
          <span style={{ fontSize: 13, color:'var(--graphite)', borderBottom:'1px solid var(--graphite)', paddingBottom: 2 }}>Email the result to me</span>
        </div>
      </div>
    </WDRIMobileShell>
  );
}

// ---------- Specs card ----------
function WDRISpecs() {
  const Card = ({ state, bg, color, border }) => (
    <div style={{ background: bg, color, border, padding:'16px 18px', fontSize: 14, fontWeight: 500, fontFamily:'Inter,sans-serif', display:'flex', alignItems:'center', gap: 12, minHeight: 54 }}>
      <span style={{
        width: 14, height: 14, borderRadius:'50%',
        border: `1.5px solid ${color === '#fff' ? '#fff' : 'var(--ink)'}`,
        display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
      }}>
        {state === 'selected' && <span style={{ width: 6, height: 6, borderRadius:'50%', background:'#fff' }}/>}
      </span>
      Answer option label.
    </div>
  );
  return (
    <div style={{ padding:'64px 48px', background:'#fff', fontFamily:'Inter,sans-serif', color:'var(--ink)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 48 }}>
        <div>
          <Eyebrow>Design specs</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', marginTop: 10, letterSpacing:'.06em', lineHeight: 1.7 }}>
            WORKFORCE DATA<br/>READINESS INDEX<br/>v1.0 · APR 2026
          </div>
        </div>

        <div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing:'-0.02em', lineHeight: 1.2, maxWidth: 820 }}>
            Answer card states, progress, and button language.
          </div>

          <div style={{ marginTop: 36, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <Eyebrow>Answer card states</Eyebrow>
            <div style={{ marginTop: 16, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14, maxWidth: 880 }}>
              <div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em', marginBottom: 8 }}>DEFAULT</div>
                <Card state="default" bg="#fff" color="var(--ink)" border="1px solid var(--rule)"/>
              </div>
              <div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em', marginBottom: 8 }}>HOVER</div>
                <Card state="hover" bg="#fff" color="var(--ink)" border="1px solid var(--ink)"/>
              </div>
              <div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em', marginBottom: 8 }}>FOCUS (KEYBOARD)</div>
                <div style={{ outline:'2px solid var(--orange)', outlineOffset: 2 }}>
                  <Card state="default" bg="#fff" color="var(--ink)" border="1px solid var(--ink)"/>
                </div>
              </div>
              <div>
                <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em', marginBottom: 8 }}>SELECTED</div>
                <Card state="selected" bg="var(--ink)" color="#fff" border="1px solid var(--ink)"/>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 36, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <Eyebrow>Progress indicator</Eyebrow>
            <div style={{ marginTop: 18 }}>
              <WDRIProgress n={3} total={10}/>
            </div>
            <p style={{ fontSize: 13.5, color:'var(--graphite)', marginTop: 14, lineHeight: 1.55, maxWidth: 760 }}>
              Completed questions render as filled Deep Ink marks. The active question is an elongated Burnt Orange mark — the single hero accent per screen. Remaining questions render as hairline Mist Grey marks. Width transition is 250 ms ease.
            </p>
          </div>

          <div style={{ marginTop: 36, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <Eyebrow>Buttons and links</Eyebrow>
            <div style={{ marginTop: 18, display:'flex', gap: 16, flexWrap:'wrap', alignItems:'center' }}>
              <button style={{ background:'var(--ink)', color:'#fff', border:'none', padding:'13px 22px', fontFamily:'Inter', fontSize: 14, fontWeight: 500 }}>Primary · Deep Ink</button>
              <button style={{ background:'transparent', color:'var(--slate)', border:'1px solid var(--rule)', padding:'13px 22px', fontFamily:'Inter', fontSize: 14, fontWeight: 500 }}>Next (inactive)</button>
              <span style={{ fontSize: 14, color:'var(--graphite)', borderBottom:'1px solid var(--graphite)', paddingBottom: 2 }}>Secondary link</span>
            </div>
            <p style={{ fontSize: 13.5, color:'var(--graphite)', marginTop: 14, lineHeight: 1.55, maxWidth: 760 }}>
              Primary button is Deep Ink on white, 13 × 22 px padding, no radius, Inter Medium 14. Inactive Next uses a rule-only outline and Slate Grey label. Secondary link sits on a 1 px Graphite underline, Inter Medium 14.
            </p>
          </div>

          <div style={{ marginTop: 36, borderTop:'1px solid var(--rule)', paddingTop: 28, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 28 }}>
            <div>
              <Eyebrow>Orange discipline</Eyebrow>
              <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                One orange element per screen. Landing: the orange dot inside the primary button. Question: the active progress mark. Result: the percentage and the band marker.
              </p>
            </div>
            <div>
              <Eyebrow>Motion</Eyebrow>
              <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                Fade between questions (180 ms). Progress mark width (250 ms). Score count-up (1 s, once). No lift effects beyond a 1 px translation on hover. No gamified feedback.
              </p>
            </div>
            <div>
              <Eyebrow>Accessibility</Eyebrow>
              <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                Radio cards are buttons with role=radio in-market. Keyboard navigation: Tab between cards, Enter or Space to select, Enter on Next to advance. Visible focus outline is 2 px Burnt Orange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WDRI_QUESTIONS, WDRI_BANDS, bandForPct };
