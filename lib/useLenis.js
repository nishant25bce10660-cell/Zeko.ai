'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook that initializes Lenis smooth scrolling.
 * Single source of truth for RAF loop to prevent physics jitter.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let animId;
    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
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
    lenis.scrollTo(target, { offset: 0, duration: 1.2 });
  }
}
