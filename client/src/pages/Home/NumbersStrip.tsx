// NumbersStrip.tsx — 4 stat numbers, responsive
import { useState, useEffect } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { NUMBERS } from './homeData';

export default function NumbersStrip() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const c = () => setCols(window.innerWidth < 640 ? 2 : 4);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  return (
    <div className="border-b-2 border-ink" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {NUMBERS.map((n, i) => {
        const lastInRow = (i + 1) % cols === 0 || i === NUMBERS.length - 1;
        const inRow2    = i >= cols;
        return (
          <RevealOnScroll key={n.index} delay={i % 3}>
            <div
              className="px-10 py-14 relative"
              style={{
                borderRight: lastInRow ? 'none' : '2px solid var(--color-ink)',
                borderTop:   inRow2    ? '2px solid var(--color-ink)' : 'none',
              }}
            >
              <span className="font-serif text-[90px] text-ink-05 absolute top-4 right-6 leading-none pointer-events-none select-none">{n.index}</span>
              <p className="font-serif text-[clamp(40px,4vw,62px)] tracking-[-0.03em] leading-none mb-2">
                {n.value}<span className="text-red">{n.suffix}</span>
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-45 max-w-[160px] leading-[1.4]">{n.label}</p>
            </div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
