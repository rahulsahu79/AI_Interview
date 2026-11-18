# InterviewAI Landing Page

A modern, enterprise-grade landing page for an AI-powered interview preparation platform built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Overview

InterviewAI helps students and job seekers prepare for technical and behavioral interviews through:
- AI-powered personalized interview questions based on your resume
- Mock interview experience with realistic scenarios
- Detailed performance reports and analytics
- Real-time feedback and improvement recommendations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (body), Newsreader (headings)

## Features

### Sections Included

1. **Sticky Navigation Bar**
   - Logo and platform name
   - Navigation links (Features, How It Works, Pricing, FAQ)
   - Login and Start Interview CTA buttons
   - Mobile-responsive hamburger menu

2. **Hero Section**
   - Eye-catching headline with gradient text
   - Compelling value proposition
   - Dual CTA buttons (Start Interview, Watch Demo)
   - Interactive dashboard preview mockup

3. **Trust Metrics**
   - Animated counters showing key statistics
   - 10,000+ Interviews, 95% Satisfaction, 500+ Skills, 24/7 Availability
   - Scroll-triggered animations

4. **Features Section**
   - 6 premium feature cards with hover effects
   - Resume-based questions, adaptive follow-ups, technical & HR prep
   - Performance reports, AI scoring, career insights
   - Icon integration with Lucide React

5. **How It Works**
   - 4-step horizontal timeline
   - Step numbers, icons, and descriptions
   - Connecting lines between steps
   - Responsive grid layout

6. **Interview Experience Showcase**
   - Split-screen design
   - Left: Mock interview UI mockup with question, answer box, progress
   - Right: Benefits list with icons

7. **Candidate Report Preview**
   - Overall score display (8.6/10)
   - Performance breakdown (Technical, Communication, Problem Solving, Confidence)
   - Animated progress bars
   - Action button for full report

8. **Testimonials**
   - 3 professional testimonial cards
   - Star ratings
   - Candidate avatars and roles
   - Real-world success stories

9. **FAQ Section**
   - Accordion-style collapsible questions
   - 6 common questions with detailed answers
   - Smooth open/close animations
   - First item open by default

10. **Final CTA Section**
    - Call-to-action with gradient background
    - Primary and secondary buttons
    - Motivational messaging

11. **Footer**
    - Links organized by sections (Product, Company, Legal)
    - Social media icons (Twitter, LinkedIn, GitHub)
    - Copyright and additional links

## Design System

### Color Palette
```
Primary:    #2563EB (Blue)
Secondary:  #1E293B (Dark Slate)
Background: #FFFFFF (White)
Muted:      #F8FAFC (Light Blue Gray)
Border:     #E2E8F0 (Light Gray)
Text:       #0F172A (Dark Navy)
Subtext:    #64748B (Medium Gray)
Success:    #10B981 (Green)
```

### Typography
- **Headings**: Newsreader (font-bold)
  - H1: text-5xl md:text-6xl
  - H2: text-4xl md:text-5xl
  - H3: text-xl md:text-2xl

- **Body**: Inter (Regular, Medium, Semibold)
  - Base: text-base md:text-lg
  - Small: text-sm

### Animations
- Fade in and slide up on scroll
- Hover scale effects on interactive elements
- Smooth transitions for all state changes
- Progress bar animations
- Accordion open/close animations

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page (imports all sections)
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── TrustMetricsSection.tsx
│   ├── FeaturesSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── InterviewExperienceSection.tsx
│   ├── CandidateReportPreviewSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── FAQSection.tsx
│   ├── FinalCTASection.tsx
│   └── Footer.tsx
├── constants/
│   └── colors.ts           # Color palette definitions
├── lib/
│   └── cn.ts               # Utility for merging classnames
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

