'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ultra-Smooth Custom Cursor with Glow Overlay
 *
 * Uses raw requestAnimationFrame for native refresh-rate (60/120/165Hz).
 * - Inner dot: 92% lerp (near-instant)
 * - Outer ring: 12% lerp (smooth trail)
 * - Glow overlay: Soft radial gradient that follows cursor (8% lerp)
 *
 * On mobile: Shows a fixed soft overlay glow instead.
 */
export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const glowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mobile);

    if (mobile) return; // Mobile gets CSS-only overlay

    const initFrame = requestAnimationFrame(() => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      const glow = glowRef.current;
      if (!outer || !inner || !glow) return;

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let outerX = mouseX, outerY = mouseY;
      let innerX = mouseX, innerY = mouseY;
      let glowX = mouseX, glowY = mouseY;
      let outerScale = 1, targetOuterScale = 1;
      let innerScale = 1, targetInnerScale = 1;
      let running = true;

      const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
      const onOver = (e) => {
        if (e.target.closest('[data-magnetic]')) {
          targetOuterScale = 1.6;
          targetInnerScale = 0.5;
        }
      };
      const onOut = (e) => {
        if (e.target.closest('[data-magnetic]')) {
          targetOuterScale = 1;
          targetInnerScale = 1;
        }
      };
      const onDown = () => {
        targetOuterScale = 0.75;
        targetInnerScale = 0.75;
        setTimeout(() => { targetOuterScale = 1; targetInnerScale = 1; }, 120);
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseover', onOver, { passive: true });
      window.addEventListener('mouseout', onOut, { passive: true });
      window.addEventListener('mousedown', onDown, { passive: true });

      function tick() {
        if (!running) return;

        // Lerp positions at native Hz
        innerX += (mouseX - innerX) * 0.92;
        innerY += (mouseY - innerY) * 0.92;
        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        // Lerp scales
        outerScale += (targetOuterScale - outerScale) * 0.15;
        innerScale += (targetInnerScale - innerScale) * 0.2;

        // GPU-accelerated transforms
        inner.style.transform = `translate3d(${innerX - 3}px, ${innerY - 3}px, 0) scale(${innerScale})`;
        outer.style.transform = `translate3d(${outerX - 16}px, ${outerY - 16}px, 0) scale(${outerScale})`;
        glow.style.transform = `translate3d(${glowX - 100}px, ${glowY - 100}px, 0)`;

        requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);

      outerRef._cleanup = () => {
        running = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseover', onOver);
        window.removeEventListener('mouseout', onOut);
        window.removeEventListener('mousedown', onDown);
      };
    });

    return () => {
      cancelAnimationFrame(initFrame);
      if (outerRef._cleanup) outerRef._cleanup();
    };
  }, []);

  // Mobile: soft fixed overlay glow
  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          width: 300,
          height: 300,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(249,168,38,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {/* Glow overlay — soft golden radial that follows cursor */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(249,168,38,0.08) 0%, rgba(249,168,38,0.03) 40%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: '1px solid rgba(249, 168, 38, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: '#F9A826',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
