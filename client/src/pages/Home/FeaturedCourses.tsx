// FeaturedCourses.tsx
import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import CourseCard from "./CourseCard";
import RevealOnScroll from "./RevealOnScroll";
import { COURSES } from "./homeData";

export default function FeaturedCourses() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  return (
    <section className="section" id="courses">
      <SectionHeader
        tag="Featured Courses"
        title="Courses that <em style='color:var(--color-red);font-style:italic'>ship</em> careers."
        right={
          <Button href="#" variant="primary">
            All 340+ Courses →
          </Button>
        }
      />
      <div className="border-t-2 border-ink" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)" }}>
        {COURSES.map((course, i) => (
          <RevealOnScroll key={course.id} delay={mobile ? 0 : i}>
            <div
              style={{
                borderRight: !mobile && i < COURSES.length - 1 ? "2px solid var(--color-ink)" : "none",
                borderBottom: mobile && i < COURSES.length - 1 ? "2px solid var(--color-ink)" : "none",
              }}
            >
              <CourseCard course={course} />
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