1. Navigate to the frontend directory:
```bash
cd "g:\learning ai ml\AI-Interview\frontend"
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page

### Building for Production

```bash
npm run build
npm start
```

## Component Details

### Navbar (`components/Navbar.tsx`)
- Sticky positioning with backdrop blur
- Responsive mobile menu with hamburger icon
- Smooth animations on scroll
- Navigation links with hover effects

### HeroSection (`components/HeroSection.tsx`)
- Large gradient heading with animation
- Badge showing key value proposition
- Dashboard preview mockup with glass morphism effect
- Dual CTA buttons with hover animations

### TrustMetricsSection (`components/TrustMetricsSection.tsx`)
- Animated counter component that triggers on scroll
- Responsive grid layout (2 columns on mobile, 4 on desktop)
- Card-based design with subtle shadows

### FeaturesSection (`components/FeaturesSection.tsx`)
- 6 feature cards in a responsive grid
- Icon integration with Lucide React
- Hover lift animation on cards
- Semibold titles with descriptive text

### HowItWorksSection (`components/HowItWorksSection.tsx`)
- 4-step timeline with connecting lines
- Numbered badges for each step
- Responsive staggered layout
- Smooth animation sequencing

### InterviewExperienceSection (`components/InterviewExperienceSection.tsx`)
- Split-screen design (left/right on desktop, stacked on mobile)
- Mock interview UI with textarea, progress bar, and action buttons
- Benefits list with icons
- Realistic interview simulation mockup

### CandidateReportPreviewSection (`components/CandidateReportPreviewSection.tsx`)
- Large score display (8.6/10)
- Animated progress bars for 4 different dimensions
- Badge showing performance level
- Additional feature cards

### TestimonialsSection (`components/TestimonialsSection.tsx`)
- 3-column grid of testimonial cards
- Star ratings using Lucide icons
- User avatars with initials
- Professional testimonials from tech companies

### FAQSection (`components/FAQSection.tsx`)
- Accordion component with state management
- Smooth open/close animations using AnimatePresence
- First item open by default
- Chevron icon rotation animation

### FinalCTASection (`components/FinalCTASection.tsx`)
- Gradient background from primary color
- Large engaging heading
- Dual CTA buttons (Start Interview, Learn More)
- Background pattern with blur effects

### Footer (`components/Footer.tsx`)
- Dark themed footer with logo
- 3 columns of links (Product, Company, Legal)
- Social media icons (Twitter, LinkedIn, GitHub)
- Copyright information
- Smooth hover animations

## Performance Optimization

- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **CSS Optimization**: Tailwind CSS purges unused styles
- **Image Lazy Loading**: Components use lazy rendering
- **Smooth Scrolling**: HTML scroll-behavior enabled
- **Animation Performance**: Framer Motion uses GPU acceleration

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliant
- Focus states for interactive elements

## Customization

### Changing Colors
Edit the color palette in:
- `constants/colors.ts` - Export colors as constants
- `app/globals.css` - Update theme colors
- `tailwind.config.ts` - Extend color scheme

### Modifying Fonts
Update fonts in:
- `app/layout.tsx` - Change Google Font imports
- `app/globals.css` - Update font family declarations
- `tailwind.config.ts` - Adjust font weights

### Updating Content
Edit text content directly in component files:
- Navigation links: `components/Navbar.tsx`
- Feature descriptions: `components/FeaturesSection.tsx`
- FAQ questions: `components/FAQSection.tsx`
- Testimonials: `components/TestimonialsSection.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## SEO

- Metadata configured in `app/layout.tsx`
- Open Graph tags for social sharing
- Keywords included in metadata
- Semantic HTML structure
- Fast performance (Lighthouse score target: >90)

## Future Enhancements

- [ ] Form validation and submission
- [ ] User authentication integration
- [ ] Backend API integration
- [ ] Email subscription service
- [ ] Analytics tracking
- [ ] Blog section
- [ ] Pricing page
- [ ] User dashboard

## Deployment

The project is ready to be deployed on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js compatible hosting**

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## License

This project is part of the AI Interview platform. All rights reserved.

## Support

For questions or issues, please contact the development team.

---

**Last Updated**: June 2026
**Version**: 1.0.0
**Next.js Version**: 16.2.9
