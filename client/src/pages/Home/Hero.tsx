// Hero.tsx — Split: left copy | right 2×2 course grid
// Stacks on mobile

import { useState, useEffect } from "react";
import Button from "./Button";
import Tag from "./Tag";
import RevealOnScroll from "./RevealOnScroll";
import { HERO_CELLS, HERO_STATS } from "./homeData";

interface HeroCellData {
  id: number;
  label: string;
  title: string;
  price: string;
  image: string;
}

export default function Hero() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 900);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  return (
    <section className="pt-[54px] grid border-b-2 border-ink min-h-screen" style={{ gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
      {/* LEFT */}
      <div className="px-[5vw] pt-[6vw] pb-[5vw] flex flex-col justify-between" style={{ borderRight: mobile ? "none" : "2px solid var(--color-ink)", borderBottom: mobile ? "2px solid var(--color-ink)" : "none" }}>
        {/* Top tag */}
        <div className="flex items-center gap-3 mb-[5vw]">
          <span className="inline-block w-2 h-2 bg-red rounded-full shrink-0" />
          <Tag>The platform for serious learners</Tag>
        </div>

        {/* Headline */}
        <RevealOnScroll instant>
          <h1 className="font-serif text-[clamp(44px,6.5vw,96px)] leading-none tracking-[-0.03em]">
            Learn from
            <br />
            <em className="italic text-red">the best.</em>
            <br />
            Build what
            <br />
            matters.
          </h1>
          <p className="mt-6">
            <span className="font-mono text-[clamp(13px,1.5vw,20px)] text-ink-40">// Not another tutorial site</span>
          </p>
        </RevealOnScroll>

        {/* Bottom CTAs */}
        <div className="border-t border-ink-15 pt-8 flex justify-between gap-8 mt-8 flex-wrap" style={{ flexDirection: mobile ? "column" : "row", alignItems: mobile ? "flex-start" : "flex-end" }}>
          <RevealOnScroll instant delay={1}>
            <p className="text-[15px] leading-[1.65] text-ink-60 max-w-[320px]">
              <strong>CourseCraft</strong> connects ambitious students with elite instructors. Buy, watch, and build real projects — or teach and earn from your expertise.
            </p>
          </RevealOnScroll>
          <RevealOnScroll instant delay={2} className="flex gap-4 flex-wrap">
            <Button href="#courses" variant="primary">
              Browse Courses →
            </Button>
            <Button href="#teach" variant="outline">
              Start Teaching
            </Button>
          </RevealOnScroll>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-ink grid" style={{ gridTemplateRows: "1fr auto", minHeight: mobile ? "70vw" : "auto" }}>
        {/* 2×2 cell grid */}
        <div className="grid grid-cols-2 grid-rows-2">
          {HERO_CELLS.map((cell) => (
            <HeroCell key={cell.id} cell={cell as HeroCellData} />
          ))}
        </div>

        {/* Stats bar */}
        <div className="border-t border-paper-12 px-6 py-5 flex items-center justify-between">
          <div className="flex flex-wrap" style={{ gap: mobile ? "1.5rem" : "3rem" }}>
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-mono text-[clamp(16px,1.8vw,22px)] text-paper">{s.value}</p>
                <p className="font-mono text-[10px] text-paper-40 uppercase tracking-[0.06em] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <a href="#courses" className="font-mono text-[11px] text-paper-40 uppercase tracking-[0.06em] border-b border-paper-15 pb-0.5  whitespace-nowrap">
            See all →
          </a>
        </div>
      </div>
    </section>
  );
}

interface HeroCellProps {
  cell: HeroCellData;
}

function HeroCell({ cell }: HeroCellProps) {
  const [hov, setHov] = useState(false);
  return (
    <div className="border-b border-paper-12 border-r border-paper-12 p-6 flex flex-col justify-end relative overflow-hidden transition-colors duration-300 " style={{ background: hov ? "rgba(230,51,18,.12)" : "transparent" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span className="font-mono text-[10px] text-paper-30 absolute top-4 left-4">0{cell.id}</span>
      <img src={cell.image} alt={cell.title} className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300" style={{ opacity: hov ? 0.55 : 0.35 }} />
      <div className="relative z-10">
        <p className="font-mono text-[10px] text-paper-40 uppercase tracking-[0.08em] mb-1">{cell.label}</p>
        <p className="font-serif text-[clamp(14px,1.5vw,18px)] text-paper leading-[1.2]">{cell.title}</p>
        <p className="font-mono text-[clamp(16px,1.8vw,22px)] font-medium text-red mt-1.5">{cell.price}</p>
      </div>
    </div>
  );
}
