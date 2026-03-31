// SectionHeader.tsx
// tag + big serif title + optional right-slot
// title supports raw HTML (for <em> accent words)

import type { ReactNode } from "react";
import Tag from './Tag';

interface SectionHeaderProps {
  tag?: string;
  title: string;
  right?: ReactNode;
}

export default function SectionHeader({ tag, title, right }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-8 flex-wrap mb-[5vw] border-b border-ink-15 pb-8">
      <div>
        {tag && <Tag className="block mb-3">{tag}</Tag>}
        <h2
          className="font-serif text-[clamp(28px,4vw,64px)] leading-[1.05] tracking-[-0.03em] max-w-[580px] mt-2"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      {right && <div className="shrink-0 pt-1.5">{right}</div>}
    </div>
  );
}
