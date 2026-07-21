'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook that initializes Lenis smooth scrolling.
 * Tuned for ultra-smooth, buttery inertia at any refresh rate.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,                    // Longer = smoother coast
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth expo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,             // Slightly slower = more premium feel
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Drive Lenis at native refresh rate
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
}

/**
 * Scrolls smoothly to a target section.
 */
export function scrollToSection(targetId) {
  const lenis = window.__lenis;
  const target = document.getElementById(targetId);
  if (lenis && target) {
    lenis.scrollTo(target, { offset: 0, duration: 1.8 });
  }
}
