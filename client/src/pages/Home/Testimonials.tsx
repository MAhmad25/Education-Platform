// Testimonials.tsx — 3→2→1 col responsive
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import TestimonialCard from './TestimonialCard';
import RevealOnScroll from './RevealOnScroll';
import { TESTIMONIALS } from './homeData';

export default function Testimonials() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const c = () => { const w = window.innerWidth; setCols(w < 640 ? 1 : w < 1024 ? 2 : 3); };
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  const shown = TESTIMONIALS.slice(0, cols === 1 ? 4 : cols === 2 ? 4 : 6);

  return (
    <section className="section">
      <SectionHeader
        tag="Student Reviews"
        title="Words from people who <em style='color:var(--color-red);font-style:italic'>actually built things.</em>"
      />
      <div className="border-t-2 border-ink" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {shown.map((t, i) => {
          const lastInRow = (i + 1) % cols === 0 || i === shown.length - 1;
          const inRow2    = i >= cols;
          return (
            <RevealOnScroll key={t.id} delay={i % 3}>
              <div style={{
                borderRight: lastInRow ? 'none' : '2px solid var(--color-ink)',
                borderTop:   inRow2    ? '2px solid var(--color-ink)' : 'none',
              }}>
                <TestimonialCard testimonial={t} />
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
