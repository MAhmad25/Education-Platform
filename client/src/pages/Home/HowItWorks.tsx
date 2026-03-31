// HowItWorks.tsx — 3-step grid, responsive 3→1 col
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import Button from './Button';
import RevealOnScroll from './RevealOnScroll';
import { HOW_STEPS } from './homeData';

export default function HowItWorks() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  return (
    <section className="section" id="how">
      <SectionHeader
        tag="How it works"
        title="Three steps to <em style='color:var(--color-red);font-style:italic'>actually</em> learning something."
        right={<Button href="#courses" variant="outline">Browse Courses →</Button>}
      />
      <div
        className="border-t-2 border-ink"
        style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)' }}
      >
        {HOW_STEPS.map((step, i) => (
          <RevealOnScroll key={step.id} delay={mobile ? 0 : i}>
            <div
              className="p-10 relative"
              style={{
                borderRight: !mobile && i < HOW_STEPS.length - 1 ? '2px solid var(--color-ink)' : 'none',
                borderBottom: mobile && i < HOW_STEPS.length - 1 ? '2px solid var(--color-ink)' : 'none',
              }}
            >
              {/* Ghost number */}
              <span className="font-serif text-[80px] text-ink-05 leading-none absolute top-6 right-8 pointer-events-none select-none">
                {step.id}
              </span>
              {/* Icon box */}
              <div className="w-12 h-12 border-2 border-ink flex items-center justify-center text-[22px] mb-8">
                {step.icon}
              </div>
              <h3 className="font-serif text-[26px] tracking-[-0.02em] leading-[1.15] mb-4">
                {step.title} <em className="italic text-red">{step.titleItalic}</em>
              </h3>
              <p className="text-[14px] leading-[1.65] text-ink-60 max-w-[280px]">{step.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
