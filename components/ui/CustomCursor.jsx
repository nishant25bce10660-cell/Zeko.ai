'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 1:1 Instant Custom Cursor with Responsive Ambient Glow
 * Both cursor elements and the golden opacity glow follow the cursor seamlessly without lag.
 */
export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const glowRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      return mobile;
    };

    if (checkMobile()) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX, glowY = mouseY;

    let outerScale = 1, targetOuterScale = 1;
    let running = true;

    const updatePosition = (x, y) => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (outer && inner) {
        outer.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0) scale(${outerScale})`;
        inner.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updatePosition(mouseX, mouseY);
    };

    const onOver = (e) => {
      if (e.target.closest('[data-magnetic], button, a, input, textarea, label')) {
        targetOuterScale = 1.4;
      }
    };

    const onOut = (e) => {
      if (e.target.closest('[data-magnetic], button, a, input, textarea, label')) {
        targetOuterScale = 1;
      }
    };

    const onDown = () => {
      targetOuterScale = 0.85;
    };

    const onUp = () => {
      targetOuterScale = 1;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    function tick() {
      if (!running) return;

      const glow = glowRef.current;
      if (glow) {
        // High speed responsive drag (0.45 factor) — follows right with the cursor without falling behind
        glowX += (mouseX - glowX) * 0.45;
        glowY += (mouseY - glowY) * 0.45;
        glow.style.transform = `translate3d(${glowX - 110}px, ${glowY - 110}px, 0)`;
      }

      outerScale += (targetOuterScale - outerScale) * 0.35;
      updatePosition(mouseX, mouseY);

      requestAnimationFrame(tick);
    }

    const animId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          width: 320,
          height: 320,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(249,168,38,0.08) 0%, transparent 70%)',
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
      {/* Ambient Glow Opacity Overlay — Fast Smooth Drag */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, rgba(249,168,38,0.18) 0%, rgba(249,168,38,0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99990,
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      {/* Outer Circle Ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          border: '1.5px solid #F9A826',
          boxShadow: '0 0 12px rgba(249, 168, 38, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
      {/* Inner Dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: '#F9A826',
          boxShadow: '0 0 8px #F9A826',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
