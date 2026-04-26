import React from 'react'
import { Wordmark, Eyebrow, Icon } from './shared'

// Industry focus — ABC Lodge (Pty) Ltd dashboard demo
// A marketing asset that looks like a product. Lives on the Industry Focus (hospitality) page.

// ---------- Helpers ---------------------------------------------------------

function Sparkline({ values, height = 36, width = 120, accentIndex = -1, color = 'var(--ink)' }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pad = 3;
  const step = (width - pad*2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i*step, height - pad - ((v - min) / span) * (height - pad*2)]);
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  return (
    <svg width={width} height={height} style={{ display:'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      {accentIndex >= 0 && (
        <circle cx={pts[accentIndex][0]} cy={pts[accentIndex][1]} r="3.2" fill="var(--orange)"/>
      )}
      {accentIndex >= 0 && (
        <circle cx={pts[values.length-1][0]} cy={pts[values.length-1][1]} r="2.2" fill={color}/>
      )}
    </svg>
  );
}

function TrendChip({ dir = 'up', magnitude = '2.1 pp', bad = false }) {
  const color = bad ? 'var(--orange)' : 'var(--graphite)';
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '→';
  return (
    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color, letterSpacing:'.04em', display:'inline-flex', gap:5, alignItems:'center' }}>
      <span style={{ fontSize: 9 }}>{arrow}</span>{magnitude}
    </span>
  );
}

function RatioGauge({ pct, threshold = 15, label, width = 180 }) {
  const p = Math.min(pct / 30, 1); // scale 0..30%
  const tx = (threshold / 30);
  const isOver = pct > threshold;
  return (
    <svg width={width} height={40} style={{ display:'block' }}>
      <line x1="0" y1="28" x2={width} y2="28" stroke="var(--rule)" strokeWidth="1"/>
      <line x1={width*tx} y1="22" x2={width*tx} y2="34" stroke="var(--slate)" strokeWidth="1" strokeDasharray="2 2"/>
      <line x1="0" y1="28" x2={width*p} y2="28" stroke={isOver ? 'var(--orange)' : 'var(--ink)'} strokeWidth="2.5"/>
      <circle cx={width*p} cy="28" r="3" fill={isOver ? 'var(--orange)' : 'var(--ink)'}/>
      <text x={width*tx} y="14" fontFamily="JetBrains Mono" fontSize="9" fill="var(--slate)" textAnchor="middle" letterSpacing=".04em">THRESHOLD {threshold}%</text>
    </svg>
  );
}

