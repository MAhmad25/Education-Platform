// Marquee.tsx — infinite scrolling topic strip
import { MARQUEE_ITEMS } from './homeData';

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-b border-ink-15">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="border-r border-ink-15 px-10 py-6 whitespace-nowrap font-mono text-[13px] tracking-[0.06em] flex items-center gap-4 shrink-0">
            <span className="inline-block w-1.5 h-1.5 bg-red rounded-full shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
