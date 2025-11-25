# HopeNest Foundation Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern charity/nonprofit websites (UNICEF, Red Cross, Charity: Water) that prioritize emotional connection, trust-building, and clear calls-to-action while maintaining simplicity and accessibility.

## Core Design Principles
- **Warmth & Trust**: Create emotional connection through gentle, welcoming design
- **Clarity & Action**: Clear hierarchy guiding users toward donation
- **Minimalism**: Remove visual noise; every element serves a purpose

## Typography
**Font Stack** (via Google Fonts CDN):
- **Headings**: Poppins (400, 600, 700) - modern, friendly, approachable
- **Body**: Open Sans (400, 600) - highly readable, professional

**Type Scale**:
- Hero Headline: 3rem (mobile) / 4.5rem (desktop), Poppins 700
- Section Headings: 2rem (mobile) / 3rem (desktop), Poppins 600
- Subheadings: 1.25rem, Poppins 600
- Body Text: 1rem / 1.125rem, Open Sans 400
- Small Text: 0.875rem, Open Sans 400

## Layout System
**Spacing Units**: Use consistent units of 8, 16, 24, 32, 48, 64px
- Section vertical padding: 64px (mobile) / 96px (desktop)
- Component spacing: 24px between elements
- Text line-height: 1.6 for body, 1.2 for headings

**Container Max-Width**: 1200px for content sections

## Color Palette
- **Primary White**: #FFFFFF (backgrounds, card surfaces)
- **Light Grey**: #F5F5F5 (alternate section backgrounds)
- **Gentle Orange**: #FF9966 (primary CTA, accents, highlights)
- **Darker Orange**: #E67A47 (CTA hover states)
- **Text Dark**: #2C2C2C (primary text)
- **Text Medium**: #6B6B6B (secondary text)

## Navigation
**Sticky Header**:
- White background with subtle shadow on scroll
- Logo (left): "HopeNest Foundation" in Poppins 600, gentle orange color
- Navigation links (right): Home, About, Mission, Donate, Contact
- Mobile: Hamburger menu (top-right) with slide-in menu overlay
- Height: 80px, smooth transition when sticky

## Page Structure & Components

### 1. Hero Section (Full Viewport)
- Full-width background image with gentle overlay (rgba(0,0,0,0.3))
- Centered content: Foundation name, tagline, mission statement
- Large "Donate Now" button with blur background effect (rgba(255,255,255,0.15), backdrop-filter: blur(10px))
- Subtle scroll indicator at bottom

### 2. About Us Section
- White background
- Two-column layout (desktop): Image left (40%), text right (60%)
- Single column mobile (image stacks above text)
- Heading + 2-3 paragraphs describing foundation goals

### 3. Mission Section
- Light grey (#F5F5F5) background for contrast
- Centered heading
- 3-column grid (desktop) / single column (mobile) with mission bullet points
- Each item: Icon (Font Awesome), heading, description
- Icons in gentle orange color

### 4. Donation Section
- White background
- Centered content with prominent heading "Support Our Cause"
- Subheading explaining donation impact
- PayPal button (centered, large)
- Alternative bank details below in smaller text
- Trust indicators (secure donation message)

### 5. Contact Section
- Light grey background
- Three contact cards in row (desktop) / stacked (mobile)
- Each card: Icon, label, information
  - Email icon + email address
  - Phone icon + phone number
  - Location icon + physical address
- Icons in gentle orange

### 6. Footer
- Dark grey background (#2C2C2C), white text
- Centered copyright: "© 2024 HopeNest Foundation. All rights reserved."
- Padding: 32px vertical

## Animations
**Scroll-Triggered Entrance** (using Intersection Observer):
- Fade-in + slide-up (20px) when sections enter viewport
- Duration: 0.8s, ease-out timing
- Apply to: About, Mission cards, Donation section, Contact cards

**Smooth Scroll**: Enable CSS `scroll-behavior: smooth` for anchor navigation

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Icons
**Font Awesome** (via CDN): Use for mission icons, contact icons, and social elements
- Heart, hands-helping, globe for mission items
- Envelope, phone, map-marker for contact

## Images

### Hero Background Image
- **Description**: Warm, uplifting photo showing diverse people helping each other - could be volunteers distributing food, children smiling in a community setting, or hands joined together in unity. Avoid overly staged corporate charity photos; aim for authentic, hopeful moments.
- **Placement**: Full-width hero section background (100vw x 100vh)
- **Treatment**: Subtle dark overlay (30% opacity) to ensure text readability
- **Style**: Natural lighting, warm tones, genuine human connection

### About Us Image
- **Description**: Foundation team or volunteers in action - authentic candid photo of the organization's work in the field
- **Placement**: Left side of About section (40% width on desktop)
- **Style**: Professional but warm, matches hero aesthetic

## Button Specifications
**Primary CTA ("Donate Now")**:
- Background: Gentle orange (#FF9966) with blur effect when on images
- Text: White, Poppins 600, 1.125rem
- Padding: 16px 48px
- Border-radius: 30px (pill shape)
- Hover: Scale to 1.05, darker orange background
- Active: Scale to 0.98

**PayPal Button**: Use PayPal's standard button styling (provided by integration)