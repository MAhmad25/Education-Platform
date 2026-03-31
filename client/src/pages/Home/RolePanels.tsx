// RolePanels.tsx — student (light) vs instructor (dark) side-by-side
import { useState, useEffect, type ReactNode } from 'react';
import Button from './Button';
import RevealOnScroll from './RevealOnScroll';
import { STUDENT_FEATURES, INSTRUCTOR_FEATURES, type Feature } from './homeData';

interface PanelProps {
  dark: boolean;
  mobile: boolean;
  role: string;
  headline: ReactNode;
  features: Feature[];
  cta: string;
  ctaHref: string;
}

export default function RolePanels() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  return (
    <section
      className="border-b-2 border-ink"
      style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}
      id="teach"
    >
      <Panel
        dark={false} mobile={mobile} role="For Students"
        headline={<>Your shortcut to <em className="italic text-red">actually good</em> skills.</>}
        features={STUDENT_FEATURES} cta="Start Learning →" ctaHref="#courses"
      />
      <Panel
        dark={true} mobile={mobile} role="For Instructors"
        headline={<>Turn your knowledge into <em className="italic text-red">income.</em></>}
        features={INSTRUCTOR_FEATURES} cta="Start Teaching →" ctaHref="#"
      />
    </section>
  );
}

function Panel({ dark, mobile, role, headline, features, cta, ctaHref }: PanelProps) {
  return (
    <div
      className={`p-[5vw] ${dark ? 'bg-ink' : ''}`}
      style={{
        borderRight:  !dark && !mobile ? '2px solid var(--color-ink)' : 'none',
        borderBottom: !dark && mobile  ? '2px solid var(--color-ink)' : 'none',
      }}
    >
      {/* Role label */}
      <div className="flex items-center gap-2 mb-10">
        <span className={`inline-block w-[7px] h-[7px] rounded-full shrink-0 ${dark ? 'bg-paper' : 'bg-red'}`} />
        <span className={`font-mono text-[11px] uppercase tracking-[0.1em] ${dark ? 'text-paper-60' : 'text-ink-45'}`}>{role}</span>
      </div>

      <RevealOnScroll>
        <h2 className={`font-serif text-[clamp(28px,3.5vw,52px)] leading-[1.05] tracking-[-0.03em] mb-8 ${dark ? 'text-paper' : 'text-ink'}`}>
          {headline}
        </h2>
      </RevealOnScroll>

      <ul className="list-none mb-10">
        {features.map((f, i) => (
          <li
            key={i}
            className={`flex items-start gap-4 py-4 text-[14px] leading-[1.55] border-b ${dark ? 'text-paper-60 border-paper-12' : 'text-ink-60 border-ink-10'}`}
          >
            <span className="font-mono text-[11px] text-red shrink-0 pt-0.5">→</span>
            <span>
              <strong className={`font-semibold ${dark ? 'text-paper' : 'text-ink'}`}>{f.text}</strong>{' '}{f.detail}
            </span>
          </li>
        ))}
      </ul>

      <Button href={ctaHref} variant={dark ? 'outline-light' : 'primary'}>{cta}</Button>
    </div>
  );
}