function HBar({ data, width = 560, rowH = 26, accentRule = null, format = v => v }) {
  const max = Math.max(...data.map(d => d.value));
  const labelW = 180;
  const valueW = 90;
  const barW = width - labelW - valueW - 16;
  const height = data.length * rowH + 8;
  return (
    <svg width={width} height={height} style={{ display:'block' }}>
      {data.map((d, i) => {
        const y = i * rowH + 4;
        const w = (d.value / max) * barW;
        const accent = accentRule ? accentRule(d) : false;
        const color = accent ? 'var(--orange)' : 'var(--ink)';
        return (
          <g key={i}>
            <text x="0" y={y + rowH*0.62} fontFamily="Inter" fontSize="12.5" fill="var(--ink)" fontWeight={accent ? 600 : 500}>{d.label}</text>
            <rect x={labelW} y={y + 6} width={w} height={rowH - 14} fill={color}/>
            <text x={labelW + barW + 8} y={y + rowH*0.62} fontFamily="JetBrains Mono" fontSize="11.5" fill={accent ? 'var(--orange)' : 'var(--graphite)'} fontWeight={accent ? 600 : 400}>{format(d.value)}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Header ----------------------------------------------------------

function DashHeader({ view, onToggle }) {
  return (
    <div style={{ padding:'22px 32px 20px', borderBottom:'1px solid var(--rule)', background:'#fff', display:'grid', gridTemplateColumns:'200px 1fr 260px', alignItems:'center', gap: 24 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
        <Wordmark size={13}/>
      </div>
      <div style={{ display:'flex', alignItems:'baseline', gap: 16, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.1em' }}>
        <span style={{ color:'var(--ink)' }}>INDUSTRY FOCUS · HOSPITALITY</span>
        <span style={{ color:'var(--rule)' }}>|</span>
        <span>DEMO ENVIRONMENT</span>
        <span style={{ color:'var(--rule)' }}>|</span>
        <span>DATA AS AT 30 APR 2026</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap: 12, fontSize: 12 }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>VIEW</span>
        <div style={{ display:'inline-flex', border:'1px solid var(--ink)' }}>
          <button onClick={() => onToggle && onToggle('cfo')} style={{ padding:'7px 14px', background: view==='cfo' ? 'var(--ink)' : '#fff', color: view==='cfo' ? '#fff' : 'var(--ink)', border:'none', fontFamily:'Inter', fontWeight: 500, fontSize: 12.5, cursor:'pointer', letterSpacing:'.02em' }}>CFO view</button>
          <button onClick={() => onToggle && onToggle('hr')} style={{ padding:'7px 14px', background: view==='hr' ? 'var(--ink)' : '#fff', color: view==='hr' ? '#fff' : 'var(--ink)', border:'none', borderLeft:'1px solid var(--ink)', fontFamily:'Inter', fontWeight: 500, fontSize: 12.5, cursor:'pointer', letterSpacing:'.02em' }}>HR view</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Framing band ----------------------------------------------------

function DashFraming({ view }) {
  const cfoTakeaway = (<>
    Labour cost has crossed <span style={{ background:'#f6e4d9', color:'var(--orange)', padding:'1px 5px', fontWeight:600 }}>48% of revenue at Kruger and Letaba</span>, driven by eight regrettable exits in F&amp;B and a 41-day fill time on the two lodge manager seats. Roster review and targeted retention triggered.
  </>);
  const hrTakeaway = (<>
    Two properties are running hot. F&amp;B engagement at Kruger is <span style={{ background:'#f6e4d9', color:'var(--orange)', padding:'1px 5px', fontWeight:600 }}>15 points below group average</span>, and the lodge manager seats at Letaba and Pafuri have been open 41 and 46 days. Retention and backfill owners named below.
  </>);
  return (
    <div style={{ padding:'40px 32px 32px', background:'#fff', borderBottom:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'180px 1fr 280px', gap: 32 }}>
        <div>
          <Eyebrow>Client</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', marginTop: 8, lineHeight: 1.7, letterSpacing:'.02em' }}>
            KAYA RIDGE LODGE GROUP<br/>
            5 PROPERTIES · LIMPOPO &amp; MPUMALANGA<br/>
            280 EMPLOYEES · R 80M REVENUE
          </div>
        </div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15, letterSpacing:'-0.02em', maxWidth: 760 }}>
            ABC Lodge (Pty) Ltd: workforce view, April 2026.
          </div>
          <div style={{ marginTop: 18, fontSize: 15, lineHeight: 1.55, color:'var(--graphite)', maxWidth: 760, fontWeight: 400 }}>
            {view === 'cfo' ? cfoTakeaway : hrTakeaway}
          </div>
        </div>
        <div style={{ borderLeft:'1px solid var(--rule)', paddingLeft: 24 }}>
          <Eyebrow>This period</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', marginTop: 10, lineHeight: 1.8 }}>
            APR 2026 · MONTH 4 OF 12<br/>
            GREEN SEASON · OCCUPANCY 44%<br/>
            <span style={{ color:'var(--orange)' }}>●</span> 2 PROPERTIES FLAGGED
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Metric tile -----------------------------------------------------

function MetricTile({ n, name, value, valueSub, trend, trendBad, caption, children, accent = false, expand }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background:'#fff',
        padding:'22px 22px 20px',
        border: accent ? '1px solid var(--orange)' : '1px solid var(--rule)',
        position:'relative',
        transition:'transform .2s ease, box-shadow .2s ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 8px 24px rgba(6,6,68,.08)' : 'none',
        cursor: 'default',
        minHeight: 220,
        display:'flex', flexDirection:'column',
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color: accent ? 'var(--orange)' : 'var(--slate)', letterSpacing:'.1em' }}>
          {n}
        </div>
        {trend && <TrendChip {...trend} bad={trendBad || accent}/>}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color:'var(--graphite)', marginTop: 10, lineHeight: 1.3 }}>{name}</div>
      <div style={{ display:'flex', alignItems:'baseline', gap: 8, marginTop: 8 }}>
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing:'-0.02em', color: accent ? 'var(--orange)' : 'var(--ink)', lineHeight: 1 }}>
          {value}
        </div>
        {valueSub && <div style={{ fontSize: 13, color:'var(--slate)', fontFamily:'JetBrains Mono,monospace' }}>{valueSub}</div>}
      </div>
      <div style={{ marginTop: 14, flex:1, display:'flex', alignItems:'flex-end' }}>
        {children}
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop:'1px solid var(--rule)', fontSize: 12, lineHeight: 1.5, color:'var(--graphite)', minHeight: 36 }}>
        {hover && expand ? <span style={{ color:'var(--ink)' }}>{expand}</span> : caption}
      </div>
    </div>
  );
}

// ---------- Metric grid -----------------------------------------------------

function MetricGrid({ view }) {
  const labourSeries = [38.2, 39.4, 40.1, 41.6, 42.8, 43.5, 44.8];
  const workforceSeries = [29.8, 30.1, 30.5, 30.8, 31.0, 31.2, 31.4];
  const timeToFill = [34, 36, 35, 38, 40, 39, 41];
  const revPerFte = [298, 296, 294, 291, 290, 288, 286];

  const cfo = {
    t1: { name:'Labour cost % of revenue', value:'44.8%', sub:'vs 41.5% plan', cap:'Labour cost crossed 42% at two properties in April. Roster review triggered.', ex:'Green-season spike at Kruger and Letaba. Flex plan modelled at R 720k saving if rosters reset by week 3 of May.' },
    t2: { name:'Total cost of workforce', value:'R 31.4m', sub:'YTD · 39% of revenue', cap:'Tracking R 2.4m above plan YTD. Drivers: overtime, agency cover in housekeeping.', ex:'Permanent salary R 24.1m, overtime R 3.8m, agency R 1.9m, benefits R 1.6m. Agency share doubled since February.' },
    t3: { name:'Regrettable turnover cost', value:'R 680k', sub:'8 of 14 exits regrettable', cap:'Eight regrettable exits cost R 680k. Retention programme for 20 critical roles projected to net R 240k in year one.', ex:'Head chef (Kruger), F&B managers (Letaba, Pafuri), 5 senior housekeepers. Avg cost R 85k per regrettable exit, R 12k per non-regrettable.' },
    t4: { name:'Time to fill, costed', value:'41 days', sub:'R 186k per critical vacancy', cap:'Two lodge manager seats open 41 and 46 days. Cost of vacancy R 4.5k per day, per seat.', ex:'Critical roles: lodge GM, head chef, F&B manager, maintenance lead. Pre-built pipeline would cut fill time to under 21 days.' },
    t5: { name:'Overtime dependency ratio', value:'17.2%', sub:'threshold 15.0%', cap:'Three properties above threshold. Structural review indicated over incremental overtime approvals.', ex:'Kruger 21%, Letaba 18%, Pafuri 16%. Two additional permanent F&B hires modelled at R 180k vs R 350k current overtime run-rate.' },
    t6: { name:'Revenue per FTE', value:'R 286k', sub:'down 4.1% vs prior', cap:'Productivity softening as headcount held while occupancy ran below plan.', ex:'Revenue per FTE fell from R 298k to R 286k over seven months. Rebases if rosters flex to occupancy curve.' },
    t7: { name:'Engagement × absenteeism', value:'6.4 / 4.8%', sub:'F&B engagement −15 pts', cap:'F&B engagement 15 points below group average at Kruger. Leading indicator for turnover.', ex:'Pulse survey n=248. Leave utilisation in housekeeping at 55%. Burnout signal: absenteeism up 1.6 points in 90 days.' },
  };

  const hr = {
    t1: { name:'Labour cost % of revenue', value:'44.8%', sub:'over-plan at 2 sites', cap:'Kruger and Letaba above 48%. Roster templates to reset against occupancy curve by week 3 of May.', ex:'Action owner: Operations. Flex plan reshapes the housekeeping and F&B rosters. No permanent cuts.' },
    t2: { name:'People cost mix', value:'R 31.4m', sub:'perm 77% · OT 12% · agency 6%', cap:'Agency share doubled since February. Signals a backfill problem in housekeeping, not a growth plan.', ex:'Housekeeping agency spend up 112% since February at Kruger. Permanent recruitment plan needed, not a headcount increase.' },
    t3: { name:'Exits: regrettable vs not', value:'8 / 14', sub:'57% regrettable', cap:'Eight regrettable exits in four months. F&B and senior housekeeping carrying the signal.', ex:'Retention package for the 20 critical roles ready. Housing benefit at Kruger, development path for senior housekeeping.' },
    t4: { name:'Time to fill, critical roles', value:'41 days', sub:'target 21 days', cap:'Lodge manager seats at Letaba and Pafuri open 41 and 46 days. Hiring plan with Ops lead.', ex:'Pre-built pipeline for the 10 critical roles agreed with GMs. Candidate bench in place by end of Q2.' },
    t5: { name:'Overtime dependency', value:'17.2%', sub:'3 sites over threshold', cap:'Overtime running as a staffing strategy, not a flex tool. Structural fix, not an approval rhythm.', ex:'Two permanent F&B hires at Kruger and Letaba. Wellness programme at housekeeping to slow absenteeism spiral.' },
    t6: { name:'Revenue per FTE', value:'R 286k', sub:'track vs target', cap:'Productivity is a read on rostering discipline, not effort. Conversation shifts to scheduling, not headcount cuts.', ex:'Reviewed monthly with Ops. Target R 305k by September if flex plan holds.' },
    t7: { name:'Engagement & leave', value:'6.4 / 55%', sub:'F&B at Kruger flagged', cap:'F&B engagement 15 points below group. Housekeeping leave utilisation 55%. Mandatory time off from May.', ex:'Pulse survey quarterly, leave tracked monthly. Absenteeism fed into rostering decisions, not disciplinary ones.' },
  };

  const set = view === 'cfo' ? cfo : hr;

  return (
    <div style={{ padding:'36px 32px', background:'var(--mist)' }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 20 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap: 14 }}>
          <Eyebrow>Workforce view · 07 metrics</Eyebrow>
          <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>ALL FIGURES TRACE TO SOURCE. HOVER A TILE FOR DETAIL.</span>
        </div>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' }}>28 MORE METRICS AVAILABLE ·</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 16 }}>
        <MetricTile n="01" {...set.t1.name && { name: set.t1.name }} value={set.t1.value} valueSub={set.t1.sub} trend={{ dir:'up', magnitude:'3.3 pp vs plan' }} trendBad caption={set.t1.cap} expand={set.t1.ex}>
          <Sparkline values={labourSeries} width={200} height={46} accentIndex={labourSeries.length-1}/>
        </MetricTile>

        <MetricTile n="02" name={set.t2.name} value={set.t2.value} valueSub={set.t2.sub} trend={{ dir:'up', magnitude:'R 2.4m over plan' }} trendBad caption={set.t2.cap} expand={set.t2.ex}>
          {view === 'cfo'
            ? <Sparkline values={workforceSeries} width={200} height={46}/>
            : <MixBar values={[{l:'Perm', v: 77, accent:false},{l:'OT', v: 12},{l:'Agency', v: 6},{l:'Benefits', v: 5}]} />
          }
        </MetricTile>

        {/* Orange hero tile */}
        <MetricTile n="03" name={set.t3.name} value={set.t3.value} valueSub={set.t3.sub} trend={{ dir:'up', magnitude:'57% regrettable' }} trendBad caption={set.t3.cap} expand={set.t3.ex} accent>
          <RegrettableSplit/>
        </MetricTile>

        <MetricTile n="04" name={set.t4.name} value={set.t4.value} valueSub={set.t4.sub} trend={{ dir:'up', magnitude:'+6 days vs Q1' }} trendBad caption={set.t4.cap} expand={set.t4.ex}>
          <Sparkline values={timeToFill} width={200} height={46} accentIndex={-1}/>
        </MetricTile>

        <MetricTile n="05" name={set.t5.name} value={set.t5.value} valueSub={set.t5.sub} trend={{ dir:'up', magnitude:'2.2 pp over' }} trendBad caption={set.t5.cap} expand={set.t5.ex}>
          <RatioGauge pct={17.2} threshold={15}/>
        </MetricTile>

        <MetricTile n="06" name={set.t6.name} value={set.t6.value} valueSub={set.t6.sub} trend={{ dir:'down', magnitude:'−4.1%' }} caption={set.t6.cap} expand={set.t6.ex}>
          <Sparkline values={revPerFte} width={200} height={46}/>
        </MetricTile>

        <MetricTile n="07" name={set.t7.name} value={set.t7.value} valueSub={set.t7.sub} trend={{ dir:'down', magnitude:'−1.3 pts' }} trendBad caption={set.t7.cap} expand={set.t7.ex}>
          <EngagementBars/>
        </MetricTile>

        {/* Eighth tile is the drill-down entry point */}
        <DeepDiveHook/>
      </div>
    </div>
  );
}

function MixBar({ values }) {
  const total = values.reduce((a,b)=>a+b.v,0);
  let acc = 0;
  return (
    <div style={{ width:'100%' }}>
      <div style={{ display:'flex', height: 12, width:'100%', background:'var(--rule)' }}>
        {values.map((v, i) => {
          const w = (v.v/total)*100;
          const color = i===0 ? 'var(--ink)' : i===1 ? '#3a3a6b' : i===2 ? '#7b7b9a' : '#bbbbcb';
          const out = <span key={i} style={{ width:`${w}%`, background: color }}/>;
          acc += w;
          return out;
        })}
      </div>
      <div style={{ display:'flex', gap: 10, marginTop: 8, fontFamily:'JetBrains Mono,monospace', fontSize: 9.5, color:'var(--slate)', letterSpacing:'.04em' }}>
        {values.map((v,i) => <span key={i}>{v.l} {v.v}%</span>)}
      </div>
    </div>
  );
}

function RegrettableSplit() {
  return (
    <svg width="220" height="46" style={{ display:'block' }}>
      <rect x="0" y="8" width="220" height="20" fill="var(--rule)"/>
      <rect x="0" y="8" width="125" height="20" fill="var(--orange)"/>
      <rect x="125" y="8" width="95" height="20" fill="var(--ink)"/>
      <text x="0" y="42" fontFamily="JetBrains Mono" fontSize="10" fill="var(--orange)" fontWeight="600">8 REGRETTABLE · R 680k</text>
      <text x="220" y="42" fontFamily="JetBrains Mono" fontSize="10" fill="var(--slate)" textAnchor="end">6 NON-REG · R 72k</text>
    </svg>
  );
}

function EngagementBars() {
  const rows = [
    { l:'Group', v: 78 },
    { l:'Housekeeping', v: 72 },
    { l:'F&B (Kruger)', v: 53, accent: true },
    { l:'Maint.', v: 81 },
  ];
  return (
    <div style={{ width:'100%' }}>
      {rows.map((r,i)=>(
        <div key={i} style={{ display:'grid', gridTemplateColumns:'80px 1fr 28px', gap: 6, alignItems:'center', marginBottom: 3 }}>
          <span style={{ fontSize: 10, color: r.accent ? 'var(--orange)' : 'var(--graphite)', fontFamily:'JetBrains Mono,monospace', fontWeight: r.accent?600:400 }}>{r.l}</span>
          <div style={{ height: 5, background:'var(--rule)', position:'relative' }}>
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${r.v}%`, background: r.accent ? 'var(--orange)' : 'var(--ink)' }}/>
          </div>
          <span style={{ fontSize: 10, color: r.accent ? 'var(--orange)' : 'var(--slate)', fontFamily:'JetBrains Mono,monospace', textAlign:'right', fontWeight: r.accent?600:400 }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

function DeepDiveHook() {
  return (
    <div style={{ background:'var(--ink)', color:'#fff', padding:'22px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight: 220 }}>
      <div>
        <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'#a6a6d4', letterSpacing:'.1em' }}>DEEP DIVE · 01</div>
        <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.25, marginTop: 14, letterSpacing:'-0.01em' }}>
          Which regrettable exits hurt most, and where.
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop: 18 }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'#a6a6d4', letterSpacing:'.08em' }}>SCROLL TO VIEW</span>
        <Icon name="down" size={18} color="#fff"/>
      </div>
    </div>
  );
}

// ---------- Deep dive ------------------------------------------------------

function DeepDive({ view }) {
  const roleExits = [
    { label:'Head chef, Kruger',            value: 182000, reg:true },
    { label:'F&B manager, Letaba',          value: 146000, reg:true },
    { label:'F&B manager, Pafuri',          value: 122000, reg:true },
    { label:'Senior housekeeper, Kruger',    value: 68000,  reg:true },
    { label:'Senior housekeeper, Letaba',    value: 64000,  reg:true },
    { label:'Maintenance lead, Pafuri',      value: 54000,  reg:true },
    { label:'Sommelier, Kruger',             value: 44000,  reg:true },
    { label:'Concierge, Letaba',             value: 28000,  reg:true },
    { label:'Housekeeper (seasonal) × 3',    value: 24000,  reg:false },
    { label:'Waiter (seasonal) × 2',         value: 18000,  reg:false },
    { label:'Night porter',                  value: 16000,  reg:false },
    { label:'Groundskeeper',                 value: 14000,  reg:false },
  ];
  const byProperty = [
    { label:'Kruger',       value: 294000, flag: true },
    { label:'Letaba',       value: 210000, flag: true },
    { label:'Pafuri',       value: 176000 },
    { label:'Hazyview',     value: 58000 },
    { label:'Magoebaskloof', value: 42000 },
  ];
  const fmt = v => 'R ' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v);

  const cfoText = (
    <>
      <p style={{ margin:'0 0 14px' }}>Eight regrettable exits in four months cost <b>R 680k</b>. The pattern is concentrated: two properties, two role families. Chef and F&amp;B manager departures carry 66% of the total cost.</p>
      <p style={{ margin:'0 0 14px' }}>A targeted retention programme for the 20 critical roles — housing benefit at Kruger, a six-month development path for senior housekeeping, and a bonded chef agreement — is modelled at <b>R 240k net saving</b> in year one, before the guest experience impact.</p>
      <p style={{ margin: 0, color:'var(--graphite)' }}>If the next two regrettable exits are prevented, the programme pays for itself by July.</p>
    </>
  );
  const hrText = (
    <>
      <p style={{ margin:'0 0 14px' }}>Eight regrettable exits in four months, concentrated at Kruger and Letaba, in F&amp;B and senior housekeeping. The signal was in the engagement and leave data 90 days ago.</p>
      <p style={{ margin:'0 0 14px' }}>Programme owners named. Housing benefit at Kruger signed off by end of May. Development pathway for senior housekeeping live in Q3. Bonded chef agreement with the Franschhoek training partner.</p>
      <p style={{ margin: 0, color:'var(--graphite)' }}>Next review: 30 May. Target: zero regrettable exits in F&amp;B management through Q3.</p>
    </>
  );

  return (
    <div style={{ padding:'64px 32px 56px', background:'#fff', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'180px 1fr', gap: 32, marginBottom: 36 }}>
        <div>
          <Eyebrow>Deep dive · 01</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', marginTop: 10, lineHeight: 1.7, letterSpacing:'.04em' }}>
            REGRETTABLE TURNOVER<br/>
            APR 2026 · YTD
          </div>
        </div>
        <div>
          <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.15, letterSpacing:'-0.02em', maxWidth: 900 }}>
            Eight regrettable exits cost <span style={{ color:'var(--orange)' }}>R 680k</span>. Two properties carry 74% of it.
          </div>
          <div style={{ marginTop: 14, fontSize: 14, color:'var(--graphite)', maxWidth: 720, lineHeight: 1.55 }}>
            Exits, costed per role. Regrettable in Burnt Orange, non-regrettable in Deep Ink. Chart sorted by cost.
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 32, alignItems:'flex-start' }}>
        <div style={{ background:'var(--mist)', padding:'28px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18, letterSpacing:'-0.005em' }}>Chef and F&B manager exits carry most of the cost.</div>
          <HBar data={roleExits} width={720} rowH={28} accentRule={d=>d.reg} format={fmt}/>
          <div style={{ display:'flex', gap: 18, marginTop: 14, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.06em' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><span style={{ width:10, height:8, background:'var(--orange)' }}/>REGRETTABLE</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><span style={{ width:10, height:8, background:'var(--ink)' }}/>NON-REGRETTABLE</span>
            <span style={{ marginLeft:'auto', color:'var(--slate)' }}>SOURCE · PAYROLL + EXIT INTERVIEWS · N=14</span>
          </div>
        </div>

        <div style={{ padding:'28px 26px', background:'var(--ink)', color:'#fff' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius:'50%', background:'var(--orange)' }}/>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'#a6a6d4', letterSpacing:'.1em' }}>WHAT THIS CHANGES</div>
          </div>
          <div style={{ marginTop: 16, fontSize: 18, fontWeight: 600, lineHeight: 1.3, letterSpacing:'-0.01em' }}>
            {view === 'cfo'
              ? <>Retention programme pays for itself in year one, before the guest impact.</>
              : <>Three interventions, three owners, first review 30 May.</>
            }
          </div>
          <div style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.6, color:'#e5e7ff' }}>
            {view === 'cfo' ? cfoText : hrText}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, letterSpacing:'-0.005em' }}>
          Kruger and Letaba carry 74% of the regrettable cost.
        </div>
        <div style={{ background:'var(--mist)', padding:'28px 24px' }}>
          <HBar data={byProperty} width={720} rowH={30} accentRule={d=>d.flag} format={fmt}/>
          <div style={{ marginTop: 12, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.06em' }}>
            REGRETTABLE TURNOVER COST BY PROPERTY · APR 2026 YTD · SORTED BY VALUE
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Footer / provenance --------------------------------------------

function DashProvenance() {
  return (
    <div style={{ background:'#fff', borderTop:'1px solid var(--rule)', padding:'26px 32px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap: 24, fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.06em' }}>
      <div><div style={{ color:'var(--ink)' }}>SOURCES</div><div style={{ marginTop: 6, lineHeight: 1.7 }}>PAYROLL · OPS ROSTER<br/>EXIT INTERVIEWS · PULSE SURVEY<br/>PMS OCCUPANCY · FINANCE GL</div></div>
      <div><div style={{ color:'var(--ink)' }}>REFRESH</div><div style={{ marginTop: 6, lineHeight: 1.7 }}>MONTHLY · LAST RUN<br/>30 APR 2026 · 06H12<br/>NEXT RUN 31 MAY 2026</div></div>
      <div><div style={{ color:'var(--ink)' }}>AUDIENCE</div><div style={{ marginTop: 6, lineHeight: 1.7 }}>EXCO · FINANCE · HR<br/>VIEW SHARED, NOT SPLIT<br/>BOARD PACK: QUARTERLY</div></div>
      <div><div style={{ color:'var(--ink)' }}>METHOD NOTE</div><div style={{ marginTop: 6, lineHeight: 1.7 }}>FIGURES IN RANDS<br/>PERCENTAGES TO ONE DECIMAL<br/>HEADCOUNT AS INTEGERS</div></div>
    </div>
  );
}

// ---------- Whole dashboard -------------------------------------------------

function Dashboard({ view: propView }) {
  const [view, setView] = React.useState(propView || 'cfo');
  React.useEffect(() => { if (propView) setView(propView); }, [propView]);
  return (
    <div style={{ background:'#f3f1ec', fontFamily:'Inter,sans-serif', color:'var(--ink)' }}>
      <DashHeader view={view} onToggle={setView}/>
      <DashFraming view={view}/>
      <MetricGrid view={view}/>
      <DeepDive view={view}/>
      <DashProvenance/>
    </div>
  );
}

// ---------- Mobile ----------------------------------------------------------

function MobileDashboard() {
  const [view, setView] = React.useState('cfo');
  return (
    <div style={{ width: '100%', maxWidth: 390, background:'#f3f1ec', fontFamily:'Inter,sans-serif', color:'var(--ink)' }}>
      <div style={{ padding:'14px 18px', background:'#fff', borderBottom:'1px solid var(--rule)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Wordmark size={11}/>
        <Icon name="menu" size={18} color="var(--ink)"/>
      </div>
      <div style={{ padding:'22px 18px 18px', background:'#fff' }}>
        <Eyebrow>Industry focus · hospitality</Eyebrow>
        <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2, letterSpacing:'-0.02em', marginTop: 10 }}>
          ABC Lodge (Pty) Ltd: workforce view, April 2026.
        </div>
        <div style={{ fontSize: 13.5, color:'var(--graphite)', marginTop: 12, lineHeight: 1.5 }}>
          Labour cost crossed 48% at two properties. Eight regrettable exits cost <span style={{ color:'var(--orange)', fontWeight:600 }}>R 680k</span>. Retention and roster actions triggered.
        </div>
        <div style={{ display:'inline-flex', border:'1px solid var(--ink)', marginTop: 20 }}>
          <button onClick={()=>setView('cfo')} style={{ padding:'7px 14px', background: view==='cfo'?'var(--ink)':'#fff', color: view==='cfo'?'#fff':'var(--ink)', border:'none', fontSize: 12, fontWeight:500 }}>CFO</button>
          <button onClick={()=>setView('hr')} style={{ padding:'7px 14px', background: view==='hr'?'var(--ink)':'#fff', color: view==='hr'?'#fff':'var(--ink)', border:'none', borderLeft:'1px solid var(--ink)', fontSize: 12, fontWeight:500 }}>HR</button>
        </div>
      </div>
      <div style={{ padding:'18px', background:'var(--mist)', display:'flex', flexDirection:'column', gap: 12 }}>
        <MobTile n="01" name="Labour cost % of revenue" value="44.8%" sub="vs 41.5% plan" cap="Labour cost crossed 42% at two properties. Roster review triggered."/>
        <MobTile n="02" name="Total cost of workforce" value="R 31.4m" sub="YTD · 39% of revenue" cap="Tracking R 2.4m above plan YTD."/>
        <MobTile n="03" accent name="Regrettable turnover cost" value="R 680k" sub="8 of 14 exits regrettable" cap="Retention programme for 20 critical roles nets R 240k in year one.">
          <RegrettableSplit/>
        </MobTile>
        <MobTile n="04" name="Time to fill, costed" value="41 days" sub="R 186k per critical vacancy" cap="Two lodge manager seats open 41 and 46 days."/>
        <MobTile n="05" name="Overtime dependency" value="17.2%" sub="threshold 15.0%" cap="Three properties over threshold. Structural review indicated.">
          <RatioGauge pct={17.2} threshold={15} width={320}/>
        </MobTile>
        <MobTile n="06" name="Revenue per FTE" value="R 286k" sub="down 4.1%" cap="Productivity softening as rosters lag occupancy."/>
        <MobTile n="07" name="Engagement × absenteeism" value="6.4 / 4.8%" sub="F&B engagement −15 pts" cap="Leading indicator for turnover. Intervene now.">
          <EngagementBars/>
        </MobTile>
      </div>
      <div style={{ padding:'24px 18px', background:'#fff' }}>
        <Eyebrow>Deep dive · 01</Eyebrow>
        <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, letterSpacing:'-0.02em', marginTop: 10 }}>
          Eight regrettable exits cost <span style={{ color:'var(--orange)' }}>R 680k</span>. Two properties carry 74%.
        </div>
        <div style={{ marginTop: 16, background:'var(--mist)', padding:'18px 14px' }}>
          <HBar
            data={[
              { label:'Head chef, Kruger', value: 182000, reg:true },
              { label:'F&B manager, Letaba', value: 146000, reg:true },
              { label:'F&B manager, Pafuri', value: 122000, reg:true },
              { label:'Senior housekeeper', value: 68000, reg:true },
              { label:'Sommelier', value: 44000, reg:true },
              { label:'Seasonal × 5', value: 60000, reg:false },
            ]}
            width={340} rowH={24} accentRule={d=>d.reg} format={v=>'R '+(v/1000).toFixed(0)+'k'}
          />
        </div>
        <div style={{ marginTop: 18, background:'var(--ink)', color:'#fff', padding:'18px 16px' }}>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10, color:'#a6a6d4', letterSpacing:'.1em' }}>WHAT THIS CHANGES</div>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 10, lineHeight: 1.35 }}>
            Retention programme for the 20 critical roles nets R 240k in year one, before the guest impact.
          </div>
        </div>
      </div>
    </div>
  );
}

function MobTile({ n, name, value, sub, cap, children, accent = false }) {
  return (
    <div style={{ background:'#fff', padding:'16px 16px 14px', border: accent ? '1px solid var(--orange)' : '1px solid var(--rule)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10, color: accent ? 'var(--orange)' : 'var(--slate)', letterSpacing:'.1em' }}>{n}</span>
        <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10, color:'var(--slate)' }}>{sub}</span>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 500, color:'var(--graphite)', marginTop: 8 }}>{name}</div>
      <div style={{ fontSize: 30, fontWeight: 600, color: accent ? 'var(--orange)' : 'var(--ink)', letterSpacing:'-0.02em', marginTop: 6, lineHeight: 1 }}>{value}</div>
      {children && <div style={{ marginTop: 14 }}>{children}</div>}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop:'1px solid var(--rule)', fontSize: 12, color:'var(--graphite)', lineHeight: 1.45 }}>{cap}</div>
    </div>
  );
}

// ---------- Design notes card ----------------------------------------------

function DashboardDesignNotes() {
  return (
    <div style={{ background:'#fff', padding:'56px 48px', fontFamily:'Inter,sans-serif', color:'var(--ink)' }}>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap: 48 }}>
        <div>
          <Eyebrow>Design notes</Eyebrow>
          <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', marginTop: 10, letterSpacing:'.06em', lineHeight: 1.7 }}>
            KAYA RIDGE DEMO<br/>
            HOSPITALITY VERTICAL<br/>
            v1.0 · APR 2026
          </div>
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing:'-0.02em', lineHeight: 1.2, maxWidth: 820 }}>
            Where the orange lives, and how the opener resolves.
          </div>

          <div style={{ marginTop: 32, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 40, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--orange)', letterSpacing:'.1em' }}>● THIS MONTH'S HERO INSIGHT</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10, letterSpacing:'-0.01em' }}>Tile 03 · Regrettable turnover cost.</div>
              <p style={{ fontSize: 14, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                Orange accent on the tile, orange marks in the deep dive. One insight, two scales. Chosen because it is the sharpest signal this period and it maps to a decision the exec can make inside the planning cycle.
              </p>
            </div>
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>ROTATION RULE</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10, letterSpacing:'-0.01em' }}>One tile, one deep dive, one period.</div>
              <p style={{ fontSize: 14, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                Exactly one metric tile wears the Burnt Orange accent at any time, matched to the deep dive shown below the grid. When the period's signal changes, the accent moves. The other tiles stay in Deep Ink and Graphite. Never two orange tiles on the same view.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 28, borderTop:'1px solid var(--rule)', paddingTop: 28 }}>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>OPENER · DECISION</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10, letterSpacing:'-0.01em' }}>Option B. Dashboard lands in Clarity.</div>
            <p style={{ fontSize: 14, color:'var(--graphite)', marginTop: 10, lineHeight: 1.6, maxWidth: 820 }}>
              The homepage already carries the noise-to-clarity narrative in the hero. Repeating the sequence on the industry focus page would turn it into a brand device rather than a read on the business. Tools do not animate themselves into existence. The dashboard's first render holds the orange insight without needing motion to earn its weight. Subtle fade-in on metric tiles is fine. No staged sequences.
            </p>
          </div>

          <div style={{ marginTop: 28, borderTop:'1px solid var(--rule)', paddingTop: 28, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 28 }}>
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>GRID AS TEMPLATE</div>
              <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                7 tiles + 1 deep-dive hook = 8 cells. Generalises to other verticals. Tile order is insight-weighted, not alphabetical.
              </p>
            </div>
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>WHY SEVEN, NOT SIX</div>
              <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                Added engagement × absenteeism as the only leading indicator on the page. Without it, the story is all lagging cost.
              </p>
            </div>
            <div>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'var(--slate)', letterSpacing:'.1em' }}>ACCESSIBILITY</div>
              <p style={{ fontSize: 13, color:'var(--graphite)', marginTop: 10, lineHeight: 1.55 }}>
                Burnt Orange never carries meaning alone. Every orange mark pairs with a value and a label in Deep Ink or Graphite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard, MobileDashboard, DashboardDesignNotes };
