import React from 'react'

// Minimal, brand-aligned animated chart for the hero.
// Two series: Labour Cost % of Revenue (trending down) + Revenue per Employee (trending up, Burnt Orange).
// Draws in on mount via stroke-dashoffset, then endpoint pulses. Honours prefers-reduced-motion.

function HeroGraph() {
  // Viewbox in canonical units; SVG is responsive via CSS width.
  const W = 520, H = 260;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const iw = W - padL - padR, ih = H - padT - padB;

  // 12 monthly data points per series — May 25 → Apr 26
  const months = ['M','J','J','A','S','O','N','D','J','F','M','A'];

  // Labour cost % revenue — trending DOWN, range mapped 46..42 (lower is better)
  const labour = [46.2, 46.0, 45.6, 45.4, 45.1, 44.6, 44.2, 43.9, 43.3, 42.9, 42.5, 42.1];
  // Revenue per employee (R thousands per month) — trending UP, range 78..96
  const revpe  = [78.4, 79.1, 80.2, 81.0, 81.9, 83.4, 85.1, 86.8, 88.3, 90.9, 93.2, 96.0];

  // Domains
  const lMin = 41.5, lMax = 47.0;
  const rMin = 76,   rMax = 98;

  const xAt = (i) => padL + (i / (months.length - 1)) * iw;
  const yLabour = (v) => padT + (1 - (v - lMin) / (lMax - lMin)) * ih;
  const yRev    = (v) => padT + (1 - (v - rMin) / (rMax - rMin)) * ih;

  // Build smooth catmull-rom -> bezier path
  const smooth = (pts) => {
    if (pts.length < 2) return '';
    const d = [`M ${pts[0][0]} ${pts[0][1]}`];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];
      const t = 0.18; // tension — low & smooth
      const c1x = p1[0] + (p2[0] - p0[0]) * t;
      const c1y = p1[1] + (p2[1] - p0[1]) * t;
      const c2x = p2[0] - (p3[0] - p1[0]) * t;
      const c2y = p2[1] - (p3[1] - p1[1]) * t;
      d.push(`C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`);
    }
    return d.join(' ');
  };

  const labourPts = labour.map((v, i) => [xAt(i), yLabour(v)]);
  const revPts    = revpe.map((v, i) => [xAt(i), yRev(v)]);
  const labourPath = smooth(labourPts);
  const revPath    = smooth(revPts);

  // Endpoints for annotations / pulse
  const lEnd = labourPts[labourPts.length - 1];
  const rEnd = revPts[revPts.length - 1];

  // Refs for dasharray measurement
  const labourRef = React.useRef(null);
  const revRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    // tiny delay so initial layout is stable
    const t = setTimeout(() => setReady(true), 60);
    return () => { mq.removeEventListener?.('change', onChange); clearTimeout(t); };
  }, []);

  // Compute path lengths at runtime for accurate dashoffset animations.
  const [lenLabour, setLenLabour] = React.useState(0);
  const [lenRev, setLenRev] = React.useState(0);
  React.useEffect(() => {
    if (labourRef.current) setLenLabour(labourRef.current.getTotalLength());
    if (revRef.current)    setLenRev(revRef.current.getTotalLength());
  }, []);

  const drawMs = reduced ? 0 : 1800;
  const delayMs = reduced ? 0 : 180;

  return (
    <div style={{
      width:'100%', maxWidth: 560,
      opacity: 0.92,
      pointerEvents:'none',
      userSelect:'none',
    }}>
      {/* Header row — mono labels, brand-consistent */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 14, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'#a6a6d4', letterSpacing:'.1em' }}>
        <span>LIVE · SAMPLE WORKFORCE DATA</span>
        <span>MAY 25 — APR 26</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display:'block', overflow:'visible' }} role="img" aria-label="Labour cost percent of revenue trending down, and revenue per employee trending up">
        <defs>
          {/* Soft mist-on-ink area fill for the orange line */}
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2410C" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#C2410C" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="labourFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Faint gridlines (4 horizontal) */}
        {[0, 1, 2, 3, 4].map(i => {
          const y = padT + (i / 4) * ih;
          return (
            <line key={i}
              x1={padL} x2={W - padR} y1={y} y2={y}
              stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="2 4"
            />
          );
        })}

        {/* X-axis month ticks — tiny mono text */}
        {months.map((m, i) => (
          <text key={i}
            x={xAt(i)} y={H - 14}
            fill="#a6a6d4" fontSize="9" fontFamily="JetBrains Mono, monospace"
            textAnchor="middle" letterSpacing="1"
          >{m}</text>
        ))}

        {/* Y-axis labels — left side for Labour %, right side for Rev/Emp */}
        <text x={padL - 8} y={padT + 4} fill="#a6a6d4" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="0.5">47%</text>
        <text x={padL - 8} y={padT + ih + 3} fill="#a6a6d4" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="0.5">42%</text>

        {/* Labour — white ghost line (down trend) */}
        <path d={labourPath} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.6"
          ref={labourRef}
          style={{
            strokeDasharray: lenLabour || 1200,
            strokeDashoffset: ready ? 0 : (lenLabour || 1200),
            transition: `stroke-dashoffset ${drawMs}ms cubic-bezier(.5,.1,.25,1) ${delayMs}ms`,
          }}
        />

        {/* Orange primary — the single point of insight (rev per emp, up) */}
        <path d={`${revPath} L ${rEnd[0]} ${padT + ih} L ${revPts[0][0]} ${padT + ih} Z`} fill="url(#revFill)"
          style={{
            opacity: ready ? 1 : 0,
            transition: `opacity ${drawMs}ms ease ${delayMs + 900}ms`,
          }}
        />
        <path d={revPath} fill="none" stroke="#C2410C" strokeWidth="2.2"
          ref={revRef}
          style={{
            strokeDasharray: lenRev || 1200,
            strokeDashoffset: ready ? 0 : (lenRev || 1200),
            transition: `stroke-dashoffset ${drawMs}ms cubic-bezier(.5,.1,.25,1) ${delayMs + 600}ms`,
          }}
        />

        {/* Endpoint markers + labels */}
        {/* Labour endpoint (white, subtle) */}
        <g style={{ opacity: ready ? 1 : 0, transition:`opacity 320ms ease ${delayMs + drawMs}ms` }}>
          <circle cx={lEnd[0]} cy={lEnd[1]} r="3" fill="#060644" stroke="#ffffff" strokeWidth="1.5"/>
          <line x1={lEnd[0] + 8} x2={lEnd[0] + 20} y1={lEnd[1]} y2={lEnd[1]} stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1"/>
          <text x={lEnd[0] + 24} y={lEnd[1] + 3} fill="#ffffff" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">
            42.1%
          </text>
          <text x={lEnd[0] + 24} y={lEnd[1] + 16} fill="#a6a6d4" fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.6">
            LABOUR / REV
          </text>
        </g>

        {/* Revenue endpoint — pulsing orange dot (the insight point) */}
        <g style={{ opacity: ready ? 1 : 0, transition:`opacity 320ms ease ${delayMs + drawMs + 200}ms` }}>
          {/* Pulsing halo */}
          {!reduced && (
            <circle cx={rEnd[0]} cy={rEnd[1]} r="6" fill="#C2410C" fillOpacity="0.35">
              <animate attributeName="r"           values="5; 14; 5"          dur="3.2s" begin="2.6s" repeatCount="indefinite"/>
              <animate attributeName="fill-opacity" values="0.35; 0; 0.35"    dur="3.2s" begin="2.6s" repeatCount="indefinite"/>
            </circle>
          )}
          <circle cx={rEnd[0]} cy={rEnd[1]} r="4.5" fill="#C2410C"/>
          <circle cx={rEnd[0]} cy={rEnd[1]} r="4.5" fill="none" stroke="#060644" strokeWidth="1.5"/>
          <line x1={rEnd[0] - 8} x2={rEnd[0] - 20} y1={rEnd[1]} y2={rEnd[1]} stroke="#C2410C" strokeOpacity="0.6" strokeWidth="1"/>
          <text x={rEnd[0] - 24} y={rEnd[1] + 3} fill="#C2410C" fontSize="10.5" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="0.5" fontWeight="600">
            R 96k
          </text>
          <text x={rEnd[0] - 24} y={rEnd[1] + 16} fill="#a6a6d4" fontSize="8.5" fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="0.6">
            REV / EMPLOYEE
          </text>
        </g>

        {/* Moving scan line (very subtle) — optional ambient motion, suppressed when reduced */}
        {!reduced && (
          <line x1={padL} x2={padL} y1={padT} y2={padT + ih} stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1">
            <animate attributeName="x1" values={`${padL}; ${W - padR}; ${padL}`} dur="14s" begin="3s" repeatCount="indefinite"/>
            <animate attributeName="x2" values={`${padL}; ${W - padR}; ${padL}`} dur="14s" begin="3s" repeatCount="indefinite"/>
          </line>
        )}
      </svg>

      {/* Legend footer */}
      <div style={{ marginTop: 14, display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'JetBrains Mono,monospace', fontSize: 10, color:'#a6a6d4', letterSpacing:'.08em' }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap: 8 }}>
          <span style={{ width: 14, height: 2, background:'#ffffff', opacity:.85 }}/> LABOUR / REV ↓
        </span>
        <span style={{ display:'inline-flex', alignItems:'center', gap: 8 }}>
          <span style={{ width: 14, height: 2, background:'#C2410C' }}/> REV / EMPLOYEE ↑
        </span>
      </div>
    </div>
  );
}

export default HeroGraph;
