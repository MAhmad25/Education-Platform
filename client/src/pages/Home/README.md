# CourseCraft — Landing Page

Brutalist-editorial React landing page for a course-selling platform.
Built with **React + Tailwind CSS v4**.

---

## Setup

```bash
npm create vite@latest my-app -- --template react
cd my-app

# Install Tailwind v4 + its Vite plugin
npm install tailwindcss@next @tailwindcss/vite@next

# Delete the default src/ folder, paste all files from this download into src/
rm -rf src/

# Update vite.config.js:
# import tailwindcss from '@tailwindcss/vite'
# plugins: [tailwindcss(), react()]

npm run dev
```

No other packages needed. Pure React + Tailwind v4.

---

## Every file is flat inside `src/`

No subfolders. Download → drop into `src/` → done.
All imports are `./FileName` — zero path prefixes.

```
src/
├── globals.css          ← @import "tailwindcss" + @theme{} tokens + base/component layers
├── homeData.js          ← ALL content: copy, images, prices, links

├── Tag.jsx              ← [ bracket label ]
├── Button.jsx           ← primary | outline | outline-light
├── SectionHeader.jsx    ← tag + big title + optional right slot
├── RevealOnScroll.jsx   ← fade-up scroll reveal wrapper
├── CourseCard.jsx       ← thumbnail + meta + enroll button
├── InstructorCard.jsx   ← grayscale photo → color on hover
├── TestimonialCard.jsx  ← review: avatar, stars, quote
├── PricingCol.jsx       ← single pricing tier
├── FAQItem.jsx          ← accordion row
├── useCursor.js         ← custom cursor dot hook

├── Navbar.jsx           ← desktop full nav | mobile hamburger + slide drawer
├── Hero.jsx             ← split hero: copy left + 2×2 course grid right
├── Marquee.jsx          ← infinite scrolling topic strip
├── HowItWorks.jsx       ← 3-step grid
├── NumbersStrip.jsx     ← 4 stat numbers
├── FeaturedCourses.jsx  ← 3 course cards
├── RolePanels.jsx       ← student (light) vs instructor (dark)
├── Instructors.jsx      ← 4 instructor portraits
├── Testimonials.jsx     ← 6 student reviews
├── Pricing.jsx          ← 3 pricing tiers
├── FAQ.jsx              ← accordion FAQ
├── CTABanner.jsx        ← final dark call-to-action
├── Footer.jsx           ← 4-column footer

├── Home.jsx             ← assembles all sections in order
└── App.jsx              ← root: renders Home
```

---

## How to change things

| Task | File |
|------|------|
| Change any text, image, price | `homeData.js` |
| Change any color or font | `globals.css` — `@theme {}` block |
| Reorder homepage sections | Move lines in `Home.jsx` |
| Hide a section | Comment it out in `Home.jsx` |
| Add a new course card | Add an object to `COURSES` in `homeData.js` |
| Use CourseCard on another page | `import CourseCard from './CourseCard'` |

---

## Responsive breakpoints

| Breakpoint | What changes |
|-----------|-------------|
| `< 900px` | Hero stacks: copy on top, course grid below |
| `< 768px` | Nav collapses to hamburger + animated drawer |
| `< 768px` | 3-col grids (courses, how-it-works, pricing) → 1 col |
| `< 768px` | Role panels (student/instructor) → stacked |
| `< 1024px`| 4-col grids (instructors, numbers) → 2 col |
| `< 640px` | All grids → 1 col, custom cursor hidden |

---

## Tailwind v4 — How `@theme {}` works

In Tailwind v4, tokens defined inside `@theme {}` in your CSS file become
utility classes automatically — no config file needed.

```css
@theme {
  --color-red: #e63312;
}
```

This generates `text-red`, `bg-red`, `border-red` etc. automatically.
All tokens are also available as CSS variables: `var(--color-red)`.

---

## Color System

### The full palette

