import React from 'react'
import { SiteFooter } from './shared'
import { HeroSection, AboutSection, AudienceSection, ApproachSection, TeamSection, WorkSection, PulseSection } from './landing-sections'
import { WDRISection } from './landing-wdri'

// Landing page shell — sticky anchor nav with scroll-spy, renders sections in order.

function LandingNav({ active, onGo }) {
  const items = [
    { id:'about',    label:'About' },
    { id:'approach', label:'How we work' },
    { id:'team',     label:'Team' },
    { id:'work',     label:'Work in action' },
    { id:'pulse',    label:'Pulse Check' },
  ];
  const [hover, setHover] = React.useState(null);
  const [ctaHover, setCtaHover] = React.useState(false);
  return (
    <div style={{
      position:'sticky', top: 0, zIndex: 50,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'14px 40px',
      background:'rgba(255,255,255,0.92)',
      backdropFilter:'saturate(140%) blur(10px)',
      WebkitBackdropFilter:'saturate(140%) blur(10px)',
      borderBottom:'1px solid var(--rule)',
      fontFamily:'Inter,sans-serif',
    }}>
      <span onClick={() => onGo('top')} style={{ cursor:'pointer', display:'inline-flex', alignItems:'center' }}>
        <img
          src="/brand/logo-primary-white-bg.png"
          alt="The HR Insights Co."
          style={{ height: 28, width:'auto', display:'block' }}
        />
      </span>
      <div style={{ display:'flex', alignItems:'center', gap: 26, fontSize: 12.5, fontWeight: 500 }}>
        {items.map(it => {
          const isActive = active === it.id;
          const isHover = hover === it.id;
          return (
            <span
              key={it.id}
              onClick={() => onGo(it.id)}
              onMouseEnter={() => setHover(it.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                position:'relative', cursor:'pointer',
                color: isActive ? 'var(--ink)' : (isHover ? 'var(--ink)' : 'var(--graphite)'),
                transition:'color 140ms ease',
                padding:'18px 0',
              }}
            >
              {it.label}
              <span style={{
                position:'absolute', left:0, right:0, bottom: 6, height: 1,
                background: isActive ? 'var(--ink)' : 'transparent',
                transition:'background 140ms ease',
              }}/>
            </span>
          );
        })}
        <span
          onClick={() => onGo('pulse')}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            display:'inline-flex', alignItems:'center', gap: 8,
            padding:'9px 14px',
            border:'1px solid var(--ink)',
            fontSize: 12.5, fontWeight: 500,
            cursor:'pointer',
            background: ctaHover ? 'var(--ink)' : 'transparent',
            color: ctaHover ? '#fff' : 'var(--ink)',
            transition:'background 160ms ease, color 160ms ease',
            marginLeft: 8,
          }}
        >
          <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>
          Book a Pulse Check
        </span>
      </div>
    </div>
  );
}

function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const handler = () => {
      // Find the section whose top is closest to (but not below) a line 120px from top
      const line = 140;
      let best = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - line <= 0) best = id;
      }
      setActive(best);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [ids.join(',')]);
  return active;
}

function Landing() {
  const ids = ['top','about','approach','team','work','clients','pulse'];
  const active = useScrollSpy(ids);
  const onGo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  return (
    <div>
      <LandingNav active={active} onGo={onGo}/>
      <HeroSection id="top"/>
      <AboutSection id="about"/>
      <AudienceSection id="audience"/>
      <ApproachSection id="approach"/>
      <TeamSection id="team"/>
      <WorkSection id="work"/>
      <WDRISection id="readiness"/>
      <PulseSection id="pulse"/>
      <SiteFooter/>
    </div>
  );
}

export default Landing;
