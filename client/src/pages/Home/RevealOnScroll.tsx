// RevealOnScroll.tsx
// Wraps children in a fade-up reveal on scroll.
// instant=true → skip animation (above the fold)

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  instant?: boolean;
  className?: string;
  id?: string;
}

export default function RevealOnScroll({ children, delay = 0, instant = false, className = '', id }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (instant) { el.classList.add('is-visible'); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [instant]);

  return (
    <div ref={ref} id={id} className={`reveal${delay ? ` reveal--delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  );
}
