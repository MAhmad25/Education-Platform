// CTABanner.tsx — final dark call-to-action
import { useState, useEffect } from 'react';
import Button from './Button';
import RevealOnScroll from './RevealOnScroll';

export default function CTABanner() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  return (
    <section
      className="bg-ink border-t-2 border-b-2 border-ink px-[5vw] py-[6vw]"
      style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr auto', alignItems: 'center', gap: mobile ? '2rem' : '4rem' }}
    >
      <RevealOnScroll>
        <h2 className="font-serif text-[clamp(32px,4.5vw,70px)] leading-[1.05] tracking-[-0.03em] text-paper">
          The best time to learn was yesterday.<br />
          <em className="italic text-red">The second best is now.</em>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={1} className={`flex flex-col gap-4 shrink-0 ${mobile ? 'items-start' : 'items-end'}`}>
        <Button href="#" variant="outline-light" style={{ padding: '18px 32px', fontSize: '13px' }}>
          Get Started Free →
        </Button>
        <p className="font-mono text-[10px] text-paper-30 uppercase tracking-[0.08em]">
          No credit card · Free trial included
        </p>
      </RevealOnScroll>
    </section>
  );
}
