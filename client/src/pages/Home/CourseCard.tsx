import { useState, type ReactNode } from "react";

interface Course {
  thumb: string;
  title: string;
  badge: string;
  badgeHot: boolean;
  rating: string;
  reviews: string;
  instructor: string;
  price: string;
  originalPrice: string;
  href?: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <article className="overflow-hidden " onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Thumbnail */}
      <div className="overflow-hidden border-b-2 border-ink aspect-[4/3]">
        <img
          src={course.thumb}
          alt={course.title}
          className="w-full h-full object-cover block transition-all duration-500"
          style={{
            filter: hov ? "grayscale(0%)" : "grayscale(30%)",
            transform: hov ? "scale(1.04)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>

      {/* Meta */}
      <div className="p-[1.8rem]">
        <div className="flex items-center justify-between mb-4">
          <span className={`font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 border ${course.badgeHot ? "border-red text-red" : "border-ink-20 text-ink-45"}`}>{course.badge}</span>
          <span className="font-mono text-[11px] text-ink">
            ★ {course.rating} ({course.reviews})
          </span>
        </div>

        <h3 className="font-serif text-[22px] leading-[1.2] tracking-[-0.02em] mb-2">{course.title}</h3>
        <p className="font-mono text-[11px] text-ink-40 tracking-[0.05em] mb-5">[ BY {course.instructor} ]</p>

        <div className="flex items-center justify-between border-t border-ink-15 pt-5">
          <div>
            <span className="font-mono text-[20px] font-medium">{course.price}</span>
            <span className="font-mono text-[12px] text-ink-40 line-through ml-1.5">{course.originalPrice}</span>
          </div>
          <SmallBtn href={course.href}>Enroll →</SmallBtn>
        </div>
      </div>
    </article>
  );
}

interface SmallBtnProps {
  href?: string;
  children: ReactNode;
}

function SmallBtn({ href, children }: SmallBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} className={`font-mono text-[10px] uppercase tracking-[0.1em] px-3.5 py-2 border-2 border-ink transition-colors duration-150  ${hov ? "bg-ink text-paper" : "bg-transparent text-ink"}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  );
}
