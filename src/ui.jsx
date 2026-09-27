import React from 'react'
import { Circles, Icon, useIsMobile } from './shared'

// Shared page building blocks, used by every page so the design stays consistent.

export const pad = (isMobile) => (isMobile ? '56px 20px' : '96px 48px');

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
}

// A bigger, more prominent section label for the left 220px rail.
export function SectionLabel({ index, children, dark }) {
  const dim = dark ? '#C9C2B6' : 'var(--slate)';
  const ink = dark ? '#fff' : 'var(--ink)';
  return (
    <div>
      <div style={{ position:'relative', height: 1, background: dark ? '#ffffff26' : 'var(--rule)', marginBottom: 20 }}>
        <span style={{ position:'absolute', left: 0, top: -1, width: 32, height: 3, background:'var(--orange)' }}/>
      </div>
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

export function BtnOrange({ children, onClick, type = 'button', disabled, full }) {
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

export function BtnOutlineLight({ children, onClick }) {
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

// Section heading row: label | title | lede.
export function SectionHead({ index, title, lede, dark, last }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr 1fr', gap: isMobile ? 16 : 40, marginBottom: last ? 0 : (isMobile ? 32 : 56), alignItems:'end' }}>
      <SectionLabel index={index} dark={dark}/>
      <h2 style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.08, fontWeight: 600, letterSpacing:'-0.028em', margin: 0, maxWidth: 560 }}>{title}</h2>
      {lede && <p style={{ fontSize: isMobile ? 15.5 : 17, lineHeight: 1.6, color: dark ? 'var(--ink-soft)' : 'var(--graphite)', margin: 0, maxWidth: 520 }}>{lede}</p>}
    </div>
  );
}

// Photo hero: full-bleed photo, navy fading in from the bottom, orange circles.
export function PhotoHero({ id = 'top', photo, position, eyebrow, title, lede, primary, secondary, facts }) {
  const isMobile = useIsMobile();
  const pos = position || { mobile:'60% 40%', desktop:'center 45%' };
  return (
    <section id={id} style={{ background:'var(--ink)', color:'#fff', padding: isMobile ? '72px 20px 64px' : '120px 48px 96px', minHeight: isMobile ? 0 : 640, position:'relative', overflow:'hidden', display:'flex', alignItems:'flex-end' }}>
      <div aria-hidden="true" style={{ position:'absolute', inset: 0, backgroundImage:`url(${photo})`, backgroundSize:'cover', backgroundPosition: isMobile ? pos.mobile : pos.desktop, filter:'saturate(0.5) brightness(0.92)' }}/>
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
          <span style={{ width: 7, height: 7, borderRadius:'50%', background:'var(--orange)' }}/>{eyebrow}
        </div>
        <h1 style={{ fontSize: isMobile ? 38 : 72, lineHeight: 1.02, fontWeight: 700, letterSpacing:'-0.035em', margin: isMobile ? '18px 0 0' : '22px 0 0', textShadow:'0 2px 18px rgba(0,0,0,0.45)' }}>
          {title}
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color:'#fff', fontWeight: 500, margin: isMobile ? '22px 0 30px' : '28px 0 36px', maxWidth: 580 }}>
          {lede}
        </p>
        <div style={{ display:'flex', gap: 12, flexWrap:'wrap' }}>
          {primary && <BtnOrange onClick={() => scrollToId(primary.target)}>{primary.label} <Icon name="arrowSm" size={14} color="#fff"/></BtnOrange>}
          {secondary && <BtnOutlineLight onClick={() => scrollToId(secondary.target)}>{secondary.label}</BtnOutlineLight>}
        </div>
        {facts && facts.length > 0 && (
          <div style={{ display:'flex', gap: isMobile ? 14 : 26, flexWrap:'wrap', marginTop: isMobile ? 32 : 40, fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.08em', color:'#EFEBE4' }}>
            {facts.map(f => (
              <span key={f} style={{ display:'inline-flex', alignItems:'center', gap: 8 }}><Icon name="check" size={13} color="var(--orange)" stroke={2.2}/>{f}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Closing call-to-action section: navy that fades in from the off-white section above, with orange circles.
export function FadeSection({ id, children, from = '246,243,238' }) {
  const isMobile = useIsMobile();
  const c = (a) => `rgba(${from},${a})`;
  return (
    <section id={id} style={{ background: isMobile ? `linear-gradient(180deg, ${c(1)} 0px, ${c(0.7)} 40px, ${c(0.28)} 85px, ${c(0)} 130px), #060644` : `linear-gradient(180deg, ${c(1)} 0px, ${c(0.72)} 45px, ${c(0.32)} 105px, ${c(0.08)} 155px, ${c(0)} 190px), #060644`, color:'#fff', padding: isMobile ? '140px 20px 72px' : '200px 48px 120px', position:'relative', overflow:'hidden' }}>
      <Circles items={isMobile ? [
        { size: 90, right: -45, top: 130, coral: true },
        { size: 140, left: -70, bottom: -70, coral: true },
      ] : [
        { size: 220, right: -110, top: 230, coral: true },
        { size: 260, left: -120, bottom: -150, coral: true },
        { size: 170, left: '34%', bottom: -60 },
      ]}/>
      <div style={{ position:'relative' }}>{children}</div>
    </section>
  );
}

// Form fields
export const labelStyle = { fontFamily:'JetBrains Mono,monospace', fontSize: 10.5, color:'var(--slate)', letterSpacing:'.08em' };
export const inputStyle = { border:'none', borderBottom:'1px solid var(--warm-grey)', padding:'11px 0', fontSize: 15, fontFamily:'Inter,sans-serif', color:'var(--ink)', background:'transparent', borderRadius: 0, width:'100%' };

export function Field({ label, children }) {
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6, minWidth: 0 }}>
      <span style={labelStyle}>{label.toUpperCase()}</span>
      {children}
    </label>
  );
}
