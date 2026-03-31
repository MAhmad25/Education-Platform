// homeData.ts
// ─────────────────────────────────────────────
// ALL page content lives here.
// Images, copy, prices, links — change it here.
// Components never hardcode content.
// ─────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS_LEFT: NavLink[] = [
  { label: 'Courses',      href: '#courses' },
  { label: 'How it works', href: '#how'     },
  { label: 'Pricing',      href: '#pricing' },
];

export const NAV_LINKS_RIGHT: NavLink[] = [
  { label: 'Teach',   href: '#teach' },
  { label: 'Sign in', href: '#'      },
];

// ── MARQUEE ──────────────────────────────────
export const MARQUEE_ITEMS: string[] = [
  'Web Development', 'UI / UX Design',     'Data Science',
  'Machine Learning', 'DevOps & Cloud',    'Mobile Development',
  'Cybersecurity',   'Blockchain',          '3D & Motion',
  'Game Development',
];

// ── HERO CELLS ───────────────────────────────
export interface HeroCell {
  id: number;
  label: string;
  title: string;
  price: string;
  image: string;
}

export const HERO_CELLS: HeroCell[] = [
  { id: 1, label: 'Most Popular', title: 'Full-Stack Web Development', price: '$89',  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80' },
  { id: 2, label: 'Design',       title: 'UI/UX Design Systems',       price: '$67',  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80' },
  { id: 3, label: 'New',          title: 'AI & Machine Learning',       price: '$119', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80' },
  { id: 4, label: 'Data',         title: 'Data Science with Python',    price: '$79',  image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80' },
];

export interface HeroStat {
  value: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  { value: '12k+', label: 'Students enrolled' },
  { value: '340+', label: 'Total courses'      },
  { value: '4.9★', label: 'Avg rating'         },
];

// ── HOW IT WORKS ─────────────────────────────
export interface HowStep {
  id: string;
  icon: string;
  title: string;
  titleItalic: string;
  description: string;
}

export const HOW_STEPS: HowStep[] = [
  { id: '01', icon: '🎯', title: 'Pick a',     titleItalic: 'Course',        description: 'Browse 340+ courses across tech, design, and data. Filter by skill level, duration, and price. Every course is vetted by our team.'                                          },
  { id: '02', icon: '💳', title: 'Buy Once,',  titleItalic: 'Own Forever',   description: 'No subscriptions. No expiry. Pay once and access your course anytime, on any device — forever. Download offline. Stream on mobile.'                                          },
  { id: '03', icon: '🏗️', title: 'Build',      titleItalic: 'Real Projects', description: 'Every course ends with real deliverables you can put in your portfolio. Not just theory — actual things you ship.'                                                           },
];

// ── NUMBERS ──────────────────────────────────
export interface NumberStat {
  value: string;
  suffix: string;
  label: string;
  index: string;
}

export const NUMBERS: NumberStat[] = [
  { value: '12',  suffix: 'k+', label: 'Active students building their future', index: 'I'   },
  { value: '340', suffix: '+',  label: 'Courses across 18 skill categories',    index: 'II'  },
  { value: '96',  suffix: '%',  label: 'Student satisfaction rate',              index: 'III' },
  { value: '$2',  suffix: 'M+', label: 'Paid out to instructors',                index: 'IV'  },
];

// ── COURSES ───────────────────────────────────
export interface Course {
  id: number;
  thumb: string;
  badge: string;
  badgeHot: boolean;
  title: string;
  instructor: string;
  rating: string;
  reviews: string;
  price: string;
  originalPrice: string;
  href?: string;
}

export const COURSES: Course[] = [
  { id: 1, thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', badge: 'Bestseller', badgeHot: true,  title: 'Full-Stack Web Dev with React & Node',       instructor: 'SARAH CHEN',  rating: '4.9', reviews: '2.1k', price: '$89',  originalPrice: '$149', href: '#' },
  { id: 2, thumb: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80', badge: 'Intermediate', badgeHot: false, title: 'Design Systems from Zero to Production',  instructor: 'MARCO RICCI', rating: '4.8', reviews: '987',  price: '$67',  originalPrice: '$110', href: '#' },
  { id: 3, thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', badge: 'New',       badgeHot: true,  title: 'Applied AI & LLM Engineering',              instructor: 'PRIYA NAIR',  rating: '5.0', reviews: '312',  price: '$119', originalPrice: '$199', href: '#' },
];

// ── ROLE PANELS ───────────────────────────────
export interface Feature {
  text: string;
  detail: string;
}

export const STUDENT_FEATURES: Feature[] = [
  { text: 'Lifetime access',    detail: '— buy once, rewatch anytime, no subscriptions.'                     },
  { text: 'Real projects',      detail: '— every course ships with portfolio-ready deliverables.'            },
  { text: 'Community',          detail: '— join Discord cohorts, get code reviews, ask questions.'           },
  { text: 'Progress tracking',  detail: '— pick up exactly where you left off, across any device.'           },
  { text: 'Certificates',       detail: '— shareable certificates upon course completion.'                   },
];

export const INSTRUCTOR_FEATURES: Feature[] = [
  { text: 'Keep 80%',           detail: 'of every sale — no hidden cuts, no minimum thresholds.'            },
  { text: 'Free hosting',       detail: '— we handle video hosting, CDN, and playback globally.'            },
  { text: 'Course builder',     detail: '— drag-and-drop curriculum editor, no tech skills needed.'         },
  { text: 'Analytics',          detail: '— track watch time, completion rates, and revenue in real time.'   },
  { text: 'Payouts weekly',     detail: '— straight to your bank, every Friday without fail.'               },
];

// ── INSTRUCTORS ───────────────────────────────
export interface Instructor {
  id: number;
  photo: string;
  name: string;
  field: string;
  courses: string;
  rating: string;
}

export const INSTRUCTORS: Instructor[] = [
  { id: 1, photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80', name: 'Sarah Chen',   field: 'Full-Stack Engineering',  courses: '12 courses', rating: '4.9★' },
  { id: 2, photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80', name: 'Marco Ricci',  field: 'Design Systems & UX',     courses: '8 courses',  rating: '4.8★' },
  { id: 3, photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', name: 'Priya Nair',   field: 'AI & Machine Learning',   courses: '5 courses',  rating: '5.0★' },
  { id: 4, photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80', name: 'James Okafor', field: 'DevOps & Cloud',          courses: '9 courses',  rating: '4.7★' },
];

// ── TESTIMONIALS ─────────────────────────────
export interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80', name: 'Arjun Mehta',    role: 'Software Engineer @ Stripe',    quote: "Got my first job three months after finishing Sarah's course. The project-based approach meant I had something real to show interviewers."                                },
  { id: 2, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', name: 'Emily Park',     role: 'Product Designer @ Linear',     quote: "I've tried Udemy, Coursera, and Skillshare. CourseCraft is the only platform where I finished a course and immediately applied everything."                          },
  { id: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', name: 'Lucas Ferreira', role: 'ML Engineer @ HuggingFace',     quote: "The AI course by Priya is genuinely better than what I learned in my CS degree. Hands-on, current, and taught by someone who ships production models."           },
  { id: 4, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80', name: 'Sofia Mwangi',   role: 'Freelance Developer',           quote: "As a self-taught dev in Nairobi, access to this quality of instruction changed everything for me. The price point is fair and the content is world-class."       },
  { id: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', name: 'Tomás García',   role: 'Backend Dev @ Vercel',          quote: "Bought 4 courses so far. Every single one was worth it. The no-subscription model means I actually go back and rewatch sections instead of feeling guilty."  },
  { id: 6, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80', name: 'Yuki Tanaka',    role: 'UX Researcher @ Figma',         quote: "Marco's design systems course was exactly what I needed. Clear, opinionated, no filler. I shipped our design system 2 weeks after finishing it."            },
];

// ── PRICING ───────────────────────────────────
export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  featured: boolean;
  cta: string;
  ctaHref: string;
  features: PricingFeature[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'per-course', name: 'Per Course', price: '$49–$119', period: 'one-time payment, yours forever',
    featured: false, cta: 'Browse Courses →', ctaHref: '#courses',
    features: [
      { text: 'Lifetime access to course content', included: true  },
      { text: 'Downloadable resources & code',     included: true  },
      { text: 'Certificate of completion',         included: true  },
      { text: 'Community Discord access',          included: true  },
      { text: 'All future course updates',         included: false },
    ],
  },
  {
    id: 'all-access', name: 'All Access Pass', price: '$299', period: 'one-time, unlimited forever',
    featured: true, cta: 'Get All Access →', ctaHref: '#',
    features: [
      { text: 'Every course, now and future',      included: true },
      { text: 'All resources & source code',       included: true },
      { text: 'Priority Discord support',          included: true },
      { text: 'Monthly live Q&A with instructors', included: true },
      { text: 'Early access to new courses',       included: true },
    ],
  },
  {
    id: 'instructor', name: 'Instructor', price: 'Free', period: 'to publish, keep 80% revenue',
    featured: false, cta: 'Apply to Teach →', ctaHref: '#teach',
    features: [
      { text: 'Unlimited video hosting',           included: true },
      { text: 'Built-in course builder',           included: true },
      { text: 'Revenue analytics dashboard',       included: true },
      { text: 'Weekly payouts, no minimum',        included: true },
      { text: 'Your own instructor profile page',  included: true },
    ],
  },
];

// ── FAQ ───────────────────────────────────────
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  { id: 1, question: 'How is CourseCraft different from Udemy or Coursera?',   answer: 'We only accept instructors who are active practitioners — not retired academics or career educators. Every course ships with real project deliverables, not just quizzes. And we never run 90%-off flash sales that devalue instructor work.' },
  { id: 2, question: 'Do courses expire? Can I access them offline?',          answer: "Never. Once you buy a course it's yours forever — no expiry dates, no subscription cliffs. You can download all videos, slides, and code for offline access through our mobile app." },
  { id: 3, question: "What's the refund policy?",                              answer: 'Full refund within 30 days, no questions asked. If a course is not what you expected, email us and we will process the refund within 24 hours.' },
  { id: 4, question: 'How do I become an instructor?',                         answer: 'Apply through our instructor portal. We review your professional background and a sample lesson — usually within 72 hours. We are looking for practitioners with real-world experience, not teaching credentials.' },
  { id: 5, question: "What's the revenue split for instructors?",              answer: 'You keep 80% of every sale. We take 20% to cover hosting, payment processing, marketing, and platform development. Payouts happen every Friday directly to your bank account, with no minimum threshold.' },
];

// ── FOOTER ────────────────────────────────────
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinks {
  Learn: FooterLink[];
  Teach: FooterLink[];
  Company: FooterLink[];
}

export const FOOTER_LINKS: FooterLinks = {
  Learn:   [{ label: 'All Courses', href: '#' }, { label: 'Web Development', href: '#' }, { label: 'Design', href: '#' }, { label: 'Data Science', href: '#' }, { label: 'AI & ML', href: '#' }],
  Teach:   [{ label: 'Become Instructor', href: '#' }, { label: 'Instructor Handbook', href: '#' }, { label: 'Revenue Calculator', href: '#' }, { label: 'Course Builder', href: '#' }],
  Company: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Privacy Policy', href: '#' }, { label: 'Terms of Service', href: '#' }],
};

export const FOOTER_SOCIALS: FooterLink[] = [
  { label: 'Twitter', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'GitHub',  href: '#' },
];
