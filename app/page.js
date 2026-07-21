'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// UI Components (NO Navbar)
import CustomCursor from '../components/ui/CustomCursor';
import LoadingScreen from '../components/ui/LoadingScreen';
import ChatWidget from '../components/ui/ChatWidget';

// Sections
import HeroSection from '../components/sections/HeroSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import PhilosophySection from '../components/sections/PhilosophySection';
import TechnologySection from '../components/sections/TechnologySection';
import AboutSection from '../components/sections/AboutSection';

// WebGL Background
import BackgroundScene from '../components/webgl/BackgroundScene';

// Smooth Scroll
import { useLenis } from '../lib/useLenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section title labels for the cinematic scroll reveal.
 * These map 1:1 with the section components below.
 */
const SECTION_TITLES = [
  'Home',
  'Solutions',
  'Philosophy',
  'Technology',
  'About',
];

/**
 * Main Page Orchestrator
 *
 * No navigation bar. The user scrolls through cinematic scenes.
 * As each section enters, its title fades in as a large overlay label,
 * then dissolves into the actual section content.
 */
export default function Home() {
  const mainRef = useRef(null);
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Sync Lenis ↔ GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // ── Cinematic section transitions ──────────────────────────
    const sections = gsap.utils.toArray('.section');
    const titleOverlays = gsap.utils.toArray('.section-title-overlay');

    sections.forEach((section, i) => {
      const titleEl = titleOverlays[i];

      // ── Incoming title fade-in ──
      // As the user scrolls INTO this section, the big title label
      // fades from 0 → 1 in the first 30% of scroll, then fades
      // back out in the next 30% to reveal the actual content.
      if (titleEl) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'top 10%',
          scrub: 1.2, // Higher = smoother interpolation
          onUpdate: (self) => {
            const p = self.progress;
            // Smooth ease curve applied to progress
            const ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            if (ep < 0.5) {
              const fadeIn = ep / 0.5;
              gsap.set(titleEl, {
                opacity: fadeIn,
                y: 30 - fadeIn * 30,
                filter: `blur(${(1 - fadeIn) * 8}px)`,
              });
            } else {
              const fadeOut = 1 - (ep - 0.5) / 0.5;
              gsap.set(titleEl, {
                opacity: fadeOut,
                y: -(1 - fadeOut) * 20,
                filter: `blur(${(1 - fadeOut) * 4}px)`,
              });
            }
          },
        });
      }

      // ── Outgoing dissolve effect ──
      // Smoother dissolve with higher scrub for premium feel
      if (i < sections.length - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          scrub: 1.5, // Very smooth interpolation
          onUpdate: (self) => {
            const p = self.progress;
            if (p > 0.3) {
              const leave = (p - 0.3) / 0.7;
              gsap.set(section, {
                scale: 1 - leave * 0.08,
                filter: `blur(${leave * 12}px) brightness(${1 - leave * 0.4})`,
                opacity: 1 - leave,
              });
            } else {
              gsap.set(section, {
                scale: 1,
                filter: 'blur(0px) brightness(1)',
                opacity: 1,
              });
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(rafCallback);
    };
  }, [lenisRef]);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <BackgroundScene />
      <ChatWidget />

      <main ref={mainRef}>
        {/* Section title overlays — positioned inside each section */}
        {[
          { component: <HeroSection />, id: 'home' },
          { component: <SolutionsSection />, id: 'solutions' },
          { component: <PhilosophySection />, id: 'philosophy' },
          { component: <TechnologySection />, id: 'technology' },
          { component: <AboutSection />, id: 'about' },
        ].map(({ component, id }, i) => (
          <div key={id} style={{ position: 'relative' }}>
            {/* The large cinematic title that fades during scroll */}
            {i > 0 && (
              <div
                className="section-title-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 5,
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #F9A826, #FFC857)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textTransform: 'uppercase',
                  }}
                >
                  {SECTION_TITLES[i]}
                </span>
              </div>
            )}
            {component}
          </div>
        ))}
      </main>
    </>
  );
}
