# InterviewAI - Component Showcase

## Overview
This document provides a visual and functional overview of all components in the InterviewAI landing page.

---

## 1. Navbar Component

**File**: `components/Navbar.tsx`

### Features
- ✅ Sticky positioning at top of page
- ✅ Responsive mobile menu with hamburger icon
- ✅ Logo with brand name "InterviewAI"
- ✅ Navigation links to page sections
- ✅ Login button
- ✅ "Start Interview" CTA button
- ✅ Backdrop blur effect
- ✅ Smooth animations

### Layout
```
[Logo] [Features] [How It Works] [Pricing] [FAQ]  [Login] [Start Interview]
```

### Mobile
Hamburger menu collapses all nav links into dropdown

### Key Classes Used
- `sticky top-0 z-50`
- `border-b border-[#E2E8F0]`
- `bg-white/80 backdrop-blur-xl`

---

## 2. Hero Section

**File**: `components/HeroSection.tsx`

### Features
- ✅ Large gradient heading (5xl to 6xl)
- ✅ Badge showing "AI-Powered Mock Interviews"
- ✅ Compelling value proposition text
- ✅ Dual CTA buttons (Primary & Secondary)
- ✅ Interactive dashboard preview mockup
- ✅ Glassmorphism card design
- ✅ Scroll-triggered animations
- ✅ Background accent circles

### Content Sections
1. **Badge**: Green dot + "AI-Powered Mock Interviews"
2. **Headline**: Gradient text effect
3. **Description**: Subheading explaining value
4. **CTAs**: "Start Free Interview" (primary), "Watch Demo" (secondary)
5. **Preview**: 3-column grid mockup showing workflow

