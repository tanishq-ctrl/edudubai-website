# Hero Carousel - CAMS Prep Style Redesign

## Overview
Complete redesign of the hero carousel inspired by CAMS Prep's professional split-screen layout with solid background and modern positioning.

---

## 🎨 Design Changes

### Layout Transformation

#### Before: Full-Screen Image Carousel
- Background: Full-screen photo with dark overlay
- Content: Centered text over image
- Style: Traditional hero banner

#### After: Split-Screen Modern Layout
- Background: Solid brand navy gradient
- Content: Left-aligned text + Right-side image
- Style: Modern, professional split-screen

---

## ✨ Key Features

### 1. **Solid Background with Subtle Pattern**
```tsx
bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy
```
- Professional navy blue gradient
- Subtle decorative radial gradients for depth
- No distracting background images

### 2. **Split-Screen Grid Layout**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
```
- **Left Side**: Content (text + buttons)
- **Right Side**: Product/feature image
- Responsive: Stacks on mobile, side-by-side on desktop

### 3. **Left-Aligned Content**
```tsx
<div className="text-left space-y-6 lg:space-y-8">
```
- Text aligned left (not centered)
- More professional, modern look
- Easier to read
- Better visual hierarchy

### 4. **Floating Image with Animation**
```tsx
<div className="absolute inset-0 animate-float">
```
- Image floats gently (subtle up/down animation)
- Object-contain (not cropped)
- Drop shadow for depth
- Hidden on mobile (text-only)

### 5. **Refined Badge Design**
```tsx
<span className="px-4 py-2 bg-brand-gold text-brand-navy text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-lg">
```
- Rectangular badge (not pill-shaped)
- Solid gold background
- Navy text for contrast
- Professional appearance

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌──────────────┐  ┌──────────────┐           │
│  │              │  │              │           │
│  │  [BADGE]     │  │              │           │
│  │              │  │              │           │
│  │  Headline    │  │    Image     │           │
│  │  Text Here   │  │   Floating   │           │
│  │              │  │              │           │
│  │  Subheadline │  │              │           │
│  │              │  │              │           │
│  │  [Button 1]  │  │              │           │
│  │  [Button 2]  │  │              │           │
│  │              │  │              │           │
│  └──────────────┘  └──────────────┘           │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🖼️ Image Recommendations

### What to Create with AI

For each slide, create images that show:

#### Slide 1: CAMS Prep
**Concept**: Professional studying/learning
- Person at desk with laptop
- Floating UI cards showing "CAMS Flashcards", "Mock Tests", "Chapter Tests"
- Modern, clean aesthetic
- Professional attire
- Bright, optimistic lighting

**AI Prompt Example**:
```
Professional woman in business casual attire sitting at modern desk with laptop, 
smiling confidently, floating holographic UI cards showing "CAMS Flashcards" 
and "Mock Tests" around her, clean white and blue color scheme, professional 
photography style, bright natural lighting, modern office background
```

#### Slide 2: Sanctions & TBML
**Concept**: Global compliance/international finance
- Person with tablet/laptop
- Floating cards showing "Sanctions Compliance", "TBML Detection"
- World map or global elements in background
- Professional, authoritative feel

**AI Prompt Example**:
```
Professional businessman in suit holding tablet, confident pose, floating 
holographic cards showing "Sanctions Compliance" and "TBML Mastery", 
world map hologram in background, navy blue and gold color scheme, 
professional corporate photography, modern office setting
```

#### Slide 3: Corporate Training
**Concept**: Team collaboration/training
- Group of professionals or single trainer
- Floating cards showing "Corporate Programs", "Team Training", "Custom Solutions"
- Collaborative, energetic feel

**AI Prompt Example**:
```
Professional trainer presenting to camera, confident smile, floating holographic 
UI cards showing "Corporate Training" and "Custom Programs", modern conference 
room background, professional attire, navy and gold color scheme, bright 
professional lighting, corporate photography style
```

### Image Specifications

**Dimensions**: 
- Width: 1200-1600px
- Height: 1200-1600px (square or portrait orientation works best)

**Format**: 
- PNG with transparent background (preferred)
- Or JPG with clean white/light background

**Style Guidelines**:
- Professional photography aesthetic
- Clean, modern look
- Person should be on right side of image (facing left)
- Leave space on left for text
- Bright, well-lit
- Minimal background distractions
- Floating UI elements should be subtle, not overwhelming

**Color Scheme**:
- Primary: Navy blue (#1e3a5f)
- Accent: Gold (#d4af37)
- Background: White or light gray
- UI cards: White with subtle shadows

---

## 🎯 Comparison with CAMS Prep

### Similarities
✅ Split-screen layout
✅ Left-aligned text
✅ Solid background color
✅ Floating product/feature images
✅ Professional badge/tag
✅ Clean, modern aesthetic
✅ Person + UI elements composition

### Differences (Your Advantages)
✅ **Carousel functionality** - Multiple slides vs single static
✅ **Brand colors** - Navy & Gold (more professional than pure blue)
✅ **Floating animation** - Subtle movement for engagement
✅ **Better buttons** - Larger, more prominent CTAs
✅ **Responsive design** - Better mobile experience

---

## 📱 Responsive Behavior

### Mobile (< 1024px)
- Single column layout
- Text only (image hidden)
- Full-width buttons
- Centered content
- Compact spacing

### Desktop (≥ 1024px)
- Two-column grid
- Text left, image right
- Side-by-side buttons
- Generous spacing
- Floating image animation

---

## 🎨 Styling Details

### Background
```tsx
bg-gradient-to-br from-brand-navy via-brand-navy-dark to-brand-navy
```
- Subtle gradient for depth
- Decorative radial patterns (10% opacity)
- Professional, not distracting

### Typography
- **Headline**: 4xl → 7xl (responsive)
- **Subheadline**: lg → xl (responsive)
- **Badge**: xs → sm (responsive)
- All white text for contrast

### Spacing
- Vertical: `space-y-6 lg:space-y-8`
- Grid gap: `gap-8 lg:gap-12`
- Button gap: `gap-4`

### Buttons
- Size: `xl` (h-14, px-10, text-lg)
- Min width: `220px`
- Primary: Gold gradient
- Secondary: Transparent with white border

---

## 🚀 Implementation Benefits

### User Experience
✅ **Clearer focus** - No competing background images
✅ **Better readability** - High contrast text
✅ **Professional appearance** - Modern, trustworthy
✅ **Faster loading** - Smaller images (not full-screen)

### Technical
✅ **Better performance** - Solid background vs large images
✅ **Easier maintenance** - Simple image requirements
✅ **Flexible content** - Easy to update text/images
✅ **Responsive** - Works great on all devices

### Brand
✅ **Consistent colors** - Navy & gold throughout
✅ **Professional image** - Matches industry standards
✅ **Modern aesthetic** - Current design trends
✅ **Memorable** - Distinctive split-screen layout

---

## 📝 Next Steps

### 1. Create Images
Use AI tools (Midjourney, DALL-E, Stable Diffusion) to create:
- 3-4 hero images following the specifications above
- Each showing a person + floating UI elements
- Professional, clean aesthetic

### 2. Upload Images
Replace current images in `/public/hero/`:
- `slide-1.jpg` → CAMS Prep concept
- `slide-2.jpg` → Sanctions/TBML concept
- `slide-3.jpg` → Corporate Training concept
- `slide-4.jpg` → (optional) Additional concept

### 3. Adjust Content
Update slide data in `hero-carousel.tsx` if needed:
- Refine headlines
- Adjust subheadlines
- Update CTAs

---

## ✨ Final Result

Your hero carousel now features:
- ✅ **Modern split-screen layout** like CAMS Prep
- ✅ **Professional solid background** (navy gradient)
- ✅ **Left-aligned content** for better readability
- ✅ **Floating images** with subtle animation
- ✅ **Clean, premium aesthetic**
- ✅ **Excellent first impression**
- ✅ **Responsive design** for all devices

The design is inspired by CAMS Prep but enhanced with carousel functionality, better branding, and improved user experience!
