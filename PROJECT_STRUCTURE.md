# 🚀 Zeko.ai — Project & Debugging Architecture Guide

This project is built using **Next.js 16 (App Router)**, **TailwindCSS**, **GSAP ScrollTrigger**, **Lenis**, **Canvas2D**, and **OpenRouter / OpenAI Multimodal AI**.

---

## 📁 Directory Structure & File Map

```text
D:\zeko-ai/
├── 📁 app/                         <-- Core Next.js App Router & API System
│   ├── 📁 api/
│   │   └── 📁 chat/
│   │       └── route.js           <-- Next.js API Route (OpenRouter / OpenAI Multimodal AI)
│   ├── globals.css                <-- Global CSS variables, fonts, reset, and dark theme
│   ├── layout.js                 <-- Root metadata, SEO tags, and HTML wrapper
│   └── page.js                   <-- Scroll Orchestrator: Glitch-free ScrollTrigger sequence
│
├── 📁 components/
│   ├── 📁 ui/                     <-- Core Interactive UI Components
│   │   ├── Navbar.jsx             <-- Floating Glass Navigation Bar with glowing pill feedback
│   │   ├── CustomCursor.jsx       <-- 1:1 Instant hardware cursor & golden opacity glow
│   │   ├── ChatWidget.jsx         <-- Fullscreen Multimodal AI Chat & single-container scroll
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
│       └── BackgroundScene.jsx    <-- GPU-optimized ambient canvas particles
│
├── 📁 lib/                        <-- Utilities & Smooth Scroll Hooks
│   ├── useLenis.js                <-- Lenis smooth scroll engine synchronized with GSAP ticker
│   └── animations.js             <-- Shared GSAP animation utilities
│
├── 🔒 .env.local                 <-- LOCAL ONLY: Private API keys (Ignored by .gitignore)
├── 📄 .env.example               <-- Public template for environment setup
└── 📁 public/                     <-- Static Assets
    └── hero-bg.png                <-- Main hero celestial hands background image
```

---

## 🔒 Security Best Practices

- Real API keys (`OPENROUTER_API_KEY`, `OPENAI_API_KEY`) live in `.env.local`.
- `.gitignore` prevents `.env.local` from ever being pushed to GitHub.
- For Vercel production deployment, add `OPENROUTER_API_KEY` under **Vercel Dashboard ➔ Settings ➔ Environment Variables**.

---

## 🛠️ Quick Debugging Reference

| If you want to debug or edit... | Open this file: |
|---|---|
| **AI Backend & OpenRouter / Multimodal API** | `app/api/chat/route.js` |
| **Fullscreen AI Chat UI & Single-Container Scroll** | `components/ui/ChatWidget.jsx` |
| **Scroll Animations & Section Reveals** | `app/page.js` |
| **Lenis & GSAP Clock Synchronization** | `lib/useLenis.js` |
| **Top Navigation Bar & Glowing Effects** | `components/ui/Navbar.jsx` |
| **Cursor Position & Ambient Glow Overlay** | `components/ui/CustomCursor.jsx` |
| **Hero Image & Overview Card** | `components/sections/HeroSection.jsx` |
| **Solutions 2x2 Grid Cards** | `components/sections/SolutionsSection.jsx` |
| **Philosophy Quote & 3 Pillars** | `components/sections/PhilosophySection.jsx` |
| **Tech Stack Items & Grid** | `components/sections/TechnologySection.jsx` |
| **About Section & Timeline** | `components/sections/AboutSection.jsx` |
| **Global Theme Colors & Fonts** | `app/globals.css` |
