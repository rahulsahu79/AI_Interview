# InterviewAI Landing Page - Quick Reference Guide

## 🚀 Quick Start

```bash
# Navigate to project
cd "g:\learning ai ml\AI-Interview\frontend"

# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

## 📁 Component Map

| Section | File | Purpose |
|---------|------|---------|
| Navigation | `components/Navbar.tsx` | Sticky header with links and CTAs |
| Hero | `components/HeroSection.tsx` | Main headline, value prop, dashboard preview |
| Metrics | `components/TrustMetricsSection.tsx` | Animated stats (10k interviews, etc) |
| Features | `components/FeaturesSection.tsx` | 6 feature cards with icons |
| Process | `components/HowItWorksSection.tsx` | 4-step timeline |
| Interview UI | `components/InterviewExperienceSection.tsx` | Split-screen interview mockup |
| Reports | `components/CandidateReportPreviewSection.tsx` | Score display and analytics |
| Social Proof | `components/TestimonialsSection.tsx` | 3 testimonial cards |
| FAQ | `components/FAQSection.tsx` | Accordion with 6 questions |
| CTA | `components/FinalCTASection.tsx` | Bottom call-to-action |
| Footer | `components/Footer.tsx` | Links, social icons, copyright |

## 🎨 Color Reference

Use these hex codes for consistency:

```
Blue (Primary):     #2563EB
Dark Slate:         #1E293B
White:              #FFFFFF
Light Gray:         #F8FAFC
Border Gray:        #E2E8F0
Dark Text:          #0F172A
Medium Gray:        #64748B
Green (Success):    #10B981
```

## 📝 Common Tasks

### Change a Heading
- Edit the `<h1>`, `<h2>`, `<h3>` text directly in component
- Or modify in `HeroSection.tsx`, `FeaturesSection.tsx`, etc.

### Add a Feature
1. Open `components/FeaturesSection.tsx`
2. Add new object to `features` array:
```typescript
{
  icon: YourIcon,
  title: "Feature Name",
  description: "Description text"
}
```

### Update Colors
1. In `tailwind.config.ts`, update the `colors` extend section
2. Or use inline Tailwind classes: `bg-[#2563EB]`

### Add Section
1. Create new component: `components/YourSection.tsx`
2. Export default component
3. Import in `app/page.tsx`
4. Add to main JSX

### Update Fonts
1. In `app/layout.tsx`, import from Google Fonts
2. Configure in layout root `<html>` className
3. Update `globals.css` with `@theme` rules

## 🎬 Animation Patterns

All animations use Framer Motion. Common patterns:

```typescript
// Fade in on view
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Hover effect
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Clickable
</motion.div>
```

## 🔗 Navigation Links

Navigation links should use hash anchors:
- Features: `#features`
- How It Works: `#how-it-works`
- Pricing: `#pricing`
- FAQ: `#faq`

These are scroll anchors on the page.

## 📱 Responsive Breakpoints

Tailwind breakpoints used:
- `sm:` = 640px (small screens)
- `md:` = 768px (medium screens)
- `lg:` = 1024px (large screens)
- `xl:` = 1280px (extra large)

## 🧪 Testing Checklist

- [ ] Mobile view (320px width)
- [ ] Tablet view (768px width)
- [ ] Desktop view (1200px+ width)
- [ ] All buttons clickable
- [ ] All animations smooth
- [ ] Images load properly
- [ ] No console errors
- [ ] Links work correctly

## 🐛 Debugging

### TypeScript Errors
```bash
# Check for type errors
npm run build

# Or in VS Code, look at Problems panel
```

### Build Errors
```bash
# Clean build
rm -r .next
npm run build
```

### Performance
```bash
# Analyze bundle
npm run build

# Check Lighthouse score
# Build → inspect in Chrome DevTools
```

## 📚 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main landing page (imports all sections) |
| `app/layout.tsx` | Root layout, fonts, metadata |
| `app/globals.css` | Global styles and Tailwind imports |
| `tailwind.config.ts` | Tailwind customization |
| `constants/colors.ts` | Color constants |
| `lib/cn.ts` | Utility for className merging |

## 🎯 Font Sizes (for Tailwind)

- `text-5xl` - Extra large (hero titles)
- `text-4xl` - Large (section titles)
- `text-2xl` - Medium-large (subheadings)
- `text-xl` - Medium (card titles)
- `text-lg` - Normal (body text)
- `text-base` - Base (default)
- `text-sm` - Small (labels, captions)

## 🔄 State Management

FAQ section uses React `useState`:
```typescript
const [openIndex, setOpenIndex] = useState<number | null>(0);
```

Navbar uses `useState` for mobile menu:
```typescript
const [isOpen, setIsOpen] = useState(false);
```

## 📦 Built-in Components

Using these libraries:
- **Lucide React**: Icons (Upload, Brain, CheckCircle, etc.)
- **Framer Motion**: Animations (motion.div, AnimatePresence, etc.)
- **Tailwind CSS**: Styling (utility classes)
- **Next.js**: Framework (Image, Link, etc.)

## 💾 Saving Work

All changes auto-save. To ensure everything compiles:
```bash
npm run build
```

## 🚢 Deployment

Ready to deploy to:
1. **Vercel**: `vercel` command
2. **Netlify**: Connect GitHub repo
3. **AWS Amplify**: Deploy from repo

## 📞 Component Props

Most components accept `children` or are self-contained. No external props needed for the landing page - all data is hardcoded for now.

Future: Convert to accept data props for dynamic content.

## ⚡ Performance Tips

- Images optimized with Next.js Image component (when used)
- Tailwind CSS purges unused styles
- Framer Motion uses GPU acceleration
- Scroll animations are performance-optimized
- Lazy-loaded animations with `once: true` in viewport

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: June 2026
**Version**: 1.0.0
