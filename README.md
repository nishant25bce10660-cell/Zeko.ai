# ⚡ Zeko.ai — Nextlevel Intelligent AI Showcase Platform

> A cinematic, scroll-driven web experience built with **Next.js 16 (App Router)**, **TailwindCSS**, **GSAP ScrollTrigger**, **Lenis**, and **Canvas2D**.

![Zeko.ai Showcase Banner](public/hero-bg.png)

---

## 🌟 Key Features

- **📱 Choreographed Scroll Sequence**: 5 distinct showcase widgets (`01` through `05`) that enter, pin, and recede with hardware-accelerated 60–120 FPS performance (`translate3d`, `opacity`, `scale`).
- **💡 Glassmorphic Navbar with Glowing Feedback**: Top navigation bar featuring real-time active section tracking, glowing pill hover lighting, and tactile click response.
- **💬 Fullscreen AI Chat Workspace**: Interactive AI assistant panel complete with native file attachment upload support, suggestion chips, and responsive design.
- **🎯 1:1 High-Contrast Custom Cursor**: Instant hardware mouse tracking with a solid golden ring, inner dot, and smooth ambient glow overlay.
- **🚀 One-Click Vercel Deployment**: Fully optimized for Next.js App Router static & server rendering.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: TailwindCSS & Custom Glassmorphism System (`globals.css`)
- **Animations**: GSAP & GSAP ScrollTrigger
- **Smooth Scroll Engine**: Lenis
- **Graphics & Ambient Orbs**: HTML5 Canvas2D Context
- **Deployment**: Vercel

---

## 🚀 Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js 18.0+** installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/nishant25bce10660-cell/Zeko.ai.git
cd Zeko.ai
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to preview the site!

---

## 🌐 Deploying to Vercel (1-Click Deployment)

This project is pre-configured for instant deployment on Vercel:

1. Push this codebase to your GitHub repository (`github.com/nishant25bce10660-cell/Zeko.ai`).
2. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and click **Add New Project**.
3. Import your **Zeko.ai** repository.
4. Keep the default settings:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Click **Deploy**!

---

## 📁 File Structure & Component Map

| Component / Folder | Description |
|---|---|
| `app/page.js` | Main scroll orchestrator & GSAP timeline controller |
| `app/globals.css` | Design tokens, custom variables, and global CSS reset |
| `components/ui/Navbar.jsx` | Floating glass navigation bar with glowing hover effects |
| `components/ui/CustomCursor.jsx` | High-contrast 1:1 hardware cursor & ambient opacity glow |
| `components/ui/ChatWidget.jsx` | Fullscreen AI Chat modal with file attachment picker |
| `components/sections/HeroSection.jsx` | `[01]` Hero Overview Showcase Widget |
| `components/sections/SolutionsSection.jsx` | `[02]` Intelligent Solutions Suite Widget |
| `components/sections/PhilosophySection.jsx` | `[03]` Core Human Principles Widget |
| `components/sections/TechnologySection.jsx` | `[04]` Technology Stack Widget |
| `components/sections/AboutSection.jsx` | `[05]` Company Timeline & Stats Widget |
| `lib/useLenis.js` | Lenis smooth scroll engine integration |

---

## 📄 License

Created with conviction. Built for humans. Powered by intelligence.
