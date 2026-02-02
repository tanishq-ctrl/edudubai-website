# Hero Carousel - Final Design: Background Image with Left-Aligned Content

## Overview
The hero carousel now uses full-screen background images with left-aligned content, allowing the main subject (faces, people) to appear naturally on the right side of the image.

---

## 🎨 Design Structure

### Layout
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [BADGE]                                        │
│                                                 │
│  Big Headline                    [Person/Face]  │
│  Text Here                       [On Right]     │
│                                                 │
│  Subheadline text                               │
│                                                 │
│  [Button 1] [Button 2]                          │
│                                                 │
└─────────────────────────────────────────────────┘
     ↑                                    ↑
  Content Left                    Image Subject Right
```

---

## ✨ Key Features

### 1. **Full-Screen Background Image**
```tsx
<div className="absolute inset-0">
  <Image
    src={slide.image}
    alt={slide.imageAlt}
    fill
    className="object-cover object-right"
    sizes="100vw"
  />
</div>
```
- Image fills entire screen
- `object-right` positioning keeps main subject on right
- Full-screen immersive experience

### 2. **Left-to-Right Gradient Overlay**
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
```
- **Stronger on left** (70% opacity) for text readability
- **Lighter in middle** (40% opacity) for transition
- **Transparent on right** to show image subject clearly
- Additional top/bottom gradient for depth

### 3. **Left-Aligned Content**
```tsx
<div className="max-w-2xl text-left space-y-6 lg:space-y-8">
```
- Content constrained to left side (max-w-2xl)
- Text aligned left (not centered)
- Leaves right side open for image subject
- Professional, modern layout

### 4. **Responsive Behavior**
- **Desktop**: Content on left, image subject visible on right
- **Mobile**: Content centered, gradient ensures readability
- **All devices**: Full-screen immersive experience

---

## 🖼️ Image Requirements

### Composition Guidelines

#### For Best Results, Your Images Should:

1. **Main Subject on Right**
   - Person/face positioned on right side
   - Looking toward left (toward text)
   - Takes up right 40-50% of image

2. **Empty/Simple Left Side**
   - Left 50-60% should be simpler
   - Darker or less busy background
   - Room for text overlay

3. **Horizontal Orientation**
   - Landscape format (16:9 or similar)
   - Wide enough for split composition
   - Minimum 1920x1080px

#### Example Compositions:

**Good:**
```
┌─────────────────────────────────────┐
│                                     │
│  [Simple Background]    [Person]    │
│  [Darker Area]          [Face]      │
│  [Text Goes Here]       [Looking←]  │
│                                     │
└─────────────────────────────────────┘
```

**Avoid:**
```
┌─────────────────────────────────────┐
│                                     │
│       [Person Centered]             │
│       [Face in Middle]              │
│       [No Room for Text]            │
│                                     │
└─────────────────────────────────────┘
```

---

## 📐 Technical Specifications

### Image Settings
```tsx
className="object-cover object-right"
```
- **object-cover**: Fills entire space, may crop
- **object-right**: Anchors to right side
- Ensures main subject stays visible on right

### Gradient Overlay
```tsx
from-black/70 via-black/40 to-transparent
```
- **Left (70%)**: Dark enough for white text
- **Middle (40%)**: Smooth transition
- **Right (0%)**: Fully transparent, shows image

### Content Container
```tsx
<div className="max-w-2xl text-left">
```
- **max-w-2xl**: ~672px width
- Leaves plenty of room for image on right
- Professional reading width

---

## 🎨 AI Image Prompts

### Slide 1: CAMS Exam Prep
```
Professional woman in business attire sitting at desk with laptop, 
positioned on right side of frame, looking left toward camera with 
confident smile, modern office background on right, simple darker 
background on left side, professional corporate photography, bright 
natural lighting, 16:9 landscape orientation, high quality
```

### Slide 2: Sanctions & TBML
```
Professional businessman in suit holding tablet, positioned on right 
side of frame, looking left, confident pose, modern office or city 
background on right, darker gradient background on left, professional 
corporate photography, navy blue and gold color accents, 16:9 landscape
```

### Slide 3: Corporate Training
```
Professional trainer or business person, positioned on right side of 
frame, looking left toward camera, confident and approachable expression, 
modern conference room or office on right, simple darker background on 
left for text overlay, professional photography, bright lighting, 16:9
```

### Key Elements for AI:
- "positioned on right side of frame"
- "looking left" or "looking toward camera"
- "simple darker background on left"
- "16:9 landscape orientation"
- "professional corporate photography"
- "bright natural lighting"

---

## 🎯 Design Benefits

### Visual Hierarchy
✅ **Text on left** - First thing users see (F-pattern reading)
✅ **Image on right** - Supports and reinforces message
✅ **Natural flow** - Left to right reading direction

### Readability
✅ **Strong gradient** - Ensures text is always readable
✅ **Left-aligned** - Easier to read than centered
✅ **Consistent positioning** - Users know where to look

### Professional Appearance
✅ **Modern layout** - Matches current design trends
✅ **Clean composition** - Text and image don't compete
✅ **Balanced** - Visual weight distributed properly

### Flexibility
✅ **Works with any image** - Gradient ensures readability
✅ **Responsive** - Adapts to all screen sizes
✅ **Carousel-ready** - Multiple slides work seamlessly

---

## 📱 Responsive Behavior

### Desktop (≥1024px)
```
┌─────────────────────────────────────┐
│ [Text]              [Image Subject] │
│ [Left]              [Right]         │
└─────────────────────────────────────┘
```
- Full split-screen effect
- Text clearly on left
- Image subject visible on right

### Tablet (768px - 1023px)
```
┌─────────────────────────┐
│ [Text]    [Image]       │
│ [Left]    [Subject]     │
└─────────────────────────┘
```
- Slightly compressed
- Still maintains left/right split
- Gradient ensures readability

### Mobile (<768px)
```
┌───────────────┐
│               │
│   [Text]      │
│   [Center]    │
│               │
└───────────────┘
```
- Content more centered
- Image still visible in background
- Strong gradient for readability

---

## 🚀 Comparison with Previous Designs

### vs. Centered Content
**Before**: Text centered, competed with image
**Now**: Text left, image right, clear separation ✅

### vs. Solid Background
**Before**: No background image, less engaging
**Now**: Full-screen image, more immersive ✅

### vs. Floating Image
**Before**: Separate image element, complex layout
**Now**: Background image, simpler, cleaner ✅

---

## ✨ Final Result

Your hero carousel now features:
- ✅ **Full-screen background images** for immersion
- ✅ **Left-aligned content** for professionalism
- ✅ **Right-positioned subjects** (faces/people)
- ✅ **Smart gradient overlay** for readability
- ✅ **Clean, modern design** that works with any image
- ✅ **Responsive** across all devices
- ✅ **Professional appearance** matching industry standards

The design allows your images' main subjects (people, faces) to appear naturally on the right side while keeping all text content clean and readable on the left!

---

## 📝 Image Checklist

When creating/selecting images:
- [ ] Main subject (person/face) on right side
- [ ] Subject looking left or toward camera
- [ ] Simple/darker background on left 40-50%
- [ ] Landscape orientation (16:9 preferred)
- [ ] High resolution (1920x1080 minimum)
- [ ] Professional photography style
- [ ] Good lighting on subject
- [ ] Not too busy/cluttered overall

Perfect images will have the person/face clearly visible on the right while leaving the left side relatively simple for text overlay!
