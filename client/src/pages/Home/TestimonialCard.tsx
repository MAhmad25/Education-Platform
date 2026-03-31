// TestimonialCard.tsx
// Props: testimonial — object from TESTIMONIALS in homeData.js

interface Testimonial {
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="p-10">
      <p className="font-mono text-[11px] text-red tracking-[0.15em] mb-4">★ ★ ★ ★ ★</p>

      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-ink-15">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-ink"
        />
        <div>
          <p className="font-serif text-[16px] tracking-[-0.01em]">{testimonial.name}</p>
          <p className="font-mono text-[10px] text-ink-40 uppercase tracking-[0.06em] mt-0.5">{testimonial.role}</p>
        </div>
      </div>

      <p className="font-sans italic text-[14px] leading-[1.7] text-ink-60">
        <span className="font-serif text-[28px] text-red leading-none align-[-0.4em] mr-1">"</span>
        {testimonial.quote}
      </p>
    </article>
  );
}
