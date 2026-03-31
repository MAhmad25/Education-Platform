// Navbar.tsx
// Desktop: left links | center logo | right links + CTA  (all visible)
// Mobile <768px: logo left + hamburger right → animated slide-down drawer

import { useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

interface NavLinkProps {
  to: string;
  hash?: string;
  children: ReactNode;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { if (!mobile) setOpen(false); }, [mobile]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const allLinks = [
    { label: 'Courses', href: '/courses' },
    { label: 'How it works', href: '/#how' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Teach', href: '/#teach' },
  ];

  return (
    <>
      {/* ── Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[54px] border-b border-ink-15 bg-paper/90 backdrop-blur-[14px]">

        {/* Desktop left */}
        {!mobile && (
          <div className="flex items-center h-full">
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/" hash="how">How it works</NavLink>
            <NavLink to="/" hash="pricing">Pricing</NavLink>
          </div>
        )}

        {/* Logo — absolute center on desktop, normal flow on mobile */}
        <Link
          to="/"
          className={`font-serif text-[22px] tracking-[-0.02em] text-ink ${mobile ? 'ml-6' : 'absolute left-1/2 -translate-x-1/2'}`}
        >
          Course<span className="text-red italic">Craft</span>
        </Link>

        {/* Desktop right */}
        {!mobile && (
          <div className="flex items-center h-full">
            <NavLink to="/" hash="teach">Teach</NavLink>
            <NavLink to="/login">Sign in</NavLink>
            <Link to="/signup">
              <Button variant="primary" style={{ height: '54px', borderRadius: 0 }}>
                Get started →
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile burger */}
        {mobile && (
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center h-[54px] px-6 bg-transparent border-none  text-ink shrink-0"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                <line x1="0" y1="1"  x2="22" y2="1"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="8"  x2="22" y2="8"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        )}
      </nav>

      {/* ── Mobile drawer ── */}
      {mobile && (
        <div
          className="fixed top-[54px] left-0 right-0 z-[99] bg-paper border-b-2 border-ink shadow-[0_8px_40px_rgba(15,13,11,0.12)] transition-all duration-350"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-110%)',
            opacity:   open ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)',
          }}
        >
          <ul className="list-none p-0">
            {allLinks.map(l => (
              <li key={l.label} className="border-b border-ink-15">
                <Link
                  to={l.href}
                  className="flex items-center gap-4 px-6 py-5 font-mono text-[13px] uppercase tracking-[0.08em] text-ink"
                >
                  <span className="text-red font-mono text-[12px]">→</span>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-ink-15">
              <Link
                to="/login"
                className="flex items-center gap-4 px-6 py-5 font-mono text-[13px] uppercase tracking-[0.08em] text-ink"
              >
                <span className="text-red font-mono text-[12px]">→</span>
                Sign in
              </Link>
            </li>
          </ul>
          <div className="p-6">
            <Link to="/signup">
              <Button variant="primary" className="w-full justify-center" style={{ padding: '16px' }}>
                Get started →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ to, hash, children }: NavLinkProps) {
  const [hov, setHov] = useState(false);
  const href = hash ? `${to}#${hash}` : to;
  
  return (
    <Link
      to={href}
      className={`font-mono text-[11px] uppercase tracking-[0.1em] px-[1.4rem] h-[54px] flex items-center border-r border-ink-15 transition-colors duration-150  whitespace-nowrap ${hov ? 'bg-ink text-paper' : 'bg-transparent text-ink'}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </Link>
  );
}
