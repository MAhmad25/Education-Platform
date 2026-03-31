import { useState } from 'react';

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQItemProps {
  item: FAQItemData;
}

export default function FAQItem({ item }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-2 border-ink overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-8 px-[5vw] py-8 w-full bg-transparent border-none text-left  hover:bg-paper-2 transition-colors duration-150"
        aria-expanded={open}
      >
        <span className="font-serif text-[clamp(16px,1.7vw,24px)] tracking-[-0.02em] leading-[1.25] text-ink">
          {item.question}
        </span>
        <span
          className="font-mono text-[24px] text-red shrink-0 w-8 text-center inline-block transition-transform duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-[400ms]"
        style={{ maxHeight: open ? '300px' : '0', transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
        aria-hidden={!open}
      >
        <p className="px-[5vw] pb-8 text-[15px] leading-[1.7] text-ink-60 max-w-[680px]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
