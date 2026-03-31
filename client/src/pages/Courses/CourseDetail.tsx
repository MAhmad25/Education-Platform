// CourseDetail.tsx
// Dynamic course detail page with comprehensive information

import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import RevealOnScroll from '../Home/RevealOnScroll';
import Button from '../Home/Button';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

// Extended course data with detailed information
interface Lesson {
  id: number;
  title: string;
  duration: string;
  preview?: boolean;
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

interface DetailedCourse {
  id: number;
  thumb: string;
  badge: string;
  badgeHot: boolean;
  title: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  instructorBio: string;
  instructorAvatar: string;
  rating: string;
  reviews: string;
  students: string;
  price: string;
  originalPrice: string;
  category: string;
  level: string;
  duration: string;
  lastUpdated: string;
  language: string;
  features: string[];
  sections: Section[];
  courseReviews: Review[];
}

const COURSES_DATA: Record<number, DetailedCourse> = {
  1: {
    id: 1,
    thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    badge: 'Bestseller',
    badgeHot: true,
    title: 'Full-Stack Web Dev with React & Node',
    description: 'Master modern web development from scratch. Build real-world applications with React, Node.js, Express, and MongoDB. This comprehensive course covers everything from frontend fundamentals to backend architecture, authentication, deployment, and best practices used by industry professionals.',
    instructor: 'Sarah Chen',
    instructorTitle: 'Senior Engineer @ Stripe',
    instructorBio: 'Sarah has 10+ years of experience building scalable web applications. Previously at Google and Meta, she now leads engineering teams at Stripe. She has taught over 50,000 students and is passionate about making complex concepts accessible.',
    instructorAvatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80',
    rating: '4.9',
    reviews: '2.1k',
    students: '15.3k',
    price: '$89',
    originalPrice: '$149',
    category: 'Development',
    level: 'Intermediate',
    duration: '24h 30m',
    lastUpdated: 'January 2026',
    language: 'English',
    features: [
      '24 hours on-demand video',
      '45 downloadable resources',
      '12 coding exercises',
      'Full lifetime access',
      'Certificate of completion',
      'Access on mobile and TV',
      'Closed captions',
    ],
    sections: [
      {
        id: 1,
        title: 'Getting Started',
        lessons: [
          { id: 1, title: 'Course Overview & Setup', duration: '8:32', preview: true },
          { id: 2, title: 'Development Environment', duration: '15:45', preview: true },
          { id: 3, title: 'Git & Version Control', duration: '22:18' },
        ],
      },
      {
        id: 2,
        title: 'React Fundamentals',
        lessons: [
          { id: 4, title: 'Components & JSX', duration: '28:15' },
          { id: 5, title: 'State & Props', duration: '35:42' },
          { id: 6, title: 'Hooks Deep Dive', duration: '42:10' },
          { id: 7, title: 'Custom Hooks', duration: '31:25' },
        ],
      },
      {
        id: 3,
        title: 'Backend with Node.js',
        lessons: [
          { id: 8, title: 'Express Server Setup', duration: '25:30' },
          { id: 9, title: 'REST API Design', duration: '38:45' },
          { id: 10, title: 'MongoDB Integration', duration: '45:20' },
          { id: 11, title: 'Authentication & JWT', duration: '52:15' },
        ],
      },
    ],
    courseReviews: [
      { id: 1, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', rating: 5, date: '2 weeks ago', content: 'Best React course I have ever taken. Sarah explains complex concepts in a way that just clicks. The project-based approach helped me land my first dev job!' },
      { id: 2, name: 'Maria Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', rating: 5, date: '1 month ago', content: 'Comprehensive and well-structured. The section on authentication alone is worth the price. Highly recommend!' },
      { id: 3, name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', rating: 4, date: '2 months ago', content: 'Great course overall. Would have liked more coverage on testing, but the deployment section was excellent.' },
    ],
  },
  2: {
    id: 2,
    thumb: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1200&q=80',
    badge: 'Intermediate',
    badgeHot: false,
    title: 'Design Systems from Zero to Production',
    description: 'Learn to create, document, and maintain scalable design systems. From component libraries to design tokens, this course covers the complete workflow used by top tech companies.',
    instructor: 'Marco Ricci',
    instructorTitle: 'Design Systems Lead @ Figma',
    instructorBio: 'Marco has built design systems for Airbnb, Shopify, and now Figma. He specializes in bridging the gap between design and engineering, creating systems that scale across organizations.',
    instructorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    rating: '4.8',
    reviews: '987',
    students: '8.2k',
    price: '$67',
    originalPrice: '$110',
    category: 'Design',
    level: 'Intermediate',
    duration: '18h 15m',
    lastUpdated: 'December 2025',
    language: 'English',
    features: [
      '18 hours on-demand video',
      '32 downloadable resources',
      '8 Figma templates',
      'Full lifetime access',
      'Certificate of completion',
      'Community Discord access',
    ],
    sections: [
      {
        id: 1,
        title: 'Design System Fundamentals',
        lessons: [
          { id: 1, title: 'What is a Design System?', duration: '12:20', preview: true },
          { id: 2, title: 'Auditing Your Current UI', duration: '28:45' },
        ],
      },
      {
        id: 2,
        title: 'Design Tokens',
        lessons: [
          { id: 3, title: 'Color Systems', duration: '35:30' },
          { id: 4, title: 'Typography Scales', duration: '42:15' },
          { id: 5, title: 'Spacing & Layout', duration: '38:20' },
        ],
      },
    ],
    courseReviews: [
      { id: 1, name: 'Sophie Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', rating: 5, date: '3 weeks ago', content: 'Finally a course that explains design tokens properly. Marco knows his stuff!' },
    ],
  },
  3: {
    id: 3,
    thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    badge: 'New',
    badgeHot: true,
    title: 'Applied AI & LLM Engineering',
    description: 'Build production-ready AI applications using large language models. Learn prompt engineering, fine-tuning, RAG systems, and deployment strategies used by leading AI companies.',
    instructor: 'Priya Nair',
    instructorTitle: 'ML Engineer @ HuggingFace',
    instructorBio: 'Priya is a researcher and engineer working at the forefront of LLM technology. She has published papers on transformer architectures and contributes to open-source ML tools.',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    rating: '5.0',
    reviews: '312',
    students: '4.1k',
    price: '$119',
    originalPrice: '$199',
    category: 'AI & ML',
    level: 'Advanced',
    duration: '32h 45m',
    lastUpdated: 'March 2026',
    language: 'English',
    features: [
      '32 hours on-demand video',
      '60+ downloadable resources',
      '5 complete projects',
      'Full lifetime access',
      'Certificate of completion',
      'Priority Discord support',
    ],
    sections: [
      {
        id: 1,
        title: 'LLM Fundamentals',
        lessons: [
          { id: 1, title: 'How Transformers Work', duration: '45:20', preview: true },
          { id: 2, title: 'Tokenization & Embeddings', duration: '38:15' },
        ],
      },
    ],
    courseReviews: [
      { id: 1, name: 'David Park', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', rating: 5, date: '1 week ago', content: 'Mind-blowing content. Priya explains transformers better than any paper or blog post I have read.' },
    ],
  },
  4: {
    id: 4,
    thumb: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
    badge: 'Popular',
    badgeHot: true,
    title: 'Data Science with Python & Pandas',
    description: 'Start your data science journey with Python. Master pandas, NumPy, data visualization, and statistical analysis through hands-on projects with real datasets.',
    instructor: 'James Okafor',
    instructorTitle: 'Data Scientist @ Netflix',
    instructorBio: 'James analyzes viewing patterns and builds recommendation systems at Netflix. He has a gift for teaching complex data concepts through intuitive examples.',
    instructorAvatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&q=80',
    rating: '4.7',
    reviews: '1.5k',
    students: '11.8k',
    price: '$79',
    originalPrice: '$129',
    category: 'Data Science',
    level: 'Beginner',
    duration: '28h 20m',
    lastUpdated: 'February 2026',
    language: 'English',
    features: [
      '28 hours on-demand video',
      '40 downloadable resources',
      '10 datasets to practice',
      'Full lifetime access',
      'Certificate of completion',
    ],
    sections: [
      {
        id: 1,
        title: 'Python for Data Science',
        lessons: [
          { id: 1, title: 'Python Basics Review', duration: '25:30', preview: true },
          { id: 2, title: 'NumPy Fundamentals', duration: '42:15' },
        ],
      },
    ],
    courseReviews: [
      { id: 1, name: 'Lisa Thompson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', rating: 5, date: '3 weeks ago', content: 'Perfect introduction to data science. James makes statistics actually enjoyable!' },
    ],
  },
};

// Default course for IDs not in data
const DEFAULT_COURSE: DetailedCourse = {
  id: 0,
  thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
  badge: 'Course',
  badgeHot: false,
  title: 'Course Not Found',
  description: 'This course is not available. Please browse our other courses.',
  instructor: 'Unknown',
  instructorTitle: '',
  instructorBio: '',
  instructorAvatar: '',
  rating: '0.0',
  reviews: '0',
  students: '0',
  price: '$0',
  originalPrice: '$0',
  category: 'Unknown',
  level: 'Unknown',
  duration: '0h',
  lastUpdated: '',
  language: 'English',
  features: [],
  sections: [],
  courseReviews: [],
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '0');
  const course = COURSES_DATA[courseId] || DEFAULT_COURSE;
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalLessons = useMemo(() => {
    return course.sections.reduce((acc, section) => acc + section.lessons.length, 0);
  }, [course.sections]);

  if (course.id === 0) {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <Navbar />
        <div className="pt-[calc(54px+8vw)] pb-[8vw] px-[5vw] text-center">
          <h1 className="font-serif text-[clamp(36px,6vw,72px)] leading-[1.05] mb-6">
            Course Not Found
          </h1>
          <p className="text-ink-45 mb-8">The course you are looking for does not exist.</p>
          <Link to="/courses">
            <Button variant="primary">Browse All Courses →</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-[calc(54px+4vw)] border-b-2 border-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
          {/* Left - Course Info */}
          <div className="px-[5vw] py-[4vw] lg:border-r-2 border-ink">
            <RevealOnScroll instant>
              <div className="max-w-[700px]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-45 mb-6">
                  <Link to="/courses" className="hover:text-red transition-colors">Courses</Link>
                  <span>/</span>
                  <span>{course.category}</span>
                </div>

                {/* Badge */}
                {course.badge && (
                  <span className={`inline-block font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 mb-4 ${course.badgeHot ? 'bg-red text-white' : 'bg-ink text-paper'}`}>
                    {course.badge}
                  </span>
                )}

                {/* Title */}
                <h1 className="font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.03em] mb-6">
                  {course.title}
                </h1>

                {/* Description */}
                <p className="text-[16px] text-ink-45 leading-[1.7] mb-8">
                  {course.description}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-red font-medium">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < Math.floor(parseFloat(course.rating))} />
                      ))}
                    </div>
                    <span className="text-ink-45 text-[14px]">({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px]">
                    <UserIcon />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px]">
                    <ClockIcon />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full object-cover border-2 border-ink"
                  />
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-[13px] text-ink-45">{course.instructorTitle}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right - Purchase Card */}
          <div className="bg-ink text-paper p-[5vw] lg:p-8">
            <RevealOnScroll delay={1}>
              <div className="lg:sticky lg:top-[74px]">
                {/* Course Image */}
                <div className="aspect-video mb-6 border-2 border-paper-15 overflow-hidden">
                  <img
                    src={course.thumb}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-serif text-[48px] tracking-[-0.02em]">{course.price}</span>
                  <span className="text-[20px] text-paper-45 line-through">{course.originalPrice}</span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-8">
                  <Button variant="primary" className="w-full justify-center !bg-red !border-red hover:!bg-red-80">
                    Enroll Now →
                  </Button>
                  <Button variant="outline-light" className="w-full justify-center">
                    Add to Wishlist
                  </Button>
                </div>

                {/* Features */}
                <div className="space-y-3 text-[14px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper-45 mb-4">
                    This course includes:
                  </p>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckIcon className="shrink-0 mt-0.5" />
                      <span className="text-paper-80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="border-b-2 border-ink">
        <div className="max-w-[1200px] mx-auto px-[5vw]">
          <div className="flex gap-8">
            {(['overview', 'curriculum', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-mono text-[12px] uppercase tracking-[0.1em] border-b-2 transition-colors  ${
                  activeTab === tab
                    ? 'border-red text-ink'
                    : 'border-transparent text-ink-45 hover:text-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section">
        <div className="max-w-[1200px] mx-auto px-[5vw]">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
            {/* Main Content */}
            <div>
              {activeTab === 'overview' && (
                <RevealOnScroll>
                  <div className="space-y-12">
                    {/* What You Will Learn */}
                    <div>
                      <h2 className="font-serif text-[28px] mb-6">What you will learn</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {course.features.slice(0, 6).map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckIcon className="shrink-0 text-red" />
                            <span className="text-[14px] leading-[1.6]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="border-t-2 border-ink-15 pt-12">
                      <h2 className="font-serif text-[28px] mb-6">Your instructor</h2>
                      <div className="flex items-start gap-6">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-20 h-20 rounded-full object-cover border-2 border-ink"
                        />
                        <div>
                          <h3 className="font-serif text-[20px] mb-1">{course.instructor}</h3>
                          <p className="text-ink-45 text-[14px] mb-4">{course.instructorTitle}</p>
                          <p className="text-[14px] leading-[1.7] text-ink-80">{course.instructorBio}</p>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="border-t-2 border-ink-15 pt-12">
                      <h2 className="font-serif text-[28px] mb-6">Course details</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <InfoItem label="Level" value={course.level} />
                        <InfoItem label="Duration" value={course.duration} />
                        <InfoItem label="Language" value={course.language} />
                        <InfoItem label="Updated" value={course.lastUpdated} />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              )}

              {activeTab === 'curriculum' && (
                <RevealOnScroll>
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-[28px]">Course content</h2>
                      <p className="text-ink-45 text-[14px]">
                        {course.sections.length} sections • {totalLessons} lessons • {course.duration} total
                      </p>
                    </div>

                    <div className="space-y-3">
                      {course.sections.map((section) => (
                        <div key={section.id} className="border-2 border-ink">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-4 bg-ink-5 hover:bg-ink-10 transition-colors "
                          >
                            <div className="flex items-center gap-3">
                              <span className={`transition-transform ${expandedSections.includes(section.id) ? 'rotate-90' : ''}`}>
                                ▶
                              </span>
                              <span className="font-medium text-left">{section.title}</span>
                            </div>
                            <span className="text-[13px] text-ink-45">
                              {section.lessons.length} lessons
                            </span>
                          </button>

                          {expandedSections.includes(section.id) && (
                            <div className="divide-y divide-ink-15">
                              {section.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between p-4 hover:bg-ink-5 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <PlayIcon className="text-ink-30" />
                                    <span className="text-[14px]">{lesson.title}</span>
                                    {lesson.preview && (
                                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 bg-red text-white">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[13px] text-ink-45">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              )}

              {activeTab === 'reviews' && (
                <RevealOnScroll>
                  <div>
                    <div className="flex items-center gap-8 mb-8">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-[56px] tracking-[-0.03em]">{course.rating}</span>
                          <span className="text-[20px] text-ink-45">/ 5</span>
                        </div>
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < Math.floor(parseFloat(course.rating))} />
                          ))}
                        </div>
                        <p className="text-[13px] text-ink-45">{course.reviews} reviews</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {course.courseReviews.map((review) => (
                        <div key={review.id} className="border-b border-ink-15 pb-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-medium">{review.name}</span>
                                <span className="text-[12px] text-ink-45">{review.date}</span>
                              </div>
                              <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon key={i} filled={i < review.rating} small />
                                ))}
                              </div>
                              <p className="text-[14px] leading-[1.6] text-ink-80">{review.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <RevealOnScroll delay={1}>
                <div className="sticky top-[74px] space-y-6">
                  <div className="border-2 border-ink p-6">
                    <h3 className="font-serif text-[18px] mb-4">Related Courses</h3>
                    <div className="space-y-4">
                      {Object.values(COURSES_DATA)
                        .filter(c => c.id !== course.id && c.category === course.category)
                        .slice(0, 3)
                        .map(relatedCourse => (
                          <Link
                            key={relatedCourse.id}
                            to={`/course/${relatedCourse.id}`}
                            className="flex gap-3 group "
                          >
                            <img
                              src={relatedCourse.thumb}
                              alt={relatedCourse.title}
                              className="w-20 h-14 object-cover border border-ink-15"
                            />
                            <div>
                              <p className="text-[13px] font-medium leading-[1.4] group-hover:text-red transition-colors line-clamp-2">
                                {relatedCourse.title}
                              </p>
                              <p className="text-[12px] text-ink-45">{relatedCourse.price}</p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Icon Components
function StarIcon({ filled, small }: { filled: boolean; small?: boolean }) {
  return (
    <svg
      className={`${filled ? 'text-red' : 'text-ink-15'} ${small ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-45 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
