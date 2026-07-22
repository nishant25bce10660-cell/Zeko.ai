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
 * Premium Choreographed Scroll Orchestrator
 *
 * Implements exact scroll timing:
 * - Entry (0-25%): Opacity 0->1, translateY 80px->0px, scale 0.96->1 (cubic-bezier(0.22, 1, 0.36, 1))
 * - Active (25-70%): Centered stability with subtle 8-12% image parallax
 * - Exit (70-100%): Opacity 1->0.60, translateY 0px->-40px, scale 1->0.97
 * - Internal Stagger: Cascading reveal of labels, titles, buttons, and cards (40-70ms delay)
 * - GPU Accelerated: translate3d, scale, opacity only for 60-120 FPS performance
 */
export default function Home() {
  const mainRef = useRef(null);
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    const ctx = gsap.context(() => {
      const widgetContainers = gsap.utils.toArray('.widget-container');

      widgetContainers.forEach((widget) => {
        // Internal stagger elements inside widget
        const staggerElements = widget.querySelectorAll('[data-stagger]');
        const parallaxImg = widget.querySelector('.parallax-img');

        // Main Widget Timeline (Entry -> Active -> Exit)
        const widgetTl = gsap.timeline({
          scrollTrigger: {
            trigger: widget,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.6, // Smooth cinematic scrub
          },
        });

        // 1. ENTRY PHASE (0% -> 25% progress)
        // TranslateY: 80px -> 0px, Scale: 0.96 -> 1, Opacity: 0 -> 1
        widgetTl.fromTo(
          widget,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: 'power3.out',
          },
          0
        );

        // Cascading Internal Stagger Reveal
        if (staggerElements.length > 0) {
          widgetTl.fromTo(
            staggerElements,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05, // 50ms delay between items
              duration: 0.2,
              ease: 'power3.out',
            },
            0.05
          );
        }

        // 2. ACTIVE PHASE (25% -> 70% progress) — Internal Image Parallax (8-12%)
        if (parallaxImg) {
          widgetTl.to(
            parallaxImg,
            {
              yPercent: -10, // 10% parallax
              ease: 'none',
              duration: 0.45,
            },
            0.25
          );
        }

        // 3. EXIT PHASE (70% -> 100% progress)
        // Opacity: 1 -> 0.60, Scale: 1 -> 0.97, TranslateY: 0px -> -40px
        widgetTl.to(
          widget,
          {
            opacity: 0.6,
            y: -40,
            scale: 0.97,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0.7
        );
      });
    }, mainRef);

    return () => {
      lenis.off('scroll', handleScroll);
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
