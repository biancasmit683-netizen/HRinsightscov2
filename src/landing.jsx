import React from 'react'
import { SiteFooter, BtnPrimary, Icon, useIsMobile } from './shared'
import { HeroSection, AboutSection, AudienceSection, ApproachSection, TeamSection, WorkSection, PulseSection } from './landing-sections'
import { WDRISection } from './landing-wdri'

// Landing page shell — sticky anchor nav with scroll-spy, renders sections in order.

function LandingNav({ active, onGo }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hover, setHover] = React.useState(null);
  const [ctaHover, setCtaHover] = React.useState(false);
  const items = [
    { id:'about',    label:'About' },
    { id:'approach', label:'How we work' },
    { id:'team',     label:'Team' },
    { id:'work',     label:'Work in action' },
    { id:'pulse',    label:'Pulse Check' },
  ];

  const go = (id) => { onGo(id); setMenuOpen(false); };

  const navStyle = {
    position:'sticky', top: 0, zIndex: 50,
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding: isMobile ? '12px 20px' : '14px 40px',
    background:'rgba(255,255,255,0.95)',
    backdropFilter:'saturate(140%) blur(10px)',
    WebkitBackdropFilter:'saturate(140%) blur(10px)',
    borderBottom:'1px solid var(--rule)',
    fontFamily:'Inter,sans-serif',
  };

  return (
    <>
      <div style={navStyle}>
        <span onClick={() => go('top')} style={{ cursor:'pointer', display:'inline-flex', alignItems:'center' }}>
          <img
            src="/brand/logo-primary-white-bg.png"
            alt="The HR Insights Co."
            style={{ height: isMobile ? 24 : 28, width:'auto', display:'block' }}
          />
        </span>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background:'none', border:'none', cursor:'pointer', padding: 6, display:'flex', alignItems:'center' }}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} color="var(--ink)"/>
          </button>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap: 26, fontSize: 12.5, fontWeight: 500 }}>
            {items.map(it => {
              const isActive = active === it.id;
              const isHover = hover === it.id;
              return (
                <span
                  key={it.id}
                  onClick={() => go(it.id)}
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
              onClick={() => go('pulse')}
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
        )}
      </div>

      {/* Mobile full-screen menu */}
      {isMobile && menuOpen && (
        <div style={{
          position:'fixed', top: 49, left: 0, right: 0, bottom: 0,
          background:'rgba(255,255,255,0.98)',
          backdropFilter:'blur(12px)',
          WebkitBackdropFilter:'blur(12px)',
          zIndex: 49,
          display:'flex', flexDirection:'column',
          padding:'12px 0 32px',
          overflowY:'auto',
        }}>
          {items.map(it => (
            <span
              key={it.id}
              onClick={() => go(it.id)}
              style={{
                padding:'18px 24px',
                fontSize: 18, fontWeight: 500,
                color: active === it.id ? 'var(--ink)' : 'var(--graphite)',
                borderBottom:'1px solid var(--rule)',
                cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
              }}
            >
              {it.label}
              {active === it.id && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--orange)' }}/>}
            </span>
          ))}
          <div style={{ padding:'28px 24px 0' }}>
            <BtnPrimary onClick={() => go('pulse')}>
              Book a Pulse Check <Icon name="arrowSm" size={14} color="#fff"/>
            </BtnPrimary>
          </div>
        </div>
      )}
    </>
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
