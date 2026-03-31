// Instructors.tsx — 4→2→1 col responsive
import { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import Button from './Button';
import InstructorCard from './InstructorCard';
import RevealOnScroll from './RevealOnScroll';
import { INSTRUCTORS } from './homeData';

export default function Instructors() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const c = () => { const w = window.innerWidth; setCols(w < 640 ? 1 : w < 1024 ? 2 : 4); };
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  return (
    <section className="section" id="instructors">
      <SectionHeader
        tag="Instructors"
        title="Real practitioners. <em style='color:var(--color-red);font-style:italic'>Not theorists.</em>"
        right={<Button href="#" variant="outline">All Instructors →</Button>}
      />
      <div className="border-t-2 border-ink" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {INSTRUCTORS.map((ins, i) => {
          const lastInRow = (i + 1) % cols === 0 || i === INSTRUCTORS.length - 1;
          const inRow2    = i >= cols;
          return (
            <RevealOnScroll key={ins.id} delay={i % 3}>
              <div style={{
                borderRight: lastInRow ? 'none' : '2px solid var(--color-ink)',
                borderTop:   inRow2    ? '2px solid var(--color-ink)' : 'none',
              }}>
                <InstructorCard instructor={ins} />
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
