// Tag.tsx — [ bracket label ] used as section identifiers
// Usage: <Tag>How it works</Tag>

import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span className={`font-mono text-[11px] tracking-[0.08em] uppercase text-ink-45 ${className}`}>
      [ {children} ]
    </span>
  );
}
