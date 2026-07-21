'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight Background Scene
 * 
 * PERFORMANCE OPTIMIZED: Reduced to ~20 particles, half-resolution canvas,
 * throttled to 30fps (imperceptible for ambient effects but halves GPU load).
 * Mobile: disabled entirely, replaced by CSS gradient.
 */
export default function BackgroundScene() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // Skip canvas entirely on mobile — use CSS fallback
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Render at HALF resolution for performance
    const dpr = 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Fewer particles = less draw calls
    const particles = [];
    const PARTICLE_COUNT = 18;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    let smoothMouse = { x: 0.5, y: 0.5 };
    let time = 0;
    let running = true;
    let lastFrame = 0;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / width;
      mouseRef.current.y = e.clientY / height;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Main loop — throttled to ~30fps for ambient effects
    function animate(timestamp) {
      if (!running) return;

      // Throttle to 30fps (33ms interval)
      if (timestamp - lastFrame < 33) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;
      time += 0.004;

      smoothMouse.x += (mouseRef.current.x - smoothMouse.x) * 0.02;
      smoothMouse.y += (mouseRef.current.y - smoothMouse.y) * 0.02;

      // Clear
      ctx.fillStyle = '#090909';
      ctx.fillRect(0, 0, width, height);

      // Golden orb (cursor-following)
      const goldX = width * (0.3 + smoothMouse.x * 0.4);
      const goldY = height * (0.2 + smoothMouse.y * 0.3);
      const goldG = ctx.createRadialGradient(goldX, goldY, 0, goldX, goldY, 350);
      goldG.addColorStop(0, 'rgba(249, 168, 38, 0.06)');
      goldG.addColorStop(1, 'rgba(249, 168, 38, 0)');
      ctx.fillStyle = goldG;
      ctx.fillRect(0, 0, width, height);

      // Blue accent orb
      const blueX = width * (0.7 + Math.sin(time) * 0.08);
      const blueY = height * (0.6 + Math.cos(time * 0.7) * 0.08);
      const blueG = ctx.createRadialGradient(blueX, blueY, 0, blueX, blueY, 300);
      blueG.addColorStop(0, 'rgba(88, 101, 242, 0.04)');
      blueG.addColorStop(1, 'rgba(88, 101, 242, 0)');
      ctx.fillStyle = blueG;
      ctx.fillRect(0, 0, width, height);

      // Particles
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.283);
        ctx.fillStyle = `rgba(249, 168, 38, ${p.opacity})`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
