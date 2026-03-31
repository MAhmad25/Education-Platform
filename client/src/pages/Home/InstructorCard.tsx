// InstructorCard.tsx
// Props: instructor — object from INSTRUCTORS in homeData.js

import { useState } from 'react';

interface Instructor {
  photo: string;
  name: string;
  field: string;
  courses: string;
  rating: string;
}

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <article
      className="overflow-hidden relative "
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <img
        src={instructor.photo}
        alt={instructor.name}
        className="w-full aspect-[3/4] object-cover block transition-all duration-500"
        style={{ filter: hov ? 'grayscale(0%)' : 'grayscale(60%)' }}
      />
      {/* Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{ background: 'linear-gradient(transparent, rgba(15,13,11,0.88))' }}
      >
        <p className="font-serif text-[20px] text-paper leading-[1.15]">{instructor.name}</p>
        <p className="font-mono text-[10px] text-paper-40 uppercase tracking-[0.08em] mt-1">{instructor.field}</p>
        <p className="font-mono text-[11px] text-red mt-1.5">{instructor.courses} · {instructor.rating}</p>
      </div>
    </article>
  );
}