### Key Visual Elements
- Gradient background accent (top right)
- Blue (#2563EB) to darker blue gradient on text
- Dashboard preview with 3 steps
- Interactive question/answer mockup

---

## 3. Trust Metrics Section

**File**: `components/TrustMetricsSection.tsx`

### Features
- ✅ 4 animated metric cards
- ✅ Scroll-triggered counter animations
- ✅ Responsive grid (2 cols mobile, 4 cols desktop)
- ✅ Smooth number animations
- ✅ Card hover effects

### Metrics Displayed
1. **10,000+** Interviews Conducted
2. **95%** Candidate Satisfaction
3. **500+** Skills Evaluated
4. **24/7** AI Availability

### Animation
Numbers animate from 0 to final value when section comes into view

### Styling
- White cards on light gray (#F8FAFC) background
- Subtle shadows
- Blue text for numbers

---

## 4. Features Section

**File**: `components/FeaturesSection.tsx`

### Features
- ✅ 6 feature cards in responsive grid
- ✅ Lucide React icons for each feature
- ✅ Hover lift animation on cards
- ✅ Icon background color changes on hover
- ✅ Section title and description
- ✅ Staggered entrance animations

### The 6 Features
1. 📄 Resume-Based Questions
2. 🧠 Adaptive Follow-Up Questions
3. 💬 Technical & HR Interviews
4. 📊 Detailed Performance Reports
5. ⚡ AI-Powered Scoring
6. 📈 Career Improvement Insights

### Card Structure
```
[Icon]
Feature Title
Feature Description (2-3 lines)
```

### Responsive
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

---

## 5. How It Works Section

**File**: `components/HowItWorksSection.tsx`

### Features
- ✅ 4-step timeline
- ✅ Numbered badges (1, 2, 3, 4)
- ✅ Connecting lines between steps (desktop only)
- ✅ Icons for each step
- ✅ Step descriptions
- ✅ Hover animations on cards
- ✅ Sequential animations

### The 4 Steps
1. ⬆️ Upload Resume
2. ⚡ AI Analyzes Profile
3. ▶️ Attend Interview
4. ✅ Receive Score & Feedback

### Visual Flow
```
[1] ——— [2] ——— [3] ——— [4]
```
Lines only visible on desktop (md: and up)

### Styling
- Light gray (#F8FAFC) background
- White cards with subtle shadows
- Blue accent colors

---

## 6. Interview Experience Section

**File**: `components/InterviewExperienceSection.tsx`

### Features
- ✅ Split-screen layout (responsive)
- ✅ Mock interview UI on left
- ✅ Benefits list on right
- ✅ Question display
- ✅ Answer textarea
- ✅ Progress bar with percentage
- ✅ Attempts counter
- ✅ Submit/Skip buttons

### Left Side - Interview UI
```
Interview Session [Active Badge]

Question 3 of 10
"Explain the architecture of your FastAPI project."

[Answer textarea with placeholder]

Progress: 40%
Attempts Remaining: 5

[Submit Answer Button] [Skip Button]
```

### Right Side - Benefits
- 4 benefit items with icons
- CheckCircle, AlertCircle, Lightbulb icons
- Hover animations

### Responsive
Stacks vertically on mobile, side-by-side on desktop

---

## 7. Candidate Report Preview Section

**File**: `components/CandidateReportPreviewSection.tsx`

### Features
- ✅ Large score display (8.6/10)
- ✅ Performance badge (Strong Performance)
- ✅ 4 dimension scores with animated progress bars
- ✅ "View Full Report" button
- ✅ 3 additional feature cards
- ✅ Scale animation on load

### Score Breakdown
1. **Technical**: 9.0/10
2. **Communication**: 8.2/10
3. **Problem Solving**: 8.5/10
4. **Confidence**: 8.8/10

### Additional Features
- Interview Transcript
- Detailed Feedback
- Improvement Plan

### Styling
- Large circular score badge (blue gradient)
- Green "Strong Performance" badge
- Animated progress bars
- Professional card layout

---

## 8. Testimonials Section

**File**: `components/TestimonialsSection.tsx`

### Features
- ✅ 3 testimonial cards
- ✅ 5-star ratings (filled stars)
- ✅ Candidate quote in quotation marks
- ✅ Avatar with initials
- ✅ Candidate name and role
- ✅ Hover lift animations
- ✅ Responsive 3-column grid

### Testimonials
1. **Sarah Chen** - Software Engineer at Google
2. **Rahul Kapoor** - Product Manager at Meta
3. **Alex Johnson** - Data Scientist at Amazon

### Card Structure
```
★★★★★

"Testimonial quote text..."

[Avatar with Initials]
Name
Company Title
```

### Styling
- Light blue background (#F8FAFC)
- Yellow star ratings (#FDB022)
- Blue initials avatar
- Subtle shadows

---

## 9. FAQ Section

**File**: `components/FAQSection.tsx`

### Features
- ✅ Accordion component
- ✅ 6 FAQ items
- ✅ First item open by default
- ✅ Smooth open/close animations
- ✅ Chevron icon rotation
- ✅ Highlight color change when open
- ✅ AnimatePresence for transitions

### The 6 Questions
1. What types of interviews are supported?
2. How does AI evaluate answers?
3. Can I upload any resume?
4. Will I receive detailed feedback?
5. How many interview sessions can I take?
6. Is my resume and data secure?

### Accordion Behavior
- Click to open/close
- Only one open at a time
- Chevron rotates 180° when open
- Blue highlight background when open
- Answer slides in smoothly

---

## 10. Final CTA Section

**File**: `components/FinalCTASection.tsx`

### Features
- ✅ Gradient background (blue primary color)
- ✅ Large engaging headline
- ✅ Subheading description
- ✅ Dual CTA buttons
- ✅ Background pattern with blur circles
- ✅ Full-width section
- ✅ High contrast white text

### Content
**Headline**: "Start Your AI Interview Today"

**Subheading**: "Prepare smarter, improve faster, and land your dream job."

**CTAs**:
1. Primary: "Start Free Interview" (white button)
2. Secondary: "Learn More" (border button)

**Fine Print**: "No credit card required. Start for free and upgrade anytime."

### Styling
- Gradient background from primary color (#2563EB) to darker
- White text
- Background pattern circles with blur
- Full-width section

---

## 11. Footer Component

**File**: `components/Footer.tsx`

### Features
- ✅ Dark themed footer (#0F172A)
- ✅ Logo and brief description
- ✅ 3 columns of links (Product, Company, Legal)
- ✅ Social media icons (Twitter, LinkedIn, GitHub)
- ✅ Copyright information
- ✅ Additional footer links
- ✅ Hover animations on all links

### Sections

**Product**
- Features
- Pricing
- FAQ
- Blog

**Company**
- About
- Contact
- Careers
- Press

**Legal**
- Privacy Policy
- Terms of Service
- Cookie Policy
- Security

**Social Media**
- Twitter
- LinkedIn
- GitHub

### Bottom
- Copyright: © 2026 InterviewAI. All Rights Reserved.
- Links: Status, Sitemap

### Styling
- Dark background (#0F172A)
- Muted text (#64748B)
- Light hover colors
- Icon containers with hover effect

---

## Component Hierarchy

```
page.tsx (Main Landing Page)
├── Navbar
├── HeroSection
├── TrustMetricsSection
├── FeaturesSection
├── HowItWorksSection
├── InterviewExperienceSection
├── CandidateReportPreviewSection
├── TestimonialsSection
├── FAQSection
├── FinalCTASection
└── Footer
```

## Shared Patterns

All components use:
- ✅ Framer Motion for animations
- ✅ Tailwind CSS for styling
- ✅ Lucide React for icons
- ✅ Professional color palette
- ✅ Responsive grid layouts
- ✅ Smooth transitions
- ✅ "use client" directive (Client Components)

## Common Component Structure

```typescript
"use client";

import { motion } from "framer-motion";
import { SomeIcon } from "lucide-react";

export default function ComponentName() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Content */}
      </div>
    </section>
  );
}
```

## Animation Conventions

All scroll-triggered animations use:
```typescript
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
```

---

**Last Updated**: June 2026
