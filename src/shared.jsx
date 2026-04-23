import React from 'react'

// Shared primitives for the Direction B site

const BRAND = {
  ink: '#060644',
  graphite: '#545454',
  slate: '#6B7280',
  mist: '#E5E7EB',
  white: '#FFFFFF',
  orange: '#C2410C',
  rule: '#0606441a',
  hair: '#06064410',
};

function useIsMobile() {
  const [m, setM] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  React.useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

// Wordmark — "The HR insights Co." with the orange-dot i
function Wordmark({ size = 16, onInk = false }) {
  const dim = onInk ? '#a6a6d4' : 'var(--slate)';
  const ink = onInk ? '#fff' : 'var(--ink)';
  return (
    <span style={{ display:'inline-flex', alignItems:'baseline', fontFamily:'Inter,sans-serif', fontWeight:600, fontSize: size, letterSpacing:'-0.01em', lineHeight:1, color: ink }}>
      <span style={{ color: dim, fontWeight:500, marginRight: size*0.32 }}>The</span>
      <span style={{ marginRight: size*0.25 }}>HR</span>
      <span style={{ position:'relative', paddingRight: 2 }}>
        <span>insights</span>
        <span style={{ position:'absolute', width: size*0.22, height: size*0.22, background:'var(--orange)', borderRadius:'50%', top: -size*0.12, left: size*0.52 }}/>
      </span>
      <span style={{ color: dim, fontWeight:500, marginLeft: size*0.32 }}>Co.</span>
    </span>
  );
}

function Icon({ name, size = 20, stroke = 1.5, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const m = {
    arrow: <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
    arrowSm: <svg {...p}><path d="M5 12h14M13 7l5 5-5 5"/></svg>,
    down: <svg {...p}><path d="M6 9l6 6 6-6"/></svg>,
    plus: <svg {...p}><path d="M12 5v14M5 12h14"/></svg>,
    menu: <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
    close: <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
    search: <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
    chart: <svg {...p}><path d="M4 20V6M4 20h16M8 16v-4M12 16V9M16 16v-7"/></svg>,
    pulse: <svg {...p}><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>,
    build: <svg {...p}><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="16" height="7"/></svg>,
    calendar: <svg {...p}><rect x="4" y="5" width="16" height="16" rx="1"/><path d="M4 9h16M8 3v4M16 3v4"/></svg>,
    check: <svg {...p}><path d="M5 12l4 4 10-10"/></svg>,
    mail: <svg {...p}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></svg>,
    linkedin: <svg {...p}><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 014 0v4"/></svg>,
  };
  return m[name] || null;
}

// Photo placeholder: striped panel with mono caption describing intended shot
function Photo({ h = 240, cap = 'SA office · natural light', dark = false, style = {}, children }) {
  return (
    <div style={{
      position:'relative',
      background: 'repeating-linear-gradient(135deg,#d9d6cf 0 2px,#e7e4dd 2px 14px)',
      color:'#3a3a3a',
      overflow:'hidden',
      height: h,
      ...style,
    }}>
      <div style={{ position:'absolute', inset: 0, background: dark ? 'linear-gradient(180deg,rgba(6,6,68,.55),rgba(6,6,68,.82))' : 'linear-gradient(180deg,rgba(6,6,68,0.04),rgba(6,6,68,0.16))' }}/>
      {children}
      <div style={{ position:'absolute', left: 12, bottom: 10, fontFamily:'JetBrains Mono,monospace', fontSize: 10, color:'#2a2a2a', background:'rgba(255,255,255,0.9)', padding:'3px 7px', letterSpacing:'.02em', zIndex:3 }}>{cap}</div>
    </div>
  );
}

// Top nav — used on every page. In prototype mode, window.__nav(route) turns items into links.
function SiteNav({ active = 'Home', dark = false }) {
  const bg = dark ? 'var(--ink)' : '#fff';
  const fg = dark ? '#fff' : 'var(--ink)';
  const border = dark ? '#ffffff14' : 'var(--rule)';
  const items = [
    { label: 'Approach', route: 'home', anchor: 'approach' },
    { label: 'Services', route: 'services' },
    { label: 'Insights', route: 'insights' },
    { label: 'About',    route: 'about' },
    { label: 'Contact',  route: 'contact' },
  ];
  const nav = typeof window !== 'undefined' ? window.__nav : null;
  const [hover, setHover] = React.useState(null);
  const [ctaHover, setCtaHover] = React.useState(false);
  const clickable = !!nav;
  return (
    <div style={{ position: clickable ? 'sticky' : 'static', top: 0, zIndex: 40, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 48px', borderBottom:`1px solid ${border}`, background: bg, color: fg, fontFamily:'Inter,sans-serif' }}>
      <span
        onClick={clickable ? () => nav('home') : undefined}
        style={{ cursor: clickable ? 'pointer' : 'default' }}
      >
        <Wordmark size={16} onInk={dark}/>
      </span>
      <div style={{ display:'flex', gap: 28, fontSize: 13, fontWeight: 500, alignItems:'center' }}>
        {items.map(i => {
          const isActive = i.label === active;
          const isHover = hover === i.label;
          const base = isActive ? (dark ? '#fff' : 'var(--ink)') : (dark ? '#cfcfe6' : 'var(--graphite)');
          const hoverCol = dark ? '#fff' : 'var(--ink)';
          return (
            <span
              key={i.label}
              onClick={clickable ? () => nav(i.route, i.anchor) : undefined}
              onMouseEnter={() => setHover(i.label)}
              onMouseLeave={() => setHover(null)}
              style={{
                color: isHover ? hoverCol : base,
                position:'relative',
                cursor: clickable ? 'pointer' : 'default',
                transition:'color 140ms ease',
              }}
            >
              {i.label}
              {isActive && <span style={{ position:'absolute', left:0, right:0, bottom:-22, height:1, background: dark ? '#fff' : 'var(--ink)' }}/>}
              {!isActive && isHover && <span style={{ position:'absolute', left:0, right:0, bottom:-22, height:1, background: dark ? '#ffffff60' : 'var(--ink)', opacity:.5 }}/>}
            </span>
          );
        })}
        <span
          onClick={clickable ? () => nav('contact') : undefined}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            display:'inline-flex', alignItems:'center', gap: 8, padding:'9px 14px',
            border:`1px solid ${dark?'#ffffff40':'var(--ink)'}`, fontSize:12.5, fontWeight:500,
            cursor: clickable ? 'pointer' : 'default',
            background: ctaHover ? (dark ? '#fff' : 'var(--ink)') : 'transparent',
            color: ctaHover ? (dark ? 'var(--ink)' : '#fff') : 'inherit',
            transition:'background 160ms ease, color 160ms ease',
          }}
        >
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>
          Book a Pulse Check
        </span>
      </div>
    </div>
  );
}

function SiteFooter() {
  const isMobile = useIsMobile();
  const scrollToPulse = () => {
    const el = document.getElementById('pulse');
    if (el) el.scrollIntoView({ behavior:'smooth' });
    else if (window.__nav) window.__nav('home', 'pulse');
  };
  return (
    <div style={{ background:'var(--ink)', color:'#fff', fontFamily:'Inter,sans-serif' }}>
      {/* CTA band */}
      <div style={{ padding: isMobile ? '56px 20px 48px' : '88px 48px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: isMobile ? 28 : 56, alignItems:'center' }}>
          <div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color:'#a6a6d4', letterSpacing:'.12em', marginBottom: 20 }}>
              REPLY IN A DAY
            </div>
            <div style={{ fontSize: isMobile ? 30 : 44, fontWeight: 600, lineHeight: 1.15, letterSpacing:'-0.028em', maxWidth: 960, textWrap:'balance' }}>
              If the numbers do not change a decision, they are not insight. Let us show you where yours can.
            </div>
          </div>
          <div>
            <BtnPrimary dark onClick={scrollToPulse}>
              Book a Pulse Check <Icon name="arrowSm" size={14} color="var(--ink)"/>
            </BtnPrimary>
          </div>
        </div>
      </div>

      {/* Thin legal strip */}
      <div style={{
        padding: isMobile ? '14px 20px' : '18px 48px',
        borderTop:'1px solid #ffffff1a',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        flexWrap:'wrap', gap: 8,
        fontSize: 11, color:'#a6a6d4', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.08em',
      }}>
        <span>© 2026 THE HR INSIGHTS CO. (PTY) LTD</span>
        <span>PAIA · POPIA · TERMS</span>
      </div>
    </div>
  );
}
function FooterCol({ title, items }) {
  const nav = typeof window !== 'undefined' ? window.__nav : null;
  const [hover, setHover] = React.useState(null);
  return (
    <div>
      <div style={{ fontSize: 11, color:'#a6a6d4', fontFamily:'JetBrains Mono,monospace', letterSpacing:'.1em', marginBottom: 14 }}>{title.toUpperCase()}</div>
      <div style={{ display:'flex', flexDirection:'column', gap: 9, fontSize: 13.5, color:'#e5e7ff' }}>
        {items.map((i,idx) => {
          const item = typeof i === 'string' ? { label: i } : i;
          const clickable = nav && item.route;
          const isHover = hover === idx;
          return (
            <span
              key={item.label}
              onClick={clickable ? () => nav(item.route, item.anchor) : undefined}
              onMouseEnter={() => setHover(idx)}
              onMouseLeave={() => setHover(null)}
              style={{
                cursor: clickable ? 'pointer' : 'default',
                color: isHover ? '#fff' : '#e5e7ff',
                transition:'color 140ms ease',
              }}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Tiny UI primitives
function Eyebrow({ children, color }) {
  return <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color: color || 'var(--slate)', letterSpacing:'.1em', textTransform:'uppercase', fontWeight: 500 }}>{children}</div>;
}
function RuleThin({ style }) { return <div style={{ height:1, background:'var(--rule)', ...style }}/>; }
function RuleInk({ style }) { return <div style={{ height:1, background:'var(--ink)', ...style }}/>; }

function BtnPrimary({ children, dark, onClick }) {
  const [h, setH] = React.useState(false);
  const base = dark ? '#fff' : 'var(--ink)';
  const text = dark ? 'var(--ink)' : '#fff';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: base, color: text, border:'none', padding:'13px 20px',
        fontFamily:'Inter', fontWeight:500, fontSize:14, cursor:'pointer', borderRadius:0,
        display:'inline-flex', alignItems:'center', gap:10,
        transform: h ? 'translateY(-1px)' : 'none',
        boxShadow: h ? (dark ? '0 6px 20px rgba(255,255,255,0.15)' : '0 6px 20px rgba(6,6,68,0.22)') : '0 0 0 rgba(0,0,0,0)',
        transition:'transform 160ms ease, box-shadow 200ms ease',
      }}
    >
      {children}
    </button>
  );
}
function BtnGhost({ children, dark, onClick }) {
  const [h, setH] = React.useState(false);
  const c = dark ? '#fff' : 'var(--ink)';
  const hoverBg = dark ? '#ffffff10' : '#0606440a';
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? hoverBg : 'transparent', color: c,
        border:`1px solid ${dark?'#ffffff55':'var(--ink)'}`,
        padding:'13px 20px', fontFamily:'Inter', fontWeight:500, fontSize:14,
        cursor:'pointer', borderRadius:0, display:'inline-flex', alignItems:'center', gap:10,
        transition:'background 160ms ease',
      }}
    >
      {children}
    </button>
  );
}