```css
@theme {
  --color-ink:    #0f0d0b;   /* Near-black */
  --color-paper:  #f2ede6;   /* Warm off-white */
  --color-red:    #e63312;   /* Orange-red accent */
}
```

**Only 3 actual colors.** Everything else is derived through opacity.

---

### Why only 3 colors?

Fewer colors = more visual weight per color. Every red element punches hard
because nothing else competes. This is borrowed directly from Railblocks.com.

---

### Opacity scales

Instead of inventing greys, we apply opacity to the base colors.
This keeps warmth — opacity-tinted ink on cream still reads warm,
whereas a grey (#888) goes cold.

**On light backgrounds (tinted `--ink`):**

| Token | Value | Used for |
|-------|-------|---------|
| `text-ink-60` | `rgba(15,13,11, 0.60)` | Body text, descriptions |
| `text-ink-45` | `rgba(15,13,11, 0.45)` | Tags, secondary labels |
| `text-ink-40` | `rgba(15,13,11, 0.40)` | Muted mono text, instructors |
| `text-ink-15` | `rgba(15,13,11, 0.15)` | Subtle borders on light bg |
| `text-ink-10` | `rgba(15,13,11, 0.10)` | Dividers inside light panels |
| `text-ink-05` | `rgba(15,13,11, 0.05)` | Ghost numbers behind stats |

**On dark backgrounds (tinted `--paper`):**

| Token | Value | Used for |
|-------|-------|---------|
| `text-paper-60` | `rgba(242,237,230, 0.60)` | Body text on dark panels |
| `text-paper-40` | `rgba(242,237,230, 0.40)` | Muted labels on dark bg |
| `text-paper-30` | `rgba(242,237,230, 0.30)` | Period text, footer note |
| `text-paper-20` | `rgba(242,237,230, 0.20)` | Footer bottom text |
| `text-paper-15` | `rgba(242,237,230, 0.15)` | Border on dark bg hover |
| `text-paper-12` | `rgba(242,237,230, 0.12)` | Subtle dividers on dark bg |

---

### Where each color appears

| Color | Appears on |
|-------|-----------|
| `--color-ink` | All text, heavy borders, dark section backgrounds (hero right, instructor panel, pricing featured col, CTA banner, footer) |
| `--color-paper` | Page background, text on dark sections, nav background (with blur), buttons on dark bg |
| `--color-red` | Logo italic, headline `<em>` words, badge borders, star ratings, price suffixes, primary CTA buttons, FAQ `+` toggle, marquee dots, scrollbar thumb, cursor dot, `→` arrows, checked features |

---

### Dark sections: same palette, flipped

Dark sections (`bg-ink`) just swap the roles of ink and paper.
No new colors introduced — the palette inverts itself:

```
Light section:  --paper background  +  --ink text   +  --red accents
Dark section:   --ink background    +  --paper text  +  --red accents
```

---

### Typography system

```css
@theme {
  --font-serif: 'DM Serif Display', Georgia, serif;
  --font-mono:  'IBM Plex Mono', 'Courier New', monospace;
  --font-sans:  'Barlow', 'Helvetica Neue', sans-serif;
}
```

| Font | Used for |
|------|---------|
| `font-serif` | All headlines, prices, big numbers, logo |
| `font-mono` | Nav links, tags `[ ]`, labels, badges, prices, stat values — anything structural or numerical |
| `font-sans` | Body copy, descriptions, testimonial quotes |

The serif italic variant (`font-style: italic`) is used exclusively for the
red accent words inside headlines — creating a distinctive visual signature.

---

### Border system

```css
/* Heavy structural borders — the grid itself */
border-2 border-ink        (2px solid #0f0d0b)

/* Subtle dividers on light backgrounds */  
border border-ink-15       (1px solid rgba(15,13,11,0.15))

/* Subtle dividers on dark backgrounds */
border border-paper-12     (1px solid rgba(242,237,230,0.12))
```

The 2px ink borders **are** the layout. Sections, cards, and columns are
separated by these lines rather than by spacing or box-shadows. This is the
core visual signature borrowed from Railblocks.com.
