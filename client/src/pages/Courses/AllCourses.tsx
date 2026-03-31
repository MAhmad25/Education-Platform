// AllCourses.tsx
// Browse all courses with filtering capabilities

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../Home/CourseCard';
import RevealOnScroll from '../Home/RevealOnScroll';
import Button from '../Home/Button';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

// Extended courses data for the all courses page
interface Course {
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
  category: string;
  level: string;
  duration: string;
}

const ALL_COURSES: Course[] = [
  { id: 1, thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', badge: 'Bestseller', badgeHot: true, title: 'Full-Stack Web Dev with React & Node', instructor: 'SARAH CHEN', rating: '4.9', reviews: '2.1k', price: '$89', originalPrice: '$149', category: 'Development', level: 'Intermediate', duration: '24h' },
  { id: 2, thumb: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80', badge: 'Intermediate', badgeHot: false, title: 'Design Systems from Zero to Production', instructor: 'MARCO RICCI', rating: '4.8', reviews: '987', price: '$67', originalPrice: '$110', category: 'Design', level: 'Intermediate', duration: '18h' },
  { id: 3, thumb: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', badge: 'New', badgeHot: true, title: 'Applied AI & LLM Engineering', instructor: 'PRIYA NAIR', rating: '5.0', reviews: '312', price: '$119', originalPrice: '$199', category: 'AI & ML', level: 'Advanced', duration: '32h' },
  { id: 4, thumb: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80', badge: 'Popular', badgeHot: true, title: 'Data Science with Python & Pandas', instructor: 'JAMES OKAFOR', rating: '4.7', reviews: '1.5k', price: '$79', originalPrice: '$129', category: 'Data Science', level: 'Beginner', duration: '28h' },
  { id: 5, thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80', badge: 'Beginner', badgeHot: false, title: 'UI/UX Design Fundamentals', instructor: 'MARCO RICCI', rating: '4.6', reviews: '2.3k', price: '$49', originalPrice: '$89', category: 'Design', level: 'Beginner', duration: '16h' },
  { id: 6, thumb: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80', badge: 'Advanced', badgeHot: false, title: 'Advanced React Patterns & Performance', instructor: 'SARAH CHEN', rating: '4.9', reviews: '856', price: '$99', originalPrice: '$159', category: 'Development', level: 'Advanced', duration: '20h' },
  { id: 7, thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', badge: 'Popular', badgeHot: true, title: 'Data Visualization with D3.js', instructor: 'JAMES OKAFOR', rating: '4.8', reviews: '645', price: '$69', originalPrice: '$109', category: 'Data Science', level: 'Intermediate', duration: '14h' },
  { id: 8, thumb: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', badge: 'New', badgeHot: true, title: 'Machine Learning for Beginners', instructor: 'PRIYA NAIR', rating: '4.7', reviews: '423', price: '$89', originalPrice: '$139', category: 'AI & ML', level: 'Beginner', duration: '26h' },
  { id: 9, thumb: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', badge: 'Bestseller', badgeHot: true, title: 'JavaScript: The Complete Guide', instructor: 'SARAH CHEN', rating: '4.9', reviews: '5.2k', price: '$59', originalPrice: '$99', category: 'Development', level: 'Beginner', duration: '42h' },
  { id: 10, thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', badge: 'Intermediate', badgeHot: false, title: 'Figma Mastery for Designers', instructor: 'MARCO RICCI', rating: '4.8', reviews: '1.1k', price: '$59', originalPrice: '$99', category: 'Design', level: 'Intermediate', duration: '12h' },
  { id: 11, thumb: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80', badge: 'Advanced', badgeHot: false, title: 'Deep Learning with TensorFlow', instructor: 'PRIYA NAIR', rating: '4.9', reviews: '567', price: '$129', originalPrice: '$199', category: 'AI & ML', level: 'Advanced', duration: '38h' },
  { id: 12, thumb: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', badge: 'Popular', badgeHot: true, title: 'Python for Data Analysis', instructor: 'JAMES OKAFOR', rating: '4.8', reviews: '3.1k', price: '$69', originalPrice: '$109', category: 'Data Science', level: 'Beginner', duration: '22h' },
];

const CATEGORIES = ['All', 'Development', 'Design', 'AI & ML', 'Data Science'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const PRICE_RANGES: PriceRange[] = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100+', min: 100, max: Infinity },
];

const SORT_OPTIONS = [
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
];

export default function AllCourses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>(PRICE_RANGES[0]);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    let result = [...ALL_COURSES];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'All') {
      result = result.filter(course => course.level === selectedLevel);
    }

    // Price filter
    result = result.filter(course => {
      const price = parseInt(course.price.replace('$', ''));
      return price >= selectedPrice.min && price < selectedPrice.max;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'price-low':
          return parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''));
        case 'price-high':
          return parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', ''));
        case 'newest':
          return b.badge === 'New' ? 1 : -1;
        case 'popular':
        default:
          return parseFloat(b.rating) * parseInt(b.reviews.replace('k', '000')) -
                 parseFloat(a.rating) * parseInt(a.reviews.replace('k', '000'));
      }
    });

    return result;
  }, [selectedCategory, selectedLevel, selectedPrice, sortBy, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedPrice(PRICE_RANGES[0]);
    setSearchQuery('');
  };

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedLevel !== 'All',
    selectedPrice.label !== 'All Prices',
    searchQuery !== '',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-[calc(54px+4vw)] pb-[4vw] px-[5vw] border-b-2 border-ink">
        <RevealOnScroll instant>
          <div className="max-w-[1200px] mx-auto">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-45 block mb-4">
              [ Browse Courses ]
            </span>
            <h1 className="font-serif text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-[-0.03em] mb-6">
              Find your next <em className="text-red">skill</em>
            </h1>
            <p className="text-[16px] text-ink-45 max-w-[500px] leading-[1.6]">
              Browse 340+ courses across development, design, data science, and AI. Learn from industry experts.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* Filters & Search Bar */}
      <section className="sticky top-[54px] z-[90] bg-paper/95 backdrop-blur-[14px] border-b-2 border-ink px-[5vw] py-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-[400px]">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-2 border-ink-15 px-4 py-3 pl-11 text-[14px] text-ink placeholder:text-ink-30 outline-none transition-colors duration-150 hover:border-ink-30 focus:border-red "
              />
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-30" />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border-2 border-ink font-mono text-[11px] uppercase tracking-[0.08em] "
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              <span className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-3 lg:items-center flex-1`}>
              {/* Category Filter */}
              <FilterDropdown
                label="Category"
                options={CATEGORIES}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />

              {/* Level Filter */}
              <FilterDropdown
                label="Level"
                options={LEVELS}
                selected={selectedLevel}
                onSelect={setSelectedLevel}
              />

              {/* Price Filter */}
              <FilterDropdown
                label="Price"
                options={PRICE_RANGES.map(r => r.label)}
                selected={selectedPrice.label}
                onSelect={(label) => setSelectedPrice(PRICE_RANGES.find(r => r.label === label) || PRICE_RANGES[0])}
              />

              {/* Sort */}
              <div className="ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-2 border-ink-15 px-4 py-3 text-[12px] font-mono uppercase tracking-[0.05em] outline-none hover:border-ink-30 focus:border-red "
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-paper text-ink">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-45">Active:</span>
              {selectedCategory !== 'All' && (
                <FilterTag onClick={() => setSelectedCategory('All')}>
                  {selectedCategory} ×
                </FilterTag>
              )}
              {selectedLevel !== 'All' && (
                <FilterTag onClick={() => setSelectedLevel('All')}>
                  {selectedLevel} ×
                </FilterTag>
              )}
              {selectedPrice.label !== 'All Prices' && (
                <FilterTag onClick={() => setSelectedPrice(PRICE_RANGES[0])}>
                  {selectedPrice.label} ×
                </FilterTag>
              )}
              {searchQuery && (
                <FilterTag onClick={() => setSearchQuery('')}>
                  &quot;{searchQuery}&quot; ×
                </FilterTag>
              )}
              <button
                onClick={clearFilters}
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-red hover:underline ml-2 "
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Course Grid */}
      <section className="section">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-45">
              Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <RevealOnScroll key={course.id} delay={index % 3}>
                  <Link to={`/course/${course.id}`} className="block ">
                    <CourseCard course={course} />
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-[24px] mb-4">No courses found</p>
              <p className="text-ink-45 mb-6">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

function FilterDropdown({ label, options, selected, onSelect }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="flex items-center gap-2 px-4 py-3 border-2 border-ink-15 font-mono text-[11px] uppercase tracking-[0.08em] hover:border-ink-30 transition-colors  min-w-[140px] justify-between"
      >
        {selected === 'All' || selected === 'All Prices' ? label : selected}
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-paper border-2 border-ink z-50 min-w-[180px] shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => { onSelect(option); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.05em] transition-colors  ${
                selected === option
                  ? 'bg-red text-white'
                  : 'hover:bg-ink-5'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface FilterTagProps {
  children: React.ReactNode;
  onClick: () => void;
}

function FilterTag({ children, onClick }: FilterTagProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 bg-ink-5 border border-ink-15 font-mono text-[10px] uppercase tracking-[0.05em] hover:border-red hover:text-red transition-colors "
    >
      {children}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