// Link with underline-on-hover-ish sentence-case affordance
function ArrowLink({ children, dark, color, onClick }) {
  const [h, setH] = React.useState(false);
  const c = color || (dark ? '#fff' : 'var(--ink)');
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display:'inline-flex', alignItems:'center', gap: 8, fontSize: 13.5, fontWeight: 500,
        color: c, borderBottom:`1px solid ${c}`, paddingBottom: 3,
        cursor: onClick ? 'pointer' : 'default',
        transform: h ? 'translateX(2px)' : 'none',
        transition:'transform 160ms ease',
      }}
    >
      {children} <Icon name="arrowSm" size={14} color={c}/>
    </span>
  );
}

// Homepage "Meet the team" strip — compact summary, links to About
function TeamStrip({ dark = false }) {
  const isMobile = useIsMobile();
  const bg = dark ? 'var(--ink)' : '#fff';
  const fg = dark ? '#fff' : 'var(--ink)';
  const sub = dark ? '#cfcfe6' : 'var(--graphite)';
  const rule = dark ? '#ffffff14' : 'var(--rule)';
  const people = [
    { photo:'/brand/founder-bianca.jpg',    name:'Bianca Janse van Vuuren', disc:'Finance, data and AI', accent:true },
    { photo:'/brand/founder-marizanne.jpg', name:'Marizanne Koen',          disc:'Industrial Psychology and Remuneration' },
    { photo:'/brand/founder-liza.jpg',      name:'Liza Burger',             disc:'HR, org design and change' },
  ];
  return (
    <section style={{ padding: isMobile ? '48px 20px' : '72px 48px', background: bg, color: fg, borderTop:`1px solid ${rule}`, borderBottom:`1px solid ${rule}` }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 20 : 40, marginBottom: isMobile ? 28 : 40 }}>
        {!isMobile && <Eyebrow color={dark ? '#a6a6d4' : 'var(--slate)'}>Meet the team</Eyebrow>}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 32, flexWrap:'wrap' }}>
          <div style={{ fontSize: isMobile ? 26 : 32, lineHeight: 1.2, fontWeight: 600, letterSpacing:'-0.02em', maxWidth: 680 }}>
            Three founders. HR, finance, and data, at the same table.
          </div>
          {!isMobile && <ArrowLink dark={dark}>Read the founder profiles</ArrowLink>}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 32 : 28 }}>
        {people.map((p,i) => (
          <div key={i} style={{ display:'flex', flexDirection:'column' }}>
            <div style={{ width:'100%', aspectRatio:'4/5', background:'#E5E7EB', overflow:'hidden', position:'relative' }}>
              <img src={p.photo} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 16 }}>
              {p.accent && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>}
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11, color: p.accent ? 'var(--orange)' : (dark ? '#a6a6d4' : 'var(--slate)'), letterSpacing:'.1em' }}>
                {'0'+(i+1)} / 03
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing:'-0.015em', marginTop: 8 }}>{p.name}</div>
            <div style={{ fontSize: 13.5, color: sub, marginTop: 4, lineHeight: 1.5 }}>{p.disc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { BRAND, Wordmark, Icon, Photo, SiteNav, SiteFooter, Eyebrow, RuleThin, RuleInk, BtnPrimary, BtnGhost, ArrowLink, TeamStrip, useIsMobile };
