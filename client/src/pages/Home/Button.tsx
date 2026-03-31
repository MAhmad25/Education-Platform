import { useState, type ReactNode, type CSSProperties } from "react";

const base = "font-mono text-[12px] tracking-[0.1em] uppercase inline-flex items-center gap-[10px] transition-all duration-150 whitespace-nowrap border-2 no-underline leading-none";

const variants = {
  primary: {
    idle: "bg-red text-white border-red",
    hover: "bg-transparent text-red border-red",
  },
  outline: {
    idle: "bg-transparent text-ink border-ink",
    hover: "bg-ink text-paper border-ink",
  },
  "outline-light": {
    idle: "bg-transparent text-paper border-paper-15",
    hover: "bg-red text-white border-red",
  },
};

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-light";
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Button({ children, variant = "primary", href, onClick, className = "", style = {} }: ButtonProps) {
  const [hov, setHov] = useState(false);
  const v = variants[variant] ?? variants.primary;
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={{ padding: "14px 24px", ...style }} className={`${base} ${hov ? v.hover : v.idle} ${className}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </Tag>
  );
}
