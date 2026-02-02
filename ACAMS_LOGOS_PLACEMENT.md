# ACAMS Certification Logos - Placement Guide

## Overview
Added ACAMS certification logos to Slide 2 (ACAMS Prep slide) to showcase the certifications offered.

---

## 📍 Logo Placement

### Visual Layout:
```
┌─────────────────────────────────────────────┐
│                                             │
│  [EXAM PREPARATION]                         │
│                                             │
│  ACAMS Prep — Done Properly.                │
│                                             │
│  Live cohorts, case-led learning...         │
│                                             │
│  [Join ACAMS Prep] [Download Brochure]      │
│                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │CAMS│ │CGSS│ │CAMS│ │CAMS│              │
│  │    │ │    │ │Audit│ │FCI │              │
│  └────┘ └────┘ └────┘ └────┘              │
│         ↑ Certification Logos               │
└─────────────────────────────────────────────┘
```

---

## ✨ Design Features

### 1. **Position**
- **Below CTA buttons** (not overlapping image)
- **Left-aligned** with other content
- **Spacing**: 24-32px gap above logos

### 2. **Logo Cards**
```tsx
bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/20
```
- **Semi-transparent white** background (10% opacity)
- **Backdrop blur** for glass effect
- **Rounded corners** for modern look
- **Subtle border** (20% white opacity)
- **Hover effect**: Brightens to 20% opacity

### 3. **Logo Sizing**
- **Mobile**: 48px × 48px (w-12 h-12)
- **Desktop**: 64px × 64px (w-16 h-16)
- **Spacing**: 16-24px gap between cards

### 4. **Certifications Included**
1. **CAMS** - Certified Anti-Money Laundering Specialist
2. **CGSS** - Certified Global Sanctions Specialist
3. **CAMS-Audit** - CAMS Audit Certification
4. **CAMS-FCI** - CAMS Financial Crimes Investigator

---

## 🎨 Why This Placement Works

### ✅ **Advantages:**

1. **Doesn't Interfere with Image**
   - Logos are in the dark gradient area (left side)
   - Person's face on right remains unobstructed
   - Clean separation of content

2. **Natural Reading Flow**
   - Badge → Headline → Subheadline → Buttons → Certifications
   - Logical progression of information
   - Certifications as supporting evidence

3. **Responsive Design**
   - Stacks nicely on mobile
   - Scales appropriately on desktop
   - Maintains readability at all sizes

4. **Visual Hierarchy**
   - Certifications support the message
   - Don't compete with main CTA
   - Add credibility without distraction

5. **Consistent with Brand**
   - Uses same glass-morphism style
   - Matches button aesthetics
   - Professional appearance

---

## 📁 Required Logo Files

Upload these 4 certification logos to:
```
/public/images/certifications/
```

Files needed:
- `cams.png` - CAMS certification logo
- `cgss.png` - CGSS certification logo
- `cams-audit.png` - CAMS-Audit certification logo
- `cams-fci.png` - CAMS-FCI certification logo

### Logo Specifications:
- **Format**: PNG with transparent background (preferred)
- **Size**: 200×200px minimum (square)
- **Quality**: High resolution for clarity
- **Background**: Transparent or white

---

## 🎯 Alternative Placements Considered

### ❌ **Above Buttons** (Rejected)
- Would push buttons down too far
- Breaks natural flow
- Less emphasis on CTA

### ❌ **Floating on Right Side** (Rejected)
- Would interfere with person's image
- Cluttered appearance
- Hard to position responsively

### ❌ **In Trust Bar** (Rejected)
- Trust bar is for bank/partner logos
- Different purpose/context
- Would be too small

### ✅ **Below Buttons** (Selected)
- Clean, logical flow
- Doesn't interfere with image
- Adds credibility after CTA
- Easy to implement responsively

---

## 📱 Responsive Behavior

### Mobile (<640px):
```
[Button 1]
[Button 2]

[Logo] [Logo]
[Logo] [Logo]
```
- Buttons stack vertically
- Logos in 2×2 grid
- Compact spacing

### Desktop (≥640px):
```
[Button 1] [Button 2]

[Logo] [Logo] [Logo] [Logo]
```
- Buttons side-by-side
- Logos in horizontal row
- Generous spacing

---

## 🔧 Customization Options

If you want to adjust:

### **Logo Size:**
Change `w-12 h-12 md:w-16 md:h-16` to:
- Smaller: `w-10 h-10 md:w-14 md:h-14`
- Larger: `w-14 h-14 md:w-18 md:h-18`

### **Spacing:**
Change `pt-6 md:pt-8` to:
- Less space: `pt-4 md:pt-6`
- More space: `pt-8 md:pt-10`

### **Card Style:**
Modify `bg-white/10` to:
- More opaque: `bg-white/20`
- More transparent: `bg-white/5`

---

## ✨ Final Result

Your ACAMS Prep slide (Slide 2) will now:
- ✅ Say "ACAMS Prep" instead of "CAMS Prep"
- ✅ Display 4 certification logos below buttons
- ✅ Have a professional, modern appearance
- ✅ Showcase your certification offerings
- ✅ Add credibility to the message
- ✅ Work perfectly on all devices

The logos will only appear on Slide 2 (ACAMS Prep) - other slides remain unchanged!
