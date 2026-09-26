import React from 'react'
import { SiteHeader, SiteFooter, ArrowLink, useIsMobile } from './shared'
import { HeroSection, AboutSection, AudienceSection, ApproachSection, WorkSection, PulseSection } from './landing-sections'
import { WDRISection } from './landing-wdri'

// HR Analytics page — renders the analytics sections in order under the site header.

function FoundersLink() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background:'#fff', padding: isMobile ? '40px 20px' : '56px 48px', borderTop:'1px solid var(--rule)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap: 24, flexWrap:'wrap' }}>
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 600, letterSpacing:'-0.02em', maxWidth: 640 }}>
          Three founders. HR, finance, and data, at the same table.
        </div>
        <a href="/about" style={{ textDecoration:'none' }}><ArrowLink>Meet the founders</ArrowLink></a>
      </div>
    </section>
  );
}

function Landing() {
  React.useEffect(() => { document.title = 'HR Analytics — The HR Insights Co.'; }, []);
  return (
    <div>
      <SiteHeader current="hr-analytics" ctaLabel="Book a Pulse Check" ctaHref="#pulse"/>
      <HeroSection id="top"/>
      <AboutSection id="about"/>
      <AudienceSection id="audience"/>
      <ApproachSection id="approach"/>
      <FoundersLink/>
      <WorkSection id="work"/>
      <WDRISection id="readiness"/>
      <PulseSection id="pulse"/>
      <SiteFooter ctaLabel="Book a Pulse Check" ctaTarget="pulse"/>
    </div>
  );
}

export default Landing;
