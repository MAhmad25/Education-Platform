// Pricing.tsx — 3→1 col responsive
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import Tag from './Tag';
import PricingCol from './PricingCol';
import RevealOnScroll from './RevealOnScroll';
import { PRICING_PLANS } from './homeData';

export default function Pricing() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  return (
    <section className="section" id="pricing">
      <SectionHeader
        tag="Pricing"
        title="Own your courses. <em style='color:var(--color-red);font-style:italic'>No subscriptions.</em> Ever."
        right={<Tag>30-day money-back guarantee</Tag>}
      />
      <div className="border-t-2 border-ink" style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)' }}>
        {PRICING_PLANS.map((plan, i) => (
          <RevealOnScroll key={plan.id} delay={mobile ? 0 : i}>
            <div
              className="h-full"
              style={{
                borderRight:  !mobile && i < PRICING_PLANS.length - 1 ? '2px solid var(--color-ink)' : 'none',
                borderBottom: mobile  && i < PRICING_PLANS.length - 1 ? '2px solid var(--color-ink)' : 'none',
              }}
            >
              <PricingCol plan={plan} />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
