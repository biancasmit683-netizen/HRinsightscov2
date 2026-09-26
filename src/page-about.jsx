import React from 'react'
import { SiteHeader, SiteFooter, Circles, ArrowLink, useIsMobile } from './shared'
import { SectionLabel, TeamSection } from './landing-sections'

// About us — who we are and the three founders.

function AboutIntro() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:'var(--ink)', color:'#fff', padding: isMobile ? '56px 20px 64px' : '96px 48px 104px', position:'relative', overflow:'hidden' }}>
      <Circles items={[{ size: 300, right: -100, bottom: -140, coral: true, opacity: 0.55 }, { size: 180, right: '32%', top: -90 }]}/>
      <div style={{ position:'relative', display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 20 : 40 }}>
        <SectionLabel index="01 / ABOUT US" dark/>
        <div>
          <h1 style={{ fontSize: isMobile ? 36 : 64, lineHeight: 1.04, fontWeight: 600, letterSpacing:'-0.035em', margin: 0, maxWidth: 900 }}>
            Built for the decision.
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color:'#EFEBE4', margin: isMobile ? '22px 0 0' : '30px 0 0', maxWidth: 680 }}>
            The HR Insights Co. helps South African organisations hear from their whole workforce and turn workforce data into financial decisions. Founded by three women from HR, finance, and data, we connect HR metrics with financial cost, give teams one reliable view of what is happening, and measure ourselves on whether the data changed a decision.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const isMobile = useIsMobile();
  const cards = [
    { href:'/', tag:'ENGAGEMENT SURVEYS', title:'Hear from every employee.', body:'End-to-end engagement surveys for deskless teams, delivered by WhatsApp and QR in your staff\'s languages. One fixed fee.', cta:'Explore engagement surveys' },
    { href:'/hr-analytics', tag:'HR ANALYTICS', title:'Workforce data, financial decisions.', body:'From a Pulse Check on your workforce data to a live dashboard and monthly insights your CFO and HR lead can act on.', cta:'Explore HR analytics' },
  ];
  return (
    <section style={{ background:'var(--paper)', padding: isMobile ? '56px 20px' : '96px 48px', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 20 : 40 }}>
        <SectionLabel index="03 / WHAT WE DO"/>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
          {cards.map((c, i) => (
            <a key={c.href} href={c.href} style={{ display:'block', textDecoration:'none', color:'var(--ink)', background:'#fff', padding: isMobile ? 24 : 32, borderTop: i === 0 ? '3px solid var(--orange)' : '3px solid var(--ink)' }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize: 11.5, letterSpacing:'.1em', color:'var(--orange)' }}>{c.tag}</div>
              <div style={{ fontSize: 24, fontWeight: 600, letterSpacing:'-0.02em', margin:'14px 0 10px' }}>{c.title}</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color:'var(--graphite)', margin:'0 0 22px' }}>{c.body}</p>
              <ArrowLink>{c.cta}</ArrowLink>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  React.useEffect(() => { document.title = 'About us — The HR Insights Co.'; }, []);
  return (
    <div>
      <SiteHeader current="about"/>
      <AboutIntro/>
      <TeamSection id="team" index="02 / FOUNDERS"/>
      <WhatWeDo/>
      <SiteFooter/>
    </div>
  );
}

export default AboutPage;
