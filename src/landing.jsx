import React from 'react'
import { SiteHeader, SiteFooter } from './shared'
import { PhotoHero } from './ui'
import { AboutSection, AudienceSection, ApproachSection, PulseSection } from './landing-sections'
import { WDRISection } from './landing-wdri'

// HR Analytics page — renders the analytics sections in order under the site header.

function Landing() {
  React.useEffect(() => { document.title = 'HR Analytics — The HR Insights Co.'; }, []);
  return (
    <div>
      <SiteHeader current="hr-analytics" ctaLabel="Book a Pulse Check" ctaHref="#pulse"/>
      <PhotoHero
        photo="/brand/hero-photo.jpg"
        eyebrow="HR ANALYTICS"
        title={<>Workforce data,<br/>financial decisions.</>}
        lede="We help mid-sized South African organisations turn fragmented workforce data into financial decisions. HR leads people. Finance leads money. We connect the two into decisions the business can act on."
        primary={{ label:'Book a Pulse Check', target:'pulse' }}
        secondary={{ label:'See how we work', target:'approach' }}
        facts={['PEOPLE COST','ATTRITION','WORKFORCE PLANNING','HR + FINANCE']}
      />
      <AboutSection id="about"/>
      <AudienceSection id="audience"/>
      <ApproachSection id="approach"/>
      <WDRISection id="readiness"/>
      <PulseSection id="pulse"/>
      <SiteFooter showCta={false}/>
    </div>
  );
}

export default Landing;
