// PricingCol.tsx
// Props: plan — object from PRICING_PLANS in homeData.ts
// plan.featured = true → dark ink background

import Button from './Button';
import type { PricingPlan } from './homeData';

interface PricingColProps {
  plan: PricingPlan;
}

export default function PricingCol({ plan }: PricingColProps) {
  const dark = plan.featured;
  return (
    <div className={`p-12 flex flex-col h-full ${dark ? 'bg-ink' : ''}`}>
      <p className={`font-mono text-[11px] uppercase tracking-[0.12em] mb-4 ${dark ? 'text-red' : 'text-ink'}`}>
        {plan.name}
      </p>

      <p className={`font-serif text-[clamp(36px,3.8vw,54px)] tracking-[-0.03em] leading-none mb-1 ${dark ? 'text-paper' : 'text-ink'}`}>
        {plan.price}
      </p>

      <p className={`font-mono text-[11px] uppercase tracking-[0.08em] mb-10 pb-10 ${dark ? 'text-paper-30 border-b border-paper-12' : 'text-ink-40 border-b border-ink-15'}`}>
        {plan.period}
      </p>

      <ul className="flex flex-col gap-3 flex-1 mb-10 list-none">
        {plan.features.map((f, i) => (
          <li
            key={i}
            className={`flex items-start gap-2.5 text-[14px] leading-relaxed ${dark ? 'text-paper-60' : 'text-ink-60'}`}
            style={{ opacity: f.included ? 1 : 0.3 }}
          >
            <span className="font-mono text-[12px] text-red shrink-0 mt-px">✓</span>
            {f.text}
          </li>
        ))}
      </ul>

      <Button
        href={plan.ctaHref}
        variant={dark ? 'primary' : 'outline'}
        className="w-full justify-center"
      >
        {plan.cta}
      </Button>
    </div>
  );
}
