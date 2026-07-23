# ⚡ Zeko.ai — Nextlevel Intelligent AI Showcase Platform

> A cinematic, scroll-driven web experience built with **Next.js 16 (App Router)**, **TailwindCSS**, **GSAP ScrollTrigger**, **Lenis**, **Canvas2D**, and **OpenRouter / OpenAI Multimodal AI**.

![Zeko.ai Showcase Banner](public/hero-bg.png)

---

## 🌟 Key Features

- **🤖 Multimodal AI Chat Engine**: Fullscreen AI assistant with image, photo, video, and document analysis powered by OpenRouter / OpenAI API.
- **📱 Glitch-Free Choreographed Scroll Sequence**: 5 distinct showcase widgets (`01` through `05`) with hardware-accelerated 60–120 FPS performance (`translate3d`, `opacity`, `scale`).
- **💡 Glassmorphic Navbar with Glowing Feedback**: Top navigation bar featuring real-time active section tracking, glowing pill hover lighting, and tactile click response.
- **🎯 1:1 High-Contrast Custom Cursor**: Instant hardware mouse tracking with a solid golden ring, inner dot, and smooth ambient glow overlay.
- **🔒 Secure API Environment**: Fully protected local keys via `.gitignore` and `.env.local`.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **AI Backend**: OpenRouter API (`/api/chat`) & OpenAI API
- **Styling**: TailwindCSS & Custom Glassmorphism System (`globals.css`)
- **Animations**: GSAP & GSAP ScrollTrigger
- **Smooth Scroll Engine**: Lenis (GSAP Ticker synchronized)
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

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your API key to `.env.local`:
```env
OPENROUTER_API_KEY=your_key_here
```

### 5. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🔒 Security Note & GitHub Upload Guide

Your API key in `.env.local` is **100% private** and is explicitly ignored by `.gitignore`.

### To upload all updated files to GitHub safely:
1. Open your GitHub Repository: `github.com/nishant25bce10660-cell/Zeko.ai`
2. Upload these core folders & files from your local project:
   - 📁 `app/` *(includes `app/api/chat/route.js`)*
   - 📁 `components/`
   - 📁 `lib/`
   - 📁 `public/`
   - 📄 `.env.example`
   - 📄 `.gitignore`
   - 📄 `package.json`
   - 📄 `next.config.mjs`
   - 📄 `jsconfig.json`
   - 📄 `README.md`
   - 📄 `PROJECT_STRUCTURE.md`
3. Commit changes. **`.env.local` will NOT be uploaded**, keeping your key safe!

---

## 🌐 Deploying to Vercel

To deploy your live API key on Vercel:
1. Go to **Vercel Dashboard ➔ Project Settings ➔ Environment Variables**.
2. Add `OPENROUTER_API_KEY` with your secret key.
3. Click **Save** & redeploy!
