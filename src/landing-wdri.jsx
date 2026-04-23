import React from 'react'
import { WDRI_QUESTIONS, WDRI_BANDS, bandForPct } from './page-wdri'

// Embedded Workforce Data Readiness Index — inline section for the landing page.

function WDRISection({ id }) {
  const [phase, setPhase] = React.useState('landing'); // landing | q | loading | result
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState(() => Array(10).fill(null));

  const start = () => {
    setAnswers(Array(10).fill(null));
    setIdx(0);
    setPhase('q');
    // smooth focus into the card
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  };
  const select = (opt) => { const a = [...answers]; a[idx] = opt; setAnswers(a); };
  const next = () => {
    if (idx === 9) {
      setPhase('loading');
      setTimeout(() => setPhase('result'), 1200);
    } else {
      setIdx(idx + 1);
    }
  };
  const back = () => { if (idx > 0) setIdx(idx - 1); };
  const reset = () => { setPhase('landing'); setIdx(0); setAnswers(Array(10).fill(null)); };

  return (
    <section id={id} data-anchor="readiness" data-screen-label="06 WDRI" style={{
      background:'#fff',
      padding:'96px 48px 48px',
      borderTop:'1px solid var(--rule)',
    }}>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 40, marginBottom: 48 }}>
        <SectionLabel index="07 / READINESS ASSESSMENT"/>
        <div>
          <div style={{ fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', maxWidth: 760 }}>
            How ready is your workforce data to drive decisions?
          </div>
          <div style={{ fontSize: 16.5, lineHeight: 1.6, color:'var(--graphite)', maxWidth: 640, marginTop: 18 }}>
            Ten questions. About five minutes. Honest answers give you a more useful result.
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 40 }}>
        <div/>
        <div style={{ background:'#F7F7F4', border:'1px solid var(--rule)' }}>
          {phase === 'landing'  && <EmbedLanding onStart={start}/>}
          {phase === 'q'        && <EmbedQuestion idx={idx} total={10} selected={answers[idx]} onSelect={select} onNext={next} onBack={back}/>}
          {phase === 'loading'  && <EmbedLoading/>}
          {phase === 'result'   && <EmbedResult answers={answers} onReset={reset}/>}
        </div>
      </div>
    </section>
  );
}

