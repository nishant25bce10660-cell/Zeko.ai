'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// UI & Navigation Components
import Navbar from '../components/ui/Navbar';
import CustomCursor from '../components/ui/CustomCursor';
import LoadingScreen from '../components/ui/LoadingScreen';
import ChatWidget from '../components/ui/ChatWidget';

// Section Widgets
import HeroSection from '../components/sections/HeroSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import PhilosophySection from '../components/sections/PhilosophySection';
import TechnologySection from '../components/sections/TechnologySection';
import AboutSection from '../components/sections/AboutSection';

// WebGL Background
import BackgroundScene from '../components/webgl/BackgroundScene';

// Smooth Scroll Hook
import { useLenis } from '../lib/useLenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Premium Glitch-Free Choreographed Scroll Orchestrator
 *
 * Targets inner content containers (.glass-card / .section-inner) for y/scale/opacity
 * animations so section scroll boundaries remain 100% stable and glitch-free.
 */
export default function Home() {
  const mainRef = useRef(null);
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const ctx = gsap.context(() => {
      const widgetContainers = gsap.utils.toArray('.widget-container');

      widgetContainers.forEach((widget) => {
        // Target inner container (.glass-card or .section-inner) for transform animations
        const innerContent = widget.querySelector('.glass-card') || widget.querySelector('.section-inner') || widget;
        const staggerElements = widget.querySelectorAll('[data-stagger]');
        const parallaxImg = widget.querySelector('.parallax-img');

        // Main Widget Reveal Timeline
        const widgetTl = gsap.timeline({
          scrollTrigger: {
            trigger: widget,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.5,
          },
        });

        // 1. ENTRY PHASE (0% -> 25% progress)
        widgetTl.fromTo(
          innerContent,
          {
            opacity: 0,
            y: 60,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          0
        );

        // Internal Elements Stagger Reveal
        if (staggerElements.length > 0) {
          widgetTl.fromTo(
            staggerElements,
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.2,
              ease: 'power2.out',
            },
            0.05
          );
        }

        // 2. ACTIVE PHASE — Parallax Shift
        if (parallaxImg) {
          widgetTl.to(
            parallaxImg,
            {
              yPercent: -8,
              ease: 'none',
              duration: 0.45,
            },
            0.25
          );
        }

        // 3. EXIT PHASE (70% -> 100% progress)
        widgetTl.to(
          innerContent,
          {
            opacity: 0.65,
            y: -30,
            scale: 0.98,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0.7
        );
      });
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, [lenisRef]);

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <CustomCursor />
      <BackgroundScene />
      <ChatWidget />

      <main ref={mainRef}>
        <HeroSection />
        <SolutionsSection />
        <PhilosophySection />
        <TechnologySection />
        <AboutSection />
      </main>
    </>
  );
}
