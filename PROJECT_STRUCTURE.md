# 🚀 Zeko.ai — Project & Debugging Architecture Guide

This project is built using **Next.js 16 (App Router)**, **TailwindCSS**, **GSAP ScrollTrigger**, **Lenis**, and **Canvas2D**.

---

## 📁 Directory Structure & File Map

```text
D:\zeko-ai/
├── 📁 app/                         <-- Core Next.js Page & Global System
│   ├── globals.css                <-- Global CSS variables, fonts, reset, and dark theme
│   ├── layout.js                 <-- Root metadata, SEO tags, and HTML wrapper
│   └── page.js                   <-- Main Orchestrator: ScrollTrigger widget sequence
│
├── 📁 components/
│   ├── 📁 ui/                     <-- Core Interactive UI Components
│   │   ├── Navbar.jsx             <-- Floating Glass Navigation Bar with glowing pill feedback
│   │   ├── CustomCursor.jsx       <-- 1:1 Instant hardware cursor & golden opacity glow
│   │   ├── ChatWidget.jsx         <-- Fullscreen AI Chat Window & native file attachment picker
│   │   ├── LoadingScreen.jsx      <-- Opening golden glow loading animation
│   │   ├── MagneticButton.jsx     <-- Magnetic cursor attraction wrapper
│   │   └── AnimatedText.jsx       <-- Character reveal animation helper
│   │
│   ├── 📁 sections/               <-- 5 Scroll Showcase Widgets (Video Style)
│   │   ├── HeroSection.jsx        <-- [01] Hero / Overview Showcase Widget
│   │   ├── SolutionsSection.jsx   <-- [02] Solutions Suite Showcase Widget
│   │   ├── PhilosophySection.jsx  <-- [03] Philosophy Principles Showcase Widget
│   │   ├── TechnologySection.jsx  <-- [04] Technology Stack Showcase Widget
│   │   └── AboutSection.jsx       <-- [05] Company & Ecosystem Showcase Widget
│   │
│   └── 📁 webgl/
│       └── BackgroundScene.jsx    <-- 30fps GPU-optimized ambient canvas particles
│
├── 📁 lib/                        <-- Utilities & Smooth Scroll Hooks
│   ├── useLenis.js                <-- Lenis smooth scroll engine configuration
│   └── animations.js             <-- Shared GSAP animation utilities
│
└── 📁 public/                     <-- Static Assets
    └── hero-bg.png                <-- Main hero celestial hands background image
```

---

## 🛠️ Quick Debugging Reference

| If you want to debug or edit... | Open this file: |
|---|---|
| **Scroll Animations / Widget Sequence** | `app/page.js` |
| **Top Navigation Bar & Glowing Effects** | `components/ui/Navbar.jsx` |
| **Cursor Position, Speed, or Glow Overlay** | `components/ui/CustomCursor.jsx` |
| **Fullscreen AI Chat Window & Attachments** | `components/ui/ChatWidget.jsx` |
| **Hero Image, Stats, or Overview Card** | `components/sections/HeroSection.jsx` |
| **Solutions 2x2 Grid Cards** | `components/sections/SolutionsSection.jsx` |
| **Philosophy Quote & 3 Pillars** | `components/sections/PhilosophySection.jsx` |
| **Tech Stack Items & Grid** | `components/sections/TechnologySection.jsx` |
| **About Section & Timeline** | `components/sections/AboutSection.jsx` |
| **Background Particle Orbs** | `components/webgl/BackgroundScene.jsx` |
| **Global Theme Colors & Fonts** | `app/globals.css` |

---

## 🚢 Deployment Steps for GitHub & Vercel

1. Open your GitHub Repository: `github.com/nishant25bce10660-cell/Zeko.ai`
2. Make sure the root level contains these **4 core folders**:
   - `app/`
   - `components/`
   - `lib/`
   - `public/`
3. Also upload `package.json`, `next.config.mjs`, and `jsconfig.json`.
4. Vercel will automatically build and deploy the Next.js app seamlessly!