// ---------- Landing ----------
function EmbedLanding({ onStart }) {
  return (
    <div style={{ padding:'56px 48px 60px', display:'grid', gridTemplateColumns:'1fr 360px', gap: 48, alignItems:'center' }}>
      <div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.12em', marginBottom: 18 }}>
          DIAGNOSTIC · FREE · NO SIGN-UP TO TAKE
        </div>
        <div style={{ fontSize: 22, lineHeight: 1.4, color:'var(--ink)', maxWidth: 560, fontWeight: 500 }}>
          Most mid-sized South African businesses have more workforce data than they think, and less insight than they need. This assessment surfaces the gap.
        </div>
        <div style={{ fontSize: 15.5, lineHeight: 1.6, color:'var(--graphite)', maxWidth: 560, marginTop: 16 }}>
          At the end you see a readiness percentage, the band you sit in, and the three gaps worth addressing first. Nothing is emailed unless you ask for it.
        </div>

        <div style={{ marginTop: 32, display:'flex', alignItems:'center', gap: 20, flexWrap:'wrap' }}>
          <button onClick={onStart} style={{
            background:'var(--ink)', color:'#fff', border:'none',
            padding:'15px 24px', fontFamily:'Inter, sans-serif', fontWeight: 500, fontSize: 15,
            cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 12,
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--orange)' }}/>
            Start the assessment
            <Icon name="arrowSm" size={16} color="#fff"/>
          </button>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.08em' }}>
            10 QUESTIONS · ~5 MIN
          </span>
        </div>
      </div>

      {/* Band-preview rail on the right */}
      <div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.12em', marginBottom: 14 }}>
          FOUR BANDS
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap: 0, border:'1px solid var(--rule)', background:'#fff' }}>
          {WDRI_BANDS.map((b, i) => (
            <div key={b.name} style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', padding:'14px 16px', borderBottom: i < WDRI_BANDS.length - 1 ? '1px solid var(--rule)' : 'none' }}>
              <div style={{ fontSize: 14, fontWeight: 500, color:'var(--ink)' }}>{b.name}</div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.05em' }}>
                {b.min}–{b.max}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Progress ----------
function EmbedProgress({ n, total }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 14, fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.08em' }}>
      <span>Q{String(n+1).padStart(2,'0')} OF {String(total).padStart(2,'0')}</span>
      <div style={{ display:'flex', gap: 6, alignItems:'center' }}>
        {Array.from({length: total}).map((_,i) => {
          const done = i < n;
          const active = i === n;
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
function EmbedQuestion({ idx, total, selected, onSelect, onNext, onBack }) {
  const q = WDRI_QUESTIONS[idx];
  const [hover, setHover] = React.useState(-1);
  return (
    <div style={{ padding:'40px 48px 44px' }}>
      <EmbedProgress n={idx} total={total}/>

      <div style={{ fontSize: 28, lineHeight: 1.25, fontWeight: 600, letterSpacing:'-0.018em', maxWidth: 840, marginTop: 22 }}>
        {q.q}
      </div>
      {q.clar && (
        <div style={{ fontSize: 14.5, color:'var(--graphite)', lineHeight: 1.55, marginTop: 12, maxWidth: 720 }}>
          {q.clar}
        </div>
      )}

      <div style={{ marginTop: 28, display:'flex', flexDirection:'column', gap: 10, maxWidth: 840 }}>
        {q.opts.map((opt, i) => {
          const on = selected === opt;
          const hov = hover === i && !on;
          return (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              style={{
                textAlign:'left', cursor:'pointer',
                padding:'16px 18px',
                background: on ? 'var(--ink)' : '#fff',
                color: on ? '#fff' : 'var(--ink)',
                border: on ? '1px solid var(--ink)' : `1px solid ${hov ? 'var(--ink)' : 'var(--rule)'}`,
                fontFamily:'Inter, sans-serif',
                fontSize: 15,
                display:'flex', alignItems:'center', gap: 14,
                transition:'background 120ms ease, color 120ms ease, border-color 120ms ease',
              }}
            >
              <span style={{
                width: 14, height: 14, flex:'0 0 14px',
                border: `1px solid ${on ? '#fff' : 'var(--ink)'}`,
                background: on ? '#fff' : 'transparent',
                display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}>
                {on && <span style={{ width: 8, height: 8, background:'var(--orange)' }}/>}
              </span>
              {opt.t}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 30, display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--rule)', paddingTop: 24 }}>
        <button onClick={onBack} disabled={idx === 0} style={{
          background:'transparent', border:'none', padding:0, cursor: idx === 0 ? 'default' : 'pointer',
          color: idx === 0 ? 'var(--slate)' : 'var(--ink)',
          fontSize: 14, fontFamily:'Inter, sans-serif', fontWeight: 500,
          opacity: idx === 0 ? 0.5 : 1,
          display:'inline-flex', alignItems:'center', gap: 8,
        }}>
          ← Back
        </button>
        <button onClick={onNext} disabled={!selected} style={{
          background: selected ? 'var(--ink)' : 'var(--rule)',
          color: selected ? '#fff' : 'var(--slate)',
          border:'none', padding:'14px 22px',
          cursor: selected ? 'pointer' : 'not-allowed',
          fontSize: 14.5, fontFamily:'Inter, sans-serif', fontWeight: 500,
          display:'inline-flex', alignItems:'center', gap: 10,
          transition:'background 140ms ease',
        }}>
          {idx === total - 1 ? 'See result' : 'Next'}
          <Icon name="arrowSm" size={14} color={selected ? '#fff' : 'var(--slate)'}/>
        </button>
      </div>
    </div>
  );
}

// ---------- Loading ----------
function EmbedLoading() {
  return (
    <div style={{ padding:'80px 48px', textAlign:'center' }}>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.12em' }}>
        CALCULATING · READINESS INDEX
      </div>
      <div style={{ margin:'24px auto 0', width: 180, height: 3, background:'var(--rule)', position:'relative', overflow:'hidden' }}>
        <div style={{
          position:'absolute', left:'-40%', top: 0, height: 3, width:'40%',
          background:'var(--orange)',
          animation:'wdri-slide 1200ms linear infinite',
        }}/>
      </div>
      <style>{`@keyframes wdri-slide { 0% { left:-40%; } 100% { left: 100%; } }`}</style>
    </div>
  );
}

// ---------- Result ----------
function EmbedResult({ answers, onReset }) {
  // Score: each answer carries s (0..4). Max = 10 * 4 = 40.
  const raw = answers.reduce((t, a) => t + (a ? a.s : 0), 0);
  const pct = Math.round((raw / 40) * 100);
  const band = bandForPct(pct);
  const bandIdx = WDRI_BANDS.findIndex(b => b.name === band.name);

  // Three gaps worth addressing = lowest-scoring questions
  const ranked = answers.map((a, i) => ({
    i, q: WDRI_QUESTIONS[i], s: a ? a.s : 0, short: WDRI_QUESTIONS[i].short, interp: WDRI_QUESTIONS[i].interp,
  })).sort((a, b) => a.s - b.s);
  const gaps = ranked.slice(0, 3);

  // Animate score in
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    let rafId;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(pct * eased));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [pct]);

  return (
    <div style={{ padding:'40px 48px 48px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 48, alignItems:'start' }}>
        <div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.12em', marginBottom: 14 }}>
            YOUR READINESS INDEX
          </div>
          <div style={{ display:'flex', alignItems:'baseline', gap: 14 }}>
            <div style={{ fontSize: 96, lineHeight: 1, fontWeight: 600, letterSpacing:'-0.04em', color:'var(--ink)' }}>
              {shown}<span style={{ fontSize: 44, color:'var(--slate)' }}>%</span>
            </div>
          </div>
          <div style={{ marginTop: 18, display:'inline-flex', alignItems:'center', gap: 10, padding:'8px 14px', border:'1px solid var(--ink)', background:'var(--ink)', color:'#fff' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--orange)' }}/>
            <span style={{ fontSize: 14, fontFamily:'JetBrains Mono,monospace', letterSpacing:'.08em' }}>BAND · {band.name.toUpperCase()}</span>
          </div>

          {/* Band chart */}
          <div style={{ marginTop: 26 }}>
            <div style={{ display:'flex', height: 10, border:'1px solid var(--rule)', background:'#fff' }}>
              {WDRI_BANDS.map((b, i) => (
                <div key={b.name} style={{
                  flex: (b.max - b.min + 1),
                  background: i === bandIdx ? 'var(--orange)' : 'transparent',
                  borderRight: i < WDRI_BANDS.length - 1 ? '1px solid var(--rule)' : 'none',
                  transition:'background 240ms ease',
                }}/>
              ))}
            </div>
            <div style={{ display:'flex', marginTop: 6, fontFamily:'JetBrains Mono,monospace', fontSize: 10, color:'var(--slate)', letterSpacing:'.06em' }}>
              {WDRI_BANDS.map((b) => (
                <div key={b.name} style={{ flex: (b.max - b.min + 1), textAlign:'left' }}>
                  {b.name.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.6, color:'var(--graphite)', marginTop: 26, maxWidth: 520 }}>
            {band.narr}
          </p>
        </div>

        <div>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.12em', marginBottom: 14 }}>
            THREE GAPS WORTH ADDRESSING
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 0, border:'1px solid var(--rule)', background:'#fff' }}>
            {gaps.map((g, i) => (
              <li key={g.i} style={{ padding:'18px 18px', borderBottom: i < gaps.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--orange)', letterSpacing:'.08em' }}>GAP 0{i+1}</span>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>· Q{String(g.i+1).padStart(2,'0')}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color:'var(--ink)', marginTop: 6, lineHeight: 1.35 }}>
                  {g.short}
                </div>
                <div style={{ fontSize: 13.5, color:'var(--graphite)', marginTop: 8, lineHeight: 1.55 }}>
                  {g.interp}
                </div>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: 22, display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap' }}>
            <button onClick={() => document.getElementById('pulse').scrollIntoView({ behavior:'smooth' })} style={{
              background:'var(--ink)', color:'#fff', border:'none',
              padding:'14px 22px', fontFamily:'Inter, sans-serif', fontWeight: 500, fontSize: 14.5,
              cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 10,
            }}>
              Ready to turn this into a Pulse Check?
              <Icon name="arrowSm" size={14} color="#fff"/>
            </button>
            <button onClick={onReset} style={{
              background:'transparent', border:'none', padding: 0, cursor:'pointer',
              color:'var(--graphite)', fontSize: 13.5, fontFamily:'Inter, sans-serif', textDecoration:'underline',
            }}>
              Retake the assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WDRISection };
