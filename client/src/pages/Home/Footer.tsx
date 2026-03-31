// Footer.tsx — responsive 4→2→1 col
import { useState, useEffect, type ReactNode } from 'react';
import { FOOTER_LINKS, FOOTER_SOCIALS } from './homeData';

export default function Footer() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const c = () => { const w = window.innerWidth; setCols(w < 640 ? 1 : w < 1024 ? 2 : 4); };
    c(); window.addEventListener('resize', c); return () => window.removeEventListener('resize', c);
  }, []);

  const gridCols = cols === 4 ? '2fr 1fr 1fr 1fr' : cols === 2 ? '1fr 1fr' : '1fr';

  return (
    <footer className="bg-ink text-paper px-[5vw] pt-[4vw] pb-8">
      {/* Top grid */}
      <div
        className="pb-12 border-b border-paper-12 mb-8"
        style={{ display: 'grid', gridTemplateColumns: gridCols, gap: cols === 1 ? '2.5rem' : '3rem' }}
      >
        {/* Brand */}
        <div>
          <p className="font-serif text-[30px] tracking-[-0.02em] mb-4">
            Course<span className="text-red italic">Craft</span>
          </p>
          <p className="text-[13px] leading-[1.65] text-paper-40 max-w-[240px] mb-8">
            The platform for serious learners and expert instructors. Buy once, own forever, build always.
          </p>
          <div className="flex flex-wrap">
            {FOOTER_SOCIALS.map(s => <SocialBtn key={s.label} href={s.href}>{s.label}</SocialBtn>)}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-30 mb-5">{title}</p>
            <ul className="list-none flex flex-col gap-3">
              {(links as Array<{ label: string; href: string }>).map(l => <li key={l.label}><FooterA href={l.href}>{l.label}</FooterA></li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 font-mono text-[10px] text-paper-20 uppercase tracking-[0.08em]">
        <span>© {new Date().getFullYear()} CourseCraft · All rights reserved</span>
        <span>[ Built for learners who ship ]</span>
      </div>
    </footer>
  );
}

interface SocialBtnProps {
  href: string;
  children: ReactNode;
}

function SocialBtn({ href, children }: SocialBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      className={`font-mono text-[10px] uppercase tracking-[0.08em] px-2.5 py-1.5 border -mr-px transition-all duration-150  ${hov ? 'bg-red border-red text-white' : 'bg-transparent border-paper-15 text-paper-40'}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
}

interface FooterAProps {
  href: string;
  children: ReactNode;
}

function FooterA({ href, children }: FooterAProps) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      className={`text-[13px] transition-colors duration-150  ${hov ? 'text-red' : 'text-paper-40'}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
}
